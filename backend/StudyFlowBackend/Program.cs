using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using StudyFlowBackend.Data;
using StudyFlowBackend.Repositories.Implementations;
using StudyFlowBackend.Repositories.Interfaces;
using StudyFlowBackend.Services;
using StudyFlowBackend.Services.Implementations;
using StudyFlowBackend.Services.Interfaces;
using StudyFlowBackend.Utils;

// Fix PostgreSQL DateTime Unspecified Kind error to avoid timestamp zone mismatch issues in Npgsql
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Register DbContext with PostgreSQL configuration, supporting pgvector extensions
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddHttpContextAccessor();

// Configure CORS to allow frontend origin connections
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.SetIsOriginAllowed(origin => true)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Configure JWT Bearer Authentication using custom secret key
var jwtKey = builder.Configuration["Jwt:Key"] ?? "StudyFlowOctoFlashcardSuperSecretKey2026!@#$%^&*()_+";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "StudyFlowBackend";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "StudyFlowFrontend";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidateIssuer = true,
            ValidIssuer = jwtIssuer,
            ValidateAudience = true,
            ValidAudience = jwtAudience,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(5)
        };
    });

// -- Rate Limiting --
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.OnRejected = async (context, cancellationToken) =>
    {
        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        context.HttpContext.Response.ContentType = "application/json";
        await context.HttpContext.Response.WriteAsJsonAsync(new
        {
            status = false,
            message = "Too many requests. Please slow down and try again later",
        }, cancellationToken: cancellationToken);
    };

    options.AddPolicy("AuthPolicy", httpContext =>
    {
        return RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 15,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 1,
                AutoReplenishment = true
            }
        );
    });

    options.AddPolicy("GeneratePolicy", httpContext =>
    {
        return RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 40,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 1,
                AutoReplenishment = true
            }
        );
    });
});

// ==============================================================================
// 1. REPOSITORIES REGISTRATION
// ==============================================================================
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<IFocusSessionRepository, FocusSessionRepository>();
builder.Services.AddScoped<IFlashcardRepository, FlashcardRepository>();
builder.Services.AddScoped<IScannedDocumentRepository, ScannedDocumentRepository>();
builder.Services.AddScoped<IGamificationRepository, GamificationRepository>();
builder.Services.AddScoped<IPetRepository, PetRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<IChatMessageRepository, ChatMessageRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// ==============================================================================
// 2. SERVICES REGISTRATION
// ==============================================================================
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IChatService, ChatService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IFocusSessionService, FocusSessionService>();
builder.Services.AddScoped<IUserUtils, UserUtils>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IGamificationService, GamificationService>();
builder.Services.AddScoped<IPetService, PetService>();
builder.Services.AddScoped<ILeaderboardService, LeaderboardService>();
builder.Services.AddScoped<IScannedDocumentService, ScannedDocumentService>();
builder.Services.AddScoped<IStorageQuotaService, StorageQuotaService>();
builder.Services.AddScoped<IFlashcardService, FlashcardService>();
builder.Services.AddHttpClient<IGeminiService, GeminiService>();
builder.Services.AddHostedService<ReminderWorker>();
builder.Services.AddHostedService<TrashCleanupService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";

        var exceptionFeature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>();
        var errorMessage = exceptionFeature?.Error?.Message ?? "Internal server error occurred.";

        await context.Response.WriteAsJsonAsync(new
        {
            success = false,
            message = errorMessage,
            errors = exceptionFeature?.Error?.GetType().Name
        });
    });
});

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.UseRateLimiter();

app.MapControllers();

// Automatically apply database migrations and health check during startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        var dbContext = services.GetRequiredService<AppDbContext>();

        // Apply any pending migrations automatically (e.g. when deploying to Render or production)
        Console.WriteLine(" - Checking and applying database migrations...");
        dbContext.Database.Migrate();
        Console.WriteLine(" - Database migrations checked successfully.");

        var canConnect = dbContext.Database.CanConnect();
        var urls = app.Urls.Any() ? string.Join(", ", app.Urls) : "Unknown URL";

        Console.WriteLine("=======================================");
        Console.WriteLine($" - Server is running at: {urls}");
        Console.WriteLine($" - Environment: {app.Environment.EnvironmentName}");

        if (canConnect)
        {
            Console.WriteLine(" - Database connection: Success");
        }
        else
        {
            Console.WriteLine(" - Database connection: Failed");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error occurred while initializing the application: {ex.Message}");
    }
}

app.Run();

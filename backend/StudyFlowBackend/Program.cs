using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using StudyFlowBackend.Data;
using StudyFlowBackend.Services;
using StudyFlowBackend.Services.Implementations;
using StudyFlowBackend.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Threading.RateLimiting;

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

// Configure JWT Bearer Authentication using Firebase Auth secure token issuer
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://securetoken.google.com/studyflow-ngnphcng";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "https://securetoken.google.com/studyflow-ngnphcng",
            ValidateAudience = true,
            ValidAudience = "studyflow-ngnphcng",
            ValidateLifetime = true
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
            message = "Too many requeests. Please slow down and try again later",
        }, cancellationToken: cancellationToken);
    };

    options.AddPolicy("AuthPolicy", httpContext =>
    {
       RateLimitPartition.GetFixedWindowLimiter(
        partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        factory: _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 10,
            Window = TimeSpan.FromMinutes(1),
            QueueLimit = 1,
            AutoReplenishment = true   
        }
       ); 
    });

    options.AddPolicy("GeneratePolicy", httpContext =>
    {
       RateLimitPartition.GetFixedWindowLimiter(
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

// Register custom services and dependency injections
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

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else 
{
    // app.UseHttpsRedirection();
}

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

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
        Console.WriteLine($" -Server is running at: {urls}");
        Console.WriteLine($" -Environment: {app.Environment.EnvironmentName}");

        if(canConnect)
        {
            Console.WriteLine(" -Database connection: Success");
        }
        else
        {
            Console.WriteLine(" -Database connection: Failed");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error occurred while initializing the application: {ex.Message}");
    }
}

app.Run();

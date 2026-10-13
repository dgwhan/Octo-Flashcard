using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OctoFlashcardStudy.API.Contracts.Common;
using OctoFlashcardStudy.API.Data;
using OctoFlashcardStudy.API.Extensions;
using OctoFlashcardStudy.API.Extensions.DependencyInjection;
using OctoFlashcardStudy.API.Middlewares;
using System.Text.Json.Nodes;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

//cors
var allowedOrigins = builder.Configuration
                          .GetSection("AllowedCorsOrigins")
                          .Get<string[]>() ?? [];
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
        .WithOrigins(allowedOrigins)
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

//mvc
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters
            .Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
    });

//module(DI configuration: Extensions/DependencyInjection/)
builder.Services.AddAuthModule();
builder.Services.AddDeckModule();
builder.Services.AddFlashCardModule();

//infrastructure
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseMySQL(connectionString!);
});

//authentication
builder.Services.AddJwtAuthentication(builder.Configuration);

//api behavior
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var errors = context.ModelState
            .Where(x => x.Value!.Errors.Count > 0)
            .ToDictionary(
                x => x.Key,
                x => x.Value!.Errors
                    .Select(e => e.ErrorMessage)
                    .ToArray());
        var response = new ValidationErrorResponse
        {
            StatusCode = StatusCodes.Status400BadRequest,
            Message = "Validation failed.",
            Errors = errors
        };

        return new BadRequestObjectResult(response);
    };
});


//openapi
builder.Services.AddOpenApi(options =>
{
    options.AddSchemaTransformer((schema, context, cancellationToken) =>
    {
        var type = context.JsonTypeInfo.Type;
        if (type.IsEnum)
        {
            schema.Enum = Enum.GetNames(type)
                .Select(name => (JsonNode)JsonValue.Create(name)!)
                .ToList();
            schema.Type = Microsoft.OpenApi.JsonSchemaType.String;
        }
        return Task.CompletedTask;
    });
});

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.MapScalarApiReference(options =>
    {
        options.Title = "Octo Flashcard Study API";
        options.Theme = ScalarTheme.BluePlanet;
    });
}

app.UseCors("Frontend");

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

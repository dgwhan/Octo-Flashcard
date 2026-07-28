using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OctoFlashcardStudy.API.Contracts.Common;
using OctoFlashcardStudy.API.Data;
using OctoFlashcardStudy.API.Extensions;
using OctoFlashcardStudy.API.Extensions.DependencyInjection;
using OctoFlashcardStudy.API.Middlewares;
using OctoFlashcardStudy.API.Services.Auth;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

//mvc
builder.Services.AddControllers();

//module(DI configuration: Extensions/DependencyInjection/)
builder.Services.AddAuthModule();

//infrastructure
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"));
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

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

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

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

using LifeFlow.Models;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string[] origins = builder.Configuration.GetValue<string>("Hosts")!.Split(",");

builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirReact",
            builder => builder.WithOrigins(origins) // React corre por default en este puerto
                              .AllowAnyMethod()
                              .AllowAnyHeader());
});

builder.Services.AddDbContext<LifeFlowContext>((serviceProvider, options) =>
{
    IConfiguration configuration = serviceProvider.GetRequiredService<IConfiguration>();
    options.UseSqlServer(builder.Configuration.GetConnectionString("LifeFlow"));
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();

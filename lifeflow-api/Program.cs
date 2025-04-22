using LifeFlow.Models;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirReact",
            builder => builder.WithOrigins("http://localhost:3000") // React corre por default en este puerto
                              .AllowAnyMethod()
                              .AllowAnyHeader());
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<LifeFlowContext>((serviceProvider, options) =>
{
    IConfiguration configuration = serviceProvider.GetRequiredService<IConfiguration>();
    options.UseSqlServer(builder.Configuration.GetConnectionString("LifeFlow"));
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting(); 

app.UseCors("PermitirReact"); 

app.UseAuthorization();

app.MapControllers();

app.Run();

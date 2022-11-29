using Microsoft.EntityFrameworkCore;
using SchoolProject_WebAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// !Configuramos NewtonSoftJson
builder.Services.AddControllers().AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = 
                    Newtonsoft.Json.ReferenceLoopHandling.Ignore);


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ! agregamos CORS
builder.Services.AddCors(options => options.AddPolicy("AllowWebapp", 
                                    builder => builder.AllowAnyOrigin()
                                                    .AllowAnyHeader()
                                                    .AllowAnyMethod()));

// !Agregamos el context
// !It has to be added before var app = builder.Build();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Conexion"));
});

// !Add Services
builder.Services.AddScoped<IRepository, Repository>();



var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ! agregamos CORS
app.UseCors("AllowWebapp");

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

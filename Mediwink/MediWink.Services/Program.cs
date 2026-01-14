
using Mediwink.DataAccessLayer;
using Mediwink.DataAccessLayer.Models;
using MediWink.Services.Mediwink_Services.Implementation;
using MediWink.Services.Mediwink_Services.Interfaces;

namespace MediWink.Services
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            // ✅ Configure CORS for React (remove the trailing slash)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy => policy
                        .WithOrigins("http://localhost:5173") // no slash at the end
                        .AllowAnyHeader()
                        .AllowAnyMethod());
            });

            // ✅ Register EF Context
            builder.Services.AddDbContext<MediWinkContext>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<IUserServices, UserService>();
            builder.Services.AddScoped<MediwinkRepository>();
            builder.Services.AddScoped<IMedicine, MedicineServices>();
            builder.Services.AddScoped<IPrescription, PrescriptionServices>();
            
            builder.Services.AddTransient<MediWinkContext>();
            builder.Services.AddTransient<MediwinkRepository>(
                c=> new MediwinkRepository(c.GetRequiredService<MediWinkContext>())
                
                );


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            // ✅ CORS must come before Authorization
            app.UseCors("AllowReactApp");


            app.UseAuthorization();


            app.MapControllers();


            app.Run();
        }
    }
}

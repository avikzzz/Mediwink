using Mediwink.DataAccessLayer;
using Mediwink.DataAccessLayer.Models;
using System.Net.NetworkInformation;

namespace Mediwink.ConsoleApp
{
    public class Program
    {
        static MediWinkContext context;
        static MediwinkRepository repository;
        static Program()
        {
            context = new MediWinkContext();
            repository = new MediwinkRepository(context);
        }

        static async Task Main(string[] args) // Change Main to async Task
        {
            Console.WriteLine("Hello, World!");

            var med = repository.GetAllMedicines();

            foreach (var m in med)
            {
                Console.WriteLine(m.MedId + m.MedName + m.MedType);
            }

            // Medicine medi = new Medicine()
            // {
            //     MedName = "aZYTHROMYCINE",
            //     MedType = "CAP"
            // };

            // repository.AddMedicine(medi);

            //User us = new User()
            //{
            //    UserType = "P",
            //    UserName = "Rintu",
            //    Email = "rintu@gmail.com",
            //    Password = "rintu@123",
            //    Contact = 9408098767,
            //    Gender = "M",
            //    CreatedBy = "DAL layer",
            //};

            //await repository.RegisterUserAsync(us);

            
                
                

            

            var t = repository.AuthenticateUser("avik@gmail.com", "avik@123");
            Console.WriteLine(t);
        }
    }
}

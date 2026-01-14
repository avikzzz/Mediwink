using Mediwink.DataAccessLayer.Models;
using Mediwink.DataAccessLayer.Models.ModelDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mediwink.DataAccessLayer
{

    public  class MediwinkRepository
    {
        private MediWinkContext _context;

        public MediwinkRepository(MediWinkContext context)
        {
            this._context = context;
                
        }



        // Doc Patient Link

        public List<User> GetPatientsLinkedwithDoc(int docId)
        {
            var patList = (from docLink in _context.DocLinks
                           join users in _context.Users
                           on docLink.PatientId equals users.Userid
                           where docLink.DocId == docId
                           select users)
                           .ToList();
            return patList;
                
        }

        public bool LinkPatientswihDoc(DocLink link)
        {
            try
            {
                _context.DocLinks.Add(link);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex) {
                return false;
            }

            
        }

        // Medicines

        public List<Medicine> GetAllMedicines()
        {
            var medicineList = _context.Medicines
                .OrderBy(med => med.MedName)
                .Select(med => med)
                .ToList();                 //to store the data in a list

            return medicineList;
        }


        public Medicine GetMedicineById(int medId)
        {
            Medicine medicine = new Medicine();
            medicine= _context.Medicines
                .Where(m=>m.MedId==medId)
                .FirstOrDefault();

            return medicine;
        }

        public bool AddMedicine(Medicine med)
        {
            try
            {
                _context.Medicines.Add(med);
                _context.SaveChanges();
                return true;
            }

            catch( Exception ex)
            {
                return false;
            }
        }

        // Prescription

        public List<PrescriptionDetailsDto> GetPrescriptionByPatient(int patientId)
        {
            var prescription = (from p in _context.PrescMedicines
                                join m in _context.Medicines
                                on p.MedId equals m.MedId
                                where p.PatientId == patientId
                                orderby p.MedId
                                select new PrescriptionDetailsDto
                                {
                                    PrescId = p.PrescMedid,
                                    PatientId = p.PatientId,
                                    MedId = p.MedId,
                                    MedName = m.MedName,
                                    MedType = m.MedType,
                                    Dosage = p.Dosage,
                                    Duration = p.Duration,
                                    Frequency = p.Frequency,
                                    Remarks = p.Remarks
                                }).ToList();

            return prescription;
        }

        public bool AddPrescription(PrescMedicine pres)
        {
            try
            {
                _context.PrescMedicines.Add(pres);
                _context.SaveChanges();
                return true;    

            }
            catch( Exception ex)
            {
                return false;
            }
        }

        //------------ user --------------//

        public User GetUserById(int userId)
        {
            try
            {
                var userbyId = _context.Users
                    .FirstOrDefault( u => u.Userid== userId);

                if (userbyId == null) return null;


                return userbyId;
            }
            catch (Exception ex)
            {
                return null;
            }

            
        }

        public List<User> GetUsersByType(char userType)
        {
            var userbyType = _context.Users
                .Where(c => c.UserType == userType)
                .OrderBy(c => c.UserName)
                .ToList();


            return userbyType;
        }

        public async Task<int> RegisterUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user.Userid;   
        }

        public LoginResponse AuthenticateUser(string email, string password)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == email && u.Password == password);



            if (user == null) return null;

           
            return new LoginResponse
            {
                 UserId = user.Userid,
                 UserName = user.UserName,
                 User_Type = user.UserType

            };
            


                
        }




    }
}

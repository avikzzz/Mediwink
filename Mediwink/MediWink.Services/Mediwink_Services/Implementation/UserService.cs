using Mediwink.DataAccessLayer;
using Mediwink.DataAccessLayer.Models;
using MediWink.Services.Mediwink_Services.Interfaces;

namespace MediWink.Services.Mediwink_Services.Implementation
{
    public class UserService:IUserServices
    {
        private readonly MediwinkRepository _repository;

        public UserService(MediwinkRepository repository)
        {
            _repository = repository;
        }


        // calling the DAL layer
        public async Task<int> RegisterUserAsync(User user)
        {
            return await _repository.RegisterUserAsync(user);
        }

        public List<User> GetUserbyType(char role)
        {
            return _repository.GetUsersByType(role);
        }

        public LoginResponse AuthenticateUser(string email, string password)
        {
            var response = _repository.AuthenticateUser(email, password);

            return response;

        }

        public List<User> getPatientsLinktoDoc(int docId)
        {
            return _repository.GetPatientsLinkedwithDoc(docId);
        }

        public bool LinkPatientwithDoc(DocLink docLink)
        {
            var res = _repository.LinkPatientswihDoc(docLink);

            return res;
        }
    }
}

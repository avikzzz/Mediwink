using Mediwink.DataAccessLayer.Models;

namespace MediWink.Services.Mediwink_Services.Interfaces
{
    public interface IUserServices
    {
        Task<int> RegisterUserAsync(User user);

        List<User> GetUserbyType(char role);

        LoginResponse AuthenticateUser(string email, string password);

        List<User> getPatientsLinktoDoc(int docId);

        bool LinkPatientwithDoc(DocLink docLink);

    }
}

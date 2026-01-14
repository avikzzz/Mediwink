using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mediwink.DataAccessLayer.Models
{
    public class LoginResponse
    {
        public int UserId { get; set; }

        public string UserName { get; set; }
        public char User_Type { get; set; }  
        public char IsActive { get; set; }
    }
}

using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ButceAnaliz.Models
{
    public class Gelir
    {
        public int Id { get; set; }
        public int Maas { get; set; }
        public int YatırımKar { get; set; }
        public Kullanıcı Kullanıcı { get; set; }
        public virtual IdentityUser User { get; set; }
    }
}

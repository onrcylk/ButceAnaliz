using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ButceAnaliz.Models
{
    public class Kullanıcı
    {
        public int Id { get; set; }
        public string KullanıcıAd { get; set; }
        public string KullanıcıSoyad { get; set; }
        public string Parola { get; set; }
        public string Email { get; set; }

    }
}

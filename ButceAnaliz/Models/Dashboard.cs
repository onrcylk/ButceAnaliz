using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ButceAnaliz.Models
{
    public class Dashboard
    {
        public int Id { get; set; }
        public int GelenToplamTutar { get; set; }
        public int GidenToplamTutar { get; set; }
        public int ToplamTutar { get; set; }
        public DateTime KayitTarihi { get; set; }
        public virtual IdentityUser User { get; set; }
    }
}

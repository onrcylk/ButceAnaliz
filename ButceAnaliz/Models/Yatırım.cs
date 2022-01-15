using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ButceAnaliz.Models
{
    public class Yatırım
    {
        public int Id { get; set; }
        public string YatırımTürü { get; set; }
        public virtual IdentityUser User { get; set; }
    }
}

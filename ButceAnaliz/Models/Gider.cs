using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ButceAnaliz.Models
{
    public class Gider
    {
        public int Id { get; set; }
        public int ElektirikFatura { get; set; }
        public int SuFatura { get; set; }
        public int DoğalgazFatura { get; set; }
        public int InternetFatura { get; set; }
        public int TelefonFatura { get; set; }
        public int KrediTutar { get; set; }
        public virtual IdentityUser User { get; set; }
    }
}

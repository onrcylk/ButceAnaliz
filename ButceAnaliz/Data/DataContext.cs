using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ButceAnaliz.Models
{
    public class DataContext : IdentityDbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }
        public virtual DbSet<Dashboard> Dashboards { get; set; }
        public virtual DbSet<Gider> Gider { get; set; }
        public virtual DbSet<Gelir> Gelir { get; set; }
        public virtual DbSet<Kullanıcı> Kullanıcı { get; set; }
        public virtual DbSet<Yatırım> Yatırım { get; set; }
       

    }
}

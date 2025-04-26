using AccessControl.Domain.Entities;
using AccessControl.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Be.CDB.Data.Context
{
    public class SqliteDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("DataSource=app.db;Cache=Shared");

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("Users", "AccessControl")
                .HasData(new User
                {
                    Id = Guid.NewGuid(),
                    Username = "mcmoriam",
                    Email = "mcmoriam@gmail.com",
                    Password = "mcM0ri@m",
                    Phone = "21992061136",
                    Status = UserStatus.Active,
                    Role = UserRole.Admin
                });

            base.OnModelCreating(modelBuilder);
        }
    }
}
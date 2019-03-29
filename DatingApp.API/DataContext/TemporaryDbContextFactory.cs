using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace DatingApp.API.DataContext
{
    public class TemporaryDbContextFactory : IDesignTimeDbContextFactory<DataContext> 
{ 
    //////// 
     public DataContext CreateDbContext(string[] args)
    {
        IConfiguration configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();
        var builder = new DbContextOptionsBuilder<DataContext>();
        var connectionString = configuration.GetConnectionString("DefualtConnection");
        builder.UseSqlite(connectionString);
        return new DataContext(builder.Options);
    }
} 
}
using Microsoft.EntityFrameworkCore;

namespace MyApi.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options)
        {
        }

        // Add DbSet<TB_xxx> after scaffolding
    }
}

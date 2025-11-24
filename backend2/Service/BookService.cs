using backend2.Data;
using backend2.Models;
using Microsoft.EntityFrameworkCore;

namespace backend2.Service
{
    public interface IBookService
    {
        List<TbBook> GetBookByID(int nBookID);
    }

    public class BookService : IBookService
    {
        private readonly MyDbContext _db;

        public BookService(MyDbContext db)
        {
            _db = db;
        }

        public List<TbBook> GetBookByID(int nBookID)
        {
            var a = _db.TbBook.Where(w => w.NBookId == nBookID).ToList();
            return a;
        }
    }
}

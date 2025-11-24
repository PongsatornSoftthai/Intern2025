using backend2.Model;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend2.Service
{
    public interface IBookService
    {
        List<BookDto> GetAllBooks();
        List<BookDto> GetBookByID(int nBookID);
        bool UpdateBook(BookDto book);
        bool AddBook(BookDto book); // ➤ เพิ่มสำหรับเพิ่มหนังสือ
    }

    public class BookService : IBookService
    {
        private readonly MyDbContext _db;

        public BookService(MyDbContext db)
        {
            _db = db;
        }

        public List<BookDto> GetAllBooks()
        {
            var data = (from b in _db.TbBook
                        join a in _db.TbAuthor
                        on b.NAuthorId equals a.NAuthorId
                        select new BookDto
                        {
                            nBookID = b.NBookId,
                            sNamebook = b.SNamebook,
                            nPrice = b.NPrice,
                            nQuantity = b.NQuantity,
                            sAuthor = a.SAuthorName,
                            dReleaseDate = b.DRelease
                        }).ToList();

            return data;
        }

        public List<BookDto> GetBookByID(int nBookID)
        {
            var data = (from b in _db.TbBook
                        join a in _db.TbAuthor
                        on b.NAuthorId equals a.NAuthorId
                        where b.NBookId == nBookID
                        select new BookDto
                        {
                            nBookID = b.NBookId,
                            sNamebook = b.SNamebook,
                            nPrice = b.NPrice,
                            nQuantity = b.NQuantity,
                            sAuthor = a.SAuthorName,
                            dReleaseDate = b.DRelease
                        }).ToList();

            return data;
        }

        public bool UpdateBook(BookDto book)
        {
            var existingBook = _db.TbBook.FirstOrDefault(b => b.NBookId == book.nBookID);
            if (existingBook == null) return false;

            existingBook.SNamebook = book.sNamebook;
            existingBook.NPrice = book.nPrice;
            existingBook.NQuantity = book.nQuantity;
            existingBook.DRelease = book.dReleaseDate;

            var author = _db.TbAuthor.FirstOrDefault(a => a.SAuthorName == book.sAuthor);
            if (author != null)
                existingBook.NAuthorId = author.NAuthorId;

            _db.SaveChanges();
            return true;
        }

        // 🔹 เพิ่มหนังสือใหม่
        public bool AddBook(BookDto book)
        {
            var author = _db.TbAuthor.FirstOrDefault(a => a.SAuthorName == book.sAuthor);

            // ถ้ายังไม่มีผู้แต่ง ให้เพิ่มก่อน
            if (author == null)
            {
                author = new TbAuthor { SAuthorName = book.sAuthor };
                _db.TbAuthor.Add(author);
                _db.SaveChanges();
            }

            var newBook = new TbBook
            {
                SNamebook = book.sNamebook,
                NPrice = book.nPrice,
                NQuantity = book.nQuantity,
                DRelease = book.dReleaseDate,
                NAuthorId = author.NAuthorId
            };

            _db.TbBook.Add(newBook);
            _db.SaveChanges();
            return true;
        }
    }
}

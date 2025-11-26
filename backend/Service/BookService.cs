using backend2.Model;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend2.Service
{
    public interface IBookService
    {
        List<BookDto> GetAllBooks();
        BookDto GetBookByID(int nBookID); // แก้จาก List<BookDto> เป็น BookDto
        bool UpdateBook(BookDto book);
        bool AddBook(BookDto book);
        bool SoftDeleteBook(int id);
    }

    public class BookService : IBookService
    {
        private readonly MyDbContext _db;

        public BookService(MyDbContext db)
        {
            _db = db;
        }

        // ดึงข้อมูลทั้งหมด
        public List<BookDto> GetAllBooks()
        {
            var data = (from b in _db.TbBook
                        join a in _db.TbAuthor
                        on b.NAuthorId equals a.NAuthorId
                        where b.IsDelete == false
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

        // ดึงข้อมูลหนังสือเฉพาะเล่ม
        public BookDto GetBookByID(int nBookID)
        {
            var data = (from b in _db.TbBook
                        join a in _db.TbAuthor
                        on b.NAuthorId equals a.NAuthorId
                        where b.NBookId == nBookID && b.IsDelete == false
                        select new BookDto
                        {
                            nBookID = b.NBookId,
                            sNamebook = b.SNamebook,
                            nPrice = b.NPrice,
                            nQuantity = b.NQuantity,
                            sAuthor = a.SAuthorName,
                            dReleaseDate = b.DRelease
                        }).FirstOrDefault();

            return data;
        }

        // อัปเดตข้อมูลหนังสือ
        public bool UpdateBook(BookDto book)
        {
            var existingBook = _db.TbBook.FirstOrDefault(b => b.NBookId == book.nBookID);
            if (existingBook == null) return false;

            existingBook.SNamebook = book.sNamebook;
            existingBook.NPrice = book.nPrice;
            existingBook.NQuantity = book.nQuantity;
            existingBook.DRelease = book.dReleaseDate;

            // ถ้าผู้แต่งยังไม่มี ให้สร้างใหม่
            var author = _db.TbAuthor.FirstOrDefault(a => a.SAuthorName == book.sAuthor);
            if (author == null)
            {
                author = new TbAuthor { SAuthorName = book.sAuthor };
                _db.TbAuthor.Add(author);
                _db.SaveChanges();
            }

            existingBook.NAuthorId = author.NAuthorId;

            _db.SaveChanges();
            return true;
        }

        // เพิ่มหนังสือใหม่
        public bool AddBook(BookDto book)
        {
            var author = _db.TbAuthor.FirstOrDefault(a => a.SAuthorName == book.sAuthor);

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

        public bool SoftDeleteBook(int id)
        {
            var book = _db.TbBook.FirstOrDefault(b => b.NBookId == id);
            if (book == null) return false;

            book.IsDelete = true;       // soft delete
            book.DDelete = DateTime.Now;

            _db.SaveChanges();
            return true;
        }

    }
}

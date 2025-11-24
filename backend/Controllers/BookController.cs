using backend2.Model;
using backend2.Service;
using Microsoft.AspNetCore.Mvc;

namespace backend2.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BookController : Controller
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        // ⭐ ดึงข้อมูลทั้งหมด
        [HttpGet]
        public IActionResult GetAllBooks()
        {
            var books = _bookService.GetAllBooks();
            return Ok(books);
        }

        // ⭐ ดึงข้อมูลตาม ID
        [HttpGet]
        public IActionResult GetBook(int nBookID)
        {
            var objBook = _bookService.GetBookByID(nBookID);
            if (objBook == null) return NotFound();
            return Ok(objBook);
        }

        // ⭐ อัปเดตข้อมูลหนังสือ
        [HttpPut]
        public IActionResult UpdateBook(int nBookID, [FromBody] BookDto bookDto)
        {
            if (bookDto == null || nBookID != bookDto.nBookID)
                return BadRequest();

            var updated = _bookService.UpdateBook(bookDto);
            if (!updated) return NotFound();

            return Ok(bookDto);
        }

        [HttpPost]
        public IActionResult AddBook([FromBody] BookDto book)
        {
            try
            {
                _bookService.AddBook(book);
                return Ok(new { message = "เพิ่มหนังสือสำเร็จ" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}

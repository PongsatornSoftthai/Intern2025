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

        [HttpPost]
        public IActionResult GetBook(int nBookID)
        {
            var objBook = _bookService.GetBookByID(nBookID);
            return Ok(objBook);
        }

    }
}

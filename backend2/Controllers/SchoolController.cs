//การ impoert namespace เพื่อเข้าถึง Service
using backend2.Models;
using backend2.Service;
//สำหรับการสร้าง controller และ api 
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

//namespace = ตู้เก็บของ เก็บ class , interface, อื่น ๆ เรียกใช้ต้องอ้าง namespace นั้น ๆ
//กำหนด namespace ระบุว่า controller นี้อยู่ในโฟลเดอร์ backend2.Controllers
namespace backend2.Controllers
{
    //controller นี้เป็น API ไม่ใช่ MVC
    [ApiController]
    //กำหนด route การเข้าถึง api
    [Route("api/[controller]/[action]")]

    //สร้าง class SchoolController สืบทอดมาจาก Controller
    public class SchoolController : Controller
    {
        //สร้างตัวแปรเพื่อเก็บ service
        //private คือใช้ได้เฉพาะภายใน class นี้
        //กำหนดตัวแปรแบบ readonly คือ กำหนดค่าได้ครั้งเดียวตอนสร้าง object
        private readonly ISchoolService _schoolService;

        //สร้าง constructor เพื่อรับ service ที่ถูก inject มา
        public SchoolController(ISchoolService SchoolService)
        {
            _schoolService = SchoolService;
        }

        //api นี้ต้องเรียกใช้ด้วย post method
        //สร้าง api Api/GetSchool
        [HttpPost]
        public IActionResult GetSchool(string sSchoolID) //รับค่าพารามิเตอร์ sSchoolID จาก frontend
        {
            //ส่ง sSchoolID ไปที่ service เพื่อดึงข้อมูล ส่งผลลัพธ์กลับมาเป็น object
            var objBook = _schoolService.GetSchoolByID(sSchoolID);
            //ส่งผลลัพธ์กลับไปที่ frontend ok()= HTTP status 200 พร้อมกับข้อมูล json
            return Ok(objBook);
        }

        //ดึงข้อมูลอาจารย์ทั้งหมด
        [HttpGet]
        public IActionResult GetAllTeachers()
        {
            //เรียกใช้ service เพื่อดึงข้อมูลอาจารย์ทั้งหมด
            var teachers = _schoolService.GetAllTeachers();
            return Ok(teachers);
        }

        //ดึงข้อมูลรายวิชาทั้งหมด
        [HttpGet]
        public IActionResult GetAllSubjects()
        {
            var subjects = _schoolService.GetAllSubjects();
            return Ok(subjects);
        }

        [HttpPost]
        public IActionResult AddTeacher([FromBody] TbTeachers teacher)
        {
            if (_schoolService.AddTeacher(teacher, out string msg))
            {
                return Ok(new { message = msg });
            }
            else
            {
                return BadRequest(new { message = msg });
            }
        }

        [HttpPost]
        public IActionResult AddSubject([FromBody] TbSubjects subject)
        {
            if (_schoolService.AddSubject(subject, out string msg))
            {
                return Ok(new { message = msg });
            }
            else
            {
                return BadRequest(new { message = msg });
            }
        }

        [HttpGet("{sSubjectID}")]
        public IActionResult GetSubject(string sSubjectID)
        {
            var subject = _schoolService.GetSubject(sSubjectID, out string msg);
            if (subject == null)
            {
                return Ok(new { message = msg });
            }
            else
            {
                return Ok(subject);
            }
        }
        [HttpPut("{sSubjectID}")]
        public IActionResult UpdateSubject(string sSubjectID, [FromBody] TbSubjects updated)
        {
            bool success = _schoolService.UpdateSubject(sSubjectID, updated, out string msg);
            if (success)
            {
                return Ok(new { message = msg });
            }
            else
            {
                return BadRequest(new { message = msg });
            }
        }

        [HttpGet("{sTeacherID}")]
        public IActionResult GetTeacher(string sTeacherID)
        {
            var teacher = _schoolService.GetTeacher(sTeacherID, out string msg);
            if (teacher == null)
            {
                return Ok(new { message = msg });
            }
            else
            {
                return Ok(teacher);
            }
        }
        [HttpPut("{sTeacherID}")]
        public IActionResult UpdateTeacher(string sTeacherID, [FromBody] TbTeachers updated)
        {
            bool success = _schoolService.UpdateTeacher(sTeacherID, updated, out string msg);
            if (success)
            {
                return Ok(new { message = msg });
            }
            else
            {
                return BadRequest(new { message = msg });
            }
        }

        [HttpDelete("{sSubjectID}")]
        public IActionResult DeleteSubject(string sSubjectID)
        {
            bool success = _schoolService.DeleteSubject(sSubjectID, out string msg);

            if (!success)
            {
                return BadRequest(new { message = msg });
            }
            else
            {
                return Ok(new { message = msg });
            }
        }

        [HttpDelete("{sTeacherID}")]
        public IActionResult DeleteTeacher(string sTeacherID)
        {
            bool success = _schoolService.DeleteTeacher(sTeacherID, out string msg);

            if (!success)
            {
                return BadRequest(new { message = msg });
            }
            else
            {
                return Ok(new { message = msg });
            }
        }
    }
}

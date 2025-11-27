using backend2.Data;
using backend2.Models;
using Microsoft.EntityFrameworkCore;

namespace backend2.Service
{
    public interface ISchoolService
    {
        List<TbSubjects> GetSchoolByID(string sSubjectID);
        List<TbTeachers> GetAllTeachers();
        List<TbSubjects> GetAllSubjects();
        bool AddTeacher(TbTeachers teacher, out string message);
        bool AddSubject(TbSubjects subject, out string message);
        TbSubjects? GetSubject(string sSubjectID, out string message);
        bool UpdateSubject(string sSubjectID, TbSubjects updated, out string message);
        TbTeachers? GetTeacher(string sTeacherID, out string message);
        bool UpdateTeacher(string sTeacherID, TbTeachers updated, out string message);
        bool DeleteSubject(string sSubjectID, out string message);
        bool DeleteTeacher(string sTeacherID, out string message);
    }

    public class SchoolService : ISchoolService
    {
        private readonly MyDbContext _db;

        public SchoolService(MyDbContext db)
        {
            _db = db;
        }

        public List<TbSubjects> GetSchoolByID(string sSubjectID)
        {
            var a = _db.TbSubjects.Where(w => w.SSubjectId == sSubjectID).ToList();
            return a;
        }

        public List<TbTeachers> GetAllTeachers()
        {
            var teachers = _db.TbTeachers.Where(t => !t.IsDeleted).ToList();
            return teachers;
        }

        public List<TbSubjects> GetAllSubjects()
        {
            var subjects = _db.TbSubjects.Where(s => !s.IsDeleted).ToList();
            return subjects;
        }

        public bool AddTeacher(TbTeachers teacher, out string message)
        {
            //ตรวจสอบว่ามีค่า sTeacherId ไหม
            if (string.IsNullOrEmpty(teacher.STeacherId))
            {
                message = "โปรดใส่รหัสอาจารย์";
                return false;
            }

            //ตรวจสอบว่า pk ซ้ำไหม
            bool exists = _db.TbTeachers.Any(t => t.STeacherId == teacher.STeacherId);
            if (exists)
            {
                message = "รหัสอาจารย์ซ้ำ";
                return false;
            }

            //รหัสวิชาซ้ำกันไหม เฉพาะอันที่ยังไม่ถูกลบ
            bool exists_subject = _db.TbTeachers.Any(t => t.SSubjectId == teacher.SSubjectId && !t.IsDeleted);
            if (exists_subject)
            {
                message = "รหัสวิชานี้มีอาจารย์สอนอยู่แล้ว";
                return false;
            }

            //เพิ่มข้อมูล
            try
            {
                // set ให้ IsDeleted = false
                teacher.IsDeleted = false;
                teacher.DUpdate = DateTime.Now;
                _db.TbTeachers.Add(teacher);
                _db.SaveChanges();

                message = "เพิ่มข้อมูลสำเร็จ";
                return true;
            }
            catch (Exception ex)
            {
                message = "เกิดข้อผิดพลาด: " + ex.Message;
                return false;
            }
        }

        public bool AddSubject(TbSubjects subject, out string message)
        {
            //ตรวจสอบว่า SSubjectId ว่างไหม
            if (string.IsNullOrEmpty(subject.SSubjectId))
            {
                message = "โปรดใส่รหัสอาจารย์";
                return false;
            }

            //ตรวจสอบว่า pk ซ้ำไหม
            bool exists = _db.TbSubjects.Any(t => t.SSubjectId == subject.SSubjectId);
            if (exists)
            {
                message = "รหัสวิชาซ้ำ";
                return false;
            }
            try
            {
                // set ให้ IsDeleted = false
                subject.IsDeleted = false;
                subject.DUpdate = DateTime.Now;
                _db.TbSubjects.Add(subject);
                _db.SaveChanges();
                message = "เพิ่มข้อมูลสำเร็จ";
                return true;
            }
            catch (Exception ex)
            {
                message = "เกิดข้อผิดพลาด: " + ex.Message;
                return false;
            }
        }

        //เรียก object วิชา ตาม id return object ตัวเดียว
        public TbSubjects? GetSubject(string sSubjectID, out string message)
        {
            var subject = _db.TbSubjects.FirstOrDefault(s => s.SSubjectId == sSubjectID && !s.IsDeleted);
            if (subject == null)
            {
                message = "ไม่พบรายวิชาที่ตามหา";
                return null;
            }
            else
            {
                message = "พบรายวิชาที่ตามหา";
                return subject;
            }
        }

        public bool UpdateSubject(string sSubjectID, TbSubjects updated, out string message)
        {
            var subject = GetSubject(sSubjectID, out string msg);
            if (subject == null)
            {
                message = msg;
                return false;
            }

            try
            {
                subject.SName = updated.SName;
                subject.NCredit = updated.NCredit;
                subject.DUpdate = DateTime.Now;
                _db.SaveChanges();
                message = "แก้ไขข้อมูลสำเร็จ";
                return true;
            }
            catch (Exception ex)
            {
                message = "เกิดข้อผิดพลาด: " + ex.Message;
                return false;
            }
        }

        public TbTeachers? GetTeacher(string sTeacherID, out string message)
        {
            var teacher = _db.TbTeachers.FirstOrDefault(t => t.STeacherId == sTeacherID && !t.IsDeleted);
            if (teacher == null)
            {
                message = "ไม่พบอาจารย์ที่ตามหา";
                return null;
            }
            else
            {
                message = "พบอาจารย์ที่ตามหา";
                return teacher;
            }
        }

        public bool UpdateTeacher(string sTeacherID, TbTeachers updated, out string message)
        {
            var teacher = GetTeacher(sTeacherID, out string msg);
            if (teacher == null)
            {
                message = msg;
                return false;
            }
            //รหัสวิชาซ้ำกันไหม เฉพาะอันที่ยังไม่ถูกลบ
            bool exists_subject = _db.TbTeachers.Any(t => t.SSubjectId == updated.SSubjectId && t.STeacherId != sTeacherID && !t.IsDeleted);
            if (exists_subject)
            {
                message = "รหัสวิชานี้มีอาจารย์สอนอยู่แล้ว";
                return false;
            }
            try
            {
                teacher.SFirstName = updated.SFirstName;
                teacher.SLastName = updated.SLastName;
                teacher.SGender = updated.SGender;
                teacher.DBirthDate = updated.DBirthDate;
                teacher.SAddress = updated.SAddress;
                teacher.SPhoneNumber = updated.SPhoneNumber;
                teacher.SSubjectId = updated.SSubjectId;
                teacher.DUpdate = DateTime.Now;
                _db.SaveChanges();
                message = "แก้ไขข้อมูลสำเร็จ";
                return true;
            }
            catch (Exception ex)
            {
                message = "เกิดข้อผิดพลาด: " + ex.Message;
                return false;
            }
        }

        public bool DeleteSubject(string sSubjectID, out string message)
        {
            var subject = GetSubject(sSubjectID, out string msg);
            if (subject == null)
            {
                message = "ไม่พบรายวิชานี้";
                return false;
            }

            try
            {
                subject.IsDeleted = true;
                subject.DDelete = DateTime.Now;
                _db.SaveChanges();
                message = "ลบข้อมูลสำเร็จ";
                return true;
            }
            catch (Exception ex)
            {
                message = "เกิดข้อผิดพลาด: " + ex.Message;
                return false;
            }
        }

        public bool DeleteTeacher(string sTeacherID, out string message)
        {
            var teacher = GetTeacher(sTeacherID, out string msg);
            if (teacher == null)
            {
                message = "ไม่พบาอาจารย์ท่านนี้";
                return false;
            }

            try
            {
                teacher.IsDeleted = true;
                teacher.DDelete = DateTime.Now;
                _db.SaveChanges();
                message = "ลบข้อมูลสำเร็จ";
                return false;
            }
            catch (Exception ex)
            {
                message = "เกิดข้อผิดพลาด: " + ex.Message;
                return true;
            }
        }
    }
}

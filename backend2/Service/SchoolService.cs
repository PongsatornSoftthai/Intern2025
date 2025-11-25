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
        bool AddTeacher(TbTeachers teacher , out string message);
        bool AddSubject(TbSubjects subject, out string message);
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

        public bool AddTeacher(TbTeachers teacher,out string message)
        {
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
            try
            {
                teacher.IsDeleted = false;
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
                subject.IsDeleted = false;
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

    }
}

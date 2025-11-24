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
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SchoolProject_WebAPI.Models;

namespace SchoolProject_WebAPI.Data
{
    public interface IRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        //STUDENT
        Task<Student[]> GetAllStudentsAsync(bool includeSubject);        
        Task<Student[]> GetStudentsAsyncBySubjectId(int subjectId, bool includeSubject);
        Task<Student> GetStudentAsyncById(int studentId, bool includeSubject);
        
        //TEACHER
        Task<Teacher[]> GetAllTeachersAsync(bool includeSubject);
        Task<Teacher> GetTeacherAsyncById(int teacherId, bool includeSubject);
        Task<Teacher[]> GetTeachersAsyncByStudentId(int studentId, bool includeSubject);


    }
}
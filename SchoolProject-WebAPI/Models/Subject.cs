using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolProject_WebAPI.Models
{
    public class Subject
    {
        public Subject(){}
        public Subject(int id, string name, int teacherId)
        {
            Id = id;
            Name = name;
            TeacherId = teacherId;
        }

        // It can be only one teacher for an Subject
        // But a teacher can teach multiple Subject
        public int Id { get; set; }
        public string Name { get; set; }
        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }

        public IEnumerable<StudentSubject> StudentsSubjects { get; set; }

    }
}
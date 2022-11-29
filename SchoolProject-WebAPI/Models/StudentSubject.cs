using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolProject_WebAPI.Models
{
    public class StudentSubject
    {

        public StudentSubject(){}
        public StudentSubject(int studentId,int subjectId)
        {
            StudentId = studentId;
            SubjectId = subjectId;
        }

        // N to N relation between student and Subject
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public int SubjectId { get; set; }
        
        public Subject Subject { get; set; }
    }
}
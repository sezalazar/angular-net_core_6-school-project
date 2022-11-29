import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Student } from 'src/app/Models/Student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  public modalRef?: BsModalRef;
  public studentForm: FormGroup;
  public title = 'Students';
  public selectedStudent: Student;
  public selectedStudentUsingAny: string;
  public mode = 'post';

  // For testing proposes not using the service
  // public students = [
  //   { id: 1, name: 'Gabriel', surname: 'Batistuta', phone: 63102025},
  //   { id: 2, name: 'Ariel', surname: 'Ortega', phone: 63102026},
  //   { id: 3, name: 'Hernán', surname: 'Crespo', phone: 63102029},
  //   { id: 4, name: 'Roberto', surname: 'Ayala', phone: 63102028},
  // ];

    public students: Student[];



  // !Modal Part
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  constructor(private fb: FormBuilder
    , private modalService: BsModalService
    , private studentService: StudentService
    // Router: Para poder redireccionar a otra página desde el .ts (desde el html se hace con routerLink)
    , private router: Router
    ) {
    this.createForm();
   }

  ngOnInit(): void {
    this.loadStudents();
  }



  createForm(){
    this.studentForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  // * Service get all students
  loadStudents(){
    this.studentService.getAllStudents().subscribe(
      (students: Student[]) => {this.students = students;},

      // TODO: Use error library
      (error: any         ) => { console.error(error)}
    );
  }

  // * Service save or update new student
  saveStudent(student : Student){
    (student.id !== 0) ? this.mode = 'put' : this.mode = 'post';

    // TODO: Use this.mode
    if (student.id!==0)
    {
      this.studentService.put(student).subscribe(
        (result: Student) => {
            console.log("rerre: " + result)
            this.loadStudents(); //In order to refresh the page after updating info
          },
        (error: any) => { console.log(error)}
      );
    }


    if (student.id===0)
    {
      this.studentService.post(student).subscribe(
        (result: Student) => {
            console.log("rerre: " + result)
            this.loadStudents(); //In order to refresh the page after inserting info

            // In order to return to main students page
            // this.selectedStudent = null;
            // this.router.navigate(['/students']);
          },
        (error: any) => { console.error(error)}
      );
    }


  }

  submitStudent(){
    this.saveStudent(this.studentForm.value);
  }

  selectStudent(student: Student){
    this.selectedStudent = student;
    // We can use patchValue because Student class has the same attributes names as in the form
    this.studentForm.patchValue(student);
  }

  createStudent(){
    this.selectedStudent = new Student();

    this.studentForm.patchValue(this.selectedStudent);
  }

  desactivateStudent(id: number){
    this.studentService.delete(id).subscribe(
      // TODO: Change any to a model
      (model: any) =>
              {
                  console.log(model),
                  this.loadStudents();
              },
      (error: any) => { console.error(error)}
    )
  }


  volver(){
    // *strictNullChecks property needed to be false in tsconfig.json
    this.selectedStudent = null;
  }

  selectStudentUsingAny(student: any){
    this.selectedStudentUsingAny = student.name;
  }

  volverUsingAny(){
    this.selectedStudentUsingAny = '';
  }

}

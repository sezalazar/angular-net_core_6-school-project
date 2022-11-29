import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Teacher } from 'src/app/Models/Teacher';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  public modalRef?: BsModalRef;
  public title = 'Teachers';
  public teacherForm: FormGroup;
  // public personSelected: string = '';
  public personSelected: Teacher;
  public mode = 'post';

  // For testing proposes not using the service
  // public teachers = [
  //   { id: 1, name: 'Gabriel', speciality: 'Math'},
  //   { id: 2, name: 'Ariel', speciality: 'History'},
  //   { id: 3, name: 'Hernán', speciality: 'Geography'},
  //   { id: 4, name: 'Roberto', speciality: 'English'},
  // ];

  public teachers: Teacher[];

  constructor(private fb: FormBuilder,
      private modalService: BsModalService,
      private teacherService: TeacherService
      // Router: Para poder redireccionar a otra página desde el .ts (desde el html se hace con routerLink)
    , private router: Router) {
      this.createForm();
    }

  ngOnInit(): void {
    this.loadTeachers();
  }

  createForm(){
    this.teacherForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
    });
  }



  loadTeachers(){
    this.teacherService.getAllTeachers().subscribe(
      (teachers: Teacher[]) => { this.teachers = teachers},
      (error: any) => { console.error(error); },

    );
  }



  // * Service save or update new teacher
  saveTeacher(teacher : Teacher){
    (teacher.id !== 0) ? this.mode = 'put' : this.mode = 'post';

    // TODO: Use this.mode
    if (teacher.id!==0)
    {
      this.teacherService.put(teacher).subscribe(
        (result: Teacher) => {
            console.log("rerre: " + result)
            this.loadTeachers(); //In order to refresh the page after updating info
            this.personSelected = null;
            this.router.navigate(['/teachers']);
          },
        (error: any) => { console.error(error)}
      );
    }

    if (teacher.id===0)
    {
      this.teacherService.post(teacher).subscribe(
        (result: Teacher) => {
            console.log("rerre: " + result)
            this.loadTeachers(); //In order to refresh the page after updating info
            this.personSelected = null;
            this.router.navigate(['/teachers']);
          },
        (error: any) => { console.error(error)}
      );
    }


  }

  submitTeacher(){
    this.saveTeacher(this.teacherForm.value);
  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  selectPerson(teacher: Teacher){
    this.personSelected = teacher;
    this.teacherForm.patchValue(teacher);
  }

  createTeacher(){
    this.personSelected = new Teacher();
    this.teacherForm.patchValue(this.personSelected);
  }

  volver(){
    this.personSelected = null;
  }



}

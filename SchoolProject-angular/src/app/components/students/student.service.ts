import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/Models/Student';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/student/';

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getById(id: number): Observable<Student>{
    return this.http.get<Student>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  post(student: Student){
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, student)
  }

  put(student: Student){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${student.id}`, student)
  }

  delete(id: number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

    // ! The type of Observable and the type of http method should be the same
  // Observable<Mascota[]>
  // ... method<Mascota[]>
}

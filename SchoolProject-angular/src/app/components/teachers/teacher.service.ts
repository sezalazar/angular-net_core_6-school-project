import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/Models/Teacher';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/teacher/';

  constructor(private http: HttpClient) { }

  getAllTeachers(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getById(id: number): Observable<Teacher>{
    return this.http.get<Teacher>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  post(teacher: Teacher){
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, teacher)
  }

  put(teacher: Teacher){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${teacher.id}`, teacher)
  }

  delete(id: number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

    // ! The type of Observable and the type of http method should be the same
  // Observable<Mascota[]>
  // ... method<Mascota[]>
}

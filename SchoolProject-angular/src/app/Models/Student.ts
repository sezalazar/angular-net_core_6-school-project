// export class Student{
//   id?: number;
//   name?: string;
//   surname?: string;
//   phone?: number;
// }


export class Student{

  // ! We add a constructor to clean the fields of a previous selected student
  constructor() {
    this.id = 0;
    this.name = '';
    this.surname = '';
    this.phone = 0;
  }
  id?: number;
  name?: string;
  surname?: string;
  phone?: number;
}

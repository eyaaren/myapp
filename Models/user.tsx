export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
  
    constructor(id: number, firstName: string, lastName: string, username: string, password: string) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.password = password;
    }
  }
  
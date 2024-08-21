export class LoginRequest {
    email: string;
    password: string;
  
    constructor(email: string, password: string) {
      this.email = email;
      this.password = password;
    }
  }
  
  export class LoginResponse {
    token: string;
    userId: number;  

    constructor(token: string, userId: number) {
        this.token = token;
        this.userId = userId;
    }
  }
  
export class ForgetPasswordRequest {
    email: string;
  
    constructor(email: string) {
      this.email = email;
    }
  }
  
  export class ForgetPasswordResponse {
    // Define properties of the response if needed
    message: string;
  
    constructor(message: string) {
      this.message = message;
    }
  }
  
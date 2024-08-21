export class ResetPasswordRequest {
    email: string;
    token: string;
    newPassword: string;
  
    constructor(email: string, token: string, newPassword: string) {
      this.email = email;
      this.token = token;
      this.newPassword = newPassword;
    }
  }
  
  export class ResetPasswordResponse {
    // Define properties of the response if needed
    message: string;
  
    constructor(message: string) {
      this.message = message;
    }
  }
  
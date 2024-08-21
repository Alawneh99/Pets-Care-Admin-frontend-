export class signup {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string; // ISO 8601 format
    profileImage: string;
    userRoleID: number;
    password: string;
  
    constructor(
      firstName: string,
      lastName: string,
      email: string,
      phone: string,
      birthDate: string,
      profileImage: string,
      userRoleID: number,
      password: string
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phone = phone;
      this.birthDate = birthDate;
      this.profileImage = profileImage;
      this.userRoleID = userRoleID;
      this.password = password;
    }
  }
  
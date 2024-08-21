export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: Date;
    profileImage?: string; // Optional property
    userRoleID?: number; // Optional property
  
    constructor(
      id: number,
      firstName: string,
      lastName: string,
      email: string,
      phone: string,
      birthDate: Date,
      profileImage?: string,
      userRoleID?: number
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phone = phone;
      this.birthDate = birthDate;
      this.profileImage = profileImage;
      this.userRoleID = userRoleID;
    }
  }
  
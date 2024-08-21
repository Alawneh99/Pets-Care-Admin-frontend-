export enum Gender {
    Male,
    Female,
    Other
  }
  
  export enum PetType {
    Dog,
    Cat,
    Bird,
    Other
  }
  
  export class Pet {
    id: number;
    nickName: string;
    gender: Gender;
    petType: PetType;
    image: string;
    age: number;
    birthDate: string; // Use string for DateOnly
    ownerUserId?: number;
  
    constructor(
      id: number,
      nickName: string,
      gender: Gender,
      petType: PetType,
      image: string,
      age: number,
      birthDate: string,
      ownerUserId?: number
    ) {
      this.id = id;
      this.nickName = nickName;
      this.gender = gender;
      this.petType = petType;
      this.image = image;
      this.age = age;
      this.birthDate = birthDate;
      this.ownerUserId = ownerUserId;
    }
  }
  
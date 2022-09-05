import {User} from "../auth/user";

export class UserInfo extends User{
  // username: string;
  profile: UserProfile;
  work: UserWork;
  contacts: UserContacts;
  // social: UserSocial;
  settings: UserSettings;
  constructor() {
    super();
    // this.username = '';
    this.profile = new UserProfile();
    this.work = new UserWork();
    this.contacts = new UserContacts();
    this.settings = new UserSettings();
  }
}

export class UserProfile {
  name: string;
  surname: string;
  birthday: any;
  gender: string;
  image: string;
  constructor() {
    this.name = '';
    this.surname = '';
    this.birthday = new Date();
    this.gender = '';
    this.image = '';
  }
}

export class UserWork {
  company: string;
  position: string;
  salary: number;
  constructor() {
    this.company = '';
    this.position = '';
    this.salary = 0;
  }
}

export class UserContacts{
  contactEmail: string;
  phone: string;
  address: string;
  constructor() {
    this.contactEmail = '';
    this.phone = '';
    this.address = '';
  }
}

export class UserSocial {
  facebook: string;
  twitter: string;
  google: string;
  constructor() {
  }
}

export class UserSettings{
  isActive: boolean;
  isDeleted: boolean;
  registrationDate: Date;
  joinedDate: Date;
  constructor() {
    this.isActive = true;
    this.isDeleted = false;
    this.registrationDate = new Date();
    this.joinedDate = new Date();
  }
}

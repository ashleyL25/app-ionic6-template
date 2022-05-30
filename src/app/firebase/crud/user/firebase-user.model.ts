import { ShellModel } from '../../../shell/data-store';

export class FirebaseSkillModel extends ShellModel {
  id: string;
  name: string;

  constructor() {
    super();
  }
}

export class FirebaseUserModel extends ShellModel {
  id: string;
  avatar: string;
  name: string;
  lastname: string;
  email: string;
  phone: number;
  age?: number;
  birthdate: number; // timestamp
  skills: Array<any> = [
    '',
    '',
    ''
  ];
  languages: {
    spanish: number,
    english: number,
    french: number
  } = {
    spanish: 0,
    english: 0,
    french: 0
  };

  constructor() {
    super();
  }
}
export class FirebaseCombinedUserModel extends FirebaseUserModel {
  skills: Array<FirebaseSkillModel> = [
    new FirebaseSkillModel(),
    new FirebaseSkillModel(),
    new FirebaseSkillModel()
  ];

  constructor() {
    super();
  }
}

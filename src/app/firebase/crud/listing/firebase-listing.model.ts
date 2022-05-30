import { ShellModel } from '../../../shell/data-store';

export class FirebaseListingItemModel extends ShellModel {
  image: string;
  name: string;
  birthdate: number; // timestamp
  lastname: string;
  age: number;
  id: string;

  constructor() {
    super();
  }
}

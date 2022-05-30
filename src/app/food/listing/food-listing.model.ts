import { ShellModel } from '../../shell/data-store';

export class FoodItemModel {
  icon: string;
  image: string;
  name: string;
  address: string;
  priceRange: number;
  rating: number;
  tags: Array<string> = [
    '',
    '',
    ''
  ];
  pictures: Array<string> = [
    '',
    '',
    '',
    '',
    ''
  ];
}

export class FoodListingModel extends ShellModel {
  items: Array<FoodItemModel> = [
    new FoodItemModel(),
    new FoodItemModel(),
    new FoodItemModel(),
    new FoodItemModel()
  ];

  constructor() {
    super();
  }
}

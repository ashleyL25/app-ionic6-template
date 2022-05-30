import { ShellModel } from '../../shell/data-store';

export class TravelItemModel {
  image: string;
  icon: string;
  name: string;
  description: string;
  category: string;
  address: string;
  rating: number;
  reviewsCount: number;
}

export class TravelListingModel extends ShellModel {
  items: Array<TravelItemModel> = [
    new TravelItemModel(),
    new TravelItemModel(),
    new TravelItemModel(),
    new TravelItemModel()
  ];

  constructor() {
    super();
  }
}

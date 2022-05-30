import { ShellModel } from '../../shell/data-store';

export class RealEstateItemModel {
  slug: string;
  picture: string;
  address: string;
  price: string;
  liked: boolean;
  accommodations: {
    guests: number,
    bedrooms: number,
    beds: number,
    bathrooms: number
  };
  amenities: Array<{name: string, icon: string}> = [
    {
      name: '',
      icon: ''
    },
    {
      name: '',
      icon: ''
    }
  ];
}

export class RealEstateListingModel extends ShellModel {
  items: Array<RealEstateItemModel> = [
    new RealEstateItemModel(),
    new RealEstateItemModel(),
    new RealEstateItemModel(),
    new RealEstateItemModel()
  ];

  constructor() {
    super();
  }
}

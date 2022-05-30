import { ShellModel } from '../../shell/data-store';

export class FashionItemModel {
  price: number;
  salePrice: number;
  image: string;
  squareImage: string;
  showcaseImages: Array<string>;
  name: string;
  style: string;
  relatedProducts: Array<string>;
}

export class FashionListingModel extends ShellModel {
  items: Array<FashionItemModel> = [
    new FashionItemModel(),
    new FashionItemModel(),
    new FashionItemModel(),
    new FashionItemModel()
  ];

  constructor() {
    super();
  }
}

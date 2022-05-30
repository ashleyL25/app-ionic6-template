import { ShellModel } from '../../shell/data-store';

export class FashionDetailsModel extends ShellModel {
  showcaseImages: Array<{type: string, source: string}> = [
    {
      type: '',
      source: ''
    },
    {
      type: '',
      source: ''
    },
    {
      type: '',
      source: ''
    }
  ];
  name: string;
  brand: string;
  price: number;
  salePrice: number;
  colorVariants: Array<{name: string, value: string, default: boolean}> = [
    {
      name: '',
      value: '',
      default: false
    },
    {
      name: '',
      value: '',
      default: false
    },
    {
      name: '',
      value: '',
      default: false
    }
  ];
  sizeVariants: Array<{name: string, value: string, default: boolean}> = [
    {
      name: '',
      value: '',
      default: false
    },
    {
      name: '',
      value: '',
      default: false
    },
    {
      name: '',
      value: '',
      default: false
    }
  ];
  description: string;
  careInstructions: string;
  upc: string;
  relatedProducts: Array<{id: number}> = [
    {
      id: null
    },
    {
      id: null
    }
  ];

  constructor() {
    super();
  }
}

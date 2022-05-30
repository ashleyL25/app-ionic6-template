import { ShellModel } from '../../shell/data-store';

export class FoodDetailsModel extends ShellModel {
  icon: string;
  slug: string;
  showcaseImage: string;
  name: string;
  shortName: string;
  style: string;
  priceRange: number;
  avgRating: number;
  ratings: Array<{concept: string, rate: number}> = [
    {
      concept: '',
      rate: null
    },
    {
      concept: '',
      rate: null
    },
    {
      concept: '',
      rate: null
    }
  ];
  reviewsCount: number;
  openHours: Array<{day: string, open: boolean, hourFrom: string, hourTo: string}> = [
    {
      day: '',
      open: true,
      hourFrom: '',
      hourTo: ''
    },
    {
      day: '',
      open: true,
      hourFrom: '',
      hourTo: ''
    },
    {
      day: '',
      open: false,
      hourFrom: '',
      hourTo: ''
    }
  ];
  location: {
    address: string,
    city: string,
    latlng: string,
    mapImage: string
  };
  tags: Array<string> = [
    '',
    '',
    ''
  ];
  usersPictures: Array<string> = [
    '',
    '',
    '',
    '',
    '',
    ''
  ];
  popularDishes: Array<{name: string, rate: number, votesCount: number}> = [
    {
      name: '',
      rate: null,
      votesCount: null
    },
    {
      name: '',
      rate: null,
      votesCount: null
    }
  ];
  reviews: Array<{
    user: {image: string, name: string, reviewsCount: number, points: number},
    avgRating: number,
    ratings: Array<{concept: string, rate: number}>,
    publishedAt: string,
    message: string
  }> = [
    {
      user: {
        image: '',
        name: '',
        reviewsCount: null,
        points: null
      },
      avgRating: null,
      ratings: [
        {
          concept: '',
          rate: null
        },
        {
          concept: '',
          rate: null
        },
        {
          concept: '',
          rate: null
        }
      ],
      publishedAt: null,
      message: ''
    },
    {
      user: {
        image: '',
        name: '',
        reviewsCount: null,
        points: null
      },
      avgRating: null,
      ratings: [
        {
          concept: '',
          rate: null
        },
        {
          concept: '',
          rate: null
        },
        {
          concept: '',
          rate: null
        }
      ],
      publishedAt: null,
      message: ''
    },
    {
      user: {
        image: '',
        name: '',
        reviewsCount: null,
        points: null
      },
      avgRating: null,
      ratings: [
        {
          concept: '',
          rate: null
        },
        {
          concept: '',
          rate: null
        },
        {
          concept: '',
          rate: null
        }
      ],
      publishedAt: null,
      message: ''
    }
  ];
  popularRecipes: Array<{
    showcaseImage: string,
    name: string,
    chef: {name: string, image: string},
    difficulty: string,
    time: string,
    calories: string,
    chefExtract: string
  }> = [
    {
      showcaseImage: '',
      name: '',
      chef: {
        name: '',
        image: ''
      },
      difficulty: '',
      time: '',
      calories: '',
      chefExtract: ''
    }
  ];

  constructor() {
    super();
  }
}

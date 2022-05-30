import * as dayjs from 'dayjs';

import { ShellModel } from '../../shell/data-store';

export class DealsDetailsModel extends ShellModel {
  showcaseImages: Array<string> = [
    '',
    '',
    ''
  ];
  previewImage: string;
  logo: string;
  name: string;
  code: string;
  description: string;
  // Default mock value
  // expirationDate = '03/03/2019';
  expirationDate: string = dayjs().add(5, 'day').format('MM/DD/YYYY HH:mm:ss') as string;
  relatedDeals: Array<{logo: string, name: string, description: string}> = [
    {
      logo: '',
      name: '',
      description: ''
    },
    {
      logo: '',
      name: '',
      description: ''
    },
    {
      logo: '',
      name: '',
      description: ''
    }
  ];

  constructor() {
    super();
  }
}

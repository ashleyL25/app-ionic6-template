export const REDIRECT_ROUTES = [
  {
    from: '/',
    to: '/walkthrough'
  },
  {
    from: '/auth',
    to: '/auth/login'
  },
  {
    from: '/app',
    to: '/app/categories'
  },
  {
    from: '/firebase',
    to: '/firebase/auth/sign-in'
  },
  {
    from: '/firebase/auth',
    to: '/firebase/auth/sign-in'
  },
  // We don't store state in the server, redirect to sign-in.
  // [/sign-in] should redirect to profile if the user is logged in the Browser
  {
    from: '/firebase/auth/profile',
    to: '/firebase/auth/sign-in'
  },
  {
    from: '/firebase/crud',
    to: '/firebase/crud/listing'
  },
  {
    from: '/showcase',
    to: '/showcase/app-shell'
  }
];

export const APP_ROUTES = [
  '/walkthrough',
  '/getting-started',
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/app/categories',
  '/app/categories/fashion',
  '/app/categories/fashion/:productId',
  '/app/categories/food',
  '/app/categories/food/:productId',
  '/app/categories/travel',
  '/app/categories/travel/:productId',
  '/app/categories/deals',
  '/app/categories/deals/:productId',
  '/app/categories/real-estate',
  '/app/categories/real-estate/:productId',
  '/app/user',
  '/app/user/friends',
  '/app/notifications',
  '/firebase/auth/sign-in',
  '/firebase/auth/sign-up',
  '/firebase/crud/listing',
  '/firebase/crud/details/:id',
  '/contact-card',
  '/forms-and-validations',
  '/forms-filters',
  '/maps',
  '/video-playlist',
  '/page-not-found',
  '/showcase/app-shell',
  '/showcase/app-shell/aspect-ratio',
  '/showcase/app-shell/image-shell',
  '/showcase/app-shell/text-shell',
  '/showcase/app-shell/simple-data-binding',
  '/showcase/app-shell/data-store-basic',
  '/showcase/app-shell/data-store-list',
  '/showcase/app-shell/data-store-subset',
  '/showcase/app-shell/data-store-combined',
  '/showcase/app-shell/data-store-multiple',
  '/showcase/app-shell/data-store-pagination',
  '/showcase/app-shell/data-store-stacked',
  '/showcase/app-shell/data-store-dependant',
  '/showcase/route-resolvers-ux',
  '/showcase/route-resolvers-ux/blocking-resolvers',
  '/showcase/route-resolvers-ux/non-blocking-resolvers',
  '/showcase/route-resolvers-ux/progressive-shell-resolvers',
  '/showcase/custom-components'
];

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ionicthemes.ionic5fullapp',
  appName: 'Ionic5FullApp',
  webDir: 'dist/app/browser',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
    CapacitorFirebaseAuth: {
      providers: [
        "google.com",
        "twitter.com",
        "facebook.com",
        "apple.com"
      ],
      languageCode: "en",
      nativeAuth: false
    }
  }
};

export default config;

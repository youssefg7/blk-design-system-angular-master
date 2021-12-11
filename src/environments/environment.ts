// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBepH65QB_t2-W11tQ9RhWByctnZ17cgBM",
    authDomain: "nazamly-2021.firebaseapp.com",
    databaseURL: "https://nazamly-2021-default-rtdb.firebaseio.com",
    projectId: "nazamly-2021",
    storageBucket: "nazamly-2021.appspot.com",
    messagingSenderId: "1090393277214",
    appId: "1:1090393277214:web:f8853478e25034ce8f3f0f",
    measurementId: "${config.measurementId}"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

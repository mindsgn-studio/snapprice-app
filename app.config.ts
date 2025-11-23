module.exports = {
    expo: {
        name: "snap-price",
        slug: "snap-price",
        version: "0.0.13",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "snap-price",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: false,
            bundleIdentifier: "mindsgn.studio.snap-price",
            buildNumber: "12",
            infoPlist: {
            ITSAppUsesNonExemptEncryption: false
        },
        appleTeamId: "B3U8UM2966"
    },
    android: {
        adaptiveIcon: {
            backgroundColor: "#ffffff",
            foregroundImage: "./assets/images/android-icon-foreground.png",
            backgroundImage: "./assets/images/android-icon-background.png",
            monochromeImage: "./assets/images/android-icon-monochrome.png"
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
        package: "mindsgn.studio.snap.price",
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    plugins: [
      "expo-notifications",
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ],
      [
        "expo-sqlite",
        {
          "enableFTS": true,
          "useSQLCipher": true,
          "android": {
            "enableFTS": false,
            "useSQLCipher": false
          },
          "ios": {
            "customBuildFlags": [
              "-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1"
            ]
          }
        }
      ],
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": "ca-app-pub-6562023225790995~3067394570",
          "iosAppId": "ca-app-pub-6562023225790995~8910528367"
        }
      ],
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ],
      "expo-web-browser"
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },
    extra: {
      router: {},
      eas: {
        projectId: "564b8fd6-516b-4213-af02-0f168d8b67f2"
      }
    }
  }
};
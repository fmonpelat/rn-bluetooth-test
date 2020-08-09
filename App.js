import React, {useState, useEffect} from "react";
import { Image } from "react-native";
// import { AppLoading } from "expo";
import { useFonts } from '@use-expo/font';
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';


// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { Images, articles, argonTheme } from "./constants";


// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo
];

// cache product images
// articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const downloadAssets = async () => { 
  return Promise.all([...cacheImages(assetImages)]);
};


/**
 * Load and use resources that need to be loaded async by Expo SDK
 */
const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [isLoaded] = useFonts({
    'ArgonExtra': require('./assets/font/argon.ttf'),
  });

  /**
   * Load resources and prevents SplashScreen from hiding until completed
   */
  useEffect( () => {

    const showSplashScreen = async () => {
      await SplashScreen.preventAutoHideAsync();
    }
    showSplashScreen();

    const loadAsyncResources = async () => {
      try {
        await downloadAssets();
      } catch (error) {
        console.warn(error);
      }
    };
    loadAsyncResources();
    setIsReady(true);

  }, []);

  useEffect(() => {
  	// Once our data is ready, hide the Splash Screen
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    }
    if (isLoaded && isReady) hideSplashScreen();
  }, [isReady,isLoaded])

  if(!isReady)
  {
    console.log("loading is not complete!");
    console.log("is ready: " + isReady);
    console.log("is loaded: " + isLoaded);
    return null;
  }
  console.log("loading is complete!");
  return (
    <NavigationContainer>
      <GalioProvider theme={argonTheme}>
        <Block flex>
          <Screens />
        </Block>
      </GalioProvider>
    </NavigationContainer>
  );

};


export default App;















// // export default class App extends React.Component {

// //   state = {
// //     appIsReady: false,
// //     fontIsReady: false
// //   };

// //   async componentDidMount() {
// //     // Prevent native splash screen from autohiding
// //     try {
// //       await SplashScreen.preventAutoHideAsync();
// //     } catch (e) {
// //       console.warn(e);
// //     }
// //     this.prepareResources();
// //   }

// //   /**
// //    * Method that serves to load resources and make API calls
// //    */
// //   prepareResources = async () => {
// //     //await performAPICalls();
// //     await downloadAssets();

// //     let [fontsLoaded] = useFonts({
// //       'ArgonExtra': require('./assets/font/argon.ttf'),
// //     });

// //     this.setState({ appIsReady: true, fontIsReady:true }, async () => {
// //       await SplashScreen.hideAsync();
// //     });
// //   };

// //   render() {
// //     if ( !this.state.appIsReady && !this.state.fontIsReady ) {
// //       return(
// //         <View style={{ flex: 1 }}>
// //           <Image
// //             source={require('./assets/splash.png')}
// //             // onLoad={this._cacheResourcesAsync} if we have in our app more images to cache
// //           />
// //         </View>
// //       );
// //     }

// //     return (
// //       <NavigationContainer>
// //          <GalioProvider theme={argonTheme}>
// //            <Block flex>
// //              <Screens />
// //            </Block>
// //          </GalioProvider>
// //       </NavigationContainer>
// //     );
// //   }
// // }

// // Put any code you need to prepare your app in these functions
// //async function performAPICalls() {}
// async function downloadAssets() {
//   return Promise.all([...cacheImages(assetImages)]);
// }

// export default props => {
//   const [isLoadingComplete, setLoading] = useState(false);
//   let [fontsLoaded] = useFonts({
//     'ArgonExtra': require('./assets/font/argon.ttf'),
//   });

//   function _loadResourcesAsync() {
//     return Promise.all([...cacheImages(assetImages)]);
//   }

//   function _handleLoadingError(error) {
//     // In this case, you might want to report the error to your error
//     // reporting service, for example Sentry
//     console.warn(error);
//   };

//  function _handleFinishLoading() {
//     setLoading(true);
//   };

//   if(!fontsLoaded && !isLoadingComplete) {
//     return (
//       // <AppLoading
//       //   startAsync={_loadResourcesAsync}
//       //   onError={_handleLoadingError}
//       //   onFinish={_handleFinishLoading}
//       // />

//     );
//   } else if(fontsLoaded) {
//     return (
//       <NavigationContainer>
//         <GalioProvider theme={argonTheme}>
//           <Block flex>
//             <Screens />
//           </Block>
//         </GalioProvider>
//       </NavigationContainer>
//     );
//   }
// }

// // export default class App extends React.Component {
// //   state = {
// //     isLoadingComplete: false
// //   };

// //   render() {
// //     if (!this.state.isLoadingComplete) {
// //       return (
// //         <AppLoading
// //           startAsync={this._loadResourcesAsync}
// //           onError={this._handleLoadingError}
// //           onFinish={this._handleFinishLoading}
// //         />
// //       );
// //     } else {
// //       return (
// //         <NavigationContainer>
// //           <GalioProvider theme={argonTheme}>
// //             <Block flex>
// //               <Screens />
// //             </Block>
// //           </GalioProvider>
// //         </NavigationContainer>
// //       );
// //     }
// //   }

// //   _loadResourcesAsync = async () => {
// //     return Promise.all([...cacheImages(assetImages)]);
// //   };

// //   _handleLoadingError = error => {
// //     // In this case, you might want to report the error to your error
// //     // reporting service, for example Sentry
// //     console.warn(error);
// //   };

// //   _handleFinishLoading = () => {
// //     this.setState({ isLoadingComplete: true });
// //   };
// // }

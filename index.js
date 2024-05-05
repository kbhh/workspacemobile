/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {
    setCustomView,
    setCustomTextInput,
    setCustomText,
    setCustomImage,
    setCustomTouchableOpacity
  } from 'react-native-global-props';

  // Setting a default background color for all View components.
const customViewProps = {
    style: {
    //   backgroundColor: '#d3d3d3' // light gray
    }
  };
   
  // Getting rid of that ugly line on Android and adding some custom style to all TextInput components.
  const customTextInputProps = {
    underlineColorAndroid: 'rgba(0,0,0,0)',
    style: {
    }
  };
   
  // Setting default styles for all Text components.
  const customTextProps = {
    style: {
      fontFamily: 'Lato-Light',
    }
  };
   
  // Makes every image resize mode cover by default.
  const customImageProps = {
    // resizeMode: 'cover'
  };
   
  // Adds a bigger hit box for all TouchableOpacity's.
  const customTouchableOpacityProps = {
  };

setCustomView(customViewProps);
setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);
setCustomImage(customImageProps);
setCustomTouchableOpacity(customTouchableOpacityProps);

AppRegistry.registerComponent(appName, () => App);

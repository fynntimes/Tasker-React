import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import firebase from 'firebase'; 

var firebaseConfig = {
  apiKey: "AIzaSyAy_YfdEVsA0W990bfm2eoZ51R42wlIHDQ",
  authDomain: "tasker-fair.firebaseapp.com",
  databaseURL: "https://tasker-fair.firebaseio.com",
  projectId: "tasker-fair",
  storageBucket: "tasker-fair.appspot.com",
  messagingSenderId: "1029324922421"
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() { 
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/today-bg.png'),
        require('./assets/images/1024-icon.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-slab': require('./assets/fonts/RobotoSlab-Regular.ttf'),
        'sourcesanspro': require('./assets/fonts/SourceSansPro-Regular.ttf'),
      }),
      new Promise((resolve, reject) => {
        if(!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
          resolve("initialized")
        }
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

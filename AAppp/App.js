import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/config/Router";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./src/redux/reducer/index";
let store = createStore(allReducers);
import OneSignal from 'react-native-onesignal'; 

export default class App extends Component {
  constructor(properties) {
    super(properties);
    OneSignal.init("0e8a96b0-cf2b-44ac-9827-47bd1ae86be5");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.inFocusDisplaying(2);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    
    // console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return (
      <Provider store={store}>
       
          <AppNavigator />
    
      </Provider>
    
    );
  }
}


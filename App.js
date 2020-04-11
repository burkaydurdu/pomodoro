import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { AppLoading } from "expo";

import store from './src/core/store';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import About from './src/pages/about'
import Setting from './src/pages/setting'
import Home from './src/pages/home'

import { styles } from './src/styles';

import * as Font from 'expo-font';

import { Ionicons } from '@expo/vector-icons';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'sofia-pro-bold': require('./assets/fonts/SofiaProBold.ttf'),
      'sofia-pro-regular': require('./assets/fonts/SofiaProRegular.ttf'),
      'sofia-pro-light': require('./assets/fonts/SofiaProLight.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const Tab = createBottomTabNavigator();

    return (
      <View style={styles.container}>
        <StatusBar hidden={ true } />
        {
          this.state.fontLoaded ? (
            <Provider store= { store }>
              <NavigationContainer>
                <Tab.Navigator
                  screenOptions={({route}) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                      switch (route.name) {
                        case 'Pomodoro':
                            iconName = 'ios-home';
                          break;
                        case 'Ayarlar':
                            iconName = 'ios-settings';
                          break;
                        case 'Hakkında':
                            iconName = 'ios-information-circle';
                          break;
                      }
                      return <Ionicons name={iconName} size={size} color={color}/>
                    }
                  })}>
                  <Tab.Screen name="Pomodoro" component={Home} />
                  <Tab.Screen name="Ayarlar" component={Setting} />
                  <Tab.Screen name="Hakkında" component={About} />
                </Tab.Navigator>
              </NavigationContainer>
            </Provider>
          ) :
          (<AppLoading/>)
        }
      </View>
    );
  }
}

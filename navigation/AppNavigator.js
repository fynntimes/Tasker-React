import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SessionScreen from '../screens/SessionScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TodayScreen from '../screens/TodayScreen';

// Defines the navigation routes for this app
// there are two: the authentication stack, which only shows the welcome screen (for security purposes)
// and the today stack, which will take the user between the today screen, add task screen, and session screen

// a stack navigator includes a back button

const AuthStack = createStackNavigator({ Welcome: WelcomeScreen });

const TodayStack = createStackNavigator({
  Today: TodayScreen,
  AddTask: AddTaskScreen,
  Session: SessionScreen
});

// a switch navigator has no back button and components are unloaded when switched between

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    Main: TodayStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

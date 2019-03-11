import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SessionScreen from '../screens/SessionScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TodayScreen from '../screens/TodayScreen';

const AuthStack = createStackNavigator({ Welcome: WelcomeScreen });

const TodayStack = createStackNavigator({
  Today: TodayScreen,
  AddTask: AddTaskScreen,
  Session: SessionScreen
});

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

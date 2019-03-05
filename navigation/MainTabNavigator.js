import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// Import all the main pages, that are shown on each tab

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import TrendsScreen from '../screens/TrendsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// A navigation stack is like a stack of papers. You can switch between tabs
// and it'll remember which screen was being shown on each tab, so that navigation is seamless.

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home', // label shown to users
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}` 
          : 'md-information-circle'
      }
    />
  ),
};

const TasksStack = createStackNavigator({
  Tasks: TasksScreen,
});

TasksStack.navigationOptions = {
  tabBarLabel: 'Tasks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

const TrendsStack = createStackNavigator({
  Trends: TrendsScreen,
});

TrendsStack.navigationOptions = {
  tabBarLabel: 'Trends',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-bar-chart' : 'md-bar-chart'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

// finally, create the navigator using all four stacks.

export default createBottomTabNavigator({
  HomeStack,
  TasksStack,
  TrendsStack,
  SettingsStack,
});

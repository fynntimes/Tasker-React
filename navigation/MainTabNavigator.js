import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// Import all the main pages, that are shown on each tab

import TabBarIcon from '../components/TabBarIcon';
import TodayScreen from '../screens/TodayScreen';
import TasksScreen from '../screens/TasksScreen';
import TrendsScreen from '../screens/TrendsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// all icons have an iOS or Android (MD) icon, so we check which platform we're on and serve the correct icon here.
getPlatformIcon = (iconName) => {
  if(Platform.OS === 'ios') return 'ios-' + iconName;
  else return 'md-' + iconName;
}

// A navigation stack is like a stack of papers. You can switch between tabs
// and it'll remember which screen was being shown on each tab, so that navigation is seamless.

const TodayStack = createStackNavigator({
  Today: TodayScreen,
});

TodayStack.navigationOptions = {
  tabBarLabel: 'Today', // label shown to users
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={getPlatformIcon('today')}
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
      name={getPlatformIcon('list')}
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
      name={getPlatformIcon('trending-up')}
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
      name={getPlatformIcon('options')}
    />
  ),
};

// finally, create the navigator using all four stacks.

export default createBottomTabNavigator({
  TodayStack,
  TasksStack,
  TrendsStack,
  SettingsStack,
});

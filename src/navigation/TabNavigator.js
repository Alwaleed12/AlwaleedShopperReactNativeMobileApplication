import React from 'react';
import ListsScreen from '../screens/Lists';
import ItemsScreen from '../screens/Items';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = props => {

  return (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#f15454',
            tabBarActiveTintColor: {
                flex: 1,
                fontSize: 15,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
            },
            tabBarStyle: {display: 'flex'},
            tabBarIconStyle: {display: 'none'},
    }}
    >
        <Tab.Screen name={'Lists'} componenet={ListsScreen} />
        <Tab.Screen name={'Items'} componenet={ItemsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use the hook to create database
const shopperDB = openDatabase ({name: 'Shopper.db'});
const listItemsTableName = 'list_Items';

const AddListItemsScreen = props => {

  return (
    <View style={styles.container}>
    </View>
  );
};

export default AddListItemsScreen;
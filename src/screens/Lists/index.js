import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import List from '../../components/List';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const shopperDB = openDatabase({name: 'Shopper.db'});
const listsTableName = 'lists';

const ListsScreen = props => {

  const navigation = useNavigation();

  const [lists, setLists] = useState([]);

  useEffect(() => {
     const listener = navigation.addListener('focus', () => {
      // declare an empty array that will store the results of the 
      // SELECT
      let results = [];
      // declare a transation the will execute the SELECT
      shopperDB.transaction(txn => {
        // execute SELECT
        txn.executeSql(
          `SELECT * FROM ${listsTableName}`,
          [],
          // callback function to handle the results from the 
          // SELECT
          (_, res) => {
            // get number of rows of data selected
            let len = res.rows.length;
            console.log('Length of lists ' + len);
            // if more than one row was returned
            if (len > 0){
              // loop through thr rows
              for (let i = 0; i < len; i++){
                // push a row of data at a time onto the
                // results array
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  name: item.name,
                  store: item.store,
                  date: item.date,
                });
              }
              // assign results array to lists state variable
              setLists(results);
            } else {
              // if no rows of data were returned,
              // set lists state variable to an empty array
              setLists([]);
            }
          },
          error => {
            console.log('Error getting list ' + error.message);
          }
        )
      });
     });
     return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList 
          accessible={true}
          accessibilityRole='button'
          accessibilityLabel='Tap to start shopping'
          accessibilityHint='Goes to edit lists screen'
          data={lists}
          renderItem={({item}) => <List post={item} />}
          keyExtractor={item => item.id}
        />
        </View>
        <View style={styles.bottom}>
            <TouchableOpacity
                accessible={true}
                accessibilityRole='button'
                accessibilityLabel='Tap to start shopping'
                accessibilityHint='Goes to add lists screen' 
                style={styles.button}
                onPress={() => navigation.navigate('Add List')}
                >
                <Text style={styles.buttonText}>Add List</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ListsScreen;
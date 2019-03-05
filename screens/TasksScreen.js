import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

/*
This screen shows all of the tasks that the user has created. 
It initially shows them by category, and gives the user the option to
add a new category. 
*/

export default class TasksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links', /* set the title for the nav bar */
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksView />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

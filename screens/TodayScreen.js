import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  AsyncStorage 
} from 'react-native'; 

import * as firebase from 'firebase';
import 'firebase/firestore';

import Loading from '../components/Loading'
import TodayHeader from '../components/today/TodayHeader'
import TodayTaskList from '../components/today/TodayTaskList'
import TodayTask from '../components/today/TodayTask'

export default class TodayScreen extends React.Component {
  static navigationOptions = {
    header: null, // we don't want a header here because we have a custom greeting for this page
  };

  constructor(props) {
    super(props)

    // we pass data into our renderer via setting the component's state
    // initially, we have an empty array of tasks and a loading circle in our state.
    this.state = { tasks: [], loading: true }

    this.getTasks().then((tasks) => {
      this.setState({tasks: tasks, loading: false})
    })
  }

  // here, we asynchronously fetch all tasks from our database.
  // we store the results in a task array, and return that array of tasks.
  getTasks = async () => {
    tasks = [];

    await firebase.firestore().collection('tasks').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          tasks.push(doc.data());
      });
    });
    return tasks;
  }

  _refresh = () => {
    console.log('refresshing')
    // tasks are collected asynchronously, so once we do get them, we set the state accordingly.
    this.getTasks().then((newTasks) => {
      this.setState({tasks: newTasks, loading: false})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TodayHeader></TodayHeader>
        <ScrollView 
          style={styles.contentContainer}
          refreshControl= {
            <RefreshControl refreshing={this.state.loading} onRefresh={this._refresh}/>
          }>
      
          {/* here, we're making our list of tasks. we loop through each task in our array and output a TodayTask component, which is responsible for rendering it. */}
          <TodayTaskList>
            {this.state.tasks.map((task) => {
              return (
                <TodayTask key={task.id} colors={['#FF4242', '#FF6F6F']} task={JSON.stringify(task)} taskTitle={task.title} taskDescription="light task, very high priority" taskDuration="about 5 minutes"></TodayTask>
              ); 
            })}
          
          </TodayTaskList>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: '#F6F6F6',
  },
});

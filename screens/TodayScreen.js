import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'; 
import { Icon } from 'expo';
import Toast from 'react-native-easy-toast';
import { getTasks } from '../data/Task';

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

    getTasks().then((tasks) => {
      this.setState({tasks: tasks, loading: false})
    })
  }

  _refresh = () => {
    // tasks are collected asynchronously, so once we do get them, we set the state accordingly.
    this.getTasks().then((newTasks) => { 
      this.setState({tasks: newTasks, loading: false})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TodayHeader navigation={this.props.navigation}></TodayHeader>
        <ScrollView 
          style={styles.contentContainer}
          refreshControl= {
            <RefreshControl refreshing={this.state.loading} onRefresh={this._refresh}/>
          }>
      
          {/* here, we're making our list of tasks. we loop through each task in our array and output a TodayTask component, which is responsible for rendering it. */}
          <TodayTaskList>
            {this.state.tasks.map((task) => {
              return (
                  <TodayTask key={task.id} task={JSON.stringify(task)} toastRef={this.refs.toast}/>
                ); 
            })}
          
          </TodayTaskList>
        </ScrollView>
        
        {/* a floating button in the bottom right that lets users at a task */}
        <TouchableOpacity style={styles.addButton} onPress={() => {
          // we navigate to the task screen, and we include a callback so that
          // when we return to this page, it refreshes to show the new task.
          this.props.navigation.navigate("AddTask", {
            onGoBack: () => {
              this._refresh()
            }
          })
        }}>
            <Icon.Ionicons name="ios-add" color="white" size={30} /> 
        </TouchableOpacity>

        <Toast ref="toast"/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  contentContainer: {
    backgroundColor: '#F6F6F6',
  },
  addButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    borderRadius: 50,
    backgroundColor: 'rgba(47, 149, 220, 0.95)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 4,
    shadowOffset : { width: 1, height: 1},
  }
});

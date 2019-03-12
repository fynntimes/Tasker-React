import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient, Icon } from 'expo';

import SessionTimer from '../components/session/SessionTimer';
import CircleButton from '../components/CircleButton';
import SessionTaskList from '../components/session/SessionTaskList';
import SessionTask from '../components/session/SessionTask';

import { getTasks, calculatePriorityScore, markTaskComplete, getAmountTasks } from '../data/Task';

// this screen is shown when the user is working on a work session
// it shows a countdown and a list of possible tasks.

export default class SessionScreen extends React.Component {  
    static navigationOptions = {
        header: null, // we don't want a header here, not in the design
    };

    constructor(props) {
        super(props);

        this.workGradient = ['#1D976C', '#93F9B9'];
        this.breakGradient = ['#8E2DE2', '#4A00E0'];

        this.state = {
            tasks: [],
            break: false,
            paused: false
        };
        this._refresh();
    }

    _refresh() {
        getTasks().then((newTasks) => {
            taskMap = new Map(); // maps priorities to tasks
            newTasks.forEach((task) => {
                // calculate the priority score for each task
                priorityScore = calculatePriorityScore(task);
                taskMap.set(task, priorityScore);
            })
            
            sorted = new Map([...taskMap.entries()].sort((a, b) => b[1] - a[1]));
            empty = getAmountTasks(newTasks) === "0 tasks"
            this.setState({ tasks: sorted, paused: empty});
        });
    }

    render() {
        // we have to compile our list of tasks here, since we have to iterate through and construct session task objects
        sessionTasks = [];
        this.state.tasks.forEach((priorityScore, task) => {
            sessionTasks.push(<SessionTask key={task.id} task={JSON.stringify(task)} priorityScore={priorityScore} selected={false} completeCallback={() => this._taskComplete(task)}/>);
        });

        // our state-based UI content is defined here so that we know before we attempt to return a render DOM
        headerText = this.state.break ? "It's time to take a break." : "It's time to get to work."
        workText = getAmountTasks(this.state.tasks) === "0 tasks" ? "There are no tasks to work on." : "Work for 25 minutes, then take a break for 5 minutes."
        pauseOrPlay = this.state.paused ? "play" : "pause"

        return (
            <LinearGradient colors={this.state.break ? this.breakGradient: this.workGradient } style={styles.container}>
                
                <View style={styles.headerContainer}>
                    <Text style={[styles.infoText, {fontSize: 16}]}>{headerText}</Text>
                    <SessionTimer workDuration="25" breakDuration="5" paused={this.state.paused} completeCallback={() => { this.setState((prevState) => { return {break: !prevState.break}}) }} />                    
                </View>
                
                <View style={styles.buttonContainer}>
                    <CircleButton name={pauseOrPlay} size={50} iconSize={25} style={{paddingRight: 10}} onPress={this._pause}/>
                    <CircleButton name="fastforward" size={50} iconSize={25} onPress={this._endSession} />
                </View>
                 
                <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                    <Text style={[styles.infoText, {fontSize: 12}]}>{workText}</Text>
                </View>

                <ScrollView style={{ marginBottom: 30 }}>
                    <SessionTaskList>
                        {sessionTasks}
                    </SessionTaskList>
                </ScrollView>
            </LinearGradient>
        );
    }

    _taskComplete =  (task) => {
        markTaskComplete("task" + task.id);
    }

    _pause = () => {
        // if we're already paused, take it off paus
        // otherwise, put it on pause
        this.setState( prevState => {
            return { paused: !prevState.paused }
        });
    };

    _endSession = () => {
        this.props.navigation.state.params.onGoBack(); 
        this.props.navigation.navigate('Today')
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        marginTop: 80,
        marginBottom: 25,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "50%",
        marginLeft: "25%"
    },
    buttonText: {
        fontFamily: 'roboto',
        fontSize: 16,
        color: 'white'
    },
    infoText: {
        fontFamily: 'roboto', 
        color: 'white'
    }
});


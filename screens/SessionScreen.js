import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient, Icon } from 'expo';

import SessionTimer from '../components/session/SessionTimer';
import CircleButton from '../components/CircleButton';
import SessionTaskList from '../components/session/SessionTaskList';
import SessionTask from '../components/session/SessionTask';

import { getTasks, calculatePriorityScore, markTaskComplete } from '../data/Task';

// this screen is shown when the user is working on a work session
// it shows a countdown and a list of possible tasks.

export default class SessionScreen extends React.Component {  
    static navigationOptions = {
        header: null, // we don't want a header here, not in the design
    };

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
        };
    }

    _refresh() {
        getTasks().then((newTasks) => {
            taskMap = {} // maps tasks to priorities
            newTasks.forEach((task) => {
                // calculate the priority score for each task
                priorityScore = calculatePriorityScore(task);
                taskMap[task] = priorityScore;
            })
            this.setState({tasks: taskMap});
        });
    }

    render() {
        return (
            <LinearGradient colors={['#1D976C', '#93F9B9']} style={styles.container}>
                <View style={styles.headerContainer}>
                    {/* todo this text should also say "taking a break" when applicable */}
                    <Text style={[styles.infoText, {fontSize: 16}]}>It's time to work.</Text>
                    <SessionTimer countdownDuration="25:00" />                    
                </View>
                <View style={styles.buttonContainer}>
                    <CircleButton name="pause" size={50} iconSize={25} style={{paddingRight: 10}} onPress={this._takeBreak}/>
                    <CircleButton name="fastforward" size={50} iconSize={25} onPress={this._endSession} />
                </View>
                <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                    <Text style={[styles.infoText, {fontSize: 12}]}>Tap a task to pause the current one and switch to it.</Text>
                </View>
                <ScrollView style={{ marginBottom: 30 }}>
                    <SessionTaskList>
                        {
                            () => {
                                for(var task in this.state.tasks) {
                                    priority = this.state.tasks[task];
                                }
                            }
                        }
                        <SessionTask selected={true} completeCallback={() => {
                            console.log("completed the selected task")
                        }}/>
                        <SessionTask completeCallback={() => {
                            console.log("completed a task")
                        }}/>
                        <SessionTask/>
                        <SessionTask completeCallback={() => {
                            console.log("completed a task")
                        }}/>
                        <SessionTask/>
                        <SessionTask completeCallback={() => {
                            console.log("completed a task")
                        }}/>
                        <SessionTask/>
                        <SessionTask completeCallback={() => {
                            console.log("completed a task")
                        }}/>
                        <SessionTask/>
                        <SessionTask completeCallback={() => {
                            console.log("completed a task")
                        }}/>
                        <SessionTask/>
                        <SessionTask completeCallback={() => {
                            console.log("completed a task")
                        }}/>
                        <SessionTask/>
                        <SessionTask completeCallback={() => {
                            console.log("completed a task")
                        }}/>
                        <SessionTask/>
                    </SessionTaskList>
                </ScrollView>
            </LinearGradient>
        );
    }

    _takeBreak = () => {
        console.log("taking a break")
    };

    _endSession = () => {
        // todo summary screen
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


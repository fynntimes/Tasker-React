import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient, Icon } from 'expo';
import { markTaskComplete, getDaysUntilDue } from '../../data/Task';
import moment from 'moment';

import * as firebase from 'firebase';
import 'firebase/firestore';

export default class TodayTask extends React.Component {

    constructor(props) {
        super(props);

        // we passed in our task object via a JSON string, since we can't pass through Objects as properties.
        // we have to parse that as an object again here.
        this.task = JSON.parse(this.props.task)
        this.state = {
            complete: this.task.complete
        };
    }

    render() {
        if(this.state.complete) return null;
        else return (
            <LinearGradient colors={this.getColor()} style={styles.taskView}>
                {/* Here we define each part of the task item. The title and description are below. */}
                <Text style={styles.taskTitle}>{this.task.title}</Text>
                <Text style={styles.taskDescription}>
                    {/* we can just directly print the priority string EXCEPT for veryHigh, which needs a space on the user end */}
                    {this.getWeightString()} task, {this.task.priority === "veryHigh" ? "very high" : this.task.priority} priority
                </Text>

                {/*And here, we have the task duration, which consists of two parts: the clock icon, and the task duration text.
                the icon and the text are shown on the same row thanks to some styling. */}
                <View style={styles.taskDuration}>
                    <Icon.MaterialCommunityIcons name='clock-outline' size={14} style={{color: 'white'}} />
                    <Text style={{color: 'white', lineHeight: 14}}> due { getDaysUntilDue(this.task.dueDate) }</Text>
                </View>

                {/* What follows is the button row, a horizontal row of three buttons that represent actionable items for the task.
                NOTE: This has been temporarily removed until a future release, where their functionality will be extended. This is
                due to a change in concept of the project; tasks are now completed in work sessions.
                <View style={styles.taskButtons}>
                    <TouchableOpacity onPress={this.markComplete} style={styles.taskButton}>
                        <Icon.MaterialCommunityIcons name='check' size={24} style={{color: 'white'}}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={this.editTask} style={styles.taskButton}>
                        <Icon.MaterialCommunityIcons name='pencil' size={24} style={{color: 'white'}}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={this.rescheduleTask} style={styles.taskButton}>
                        <Icon.MaterialCommunityIcons name='calendar-clock' size={24} style={{color: 'white'}}/>
                    </TouchableOpacity>
                </View> */}
            </LinearGradient>
        );
    }

    // since tasks are updated on another screen, we have to tell React to always update this component in case any sudden changes occur.
    shouldComponentUpdate() {
        return true;
    }

    // assign specific colors to specific priorities. high priority? red. medium? yellow. low? blue.
    getColor = () => {
        priority = this.task.priority;
        if(priority === "low") return ['#42B1FF', '#73C5FF'];
        else if(priority === "normal") return ['#ED9700', '#EBA52B'];
        else return ['#FF4242', '#FF6F6F'];
    }

    // convert the weight of a task from low/normal/high to light/moderate/heavy for users
    getWeightString = () => {
        weight = this.task.duration;
        if(weight === "low") return "light";
        else if(weight === "normal") return "moderate";
        else if(weight === "high") return "heavy";
        else return "very heavy";
    }

    // same thing, but for durations, to a more human friendly format
    getDurationString = () => {
        weight = this.task.duration;
        if(weight === "low") return "about 5 minutes";
        else if(weight === "normal") return "about an hour";
        else if(weight === "high") return "around a few hours";
        else return "about a day";
    }

    // marks the task complete on the database end, sets this task to complete so that it hides itself, and then show a Toast,
    // which is a small notification at the bottom of the screen.
    markComplete = () => {
        markTaskComplete("task" + this.task.id)
        this.setState({ complete: true }) 
        this.props.toastRef.show("Task marked as complete!")
    }

    // to be implemented in a later release
    
    // editTask = () => {
    //     console.log("edited")
    // }

    // rescheduleTask = () => {
    //     console.log("rescheduled")
    // }

}

const styles = StyleSheet.create({
    taskView: {
        width: '95%',
        height: 125,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    taskTitle: {
        fontSize: 24,
        fontFamily: 'roboto-slab',
        color: 'white'
    },
    taskDescription: {
        fontFamily: 'roboto',
        fontSize: 14,
        color: 'white',
        marginTop: 10,
        marginBottom: 5
    },
    taskDuration: {
        flex: 1,
        flexDirection: 'row',
    },
    taskButtons: {
        flex: 1,
        flexDirection: 'row'
    },
    taskButton: {
        flex: 1,
        alignItems: 'center'
    }
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient, Icon } from 'expo';

export default class TodayTask extends React.Component {

    render() {
        return (
            <LinearGradient colors={this.props.colors} style={styles.taskView}>
                {/* Here we define each part of the task item. The title and description are below. */}
                <Text style={styles.taskTitle}>{this.props.taskTitle}</Text>
                <Text style={styles.taskDescription}>{this.props.taskDescription}</Text>

                {/*And here, we have the task duration, which consists of two parts: the clock icon, and the task duration text.
                the icon and the text are shown on the same row thanks to some styling. */}
                <View style={styles.taskDuration}>
                    <Icon.MaterialCommunityIcons name='clock-outline' size={14} style={{color: 'white'}} />
                    <Text style={{color: 'white', lineHeight: 14}}> {this.props.taskDuration}</Text>
                </View>

                {/* What follows is the button row, a horizontal row of three buttons that represent actionable items for the task. */}
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
                </View>
            </LinearGradient>
        );
    }

    markComplete = () => {
        console.log("marked complete")
    }

    editTask = () => {
        console.log("edited")
    }

    rescheduleTask = () => {
        console.log("rescheduled")
    }

}

const styles = StyleSheet.create({
    taskView: {
        width: '95%',
        height: 150,
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

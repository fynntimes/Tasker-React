import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Icon } from 'expo';

import CircleButton from '../CircleButton';

// a single session task, which shows the title, the priority score, and a completion button

export default class SessionTask extends React.Component {

    constructor(props) {
        super(props);

        // convert our task back into an object from JSON
        this.task = JSON.parse(this.props.task);

        // whether this task is complete is stored in the state
        this.state = { complete: this.task.complete };
    }

    render() {
        const styles = this.getStyles();
        if(this.state.complete) return null; // don't draw if the task is complete already
        return (
            <View style={styles.container}>
                <View style={styles.taskContainer}>

                    <Text style={styles.title}>{this.task.title}</Text>
                
                    <View style={styles.dataArea}>
               
                        <Text style={styles.dataText}>
                            <Icon.MaterialIcons name="priority-high"/> {this.getPriorityString()} 
                        </Text>
               
                        <Text style={styles.dataText}>
                            <Icon.Foundation name="clock"/> should take {this.getDurationString()}
                        </Text>

                    </View>
               
                </View>
               
               {/* the chekmark shown at the edge of the task */}
                <View style={{ marginLeft: "auto" }}>
                    <CircleButton name="checkmark" size={50} iconSize={40} onPress={this.onCompleted}/>
                </View>
            </View>
        );
    }

    // when the task is completed, we set our state and then we call the completeCallback, which will update the entire task to complete on the database
    // as provided by the SessionScreen
    onCompleted = () => {
        this.setState({ complete: true })
        this.props.completeCallback()
    }

    // utility method
    // all Ionicons have an iOS or Android (MD) icon, so we check which platform we're on and serve the correct icon here.
    getPlatformIcon = (iconName) => {
        if(Platform.OS === 'ios') return 'ios-' + iconName;
        else return 'md-' + iconName;
    }
    
    // makes the priority score into a human-readable format based on range
    getPriorityString = () => {
        weight = this.props.priorityScore;
        value = ""; // what we're returning
        if(weight < 1) value = "Low priority";
        else if(weight < 2) value = "Normal priority";
        else if(weight < 3) value = "High priority";
        else value = "Very high priority";

        return value + " (" + weight.toFixed(2) + ")";
    }

    // converts the task's duration to a more user friendly format
    getDurationString = () => {
        weight = this.task.duration;
        if(weight === "low") return "about 5 minutes";
        else if(weight === "normal") return "about an hour";
        else if(weight === "high") return "around a few hours";
        else return "about a day";
    }

    getStyles = () => {
        return StyleSheet.create({
            container: {
                padding: 20,
                flex: 1,
                flexDirection: 'row',
                borderBottomColor: '#bbb',
                borderBottomWidth: StyleSheet.hairlineWidth,
                
            },
            taskContainer: {
                flexDirection: "column",
            },
            title: {
                fontFamily: 'roboto-slab',
                fontSize: 16,
                paddingLeft: 5
            },
            dataArea: {
                marginLeft: 20,
            },
            dataText: {
                color: "#A1A1A1",
                fontSize: 12,
                marginTop: 5
            }
        });
    }
    
}

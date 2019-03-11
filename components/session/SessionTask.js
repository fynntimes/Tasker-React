import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { PulseLoader } from 'react-native-indicator';
import { Icon } from 'expo';

import CircleButton from '../CircleButton';

export default class SessionTask extends React.Component {

    constructor(props) {
        super(props);


        this.task = JSON.parse(this.props.task);
    }

    render() {
        const styles = this.getStyles();
        return (
            <View style={styles.taskContainer}>
                <Text style={styles.title}>{this.props.task.title}</Text>
                <View style={styles.dataArea}>
                    <Text style={styles.dataText}>
                        <Icon.MaterialIcons name="priority-high"/> Very high 
                    </Text>
                    <Text style={styles.dataText}>
                        <Icon.Foundation name="clock"/> should take {this.getDurationString()}
                    </Text>
                    <Text style={styles.dataText}>
                        <Icon.Ionicons name={this.getPlatformIcon("calendar")}/> due in a week
                    </Text>
                </View>
                <View style={{ marginLeft: 20 }}>
                    <CircleButton name="checkmark" size={50} iconSize={50} onPress={this.props.completeCallback}/>
                </View>
            </View>
        );
    }

    // utility method
    // all Ionicons have an iOS or Android (MD) icon, so we check which platform we're on and serve the correct icon here.
    getPlatformIcon = (iconName) => {
        if(Platform.OS === 'ios') return 'ios-' + iconName;
        else return 'md-' + iconName;
    }
    
    getPriorityString = () => {
        weight = this.task.duration;
        if(weight === "low") return "light";
        else if(weight === "normal") return "moderate";
        else if(weight === "high") return "heavy";
        else return "very heavy";
    }

    getDurationString = () => {
        weight = this.task.duration;
        if(weight === "low") return "about 5 minutes";
        else if(weight === "normal") return "about an hour";
        else if(weight === "high") return "around a few hours";
        else return "about a day";
    }

    getStyles = () => {
        return StyleSheet.create({
            taskContainer: {
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottomColor: '#bbb',
                borderBottomWidth: StyleSheet.hairlineWidth,
            },
            title: {
                fontFamily: 'roboto-slab',
                fontSize: 16,
                paddingLeft: 5
            },
            dataArea: {
                marginLeft: 20,
                flexDirection: "column"
            },
            dataText: {
                color: "#A1A1A1",
                fontSize: 12
            }
        });
    }
    
}

class StatusIndicator extends React.Component {
    render() {
        if(this.props.inProgress) {
            return <PulseLoader/>
        } else {
            // todo make this show a circle
            return null;
        }
    }
}

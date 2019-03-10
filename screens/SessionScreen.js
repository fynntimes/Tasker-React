import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient, Icon } from 'expo';

import SessionTimer from '../components/session/SessionTimer';
import CircleButton from '../components/CircleButton';
import SessionTaskList from '../components/session/SessionTaskList';
import SessionTask from '../components/session/SessionTask';

export default class SessionScreen extends React.Component {

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
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={[styles.infoText, {fontSize: 12}]}>Tap a task to pause the current one and switch to it.</Text>
                </View> 
                <SessionTaskList>
                    <SessionTask selected={true} completeCallback={() => {
                        console.log("completed the selected task")
                    }}/>
                    <SessionTask completeCallback={() => {
                        console.log("completed a task")
                    }}/>
                    <SessionTask/>
                </SessionTaskList>
            </LinearGradient>
        );
    }

    _takeBreak = () => {
        console.log("taking a break")
    };

    _endSession = () => {
        // todo summary screen
        this.props.navigation.navigate('Main')
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


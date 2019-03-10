import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';

import SessionTimer from '../components/session/SessionTimer';

export default class SessionScreen extends React.Component {

    render() {
        return (
            <LinearGradient colors={['#1D976C', '#93F9B9']} style={styles.container}>
                <View style={styles.headerContainer}>
                    <SessionTimer countdownDuration="25:00" />
                </View>
            </LinearGradient>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        marginTop: 80,
        alignItems: 'center'
    }
});


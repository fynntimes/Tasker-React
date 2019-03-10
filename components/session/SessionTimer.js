import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// This component shows a stylized timer for the Session page, which counts down to the passed in countdownDuration.

export default class SessionTimer extends React.Component {
    render() {
        return (
            <View>
                <Text style={styles.timer}>{this.props.countdownDuration}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    timer: {
        fontSize: 72,
        fontFamily: 'roboto-slab',
        color: 'white'
    }
});

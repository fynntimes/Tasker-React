import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// This component shows a stylized timer for the Session page, which counts down to the passed in the workDuration and breakDuration properties.

export default class SessionTimer extends React.Component {

    constructor(props) {
        super(props);

        // default values
        this.state = {
            remainingMinutes: parseInt(this.props.workDuration),
            remainingSeconds: 0
        }
        
    }

    // when the component loads, we'll set a timer for every second to update our countdown
    componentDidMount() {
        this.timer = setInterval(() => {

            // in react, the only safe way to access previous values is via the previous state's object
            this.setState(prevState => {
                if(prevState.paused || this.props.paused) return {} // if it's paused, don't update anything

                minutes = prevState.remainingMinutes;
                seconds = prevState.remainingSeconds;
                
                // when the timer's done, start a break
                if(minutes === 0 && seconds === 0) {
                    this.props.completeCallback(); // trigger the complete callback so that the screen can change to break mode
                    return {
                        remainingMinutes: parseInt(this.props.breakDuration),
                        remainingSeconds: 0
                    }
                }
                
                if(prevState.remainingSeconds === 0) { // new minute
                    minutes = minutes - 1;
                    seconds = 59;
                } else {
                    seconds--;
                }

                return {
                    remainingMinutes: minutes,
                    remainingSeconds: seconds
                };
            })
        }, 1000) // 1000 ms is 1 second
    }

    // when the component is going to unload, we must unset the timer
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        // add a 0 in front of a single digit number for readability
        formattedMinutes = this.state.remainingSeconds <= 9 ? "0" + this.state.remainingSeconds: this.state.remainingSeconds;
        return (
            <View>
                <Text style={styles.timer}>{this.state.remainingMinutes}:{formattedMinutes}</Text>
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

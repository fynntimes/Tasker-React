import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';

export default class TodayHeader extends React.Component {
    render() {
        return (
            <LinearGradient 
                colors={['#11998e', '#38ef7d']}
                style={{width: '100%', height: 300}}
            >
                <Text style={styles.title}>Good day!</Text>
                <Text style={styles.info}>You have {this.props.numTasks} to complete.</Text>

                <View style={styles.startSessionButtonView}>
                    <TouchableOpacity style={styles.startSessionButton} activeOpacity={0.7} onPress={this.startSession}>
                        <Text style={{color: 'white'}}>Start a work session</Text>
                    </TouchableOpacity>
                </View> 
            </LinearGradient>
        );
    }

    // navigate to the Session page, with a reference to the function that must be called when we are going back to the today view from the session view.
    // this is triggered by the start session button.
    startSession = () => {
        this.props.navigation.navigate('Session', {
            onGoBack: this.props.goBack
        })
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 28,
        paddingTop: 90,
        color: 'white',
        fontFamily: 'roboto-slab'
    },
    info: {
        textAlign: 'center',
        paddingTop: 20,
        color: 'white'
    },
    startSessionButtonView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    startSessionButton: {
        borderRadius: 5,
        width: '80%',
        height: 50,
        backgroundColor: 'rgba(47, 149, 220, 0.95)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

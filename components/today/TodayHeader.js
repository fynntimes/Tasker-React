import React from 'react';
import { View, TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native';

export default class TodayHeader extends React.Component {
    render() {
        return (
            <ImageBackground 
                source={require('../../assets/images/today-bg.png')}
                style={{width: '100%', height: 300}}
            >
                <Text style={styles.title}>Hello, Faizaan!</Text>
                <Text style={styles.info}>Busy day! You have 32 tasks to complete.</Text>

                <View style={styles.startSessionButtonView}>
                    <TouchableOpacity style={styles.startSessionButton} activeOpacity={0.7} onPress={this.startSession}>
                        <Text style={{color: 'white'}}>Start a work session</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }

    startSession = () => {
        this.props.navigation.navigate('CreateSessTemp')
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        paddingTop: 90,
        color: 'white',
        fontFamily: 'roboto-slab'
    },
    info: {
        textAlign: 'center',
        fontWeight: '600',
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

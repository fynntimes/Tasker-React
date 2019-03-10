import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { Icon } from 'expo';


/*
This screen shows when the user first launches the app after installing it.
It prompts the user to either create an account or log in.

NOTE: since this is a demonstration, I haven't yet wired up the Facebook and Google sign ins, they all
act as demo sign ins for our purposes.
*/

export default class WelcomeScreen extends React.Component {
    static navigationOptions = {
        header: null, /* we don't want a nav bar in here */
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon.Foundation name="checkbox" size={192} style={{paddingTop: 100, color: '#2f95dc'}}></Icon.Foundation> 
                <Text style={styles.title}>Welcome to Tasker.</Text>
                <Text style={styles.subtitle}>Take control of your life.</Text>
                <Text style={styles.authInstructions}>Choose a sign-in option below.</Text>

                {/* the demo access button, grey */}
                <TouchableOpacity onPress={this.letIn} style={[styles.button, styles.demoButton]}>
                    <Text style={styles.buttonText}>Demo Access</Text>
                </TouchableOpacity>

                {/* the google sign-in button, red */}
                <TouchableOpacity onPress={this.letIn} style={[styles.button, styles.googleButton]}>
                    <Text style={styles.buttonText}>
                        <Icon.Ionicons name="logo-google"></Icon.Ionicons> Sign in with Google
                    </Text>
                </TouchableOpacity>

                {/* the facebook sign-in button, blue */}
                <TouchableOpacity onPress={this.letIn} style={[styles.button, styles.facebookButton]}>
                    <Text style={styles.buttonText}>
                        <Icon.Ionicons name="logo-facebook"></Icon.Ionicons> Sign in with Facebook
                    </Text>
                </TouchableOpacity>
            </View>
        ) 
    }

    letIn = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Main');
    }

} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#eee',
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        fontFamily: 'roboto-slab',
        color: 'black'
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'roboto',
        color: 'black'
    },
    authInstructions: {
        paddingTop: 100,
        fontFamily: 'roboto',
        color: 'black',
        marginBottom: 10
    },
    buttonText: {
      color: 'white',
      textTransform: 'uppercase',
      fontSize: 16,
      lineHeight: 16
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    demoButton: {
        backgroundColor: '#383838',
    },
    googleButton: {
        backgroundColor: '#DB4437',
    },
    facebookButton: {
        backgroundColor: '#3C5A99'
    }
})

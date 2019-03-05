import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

/*
This screen shows when the user first launches the app after installing it.
It prompts the user to either create an account or log in.
*/

export default class WelcomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome', /* set the title for the nav bar */
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>Hey there!</Text>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff'
    }
})

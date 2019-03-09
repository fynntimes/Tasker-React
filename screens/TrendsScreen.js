import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

/* This page shows trends for users that show how productive they've been over time.
It mainly shows different graphs for different data sets. */

export default class TrendsScreen extends React.Component {
    static navigationOptions = {
        title: 'Trends',
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>Hey trends</Text>
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


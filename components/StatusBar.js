import React from 'react';
import { View, StyleSheet } from 'react-native';

/* At the top of the phone, iOS and Android place information such as the time and battery percentage.
To make sure this stays visual within our app, we have to define a little region with a solid background and set height.
We assume that the status bar has a height of 40 pixels, and we set its color to a nice shade of blue to match our header image.
*/

export default class StatusBar extends React.Component {
    render() {
        return (
            <View style={styles.status}></View>
        );
    }
}

const styles = StyleSheet.create({
    status: {
        width: '100%',
        height: 40,
        margin: 0,
        backgroundColor: '#2F608D'
    }
});

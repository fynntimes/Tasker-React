import React from 'react';
import { View, StyleSheet } from 'react-native';

// simply a container for all the SessionTask components

export default class SessionTaskList extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.list}>
                    {this.props.children}
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    list: {
        justifyContent: "center",
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 5
    }
});

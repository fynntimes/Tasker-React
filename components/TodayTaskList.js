import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class TodayTaskList extends React.Component {

    render() {
        return (
            <View style={styles.listView}>
                {this.props.children}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10
    }
});

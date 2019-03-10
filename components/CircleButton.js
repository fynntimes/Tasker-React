import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'expo';

// A simple circular button with an icon in the middle.

export default class CircleButton extends React.Component {
    render() {
        const styles = this.getStyles(this.props.size);
        return (
            <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                <Icon.Ionicons name={this.getPlatformIcon(this.props.name)}  size={this.props.iconSize} color="#01a699" />
            </TouchableOpacity>
        );
    }

    // all icons have an iOS or Android (MD) icon, so we check which platform we're on and serve the correct icon here.
    getPlatformIcon = (iconName) => {
        if(Platform.OS === 'ios') return 'ios-' + iconName;
        else return 'md-' + iconName;
    }

    // since our stylesheet's width and height values depend on passed in properties,
    // we have to create a function to pass through these variables to.

    getStyles = (size) => StyleSheet.create({
        button: {
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: size,
            height: size,
            backgroundColor: '#fff',
            borderRadius: size,
        }
    });

}

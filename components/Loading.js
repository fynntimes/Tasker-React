import React from 'react';
import { ActivityIndicator } from 'react-native';

export default class Loading extends React.Component {

    render() {
        if(this.props.visible) {
            return <ActivityIndicator size="large" color="#A6A6A6" style={{marginTop: 20}}/>
        } else return null;
    }

}

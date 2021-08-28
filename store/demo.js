import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Controller from '../screens/Controller';
import TopBar from '../screens/topBar';
import { connect } from 'react-redux';

class Demo extends Component {
     render() { 
        const color = this.props.myHighlight ? 'yellow' : 'white';
        return (
            <View style={styleApp.container}>
                <TopBar/>
            <View >
                <View style={styleApp.header}>
                    <Text style={styleApp.appName}>EXAM 1: {'\n'}APP COMPONENT</Text>
                    <Text style={{ fontSize: 40, color }}>{ this.props.myValue }</Text>
                </View>
                <Controller />
            </View>
            </View>
        );
    }    
}

function mapStateToProps(state) {
    return { 
        myValue: state.value,
        myHighlight: state.highlight 
    };
}

export default connect(mapStateToProps)(Demo);


const styleApp = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingTop: 30
    },
    header: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    appName: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center'
    },
    value: {
        color: 'yellow',
        fontSize: 40
    }
});


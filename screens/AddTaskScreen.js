import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Container, Content, Form, Item, Picker, Label, Input, DatePicker, Text } from 'native-base';
import { storeNewTask } from '../data/Task'
import moment from 'moment';

// a simple form to add a task to a database
// uses the native-base UI library since React Native doesn't come with forms built in

export default class AddTaskScreen extends React.Component {
    static navigationOptions = {
        title: 'Add Task', // set the title, we allow this view to have a header so that we can see the back button
    };

    // define the state with default values in case the user doesn't fill out the form
    // state is used to keep track of user input 
    constructor(props) {
        super(props);
        this.state = {
            taskTitle: 'Untitled task',
            priority: 'normal',
            length: 'normal',
            dueDate: new Date(),
        }
    }

    // the following methods are callbacks to update the state on an input change

    onTitleChange(value) {
        this.setState({ taskTitle: value });
    }

    onPriorityChange(value) {
        this.setState({priority: value});
    }

    onLengthChange(value) {
        this.setState({length: value});
    }

    onDateChange(value) {
        this.setState({dueDate: value});
    }

    // create a task from the user values
    createTask(state) {
        // referencing the storeNewTask method from Task, which accepts a callback as its last argument
        storeNewTask(state.taskTitle, state.priority, state.length, state.dueDate, () => {
            this.props.navigation.state.params.onGoBack(); // refresh the view via the callback we passed in
            this.props.navigation.goBack(); // go back to the home sreen 
        });
    }

    render() {
        return (
            <Container>
                <Content>
                <Form>
                    <Item stackedLabel>
                        <Label>Task name</Label>
                        <Input placeholder="Untitled task" onChangeText={ (text) => this.onTitleChange(text) } />
                    </Item>

                    <Item picker stackedLabel>
                        <Label>Priority</Label>
                        <Picker
                            mode="dropdown"
                            style={{ width:(Platform.OS === 'ios') ? undefined : "80%" }}
                            placeholder="Select a priority"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            selectedValue={this.state.priority}
                            onValueChange={(value) => { this.onPriorityChange(value) }}
                        >
                            <Picker.Item label="Low" value="low" />
                            <Picker.Item label="Normal" value="normal" />
                            <Picker.Item label="High" value="high" />
                            <Picker.Item label="Very high" value="veryHigh" />
                        </Picker>
                    </Item>
                    
                    <Item picker stackedLabel>
                        <Label>Expected duration</Label>
                        <Picker
                            mode="dropdown"
                            style={{ width:(Platform.OS === 'ios') ? undefined : "80%" }}
                            placeholder="Select an expected duration"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            selectedValue={this.state.length}
                            onValueChange={(value) => { this.onLengthChange(value) }}
                        >
                            <Picker.Item label="About 5 minutes" value="low" />
                            <Picker.Item label="About an hour" value="normal" />
                            <Picker.Item label="Around a few hours" value="high" />
                            <Picker.Item label="About a day" value="veryHigh" />
                        </Picker>
                    </Item>

                    {/* Define a datepicker to select a due date for the task */}
                    <Item stackedLabel>
                        <Label>Select a due date</Label>
                        <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date()}
                            animationType={"slide"}
                            placeHolderText={ moment(this.state.dueDate).format('MM/DD/YYYY') }
                            formatChosenDate={ (value) => moment(value).format("MM/DD/YYYY")}
                            textStyle={{ color: "green" }}
                            onDateChange={(value) => { this.onDateChange(value) }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }} />
                    </Item>

                    {/* submit button */}
                    <TouchableOpacity full onPress={() =>  this.createTask(this.state)}
                        style={styles.submitButton}>
                        <Text style={{color: 'white'}}>Create task</Text>
                    </TouchableOpacity>
                </Form>
                </Content>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    submitButton: {
        width: "100%", 
        height: 50, 
        backgroundColor: "rgb(47, 149, 220)", 
        alignItems: "center",
        justifyContent: "center"
    }
});
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Form, Item, Picker, Label, Input, DatePicker, Button, Text } from 'native-base';
import { storeNewTask } from '../data/Task'
import moment from 'moment';

export default class AddTaskScreen extends React.Component {
    static navigationOptions = {
        title: 'Add Task',
    };

    constructor(props) {
        super(props);
        this.state = {
            taskTitle: 'Untitled task',
            priority: 'normal',
            length: 'normal',
            dueDate: new Date(),
        }
    }

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

    createTask(state) {
        storeNewTask(state.taskTitle, state.priority, state.length, state.dueDate, () => {
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
        });
    }

    render() {
        return (
            <Container>
                <Content>
                <Form>
                    <Item stackedLabel>
                        <Label>Task name</Label>
                        <Input placeholder="Enter a name" onChangeText={ (text) => this.onTitleChange(text) } />
                    </Item>

                    <Item picker stackedLabel>
                        <Label>Priority</Label>
                        <Picker
                            mode="dropdown"
                            style={{ width: undefined }}
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
                            style={{ width: undefined }}
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

                    <Item stackedLabel>
                        <Label>Select a due date</Label>
                        <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date()}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"slide"}
                            androidMode={"default"}
                            placeHolderText={ moment(this.state.dueDate).format('MM/DD/YYYY') }
                            formatChosenDate={ (value) => moment(value).format("MM/DD/YYYY")}
                            textStyle={{ color: "green" }}
                            onDateChange={(value) => { this.onDateChange(value) }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            />
                    </Item>
                    <TouchableOpacity full onPress={() =>  this.createTask(this.state)}
                        style={{width: "100%", height: 50, backgroundColor: "rgb(47, 149, 220)", alignItems: "center", justifyContent: "center"}}>
                        <Text style={{color: 'white'}}>Create task</Text>
                    </TouchableOpacity>
                </Form>
                </Content>
            </Container>
        );
    }
}

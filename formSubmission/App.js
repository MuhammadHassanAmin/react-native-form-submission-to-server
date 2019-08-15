import React, { Component } from 'react';
import { Container, Header, Body, Content, Form, Item, Input, Picker, Title, Button, View, Row } from 'native-base';
import { StyleSheet, Text, Alert } from 'react-native';
import { ColorPicker, toHsv } from 'react-native-color-picker'
export default class FormExample extends Component {
  constructor(...args) {
    super(...args)
  }
  state = {
    name: undefined,
    email: undefined,
    color: undefined,
    gender: undefined,
  }
  onValueChangeDD = (value) => {

    this.setState({
      gender: value
    });
  }
  onPressSubmit = () => {

    if (this.state.name && this.state.email && this.state.gender && this.state.color) {
      var josnObjTosent = {
        name: this.state.name,
        email: this.state.email,
        gender: this.state.gender,
        color: this.state.color
      }
      fetch('http://192.168.0.117:8000/formData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(josnObjTosent),
      }).then((res) => {
        Alert.alert("Response came need to de json");
      }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
        throw error;
      });
    } else {
      Alert.alert("Please Fill All the Fields \nBefore Submitting!");
    }
  };
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Form Submission</Title>
          </Body>
        </Header>
        <Content>
          <Form style={styles.formContainer}>
            <Item>
              <Input placeholder="Full Name" onChangeText={(text) => this.setState({ name: text })} />
            </Item>
            <Item>
              <Input placeholder="Emial" onChangeText={(text) => this.setState({ email: text })} />
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                placeholder="Select Your Gender"
                placeholderStyle={styles.DDstyle}
                selectedValue={this.state.gender}
                onValueChange={this.onValueChangeDD.bind(this)}
              >
                <Picker.Item label="Male" value="m" />
                <Picker.Item label="Female" value="f" />
              </Picker>
            </Item>
            <Item>
              <ColorPicker
                onColorSelected={color => this.setState({ color: color })}
                style={{ flex: 1, width: 300, height: 300 }}
              />
            </Item>
            <View style={styles.btnSubmitContainer}>
              <Item>
                <View style={styles.btnSubmit}>
                  <Button light style={{ alignSelf: 'center' }} onPress={this.onPressSubmit} >
                    <Text>Submit Data</Text>
                  </Button>
                </View>
              </Item>
            </View>
          </Form>
        </Content>
      </Container>

    );
  }


}
// outside class
const styles = StyleSheet.create({
  formContainer: {
    padding: 10
  },
  mainContainer: {
    padding: 10
  },
  btnSubmitContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center"
  },
  btnSubmit: {
    alignSelf: "center",
    width: 400,
    height: 50,
    marginTop: 5
  },
  DDstyle: {
    width: 100,

  }
});
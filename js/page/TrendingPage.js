import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button
} from "react-native";
import NavigatorUtil from "../navigator/NavigatorUtil";
import DataStore from "../expand/dao/DataStore";

export default class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: ""
    };
    this.dataStore = new DataStore();
  }

  navigate = () => {
    NavigatorUtil.navigate("Detail");
    const a = ["1", "2"];
  };

  fetchData = () => {
    if (this.text) {
      const url = `https://api.github.com/search/repositories?q=${this.text}`;
      this.dataStore
        .fetchData(url)
        .then(data => {
          if (data) {
            this.setState({
              showText: `Timestamp: ${new Date(data.timestamp)}${JSON.stringify(
                data.data
              )}`
            });
          }
        })
        .catch(error => {
          this.setState({
            showText: error.toString()
          });
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.navigate}>TrendingPage</Text>
        <TextInput onChange={text => (this.text = text)} style={styles.input} />
        <Button title="fetch data" onPress={this.fetchData} />
        <Text>{this.state.showText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100
  },
  formContainer: {
    width: 300
  },
  input: {
    borderColor: "purple",
    borderWidth: 1,
    height: 50,
    padding: 10,
    marginVertical: 10
  }
});

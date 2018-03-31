// App.js
// aj 2018-03-31 


import React from 'react';
import { Alert, StyleSheet, Text, View, FlatList, Button, Picker } from 'react-native';
import * as R from 'ramda';

// --------------------------------
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <Generator/>
      </View>
    );
  }
}

// --------------------------------
// App Header
class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'GenPwd',
      subtitle: 'v3.0.0'
    };
  }

  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{this.state.title}
          <Text style={styles.subtitle}>{this.state.subtitle}</Text>
        </Text>
      </View>
    );
  }
}

// --------------------------------
class Generator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      generator: 'gen3',
      punctuation: false,
      capitals: false,
      numbers: false
    };
  }

  onPressGo() {
    Alert.alert("Go button pressed");
  }

  render () {
    return (
      <View style={styles.body}>
        <Controls 
          generator={this.state.generator}
          onGo={this.onPressGo}
        />
        <WordList/>
      </View>
    );
  }
}

// --------------------------------
class Controls extends React.Component {

  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    return (
      <View style = {styles.controls}>
        <Button
          title = "Go"
          onPress = {this.props.onGo}
        />
        <Picker
          selectedValue = {this.props.generator}
          onValueChange = {(itemValue, itemIndex) => this.setState({generator: itemValue})}>
          <Picker.Item label = 'Generator 1' value = 'gen1' />
          <Picker.Item label = 'Generator 2' value = 'gen2' />
          <Picker.Item label = 'Generator 3' value = 'gen3' />
          <Picker.Item label = 'Markov'      value = 'gen4' />
        </Picker>
      </View>
    );
  }
}

// --------------------------------
class WordList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      words: []
    };
  }

  componentDidMount() {
    const dummyWords = [
      'alpha', 'beta', 'charlie', 'delta', 'echo', 
      'foxtrot', 'golf', 'hotel', 'india', 'juliet'
    ];
    this.setState({words: dummyWords});
  }

  render() {
    return (
      <View style = {styles.wordList}>
        <FlatList 
          data = {this.state.words}
          renderItem = {
            ({item}) => <Text style={styles.word}>{item}</Text>
          }
        />
      </View>
    );
  }
}

// ----------------------------
// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },

  header: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    backgroundColor: '#429',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    fontSize: 48,
  },
  subtitle: {
    color: '#ccc',
    fontWeight: 'normal',
    fontSize: 16,
  },

  controls: {
    flex: 1,
  },

  body: {
    flex: 7,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#eef',
  },
  bodyText: {
    fontFamily: 'Avenir',
    fontSize: 18,
  },

  wordList: {
    flex: 1,
  },
  word: {
    fontFamily: 'Avenir',
    fontSize: 24,
    padding: 5,
  },
});

// The End

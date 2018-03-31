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
      numbers: false,
      words: [],
    };

    this.dummyWords = [
      'alpha', 'beta', 'charlie', 'delta', 'echo', 
      'foxtrot', 'golf', 'hotel', 'india', 'juliet'
    ];

    this.onGoButton = this.onGoButton.bind(this);
  }

  onGoButton(e) {
    this.setState({words: this.dummyWords});
  }

  render () {
    return (
      <View style={styles.body}>
        <Controls 
          generator = {this.state.generator}
          onGo = {this.onGoButton}
        />
        <WordList 
          words = {this.state.words}
        />
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

  picker() {
    return(
        <Picker
          selectedValue = {this.props.generator}
          onValueChange = {(itemValue, itemIndex) => this.setState({generator: itemValue})}>
          <Picker.Item label = 'Generator 1' value = 'gen1' />
          <Picker.Item label = 'Generator 2' value = 'gen2' />
          <Picker.Item label = 'Generator 3' value = 'gen3' />
          <Picker.Item label = 'Markov'      value = 'gen4' />
        </Picker>
    );
  }

  render() {
    return (
      <View style = {styles.controls}>
        <Button
          title = "Go"
          onPress = {this.props.onGo}
        />
      </View>
    );
  }
}

// --------------------------------
class WordList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style = {styles.wordList}>
        <FlatList 
          data = {this.props.words}
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
    paddingLeft: 20,
    backgroundColor: '#74e',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    fontSize: 24,
  },
  subtitle: {
    color: '#aaa',
    fontWeight: 'normal',
    fontSize: 14,
  },

  controls: {
    flex: 1,
  },

  body: {
    flex: 12,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#eef',
  },
  bodyText: {
    fontFamily: 'Avenir',
    fontSize: 18,
  },

  wordList: {
    flex: 6,
  },
  word: {
    fontFamily: 'Avenir',
    fontSize: 24,
    padding: 5,
  },
});

// The End

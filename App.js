// App.js
// aj 2018-03-31 


import React from 'react';
import { generator1, generator2, generator3, generator4, generators } from './Generator';
import { Alert, StyleSheet, Text, View, FlatList, Button, Picker, StatusBar } from 'react-native';
import { Container } from 'native-base';
import * as R from 'ramda';

// --------------------------------
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Header/>
        <Passwords/>
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
class Passwords extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      opts: {
        punctuation: true,
        capitals: true,
        numbers: true,
      },
      words: [],
    };
    this.initGenerators();
    this.onGoButton = this.onGoButton.bind(this);
  }

  initGenerators() {
    this.state.generator = generator4; 
  }

  onGoButton() {
    const gen = this.state.generator;
    const opts = this.state.opts;
    const n = 10;

    // Create an empty array of the right length, then map the random words into
    // it.
    var w = (new Array(n)).fill('').map(x => gen.randomWord(opts))
    this.setState({words: w});
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
          style = {styles.picker}
          itemStyle = {styles.pickerItem}
          selectedValue = {this.props.generator}
          onValueChange = {(itemValue, itemIndex) => this.setState({generator: itemValue})}>
          <Picker.Item label = 'Generator 1' value = 'generator1' />
          <Picker.Item label = 'Generator 2' value = 'generator2' />
          <Picker.Item label = 'Generator 3' value = 'generator3' />
          <Picker.Item label = 'Markov'      value = 'generator4' />
        </Picker>
    );
  }

  render() {
    return (
      <View style = {styles.controls}>
        <Button
          style = {styles.button}
          title = "Generate"
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
    backgroundColor: '#42b',
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

  body: {
    flex: 12,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#eef',
  },
  bodyText: {
    fontFamily: 'Avenir',
    fontSize: 16,
  },

  controls: {
    flex: 1,
  },
  button: {
  },

  wordList: {
    flex: 8,
  },
  word: {
    fontFamily: 'Avenir',
    fontSize: 20,
    padding: 5,
  },
});

// The End

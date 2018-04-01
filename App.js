// App.js
// aj 2018-03-31 


import React from 'react';
import { Alert, StyleSheet, Text, View, FlatList, Button, Picker } from 'react-native';
import { generator1, generator2, generator3, generator4 } from './Generator';
import * as R from 'ramda';

// --------------------------------
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
      generator: 'gen3',
      punctuation: true,
      capitals: true,
      numbers: true,
      words: [],
    };

    this.onGoButton = this.onGoButton.bind(this);
  }

  onGoButton(e) {
    const opts = {
      punctuation: this.state.punctuation,
      capitals: this.state.capitals,
      numbers: this.state.numbers
    };
    const n = 10;
    const gen = generator2;
    var w = [];

    for (var i=0; i<n; i++) {
      w.push([gen.randomWord(opts)]);
    }
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

  controls: {
    flex: 1,
  },

  wordList: {
    flex: 8,
  },
  word: {
    fontFamily: 'Avenir',
    fontSize: 24,
    padding: 5,
  },
});

// The End

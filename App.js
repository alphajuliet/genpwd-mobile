// App.js
// aj 2018-03-31 


import React from 'react';
import { generator1, generator2, generator3, generator4, generators } from './Generator';
import { Alert, Clipboard, StyleSheet, Text, View, FlatList, Picker, StatusBar } from 'react-native';
import { Header, Button, List, ListItem } from 'react-native-elements';
import * as R from 'ramda';

// --------------------------------
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Header
          backgroundColor = '#42b'
          centerComponent = {{
            text: 'GenPwd',
            style: styles.title,
          }}
          rightComponent = {{
            icon: 'menu', 
            color: '#fff',
          }}
        />
        <Passwords/>
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
      nwords: 10,
    };
    this.initGenerators();
    this.onGoButton = this.onGoButton.bind(this);
  }

  initGenerators() {
    this.state.generator = generator4; 
  }

  genWords() {
    const nwords = this.state.nwords;
    const generator = this.state.generator;
    const opts = this.state.opts;

    var w = (new Array(nwords))
      .fill('')
      .map(x => generator.randomWord(opts));
    this.setState({words: w});
  }

  onGoButton() {
    this.genWords();
  }

  render () {
    return (
      <View style={styles.body}>
        <WordList
          words = {this.state.words}
        />
        <Controls 
          generator = {this.state.generator}
          onGo = {this.onGoButton}
        />
      </View>
    );
  }
}

// --------------------------------
class Controls extends React.Component {
  // props: onGo, generator

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
          titleStyle = {{
            fontFamily: 'Avenir',
            fontSize: 24,
            fontWeight: 'bold',
          }}
          buttonStyle = {{
            backgroundColor: '#42b',
            width: 150,
            borderRadius: 16,
          }}
          title = "Generate"
          onPress = {this.props.onGo}
        />
      </View>
    );
  }
}

// --------------------------------
class WordList extends React.Component {
  // props: words
  
  constructor(props) {
    super(props);
    // this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  copyToClipBoard(e) {
    // Clipboard.setString('hello');
    Alert.alert("Word selected");
  }

  render() {
    var words = this.props.words;

    return (
      <View style = {styles.wordList}>
        <List> 
          { 
            words.map( (e, i) => (
              <ListItem 
                key = {i}
                title = {e}
                hideChevron = {true}
                onPress = {this.copyToClipboard}
                titleStyle = {{
                  fontSize: 18,
                }}
                titleContainerStyle = {{
                  padding: -5
                }}
              />
            ))
          } 
        </List>
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
    fontSize: 28,
    paddingTop: 10,
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
    backgroundColor: '#fff',
  },
  bodyText: {
    fontFamily: 'Avenir',
    fontSize: 16,
  },

  controls: {
    flex: 1,
    alignItems: 'center',
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

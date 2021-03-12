import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ButtumNumber from './inputNumberButtom';

const buttons = [
  ['CLEAR', 'DEL'],
  ['7', '8', '9', '/'],
  ['4', ' 5', '6', 'X'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
];

export default class App extends Component {
  constructor() {
    super();
    this.initialState = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
      nextValue: false,
    };
    this.state = this.initialState;
  }

  renderButtons() {
    let layouts = buttons.map((buttonRow, index) => {
      let rouwItem = buttonRow.map((buttonItem, buttomIndex) => {
        return (
          <ButtumNumber
            value={buttonItem}
            handleOnPress={this.handleInPut.bind(this, buttonItem)}
            key={'btn-' + buttomIndex}
          />
        );
      });
      return (
        <View style={styles.inputRow} key={'row-' + index}>
          {rouwItem}
        </View>
      );
    });
    return layouts;
  }

  handleInPut = (input) => {
    const {
      displayValue,
      operator,
      firstValue,
      secondValue,
      nextValue,
    } = this.state;

    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.setState({
          displayValue: displayValue === '0' ? input : displayValue + input,
        });
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input,
          });
        } else {
          this.setState({
            secondValue: secondValue + input,
          });
        }
        break;
      case '+':
      case '-':
      case 'x':
      case '/':
        this.setState({
          nextValue: true,
          operator: input,
          displayValue:
            (operator !== null
              ? displayValue.substr(0, displayValue.length - 1)
              : displayValue) + input,
        });
        break;
      case '.':
        let dot = displayValue.slice(-1);
        this.setState({
          displayValue: dot !== '.' ? displayValue + input : displayValue,
        });
        break;
      case '=':
        let formatOperato =
          operator == 'x' ? '*' : operator == '/' ? '/' : operator;
        let resual = eval (firstValue + formatOperato + secondValue);
        this.setState({
          displayValue: resual,
          firstValue: resual,
          secondValue: '',
          operator: null,
          nextValue: false,
        });

      case 'CLEAR':
        this.setState(this.initialState);
        break;
    }

    this.setState({
      displayValue: displayValue === '0' ? input : displayValue + input,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.ScreenCalcula}>
          <Text style={styles.resultext}>{this.state.displayValue}</Text>
        </View>
        <View style={styles.ButtumCalcula}>{this.renderButtons()}</View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ScreenCalcula: {
    flex: 2,
    backgroundColor: '#211240',
    justifyContent: 'center',
  },
  ButtumCalcula: {
    flex: 8,
    backgroundColor: '#3D0073',
  },
  resultext: {
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'right',
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
  },
});

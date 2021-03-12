import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class ButtumNumber extends Component{
  render(){
    const {value,handleOnPress} = this.props;
    return(
      <TouchableOpacity 
      style={styles.container}
      onPress={()=>handleOnPress(value)}
      >
          <Text style={styles.text}>{value}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex : 1,
    margin:1,
    justifyContent:'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignContent:'center'
  },
  text:{
      color:'white',
      fontSize:26,
  }
})
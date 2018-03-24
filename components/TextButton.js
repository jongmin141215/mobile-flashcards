import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TextButton({ children, onPress, style = {} }) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.button, style]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#000',
    width: 200,
    height: 40,
    backgroundColor: '#000',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5,
  }
})

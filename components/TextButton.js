import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TextButton({ children, onPress, style = {} }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} >
        <Text style={style}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

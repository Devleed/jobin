import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = (props) => {
  let stylesArr = [styles.input, props.style];

  if (props.bordered) {
    stylesArr = [{ ...styles.bordered }, ...stylesArr];
  }
  if (props.bottomBordered) {
    stylesArr = [{ ...styles.bottomBordered }, ...stylesArr];
  }

  return <TextInput {...props} style={stylesArr} />;
};

export default Input;

const styles = StyleSheet.create({
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  bordered: {
    borderWidth: 1,
    borderRadius: 10,
  },
  bottomBordered: {
    borderBottomWidth: 1,
  },
});

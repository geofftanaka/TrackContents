import React from 'react';
import Box from '@mui/material/Box';
import { Text, StyleSheet } from 'react-native';
import ColourPicker from '../helpers/ColourPicker';

export default function LineItem({ itemName, amount, isHover, colourIndex, style }) {

  const styles = (colour) => StyleSheet.create({
    text: {
      display: 'flex',
      paddingTop: 10,
      paddingBottom: 10,
      fontFamily: 'Roboto', 
      width: '70%',
      alignItems: 'center',
      color: isHover ? colour.contrast : colour.secondary
    },
    amount: {
      display: 'flex',
      width: '20%',
      paddingEnd: 15,
      fontFamily: 'Roboto', 
      textAlign: 'right',
      alignItems: 'center',
      justifyContent: 'flex-end',
      color: isHover ? colour.contrast : colour.secondary
    },
  });

  return (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
      <Text style={styles(ColourPicker(colourIndex)).text}>{itemName}</Text>
      <Text style={[styles(ColourPicker(colourIndex)).amount, style]}>${amount}</Text>
    </Box>
  );
}
import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyleSheet } from 'react-native';
import LineItem from './LineItem';
import ColourPicker from '../helpers/ColourPicker';
import axios from 'axios';

export default function LineItemWithDelete({ itemKey, itemName, amount, isHover, colourIndex, deleteClick }) {

  const styles = (colour) => StyleSheet.create({
    delete: {
      width: '10%',
      alignItems: 'flex-start',
      color: isHover ? colour.contrast : colour.secondary
    },
  });

  return (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
      <LineItem itemName={itemName} amount={amount} isHover={isHover} colourIndex={colourIndex} style={{ paddingEnd: 0 }} />
      <IconButton style={styles(ColourPicker(colourIndex)).delete} aria-label="Delete Content Item" onClick={() => deleteClick(itemKey)}><DeleteIcon /></IconButton>    
    </Box>
  );
}
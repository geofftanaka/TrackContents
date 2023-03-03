import { React, useState } from 'react';
import Box from '@mui/material/Box';
import { Text, StyleSheet } from 'react-native';
import LineItemWithDeleteContainer from './LineItemWithDeleteContainer';
import LineItemWithDelete from './LineItemWithDelete';
import ColourPicker from '../helpers/ColourPicker';

export default function CategorySection({ keyData, category, amount, contentItems, refreshCategories }) {
  const [isHover, setIsHover] = useState(false);

  const styles = (colour) => StyleSheet.create({
    title: {
      color: isHover ? colour.contrast : colour.primary,
      paddingBottom: 5,
      fontFamily: 'Roboto',      
      fontWeight: '700',
      fontSize: 24
    },
    total: {
      color: isHover ? colour.contrast : colour.primary,
      fontFamily: 'Roboto',
      marginRight: 15
    },
    category: {
      borderRadius: '8px',
      border: `2px solid ${isHover ? colour.contrast : colour.primary}`,
      margin: '4px',
    }
  }); 

  const handleMouseEnter = () => {
    setIsHover(true);
  }

  const handleMouseLeave = () => {
    setIsHover(false);
  }


  return (
    <div style={styles(ColourPicker(keyData)).category} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Box sx={{ width: 500, display: 'flex', justifyContent: 'space-between', paddingTop: 1, paddingLeft: 1 }}>
        <Text style={styles(ColourPicker(keyData)).title}>{category}</Text>
        <Text style={styles(ColourPicker(keyData)).total}>Subtotal: ${amount}</Text>
      </Box>
      <Box sx={{ width: 500, paddingLeft: 2 }}>
        {(typeof contentItems !== 'undefined') ?
          (contentItems.map((item) =>
            <LineItemWithDeleteContainer
              key={item.itemId}
              itemKey={item.itemId}
              itemName={item.itemName}
              amount={item.amount}
              isHover={isHover}
              colourIndex={keyData}
              refreshCategories={refreshCategories}></LineItemWithDeleteContainer>))
          : <br></br>
        }
      </Box>
    </div>
  );
}
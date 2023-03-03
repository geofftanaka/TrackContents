import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Box from '@mui/material/Box';
import LineItem from './LineItem';

export default function TotalSection({ categories, total }) {
  const styles = StyleSheet.create({
    title: {
      color: 'var(--primary-colour)',
      fontFamily: 'Roboto',
      fontWeight: '700',
      fontSize: 24
    },
    total: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      fontFamily: 'Roboto',
      fontWeight: '700',
      fontSize: 24,
      color: 'var(--primary-colour)',
      paddingLeft: 10,
      paddingRight: 25,
      paddingBottom: 10
    }
  });

  return (
    <div>
      <Box sx={{ width: 500, display: 'flex', justifyContent: 'space-between', paddingTop: 1, paddingLeft: 1 }}>
        <Text style={styles.title}>Subtotals</Text>
      </Box>
      <Box sx={{ width: 500, paddingLeft: 2 }}>
        {categories.map((item) =>
          <LineItem
            key={item.categoryId}
            itemName={item.categoryName}
            amount={item.categoryAmount}
            ></LineItem>
        )}
      </Box>
      <hr style={{ color: 'var(--bright-colour)', height: 4 }}></hr>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.total}>Grand Total</Text>
        <Text style={styles.total}>${total}</Text>
      </div>


    </div>
  );
}
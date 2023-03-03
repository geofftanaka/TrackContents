import React from 'react';
import axios from 'axios';
import LineItemWithDelete from './LineItemWithDelete';

export default function LineItemWithDeleteContainer({ itemKey, itemName, amount, isHover, colourIndex, refreshCategories }) {

  function deleteClick(itemId) {
    axios.delete(`content/${itemId}`).then((response) => {
      refreshCategories();
    });
  };

  return (
    <LineItemWithDelete 
      itemKey={itemKey}
      itemName={itemName}
      amount={amount}
      isHover={isHover}
      colourIndex={colourIndex}
      deleteClick={deleteClick}
    />    
  );
}
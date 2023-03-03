import { React, useRef, useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import ContentsPage from './ContentsPage';
import WithLoading from '../helpers/WithLoading';

export default function ContentsContainer() {
  const [loading, setLoading] = useState(true);
  const nameRef = useRef(null);
  const amountRef = useRef(null);
  const [categoryValue, setCategoryValue] = useState(null);
  const [categories, setCategories] = useState(null);
  const [contentItem, setContentItem] = useState(null);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    refreshCategories();
  }, []);

  const addButtonClick = () => {
    const newItem = {
      itemName: nameRef.current.value,
      amount: amountRef.current.value,
      categoryId: categoryValue.categoryId
    };

    axios.post('content', newItem).then((response) => {
      const insertedItem = { ...newItem, itemId: response.data.id };

      let newCategoryIndex = categories.findIndex(category => category.categoryId == categoryValue.categoryId);
      let newCategories = [...categories];
      newCategories[newCategoryIndex] = {
        ...newCategories[newCategoryIndex],
        contentItems: [...newCategories[newCategoryIndex].contentItems, insertedItem],
        categoryAmount: newCategories[newCategoryIndex].contentItems.reduce((total, value) =>
          parseInt(total) + parseInt(value.amount), 0) + parseInt(insertedItem.amount)
      };
      setCategories(newCategories);
      setTotal(newCategories.reduce((total, value) => total + value.categoryAmount, 0));
    });
  };

  const refreshCategories = () => {
    axios.get('categories').then((response) => {
      setCategories(response.data);
      setTotal(response.data.reduce((total, value) => total + value.categoryAmount, 0));
      setLoading(false);
    });
  };

  if (contentItem != null) {

    setContentItem(null);
  }

  if (!categories) return null;

  const categoryList = categories.map(category => ({
    categoryName: category.categoryName,
    categoryId: category.categoryId
  }));

  const contents = () => {
    if (loading) {
      return <div className="main" >
        Loading...</div>
    }
    return <ContentsPage
      loading={loading}
      nameRef={nameRef}
      amountRef={amountRef}
      categoryValue={categoryValue}
      setCategoryValue={setCategoryValue}
      categoryList={categoryList}
      addButtonClick={addButtonClick}
      categories={categories}
      total={total}
      refreshCategories={refreshCategories} />
  };

  return (
    contents()
  );
}
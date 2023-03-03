import { React } from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "../themes/theme";
import AddItem from './AddItem';
import CategoryList from './CategoryList';
import '../custom.css';

export default function ContentsPage({ nameRef, amountRef, categoryValue, setCategoryValue, categoryList, addButtonClick, categories, total, refreshCategories }) {


  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <div className="main" >
        <div>
          <AddItem nameRef={nameRef} amountRef={amountRef} categoryValue={categoryValue} setCategoryValue={setCategoryValue} categories={categoryList} onClick={addButtonClick}></AddItem>
          <br></br>
          <CategoryList categories={categories} total={total} refreshCategories={refreshCategories}></CategoryList>
        </div>
      </div>
    </ThemeProvider>
  );
}
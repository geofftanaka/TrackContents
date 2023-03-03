import { React } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Autocomplete, InputAdornment } from '@mui/material/index';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "../themes/theme";

export default function AddItem({ nameRef, amountRef, categoryValue, setCategoryValue, categories, onClick }) {

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <Box display="flex" className="addItemArea">
        <TextField
          id="name"
          label="Item Name"
          variant="filled"
          className="txt-primary"
          sx={{ width: 300, paddingRight: 1 }}
          inputRef={nameRef}
        ></TextField>
        <TextField
          id="amount"
          label="Amount"
          type="number"
          variant="filled"
          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
          sx={{ width: 150 }}
          inputRef={amountRef}
        ></TextField>
        <Autocomplete
          id="category-selection"
          options={categories}
          getOptionLabel={(item) => item.categoryName}
          clearOnEscape
          renderInput={(params) => <TextField {...params} label="Category" />}
          isOptionEqualToValue={(option, value) => option.categoryId === value.categoryId }
          sx={{ width: 300, paddingLeft: 1, paddingRight: 2 }}
          value={categoryValue}
          onChange={(_, value) => setCategoryValue(value)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ width: 100 }}
          className="btn-primary"
          onClick={() => {
            onClick();
          }}
        >Add</Button>
      </Box>
    </ThemeProvider>
  );
}


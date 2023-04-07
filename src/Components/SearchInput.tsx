import React, { useState } from "react";

import {
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  filterFunc: (value: string) => void;
};

const SearchInput = ({ filterFunc }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const changeInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    filterFunc(e.target.value as string);
    setSearchValue(e.target.value);
  };

  return (
    <>
      <TextField
        value={searchValue}
        onChange={changeInputValue}
        variant="outlined"
        sx={{
          margin: "10px",
          width: "95%",
          [`& fieldset`]: {
            borderRadius: "20px",
          },
          [`& input`]: {
            lineHeight: 1,
            padding: "10px",
          },
        }}
        id="input-with-icon-textfield"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default SearchInput;

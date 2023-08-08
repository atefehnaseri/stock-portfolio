import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {useQuery} from "@tanstack/react-query";
import {searchCompany} from "../../services";
import {useDebounce} from "../../hooks/useDebounce";
import {API_KEY} from "../../constants";
import {ICompany, ICompanyTransformed} from "../../types/interfaces/company.interface";

interface IAutocompleteSearchInputProps {
  onAdd: (company: ICompany) => void;
}

const AutocompleteSearchInput: React.FC<IAutocompleteSearchInputProps> = ({onAdd}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchedValue = useDebounce(searchTerm, 500);
  const searchCompanyQueryParams = {
    "function": "SYMBOL_SEARCH",
    "keywords": debouncedSearchedValue,
    "apikey": API_KEY,
  };
    const {data, isLoading} = useQuery(['searchCompany', debouncedSearchedValue],
      () => searchCompany(searchCompanyQueryParams), {
        enabled: !!debouncedSearchedValue,
        retry: 1,
        select: companyList => companyList.map((company: ICompany) => Object.fromEntries(
            Object.entries(company).map(([key, value]) => [key.slice(3), value])
          )
        ) as ICompanyTransformed[]
      },
    );

  const handleAddCompany = (company: any) => {
    onAdd(company);
  };

  return (
      <Autocomplete
        multiple
        filterSelectedOptions
        id="company-search-input"
        options={data || [] }
        filterOptions={option => option}
        getOptionLabel={(option:ICompanyTransformed) => `${option.symbol} - ${option.name}`}
        renderOption={(props, option)=> (
          <li {...props}>
            {option.symbol} - {option.name}
            <IconButton aria-label="add" onClick={() => handleAddCompany(option)}>
              <AddIcon/>
            </IconButton>
          </li>
        )}
        loading={!!debouncedSearchedValue && isLoading}
        onInputChange={(event, value) => setSearchTerm(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Company Name"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        onChange={(_, value) => console.log("selected value is", value)}
      />
  );
};

export default AutocompleteSearchInput;
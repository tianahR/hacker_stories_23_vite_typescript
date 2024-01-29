import * as React from 'react';
import InputWithLabel from './InputWithLabel';
// import styles from './App.module.css';
import styled from 'styled-components';



const StyledSearchForm = styled.form`
padding: 10px 0 20px 0;
display: flex;
align-items: baseline;
`;


const StyledButton = styled.button`
background: transparent;
border: 1px solid #171212;
padding: 5px;
cursor: pointer;
transition: all 0.1s ease-in;
&:hover {
background: #171212;
color: #ffffff;
}
`;


const StyledButtonLarge = styled(StyledButton)`
padding: 10px;
`;


type SearchFormProps = {
    searchTerm: string;
    onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  };



const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
    }: SearchFormProps) => (
            <StyledSearchForm onSubmit={onSearchSubmit} >

                <InputWithLabel
                    id="search"
                    value={searchTerm}
                    isFocused
                    onInputChange={onSearchInput}
                    >
                    <strong>Search:</strong>
                </InputWithLabel>

                <StyledButtonLarge type="submit" disabled={!searchTerm} >
                    Submit
                </StyledButtonLarge>
    </StyledSearchForm >
    );
export default SearchForm;
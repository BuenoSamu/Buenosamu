import React from 'react';
import styled from 'styled-components';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  height: 40px;
  padding: 0 16px 0 40px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  width: 280px;
  outline: none;
  background: #fff;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3068f2;
  }
`;

const Icon = styled.span`
  position: absolute;
  left: 12px;
  color: #aaa;
  font-size: 16px;
  pointer-events: none;
`;

const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  placeholder = 'Pesquisar...',
}) => {
  return (
    <InputWrapper>
      <Icon>🔍</Icon>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};

export default Search;

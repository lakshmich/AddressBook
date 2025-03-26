import React from "react";
import styled from "styled-components";

const Input = styled.input`
  display: flex;
  height: 40px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 8px 12px;
  font-size: 16px;
  color: #333;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &::placeholder {
    color: #888;
  }

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.3);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

Input.displayName = "Input";

export default Input;
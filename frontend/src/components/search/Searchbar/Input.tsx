import styled from "styled-components";

export default styled.input`
  width: calc(100% - 30px - 10px - 30px);
  height: 30px;
  margin: 0 10px 0 10px;

  background-color: transparent;
  border: none;

  font-weight: medium;
  color: #8b95a1;
  font-size: 20px;

  :focus {
    outline: none;
  }
`;

import styled from "styled-components";

type Props = {
  size?: number;
};

export default styled.button<Props>`
  position: absolute;
  right: 20px;

  width: ${(props): number => props.size || 30}px;
  height: ${(props): number => props.size || 30}px;
  background-image: url("https://static.toss.im/icons/png/4x/icn-searchfield.png");
  background-repeat: no-repeat;
  background-size: ${(props): number => props.size || 30}px;
  border: none;
  border-radius: 50px;
  outline: none;

  transition: background-color 0.5s ease;

  :active {
    background-color: #555;
  }
`;

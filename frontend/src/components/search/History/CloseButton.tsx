import styled from "styled-components";

const SIZE = 20;

export default styled.button`
  margin: 5px;
  background-color: transparent;
  border: none;
  outline: none;

  height: ${SIZE}px;
  width: ${SIZE}px;
  position: relative;
  box-sizing: border-box;
  line-height: ${SIZE}px;
  display: inline-block;

  &:before,
  &:after {
    width: ${SIZE}px;
    height: 5px;
    transform: rotate(-45deg);
    content: "";
    position: absolute;
    top: 50%;

    display: block;
    height: height;
    width: width;
    background-color: #555;
    transition: all 0.2s ease-out;
  }

  &:after {
    transform: rotate(45deg);
  }

  &:hover {
    &:before,
    &:after {
      transform: rotate(0deg);
    }
  }
`;

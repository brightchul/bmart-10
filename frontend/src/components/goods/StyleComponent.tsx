import styled from "styled-components";
export const EtcInfo = styled.div`
  margin-bottom: 4em;
`;

export const ButtonArea = styled.div`
  position: fixed;
  bottom: 80px;
  width: 100%;
  height: 3em;
  text-align: center;
  background: #fff;
  border: none;
`;

export const Button = styled.button`
  width: 96%;
  height: 3em;
  border-radius: 10px;
  border: none;
  background: #007440;
  color: #fff;
  font-weight: 900;
  font-size: 1em;
`;

export const Shadow = styled.div`
  background-color: #000;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  display: none;
  opacity: 0.5;
  z-index: 3000;
`;

export const HideArea = styled.div`
  border-radius: 15px 15px 0px 0px;
  position: fixed;
  background-color: #fff;
  width: 100%;
  bottom: 0px;
  transition: transform 0.2s linear;
  z-index: 3000;
`;
export const HideAreaHeader = styled.div`
  position: relative;
  text-align: center;
  padding: 1em;
`;

export const HideAreaContent = styled.div`
  padding: 1em;
  border-top: 1px solid #eee;
`;

export const CounterWapper = styled.div`
  width: 6em;
  text-align: center;
  border: 1px solid black;
  padding: 10px;
  display: inline-block;
  border-radius: 19px;
`;

export const CounterText = styled.span`
  display: inline-block;
  width: 2em;
  text-align: center;
`;

export const BagButton = styled.div`
  text-align: center;
  border: 1px solid #007440;
  border-radius: 10px;
  padding: 1em;
  background-color: #007440;
  color: #fff;
  position: relative;
`;

export const RightSpan = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`;

export const PlusMinusSpan = styled.span`
  line-height: 0;
  font-size: 1.5em;
  vertical-align: baseline;
`;

export const ItemImg = styled.div`
  height: 4em;
  width: 4em;
  background-size: cover;
`;

export const ItemInfo = styled.div`
  flex-grow: 1;
  max-width: 50vw;
  padding: 0px 10px;
`;

export const ItemContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3em;
`;

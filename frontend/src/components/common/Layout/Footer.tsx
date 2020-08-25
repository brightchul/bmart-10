import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Svg from "../Svg";

import { COLOR, SVG } from "../../../constants/style";
import { FOOTER } from "../../../constants/layout";

import * as ROUTES from "../../../constants/routes";

const Wrap = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 2000;

  width: 100%;
  height: ${FOOTER.SIZE}px;
  background-color: ${COLOR.WHITE};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-top: 1px solid ${COLOR.GREY_1};

  .nav {
    color: ${COLOR.GREY_2};
    text-decoration: none;
    path {
      fill: ${COLOR.GREY_2};
    }
  }
  .nav_selected {
    color: ${COLOR.GREEN_1};
    path {
      fill: ${COLOR.GREEN_1};
    }
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const navList = [
  {
    path: ROUTES.HOME.path,
    name: ROUTES.HOME.title,
    svg: SVG.HOME,
  },
  {
    path: ROUTES.SEARCH.path,
    name: ROUTES.SEARCH.title,
    svg: SVG.SEARCH,
  },
  {
    path: ROUTES.CART.path,
    name: ROUTES.CART.title,
    svg: SVG.CART,
  },
  {
    path: ROUTES.MENU.path,
    name: ROUTES.MENU.title,
    svg: SVG.MENU,
  },
];

type Props = {
  path: string;
  name: string;
  svg: string;
};

const NavItem = (props: Props): JSX.Element => {
  const { path, name, svg } = props;
  return (
    <NavLink exact to={path} activeClassName="nav_selected" className="nav">
      <Item
        onClick={(): void => {
          window.onscroll = null;
        }}
      >
        <Svg size={36} fill={COLOR.GREY_2} path={svg} />
        <p>{name}</p>
      </Item>
    </NavLink>
  );
};

const Footer = (): JSX.Element => {
  return (
    <Wrap>
      {navList.map((item) => (
        <NavItem key={item.path} {...item} />
      ))}
    </Wrap>
  );
};

export default Footer;

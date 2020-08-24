import React, { useState } from "react";
import Flicking from "@egjs/react-flicking";
import { FlickingEvent } from "@egjs/flicking";
import styled from "styled-components";

import Menu from "./Menu";

const threshold = 2740;
const HEIGHT = 400;

const Wrapper = styled.div<{ innerHeight: number }>`
  width: 100%;
  height: ${(props): number => props.innerHeight}px;

  background-color: #eee;

  &.sticky {
    z-index: 3000;
    position: fixed;
    top: 80px;
  }
`;

type Props = {
  innerHeight?: number;
  menus: Array<string>;
  store: {
    flicking: Flicking | undefined;
  };
};

export default function Menus(props: Props): JSX.Element {
  const [sticky, setSticky] = useState(false);

  let debounceFlag = false;
  const debounceTime = 20;

  const observable = {
    map: new Map<string, React.Dispatch<React.SetStateAction<boolean>>>(),
    trigger: function (key: string): void {
      const beforeHandler = this.map.get(this.lastTarget);
      const handler = this.map.get(key);

      if (beforeHandler) {
        beforeHandler(false);
      }

      if (handler) {
        handler(true);
        this.lastTarget = key;
      }
    },
    lastTarget: props.menus[0],
  };

  window.onscroll = function (): void {
    if (window.pageYOffset > threshold) {
      setSticky(true);

      if (debounceFlag) return;
      debounceFlag = true;

      if (props.store.flicking) {
        props.store.flicking.moveTo(
          Math.floor((window.pageYOffset - threshold) / HEIGHT),
          300
        );
      }

      setTimeout(() => {
        debounceFlag = false;
      }, debounceTime);
    } else {
      setSticky(false);
    }
  };

  return (
    <Wrapper
      innerHeight={props.innerHeight || 50}
      className={sticky ? "sticky" : undefined}
    >
      <Flicking
        duration={500}
        gap={10}
        ref={(e: Flicking): void => {
          props.store.flicking = e;
          observable.trigger(props.menus[0]);
        }}
        onMoveEnd={(e: FlickingEvent): void =>
          observable.trigger(props.menus[e.index])
        }
        overflow={false}
        hanger={"0"}
        anchor={"0"}
        collectStatistics={false}
        autoResize={true}
      >
        {props.menus.reverse().map((menu, index) => (
          <Menu key={`menu.${index}`} menu={menu} observable={observable} />
        ))}
      </Flicking>
    </Wrapper>
  );
}

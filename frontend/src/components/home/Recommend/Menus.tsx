import React from "react";
import Flicking from "@egjs/react-flicking";
import { FlickingEvent } from "@egjs/flicking";
import styled from "styled-components";

import Menu from "./Menu";

import { RECOMMEND_SECTION } from "../../../constants/layout";

let THRESHOLD = 2740;
const DEBOUNCE_TIME = 20;

const WW = styled.div<{ innerHeight: number }>`
  width: 100%;
  height: ${(props): number => props.innerHeight}px;
`;

const Wrapper = styled.div<{ innerHeight: number }>`
  width: 100%;
  height: ${(props): number => props.innerHeight}px;
  position: absolute;
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
};

export default function Menus(props: Props): JSX.Element {
  let wrapper: HTMLDivElement | null = null;
  let flicking: undefined | Flicking = undefined;
  let debounceFlag = false;

  const highlightObserver = {
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
    if (window.pageYOffset > THRESHOLD) {
      wrapper?.classList.add("sticky");

      if (debounceFlag) return;
      debounceFlag = true;

      if (flicking) {
        flicking.moveTo(
          Math.floor((window.pageYOffset - THRESHOLD) / RECOMMEND_SECTION.SIZE),
          300
        );
      }

      setTimeout(() => {
        debounceFlag = false;
      }, DEBOUNCE_TIME);
    } else {
      wrapper?.classList.remove("sticky");
    }
  };

  return (
    <WW innerHeight={props.innerHeight || 50}>
      <Wrapper
        innerHeight={props.innerHeight || 50}
        ref={(el: HTMLDivElement | null): void => {
          if (el) {
            const bounding = el.getBoundingClientRect();
            const height = window.pageYOffset;

            THRESHOLD = Math.floor(height + bounding.top - 80);
          }

          wrapper = el;
        }}
      >
        <Flicking
          duration={500}
          gap={10}
          ref={(e: Flicking): void => {
            flicking = e;
            highlightObserver.trigger(props.menus[0]);
          }}
          onMoveEnd={(e: FlickingEvent): void =>
            highlightObserver.trigger(props.menus[e.index])
          }
          overflow={false}
          hanger={"0"}
          anchor={"0"}
          collectStatistics={false}
          autoResize={true}
        >
          {props.menus.map((menu, index) => (
            <Menu
              key={`menu.${index}`}
              menu={menu}
              observable={highlightObserver}
            />
          ))}
        </Flicking>
      </Wrapper>
    </WW>
  );
}

import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import PLACE_HOLDER from "./placeholder.jpg";
import {imgURL} from "./../../../utils/func";

type Props = {
  imageURL: string;
};

let observer: IntersectionObserver | null = null;

function onIntersection(
  entries: IntersectionObserverEntry[],
  io: IntersectionObserver
): void {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent("loadImage"));
    }
  });
}

const Image = styled.div<Props>`
  width:80px;
  height:80px;
  margin:10px;
  background-image: url("${(props): string => props.imageURL}");
  background-repeat: no-repeat;
  background-size: cover;
`;

export default function LazyImage(props: Props): JSX.Element {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    function loadImage(): void {
      setIsLoad(true);
    }

    const imgEl = imgRef.current;
    imgEl && imgEl.addEventListener("loadImage", loadImage);
    return (): void => {
      imgEl && imgEl.removeEventListener("loadImage", loadImage);
    };
  }, []);

  useEffect(() => {
    if (!observer) {
      observer = new IntersectionObserver(onIntersection, {
        threshold: 0.5, // 절반이 보일 때 로딩함
      });
    }
    imgRef.current && observer.observe(imgRef.current);
  }, []);

  return (
    <Image
      ref={imgRef}
      imageURL={isLoad ? `${imgURL(props.imageURL)}` : PLACE_HOLDER}
    />
  );
}

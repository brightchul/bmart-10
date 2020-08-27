import React from "react";

type Props = {
  size: number;
  fill: string;
  path: string;
};

const SVG = (props: Props): JSX.Element => {
  const { size, fill, path } = props;

  return (
    <svg width={`${size}px`} height={`${size}px`}>
      <path fill={fill} d={path} fillRule="evenodd" />
    </svg>
  );
};

export default SVG;

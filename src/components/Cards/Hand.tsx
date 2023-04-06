import React, { FC, PropsWithChildren } from "react";

interface HandProps extends PropsWithChildren { }

const Hand: FC<HandProps> = ({ children }) => {
  const cards = React.Children.toArray(children);

  const cardWidth = 100;
  const cardHeight = cardWidth * 1.5;

  const handWidth = cardWidth * cards.length;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: `translateX(-${handWidth / 2}px)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: handWidth,
        height: cardHeight,
      }}
    >

    </div>
  );
};

export { Hand };

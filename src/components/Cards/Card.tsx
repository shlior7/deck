import React, { useEffect, useRef, useState } from "react";
import { useTableContext } from "../Table/TableContext";
import DraggableWrapper from "./DraggableWrapper";

const Card: React.FC = () => {
  return (
    <DraggableWrapper
    >
      <svg width="100" height="140">
        <rect
          width="100"
          height="140"
          rx="10"
          ry="10"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
        <text x="10" y="30" fontSize="30" fill="red" fontWeight="bold">
          A
        </text>
        <text x="80" y="120" fontSize="30" fill="red" fontWeight="bold">
          &#9829;
        </text>
      </svg>
    </DraggableWrapper>
  );
};

export default Card;

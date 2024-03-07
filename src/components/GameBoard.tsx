import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';

type SliceProps = {
  index: number;
  numSlices: number;
  sliceAngle: number;
  centerX: number;
  centerY: number;
  radius: number;
  onClick: (index: number) => void;
};

const Slice: React.FC<SliceProps> = ({ index, numSlices, sliceAngle, centerX, centerY, radius, onClick }) => {
  const startAngle = sliceAngle * index - Math.PI / 2;
  const endAngle = startAngle + sliceAngle;
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    onClick(index);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const pathCommands = [
    `M ${centerX} ${centerY}`,
    `L ${centerX + radius * Math.cos(startAngle)} ${centerY + radius * Math.sin(startAngle)}`,
    `A ${radius} ${radius} 0 ${(endAngle - startAngle > Math.PI) ? 1 : 0} 1 ${centerX + radius * Math.cos(endAngle)} ${centerY + radius * Math.sin(endAngle)}`,
    'Z'
  ];

  return (
    <g
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

    >
      <path
        d={pathCommands.join(' ')}
        fill={isHovering ? 'lightgray' : 'gray'}
        stroke="black"
        strokeWidth="1"
      />
      <text
        x={centerX + radius * Math.cos((startAngle + endAngle) / 2)}
        y={centerY + radius * Math.sin((startAngle + endAngle) / 2)}
        textAnchor="middle"
        dominantBaseline="central"
        fill="red"
      >
        {index}
      </text>
    </g>
  );
};

interface BoardProps extends PropsWithChildren { numPlayers: number }

const Board: React.FC<BoardProps> = ({ numPlayers, children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [boardWidth, setBoardWidth] = useState(0);
  const [boardHeight, setBoardHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      const wrapperRect = wrapperRef.current?.getBoundingClientRect();
      if (wrapperRect) {
        setBoardWidth(wrapperRect.width);
        setBoardHeight(wrapperRect.height);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleClick = (index: number) => {
    console.log('Clicked index:', index);
  };

  const centerX = boardWidth / 2;
  const centerY = boardHeight / 2;
  const radius = Math.min(boardWidth, boardHeight) * 0.4;
  const sliceAngle = 2 * Math.PI / numPlayers;

  const slices = Array.from(Array(numPlayers).keys()).map((i) => (
    <Slice
      key={i}
      index={i}
      numSlices={numPlayers}
      sliceAngle={sliceAngle}
      centerX={centerX}
      centerY={centerY}
      radius={radius}
      onClick={handleClick}
    />
  ));

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg viewBox={`0 0 ${boardWidth} ${boardHeight}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="black" strokeWidth="1" />
        {slices}
        {children}
      </svg>
    </div>
  );
};


export default Board;

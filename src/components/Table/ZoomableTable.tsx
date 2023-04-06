import React, { FC, PropsWithChildren, useState } from "react";

interface ZoomableTableProps extends PropsWithChildren { }

export const ZoomableTable: FC<ZoomableTableProps> = ({ children }) => {
  const [scale, setScale] = useState(1);

  const handleZoom = (event: React.WheelEvent<HTMLDivElement>) => {
    const delta = event.deltaY;
    const zoomStep = 0.1;
    const newScale = scale + (delta > 0 ? -zoomStep : zoomStep);

    if (newScale >= 0.1 && newScale <= 3) {
      setScale(newScale);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
      onWheel={handleZoom}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: '50vw',
          height: '50vh',
          backgroundColor: '#3333',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
        }}
      >
        {children}
      </div>
    </div>
  );
};

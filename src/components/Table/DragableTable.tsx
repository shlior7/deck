import React, { useState, useRef, useEffect, FC, PropsWithChildren } from "react";
import { TableContext } from "./TableContext";

interface DraggableTableProps extends PropsWithChildren { }

export const DraggableTable: FC<DraggableTableProps> = ({ children }) => {
  const screenContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });
  const [initialTranslate, setInitialTranslate] = useState({ x: 0, y: 0 });

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();

    const zoomFactor = 0.1;
    const zoom = event.deltaY > 0 ? 1 - zoomFactor : 1 + zoomFactor;

    setScale((prevScale) => Math.min(Math.max(0.1, prevScale * zoom), 3));
  };

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();

    setInitialMousePosition({ x: event.clientX, y: event.clientY });
    setInitialTranslate({ ...translate });
  };

  const handleMouseMove = (event: MouseEvent) => {
    event.preventDefault();

    if (initialMousePosition && event.buttons !== 0) {
      const diffX = event.clientX - initialMousePosition.x;
      const diffY = event.clientY - initialMousePosition.y;

      setTranslate({
        x: initialTranslate.x + diffX,
        y: initialTranslate.y + diffY,
      });
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    const firstTouch = event.touches[0];

    if (initialMousePosition && firstTouch) {
      const diffX = firstTouch.clientX - initialMousePosition.x;
      const diffY = firstTouch.clientY - initialMousePosition.y;

      setTranslate({
        x: initialTranslate.x + diffX,
        y: initialTranslate.y + diffY,
      });
    }
  };

  const handleMouseUp = () => {
    setInitialMousePosition(null as any);
  };

  const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault();

    const firstTouch = event.touches[0];
    if (firstTouch) {
      setInitialMousePosition({ x: firstTouch.clientX, y: firstTouch.clientY });
      setInitialTranslate({ ...translate });
    }
  };

  const handleTouchEnd = () => {
    setInitialMousePosition(null as any);
  };

  const addListeners = () => {
    const screenContainer = screenContainerRef.current;
    if (!screenContainer) return;

    screenContainer.addEventListener("mousedown", handleMouseDown);
    screenContainer.addEventListener("mousemove", handleMouseMove);
    screenContainer.addEventListener("mouseup", handleMouseUp);
    screenContainer.addEventListener("touchstart", handleTouchStart);
    screenContainer.addEventListener("touchmove", handleTouchMove);
    screenContainer.addEventListener("touchend", handleTouchEnd);
  }

  const removeListeners = () => {
    const screenContainer = screenContainerRef.current;
    if (!screenContainer) return;

    screenContainer.removeEventListener("mousedown", handleMouseDown);
    screenContainer.removeEventListener("mousemove", handleMouseMove);
    screenContainer.removeEventListener("mouseup", handleMouseUp);
    screenContainer.removeEventListener("touchstart", handleTouchStart);
    screenContainer.removeEventListener("touchmove", handleTouchMove);
    screenContainer.removeEventListener("touchend", handleTouchEnd);
  }
  useEffect(() => {
    const screenContainer = screenContainerRef.current;
    if (!screenContainer) return;

    addListeners()

    return () => {
      removeListeners()
    };
  }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <TableContext.Provider value={{ stopTableDragging: removeListeners, startTableDragging: addListeners }}>
      <div
        ref={screenContainerRef}
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          touchAction: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
        }}
      >
        {children}
      </div>
    </TableContext.Provider>

  );
};

import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useTableContext } from "../Table/TableContext";

interface DraggableWrapperProps extends PropsWithChildren { }

interface Position {
  x: number;
  y: number;
}

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({ children }) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const TableContext = useTableContext();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    TableContext?.stopTableDragging();
    event.stopPropagation();
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: position.x + event.movementX,
        y: position.y + event.movementY
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    TableContext?.startTableDragging();
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const cardRect = cardRef.current?.getBoundingClientRect();

      if (cardRect) {
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const mouseDistanceX = event.clientX - cardCenterX;
        const mouseDistanceY = event.clientY - cardCenterY;

        setPosition({
          x: position.x + mouseDistanceX,
          y: position.y + mouseDistanceY
        });
      }
    }
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (event: MouseEvent) => {
        setPosition({
          x: position.x + event.movementX,
          y: position.y + event.movementY
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
    else return () => { }
  }, [isDragging, position]);

  return (
    <div
      ref={cardRef}
      draggable={false}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDragStart={handleDragStart}
      onMouseLeave={handleMouseLeave}
      style={{ position: "absolute", left: position.x, top: position.y }}
    >
      {children}
    </div>
  );
};

export default DraggableWrapper;

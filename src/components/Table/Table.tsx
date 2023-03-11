import React, { useState, Children, PropsWithChildren } from "react";
interface TableProps extends PropsWithChildren {
}

const Table: React.FC<TableProps> = (props) => {
  if(typeof window === 'undefined') return null;
  const items = Children.toArray(props.children);

  const radians = (deg: number) => deg * (Math.PI / 180);

  const angleStep = 360 / items.length;
  console.log( window.innerHeight, window.innerWidth)
  const menuRadius = window.innerHeight / 3;
  const menuX = window.innerWidth / 2;
  const menuY = window.innerHeight / 2;

  const itemRadius = 100;

  return (
    <div style={{ position: "relative" ,width:"100%"}}>
        <div style={{ position: "absolute",height:"100%" }}>
          {items.map((item, index) => {
            const angle = angleStep * index;
            const x = menuX + menuRadius * Math.cos(radians(angle));
            const y = menuY + menuRadius * Math.sin(radians(angle));
            const rotation = angle + 90;

            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: y - itemRadius,
                  left: x - itemRadius,
                  width: itemRadius * 2,
                  height: itemRadius * 2,
                  borderRadius: "50%",
                  backgroundColor: "lightblue",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: `rotate(${rotation}deg)`
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
    </div>
  );
};

export default Table;

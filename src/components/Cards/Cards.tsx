import React from "react";
import { CardClassCode } from "src/types";
import Card from "./Card";
import styles from './Card.module.css';

type CardsProps = 
{
  cardsCodes: CardClassCode[];
}

const Cards:React.FC<CardsProps> = ({cardsCodes}) =>{
  return (
    <div>
      {cardsCodes.map((code, index) => {
        return (
          <div
            key={index}
          >
            <li className={styles.card}><div className={`pcard-${code}`} style={{backgroundSize:"50%"}} /></li>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;

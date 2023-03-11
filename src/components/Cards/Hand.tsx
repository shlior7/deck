import React, { useState } from 'react';
import { CardClassCode } from 'src/types';
import Card from './Card';
import styles from './Card.module.css';
type CardsProps = 
{
  cards: CardClassCode[];
}

const Hand:React.FC<CardsProps> = (props) => {
  const cards = props.cards.map((code) => <Card code={code}/>)
  
  return (
    <div className={styles.cards}>
      <ul className={styles.cards_spread}>
        {cards}
      </ul>
    </div>
  );
}

export default Hand;

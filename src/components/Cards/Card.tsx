import React from 'react';
import { CardClassCode } from 'src/types';

type CardProps = {
  code: CardClassCode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <li><div className={`pcard-${props.code}`} style={{width:"100px"}}/></li>
  );
}
export default Card;

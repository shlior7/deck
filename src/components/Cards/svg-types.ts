export type CardSymbols = 'club' | 'diamond' | 'heart' | 'spade'
export type CardVlues = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'jack' | 'queen' | 'king'

const svg = {
  joker: (value: 'black' | 'red') => `joker_${value}`,
  club: (value: CardVlues) => `club_${value}`,
  diamond: (value: CardVlues) => `diamond_${value}`,
  heart: (value: CardVlues) => `heart_${value}`,
  spade: (value: CardVlues) => `spade_${value}`,
  back: 'back',
}

export type CardSvgCode = `${CardSymbols}_${CardVlues}` | `joker_${'black' | 'red'}` | 'back';

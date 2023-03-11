export const cardsIds = ["2H", "2D", "2C", "2S", "3H", "3D", "3C", "3S", "4H", "4D", "4C", "4S", "5H", "5D", "5C", "5S", "6H", "6D", "6C", "6S", "7H", "7D", "7C", "7S", "8H", "8D", "8C", "8S", "9H", "9D", "9C", "9S", "10H", "10D", "10C", "10S", "?"
  , "AH", "AS", "AC", "AD", "JH", "JS", "JC", "JD", "QH", "QS", "QC", "QD", , "KH", "KS", "KC", "KD"] as const;

export type CardCode = Lowercase<NonNullable<typeof cardsIds[number]>>;
export type CardClassCode = CardCode | 'joker_black' | 'joker_red' | 'back';
export type CardSymbol = '♥' | '♦' | '♣' | '♠';
export type Preposition = 'above' | 'under' | 'middle'
export type Face = 'up' | 'down'

export type Card = {
  code: CardCode,
  name: string,
  active: boolean,
  symbol?: CardSymbol,
  relation?: { code: CardCode, prepos: Preposition }
}

export type CardCompact = { code: CardCode, active: boolean }
export type Pile = CardCompact[]
export type Side = Pile[]

const pile = ['1H', '1D', '1C']
// const side: Side = [
//   [
//     { code: "1H", active: true, },
//     { code: "1D", active: true, },

//   ],
//   [
//     { code: "1C", active: true, },
//     { code: "1S", active: true, },
//     { code: "2H", active: true, },
//   ],
//   [{ code: "6D", active: true, },]
// ]

export type Board = {
  center: { deck: Side, user1: Side, user2: Side }
  game: { user1: Side, user2: Side }
  home: { user1: Side, user2: Side }
  discard: { cards: CardCompact[] }
}

export type BoardCompact = {
  user1: { hand: CardCompact[], home: CardCompact[], center: CardCompact[], game: CardCompact[] }
}

export type FOptions = {
  hand: { loc: number, active: boolean }
  outter: {}
  center: { deck: boolean, prepos: Preposition }
  inner: {}
  discard: {}
}

export type Play = {
  user: string,
  card: Card,
}

const ActionsExample = [
  {
    cards: [{ code: '6S', active: true }],
    user: 'Lior',
    from: { f: 'hand', options: { loc: 3 } }
  }
]

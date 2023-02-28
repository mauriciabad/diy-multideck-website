---
post: 
   date: 2023-02-21
   ogImagePath: '/images/games/uno/guide.png'
game:
  bgg: 'https://boardgamegeek.com/boardgame/2223/uno'
  rules: 'https://www.unorules.org/'
  image: 'https://cf.geekdo-images.com/6V2cU_EV_vPdE_C3MEyMkw__itemrep/img/5PllXAcUEihn4JdqHc9YM2qfU8M=/fit-in/246x300/filters:strip_icc()/pic6332152.png'
  title: 'UNO'
  description: "Get rid of your cards first, but don't forget to say \"UNO!\""
mapping:
  requiredCardsCount: 112
  requiredDrawingsCount: 24
  deckVersion: "v0.4b"
  compatibility: 4
---

## Cards selection and drawing

To play UNO you need 112 cards and 24 drawings.

### Instructions

![cards mapping](/images/games/uno/guide.png)

1. Select all cards exept the ranks `X`.
1. In the cards with rank greater than `20` in the top-right corner, for every suit, draw:
   - 2x Skip
   - 2x Reverse
   - 2x Draw 2
   - 1x Wild
   - 1x Wild Draw 4

|   |   |   |   |   |
|:-:|:-:|:-:|:-:|:-:|
| ![icon-1](/images/games/uno/icon-1.png) | ![icon-2](/images/games/uno/icon-2.png) | ![icon-3](/images/games/uno/icon-3.png) | ![icon-4](/images/games/uno/icon-4.png)| ![icon-5](/images/games/uno/icon-5.png) |
| Skip  | Reverse  | Draw 2  | Wild  |  Wild Draw 4 |

## Usage

- Notice that on the cards with a value above 10, you can tell what number it matches by ignoring the decimal digit. Like so: `11` → `1`, `12` → `2`, `13` → `3`, `14` → `4`...

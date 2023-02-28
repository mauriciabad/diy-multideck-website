# The DIY Multideck

> Draw in your cards!

The DIY multideck is a deck of 120 poker-sized playing cards that lets you play many games by using a bit of imagination and sometimes drawing in the cards. The cards have

## Feature list

- Corners:
  - 12 suits of 10 ranks (top-left).
  - 8 suits of 15 ranks (bottom-right).
  - 4 suits of 30 ranks (bottom-left).
  - Numbers from 0 to 119 (top-right).
- Draw in the cards: words, points, icons, tiles, boards, etc.
  - Up to 16 drawing slots in each card, grouped in 5 drawing areas.
    - A: Top and bottom, 1 big or 2 small slots.

    - B: Below the suits, 1 small slot.

    - C: Below area A, 3 small slots.

    - D: Center grid, 4 big rectangular slots.

    - E: Card center, circle slot.
- Edge marks, to represent paths. 12 sets of 10 combinations (all).
- Random numbers / Dice throws:
  - Out of: 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 30.
  - Polyhedral dice set for GPG/DND/MTG (D4, D6, D8, D10, D12, D20).
  - Coin flip
- Random letter
  - 3 times the alphabet.
  - 36 other letters to make the abecedary of 35 languages.
  - 5 symbols to use as wildcards or others.
- Counting system using the cards' back face. For counting: points, coins, lives, etc.
  - Stacking method: Very clear, but multiple cards used.
  - Pointing method: Only 2 cards used, but less clear.
- Usability
  - 5 explanation cards.
  - 5 notes cards.
  - Distinct shapes and colors for the suits (color-blind friendly).
  - Standard poker card size.
  - Hint below the suit.
  - Drawing slots:
    - Designed to let you draw twice, upright and upside-down, to make cards work both ways.
    - Big enough for handwriting, but not too much.
    - Variated shapes strategically placed, to cover a wide variety of needs and keep organization.
  - Systems to avoid confusions when playing:
    - All card corner's numbers match in the units digit.
    - All cards from 8 out of 12 suits, match the number in the top-left and bottom-right corner.
    - Card number unit digit is highlighted, and always matches the top-left corner.
    - When the corners don't match, the suit has a black border or the rank is a letter.

## Features In-Depth

### Why drawing?

Even tough it may seem like by drawing you'll destroy your cards, they'll look very ugly and you'll have wasted them, the truth is the opposite: **if you don't do draw on them, you're wasting the cards**. Because they are meant to provide a solid base to play many games (the card corners) and use the remaining space to add the special cards that make each game unique.

I decided not to fill the cards with information, about my favorite games, and force you to adapt to my criteria. But instead, **let you choose what games you want to have in your deck**. This ensures all the information in the cards is used in some way, and makes them so much minimalistic and versatile.

In this website, there's a section with many game mapping instructions, hopefully you'll enjoy some of them. And if a game you want is not there, just think by yourself how to map it, and if you feel generous, submit a proposal.

### Drawing areas

![drawing-areas](/images/home/drawing-areas.png)

### Usability

- 66% (80/120) of the cards match in the top-left and bottom-right corners.
  - 8 suits from 0 to 9 match corners.
  - The suits with a black border (4 suits from 0 to 9) or ranks with a letter () don't have matching corners.
- High contrast in important elements.

### Path

![paths](/images/home/paths.svg)

All combinations, allowing rotations, 12 times. Or all combinations, not allowing rotations, 6 times.

All suits (the ones from 0 to 9), have the same set of paths.

### Random numbers or Dice throws

![random-numbers](/images/home/random-numbers.svg)

Each card has 12 random numbers. The random numbers are out of: **3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 30**.

This can be used as dice throws. The deck includes the **DND dice set** in the cards (D4, D6, D8, D10, D12, D20)

The random number, actually is the result of the modulus operation, from [modular arithmetic](https://en.wikipedia.org/wiki/Modular_arithmetic), between the card number (top right corner) and the total (bottom number in the fraction). This is to ensure all values are equally distributed.

In 2 cases, there are some random numbers that have slightly more chances of appearing than others. Because 7 and 9 are not factors of 120, there are extra values.

- For 7, there's an extra 7 in the deck. So obtaining a 7 is 0.83% more likely than a another number, negligible.
- For 9, there's an extra 9, 1, and 2 in the deck. So obtaining a 9, 1, or 2  is 0.83% more likely than a another number, negligible.

If, for some weird reason, you need absolute precision when drawing a random number out of 7, 9, or a total not in the cards, don't use this feature. Instead, select all the cards with the possible results you want in the card number (top right corner), shuffle and pick one.

#### Coin flip

![coin-flip](/images/home/coin-flip.svg)

There's also a coin flip in the middle of the random numbers.

When the card number is even, it's a head, and when the card number is odd, it's tails.

### Letter

![letters](/images/home/letters.svg)

At the bottom center of every card there's a letter. It can be a Latin letter, an other letter or a symbol. These are the letters from every set:

- **Latin** letters: ABCDEFGHIJKLMNOPQRSTUVWXYZ
- **Other** letters: ÁÅÄĄÆĆČÇÐÉĖĘĞÍĮŁŃÑÓÖŐÕØŚŠŞẞÚÜŰŲŪÝŹŽŻÞ
- **Symbols**: *•@#$

The "Latin letters" are repeated 3 times.

The "Other letters" are there to complete the abecedary of 35 languages. This are the supported language abecedaries: English, Afrikaans, Arabic, Bulgarian, Catalan, Croatian, Danish, Dutch, Estonian, Faroese, Finnish, French, German, Greek, Hebrew, Hungarian, Icelandic, Indonesian, Irish, Italian, Latin, Lithuanian, Malagasy, Malay, Norwegian, Polish, Portuguese, Romanian, Russian, Slovenian, Spanish, Swedish, Turkish, Ukrainian, Welsh.

The "Symbols" an be used as wildcards.

### Counting

![counting](/images/home/counting.png)

The back side of the cards also has utility, they serve as counters.

You can add a title to the counter by writing it in the area A of a card and putting it below. Don't overuse this technique or you'll run out of space, for example, if every player only has to count coins, don't put titles on the counters, it's assumed they are points.

- **Stacking method**: Very clear, but multiple cards used.
  - Stack cards upright (worth 1) or upside-down (worth 5), the sum is the result.
- **Pointing method**: Only 2 cards used, but less clear.
  - Put 2 cards on top of each other, and align the arrow from the card in front to point a number in the card on the back, the pointed number is the result.
  - You can rotate the front card, and count negative or positive points.

## Cards in the deck

### Card fronts

The cards can be arranged in many ways. These are the two most representative arrangement.

#### Groups of 10

> Up-left corner: 12 suits of 10 ranks
>
> Up-right corner: Numbers from 0 to 119
>
> Borders: 12 sets of 10 paths

This arrangement also displays the numbers in ascending order. Also, the letters are in alphabetical order, and the special letters and symbols are at the end.

![mini-cards-10](/images/home/mini-cards-10.png)

#### Groups of 15

> Bottom-right corner: 8 suits of 15 ranks
>
> Bottom-left corner: 4 suits of 30 ranks

The cards are meant to be used rotated 180 degrees.

![mini-cards-15](/images/home/mini-cards-15.png)

### Explanation cards

The cards are printed in grids of 3x3 in DIN A4 sheets, so to print 120 cards, there are 6 spaces left. These spaces are used to add a cover card and 5 explanation cards.

The information is very condensed because there isn't much space. So they are meant to be a reminder, not a complete explanation.

![special-cards](/images/home/special-cards.png)

### Card backs

![back-cards](/images/home/back-cards.png)

#### Notes cards

Use them to keep any useful information.

Some use cases are:

- Player aid.
- Simplified game board.
- Game setup (what cards, how many per player...).
- Definition/Diagram of specific rule or mechanic.
- List of games in the deck.

#### Regular card backs

50% of the regular card backs are inverted, in a non-alternating way. Otherwise, if someone was holding a card upright, the other players would know he's holding not holding a letter (XAJQK) for sure.

## Other details

### Suit names

The name of the suits are:

|         |         |           |         |
| :-----: | :-----: | :-------: | :-----: |
|  Clubs  |  Drops  |  Hearts   | Leaves  |
| Spades  |  Magic  | Diamonds  | Crowns  |
|  Poops  | Bubbles |  Flowers  | Candies |
| Mosaics | Spikes  | Lollypops |  Cells  |

### Design choices

- The rank is inside the suit to save up space. The downside is that it requires players to spread more the cards in hand to see the rank, but it's not uncomfortable.
- The bottom-left suits are composited by the 3 colors of the cards they appear in, this way they look different from the other one-colored suits, and at the same time don't look too different because the average color tone is close to the one of the card.
- All suits are very distinct shapes.
- The colors of the suits can be grouped by similar hue in pairs but also trios.
- 4 of the suits are the ones from the French deck because this lets players use the cards as poker cards. The colors are also similar, black/ gray and red/orange, to keep consistency with the traditional deck but also to have different colors for modern games.
- The slogan "Draw your cards" is there to encourage people to draw, and lose the fear of drawing in cards. It's fine! If you run out of space, you'll have amortized very well the cards, don't worry.
- The black suit is the first one, because the it's cards' numbers only have units digits and they don't need to be highlighted, otherwise, highlighting black with black wouldn't work.

### Inspiration

> Read more in the blog post

Explain everdeck, rainbow deck and some more.

### Printing

> Read more in the blog post

Designed to be ready to print

### Is it legal?

**Yes!** Selling/buying or printing the DIY Multideck is legal, even if the porpoise is to play other games. Also, this website, with explanations of how to play other games, an all it's contents, is legal.

Board games are generally not protected intellectual property. What is usually protected with copyright, are the assets they use, like: cards, tokens, boards or rulebooks. Some game mechanics may be patented, but it's very rare.

Explaining how to play a board game is legal, as long as you don't use copyrighted material without permission to do so.

About the trademarks; in this case, using other board games names and logos is fare use because it's "Informational use", also called "editorial use".

About the copyright; in this case, no assets from the game are used in the deck or this website.

## Appendix

### Vocabulary

- **Suit**: In a card, the shape and color. ([Wikipedia](https://en.wikipedia.org/wiki/Playing_card_suit))
- **Ranks**: In a card, the numbers or letter.

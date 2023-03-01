---
title: "The DIY Multideck"
description: ""
date: 2023-02-28
draft: false
---

> Draw in your cards!

The DIY multideck is a deck of 120 poker-sized playing cards that lets you play many games by using a bit of imagination and sometimes drawing in the cards. The cards are meant to be drawn on, so don't be afraid! Draw on the cards to create game-specific special cards. The cards can be arranged in 4 different combinations of suits and ranks, plus any other subset of those arrangements. The key

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

For 3 reasons:

1. To resemble the original games.
2. To support more games.
3. To let you choose the games in your deck.

Even tough it may seem that by drawing you'll destroy your cards, make them ugly or waste them, the truth is the opposite: **if you don't do draw on them, you're wasting the cards**, because they are meant for that. The DIY Multideck provides a solid base to play many games and, additionally, draw in the cards to support more games. Drawing on the cards also make games easier to play, because the drawings can resemble the original game card's.

Rather than filling the cards with predetermined games, I want to encourage you to personalize them by adding the games you enjoy playing. By doing so, the cards won't have unused information and will lead to less confusions while playing.

This website provides a wide range of game mapping instructions. If you don't see a particular game you're interested in, feel free to create your own game mapping instructions and submit them to us.

So, what are you waiting for? Grab a pen or marker, open one of our game mapping guides, add a new game to your deck!

### Drawing areas

![drawing-areas](/images/home/drawing-areas.png)

Check your this blog post about tips to create your own game mappings and more details about this topic.

As shown in the image, each card has 14-16 drawing drawing slots, grouped in 5 drawing areas.

#### Area A

Amount: 2 big or 4 small.

In some games, you may need duplicate the drawing on the top and bottom slots to make the card playable in any rotation.

Draw here when:

- The card need to be hold in hand and contain a big drawing or word.
- The card need to be stacked on the table while keeping the top or bottom part visible.

#### Area B

Amount: 4

In some games, you may need duplicate the drawing on the opposite corner's slots to make the card playable in any rotation.

Draw here when:

- The card need to be hold in hand and contain a big drawing or word.
- The card need to be stacked on the table while keeping the top or bottom part visible.

#### Area C

Amount: 3

Draw here when:

- The card need a hint, like punctuation.
- The card's hint doesn't need to be visible while holding it on hand, otherwise use the area A.

#### Area D

Amount: 4

Draw here when:

- The card needs to be placed in the table.
- The card can be hold in hand, but it's the only one.
- The card needs to contain a big drawing or word.

#### Area E

Amount: 1

Draw here when:

- You want to represent a tile, chip, token, or similar.
- The card needs to be placed in the table.
- The card is important.

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

At the bottom center of every card there's a letter. They have a frequency distribution compatible with English word games.

Here’s the distribution compared to Scrabble, Words With Friends, and standard English:

![letters](https://thewrongtools.files.wordpress.com/2019/09/letter-distribution.png)

### Points value

At the bottom of the bottom-right corner, there are a set of dots, those arwe the Points value.

Point values are distributed equally across suits. Specifically, each suit has five 1’s, four 2’s, three 3’s, two 4’s, and one 5 (12345 • 54321). They can be used as an alternative rank value for games that require an uneven number of specific ranks, like Hanabi.

A card’s point value also indicate the score of the letter in the card. Most letters have one or two possible point values, with rarer letters having higher average scores.

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

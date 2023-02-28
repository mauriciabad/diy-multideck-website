The DIY multideck is a deck of 120 poker-sized playing cards that lets you play many games by using a bit of imagination and sometimes drawing in the cards. The cards have

## Feature list

- Corners:
  - 12 suits of 10 ranks (top-left).
  - 8 suits of 15 ranks (bottom-right).
  - 4 suits of 30 ranks (bottom-left).
  - Numbers from 0 to 119 (top-right).
- Draw in the cards: words, points, icons, tiles, boards, etc.
  - 16 drawing slots in each card, grouped in 5 drawing areas.
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
- Counting system with the back cards. For counting points, coins, lives, etc.
  - Stacking method. Very clear, but multiple cards used.
  - Pointing method. Only 2 cards used, but less clear.
- Usability
  - 5 explanation cards.
  - 5 notes cards.
  - Distinct shapes and colors for the suits (color-blind friendly).
  - High contrast in important elements.
  - Standard poker card size.
  - Hint below the suit.
  - Drawing slots:
    - Designed to let you draw twice, upright and upside-down, to make cards work both ways.
    - Big enough for handwriting, but not too much.
    - Variated shapes strategically placed, to cover a wide variety of needs and keep organization.
  - Systems to avoid confusions when playing:
    - All card corner's numbers match in the units digit.
    - All cards from 8 suits out of 12, match the number in the top left and bottom right corner.
    - Card number unit digit is highlighted, and always matches the top-left corner.
    - When the corners don't match, the suit has a black border or the rank is a letter.
  -

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

The cards can be arranged in many ways. These are the two most representative arrangement. On each arrangement, the cards are rotated 180 degrees compared to the other one.

#### Groups of 10

> Up-left corner: 12 suits of 10 ranks
>
> Up-right corner: Numbers from 0 to 119
>
> Borders: 12 sets of 10 paths

This arrangement also displays the numbers in ascending order. Also, the letters are in alphabetical order, and the special letters and symbols are at the end.

![preview-groups-of-10](/images/home/preview-groups-of-10.png)

#### Groups of 15

> Up-left corner: 8 suits of 15 ranks
>
> Up-right corner: 4 suits of 30 ranks

![preview-groups-of-15](/images/home/preview-groups-of-15.png)

### Explanation cards

The cards are printed in grids of 3x3 in DIN A4 sheets, so to print 120 cards, there are 6 spaces left. These spaces are used to add a cover card and 5 explanation cards.

The information is very condensed because there isn't much space. So they are meant to be a reminder, not a complete explanation.

![](/images/home/special-card

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

### Inspiration

My main inspiration was The Everdeck, and the amazing forum thread in bgg that was used to get feedback and updates about the project. *I wish I've done the same, but I wanted to have something solid before showing it up to the world (And walla!, here it is!).*

What inspired me so much about The Ever deck was it's card distribution and mathematical approach to make everything fit evenly. The only thing that didn't convince me about The Everdeck was it's aim to have a "mystic" theme/utility. It's totally fine and awesome, but it didn't fulfill my specific need, that is: "play as many modern games as possible with a small deck".

My other motivation for this project, was that I was planning a sabbatical year bagpacking through the world, and I wanted to keep playing many board games, without having to carry them. So I did it as quick as possible, do I could have a printed beta version to take to the adventure, and when I come back from the trip, make some changes and release it to the public.

## Printing

- The card's size is **2.5 by 3.5 inches**, the same as standard poker cards. You can fit 9 cards in a DIN A4 sheet, and 18 cards in a DIN A3 sheet.
- They are meant to be printed in **100% plastic** sheets of  **300 g/m²** or more, so they are waterproof and extremely durable.
  - You could also use thick paper and/or laminate it, but they'd last less time, probably wouldn't shuffle satisfyingly, and possibly you couldn't either use pencils to draw on them.
- Drawing in the cards:
  - Pens/markers ink sticks into it and it cannot be erased, even the special whiteboard markers.
  - **Pencils** work as usual, making them the **best option** to write and erase.
- For now, the **print-n-play** pdf document is **not public**.
  - But, you can [**buy** the DIY Multideck](/buy) online in the official website to get a copy.
- The cards can be printed in a regular copy shop or at home.
- It's very important to ensure all cards have the **same size** (for shuffling).
  - The best way is by using an industrial guillotine, to cut all cards at once.
  - This is more important than the cards dimension, so don't worry if they don't measure exactly 2.5 x 3.5 inches.
- Try to have the maximum **precision** in matching the **front and back**.
  - If you're at home, make sure the paper tray is well aligned before printing and that you flip the paper correctly when printing the other side.
  - If you go to a shop, ask them to pay special attention to this and use a precise printer.
- To round the **corners**, it's best buy a small tool to do so, and do it yourself **manually**. Many copy shops won't do it or may charge a lot.
  - In Barcelona, Spain at Feb 2023, I managed to print a single deck for 26.2 € in a copy shop with great results. With 100% plastic (the most expensive sheet they sold) and without rounded corners.

### Is it legal?

**Yes!** Selling/buying or printing the DIY Multideck is legal, even if the porpoise is to play other games. Also, this website, with explanations of how to play other games, an all it's contents, is legal.

Board games are generally not protected intellectual property. What is usually protected with copyright, are the assets they use, like: cards, tokens, boards or rulebooks. Some game mechanics may be patented, but it's very rare.

Explaining how to play a board game is legal, as long as you don't use copyrighted material to do so.

About the trademarks; in this case, using other board games names and logos is fare use because it's "Informational use", also called "editorial use".

About the copyright; in this case, no assets from the game are used in the deck or this website.

## Appendix

### Vocabulary

- **Suit**: In a card, the shape and color. ([Wikipedia](https://en.wikipedia.org/wiki/Playing_card_suit))
- **Ranks**: In a card, the numbers or letter.

### Discarded ideas

This are some main ideas I was trying to bring to the deck, but I had to give up on them for various reasons.

For all of them, I found a way to fix the issues, and it was letting the players draw the game-specific elements in the cards not being used as numbered cards. Yes, it feels bad to write on cards, but they are meant for that, and the space would be used anyway with another less convenient thing.

- Words
  - What is it about? Adding 1 or many words to the cards to use as social games like Werewolf, Mafia, Avalon... Or for some other word games, like Cross clues.
  - Why discarded?
    - Because it would force players to only play the games I chose, I prefer you write the specific words you need for the games you like.
    - Also, with many words it would be confusing to know what is the word in use.
- Emojis in the cards
  - What is it about? Adding 1 or many emojis to the cards. To use as roles for social games, actions in specific games or any creative use players may come up with.
  - Why discarded?
    - Because it's actually the same as words, but more ambiguous. Could be good for multiple game re-using and using less space, but it could also could cause confusion up to a point of making games unplayable. For example: a player sees 🧪 in her card, she thinks she has the doctor, but she's actually the witch and the doctor was: 💊.
    - A part from that, the uses of emojis where not clear and, yes they look cool, but most of them wouldn't be used and confuse noob players.
- Index
  - What is it about? On the side of the cards, leave some light marks to let the owner of the deck draw a small line in the card edge, to indicate what cards belong to what games. And then, to setup a game he would just have to slightly displace the cards and pick the ones with the mark on the same position.
  - Why discarded?
    - Because it requires high precision in printing and cutting, and it's unrealistic to do at home.
    - Also, the marks where so small and close, that it was too easy to pick other game's cards by mistake. Also, added clutter.
- Generic action icons
  - What is it about? On the top-right corner, put a generic icon of something related to card games, like a crossed card or a shield, to be used to play games that have special cards, like the UNO.
  - Why discarded?
    - Because games use very specific icons, and is very difficult to make a set of icons that work in many games.
    - Also, the killer factor is that, I realized that, when playing a game with regular suits and special cards, it's very easy to get confused and think that an icon card is meant to be used as a number card and vice-versa, specially in games with more than 4 suits. This makes the game unplayable.
    - And another reason was that if the action icon you need, is in a card that you need for the numbered cards, you're in trouble, because you'll have to chose another less-ideal icon and players will confuse the original card as the action card and the less-ideal with the number card, messing everything up.

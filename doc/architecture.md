# Architecture

## Common

```mermaid
classDiagram
    Game *-- Player
    Game *-- Deck
    CardDealer <|-- Player
    CardDealer <|-- Deck
    Player -- Card
    Deck -- Card
    class CardDealer {
        <<Abstract>>
        +string id
        +number[] cards
        #init()
        +add()
        +remove()
        #shuffle()
        +sort()
        #getCardIndex()
        +getRandomCard()
        +getLastCard()
        +setDisabled()
        +setAccessLevel()
    }
    class Player{
        +string name
        +enum status
    }
    class Deck {
        +number cardCount
    }
    class Game {
        <<Abstract>>
        +Deck deck
        +Player[] players
        +number turn
        +enum status
        +start()
        +play()
        +next()
        +end()
        +pause()
        +resume()
        +restart()
        #init()
        #cleanup()
        #routine()
        #judge()
        #distribute()
        #transfer()
        +getPlayers()
        +getCurrentPlayer()
        +getNextPlayer()
    }
    class Card {
        -number raw
        +enum suit
        +enum rank
        +string color
        +string content
        +content
        +enum accessLevel
        +boolean disabled
    }
```

## Old Maid

### Workflow

```mermaid
timeline
title Workflow
section initializing
    DECK   : shuffle
    GAME   : distribute cards equally to players
    PLAYER : remove pairs
section playing (turn)
    PLAYER : pick card from next player
    GAME   : judge next player & game
    PLAYER : remove pairs
    GAME   : judge current player & game
```

### Class diagram

```mermaid
classDiagram
    Game <|-- OldMaid
    class OldMaid {
        +removePairs()
        +pickCard()
    }
```

## Memory

### Workflow

```mermaid
timeline
title Workflow
section initializing
    DECK   : shuffle
section playing (turn)
    PLAYER : pick 2 cards
    GAME   : judge pair
    PLAYER : (if matching) get cards
```

### Class diagram

```mermaid
classDiagram
    Game <|-- Memory
    class Memory {
        +checkPair()
    }
```

## Blackjack

### Workflow

```mermaid
timeline
title Workflow
section initializing
    DECK   : shuffle
    GAME   : distribute 2 cards to players
section playing (turn)
    PLAYER : (if hit) pick 1 card
section playing (dealer)
    DEALER : (if >17) pick 1 card
```

### Class diagram

```mermaid
classDiagram
    Game <|-- Blackjack
    class Blackjack {
        +checkScore()
    }
```

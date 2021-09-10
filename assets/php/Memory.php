<?php

require_once('Card.php');
require_once('Pair.php');

class Memory
{
    private $cards;
    private $pairs;
    private $pairCount;
    private $cardDuplicates;
    private $cardCount;

    public function __construct(
        int $pairCount = 8,
        int $cardDuplicates = 2

    ) {
        $this->pairCount = $pairCount;
        $this->cardDuplicates = $cardDuplicates;

        $this->createCards();
    }

    private function createCards()
    {
        $this->cardCount = $this->pairCount * $this->cardDuplicates;

        $needNewCode = true;
        $cardCode;
        $currentPair;

        for ($i = 1; $i <= $this->cardCount; $i++) {
            if ($needNewCode) {
                $cardCode =  uniqid('cardCode-');

                $currentPair = new Pair($cardCode);

                $needNewCode = false;
            }

            $card = new Card($cardCode);
            $currentPair->addCard($card);

            $this->cards[$card->getCardId()] = $card;

            if ($i % $this->cardDuplicates === 0) {
                $this->pairs[] = $currentPair;
                $needNewCode = true;
            }
        }

        shuffle($this->cards);
    }

    public function getCards()
    {
        return $this->cards;
    }

    public function getPairs()
    {
        return $this->pairs;
    }

    public function getCardsPerRow()
    {
        return floor(sqrt($this->cardCount));
    }

    public function getPairIdByCardId($cardId)
    {
        return $this->pairCount;
    }
}
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

    public function __construct($settings = NULL)
    {
        $this->initalize($settings);
    }

    private function initalize($settings)
    {
        if ($settings && $settings['game'] === 'continue') {
            $pairCount = $settings['pairCount'];
            $cardDuplicates = $settings['cardDuplicates'];
            $cards = $settings['cards'];

            $this->rebuildGame($pairCount, $cardDuplicates, $cards);
        } else {
            $pairCount = NULL;
            $cardDuplicates = NULL;

            if ($settings && $settings['game'] === 'new') {
                $pairCount = $settings['pairCount'];
                $cardDuplicates = $settings['cardDuplicates'];
            }

            $this->startNewGame($pairCount, $cardDuplicates);
        }
    }

    public function startNewGame(int $pairCount = 8, int $cardDuplicates = 2)
    {
        $this->pairCount = $pairCount;
        $this->cardDuplicates = $cardDuplicates;

        $this->createCards();
    }

    public function rebuildGame(int $pairCount = 8, int $cardDuplicates = 2, $cards)
    {
        $this->pairCount = $pairCount;
        $this->cardDuplicates = $cardDuplicates;

        $this->cardCount = $this->pairCount * $this->cardDuplicates;

        foreach ($cards as $card) {
            $card = new Card($card['cardCode'], $card['cardId']);
            $this->cards[$card->getCardId()] = $card;
        }
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
        $card = $this->cards[$cardId];

        return $card->getCode();
    }
}
<?php

require_once('Card.php');

class Pair
{
    private $cards;
    private $code;

    public function __construct(
        String $cardCode
    ){
        $this->code = $cardCode;
        $this->cards = [];
    }

    public function addCard(Card $card)
    {
        if ($card->getCardCode() !== $this->code) {
            return false;
        }

        $this->cards[$card->getCardId()] = $card;
    }

    public function getCards()
    {
        return $this->cards;
    }

    public function getCode()
    {
        return $this->code;
    }
}
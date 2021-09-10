<?php

class Card
{
    private $cardId;
    private $cardCode;

    public function __construct(
        String $cardCode
    ){
        $this->cardCode = $cardCode;
        $this->cardId = uniqid('cardId-');
    }

    public function getCardId()
    {
        return $this->cardId;
    }

    public function getCardCode()
    {
        return $this->cardCode;
    }
}
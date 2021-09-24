<?php

class Card
{
    private $cardId;
    private $cardCode;

    public function __construct(
        String $cardCode,
        String $cardId = NULL
    ){
        $this->cardCode = $cardCode;
        $this->setCardId($cardId);
    }

    public function getCardId()
    {
        return $this->cardId;
    }

    private function setCardId($cardId)
    {
        $this->cardId = $cardId ? $cardId : uniqid('cardId-');
    }

    public function getCardCode()
    {
        return $this->cardCode;
    }
}
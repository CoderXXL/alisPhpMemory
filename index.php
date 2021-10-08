<!doctype html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>Memory-Spiel</title>
</head>
<body>
    <h1>Memory Game made by Professional</h1>
    <h3>more Professionnal then any other professional profesion</h3>
    
<?php
    require_once('assets/php/Memory.php');

    session_start();

    // create settings or get from session
    if (!isset($_SESSION['memory'])) {
        $pairCount = 2;
        $cardDuplicates = 2;

        $settings = [
            'game' => 'new',
            'pairCount' => $pairCount,
            'cardDuplicates' => $cardDuplicates,
            'cards' => []
        ];
    } else {
        $settings = $_SESSION['memory'];
        $settings['game'] = 'continue';
    }

    // intialize game
    $memory = new Memory($settings);

    // pass settings to session
    if ($settings['game'] === 'new') {
        foreach ($memory->getCards() as $card) {
            $settings['cards'][] = [
                'cardId' => $card->getCardId(),
                'cardCode' => $card->getCardCode()
            ];
        }
    }
    $_SESSION['memory'] = $settings;


    $playCards = $memory->getCards();
    $cardsPerRow = $memory->getCardsPerRow();

    $i = 1;

?>


    <div id="memory" class="wrapper">

        <?php foreach ($playCards as $card): ?>
        
        <?php if ($i === 1): ?>
            <div class="row">
        <?php endif; ?>


        <div id="<?= $card->getCardId() ?> " class="card">
            <?= $card->getCardId() ?>
        </div>

        <?php if ($i >= $cardsPerRow): ?>
            <?php $i = 1;?>

            </div>

        <?php else: ?>
            <?php $i++; ?>
        <?php endif; ?>

    
        <?php endforeach; ?>

    </div>

    <form action="assets/php/clear-session.php" method="POST">
        <input type="submit" value="Restart" />
    </form>


    <div class="counter">

        <div class="right">
            <h2>Right:</h2>
            <div></div>
        </div>

        <div class="wrong">
            <h2>Wrong:</h2>
            <div></div>
        </div>

    </div>

    <?php

    ?>

    <script type="text/javascript" src="assets/js/script.js"></script>
</body>
</html>
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


    if (!isset($_SESSION['memory'])) {
        $memory = new Memory(8, 2);
        $_SESSION['memory'] = serialize($memory);
    } else {
        $memory = unserialize($_SESSION['memory']);
    }


    $cards = $memory->getCards();
    $cardsPerRow = $memory->getCardsPerRow();
    //$pairs = $memory->getPairs();

    $i = 1;

?>


<pre>
    <!-- <?= var_dump($cards) ?>  -->
    <?= var_dump($_SESSION) ?>
</pre>

    <div id="memory" class="wrapper">

        <?php foreach ($cards as $card): ?>
        
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
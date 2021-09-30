class message {
    
    loadCards = "Karten wurden geladen.";

    activePlayer = "Akiver Spieler: ";
    gameTime = "Spielzeit: ";

    hours = "h";
    minutes = "m";
    seconds = "s";


    playerPoints(player) {
        return "Punkte " + player.getName() + ": " + player.getPoints();;
    }
    playerGetPoint(name) {
        return "Spieler \"" + name + "\" hat einen Punkt erhalten.";
    }
    wrongCouple(name) {
        return "Spieler \"" + name + "\" hat eine falsche Kombination.";
    }


    gameWin(name) {
        return "Spieler \"" + name + "\" hat gewonnen.";
    }
    gameWinInfo(player) {
        return  player.getName() + ": \n" +
                "\n"+
                "Versuche: " + player.getAttemps() + "\n" +
                "Richtige Versuche: " + player.getPoints() + "\n" +
                "Falsche Versuche: " + (player.getAttemps() - player.getPoints()) + "\n";
    }
    gameDraw = "Unentschieden, kein Spieler hat gewonnen.";

}

let msg = new message();
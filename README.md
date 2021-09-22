# Servus!

Das hier soll deine **WebApp** werden. Das Ziel soll es sein das du am Ende ein Komplett funktionelles Memory hast bei dem anfangs nur **ein** Spieler spielt.

# Regeln

- Der Spieler kann zwei Karten auswählen ...
  - ... wenn die Karten miteinander **übereinstimmen** bleiben sie offen auf dem spielfeld liegen.
  - ... wenn **nicht** werden beide Karten wieder umgedeckt.
- Jedesmal wenn zwei Karten aufgedeckt werden bekommt der Spieler eine benachrichtigung
  - "Leider Falsch", "Richtig!"
- Wenn alle Karten erraten wurden soll eine übersicht angezeigt werden.
  - Wieviele versuche hat der insgesammt Spieler gebraucht
  - Wie viele versuche davon waren **falsch**
  - Wie viele **richtig**
- **WICHTIG**, wenn die Karte aufgedeckt wird, muss eine Umdreh-animation erfolgen damit der spieler weiß, dass die Karte nun umgedreht wurde ;).
- Jedes Mal, wenn die Seite neu geladen wird müssen die Karten an einer neuen stellen sein.
- Es dürfen nicht mehr als 2 Karten gleichzeitig vom spieler aufgedeckt werden (ausgenommen die schon erratenen Karten)
- Mobil muss das Memory nicht Funktionieren, aber wenn ein Spieler mobil auf der Seite ist es muss dem Spieler mitgeteilt werden.

# Entwicklung
Erlaubt sind die Programmiersprachen PHP, JS, SCSS, HTML & MYSQL
das Memory soll Hauptsächlich aus PHP, HTML und CSS (SCSS) bestehen.

# Hilfreich
- https://www.php.net
  - https://www.php.net/manual/de/control-structures.foreach.php
  - https://www.php.net/manual/de/function.shuffle.php
- https://www.schattenbaum.net/php/
  - Erklärt alles sehr gut
- https://www.w3schools.com/
  - https://www.w3schools.com/jsref/event_onclick.asp
  - https://www.w3schools.com/js/js_htmldom_eventlistener.asp
    - https://www.w3schools.com/jsref/dom_obj_event.asp

# Erweiterungen
- Mobil Design
- Highscore aller Spieler mit name
- Schwierigkeit auswahl am Anfang
- Zweispieler Modus (An einem PC)

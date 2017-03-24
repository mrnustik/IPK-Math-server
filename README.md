# Klient pro výpočet matematických operací

Server pro Projekt do IPK projektu 2 - Klient pro výpočet matematických operací.

# Spuštění

Server spustíte příkaze`node app.js`

# Informace

Server očekává komunikaci tak jak je definovaná na stránkách projektu.

Klient -> HELLO 3c765ea78206437d3a13b4fdacedcb64\n

Server <- SOLVE 4 * 2\n

Klient -> RESULT 8\n

Server <- SOLVE 9 / 3\n

Klient -> RESULT 3\n

Server <- SOLVE 9 / 0\n

Klient -> RESULT ERROR\n

Server <- SOLVE 8 / 2\n

Klient -> RESULT 4\n

Server <- BYE 4e5645a0a762e124e332f98a5293c3c0\n

V případě chybného výsledku server ukončí výpočet. 

Veškeré debugovací infromace (odeslané zadání + získané a očekávané výsledky) najdete v logu terminálu ve kterým je server spuštěn.

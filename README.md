## Project Idea 
Creare un inventario di libri, tramite richiesta GET sarà possibile recuperare tutti i libri esistenti, tramite richiesta POST sarà possibile aggiungere un nuovo libro, tramite richiesta PUT sarà possibile aggiornare un libro già esistente, tramite richiesta DELETE sarà possibile rimuovere un libro. 
L'obiettivo è sviluppare tramite Express.js delle routes che permettano di utilizzare queste funzionalità base tramite un database MySQL.

### MySQL Database
Il database in utilizzo chiamato booksdir conterrà una tabella book composta da: 
    -   Titolo
    -   Autore
    -   Data pubblicazione
    -   ID
In cui l'ID sarà la chiave primaria.
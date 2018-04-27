var checker = require('./helpers/checker');

// stwórz obiekt który będzie przechowywać Twoje: imię, wiek i nazwę/skrót Twojego zespołu
// a następnie przekaż go jako argument do checker.object.userObj
// przy tworzeniu obiektu użyj następujących kluczy: name - imie, age - wiek
var user;

checker.object.userObj(user);

// stwórz nowy obiekt który będzie kopią obiektu z poprzedniego zadania
// rozszerzoną o właściwość 'team'
// następnie przekaż obiekt źródłowy (pierwszy argument) i nowy obiekt (drugi argument) do checker.object.userObjectExtend
var extendedUser;

checker.object.userObjectExtend(user, extendedUser);

// stwórz konstruktor Person który będzie 'szkieletem' do tworzenia użytkowników
// który będzie wykorzystywał obiekt z poprzedniego o poprzedniego zadania
// a następnie przekaż go do checker.object.userConstructor

checker.object.userConstructor(/*Person*/);

// Rozszerz prototyp powyższej klasy w taki sposób zawierała metodę 'iAm'
// która jako wynik zwróci string w postaci 'I am $name from $team team'
// dla danych { name: 'Piotr', team: 'PPP' } wynik będzie 'I am Piotr from PPP team'

checker.object.userPrototype(/*Person*/);


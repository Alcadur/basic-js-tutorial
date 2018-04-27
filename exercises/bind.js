var checker = require('./helpers/checker');

// zmień przypisanie do bindGetter w taki sposób aby metoda wywołała się
// z w kontekście obiektu 'warier'

var warrior = {
    weapon: 'sword'
};

function getWeapon() {
    return this.weapon;
}
//↓ Modyfikuj linie poniżej ↓
var bindGetter = getWeapon;

checker.bind.weapon(bindGetter, warrior);

// joanneFactory powinno przyjmować tylko jedne parametr którym jest wiek użytkownika np.
// joanneFactory(18) => { name: 'Joanne Bałwana', age: 18 }

var FIRST_NAME = 'Joanne';
var LAST_NAME = 'Bałwana';

function createUser(firstName, lastName, age) {
    return {
        name: firstName + ' ' + lastName,
        age: age
    }
}

//↓ Modyfikuj linie poniżej ↓
var joanneFactory = createUser;

checker.bind.user(joanneFactory);

// przekaż oneTrueEventHandler w taki sposób aby jej wywołanie w taki sposób: oneTrueEventHandler(event) nie spowodowało błędu
// obiekt OPTIONS POSIADA wszystkie wymagane właściwości

var options = checker.bind.oneTrueEventOptions;

function oneTrueEventHandler(event, optionsObj) {
    event.preventDefault();

    optionsObj.sendData();
}

// wywołanie wygląda następująco: oneTrueEventHandler(event);
checker.bind.oneTrueEventListener(oneTrueEventHandler);

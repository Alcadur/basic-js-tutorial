var checker = require('./helpers/checker');

// Uzupełnij metodę 'getFullName' tak aby zwracany wynik był w formacie: '$firstName $lastName'

var user = {
    firstName: 'Janek',
    lastName: 'Baranek',
    getFullName: function() {
        return null;
    }
};

checker.context.checkUserFullName(user);

// Zamień występowania 'null' tak aby porównania były prawdziwe (return true)

var contextTester = {
    test1: function() {
        return this === null;
    },
    nestedOne: {
        test2: function() {
            return this === null;
        },
        nestedTwo: {

        }
    },
    childTest: function() {
        return this === null;
    }
};
contextTester.nestedOne.nestedTwo.test3 = contextTester.childTest;

checker.context.contextChecker(contextTester);

// Uzupełnij metody atrybuty w taki sposób aby po kliknięciu w 'button1' wypisany został button
// natomiast po kliknięciu 'button2' ma zostać wyświetlony 'window' (w node js 'global')

var button1 = '<button onclick="">button1</button>';
var button2 = '<button onclick="">button2</button>';

checker.context.buttons(button1, button2);


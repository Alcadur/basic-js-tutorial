var checker = require('./helpers/checker');

// Popraw funkcję 'createUserBasedOnWithName' w taki sposób aby tworzyła nowy obiekt na podstawie
// innego obiektu i zmieniała właściwość 'name' na wartość podaną jako 2 argument

var defaultUser = {
    name: 'default',
    password: '********'
};

function createUserBasedOnWithName(baseUser, userName) {
    var newUser = baseUser;
    newUser.name = userName;
    return newUser;
}

const newUser = createUserBasedOnWithName(defaultUser, 'Franek');
checker.reference.userCheck(newUser, defaultUser);

// Popraw metodę 'createArrayWithUser' w taki sposób aby tworzyła nową 
// tablicę na podstawie podanego źródła. Wszystkie wystąpienia 'user' zamień na obiekt
// podany jako 2 argument nie zmieniając obiektu źródłowego

var sourceArray = [0, 'user', 7, 'user', 8, 9, 'user'];
var user = { login: 'admin' };

function createArrayWithUser(arr, user) {
    var arraySize = arr.length;
    var index;
    for(index = 0; index < arraySize; index++) {
        if(arr[index] === 'user') {
            arr[index] = user;
        }
    }

    return arr;
}

var userArray = createArrayWithUser(sourceArray, user);
checker.reference.arrays(userArray, sourceArray, user);

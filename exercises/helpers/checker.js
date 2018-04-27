const logger = require('./logger');
const data = require('./data');
let wasSend = false;
const personDataSet = { name: 'name1', age: 20, team: 'pppswatppp' };

module.exports = {
    reference: {
        userCheck(newUser, oldUser) {
            logger.title = 'Create user task';
            if (newUser === oldUser) {
                logger.error('newUser is reference to oldUser')
                return;
            }

            if(newUser.password === oldUser.password) {
                logger.ok();
                return;
            }

            logger.red('Password property in oldUser and newUser must be equal');
        },
        arrays(newArray, sourceArray, userObj) {
            logger.title = 'Array reference';
            if(newArray === sourceArray) {
                logger.error('newArray is reference to sourceArray');
                return;
            }

            const arraysSize = newArray.length;
            let index;
            for(index = 0; index < arraysSize; index++) {
                if(sourceArray[index] === 'user' && newArray[index] !== userObj) {
                    logger.error('There is no user object on index: ' + index);
                    return;
                }
            }

            logger.ok();
        }
    },
    context: {
        checkUserFullName(userObj) {
            logger.title = 'Get user full name taks'
            const firstName = randomBase64();
            const lastName = randomBase64();
            const testUser = {
                firstName,
                lastName,
                getFullName: userObj.getFullName
            };

            const userName = testUser.getFullName();

            if(userName === firstName + ' ' + lastName) {
                logger.ok();
                return;
            }

            if(userName === `${userObj.firstName} ${userObj.lastName}`) {
                logger.error(`Use 'this' keyword not object name (or hardcoded value)`)
                return;
            }

            logger.error(`Wrong return statement`);
        },
        contextChecker(contextTester) {
            let hasError = false;

            logger.title = 'contextTester';
            if(didUserUseCheats(contextTester.test1)) {
                logger.error('test1 => Nice try :)');
                hasError = true;
            }
            if(!contextTester.test1()) {
                logger.error('test1 => context is not equal given object');
                hasError = true;
            }

            if(didUserUseCheats(contextTester.nestedOne.test2)) {
                logger.error('test2 => Nice try :)');
                hasError = true;
            }
            if(!contextTester.nestedOne.test2()) {
                logger.error('test2 => context is not equal given object');
                hasError = true;
            }

            if(didUserUseCheats(contextTester.nestedOne.nestedTwo.test3)) {
                logger.error('test3 => Nice try :)');
                hasError = true;
            }
            if(!contextTester.nestedOne.nestedTwo.test3()) {
                logger.error('test3 => context is not equal given object');
                hasError = true;
            }

            if(hasError) {
                return;
            }

            logger.ok();
        },
        buttons(button1, button2) {
            let hasError = false;
            logger.title = 'Node handlers';
            const regex = /onclick="(.*)"/gi;
            const button1ClickBody = regex.exec(button1)[1];
            const button1ClickResult = eval(`(function(){ ${button1ClickBody} })`).call(button1);

            if(!button1ClickResult || button1ClickResult.valueOf() !== button1) {
                logger.error('button1 -> click handler not return button itself');
                hasError = true;
            }

            const button2ClickBody = /onclick="(.*)"/gi.exec(button2)[1] ;
            const button2ClickResult = eval(`(function(){ return ${button2ClickBody} })`).call(button2);

            if(!button2ClickResult || button2ClickResult !== global) {
                logger.error('button2 -> context should be equal to window (or global in node)');
                hasError = true;
            }

            if(hasError) {
                return;
            }

            logger.ok();
        }
    },
    bind: {
        weapon(getter, warrior) {
            logger.title = 'warrior';
            warrior.weapon = randomBase64();

            if(getter() === warrior.weapon) {
                logger.ok();
            } else {
                logger.error('Wrong or hardcoded return statement');
            }
        },
        user(joanneFactory) {
            logger.title = 'joanneFactory';
            const factoryString = joanneFactory.toString();
            const testAge = Math.random();
            const testObj = joanneFactory(testAge);
            const expected = { name: 'Joanne Bałwana', age: testAge };

            if(testObj.name !== expected.name || testObj.age !== expected.age) {
                logger.error('Object is not correct result of joanneFactory');
                return;
            }

            if(factoryString.indexOf('[native code]') === -1) {
                logger.error('Try to use \'bind\' and not change \'createUser\' directly');
                return;
            }

            logger.ok()
        },
        oneTrueEventListener(eventHandler) {
            let wasPrevent = false;
            const event = { preventDefault: () =>  wasPrevent = true };
            wasSend = false;
            logger.title = 'oneTrueEvent';

            try {
                eventHandler(event);
            } catch (e) {
                logger.error('error was thrown');
                return;
            }

            if(!wasPrevent || !wasSend) {
                logger.error('preventDefault or sendData was not called');
                return;
            }

            logger.ok();
        },
        oneTrueEventOptions: {
            sendData: () =>  wasSend = true
        }
    },
    object: {
        userObj(obj) {
            let hasError = false;
            logger.title = 'User object';

            if(!obj) {
                return;
            }

            hasError = !hasProperty(obj, 'name') || hasError ;
            hasError = !hasProperty(obj, 'age') || hasError;

            if(!hasError) {
                logger.ok()
            }
        },
        userObjectExtend(sourceObj, extendedObj) {
            logger.title = 'Object extend';
            let hasError = false;

            if(!extendedObj || !sourceObj) {
                return;
            }

            if(extendedObj === sourceObj) {
                logger.error('New (extended) object is reference to source object');
                return;
            }

            hasError = !hasProperty(extendedObj, 'name') || hasError;
            hasError = !hasProperty(extendedObj, 'age') || hasError;
            hasError = !hasProperty(extendedObj, 'team') || hasError;

            if(!hasError) {
                logger.ok()
            }
        },
        userConstructor(Person) {
            if(!Person) {
                return;
            }

            const NO_PROPERTY_ERROR_MESSAGE = `Class instance not have property: '$propertyName'`;
            const VALUES_NOT_SAME_ERROR_MESSAGE = `Instance '$name' value is not equal data set '$name' value`;
            logger.title = 'Function object';
            const person =  new Person(personDataSet);
            let hasErrors = false;

            hasErrors = hasErrors || !hasProperty(person, 'name', NO_PROPERTY_ERROR_MESSAGE);
            hasErrors = hasErrors || !hasProperty(person, 'age', NO_PROPERTY_ERROR_MESSAGE);
            hasErrors = hasErrors || !hasProperty(person, 'team', NO_PROPERTY_ERROR_MESSAGE);

            if(person.name !== personDataSet.name) {
                logger.error(VALUES_NOT_SAME_ERROR_MESSAGE.replace(/\$name/g, 'name'));
                hasErrors = true;
            }

            if(person.age !== personDataSet.age) {
                logger.error(VALUES_NOT_SAME_ERROR_MESSAGE.replace(/\$name/g, 'age'));
                hasErrors = true;
            }
            if(person.team !== personDataSet.team) {
                logger.error(VALUES_NOT_SAME_ERROR_MESSAGE.replace(/\$name/g, 'team'));
                hasErrors = true;
            }


            if(!hasErrors) {
                logger.ok();
            }
        },
        userPrototype(Person) {
            if(!Person) {
                return;
            }

            logger.title = 'User prototype';
            const instance = new Person(personDataSet);
            const result = instance.iAm && instance.iAm();
            const expectedResult = `I am ${personDataSet.name} from ${personDataSet.team} team`;

            if(result !== expectedResult) {
                logger.error(`'${result}' string is not equal to expected result (${expectedResult})`);
                return;
            }

            if(!Person.prototype || !Person.prototype.iAm) {
                logger.error(`'iAm' method was not found in prototype`);
                return;
            }

            logger.ok();
        }
    },
    arrow: {
        methods(univers) {
            logger.title = 'Methods definition';
            if(!univers.getNeighbors || !univers.getNextPlanets) {
                logger.error('getNeighbors and/or getNextPlanets are not defined');
                return;
            }

            const getNeighborsSourceString = univers.getNeighbors.valueOf().toString();
            const getNextPlanetsSourceString = univers.getNextPlanets.valueOf().toString();
            let hasError = false;
            const expectedNeighbors = getNeighbors(univers.planets, 'Ziemia');

            const neighbors = univers.getNeighbors();


            if(univers.planets.indexOf('Ziemia') === -1) {
                logger.error('There is no \'Ziemia\' in Your univers');
                return;
            }

            if(getNeighborsSourceString.indexOf('getNeighbors() {') === -1) {
                logger.error('getNeighbors function was not declared as method');
                hasError = true;
            }

            if(neighbors.indexOf(expectedNeighbors[0]) === -1 || neighbors.indexOf(expectedNeighbors[1]) === -1) {
                logger.error(`getNeighbors return wrong array (${neighbors}), should return ${expectedNeighbors}`);
                hasError = true;
            }

            if(getNextPlanetsSourceString.indexOf('getNextPlanets() {') === -1) {
                logger.error('getNextPlanets function was not declared as method');
                hasError = true;
            }

            if(!hasError) {
                logger(`${logger.title}: You don't have to implement body of getNextPlanets :)`);
                logger.ok();
            }
        },
        async totalPrice(order) {
            const expectedPrice = data.cart.reduce((sum, item) => sum + item.basePrice, 0) * (1 + order.profitMargin);
            await order.countTotalPrice();
            const countTotalPriceSourceString = order.countTotalPrice.valueOf().toString();

            if(order.totalPrice !== expectedPrice) {
                logger.error(`Expected price is ${expectedPrice} but got ${order.totalPrice}`);
                return;
            }

            if(countTotalPriceSourceString.indexOf('fakeApi.getCartItems().then(items =>') === -1) {
                logger.error('You should use arrow function, not change function body');
                return;
            }

            logger.ok();
        }
    }
};

function getNeighbors(array, item) {
    return [array[array.indexOf(item)-1], array[array.indexOf(item)+1]]
}

function hasProperty(obj, propertyName, customMessage) {
    const custom = customMessage && customMessage.replace(/\$propertyName/g, propertyName)
    if(obj[propertyName] === undefined) {
        logger.error(custom || `Object not have '${propertyName}' property`);
        return false;
    }

    return true;
}

function didUserUseCheats(func) {
    const functionString = func.toString();
    const regexp = /^\s*return this === (this)/gim
    return regexp.test(functionString);
}

function randomBase64() {
    return Buffer.from(Math.random().toString()).toString('base64');
}
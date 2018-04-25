const logger = require('./logger');
let wasSend = false;
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
        weapon(getter, warier) {
            logger.title = 'warier';
            warier.weapon = randomBase64();

            if(getter() === warier.weapon) {
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
    }
};

function didUserUseCheats(func) {
    const functionString = func.toString();
    const regexp = /^\s*return this === (this)/gim
    return regexp.test(functionString);
}

function randomBase64() {
    return Buffer.from(Math.random().toString()).toString('base64');
}
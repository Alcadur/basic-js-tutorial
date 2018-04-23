const logger = require('./logger');

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
            const firstName = Buffer.from(Math.random().toString()).toString('base64');
            const lastName = Buffer.from(Math.random().toString()).toString('base64');
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
    }
};

function didUserUseCheats(func) {
    const functionString = func.toString();
    const regexp = /^\s*return this === (this)/gim
    return regexp.test(functionString);
}
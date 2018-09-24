function replace(str, index, substr) {
    if (typeof index != 'number') {
        throw 'Second parameter should be a number';
    } else {
        if (index <= 1) {
            throw 'Second parameter should be greater than 0';
        } else {
            let result = '';
            let isWordLetter = false;
            let position = -1;
            let letters = str.split('');

            for (let i = 0; i < str.length; i++) {
                const c = str[i];
                isWordLetter = c.match('[a-zA-Z0-9]');
                if (isWordLetter) {
                    position++;
                    if (position + 1 == index) {
                        result += substr;
                    } else {
                        result += c;
                    }
                } else {
                    position = -1;
                    result += c;
                }
            }
            return result;
        }
    }
}

function testReplace(str, index, substr) {
    try {
        console.log(replace(str, index, substr));
    } catch (error) {
        console.error(error);
    }
}

testReplace('qwerty', 2, '!');
testReplace('qwerty', 2, '@@');
testReplace('qwerty qq. asdf', 3, '!');
testReplace('qwerty alpha-beta gamma', 2, '!');
testReplace('', '', '');
testReplace('', 0, '');
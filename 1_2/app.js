function isPalindrome(str) {
    let alphaNumeric = '';
    for (let i = 0; i < str.length; i++) {
        const c = str[i];
        if (c.match('[a-zA-Z0-9]')) {
            alphaNumeric += c.toLowerCase();
        }   
    }
    return alphaNumeric === alphaNumeric.split("").reverse().join("");
}

function testPalindrome(str) {
    console.log(str + ': ' + isPalindrome(str));
}

testPalindrome('qwerty');
testPalindrome('qwertytrewq');
testPalindrome('qwerty - trewq');
testPalindrome('qwErtyTrewq');
testPalindrome('qwert1y1trewq');
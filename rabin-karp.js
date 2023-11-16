let fs = require('fs');
let arg = process.argv;
let str = fs.readFileSync(arg[2]).toString();
let key = fs.readFileSync(arg[3]).toString();
let collisions = 0;
let counter = 0;

const hash3 = () => {
    let arr = new Array();
    let codeStr = 0, codeKey = 0;
    let len_key = key.length, len_str = str.length;

    for (let i = 0; i < len_key; i++) {
        codeKey += key.charCodeAt(i) * Math.pow(2, len_key - i - 1);
        codeStr += str.charCodeAt(i) * Math.pow(2, len_key - i - 1);
    }

    for (i = 1; i <= len_str - len_key + 1; i++) {
        if (codeStr == codeKey) {
            for (j = 0; j < len_key; j++) {
                if (str.charAt(j + i - 1) == key.charAt(j)) {
                    if (j == len_key - 1) {
                        arr.push(i - 1);
                        counter++;
                    }
                }
                else {
                    collisions++;
                    break;
                }
            }
        }
        codeStr = (codeStr - str.charCodeAt(i - 1) * Math.pow(2, len_key - 1)) * 2 + str.charCodeAt(len_key + i - 1);
    }
    return arr.slice(0, 10);
}

console.log("Hash3:");
console.time('Time');
console.log(hash3().join(', '));
console.timeEnd('Time');
console.log("collisions:", collisions);
console.log("counter:", counter);
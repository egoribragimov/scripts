function compressString(inputString) {
    const length = inputString.length;
    let differentCount = 0;
    let equalCount = 0;
    let result = [];
    let tempStr = "";

    for (let i = 0; i < length; i++) {
        const currentChar = inputString[i];
        const nextChar = inputString[i + 1];
        const prevChar = inputString[i - 1];

        if (currentChar !== nextChar && currentChar !== prevChar) {
            differentCount++;
            tempStr += currentChar;

            if (equalCount > 0) {
                result.push(String.fromCharCode(equalCount + 128) + prevChar);
                equalCount = 0;
            }

            if (differentCount === 127) {
                result.push(String.fromCharCode(differentCount) + tempStr);
                tempStr = "";
                differentCount = 0;
            }
        } else {
            equalCount++;

            if (differentCount > 0) {
                result.push(String.fromCharCode(differentCount) + tempStr);
                tempStr = "";
                differentCount = 0;
            }

            if (equalCount === 127 || currentChar !== nextChar) {
                result.push(String.fromCharCode(equalCount + 128) + currentChar);
                equalCount = 0;
            }
        }
    }

    if (differentCount > 0) {
        result.push(String.fromCharCode(differentCount) + tempStr);
    }

    if (equalCount > 0) {
        result.push(String.fromCharCode(equalCount + 128) + inputString[length - 1]);
    }

    return result.join('');
}

function decompressString(compressedString) {
    const length = compressedString.length;
    const characters = compressedString.split('');
    let result = [];

    for (let i = 0; i < length; i++) {
        const charCode = characters[i].charCodeAt(0);

        if (charCode <= 127) {
            let count = charCode + i;
            for (; i < count; i++) {
                result.push(characters[i + 1]);
            }
        } else {
            let count = charCode - 128;
            i++;
            for (let j = 0; j < count; j++) {
                result.push(characters[i]);
            }
        }
    }

    return result.join('');
}

const text = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabcd";
const compressedText = compressString(text);
console.log("Original Text:\n", text);
console.log("Compressed Text:\n", compressedText);
const decompressedText = decompressString(compressedText);
console.log("Decompressed Text\n:", decompressedText);

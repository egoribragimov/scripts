function encodeRLE(input) {
    let encoded = '';
    let count = 1;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === input[i + 1]) {
            count++;
        } else {
            if (count > 3 || input[i] === '#') {
                while (count > 255) { // Разбиваем цепочку на части по 255 символов
                    encoded += `#${String.fromCharCode(255)}${input[i]}`;
                    count -= 255;
                }
                encoded += `#${String.fromCharCode(count)}${input[i]}`;
            } else {
                encoded += input[i];
            }
            count = 1;
        }
    }

    return encoded;
}

// Функция для декодирования строки, закодированной методом RLE
function decodeRLE(encoded) {
    let decoded = '';
    let i = 0;

    while (i < encoded.length) {
        if (encoded[i] === '#') {
            const charCode = encoded.charCodeAt(i + 1);
            const count = charCode;
            const char = encoded[i + 2];
            decoded += char.repeat(count);
            i += 3;
        } else {
            decoded += encoded[i];
            i++;
        }
    }

    return decoded;
}

const originalString = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa#bcd";
const encodedString = encodeRLE(originalString);
console.log('Закодированная строка:', encodedString);

const decodedString = decodeRLE(encodedString);
console.log('Раскодированная строка:', decodedString);

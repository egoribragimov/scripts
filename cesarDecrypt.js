// Функция для шифрования текста шифром Цезаря
function caesarCipherEncrypt(text, shift) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char.match(/[a-zA-Z]/)) {
            const isUpperCase = char === char.toUpperCase();
            const alphabetStart = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const shiftedChar = String.fromCharCode(((char.charCodeAt(0) - alphabetStart + shift) % 26) + alphabetStart);
            result += isUpperCase ? shiftedChar : shiftedChar.toLowerCase();
        } else {
            result += char;
        }
    }

    return result;
}

// Функция для дешифрования текста, зашифрованного шифром Цезаря
function caesarCipherDecrypt(text, shift) {
    return caesarCipherEncrypt(text, 26 - (shift % 26));
}

// Функция для дешифровки текста с использованием метода частотного анализа
function caesarCipherDecryptWithFrequencyAnalysis(text, globalFrequencies) {
    let bestShift = 0;
    let minDifference = Number.MAX_SAFE_INTEGER;

    for (let shift = 0; shift < 26; shift++) {
        let decryptedText = caesarCipherDecrypt(text, shift);
        let localFrequencies = calculateFrequencies(decryptedText);

        // Вычисляем разницу между локальными и глобальными частотами
        let difference = 0;
        for (let i = 0; i < 26; i++) {
            difference += Math.abs(localFrequencies[i] - globalFrequencies[i]);
        }

        // Если текущая разница меньше минимальной, обновляем значения
        if (difference < minDifference) {
            minDifference = difference;
            bestShift = shift;
        }
    }

    return caesarCipherDecrypt(text, bestShift);
}

// Функция для вычисления частот букв в тексте
function calculateFrequencies(text) {
    const frequencies = new Array(26).fill(0);
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < text.length; i++) {
        const char = text[i].toUpperCase();
        const index = alphabet.indexOf(char);
        if (index !== -1) {
            frequencies[index]++;
        }
    }

    return frequencies;
}

const plaintext = "Could you please repeat that?"
const shiftAmount = -10;

const encryptedText = caesarCipherEncrypt(plaintext, shiftAmount);
console.log("Зашифрованный текст:", encryptedText);
const globalFrequencies = [0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015, 0.06094, 0.06966, 0.00153, 0.00772, 0.04025, 0.02406, 0.06749, 0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758, 0.00978, 0.02360, 0.00150, 0.01974, 0.00074];
const decryptedText = caesarCipherDecryptWithFrequencyAnalysis(encryptedText, globalFrequencies);
console.log("Дешифрованный текст:", decryptedText);

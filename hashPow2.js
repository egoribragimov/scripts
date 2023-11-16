const fs = require("fs");

function hash(s) {
    let hashValue = 0;
    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i);
        hashValue += charCode * charCode; // Сумма квадратов кодов символов
    }
    return hashValue;
}

function hashSubstringSearch(subs, text) {
    let index = [];
    let count = 0;
    const textLength = text.length;
    const subsLength = subs.length;
    const subsHash = hash(subs);
    let collisions = 0; // Счетчик коллизий

    for (let i = 0; i <= textLength - subsLength; i++) {
        const subText = text.substring(i, i + subsLength);
        const subTextHash = hash(subText);

        if (subTextHash === subsHash && subText !== subs) {
            collisions++; // Увеличиваем счетчик коллизий при совпадении хэшей, но разных строках
        }

        if (subTextHash === subsHash) {
            let j = 0;
            while (j < subsLength && subText[j] === subs[j]) {
                j++;
            }
            if (j === subsLength) {
                index.push(i);
                count++;
            }
        }
    }

    return { count, index, collisions };
}

function main() {

    const subsFile = process.argv[2];
    const textFile = process.argv[3];

    const subs = fs.readFileSync(subsFile, "utf8");
    const text = fs.readFileSync(textFile, "utf8");

    console.time("Hash Substring Search");
    const { count, index, collisions } = hashSubstringSearch(subs, text);
    console.timeEnd("Hash Substring Search");

    console.log("Total occurrences:", count);
    console.log("Indexes of first 10 occurrences:", index.slice(0, 10));
    console.log("Collisions:", collisions);
}

main();

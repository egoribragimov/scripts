const fs = require("fs");

function bruteForceSubstringSearch(subs, text) {
    let index = [];
    let count = 0;
    const maxIndexesToDisplay = 10;
    const textLength = text.length;
    const subsLength = subs.length;

    for (let i = 0; i <= textLength - subsLength; i++) {
        let j = 0;
        while (j < subsLength && text[i + j] === subs[j]) {
            j++;
        }
        if (j === subsLength) {
            index.push(i);
            count++;
        }
    }

    return { count, index };
}

function main() {

    const subsFile = process.argv[2];
    const textFile = process.argv[3];

    const subs = fs.readFileSync(subsFile, "utf8");
    const text = fs.readFileSync(textFile, "utf8");

    console.time("Brute Force Search");
    const { count, index } = bruteForceSubstringSearch(subs, text);
    console.timeEnd("Brute Force Search");

    console.log("Total occurrences:", count);
    console.log("Indexes of first 10 occurrences:", index.slice(0, 10));
}

main();


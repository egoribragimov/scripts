class Node {
    constructor(char, frequency) {
        this.char = char;
        this.frequency = frequency;
        this.left = null;
        this.right = null;
    }
}

function buildHuffmanTree(text) {
    const charFrequencyMap = {};

    for (let char of text) {
        if (charFrequencyMap[char] === undefined) {
            charFrequencyMap[char] = 1;
        } else {
            charFrequencyMap[char]++;
        }
    }

    console.log("Character frequencies:");
    console.log(Object.entries(charFrequencyMap).map(([char, freq]) => `${char}: ${freq}`).join(", "));

    const nodes = Object.entries(charFrequencyMap).map(([char, frequency]) => new Node(char, frequency));

    let step = 1;
    while (nodes.length > 1) {
        nodes.sort((a, b) => a.frequency - b.frequency);
        const left = nodes.shift();
        const right = nodes.shift();
        const merged = new Node(left.char + right.char, left.frequency + right.frequency);
        merged.left = left;
        merged.right = right;
        nodes.push(merged);

        console.log(`Step ${step++}: Merged ${left.char} (${left.frequency}) and ${right.char} (${right.frequency}) into ${merged.char}`);
    }

    return nodes[0];//возвращаем корень
}

function generateHuffmanCodes(node, prefix = '') {
    const codes = {};
    if (node) {
        if (!node.left && !node.right) {
            codes[node.char] = prefix || '0';//если префикс не опеределен то 0
            console.log(`Assigned code ${codes[node.char]} to character '${node.char}'`);
        } else {
            Object.assign(codes, generateHuffmanCodes(node.left, prefix + '0'));
            Object.assign(codes, generateHuffmanCodes(node.right, prefix + '1'));
        }
    }
    return codes;
}

function encode(text, codes) {
    let encodedText = '';
    for (let char of text) {
        encodedText += codes[char];
    }
    return encodedText;
}

function decode(encodedText, tree) {
    let decodedText = '';
    let currentNode = tree;
    for (let bit of encodedText) {
        if (bit === '0') {
            currentNode = currentNode.left;
        } else {
            currentNode = currentNode.right;
        }
        if (!currentNode.left && !currentNode.right) {
            decodedText += currentNode.char;
            currentNode = tree;
        }
    }
    return decodedText;
}

const text = 'abbcccddddeeeee';
console.log('Original Text:', text);
const huffmanTree = buildHuffmanTree(text);
const codes = generateHuffmanCodes(huffmanTree);
const encodedText = encode(text, codes);
const decodedText = decode(encodedText, huffmanTree);

console.log('Encoded Text:', encodedText);
console.log('Decoded Text:', decodedText);

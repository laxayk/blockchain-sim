import { Blockchain } from "./BlockChain.js";

const blockchain = Blockchain.create(2); // difficulty increases exponentially with each increase
blockchain.addBlock("Alice to bob 5");
blockchain.addBlock("John to doe 100");
console.log(blockchain);
console.log(blockchain.isValid()); // true - since we haven't tampered with it
blockchain.chain[1].data = "200 kardiya"; // tampering with the blockchain
console.log(blockchain);
console.log(blockchain.isValid());
blockchain.validate();
console.log(blockchain);
console.log(blockchain.isValid());

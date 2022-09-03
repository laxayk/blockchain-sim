import { Block } from "./Block.js";
import { calculateHash } from "./calculateHash.js";

export class Blockchain {
	constructor(genesisBlock, chain, difficulty) {
		this.genesisBlock = genesisBlock;
		this.chain = chain;
		this.difficulty = difficulty;
	}
	static create(difficulty) {
		const genesisBlock = new Block(null);
		genesisBlock.hash = "0";
		return new Blockchain(genesisBlock, [genesisBlock], difficulty);
	}
	addBlock(data) {
		const blockData = data;
		const lastBlock = this.chain[this.chain.length - 1];
		const newBlock = new Block(blockData, lastBlock.hash);
		newBlock.mine(this.difficulty);
		this.chain.push(newBlock);
	}
	isValid() {
		if (this.chain.length === 1) return true;
		for (let index = 1; index < this.chain.length; index++) {
			const currentBlock = this.chain[index];
			const previousBlock = this.chain[index - 1];
			if (
				currentBlock.hash !== calculateHash(currentBlock) ||
				previousBlock.hash !== currentBlock.previousHash
			)
				return false;
		}
		return true;
	}
	validate() {
		if (this.isValid()) return;
		let index;
		for (index = 1; index < this.chain.length; index++) {
			const currentBlock = this.chain[index];
			const previousBlock = this.chain[index - 1];
			if (
				currentBlock.hash !== calculateHash(currentBlock) ||
				previousBlock.hash !== currentBlock.previousHash
			) {
				if (previousBlock.hash !== currentBlock.previousHash) {
					currentBlock.previousHash = previousBlock.hash;
				}
				currentBlock.hash = calculateHash(currentBlock);
				currentBlock.mine(this.difficulty);
			}
		}
	}
}

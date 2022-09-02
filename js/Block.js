import { calculateHash } from "./calculateHash.js";

export class Block {
	constructor(data, previousHash) {
		this.data = data;
		this.hash = "";
		this.previousHash = previousHash;
		this.timeStamp = new Date().toISOString();
		this.nonce = 0;
	}

	mine(difficulty) {
		const regex = new RegExp(`^(0){${difficulty}}.*`);
		while (!this.hash.match(regex)) {
			this.nonce++;
			this.hash = calculateHash(this);
		}
	}
}

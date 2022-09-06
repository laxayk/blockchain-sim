import crypto from "crypto";

export const calculateHash = (block) => {
	const data = JSON.stringify(block.data);
	const blockData =
		data + block.previousHash + block.timestamp + block.nonce.toString();
	return crypto.createHash("sha256").update(blockData).digest("hex");
};

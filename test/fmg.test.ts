import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import BigNumber from "bignumber.js";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
import { FMG1 } from "../types/FMG1";
import { FMG2 } from "../types/FMG2";

let owner: SignerWithAddress;
let accounts: Address[] = [];
let fmg1: FMG1;
let fmg2: FMG2;

beforeEach(async () => {
	[owner] = await ethers.getSigners();
	const fmg1Factory = await ethers.getContractFactory("FMG1");
	const fmg2Factory = await ethers.getContractFactory("FMG2");

	fmg1 = await fmg1Factory.deploy();
	fmg2 = await fmg2Factory.deploy();
})

describe("test gas", async () => {
	it("test fmg1", async () => {
		await sendETH(owner.address, fmg1.address, 0.01);
		const res = await fmg1.fashionable()
		const a = await res.wait();
		console.log("fmg1 gas used::", a.gasUsed.toString());
		for (const account of accounts) {
			await getETHBalnace(account);
		}
		await getETHBalnace(fmg1.address)
	})

	it("test fmg2", async () => {
		await sendETH(owner.address, fmg2.address, 0.01);
		const res = await fmg2.fashionable()
		const a = await res.wait();
		console.log("fmg2 gas used::", a.gasUsed.toString());
		for (const account of accounts) {
			await getETHBalnace(account);
		}
		await getETHBalnace(fmg2.address);

		await fmg2.setEth(ethers.utils.parseEther("1"))
	})
})

async function sendETH(from: string | Address, to: string | Address, amount: number | string) {
	const ownerBalance = await ethers.provider.getBalance(from);
	console.log("owner balance", ethers.utils.formatEther(ownerBalance));

	const nonce = await owner.getTransactionCount();
	const tx = {
		from: from,
		to: to,
		value: ethers.utils.parseEther(amount.toString()),
		nonce: nonce,
	}
	await owner.sendTransaction(tx);

	const balance = await ethers.provider.getBalance(to);
	console.log(ethers.utils.formatEther(balance));
}

async function getETHBalnace(account: Address) {
	const balance = await ethers.provider.getBalance(account);
	console.log(`${account}::`, ethers.utils.formatEther(balance));
}
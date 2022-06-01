import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import { ethers } from "hardhat";
import { RuinToken } from "../types";

let wallet: SignerWithAddress;
let ruinToken: RuinToken;
let owner: string;
beforeEach(async () => {
	[wallet] = await ethers.getSigners();
	const RuinTokenFactory = await ethers.getContractFactory("RuinToken");
	ruinToken = (await RuinTokenFactory.deploy(ethers.utils.formatEther(10))) as RuinToken;
})

describe("RuinToken", function () {
	it("name/symbol/totalSupply", async function () {
		console.log("token address::", ruinToken.address);
		owner = await ruinToken.owner();
		const name = await ruinToken.name();
		const symbol = await ruinToken.symbol();
		const totalSupply = await ruinToken.totalSupply();
		console.log("owner::", owner)
		console.log("name::", name)
		console.log("symbol::", symbol);
		console.log("totalSupply::", totalSupply.toString());
		console.log("RUIN balance::", ethers.utils.formatEther(await ruinToken.balanceOf(wallet.address)).toString());
	});

	it("exchange", async function () {
		await ruinToken.transfer(ruinToken.address, ethers.utils.parseEther("10"))
		await ruinToken.approve(owner, ethers.utils.parseEther("1000"));
		await ruinToken.transferFrom(wallet.address, ruinToken.address, ethers.utils.parseEther("10"));
		console.log("my balance::", ethers.utils.formatEther(await ruinToken.balanceOf(wallet.address)).toString());
		console.log("contract balance::", ethers.utils.formatEther(await ruinToken.balanceOf(ruinToken.address)).toString())
	})
});

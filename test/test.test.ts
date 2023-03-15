import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
import { AllocationToken } from "../types";

let owner: SignerWithAddress;
let account1: Address = "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C";
let account2: Address = "0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC";
let account3: Address = "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c";
let account4: Address = "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB";

let moneyDemo: AllocationToken;

beforeEach(async () => {
    [owner] = await ethers.getSigners();
    const moneyDemoFactory = await ethers.getContractFactory("AllocationToken");

    moneyDemo = (await moneyDemoFactory.deploy()) as AllocationToken;
});

describe("testestestestest", async () => {
    it("testsetestset", async () => {
        const ownerBalance = await ethers.provider.getBalance(owner.address);
        const contractBalance = await ethers.provider.getBalance(
            moneyDemo.address,
        );
        console.log("owner balance", ethers.utils.formatEther(ownerBalance));
        console.log("contract balance", contractBalance);

        const nonce = await owner.getTransactionCount();
        const tx = {
            from: owner.address,
            to: moneyDemo.address,
            value: ethers.utils.parseEther("10"),
            nonce: nonce,
        };

        const txs = await owner.sendTransaction(tx);
        console.log(txs);

        const balance = await ethers.provider.getBalance(moneyDemo.address);
        console.log(ethers.utils.formatEther(balance));

        const userlist = [
            { addr: account1, num: 2 },
            { addr: account2, num: 3 },
            { addr: account3, num: 4 },
            { addr: account4, num: 1 },
        ];

        await moneyDemo.transferMoney(ethers.utils.parseEther("10"), userlist);

        const balance1 = await ethers.provider.getBalance(account1);
        const balance2 = await ethers.provider.getBalance(account2);
        const balance3 = await ethers.provider.getBalance(account3);
        const balance4 = await ethers.provider.getBalance(account4);

        console.log("balance1:", ethers.utils.formatEther(balance1));
        console.log("balance2:", ethers.utils.formatEther(balance2));
        console.log("balance3:", ethers.utils.formatEther(balance3));
        console.log("balance4:", ethers.utils.formatEther(balance4));

        const balanceowner = await ethers.provider.getBalance(owner.address);
        console.log(ethers.utils.formatEther(balanceowner));

        const balanceend = await ethers.provider.getBalance(moneyDemo.address);
        console.log(ethers.utils.formatEther(balanceend));

        const b = await moneyDemo.checkownermoney();
        console.log(b);
    });
});

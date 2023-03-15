import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

describe("RuinToken", function () {
    async function deployContract() {
        const [wallet] = await ethers.getSigners();

        const RuinToken_Factory = await ethers.getContractFactory("RuinToken");
        const ruinToken = await RuinToken_Factory.deploy(
            ethers.utils.parseEther("10000"),
        );

        return { wallet, ruinToken };
    }

    it("name/symbol/totalSupply", async function () {
        const { ruinToken, wallet } = await loadFixture(deployContract);

        const owner = await ruinToken.owner();
        const name = await ruinToken.name();
        const symbol = await ruinToken.symbol();
        const totalSupply = await ruinToken.totalSupply();

        expect(owner).to.be.equal(wallet.address);
        expect(name).to.be.equal("RuinToken");
        expect(symbol).to.be.equal("RUIN");
        expect(totalSupply).to.be.equal(ethers.utils.parseEther("10000"));
    });

    it("test transfer and transferFrom", async function () {
        const { ruinToken, wallet } = await loadFixture(deployContract);

        await ruinToken.transfer(
            ruinToken.address,
            ethers.utils.parseEther("10"),
        );
        await ruinToken.approve(
            wallet.address,
            ethers.utils.parseEther("1000"),
        );

        await ruinToken.transferFrom(
            wallet.address,
            ruinToken.address,
            ethers.utils.parseEther("10"),
        );

        const wallet_balance = await ruinToken.balanceOf(wallet.address);
        const contract_balance = await ruinToken.balanceOf(ruinToken.address);

        expect(wallet_balance).to.be.equal(
            ethers.utils.parseEther("10000").sub(ethers.utils.parseEther("20")),
        );

        expect(contract_balance).to.be.equal(ethers.utils.parseEther("20"));
    });

    it("test error", async () => {
        const { ruinToken } = await loadFixture(deployContract);
        const zero_address = "0x0000000000000000000000000000000000000000";

        const mintRes = ruinToken.mint(
            zero_address,
            ethers.utils.parseUnits("10", 18),
        );

        expect(mintRes).to.be.rejectedWith("address is zero");
    });
});

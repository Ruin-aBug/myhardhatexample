import { expect, use } from "chai";
import { ethers } from "hardhat";
import {
  deployContract,
  deployMockContract,
  MockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle";
import ERC20USDT from "../build/ERC20USDT.json";
import GlodToken from "../build/GlodToken.json";
import { Contract, Wallet } from "ethers";

use(solidity);

describe("Glod", function () {
  let wallet: Wallet;
  let USDT: Contract;
  let glodToken: Contract;
  beforeEach(async () => {
    [wallet] = new MockProvider().getWallets();
    USDT = await deployContract(wallet, ERC20USDT);
    glodToken = await deployContract(wallet, GlodToken, [ethers.utils.parseEther("10000"), USDT.address]);
  })
  it("name/symbol/totalSupply", async function () {
    console.log("GlodToken::", glodToken.address);
    const name = await glodToken.name();
    const symbol = await glodToken.symbol();
    const totalSupply = await glodToken.totalSupply();
    console.log("name::", name)
    console.log("symbol::", symbol);
    console.log("totalSupply::", totalSupply.toString());
    console.log("MAMA::", await glodToken.MANA());
    console.log("USDT balance::",ethers.utils.formatEther(await glodToken.balanceOf(wallet.address)).toString());
    console.log("USDT balance::",ethers.utils.formatEther(await USDT.balanceOf(wallet.address)).toString());
  });

  it("approve", async function () {
    // const res = await USDT.approve(glodToken.address,ethers.utils.parseEther("1000"));
  })

  it("exchange", async function () {
    await USDT.approve(glodToken.address,ethers.utils.parseEther("1000"));
    const res = await glodToken.exchange(wallet.address, ethers.utils.parseEther("220"))
    console.log(res);
    console.log("USDT balance::",ethers.utils.formatEther(await glodToken.balanceOf(wallet.address)).toString());
    console.log("USDT balance::",ethers.utils.formatEther(await USDT.balanceOf(wallet.address)).toString());
  })
});

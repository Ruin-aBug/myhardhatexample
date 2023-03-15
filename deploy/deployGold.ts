import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;

    const amount = ethers.utils.parseEther("200");
    const { deploy, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const Token = await get("ERC20USDT");
    const GoldToken = await deploy("GoldToken", {
        from: deployer,
        args: [amount, Token.address],
        log: true,
    });

    console.log(GoldToken.address);
};

export default func;
func.tags = ["Gold"];

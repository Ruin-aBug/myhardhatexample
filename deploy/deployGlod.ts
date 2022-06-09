import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import Web3 from "web3";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    console.log(hre.network.name);

    const amount = Web3.utils.toWei("200");
    const { deploy, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const Token = await get("ERC20USDT");
    const GlodToken = await deploy("GlodToken", {
        from: deployer,
        args: [amount, Token.address],
        log: true
    })

    console.log(GlodToken.address);
};

export default func;
func.tags = ["Glod"];
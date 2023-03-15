import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    console.log(hre.network.name);
    const { deploy } = deployments;
    // 这里的deployer就是hardhat.confit.ts中namedAccounts下deployer，由.env下配置的私钥生成
    const { deployer } = await getNamedAccounts();
    const FMG2 = await deploy("FMG2", {
        from: deployer,
        log: true,
    });

    console.log(FMG2.address);
};

export default func;
// 这个tags就是部署时命令 --tags后面要输入的名称
func.tags = ["FMG2"];

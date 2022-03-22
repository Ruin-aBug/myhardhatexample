import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  console.log(hre.network.name)
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const Greeter = await deploy("Greeter", {
    from: deployer,
    args: ["hello"],
    log: true
  })

  console.log(Greeter.address);
};

export default func;
func.tags = ["dep"];
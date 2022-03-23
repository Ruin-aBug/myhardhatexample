import { HardhatRuntimeEnvironment } from 'hardhat/types/runtime';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy, get } = deployments;
    const { deployer } = await getNamedAccounts();
    console.log(deployer)
    
    const ERC20USDT = await deploy('ERC20USDT', {
        from: deployer,
        log: true,
    });
    console.log(ERC20USDT.address);
};
export default func;
func.tags = ["USDT"];


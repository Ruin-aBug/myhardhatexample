import * as dotenv from "dotenv";

import 'hardhat-deploy';
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
	namedAccounts: {
		deployer: 0
	},
	typechain: {
		outDir: "types",
		target: "ethers-v5"
	},
	solidity: {
		compilers: [
			{
				version: "0.8.0",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200
					}
				}
			},{
				version: "0.8.1",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200
					}
				}
			},{
				version: "0.8.4",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200
					}
				}
			}
		]
	},
	paths: {
		sources: "contracts"
	},
	networks: {
		ropsten: {
			url: process.env.ROPSTEN_URL || "",
			accounts:
				process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
			chainId: 3,
			live: true,
			saveDeployments: true,
		},
		polygon: {
			url: process.env.POLYGON_URL || "",
			accounts:
				process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
			chainId: 137,
			live: true,
			saveDeployments: true
		},
		plgmum: {
			url: process.env.POLYGON_TEST_URL || "",
			accounts:
				process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
			chainId: 80001,
			live: true,
			saveDeployments: true
		}
	},
	gasReporter: {
		enabled: process.env.REPORT_GAS !== undefined,
		currency: "USD",
	}
};

export default config;

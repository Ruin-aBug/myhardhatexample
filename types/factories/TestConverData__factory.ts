/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TestConverData,
  TestConverDataInterface,
} from "../TestConverData";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "data",
        type: "uint256",
      },
    ],
    name: "getConver",
    outputs: [
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
      {
        internalType: "int24",
        name: "tickLower",
        type: "int24",
      },
      {
        internalType: "int24",
        name: "tickUpper",
        type: "int24",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061017a806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806346c3265f14610030575b600080fd5b61004361003e3660046100de565b61005b565b604051610052939291906100f6565b60405180910390f35b600080600061006984610076565b9196909550909350915050565b62ffffff8116601882901c627fffff811690600090658000000000008516906880000000000000000086169082156100b4576100b185610117565b94505b603087901c627fffff8116945082156100d3576100d085610117565b94505b505050509193909250565b6000602082840312156100ef578081fd5b5035919050565b62ffffff939093168352600291820b6020840152900b604082015260600190565b60008160020b627fffff1981141561013d57634e487b7160e01b82526011600452602482fd5b900391905056fea264697066735822122092c8839e7448a69bbad2e42d8308e6cdc6e1818deff0b4a90088ab52fcb4a12f64736f6c63430008000033";

type TestConverDataConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestConverDataConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestConverData__factory extends ContractFactory {
  constructor(...args: TestConverDataConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "TestConverData";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestConverData> {
    return super.deploy(overrides || {}) as Promise<TestConverData>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestConverData {
    return super.attach(address) as TestConverData;
  }
  connect(signer: Signer): TestConverData__factory {
    return super.connect(signer) as TestConverData__factory;
  }
  static readonly contractName: "TestConverData";
  public readonly contractName: "TestConverData";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestConverDataInterface {
    return new utils.Interface(_abi) as TestConverDataInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestConverData {
    return new Contract(address, _abi, signerOrProvider) as TestConverData;
  }
}

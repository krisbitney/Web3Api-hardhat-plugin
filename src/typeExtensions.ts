import "hardhat/types/config";
import "hardhat/types/runtime";
import {ExternalProvider} from "@web3api/client-js/build/pluginConfigs/Ethereum";
import {Web3ApiClient} from "@web3api/client-js";
import {Web3ApiConfig, Web3ApiUserConfig} from "./config";

declare module "hardhat/types/config" {
  export interface HardhatUserConfig {
    web3api?: Web3ApiUserConfig
  }
  export interface HardhatConfig {
    web3api: Web3ApiConfig
  }
}

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    web3api: {
      providers: {
        ipfs: string;
        ethereum: string | ExternalProvider;
        ens: string;
      };
      client: Web3ApiClient;
      buildAndDeploy: Function;
      runCLI: Function;
    }
  }
}
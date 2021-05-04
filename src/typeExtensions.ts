import { Web3ApiClient } from "@web3api/client-js";
import "hardhat/types/config";
import "hardhat/types/runtime";

import { Web3ApiConfig, Web3ApiUserConfig } from "./config";

declare module "hardhat/types/config" {
  export interface HardhatUserConfig {
    web3api?: Web3ApiUserConfig;
  }
  export interface HardhatConfig {
    web3api: Web3ApiConfig;
  }
}

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    web3api: {
      client: Web3ApiClient;
      buildAndDeployToIpfs: (
        apiAbsPath: string,
        ipfsProvider: string,
        cwd?: string
      ) => Promise<string>;
      runCLI: (options: {
        args: string[];
        cwd?: string;
      }) => Promise<{ exitCode: number; stdout: string; stderr: string }>;
    };
  }
}

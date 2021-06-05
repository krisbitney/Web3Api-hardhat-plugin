import { UriRedirect, Web3ApiClient } from "@web3api/client-js";
import { ensPlugin } from "@web3api/ens-plugin-js";
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";
import { ipfsPlugin } from "@web3api/ipfs-plugin-js";
import { runCLI } from "@web3api/test-env-js";
import { TASK_RUN, TASK_TEST } from "hardhat/builtin-tasks/task-names";
import { extendConfig, extendEnvironment, task } from "hardhat/config";
import {
  HardhatConfig,
  HardhatRuntimeEnvironment,
  HardhatUserConfig,
  RunSuperFunction,
  TaskArguments,
} from "hardhat/types";

import { defaultWeb3ApiConfig, Web3ApiConfig } from "./config";
import "./typeExtensions";
import { buildAndDeployToIpfs } from "./utils";

task(TASK_TEST, async (_args, hre, runSuper) => {
  return handlePluginTask(hre, runSuper);
});

task(TASK_RUN, async (_args, hre, runSuper) => {
  return handlePluginTask(hre, runSuper);
});

async function handlePluginTask(
  hre: HardhatRuntimeEnvironment,
  runSuper: RunSuperFunction<TaskArguments>
) {
  // TODO: run a local ipfs/ens node here once modular test env is ready
  return runSuper();
}

// client options and general web3api config
extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    const defaultClientConfig: Web3ApiConfig = defaultWeb3ApiConfig;
    if (userConfig.web3api) {
      config.web3api = {
        ipfs: userConfig.web3api.ipfs ?? defaultClientConfig.ipfs,
        ens: userConfig.web3api.ens ?? defaultClientConfig.ens,
        ethereum: userConfig.web3api.ethereum ?? defaultClientConfig.ethereum,
      };
    } else {
      config.web3api = defaultClientConfig;
    }
  }
);

extendEnvironment((hre) => {
  // instantiate client
  const redirects: UriRedirect[] = hre.config.web3api.redirects ?? [
    {
      from: "ens/ethereum.web3api.eth",
      to: ethereumPlugin(hre.config.web3api.ethereum),
    },
    {
      from: "w3://ens/ipfs.web3api.eth",
      to: ipfsPlugin(hre.config.web3api.ipfs),
    },
    {
      from: "w3://ens/ens.web3api.eth",
      to: ensPlugin(hre.config.web3api.ens),
    },
  ];

  const client = new Web3ApiClient({ redirects });
  // extend hre
  hre.web3api = {
    client,
    buildAndDeployToIpfs,
    runCLI,
  };
});

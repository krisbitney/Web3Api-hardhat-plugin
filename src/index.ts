import {
  TASK_RUN,
  TASK_TEST,
} from "hardhat/builtin-tasks/task-names";
import {extendConfig, extendEnvironment, task} from "hardhat/config";
import {
  HardhatConfig,
  HardhatRuntimeEnvironment, HardhatUserConfig,
  RunSuperFunction,
  TaskArguments
} from "hardhat/types";
import {createWeb3ApiClient, Web3ApiClient} from "@web3api/client-js";
import {buildAndDeployApi, initTestEnvironment, runCLI, stopTestEnvironment} from "@web3api/test-env-js";
import {defaultWeb3ApiConfig, Web3ApiConfig} from "./config";
import {ExternalProvider} from "@web3api/client-js/build/pluginConfigs/Ethereum";
import "./typeExtensions";
import {getRedirects} from "./getRedirects";


task(TASK_TEST, async (_args, hre, runSuper) => {
  return handlePluginTask(hre, runSuper);
});

task(TASK_RUN, async (_args, hre, runSuper) => {
  return handlePluginTask(hre, runSuper);
});

async function handlePluginTask(hre: HardhatRuntimeEnvironment, runSuper: RunSuperFunction<TaskArguments>) {
  if (hre.network.name === "web3api") {
    // copy config-based web3api data
    const configIpfs = hre.web3api.providers.ipfs;
    const configEthProv = hre.web3api.providers.ethereum;
    const configEns = hre.web3api.providers.ens;
    const configClient = hre.web3api.client;
    // use test environment for task
    // TODO: can't run test env with Hardhat Network because can't host two servers -> need to run in another thread
    // TODO: test env hangs -> need to run in another thread
    const { ipfs, ethereum, ensAddress } = await initTestEnvironment();
    hre.web3api.providers.ipfs = ipfs;
    hre.web3api.providers.ethereum = ethereum;
    hre.web3api.providers.ens = ensAddress;
    hre.web3api.client = await createWeb3ApiClient({
      ipfs: { provider: ipfs },
      ethereum: { provider: ethereum },
      ens: { address: ensAddress }
    });
    const ret = await runSuper();
    await stopTestEnvironment();
    // re-apply config-based web3api data
    hre.web3api.providers.ipfs = configIpfs;
    hre.web3api.providers.ethereum = configEthProv;
    hre.web3api.providers.ens = configEns;
    hre.web3api.client = configClient;
    return ret;
  }
  return runSuper();
}

// client options and general web3api config
extendConfig((config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
  const defaultClientConfig: Web3ApiConfig = defaultWeb3ApiConfig;
  if (userConfig.web3api) {
    const providers = userConfig.web3api.providers;
    config.web3api = {
      providers: {
        ipfs: providers.ipfs ?? defaultClientConfig.providers.ipfs,
        ethereum: providers.ethereum,
        ens: providers.ens ?? defaultClientConfig.providers.ens,
      }
    }
  } else {
    config.web3api = defaultClientConfig;
  }
});

extendEnvironment(hre => {
  // get providers
  const ipfsProvider = hre.config.web3api.providers.ipfs;
  const ensProvider = hre.config.web3api.providers.ens;
  const ethereumProvider = hre.config.web3api.providers.ethereum ?? hre.network.provider;
  // get client
  const ethProv = typeof ethereumProvider === 'string' ? ethereumProvider : ethereumProvider as ExternalProvider;
  const client = new Web3ApiClient({
    redirects: getRedirects( {
      ipfs: ipfsProvider,
      ens: ensProvider,
      ethereum: ethProv
    })
  });

  // extend hre
  hre.web3api = {
    providers: {
      ipfs: ipfsProvider,
      ethereum: ethereumProvider,
      ens: ensProvider
    },
    client: client,
    buildAndDeploy: buildAndDeployApi,
    runCLI: runCLI,
  };
});
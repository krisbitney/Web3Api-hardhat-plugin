import {
  TASK_RUN,
  TASK_TEST,
} from "hardhat/builtin-tasks/task-names";
import {extendConfig, extendEnvironment, task} from "hardhat/config";
import {
  EthereumProvider,
  HardhatRuntimeEnvironment,
  RunSuperFunction,
  TaskArguments
} from "hardhat/types";
import {createWeb3ApiClient, Web3ApiClient} from "@web3api/client-js";
import {buildAndDeployApi, initTestEnvironment, runCLI, stopTestEnvironment} from "@web3api/test-env-js";


interface Web3ApiExtension {
  providers: {
    ipfs: string;
    ethereum: string | EthereumProvider;
    ens: string;
  };
  client: Web3ApiClient;
  buildAndDeploy: Function;
  runCLI: Function;
}

let client: Web3ApiClient;
let ipfsProvider: string;
let ethereumProvider: EthereumProvider | string;
let ensAddress: string;

task(TASK_TEST, async (_args, hre, runSuper) => {
  return handlePluginTask(hre, runSuper);
});

task(TASK_RUN, async (_args, hre, runSuper) => {
  return handlePluginTask(hre, runSuper);
});

async function handlePluginTask(hre: HardhatRuntimeEnvironment, runSuper: RunSuperFunction<TaskArguments>) {
  if (hre.network.name !== "web3api") {
    return runSuper();
  }

  // TODO: can't run test env with Hardhat Network because can't host two servers -> need to run in another thread
  // TODO: test env hangs -> need to run in another thread
  const { ipfs, ethereum, ensAddress: ens } = await initTestEnvironment();
  ipfsProvider = ipfs;
  ethereumProvider = hre.network.provider ?? ethereum;
  ensAddress = ens;

  client = await createWeb3ApiClient({
    ethereum: { provider: ethereumProvider },
    ipfs: { provider: ipfsProvider },
    ens: { address: ensAddress }
  });

  const ret = await runSuper();
  await stopTestEnvironment();
  return ret;
}

extendConfig((resolvedConfig: any, config: any) => {
  // TODO: define default options and type interface
  const defaultOptions = {};
  if (config.networks && config.networks.web3api) {
    const customOptions = config.networks.web3api;
    resolvedConfig.networks.web3api = { ...defaultOptions, ...customOptions };
  } else {
    resolvedConfig.networks.web3api = defaultOptions;
  }
});

extendEnvironment(hre => {
  // TODO: what should be added when extending the hre?
  const extension: Web3ApiExtension = {
    providers: {
      ipfs: ipfsProvider,
      ethereum: ethereumProvider,
      ens: ensAddress
    },
    client: client,
    buildAndDeploy: buildAndDeployApi,
    runCLI: runCLI,
  }
  // @ts-ignore
  hre.web3api = extension
});
import {UriRedirect} from "@web3api/core-js";
import {ipfsPlugin} from "@web3api/ipfs-plugin-js";
import {ensPlugin} from "@web3api/ens-plugin-js";
import {ethereumPlugin} from "@web3api/ethereum-plugin-js";
import { loggerPlugin } from "@web3api/logger-plugin-js";
import {ExternalProvider} from "@web3api/client-js/build/pluginConfigs/Ethereum";

interface BasicProviders {
  ipfs: string;
  ethereum: string | ExternalProvider;
  ens: string;
}

export function getRedirects(providers: BasicProviders): UriRedirect<string>[] {
  return [
    // IPFS is required for downloading Web3API packages
    {
      from: "w3://ens/ipfs.web3api.eth",
      to: ipfsPlugin({ provider: providers.ipfs }),
    },
    // ENS is required for resolving domain to IPFS hashes
    {
      from: "w3://ens/ens.web3api.eth",
      to: ensPlugin({ address: providers.ens }),
    },
    {
      from: "w3://ens/ethereum.web3api.eth",
      to: ethereumPlugin({ provider: providers.ethereum }),
    },
    {
      from: "w3://w3/logger",
      to: loggerPlugin(),
    },
  ];
}
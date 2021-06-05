import { UriRedirect } from "@web3api/client-js";
import { EnsConfig } from "@web3api/ens-plugin-js";
import { EthereumConfig } from "@web3api/ethereum-plugin-js";
import { IpfsConfig } from "@web3api/ipfs-plugin-js";

export interface Web3ApiUserConfig {
  ipfs?: IpfsConfig;
  ethereum?: EthereumConfig;
  ens?: EnsConfig;
  redirects?: UriRedirect[];
}

export interface Web3ApiConfig {
  ipfs: IpfsConfig;
  ethereum: EthereumConfig;
  ens: EnsConfig;
  redirects?: UriRedirect[];
}

export const defaultWeb3ApiConfig: Web3ApiConfig = {
  ipfs: {
    provider: "https://ipfs.io",
  },
  ens: {},
  ethereum: {
    networks: {
      testnet: {
        provider: "http://localhost:8545",
      },
    },
    defaultNetwork: "testnet",
  },
};

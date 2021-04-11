import {ExternalProvider} from "@web3api/client-js/build/pluginConfigs/Ethereum";

export interface Web3ApiUserConfig {
  providers: {
    ipfs?: string;
    ethereum?: string | ExternalProvider;
    ens?: string;
  }
}

export interface Web3ApiConfig {
  providers: {
    ipfs: string;
    ethereum?: string | ExternalProvider;
    ens: string;
  }
}

export const defaultWeb3ApiConfig: Web3ApiConfig = {
  providers: {
    ipfs: "https://ipfs.io",
    ens: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  },
}


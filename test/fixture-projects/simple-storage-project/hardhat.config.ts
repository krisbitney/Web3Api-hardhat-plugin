import { HardhatUserConfig } from "hardhat/types";

import "../../../src";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1,
      forking: {
        url: "https://mainnet.infura.io/v3/d119148113c047ca90f0311ed729c466",
        enabled: true,
      },
    },
  },
  web3api: {
    ipfs: {
      provider: "http://127.0.0.1:45005",
      fallbackProviders: ["https://ipfs.io"],
    },
    ethereum: {
      networks: {
        MAINNET: {
          provider: "http://localhost:8545",
        },
      },
      defaultNetwork: "MAINNET",
    },
  },
};

export default config;

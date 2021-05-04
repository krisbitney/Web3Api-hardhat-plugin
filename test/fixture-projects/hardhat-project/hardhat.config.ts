import { HardhatUserConfig } from "hardhat/types";

import "../../../src";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1,
      forking: {
        url: "https://mainnet.infura.io/v3/d119148113c047ca90f0311ed729c466",
        blockNumber: 12200882, // April 8, 2021 at 1:48pm CST
        enabled: true,
      },
    },
  },
  web3api: {
    ipfs: {
      provider: "http://127.0.0.1:45005",
      fallbackProviders: ["https://dweb.link"],
    },
    ethereum: {
      networks: {
        mainnet: {
          provider: "http://localhost:8545",
        },
      },
      defaultNetwork: "mainnet",
    },
  },
};

export default config;

// We load the plugin here.
import { HardhatUserConfig } from "hardhat/types";

import "../../../src";
import fs from "fs";

const alchemyKey = fs.readFileSync("./alchemyApiKey.txt", 'utf-8');

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyKey}`,
        blockNumber: 12200882, // April 8, 2021 at 1:48pm CST
        enabled: true
      }
    },
  },
};

export default config;

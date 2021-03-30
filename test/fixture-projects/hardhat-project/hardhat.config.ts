// We load the plugin here.
import { HardhatUserConfig } from "hardhat/types";

import "../../../src";

// TODO: add custom configuration, like custom redirects etc.
const config: HardhatUserConfig = {
  solidity: "0.7.3",
  networks: {
    hardhat: { },
    web3api: {
      url: "http://localhost:8545"
    }
  },
  defaultNetwork: "web3api",
};

export default config;

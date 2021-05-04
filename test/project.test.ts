import * as assert from "assert";
import { expect } from "chai";

import { useEnvironment } from "./helpers";

describe("Integration tests", function () {
  describe("HRE and config extension", function () {
    useEnvironment("hardhat-project");

    it("has web3api config", async function () {
      const { ethereum, ipfs } = this.hre.config.web3api;
      // ipfs
      expect(ipfs.provider).to.not.equal(undefined);
      // ethereum
      expect(ethereum.defaultNetwork).to.not.equal(undefined);
      expect(ethereum.networks).to.not.equal(undefined);
      expect(Object.keys(ethereum.networks).length).to.be.gt(0);
    });

    it("has extended HRE", async function () {
      expect(this.hre.web3api.client).to.not.equal(undefined);
      expect(this.hre.web3api.buildAndDeployToIpfs).to.not.equal(undefined);
      expect(this.hre.web3api.runCLI).to.not.equal(undefined);
    });
  });

  describe("e2e", function () {
    useEnvironment("hardhat-project");

    it("Should run Hardhat RUN task 'simple-storage.js'", async function () {
      await this.hre.run("run", {
        noCompile: true,
        script: "scripts/simple_storage.js",
      });

      assert.equal(process.exitCode, 0);
    });

    it("Should run Hardhat RUN task 'uniswapv2_api.js'", async function () {
      await this.hre.run("run", {
        noCompile: true,
        script: "scripts/uniswapv2_api.js",
      });

      assert.equal(process.exitCode, 0);
    });
  });
});

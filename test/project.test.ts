// tslint:disable-next-line no-implicit-dependencies
import { assert, expect } from "chai";
import { useEnvironment } from "./helpers";

describe("Integration tests examples", function () {
  describe("Hardhat Runtime Environment extension", function () {
    useEnvironment("hardhat-project");

    it("Should run Hardhat RUN task 'web3api-config-exists.js'", async function () {
      await this.hre.run("run", {
        noCompile: true,
        script: "scripts/web3api-config-exists.js",
      });
      assert.equal(process.exitCode, 0);
    });

    it("has extended HRE", async function () {
      expect(this.hre.web3api.providers.ipfs).to.not.be.undefined;
      expect(this.hre.web3api.providers.ethereum).to.not.be.undefined;
      expect(this.hre.web3api.providers.ens).to.not.be.undefined;
      expect(this.hre.web3api.client).to.not.be.undefined;
      expect(this.hre.web3api.buildAndDeploy).to.not.be.undefined;
      expect(this.hre.web3api.runCLI).to.not.be.undefined;
    });

  });

  // describe("HardhatConfig extension", function () {
  //   useEnvironment("hardhat-project");
  //
  //   it("Should add the newPath to the config", function () {
  //     assert.equal(
  //       this.hre.config.paths.newPath,
  //       path.join(process.cwd(), "asd")
  //     );
  //   });
  // });
});

// describe("Unit tests examples", function () {
//   describe("ExampleHardhatRuntimeEnvironmentField", function () {
//     describe("sayHello", function () {
//       it("Should say hello", function () {
//         const field = new ExampleHardhatRuntimeEnvironmentField();
//         assert.equal(field.sayHello(), "hello");
//       });
//     });
//   });
// });

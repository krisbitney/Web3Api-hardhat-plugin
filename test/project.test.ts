// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";
import { useEnvironment } from "./helpers";

describe("Integration tests examples", function () {
  describe("Hardhat Runtime Environment extension", function () {
    useEnvironment("hardhat-project");

    it("Should run Hardhat RUN task 'print-web3api-info.js' using Web3API test env", async function () {
      await this.hre.run("run", {
        noCompile: true,
        script: "scripts/print-web3api-info.js",
      });

      assert.equal(process.exitCode, 0);
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

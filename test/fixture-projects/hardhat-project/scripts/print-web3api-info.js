// We require the Hardhat Runtime Environment explicitly here. This is optional.
const hre = require("hardhat");

async function main() {
  const {ethereum, ens, ipfs} = hre.web3api.providers

  if (!ethereum || !ens || !ipfs) {
    throw Error("Web3API providers are undefined");
  }
  console.log(ethereum);
  console.log(ens);
  console.log(ipfs);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
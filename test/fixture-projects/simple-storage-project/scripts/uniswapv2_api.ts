import { expect } from "chai";
import * as hre from "hardhat";

import { ChainId, Token } from "../../../types";

async function main() {
  const ipfsUri = "ipfs/QmYtTXhitrwXbXvMwPmYmGQmz7gxxG6ZdFJwYZ6oy9UCtB";
  // @ts-ignore
  const client = hre.web3api.client;

  const tokenData = await client.query<{
    fetchTokenData: Token;
  }>({
    uri: ipfsUri,
    query: `
      query {
        fetchTokenData(
          chainId: $chainId
          address: $address
        )
      }
    `,
    variables: {
      chainId: ChainId.MAINNET,
      address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    },
  });
  if (tokenData.errors) {
    tokenData.errors.forEach((e) => console.log(e));
  }

  expect(tokenData.errors).to.eq(undefined);
  expect(tokenData.data?.fetchTokenData?.currency?.symbol).to.eq("AAVE");
  expect(tokenData.data?.fetchTokenData?.currency?.decimals).to.eq(18);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

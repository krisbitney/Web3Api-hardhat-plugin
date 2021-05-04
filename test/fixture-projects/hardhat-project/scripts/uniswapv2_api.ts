import { expect } from "chai";
import * as hre from "hardhat";

enum ChainId {
  MAINNET = "MAINNET",
  ROPSTEN = "ROPSTEN",
  RINKEBY = "RINKEBY",
  GOERLI = "GOERLI",
  KOVAN = "KOVAN",
}
interface Token {
  chainId: ChainId;
  address: string;
  currency: Currency;
}
interface Currency {
  decimals: number;
  symbol: string | null;
  name: string | null;
}

async function main() {
  const ipfsUri = "ipfs/QmRQuz7KDtRAYXyZo7GMXedJkrAT2uUTE1isJCEZ5Wz9T3";
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

  expect(tokenData.errors).to.eq(false);
  expect(tokenData.data).to.eq(true);
  expect(tokenData.data?.fetchTokenData.currency.symbol).to.eq("AAVE");
  expect(tokenData.data?.fetchTokenData.currency.decimals).to.eq(18);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

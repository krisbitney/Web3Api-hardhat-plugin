import { expect } from "chai";
import * as hre from "hardhat";
import * as path from "path";

async function main() {
  // deploy api
  const apiPath = path.resolve(__dirname, "../simple_storage");
  // @ts-ignore
  const ipfsCid: string = await hre.web3api.buildAndDeployToIpfs(
    apiPath,
    "http://127.0.0.1:45005"
  );
  const ipfsUri: string = `ipfs/${ipfsCid}`;
  console.log(ipfsUri);

  // @ts-ignore
  const client = hre.web3api.client;

  const deploy = await client.query<{
    deployContract: string;
  }>({
    uri: ipfsUri,
    query: `
          mutation {
            deployContract
          }
        `,
  });
  if (deploy.errors) {
    deploy.errors.forEach((e) => console.log(e));
  }

  expect(deploy.errors).to.eq(false);
  expect(deploy.data).to.eq(true);
  expect(deploy.data?.deployContract.indexOf("0x")).to.be.gt(-1);

  if (!deploy.data) {
    return;
  }

  const address = deploy.data.deployContract;
  const set = await client.query<{
    setData: string;
  }>({
    uri: ipfsUri,
    query: `
          mutation {
            setData(
              address: "${address}"
              value: $value
            )
          }
        `,
    variables: {
      value: 55,
    },
  });

  expect(set.errors).to.eq(false);
  expect(set.data).to.eq(true);
  expect(set.data?.setData.indexOf("0x")).to.be.gt(-1);

  const get = await client.query<{
    getData: number;
    secondGetData: number;
    thirdGetData: number;
  }>({
    uri: ipfsUri,
    query: `
          query {
            getData(
              address: "${address}"
            )
            secondGetData: getData(
              address: "${address}"
            )
            thirdGetData: getData(
              address: "${address}"
            )
          }
        `,
  });

  expect(get.errors).to.eq(false);
  expect(get.data).to.eq(true);
  expect(get.data?.getData).to.eq(55);
  expect(get.data?.secondGetData).to.eq(55);
  expect(get.data?.thirdGetData).to.eq(55);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

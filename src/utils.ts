import { runCLI } from "@web3api/test-env-js";

export async function buildAndDeployToIpfs(
  apiAbsPath: string,
  ipfsProvider: string,
  cwd?: string
): Promise<string> {
  // build & deploy the protocol
  const { exitCode, stdout, stderr } = await runCLI({
    args: ["build", `${apiAbsPath}/web3api.yaml`, "--ipfs", ipfsProvider],
    cwd,
  });

  if (exitCode !== 0) {
    console.error(`w3 exited with code: ${exitCode}`);
    console.log(`stderr:\n${stderr}`);
    console.log(`stdout:\n${stdout}`);
    throw Error("w3 CLI failed");
  }

  // get the IPFS CID of the published package
  const extractCID = /IPFS { (([A-Z]|[a-z]|[0-9])*) }/;
  const result = stdout.match(extractCID);

  if (!result) {
    throw Error(`W3 CLI output missing IPFS CID.\nOutput: ${stdout}`);
  }

  return result[1];
}

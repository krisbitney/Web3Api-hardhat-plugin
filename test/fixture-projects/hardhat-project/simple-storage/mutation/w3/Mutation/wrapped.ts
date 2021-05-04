import { setData, deployContract } from "../../index";
import {
  deserializesetDataArgs,
  serializesetDataResult,
  deserializedeployContractArgs,
  serializedeployContractResult,
} from "./serialization";

export function setDataWrapped(argsBuf: ArrayBuffer): ArrayBuffer {
  const args = deserializesetDataArgs(argsBuf);
  const result = setData({
    address: args.address,
    value: args.value,
  });
  return serializesetDataResult(result);
}

export function deployContractWrapped(argsBuf: ArrayBuffer): ArrayBuffer {
  const result = deployContract();
  return serializedeployContractResult(result);
}

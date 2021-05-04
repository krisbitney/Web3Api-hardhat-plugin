import { getData } from "../../index";
import {
  deserializegetDataArgs,
  serializegetDataResult,
} from "./serialization";

export function getDataWrapped(argsBuf: ArrayBuffer): ArrayBuffer {
  const args = deserializegetDataArgs(argsBuf);
  const result = getData({
    address: args.address,
  });
  return serializegetDataResult(result);
}

import {
  Read,
  ReadDecoder,
  WriteSizer,
  WriteEncoder,
  Write,
  Nullable,
} from "@web3api/wasm-as";
import * as Types from "..";

export class Input_setData {
  address: string;
  value: i32;
}

export function deserializesetDataArgs(argsBuf: ArrayBuffer): Input_setData {
  const reader = new ReadDecoder(argsBuf);
  var numFields = reader.readMapLength();

  var _address: string = "";
  var _addressSet: bool = false;
  var _value: i32 = 0;
  var _valueSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    if (field == "address") {
      _address = reader.readString();
      _addressSet = true;
    } else if (field == "value") {
      _value = reader.readInt32();
      _valueSet = true;
    }
  }

  if (!_addressSet) {
    throw new Error("Missing required argument: 'address: String'");
  }
  if (!_valueSet) {
    throw new Error("Missing required argument: 'value: Int'");
  }

  return {
    address: _address,
    value: _value,
  };
}

export function serializesetDataResult(result: string): ArrayBuffer {
  const sizer = new WriteSizer();
  writesetDataResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoder = new WriteEncoder(buffer);
  writesetDataResult(encoder, result);
  return buffer;
}

export function writesetDataResult(writer: Write, result: string): void {
  writer.writeString(result);
}

export class Input_deployContract {}

export function deserializedeployContractArgs(
  argsBuf: ArrayBuffer
): Input_deployContract {
  return {};
}

export function serializedeployContractResult(result: string): ArrayBuffer {
  const sizer = new WriteSizer();
  writedeployContractResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoder = new WriteEncoder(buffer);
  writedeployContractResult(encoder, result);
  return buffer;
}

export function writedeployContractResult(writer: Write, result: string): void {
  writer.writeString(result);
}

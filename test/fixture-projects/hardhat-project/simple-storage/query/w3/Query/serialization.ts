import {
  Read,
  ReadDecoder,
  WriteSizer,
  WriteEncoder,
  Write,
  Nullable,
} from "@web3api/wasm-as";
import * as Types from "..";

export class Input_getData {
  address: string;
}

export function deserializegetDataArgs(argsBuf: ArrayBuffer): Input_getData {
  const reader = new ReadDecoder(argsBuf);
  var numFields = reader.readMapLength();

  var _address: string = "";
  var _addressSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    if (field == "address") {
      _address = reader.readString();
      _addressSet = true;
    }
  }

  if (!_addressSet) {
    throw new Error("Missing required argument: 'address: String'");
  }

  return {
    address: _address,
  };
}

export function serializegetDataResult(result: i32): ArrayBuffer {
  const sizer = new WriteSizer();
  writegetDataResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoder = new WriteEncoder(buffer);
  writegetDataResult(encoder, result);
  return buffer;
}

export function writegetDataResult(writer: Write, result: i32): void {
  writer.writeInt32(result);
}

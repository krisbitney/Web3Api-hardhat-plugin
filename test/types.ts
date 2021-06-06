export enum ChainId {
  MAINNET = "MAINNET",
  ROPSTEN = "ROPSTEN",
  RINKEBY = "RINKEBY",
  GOERLI = "GOERLI",
  KOVAN = "KOVAN",
}

export interface Token {
  chainId: ChainId;
  address: string;
  currency: Currency;
}

export interface Currency {
  decimals: number;
  symbol: string | null;
  name: string | null;
}

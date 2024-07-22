export interface Response {
    "name": string,
    "png64": string,
    "png128": string,
    "webp64": string,
    "webp128": string,
    "centralized": boolean,
    "usCompliant": boolean,
    "code": string,
    "markets": number,
    "volume": number,
    "bidTotal": number,
    "askTotal": number,
    "depth": number,
    "visitors": number,
    "volumePerVisitor": number
  }

  export interface ExtendedResponse extends Response {
    timestamp: number,
    _id: string
  }
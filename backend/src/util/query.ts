export class Query {
  private _query: string;
  private _placeHolder: string = "";
  private _limit: string = "";

  static of(query: string): Query {
    return new this(query);
  }
  constructor(query: string) {
    if (query === undefined) throw "query가 입력되지 않았습니다. ";
    this._query = query;
  }
  placeHolder(count: number): Query {
    if (count !== undefined) {
      this._placeHolder = ` (${Array(count).fill("?").join(",")})`;
    }
    return this;
  }

  limit(startIdx?: number, offset?: number): Query {
    if (startIdx !== undefined && offset !== undefined) {
      this._limit = ` LIMIT ${startIdx}, ${offset}`;
    }
    return this;
  }
  build(): string {
    return `${this._query} ${this._placeHolder} ${this._limit}`;
  }
}

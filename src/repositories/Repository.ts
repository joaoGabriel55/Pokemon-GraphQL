export interface Repository<T> {
  findAll(): Promise<T[]>;
  findAllByCursor(
    after: number,
    before: number,
    pageSize: number
  ): Promise<T[]>;
}

export interface Repository<T> {
  create(object: T): Promise<T>;

  findAll(): Promise<T[]>;

  findAllByCursor(
    after: number,
    before: number,
    pageSize: number
  ): Promise<T[]>;
}

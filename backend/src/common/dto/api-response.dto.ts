export class ApiResponse<T> {
  constructor(
    public readonly data: T,
    public readonly message = 'success',
    public readonly timestamp: string = new Date().toISOString()
  ) {}
}

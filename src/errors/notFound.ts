export class NotFoundError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = "Entity not found";
    this.status = status;
  }
}

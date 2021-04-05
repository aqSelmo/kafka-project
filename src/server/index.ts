import express, { Express } from 'express';

class Server {
  public application: Express;

  constructor() {
    this.application = express();

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.application.use(express.json());
  }

  private routes() {}
}

export default new Server().application;

import express, { type Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  routes: () => Router;
  publicPath?: string;
}

export class ServerApp {
  private readonly app = express.application;
  private readonly routes: () => Router;
  private readonly port: number;
  private readonly publicPath: string;

  constructor({ port, routes, publicPath = 'public' }: Options) {
    this.app = express();
    this.port = port;
    this.routes = routes;
    this.publicPath = publicPath;
  }

  async start(): Promise<void> {
    //* middleware
    this.app.use(express.json()); // raw body
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded body (usado en angular)

    //* public folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes());

    //* SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`🟢 http://localhost:${this.port}`);
    });
  }
}

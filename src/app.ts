import { envs } from './config/envs';
import { ServerApp } from './presentation/server-app';
import { AppRouter } from './presentation/routes';

(() => {
  main();
})();

function main(): void {
  const server = new ServerApp({
    port: envs.PORT,
    routes: () => AppRouter.routes,
    publicPath: envs.PUBLIC_PATH,
  });
  void server.start();
}

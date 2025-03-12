import init, { greet } from '@engine/engine';

init().then(() => {
  greet('WebAssembly');
});

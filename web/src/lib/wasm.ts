import init, { greet } from '@engine/pkg/engine';

init().then(() => {
  greet('WebAssembly');
});

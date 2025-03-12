import { Accessor, createSignal, Setter } from 'solid-js';

export type EngineButtons = {
  ng_master: boolean;
  ng_start: boolean;
};

export type Engine = {
  buttons: EngineButtons;
  ng_set_point: number;
  ng_speed: number;
};

export function newEngine(): Engine {
  return {
    buttons: {
      ng_master: false,
      ng_start: false,
    },
    ng_set_point: 10,
    ng_speed: 0,
  };
}

export function createEngine(): [Accessor<Engine>, Setter<Engine>] {
  const [engine, setEngine] = createSignal(newEngine(), { equals: false });

  return [engine, setEngine];
}

export function toggleButton(
  key: keyof EngineButtons
): (engine: Engine) => Engine {
  return (engine) => {
    engine.buttons[key] = !engine.buttons[key];
    return engine;
  };
}

export function tick(dt: number): (engine: Engine) => Engine {
  return function (engine) {
    if (
      engine.buttons.ng_master &&
      engine.buttons.ng_start &&
      engine.ng_speed < 10
    ) {
      engine.ng_speed += 0.05 * dt;
    }

    return engine;
  };
}

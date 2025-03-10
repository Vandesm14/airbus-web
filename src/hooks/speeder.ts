import {
  Accessor,
  createEffect,
  createMemo,
  createSignal,
  Setter,
} from 'solid-js';

const timeout = 400;

/** The longer a value is changed, the faster it will change. */
export function createSpeeder(): {
  value: Accessor<number>;
  setValue: Setter<number>;
  increment: () => void;
  decrement: () => void;
} {
  const [value, setValue] = createSignal(0);

  const [lastTime, setLastTime] = createSignal(0);
  const [sprintTime, setSprintTime] = createSignal(1);

  const speed = createMemo(() => {
    const diff = lastTime() - sprintTime();

    if (diff < 1000) {
      return 1;
    } else if (diff < 2000) {
      return 2;
    } else if (diff < 3000) {
      return 5;
    } else if (diff < 4000) {
      return 10;
    } else {
      return 50;
    }
  });

  createEffect(() => {
    // Trigger on value changes
    value();

    const sinceLastChange = Date.now() - lastTime();
    if (sinceLastChange > timeout) {
      console.log('reset');
      setSprintTime(Date.now());
    }

    setLastTime(Date.now());
  });

  createEffect(() => {});

  return {
    value,
    setValue,
    increment: () => setValue((v) => v + speed()),
    decrement: () => setValue((v) => v - speed()),
  };
}

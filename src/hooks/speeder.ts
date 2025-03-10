import { Accessor, createEffect, createSignal, Setter } from 'solid-js';

const timeout = 200;

/** The longer a value is changed, the faster it will change. */
export function createSpeeder(): {
  value: Accessor<number>;
  setValue: Setter<number>;
  increment: () => void;
  decrement: () => void;
} {
  const [value, setValue] = createSignal(0);

  const [changes, setChanges] = createSignal(0);
  const [speed, setSpeed] = createSignal(1);
  const [time, setTime] = createSignal(0);

  createEffect(() => {
    // Trigger on value changes
    value();

    if (Date.now() - time() > timeout) {
      setChanges(0);
      setSpeed(1);
    } else {
      setChanges((c) => (c += 1));
      setSpeed(1 + Math.pow(10, changes() * 0.01));
    }

    setTime(Date.now());
  });

  return {
    value,
    setValue,
    increment: () => setValue((v) => v + speed()),
    decrement: () => setValue((v) => v - speed()),
  };
}

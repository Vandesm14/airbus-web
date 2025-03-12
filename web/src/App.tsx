import Group from './components/Group';
import { createEngine, tick, toggleButton } from './engine';
import Button from './components/Button';
import { createEffect, createSignal, onMount } from 'solid-js';
import WithLabel from './components/WithLabel';
import SevenSegment from './components/SevenSegment';

export default function App() {
  const [lastTick, setLastTick] = createSignal(Date.now());
  const [engine, setEngine] = createEngine();

  const tickRate = 1000 / 30;

  onMount(() => {
    setInterval(() => {
      const now = Date.now();
      const dt = (now - lastTick()) / tickRate;

      setEngine(tick(dt));

      setLastTick(now);
    }, tickRate);
  });

  return (
    <>
      <Group direction="column">
        <Group direction="row" no_pad>
          <WithLabel label="MASTER">
            <Button
              kind="off"
              onClick={() => setEngine(toggleButton('ng_master'))}
              on={() => engine().buttons.ng_master}
            />
          </WithLabel>
          <WithLabel label="STARTER">
            <Button
              kind="on"
              onClick={() => setEngine(toggleButton('ng_start'))}
              on={() => engine().buttons.ng_start}
            />
          </WithLabel>
          <WithLabel label="SPEED">
            <SevenSegment value={engine().ng_speed.toFixed(1)} digits={4} />
          </WithLabel>
        </Group>
        <Group direction="row" no_pad>
          <WithLabel label="SET POINT">
            <SevenSegment value={engine().ng_set_point.toFixed(1)} digits={4} />
          </WithLabel>
        </Group>
      </Group>
    </>
  );
}

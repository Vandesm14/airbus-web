import Group from './components/Group';
import { createSignal, onMount } from 'solid-js';
import WithLabel from './components/WithLabel';
import SevenSegment from './components/SevenSegment';
import Encoder from './components/Encoder';
import { createAcceleration } from './hooks/speeder';

import { Game } from '@engine/pkg/engine';

export default function App() {
  const [lastTick, setLastTick] = createSignal(Date.now());
  const speeder = createAcceleration();
  const [game, setGame] = createSignal(new Game());

  const tickRate = 1000 / 30;

  onMount(() => {
    setInterval(() => {
      const now = Date.now();
      const dt = (now - lastTick()) / tickRate;

      // setEngine(tick(dt));

      setLastTick(now);
    }, tickRate);
  });

  const onSetPointChange = (direction: number) => {
    setGame((g) => {
      g.set_control_rods_delta(speeder() * direction);
      return g;
    });
  };

  return (
    <>
      <Group direction="column">
        <Group direction="row" no_pad>
          <WithLabel label="SPEED">
            <SevenSegment
              value={game().reactor().temp().toFixed(1)}
              digits={4}
            />
          </WithLabel>
        </Group>
        <Group direction="row" no_pad>
          <WithLabel label="SET POINT">
            <SevenSegment
              value={game().reactor().control_rods().toFixed(1)}
              digits={4}
            />
            <Encoder onChange={onSetPointChange} />
          </WithLabel>
        </Group>
      </Group>
    </>
  );
}

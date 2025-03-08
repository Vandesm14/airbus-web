import { createSignal, onMount } from 'solid-js';
import Group from '~/components/Group';
import Knob, { Detent } from '~/components/Knob';
import SevenSegment from '~/components/SevenSegment';

export default function Test() {
  const detents: Array<Detent> = [
    { angle: -90, value: -5.0, label: 'DECR' },
    { angle: -60, value: -0.5 },
    { angle: -30, value: -0.1 },
    { angle: 0, value: 0, label: 'NEUTR' },
    { angle: 30, value: 0.1 },
    { angle: 60, value: 0.5 },
    { angle: 90, value: 5.0, label: 'INCR' },
  ];

  const [value, setValue] = createSignal(0);
  const [point, setPoint] = createSignal(0);

  onMount(() => {
    setInterval(() => {
      setPoint((point) => (point += value()));
    }, 1000 / 5);
  });

  return (
    <Group direction="column">
      <Knob detents={detents} defaultIndex={3} onChange={setValue} />
      <SevenSegment value={point().toFixed(1)} digits={4} />
    </Group>
  );
}

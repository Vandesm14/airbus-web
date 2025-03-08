import { createMemo, createSignal } from 'solid-js';
import Group from '~/components/Group';
import Knob, { Detent } from '~/components/Knob';
import SevenSegment from '~/components/SevenSegment';

export default function Test() {
  const detents: Array<Detent> = [
    { angle: -90, label: 'DECR' },
    { angle: -45 },
    { angle: 0, label: 'NEUTR' },
    { angle: 45 },
    { angle: 90, label: 'INCR' },
  ];

  const [value, setValue] = createSignal(0);

  const label = createMemo(() =>
    ['DECR+', 'DECR', 'NEUTR', 'INCR', 'INCR+'].at(value())
  );

  return (
    <Group direction="column">
      <Knob detents={detents} defaultIndex={2} onChange={setValue} />
      <SevenSegment value={value()} />
    </Group>
  );
}

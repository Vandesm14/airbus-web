import { createSignal } from 'solid-js';
import Group from '~/components/Group';
import Knob, { Detent } from '~/components/Knob';

export default function Test() {
  const detents: Array<Detent> = [
    { angle: -90, label: 'DECR' },
    { angle: -45 },
    { angle: 0, label: 'NEUTR' },
    { angle: 45 },
    { angle: 90, label: 'INCR' },
  ];

  let [value, setValue] = createSignal(0);

  return (
    <Group direction="column">
      <Knob detents={detents} defaultIndex={2} onChange={setValue} />
      <span>{detents.at(value())?.label ?? ''}</span>
    </Group>
  );
}

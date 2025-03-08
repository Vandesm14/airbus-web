import { createSignal } from 'solid-js';
import Group from '~/components/Group';
import Knob, { Detent } from '~/components/Knob';

export default function Test() {
  const detents: Array<Detent> = [
    { angle: -90, label: 'DECR' },
    { angle: 0, label: 'NEUTR' },
    { angle: 90, label: 'INCR' },
  ];

  let [value, setValue] = createSignal(0);

  return (
    <Group direction="column">
      <span>{detents.at(value())?.label ?? ''}</span>
      <Knob detents={detents} defaultIndex={1} onChange={setValue} />
    </Group>
  );
}

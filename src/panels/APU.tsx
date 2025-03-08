import Button from '~/components/Button';
import Group from '~/components/Group';
import WithLabel from '~/components/WithLabel';

import { createEffect, createMemo, createSignal, onMount } from 'solid-js';
import SevenSegment from '~/components/SevenSegment';

export default function APU() {
  const [master, setMaster] = createSignal(false);
  const [start, setStart] = createSignal(false);
  const [apuSpeed, setApuSpeed] = createSignal(0);

  createEffect(() => {
    if (!master()) {
      setStart(false);
    }
  });

  onMount(() => {
    const interval = setInterval(() => {
      if (start()) {
        setApuSpeed((x) => Math.min(x + 1, 100));
      } else {
        setApuSpeed((x) => Math.max(x - 1, 0));
      }
    }, 100);

    return () => clearInterval(interval);
  });

  const apuAvail = createMemo(() => apuSpeed() === 100);

  return (
    <Group direction="column">
      <WithLabel label="APU SPEED">
        <SevenSegment value={apuSpeed()} digits={3} />
      </WithLabel>
      <WithLabel label="MASTER">
        <Button kind="on" on={master()} setOn={setMaster} />
      </WithLabel>
      <WithLabel label="START">
        <Button
          kind="on"
          on={start()}
          setOn={(x) => master() && setStart(x)}
          avail={apuAvail()}
        />
      </WithLabel>
    </Group>
  );
}

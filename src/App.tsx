import Button from './components/Button';
import Group from './components/Group';
import WithLabel from './components/WithLabel';

import { createSignal } from 'solid-js';

export default function App() {
  const [master, setMaster] = createSignal(false);
  const [start, setStart] = createSignal(false);

  return (
    <>
      <Group direction="column">
        <WithLabel label="MASTER">
          <Button kind="on" onClick={setMaster} />
        </WithLabel>
        <WithLabel label="START">
          <Button
            kind="on"
            onClick={setStart}
            avail={master()}
            disabled={!master()}
          />
        </WithLabel>
      </Group>
    </>
  );
}

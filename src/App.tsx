import Group from '~/components/Group';

import APU from './panels/APU';
import Test from './panels/Test';

export default function App() {
  return (
    <>
      <Group direction="row">
        <APU />
        <Test />
      </Group>
    </>
  );
}

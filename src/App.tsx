import Button from './components/Button';
import WithLabel from './components/WithLabel';

export default function App() {
  return (
    <>
      <WithLabel label="MASTER">
        <Button kind="on" />
      </WithLabel>
      <WithLabel label="START">
        <Button kind="on" avail />
      </WithLabel>
    </>
  );
}

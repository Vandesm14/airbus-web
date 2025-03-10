import { createSignal, onMount } from 'solid-js';
import Encoder from '~/components/Encoder';
import Group from '~/components/Group';
import Knob, { Detent } from '~/components/Knob';
import MomentButton from '~/components/MomentButton';
import SevenSegment from '~/components/SevenSegment';
import WithLabel from '~/components/WithLabel';
import { createSpeeder } from '~/hooks/speeder';

// function generateDetents(min: number, max: number, stepDetents: number) {
//   const detents: Detent[] = [];
//   const totalSteps = stepDetents * 2 + 3;
//   const angleStep = 180 / (totalSteps - 1);

//   for (let i = 0; i < totalSteps; i++) {
//     const fraction = i / (totalSteps - 1);
//     const value = min + fraction * (max - min);
//     const angle = -90 + i * angleStep;
//     let label = undefined;

//     if (i === 0) label = 'DECR';
//     else if (i === Math.floor(totalSteps / 2)) label = 'NEUTR';
//     else if (i === totalSteps - 1) label = 'INCR';

//     detents.push({ angle, value, ...(label && { label }) });
//   }

//   return detents;
// }

export default function Test() {
  const detents: Array<Detent> = [
    { angle: -120, value: -20.0 },
    { angle: -90, value: -5.0, label: 'DECR' },
    { angle: -60, value: -0.5 },
    { angle: -30, value: -0.1 },
    { angle: 0, value: 0, label: 'NEUTR' },
    { angle: 30, value: 0.1 },
    { angle: 60, value: 0.5 },
    { angle: 90, value: 5.0, label: 'INCR' },
    { angle: 120, value: 20.0 },
  ];

  const [value, setValue] = createSignal(0);
  const {
    value: point,
    setValue: setPoint,
    increment,
    decrement,
  } = createSpeeder();

  onMount(() => {
    setInterval(() => {
      setPoint((point) => (point += value()));
    }, 1000 / 5);
  });

  return (
    <Group direction="column">
      <Group direction="row" padless>
        <WithLabel label="SET POINT">
          <SevenSegment value={point().toFixed(1)} digits={8} />
        </WithLabel>
        <WithLabel label="RST">
          <MomentButton onClick={() => setPoint(0)} />
        </WithLabel>
      </Group>
      <Knob detents={detents} defaultAngle={0} onChange={setValue} />
      <Encoder onIncrement={increment} onDecrement={decrement} />
    </Group>
  );
}

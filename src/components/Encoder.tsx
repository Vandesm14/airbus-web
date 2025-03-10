import './Knob.scss';
import svg from './Knob.svg';

import { createMemo, createSignal } from 'solid-js';

export type EncoderProps = {
  onChange?: (direction: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
};
export default function Encoder(props: EncoderProps) {
  const onChange = () => props.onChange;

  const [value, setValue] = createSignal(0);

  function onScroll(
    e: Event & { currentTarget: HTMLImageElement; target: Element }
  ) {
    if (e instanceof WheelEvent) {
      e.preventDefault();

      const delta = e.deltaY;
      const d = delta < 0 ? 1 : -1;

      onChange()?.(d);
      setValue((v) => (v += d));

      if (props.onIncrement && d === 1) props.onIncrement();
      if (props.onDecrement && d === -1) props.onDecrement();
    }
  }

  const transform = createMemo(() => `transform: rotate(${value()}deg)`);

  return (
    <div class="knob">
      <img src={svg} alt="Knob" onwheel={onScroll} style={transform()} />
    </div>
  );
}

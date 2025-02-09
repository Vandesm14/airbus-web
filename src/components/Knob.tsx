import { createMemo, createSignal, For } from 'solid-js';
import svg from './Knob.svg';
import Label from './Label';

export type Detent = {
  label: string;
  angle: number;
};
export type KnobProps = {
  detents: Detent[];
  default: number;
};
export default function Knob(props: KnobProps) {
  let ref!: HTMLImageElement;
  const [value, setValue] = createSignal(0);

  const detents = () => props.detents;
  const defaultValue = () => props.default;

  const detent = createMemo(() => {
    return detents().at(value());
  });

  function onScroll(
    e: Event & { currentTarget: HTMLImageElement; target: Element }
  ) {
    if (e instanceof WheelEvent) {
      const delta = e.deltaY;
      if (delta > 0) {
        setValue((x) => Math.max(x - 1, 0));
      } else if (delta < 0) {
        setValue((x) => Math.min(x + 1, detents().length - 1));
      }
    }
  }

  const position = createMemo(() => {
    if (ref instanceof HTMLImageElement) {
      return (ref?.offsetWidth ?? 0) / 2;
    }
  });

  const rotation = createMemo(() => `rotate(${detent()?.angle ?? 0}deg)`);
  const transform = createMemo(() => `transform: ${rotation()}`);

  return (
    <div class="knob">
      <img
        src={svg}
        alt="Knob"
        onwheel={onScroll}
        style={transform()}
        ref={ref}
      />
      <For each={detents()}>{(detent) => <Label text={detent.label} />}</For>
    </div>
  );
}

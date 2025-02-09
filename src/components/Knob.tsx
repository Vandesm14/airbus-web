import './Knob.scss';
import svg from './Knob.svg';

import { createEffect, createMemo, createSignal, For } from 'solid-js';

import Label from './Label';
import { toRad } from '../lib/ang';
import { trackBounds } from 'solid-boundaries';

export type Detent = {
  label: string;
  angle: number;
};
export type KnobProps = {
  detents: Detent[];
  default: number;
};
export default function Knob(props: KnobProps) {
  const { ref, bounds } = trackBounds();

  const detents = () => props.detents;
  const defaultValue = () => props.default;

  const [value, setValue] = createSignal(defaultValue());

  const detent = createMemo(() => {
    return detents().at(value());
  });

  function onScroll(
    e: Event & { currentTarget: HTMLImageElement; target: Element }
  ) {
    if (e instanceof WheelEvent) {
      e.preventDefault();

      const delta = e.deltaY;
      if (delta > 0) {
        setValue((x) => Math.max(x - 1, 0));
      } else if (delta < 0) {
        setValue((x) => Math.min(x + 1, detents().length - 1));
      }
    }
  }

  const transform = createMemo(
    () => `transform: rotate(${detent()?.angle ?? 0}deg)`
  );

  createEffect(() => {
    console.log(bounds());
  });

  const labels = createMemo(() => {
    let arr: Array<{ text: string; x: number; y: number }> = [];
    if (bounds()) {
      for (const detent of detents()) {
        const angle = toRad(detent.angle);

        let x = Math.sin(angle) * 75;
        let y = Math.cos(angle) * 75;

        x += bounds()!.left + bounds()!.width / 2;
        y += bounds()!.top + bounds()!.height / 2;

        y -= 20;

        arr.push({ text: detent.label, x, y });
      }
    }

    return arr;
  });

  return (
    <div class="knob">
      <img
        src={svg}
        alt="Knob"
        onwheel={onScroll}
        style={transform()}
        ref={ref}
      />
      <For each={labels()}>
        {(label) => (
          <Label
            text={label.text}
            style={`position: absolute; left: ${label.x}px; top: ${label.y}px;`}
          />
        )}
      </For>
    </div>
  );
}

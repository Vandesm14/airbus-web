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
  defaultIndex?: number;

  onChange?: (index: number) => void;
};
export default function Knob(props: KnobProps) {
  const { ref, bounds } = trackBounds();

  const detents = () => props.detents;
  const defaultValue = () => props.defaultIndex;

  const [value, setValue] = createSignal(defaultValue() ?? 0);

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

  createEffect(() => {
    props.onChange?.(value());
  });

  const transform = createMemo(
    () => `transform: rotate(${detent()?.angle ?? 0}deg)`
  );

  const labels = createMemo(() => {
    let arr: Array<{ text: string; x: number; y: number; align: number }> = [];
    if (bounds()) {
      for (const detent of detents()) {
        const angle = toRad(detent.angle);

        // Calculate the x and y coordinates of the label
        let x = Math.sin(angle) * 60;
        let y = Math.cos(angle) * -70;

        // Offset based on the center of the knob
        x += bounds()!.left + bounds()!.width / 2;
        y += bounds()!.top + bounds()!.height / 2;

        // Offset based on the window (scroll position)
        x += window.scrollX;
        y += window.scrollY;

        // Offset for font size (vertically)
        y -= 20;

        arr.push({ text: detent.label, x, y, align: Math.sin(angle) });
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
            style={`position: absolute; top: ${label.y}px; left: ${
              label.x
            }px; transform: translate(${label.align * 50 - 50}%, 0);`}
          />
        )}
      </For>
    </div>
  );
}

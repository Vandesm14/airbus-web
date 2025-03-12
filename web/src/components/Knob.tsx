import './Knob.scss';
import svg from './Knob.svg';

import { createEffect, createMemo, createSignal, For } from 'solid-js';

import Label from './Label';
import { toRad } from '../lib/ang';
import { trackBounds } from 'solid-boundaries';

export type Detent = {
  label?: string;
  angle: number;
  value: unknown;
};
export type KnobProps = {
  detents: Detent[];
  defaultAngle?: number;

  onChange?: (index: unknown) => void;
};
export default function Knob(props: KnobProps) {
  const { ref, bounds } = trackBounds();

  const detents = () => props.detents;
  const defaultAngle = () => props.defaultAngle;

  const [index, setIndex] = createSignal(
    detents().findIndex((d) => d.angle === defaultAngle()) ?? 0
  );

  const detent = createMemo(() => {
    return detents().at(index());
  });

  function onScroll(
    e: Event & { currentTarget: HTMLImageElement; target: Element }
  ) {
    if (e instanceof WheelEvent) {
      e.preventDefault();

      const delta = e.deltaY;
      if (delta > 0) {
        setIndex((x) => Math.max(x - 1, 0));
      } else if (delta < 0) {
        setIndex((x) => Math.min(x + 1, detents().length - 1));
      }
    }
  }

  createEffect(() => {
    props.onChange?.(detent()?.value);
  });

  const transform = createMemo(
    () => `transform: rotate(${detent()?.angle ?? 0}deg)`
  );

  const labels = createMemo(() => {
    let arr: Array<{
      text: string;
      x: number;
      y: number;
      align: number;
      index: number;
    }> = [];
    if (bounds()) {
      for (let i = 0; i < detents().length; i++) {
        const detent = detents()[i]!;
        if (!detent.label) continue;

        const angle = toRad(detent.angle);

        // Calculate the x and y coordinates of the label
        let x = Math.sin(angle) * 50;
        let y = Math.cos(angle) * -60;

        // Offset based on the center of the knob
        x += bounds()!.left + bounds()!.width / 2;
        y += bounds()!.top + bounds()!.height / 2;

        // Offset based on the window (scroll position)
        x += window.scrollX;
        y += window.scrollY;

        // Offset for font size (vertically)
        y -= 20;

        arr.push({
          text: detent.label,
          x,
          y,
          align: Math.sin(angle),
          index: i,
        });
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
            onClick={() => setIndex(label.index)}
          />
        )}
      </For>
    </div>
  );
}

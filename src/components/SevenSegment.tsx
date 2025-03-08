import { createEffect } from 'solid-js';

export type Segments = {
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
  e: boolean;
  f: boolean;
  g: boolean;
};
export function digitToSegment(digit: number): Segments {
  return {
    a: [0, 2, 3, 5, 6, 7, 8, 9].includes(digit),
    b: [0, 1, 2, 3, 4, 7, 8, 9].includes(digit),
    c: [0, 1, 3, 4, 5, 6, 7, 8, 9].includes(digit),
    d: [0, 2, 3, 5, 6, 8, 9].includes(digit),
    e: [0, 2, 6, 8].includes(digit),
    f: [0, 4, 5, 6, 8, 9].includes(digit),
    g: [-1, 2, 3, 4, 5, 6, 8, 9].includes(digit),
  };
}

export default function SevenSegment(props: {
  value: number;
  digits?: number;
  padWithZeros?: boolean;
}) {
  let canvas!: HTMLCanvasElement;

  const value = () => props.value;
  const digits = () => props.digits ?? 1;
  const padWithZeros = () => props.padWithZeros ?? false;

  const size = 10;
  const ratio = 2.5;
  const padding = size * 1.5;

  createEffect(() => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'orange';
    ctx.strokeStyle = 'orange';

    let string = value().toString();
    let dotIndex = string.indexOf('.');
    if (value() < 0) {
      dotIndex -= 1;
    }

    string = string.replace('.', '');
    const length = string.length;

    const calcOffset = (i: number) => (size * 2 + size * ratio + padding) * i;

    for (let i = 0; i < digits(); i++) {
      const index = length - digits() + i;
      const char = string[index];

      let digit: number = 0;
      if (char) {
        if (char === '-') {
          digit = -1;
        } else {
          digit = Number(char);
        }
      } else if (!padWithZeros()) {
        continue;
      }

      let segments = digitToSegment(digit);

      const offset = calcOffset(i);

      if (segments.a) {
        ctx.fillRect(offset + padding + size, padding, size * ratio, size);
      }
      if (segments.b) {
        ctx.fillRect(
          offset + padding + size + size * ratio,
          padding + size,
          size,
          size * ratio
        );
      }
      if (segments.c) {
        ctx.fillRect(
          offset + padding + size + size * ratio,
          padding + size * 2 + size * ratio,
          size,
          size * ratio
        );
      }
      if (segments.d) {
        ctx.fillRect(
          offset + padding + size,
          padding + size * 2 + size * ratio * 2,
          size * ratio,
          size
        );
      }
      if (segments.e) {
        ctx.fillRect(
          offset + padding,
          padding + size * 2 + size * ratio,
          size,
          size * ratio
        );
      }
      if (segments.f) {
        ctx.fillRect(offset + padding, padding + size, size, size * ratio);
      }
      if (segments.g) {
        ctx.fillRect(
          offset + padding + size,
          padding + size + size * ratio,
          size * ratio,
          size
        );
      }
    }

    if (dotIndex >= 0) {
      const offset = calcOffset(dotIndex);
      ctx.fillRect(
        offset + padding + size * ratio + size + padding,
        padding + size * 2 + size * ratio * 2,
        size,
        size
      );
    }
  });

  return (
    <canvas
      ref={canvas}
      width={(size * 2 + size * ratio + padding) * digits() + padding}
      height={size * 3 + size * ratio * 2 + padding * 2}
    ></canvas>
  );
}

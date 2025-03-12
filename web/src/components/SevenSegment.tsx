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

function nullSegments(): Segments {
  return {
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
  };
}

function digitToSegment(digit: number): Segments {
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

const OnColor = '#f00';
const OffColor = '#300';

export default function SevenSegment(props: {
  value: number | string;
  digits?: number;
  padWithZeros?: boolean;
}) {
  let canvas!: HTMLCanvasElement;

  const value = () => props.value;
  const digits = () => props.digits ?? 1;
  const padWithZeros = () => props.padWithZeros ?? false;

  const size = 6;
  const ratio = 4;
  const padding = size * 1.5;

  createEffect(() => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let string = value().toString();
    let decimalIndex = string.indexOf('.') - 1;

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
      }

      const offset = calcOffset(i);
      let segments = digitToSegment(digit);

      if (!padWithZeros() && !char) {
        segments = nullSegments();
      }

      ctx.fillStyle = segments.a ? OnColor : OffColor;
      ctx.fillRect(offset + padding + size, padding, size * ratio, size);

      ctx.fillStyle = segments.b ? OnColor : OffColor;
      ctx.fillRect(
        offset + padding + size + size * ratio,
        padding + size,
        size,
        size * ratio
      );

      ctx.fillStyle = segments.c ? OnColor : OffColor;
      ctx.fillRect(
        offset + padding + size + size * ratio,
        padding + size * 2 + size * ratio,
        size,
        size * ratio
      );

      ctx.fillStyle = segments.d ? OnColor : OffColor;
      ctx.fillRect(
        offset + padding + size,
        padding + size * 2 + size * ratio * 2,
        size * ratio,
        size
      );

      ctx.fillStyle = segments.e ? OnColor : OffColor;
      ctx.fillRect(
        offset + padding,
        padding + size * 2 + size * ratio,
        size,
        size * ratio
      );

      ctx.fillStyle = segments.f ? OnColor : OffColor;
      ctx.fillRect(offset + padding, padding + size, size, size * ratio);

      ctx.fillStyle = segments.g ? OnColor : OffColor;
      ctx.fillRect(
        offset + padding + size,
        padding + size + size * ratio,
        size * ratio,
        size
      );
    }

    if (decimalIndex >= 0) {
      const offset = calcOffset(digits() - length + decimalIndex);
      ctx.fillStyle = OnColor;
      ctx.fillRect(
        padding + offset + size * ratio + size * 2.25,
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

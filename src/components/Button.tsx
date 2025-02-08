import './Button.scss';
import { createEffect, createMemo, createSignal } from 'solid-js';

export type ButtonProps = {
  kind: 'on' | 'off';

  avail?: boolean;
  fault?: boolean;

  onClick?: (on: boolean) => void;
};
export default function Button({ kind, avail, fault, onClick }: ButtonProps) {
  const [on, setOn] = createSignal(false);

  const handleClick = () => {
    setOn((on) => {
      on = !on;

      if (onClick) onClick(on);

      return on;
    });
  };

  const topText = createMemo(() => (avail ? 'AVAIL' : fault ? 'FAULT' : ''));
  const bottomText = createMemo(() =>
    kind === 'on' && on() ? 'ON' : kind === 'off' && !on() ? 'OFF' : ''
  );
  const bottomColor = createMemo(() =>
    bottomText() === 'ON' ? 'blue' : bottomText() === 'OFF' ? 'white' : ''
  );

  return (
    <button class="btn" onClick={handleClick}>
      <div class="inner">
        <span classList={{ top: true, fault, avail }}>{topText()}</span>
        <span class={`bottom ${bottomColor()}`}>{bottomText()}</span>
      </div>
    </button>
  );
}

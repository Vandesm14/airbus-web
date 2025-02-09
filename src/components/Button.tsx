import './Button.scss';
import { createEffect, createMemo, createSignal, Setter } from 'solid-js';

export type ButtonProps = {
  kind: 'on' | 'off';

  avail?: boolean;
  fault?: boolean;

  on: boolean;
  setOn: Setter<boolean>;
};
export default function Button(props: ButtonProps) {
  const kind = () => props.kind;
  const avail = () => props.avail;
  const fault = () => props.fault;
  const on = () => props.on;
  const setOn = () => props.setOn;

  const handleClick = () => {
    setOn()((on) => {
      on = !on;
      return on;
    });
  };

  const topClass = createMemo(() => ({
    top: true,
    fault: fault(),
    avail: avail(),
  }));
  const topText = createMemo(() =>
    avail() ? 'AVAIL' : fault() ? 'FAULT' : ''
  );

  const bottomText = createMemo(() =>
    kind() === 'on' && on() ? 'ON' : kind() === 'off' && !on() ? 'OFF' : ''
  );
  const bottomColor = createMemo(() =>
    bottomText() === 'ON' ? 'blue' : bottomText() === 'OFF' ? 'white' : ''
  );

  return (
    <button class="btn" onMouseDown={handleClick}>
      <div class="inner">
        <span classList={topClass()}>{topText()}</span>
        <span class={`bottom ${bottomColor()}`}>{bottomText()}</span>
      </div>
    </button>
  );
}

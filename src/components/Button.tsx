import './Button.scss';
import { createEffect, createMemo, createSignal } from 'solid-js';

export type ButtonProps = {
  disabled?: boolean;
  kind: 'on' | 'off';

  avail?: boolean;
  fault?: boolean;

  onClick?: (on: boolean) => void;
};
export default function Button(props: ButtonProps) {
  const disabled = () => props.disabled;
  const kind = () => props.kind;
  const avail = () => props.avail;
  const fault = () => props.fault;
  const onClick = () => props.onClick;

  const [on, setOn] = createSignal(false);

  createEffect(() => {
    if (disabled()) setOn(false);
  });

  const handleClick = () => {
    if (disabled()) return;

    setOn((on) => {
      on = !on;

      if (onClick()) onClick()!(on);

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

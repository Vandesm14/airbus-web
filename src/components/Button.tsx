import './Button.scss';
import { Accessor, createMemo, Setter } from 'solid-js';

export type ButtonProps = {
  kind: 'on' | 'off';

  avail?: boolean;
  fault?: boolean;

  on: Accessor<boolean>;
  onClick: () => void;
};
export default function Button(props: ButtonProps) {
  const kind = () => props.kind;
  const avail = () => props.avail;
  const fault = () => props.fault;

  const on = props.on;
  const onClick = props.onClick;

  const handleClick = () => {
    onClick();
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
    <div class="btn">
      <button class="inner" onMouseDown={handleClick}>
        <span classList={topClass()}>{topText()}</span>
        <span class={`bottom ${bottomColor()}`}>{bottomText()}</span>
      </button>
    </div>
  );
}

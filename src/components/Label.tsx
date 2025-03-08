import { createMemo, For } from 'solid-js';
import './Label.scss';

export default function Label(props: {
  text: string;
  style?: string;
  onClick?: () => void;
}) {
  const text = () => props.text;
  const style = () => props.style;
  const onClick = () => props.onClick;

  const clickable = createMemo(() => onClick() !== undefined);

  const split = createMemo(() => text().split('\n'));

  return (
    <span
      classList={{ label: true, clickable: clickable() }}
      style={style()}
      onClick={onClick()}
    >
      <For each={split()}>{(line) => <span>{line}</span>}</For>
    </span>
  );
}

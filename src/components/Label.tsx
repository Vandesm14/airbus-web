import { createMemo, For } from 'solid-js';
import './Label.scss';

export default function Label(props: { text: string; style?: string }) {
  const text = () => props.text;
  const style = () => props.style;

  const split = createMemo(() => text().split('\n'));

  return (
    <span class="label" style={style()}>
      <For each={split()}>{(line) => <span>{line}</span>}</For>
    </span>
  );
}

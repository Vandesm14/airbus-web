import './Label.scss';

export default function Label({ text }: { text: string }) {
  return <span class="label">{text}</span>;
}

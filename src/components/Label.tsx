import './Label.scss';

export default function Label({
  text,
  style,
}: {
  text: string;
  style?: string;
}) {
  return (
    <span class="label" style={style}>
      {text}
    </span>
  );
}

import './MomentButton.scss';

export default function MomentButton(props: { onClick?: () => void }) {
  const onClick = () => props.onClick;
  return <button class="moment-btn" onMouseDown={onClick()}></button>;
}

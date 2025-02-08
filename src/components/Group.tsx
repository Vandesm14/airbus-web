import './Group.scss';

import { JSX } from 'solid-js/jsx-runtime';

export default function Group({
  direction,
  children,
}: {
  direction: 'row' | 'column';
  children: JSX.Element;
}) {
  return <div class={`group ${direction}`}>{children}</div>;
}

import './Group.scss';

import { JSX } from 'solid-js/jsx-runtime';

export default function Group({
  direction,
  padless,
  children,
}: {
  direction: 'row' | 'column';
  padless?: boolean;
  children: JSX.Element;
}) {
  return (
    <div class={`group ${direction} ${padless ? 'padless' : ''}`}>
      {children}
    </div>
  );
}

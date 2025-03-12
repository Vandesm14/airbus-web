import './Group.scss';

import { JSX } from 'solid-js/jsx-runtime';

export default function Group({
  direction,
  no_pad,
  no_gap,
  children,
}: {
  direction: 'row' | 'column';
  no_pad?: boolean;
  no_gap?: boolean;
  children: JSX.Element;
}) {
  return (
    <div
      class={`group ${direction} ${no_pad ? 'no-pad' : ''} ${
        no_gap ? 'no-gap' : ''
      }`}
    >
      {children}
    </div>
  );
}

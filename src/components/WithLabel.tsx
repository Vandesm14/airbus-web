import './WithLabel.scss';

import { JSX } from 'solid-js/jsx-runtime';
import Label from './Label';

export default function WithLabel({
  label,
  children,
}: {
  label: string;
  children: JSX.Element;
}) {
  return (
    <div class="with-label">
      <Label text={label} />
      {children}
    </div>
  );
}

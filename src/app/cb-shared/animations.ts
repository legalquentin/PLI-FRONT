import { trigger, state, transition, animate, style } from '@angular/animations';

export function fadeAnimation(duration: number) {
  return trigger('fade', [
    state(
      'inactive',
      style({
        opacity: 1
      })
    ),
    state(
      'active',
      style({
        opacity: 0
      })
    ),
    transition('inactive => active', animate(duration + 'ms ease-out')),
    transition('active => inactive', animate(duration + 'ms ease-in'))
  ]);
}

export function doAnimation(duration, obj, callback) {
  obj.state = obj.state === 'active' ? 'inactive' : 'active';
  setTimeout(() => {
    obj.state = obj.state === 'active' ? 'inactive' : 'active';
    callback();
  }, duration );
}

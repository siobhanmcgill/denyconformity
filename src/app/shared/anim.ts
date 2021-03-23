import {animate, AnimationTriggerMetadata, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';


export interface StyleType {
  [key: string]: string|number;
}

/**
 * Toggles between two styles.
 * @param name
 * @param outStyle
 * @param inStyle
 * @param duration
 * @param delay
 */
export function createToggle(options: {
  name: string,
  outStyle: StyleType,
  inStyle?: StyleType,
  durationMs?: number,
  delayMs?: number,
  inString?: string,
  outString?: string,
  params?: {[name: string]: string}
}): AnimationTriggerMetadata {
  const duration = options.durationMs || 250;
  const delay = options.delayMs || 0;
  const inString = options.inString || `${duration}ms ${delay}ms ease-in-out`;
  const outString = options.outString || inString;
  const inStyle = options.inStyle || AUTO_STYLE

  return trigger(options.name, [
    state('*', style(inStyle), {params: options.params}),
    state('void', style(options.outStyle)),
    transition('void => *', animate(inString)),
    transition('* => void', animate(outString)),
  ]);
}

import { animate, utils } from 'animejs';
console.log('utils:', utils);
try {
  animate('.test', { opacity: 1 });
  console.log('Animate call 1 success');
} catch(e) { console.log('Animate call 1 error:', e.message); }

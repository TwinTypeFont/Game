import * as AnimeComplete from 'animejs';
import { animate, utils } from 'animejs';

console.log('Exports:', Object.keys(AnimeComplete));
console.log('utils:', utils);
if (utils) {
    console.log('utils.stagger:', utils.stagger);
} else {
    console.log('utils is undefined.');
    console.log('stagger in exports?', 'stagger' in AnimeComplete);
}

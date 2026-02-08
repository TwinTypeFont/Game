// Trivial test for animejs import
import { animate } from 'animejs';

console.log('Type of animate:', typeof animate);
try {
    // Test v3 syntax
    console.log('Testing object syntax...');
    const a1 = animate({ targets: {a:1}, a: 2, autoplay: false });
    console.log('Object syntax result:', a1);
} catch (e) {
    console.log('Object syntax failed:', e.message);
}

try {
    // Test v4 syntax hypothesis
    console.log('Testing args syntax...');
    // Create a dummy object
    const obj = { x: 0 };
    const a2 = animate(obj, { x: 100, autoplay: false });
    console.log('Args syntax result:', a2);
} catch (e) {
    console.log('Args syntax failed:', e.message);
}

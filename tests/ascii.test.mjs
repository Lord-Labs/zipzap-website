import test from 'node:test';
import assert from 'node:assert/strict';
import { sculptureFrame } from '../ascii.js';

test('static sculpture keeps its download cutout and silhouette', () => {
  const first = sculptureFrame().split('\n');
  const next = sculptureFrame().split('\n');
  assert.deepEqual(first, next);
  assert.equal(first.length, 38);
  for (const frame of [first, next]) {
    assert.ok(frame.every(row => row.length === 72));
    assert.equal(frame[12].slice(32, 40), '        ', 'Arrow stem remains open');
    assert.equal(frame[22].slice(30, 42), '            ', 'Arrow head remains open');
    assert.match(frame[18].slice(9, 25), /[xX#@]/, 'Visible sphere beside the cutout');
    assert.equal(frame[0], ' '.repeat(72), 'No stray characters outside the sphere');
  }
});

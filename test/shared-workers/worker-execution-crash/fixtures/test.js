const test = require('ava');
const plugin = require('./_plugin');

test('shared workers crash', async t => {
	const replies = plugin.publish('🙈').replies();
	await t.throwsAsync(replies.next(), {message: 'The shared worker is no longer available'});
	await t.throwsAsync(plugin.subscribe().next(), {message: 'The shared worker is no longer available'});
	t.false(plugin.currentlyAvailable);
	t.throws(() => plugin.publish(), {message: 'The shared worker is no longer available'});
});

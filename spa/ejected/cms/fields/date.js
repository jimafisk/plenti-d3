/* generated by Svelte v3.38.3 */
import {
	SvelteComponent,
	attr,
	claim_element,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	safe_not_equal
} from '../../../web_modules/svelte/internal/index.mjs';

import { isDate, makeDate, formatDate } from '../date_checker.js';

function create_fragment(ctx) {
	let input;
	let input_value_value;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			this.h();
		},
		l(nodes) {
			input = claim_element(nodes, "INPUT", { type: true });
			this.h();
		},
		h() {
			attr(input, "type", "date");

			input.value = input_value_value = isDate(/*field*/ ctx[0])
			? makeDate(/*field*/ ctx[0])
			: null;

			input.required = true;
		},
		m(target, anchor) {
			insert(target, input, anchor);

			if (!mounted) {
				dispose = listen(input, "input", /*input_handler*/ ctx[2]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*field*/ 1 && input_value_value !== (input_value_value = isDate(/*field*/ ctx[0])
			? makeDate(/*field*/ ctx[0])
			: null)) {
				input.value = input_value_value;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { field } = $$props;

	const bindDate = date => {
		$$invalidate(0, field = formatDate(date, field));
	};

	const input_handler = date => bindDate(date.target.value);

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
	};

	return [field, bindDate, input_handler];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { field: 0 });
	}
}

export default Component;
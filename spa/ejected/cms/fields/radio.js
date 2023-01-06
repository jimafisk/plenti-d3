/* generated by Svelte v3.38.3 */
import {
	SvelteComponent,
	append,
	attr,
	children,
	claim_element,
	claim_space,
	claim_text,
	destroy_each,
	detach,
	element,
	empty,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_data,
	space,
	text
} from '../../../web_modules/svelte/internal/index.mjs';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

// (5:0) {#each schema[parentKeys].options as option}
function create_each_block(ctx) {
	let div;
	let label;
	let input;
	let input_id_value;
	let input_checked_value;
	let t0;
	let t1_value = /*option*/ ctx[4] + "";
	let t1;
	let t2;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[3](/*option*/ ctx[4]);
	}

	return {
		c() {
			div = element("div");
			label = element("label");
			input = element("input");
			t0 = space();
			t1 = text(t1_value);
			t2 = space();
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			label = claim_element(div_nodes, "LABEL", {});
			var label_nodes = children(label);
			input = claim_element(label_nodes, "INPUT", { id: true, type: true, name: true });
			t0 = claim_space(label_nodes);
			t1 = claim_text(label_nodes, t1_value);
			label_nodes.forEach(detach);
			t2 = claim_space(div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(input, "id", input_id_value = /*option*/ ctx[4]);
			attr(input, "type", "radio");
			attr(input, "name", "radio");
			input.checked = input_checked_value = /*field*/ ctx[0] === /*option*/ ctx[4];
			attr(div, "class", "radio");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, label);
			append(label, input);
			append(label, t0);
			append(label, t1);
			append(div, t2);

			if (!mounted) {
				dispose = listen(input, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*schema, parentKeys*/ 6 && input_id_value !== (input_id_value = /*option*/ ctx[4])) {
				attr(input, "id", input_id_value);
			}

			if (dirty & /*field, schema, parentKeys*/ 7 && input_checked_value !== (input_checked_value = /*field*/ ctx[0] === /*option*/ ctx[4])) {
				input.checked = input_checked_value;
			}

			if (dirty & /*schema, parentKeys*/ 6 && t1_value !== (t1_value = /*option*/ ctx[4] + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment(ctx) {
	let each_1_anchor;
	let each_value = /*schema*/ ctx[1][/*parentKeys*/ ctx[2]].options;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*schema, parentKeys, field*/ 7) {
				each_value = /*schema*/ ctx[1][/*parentKeys*/ ctx[2]].options;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { schema } = $$props, { parentKeys } = $$props, { field } = $$props;

	const click_handler = option => {
		$$invalidate(0, field = option);
	};

	$$self.$$set = $$props => {
		if ("schema" in $$props) $$invalidate(1, schema = $$props.schema);
		if ("parentKeys" in $$props) $$invalidate(2, parentKeys = $$props.parentKeys);
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
	};

	return [field, schema, parentKeys, click_handler];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { schema: 1, parentKeys: 2, field: 0 });
	}
}

export default Component;
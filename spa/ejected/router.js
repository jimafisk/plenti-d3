/* generated by Svelte v3.38.3 */
import {
	SvelteComponent,
	claim_component,
	component_subscribe,
	create_component,
	destroy_component,
	init,
	mount_component,
	safe_not_equal,
	transition_in,
	transition_out
} from '../web_modules/svelte/internal/index.mjs';

import Navaid from '../web_modules/navaid/dist/navaid.mjs';
import Html from '../global/html.js';
import { getContent } from './main.js';

// Git-CMS
import adminMenu from './cms/admin_menu.js';

import { user } from './cms/auth.js';
import allBlueprints from './blueprints.js';

function create_fragment(ctx) {
	let html;
	let current;

	html = new Html({
			props: {
				path: /*path*/ ctx[0],
				params: /*params*/ ctx[1],
				content: /*content*/ ctx[2],
				layout: /*layout*/ ctx[3],
				allContent: /*allContent*/ ctx[4],
				allLayouts: /*allLayouts*/ ctx[5],
				env: /*env*/ ctx[6],
				user,
				adminMenu
			}
		});

	return {
		c() {
			create_component(html.$$.fragment);
		},
		l(nodes) {
			claim_component(html.$$.fragment, nodes);
		},
		m(target, anchor) {
			mount_component(html, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const html_changes = {};
			if (dirty & /*path*/ 1) html_changes.path = /*path*/ ctx[0];
			if (dirty & /*params*/ 2) html_changes.params = /*params*/ ctx[1];
			if (dirty & /*content*/ 4) html_changes.content = /*content*/ ctx[2];
			if (dirty & /*layout*/ 8) html_changes.layout = /*layout*/ ctx[3];
			if (dirty & /*allContent*/ 16) html_changes.allContent = /*allContent*/ ctx[4];
			if (dirty & /*allLayouts*/ 32) html_changes.allLayouts = /*allLayouts*/ ctx[5];
			if (dirty & /*env*/ 64) html_changes.env = /*env*/ ctx[6];
			html.$set(html_changes);
		},
		i(local) {
			if (current) return;
			transition_in(html.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(html.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(html, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $user;
	component_subscribe($$self, user, $$value => $$invalidate(7, $user = $$value));

	let { path } = $$props,
		{ params } = $$props,
		{ content } = $$props,
		{ layout } = $$props,
		{ allContent } = $$props,
		{ allLayouts } = $$props,
		{ env } = $$props;

	function draw(m) {
		$$invalidate(2, content = getContent(path));

		if (content === undefined) {
			// Check if there is a 404 data source.
			$$invalidate(2, content = getContent("/404"));

			if (content === undefined) {
				// If no 404.json data source exists, pass placeholder values.
				$$invalidate(2, content = {
					"path": "/404",
					"type": "404",
					"filename": "404.json",
					"fields": {}
				});
			}
		}

		$$invalidate(3, layout = m.default);
		window.scrollTo(0, 0);
	}

	function track(obj) {
		$$invalidate(0, path = obj.state || obj.uri || location.pathname);
		$$invalidate(1, params = new URLSearchParams(location.search));
	}

	addEventListener("replacestate", track);
	addEventListener("pushstate", track);
	addEventListener("popstate", track);

	const handle404 = () => {
		import("../content/404.js").then(draw).catch(err => {
			console.log("Add a '/layouts/content/404.svelte' file to handle Page Not Found errors.");
			console.log("If you want to pass data to your 404 component, you can also add a '/content/404.json' file.");
			console.log(err);
		});
	};

	const deepClone = value => {
		if (value instanceof Array) {
			const clone = [];

			for (const element of value) {
				clone.push(deepClone(element));
			}

			return clone;
		} else if (typeof value === "object") {
			const clone = {};

			for (const key in value) {
				clone[key] = deepClone(value[key]);
			}

			return clone;
		} else {
			return value;
		}
	};

	/**
 * @return {boolean} true if hash location found and navigated, false otherwise.
 */
	const navigateHashLocation = () => {
		if (location.pathname != "/") {
			return false;
		}

		if (location.hash.startsWith("#add/") && $user.isAuthenticated) {
			const [type, filename] = location.hash.substring(("#add/").length).split("/");
			const blueprint = allBlueprints.find(blueprint => blueprint.type == type);
			const existingPage = allContent.find(content => content.type == type && content.filename == filename + ".json");

			if (type && filename && blueprint) {
				import("../content/" + type + ".js").then(m => {
					if (existingPage) {
						history.replaceState(null, "", existingPage.path);
						$$invalidate(2, content = existingPage);
						$$invalidate(3, layout = m.default);
					} else {
						$$invalidate(2, content = deepClone(blueprint));
						$$invalidate(2, content.isNew = true, content);
						$$invalidate(2, content.filename = filename + ".json", content);
						$$invalidate(2, content.filepath = content.filepath.replace("_blueprint.json", filename + ".json"), content);
						$$invalidate(3, layout = m.default);
					}
				}).catch(handle404);

				return true;
			} else {
				// Page type not found or filename not specified.
				handle404();

				return true;
			}
		}

		return false;
	};

	const router = Navaid("/", handle404);

	allContent.forEach(content => {
		router.on((env.local ? "" : env.baseurl) + content.path, () => {
			// Override with hash location if one is found.
			if (navigateHashLocation()) {
				return;
			}

			import("../content/" + content.type + ".js").then(draw).catch(handle404);
		});
	});

	router.listen();

	if ($user.isBeingAuthenticated) {
		$user.finishAuthentication(params);
	}

	$$self.$$set = $$props => {
		if ("path" in $$props) $$invalidate(0, path = $$props.path);
		if ("params" in $$props) $$invalidate(1, params = $$props.params);
		if ("content" in $$props) $$invalidate(2, content = $$props.content);
		if ("layout" in $$props) $$invalidate(3, layout = $$props.layout);
		if ("allContent" in $$props) $$invalidate(4, allContent = $$props.allContent);
		if ("allLayouts" in $$props) $$invalidate(5, allLayouts = $$props.allLayouts);
		if ("env" in $$props) $$invalidate(6, env = $$props.env);
	};

	return [path, params, content, layout, allContent, allLayouts, env];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			path: 0,
			params: 1,
			content: 2,
			layout: 3,
			allContent: 4,
			allLayouts: 5,
			env: 6
		});
	}
}

export default Component;
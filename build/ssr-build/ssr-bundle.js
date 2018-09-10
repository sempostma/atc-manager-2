module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "1t2z":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"WayPoints":"WayPoints__5Srsb"};

/***/ }),

/***/ "4TN0":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"Airport":"Airport__3P59_"};

/***/ }),

/***/ "5sBB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("AX2D");
var iconContext_1 = __webpack_require__("ebug");
function Tree2Element(tree) {
    return tree && tree.map(function (node, i) {
        return React.createElement(node.tag, __assign({ key: i }, node.attr), Tree2Element(node.child));
    });
}
function GenIcon(data) {
    return function (props) {
        return React.createElement(IconBase, __assign({ attr: __assign({}, data.attr) }, props), Tree2Element(data.child));
    };
}
exports.GenIcon = GenIcon;
function IconBase(props) {
    var elem = function elem(conf) {
        var computedSize = props.size || conf.size || "1em";
        var className;
        if (conf.className) className = conf.className;
        if (props.className) className = (className + ' ' || '') + props.className;
        return React.createElement("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0" }, conf.attr, props.attr, props, { className: className, style: __assign({ color: props.color || conf.color }, conf.style, props.style), height: computedSize, width: computedSize }), props.children);
    };
    return iconContext_1.IconContext !== undefined ? React.createElement(iconContext_1.IconContext.Consumer, null, function (conf) {
        return elem(conf);
    }) : elem(iconContext_1.DefaultContext);
}
exports.IconBase = IconBase;

/***/ }),

/***/ "7GbZ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "92I6":
/***/ (function(module, exports) {


module.exports = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;

  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) {// .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' && selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function (range) {
        selection.addRange(range);
      });
    }

    active && active.focus();
  };
};

/***/ }),

/***/ "9GBv":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"BackgroundSvg":"BackgroundSvg__2wFPq"};

/***/ }),

/***/ "AX2D":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOM", function() { return DOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return Children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClass", function() { return createClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return createFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return isValidElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMNode", function() { return findDOMNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmountComponentAtNode", function() { return unmountComponentAtNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return PureComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_renderSubtreeIntoContainer", function() { return renderSubtreeIntoContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return extend; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__("KSGD");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact__ = __webpack_require__("EBst");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a; });



var version = '15.1.0'; // trick libraries to think we are react

var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

var REACT_ELEMENT_TYPE = typeof Symbol !== 'undefined' && Symbol.for && Symbol.for('react.element') || 0xeac7;

var COMPONENT_WRAPPER_KEY = typeof Symbol !== 'undefined' && Symbol.for ? Symbol.for('__preactCompatWrapper') : '__preactCompatWrapper';

// don't autobind these methods since they already have guaranteed context.
var AUTOBIND_BLACKLIST = {
	constructor: 1,
	render: 1,
	shouldComponentUpdate: 1,
	componentWillReceiveProps: 1,
	componentWillUpdate: 1,
	componentDidUpdate: 1,
	componentWillMount: 1,
	componentDidMount: 1,
	componentWillUnmount: 1,
	componentDidUnmount: 1
};

var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/;

var BYPASS_HOOK = {};

/*global process*/
var DEV = typeof process === 'undefined' || !process.env || "production" !== 'production';

// a component that renders nothing. Used to replace components for unmountComponentAtNode.
function EmptyComponent() {
	return null;
}

// make react think we're react.
var VNode = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])('a', null).constructor;
VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;
VNode.prototype.preactCompatUpgraded = false;
VNode.prototype.preactCompatNormalized = false;

Object.defineProperty(VNode.prototype, 'type', {
	get: function get() {
		return this.nodeName;
	},
	set: function set(v) {
		this.nodeName = v;
	},
	configurable: true
});

Object.defineProperty(VNode.prototype, 'props', {
	get: function get() {
		return this.attributes;
	},
	set: function set(v) {
		this.attributes = v;
	},
	configurable: true
});

var oldEventHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].event;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].event = function (e) {
	if (oldEventHook) {
		e = oldEventHook(e);
	}
	e.persist = Object;
	e.nativeEvent = e;
	return e;
};

var oldVnodeHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode = function (vnode) {
	if (!vnode.preactCompatUpgraded) {
		vnode.preactCompatUpgraded = true;

		var tag = vnode.nodeName,
		    attrs = vnode.attributes = extend({}, vnode.attributes);

		if (typeof tag === 'function') {
			if (tag[COMPONENT_WRAPPER_KEY] === true || tag.prototype && 'isReactComponent' in tag.prototype) {
				if (vnode.children && String(vnode.children) === '') {
					vnode.children = undefined;
				}
				if (vnode.children) {
					attrs.children = vnode.children;
				}

				if (!vnode.preactCompatNormalized) {
					normalizeVNode(vnode);
				}
				handleComponentVNode(vnode);
			}
		} else {
			if (vnode.children && String(vnode.children) === '') {
				vnode.children = undefined;
			}
			if (vnode.children) {
				attrs.children = vnode.children;
			}

			if (attrs.defaultValue) {
				if (!attrs.value && attrs.value !== 0) {
					attrs.value = attrs.defaultValue;
				}
				delete attrs.defaultValue;
			}

			handleElementVNode(vnode, attrs);
		}
	}

	if (oldVnodeHook) {
		oldVnodeHook(vnode);
	}
};

function handleComponentVNode(vnode) {
	var tag = vnode.nodeName,
	    a = vnode.attributes;

	vnode.attributes = {};
	if (tag.defaultProps) {
		extend(vnode.attributes, tag.defaultProps);
	}
	if (a) {
		extend(vnode.attributes, a);
	}
}

function handleElementVNode(vnode, a) {
	var shouldSanitize, attrs, i;
	if (a) {
		for (i in a) {
			if (shouldSanitize = CAMEL_PROPS.test(i)) {
				break;
			}
		}
		if (shouldSanitize) {
			attrs = vnode.attributes = {};
			for (i in a) {
				if (a.hasOwnProperty(i)) {
					attrs[CAMEL_PROPS.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i] = a[i];
				}
			}
		}
	}
}

// proxy render() since React returns a Component reference.
function render$1(vnode, parent, callback) {
	var prev = parent && parent._preactCompatRendered && parent._preactCompatRendered.base;

	// ignore impossible previous renders
	if (prev && prev.parentNode !== parent) {
		prev = null;
	}

	// default to first Element child
	if (!prev && parent) {
		prev = parent.firstElementChild;
	}

	// remove unaffected siblings
	for (var i = parent.childNodes.length; i--;) {
		if (parent.childNodes[i] !== prev) {
			parent.removeChild(parent.childNodes[i]);
		}
	}

	var out = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(vnode, parent, prev);
	if (parent) {
		parent._preactCompatRendered = out && (out._component || { base: out });
	}
	if (typeof callback === 'function') {
		callback();
	}
	return out && out._component || out;
}

var ContextProvider = function ContextProvider() {};

ContextProvider.prototype.getChildContext = function () {
	return this.props.context;
};
ContextProvider.prototype.render = function (props) {
	return props.children[0];
};

function renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
	var wrap = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(ContextProvider, { context: parentComponent.context }, vnode);
	var renderContainer = render$1(wrap, container);
	var component = renderContainer._component || renderContainer.base;
	if (callback) {
		callback.call(component, renderContainer);
	}
	return component;
}

function unmountComponentAtNode(container) {
	var existing = container._preactCompatRendered && container._preactCompatRendered.base;
	if (existing && existing.parentNode === container) {
		Object(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(EmptyComponent), container, existing);
		return true;
	}
	return false;
}

var ARR = [];

// This API is completely unnecessary for Preact, so it's basically passthrough.
var Children = {
	map: function map(children, fn, ctx) {
		if (children == null) {
			return null;
		}
		children = Children.toArray(children);
		if (ctx && ctx !== children) {
			fn = fn.bind(ctx);
		}
		return children.map(fn);
	},
	forEach: function forEach(children, fn, ctx) {
		if (children == null) {
			return null;
		}
		children = Children.toArray(children);
		if (ctx && ctx !== children) {
			fn = fn.bind(ctx);
		}
		children.forEach(fn);
	},
	count: function count(children) {
		return children && children.length || 0;
	},
	only: function only(children) {
		children = Children.toArray(children);
		if (children.length !== 1) {
			throw new Error('Children.only() expects only one child.');
		}
		return children[0];
	},
	toArray: function toArray(children) {
		if (children == null) {
			return [];
		}
		return ARR.concat(children);
	}
};

/** Track current render() component for ref assignment */
var currentComponent;

function createFactory(type) {
	return createElement.bind(null, type);
}

var DOM = {};
for (var i = ELEMENTS.length; i--;) {
	DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
}

function upgradeToVNodes(arr, offset) {
	for (var i = offset || 0; i < arr.length; i++) {
		var obj = arr[i];
		if (Array.isArray(obj)) {
			upgradeToVNodes(obj);
		} else if (obj && typeof obj === 'object' && !isValidElement(obj) && (obj.props && obj.type || obj.attributes && obj.nodeName || obj.children)) {
			arr[i] = createElement(obj.type || obj.nodeName, obj.props || obj.attributes, obj.children);
		}
	}
}

function isStatelessComponent(c) {
	return typeof c === 'function' && !(c.prototype && c.prototype.render);
}

// wraps stateless functional components in a PropTypes validator
function wrapStatelessComponent(WrappedComponent) {
	return createClass({
		displayName: WrappedComponent.displayName || WrappedComponent.name,
		render: function render() {
			return WrappedComponent(this.props, this.context);
		}
	});
}

function statelessComponentHook(Ctor) {
	var Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
	if (Wrapped) {
		return Wrapped === true ? Ctor : Wrapped;
	}

	Wrapped = wrapStatelessComponent(Ctor);

	Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, { configurable: true, value: true });
	Wrapped.displayName = Ctor.displayName;
	Wrapped.propTypes = Ctor.propTypes;
	Wrapped.defaultProps = Ctor.defaultProps;

	Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, { configurable: true, value: Wrapped });

	return Wrapped;
}

function createElement() {
	var args = [],
	    len = arguments.length;
	while (len--) {
		args[len] = arguments[len];
	}upgradeToVNodes(args, 2);
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["h"].apply(void 0, args));
}

function normalizeVNode(vnode) {
	vnode.preactCompatNormalized = true;

	applyClassName(vnode);

	if (isStatelessComponent(vnode.nodeName)) {
		vnode.nodeName = statelessComponentHook(vnode.nodeName);
	}

	var ref = vnode.attributes.ref,
	    type = ref && typeof ref;
	if (currentComponent && (type === 'string' || type === 'number')) {
		vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
	}

	applyEventNormalization(vnode);

	return vnode;
}

function cloneElement$1(element, props) {
	var children = [],
	    len = arguments.length - 2;
	while (len-- > 0) {
		children[len] = arguments[len + 2];
	}if (!isValidElement(element)) {
		return element;
	}
	var elementProps = element.attributes || element.props;
	var node = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(element.nodeName || element.type, extend({}, elementProps), element.children || elementProps && elementProps.children);
	// Only provide the 3rd argument if needed.
	// Arguments 3+ overwrite element.children in preactCloneElement
	var cloneArgs = [node, props];
	if (children && children.length) {
		cloneArgs.push(children);
	} else if (props && props.children) {
		cloneArgs.push(props.children);
	}
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["cloneElement"].apply(void 0, cloneArgs));
}

function isValidElement(element) {
	return element && (element instanceof VNode || element.$$typeof === REACT_ELEMENT_TYPE);
}

function createStringRefProxy(name, component) {
	return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
		if (component && component.refs) {
			component.refs[name] = resolved;
			if (resolved === null) {
				delete component._refProxies[name];
				component = null;
			}
		}
	});
}

function applyEventNormalization(ref) {
	var nodeName = ref.nodeName;
	var attributes = ref.attributes;

	if (!attributes || typeof nodeName !== 'string') {
		return;
	}
	var props = {};
	for (var i in attributes) {
		props[i.toLowerCase()] = i;
	}
	if (props.ondoubleclick) {
		attributes.ondblclick = attributes[props.ondoubleclick];
		delete attributes[props.ondoubleclick];
	}
	// for *textual inputs* (incl textarea), normalize `onChange` -> `onInput`:
	if (props.onchange && (nodeName === 'textarea' || nodeName.toLowerCase() === 'input' && !/^fil|che|rad/i.test(attributes.type))) {
		var normalized = props.oninput || 'oninput';
		if (!attributes[normalized]) {
			attributes[normalized] = multihook([attributes[normalized], attributes[props.onchange]]);
			delete attributes[props.onchange];
		}
	}
}

function applyClassName(vnode) {
	var a = vnode.attributes || (vnode.attributes = {});
	classNameDescriptor.enumerable = 'className' in a;
	if (a.className) {
		a.class = a.className;
	}
	Object.defineProperty(a, 'className', classNameDescriptor);
}

var classNameDescriptor = {
	configurable: true,
	get: function get() {
		return this.class;
	},
	set: function set(v) {
		this.class = v;
	}
};

function extend(base, props) {
	var arguments$1 = arguments;

	for (var i = 1, obj = void 0; i < arguments.length; i++) {
		if (obj = arguments$1[i]) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					base[key] = obj[key];
				}
			}
		}
	}
	return base;
}

function shallowDiffers(a, b) {
	for (var i in a) {
		if (!(i in b)) {
			return true;
		}
	}
	for (var i$1 in b) {
		if (a[i$1] !== b[i$1]) {
			return true;
		}
	}
	return false;
}

function findDOMNode(component) {
	return component && component.base || component;
}

function F() {}

function createClass(obj) {
	function cl(props, context) {
		bindAll(this);
		Component$1.call(this, props, context, BYPASS_HOOK);
		newComponentHook.call(this, props, context);
	}

	obj = extend({ constructor: cl }, obj);

	// We need to apply mixins here so that getDefaultProps is correctly mixed
	if (obj.mixins) {
		applyMixins(obj, collateMixins(obj.mixins));
	}
	if (obj.statics) {
		extend(cl, obj.statics);
	}
	if (obj.propTypes) {
		cl.propTypes = obj.propTypes;
	}
	if (obj.defaultProps) {
		cl.defaultProps = obj.defaultProps;
	}
	if (obj.getDefaultProps) {
		cl.defaultProps = obj.getDefaultProps.call(cl);
	}

	F.prototype = Component$1.prototype;
	cl.prototype = extend(new F(), obj);

	cl.displayName = obj.displayName || 'Component';

	return cl;
}

// Flatten an Array of mixins to a map of method name to mixin implementations
function collateMixins(mixins) {
	var keyed = {};
	for (var i = 0; i < mixins.length; i++) {
		var mixin = mixins[i];
		for (var key in mixin) {
			if (mixin.hasOwnProperty(key) && typeof mixin[key] === 'function') {
				(keyed[key] || (keyed[key] = [])).push(mixin[key]);
			}
		}
	}
	return keyed;
}

// apply a mapping of Arrays of mixin methods to a component prototype
function applyMixins(proto, mixins) {
	for (var key in mixins) {
		if (mixins.hasOwnProperty(key)) {
			proto[key] = multihook(mixins[key].concat(proto[key] || ARR), key === 'getDefaultProps' || key === 'getInitialState' || key === 'getChildContext');
		}
	}
}

function bindAll(ctx) {
	for (var i in ctx) {
		var v = ctx[i];
		if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(i)) {
			(ctx[i] = v.bind(ctx)).__bound = true;
		}
	}
}

function callMethod(ctx, m, args) {
	if (typeof m === 'string') {
		m = ctx.constructor.prototype[m];
	}
	if (typeof m === 'function') {
		return m.apply(ctx, args);
	}
}

function multihook(hooks, skipDuplicates) {
	return function () {
		var arguments$1 = arguments;
		var this$1 = this;

		var ret;
		for (var i = 0; i < hooks.length; i++) {
			var r = callMethod(this$1, hooks[i], arguments$1);

			if (skipDuplicates && r != null) {
				if (!ret) {
					ret = {};
				}
				for (var key in r) {
					if (r.hasOwnProperty(key)) {
						ret[key] = r[key];
					}
				}
			} else if (typeof r !== 'undefined') {
				ret = r;
			}
		}
		return ret;
	};
}

function newComponentHook(props, context) {
	propsHook.call(this, props, context);
	this.componentWillReceiveProps = multihook([propsHook, this.componentWillReceiveProps || 'componentWillReceiveProps']);
	this.render = multihook([propsHook, beforeRender, this.render || 'render', afterRender]);
}

function propsHook(props, context) {
	if (!props) {
		return;
	}

	// React annoyingly special-cases single children, and some react components are ridiculously strict about this.
	var c = props.children;
	if (c && Array.isArray(c) && c.length === 1 && (typeof c[0] === 'string' || typeof c[0] === 'function' || c[0] instanceof VNode)) {
		props.children = c[0];

		// but its totally still going to be an Array.
		if (props.children && typeof props.children === 'object') {
			props.children.length = 1;
			props.children[0] = props.children;
		}
	}

	// add proptype checking
	if (DEV) {
		var ctor = typeof this === 'function' ? this : this.constructor,
		    propTypes = this.propTypes || ctor.propTypes;
		var displayName = this.displayName || ctor.name;

		if (propTypes) {
			__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.checkPropTypes(propTypes, props, 'prop', displayName);
		}
	}
}

function beforeRender(props) {
	currentComponent = this;
}

function afterRender() {
	if (currentComponent === this) {
		currentComponent = null;
	}
}

function Component$1(props, context, opts) {
	__WEBPACK_IMPORTED_MODULE_1_preact__["Component"].call(this, props, context);
	this.state = this.getInitialState ? this.getInitialState() : {};
	this.refs = {};
	this._refProxies = {};
	if (opts !== BYPASS_HOOK) {
		newComponentHook.call(this, props, context);
	}
}
extend(Component$1.prototype = new __WEBPACK_IMPORTED_MODULE_1_preact__["Component"](), {
	constructor: Component$1,

	isReactComponent: {},

	replaceState: function replaceState(state, callback) {
		var this$1 = this;

		this.setState(state, callback);
		for (var i in this$1.state) {
			if (!(i in state)) {
				delete this$1.state[i];
			}
		}
	},

	getDOMNode: function getDOMNode() {
		return this.base;
	},

	isMounted: function isMounted() {
		return !!this.base;
	}
});

function PureComponent(props, context) {
	Component$1.call(this, props, context);
}
F.prototype = Component$1.prototype;
PureComponent.prototype = new F();
PureComponent.prototype.isPureReactComponent = true;
PureComponent.prototype.shouldComponentUpdate = function (props, state) {
	return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
};

var index = {
	version: version,
	DOM: DOM,
	PropTypes: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a,
	Children: Children,
	render: render$1,
	createClass: createClass,
	createFactory: createFactory,
	createElement: createElement,
	cloneElement: cloneElement$1,
	isValidElement: isValidElement,
	findDOMNode: findDOMNode,
	unmountComponentAtNode: unmountComponentAtNode,
	Component: Component$1,
	PureComponent: PureComponent,
	unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer,
	__spread: extend
};

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=preact-compat.es.js.map

/***/ }),

/***/ "DpDT":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "EBst":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "EmRd":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "FEkH":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "FKtm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function valueEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ __webpack_exports__["default"] = (valueEqual);

/***/ }),

/***/ "FWi5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "FpCL":
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "Izpu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var hasBasename = exports.hasBasename = function hasBasename(path, prefix) {
  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
};

var stripBasename = exports.stripBasename = function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
};

var stripTrailingSlash = exports.stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;

  var path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return path;
};

/***/ }),

/***/ "JBOx":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"SavedGamesOpen":"SavedGamesOpen__2FH8V"};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("EBst");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ./node_modules/milligram/dist/milligram.css
var milligram = __webpack_require__("Kfb6");
var milligram_default = /*#__PURE__*/__webpack_require__.n(milligram);

// EXTERNAL MODULE: ./style.css
var style = __webpack_require__("FWi5");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./node_modules/preact-router/dist/preact-router.es.js


var EMPTY$1 = {};

function preact_router_es_assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var preact_router_es_Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					preact_router_es_assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(preact_min["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(preact_min["Component"]);

var preact_router_es_Link = function Link(props) {
	return Object(preact_min["h"])('a', preact_router_es_assign({ onClick: handleLinkClick }, props));
};

var preact_router_es_Route = function Route(props) {
	return Object(preact_min["h"])(props.component, props);
};

preact_router_es_Router.subscribers = subscribers;
preact_router_es_Router.getCurrentUrl = getCurrentUrl;
preact_router_es_Router.route = route;
preact_router_es_Router.Router = preact_router_es_Router;
preact_router_es_Router.Route = preact_router_es_Route;
preact_router_es_Router.Link = preact_router_es_Link;

/* harmony default export */ var preact_router_es = (preact_router_es_Router);
//# sourceMappingURL=preact-router.es.js.map
// EXTERNAL MODULE: ./node_modules/history/createHashHistory.js
var createHashHistory = __webpack_require__("kjbi");
var createHashHistory_default = /*#__PURE__*/__webpack_require__.n(createHashHistory);

// EXTERNAL MODULE: ./containers/Game/Game.css
var Game_Game = __webpack_require__("EmRd");
var Game_default = /*#__PURE__*/__webpack_require__.n(Game_Game);

// EXTERNAL MODULE: ./containers/AtcView/AtcView.css
var AtcView_AtcView = __webpack_require__("wdpN");
var AtcView_default = /*#__PURE__*/__webpack_require__.n(AtcView_AtcView);

// EXTERNAL MODULE: external "events"
var external__events_ = __webpack_require__("FpCL");
var external__events__default = /*#__PURE__*/__webpack_require__.n(external__events_);

// CONCATENATED MODULE: ./lib/airplane-library.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var routeTypes = {
  INBOUND: 0,
  OUTBOUND: 1,
  ENROUTE: 2,
  0: 'inbound',
  1: 'outbound',
  2: 'enroute'
};

var airplane_library_airplanes = [{
  id: 0,
  ceiling: 37,
  name: 'Boeing 737',
  shortName: 'B737',
  topSpeed: 320,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 160,
  turningRate: [5, 3, 2],
  operators: [0, 1, 5, 3, 2, 7, 10, 11, 12, 13, 14, 22, 23]
}, {
  id: 1,
  name: 'Boeing 747',
  shortName: 'B747',
  topSpeed: 330,
  landingSpeed: 145,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 180,
  turningRate: [5, 3, 2],
  ceiling: 41,
  operators: [0, 1, 2, 3, 6, 8, 14, 17, 18, 19, 20, 21, 22]
}, {
  id: 2,
  name: 'Boeing 757',
  shortName: 'B757',
  topSpeed: 330,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  minSpeed: 160,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  turningRate: [5, 3, 2],
  ceiling: 42,
  operators: [0, 1, 5, 3, 2, 7, 16, 17]
}, {
  id: 3,
  name: 'Boeing 767',
  shortName: 'B767',
  topSpeed: 330,
  landingSpeed: 140,
  minSpeed: 160,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  turningRate: [5, 3, 2],
  ceiling: 43,
  operators: [1, 3, 5, 6, 7, 12, 16]
}, {
  id: 4,
  name: 'Boeing 777',
  shortName: 'B777',
  topSpeed: 330,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 160,
  turningRate: [5, 3, 2],
  ceiling: 43,
  operators: [0, 1, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 19, 20, 23]
}, {
  id: 5,
  name: 'Airbus A380',
  shortName: 'A380',
  topSpeed: 330,
  landingSpeed: 150,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 160,
  turningRate: [5, 3, 2],
  ceiling: 43,
  operators: [6, 9, 10, 15, 20]
}, {
  id: 6,
  name: 'Airbus A330',
  shortName: 'A330',
  ceiling: 39,
  topSpeed: 320,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 160,
  turningRate: [5, 3, 2],
  operators: [0, 1, 3, 5, 8, 9, 11, 14, 18, 19, 20, 22, 23]
}, {
  id: 7,
  ceiling: 39,
  name: 'Boeing 787 Dreamliner',
  shortName: 'B787',
  topSpeed: 320,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 160,
  turningRate: [5, 3, 2],
  operators: [0, 3, 5, 6, 10, 11, 12, 19, 22, 23]
}, {
  id: 8,
  ceiling: 37,
  name: 'Airbus A319',
  shortName: 'A319',
  topSpeed: 320,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 160,
  turningRate: [5, 3, 2],
  operators: [1, 5, 6, 8, 10, 11, 14, 19, 22]
}, {
  id: 9,
  ceiling: 37,
  name: 'Airbus A320',
  shortName: 'A320',
  topSpeed: 320,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 160,
  turningRate: [5, 3, 2],
  operators: [1, 5, 3, 2, 6, 8, 9, 10, 11, 12, 14, 19, 20, 22, 23]
}, {
  id: 10,
  ceiling: 37,
  name: 'Airbus A321',
  shortName: 'A321',
  topSpeed: 320,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 160,
  turningRate: [5, 3, 2],
  operators: [1, 5, 3, 2, 6, 8, 9, 10, 11, 12, 14, 19, 20, 23]
}, {
  id: 11,
  ceiling: 41,
  name: 'Airbus A350',
  shortName: 'A350',
  topSpeed: 320,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 160,
  turningRate: [5, 3, 2],
  operators: [1, 8, 10, 14, 18, 19, 22]
}, {
  id: 12,
  ceiling: 35,
  name: 'Boeing 717',
  shortName: 'B717',
  topSpeed: 300,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 150,
  turningRate: [5, 3, 2],
  operators: [1]
}, {
  id: 13,
  ceiling: 35,
  name: 'McDonell Douglas MD-88',
  shortName: 'MD-88',
  topSpeed: 300,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 150,
  turningRate: [5, 3, 2],
  operators: [1]
}, {
  id: 14,
  ceiling: 35,
  name: 'McDonell Douglas MD-90',
  shortName: 'MD-90',
  topSpeed: 300,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 150,
  turningRate: [5, 3, 2],
  operators: [1]
}, {
  id: 15,
  ceiling: 38,
  name: 'Embraer 190',
  shortName: 'E190',
  topSpeed: 310,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 150,
  turningRate: [5, 3, 2],
  operators: [2, 5, 10]
}, {
  id: 16,
  ceiling: 35,
  name: 'McDonell Douglas MD-82',
  shortName: 'MD-82',
  topSpeed: 300,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 150,
  turningRate: [5, 3, 2],
  operators: [5]
}, {
  id: 17,
  ceiling: 35,
  name: 'McDonell Douglas MD-83',
  shortName: 'MD-83',
  topSpeed: 300,
  landingSpeed: 140,
  climbSpeed: 1,
  descendSpeed: 1,
  accelerationSpeed: 1,
  deAccelerationSpeed: 1,
  minSpeed: 150,
  turningRate: [5, 3, 2],
  operators: [5]
}];

var operators = [{
  id: 0,
  name: 'KLM',
  shortName: 'KLM',
  callsign: 'KLM',
  color: '#00a1e4'
}, {
  id: 1,
  name: 'Delta Airlines',
  callsign: 'DLT',
  shortName: 'Delta',
  color: '#003a70'
}, {
  id: 2,
  name: 'JetBlue',
  callsign: 'JBU',
  shortName: 'JetBlue',
  color: '#003876'
}, {
  id: 3,
  name: 'United Airlines',
  callsign: 'UAL',
  shortName: 'United',
  color: '#005DAA'
}, {
  id: 4,
  name: 'Southwest Airlines',
  callsign: 'SWA',
  shortName: 'Southwest',
  color: '#304cb2'
}, {
  id: 5,
  name: 'American Airlines',
  callsign: 'AAL',
  shortName: 'American',
  color: '#d41525'
}, {
  id: 6,
  name: 'British Airways',
  callsign: 'BAW',
  shortName: 'Speedbird',
  color: '#2a5c9a'
}, {
  id: 7,
  name: 'Continental Airlines',
  callsign: 'COA',
  shortName: 'Continental',
  color: '#0060aa'
}, {
  id: 8,
  name: 'Lufthansa',
  callsign: 'DLH',
  shortName: 'Lufthansa',
  color: '#00225e'
}, {
  id: 9,
  name: 'Air France',
  callsign: 'AFR',
  shortName: 'Air France',
  color: '#002157'
}, {
  id: 10,
  name: 'China Southern Airlines',
  callsign: 'CSN',
  shortName: 'China Southern',
  color: '#008dd2'
}, {
  id: 11,
  name: 'China Eastern Airlines',
  callsign: 'CES',
  shortName: 'China Eastern',
  color: '#e31614'
}, {
  id: 12,
  name: 'All Nippon Airways',
  callsign: 'ANA',
  shortName: 'All Nippon',
  color: '#083191'
}, {
  id: 13,
  name: 'Ryanair',
  callsign: 'RYR',
  shortName: 'Ryanair',
  color: '#0027b5'
}, {
  id: 14,
  name: 'Turkish Airlines',
  callsign: 'THY',
  shortName: 'Turkish',
  color: '#ee2e24'
}, {
  id: 15,
  name: 'Emirates',
  callsign: 'UAE',
  shortName: 'Emirates',
  color: '#d8131b'
}, {
  id: 16,
  name: 'FedEx Express',
  callsign: 'FDX',
  shortName: 'Fedex',
  color: '#2a007c'
}, {
  id: 17,
  name: 'UPS Airlines',
  callsign: 'UPS',
  shortName: 'UPS',
  color: '#fab903'
}, {
  id: 18,
  name: 'Cathay Pacific',
  callsign: 'CPA',
  shortName: 'Cathay',
  color: '#006b6e'
}, {
  id: 19,
  name: 'Qatar Airways',
  callsign: 'QTR',
  shortName: 'Qatari',
  color: '#5c0632'
}, {
  id: 20,
  name: 'Korean Air',
  callsign: 'KAL',
  shortName: 'Korean Air',
  color: '#154d9e'
}, {
  id: 21,
  name: 'Cargolux',
  callsign: 'CLX',
  shortName: 'Cargolux',
  color: '#d40000'
}, {
  id: 22,
  name: 'Air China',
  callsign: 'CCA',
  shortName: 'Air China',
  color: '#ee151f'
}, {
  id: 23,
  name: 'Egyptair',
  callsign: 'MSR',
  shortName: 'Egyptair',
  color: '#00265d'
}];

var airplanesById = _extends.apply(undefined, [{}].concat(airplane_library_airplanes.map(function (x) {
  var _ref;

  return _ref = {}, _ref[x.id] = x, _ref;
})));

var operatorsById = _extends.apply(undefined, [{}].concat(operators.map(function (x) {
  var _ref2;

  return _ref2 = {}, _ref2[x.id] = x, _ref2;
})));
// CONCATENATED MODULE: ./lib/airplane.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var counter = 0;
var flightNums = [];
for (var airplane_i = 0; airplane_i < 1900; airplane_i++) {
  flightNums[airplane_i] = airplane_i;
}flightNums.sort(function () {
  return Math.random() - .5;
});

var airplane_Airplane = function () {
  function Airplane(speed, altitude, heading, x, y, operatorId, flight, typeId, routeType) {
    var _this = this;

    _classCallCheck(this, Airplane);

    this.getTurningRate = function () {
      var model = airplanesById[_this.typeId];
      var turningRate = model.turningRate;

      if (_this.speed <= model.minSpeed) return turningRate[0];else if (_this.speed <= 250) return turningRate[0] + (_this.speed - model.minSpeed) / (250 - model.minSpeed) * (turningRate[1] - turningRate[0]);else return turningRate[1] + (_this.speed - 250) / (model.topSpeed - 250) * (turningRate[2] - turningRate[1]);
    };

    this.tgtAltitude = altitude;
    this.tgtDirection = heading;
    this.tgtSpeed = speed;
    this.operatorId = operatorId;
    this.speed = speed;
    this.altitude = altitude;
    this.heading = heading;
    this.x = x;
    this.y = y;
    this.flight = flight;
    this.path = [];
    this.typeId = typeId;
    this.routeType = routeType;
    this.textRotation = 0;
  }

  Airplane.create = function create(x, y, heading, routeType) {
    var airplane = airplane_library_airplanes[Math.floor(Math.random() * airplane_library_airplanes.length)];
    var operatorId = airplane.operators[Math.floor(Math.random() * airplane.operators.length)];
    var speed = airplane.topSpeed;
    var altitudeThousands = Math.floor(airplane.ceiling * .5 - Math.random() * airplane.ceiling * .2);
    var altitude = (altitudeThousands % 2 === 0 === heading < 180 ? altitudeThousands - 1 : altitudeThousands) * 1000;
    if (altitude < 10000) speed = Math.min(250, speed);
    var flight = flightNums[counter++];
    counter %= 1950;
    var typeId = airplane.id;
    return new Airplane(speed, altitude, heading, x, y, operatorId, flight, typeId, routeType);
  };

  Airplane.createOutbound = function createOutbound(x, y, heading, rwy, outboundWaypoint) {
    var airplane = Airplane.create(x, y, heading, routeTypes.OUTBOUND);
    airplane.altitude = 0;
    airplane.speed = 0;
    airplane.outboundRwy = rwy;
    airplane.outboundWaypoint = outboundWaypoint;
    return airplane;
  };

  return Airplane;
}();


// CONCATENATED MODULE: ./lib/config.js
/* harmony default export */ var config = ({
  headingInitVariation: 10,
  globalSpeed: 1,
  baseAirplaneSpeed: 0.0015,
  updateInterval: 300,
  headingIndicatorLineLen: 20,
  pathCounterUpdateEvery: 20,
  maxPathLen: 10,
  rwyLenScale: 0.0014,
  ilsSlopeSteepness: 37.5,
  threeMileRuleDistance: 15,
  climbSpeed: 18,
  descendSpeed: 22,
  accelerationSpeed: 1.6,
  deAccelerationSpeed: 1.2,
  flyStraightAfterTakeoffUntilHeight: 2000
});
// CONCATENATED MODULE: ./lib/map.js


var idType = {
  WAYPOINT: 0,
  AIRPORT: 1,
  RWY: 2
};

var loadMap = function loadMap(name) {
  Object.keys(maps[name].waypoints).map(function (k) {
    return maps[name].waypoints[k];
  }).forEach(function (w) {
    return w.type = idType.WAYPOINT;
  });
  maps[name].airport.type = idType.AIRPORT;
  maps[name].airport.runways.forEach(function (rwy) {
    return rwy.type = idType.RWY;
  });
  return maps[name];
};

var headingTo = function headingTo(x1, y1, x2, y2) {
  return (Math.atan2(x2 - x1, y2 - y1) * 180 / Math.PI + 360) % 360;
};

var angleDistance = function angleDistance(a0, a1) {
  var max = 360;
  var da = (a1 - a0) % max;
  return 2 * da % max - da;
};

var activeRwys = function activeRwys(airport, winddir) {
  var ru = airport.rwyusage;
  for (var i = 0; i < ru.length; i++) {
    if (winddir < ru[i].dir) {
      var _winddir = ru[(i + ru.length - 1) % ru.length];
      return _winddir.rwys;
    }
  }
  return ru[ru.length - 1].rwys;
};

var map_rwyPos = function rwyPos(airport, rwy, width, height) {
  var multiplier = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var ignoreLen = arguments[5];

  var len = rwy.length * config.rwyLenScale;
  var dx1 = Math.sin(rwy.hdg1 * Math.PI / 180) * (!ignoreLen ? -len : -1) * multiplier;
  var dy1 = Math.cos(rwy.hdg1 * Math.PI / 180) * (!ignoreLen ? -len : -1) * multiplier;
  var dx2 = Math.sin(rwy.hdg2 * Math.PI / 180) * (!ignoreLen ? -len : -1) * multiplier;
  var dy2 = Math.cos(rwy.hdg2 * Math.PI / 180) * (!ignoreLen ? -len : -1) * multiplier;

  var x1 = width / 2 + airport.x + rwy.x + dx1;
  var y1 = height / 2 + airport.y + rwy.y + dy1;
  var x2 = width / 2 + airport.x + rwy.x + dx2;
  var y2 = height / 2 + airport.y + rwy.y + dy2;
  return { x1: x1, y1: y1, x2: x2, y2: y2 };
};

var map_landableRwys = function landableRwys(airport, airplane, width, height) {
  var rwys = [];
  for (var i = 0; i < airport.runways.length; i++) {
    var rwy = airport.runways[i];
    var len = rwy.length * config.rwyLenScale;
    var dx1 = Math.sin(rwy.hdg1 * Math.PI / 180) * -len;
    var dy1 = Math.cos(rwy.hdg1 * Math.PI / 180) * -len;
    var dx2 = Math.sin(rwy.hdg2 * Math.PI / 180) * -len;
    var dy2 = Math.cos(rwy.hdg2 * Math.PI / 180) * -len;

    var x1 = width / 2 + airport.x + rwy.x + dx1;
    var y1 = height / 2 + airport.y + rwy.y + dy1;
    var x2 = width / 2 + airport.x + rwy.x + dx2;
    var y2 = height / 2 + airport.y + rwy.y + dy2;

    var deg1 = (Math.atan2(x1 - airplane.x, y1 - airplane.y) * 180 / Math.PI + 360) % 360;
    var deg2 = (Math.atan2(x2 - airplane.x, y2 - airplane.y) * 180 / Math.PI + 360) % 360;

    if (Math.abs(angleDistance(rwy.hdg1, deg1)) < 20) {
      rwys.push({ rwy: rwy, rev: false });
    } else if (Math.abs(angleDistance(rwy.hdg2, deg2)) < 20) {
      rwys.push({ rwy: rwy, rev: true });
    }
  }
  return rwys;
};

var maps = {
  default: {
    name: 'default',
    outboundWaypoints: ['LAIKA', 'PLM', 'DAVOT', 'EZOS', 'EDOS'],
    inboundWaypoints: ['EVKOS', 'ELROS', 'KTDOS', 'QEDOS'],
    waypoints: {
      EVKOS: { x: 0, y: 360 },
      QEDOS: { x: 1280, y: 400 },
      KTDOS: { x: 250, y: 0 },
      EKOS: { x: 20, y: 20 },
      EDOS: { x: 0, y: 720 },
      ELROS: { x: 1280, y: 720 },
      EBOS: { x: 100, y: 600 },
      ESOS: { x: 1200, y: 90 },
      ELOS: { x: 220, y: 200 },
      EZOS: { x: 1280, y: 0 },
      EDROS: { x: 290, y: 820 },
      KOS: { x: 80, y: 90 },
      PLM: { x: 1280, y: 70 },
      DAVOT: { x: 0, y: 90 },
      LAIKA: { x: 900, y: 0 },
      RUNAW: { x: 30, y: 20 },
      EH11: { x: 623.268587103299, y: 111.60881397780415 },
      EH13: { x: 666.731412896701, y: 608.3911860221958 },
      EH26: { x: 635.2208641964845, y: 248.22396629001187 },
      EH9: { x: 659.1254183828556, y: 521.4542709144273 }
    },
    routes: {
      // oubound
      '18->LAIKA': '18->EH26->LAIKA/${CRZ}',
      '36->LAIKA': '36->EH9->LAIKA/${CRZ}',
      '18->PLM': '36->EH9->PLM/${CRZ}',
      '36->PLM': '36->EH9->PLM/${CRZ}',
      '18->EZOS': '36->EH9->EZOS/${CRZ}',
      '36->EZOS': '36->EH9->EZOS/${CRZ}',
      '18->DAVOT': '36->EH9->DAVOT/${CRZ}',
      '36->DAVOT': '36->EH9->DAVOT/${CRZ}',
      '18->EDOS': '36->EH9->EDOS/${CRZ}',
      '36->EDOS': '36->EH9->EDOS/${CRZ}',
      // inbound
      'LAIKA->18': 'LAIKA->EH9/3000->18',
      'LAIKA->36': 'LAIKA->EH26/3000->36',
      'PLM->18': 'PLM->EH9/3000->18',
      'PLM->36': 'PLM->EH26/3000->36',
      'EZOS->18': 'EZOS->EH9/3000->18',
      'EZOS->36': 'EZOS->EH26/3000->36',
      'DAVOT->18': 'DAVOT->EH9/3000->18',
      'DAVOT->36': 'DAVOT->EH26/3000->36',
      // enroute
      'EVKOS->PLM': 'EVKOS->EHZM->PLM',
      'QEDOS->EDOS': 'QEDOS->EHZM->EDOS'
    },
    airport: {

      rwyusage: [{ dir: 95, rwys: ['18'] }, { dir: 275, rwys: ['36'] }],
      callsign: 'EHZM',
      x: 0,
      y: 0,
      runways: [{
        x: 5,
        y: 0,
        length: 12467,
        type: 'asphalt', // EXPERMINTAL / WIP
        size: 2, // EXPERMINTAL / WIP
        hdg1: 5,
        hdg2: 185,
        name1: '36',
        name2: '18'
      }]
    }
  },
  heathrow: {
    name: 'Heathrow',
    outboundWaypoints: ['FOS', 'BIG', 'LAM'],
    inboundWaypoints: ['BLC', 'BENSU', 'EPM', 'LCY'],
    waypoints: {
      BLC: { x: 40, y: 0 },
      WOD: { x: 0, y: 400 },
      BENSU: { x: 0, y: 600 },
      BUR: { x: 100, y: 500 },
      FRK: { x: 550, y: 20 },
      FOS: { x: 580, y: 0 },
      OCK: { x: 640, y: 0 },
      EPM: { x: 730, y: 0 },
      BIG: { x: 1280, y: 0 },
      LCY: { x: 1280, y: 360 },
      LAM: { x: 1280, y: 720 },
      GOXUL: { x: 900, y: 90 },
      FINCH: { x: 880, y: 800 },
      CHT: { x: 600, y: 1050 },
      D175F: { x: 680, y: 220 },
      EGWU: { x: 690, y: 960 },
      RICHY: { x: 939.9543085469174, y: 344.7642780688151 },
      BARNS: { x: 939.9543085469174, y: 364.7642780688151 },
      WINSR: { x: 340.0456914530826, y: 355.235721931185 },
      MARLO: { x: 340.0456914530826, y: 375.235721931185 },
      '40LO2': { x: 490.0228457265413, y: 352.6178609655925 },
      '40LOC': { x: 490.0228457265413, y: 372.6178609655925 },
      '40LO3': { x: 789.9771542734587, y: 347.38213903440754 }

    },
    routes: {},
    airport: {
      rwyusage: [{ dir: 1, rwys: ['09R', '09L'] }, { dir: 181, rwys: ['27R', '27L'] }],
      callsign: 'EGLL',
      x: 0,
      y: 0,
      runways: [{
        x: 0,
        y: -10,
        length: 12802,
        type: 'asphalt', // EXPERMINTAL / WIP
        size: 2, // EXPERMINTAL / WIP
        hdg1: 91,
        hdg2: 271,
        name1: '09R',
        name2: '27L'
      }, {
        x: 0,
        y: 10,
        length: 12008,
        type: 'asphalt', // EXPERMINTAL / WIP
        size: 2, // EXPERMINTAL / WIP
        hdg1: 91,
        hdg2: 271,
        name1: '09L',
        name2: '27R'
      }]
    }
  },
  schiphol: {
    name: 'schiphol',
    outboundWaypoints: ['EH610', 'SPY', 'OMORU', 'TULIP'],
    inboundWaypoints: ['EH040', 'LILSI', 'IVLET', 'SUSET'],
    waypoints: {
      NV: { x: 670, y: 0 },
      CH: { x: 400, y: 100 },
      EKROS: { x: 500, y: 150 },
      BASNO: { x: 410, y: 390 },
      EH040: { x: 300, y: 100 },
      EH610: { x: 0, y: 100 },
      SPY: { x: 400, y: 720 },
      OA: { x: 640, y: 550 },
      LILSI: { x: 1280, y: 600 },
      PAM: { x: 600, y: 360 },
      OMORU: { x: 1280, y: 360 },
      IVLET: { x: 1280, y: 200 },
      SUSET: { x: 1100, y: 0 },
      TULIP: { x: 0, y: 640 },
      EH639: { x: 794.794430213186, y: 387.85039343644166 },
      EH633: { x: 605.3459322519757, y: 80.38373026871932 },
      EH635: { x: 645.3459322519757, y: 73.38373026871932 },
      EH126: { x: 585.3459322519757, y: 100.38373026871932 },
      EH642: { x: 365.3837302687193, y: 365.3459322519757 },
      EH047: { x: 611.5139103734476, y: 599.6984976460062 },
      EH626: { x: 634.6540677480242, y: 639.6162697312807 },
      EH616: { x: 404.5465330762007, y: 201.62260601470263 },
      EH654: { x: 879.4534669237993, y: 498.37739398529743 }

    },
    routes: {},
    airport: {
      rwyusage: [{ dir: 45, rwys: ['09'] }, { dir: 135, rwys: ['36L', '36C'] }, { dir: 220, rwys: ['24', '27'] }, { dir: 330, rwys: ['18L', '36R'] }],
      callsign: 'EHAM',
      x: 0,
      y: 0,
      runways: [{
        x: -40,
        y: 20,
        length: 12468,
        type: 'asphalt', // EXPERMINTAL / WIP
        size: 2, // EXPERMINTAL / WIP
        hdg1: 3,
        hdg2: 183,
        name1: '36L',
        name2: '18R'
      }, {
        x: 2,
        y: -10,
        length: 11483,
        type: 'asphalt', // EXPERMINTAL / WIP
        size: 2, // EXPERMINTAL / WIP
        hdg1: 58,
        hdg2: 238,
        name1: '06',
        name2: '24'
      }, {
        x: 5,
        y: 20,
        length: 11329,
        type: 'asphalt', // EXPERMINTAL / WIP
        size: 2, // EXPERMINTAL / WIP
        hdg1: 87,
        hdg2: 267,
        name1: '09',
        name2: '27'
      }, {
        x: 20,
        y: -7,
        length: 11155,
        type: 'asphalt', // EXPERMINTAL / WIP
        size: 2, // EXPERMINTAL / WIP
        hdg1: 3,
        hdg2: 183,
        name1: '36R',
        name2: '18L'
      }, {
        x: -20,
        y: 0,
        length: 10827,
        type: 'asphalt', // EXPERMINTAL / WIP
        size: 2, // EXPERMINTAL / WIP
        hdg1: 3,
        hdg2: 183,
        name1: '36C',
        name2: '18C'
      }, {
        x: 35,
        y: -5,
        length: 10827,
        type: 'asphalt', // EXPERMINTAL / WIP
        size: 2, // EXPERMINTAL / WIP
        hdg1: 41,
        hdg2: 221,
        name1: '04',
        name2: '22'
      }]
    }
  }
};

var mapNames = [];
for (var map_key in maps) {
  if (maps.hasOwnProperty(map_key)) {
    mapNames.push(map_key);
  }
}
// CONCATENATED MODULE: ./lib/communications.js
function communications__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var communications_Communications = function (_EventEmitter) {
  _inherits(Communications, _EventEmitter);

  function Communications() {
    communications__classCallCheck(this, Communications);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.synth = typeof window !== 'undefined' ? window.speechSynthesis : { addEventListener: function addEventListener() {}, getVoices: function getVoices() {
        return [];
      } };
    _this.voice = _this.synth.getVoices()[0];
    _this.pitch = 1;
    _this.rate = 1.1;
    return _this;
  }

  Communications.prototype.getCallsign = function getCallsign(airplane, short) {
    return [operatorsById[airplane.operatorId][short ? 'callsign' : 'shortName'] + (short ? '' : ' ') + airplane.flight];
  };

  Communications.prototype.getCommandText = function getCommandText(cmd, winddir, windspd) {
    var airplane = cmd.tgt;
    var txt = [];
    if (cmd.takeoff && cmd.tgt.outboundRwy) {
      txt.push("takeoff runway " + cmd.tgt.outboundRwy + ", the wind is " + winddir + " at " + windspd + " knots");
    }
    if (cmd.direction) {
      if (cmd.direction !== cmd.tgt.tgtDirection) txt.push("direct to " + cmd.direction);
    } else if (typeof cmd.heading === 'number' && cmd.heading !== cmd.tgt.tgtDirection) {
      var tHdg = cmd.heading;
      var hdg = airplane.heading;

      txt.push(tHdg - hdg < -(hdg - tHdg) ? "turn left heading " + tHdg : "turn right heading " + tHdg);
    }
    if (cmd.altitude && cmd.altitude !== cmd.tgt.tgtAltitude) {
      var tAlt = cmd.altitude > 18000 ? "flight level " + Math.round(cmd.altitude / 100) + " " : cmd.altitude + " feet ";
      txt.push(cmd.altitude < airplane.altitude ? "descend and maintain " + tAlt : "climb and maintain " + tAlt);
    }
    if (cmd.speed && cmd.speed !== cmd.tgt.tgtSpeed) {
      txt.push(cmd.speed < airplane.speed ? "slow down to " + cmd.speed + " knots" : "increase your airspeed to " + cmd.speed + " knots");
    }

    if (txt.length > 2) txt.splice(txt.length - 1, 0, 'and');
    txt = txt.join(' ').trim();
    return txt;
  };

  Communications.prototype.speak = function speak(txt) {
    var utterThis = new SpeechSynthesisUtterance(txt);
    utterThis.voice = this.voice;
    utterThis.pitch = this.pitch;
    utterThis.rate = this.rate;
    utterThis.onerror = console.warn;
    this.synth.speak(utterThis);
  };

  return Communications;
}(external__events_["EventEmitter"]);

var natoAlphabet = {
  "A": "Alfa",
  "B": "Bravo",
  "C": "Charlie",
  "D": "Delta",
  "E": "Echo",
  "F": "Foxtrot",
  "G": "Golf",
  "H": "Hotel",
  "I": "India",
  "J": "Juliett",
  "K": "Kilo",
  "L": "Lima",
  "M": "Mike",
  "N": "November",
  "O": "Oscar",
  "P": "Papa",
  "Q": "Quebec",
  "R": "Romeo",
  "S": "Sierra",
  "T": "Tango",
  "U": "Uniform",
  "V": "Victor",
  "W": "Whiskey",
  "X": "X-ray",
  "Y": "Yankee",
  "Z": "Zulu"
};

/* harmony default export */ var communications = (new communications_Communications());
// CONCATENATED MODULE: ./stores/SettingsStore.js
function SettingsStore__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SettingsStore__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function SettingsStore__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var SettingsStore_SettingsStore = function (_EventEmitter) {
  SettingsStore__inherits(SettingsStore, _EventEmitter);

  function SettingsStore() {
    SettingsStore__classCallCheck(this, SettingsStore);

    var _this = SettingsStore__possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.toJson = function () {
      return JSON.stringify(_this, ['speechsynthesis', 'speechrecognition', 'rate', 'voice', 'pitch', 'speed', 'distanceCircles', 'distanceCirclesDistance', 'distanceCirclesAmount', 'distanceCircleColor', 'ilsPathLength', 'ilsPathColor', 'ilsDashInterval', 'sepVialationCircleColor', 'newPlaneInterval', 'startingInboundPlanes', 'startingOutboundPlanes', 'changePitch', 'changeRate', 'changeVoice', 'handleVoicesChange'], 4);
    };

    _this.speechsynthesis = false;
    _this.speechrecognition = false;
    _this.voices = communications.synth.getVoices();
    _this.rate = communications.rate;
    _this.voice = communications.voice;
    _this.pitch = communications.pitch;
    _this.speed = 1;
    _this.distanceCircles = true;
    _this.distanceCirclesDistance = 200;
    _this.distanceCirclesAmount = 5;
    _this.distanceCircleColor = '#8aa8ad';
    _this.ilsPathLength = 250;
    _this.ilsPathColor = '#8aa8ad';
    _this.ilsDashInterval = [20, 30];
    _this.sepVialationCircleColor = '#ff0000';
    _this.newPlaneInterval = 100;
    _this.startingInboundPlanes = 3;
    _this.startingOutboundPlanes = 2;

    _this.changePitch = _this.changePitch.bind(_this);
    _this.changeRate = _this.changeRate.bind(_this);
    _this.changeVoice = _this.changeVoice.bind(_this);
    _this.handleVoicesChange = _this.handleVoicesChange.bind(_this);
    communications.synth.addEventListener('voiceschanged', _this.handleVoicesChange);
    return _this;
  }

  SettingsStore.prototype.handleVoicesChange = function handleVoicesChange() {
    this.voices = communications.synth.getVoices();
    if (communications.voice === undefined) {
      this.voice = this.voices[0];
      communications.voice = this.voice;
    }
  };

  SettingsStore.prototype.changePitch = function changePitch(pitch) {
    communications.pitch = pitch;
    this.pitch = pitch;
    this.emit('change');
  };

  SettingsStore.prototype.changeRate = function changeRate(rate) {
    communications.rate = rate;
    this.rate = rate;
    this.emit('change');
  };

  SettingsStore.prototype.changeVoice = function changeVoice(voice) {
    communications.voice = voice;
    this.voice = voice;
    this.emit('change');
  };

  SettingsStore.prototype.setSpeed = function setSpeed(speed) {
    this.speed = speed;
    this.emit('change');
  };

  return SettingsStore;
}(external__events_["EventEmitter"]);

/* harmony default export */ var stores_SettingsStore = (new SettingsStore_SettingsStore());
// CONCATENATED MODULE: ./lib/persistance.js

var loadState = function loadState() {
  var val = typeof window !== 'undefined' ? localStorage.getItem('atc-manager-2-game-persistance') : null;
  if (val) {
    return JSON.parse(val);
  }
  return {
    games: {}
  };
};

var saveState = function saveState(state) {
  var str = JSON.stringify(state, function (key, val) {
    return val !== null && val !== undefined && val.toFixed ? +val.toFixed(3) : val;
  });
  localStorage.setItem('atc-manager-2-game-persistance', str);
};
// CONCATENATED MODULE: ./stores/GameStore.js
var GameStore__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function GameStore__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GameStore__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function GameStore__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var GameStore_GameStore = function (_EventEmitter) {
  GameStore__inherits(GameStore, _EventEmitter);

  function GameStore() {
    GameStore__classCallCheck(this, GameStore);

    var _this = GameStore__possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.traffic = [];
    _this.paused = false;
    _this.started = false;
    _this.interval = null;
    _this.width = 1280;
    _this.height = 720;
    _this.log = [];
    _this.selfLog = [];
    _this.pathCounter = 0;
    _this.waypoints = {};
    _this.airport = {};
    _this.callsigns = {};
    _this.callsignsPos = {};
    _this._remove = [];
    _this._spawnPlaneCounter = 0;
    _this.mapName = null;

    _this.update = _this.update.bind(_this); // called within a setInterval so bind to this object and not the window object.
    _this._newPlane = _this._newPlane.bind(_this); // called within a setInterval so bind to this object and not the window object.
    return _this;
  }

  GameStore.prototype.getAtis = function getAtis() {
    return natoAlphabet[String.fromCharCode(this.atis % 26 + 97).toUpperCase()];
  };

  GameStore.prototype.startMap = function startMap(mapName) {
    this.arrivals = 0;
    this.departures = 0;
    this.enroutes = 0;
    this.unpermittedDepartures = 0;
    this.distanceVialations = 0;
    var map = this.map = loadMap(mapName);
    this.winddir = Math.floor(Math.random() * 360);
    this.altimeter = (29 + Math.random() * 2).toFixed(2);
    this.atis = Math.floor(Math.random() * 26);

    this.windspd = Math.floor(Math.random() * 12);
    this._setup(map);
    // create planes
    for (var i = 0; i < stores_SettingsStore.startingInboundPlanes; i++) {
      this._newPlaneInboundOnRoute();
    }
    for (var _i = 0; _i < stores_SettingsStore.startingOutboundPlanes; _i++) {
      this._newPlaneOutbound();
    }
  };

  GameStore.prototype.startSaved = function startSaved(saveName) {
    var state = loadState();
    var game = state.games[saveName];
    this.loadJson(game);
    var map = this.map = loadMap(this.mapName);
    this._setup(map);
  };

  GameStore.prototype._setup = function _setup(map) {
    var _ref,
        _this2 = this,
        _ref4;

    this.waypoints = map.waypoints;
    this.airport = map.airport;
    this._edgeDetection = {};
    this.sepDistanceVialotions = {};
    this.started = true;
    this.callsigns = {};
    this.callsignsPos = {};
    this.mapName = map.name;

    this._setupWaypoints(map);

    // set callsigns
    GameStore__extends.apply(undefined, [this.callsigns, this.waypoints, (_ref = {}, _ref[map.airport.callsign] = map.airport, _ref)].concat(map.airport.runways.map(function (rwy) {
      var _ref2;

      return _ref2 = {}, _ref2[rwy.name1] = rwy, _ref2[rwy.name2] = rwy, _ref2;
    })));

    // set callsign positions
    var airportX = this.width / 2 + map.airport.x;
    var airportY = this.height / 2 + map.airport.y;
    GameStore__extends.apply(undefined, [this.callsignsPos].concat(Object.keys(this.waypoints).map(function (k) {
      var _ref3;

      var ref = _this2.waypoints[k];
      return _ref3 = {}, _ref3[k] = { ref: ref, x: ref.x, y: ref.y }, _ref3;
    }), [(_ref4 = {}, _ref4[map.airport.callsign] = { ref: map.airport, x: airportX, y: airportY }, _ref4)], map.airport.runways.map(function (ref) {
      var _ref5;

      var pos = map_rwyPos(map.airport, ref, _this2.width, _this2.height);
      return _ref5 = {}, _ref5[ref.name1] = { ref: ref, x: pos.x1, y: pos.y1 }, _ref5[ref.name2] = { ref: ref, x: pos.x2, y: pos.y2 }, _ref5;
    })));

    if (this.interval) throw 'Already set interval';
    this.interval = setInterval(this.update, config.updateInterval);
    this.emit('change');
    this.emit('start');
  };

  GameStore.prototype._setupWaypoints = function _setupWaypoints() {
    var map = this.map;
    this.inboundWpOrdered = map.inboundWaypoints.slice(0).sort(function () {
      return Math.random() - .5;
    });
    this.outboundWpOrdered = map.outboundWaypoints.slice(0).sort(function () {
      return Math.random() - .5;
    });
    this.enrouteRoutesOrdered = [];
    for (var i = 0; i < map.inboundWaypoints.length; i++) {
      for (var j = 0; j < map.outboundWaypoints.length; j++) {
        var inboundWp = map.inboundWaypoints[i];
        var outboundWp = map.outboundWaypoints[i];
        var route = map.routes[inboundWp + '->' + outboundWp];
        if (route) {
          this.enrouteRoutesOrdered.push(route);
        }
      }
    }
    this.enrouteRoutesOrdered.sort(function () {
      return Math.random() - .5;
    });
  };

  GameStore.prototype._newPlane = function _newPlane() {
    if (this.paused) return;
    if (Math.random() > .5) this._newPlaneInboundOnRoute();else this._newPlaneOutbound();
  };

  GameStore.prototype._newPlaneInboundOnRoute = function _newPlaneInboundOnRoute() {
    var map = this.map;
    if (this.inboundWpOrdered.length === 0) {
      this.inboundWpOrdered = map.inboundWaypoints.slice(0).sort(function () {
        return Math.random() - .5;
      });
    }
    var inboundWaypoint = this.inboundWpOrdered.pop();
    var pos = this.callsignsPos[inboundWaypoint];
    var mx = this.width / 2;
    var my = this.height / 2;
    var heading = Math.floor(headingTo(pos.x, pos.y, mx, my)) % 360;
    var airplane = airplane_Airplane.create(pos.x, pos.y, heading, routeTypes.INBOUND);
    this.traffic.push(airplane);

    var callsign = operatorsById[airplane.operatorId].shortName + ' ' + airplane.flight;
    if (Math.random() > .5) {
      // has atis
      var msg = this.airport.callsign + ' approach, ' + callsign + ' at ' + Math.floor(airplane.altitude / 100) + ' with ' + this.getAtis() + '.';
      this.addLog(msg, callsign);

      var atcMsg = callsign + ', ' + this.airport.callsign + ' approach, maintain current heading.';
      this.addLog(atcMsg, 'ATC');
    } else {
      // does not have atis
      var _msg = this.airport.callsign + ' approach, ' + callsign + ' at ' + Math.floor(airplane.altitude / 100) + '.';
      this.addLog(_msg, callsign);

      var _atcMsg = callsign + ', information ' + this.getAtis() + ' is current, altimeter ' + this.altimeter + ', maintain current heading.';
      this.addLog(_atcMsg, 'ATC');
    }
  };

  // deprecated


  GameStore.prototype._newPlaneInboundOnEdge = function _newPlaneInboundOnEdge() {
    var hdgVar = config.headingInitVariation;
    var side = Math.floor(Math.random() * 4);
    var x = side === 1 ? this.width : side === 3 ? 0 : Math.random() * this.width;
    var y = side === 0 ? this.height : side === 2 ? 0 : Math.random() * this.height;
    var mx = this.width / 2;
    var my = this.height / 2;
    var heading = Math.floor(headingTo(x, y, mx, my) - hdgVar * .5 + Math.random() * hdgVar) % 360;
    this.traffic.push(airplane_Airplane.create(x, y, heading, routeTypes.INBOUND));
  };

  GameStore.prototype._newPlaneOutbound = function _newPlaneOutbound() {
    var activeRunways = activeRwys(this.airport, this.winddir);
    var item = activeRunways[Math.floor(Math.random() * activeRunways.length)];
    var rwy = this.callsignsPos[item];
    var hdg = rwy.ref.name1 === item ? rwy.ref.hdg1 : rwy.ref.hdg2;
    var outboundWaypoint = this.map.outboundWaypoints[Math.floor(Math.random() * this.map.outboundWaypoints.length)];
    var airplane = airplane_Airplane.createOutbound(rwy.x, rwy.y, hdg, item, outboundWaypoint);
    this.traffic.push(airplane);

    var callsign = operatorsById[airplane.operatorId].shortName + ' ' + airplane.flight;
    // has atis
    var msg = this.airport.callsign + ' approach, with you for ' + item + '.';
    this.addLog(msg, callsign);

    var atcMsg = callsign + ', ' + this.airport.callsign + ' approach, hold short ' + item + '.';
    this.addLog(atcMsg, 'ATC');

    var readBackMsg = 'Roger hold short of ' + item + ', ' + callsign + '.';
    this.addLog(readBackMsg, callsign);
  };

  GameStore.prototype.update = function update() {
    if (this.paused) return;

    this._spawnPlaneCounter += config.updateInterval * stores_SettingsStore.speed;
    if (this._spawnPlaneCounter > stores_SettingsStore.newPlaneInterval * 1000) {
      this._spawnPlaneCounter %= stores_SettingsStore.newPlaneInterval;
      this._newPlane();
    }

    var sepDistViolation = false;
    var s = config.globalSpeed * stores_SettingsStore.speed;
    this.pathCounter = ++this.pathCounter % Math.floor(config.pathCounterUpdateEvery / s);
    var addPathEntry = this.pathCounter === 0;
    for (var key in this.sepDistanceVialotions) {
      delete this.sepDistanceVialotions[key];
    }
    // move planes
    for (var i = 0; i < this.traffic.length; i++) {
      var airplane = this.traffic[i];
      if (airplane.outboundRwy) continue;
      var dx = Math.sin(airplane.heading * Math.PI / 180);
      var dy = Math.cos(airplane.heading * Math.PI / 180);
      airplane.x += dx * s * airplane.speed * config.baseAirplaneSpeed;
      airplane.y += dy * s * airplane.speed * config.baseAirplaneSpeed;
      var model = airplanesById[airplane.typeId];
      var altChange = Math.min(config.climbSpeed * model.climbSpeed * s, Math.max(-config.descendSpeed * model.descendSpeed * s, airplane.tgtAltitude - airplane.altitude));

      var exceeds250Multiplier = (airplane.speed - 250) * 0.1 + 5;
      if (airplane.altitude >= 10000 && airplane.tgtSpeed > 250 && airplane.tgtAltitude < 10000 && altChange * exceeds250Multiplier / model.deAccelerationSpeed / config.deAccelerationSpeed + airplane.altitude < 10000) {
        airplane.tgtSpeed = 250;
      }

      var tgtSpeed = airplane.altitude < 10000 && airplane.tgtSpeed > 250 ? Math.min(250, airplane.tgtSpeed) : airplane.tgtSpeed;
      tgtSpeed = tgtSpeed || airplane.speed; // bug: tgtSpeed rarely becomes nan for undefined reasons
      airplane.speed += Math.min(s * config.accelerationSpeed * model.accelerationSpeed, Math.max(-s * config.deAccelerationSpeed * model.deAccelerationSpeed, tgtSpeed - airplane.speed));

      var tgtHeading = void 0;
      if (typeof airplane.tgtDirection === 'number') {
        tgtHeading = airplane.tgtDirection;
      } else if (typeof airplane.tgtDirection === 'string') {
        var cs = this.callsignsPos[airplane.tgtDirection];
        if (cs) {
          if (airplane.routeType === routeTypes.INBOUND && cs.ref.type === idType.RWY) {
            var rwyHdg = cs.ref.name1 === airplane.tgtDirection ? cs.ref.hdg1 : cs.ref.hdg2;
            var hdgToRwy = Math.atan2(cs.x - airplane.x, cs.y - airplane.y) * 180 / Math.PI;
            var deg = angleDistance(rwyHdg, hdgToRwy);
            var distance = (cs.x - airplane.x) / Math.sin(hdgToRwy * Math.PI / 180);
            var rwyAirplaneHdgDiff = angleDistance(airplane.heading, rwyHdg);
            var tooHigh = airplane.altitude > distance * config.ilsSlopeSteepness * 2 + 500 /* safety */;
            distance = isFinite(distance) ? distance : .1;
            if (airplane.altitude < 3200 && Math.abs(deg) < 20 && Math.abs(rwyAirplaneHdgDiff) < 20 && !tooHigh) {
              altChange = Math.min(100 * s, Math.max(-100 * s, Math.min(airplane.altitude, distance * config.ilsSlopeSteepness) - airplane.altitude));
            }
            if (airplane.altitude < 3200 && Math.abs(deg) < 20) {
              tgtHeading = rwyHdg + Math.min(45, Math.max(-45, Math.max(Math.abs(deg), 10 /* weight */) * deg));
            } else if (airplane.altitude < 500 && Math.abs(rwyAirplaneHdgDiff) < 20) {
              //landed
              console.log(airplane, 'succesfully landed');
              this.arrivals++;
              this._remove.push(airplane);
              continue;
            } else {
              tgtHeading = airplane.heading;
            }
          } else tgtHeading = headingTo(airplane.x, airplane.y, this.callsignsPos[airplane.tgtDirection].x, this.callsignsPos[airplane.tgtDirection].y);
        } else {
          tgtHeading = airplane.heading;
        }
      }
      if (airplane.routeType !== routeTypes.INBOUND) {
        var wp = this.callsignsPos[airplane.outboundWaypoint];
        if (Math.abs(airplane.x - wp.x) + Math.abs(airplane.y - wp.y) < 15) {
          // enroute
          this.departures++;
          this._remove.push(airplane);
          continue;
        }
      }
      if (airplane.x < -3 || airplane.y < -3 || airplane.x > this.width + 3 || airplane.y > this.height + 3) {
        this.unpermittedDepartures++;
        this._remove.push(airplane);
        continue;
      }
      var isAtManeuveringSpeed = airplane.speed >= airplanesById[airplane.typeId].landingSpeed - 0.01;
      var canChangeHeading = airplane.routeType !== routeTypes.OUTBOUND || airplane.altitude >= config.flyStraightAfterTakeoffUntilHeight - 10; /* manouvering height */

      if (isAtManeuveringSpeed) {
        if (airplane.altitude >= 10000 && airplane.speed > 250 && airplane.altitude + altChange < 10000) {
          altChange = 10000 - airplane.altitude;
        }
        airplane.altitude += altChange;
      }

      if (isAtManeuveringSpeed && canChangeHeading) {
        airplane.heading += Math.min(1 * s, Math.max(-1 * s, angleDistance(airplane.heading, tgtHeading)));
        airplane.heading = (airplane.heading + 360) % 360;
      }

      if (addPathEntry) {
        airplane.path.unshift([airplane.x, airplane.y]);
        if (airplane.path.length >= config.maxPathLen) airplane.path.pop();
      }
      // edge detection
      var t = config.threeMileRuleDistance,
          x = Math.round(airplane.x / t),
          y = Math.round(airplane.y / t);
      for (var a = 0; a < 2; a++) {
        for (var _i2 = 0; _i2 < 9; _i2++) {
          var identity = Math.round(x + _i2 % 3 - 1) + 'x' + Math.round(y + _i2 / 3 - 1) + '/' + (Math.floor(airplane.altitude * .0005) + a),
              sameIdentity = this._edgeDetection[identity];
          if (sameIdentity && !sameIdentity[airplane.flight]) {
            // do actual calculation
            for (var _key in sameIdentity) {
              var oa = sameIdentity[_key];
              if (Math.abs(oa.altitude - airplane.altitude) > 995) continue;
              var xd = Math.abs(airplane.x - oa.x) / t;
              var yd = Math.abs(airplane.y - oa.y) / t;
              if (xd * xd + yd * yd < 1) {
                this.sepDistanceVialotions[oa.flight] = airplane;
                this.sepDistanceVialotions[airplane.flight] = oa;
                sepDistViolation = true;
              }
            }
          }
          this._edgeDetection[identity] = sameIdentity || {};
          this._edgeDetection[identity][airplane.flight] = airplane;
        }
      }
    }
    for (var _key2 in this._edgeDetection) {
      delete this._edgeDetection[_key2];
    }
    if (this._remove.length > 0) {
      for (var _i3 = 0; _i3 < this._remove.length; _i3++) {
        this.traffic.splice(this.traffic.indexOf(this._remove[_i3]), 1);
      }this._remove.length = 0;
    }
    if (sepDistViolation) this.distanceVialations++;
    this.emit('change');
  };

  GameStore.prototype.stop = function stop() {
    clearInterval(this.interval);
    this.interval = null;
    this.traffic = [];
    this.started = false;
    this.emit('change');
  };

  GameStore.prototype.pause = function pause() {
    this.paused = true;
    this.emit('change');
  };

  GameStore.prototype.resume = function resume() {
    this.paused = false;
    this.emit('change');
  };

  GameStore.prototype.addLog = function addLog(msg, self) {
    this.log.push(self + ': ' + msg);
    if (self === 'ATC') this.selfLog.push(self + ': ' + msg);
    this.emit('change');
  };

  GameStore.prototype.toJson = function toJson() {
    var ret = {};
    for (var i = 0; i < persistanceProps.length; i++) {
      ret[persistanceProps[i]] = this[persistanceProps[i]];
    }
    return ret;
  };

  GameStore.prototype.loadJson = function loadJson(state) {
    for (var i = 0; i < persistanceProps.length; i++) {
      this[persistanceProps[i]] = state[persistanceProps[i]];
    }
  };

  GameStore.prototype.setSvgEl = function setSvgEl(el) {
    this.svgEl = el;
  };

  return GameStore;
}(external__events_["EventEmitter"]);

var persistanceProps = ['traffic', 'started', 'width', 'height', 'log', 'selfLog', 'pathCounter', 'mapName', 'arrivals', 'departures', 'enroutes', 'distanceVialations', 'mapName', 'winddir', 'windspd', 'unpermittedDepartures'];

/* harmony default export */ var stores_GameStore = (new GameStore_GameStore());
// EXTERNAL MODULE: ./components/Settings/Settings.css
var Settings_Settings = __webpack_require__("ybWk");
var Settings_default = /*#__PURE__*/__webpack_require__.n(Settings_Settings);

// CONCATENATED MODULE: ./components/Settings/Settings.js


function Settings__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Settings__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Settings__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var Settings__ref = Object(preact_min["h"])(
  'span',
  null,
  'Speech Synthesis'
);

var _ref2 = Object(preact_min["h"])('span', { 'class': 'slider' });

var _ref3 = Object(preact_min["h"])(
  'span',
  null,
  'Speech Synthesis Voices'
);

var Settings__ref4 = Object(preact_min["h"])(
  'span',
  null,
  'Pitch:'
);

var Settings__ref5 = Object(preact_min["h"])(
  'span',
  null,
  'Rate:'
);

var _ref6 = Object(preact_min["h"])(
  'span',
  null,
  'Game Speed'
);

var _ref7 = Object(preact_min["h"])(
  'span',
  null,
  'Difficulty:'
);

var _ref8 = Object(preact_min["h"])(
  'option',
  { value: 'easy' },
  'Easy'
);

var _ref9 = Object(preact_min["h"])(
  'option',
  { value: 'normal' },
  'Normal'
);

var _ref10 = Object(preact_min["h"])(
  'option',
  { value: 'hard' },
  'Hard'
);

var _ref11 = Object(preact_min["h"])(
  'span',
  null,
  'Distance Circle'
);

var _ref12 = Object(preact_min["h"])('span', { 'class': 'slider' });

var _ref13 = Object(preact_min["h"])(
  'span',
  null,
  'Distance Circle Color:'
);

var _ref14 = Object(preact_min["h"])(
  'span',
  null,
  'ILS Indicator Color:'
);

var _ref15 = Object(preact_min["h"])(
  'span',
  null,
  'Seperatorion Circle Color:'
);

var Settings_Settings_Settings = function (_Component) {
  Settings__inherits(Settings, _Component);

  function Settings(props) {
    Settings__classCallCheck(this, Settings);

    var _this = Settings__possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      difficulty: 'normal'
    };

    _this.handleSpeechRecognitionSettingChange = _this.handleSpeechRecognitionSettingChange.bind(_this);
    _this.handleSpeechSynthesisSettingChange = _this.handleSpeechSynthesisSettingChange.bind(_this);
    _this.handleVoicesChange = _this.handleVoicesChange.bind(_this);
    _this.handlePitchChange = _this.handlePitchChange.bind(_this);
    _this.handleRateChange = _this.handleRateChange.bind(_this);
    _this.handleSpeechVoiceChange = _this.handleSpeechVoiceChange.bind(_this);
    _this.handleSettingsStoreChange = _this.handleSettingsStoreChange.bind(_this);
    _this.handleSpeedChange = _this.handleSpeedChange.bind(_this);
    _this.handleDifficultyChange = _this.handleDifficultyChange.bind(_this);
    _this.handleIlsPathColorChange = _this.handleIlsPathColorChange.bind(_this);
    _this.handleDistanceCircleColor = _this.handleDistanceCircleColor.bind(_this);
    return _this;
  }

  Settings.prototype.componentWillMount = function componentWillMount() {
    stores_SettingsStore.on('change', this.handleSettingsStoreChange);
    communications.synth.addEventListener('voiceschanged', this.handleVoicesChange);
  };

  Settings.prototype.componentWillUnmount = function componentWillUnmount() {
    stores_SettingsStore.removeListener('change', this.handleSettingsStoreChange);
    communications.synth.removeEventListener('voiceschanged', this.handleVoicesChange);
  };

  Settings.prototype.handleSettingsStoreChange = function handleSettingsStoreChange() {
    this.setState({});
  };

  Settings.prototype.handleSpeechVoiceChange = function handleSpeechVoiceChange(e) {
    stores_SettingsStore.changeVoice(stores_SettingsStore.voices[+e.target.value]);
    stores_SettingsStore.emit('change');
  };

  Settings.prototype.handleSpeechSynthesisSettingChange = function handleSpeechSynthesisSettingChange(e) {
    stores_SettingsStore.speechsynthesis = e.target.checked;
    stores_SettingsStore.emit('change');
  };

  Settings.prototype.handleSpeechRecognitionSettingChange = function handleSpeechRecognitionSettingChange(e) {
    stores_SettingsStore.speechrecognition = e.target.checked;
    stores_SettingsStore.emit('change');
  };

  Settings.prototype.handleVoicesChange = function handleVoicesChange(e) {
    stores_SettingsStore.emit('change');
  };

  Settings.prototype.handlePitchChange = function handlePitchChange(e) {
    stores_SettingsStore.changePitch(+e.target.value);
    stores_SettingsStore.emit('change');
  };

  Settings.prototype.handleRateChange = function handleRateChange(e) {
    stores_SettingsStore.changeRate(+e.target.value);
    stores_SettingsStore.emit('change');
  };

  Settings.prototype.handleSpeedChange = function handleSpeedChange(e) {
    stores_SettingsStore.setSpeed(+e.target.value);
    stores_SettingsStore.emit('change');
  };

  Settings.prototype.handleDifficultyChange = function handleDifficultyChange(e) {
    switch (e.target.value) {
      case 'easy':
        stores_SettingsStore.startingInboundPlanes = 1;
        stores_SettingsStore.startingOutboundPlanes = 1;
        stores_SettingsStore.newPlaneInterval = 180;
        break;
      case 'normal':
        stores_SettingsStore.startingInboundPlanes = 3;
        stores_SettingsStore.startingOutboundPlanes = 2;
        stores_SettingsStore.newPlaneInterval = 100;
        break;
      case 'hard':
        stores_SettingsStore.startingInboundPlanes = 4;
        stores_SettingsStore.startingOutboundPlanes = 3;
        stores_SettingsStore.newPlaneInterval = 70;
        break;
    }
  };

  Settings.prototype.handleIlsPathColorChange = function handleIlsPathColorChange(e) {
    stores_SettingsStore.ilsPathColor = e.target.value;
    stores_SettingsStore.emit('change');
  };

  Settings.prototype.handleDistanceCircleColor = function handleDistanceCircleColor(e) {
    stores_SettingsStore.distanceCircleColor = e.target.value;
    stores_SettingsStore.emit('change');
  };

  Settings.prototype.handleSepVialotionCircleColor = function handleSepVialotionCircleColor(e) {
    stores_SettingsStore.sepVialationCircleColor = e.target.value;
    stores_SettingsStore.emit('change');
  };

  Settings.prototype.handleDistanceCircleChange = function handleDistanceCircleChange(e) {
    stores_SettingsStore.distanceCircles = e.target.checked;
    stores_SettingsStore.emit('change');
  };

  Settings.prototype.render = function render() {
    return Object(preact_min["h"])(
      'div',
      { className: 'settings' },
      Object(preact_min["h"])(
        'div',
        { className: 'speechsynthesis-setting mb' },
        Settings__ref,
        Object(preact_min["h"])(
          'label',
          { 'class': 'switch' },
          Object(preact_min["h"])('input', { type: 'checkbox', onInput: this.handleSpeechSynthesisSettingChange, checked: stores_SettingsStore.speechsynthesis }),
          _ref2
        )
      ),
      Object(preact_min["h"])(
        'div',
        { className: 'speechsynthesis-voices-setting mb' },
        _ref3,
        Object(preact_min["h"])(
          'select',
          { onInput: this.handleSpeechVoiceChange },
          stores_SettingsStore.voices.map(function (voice, i) {
            return Object(preact_min["h"])(
              'option',
              { key: i, value: i },
              voice.name,
              ' - ',
              voice.lang
            );
          })
        )
      ),
      Settings__ref4,
      Object(preact_min["h"])(
        'div',
        { className: 'speechsynthesis-pitch-setting range-slider mb' },
        Object(preact_min["h"])('input', { className: 'range-slider__range', type: 'range', min: '0.1', max: '2', step: '0.1', value: stores_SettingsStore.pitch, onInput: this.handlePitchChange }),
        Object(preact_min["h"])(
          'span',
          { 'class': 'range-slider__value' },
          stores_SettingsStore.pitch
        )
      ),
      Settings__ref5,
      Object(preact_min["h"])(
        'div',
        { className: 'speechsynthesis-rate-setting range-slider mb' },
        Object(preact_min["h"])('input', { className: 'range-slider__range', type: 'range', min: '0.1', max: '2', step: '0.1', value: stores_SettingsStore.rate, onInput: this.handleRateChange }),
        Object(preact_min["h"])(
          'span',
          { 'class': 'range-slider__value' },
          stores_SettingsStore.rate
        )
      ),
      _ref6,
      Object(preact_min["h"])(
        'div',
        { className: 'range-slider mb' },
        Object(preact_min["h"])('input', { className: 'range-slider__range', type: 'range', min: '0.1', max: '10', step: '0.1', value: stores_SettingsStore.speed, onInput: this.handleSpeedChange }),
        Object(preact_min["h"])(
          'span',
          { 'class': 'range-slider__value' },
          stores_SettingsStore.speed
        )
      ),
      Object(preact_min["h"])(
        'div',
        { className: 'mb' },
        _ref7,
        Object(preact_min["h"])(
          'select',
          { value: this.state.difficulty, onInput: this.handleDifficultyChange },
          _ref8,
          _ref9,
          _ref10
        )
      ),
      Object(preact_min["h"])(
        'div',
        { className: 'mb' },
        _ref11,
        Object(preact_min["h"])(
          'label',
          { 'class': 'switch' },
          Object(preact_min["h"])('input', { type: 'checkbox', onInput: this.handleDistanceCircleChange, checked: stores_SettingsStore.distanceCircles }),
          _ref12
        )
      ),
      Object(preact_min["h"])(
        'div',
        { className: 'mb' },
        _ref13,
        Object(preact_min["h"])('input', { type: 'color', value: stores_SettingsStore.distanceCircleColor, onInput: this.handleDistanceCircleColor })
      ),
      Object(preact_min["h"])(
        'div',
        { className: 'mb' },
        _ref14,
        Object(preact_min["h"])('input', { type: 'color', value: stores_SettingsStore.ilsPathColor, onInput: this.handleIlsPathColorChange })
      ),
      Object(preact_min["h"])(
        'div',
        { className: 'mb' },
        _ref15,
        Object(preact_min["h"])('input', { type: 'color', value: stores_SettingsStore.sepVialationCircleColor, onInput: this.handleSepVialotionCircleColor })
      )
    );
  };

  return Settings;
}(preact_min["Component"]);

/* harmony default export */ var components_Settings_Settings = (Settings_Settings_Settings);
// EXTERNAL MODULE: ./components/WayPoints/WayPoints.css
var WayPoints_WayPoints = __webpack_require__("1t2z");
var WayPoints_default = /*#__PURE__*/__webpack_require__.n(WayPoints_WayPoints);

// CONCATENATED MODULE: ./components/WayPoints/WayPoints.js


function WayPoints__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function WayPoints__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function WayPoints__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var WayPoints__ref = Object(preact_min["h"])('circle', { r: '2' });

var WayPoints_WayPoints_WayPoints = function (_Component) {
  WayPoints__inherits(WayPoints, _Component);

  function WayPoints(props) {
    WayPoints__classCallCheck(this, WayPoints);

    var _this = WayPoints__possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      waypoints: stores_GameStore.waypoints
    };

    _this.handleGameStoreStart = _this.handleGameStoreStart.bind(_this);
    return _this;
  }

  WayPoints.prototype.componentWillMount = function componentWillMount() {
    stores_GameStore.on('start', this.handleGameStoreStart);
  };

  WayPoints.prototype.componentWillUnmount = function componentWillUnmount() {
    stores_GameStore.removeListener('start', this.handleGameStoreStart);
  };

  WayPoints.prototype.handleGameStoreStart = function handleGameStoreStart() {
    this.setState({
      waypoints: stores_GameStore.waypoints
    });
  };

  WayPoints.prototype.render = function render() {
    var _this2 = this;

    var waypointsJsx = Object.keys(this.state.waypoints).map(function (w) {
      var waypoint = _this2.state.waypoints[w];
      return Object(preact_min["h"])(
        'g',
        { className: 'waypoint', transform: 'translate(' + waypoint.x + ' ' + (stores_GameStore.height - waypoint.y) + ')' },
        WayPoints__ref,
        Object(preact_min["h"])(
          'text',
          { x: '4' },
          w
        )
      );
    });

    return Object(preact_min["h"])(
      'g',
      { className: 'waypoints' },
      waypointsJsx
    );
  };

  return WayPoints;
}(preact_min["Component"]);

/* harmony default export */ var components_WayPoints_WayPoints = (WayPoints_WayPoints_WayPoints);
// EXTERNAL MODULE: ./node_modules/preact-compat/dist/preact-compat.es.js
var preact_compat_es = __webpack_require__("AX2D");

// EXTERNAL MODULE: ./components/Airport/Airport.css
var Airport_Airport = __webpack_require__("4TN0");
var Airport_default = /*#__PURE__*/__webpack_require__.n(Airport_Airport);

// CONCATENATED MODULE: ./components/Airport/Airport.js


function Airport__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Airport__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Airport__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var Airport__ref = Object(preact_min["h"])('circle', { r: '2', fill: '#fff' });

var Airport_Airport_Airport = function (_Component) {
  Airport__inherits(Airport, _Component);

  function Airport(props) {
    Airport__classCallCheck(this, Airport);

    var _this = Airport__possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      airport: stores_GameStore.airport
    };

    _this.handleGameStoreStart = _this.handleGameStoreStart.bind(_this);
    return _this;
  }

  Airport.prototype.componentWillMount = function componentWillMount() {
    stores_GameStore.on('start', this.handleGameStoreStart);
  };

  Airport.prototype.componentWillUnmount = function componentWillUnmount() {
    stores_GameStore.removeListener('start', this.handleGameStoreStart);
  };

  Airport.prototype.handleGameStoreStart = function handleGameStoreStart() {
    this.setState({
      airport: stores_GameStore.airport
    });
  };

  Airport.prototype.renderRwy = function renderRwy(rwy) {
    var len = rwy.length * config.rwyLenScale;
    var x1 = Math.sin(rwy.hdg1 * Math.PI / 180) * -len;
    var y1 = Math.cos(rwy.hdg1 * Math.PI / 180) * -len;
    var x2 = Math.sin(rwy.hdg2 * Math.PI / 180) * -len;
    var y2 = Math.cos(rwy.hdg2 * Math.PI / 180) * -len;

    var ilsx1 = Math.sin(rwy.hdg1 * Math.PI / 180) * -stores_SettingsStore.ilsPathLength;
    var ilsy1 = Math.cos(rwy.hdg1 * Math.PI / 180) * -stores_SettingsStore.ilsPathLength;
    var ilsx2 = Math.sin(rwy.hdg2 * Math.PI / 180) * -stores_SettingsStore.ilsPathLength;
    var ilsy2 = Math.cos(rwy.hdg2 * Math.PI / 180) * -stores_SettingsStore.ilsPathLength;
    return Object(preact_min["h"])(
      'g',
      { className: 'rwy', transform: 'translate(' + rwy.x + ' ' + -rwy.y + ')' },
      Object(preact_min["h"])('line', { className: 'ils-line ils-line-1', 'stroke-dasharray': stores_SettingsStore.ilsDashInterval.join(), x1: x1, y1: -y1, x2: ilsx1, y2: -ilsy1 }),
      Object(preact_min["h"])('line', { className: 'ils-line ils-line-2', 'stroke-dasharray': stores_SettingsStore.ilsDashInterval.join(), x1: x2, y1: -y2, x2: ilsx2, y2: -ilsy2 }),
      Object(preact_min["h"])('line', { className: 'rwy-line', x1: x1, y1: -y1, x2: x2, y2: -y2 }),
      Object(preact_min["h"])(
        'text',
        { x: x1, y: -y1 },
        rwy.name1
      ),
      Object(preact_min["h"])(
        'text',
        { x: x2, y: -y2 },
        rwy.name2
      )
    );
  };

  Airport.prototype.render = function render() {
    var _this2 = this;

    var airport = this.state.airport;
    if (!airport || !airport.runways) return null;

    var x = stores_GameStore.width / 2 + airport.x;
    var y = stores_GameStore.height / 2 + airport.y;

    var airportJsx = airport.runways.map(function (rwy) {
      return _this2.renderRwy(rwy);
    });
    var distanceCirlces = null;
    if (stores_SettingsStore.distanceCircles) {
      distanceCirlces = new Array(stores_SettingsStore.distanceCirclesAmount);
      for (var i = 0; i < distanceCirlces.length; i++) {
        distanceCirlces[i] = Object(preact_min["h"])('circle', { key: i, r: (i + 1) * stores_SettingsStore.distanceCirclesDistance,
          fill: 'none', stroke: stores_SettingsStore.distanceCircleColor });
      }
    }

    return Object(preact_min["h"])(
      'g',
      { className: 'airport', transform: 'translate(' + x + ' ' + y + ')' },
      distanceCirlces,
      Airport__ref,
      Object(preact_min["h"])(
        'g',
        { className: 'runways' },
        airportJsx
      ),
      Object(preact_min["h"])(
        'text',
        { x: '4' },
        this.state.airport.callsign
      )
    );
  };

  return Airport;
}(preact_compat_es["Component"]);

/* harmony default export */ var components_Airport_Airport = (Airport_Airport_Airport);
// EXTERNAL MODULE: ./containers/Donate/Donate.css
var Donate = __webpack_require__("sjZI");
var Donate_default = /*#__PURE__*/__webpack_require__.n(Donate);

// CONCATENATED MODULE: ./containers/Donate/Donate.js


function Donate__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Donate__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Donate__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Donate__ref = Object(preact_min["h"])(
  'div',
  { className: 'Donate' },
  'If you like the game and you want the game to stay (advertisement) free, please check out the ',
  Object(preact_min["h"])(
    'a',
    { href: 'https://www.gofundme.com/manage/atc-manager-2', target: '_blank' },
    'GoFundMe Page'
  ),
  ' or:',
  Object(preact_min["h"])('br', null),
  Object(preact_min["h"])('br', null),
  Object(preact_min["h"])(
    'form',
    { action: 'https://www.paypal.com/cgi-bin/webscr', method: 'post', style: 'margin-bottom: 0;' },
    Object(preact_min["h"])('input', { type: 'hidden', name: 'business',
      value: 'polyismstudio@gmail.com' }),
    Object(preact_min["h"])('input', { type: 'hidden', name: 'cmd', value: '_donations' }),
    Object(preact_min["h"])('input', { type: 'hidden', name: 'item_name', value: 'ATC Manager 2' }),
    Object(preact_min["h"])('input', { type: 'hidden', name: 'item_number', value: 'ATC Manager 2 Campaign' }),
    Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(
        'select',
        { style: 'width: 80px', name: 'currency_code' },
        Object(preact_min["h"])(
          'option',
          { selected: true, value: 'USD' },
          'USD'
        ),
        Object(preact_min["h"])(
          'option',
          { value: 'EUR' },
          'EUR'
        ),
        Object(preact_min["h"])(
          'option',
          { value: 'AUD' },
          'AUD'
        ),
        Object(preact_min["h"])(
          'option',
          { value: 'CAD' },
          'CAD'
        ),
        Object(preact_min["h"])(
          'option',
          { value: 'RUB' },
          'RUB'
        )
      ),
      Object(preact_min["h"])(
        'select',
        { style: 'width: 300px;', name: 'amount' },
        Object(preact_min["h"])(
          'option',
          { value: '1.00' },
          '1.00 - Bugfixing'
        ),
        Object(preact_min["h"])(
          'option',
          { selected: true, value: '2.00' },
          '2.00 - Buy us a coffee'
        ),
        Object(preact_min["h"])(
          'option',
          { value: '50.00' },
          '50.00 - New airport'
        ),
        Object(preact_min["h"])(
          'option',
          { value: '250.00' },
          '250.00 - Custom Feature'
        )
      )
    ),
    Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(
        'small',
        null,
        'If you\'re preferred currency is not listed, please use "Give a custom amount"'
      )
    ),
    Object(preact_min["h"])(
      'div',
      null,
      Object(preact_min["h"])(
        'a',
        { title: 'Donate', href: 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=polyismstudio@gmail.com&item_name=ATC+Manager+2&item_number=ATC+Manager+2+Campain', target: '_blank' },
        'Give a custom amount'
      )
    ),
    Object(preact_min["h"])('input', { type: 'submit', value: 'Donate' })
  ),
  Object(preact_min["h"])('br', null),
  'BTC Address: 36Za9aYukYfNZW2KLv1ST6Xy15cUSP7A6t',
  Object(preact_min["h"])('br', null),
  'BCH Address: qpyy02yht9s2zaupjxucptvq9nehqncd3y2xa4kq0y',
  Object(preact_min["h"])('br', null),
  'ETH Address: 0x6E8473ed45eab930D8Bd82CB9cE6353BCD0d2520',
  Object(preact_min["h"])('br', null),
  'LTC Address: MMZFVTkPQqQiQmLFyb4C6K1Hnz8EzG18bH'
);

var Donate_Donate = function (_Component) {
  Donate__inherits(Donate, _Component);

  function Donate(props) {
    Donate__classCallCheck(this, Donate);

    var _this = Donate__possibleConstructorReturn(this, _Component.call(this));

    _this.state = {};

    return _this;
  }

  Donate.prototype.componentWillMount = function componentWillMount() {};

  Donate.prototype.componentWillUnmount = function componentWillUnmount() {};

  Donate.prototype.render = function render() {
    return Donate__ref;
  };

  return Donate;
}(preact_min["Component"]);

/* harmony default export */ var containers_Donate_Donate = (Donate_Donate);
// EXTERNAL MODULE: ./components/BackgroundSvg/BackgroundSvg.css
var BackgroundSvg_BackgroundSvg = __webpack_require__("9GBv");
var BackgroundSvg_default = /*#__PURE__*/__webpack_require__.n(BackgroundSvg_BackgroundSvg);

// CONCATENATED MODULE: ./components/BackgroundSvg/BackgroundSvg.js


function BackgroundSvg__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function BackgroundSvg__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function BackgroundSvg__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var BackgroundSvg_BackgroundSvg_BackgroundSvg = function (_Component) {
  BackgroundSvg__inherits(BackgroundSvg, _Component);

  function BackgroundSvg() {
    BackgroundSvg__classCallCheck(this, BackgroundSvg);

    return BackgroundSvg__possibleConstructorReturn(this, _Component.call(this));
  }

  BackgroundSvg.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.name !== this.props.name;
  };

  BackgroundSvg.prototype.render = function render() {
    var _this2 = this;

    if (this.props.name) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          this.el.innerHTML = xhttp.responseText;
        }
      }.bind(this);
      xhttp.open('GET', './assets/maps/' + this.props.name + '.txt', true);
      xhttp.send();
    }
    return Object(preact_min["h"])('g', { transform: 'translate(-640, -360)', className: 'background', ref: function ref(el) {
        return _this2.el = el;
      } });
  };

  return BackgroundSvg;
}(preact_compat_es["Component"]);

/* harmony default export */ var components_BackgroundSvg_BackgroundSvg = (BackgroundSvg_BackgroundSvg_BackgroundSvg);
// EXTERNAL MODULE: ./components/GameMetaControls/GameMetaControls.css
var GameMetaControls_GameMetaControls = __webpack_require__("rcWw");
var GameMetaControls_default = /*#__PURE__*/__webpack_require__.n(GameMetaControls_GameMetaControls);

// EXTERNAL MODULE: ./node_modules/react-icons/fa/index.js
var fa = __webpack_require__("XR4d");
var fa_default = /*#__PURE__*/__webpack_require__.n(fa);

// CONCATENATED MODULE: ./components/GameMetaControls/GameMetaControls.js


function GameMetaControls__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GameMetaControls__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function GameMetaControls__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var GameMetaControls__ref = Object(preact_min["h"])(fa["FaDesktop"], null);

var GameMetaControls__ref2 = Object(preact_min["h"])(
  'span',
  null,
  Object(preact_min["h"])(fa["FaPlay"], null),
  ' Resume'
);

var GameMetaControls__ref3 = Object(preact_min["h"])(
  'span',
  null,
  Object(preact_min["h"])(fa["FaPause"], null),
  ' Pause'
);

var GameMetaControls__ref4 = Object(preact_min["h"])(fa["FaSave"], null);

var GameMetaControls_GameMetaControls_GameMetaControls = function (_Component) {
  GameMetaControls__inherits(GameMetaControls, _Component);

  function GameMetaControls(props) {
    GameMetaControls__classCallCheck(this, GameMetaControls);

    var _this = GameMetaControls__possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      paused: stores_GameStore.paused,
      started: stores_GameStore.started
    };

    _this.handleGameStoreChange = _this.handleGameStoreChange.bind(_this);
    _this.handlePauseResumeButtonClick = _this.handlePauseResumeButtonClick.bind(_this);
    _this.handleScreenShotButtonClick = _this.handleScreenShotButtonClick.bind(_this);
    _this.handleSaveButtonClick = _this.handleSaveButtonClick.bind(_this);
    return _this;
  }

  GameMetaControls.prototype.componentWillMount = function componentWillMount() {
    stores_GameStore.on('change', this.handleGameStoreChange);
  };

  GameMetaControls.prototype.componentWillUnmount = function componentWillUnmount() {
    stores_GameStore.removeListener('change', this.handleGameStoreChange);
  };

  GameMetaControls.prototype.handleGameStoreChange = function handleGameStoreChange() {
    this.setState({
      paused: stores_GameStore.paused,
      started: stores_GameStore.started
    });
  };

  GameMetaControls.prototype.handlePauseResumeButtonClick = function handlePauseResumeButtonClick() {
    stores_GameStore[stores_GameStore.paused ? 'resume' : 'pause']();
  };

  GameMetaControls.prototype.handleScreenShotButtonClick = function handleScreenShotButtonClick(e) {
    if (!stores_GameStore.svgEl) return;
    var el = stores_GameStore.svgEl.getElementsByTagName('svg')[0];
    var source = '<?xml version="1.0" standalone="no"?>\n' + el.outerHTML;

    // convert svg source to URI data scheme.
    var url = "data:image/svg+xml;base64," + btoa(source);
    e.target.setAttribute('href', url);
    e.target.setAttribute('download', 'screenshot');
  };

  GameMetaControls.prototype.handleSaveButtonClick = function handleSaveButtonClick() {
    var game = stores_GameStore.toJson();
    var state = loadState();
    var name = prompt('Name of your save?', stores_GameStore.mapName + ' - ' + new Date().toLocaleDateString());
    if (name === null) return;
    if (state.games[name]) return alert('Sorry this name already exists...');
    state.games[name] = game;
    saveState(state);
  };

  GameMetaControls.prototype.render = function render() {
    var paused = this.state.paused;
    return Object(preact_min["h"])(
      'div',
      { className: 'gamemetacontrols' },
      Object(preact_min["h"])(
        'a',
        { title: 'Save Screenshot', href: '#', className: 'button w-100', onClick: this.handleScreenShotButtonClick },
        GameMetaControls__ref,
        ' Screenshot'
      ),
      Object(preact_min["h"])(
        'button',
        { className: 'w-50', onClick: this.handlePauseResumeButtonClick },
        paused ? GameMetaControls__ref2 : GameMetaControls__ref3
      ),
      Object(preact_min["h"])(
        'button',
        { className: 'w-50', onClick: this.handleSaveButtonClick },
        GameMetaControls__ref4,
        ' Save'
      )
    );
  };

  return GameMetaControls;
}(preact_min["Component"]);

/* harmony default export */ var components_GameMetaControls_GameMetaControls = (GameMetaControls_GameMetaControls_GameMetaControls);
// EXTERNAL MODULE: ./node_modules/react-copy-to-clipboard/lib/index.js
var lib = __webpack_require__("sQ20");
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// CONCATENATED MODULE: ./containers/AtcView/AtcView.js
var AtcView__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function AtcView__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AtcView__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function AtcView__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


















var AtcView__ref = Object(preact_min["h"])('circle', { cx: '0', cy: '0', r: '2', 'stroke-width': '0' });

var AtcView__ref2 = Object(preact_min["h"])(
  'span',
  null,
  'Heading (\xB0)'
);

var AtcView__ref3 = Object(preact_min["h"])(
  'span',
  null,
  'Direct to '
);

var AtcView__ref4 = Object(preact_min["h"])(
  'span',
  null,
  'Speed (KTS)'
);

var AtcView__ref5 = Object(preact_min["h"])(
  'span',
  null,
  'Altitude (FT)'
);

var AtcView__ref6 = Object(preact_min["h"])(fa["FaPaperPlane"], null);

var AtcView__ref7 = Object(preact_min["h"])(fa["FaPlane"], null);

var AtcView__ref8 = Object(preact_min["h"])(components_WayPoints_WayPoints, null);

var AtcView__ref9 = Object(preact_min["h"])(components_Airport_Airport, null);

var AtcView__ref10 = Object(preact_min["h"])('rect', { width: '100%', height: '100%', fill: 'none', stroke: '#fff', 'stroke-dasharray': '20, 20' });

var AtcView__ref11 = Object(preact_min["h"])('div', { className: 'abs-container scores' });

var AtcView__ref12 = Object(preact_min["h"])(fa["FaCog"], null);

var AtcView__ref13 = Object(preact_min["h"])(fa["FaCommentDots"], null);

var AtcView__ref14 = Object(preact_min["h"])(fa["FaInfo"], null);

var AtcView__ref15 = Object(preact_min["h"])(components_GameMetaControls_GameMetaControls, null);

var _ref16 = Object(preact_min["h"])('br', null);

var _ref17 = Object(preact_min["h"])(
  'a',
  { href: 'https://play.google.com/store/apps/details?id=com.EchoSierraStudio.ATCManager&hl=en_US', target: '_blank' },
  'ATC Manager 1 App'
);

var _ref18 = Object(preact_min["h"])(containers_Donate_Donate, null);

var _ref19 = Object(preact_min["h"])('br', null);

var _ref20 = Object(preact_min["h"])(
  'a',
  { title: 'Contact', href: 'https://esstudio.site/contact/' },
  'Contact Me'
);

var _ref21 = Object(preact_min["h"])(
  'div',
  null,
  'Icons made by ',
  Object(preact_min["h"])(
    'a',
    { href: 'https://www.flaticon.com/authors/pause08', title: 'Pause08' },
    'Pause08'
  ),
  ' from ',
  Object(preact_min["h"])(
    'a',
    { href: 'https://www.flaticon.com/', title: 'Flaticon' },
    'www.flaticon.com'
  ),
  ' is licensed by ',
  Object(preact_min["h"])(
    'a',
    { href: 'http://creativecommons.org/licenses/by/3.0/', title: 'Creative Commons BY 3.0', target: '_blank' },
    'CC 3.0 BY'
  )
);

var _ref22 = Object(preact_min["h"])(fa["FaCompress"], null);

var _ref23 = Object(preact_min["h"])(
  'button',
  null,
  'Copy logs'
);

var _ref24 = Object(preact_min["h"])(fa["FaCompress"], null);

var _ref25 = Object(preact_min["h"])(
  'h5',
  null,
  'Settings'
);

var _ref26 = Object(preact_min["h"])('hr', null);

var _ref27 = Object(preact_min["h"])(components_Settings_Settings, null);

var _ref28 = Object(preact_min["h"])(fa["FaCompress"], null);

var AtcView_AtcView_AtcView = function (_Component) {
  AtcView__inherits(AtcView, _Component);

  function AtcView(props) {
    AtcView__classCallCheck(this, AtcView);

    var _this = AtcView__possibleConstructorReturn(this, _Component.call(this));

    _this.handleKeyPress = function (e) {
      if (e.keyCode == 13 && _this.state.cmd.tgt) {
        _this.handleCmdExecution();
        return false;
      }
    };

    _this.handleGameStoreChange = function () {
      _this.setState({
        traffic: stores_GameStore.traffic,
        gameWidth: stores_GameStore.width,
        gameHeight: stores_GameStore.height
      });
    };

    _this.handleSettingsStoreChange = function () {
      _this.setState({});
    };

    _this.handleCmdExecution = function () {
      var cmd = _this.state.cmd;
      if (!cmd.tgt) return;
      var delta = {};
      var model = airplanesById[cmd.tgt.typeId];
      if (typeof cmd.heading === 'number') cmd.heading = (cmd.heading + 359) % 360 + 1;

      var landableRwysArr = map_landableRwys(stores_GameStore.airport, _this.state.cmd.tgt, _this.state.gameWidth, _this.state.gameHeight).map(function (lr) {
        return lr.rev ? lr.rwy.name2 : lr.rwy.name1;
      });
      if (cmd.direction && stores_GameStore.callsigns[cmd.direction] && (stores_GameStore.callsignsPos[cmd.direction].ref.type !== idType.RWY || landableRwysArr.includes(cmd.direction))) {
        if (cmd.direction !== cmd.tgt.tgtDirection) delta.tgtDirection = cmd.direction;
        cmd.directionOld = true;
      } else if (typeof cmd.heading === 'number' && cmd.heading !== cmd.tgt.tgtDirection) delta.tgtDirection = cmd.heading;
      if (typeof cmd.altitude === 'number' && cmd.altitude !== cmd.tgt.tgtAltitude) delta.tgtAltitude = cmd.altitude = Math.min(model.ceiling * 1000, Math.max(2000, cmd.altitude));
      if (cmd.speed && cmd.speed !== cmd.tgt.tgtSpeed) delta.tgtSpeed = cmd.speed = Math.min(model.topSpeed, Math.max(model.minSpeed, cmd.speed));
      if (cmd.takeoff && cmd.tgt.outboundRwy) delta.outboundRwy = undefined;
      if (Object.keys(delta).length > 0) {
        var cmdTxt = communications.getCommandText(cmd, stores_GameStore.winddir, stores_GameStore.windspd);
        var atcMsg = communications.getCallsign(cmd.tgt) + ', ' + cmdTxt;
        stores_GameStore.addLog(atcMsg, 'ATC');
        // pilot:
        var pilotMsg = cmdTxt + ', ' + communications.getCallsign(cmd.tgt);
        stores_GameStore.addLog(pilotMsg, communications.getCallsign(cmd.tgt, true));

        if (stores_SettingsStore.speechsynthesis) communications.speak(atcMsg);
        AtcView__extends(cmd.tgt, delta);
        _this.setState({ cmd: cmd });
      } else {
        // do nothing
        return;
      }
      console.log('UPDATE', delta);
    };

    _this.handleHeadingTgtChange = function (e) {
      _this.setState(function (prevstate) {
        prevstate.cmd.heading = +e.target.value;
      });
    };

    _this.handleAltitudeTgtChange = function (e) {
      _this.setState(function (prevstate) {
        prevstate.cmd.altitude = Math.min(+e.target.max, e.target.value);
        return prevstate;
      });
    };

    _this.handleSpeedTgtChange = function (e) {
      _this.setState(function (prevstate) {
        prevstate.cmd.speed = Math.min(+e.target.max, e.target.value);
        return prevstate;
      });
    };

    _this.handleDirectToTgtChange = function (e) {
      if (!_this.state.cmd.tgt) return;
      _this.setState(function (prevstate) {
        prevstate.cmd.direction = e.target.value.toUpperCase().trim();
        prevstate.cmd.directionOld = false;
        return prevstate;
      });
    };

    _this.handleSVGClick = function (e) {
      var airplane = getParent(e, function (element) {
        return (element.getAttribute('class') || '').indexOf('airplane') !== -1;
      });
      if (!airplane) return;
      var index = airplane.getAttribute('data-index');
      _this.handleAirplaneClick(index);
    };

    _this.handleTrafficStackClick = function (e) {
      var airplane = getParent(e, function (element) {
        return (element.getAttribute('class') || '').indexOf('traffic-stack-entry') !== -1;
      });
      if (!airplane) return;
      var index = airplane.getAttribute('data-index');
      _this.handleAirplaneClick(index);
    };

    _this.handleAirplaneClick = function (index) {
      var airplane = _this.state.traffic[index];
      if (airplane === _this.state.cmd.tgt) {
        airplane.textRotation = (airplane.textRotation || 0) + 1;
        airplane.textRotation %= 4;
        _this.setState({});
        return;
      }
      // if (this.state.cmd.tgt) this.handleCmdExecution(); // flush possible previous changes that werent yet debounced.
      _this.setState({
        cmd: {
          tgt: airplane,
          direction: typeof airplane.tgtDirection === 'string' ? airplane.tgtDirection : null,
          altitude: airplane.tgtAltitude,
          heading: typeof airplane.tgtDirection === 'number' ? airplane.tgtDirection : null,
          speed: airplane.tgtSpeed
        }
      });
    };

    _this.handleTakeoffClick = function () {
      _this.setState(function (prevstate) {
        prevstate.cmd.takeoff = true;
        return prevstate;
      });
      _this.handleCmdExecution();
    };

    _this.handleExpandSettingsButtonClick = function () {
      _this.setState({ settingsExpanded: !_this.state.settingsExpanded });
    };

    _this.handleAboutExpanded = function () {
      _this.setState({ aboutExpanded: !_this.state.aboutExpanded });
    };

    _this.handleLogsExpanded = function () {
      _this.setState({ copied: false, logsExpanded: !_this.state.logsExpanded });
    };

    _this.handleOnlySelfButton = function () {
      _this.setState({ logsOnlySelf: !_this.state.logsOnlySelf });
    };

    _this.handleLogsCopied = function () {
      _this.setState({ logsCopied: true });
    };

    _this.renderTraffic = function () {
      return _this.state.traffic.map(function (airplane, i) {
        if (airplane.outboundRwy) return;
        var y = _this.state.gameHeight - airplane.y;
        var x = airplane.x;
        var spd = AtcView_getSpdJsx(airplane, 'tspan');
        var alt = AtcView_getAltJsx(airplane, 'tspan');
        var ltx = Math.sin(airplane.heading * Math.PI / 180) * config.headingIndicatorLineLen;
        var lty = Math.cos(airplane.heading * Math.PI / 180) * config.headingIndicatorLineLen;
        var path = 'M0,0 ' + airplane.path.map(function (p) {
          return 'L' + (p[0] - airplane.x) + ', ' + -(p[1] - airplane.y);
        });
        var violatingSep = stores_GameStore.sepDistanceVialotions[airplane.flight];
        var textHeight = (airplane.outboundWaypoint ? 4 : 3) * 14;

        var textAnchor = airplane.textRotation === 1 || airplane.textRotation === 2 ? 'end' : 'start';
        var textTranslate = 'translate(0, ' + (airplane.textRotation > 1 ? -textHeight : 0) + ')';

        return Object(preact_min["h"])(
          'g',
          { className: 'airplane ' + routeTypes[airplane.routeType] + ' ' + (_this.state.cmd.tgt === airplane ? 'airplane-active' : 'airplane-inactive'),
            'data-index': i, key: i, transform: 'translate(' + x + ', ' + y + ')', 'data-heading': airplane.heading },
          violatingSep ? Object(preact_min["h"])('circle', { r: config.threeMileRuleDistance, className: 'sep' }) : null,
          AtcView__ref,
          Object(preact_min["h"])('line', { x1: '0', y1: '0', x2: ltx, y2: -lty }),
          Object(preact_min["h"])('path', { 'stroke-dasharray': '4, 5', d: path }),
          Object(preact_min["h"])(
            'text',
            { transform: textTranslate, 'text-anchor': textAnchor },
            Object(preact_min["h"])(
              'tspan',
              { dy: '1em' },
              operatorsById[airplane.operatorId].callsign,
              airplane.flight
            ),
            Object(preact_min["h"])(
              'tspan',
              { dy: '1em', x: '0' },
              spd
            ),
            Object(preact_min["h"])(
              'tspan',
              { dy: '1em', x: '0' },
              alt
            ),
            airplane.outboundWaypoint ? Object(preact_min["h"])(
              'tspan',
              { dy: '1em', x: '0' },
              '\u21E8',
              airplane.outboundWaypoint
            ) : null
          )
        );
      });
    };

    _this.renderTrafficStack = function () {
      return _this.state.traffic.map(function (airplane, i) {
        var spd = AtcView_getSpdJsx(airplane, 'span');
        var alt = AtcView_getAltJsx(airplane, 'span');
        var heading = ('000' + Math.floor(airplane.heading)).substr(-3);
        var model = airplanesById[airplane.typeId];
        return Object(preact_min["h"])(
          'div',
          { className: 'traffic-stack-entry ' + routeTypes[airplane.routeType] + ' ' + (_this.state.cmd.tgt === airplane ? 'traffic-active' : 'traffic-not-active'), 'data-index': i, key: i },
          operatorsById[airplane.operatorId].callsign,
          airplane.flight,
          ' ',
          spd,
          ' ',
          alt,
          ' ',
          model.shortName,
          ' ',
          heading,
          '\xB0',
          airplane.outboundWaypoint ? '\u21E8' + airplane.outboundWaypoint : null,
          airplane.outboundRwy ? Object(preact_min["h"])(
            'span',
            null,
            ' RWY ',
            airplane.outboundRwy
          ) : null
        );
      });
    };

    _this.renderTrafficControl = function () {
      var cmd = _this.state.cmd;
      if (!cmd.tgt) return;
      var model = airplanesById[cmd.tgt.typeId];
      var topSpeed = cmd.tgt.altitude > 10000 ? model.topSpeed : Math.min(model.topSpeed, 250);
      var landableRwysArr = _this.state.cmd.tgt && _this.state.cmd.tgt.altitude < 3200 ? map_landableRwys(stores_GameStore.airport, _this.state.cmd.tgt, _this.state.gameWidth, _this.state.gameHeight).map(function (lr) {
        return lr.rev ? lr.rwy.name2 : lr.rwy.name1;
      }).map(function (name) {
        return Object(preact_min["h"])('option', { value: name });
      }) : null;

      var directToValue = cmd.directionOld ? '' : cmd.direction;
      var directToPlaceholder = cmd.directionOld ? cmd.direction : '';

      return Object(preact_min["h"])(
        'div',
        null,
        Object(preact_min["h"])(
          'div',
          null,
          AtcView__ref2,
          Object(preact_min["h"])('input', { onInput: _this.handleHeadingTgtChange, value: cmd.heading, type: 'number', step: '10' })
        ),
        Object(preact_min["h"])(
          'div',
          null,
          AtcView__ref3,
          Object(preact_min["h"])('input', { className: 'direct-to-input', type: 'text', value: directToValue, placeholder: directToPlaceholder,
            list: _this.dtcToDataListId, onInput: _this.handleDirectToTgtChange }),
          Object(preact_min["h"])(
            'datalist',
            { id: _this.dtcToDataListId },
            cmd.tgt.routeType === routeTypes.INBOUND ? landableRwysArr : null,
            Object.keys(stores_GameStore.waypoints).map(function (w) {
              return Object(preact_min["h"])('option', { value: w });
            })
          )
        ),
        Object(preact_min["h"])(
          'div',
          null,
          AtcView__ref4,
          Object(preact_min["h"])('input', { onInput: _this.handleSpeedTgtChange, value: cmd.speed, type: 'number', max: topSpeed, step: '10' })
        ),
        Object(preact_min["h"])(
          'div',
          null,
          AtcView__ref5,
          Object(preact_min["h"])('input', { onInput: _this.handleAltitudeTgtChange, value: cmd.altitude, type: 'number', max: model.ceiling * 1000, step: '1000' })
        ),
        Object(preact_min["h"])(
          'div',
          null,
          Object(preact_min["h"])(
            'button',
            { onClick: _this.handleCmdExecution },
            AtcView__ref6,
            ' Give Command'
          )
        ),
        Object(preact_min["h"])(
          'div',
          null,
          Object(preact_min["h"])(
            'button',
            { onClick: _this.handleTakeoffClick, className: cmd.tgt.outboundRwy ? '' : 'hidden' },
            AtcView__ref7,
            ' Takeoff'
          )
        ),
        Object(preact_min["h"])(
          'div',
          null,
          cmd.tgt.routeType === routeTypes.INBOUND && landableRwysArr && landableRwysArr.length > 0 ? 'Land using "Direct to"' : null
        )
      );
    };

    _this.state = {
      traffic: stores_GameStore.traffic,
      gameWidth: stores_GameStore.width,
      gameHeight: stores_GameStore.height,
      settingsExpanded: false,
      logsExpanded: false,
      aboutExpanded: false,
      logsOnlySelf: false,

      cmd: {
        tgt: null,
        heading: null,
        altitude: null,
        speed: null
      }
    };

    _this.dtcToDataListId = 'dct-tgt-' + Math.random().toString().replace('.', '');
    return _this;
  }

  AtcView.prototype.componentWillMount = function componentWillMount() {
    stores_GameStore.on('change', this.handleGameStoreChange);
    stores_SettingsStore.on('change', this.handleSettingsStoreChange);

    if (typeof window !== 'undefined') window.addEventListener('keypress', this.handleKeyPress);
  };

  AtcView.prototype.componentWillUnmount = function componentWillUnmount() {
    stores_GameStore.removeListener('change', this.handleGameStoreChange);
    stores_SettingsStore.removeListener('change', this.handleSettingsStoreChange);

    if (typeof window !== 'undefined') window.removeEventListener('keypress', this.handleKeyPress);
  };

  AtcView.prototype.render = function render() {
    var airplanes = this.renderTraffic();
    var trafficstack = this.renderTrafficStack();
    var trafficcontrol = this.renderTrafficControl();
    var logs = this.state.logsOnlySelf ? stores_GameStore.selfLog : stores_GameStore.log;

    var innerWidth = typeof window !== 'undefined' ? window.innerWidth : 800;
    var innerHeight = typeof window !== 'undefined' ? window.innerHeight : 600;

    return Object(preact_min["h"])(
      'div',
      { className: 'atc-view' },
      Object(preact_min["h"])(
        'svg',
        { xmlns: 'http://www.w3.org/2000/svg', className: 'atc-view-svg', width: innerWidth - 250, height: innerHeight,
          onClick: this.handleSVGClick, viewBox: '0 0 1280 720', style: 'background: #194850; overflow: visible' },
        Object(preact_min["h"])(
          'style',
          null,
          '\n            text {\n              font: 14px \'Helvetica\';\n              fill: #fff;\n            }\n            .airplane circle {\n              fill: #fff;\n            }\n            .airplane line, .airplane path {\n              stroke: #fff;\n              stroke-width: 1;\n              fill: none;\n            }\n            .airplane.inbound line, .airplane.inbound path {\n              stroke: #bbf;\n            }\n            .airplane.outbound line, .airplane.outbound path {\n              stroke: #bfb;\n            }\n            .airplane.enroute line, .airplane.enroute path {\n              stroke: #ffb;\n            }\n            .airplane.inbound text, .airplane.inbound circle {\n              fill: #bbf;\n            }\n            .airplane.outbound text, .airplane.outbound circle {\n              fill: #bfb;\n            }\n            .airplane.enroute text, .airplane.enroute circle {\n              fill: #ffb;\n            }\n            .airplane tspan.up {\n              fill: #0f0;\n            }\n            .airplane tspan.down {\n              fill: #f00;\n            }\n            .waypoint circle {\n              fill: #fff;\n            }\n            .rwy-line {\n              stroke: #fff;\n              stroke-width: 3;\n            }\n            .ils-line {\n              stroke: ' + stores_SettingsStore.ilsPathColor + ';\n              stroke-width: 1;\n            }\n            .background path {\n              fill: #1e606b;\n            }\n            .airplane circle.sep {\n              fill: ' + stores_SettingsStore.sepVialationCircleColor + ';\n              fill-opacity: 0.2;\n              stroke: #f00;\n            }\n          '
        ),
        Object(preact_min["h"])(components_BackgroundSvg_BackgroundSvg, { name: stores_GameStore.mapName }),
        AtcView__ref8,
        AtcView__ref9,
        airplanes,
        AtcView__ref10
      ),
      AtcView__ref11,
      Object(preact_min["h"])(
        'div',
        { className: 'traffic-stack-wrapper', style: { height: innerHeight } },
        Object(preact_min["h"])(
          'div',
          { className: 'traffic-stack', onClick: this.handleTrafficStackClick },
          trafficstack
        ),
        Object(preact_min["h"])(
          'div',
          { className: 'traffic-control' },
          trafficcontrol
        ),
        Object(preact_min["h"])(
          'div',
          { className: 'atc-view-buttons' },
          Object(preact_min["h"])(
            'button',
            { className: 'w-100', onClick: this.handleExpandSettingsButtonClick },
            AtcView__ref12,
            '\xA0',
            this.state.settingsExpanded ? 'Hide Options' : 'Expand Options'
          ),
          Object(preact_min["h"])(
            'button',
            { className: 'w-100', onClick: this.handleLogsExpanded },
            AtcView__ref13,
            '\xA0',
            this.state.logsExpanded ? 'Hide Logs' : 'Expand Logs'
          ),
          Object(preact_min["h"])(
            'button',
            { className: 'w-100', onClick: this.handleAboutExpanded },
            AtcView__ref14,
            '\xA0',
            this.state.aboutExpanded ? 'Hide Info' : 'Expand Info'
          ),
          AtcView__ref15
        )
      ),
      Object(preact_min["h"])(
        'div',
        { className: [this.state.aboutExpanded ? null : 'hidden', 'about-panel'].join(' ') },
        Object(preact_min["h"])(
          'div',
          null,
          Object(preact_min["h"])(
            'span',
            null,
            'Wind: ',
            stores_GameStore.winddir,
            '\xB0 / ',
            stores_GameStore.windspd,
            ' kts'
          )
        ),
        Object(preact_min["h"])(
          'div',
          null,
          Object(preact_min["h"])(
            'span',
            null,
            'ATIS: ',
            stores_GameStore.getAtis()
          )
        ),
        Object(preact_min["h"])(
          'div',
          null,
          Object(preact_min["h"])(
            'span',
            null,
            'Altimeter: ',
            stores_GameStore.altimeter
          )
        ),
        _ref16,
        'Atc Manager 2 is a web based air traffic control game. Manage airspace of busy airports like Schiphol or Heathrow in a realistic simulator. Check out the ',
        _ref17,
        _ref18,
        _ref19,
        _ref20,
        _ref21,
        Object(preact_min["h"])(
          'button',
          { onClick: this.handleAboutExpanded },
          _ref22,
          ' Hide Panel'
        )
      ),
      Object(preact_min["h"])(
        'div',
        { className: [this.state.logsExpanded ? null : 'hidden', 'logs-panel'].join(' ') },
        Object(preact_min["h"])(
          'div',
          null,
          'Departures: ',
          stores_GameStore.departures
        ),
        Object(preact_min["h"])(
          'div',
          null,
          'Arrivals: ',
          stores_GameStore.arrivals
        ),
        Object(preact_min["h"])(
          'div',
          null,
          'Seperation violations: ',
          stores_GameStore.distanceVialations
        ),
        Object(preact_min["h"])(
          'div',
          { 'class': 'logs-container' },
          Object(preact_min["h"])(
            'div',
            { 'class': 'logs-inner' },
            logs.slice(logs.length - 10, logs.length).map(function (x, i) {
              return Object(preact_min["h"])(
                'div',
                { key: i },
                x
              );
            })
          )
        ),
        Object(preact_min["h"])(
          'div',
          { style: { color: '#19242e' } },
          this.state.logsCopied ? 'Copied.' : '\xA0'
        ),
        Object(preact_min["h"])(
          lib["CopyToClipboard"],
          { text: logs.join('\r\n'),
            onCopy: this.handleLogsCopied },
          _ref23
        ),
        Object(preact_min["h"])(
          'button',
          { onClick: this.handleOnlySelfButton },
          this.state.logsOnlySelf ? 'Show all' : 'Only me'
        ),
        Object(preact_min["h"])(
          'button',
          { onClick: this.handleLogsExpanded },
          _ref24,
          ' Hide Panel'
        )
      ),
      Object(preact_min["h"])(
        'div',
        { className: [this.state.settingsExpanded ? null : 'hidden', 'settings-panel'].join(' ') },
        _ref25,
        _ref26,
        _ref27,
        Object(preact_min["h"])(
          'button',
          { onClick: this.handleExpandSettingsButtonClick },
          _ref28,
          ' Hide Options'
        )
      )
    );
  };

  return AtcView;
}(preact_min["Component"]);

var AtcView_getSpdJsx = function getSpdJsx(airplane, TagName) {
  var tgtSpeed = airplane.altitude < 10000 ? Math.min(airplane.tgtSpeed, 250) : airplane.tgtSpeed;
  if (Math.abs(airplane.speed - tgtSpeed) > 5) {
    return Object(preact_min["h"])(
      TagName,
      null,
      Math.round(airplane.speed),
      'KTS',
      tgtSpeed > airplane.speed ? Object(preact_min["h"])(
        TagName,
        { className: 'up' },
        '\u21E7',
        Math.round(tgtSpeed),
        'KTS'
      ) : Object(preact_min["h"])(
        TagName,
        { className: 'down' },
        '\u21E9',
        Math.round(tgtSpeed),
        'KTS'
      )
    );
  } else {
    return Object(preact_min["h"])(
      TagName,
      null,
      Math.round(airplane.speed),
      'KTS'
    );
  }
};

var AtcView_getAltFmtJSx = function getAltFmtJSx(alt, TagName) {
  return Object(preact_min["h"])(
    TagName,
    null,
    alt > 18000 ? 'FL' + Math.floor(alt * .01) : Math.floor(alt) + 'FT'
  );
};

var AtcView_getAltJsx = function getAltJsx(airplane, TagName) {
  var cs = stores_GameStore.callsignsPos[airplane.tgtDirection];
  var isLanding = cs && cs.ref.type === idType.RWY && airplane.routeType === routeTypes.INBOUND;
  if (Math.abs(airplane.tgtAltitude - airplane.altitude) > 100 && airplane.altitude && !isLanding) {
    return Object(preact_min["h"])(
      TagName,
      null,
      AtcView_getAltFmtJSx(airplane.altitude, TagName),
      airplane.tgtAltitude > airplane.altitude ? Object(preact_min["h"])(
        TagName,
        { className: 'up' },
        '\u21E7',
        AtcView_getAltFmtJSx(airplane.tgtAltitude, TagName)
      ) : Object(preact_min["h"])(
        TagName,
        { className: 'down' },
        '\u21E9',
        AtcView_getAltFmtJSx(airplane.tgtAltitude, TagName)
      )
    );
  } else {
    return AtcView_getAltFmtJSx(airplane.altitude, TagName);
  }
};

var getParent = function getParent(e, matcher) {
  var el = e.target;
  while (el) {
    if (matcher(el)) return el;
    el = el.parentElement;
  }
  return null;
};

/* harmony default export */ var containers_AtcView_AtcView = (AtcView_AtcView_AtcView);
// CONCATENATED MODULE: ./containers/Game/Game.js


function Game__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Game__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Game__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var Game__ref = Object(preact_min["h"])(
  'div',
  { id: 'atc-game' },
  Object(preact_min["h"])(containers_AtcView_AtcView, null)
);

var Game_Game_Game = function (_Component) {
  Game__inherits(Game, _Component);

  function Game(props) {
    Game__classCallCheck(this, Game);

    var _this = Game__possibleConstructorReturn(this, _Component.call(this));

    _this.name = 'default';
    _this.setRoot = function (el) {
      _this.root = el;
      stores_GameStore.setSvgEl(el);
    };
    return _this;
  }

  Game.prototype.componentDidMount = function componentDidMount() {
    if (stores_GameStore.started) return;else stores_GameStore.startMap(this.name);
  };

  Game.prototype.render = function render() {
    return Object(preact_min["h"])(
      'div',
      { ref: this.setRoot, className: 'Game' },
      Game__ref
    );
  };

  return Game;
}(preact_min["Component"]);

/* harmony default export */ var containers_Game_Game = (Game_Game_Game);
// EXTERNAL MODULE: ./containers/Home/Home.css
var Home_Home = __webpack_require__("FEkH");
var Home_default = /*#__PURE__*/__webpack_require__.n(Home_Home);

// EXTERNAL MODULE: ./components/SavedGamesOpen/SavedGamesOpen.css
var SavedGamesOpen_SavedGamesOpen = __webpack_require__("JBOx");
var SavedGamesOpen_default = /*#__PURE__*/__webpack_require__.n(SavedGamesOpen_SavedGamesOpen);

// CONCATENATED MODULE: ./components/SavedGamesOpen/SavedGamesOpen.js


function SavedGamesOpen__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SavedGamesOpen__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function SavedGamesOpen__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var SavedGamesOpen__ref = Object(preact_min["h"])('path', { d: 'M512 1536h768v-384h-768v384zm896 0h128v-896q0-14-10-38.5t-20-34.5l-281-281q-10-10-34-20t-39-10v416q0 40-28 68t-68 28h-576q-40 0-68-28t-28-68v-416h-128v1280h128v-416q0-40 28-68t68-28h832q40 0 68 28t28 68v416zm-384-928v-320q0-13-9.5-22.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 22.5v320q0 13 9.5 22.5t22.5 9.5h192q13 0 22.5-9.5t9.5-22.5zm640 32v928q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1344q0-40 28-68t68-28h928q40 0 88 20t76 48l280 280q28 28 48 76t20 88z' });

var SavedGamesOpen__ref2 = Object(preact_min["h"])('path', { d: 'M704 736v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm128 724v-948h-896v948q0 22 7 40.5t14.5 27 10.5 8.5h832q3 0 10.5-8.5t14.5-27 7-40.5zm-672-1076h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z' });

var SavedGamesOpen__ref3 = Object(preact_min["h"])(
  'small',
  null,
  'Nothing...'
);

var SavedGamesOpen_SavedGamesOpen_SavedGamesOpen = function (_Component) {
  SavedGamesOpen__inherits(SavedGamesOpen, _Component);

  function SavedGamesOpen(props) {
    SavedGamesOpen__classCallCheck(this, SavedGamesOpen);

    var _this = SavedGamesOpen__possibleConstructorReturn(this, _Component.call(this));

    var games = [];
    var s = loadState();
    for (var name in s.games) {
      if (s.games.hasOwnProperty(name)) {
        games.push({ name: name, state: s.games[name] });
      }
    }

    _this.state = { games: games };

    _this.handleSavedGamesOpenListItemClick = _this.handleSavedGamesOpenListItemClick.bind(_this);
    _this.handleSavedGameOpenListItemTrash = _this.handleSavedGameOpenListItemTrash.bind(_this);
    return _this;
  }

  SavedGamesOpen.prototype.componentWillMount = function componentWillMount() {};

  SavedGamesOpen.prototype.componentWillUnmount = function componentWillUnmount() {};

  SavedGamesOpen.prototype.handleSavedGamesOpenListItemClick = function handleSavedGamesOpenListItemClick(e) {
    var name = e.currentTarget.getAttribute('data-name');
    if (stores_GameStore.started) {
      var force = confirm('Another game is already playing. Make sure you have saved your progress. Do you want to continue?');
      if (force) {
        stores_GameStore.stop();
      } else {
        return;
      }
    }
    stores_GameStore.startSaved(name);
    route('/game');
  };

  SavedGamesOpen.prototype.handleSavedGameOpenListItemTrash = function handleSavedGameOpenListItemTrash(e) {
    var name = e.currentTarget.getAttribute('data-name');
    var state = loadState();
    var sure = confirm('Are you sure?');
    if (!sure) return;
    delete state.games[name];
    saveState(state);
    var games = [];
    for (var _name in state.games) {
      if (state.games.hasOwnProperty(_name)) {
        games.push({ name: _name, state: state.games[_name] });
      }
    }
    this.setState({ games: games });
  };

  SavedGamesOpen.prototype.render = function render() {
    var _this2 = this;

    var list = this.state.games.map(function (x, i) {
      return Object(preact_min["h"])(
        'div',
        { 'data-name': x.name, key: i, className: 'save' },
        Object(preact_min["h"])(
          'h5',
          { className: 'save-name' },
          x.name
        ),
        Object(preact_min["h"])(
          'svg',
          { onClick: _this2.handleSavedGamesOpenListItemClick, 'data-name': x.name, className: 'save-img', viewBox: '0 0 1792 1792', xmlns: 'http://www.w3.org/2000/svg' },
          SavedGamesOpen__ref
        ),
        Object(preact_min["h"])(
          'svg',
          { 'data-name': x.name, onClick: _this2.handleSavedGameOpenListItemTrash, className: 'trash', viewBox: '0 0 1792 1792' },
          SavedGamesOpen__ref2
        )
      );
    });
    return Object(preact_min["h"])(
      'div',
      { className: 'savedgamesopen' },
      'Saves:',
      Object(preact_min["h"])(
        'div',
        { className: 'savedgamesopen-list' },
        list.length > 0 ? list : SavedGamesOpen__ref3
      )
    );
  };

  return SavedGamesOpen;
}(preact_min["Component"]);

/* harmony default export */ var components_SavedGamesOpen_SavedGamesOpen = (SavedGamesOpen_SavedGamesOpen_SavedGamesOpen);
// CONCATENATED MODULE: ./containers/Home/Home.js


function Home__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Home__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Home__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var Home__ref = Object(preact_min["h"])(
  'div',
  { className: 'panel' },
  Object(preact_min["h"])(
    'h1',
    null,
    'ATC Manager 2'
  ),
  Object(preact_min["h"])(
    'div',
    { style: 'padding: 30px 20px;' },
    'ATC Manager 2 is a web based air traffic control game. Manage airspace of busy airports like Schiphol or Heathrow in a realistic simulator.',
    Object(preact_min["h"])('br', null),
    Object(preact_min["h"])('br', null),
    'Check out the ',
    Object(preact_min["h"])(
      'a',
      { title: 'Android App', href: 'https://play.google.com/store/apps/details?id=com.EchoSierraStudio.ATCManager&hl=en_US' },
      'App'
    ),
    ' for mobile.'
  )
);

var Home__ref2 = Object(preact_min["h"])(
  'div',
  { className: 'panel' },
  Object(preact_min["h"])(components_SavedGamesOpen_SavedGamesOpen, null)
);

var Home__ref3 = Object(preact_min["h"])(
  'h2',
  { className: 'mb' },
  'Start'
);

var Home__ref4 = Object(preact_min["h"])(
  'span',
  { className: 'mb' },
  'Area:'
);

var Home__ref5 = Object(preact_min["h"])(components_Settings_Settings, null);

var Home__ref6 = Object(preact_min["h"])(
  'div',
  { className: 'panel' },
  Object(preact_min["h"])(
    preact_router_es_Link,
    { href: '/saves-editor' },
    Object(preact_min["h"])(
      'div',
      { 'class': 'block-outer' },
      Object(preact_min["h"])(
        'div',
        { 'class': 'block-inner' },
        'Saves Editor'
      )
    )
  )
);

var Home_Home_Home = function (_Component) {
  Home__inherits(Home, _Component);

  function Home(props) {
    Home__classCallCheck(this, Home);

    var _this = Home__possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      mapname: mapNames[0]
    };

    _this.handleMapSelectionChange = _this.handleMapSelectionChange.bind(_this);
    _this.handleStartClick = _this.handleStartClick.bind(_this);
    return _this;
  }

  Home.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    router.on('change', function () {
      return _this2.setState({});
    });
  };

  Home.prototype.componentWillUnmount = function componentWillUnmount() {};

  Home.prototype.handleMapSelectionChange = function handleMapSelectionChange(e) {
    this.setState({ mapname: e.target.value });
  };

  Home.prototype.handleReturnToGame = function handleReturnToGame() {
    route('/game');
  };

  Home.prototype.handleStartClick = function handleStartClick() {
    if (stores_GameStore.started) {
      var force = confirm('Another game is already playing. Make sure you have saved your progress. Do you want to continue?');
      if (force) {
        stores_GameStore.stop();
      } else {
        return;
      }
    }
    stores_GameStore.startMap(this.state.mapname);
    route('/game');
  };

  Home.prototype.render = function render() {
    var _this3 = this;

    return Object(preact_min["h"])(
      'div',
      { className: 'home', style: 'background-color: #194850' },
      Object(preact_min["h"])(
        'div',
        { className: 'abs-container' },
        stores_GameStore.started ? Object(preact_min["h"])(
          'button',
          { onClick: this.handleReturnToGame },
          'Return to Game'
        ) : null
      ),
      Home__ref,
      Home__ref2,
      Object(preact_min["h"])(
        'div',
        { className: 'panel' },
        Home__ref3,
        Home__ref4,
        Object(preact_min["h"])(
          'select',
          { className: 'mb', onInput: this.handleMapSelectionChange },
          mapNames.map(function (name) {
            return Object(preact_min["h"])(
              'option',
              { selected: name === _this3.state.mapname, value: name },
              upcase(name)
            );
          })
        ),
        Home__ref5,
        Object(preact_min["h"])(
          'button',
          { onClick: this.handleStartClick },
          'Start'
        )
      ),
      Home__ref6
    );
  };

  return Home;
}(preact_min["Component"]);

/* harmony default export */ var containers_Home_Home = (Home_Home_Home);

var upcase = function upcase(str) {
  return str[0].toUpperCase() + str.slice(1);
};
// EXTERNAL MODULE: ./containers/NotFound/NotFound.css
var NotFound_NotFound = __webpack_require__("DpDT");
var NotFound_default = /*#__PURE__*/__webpack_require__.n(NotFound_NotFound);

// CONCATENATED MODULE: ./containers/NotFound/NotFound.js


function NotFound__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function NotFound__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function NotFound__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var NotFound__ref = Object(preact_min["h"])(
  'h1',
  null,
  '404'
);

var NotFound__ref2 = Object(preact_min["h"])('br', null);

var NotFound__ref3 = Object(preact_min["h"])('br', null);

var NotFound_NotFound_NotFound = function (_Component) {
  NotFound__inherits(NotFound, _Component);

  function NotFound(props) {
    NotFound__classCallCheck(this, NotFound);

    var _this = NotFound__possibleConstructorReturn(this, _Component.call(this));

    _this.state = {};

    return _this;
  }

  NotFound.prototype.componentWillMount = function componentWillMount() {};

  NotFound.prototype.componentWillUnmount = function componentWillUnmount() {};

  NotFound.prototype.render = function render() {
    return Object(preact_min["h"])(
      'div',
      { className: 'NotFound' },
      Object(preact_min["h"])(
        'div',
        { className: 'panel' },
        NotFound__ref,
        'Page not found',
        NotFound__ref2,
        NotFound__ref3,
        Object(preact_min["h"])(
          'button',
          { onclick: function onclick() {
              return route('/');
            } },
          'Home'
        ),
        Object(preact_min["h"])(
          'button',
          { onclick: function onclick() {
              return index_history.goBack();
            } },
          'Back'
        )
      )
    );
  };

  return NotFound;
}(preact_min["Component"]);

/* harmony default export */ var containers_NotFound_NotFound = (NotFound_NotFound_NotFound);
// EXTERNAL MODULE: ./containers/SavesEditor/SavesEditor.css
var SavesEditor_SavesEditor = __webpack_require__("7GbZ");
var SavesEditor_default = /*#__PURE__*/__webpack_require__.n(SavesEditor_SavesEditor);

// EXTERNAL MODULE: ./node_modules/file-saver/FileSaver.js
var FileSaver = __webpack_require__("lDdF");
var FileSaver_default = /*#__PURE__*/__webpack_require__.n(FileSaver);

// CONCATENATED MODULE: ./containers/SavesEditor/SavesEditor.js


function SavesEditor__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SavesEditor__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function SavesEditor__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var SavesEditor__ref = Object(preact_min["h"])(
  'h1',
  null,
  'SavesEditor'
);

var SavesEditor__ref2 = Object(preact_min["h"])(
  'option',
  { value: '' },
  'Choose Save:'
);

var SavesEditor__ref3 = Object(preact_min["h"])('br', null);

var SavesEditor__ref4 = Object(preact_min["h"])('br', null);

var SavesEditor__ref5 = Object(preact_min["h"])(
  'label',
  { 'for': 'saveseditor' },
  'Open File'
);

var SavesEditor__ref6 = Object(preact_min["h"])(fa["FaSpinner"], { className: 'spinner' });

var SavesEditor__ref7 = Object(preact_min["h"])(fa["FaPaperPlane"], null);

var SavesEditor_SavesEditor_SavesEditor = function (_Component) {
  SavesEditor__inherits(SavesEditor, _Component);

  function SavesEditor(props) {
    SavesEditor__classCallCheck(this, SavesEditor);

    var _this2 = SavesEditor__possibleConstructorReturn(this, _Component.call(this));

    _this2.handleInputChanged = function (e) {
      var saveName = e.target.value;
      var save = _this2.state.saves[saveName] || null;
      _this2.setState({
        saveName: saveName,
        json: save !== null ? JSON.stringify(save, null, 4) : ''
      });
    };

    _this2.handleJsonTextareaInput = function (e) {
      var json = e.target.value;
      _this2.setState({
        debouncing: true,
        json: json
      });
      _this2.parseTextareaJsonDebounced(json);
    };

    _this2.parseTextareaJsonDebounced = debounce(function (json) {
      _this2.setState({ debouncing: false });
      try {
        var obj = JSON.parse(json);
        _this2.setState(function (prevstate) {
          prevstate.warningMessage = null;
          prevstate.infoMessage = null, prevstate.editingObj = obj;
          return prevstate;
        });
      } catch (err) {
        _this2.setState({
          warningMessage: err.message,
          infoMessage: null,
          editingObj: null
        });
      }
    }, 500);

    _this2.handleSaveClick = function (e) {
      if (_this2.state.editingObj === null) return alert('Please submit valid a valid save file');
      var saves = _this2.state.saves;
      saves[_this2.state.saveName] = _this2.state.editingObj;
      _this2.setState({
        saves: saves
      });
      var gamePersistance = loadState();
      gamePersistance.games = saves;
      saveState(gamePersistance);
      alert('Saved file to local storage');
    };

    _this2.handleCopy = function () {
      _this2.setState({
        infoMessage: 'Savefile copied to clipboard.'
      });
    };

    _this2.handleSaveFileClick = function () {
      Object(FileSaver["saveAs"])(new Blob([_this2.state.json], {
        type: 'application/json'
      }), 'savefile ' + _this2.state.saveName.trim() + '.json');
    };

    _this2.readFromFile = function (e) {
      var reader = new FileReader();
      var _this = _this2;
      reader.onload = function () {

        _this.setState({
          json: reader.result
        });
      };
      reader.readAsText(e.target.files[0]);
    };

    _this2.state = {
      json: '',
      saveName: '',
      saves: loadState().games,
      editingObj: null,
      debouncing: false
    };
    return _this2;
  }

  SavesEditor.prototype.componentWillMount = function componentWillMount() {};

  SavesEditor.prototype.componentWillUnmount = function componentWillUnmount() {};

  SavesEditor.prototype.render = function render() {
    var _this3 = this;

    return Object(preact_min["h"])(
      'div',
      { className: 'SavesEditor' },
      Object(preact_min["h"])(
        'div',
        { className: 'panel' },
        SavesEditor__ref,
        Object(preact_min["h"])(
          'select',
          { onInput: this.handleInputChanged },
          SavesEditor__ref2,
          Object.keys(this.state.saves).map(function (key, i) {
            return Object(preact_min["h"])(
              'option',
              { key: i, value: key, selected: _this3.state.saves[key] === _this3.state.save },
              key
            );
          })
        ),
        SavesEditor__ref3,
        SavesEditor__ref4,
        Object(preact_min["h"])('textarea', { onInput: this.handleJsonTextareaInput, className: 'line-nums', style: 'height: 300px!important;', value: this.state.json }),
        Object(preact_min["h"])(
          'div',
          { className: 'warning-message' },
          this.state.warningMessage,
          '\xA0'
        ),
        Object(preact_min["h"])(
          'div',
          { className: 'info-message' },
          this.state.infoMessage,
          '\xA0'
        ),
        Object(preact_min["h"])(
          'p',
          null,
          Object(preact_min["h"])(
            'button',
            { onClick: this.handleSaveFileClick, disabled: this.state.debouncing || this.state.json === '' },
            'Save to File'
          ),
          Object(preact_min["h"])('input', { onChange: this.readFromFile, id: 'saveseditor', className: 'inputfile', type: 'file', accept: '.json', disabled: this.state.saveName === '' }),
          SavesEditor__ref5,
          Object(preact_min["h"])(
            lib["CopyToClipboard"],
            { text: this.state.json,
              onCopy: this.handleCopy },
            Object(preact_min["h"])(
              'button',
              { disabled: this.state.debouncing || this.state.json === '' },
              'Copy to Clipboard'
            )
          )
        ),
        Object(preact_min["h"])(
          'button',
          { disabled: this.state.debouncing || this.state.editingObj === null, onClick: this.handleSaveClick },
          this.state.debouncing ? SavesEditor__ref6 : SavesEditor__ref7,
          ' Save'
        )
      )
    );
  };

  return SavesEditor;
}(preact_min["Component"]);

/* harmony default export */ var containers_SavesEditor_SavesEditor = (SavesEditor_SavesEditor_SavesEditor);

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
// CONCATENATED MODULE: ./index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "router", function() { return router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "history", function() { return index_history; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index_App; });


function index__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function index__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function index__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













if (typeof window !== 'undefined') {
  window.onbeforeunload = function () {
    return 'You have unsaved progress. Are you sure you want to exit without saving?';
  };
}

var router = new external__events_["EventEmitter"]();
var index_history = typeof window !== "undefined" ? createHashHistory_default()() : undefined; // enable pre rendering

var index__ref = Object(preact_min["h"])(containers_Home_Home, { path: '/' });

var index__ref2 = Object(preact_min["h"])(containers_Game_Game, { path: '/game' });

var index__ref3 = Object(preact_min["h"])(containers_SavesEditor_SavesEditor, { path: '/saves-editor' });

var index__ref4 = Object(preact_min["h"])(containers_NotFound_NotFound, { 'default': true });

var index_App = function (_Component) {
  index__inherits(App, _Component);

  function App(props) {
    index__classCallCheck(this, App);

    return index__possibleConstructorReturn(this, _Component.call(this));
  }

  App.prototype.render = function render() {
    return Object(preact_min["h"])(
      'main',
      null,
      Object(preact_min["h"])(
        preact_router_es,
        { history: index_history, onChange: router.emit('change') },
        index__ref,
        index__ref2,
        index__ref3,
        index__ref4
      )
    );
  };

  return App;
}(preact_min["Component"]);



/***/ }),

/***/ "KSGD":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__("Q4WQ")();
}

/***/ }),

/***/ "Kfb6":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "LGuY":
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "Q4WQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__("e6+Q");
var invariant = __webpack_require__("cxPT");
var ReactPropTypesSecret = __webpack_require__("gt/O");

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),

/***/ "Quol":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deselectCurrent = __webpack_require__("92I6");

var defaultMessage = 'Copy to clipboard: #{key}, Enter';

function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? '⌘' : 'Ctrl') + '+C';
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function copy(text, options) {
  var debug,
      message,
      reselectPrevious,
      range,
      selection,
      mark,
      success = false;
  if (!options) {
    options = {};
  }
  debug = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement('span');
    mark.textContent = text;
    // reset user styles for span element
    mark.style.all = 'unset';
    // prevents scrolling to the end of the page
    mark.style.position = 'fixed';
    mark.style.top = 0;
    mark.style.clip = 'rect(0, 0, 0, 0)';
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = 'pre';
    // do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = 'text';
    mark.style.MozUserSelect = 'text';
    mark.style.msUserSelect = 'text';
    mark.style.userSelect = 'text';

    document.body.appendChild(mark);

    range.selectNode(mark);
    selection.addRange(range);

    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
    success = true;
  } catch (err) {
    debug && console.error('unable to copy using execCommand: ', err);
    debug && console.warn('trying IE specific stuff');
    try {
      window.clipboardData.setData('text', text);
      success = true;
    } catch (err) {
      debug && console.error('unable to copy using clipboardData: ', err);
      debug && console.error('falling back to prompt');
      message = format('message' in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == 'function') {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }

  return success;
}

module.exports = copy;

/***/ }),

/***/ "Trj0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function warning() {};

if (__DEV__) {
  warning = function warning(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.length < 10 || /^[s\W]*$/.test(format)) {
      throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    }
  };
}

module.exports = warning;

/***/ }),

/***/ "Wpbd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash = void 0;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ __webpack_exports__["default"] = (resolvePathname);

/***/ }),

/***/ "XR4d":
/***/ (function(module, exports, __webpack_require__) {

// THIS FILE IS AUTO GENERATED
var _require = __webpack_require__("5sBB"),
    GenIcon = _require.GenIcon;

module.exports.FaDesktop = function (props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 576 512" }, "child": [{ "tag": "path", "attr": { "d": "M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z" } }] })(props);
};
module.exports.FaPause = function (props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z" } }] })(props);
};
module.exports.FaPlay = function (props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" } }] })(props);
};
module.exports.FaSave = function (props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z" } }] })(props);
};
module.exports.FaPaperPlane = function (props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z" } }] })(props);
};
module.exports.FaPlane = function (props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 576 512" }, "child": [{ "tag": "path", "attr": { "d": "M480 192H365.71L260.61 8.06A16.014 16.014 0 0 0 246.71 0h-65.5c-10.63 0-18.3 10.17-15.38 20.39L214.86 192H112l-43.2-57.6c-3.02-4.03-7.77-6.4-12.8-6.4H16.01C5.6 128-2.04 137.78.49 147.88L32 256 .49 364.12C-2.04 374.22 5.6 384 16.01 384H56c5.04 0 9.78-2.37 12.8-6.4L112 320h102.86l-49.03 171.6c-2.92 10.22 4.75 20.4 15.38 20.4h65.5c5.74 0 11.04-3.08 13.89-8.06L365.71 320H480c35.35 0 96-28.65 96-64s-60.65-64-96-64z" } }] })(props);
};
module.exports.FaCommentDots = function (props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" } }] })(props);
};
module.exports.FaCogs = function (props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 640 512" }, "child": [{ "tag": "path", "attr": { "d": "M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9.4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9.1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z" } }] })(props);
};
module.exports.FaInfo = function (props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 192 512" }, "child": [{ "tag": "path", "attr": { "d": "M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z" } }] })(props);
};
module.exports.FaCompress = function (props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M436 192H312c-13.3 0-24-10.7-24-24V44c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24V44c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300V344c0-13.3-10.7-24-24-24H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12H312c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z" } }] })(props);
};
module.exports.FaCog = function (props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M444.788 291.1l42.616 24.599c4.867 2.809 7.126 8.618 5.459 13.985-11.07 35.642-29.97 67.842-54.689 94.586a12.016 12.016 0 0 1-14.832 2.254l-42.584-24.595a191.577 191.577 0 0 1-60.759 35.13v49.182a12.01 12.01 0 0 1-9.377 11.718c-34.956 7.85-72.499 8.256-109.219.007-5.49-1.233-9.403-6.096-9.403-11.723v-49.184a191.555 191.555 0 0 1-60.759-35.13l-42.584 24.595a12.016 12.016 0 0 1-14.832-2.254c-24.718-26.744-43.619-58.944-54.689-94.586-1.667-5.366.592-11.175 5.459-13.985L67.212 291.1a193.48 193.48 0 0 1 0-70.199l-42.616-24.599c-4.867-2.809-7.126-8.618-5.459-13.985 11.07-35.642 29.97-67.842 54.689-94.586a12.016 12.016 0 0 1 14.832-2.254l42.584 24.595a191.577 191.577 0 0 1 60.759-35.13V25.759a12.01 12.01 0 0 1 9.377-11.718c34.956-7.85 72.499-8.256 109.219-.007 5.49 1.233 9.403 6.096 9.403 11.723v49.184a191.555 191.555 0 0 1 60.759 35.13l42.584-24.595a12.016 12.016 0 0 1 14.832 2.254c24.718 26.744 43.619 58.944 54.689 94.586 1.667 5.366-.592 11.175-5.459 13.985L444.788 220.9a193.485 193.485 0 0 1 0 70.2zM336 256c0-44.112-35.888-80-80-80s-80 35.888-80 80 35.888 80 80 80 80-35.888 80-80z" } }] })(props);
};
module.exports.FaSpinner = function (props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" } }] })(props);
};

/***/ }),

/***/ "XcBC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyToClipboard = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__("AX2D");

var _react2 = _interopRequireDefault(_react);

var _copyToClipboard = __webpack_require__("Quol");

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CopyToClipboard = exports.CopyToClipboard = function (_React$PureComponent) {
  _inherits(CopyToClipboard, _React$PureComponent);

  function CopyToClipboard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CopyToClipboard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CopyToClipboard.__proto__ || Object.getPrototypeOf(CopyToClipboard)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (event) {
      var _this$props = _this.props,
          text = _this$props.text,
          onCopy = _this$props.onCopy,
          children = _this$props.children,
          options = _this$props.options;

      var elem = _react2.default.Children.only(children);

      var result = (0, _copyToClipboard2.default)(text, options);

      if (onCopy) {
        onCopy(text, result);
      }

      // Bypass onClick if it was present
      if (elem && elem.props && typeof elem.props.onClick === 'function') {
        elem.props.onClick(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CopyToClipboard, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _text = _props.text,
          _onCopy = _props.onCopy,
          _options = _props.options,
          children = _props.children,
          props = _objectWithoutProperties(_props, ['text', 'onCopy', 'options', 'children']);

      var elem = _react2.default.Children.only(children);

      return _react2.default.cloneElement(elem, _extends({}, props, { onClick: this.onClick }));
    }
  }]);

  return CopyToClipboard;
}(_react2.default.PureComponent);

CopyToClipboard.defaultProps = {
  onCopy: undefined,
  options: undefined
};

/***/ }),

/***/ "aD0H":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = "production";

var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/***/ }),

/***/ "cxPT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ "e6+Q":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ "ebug":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("AX2D");
exports.DefaultContext = {
    color: undefined,
    size: undefined,
    className: undefined,
    style: undefined,
    attr: undefined
};
exports.IconContext = React.createContext && React.createContext(exports.DefaultContext);

/***/ }),

/***/ "gt/O":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),

/***/ "kjbi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _warning = __webpack_require__("Trj0");

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__("aD0H");

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__("xIPz");

var _PathUtils = __webpack_require__("Izpu");

var _createTransitionManager = __webpack_require__("tqq1");

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = __webpack_require__("zFGm");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var HashChangeEvent = 'hashchange';

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + (0, _PathUtils.stripLeadingSlash)(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: _PathUtils.stripLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  },
  slash: {
    encodePath: _PathUtils.addLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  }
};

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var createHashHistory = function createHashHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(_DOMUtils.canUseDOM, 'Hash history needs a DOM');

  var globalHistory = window.history;
  var canGoWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();

  var _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$hashType = props.hashType,
      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;

  var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : '';

  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  var getDOMLocation = function getDOMLocation() {
    var path = decodePath(getHashPath());

    (0, _warning2.default)(!basename || (0, _PathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = (0, _PathUtils.stripBasename)(path, basename);

    return (0, _LocationUtils.createLocation)(path);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var forceNextPop = false;
  var ignorePath = null;

  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;

      if (!forceNextPop && (0, _LocationUtils.locationsAreEqual)(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === (0, _PathUtils.createPath)(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;

      handlePop(location);
    }
  };

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(toLocation));

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(fromLocation));

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  // Ensure the hash is encoded properly before doing anything else.
  var path = getHashPath();
  var encodedPath = encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  var initialLocation = getDOMLocation();
  var allPaths = [(0, _PathUtils.createPath)(initialLocation)];

  // Public interface

  var createHref = function createHref(location) {
    return '#' + encodePath(basename + (0, _PathUtils.createPath)(location));
  };

  var push = function push(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot push state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);

        var prevIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

        nextPaths.push(path);
        allPaths = nextPaths;

        setState({ action: action, location: location });
      } else {
        (0, _warning2.default)(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');

        setState();
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot replace state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf((0, _PathUtils.createPath)(history.location));

      if (prevIndex !== -1) allPaths[prevIndex] = path;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    (0, _warning2.default)(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');

    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createHashHistory;

/***/ }),

/***/ "lDdF":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || function (view) {
	"use strict";
	// IE <10 is explicitly unsupported

	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var doc = view.document
	// only get URL when necessary in case Blob.js hasn't overridden it yet
	,
	    get_URL = function get_URL() {
		return view.URL || view.webkitURL || view;
	},
	    save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
	    can_use_save_link = "download" in save_link,
	    click = function click(node) {
		var event = new MouseEvent("click");
		node.dispatchEvent(event);
	},
	    is_safari = /constructor/i.test(view.HTMLElement) || view.safari,
	    is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
	    throw_outside = function throw_outside(ex) {
		(view.setImmediate || view.setTimeout)(function () {
			throw ex;
		}, 0);
	},
	    force_saveable_type = "application/octet-stream"
	// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
	,
	    arbitrary_revoke_timeout = 1000 * 40 // in ms
	,
	    revoke = function revoke(file) {
		var revoker = function revoker() {
			if (typeof file === "string") {
				// file is an object URL
				get_URL().revokeObjectURL(file);
			} else {
				// file is a File
				file.remove();
			}
		};
		setTimeout(revoker, arbitrary_revoke_timeout);
	},
	    dispatch = function dispatch(filesaver, event_types, event) {
		event_types = [].concat(event_types);
		var i = event_types.length;
		while (i--) {
			var listener = filesaver["on" + event_types[i]];
			if (typeof listener === "function") {
				try {
					listener.call(filesaver, event || filesaver);
				} catch (ex) {
					throw_outside(ex);
				}
			}
		}
	},
	    auto_bom = function auto_bom(blob) {
		// prepend BOM for UTF-8 XML and text/* types (including HTML)
		// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
		if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
			return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
		}
		return blob;
	},
	    FileSaver = function FileSaver(blob, name, no_auto_bom) {
		if (!no_auto_bom) {
			blob = auto_bom(blob);
		}
		// First try a.download, then web filesystem, then object URLs
		var filesaver = this,
		    type = blob.type,
		    force = type === force_saveable_type,
		    object_url,
		    dispatch_all = function dispatch_all() {
			dispatch(filesaver, "writestart progress write writeend".split(" "));
		}
		// on any filesys errors revert to saving with object URLs
		,
		    fs_error = function fs_error() {
			if ((is_chrome_ios || force && is_safari) && view.FileReader) {
				// Safari doesn't allow downloading of blob urls
				var reader = new FileReader();
				reader.onloadend = function () {
					var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
					var popup = view.open(url, '_blank');
					if (!popup) view.location.href = url;
					url = undefined; // release reference before dispatching
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
				};
				reader.readAsDataURL(blob);
				filesaver.readyState = filesaver.INIT;
				return;
			}
			// don't create more object URLs than needed
			if (!object_url) {
				object_url = get_URL().createObjectURL(blob);
			}
			if (force) {
				view.location.href = object_url;
			} else {
				var opened = view.open(object_url, "_blank");
				if (!opened) {
					// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
					view.location.href = object_url;
				}
			}
			filesaver.readyState = filesaver.DONE;
			dispatch_all();
			revoke(object_url);
		};
		filesaver.readyState = filesaver.INIT;

		if (can_use_save_link) {
			object_url = get_URL().createObjectURL(blob);
			setTimeout(function () {
				save_link.href = object_url;
				save_link.download = name;
				click(save_link);
				dispatch_all();
				revoke(object_url);
				filesaver.readyState = filesaver.DONE;
			});
			return;
		}

		fs_error();
	},
	    FS_proto = FileSaver.prototype,
	    saveAs = function saveAs(blob, name, no_auto_bom) {
		return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
	};
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function (blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function () {};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;

	return saveAs;
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content);
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
	module.exports.saveAs = saveAs;
} else if ("function" !== "undefined" && __webpack_require__("LGuY") !== null && __webpack_require__("nErl") !== null) {
	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
		return saveAs;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

/***/ }),

/***/ "nErl":
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),

/***/ "rcWw":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"GameMetaControls":"GameMetaControls__3Y5UT"};

/***/ }),

/***/ "sQ20":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__("XcBC"),
    CopyToClipboard = _require.CopyToClipboard;

CopyToClipboard.CopyToClipboard = CopyToClipboard;
module.exports = CopyToClipboard;

/***/ }),

/***/ "sjZI":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "tqq1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _warning = __webpack_require__("Trj0");

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time');

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message');

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

exports.default = createTransitionManager;

/***/ }),

/***/ "wdpN":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "xIPz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.locationsAreEqual = exports.createLocation = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _resolvePathname = __webpack_require__("Wpbd");

var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

var _valueEqual = __webpack_require__("FKtm");

var _valueEqual2 = _interopRequireDefault(_valueEqual);

var _PathUtils = __webpack_require__("Izpu");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = (0, _PathUtils.parsePath)(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && (0, _valueEqual2.default)(a.state, b.state);
};

/***/ }),

/***/ "ybWk":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"Settings":"Settings__1fN59"};

/***/ }),

/***/ "zFGm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map
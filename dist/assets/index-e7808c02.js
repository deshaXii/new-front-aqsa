function Bd(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const o = Object.getOwnPropertyDescriptor(r, l);
          o &&
            Object.defineProperty(
              e,
              l,
              o.get ? o : { enumerable: !0, get: () => r[l] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const o = {};
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : l.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = n(l);
    fetch(l.href, o);
  }
})();
function es(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ma = { exports: {} },
  Kl = {},
  Ba = { exports: {} },
  D = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Rr = Symbol.for("react.element"),
  $d = Symbol.for("react.portal"),
  Vd = Symbol.for("react.fragment"),
  Wd = Symbol.for("react.strict_mode"),
  Hd = Symbol.for("react.profiler"),
  Qd = Symbol.for("react.provider"),
  Kd = Symbol.for("react.context"),
  Jd = Symbol.for("react.forward_ref"),
  qd = Symbol.for("react.suspense"),
  Xd = Symbol.for("react.memo"),
  Gd = Symbol.for("react.lazy"),
  iu = Symbol.iterator;
function Yd(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (iu && e[iu]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var $a = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Va = Object.assign,
  Wa = {};
function Cn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Wa),
    (this.updater = n || $a);
}
Cn.prototype.isReactComponent = {};
Cn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Cn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Ha() {}
Ha.prototype = Cn.prototype;
function ts(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Wa),
    (this.updater = n || $a);
}
var ns = (ts.prototype = new Ha());
ns.constructor = ts;
Va(ns, Cn.prototype);
ns.isPureReactComponent = !0;
var su = Array.isArray,
  Qa = Object.prototype.hasOwnProperty,
  rs = { current: null },
  Ka = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ja(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      Qa.call(t, r) && !Ka.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var u = Array(s), a = 0; a < s; a++) u[a] = arguments[a + 2];
    l.children = u;
  }
  if (e && e.defaultProps)
    for (r in ((s = e.defaultProps), s)) l[r] === void 0 && (l[r] = s[r]);
  return {
    $$typeof: Rr,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: rs.current,
  };
}
function Zd(e, t) {
  return {
    $$typeof: Rr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function ls(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Rr;
}
function bd(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var uu = /\/+/g;
function xo(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? bd("" + e.key)
    : t.toString(36);
}
function el(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Rr:
          case $d:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (l = l(i)),
      (e = r === "" ? "." + xo(i, 0) : r),
      su(l)
        ? ((n = ""),
          e != null && (n = e.replace(uu, "$&/") + "/"),
          el(l, t, n, "", function (a) {
            return a;
          }))
        : l != null &&
          (ls(l) &&
            (l = Zd(
              l,
              n +
                (!l.key || (i && i.key === l.key)
                  ? ""
                  : ("" + l.key).replace(uu, "$&/") + "/") +
                e
            )),
          t.push(l)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), su(e)))
    for (var s = 0; s < e.length; s++) {
      o = e[s];
      var u = r + xo(o, s);
      i += el(o, t, n, u, l);
    }
  else if (((u = Yd(e)), typeof u == "function"))
    for (e = u.call(e), s = 0; !(o = e.next()).done; )
      (o = o.value), (u = r + xo(o, s++)), (i += el(o, t, n, u, l));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return i;
}
function Fr(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    el(e, r, "", "", function (o) {
      return t.call(n, o, l++);
    }),
    r
  );
}
function ep(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var he = { current: null },
  tl = { transition: null },
  tp = {
    ReactCurrentDispatcher: he,
    ReactCurrentBatchConfig: tl,
    ReactCurrentOwner: rs,
  };
function qa() {
  throw Error("act(...) is not supported in production builds of React.");
}
D.Children = {
  map: Fr,
  forEach: function (e, t, n) {
    Fr(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Fr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Fr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!ls(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
D.Component = Cn;
D.Fragment = Vd;
D.Profiler = Hd;
D.PureComponent = ts;
D.StrictMode = Wd;
D.Suspense = qd;
D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tp;
D.act = qa;
D.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Va({}, e.props),
    l = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = rs.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (u in t)
      Qa.call(t, u) &&
        !Ka.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var a = 0; a < u; a++) s[a] = arguments[a + 2];
    r.children = s;
  }
  return { $$typeof: Rr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
D.createContext = function (e) {
  return (
    (e = {
      $$typeof: Kd,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Qd, _context: e }),
    (e.Consumer = e)
  );
};
D.createElement = Ja;
D.createFactory = function (e) {
  var t = Ja.bind(null, e);
  return (t.type = e), t;
};
D.createRef = function () {
  return { current: null };
};
D.forwardRef = function (e) {
  return { $$typeof: Jd, render: e };
};
D.isValidElement = ls;
D.lazy = function (e) {
  return { $$typeof: Gd, _payload: { _status: -1, _result: e }, _init: ep };
};
D.memo = function (e, t) {
  return { $$typeof: Xd, type: e, compare: t === void 0 ? null : t };
};
D.startTransition = function (e) {
  var t = tl.transition;
  tl.transition = {};
  try {
    e();
  } finally {
    tl.transition = t;
  }
};
D.unstable_act = qa;
D.useCallback = function (e, t) {
  return he.current.useCallback(e, t);
};
D.useContext = function (e) {
  return he.current.useContext(e);
};
D.useDebugValue = function () {};
D.useDeferredValue = function (e) {
  return he.current.useDeferredValue(e);
};
D.useEffect = function (e, t) {
  return he.current.useEffect(e, t);
};
D.useId = function () {
  return he.current.useId();
};
D.useImperativeHandle = function (e, t, n) {
  return he.current.useImperativeHandle(e, t, n);
};
D.useInsertionEffect = function (e, t) {
  return he.current.useInsertionEffect(e, t);
};
D.useLayoutEffect = function (e, t) {
  return he.current.useLayoutEffect(e, t);
};
D.useMemo = function (e, t) {
  return he.current.useMemo(e, t);
};
D.useReducer = function (e, t, n) {
  return he.current.useReducer(e, t, n);
};
D.useRef = function (e) {
  return he.current.useRef(e);
};
D.useState = function (e) {
  return he.current.useState(e);
};
D.useSyncExternalStore = function (e, t, n) {
  return he.current.useSyncExternalStore(e, t, n);
};
D.useTransition = function () {
  return he.current.useTransition();
};
D.version = "18.3.1";
Ba.exports = D;
var k = Ba.exports;
const Xa = es(k),
  np = Bd({ __proto__: null, default: Xa }, [k]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var rp = k,
  lp = Symbol.for("react.element"),
  op = Symbol.for("react.fragment"),
  ip = Object.prototype.hasOwnProperty,
  sp = rp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  up = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ga(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
  for (r in t) ip.call(t, r) && !up.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: lp,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: sp.current,
  };
}
Kl.Fragment = op;
Kl.jsx = Ga;
Kl.jsxs = Ga;
Ma.exports = Kl;
var y = Ma.exports,
  Zo = {},
  Ya = { exports: {} },
  Re = {},
  Za = { exports: {} },
  ba = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(j, L) {
    var z = j.length;
    j.push(L);
    e: for (; 0 < z; ) {
      var J = (z - 1) >>> 1,
        ee = j[J];
      if (0 < l(ee, L)) (j[J] = L), (j[z] = ee), (z = J);
      else break e;
    }
  }
  function n(j) {
    return j.length === 0 ? null : j[0];
  }
  function r(j) {
    if (j.length === 0) return null;
    var L = j[0],
      z = j.pop();
    if (z !== L) {
      j[0] = z;
      e: for (var J = 0, ee = j.length, Ar = ee >>> 1; J < Ar; ) {
        var Tt = 2 * (J + 1) - 1,
          So = j[Tt],
          Ot = Tt + 1,
          Ir = j[Ot];
        if (0 > l(So, z))
          Ot < ee && 0 > l(Ir, So)
            ? ((j[J] = Ir), (j[Ot] = z), (J = Ot))
            : ((j[J] = So), (j[Tt] = z), (J = Tt));
        else if (Ot < ee && 0 > l(Ir, z)) (j[J] = Ir), (j[Ot] = z), (J = Ot);
        else break e;
      }
    }
    return L;
  }
  function l(j, L) {
    var z = j.sortIndex - L.sortIndex;
    return z !== 0 ? z : j.id - L.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var i = Date,
      s = i.now();
    e.unstable_now = function () {
      return i.now() - s;
    };
  }
  var u = [],
    a = [],
    c = 1,
    f = null,
    m = 3,
    S = !1,
    g = !1,
    v = !1,
    x = typeof setTimeout == "function" ? setTimeout : null,
    p = typeof clearTimeout == "function" ? clearTimeout : null,
    d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(j) {
    for (var L = n(a); L !== null; ) {
      if (L.callback === null) r(a);
      else if (L.startTime <= j)
        r(a), (L.sortIndex = L.expirationTime), t(u, L);
      else break;
      L = n(a);
    }
  }
  function E(j) {
    if (((v = !1), h(j), !g))
      if (n(u) !== null) (g = !0), vo(N);
      else {
        var L = n(a);
        L !== null && wo(E, L.startTime - j);
      }
  }
  function N(j, L) {
    (g = !1), v && ((v = !1), p(T), (T = -1)), (S = !0);
    var z = m;
    try {
      for (
        h(L), f = n(u);
        f !== null && (!(f.expirationTime > L) || (j && !De()));

      ) {
        var J = f.callback;
        if (typeof J == "function") {
          (f.callback = null), (m = f.priorityLevel);
          var ee = J(f.expirationTime <= L);
          (L = e.unstable_now()),
            typeof ee == "function" ? (f.callback = ee) : f === n(u) && r(u),
            h(L);
        } else r(u);
        f = n(u);
      }
      if (f !== null) var Ar = !0;
      else {
        var Tt = n(a);
        Tt !== null && wo(E, Tt.startTime - L), (Ar = !1);
      }
      return Ar;
    } finally {
      (f = null), (m = z), (S = !1);
    }
  }
  var R = !1,
    P = null,
    T = -1,
    $ = 5,
    A = -1;
  function De() {
    return !(e.unstable_now() - A < $);
  }
  function An() {
    if (P !== null) {
      var j = e.unstable_now();
      A = j;
      var L = !0;
      try {
        L = P(!0, j);
      } finally {
        L ? In() : ((R = !1), (P = null));
      }
    } else R = !1;
  }
  var In;
  if (typeof d == "function")
    In = function () {
      d(An);
    };
  else if (typeof MessageChannel < "u") {
    var ou = new MessageChannel(),
      Md = ou.port2;
    (ou.port1.onmessage = An),
      (In = function () {
        Md.postMessage(null);
      });
  } else
    In = function () {
      x(An, 0);
    };
  function vo(j) {
    (P = j), R || ((R = !0), In());
  }
  function wo(j, L) {
    T = x(function () {
      j(e.unstable_now());
    }, L);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (j) {
      j.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      g || S || ((g = !0), vo(N));
    }),
    (e.unstable_forceFrameRate = function (j) {
      0 > j || 125 < j
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : ($ = 0 < j ? Math.floor(1e3 / j) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (j) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = m;
      }
      var z = m;
      m = L;
      try {
        return j();
      } finally {
        m = z;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (j, L) {
      switch (j) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          j = 3;
      }
      var z = m;
      m = j;
      try {
        return L();
      } finally {
        m = z;
      }
    }),
    (e.unstable_scheduleCallback = function (j, L, z) {
      var J = e.unstable_now();
      switch (
        (typeof z == "object" && z !== null
          ? ((z = z.delay), (z = typeof z == "number" && 0 < z ? J + z : J))
          : (z = J),
        j)
      ) {
        case 1:
          var ee = -1;
          break;
        case 2:
          ee = 250;
          break;
        case 5:
          ee = 1073741823;
          break;
        case 4:
          ee = 1e4;
          break;
        default:
          ee = 5e3;
      }
      return (
        (ee = z + ee),
        (j = {
          id: c++,
          callback: L,
          priorityLevel: j,
          startTime: z,
          expirationTime: ee,
          sortIndex: -1,
        }),
        z > J
          ? ((j.sortIndex = z),
            t(a, j),
            n(u) === null &&
              j === n(a) &&
              (v ? (p(T), (T = -1)) : (v = !0), wo(E, z - J)))
          : ((j.sortIndex = ee), t(u, j), g || S || ((g = !0), vo(N))),
        j
      );
    }),
    (e.unstable_shouldYield = De),
    (e.unstable_wrapCallback = function (j) {
      var L = m;
      return function () {
        var z = m;
        m = L;
        try {
          return j.apply(this, arguments);
        } finally {
          m = z;
        }
      };
    });
})(ba);
Za.exports = ba;
var ap = Za.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var cp = k,
  Ne = ap;
function C(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var ec = new Set(),
  or = {};
function qt(e, t) {
  yn(e, t), yn(e + "Capture", t);
}
function yn(e, t) {
  for (or[e] = t, e = 0; e < t.length; e++) ec.add(t[e]);
}
var tt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  bo = Object.prototype.hasOwnProperty,
  fp =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  au = {},
  cu = {};
function dp(e) {
  return bo.call(cu, e)
    ? !0
    : bo.call(au, e)
    ? !1
    : fp.test(e)
    ? (cu[e] = !0)
    : ((au[e] = !0), !1);
}
function pp(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function hp(e, t, n, r) {
  if (t === null || typeof t > "u" || pp(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function me(e, t, n, r, l, o, i) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i);
}
var oe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    oe[e] = new me(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  oe[t] = new me(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  oe[e] = new me(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  oe[e] = new me(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    oe[e] = new me(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  oe[e] = new me(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  oe[e] = new me(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  oe[e] = new me(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  oe[e] = new me(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var os = /[\-:]([a-z])/g;
function is(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(os, is);
    oe[t] = new me(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(os, is);
    oe[t] = new me(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(os, is);
  oe[t] = new me(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  oe[e] = new me(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
oe.xlinkHref = new me(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  oe[e] = new me(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ss(e, t, n, r) {
  var l = oe.hasOwnProperty(t) ? oe[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (hp(t, n, l, r) && (n = null),
    r || l === null
      ? dp(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
      ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
      : ((t = l.attributeName),
        (r = l.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((l = l.type),
            (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var ot = cp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Ur = Symbol.for("react.element"),
  Yt = Symbol.for("react.portal"),
  Zt = Symbol.for("react.fragment"),
  us = Symbol.for("react.strict_mode"),
  ei = Symbol.for("react.profiler"),
  tc = Symbol.for("react.provider"),
  nc = Symbol.for("react.context"),
  as = Symbol.for("react.forward_ref"),
  ti = Symbol.for("react.suspense"),
  ni = Symbol.for("react.suspense_list"),
  cs = Symbol.for("react.memo"),
  ut = Symbol.for("react.lazy"),
  rc = Symbol.for("react.offscreen"),
  fu = Symbol.iterator;
function Fn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (fu && e[fu]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Q = Object.assign,
  Eo;
function Kn(e) {
  if (Eo === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Eo = (t && t[1]) || "";
    }
  return (
    `
` +
    Eo +
    e
  );
}
var ko = !1;
function Co(e, t) {
  if (!e || ko) return "";
  ko = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (a) {
          var r = a;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (a) {
          r = a;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (a) {
        r = a;
      }
      e();
    }
  } catch (a) {
    if (a && r && typeof a.stack == "string") {
      for (
        var l = a.stack.split(`
`),
          o = r.stack.split(`
`),
          i = l.length - 1,
          s = o.length - 1;
        1 <= i && 0 <= s && l[i] !== o[s];

      )
        s--;
      for (; 1 <= i && 0 <= s; i--, s--)
        if (l[i] !== o[s]) {
          if (i !== 1 || s !== 1)
            do
              if ((i--, s--, 0 > s || l[i] !== o[s])) {
                var u =
                  `
` + l[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    u.includes("<anonymous>") &&
                    (u = u.replace("<anonymous>", e.displayName)),
                  u
                );
              }
            while (1 <= i && 0 <= s);
          break;
        }
    }
  } finally {
    (ko = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Kn(e) : "";
}
function mp(e) {
  switch (e.tag) {
    case 5:
      return Kn(e.type);
    case 16:
      return Kn("Lazy");
    case 13:
      return Kn("Suspense");
    case 19:
      return Kn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Co(e.type, !1)), e;
    case 11:
      return (e = Co(e.type.render, !1)), e;
    case 1:
      return (e = Co(e.type, !0)), e;
    default:
      return "";
  }
}
function ri(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Zt:
      return "Fragment";
    case Yt:
      return "Portal";
    case ei:
      return "Profiler";
    case us:
      return "StrictMode";
    case ti:
      return "Suspense";
    case ni:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case nc:
        return (e.displayName || "Context") + ".Consumer";
      case tc:
        return (e._context.displayName || "Context") + ".Provider";
      case as:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case cs:
        return (
          (t = e.displayName || null), t !== null ? t : ri(e.type) || "Memo"
        );
      case ut:
        (t = e._payload), (e = e._init);
        try {
          return ri(e(t));
        } catch {}
    }
  return null;
}
function yp(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return ri(t);
    case 8:
      return t === us ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Ct(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function lc(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function gp(e) {
  var t = lc(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (i) {
          (r = "" + i), o.call(this, i);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = "" + i;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Mr(e) {
  e._valueTracker || (e._valueTracker = gp(e));
}
function oc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = lc(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function yl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function li(e, t) {
  var n = t.checked;
  return Q({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function du(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Ct(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function ic(e, t) {
  (t = t.checked), t != null && ss(e, "checked", t, !1);
}
function oi(e, t) {
  ic(e, t);
  var n = Ct(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? ii(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && ii(e, t.type, Ct(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function pu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function ii(e, t, n) {
  (t !== "number" || yl(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Jn = Array.isArray;
function cn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Ct(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function si(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(C(91));
  return Q({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function hu(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(C(92));
      if (Jn(n)) {
        if (1 < n.length) throw Error(C(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Ct(n) };
}
function sc(e, t) {
  var n = Ct(t.value),
    r = Ct(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function mu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function uc(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ui(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? uc(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var Br,
  ac = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Br = Br || document.createElement("div"),
          Br.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Br.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function ir(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Gn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  vp = ["Webkit", "ms", "Moz", "O"];
Object.keys(Gn).forEach(function (e) {
  vp.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Gn[t] = Gn[e]);
  });
});
function cc(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Gn.hasOwnProperty(e) && Gn[e])
    ? ("" + t).trim()
    : t + "px";
}
function fc(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = cc(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var wp = Q(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function ai(e, t) {
  if (t) {
    if (wp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(C(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(C(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(C(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(C(62));
  }
}
function ci(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var fi = null;
function fs(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var di = null,
  fn = null,
  dn = null;
function yu(e) {
  if ((e = jr(e))) {
    if (typeof di != "function") throw Error(C(280));
    var t = e.stateNode;
    t && ((t = Yl(t)), di(e.stateNode, e.type, t));
  }
}
function dc(e) {
  fn ? (dn ? dn.push(e) : (dn = [e])) : (fn = e);
}
function pc() {
  if (fn) {
    var e = fn,
      t = dn;
    if (((dn = fn = null), yu(e), t)) for (e = 0; e < t.length; e++) yu(t[e]);
  }
}
function hc(e, t) {
  return e(t);
}
function mc() {}
var No = !1;
function yc(e, t, n) {
  if (No) return e(t, n);
  No = !0;
  try {
    return hc(e, t, n);
  } finally {
    (No = !1), (fn !== null || dn !== null) && (mc(), pc());
  }
}
function sr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Yl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(C(231, t, typeof n));
  return n;
}
var pi = !1;
if (tt)
  try {
    var Un = {};
    Object.defineProperty(Un, "passive", {
      get: function () {
        pi = !0;
      },
    }),
      window.addEventListener("test", Un, Un),
      window.removeEventListener("test", Un, Un);
  } catch {
    pi = !1;
  }
function Sp(e, t, n, r, l, o, i, s, u) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, a);
  } catch (c) {
    this.onError(c);
  }
}
var Yn = !1,
  gl = null,
  vl = !1,
  hi = null,
  xp = {
    onError: function (e) {
      (Yn = !0), (gl = e);
    },
  };
function Ep(e, t, n, r, l, o, i, s, u) {
  (Yn = !1), (gl = null), Sp.apply(xp, arguments);
}
function kp(e, t, n, r, l, o, i, s, u) {
  if ((Ep.apply(this, arguments), Yn)) {
    if (Yn) {
      var a = gl;
      (Yn = !1), (gl = null);
    } else throw Error(C(198));
    vl || ((vl = !0), (hi = a));
  }
}
function Xt(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function gc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function gu(e) {
  if (Xt(e) !== e) throw Error(C(188));
}
function Cp(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Xt(e)), t === null)) throw Error(C(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return gu(l), e;
        if (o === r) return gu(l), t;
        o = o.sibling;
      }
      throw Error(C(188));
    }
    if (n.return !== r.return) (n = l), (r = o);
    else {
      for (var i = !1, s = l.child; s; ) {
        if (s === n) {
          (i = !0), (n = l), (r = o);
          break;
        }
        if (s === r) {
          (i = !0), (r = l), (n = o);
          break;
        }
        s = s.sibling;
      }
      if (!i) {
        for (s = o.child; s; ) {
          if (s === n) {
            (i = !0), (n = o), (r = l);
            break;
          }
          if (s === r) {
            (i = !0), (r = o), (n = l);
            break;
          }
          s = s.sibling;
        }
        if (!i) throw Error(C(189));
      }
    }
    if (n.alternate !== r) throw Error(C(190));
  }
  if (n.tag !== 3) throw Error(C(188));
  return n.stateNode.current === n ? e : t;
}
function vc(e) {
  return (e = Cp(e)), e !== null ? wc(e) : null;
}
function wc(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = wc(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Sc = Ne.unstable_scheduleCallback,
  vu = Ne.unstable_cancelCallback,
  Np = Ne.unstable_shouldYield,
  Rp = Ne.unstable_requestPaint,
  q = Ne.unstable_now,
  _p = Ne.unstable_getCurrentPriorityLevel,
  ds = Ne.unstable_ImmediatePriority,
  xc = Ne.unstable_UserBlockingPriority,
  wl = Ne.unstable_NormalPriority,
  Pp = Ne.unstable_LowPriority,
  Ec = Ne.unstable_IdlePriority,
  Jl = null,
  qe = null;
function jp(e) {
  if (qe && typeof qe.onCommitFiberRoot == "function")
    try {
      qe.onCommitFiberRoot(Jl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Me = Math.clz32 ? Math.clz32 : Lp,
  Tp = Math.log,
  Op = Math.LN2;
function Lp(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Tp(e) / Op) | 0)) | 0;
}
var $r = 64,
  Vr = 4194304;
function qn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Sl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var s = i & ~l;
    s !== 0 ? (r = qn(s)) : ((o &= i), o !== 0 && (r = qn(o)));
  } else (i = n & ~l), i !== 0 ? (r = qn(i)) : o !== 0 && (r = qn(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Me(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function zp(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Dp(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var i = 31 - Me(o),
      s = 1 << i,
      u = l[i];
    u === -1
      ? (!(s & n) || s & r) && (l[i] = zp(s, t))
      : u <= t && (e.expiredLanes |= s),
      (o &= ~s);
  }
}
function mi(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function kc() {
  var e = $r;
  return ($r <<= 1), !($r & 4194240) && ($r = 64), e;
}
function Ro(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function _r(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Me(t)),
    (e[t] = n);
}
function Ap(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Me(n),
      o = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o);
  }
}
function ps(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Me(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var F = 0;
function Cc(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Nc,
  hs,
  Rc,
  _c,
  Pc,
  yi = !1,
  Wr = [],
  mt = null,
  yt = null,
  gt = null,
  ur = new Map(),
  ar = new Map(),
  ct = [],
  Ip =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function wu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      mt = null;
      break;
    case "dragenter":
    case "dragleave":
      yt = null;
      break;
    case "mouseover":
    case "mouseout":
      gt = null;
      break;
    case "pointerover":
    case "pointerout":
      ur.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ar.delete(t.pointerId);
  }
}
function Mn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l],
      }),
      t !== null && ((t = jr(t)), t !== null && hs(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function Fp(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (mt = Mn(mt, e, t, n, r, l)), !0;
    case "dragenter":
      return (yt = Mn(yt, e, t, n, r, l)), !0;
    case "mouseover":
      return (gt = Mn(gt, e, t, n, r, l)), !0;
    case "pointerover":
      var o = l.pointerId;
      return ur.set(o, Mn(ur.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (o = l.pointerId), ar.set(o, Mn(ar.get(o) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function jc(e) {
  var t = Dt(e.target);
  if (t !== null) {
    var n = Xt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = gc(n)), t !== null)) {
          (e.blockedOn = t),
            Pc(e.priority, function () {
              Rc(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function nl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = gi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (fi = r), n.target.dispatchEvent(r), (fi = null);
    } else return (t = jr(n)), t !== null && hs(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Su(e, t, n) {
  nl(e) && n.delete(t);
}
function Up() {
  (yi = !1),
    mt !== null && nl(mt) && (mt = null),
    yt !== null && nl(yt) && (yt = null),
    gt !== null && nl(gt) && (gt = null),
    ur.forEach(Su),
    ar.forEach(Su);
}
function Bn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    yi ||
      ((yi = !0),
      Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority, Up)));
}
function cr(e) {
  function t(l) {
    return Bn(l, e);
  }
  if (0 < Wr.length) {
    Bn(Wr[0], e);
    for (var n = 1; n < Wr.length; n++) {
      var r = Wr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    mt !== null && Bn(mt, e),
      yt !== null && Bn(yt, e),
      gt !== null && Bn(gt, e),
      ur.forEach(t),
      ar.forEach(t),
      n = 0;
    n < ct.length;
    n++
  )
    (r = ct[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ct.length && ((n = ct[0]), n.blockedOn === null); )
    jc(n), n.blockedOn === null && ct.shift();
}
var pn = ot.ReactCurrentBatchConfig,
  xl = !0;
function Mp(e, t, n, r) {
  var l = F,
    o = pn.transition;
  pn.transition = null;
  try {
    (F = 1), ms(e, t, n, r);
  } finally {
    (F = l), (pn.transition = o);
  }
}
function Bp(e, t, n, r) {
  var l = F,
    o = pn.transition;
  pn.transition = null;
  try {
    (F = 4), ms(e, t, n, r);
  } finally {
    (F = l), (pn.transition = o);
  }
}
function ms(e, t, n, r) {
  if (xl) {
    var l = gi(e, t, n, r);
    if (l === null) Io(e, t, r, El, n), wu(e, r);
    else if (Fp(l, e, t, n, r)) r.stopPropagation();
    else if ((wu(e, r), t & 4 && -1 < Ip.indexOf(e))) {
      for (; l !== null; ) {
        var o = jr(l);
        if (
          (o !== null && Nc(o),
          (o = gi(e, t, n, r)),
          o === null && Io(e, t, r, El, n),
          o === l)
        )
          break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Io(e, t, r, null, n);
  }
}
var El = null;
function gi(e, t, n, r) {
  if (((El = null), (e = fs(r)), (e = Dt(e)), e !== null))
    if (((t = Xt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = gc(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (El = e), null;
}
function Tc(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (_p()) {
        case ds:
          return 1;
        case xc:
          return 4;
        case wl:
        case Pp:
          return 16;
        case Ec:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var dt = null,
  ys = null,
  rl = null;
function Oc() {
  if (rl) return rl;
  var e,
    t = ys,
    n = t.length,
    r,
    l = "value" in dt ? dt.value : dt.textContent,
    o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
  return (rl = l.slice(e, 1 < r ? 1 - r : void 0));
}
function ll(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Hr() {
  return !0;
}
function xu() {
  return !1;
}
function _e(e) {
  function t(n, r, l, o, i) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null);
    for (var s in e)
      e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(o) : o[s]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? Hr
        : xu),
      (this.isPropagationStopped = xu),
      this
    );
  }
  return (
    Q(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Hr));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Hr));
      },
      persist: function () {},
      isPersistent: Hr,
    }),
    t
  );
}
var Nn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  gs = _e(Nn),
  Pr = Q({}, Nn, { view: 0, detail: 0 }),
  $p = _e(Pr),
  _o,
  Po,
  $n,
  ql = Q({}, Pr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: vs,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== $n &&
            ($n && e.type === "mousemove"
              ? ((_o = e.screenX - $n.screenX), (Po = e.screenY - $n.screenY))
              : (Po = _o = 0),
            ($n = e)),
          _o);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Po;
    },
  }),
  Eu = _e(ql),
  Vp = Q({}, ql, { dataTransfer: 0 }),
  Wp = _e(Vp),
  Hp = Q({}, Pr, { relatedTarget: 0 }),
  jo = _e(Hp),
  Qp = Q({}, Nn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Kp = _e(Qp),
  Jp = Q({}, Nn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  qp = _e(Jp),
  Xp = Q({}, Nn, { data: 0 }),
  ku = _e(Xp),
  Gp = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Yp = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Zp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function bp(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Zp[e]) ? !!t[e] : !1;
}
function vs() {
  return bp;
}
var eh = Q({}, Pr, {
    key: function (e) {
      if (e.key) {
        var t = Gp[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = ll(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? Yp[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: vs,
    charCode: function (e) {
      return e.type === "keypress" ? ll(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? ll(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  th = _e(eh),
  nh = Q({}, ql, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Cu = _e(nh),
  rh = Q({}, Pr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: vs,
  }),
  lh = _e(rh),
  oh = Q({}, Nn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  ih = _e(oh),
  sh = Q({}, ql, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  uh = _e(sh),
  ah = [9, 13, 27, 32],
  ws = tt && "CompositionEvent" in window,
  Zn = null;
tt && "documentMode" in document && (Zn = document.documentMode);
var ch = tt && "TextEvent" in window && !Zn,
  Lc = tt && (!ws || (Zn && 8 < Zn && 11 >= Zn)),
  Nu = String.fromCharCode(32),
  Ru = !1;
function zc(e, t) {
  switch (e) {
    case "keyup":
      return ah.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Dc(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var bt = !1;
function fh(e, t) {
  switch (e) {
    case "compositionend":
      return Dc(t);
    case "keypress":
      return t.which !== 32 ? null : ((Ru = !0), Nu);
    case "textInput":
      return (e = t.data), e === Nu && Ru ? null : e;
    default:
      return null;
  }
}
function dh(e, t) {
  if (bt)
    return e === "compositionend" || (!ws && zc(e, t))
      ? ((e = Oc()), (rl = ys = dt = null), (bt = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Lc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var ph = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function _u(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!ph[e.type] : t === "textarea";
}
function Ac(e, t, n, r) {
  dc(r),
    (t = kl(t, "onChange")),
    0 < t.length &&
      ((n = new gs("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var bn = null,
  fr = null;
function hh(e) {
  Kc(e, 0);
}
function Xl(e) {
  var t = nn(e);
  if (oc(t)) return e;
}
function mh(e, t) {
  if (e === "change") return t;
}
var Ic = !1;
if (tt) {
  var To;
  if (tt) {
    var Oo = "oninput" in document;
    if (!Oo) {
      var Pu = document.createElement("div");
      Pu.setAttribute("oninput", "return;"),
        (Oo = typeof Pu.oninput == "function");
    }
    To = Oo;
  } else To = !1;
  Ic = To && (!document.documentMode || 9 < document.documentMode);
}
function ju() {
  bn && (bn.detachEvent("onpropertychange", Fc), (fr = bn = null));
}
function Fc(e) {
  if (e.propertyName === "value" && Xl(fr)) {
    var t = [];
    Ac(t, fr, e, fs(e)), yc(hh, t);
  }
}
function yh(e, t, n) {
  e === "focusin"
    ? (ju(), (bn = t), (fr = n), bn.attachEvent("onpropertychange", Fc))
    : e === "focusout" && ju();
}
function gh(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Xl(fr);
}
function vh(e, t) {
  if (e === "click") return Xl(t);
}
function wh(e, t) {
  if (e === "input" || e === "change") return Xl(t);
}
function Sh(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ve = typeof Object.is == "function" ? Object.is : Sh;
function dr(e, t) {
  if (Ve(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!bo.call(t, l) || !Ve(e[l], t[l])) return !1;
  }
  return !0;
}
function Tu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ou(e, t) {
  var n = Tu(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Tu(n);
  }
}
function Uc(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Uc(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Mc() {
  for (var e = window, t = yl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = yl(e.document);
  }
  return t;
}
function Ss(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function xh(e) {
  var t = Mc(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Uc(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Ss(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          o = Math.min(r.start, l);
        (r = r.end === void 0 ? o : Math.min(r.end, l)),
          !e.extend && o > r && ((l = r), (r = o), (o = l)),
          (l = Ou(n, o));
        var i = Ou(n, r);
        l &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var Eh = tt && "documentMode" in document && 11 >= document.documentMode,
  en = null,
  vi = null,
  er = null,
  wi = !1;
function Lu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  wi ||
    en == null ||
    en !== yl(r) ||
    ((r = en),
    "selectionStart" in r && Ss(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (er && dr(er, r)) ||
      ((er = r),
      (r = kl(vi, "onSelect")),
      0 < r.length &&
        ((t = new gs("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = en))));
}
function Qr(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var tn = {
    animationend: Qr("Animation", "AnimationEnd"),
    animationiteration: Qr("Animation", "AnimationIteration"),
    animationstart: Qr("Animation", "AnimationStart"),
    transitionend: Qr("Transition", "TransitionEnd"),
  },
  Lo = {},
  Bc = {};
tt &&
  ((Bc = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete tn.animationend.animation,
    delete tn.animationiteration.animation,
    delete tn.animationstart.animation),
  "TransitionEvent" in window || delete tn.transitionend.transition);
function Gl(e) {
  if (Lo[e]) return Lo[e];
  if (!tn[e]) return e;
  var t = tn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Bc) return (Lo[e] = t[n]);
  return e;
}
var $c = Gl("animationend"),
  Vc = Gl("animationiteration"),
  Wc = Gl("animationstart"),
  Hc = Gl("transitionend"),
  Qc = new Map(),
  zu =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Rt(e, t) {
  Qc.set(e, t), qt(t, [e]);
}
for (var zo = 0; zo < zu.length; zo++) {
  var Do = zu[zo],
    kh = Do.toLowerCase(),
    Ch = Do[0].toUpperCase() + Do.slice(1);
  Rt(kh, "on" + Ch);
}
Rt($c, "onAnimationEnd");
Rt(Vc, "onAnimationIteration");
Rt(Wc, "onAnimationStart");
Rt("dblclick", "onDoubleClick");
Rt("focusin", "onFocus");
Rt("focusout", "onBlur");
Rt(Hc, "onTransitionEnd");
yn("onMouseEnter", ["mouseout", "mouseover"]);
yn("onMouseLeave", ["mouseout", "mouseover"]);
yn("onPointerEnter", ["pointerout", "pointerover"]);
yn("onPointerLeave", ["pointerout", "pointerover"]);
qt(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
qt(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
qt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
qt(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
qt(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
qt(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Xn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  Nh = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xn));
function Du(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), kp(r, t, void 0, e), (e.currentTarget = null);
}
function Kc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var s = r[i],
            u = s.instance,
            a = s.currentTarget;
          if (((s = s.listener), u !== o && l.isPropagationStopped())) break e;
          Du(l, s, a), (o = u);
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((s = r[i]),
            (u = s.instance),
            (a = s.currentTarget),
            (s = s.listener),
            u !== o && l.isPropagationStopped())
          )
            break e;
          Du(l, s, a), (o = u);
        }
    }
  }
  if (vl) throw ((e = hi), (vl = !1), (hi = null), e);
}
function M(e, t) {
  var n = t[Ci];
  n === void 0 && (n = t[Ci] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Jc(t, e, 2, !1), n.add(r));
}
function Ao(e, t, n) {
  var r = 0;
  t && (r |= 4), Jc(n, e, r, t);
}
var Kr = "_reactListening" + Math.random().toString(36).slice(2);
function pr(e) {
  if (!e[Kr]) {
    (e[Kr] = !0),
      ec.forEach(function (n) {
        n !== "selectionchange" && (Nh.has(n) || Ao(n, !1, e), Ao(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Kr] || ((t[Kr] = !0), Ao("selectionchange", !1, t));
  }
}
function Jc(e, t, n, r) {
  switch (Tc(t)) {
    case 1:
      var l = Mp;
      break;
    case 4:
      l = Bp;
      break;
    default:
      l = ms;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !pi ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
      ? e.addEventListener(t, n, { passive: l })
      : e.addEventListener(t, n, !1);
}
function Io(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var s = r.stateNode.containerInfo;
        if (s === l || (s.nodeType === 8 && s.parentNode === l)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var u = i.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = i.stateNode.containerInfo),
              u === l || (u.nodeType === 8 && u.parentNode === l))
            )
              return;
            i = i.return;
          }
        for (; s !== null; ) {
          if (((i = Dt(s)), i === null)) return;
          if (((u = i.tag), u === 5 || u === 6)) {
            r = o = i;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  yc(function () {
    var a = o,
      c = fs(n),
      f = [];
    e: {
      var m = Qc.get(e);
      if (m !== void 0) {
        var S = gs,
          g = e;
        switch (e) {
          case "keypress":
            if (ll(n) === 0) break e;
          case "keydown":
          case "keyup":
            S = th;
            break;
          case "focusin":
            (g = "focus"), (S = jo);
            break;
          case "focusout":
            (g = "blur"), (S = jo);
            break;
          case "beforeblur":
          case "afterblur":
            S = jo;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            S = Eu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            S = Wp;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            S = lh;
            break;
          case $c:
          case Vc:
          case Wc:
            S = Kp;
            break;
          case Hc:
            S = ih;
            break;
          case "scroll":
            S = $p;
            break;
          case "wheel":
            S = uh;
            break;
          case "copy":
          case "cut":
          case "paste":
            S = qp;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            S = Cu;
        }
        var v = (t & 4) !== 0,
          x = !v && e === "scroll",
          p = v ? (m !== null ? m + "Capture" : null) : m;
        v = [];
        for (var d = a, h; d !== null; ) {
          h = d;
          var E = h.stateNode;
          if (
            (h.tag === 5 &&
              E !== null &&
              ((h = E),
              p !== null && ((E = sr(d, p)), E != null && v.push(hr(d, E, h)))),
            x)
          )
            break;
          d = d.return;
        }
        0 < v.length &&
          ((m = new S(m, g, null, n, c)), f.push({ event: m, listeners: v }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((m = e === "mouseover" || e === "pointerover"),
          (S = e === "mouseout" || e === "pointerout"),
          m &&
            n !== fi &&
            (g = n.relatedTarget || n.fromElement) &&
            (Dt(g) || g[nt]))
        )
          break e;
        if (
          (S || m) &&
          ((m =
            c.window === c
              ? c
              : (m = c.ownerDocument)
              ? m.defaultView || m.parentWindow
              : window),
          S
            ? ((g = n.relatedTarget || n.toElement),
              (S = a),
              (g = g ? Dt(g) : null),
              g !== null &&
                ((x = Xt(g)), g !== x || (g.tag !== 5 && g.tag !== 6)) &&
                (g = null))
            : ((S = null), (g = a)),
          S !== g)
        ) {
          if (
            ((v = Eu),
            (E = "onMouseLeave"),
            (p = "onMouseEnter"),
            (d = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((v = Cu),
              (E = "onPointerLeave"),
              (p = "onPointerEnter"),
              (d = "pointer")),
            (x = S == null ? m : nn(S)),
            (h = g == null ? m : nn(g)),
            (m = new v(E, d + "leave", S, n, c)),
            (m.target = x),
            (m.relatedTarget = h),
            (E = null),
            Dt(c) === a &&
              ((v = new v(p, d + "enter", g, n, c)),
              (v.target = h),
              (v.relatedTarget = x),
              (E = v)),
            (x = E),
            S && g)
          )
            t: {
              for (v = S, p = g, d = 0, h = v; h; h = Gt(h)) d++;
              for (h = 0, E = p; E; E = Gt(E)) h++;
              for (; 0 < d - h; ) (v = Gt(v)), d--;
              for (; 0 < h - d; ) (p = Gt(p)), h--;
              for (; d--; ) {
                if (v === p || (p !== null && v === p.alternate)) break t;
                (v = Gt(v)), (p = Gt(p));
              }
              v = null;
            }
          else v = null;
          S !== null && Au(f, m, S, v, !1),
            g !== null && x !== null && Au(f, x, g, v, !0);
        }
      }
      e: {
        if (
          ((m = a ? nn(a) : window),
          (S = m.nodeName && m.nodeName.toLowerCase()),
          S === "select" || (S === "input" && m.type === "file"))
        )
          var N = mh;
        else if (_u(m))
          if (Ic) N = wh;
          else {
            N = gh;
            var R = yh;
          }
        else
          (S = m.nodeName) &&
            S.toLowerCase() === "input" &&
            (m.type === "checkbox" || m.type === "radio") &&
            (N = vh);
        if (N && (N = N(e, a))) {
          Ac(f, N, n, c);
          break e;
        }
        R && R(e, m, a),
          e === "focusout" &&
            (R = m._wrapperState) &&
            R.controlled &&
            m.type === "number" &&
            ii(m, "number", m.value);
      }
      switch (((R = a ? nn(a) : window), e)) {
        case "focusin":
          (_u(R) || R.contentEditable === "true") &&
            ((en = R), (vi = a), (er = null));
          break;
        case "focusout":
          er = vi = en = null;
          break;
        case "mousedown":
          wi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (wi = !1), Lu(f, n, c);
          break;
        case "selectionchange":
          if (Eh) break;
        case "keydown":
        case "keyup":
          Lu(f, n, c);
      }
      var P;
      if (ws)
        e: {
          switch (e) {
            case "compositionstart":
              var T = "onCompositionStart";
              break e;
            case "compositionend":
              T = "onCompositionEnd";
              break e;
            case "compositionupdate":
              T = "onCompositionUpdate";
              break e;
          }
          T = void 0;
        }
      else
        bt
          ? zc(e, n) && (T = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      T &&
        (Lc &&
          n.locale !== "ko" &&
          (bt || T !== "onCompositionStart"
            ? T === "onCompositionEnd" && bt && (P = Oc())
            : ((dt = c),
              (ys = "value" in dt ? dt.value : dt.textContent),
              (bt = !0))),
        (R = kl(a, T)),
        0 < R.length &&
          ((T = new ku(T, e, null, n, c)),
          f.push({ event: T, listeners: R }),
          P ? (T.data = P) : ((P = Dc(n)), P !== null && (T.data = P)))),
        (P = ch ? fh(e, n) : dh(e, n)) &&
          ((a = kl(a, "onBeforeInput")),
          0 < a.length &&
            ((c = new ku("onBeforeInput", "beforeinput", null, n, c)),
            f.push({ event: c, listeners: a }),
            (c.data = P)));
    }
    Kc(f, t);
  });
}
function hr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function kl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      o = l.stateNode;
    l.tag === 5 &&
      o !== null &&
      ((l = o),
      (o = sr(e, n)),
      o != null && r.unshift(hr(e, o, l)),
      (o = sr(e, t)),
      o != null && r.push(hr(e, o, l))),
      (e = e.return);
  }
  return r;
}
function Gt(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Au(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var s = n,
      u = s.alternate,
      a = s.stateNode;
    if (u !== null && u === r) break;
    s.tag === 5 &&
      a !== null &&
      ((s = a),
      l
        ? ((u = sr(n, o)), u != null && i.unshift(hr(n, u, s)))
        : l || ((u = sr(n, o)), u != null && i.push(hr(n, u, s)))),
      (n = n.return);
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var Rh = /\r\n?/g,
  _h = /\u0000|\uFFFD/g;
function Iu(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Rh,
      `
`
    )
    .replace(_h, "");
}
function Jr(e, t, n) {
  if (((t = Iu(t)), Iu(e) !== t && n)) throw Error(C(425));
}
function Cl() {}
var Si = null,
  xi = null;
function Ei(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var ki = typeof setTimeout == "function" ? setTimeout : void 0,
  Ph = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Fu = typeof Promise == "function" ? Promise : void 0,
  jh =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Fu < "u"
      ? function (e) {
          return Fu.resolve(null).then(e).catch(Th);
        }
      : ki;
function Th(e) {
  setTimeout(function () {
    throw e;
  });
}
function Fo(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), cr(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  cr(t);
}
function vt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Uu(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Rn = Math.random().toString(36).slice(2),
  Je = "__reactFiber$" + Rn,
  mr = "__reactProps$" + Rn,
  nt = "__reactContainer$" + Rn,
  Ci = "__reactEvents$" + Rn,
  Oh = "__reactListeners$" + Rn,
  Lh = "__reactHandles$" + Rn;
function Dt(e) {
  var t = e[Je];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[nt] || n[Je])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Uu(e); e !== null; ) {
          if ((n = e[Je])) return n;
          e = Uu(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function jr(e) {
  return (
    (e = e[Je] || e[nt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function nn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(C(33));
}
function Yl(e) {
  return e[mr] || null;
}
var Ni = [],
  rn = -1;
function _t(e) {
  return { current: e };
}
function B(e) {
  0 > rn || ((e.current = Ni[rn]), (Ni[rn] = null), rn--);
}
function U(e, t) {
  rn++, (Ni[rn] = e.current), (e.current = t);
}
var Nt = {},
  fe = _t(Nt),
  ve = _t(!1),
  $t = Nt;
function gn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Nt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    o;
  for (o in n) l[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function we(e) {
  return (e = e.childContextTypes), e != null;
}
function Nl() {
  B(ve), B(fe);
}
function Mu(e, t, n) {
  if (fe.current !== Nt) throw Error(C(168));
  U(fe, t), U(ve, n);
}
function qc(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(C(108, yp(e) || "Unknown", l));
  return Q({}, n, r);
}
function Rl(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Nt),
    ($t = fe.current),
    U(fe, e),
    U(ve, ve.current),
    !0
  );
}
function Bu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(C(169));
  n
    ? ((e = qc(e, t, $t)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      B(ve),
      B(fe),
      U(fe, e))
    : B(ve),
    U(ve, n);
}
var Ye = null,
  Zl = !1,
  Uo = !1;
function Xc(e) {
  Ye === null ? (Ye = [e]) : Ye.push(e);
}
function zh(e) {
  (Zl = !0), Xc(e);
}
function Pt() {
  if (!Uo && Ye !== null) {
    Uo = !0;
    var e = 0,
      t = F;
    try {
      var n = Ye;
      for (F = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Ye = null), (Zl = !1);
    } catch (l) {
      throw (Ye !== null && (Ye = Ye.slice(e + 1)), Sc(ds, Pt), l);
    } finally {
      (F = t), (Uo = !1);
    }
  }
  return null;
}
var ln = [],
  on = 0,
  _l = null,
  Pl = 0,
  Pe = [],
  je = 0,
  Vt = null,
  Ze = 1,
  be = "";
function Lt(e, t) {
  (ln[on++] = Pl), (ln[on++] = _l), (_l = e), (Pl = t);
}
function Gc(e, t, n) {
  (Pe[je++] = Ze), (Pe[je++] = be), (Pe[je++] = Vt), (Vt = e);
  var r = Ze;
  e = be;
  var l = 32 - Me(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var o = 32 - Me(t) + l;
  if (30 < o) {
    var i = l - (l % 5);
    (o = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (l -= i),
      (Ze = (1 << (32 - Me(t) + l)) | (n << l) | r),
      (be = o + e);
  } else (Ze = (1 << o) | (n << l) | r), (be = e);
}
function xs(e) {
  e.return !== null && (Lt(e, 1), Gc(e, 1, 0));
}
function Es(e) {
  for (; e === _l; )
    (_l = ln[--on]), (ln[on] = null), (Pl = ln[--on]), (ln[on] = null);
  for (; e === Vt; )
    (Vt = Pe[--je]),
      (Pe[je] = null),
      (be = Pe[--je]),
      (Pe[je] = null),
      (Ze = Pe[--je]),
      (Pe[je] = null);
}
var Ce = null,
  ke = null,
  V = !1,
  Ue = null;
function Yc(e, t) {
  var n = Te(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function $u(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ce = e), (ke = vt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ce = e), (ke = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Vt !== null ? { id: Ze, overflow: be } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Te(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ce = e),
            (ke = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ri(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function _i(e) {
  if (V) {
    var t = ke;
    if (t) {
      var n = t;
      if (!$u(e, t)) {
        if (Ri(e)) throw Error(C(418));
        t = vt(n.nextSibling);
        var r = Ce;
        t && $u(e, t)
          ? Yc(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (V = !1), (Ce = e));
      }
    } else {
      if (Ri(e)) throw Error(C(418));
      (e.flags = (e.flags & -4097) | 2), (V = !1), (Ce = e);
    }
  }
}
function Vu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ce = e;
}
function qr(e) {
  if (e !== Ce) return !1;
  if (!V) return Vu(e), (V = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Ei(e.type, e.memoizedProps))),
    t && (t = ke))
  ) {
    if (Ri(e)) throw (Zc(), Error(C(418)));
    for (; t; ) Yc(e, t), (t = vt(t.nextSibling));
  }
  if ((Vu(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(C(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ke = vt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      ke = null;
    }
  } else ke = Ce ? vt(e.stateNode.nextSibling) : null;
  return !0;
}
function Zc() {
  for (var e = ke; e; ) e = vt(e.nextSibling);
}
function vn() {
  (ke = Ce = null), (V = !1);
}
function ks(e) {
  Ue === null ? (Ue = [e]) : Ue.push(e);
}
var Dh = ot.ReactCurrentBatchConfig;
function Vn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(C(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(C(147, e));
      var l = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var s = l.refs;
            i === null ? delete s[o] : (s[o] = i);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(C(284));
    if (!n._owner) throw Error(C(290, e));
  }
  return e;
}
function Xr(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      C(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Wu(e) {
  var t = e._init;
  return t(e._payload);
}
function bc(e) {
  function t(p, d) {
    if (e) {
      var h = p.deletions;
      h === null ? ((p.deletions = [d]), (p.flags |= 16)) : h.push(d);
    }
  }
  function n(p, d) {
    if (!e) return null;
    for (; d !== null; ) t(p, d), (d = d.sibling);
    return null;
  }
  function r(p, d) {
    for (p = new Map(); d !== null; )
      d.key !== null ? p.set(d.key, d) : p.set(d.index, d), (d = d.sibling);
    return p;
  }
  function l(p, d) {
    return (p = Et(p, d)), (p.index = 0), (p.sibling = null), p;
  }
  function o(p, d, h) {
    return (
      (p.index = h),
      e
        ? ((h = p.alternate),
          h !== null
            ? ((h = h.index), h < d ? ((p.flags |= 2), d) : h)
            : ((p.flags |= 2), d))
        : ((p.flags |= 1048576), d)
    );
  }
  function i(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function s(p, d, h, E) {
    return d === null || d.tag !== 6
      ? ((d = Qo(h, p.mode, E)), (d.return = p), d)
      : ((d = l(d, h)), (d.return = p), d);
  }
  function u(p, d, h, E) {
    var N = h.type;
    return N === Zt
      ? c(p, d, h.props.children, E, h.key)
      : d !== null &&
        (d.elementType === N ||
          (typeof N == "object" &&
            N !== null &&
            N.$$typeof === ut &&
            Wu(N) === d.type))
      ? ((E = l(d, h.props)), (E.ref = Vn(p, d, h)), (E.return = p), E)
      : ((E = fl(h.type, h.key, h.props, null, p.mode, E)),
        (E.ref = Vn(p, d, h)),
        (E.return = p),
        E);
  }
  function a(p, d, h, E) {
    return d === null ||
      d.tag !== 4 ||
      d.stateNode.containerInfo !== h.containerInfo ||
      d.stateNode.implementation !== h.implementation
      ? ((d = Ko(h, p.mode, E)), (d.return = p), d)
      : ((d = l(d, h.children || [])), (d.return = p), d);
  }
  function c(p, d, h, E, N) {
    return d === null || d.tag !== 7
      ? ((d = Mt(h, p.mode, E, N)), (d.return = p), d)
      : ((d = l(d, h)), (d.return = p), d);
  }
  function f(p, d, h) {
    if ((typeof d == "string" && d !== "") || typeof d == "number")
      return (d = Qo("" + d, p.mode, h)), (d.return = p), d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Ur:
          return (
            (h = fl(d.type, d.key, d.props, null, p.mode, h)),
            (h.ref = Vn(p, null, d)),
            (h.return = p),
            h
          );
        case Yt:
          return (d = Ko(d, p.mode, h)), (d.return = p), d;
        case ut:
          var E = d._init;
          return f(p, E(d._payload), h);
      }
      if (Jn(d) || Fn(d))
        return (d = Mt(d, p.mode, h, null)), (d.return = p), d;
      Xr(p, d);
    }
    return null;
  }
  function m(p, d, h, E) {
    var N = d !== null ? d.key : null;
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return N !== null ? null : s(p, d, "" + h, E);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case Ur:
          return h.key === N ? u(p, d, h, E) : null;
        case Yt:
          return h.key === N ? a(p, d, h, E) : null;
        case ut:
          return (N = h._init), m(p, d, N(h._payload), E);
      }
      if (Jn(h) || Fn(h)) return N !== null ? null : c(p, d, h, E, null);
      Xr(p, h);
    }
    return null;
  }
  function S(p, d, h, E, N) {
    if ((typeof E == "string" && E !== "") || typeof E == "number")
      return (p = p.get(h) || null), s(d, p, "" + E, N);
    if (typeof E == "object" && E !== null) {
      switch (E.$$typeof) {
        case Ur:
          return (p = p.get(E.key === null ? h : E.key) || null), u(d, p, E, N);
        case Yt:
          return (p = p.get(E.key === null ? h : E.key) || null), a(d, p, E, N);
        case ut:
          var R = E._init;
          return S(p, d, h, R(E._payload), N);
      }
      if (Jn(E) || Fn(E)) return (p = p.get(h) || null), c(d, p, E, N, null);
      Xr(d, E);
    }
    return null;
  }
  function g(p, d, h, E) {
    for (
      var N = null, R = null, P = d, T = (d = 0), $ = null;
      P !== null && T < h.length;
      T++
    ) {
      P.index > T ? (($ = P), (P = null)) : ($ = P.sibling);
      var A = m(p, P, h[T], E);
      if (A === null) {
        P === null && (P = $);
        break;
      }
      e && P && A.alternate === null && t(p, P),
        (d = o(A, d, T)),
        R === null ? (N = A) : (R.sibling = A),
        (R = A),
        (P = $);
    }
    if (T === h.length) return n(p, P), V && Lt(p, T), N;
    if (P === null) {
      for (; T < h.length; T++)
        (P = f(p, h[T], E)),
          P !== null &&
            ((d = o(P, d, T)), R === null ? (N = P) : (R.sibling = P), (R = P));
      return V && Lt(p, T), N;
    }
    for (P = r(p, P); T < h.length; T++)
      ($ = S(P, p, T, h[T], E)),
        $ !== null &&
          (e && $.alternate !== null && P.delete($.key === null ? T : $.key),
          (d = o($, d, T)),
          R === null ? (N = $) : (R.sibling = $),
          (R = $));
    return (
      e &&
        P.forEach(function (De) {
          return t(p, De);
        }),
      V && Lt(p, T),
      N
    );
  }
  function v(p, d, h, E) {
    var N = Fn(h);
    if (typeof N != "function") throw Error(C(150));
    if (((h = N.call(h)), h == null)) throw Error(C(151));
    for (
      var R = (N = null), P = d, T = (d = 0), $ = null, A = h.next();
      P !== null && !A.done;
      T++, A = h.next()
    ) {
      P.index > T ? (($ = P), (P = null)) : ($ = P.sibling);
      var De = m(p, P, A.value, E);
      if (De === null) {
        P === null && (P = $);
        break;
      }
      e && P && De.alternate === null && t(p, P),
        (d = o(De, d, T)),
        R === null ? (N = De) : (R.sibling = De),
        (R = De),
        (P = $);
    }
    if (A.done) return n(p, P), V && Lt(p, T), N;
    if (P === null) {
      for (; !A.done; T++, A = h.next())
        (A = f(p, A.value, E)),
          A !== null &&
            ((d = o(A, d, T)), R === null ? (N = A) : (R.sibling = A), (R = A));
      return V && Lt(p, T), N;
    }
    for (P = r(p, P); !A.done; T++, A = h.next())
      (A = S(P, p, T, A.value, E)),
        A !== null &&
          (e && A.alternate !== null && P.delete(A.key === null ? T : A.key),
          (d = o(A, d, T)),
          R === null ? (N = A) : (R.sibling = A),
          (R = A));
    return (
      e &&
        P.forEach(function (An) {
          return t(p, An);
        }),
      V && Lt(p, T),
      N
    );
  }
  function x(p, d, h, E) {
    if (
      (typeof h == "object" &&
        h !== null &&
        h.type === Zt &&
        h.key === null &&
        (h = h.props.children),
      typeof h == "object" && h !== null)
    ) {
      switch (h.$$typeof) {
        case Ur:
          e: {
            for (var N = h.key, R = d; R !== null; ) {
              if (R.key === N) {
                if (((N = h.type), N === Zt)) {
                  if (R.tag === 7) {
                    n(p, R.sibling),
                      (d = l(R, h.props.children)),
                      (d.return = p),
                      (p = d);
                    break e;
                  }
                } else if (
                  R.elementType === N ||
                  (typeof N == "object" &&
                    N !== null &&
                    N.$$typeof === ut &&
                    Wu(N) === R.type)
                ) {
                  n(p, R.sibling),
                    (d = l(R, h.props)),
                    (d.ref = Vn(p, R, h)),
                    (d.return = p),
                    (p = d);
                  break e;
                }
                n(p, R);
                break;
              } else t(p, R);
              R = R.sibling;
            }
            h.type === Zt
              ? ((d = Mt(h.props.children, p.mode, E, h.key)),
                (d.return = p),
                (p = d))
              : ((E = fl(h.type, h.key, h.props, null, p.mode, E)),
                (E.ref = Vn(p, d, h)),
                (E.return = p),
                (p = E));
          }
          return i(p);
        case Yt:
          e: {
            for (R = h.key; d !== null; ) {
              if (d.key === R)
                if (
                  d.tag === 4 &&
                  d.stateNode.containerInfo === h.containerInfo &&
                  d.stateNode.implementation === h.implementation
                ) {
                  n(p, d.sibling),
                    (d = l(d, h.children || [])),
                    (d.return = p),
                    (p = d);
                  break e;
                } else {
                  n(p, d);
                  break;
                }
              else t(p, d);
              d = d.sibling;
            }
            (d = Ko(h, p.mode, E)), (d.return = p), (p = d);
          }
          return i(p);
        case ut:
          return (R = h._init), x(p, d, R(h._payload), E);
      }
      if (Jn(h)) return g(p, d, h, E);
      if (Fn(h)) return v(p, d, h, E);
      Xr(p, h);
    }
    return (typeof h == "string" && h !== "") || typeof h == "number"
      ? ((h = "" + h),
        d !== null && d.tag === 6
          ? (n(p, d.sibling), (d = l(d, h)), (d.return = p), (p = d))
          : (n(p, d), (d = Qo(h, p.mode, E)), (d.return = p), (p = d)),
        i(p))
      : n(p, d);
  }
  return x;
}
var wn = bc(!0),
  ef = bc(!1),
  jl = _t(null),
  Tl = null,
  sn = null,
  Cs = null;
function Ns() {
  Cs = sn = Tl = null;
}
function Rs(e) {
  var t = jl.current;
  B(jl), (e._currentValue = t);
}
function Pi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function hn(e, t) {
  (Tl = e),
    (Cs = sn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (ge = !0), (e.firstContext = null));
}
function Le(e) {
  var t = e._currentValue;
  if (Cs !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), sn === null)) {
      if (Tl === null) throw Error(C(308));
      (sn = e), (Tl.dependencies = { lanes: 0, firstContext: e });
    } else sn = sn.next = e;
  return t;
}
var At = null;
function _s(e) {
  At === null ? (At = [e]) : At.push(e);
}
function tf(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), _s(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    rt(e, r)
  );
}
function rt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var at = !1;
function Ps(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function nf(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function et(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function wt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), I & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      rt(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), _s(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    rt(e, n)
  );
}
function ol(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ps(e, n);
  }
}
function Hu(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (l = o = i) : (o = o.next = i), (n = n.next);
      } while (n !== null);
      o === null ? (l = o = t) : (o = o.next = t);
    } else l = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function Ol(e, t, n, r) {
  var l = e.updateQueue;
  at = !1;
  var o = l.firstBaseUpdate,
    i = l.lastBaseUpdate,
    s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var u = s,
      a = u.next;
    (u.next = null), i === null ? (o = a) : (i.next = a), (i = u);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (s = c.lastBaseUpdate),
      s !== i &&
        (s === null ? (c.firstBaseUpdate = a) : (s.next = a),
        (c.lastBaseUpdate = u)));
  }
  if (o !== null) {
    var f = l.baseState;
    (i = 0), (c = a = u = null), (s = o);
    do {
      var m = s.lane,
        S = s.eventTime;
      if ((r & m) === m) {
        c !== null &&
          (c = c.next =
            {
              eventTime: S,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var g = e,
            v = s;
          switch (((m = t), (S = n), v.tag)) {
            case 1:
              if (((g = v.payload), typeof g == "function")) {
                f = g.call(S, f, m);
                break e;
              }
              f = g;
              break e;
            case 3:
              g.flags = (g.flags & -65537) | 128;
            case 0:
              if (
                ((g = v.payload),
                (m = typeof g == "function" ? g.call(S, f, m) : g),
                m == null)
              )
                break e;
              f = Q({}, f, m);
              break e;
            case 2:
              at = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64),
          (m = l.effects),
          m === null ? (l.effects = [s]) : m.push(s));
      } else
        (S = {
          eventTime: S,
          lane: m,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          c === null ? ((a = c = S), (u = f)) : (c = c.next = S),
          (i |= m);
      if (((s = s.next), s === null)) {
        if (((s = l.shared.pending), s === null)) break;
        (m = s),
          (s = m.next),
          (m.next = null),
          (l.lastBaseUpdate = m),
          (l.shared.pending = null);
      }
    } while (1);
    if (
      (c === null && (u = f),
      (l.baseState = u),
      (l.firstBaseUpdate = a),
      (l.lastBaseUpdate = c),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (i |= l.lane), (l = l.next);
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    (Ht |= i), (e.lanes = i), (e.memoizedState = f);
  }
}
function Qu(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(C(191, l));
        l.call(r);
      }
    }
}
var Tr = {},
  Xe = _t(Tr),
  yr = _t(Tr),
  gr = _t(Tr);
function It(e) {
  if (e === Tr) throw Error(C(174));
  return e;
}
function js(e, t) {
  switch ((U(gr, t), U(yr, e), U(Xe, Tr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ui(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = ui(t, e));
  }
  B(Xe), U(Xe, t);
}
function Sn() {
  B(Xe), B(yr), B(gr);
}
function rf(e) {
  It(gr.current);
  var t = It(Xe.current),
    n = ui(t, e.type);
  t !== n && (U(yr, e), U(Xe, n));
}
function Ts(e) {
  yr.current === e && (B(Xe), B(yr));
}
var W = _t(0);
function Ll(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Mo = [];
function Os() {
  for (var e = 0; e < Mo.length; e++)
    Mo[e]._workInProgressVersionPrimary = null;
  Mo.length = 0;
}
var il = ot.ReactCurrentDispatcher,
  Bo = ot.ReactCurrentBatchConfig,
  Wt = 0,
  H = null,
  Z = null,
  te = null,
  zl = !1,
  tr = !1,
  vr = 0,
  Ah = 0;
function ie() {
  throw Error(C(321));
}
function Ls(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Ve(e[n], t[n])) return !1;
  return !0;
}
function zs(e, t, n, r, l, o) {
  if (
    ((Wt = o),
    (H = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (il.current = e === null || e.memoizedState === null ? Mh : Bh),
    (e = n(r, l)),
    tr)
  ) {
    o = 0;
    do {
      if (((tr = !1), (vr = 0), 25 <= o)) throw Error(C(301));
      (o += 1),
        (te = Z = null),
        (t.updateQueue = null),
        (il.current = $h),
        (e = n(r, l));
    } while (tr);
  }
  if (
    ((il.current = Dl),
    (t = Z !== null && Z.next !== null),
    (Wt = 0),
    (te = Z = H = null),
    (zl = !1),
    t)
  )
    throw Error(C(300));
  return e;
}
function Ds() {
  var e = vr !== 0;
  return (vr = 0), e;
}
function Ke() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return te === null ? (H.memoizedState = te = e) : (te = te.next = e), te;
}
function ze() {
  if (Z === null) {
    var e = H.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Z.next;
  var t = te === null ? H.memoizedState : te.next;
  if (t !== null) (te = t), (Z = e);
  else {
    if (e === null) throw Error(C(310));
    (Z = e),
      (e = {
        memoizedState: Z.memoizedState,
        baseState: Z.baseState,
        baseQueue: Z.baseQueue,
        queue: Z.queue,
        next: null,
      }),
      te === null ? (H.memoizedState = te = e) : (te = te.next = e);
  }
  return te;
}
function wr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function $o(e) {
  var t = ze(),
    n = t.queue;
  if (n === null) throw Error(C(311));
  n.lastRenderedReducer = e;
  var r = Z,
    l = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      (l.next = o.next), (o.next = i);
    }
    (r.baseQueue = l = o), (n.pending = null);
  }
  if (l !== null) {
    (o = l.next), (r = r.baseState);
    var s = (i = null),
      u = null,
      a = o;
    do {
      var c = a.lane;
      if ((Wt & c) === c)
        u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: a.action,
              hasEagerState: a.hasEagerState,
              eagerState: a.eagerState,
              next: null,
            }),
          (r = a.hasEagerState ? a.eagerState : e(r, a.action));
      else {
        var f = {
          lane: c,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null,
        };
        u === null ? ((s = u = f), (i = r)) : (u = u.next = f),
          (H.lanes |= c),
          (Ht |= c);
      }
      a = a.next;
    } while (a !== null && a !== o);
    u === null ? (i = r) : (u.next = s),
      Ve(r, t.memoizedState) || (ge = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = u),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (o = l.lane), (H.lanes |= o), (Ht |= o), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Vo(e) {
  var t = ze(),
    n = t.queue;
  if (n === null) throw Error(C(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = (l = l.next);
    do (o = e(o, i.action)), (i = i.next);
    while (i !== l);
    Ve(o, t.memoizedState) || (ge = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function lf() {}
function of(e, t) {
  var n = H,
    r = ze(),
    l = t(),
    o = !Ve(r.memoizedState, l);
  if (
    (o && ((r.memoizedState = l), (ge = !0)),
    (r = r.queue),
    As(af.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (te !== null && te.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Sr(9, uf.bind(null, n, r, l, t), void 0, null),
      ne === null)
    )
      throw Error(C(349));
    Wt & 30 || sf(n, t, l);
  }
  return l;
}
function sf(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = H.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (H.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function uf(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), cf(t) && ff(e);
}
function af(e, t, n) {
  return n(function () {
    cf(t) && ff(e);
  });
}
function cf(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ve(e, n);
  } catch {
    return !0;
  }
}
function ff(e) {
  var t = rt(e, 1);
  t !== null && Be(t, e, 1, -1);
}
function Ku(e) {
  var t = Ke();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: wr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Uh.bind(null, H, e)),
    [t.memoizedState, e]
  );
}
function Sr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = H.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (H.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function df() {
  return ze().memoizedState;
}
function sl(e, t, n, r) {
  var l = Ke();
  (H.flags |= e),
    (l.memoizedState = Sr(1 | t, n, void 0, r === void 0 ? null : r));
}
function bl(e, t, n, r) {
  var l = ze();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (Z !== null) {
    var i = Z.memoizedState;
    if (((o = i.destroy), r !== null && Ls(r, i.deps))) {
      l.memoizedState = Sr(t, n, o, r);
      return;
    }
  }
  (H.flags |= e), (l.memoizedState = Sr(1 | t, n, o, r));
}
function Ju(e, t) {
  return sl(8390656, 8, e, t);
}
function As(e, t) {
  return bl(2048, 8, e, t);
}
function pf(e, t) {
  return bl(4, 2, e, t);
}
function hf(e, t) {
  return bl(4, 4, e, t);
}
function mf(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function yf(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), bl(4, 4, mf.bind(null, t, e), n)
  );
}
function Is() {}
function gf(e, t) {
  var n = ze();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ls(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function vf(e, t) {
  var n = ze();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ls(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function wf(e, t, n) {
  return Wt & 21
    ? (Ve(n, t) || ((n = kc()), (H.lanes |= n), (Ht |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (ge = !0)), (e.memoizedState = n));
}
function Ih(e, t) {
  var n = F;
  (F = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Bo.transition;
  Bo.transition = {};
  try {
    e(!1), t();
  } finally {
    (F = n), (Bo.transition = r);
  }
}
function Sf() {
  return ze().memoizedState;
}
function Fh(e, t, n) {
  var r = xt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    xf(e))
  )
    Ef(t, n);
  else if (((n = tf(e, t, n, r)), n !== null)) {
    var l = pe();
    Be(n, e, r, l), kf(n, t, r);
  }
}
function Uh(e, t, n) {
  var r = xt(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (xf(e)) Ef(t, l);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var i = t.lastRenderedState,
          s = o(i, n);
        if (((l.hasEagerState = !0), (l.eagerState = s), Ve(s, i))) {
          var u = t.interleaved;
          u === null
            ? ((l.next = l), _s(t))
            : ((l.next = u.next), (u.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = tf(e, t, l, r)),
      n !== null && ((l = pe()), Be(n, e, r, l), kf(n, t, r));
  }
}
function xf(e) {
  var t = e.alternate;
  return e === H || (t !== null && t === H);
}
function Ef(e, t) {
  tr = zl = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function kf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ps(e, n);
  }
}
var Dl = {
    readContext: Le,
    useCallback: ie,
    useContext: ie,
    useEffect: ie,
    useImperativeHandle: ie,
    useInsertionEffect: ie,
    useLayoutEffect: ie,
    useMemo: ie,
    useReducer: ie,
    useRef: ie,
    useState: ie,
    useDebugValue: ie,
    useDeferredValue: ie,
    useTransition: ie,
    useMutableSource: ie,
    useSyncExternalStore: ie,
    useId: ie,
    unstable_isNewReconciler: !1,
  },
  Mh = {
    readContext: Le,
    useCallback: function (e, t) {
      return (Ke().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Le,
    useEffect: Ju,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        sl(4194308, 4, mf.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return sl(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return sl(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Ke();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = Ke();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Fh.bind(null, H, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Ke();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Ku,
    useDebugValue: Is,
    useDeferredValue: function (e) {
      return (Ke().memoizedState = e);
    },
    useTransition: function () {
      var e = Ku(!1),
        t = e[0];
      return (e = Ih.bind(null, e[1])), (Ke().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = H,
        l = Ke();
      if (V) {
        if (n === void 0) throw Error(C(407));
        n = n();
      } else {
        if (((n = t()), ne === null)) throw Error(C(349));
        Wt & 30 || sf(r, t, n);
      }
      l.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (l.queue = o),
        Ju(af.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        Sr(9, uf.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Ke(),
        t = ne.identifierPrefix;
      if (V) {
        var n = be,
          r = Ze;
        (n = (r & ~(1 << (32 - Me(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = vr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Ah++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Bh = {
    readContext: Le,
    useCallback: gf,
    useContext: Le,
    useEffect: As,
    useImperativeHandle: yf,
    useInsertionEffect: pf,
    useLayoutEffect: hf,
    useMemo: vf,
    useReducer: $o,
    useRef: df,
    useState: function () {
      return $o(wr);
    },
    useDebugValue: Is,
    useDeferredValue: function (e) {
      var t = ze();
      return wf(t, Z.memoizedState, e);
    },
    useTransition: function () {
      var e = $o(wr)[0],
        t = ze().memoizedState;
      return [e, t];
    },
    useMutableSource: lf,
    useSyncExternalStore: of,
    useId: Sf,
    unstable_isNewReconciler: !1,
  },
  $h = {
    readContext: Le,
    useCallback: gf,
    useContext: Le,
    useEffect: As,
    useImperativeHandle: yf,
    useInsertionEffect: pf,
    useLayoutEffect: hf,
    useMemo: vf,
    useReducer: Vo,
    useRef: df,
    useState: function () {
      return Vo(wr);
    },
    useDebugValue: Is,
    useDeferredValue: function (e) {
      var t = ze();
      return Z === null ? (t.memoizedState = e) : wf(t, Z.memoizedState, e);
    },
    useTransition: function () {
      var e = Vo(wr)[0],
        t = ze().memoizedState;
      return [e, t];
    },
    useMutableSource: lf,
    useSyncExternalStore: of,
    useId: Sf,
    unstable_isNewReconciler: !1,
  };
function Ie(e, t) {
  if (e && e.defaultProps) {
    (t = Q({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function ji(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Q({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var eo = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Xt(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = pe(),
      l = xt(e),
      o = et(r, l);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = wt(e, o, l)),
      t !== null && (Be(t, e, l, r), ol(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = pe(),
      l = xt(e),
      o = et(r, l);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = wt(e, o, l)),
      t !== null && (Be(t, e, l, r), ol(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = pe(),
      r = xt(e),
      l = et(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = wt(e, l, r)),
      t !== null && (Be(t, e, r, n), ol(t, e, r));
  },
};
function qu(e, t, n, r, l, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
      ? !dr(n, r) || !dr(l, o)
      : !0
  );
}
function Cf(e, t, n) {
  var r = !1,
    l = Nt,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = Le(o))
      : ((l = we(t) ? $t : fe.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? gn(e, l) : Nt)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = eo),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Xu(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && eo.enqueueReplaceState(t, t.state, null);
}
function Ti(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = {}), Ps(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (l.context = Le(o))
    : ((o = we(t) ? $t : fe.current), (l.context = gn(e, o))),
    (l.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (ji(e, t, o, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && eo.enqueueReplaceState(l, l.state, null),
      Ol(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function xn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += mp(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (o) {
    l =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Wo(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Oi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Vh = typeof WeakMap == "function" ? WeakMap : Map;
function Nf(e, t, n) {
  (n = et(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      Il || ((Il = !0), ($i = r)), Oi(e, t);
    }),
    n
  );
}
function Rf(e, t, n) {
  (n = et(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Oi(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        Oi(e, t),
          typeof r != "function" &&
            (St === null ? (St = new Set([this])) : St.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : "",
        });
      }),
    n
  );
}
function Gu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Vh();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = nm.bind(null, e, t, n)), t.then(e, e));
}
function Yu(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Zu(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = et(-1, 1)), (t.tag = 2), wt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Wh = ot.ReactCurrentOwner,
  ge = !1;
function de(e, t, n, r) {
  t.child = e === null ? ef(t, null, n, r) : wn(t, e.child, n, r);
}
function bu(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return (
    hn(t, l),
    (r = zs(e, t, n, r, o, l)),
    (n = Ds()),
    e !== null && !ge
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        lt(e, t, l))
      : (V && n && xs(t), (t.flags |= 1), de(e, t, r, l), t.child)
  );
}
function ea(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !Hs(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), _f(e, t, o, r, l))
      : ((e = fl(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & l))) {
    var i = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : dr), n(i, r) && e.ref === t.ref)
    )
      return lt(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = Et(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function _f(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (dr(o, r) && e.ref === t.ref)
      if (((ge = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
        e.flags & 131072 && (ge = !0);
      else return (t.lanes = e.lanes), lt(e, t, l);
  }
  return Li(e, t, n, r, l);
}
function Pf(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        U(an, Ee),
        (Ee |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          U(an, Ee),
          (Ee |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        U(an, Ee),
        (Ee |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      U(an, Ee),
      (Ee |= r);
  return de(e, t, l, n), t.child;
}
function jf(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Li(e, t, n, r, l) {
  var o = we(n) ? $t : fe.current;
  return (
    (o = gn(t, o)),
    hn(t, l),
    (n = zs(e, t, n, r, o, l)),
    (r = Ds()),
    e !== null && !ge
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        lt(e, t, l))
      : (V && r && xs(t), (t.flags |= 1), de(e, t, n, l), t.child)
  );
}
function ta(e, t, n, r, l) {
  if (we(n)) {
    var o = !0;
    Rl(t);
  } else o = !1;
  if ((hn(t, l), t.stateNode === null))
    ul(e, t), Cf(t, n, r), Ti(t, n, r, l), (r = !0);
  else if (e === null) {
    var i = t.stateNode,
      s = t.memoizedProps;
    i.props = s;
    var u = i.context,
      a = n.contextType;
    typeof a == "object" && a !== null
      ? (a = Le(a))
      : ((a = we(n) ? $t : fe.current), (a = gn(t, a)));
    var c = n.getDerivedStateFromProps,
      f =
        typeof c == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    f ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== r || u !== a) && Xu(t, i, r, a)),
      (at = !1);
    var m = t.memoizedState;
    (i.state = m),
      Ol(t, r, i, l),
      (u = t.memoizedState),
      s !== r || m !== u || ve.current || at
        ? (typeof c == "function" && (ji(t, n, c, r), (u = t.memoizedState)),
          (s = at || qu(t, n, s, r, m, u, a))
            ? (f ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (i.props = r),
          (i.state = u),
          (i.context = a),
          (r = s))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (i = t.stateNode),
      nf(e, t),
      (s = t.memoizedProps),
      (a = t.type === t.elementType ? s : Ie(t.type, s)),
      (i.props = a),
      (f = t.pendingProps),
      (m = i.context),
      (u = n.contextType),
      typeof u == "object" && u !== null
        ? (u = Le(u))
        : ((u = we(n) ? $t : fe.current), (u = gn(t, u)));
    var S = n.getDerivedStateFromProps;
    (c =
      typeof S == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== f || m !== u) && Xu(t, i, r, u)),
      (at = !1),
      (m = t.memoizedState),
      (i.state = m),
      Ol(t, r, i, l);
    var g = t.memoizedState;
    s !== f || m !== g || ve.current || at
      ? (typeof S == "function" && (ji(t, n, S, r), (g = t.memoizedState)),
        (a = at || qu(t, n, a, r, m, g, u) || !1)
          ? (c ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(r, g, u),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(r, g, u)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = g)),
        (i.props = r),
        (i.state = g),
        (i.context = u),
        (r = a))
      : (typeof i.componentDidUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return zi(e, t, n, r, o, l);
}
function zi(e, t, n, r, l, o) {
  jf(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Bu(t, n, !1), lt(e, t, o);
  (r = t.stateNode), (Wh.current = t);
  var s =
    i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = wn(t, e.child, null, o)), (t.child = wn(t, null, s, o)))
      : de(e, t, s, o),
    (t.memoizedState = r.state),
    l && Bu(t, n, !0),
    t.child
  );
}
function Tf(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Mu(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Mu(e, t.context, !1),
    js(e, t.containerInfo);
}
function na(e, t, n, r, l) {
  return vn(), ks(l), (t.flags |= 256), de(e, t, n, r), t.child;
}
var Di = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ai(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Of(e, t, n) {
  var r = t.pendingProps,
    l = W.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    s;
  if (
    ((s = i) ||
      (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    s
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    U(W, l & 1),
    e === null)
  )
    return (
      _i(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: "hidden", children: i }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = i))
                : (o = ro(i, r, 0, null)),
              (e = Mt(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Ai(n)),
              (t.memoizedState = Di),
              e)
            : Fs(t, i))
    );
  if (((l = e.memoizedState), l !== null && ((s = l.dehydrated), s !== null)))
    return Hh(e, t, i, r, s, l, n);
  if (o) {
    (o = r.fallback), (i = t.mode), (l = e.child), (s = l.sibling);
    var u = { mode: "hidden", children: r.children };
    return (
      !(i & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = Et(l, u)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      s !== null ? (o = Et(s, o)) : ((o = Mt(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? Ai(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Di),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = Et(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Fs(e, t) {
  return (
    (t = ro({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Gr(e, t, n, r) {
  return (
    r !== null && ks(r),
    wn(t, e.child, null, n),
    (e = Fs(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Hh(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Wo(Error(C(422)))), Gr(e, t, i, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (l = t.mode),
        (r = ro({ mode: "visible", children: r.children }, l, 0, null)),
        (o = Mt(o, l, i, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && wn(t, e.child, null, i),
        (t.child.memoizedState = Ai(i)),
        (t.memoizedState = Di),
        o);
  if (!(t.mode & 1)) return Gr(e, t, i, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var s = r.dgst;
    return (r = s), (o = Error(C(419))), (r = Wo(o, r, void 0)), Gr(e, t, i, r);
  }
  if (((s = (i & e.childLanes) !== 0), ge || s)) {
    if (((r = ne), r !== null)) {
      switch (i & -i) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | i) ? 0 : l),
        l !== 0 &&
          l !== o.retryLane &&
          ((o.retryLane = l), rt(e, l), Be(r, e, l, -1));
    }
    return Ws(), (r = Wo(Error(C(421)))), Gr(e, t, i, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = rm.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (ke = vt(l.nextSibling)),
      (Ce = t),
      (V = !0),
      (Ue = null),
      e !== null &&
        ((Pe[je++] = Ze),
        (Pe[je++] = be),
        (Pe[je++] = Vt),
        (Ze = e.id),
        (be = e.overflow),
        (Vt = t)),
      (t = Fs(t, r.children)),
      (t.flags |= 4096),
      t);
}
function ra(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Pi(e.return, t, n);
}
function Ho(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = l));
}
function Lf(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    o = r.tail;
  if ((de(e, t, r.children, n), (r = W.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ra(e, n, t);
        else if (e.tag === 19) ra(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((U(W, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && Ll(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          Ho(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Ll(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        Ho(t, !0, n, null, o);
        break;
      case "together":
        Ho(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function ul(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function lt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Ht |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(C(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Et(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Et(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Qh(e, t, n) {
  switch (t.tag) {
    case 3:
      Tf(t), vn();
      break;
    case 5:
      rf(t);
      break;
    case 1:
      we(t.type) && Rl(t);
      break;
    case 4:
      js(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      U(jl, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (U(W, W.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? Of(e, t, n)
          : (U(W, W.current & 1),
            (e = lt(e, t, n)),
            e !== null ? e.sibling : null);
      U(W, W.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Lf(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        U(W, W.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Pf(e, t, n);
  }
  return lt(e, t, n);
}
var zf, Ii, Df, Af;
zf = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Ii = function () {};
Df = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), It(Xe.current);
    var o = null;
    switch (n) {
      case "input":
        (l = li(e, l)), (r = li(e, r)), (o = []);
        break;
      case "select":
        (l = Q({}, l, { value: void 0 })),
          (r = Q({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (l = si(e, l)), (r = si(e, r)), (o = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Cl);
    }
    ai(n, r);
    var i;
    n = null;
    for (a in l)
      if (!r.hasOwnProperty(a) && l.hasOwnProperty(a) && l[a] != null)
        if (a === "style") {
          var s = l[a];
          for (i in s) s.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
        } else
          a !== "dangerouslySetInnerHTML" &&
            a !== "children" &&
            a !== "suppressContentEditableWarning" &&
            a !== "suppressHydrationWarning" &&
            a !== "autoFocus" &&
            (or.hasOwnProperty(a)
              ? o || (o = [])
              : (o = o || []).push(a, null));
    for (a in r) {
      var u = r[a];
      if (
        ((s = l != null ? l[a] : void 0),
        r.hasOwnProperty(a) && u !== s && (u != null || s != null))
      )
        if (a === "style")
          if (s) {
            for (i in s)
              !s.hasOwnProperty(i) ||
                (u && u.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ""));
            for (i in u)
              u.hasOwnProperty(i) &&
                s[i] !== u[i] &&
                (n || (n = {}), (n[i] = u[i]));
          } else n || (o || (o = []), o.push(a, n)), (n = u);
        else
          a === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0),
              (s = s ? s.__html : void 0),
              u != null && s !== u && (o = o || []).push(a, u))
            : a === "children"
            ? (typeof u != "string" && typeof u != "number") ||
              (o = o || []).push(a, "" + u)
            : a !== "suppressContentEditableWarning" &&
              a !== "suppressHydrationWarning" &&
              (or.hasOwnProperty(a)
                ? (u != null && a === "onScroll" && M("scroll", e),
                  o || s === u || (o = []))
                : (o = o || []).push(a, u));
    }
    n && (o = o || []).push("style", n);
    var a = o;
    (t.updateQueue = a) && (t.flags |= 4);
  }
};
Af = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Wn(e, t) {
  if (!V)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function se(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Kh(e, t, n) {
  var r = t.pendingProps;
  switch ((Es(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return se(t), null;
    case 1:
      return we(t.type) && Nl(), se(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Sn(),
        B(ve),
        B(fe),
        Os(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (qr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ue !== null && (Hi(Ue), (Ue = null)))),
        Ii(e, t),
        se(t),
        null
      );
    case 5:
      Ts(t);
      var l = It(gr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Df(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(C(166));
          return se(t), null;
        }
        if (((e = It(Xe.current)), qr(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[Je] = t), (r[mr] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              M("cancel", r), M("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              M("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Xn.length; l++) M(Xn[l], r);
              break;
            case "source":
              M("error", r);
              break;
            case "img":
            case "image":
            case "link":
              M("error", r), M("load", r);
              break;
            case "details":
              M("toggle", r);
              break;
            case "input":
              du(r, o), M("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                M("invalid", r);
              break;
            case "textarea":
              hu(r, o), M("invalid", r);
          }
          ai(n, o), (l = null);
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var s = o[i];
              i === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (o.suppressHydrationWarning !== !0 &&
                      Jr(r.textContent, s, e),
                    (l = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (o.suppressHydrationWarning !== !0 &&
                      Jr(r.textContent, s, e),
                    (l = ["children", "" + s]))
                : or.hasOwnProperty(i) &&
                  s != null &&
                  i === "onScroll" &&
                  M("scroll", r);
            }
          switch (n) {
            case "input":
              Mr(r), pu(r, o, !0);
              break;
            case "textarea":
              Mr(r), mu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Cl);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (i = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = uc(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = i.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = i.createElement(n, { is: r.is }))
                : ((e = i.createElement(n)),
                  n === "select" &&
                    ((i = e),
                    r.multiple
                      ? (i.multiple = !0)
                      : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[Je] = t),
            (e[mr] = r),
            zf(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((i = ci(n, r)), n)) {
              case "dialog":
                M("cancel", e), M("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                M("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Xn.length; l++) M(Xn[l], e);
                l = r;
                break;
              case "source":
                M("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                M("error", e), M("load", e), (l = r);
                break;
              case "details":
                M("toggle", e), (l = r);
                break;
              case "input":
                du(e, r), (l = li(e, r)), M("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = Q({}, r, { value: void 0 })),
                  M("invalid", e);
                break;
              case "textarea":
                hu(e, r), (l = si(e, r)), M("invalid", e);
                break;
              default:
                l = r;
            }
            ai(n, l), (s = l);
            for (o in s)
              if (s.hasOwnProperty(o)) {
                var u = s[o];
                o === "style"
                  ? fc(e, u)
                  : o === "dangerouslySetInnerHTML"
                  ? ((u = u ? u.__html : void 0), u != null && ac(e, u))
                  : o === "children"
                  ? typeof u == "string"
                    ? (n !== "textarea" || u !== "") && ir(e, u)
                    : typeof u == "number" && ir(e, "" + u)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (or.hasOwnProperty(o)
                      ? u != null && o === "onScroll" && M("scroll", e)
                      : u != null && ss(e, o, u, i));
              }
            switch (n) {
              case "input":
                Mr(e), pu(e, r, !1);
                break;
              case "textarea":
                Mr(e), mu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Ct(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? cn(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      cn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Cl);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return se(t), null;
    case 6:
      if (e && t.stateNode != null) Af(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(C(166));
        if (((n = It(gr.current)), It(Xe.current), qr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Je] = t),
            (o = r.nodeValue !== n) && ((e = Ce), e !== null))
          )
            switch (e.tag) {
              case 3:
                Jr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Jr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Je] = t),
            (t.stateNode = r);
      }
      return se(t), null;
    case 13:
      if (
        (B(W),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (V && ke !== null && t.mode & 1 && !(t.flags & 128))
          Zc(), vn(), (t.flags |= 98560), (o = !1);
        else if (((o = qr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(C(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(C(317));
            o[Je] = t;
          } else
            vn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          se(t), (o = !1);
        } else Ue !== null && (Hi(Ue), (Ue = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || W.current & 1 ? b === 0 && (b = 3) : Ws())),
          t.updateQueue !== null && (t.flags |= 4),
          se(t),
          null);
    case 4:
      return (
        Sn(), Ii(e, t), e === null && pr(t.stateNode.containerInfo), se(t), null
      );
    case 10:
      return Rs(t.type._context), se(t), null;
    case 17:
      return we(t.type) && Nl(), se(t), null;
    case 19:
      if ((B(W), (o = t.memoizedState), o === null)) return se(t), null;
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) Wn(o, !1);
        else {
          if (b !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = Ll(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    Wn(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return U(W, (W.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            q() > En &&
            ((t.flags |= 128), (r = !0), Wn(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Ll(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Wn(o, !0),
              o.tail === null && o.tailMode === "hidden" && !i.alternate && !V)
            )
              return se(t), null;
          } else
            2 * q() - o.renderingStartTime > En &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Wn(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = o.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (o.last = i));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = q()),
          (t.sibling = null),
          (n = W.current),
          U(W, r ? (n & 1) | 2 : n & 1),
          t)
        : (se(t), null);
    case 22:
    case 23:
      return (
        Vs(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ee & 1073741824 && (se(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : se(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(C(156, t.tag));
}
function Jh(e, t) {
  switch ((Es(t), t.tag)) {
    case 1:
      return (
        we(t.type) && Nl(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Sn(),
        B(ve),
        B(fe),
        Os(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Ts(t), null;
    case 13:
      if ((B(W), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(C(340));
        vn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return B(W), null;
    case 4:
      return Sn(), null;
    case 10:
      return Rs(t.type._context), null;
    case 22:
    case 23:
      return Vs(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Yr = !1,
  ae = !1,
  qh = typeof WeakSet == "function" ? WeakSet : Set,
  _ = null;
function un(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        K(e, t, r);
      }
    else n.current = null;
}
function Fi(e, t, n) {
  try {
    n();
  } catch (r) {
    K(e, t, r);
  }
}
var la = !1;
function Xh(e, t) {
  if (((Si = xl), (e = Mc()), Ss(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            s = -1,
            u = -1,
            a = 0,
            c = 0,
            f = e,
            m = null;
          t: for (;;) {
            for (
              var S;
              f !== n || (l !== 0 && f.nodeType !== 3) || (s = i + l),
                f !== o || (r !== 0 && f.nodeType !== 3) || (u = i + r),
                f.nodeType === 3 && (i += f.nodeValue.length),
                (S = f.firstChild) !== null;

            )
              (m = f), (f = S);
            for (;;) {
              if (f === e) break t;
              if (
                (m === n && ++a === l && (s = i),
                m === o && ++c === r && (u = i),
                (S = f.nextSibling) !== null)
              )
                break;
              (f = m), (m = f.parentNode);
            }
            f = S;
          }
          n = s === -1 || u === -1 ? null : { start: s, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (xi = { focusedElem: e, selectionRange: n }, xl = !1, _ = t; _ !== null; )
    if (((t = _), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (_ = e);
    else
      for (; _ !== null; ) {
        t = _;
        try {
          var g = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (g !== null) {
                  var v = g.memoizedProps,
                    x = g.memoizedState,
                    p = t.stateNode,
                    d = p.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? v : Ie(t.type, v),
                      x
                    );
                  p.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var h = t.stateNode.containerInfo;
                h.nodeType === 1
                  ? (h.textContent = "")
                  : h.nodeType === 9 &&
                    h.documentElement &&
                    h.removeChild(h.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(C(163));
            }
        } catch (E) {
          K(t, t.return, E);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (_ = e);
          break;
        }
        _ = t.return;
      }
  return (g = la), (la = !1), g;
}
function nr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        (l.destroy = void 0), o !== void 0 && Fi(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function to(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Ui(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function If(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), If(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Je], delete t[mr], delete t[Ci], delete t[Oh], delete t[Lh])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Ff(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function oa(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Ff(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Mi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Cl));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Mi(e, t, n), e = e.sibling; e !== null; ) Mi(e, t, n), (e = e.sibling);
}
function Bi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Bi(e, t, n), e = e.sibling; e !== null; ) Bi(e, t, n), (e = e.sibling);
}
var re = null,
  Fe = !1;
function st(e, t, n) {
  for (n = n.child; n !== null; ) Uf(e, t, n), (n = n.sibling);
}
function Uf(e, t, n) {
  if (qe && typeof qe.onCommitFiberUnmount == "function")
    try {
      qe.onCommitFiberUnmount(Jl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ae || un(n, t);
    case 6:
      var r = re,
        l = Fe;
      (re = null),
        st(e, t, n),
        (re = r),
        (Fe = l),
        re !== null &&
          (Fe
            ? ((e = re),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : re.removeChild(n.stateNode));
      break;
    case 18:
      re !== null &&
        (Fe
          ? ((e = re),
            (n = n.stateNode),
            e.nodeType === 8
              ? Fo(e.parentNode, n)
              : e.nodeType === 1 && Fo(e, n),
            cr(e))
          : Fo(re, n.stateNode));
      break;
    case 4:
      (r = re),
        (l = Fe),
        (re = n.stateNode.containerInfo),
        (Fe = !0),
        st(e, t, n),
        (re = r),
        (Fe = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ae &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var o = l,
            i = o.destroy;
          (o = o.tag),
            i !== void 0 && (o & 2 || o & 4) && Fi(n, t, i),
            (l = l.next);
        } while (l !== r);
      }
      st(e, t, n);
      break;
    case 1:
      if (
        !ae &&
        (un(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (s) {
          K(n, t, s);
        }
      st(e, t, n);
      break;
    case 21:
      st(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ae = (r = ae) || n.memoizedState !== null), st(e, t, n), (ae = r))
        : st(e, t, n);
      break;
    default:
      st(e, t, n);
  }
}
function ia(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new qh()),
      t.forEach(function (r) {
        var l = lm.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function Ae(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e,
          i = t,
          s = i;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 5:
              (re = s.stateNode), (Fe = !1);
              break e;
            case 3:
              (re = s.stateNode.containerInfo), (Fe = !0);
              break e;
            case 4:
              (re = s.stateNode.containerInfo), (Fe = !0);
              break e;
          }
          s = s.return;
        }
        if (re === null) throw Error(C(160));
        Uf(o, i, l), (re = null), (Fe = !1);
        var u = l.alternate;
        u !== null && (u.return = null), (l.return = null);
      } catch (a) {
        K(l, t, a);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Mf(t, e), (t = t.sibling);
}
function Mf(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ae(t, e), He(e), r & 4)) {
        try {
          nr(3, e, e.return), to(3, e);
        } catch (v) {
          K(e, e.return, v);
        }
        try {
          nr(5, e, e.return);
        } catch (v) {
          K(e, e.return, v);
        }
      }
      break;
    case 1:
      Ae(t, e), He(e), r & 512 && n !== null && un(n, n.return);
      break;
    case 5:
      if (
        (Ae(t, e),
        He(e),
        r & 512 && n !== null && un(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          ir(l, "");
        } catch (v) {
          K(e, e.return, v);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          s = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            s === "input" && o.type === "radio" && o.name != null && ic(l, o),
              ci(s, i);
            var a = ci(s, o);
            for (i = 0; i < u.length; i += 2) {
              var c = u[i],
                f = u[i + 1];
              c === "style"
                ? fc(l, f)
                : c === "dangerouslySetInnerHTML"
                ? ac(l, f)
                : c === "children"
                ? ir(l, f)
                : ss(l, c, f, a);
            }
            switch (s) {
              case "input":
                oi(l, o);
                break;
              case "textarea":
                sc(l, o);
                break;
              case "select":
                var m = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var S = o.value;
                S != null
                  ? cn(l, !!o.multiple, S, !1)
                  : m !== !!o.multiple &&
                    (o.defaultValue != null
                      ? cn(l, !!o.multiple, o.defaultValue, !0)
                      : cn(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[mr] = o;
          } catch (v) {
            K(e, e.return, v);
          }
      }
      break;
    case 6:
      if ((Ae(t, e), He(e), r & 4)) {
        if (e.stateNode === null) throw Error(C(162));
        (l = e.stateNode), (o = e.memoizedProps);
        try {
          l.nodeValue = o;
        } catch (v) {
          K(e, e.return, v);
        }
      }
      break;
    case 3:
      if (
        (Ae(t, e), He(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          cr(t.containerInfo);
        } catch (v) {
          K(e, e.return, v);
        }
      break;
    case 4:
      Ae(t, e), He(e);
      break;
    case 13:
      Ae(t, e),
        He(e),
        (l = e.child),
        l.flags & 8192 &&
          ((o = l.memoizedState !== null),
          (l.stateNode.isHidden = o),
          !o ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Bs = q())),
        r & 4 && ia(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ae = (a = ae) || c), Ae(t, e), (ae = a)) : Ae(t, e),
        He(e),
        r & 8192)
      ) {
        if (
          ((a = e.memoizedState !== null),
          (e.stateNode.isHidden = a) && !c && e.mode & 1)
        )
          for (_ = e, c = e.child; c !== null; ) {
            for (f = _ = c; _ !== null; ) {
              switch (((m = _), (S = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  nr(4, m, m.return);
                  break;
                case 1:
                  un(m, m.return);
                  var g = m.stateNode;
                  if (typeof g.componentWillUnmount == "function") {
                    (r = m), (n = m.return);
                    try {
                      (t = r),
                        (g.props = t.memoizedProps),
                        (g.state = t.memoizedState),
                        g.componentWillUnmount();
                    } catch (v) {
                      K(r, n, v);
                    }
                  }
                  break;
                case 5:
                  un(m, m.return);
                  break;
                case 22:
                  if (m.memoizedState !== null) {
                    ua(f);
                    continue;
                  }
              }
              S !== null ? ((S.return = m), (_ = S)) : ua(f);
            }
            c = c.sibling;
          }
        e: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                (l = f.stateNode),
                  a
                    ? ((o = l.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((s = f.stateNode),
                      (u = f.memoizedProps.style),
                      (i =
                        u != null && u.hasOwnProperty("display")
                          ? u.display
                          : null),
                      (s.style.display = cc("display", i)));
              } catch (v) {
                K(e, e.return, v);
              }
            }
          } else if (f.tag === 6) {
            if (c === null)
              try {
                f.stateNode.nodeValue = a ? "" : f.memoizedProps;
              } catch (v) {
                K(e, e.return, v);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            c === f && (c = null), (f = f.return);
          }
          c === f && (c = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      Ae(t, e), He(e), r & 4 && ia(e);
      break;
    case 21:
      break;
    default:
      Ae(t, e), He(e);
  }
}
function He(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Ff(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(C(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (ir(l, ""), (r.flags &= -33));
          var o = oa(e);
          Bi(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            s = oa(e);
          Mi(e, s, i);
          break;
        default:
          throw Error(C(161));
      }
    } catch (u) {
      K(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Gh(e, t, n) {
  (_ = e), Bf(e);
}
function Bf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; _ !== null; ) {
    var l = _,
      o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Yr;
      if (!i) {
        var s = l.alternate,
          u = (s !== null && s.memoizedState !== null) || ae;
        s = Yr;
        var a = ae;
        if (((Yr = i), (ae = u) && !a))
          for (_ = l; _ !== null; )
            (i = _),
              (u = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? aa(l)
                : u !== null
                ? ((u.return = i), (_ = u))
                : aa(l);
        for (; o !== null; ) (_ = o), Bf(o), (o = o.sibling);
        (_ = l), (Yr = s), (ae = a);
      }
      sa(e);
    } else
      l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (_ = o)) : sa(e);
  }
}
function sa(e) {
  for (; _ !== null; ) {
    var t = _;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ae || to(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ae)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Ie(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && Qu(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Qu(t, i, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var a = t.alternate;
                if (a !== null) {
                  var c = a.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && cr(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(C(163));
          }
        ae || (t.flags & 512 && Ui(t));
      } catch (m) {
        K(t, t.return, m);
      }
    }
    if (t === e) {
      _ = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (_ = n);
      break;
    }
    _ = t.return;
  }
}
function ua(e) {
  for (; _ !== null; ) {
    var t = _;
    if (t === e) {
      _ = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (_ = n);
      break;
    }
    _ = t.return;
  }
}
function aa(e) {
  for (; _ !== null; ) {
    var t = _;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            to(4, t);
          } catch (u) {
            K(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              K(t, l, u);
            }
          }
          var o = t.return;
          try {
            Ui(t);
          } catch (u) {
            K(t, o, u);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Ui(t);
          } catch (u) {
            K(t, i, u);
          }
      }
    } catch (u) {
      K(t, t.return, u);
    }
    if (t === e) {
      _ = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      (s.return = t.return), (_ = s);
      break;
    }
    _ = t.return;
  }
}
var Yh = Math.ceil,
  Al = ot.ReactCurrentDispatcher,
  Us = ot.ReactCurrentOwner,
  Oe = ot.ReactCurrentBatchConfig,
  I = 0,
  ne = null,
  G = null,
  le = 0,
  Ee = 0,
  an = _t(0),
  b = 0,
  xr = null,
  Ht = 0,
  no = 0,
  Ms = 0,
  rr = null,
  ye = null,
  Bs = 0,
  En = 1 / 0,
  Ge = null,
  Il = !1,
  $i = null,
  St = null,
  Zr = !1,
  pt = null,
  Fl = 0,
  lr = 0,
  Vi = null,
  al = -1,
  cl = 0;
function pe() {
  return I & 6 ? q() : al !== -1 ? al : (al = q());
}
function xt(e) {
  return e.mode & 1
    ? I & 2 && le !== 0
      ? le & -le
      : Dh.transition !== null
      ? (cl === 0 && (cl = kc()), cl)
      : ((e = F),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Tc(e.type))),
        e)
    : 1;
}
function Be(e, t, n, r) {
  if (50 < lr) throw ((lr = 0), (Vi = null), Error(C(185)));
  _r(e, n, r),
    (!(I & 2) || e !== ne) &&
      (e === ne && (!(I & 2) && (no |= n), b === 4 && ft(e, le)),
      Se(e, r),
      n === 1 && I === 0 && !(t.mode & 1) && ((En = q() + 500), Zl && Pt()));
}
function Se(e, t) {
  var n = e.callbackNode;
  Dp(e, t);
  var r = Sl(e, e === ne ? le : 0);
  if (r === 0)
    n !== null && vu(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && vu(n), t === 1))
      e.tag === 0 ? zh(ca.bind(null, e)) : Xc(ca.bind(null, e)),
        jh(function () {
          !(I & 6) && Pt();
        }),
        (n = null);
    else {
      switch (Cc(r)) {
        case 1:
          n = ds;
          break;
        case 4:
          n = xc;
          break;
        case 16:
          n = wl;
          break;
        case 536870912:
          n = Ec;
          break;
        default:
          n = wl;
      }
      n = qf(n, $f.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function $f(e, t) {
  if (((al = -1), (cl = 0), I & 6)) throw Error(C(327));
  var n = e.callbackNode;
  if (mn() && e.callbackNode !== n) return null;
  var r = Sl(e, e === ne ? le : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ul(e, r);
  else {
    t = r;
    var l = I;
    I |= 2;
    var o = Wf();
    (ne !== e || le !== t) && ((Ge = null), (En = q() + 500), Ut(e, t));
    do
      try {
        em();
        break;
      } catch (s) {
        Vf(e, s);
      }
    while (1);
    Ns(),
      (Al.current = o),
      (I = l),
      G !== null ? (t = 0) : ((ne = null), (le = 0), (t = b));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = mi(e)), l !== 0 && ((r = l), (t = Wi(e, l)))), t === 1)
    )
      throw ((n = xr), Ut(e, 0), ft(e, r), Se(e, q()), n);
    if (t === 6) ft(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Zh(l) &&
          ((t = Ul(e, r)),
          t === 2 && ((o = mi(e)), o !== 0 && ((r = o), (t = Wi(e, o)))),
          t === 1))
      )
        throw ((n = xr), Ut(e, 0), ft(e, r), Se(e, q()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(C(345));
        case 2:
          zt(e, ye, Ge);
          break;
        case 3:
          if (
            (ft(e, r), (r & 130023424) === r && ((t = Bs + 500 - q()), 10 < t))
          ) {
            if (Sl(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              pe(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = ki(zt.bind(null, e, ye, Ge), t);
            break;
          }
          zt(e, ye, Ge);
          break;
        case 4:
          if ((ft(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Me(r);
            (o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o);
          }
          if (
            ((r = l),
            (r = q() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * Yh(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = ki(zt.bind(null, e, ye, Ge), r);
            break;
          }
          zt(e, ye, Ge);
          break;
        case 5:
          zt(e, ye, Ge);
          break;
        default:
          throw Error(C(329));
      }
    }
  }
  return Se(e, q()), e.callbackNode === n ? $f.bind(null, e) : null;
}
function Wi(e, t) {
  var n = rr;
  return (
    e.current.memoizedState.isDehydrated && (Ut(e, t).flags |= 256),
    (e = Ul(e, t)),
    e !== 2 && ((t = ye), (ye = n), t !== null && Hi(t)),
    e
  );
}
function Hi(e) {
  ye === null ? (ye = e) : ye.push.apply(ye, e);
}
function Zh(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            o = l.getSnapshot;
          l = l.value;
          try {
            if (!Ve(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function ft(e, t) {
  for (
    t &= ~Ms,
      t &= ~no,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Me(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function ca(e) {
  if (I & 6) throw Error(C(327));
  mn();
  var t = Sl(e, 0);
  if (!(t & 1)) return Se(e, q()), null;
  var n = Ul(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = mi(e);
    r !== 0 && ((t = r), (n = Wi(e, r)));
  }
  if (n === 1) throw ((n = xr), Ut(e, 0), ft(e, t), Se(e, q()), n);
  if (n === 6) throw Error(C(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    zt(e, ye, Ge),
    Se(e, q()),
    null
  );
}
function $s(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t);
  } finally {
    (I = n), I === 0 && ((En = q() + 500), Zl && Pt());
  }
}
function Qt(e) {
  pt !== null && pt.tag === 0 && !(I & 6) && mn();
  var t = I;
  I |= 1;
  var n = Oe.transition,
    r = F;
  try {
    if (((Oe.transition = null), (F = 1), e)) return e();
  } finally {
    (F = r), (Oe.transition = n), (I = t), !(I & 6) && Pt();
  }
}
function Vs() {
  (Ee = an.current), B(an);
}
function Ut(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Ph(n)), G !== null))
    for (n = G.return; n !== null; ) {
      var r = n;
      switch ((Es(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Nl();
          break;
        case 3:
          Sn(), B(ve), B(fe), Os();
          break;
        case 5:
          Ts(r);
          break;
        case 4:
          Sn();
          break;
        case 13:
          B(W);
          break;
        case 19:
          B(W);
          break;
        case 10:
          Rs(r.type._context);
          break;
        case 22:
        case 23:
          Vs();
      }
      n = n.return;
    }
  if (
    ((ne = e),
    (G = e = Et(e.current, null)),
    (le = Ee = t),
    (b = 0),
    (xr = null),
    (Ms = no = Ht = 0),
    (ye = rr = null),
    At !== null)
  ) {
    for (t = 0; t < At.length; t++)
      if (((n = At[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          o = n.pending;
        if (o !== null) {
          var i = o.next;
          (o.next = l), (r.next = i);
        }
        n.pending = r;
      }
    At = null;
  }
  return e;
}
function Vf(e, t) {
  do {
    var n = G;
    try {
      if ((Ns(), (il.current = Dl), zl)) {
        for (var r = H.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        zl = !1;
      }
      if (
        ((Wt = 0),
        (te = Z = H = null),
        (tr = !1),
        (vr = 0),
        (Us.current = null),
        n === null || n.return === null)
      ) {
        (b = 1), (xr = t), (G = null);
        break;
      }
      e: {
        var o = e,
          i = n.return,
          s = n,
          u = t;
        if (
          ((t = le),
          (s.flags |= 32768),
          u !== null && typeof u == "object" && typeof u.then == "function")
        ) {
          var a = u,
            c = s,
            f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var m = c.alternate;
            m
              ? ((c.updateQueue = m.updateQueue),
                (c.memoizedState = m.memoizedState),
                (c.lanes = m.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var S = Yu(i);
          if (S !== null) {
            (S.flags &= -257),
              Zu(S, i, s, o, t),
              S.mode & 1 && Gu(o, a, t),
              (t = S),
              (u = a);
            var g = t.updateQueue;
            if (g === null) {
              var v = new Set();
              v.add(u), (t.updateQueue = v);
            } else g.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Gu(o, a, t), Ws();
              break e;
            }
            u = Error(C(426));
          }
        } else if (V && s.mode & 1) {
          var x = Yu(i);
          if (x !== null) {
            !(x.flags & 65536) && (x.flags |= 256),
              Zu(x, i, s, o, t),
              ks(xn(u, s));
            break e;
          }
        }
        (o = u = xn(u, s)),
          b !== 4 && (b = 2),
          rr === null ? (rr = [o]) : rr.push(o),
          (o = i);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var p = Nf(o, u, t);
              Hu(o, p);
              break e;
            case 1:
              s = u;
              var d = o.type,
                h = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof d.getDerivedStateFromError == "function" ||
                  (h !== null &&
                    typeof h.componentDidCatch == "function" &&
                    (St === null || !St.has(h))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var E = Rf(o, s, t);
                Hu(o, E);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Qf(n);
    } catch (N) {
      (t = N), G === n && n !== null && (G = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function Wf() {
  var e = Al.current;
  return (Al.current = Dl), e === null ? Dl : e;
}
function Ws() {
  (b === 0 || b === 3 || b === 2) && (b = 4),
    ne === null || (!(Ht & 268435455) && !(no & 268435455)) || ft(ne, le);
}
function Ul(e, t) {
  var n = I;
  I |= 2;
  var r = Wf();
  (ne !== e || le !== t) && ((Ge = null), Ut(e, t));
  do
    try {
      bh();
      break;
    } catch (l) {
      Vf(e, l);
    }
  while (1);
  if ((Ns(), (I = n), (Al.current = r), G !== null)) throw Error(C(261));
  return (ne = null), (le = 0), b;
}
function bh() {
  for (; G !== null; ) Hf(G);
}
function em() {
  for (; G !== null && !Np(); ) Hf(G);
}
function Hf(e) {
  var t = Jf(e.alternate, e, Ee);
  (e.memoizedProps = e.pendingProps),
    t === null ? Qf(e) : (G = t),
    (Us.current = null);
}
function Qf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Jh(n, t)), n !== null)) {
        (n.flags &= 32767), (G = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (b = 6), (G = null);
        return;
      }
    } else if (((n = Kh(n, t, Ee)), n !== null)) {
      G = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      G = t;
      return;
    }
    G = t = e;
  } while (t !== null);
  b === 0 && (b = 5);
}
function zt(e, t, n) {
  var r = F,
    l = Oe.transition;
  try {
    (Oe.transition = null), (F = 1), tm(e, t, n, r);
  } finally {
    (Oe.transition = l), (F = r);
  }
  return null;
}
function tm(e, t, n, r) {
  do mn();
  while (pt !== null);
  if (I & 6) throw Error(C(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(C(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (Ap(e, o),
    e === ne && ((G = ne = null), (le = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Zr ||
      ((Zr = !0),
      qf(wl, function () {
        return mn(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = Oe.transition), (Oe.transition = null);
    var i = F;
    F = 1;
    var s = I;
    (I |= 4),
      (Us.current = null),
      Xh(e, n),
      Mf(n, e),
      xh(xi),
      (xl = !!Si),
      (xi = Si = null),
      (e.current = n),
      Gh(n),
      Rp(),
      (I = s),
      (F = i),
      (Oe.transition = o);
  } else e.current = n;
  if (
    (Zr && ((Zr = !1), (pt = e), (Fl = l)),
    (o = e.pendingLanes),
    o === 0 && (St = null),
    jp(n.stateNode),
    Se(e, q()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Il) throw ((Il = !1), (e = $i), ($i = null), e);
  return (
    Fl & 1 && e.tag !== 0 && mn(),
    (o = e.pendingLanes),
    o & 1 ? (e === Vi ? lr++ : ((lr = 0), (Vi = e))) : (lr = 0),
    Pt(),
    null
  );
}
function mn() {
  if (pt !== null) {
    var e = Cc(Fl),
      t = Oe.transition,
      n = F;
    try {
      if (((Oe.transition = null), (F = 16 > e ? 16 : e), pt === null))
        var r = !1;
      else {
        if (((e = pt), (pt = null), (Fl = 0), I & 6)) throw Error(C(331));
        var l = I;
        for (I |= 4, _ = e.current; _ !== null; ) {
          var o = _,
            i = o.child;
          if (_.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var a = s[u];
                for (_ = a; _ !== null; ) {
                  var c = _;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      nr(8, c, o);
                  }
                  var f = c.child;
                  if (f !== null) (f.return = c), (_ = f);
                  else
                    for (; _ !== null; ) {
                      c = _;
                      var m = c.sibling,
                        S = c.return;
                      if ((If(c), c === a)) {
                        _ = null;
                        break;
                      }
                      if (m !== null) {
                        (m.return = S), (_ = m);
                        break;
                      }
                      _ = S;
                    }
                }
              }
              var g = o.alternate;
              if (g !== null) {
                var v = g.child;
                if (v !== null) {
                  g.child = null;
                  do {
                    var x = v.sibling;
                    (v.sibling = null), (v = x);
                  } while (v !== null);
                }
              }
              _ = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) (i.return = o), (_ = i);
          else
            e: for (; _ !== null; ) {
              if (((o = _), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    nr(9, o, o.return);
                }
              var p = o.sibling;
              if (p !== null) {
                (p.return = o.return), (_ = p);
                break e;
              }
              _ = o.return;
            }
        }
        var d = e.current;
        for (_ = d; _ !== null; ) {
          i = _;
          var h = i.child;
          if (i.subtreeFlags & 2064 && h !== null) (h.return = i), (_ = h);
          else
            e: for (i = d; _ !== null; ) {
              if (((s = _), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      to(9, s);
                  }
                } catch (N) {
                  K(s, s.return, N);
                }
              if (s === i) {
                _ = null;
                break e;
              }
              var E = s.sibling;
              if (E !== null) {
                (E.return = s.return), (_ = E);
                break e;
              }
              _ = s.return;
            }
        }
        if (
          ((I = l), Pt(), qe && typeof qe.onPostCommitFiberRoot == "function")
        )
          try {
            qe.onPostCommitFiberRoot(Jl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (F = n), (Oe.transition = t);
    }
  }
  return !1;
}
function fa(e, t, n) {
  (t = xn(n, t)),
    (t = Nf(e, t, 1)),
    (e = wt(e, t, 1)),
    (t = pe()),
    e !== null && (_r(e, 1, t), Se(e, t));
}
function K(e, t, n) {
  if (e.tag === 3) fa(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        fa(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (St === null || !St.has(r)))
        ) {
          (e = xn(n, e)),
            (e = Rf(t, e, 1)),
            (t = wt(t, e, 1)),
            (e = pe()),
            t !== null && (_r(t, 1, e), Se(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function nm(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = pe()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ne === e &&
      (le & n) === n &&
      (b === 4 || (b === 3 && (le & 130023424) === le && 500 > q() - Bs)
        ? Ut(e, 0)
        : (Ms |= n)),
    Se(e, t);
}
function Kf(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Vr), (Vr <<= 1), !(Vr & 130023424) && (Vr = 4194304))
      : (t = 1));
  var n = pe();
  (e = rt(e, t)), e !== null && (_r(e, t, n), Se(e, n));
}
function rm(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Kf(e, n);
}
function lm(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(C(314));
  }
  r !== null && r.delete(t), Kf(e, n);
}
var Jf;
Jf = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || ve.current) ge = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (ge = !1), Qh(e, t, n);
      ge = !!(e.flags & 131072);
    }
  else (ge = !1), V && t.flags & 1048576 && Gc(t, Pl, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      ul(e, t), (e = t.pendingProps);
      var l = gn(t, fe.current);
      hn(t, n), (l = zs(null, t, r, e, l, n));
      var o = Ds();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            we(r) ? ((o = !0), Rl(t)) : (o = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Ps(t),
            (l.updater = eo),
            (t.stateNode = l),
            (l._reactInternals = t),
            Ti(t, r, e, n),
            (t = zi(null, t, r, !0, o, n)))
          : ((t.tag = 0), V && o && xs(t), de(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (ul(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = im(r)),
          (e = Ie(r, e)),
          l)
        ) {
          case 0:
            t = Li(null, t, r, e, n);
            break e;
          case 1:
            t = ta(null, t, r, e, n);
            break e;
          case 11:
            t = bu(null, t, r, e, n);
            break e;
          case 14:
            t = ea(null, t, r, Ie(r.type, e), n);
            break e;
        }
        throw Error(C(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ie(r, l)),
        Li(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ie(r, l)),
        ta(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((Tf(t), e === null)) throw Error(C(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (l = o.element),
          nf(e, t),
          Ol(t, r, null, n);
        var i = t.memoizedState;
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (l = xn(Error(C(423)), t)), (t = na(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = xn(Error(C(424)), t)), (t = na(e, t, r, n, l));
            break e;
          } else
            for (
              ke = vt(t.stateNode.containerInfo.firstChild),
                Ce = t,
                V = !0,
                Ue = null,
                n = ef(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((vn(), r === l)) {
            t = lt(e, t, n);
            break e;
          }
          de(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        rf(t),
        e === null && _i(t),
        (r = t.type),
        (l = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = l.children),
        Ei(r, l) ? (i = null) : o !== null && Ei(r, o) && (t.flags |= 32),
        jf(e, t),
        de(e, t, i, n),
        t.child
      );
    case 6:
      return e === null && _i(t), null;
    case 13:
      return Of(e, t, n);
    case 4:
      return (
        js(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = wn(t, null, r, n)) : de(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ie(r, l)),
        bu(e, t, r, l, n)
      );
    case 7:
      return de(e, t, t.pendingProps, n), t.child;
    case 8:
      return de(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return de(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (o = t.memoizedProps),
          (i = l.value),
          U(jl, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (Ve(o.value, i)) {
            if (o.children === l.children && !ve.current) {
              t = lt(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var s = o.dependencies;
              if (s !== null) {
                i = o.child;
                for (var u = s.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (o.tag === 1) {
                      (u = et(-1, n & -n)), (u.tag = 2);
                      var a = o.updateQueue;
                      if (a !== null) {
                        a = a.shared;
                        var c = a.pending;
                        c === null
                          ? (u.next = u)
                          : ((u.next = c.next), (c.next = u)),
                          (a.pending = u);
                      }
                    }
                    (o.lanes |= n),
                      (u = o.alternate),
                      u !== null && (u.lanes |= n),
                      Pi(o.return, n, t),
                      (s.lanes |= n);
                    break;
                  }
                  u = u.next;
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(C(341));
                (i.lanes |= n),
                  (s = i.alternate),
                  s !== null && (s.lanes |= n),
                  Pi(i, n, t),
                  (i = o.sibling);
              } else i = o.child;
              if (i !== null) i.return = o;
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((o = i.sibling), o !== null)) {
                    (o.return = i.return), (i = o);
                    break;
                  }
                  i = i.return;
                }
              o = i;
            }
        de(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        hn(t, n),
        (l = Le(l)),
        (r = r(l)),
        (t.flags |= 1),
        de(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = Ie(r, t.pendingProps)),
        (l = Ie(r.type, l)),
        ea(e, t, r, l, n)
      );
    case 15:
      return _f(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ie(r, l)),
        ul(e, t),
        (t.tag = 1),
        we(r) ? ((e = !0), Rl(t)) : (e = !1),
        hn(t, n),
        Cf(t, r, l),
        Ti(t, r, l, n),
        zi(null, t, r, !0, e, n)
      );
    case 19:
      return Lf(e, t, n);
    case 22:
      return Pf(e, t, n);
  }
  throw Error(C(156, t.tag));
};
function qf(e, t) {
  return Sc(e, t);
}
function om(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Te(e, t, n, r) {
  return new om(e, t, n, r);
}
function Hs(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function im(e) {
  if (typeof e == "function") return Hs(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === as)) return 11;
    if (e === cs) return 14;
  }
  return 2;
}
function Et(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Te(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function fl(e, t, n, r, l, o) {
  var i = 2;
  if (((r = e), typeof e == "function")) Hs(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case Zt:
        return Mt(n.children, l, o, t);
      case us:
        (i = 8), (l |= 8);
        break;
      case ei:
        return (
          (e = Te(12, n, t, l | 2)), (e.elementType = ei), (e.lanes = o), e
        );
      case ti:
        return (e = Te(13, n, t, l)), (e.elementType = ti), (e.lanes = o), e;
      case ni:
        return (e = Te(19, n, t, l)), (e.elementType = ni), (e.lanes = o), e;
      case rc:
        return ro(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case tc:
              i = 10;
              break e;
            case nc:
              i = 9;
              break e;
            case as:
              i = 11;
              break e;
            case cs:
              i = 14;
              break e;
            case ut:
              (i = 16), (r = null);
              break e;
          }
        throw Error(C(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Te(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function Mt(e, t, n, r) {
  return (e = Te(7, e, r, t)), (e.lanes = n), e;
}
function ro(e, t, n, r) {
  return (
    (e = Te(22, e, r, t)),
    (e.elementType = rc),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Qo(e, t, n) {
  return (e = Te(6, e, null, t)), (e.lanes = n), e;
}
function Ko(e, t, n) {
  return (
    (t = Te(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function sm(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Ro(0)),
    (this.expirationTimes = Ro(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ro(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function Qs(e, t, n, r, l, o, i, s, u) {
  return (
    (e = new sm(e, t, n, s, u)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Te(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Ps(o),
    e
  );
}
function um(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Yt,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Xf(e) {
  if (!e) return Nt;
  e = e._reactInternals;
  e: {
    if (Xt(e) !== e || e.tag !== 1) throw Error(C(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (we(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(C(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (we(n)) return qc(e, n, t);
  }
  return t;
}
function Gf(e, t, n, r, l, o, i, s, u) {
  return (
    (e = Qs(n, r, !0, e, l, o, i, s, u)),
    (e.context = Xf(null)),
    (n = e.current),
    (r = pe()),
    (l = xt(n)),
    (o = et(r, l)),
    (o.callback = t ?? null),
    wt(n, o, l),
    (e.current.lanes = l),
    _r(e, l, r),
    Se(e, r),
    e
  );
}
function lo(e, t, n, r) {
  var l = t.current,
    o = pe(),
    i = xt(l);
  return (
    (n = Xf(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = et(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = wt(l, t, i)),
    e !== null && (Be(e, l, i, o), ol(e, l, i)),
    i
  );
}
function Ml(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function da(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ks(e, t) {
  da(e, t), (e = e.alternate) && da(e, t);
}
function am() {
  return null;
}
var Yf =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Js(e) {
  this._internalRoot = e;
}
oo.prototype.render = Js.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(C(409));
  lo(e, t, null, null);
};
oo.prototype.unmount = Js.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Qt(function () {
      lo(null, e, null, null);
    }),
      (t[nt] = null);
  }
};
function oo(e) {
  this._internalRoot = e;
}
oo.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = _c();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ct.length && t !== 0 && t < ct[n].priority; n++);
    ct.splice(n, 0, e), n === 0 && jc(e);
  }
};
function qs(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function io(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function pa() {}
function cm(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var a = Ml(i);
        o.call(a);
      };
    }
    var i = Gf(t, r, e, 0, null, !1, !1, "", pa);
    return (
      (e._reactRootContainer = i),
      (e[nt] = i.current),
      pr(e.nodeType === 8 ? e.parentNode : e),
      Qt(),
      i
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var a = Ml(u);
      s.call(a);
    };
  }
  var u = Qs(e, 0, !1, null, null, !1, !1, "", pa);
  return (
    (e._reactRootContainer = u),
    (e[nt] = u.current),
    pr(e.nodeType === 8 ? e.parentNode : e),
    Qt(function () {
      lo(t, u, n, r);
    }),
    u
  );
}
function so(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var s = l;
      l = function () {
        var u = Ml(i);
        s.call(u);
      };
    }
    lo(t, i, e, l);
  } else i = cm(n, t, e, l, r);
  return Ml(i);
}
Nc = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = qn(t.pendingLanes);
        n !== 0 &&
          (ps(t, n | 1), Se(t, q()), !(I & 6) && ((En = q() + 500), Pt()));
      }
      break;
    case 13:
      Qt(function () {
        var r = rt(e, 1);
        if (r !== null) {
          var l = pe();
          Be(r, e, 1, l);
        }
      }),
        Ks(e, 1);
  }
};
hs = function (e) {
  if (e.tag === 13) {
    var t = rt(e, 134217728);
    if (t !== null) {
      var n = pe();
      Be(t, e, 134217728, n);
    }
    Ks(e, 134217728);
  }
};
Rc = function (e) {
  if (e.tag === 13) {
    var t = xt(e),
      n = rt(e, t);
    if (n !== null) {
      var r = pe();
      Be(n, e, t, r);
    }
    Ks(e, t);
  }
};
_c = function () {
  return F;
};
Pc = function (e, t) {
  var n = F;
  try {
    return (F = e), t();
  } finally {
    F = n;
  }
};
di = function (e, t, n) {
  switch (t) {
    case "input":
      if ((oi(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Yl(r);
            if (!l) throw Error(C(90));
            oc(r), oi(r, l);
          }
        }
      }
      break;
    case "textarea":
      sc(e, n);
      break;
    case "select":
      (t = n.value), t != null && cn(e, !!n.multiple, t, !1);
  }
};
hc = $s;
mc = Qt;
var fm = { usingClientEntryPoint: !1, Events: [jr, nn, Yl, dc, pc, $s] },
  Hn = {
    findFiberByHostInstance: Dt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  dm = {
    bundleType: Hn.bundleType,
    version: Hn.version,
    rendererPackageName: Hn.rendererPackageName,
    rendererConfig: Hn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ot.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = vc(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Hn.findFiberByHostInstance || am,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var br = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!br.isDisabled && br.supportsFiber)
    try {
      (Jl = br.inject(dm)), (qe = br);
    } catch {}
}
Re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fm;
Re.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!qs(t)) throw Error(C(200));
  return um(e, t, null, n);
};
Re.createRoot = function (e, t) {
  if (!qs(e)) throw Error(C(299));
  var n = !1,
    r = "",
    l = Yf;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = Qs(e, 1, !1, null, null, n, !1, r, l)),
    (e[nt] = t.current),
    pr(e.nodeType === 8 ? e.parentNode : e),
    new Js(t)
  );
};
Re.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(C(188))
      : ((e = Object.keys(e).join(",")), Error(C(268, e)));
  return (e = vc(t)), (e = e === null ? null : e.stateNode), e;
};
Re.flushSync = function (e) {
  return Qt(e);
};
Re.hydrate = function (e, t, n) {
  if (!io(t)) throw Error(C(200));
  return so(null, e, t, !0, n);
};
Re.hydrateRoot = function (e, t, n) {
  if (!qs(e)) throw Error(C(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    o = "",
    i = Yf;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = Gf(t, null, e, 1, n ?? null, l, !1, o, i)),
    (e[nt] = t.current),
    pr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new oo(t);
};
Re.render = function (e, t, n) {
  if (!io(t)) throw Error(C(200));
  return so(null, e, t, !1, n);
};
Re.unmountComponentAtNode = function (e) {
  if (!io(e)) throw Error(C(40));
  return e._reactRootContainer
    ? (Qt(function () {
        so(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[nt] = null);
        });
      }),
      !0)
    : !1;
};
Re.unstable_batchedUpdates = $s;
Re.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!io(n)) throw Error(C(200));
  if (e == null || e._reactInternals === void 0) throw Error(C(38));
  return so(e, t, n, !1, r);
};
Re.version = "18.3.1-next-f1338f8080-20240426";
function Zf() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Zf);
    } catch (e) {
      console.error(e);
    }
}
Zf(), (Ya.exports = Re);
var pm = Ya.exports,
  ha = pm;
(Zo.createRoot = ha.createRoot), (Zo.hydrateRoot = ha.hydrateRoot);
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Er() {
  return (
    (Er = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Er.apply(this, arguments)
  );
}
var ht;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(ht || (ht = {}));
const ma = "popstate";
function hm(e) {
  e === void 0 && (e = {});
  function t(r, l) {
    let { pathname: o, search: i, hash: s } = r.location;
    return Qi(
      "",
      { pathname: o, search: i, hash: s },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default"
    );
  }
  function n(r, l) {
    return typeof l == "string" ? l : Bl(l);
  }
  return ym(t, n, null, e);
}
function X(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function bf(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function mm() {
  return Math.random().toString(36).substr(2, 8);
}
function ya(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Qi(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    Er(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? _n(t) : t,
      { state: n, key: (t && t.key) || r || mm() }
    )
  );
}
function Bl(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function _n(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function ym(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: l = document.defaultView, v5Compat: o = !1 } = r,
    i = l.history,
    s = ht.Pop,
    u = null,
    a = c();
  a == null && ((a = 0), i.replaceState(Er({}, i.state, { idx: a }), ""));
  function c() {
    return (i.state || { idx: null }).idx;
  }
  function f() {
    s = ht.Pop;
    let x = c(),
      p = x == null ? null : x - a;
    (a = x), u && u({ action: s, location: v.location, delta: p });
  }
  function m(x, p) {
    s = ht.Push;
    let d = Qi(v.location, x, p);
    n && n(d, x), (a = c() + 1);
    let h = ya(d, a),
      E = v.createHref(d);
    try {
      i.pushState(h, "", E);
    } catch (N) {
      if (N instanceof DOMException && N.name === "DataCloneError") throw N;
      l.location.assign(E);
    }
    o && u && u({ action: s, location: v.location, delta: 1 });
  }
  function S(x, p) {
    s = ht.Replace;
    let d = Qi(v.location, x, p);
    n && n(d, x), (a = c());
    let h = ya(d, a),
      E = v.createHref(d);
    i.replaceState(h, "", E),
      o && u && u({ action: s, location: v.location, delta: 0 });
  }
  function g(x) {
    let p = l.location.origin !== "null" ? l.location.origin : l.location.href,
      d = typeof x == "string" ? x : Bl(x);
    return (
      (d = d.replace(/ $/, "%20")),
      X(
        p,
        "No window.location.(origin|href) available to create URL for href: " +
          d
      ),
      new URL(d, p)
    );
  }
  let v = {
    get action() {
      return s;
    },
    get location() {
      return e(l, i);
    },
    listen(x) {
      if (u) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(ma, f),
        (u = x),
        () => {
          l.removeEventListener(ma, f), (u = null);
        }
      );
    },
    createHref(x) {
      return t(l, x);
    },
    createURL: g,
    encodeLocation(x) {
      let p = g(x);
      return { pathname: p.pathname, search: p.search, hash: p.hash };
    },
    push: m,
    replace: S,
    go(x) {
      return i.go(x);
    },
  };
  return v;
}
var ga;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(ga || (ga = {}));
function gm(e, t, n) {
  return n === void 0 && (n = "/"), vm(e, t, n, !1);
}
function vm(e, t, n, r) {
  let l = typeof t == "string" ? _n(t) : t,
    o = Xs(l.pathname || "/", n);
  if (o == null) return null;
  let i = ed(e);
  wm(i);
  let s = null;
  for (let u = 0; s == null && u < i.length; ++u) {
    let a = Tm(o);
    s = Pm(i[u], a, r);
  }
  return s;
}
function ed(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let l = (o, i, s) => {
    let u = {
      relativePath: s === void 0 ? o.path || "" : s,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: i,
      route: o,
    };
    u.relativePath.startsWith("/") &&
      (X(
        u.relativePath.startsWith(r),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (u.relativePath = u.relativePath.slice(r.length)));
    let a = kt([r, u.relativePath]),
      c = n.concat(u);
    o.children &&
      o.children.length > 0 &&
      (X(
        o.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + a + '".')
      ),
      ed(o.children, t, c, a)),
      !(o.path == null && !o.index) &&
        t.push({ path: a, score: Rm(a, o.index), routesMeta: c });
  };
  return (
    e.forEach((o, i) => {
      var s;
      if (o.path === "" || !((s = o.path) != null && s.includes("?"))) l(o, i);
      else for (let u of td(o.path)) l(o, i, u);
    }),
    t
  );
}
function td(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return l ? [o, ""] : [o];
  let i = td(r.join("/")),
    s = [];
  return (
    s.push(...i.map((u) => (u === "" ? o : [o, u].join("/")))),
    l && s.push(...i),
    s.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
  );
}
function wm(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : _m(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const Sm = /^:[\w-]+$/,
  xm = 3,
  Em = 2,
  km = 1,
  Cm = 10,
  Nm = -2,
  va = (e) => e === "*";
function Rm(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(va) && (r += Nm),
    t && (r += Em),
    n
      .filter((l) => !va(l))
      .reduce((l, o) => l + (Sm.test(o) ? xm : o === "" ? km : Cm), r)
  );
}
function _m(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function Pm(e, t, n) {
  n === void 0 && (n = !1);
  let { routesMeta: r } = e,
    l = {},
    o = "/",
    i = [];
  for (let s = 0; s < r.length; ++s) {
    let u = r[s],
      a = s === r.length - 1,
      c = o === "/" ? t : t.slice(o.length) || "/",
      f = wa(
        { path: u.relativePath, caseSensitive: u.caseSensitive, end: a },
        c
      ),
      m = u.route;
    if (
      (!f &&
        a &&
        n &&
        !r[r.length - 1].route.index &&
        (f = wa(
          { path: u.relativePath, caseSensitive: u.caseSensitive, end: !1 },
          c
        )),
      !f)
    )
      return null;
    Object.assign(l, f.params),
      i.push({
        params: l,
        pathname: kt([o, f.pathname]),
        pathnameBase: Dm(kt([o, f.pathnameBase])),
        route: m,
      }),
      f.pathnameBase !== "/" && (o = kt([o, f.pathnameBase]));
  }
  return i;
}
function wa(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = jm(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let o = l[0],
    i = o.replace(/(.)\/+$/, "$1"),
    s = l.slice(1);
  return {
    params: r.reduce((a, c, f) => {
      let { paramName: m, isOptional: S } = c;
      if (m === "*") {
        let v = s[f] || "";
        i = o.slice(0, o.length - v.length).replace(/(.)\/+$/, "$1");
      }
      const g = s[f];
      return (
        S && !g ? (a[m] = void 0) : (a[m] = (g || "").replace(/%2F/g, "/")), a
      );
    }, {}),
    pathname: o,
    pathnameBase: i,
    pattern: e,
  };
}
function jm(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    bf(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (i, s, u) => (
            r.push({ paramName: s, isOptional: u != null }),
            u ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (l += "\\/*$")
      : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), r]
  );
}
function Tm(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      bf(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function Xs(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function Om(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: l = "",
  } = typeof e == "string" ? _n(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : Lm(n, t)) : t,
    search: Am(r),
    hash: Im(l),
  };
}
function Lm(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function Jo(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function zm(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function Gs(e, t) {
  let n = zm(e);
  return t
    ? n.map((r, l) => (l === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function Ys(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == "string"
    ? (l = _n(e))
    : ((l = Er({}, e)),
      X(
        !l.pathname || !l.pathname.includes("?"),
        Jo("?", "pathname", "search", l)
      ),
      X(
        !l.pathname || !l.pathname.includes("#"),
        Jo("#", "pathname", "hash", l)
      ),
      X(!l.search || !l.search.includes("#"), Jo("#", "search", "hash", l)));
  let o = e === "" || l.pathname === "",
    i = o ? "/" : l.pathname,
    s;
  if (i == null) s = n;
  else {
    let f = t.length - 1;
    if (!r && i.startsWith("..")) {
      let m = i.split("/");
      for (; m[0] === ".."; ) m.shift(), (f -= 1);
      l.pathname = m.join("/");
    }
    s = f >= 0 ? t[f] : "/";
  }
  let u = Om(l, s),
    a = i && i !== "/" && i.endsWith("/"),
    c = (o || i === ".") && n.endsWith("/");
  return !u.pathname.endsWith("/") && (a || c) && (u.pathname += "/"), u;
}
const kt = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Dm = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Am = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Im = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function Fm(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const nd = ["post", "put", "patch", "delete"];
new Set(nd);
const Um = ["get", ...nd];
new Set(Um);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function kr() {
  return (
    (kr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    kr.apply(this, arguments)
  );
}
const Zs = k.createContext(null),
  Mm = k.createContext(null),
  jt = k.createContext(null),
  uo = k.createContext(null),
  it = k.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  rd = k.createContext(null);
function Bm(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  Pn() || X(!1);
  let { basename: r, navigator: l } = k.useContext(jt),
    { hash: o, pathname: i, search: s } = od(e, { relative: n }),
    u = i;
  return (
    r !== "/" && (u = i === "/" ? r : kt([r, i])),
    l.createHref({ pathname: u, search: s, hash: o })
  );
}
function Pn() {
  return k.useContext(uo) != null;
}
function jn() {
  return Pn() || X(!1), k.useContext(uo).location;
}
function ld(e) {
  k.useContext(jt).static || k.useLayoutEffect(e);
}
function Or() {
  let { isDataRoute: e } = k.useContext(it);
  return e ? ty() : $m();
}
function $m() {
  Pn() || X(!1);
  let e = k.useContext(Zs),
    { basename: t, future: n, navigator: r } = k.useContext(jt),
    { matches: l } = k.useContext(it),
    { pathname: o } = jn(),
    i = JSON.stringify(Gs(l, n.v7_relativeSplatPath)),
    s = k.useRef(!1);
  return (
    ld(() => {
      s.current = !0;
    }),
    k.useCallback(
      function (a, c) {
        if ((c === void 0 && (c = {}), !s.current)) return;
        if (typeof a == "number") {
          r.go(a);
          return;
        }
        let f = Ys(a, JSON.parse(i), o, c.relative === "path");
        e == null &&
          t !== "/" &&
          (f.pathname = f.pathname === "/" ? t : kt([t, f.pathname])),
          (c.replace ? r.replace : r.push)(f, c.state, c);
      },
      [t, r, i, o, e]
    )
  );
}
const Vm = k.createContext(null);
function Wm(e) {
  let t = k.useContext(it).outlet;
  return t && k.createElement(Vm.Provider, { value: e }, t);
}
function od(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = k.useContext(jt),
    { matches: l } = k.useContext(it),
    { pathname: o } = jn(),
    i = JSON.stringify(Gs(l, r.v7_relativeSplatPath));
  return k.useMemo(() => Ys(e, JSON.parse(i), o, n === "path"), [e, i, o, n]);
}
function Hm(e, t) {
  return Qm(e, t);
}
function Qm(e, t, n, r) {
  Pn() || X(!1);
  let { navigator: l } = k.useContext(jt),
    { matches: o } = k.useContext(it),
    i = o[o.length - 1],
    s = i ? i.params : {};
  i && i.pathname;
  let u = i ? i.pathnameBase : "/";
  i && i.route;
  let a = jn(),
    c;
  if (t) {
    var f;
    let x = typeof t == "string" ? _n(t) : t;
    u === "/" || ((f = x.pathname) != null && f.startsWith(u)) || X(!1),
      (c = x);
  } else c = a;
  let m = c.pathname || "/",
    S = m;
  if (u !== "/") {
    let x = u.replace(/^\//, "").split("/");
    S = "/" + m.replace(/^\//, "").split("/").slice(x.length).join("/");
  }
  let g = gm(e, { pathname: S }),
    v = Gm(
      g &&
        g.map((x) =>
          Object.assign({}, x, {
            params: Object.assign({}, s, x.params),
            pathname: kt([
              u,
              l.encodeLocation
                ? l.encodeLocation(x.pathname).pathname
                : x.pathname,
            ]),
            pathnameBase:
              x.pathnameBase === "/"
                ? u
                : kt([
                    u,
                    l.encodeLocation
                      ? l.encodeLocation(x.pathnameBase).pathname
                      : x.pathnameBase,
                  ]),
          })
        ),
      o,
      n,
      r
    );
  return t && v
    ? k.createElement(
        uo.Provider,
        {
          value: {
            location: kr(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              c
            ),
            navigationType: ht.Pop,
          },
        },
        v
      )
    : v;
}
function Km() {
  let e = ey(),
    t = Fm(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" },
    o = null;
  return k.createElement(
    k.Fragment,
    null,
    k.createElement("h2", null, "Unexpected Application Error!"),
    k.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? k.createElement("pre", { style: l }, n) : null,
    o
  );
}
const Jm = k.createElement(Km, null);
class qm extends k.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error !== void 0
      ? k.createElement(
          it.Provider,
          { value: this.props.routeContext },
          k.createElement(rd.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function Xm(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = k.useContext(Zs);
  return (
    l &&
      l.static &&
      l.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    k.createElement(it.Provider, { value: t }, r)
  );
}
function Gm(e, t, n, r) {
  var l;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var o;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (o = r) != null &&
      o.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let i = e,
    s = (l = n) == null ? void 0 : l.errors;
  if (s != null) {
    let c = i.findIndex(
      (f) => f.route.id && (s == null ? void 0 : s[f.route.id]) !== void 0
    );
    c >= 0 || X(!1), (i = i.slice(0, Math.min(i.length, c + 1)));
  }
  let u = !1,
    a = -1;
  if (n && r && r.v7_partialHydration)
    for (let c = 0; c < i.length; c++) {
      let f = i[c];
      if (
        ((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (a = c),
        f.route.id)
      ) {
        let { loaderData: m, errors: S } = n,
          g =
            f.route.loader &&
            m[f.route.id] === void 0 &&
            (!S || S[f.route.id] === void 0);
        if (f.route.lazy || g) {
          (u = !0), a >= 0 ? (i = i.slice(0, a + 1)) : (i = [i[0]]);
          break;
        }
      }
    }
  return i.reduceRight((c, f, m) => {
    let S,
      g = !1,
      v = null,
      x = null;
    n &&
      ((S = s && f.route.id ? s[f.route.id] : void 0),
      (v = f.route.errorElement || Jm),
      u &&
        (a < 0 && m === 0
          ? (ny("route-fallback", !1), (g = !0), (x = null))
          : a === m &&
            ((g = !0), (x = f.route.hydrateFallbackElement || null))));
    let p = t.concat(i.slice(0, m + 1)),
      d = () => {
        let h;
        return (
          S
            ? (h = v)
            : g
            ? (h = x)
            : f.route.Component
            ? (h = k.createElement(f.route.Component, null))
            : f.route.element
            ? (h = f.route.element)
            : (h = c),
          k.createElement(Xm, {
            match: f,
            routeContext: { outlet: c, matches: p, isDataRoute: n != null },
            children: h,
          })
        );
      };
    return n && (f.route.ErrorBoundary || f.route.errorElement || m === 0)
      ? k.createElement(qm, {
          location: n.location,
          revalidation: n.revalidation,
          component: v,
          error: S,
          children: d(),
          routeContext: { outlet: null, matches: p, isDataRoute: !0 },
        })
      : d();
  }, null);
}
var id = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(id || {}),
  $l = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })($l || {});
function Ym(e) {
  let t = k.useContext(Zs);
  return t || X(!1), t;
}
function Zm(e) {
  let t = k.useContext(Mm);
  return t || X(!1), t;
}
function bm(e) {
  let t = k.useContext(it);
  return t || X(!1), t;
}
function sd(e) {
  let t = bm(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || X(!1), n.route.id;
}
function ey() {
  var e;
  let t = k.useContext(rd),
    n = Zm($l.UseRouteError),
    r = sd($l.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function ty() {
  let { router: e } = Ym(id.UseNavigateStable),
    t = sd($l.UseNavigateStable),
    n = k.useRef(!1);
  return (
    ld(() => {
      n.current = !0;
    }),
    k.useCallback(
      function (l, o) {
        o === void 0 && (o = {}),
          n.current &&
            (typeof l == "number"
              ? e.navigate(l)
              : e.navigate(l, kr({ fromRouteId: t }, o)));
      },
      [e, t]
    )
  );
}
const Sa = {};
function ny(e, t, n) {
  !t && !Sa[e] && (Sa[e] = !0);
}
function ry(e, t) {
  e == null || e.v7_startTransition,
    (e == null ? void 0 : e.v7_relativeSplatPath) === void 0 &&
      (!t || t.v7_relativeSplatPath),
    t &&
      (t.v7_fetcherPersist,
      t.v7_normalizeFormMethod,
      t.v7_partialHydration,
      t.v7_skipActionErrorRevalidation);
}
function ly(e) {
  let { to: t, replace: n, state: r, relative: l } = e;
  Pn() || X(!1);
  let { future: o, static: i } = k.useContext(jt),
    { matches: s } = k.useContext(it),
    { pathname: u } = jn(),
    a = Or(),
    c = Ys(t, Gs(s, o.v7_relativeSplatPath), u, l === "path"),
    f = JSON.stringify(c);
  return (
    k.useEffect(
      () => a(JSON.parse(f), { replace: n, state: r, relative: l }),
      [a, f, l, n, r]
    ),
    null
  );
}
function ud(e) {
  return Wm(e.context);
}
function ue(e) {
  X(!1);
}
function oy(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: l = ht.Pop,
    navigator: o,
    static: i = !1,
    future: s,
  } = e;
  Pn() && X(!1);
  let u = t.replace(/^\/*/, "/"),
    a = k.useMemo(
      () => ({
        basename: u,
        navigator: o,
        static: i,
        future: kr({ v7_relativeSplatPath: !1 }, s),
      }),
      [u, s, o, i]
    );
  typeof r == "string" && (r = _n(r));
  let {
      pathname: c = "/",
      search: f = "",
      hash: m = "",
      state: S = null,
      key: g = "default",
    } = r,
    v = k.useMemo(() => {
      let x = Xs(c, u);
      return x == null
        ? null
        : {
            location: { pathname: x, search: f, hash: m, state: S, key: g },
            navigationType: l,
          };
    }, [u, c, f, m, S, g, l]);
  return v == null
    ? null
    : k.createElement(
        jt.Provider,
        { value: a },
        k.createElement(uo.Provider, { children: n, value: v })
      );
}
function Tn(e) {
  let { children: t, location: n } = e;
  return Hm(Ki(t), n);
}
new Promise(() => {});
function Ki(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    k.Children.forEach(e, (r, l) => {
      if (!k.isValidElement(r)) return;
      let o = [...t, l];
      if (r.type === k.Fragment) {
        n.push.apply(n, Ki(r.props.children, o));
        return;
      }
      r.type !== ue && X(!1), !r.props.index || !r.props.children || X(!1);
      let i = {
        id: r.props.id || o.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (i.children = Ki(r.props.children, o)), n.push(i);
    }),
    n
  );
}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Ji() {
  return (
    (Ji = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ji.apply(this, arguments)
  );
}
function iy(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    o;
  for (o = 0; o < r.length; o++)
    (l = r[o]), !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
function sy(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function uy(e, t) {
  return e.button === 0 && (!t || t === "_self") && !sy(e);
}
const ay = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  cy = "6";
try {
  window.__reactRouterVersion = cy;
} catch {}
const fy = "startTransition",
  xa = np[fy];
function dy(e) {
  let { basename: t, children: n, future: r, window: l } = e,
    o = k.useRef();
  o.current == null && (o.current = hm({ window: l, v5Compat: !0 }));
  let i = o.current,
    [s, u] = k.useState({ action: i.action, location: i.location }),
    { v7_startTransition: a } = r || {},
    c = k.useCallback(
      (f) => {
        a && xa ? xa(() => u(f)) : u(f);
      },
      [u, a]
    );
  return (
    k.useLayoutEffect(() => i.listen(c), [i, c]),
    k.useEffect(() => ry(r), [r]),
    k.createElement(oy, {
      basename: t,
      children: n,
      location: s.location,
      navigationType: s.action,
      navigator: i,
      future: r,
    })
  );
}
const py =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  hy = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  ad = k.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: l,
        reloadDocument: o,
        replace: i,
        state: s,
        target: u,
        to: a,
        preventScrollReset: c,
        viewTransition: f,
      } = t,
      m = iy(t, ay),
      { basename: S } = k.useContext(jt),
      g,
      v = !1;
    if (typeof a == "string" && hy.test(a) && ((g = a), py))
      try {
        let h = new URL(window.location.href),
          E = a.startsWith("//") ? new URL(h.protocol + a) : new URL(a),
          N = Xs(E.pathname, S);
        E.origin === h.origin && N != null
          ? (a = N + E.search + E.hash)
          : (v = !0);
      } catch {}
    let x = Bm(a, { relative: l }),
      p = my(a, {
        replace: i,
        state: s,
        target: u,
        preventScrollReset: c,
        relative: l,
        viewTransition: f,
      });
    function d(h) {
      r && r(h), h.defaultPrevented || p(h);
    }
    return k.createElement(
      "a",
      Ji({}, m, { href: g || x, onClick: v || o ? r : d, ref: n, target: u })
    );
  });
var Ea;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(Ea || (Ea = {}));
var ka;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(ka || (ka = {}));
function my(e, t) {
  let {
      target: n,
      replace: r,
      state: l,
      preventScrollReset: o,
      relative: i,
      viewTransition: s,
    } = t === void 0 ? {} : t,
    u = Or(),
    a = jn(),
    c = od(e, { relative: i });
  return k.useCallback(
    (f) => {
      if (uy(f, n)) {
        f.preventDefault();
        let m = r !== void 0 ? r : Bl(a) === Bl(c);
        u(e, {
          replace: m,
          state: l,
          preventScrollReset: o,
          relative: i,
          viewTransition: s,
        });
      }
    },
    [a, u, c, r, l, n, e, o, i, s]
  );
}
const yy = () =>
    y.jsx("div", {
      className:
        "min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4",
      children: y.jsx(ud, {}),
    }),
  gy = () => {
    const [e, t] = k.useState(() => localStorage.getItem("theme") === "dark");
    return (
      k.useEffect(() => {
        const n = window.document.documentElement;
        e
          ? (n.classList.add("dark"), localStorage.setItem("theme", "dark"))
          : (n.classList.remove("dark"),
            localStorage.setItem("theme", "light"));
      }, [e]),
      y.jsx("button", {
        onClick: () => t(!e),
        className: "p-2 text-xl",
        title: "تبديل الوضع",
        children: e ? "🌙" : "☀️",
      })
    );
  },
  Ca = (e) => {
    let t;
    const n = new Set(),
      r = (c, f) => {
        const m = typeof c == "function" ? c(t) : c;
        if (!Object.is(m, t)) {
          const S = t;
          (t =
            f ?? (typeof m != "object" || m === null)
              ? m
              : Object.assign({}, t, m)),
            n.forEach((g) => g(t, S));
        }
      },
      l = () => t,
      u = {
        setState: r,
        getState: l,
        getInitialState: () => a,
        subscribe: (c) => (n.add(c), () => n.delete(c)),
        destroy: () => {
          n.clear();
        },
      },
      a = (t = e(r, l, u));
    return u;
  },
  vy = (e) => (e ? Ca(e) : Ca);
var cd = { exports: {} },
  fd = {},
  dd = { exports: {} },
  pd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var kn = k;
function wy(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Sy = typeof Object.is == "function" ? Object.is : wy,
  xy = kn.useState,
  Ey = kn.useEffect,
  ky = kn.useLayoutEffect,
  Cy = kn.useDebugValue;
function Ny(e, t) {
  var n = t(),
    r = xy({ inst: { value: n, getSnapshot: t } }),
    l = r[0].inst,
    o = r[1];
  return (
    ky(
      function () {
        (l.value = n), (l.getSnapshot = t), qo(l) && o({ inst: l });
      },
      [e, n, t]
    ),
    Ey(
      function () {
        return (
          qo(l) && o({ inst: l }),
          e(function () {
            qo(l) && o({ inst: l });
          })
        );
      },
      [e]
    ),
    Cy(n),
    n
  );
}
function qo(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Sy(e, n);
  } catch {
    return !0;
  }
}
function Ry(e, t) {
  return t();
}
var _y =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? Ry
    : Ny;
pd.useSyncExternalStore =
  kn.useSyncExternalStore !== void 0 ? kn.useSyncExternalStore : _y;
dd.exports = pd;
var Py = dd.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ao = k,
  jy = Py;
function Ty(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Oy = typeof Object.is == "function" ? Object.is : Ty,
  Ly = jy.useSyncExternalStore,
  zy = ao.useRef,
  Dy = ao.useEffect,
  Ay = ao.useMemo,
  Iy = ao.useDebugValue;
fd.useSyncExternalStoreWithSelector = function (e, t, n, r, l) {
  var o = zy(null);
  if (o.current === null) {
    var i = { hasValue: !1, value: null };
    o.current = i;
  } else i = o.current;
  o = Ay(
    function () {
      function u(S) {
        if (!a) {
          if (((a = !0), (c = S), (S = r(S)), l !== void 0 && i.hasValue)) {
            var g = i.value;
            if (l(g, S)) return (f = g);
          }
          return (f = S);
        }
        if (((g = f), Oy(c, S))) return g;
        var v = r(S);
        return l !== void 0 && l(g, v) ? ((c = S), g) : ((c = S), (f = v));
      }
      var a = !1,
        c,
        f,
        m = n === void 0 ? null : n;
      return [
        function () {
          return u(t());
        },
        m === null
          ? void 0
          : function () {
              return u(m());
            },
      ];
    },
    [t, n, r, l]
  );
  var s = Ly(e, o[0], o[1]);
  return (
    Dy(
      function () {
        (i.hasValue = !0), (i.value = s);
      },
      [s]
    ),
    Iy(s),
    s
  );
};
cd.exports = fd;
var Fy = cd.exports;
const Uy = es(Fy),
  { useDebugValue: My } = Xa,
  { useSyncExternalStoreWithSelector: By } = Uy;
const $y = (e) => e;
function Vy(e, t = $y, n) {
  const r = By(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return My(r), r;
}
const Na = (e) => {
    const t = typeof e == "function" ? vy(e) : e,
      n = (r, l) => Vy(t, r, l);
    return Object.assign(n, t), n;
  },
  Wy = (e) => (e ? Na(e) : Na),
  On = Wy((e) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    login: (t, n) => {
      e({ user: t, token: n }),
        localStorage.setItem("user", JSON.stringify(t)),
        localStorage.setItem("token", n),
        localStorage.setItem("loginTime", Date.now());
    },
    logout: () => {
      e({ user: null, token: null }),
        localStorage.removeItem("user"),
        localStorage.removeItem("token"),
        localStorage.removeItem("loginTime");
    },
  })),
  Hy = ({ children: e }) => {
    const { token: t } = On(),
      n = Number(localStorage.getItem("loginTime")),
      r = Date.now() - n > 60 * 60 * 1e3;
    return !t || r
      ? (localStorage.clear(), y.jsx(ly, { to: "/login", replace: !0 }))
      : e;
  },
  Qy = () => {
    const e = jn(),
      t = [
        { path: "/repairs", label: "الصيانات" },
        { path: "/technicians", label: "الفنيين" },
        { path: "/invoices", label: "الفواتير" },
        { path: "/backup", label: "النسخ الاحتياطي" },
      ];
    return y.jsx(Hy, {
      children: y.jsxs("div", {
        className:
          "min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white",
        children: [
          y.jsxs("header", {
            className:
              "flex items-center justify-between px-4 py-3 shadow bg-white dark:bg-gray-800",
            children: [
              y.jsx("h1", {
                className: "text-lg font-bold",
                children: "نظام صيانة الأجهزة",
              }),
              y.jsx(gy, {}),
            ],
          }),
          y.jsx("nav", {
            className:
              "flex gap-2 overflow-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 text-sm",
            children: t.map((n) =>
              y.jsx(
                ad,
                {
                  to: n.path,
                  className: `px-3 py-1 rounded ${
                    e.pathname.startsWith(n.path)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                  }`,
                  children: n.label,
                },
                n.path
              )
            ),
          }),
          y.jsx("main", { className: "flex-1 p-4", children: y.jsx(ud, {}) }),
        ],
      }),
    });
  },
  Cr = ({
    label: e,
    icon: t,
    type: n = "text",
    value: r,
    onChange: l,
    placeholder: o,
    required: i,
  }) =>
    y.jsxs("div", {
      className: "mb-4",
      children: [
        e &&
          y.jsx("label", {
            className: "block mb-1 font-semibold",
            children: e,
          }),
        y.jsxs("div", {
          className:
            "flex items-center border rounded px-3 py-2 bg-white dark:bg-gray-800",
          children: [
            t && y.jsx("span", { className: "mr-2", children: t }),
            y.jsx("input", {
              type: n,
              value: r,
              onChange: l,
              placeholder: o,
              required: i,
              className: "w-full bg-transparent outline-none",
            }),
          ],
        }),
      ],
    });
var hd = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ (function (e) {
  (function () {
    var t = {}.hasOwnProperty;
    function n() {
      for (var o = "", i = 0; i < arguments.length; i++) {
        var s = arguments[i];
        s && (o = l(o, r(s)));
      }
      return o;
    }
    function r(o) {
      if (typeof o == "string" || typeof o == "number") return o;
      if (typeof o != "object") return "";
      if (Array.isArray(o)) return n.apply(null, o);
      if (
        o.toString !== Object.prototype.toString &&
        !o.toString.toString().includes("[native code]")
      )
        return o.toString();
      var i = "";
      for (var s in o) t.call(o, s) && o[s] && (i = l(i, s));
      return i;
    }
    function l(o, i) {
      return i ? (o ? o + " " + i : o + i) : o;
    }
    e.exports ? ((n.default = n), (e.exports = n)) : (window.classNames = n);
  })();
})(hd);
var Ky = hd.exports;
const Jy = es(Ky),
  Bt = ({
    children: e,
    onClick: t,
    className: n,
    type: r = "button",
    variant: l = "primary",
  }) => {
    const o = "px-4 py-2 rounded font-semibold text-sm",
      i = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-black hover:bg-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700",
      };
    return y.jsx("button", {
      type: r,
      onClick: t,
      className: Jy(o, i[l], n),
      children: e,
    });
  },
  Vl = ({ onText: e, lang: t = "ar-EG" }) => {
    const [n, r] = k.useState(!1),
      l = () => {
        if (!("webkitSpeechRecognition" in window)) {
          alert("المتصفح لا يدعم تحويل الصوت إلى نص");
          return;
        }
        const o = new webkitSpeechRecognition();
        (o.lang = t),
          (o.continuous = !1),
          (o.interimResults = !1),
          (o.onstart = () => r(!0)),
          (o.onerror = () => r(!1)),
          (o.onend = () => r(!1)),
          (o.onresult = (i) => {
            const s = i.results[0][0].transcript;
            e(s);
          }),
          o.start();
      };
    return y.jsx("button", {
      onClick: l,
      type: "button",
      title: "تسجيل صوتي",
      className: `ml-2 p-2 rounded-full ${
        n ? "bg-green-500" : "bg-gray-300"
      } hover:bg-gray-400`,
      children: "🎤",
    });
  },
  Ln = ({ type: e = "info", message: t }) => {
    const n = {
      info: "bg-blue-100 text-blue-700",
      success: "bg-green-100 text-green-700",
      error: "bg-red-100 text-red-700",
      warning: "bg-yellow-100 text-yellow-800",
    };
    return y.jsx("div", {
      className: `p-3 rounded mb-3 ${n[e]} text-sm`,
      children: t,
    });
  };
function md(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: qy } = Object.prototype,
  { getPrototypeOf: bs } = Object,
  { iterator: co, toStringTag: yd } = Symbol,
  fo = ((e) => (t) => {
    const n = qy.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  We = (e) => ((e = e.toLowerCase()), (t) => fo(t) === e),
  po = (e) => (t) => typeof t === e,
  { isArray: zn } = Array,
  Nr = po("undefined");
function Lr(e) {
  return (
    e !== null &&
    !Nr(e) &&
    e.constructor !== null &&
    !Nr(e.constructor) &&
    xe(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const gd = We("ArrayBuffer");
function Xy(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && gd(e.buffer)),
    t
  );
}
const Gy = po("string"),
  xe = po("function"),
  vd = po("number"),
  zr = (e) => e !== null && typeof e == "object",
  Yy = (e) => e === !0 || e === !1,
  dl = (e) => {
    if (fo(e) !== "object") return !1;
    const t = bs(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(yd in e) &&
      !(co in e)
    );
  },
  Zy = (e) => {
    if (!zr(e) || Lr(e)) return !1;
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  by = We("Date"),
  e0 = We("File"),
  t0 = We("Blob"),
  n0 = We("FileList"),
  r0 = (e) => zr(e) && xe(e.pipe),
  l0 = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (xe(e.append) &&
          ((t = fo(e)) === "formdata" ||
            (t === "object" &&
              xe(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  o0 = We("URLSearchParams"),
  [i0, s0, u0, a0] = ["ReadableStream", "Request", "Response", "Headers"].map(
    We
  ),
  c0 = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Dr(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, l;
  if ((typeof e != "object" && (e = [e]), zn(e)))
    for (r = 0, l = e.length; r < l; r++) t.call(null, e[r], r, e);
  else {
    if (Lr(e)) return;
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = o.length;
    let s;
    for (r = 0; r < i; r++) (s = o[r]), t.call(null, e[s], s, e);
  }
}
function wd(e, t) {
  if (Lr(e)) return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    l;
  for (; r-- > 0; ) if (((l = n[r]), t === l.toLowerCase())) return l;
  return null;
}
const Ft = (() =>
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global)(),
  Sd = (e) => !Nr(e) && e !== Ft;
function qi() {
  const { caseless: e } = (Sd(this) && this) || {},
    t = {},
    n = (r, l) => {
      const o = (e && wd(t, l)) || l;
      dl(t[o]) && dl(r)
        ? (t[o] = qi(t[o], r))
        : dl(r)
        ? (t[o] = qi({}, r))
        : zn(r)
        ? (t[o] = r.slice())
        : (t[o] = r);
    };
  for (let r = 0, l = arguments.length; r < l; r++)
    arguments[r] && Dr(arguments[r], n);
  return t;
}
const f0 = (e, t, n, { allOwnKeys: r } = {}) => (
    Dr(
      t,
      (l, o) => {
        n && xe(l) ? (e[o] = md(l, n)) : (e[o] = l);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  d0 = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  p0 = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  h0 = (e, t, n, r) => {
    let l, o, i;
    const s = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (l = Object.getOwnPropertyNames(e), o = l.length; o-- > 0; )
        (i = l[o]), (!r || r(i, e, t)) && !s[i] && ((t[i] = e[i]), (s[i] = !0));
      e = n !== !1 && bs(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  m0 = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  y0 = (e) => {
    if (!e) return null;
    if (zn(e)) return e;
    let t = e.length;
    if (!vd(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  g0 = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && bs(Uint8Array)),
  v0 = (e, t) => {
    const r = (e && e[co]).call(e);
    let l;
    for (; (l = r.next()) && !l.done; ) {
      const o = l.value;
      t.call(e, o[0], o[1]);
    }
  },
  w0 = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  S0 = We("HTMLFormElement"),
  x0 = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, l) {
      return r.toUpperCase() + l;
    }),
  Ra = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  E0 = We("RegExp"),
  xd = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    Dr(n, (l, o) => {
      let i;
      (i = t(l, o, e)) !== !1 && (r[o] = i || l);
    }),
      Object.defineProperties(e, r);
  },
  k0 = (e) => {
    xd(e, (t, n) => {
      if (xe(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (xe(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  C0 = (e, t) => {
    const n = {},
      r = (l) => {
        l.forEach((o) => {
          n[o] = !0;
        });
      };
    return zn(e) ? r(e) : r(String(e).split(t)), n;
  },
  N0 = () => {},
  R0 = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function _0(e) {
  return !!(e && xe(e.append) && e[yd] === "FormData" && e[co]);
}
const P0 = (e) => {
    const t = new Array(10),
      n = (r, l) => {
        if (zr(r)) {
          if (t.indexOf(r) >= 0) return;
          if (Lr(r)) return r;
          if (!("toJSON" in r)) {
            t[l] = r;
            const o = zn(r) ? [] : {};
            return (
              Dr(r, (i, s) => {
                const u = n(i, l + 1);
                !Nr(u) && (o[s] = u);
              }),
              (t[l] = void 0),
              o
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  j0 = We("AsyncFunction"),
  T0 = (e) => e && (zr(e) || xe(e)) && xe(e.then) && xe(e.catch),
  Ed = ((e, t) =>
    e
      ? setImmediate
      : t
      ? ((n, r) => (
          Ft.addEventListener(
            "message",
            ({ source: l, data: o }) => {
              l === Ft && o === n && r.length && r.shift()();
            },
            !1
          ),
          (l) => {
            r.push(l), Ft.postMessage(n, "*");
          }
        ))(`axios@${Math.random()}`, [])
      : (n) => setTimeout(n))(
    typeof setImmediate == "function",
    xe(Ft.postMessage)
  ),
  O0 =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(Ft)
      : (typeof process < "u" && process.nextTick) || Ed,
  L0 = (e) => e != null && xe(e[co]),
  w = {
    isArray: zn,
    isArrayBuffer: gd,
    isBuffer: Lr,
    isFormData: l0,
    isArrayBufferView: Xy,
    isString: Gy,
    isNumber: vd,
    isBoolean: Yy,
    isObject: zr,
    isPlainObject: dl,
    isEmptyObject: Zy,
    isReadableStream: i0,
    isRequest: s0,
    isResponse: u0,
    isHeaders: a0,
    isUndefined: Nr,
    isDate: by,
    isFile: e0,
    isBlob: t0,
    isRegExp: E0,
    isFunction: xe,
    isStream: r0,
    isURLSearchParams: o0,
    isTypedArray: g0,
    isFileList: n0,
    forEach: Dr,
    merge: qi,
    extend: f0,
    trim: c0,
    stripBOM: d0,
    inherits: p0,
    toFlatObject: h0,
    kindOf: fo,
    kindOfTest: We,
    endsWith: m0,
    toArray: y0,
    forEachEntry: v0,
    matchAll: w0,
    isHTMLForm: S0,
    hasOwnProperty: Ra,
    hasOwnProp: Ra,
    reduceDescriptors: xd,
    freezeMethods: k0,
    toObjectSet: C0,
    toCamelCase: x0,
    noop: N0,
    toFiniteNumber: R0,
    findKey: wd,
    global: Ft,
    isContextDefined: Sd,
    isSpecCompliantForm: _0,
    toJSONObject: P0,
    isAsyncFn: j0,
    isThenable: T0,
    setImmediate: Ed,
    asap: O0,
    isIterable: L0,
  };
function O(e, t, n, r, l) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    l && ((this.response = l), (this.status = l.status ? l.status : null));
}
w.inherits(O, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: w.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const kd = O.prototype,
  Cd = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  Cd[e] = { value: e };
});
Object.defineProperties(O, Cd);
Object.defineProperty(kd, "isAxiosError", { value: !0 });
O.from = (e, t, n, r, l, o) => {
  const i = Object.create(kd);
  return (
    w.toFlatObject(
      e,
      i,
      function (u) {
        return u !== Error.prototype;
      },
      (s) => s !== "isAxiosError"
    ),
    O.call(i, e.message, t, n, r, l),
    (i.cause = e),
    (i.name = e.name),
    o && Object.assign(i, o),
    i
  );
};
const z0 = null;
function Xi(e) {
  return w.isPlainObject(e) || w.isArray(e);
}
function Nd(e) {
  return w.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function _a(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (l, o) {
          return (l = Nd(l)), !n && o ? "[" + l + "]" : l;
        })
        .join(n ? "." : "")
    : t;
}
function D0(e) {
  return w.isArray(e) && !e.some(Xi);
}
const A0 = w.toFlatObject(w, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function ho(e, t, n) {
  if (!w.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (n = w.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (v, x) {
        return !w.isUndefined(x[v]);
      }
    ));
  const r = n.metaTokens,
    l = n.visitor || c,
    o = n.dots,
    i = n.indexes,
    u = (n.Blob || (typeof Blob < "u" && Blob)) && w.isSpecCompliantForm(t);
  if (!w.isFunction(l)) throw new TypeError("visitor must be a function");
  function a(g) {
    if (g === null) return "";
    if (w.isDate(g)) return g.toISOString();
    if (w.isBoolean(g)) return g.toString();
    if (!u && w.isBlob(g))
      throw new O("Blob is not supported. Use a Buffer instead.");
    return w.isArrayBuffer(g) || w.isTypedArray(g)
      ? u && typeof Blob == "function"
        ? new Blob([g])
        : Buffer.from(g)
      : g;
  }
  function c(g, v, x) {
    let p = g;
    if (g && !x && typeof g == "object") {
      if (w.endsWith(v, "{}"))
        (v = r ? v : v.slice(0, -2)), (g = JSON.stringify(g));
      else if (
        (w.isArray(g) && D0(g)) ||
        ((w.isFileList(g) || w.endsWith(v, "[]")) && (p = w.toArray(g)))
      )
        return (
          (v = Nd(v)),
          p.forEach(function (h, E) {
            !(w.isUndefined(h) || h === null) &&
              t.append(
                i === !0 ? _a([v], E, o) : i === null ? v : v + "[]",
                a(h)
              );
          }),
          !1
        );
    }
    return Xi(g) ? !0 : (t.append(_a(x, v, o), a(g)), !1);
  }
  const f = [],
    m = Object.assign(A0, {
      defaultVisitor: c,
      convertValue: a,
      isVisitable: Xi,
    });
  function S(g, v) {
    if (!w.isUndefined(g)) {
      if (f.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + v.join("."));
      f.push(g),
        w.forEach(g, function (p, d) {
          (!(w.isUndefined(p) || p === null) &&
            l.call(t, p, w.isString(d) ? d.trim() : d, v, m)) === !0 &&
            S(p, v ? v.concat(d) : [d]);
        }),
        f.pop();
    }
  }
  if (!w.isObject(e)) throw new TypeError("data must be an object");
  return S(e), t;
}
function Pa(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function eu(e, t) {
  (this._pairs = []), e && ho(e, this, t);
}
const Rd = eu.prototype;
Rd.append = function (t, n) {
  this._pairs.push([t, n]);
};
Rd.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, Pa);
      }
    : Pa;
  return this._pairs
    .map(function (l) {
      return n(l[0]) + "=" + n(l[1]);
    }, "")
    .join("&");
};
function I0(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function _d(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || I0;
  w.isFunction(n) && (n = { serialize: n });
  const l = n && n.serialize;
  let o;
  if (
    (l
      ? (o = l(t, n))
      : (o = w.isURLSearchParams(t) ? t.toString() : new eu(t, n).toString(r)),
    o)
  ) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o);
  }
  return e;
}
class F0 {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    w.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const ja = F0,
  Pd = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  U0 = typeof URLSearchParams < "u" ? URLSearchParams : eu,
  M0 = typeof FormData < "u" ? FormData : null,
  B0 = typeof Blob < "u" ? Blob : null,
  $0 = {
    isBrowser: !0,
    classes: { URLSearchParams: U0, FormData: M0, Blob: B0 },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  tu = typeof window < "u" && typeof document < "u",
  Gi = (typeof navigator == "object" && navigator) || void 0,
  V0 =
    tu &&
    (!Gi || ["ReactNative", "NativeScript", "NS"].indexOf(Gi.product) < 0),
  W0 = (() =>
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function")(),
  H0 = (tu && window.location.href) || "http://localhost",
  Q0 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: tu,
        hasStandardBrowserEnv: V0,
        hasStandardBrowserWebWorkerEnv: W0,
        navigator: Gi,
        origin: H0,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  ce = { ...Q0, ...$0 };
function K0(e, t) {
  return ho(e, new ce.classes.URLSearchParams(), {
    visitor: function (n, r, l, o) {
      return ce.isNode && w.isBuffer(n)
        ? (this.append(r, n.toString("base64")), !1)
        : o.defaultVisitor.apply(this, arguments);
    },
    ...t,
  });
}
function J0(e) {
  return w
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function q0(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const l = n.length;
  let o;
  for (r = 0; r < l; r++) (o = n[r]), (t[o] = e[o]);
  return t;
}
function jd(e) {
  function t(n, r, l, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const s = Number.isFinite(+i),
      u = o >= n.length;
    return (
      (i = !i && w.isArray(l) ? l.length : i),
      u
        ? (w.hasOwnProp(l, i) ? (l[i] = [l[i], r]) : (l[i] = r), !s)
        : ((!l[i] || !w.isObject(l[i])) && (l[i] = []),
          t(n, r, l[i], o) && w.isArray(l[i]) && (l[i] = q0(l[i])),
          !s)
    );
  }
  if (w.isFormData(e) && w.isFunction(e.entries)) {
    const n = {};
    return (
      w.forEachEntry(e, (r, l) => {
        t(J0(r), l, n, 0);
      }),
      n
    );
  }
  return null;
}
function X0(e, t, n) {
  if (w.isString(e))
    try {
      return (t || JSON.parse)(e), w.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const nu = {
  transitional: Pd,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        l = r.indexOf("application/json") > -1,
        o = w.isObject(t);
      if ((o && w.isHTMLForm(t) && (t = new FormData(t)), w.isFormData(t)))
        return l ? JSON.stringify(jd(t)) : t;
      if (
        w.isArrayBuffer(t) ||
        w.isBuffer(t) ||
        w.isStream(t) ||
        w.isFile(t) ||
        w.isBlob(t) ||
        w.isReadableStream(t)
      )
        return t;
      if (w.isArrayBufferView(t)) return t.buffer;
      if (w.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let s;
      if (o) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return K0(t, this.formSerializer).toString();
        if ((s = w.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const u = this.env && this.env.FormData;
          return ho(
            s ? { "files[]": t } : t,
            u && new u(),
            this.formSerializer
          );
        }
      }
      return o || l ? (n.setContentType("application/json", !1), X0(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || nu.transitional,
        r = n && n.forcedJSONParsing,
        l = this.responseType === "json";
      if (w.isResponse(t) || w.isReadableStream(t)) return t;
      if (t && w.isString(t) && ((r && !this.responseType) || l)) {
        const i = !(n && n.silentJSONParsing) && l;
        try {
          return JSON.parse(t);
        } catch (s) {
          if (i)
            throw s.name === "SyntaxError"
              ? O.from(s, O.ERR_BAD_RESPONSE, this, null, this.response)
              : s;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: ce.classes.FormData, Blob: ce.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
w.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  nu.headers[e] = {};
});
const ru = nu,
  G0 = w.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  Y0 = (e) => {
    const t = {};
    let n, r, l;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (i) {
            (l = i.indexOf(":")),
              (n = i.substring(0, l).trim().toLowerCase()),
              (r = i.substring(l + 1).trim()),
              !(!n || (t[n] && G0[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r));
          }),
      t
    );
  },
  Ta = Symbol("internals");
function Qn(e) {
  return e && String(e).trim().toLowerCase();
}
function pl(e) {
  return e === !1 || e == null ? e : w.isArray(e) ? e.map(pl) : String(e);
}
function Z0(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const b0 = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Xo(e, t, n, r, l) {
  if (w.isFunction(r)) return r.call(this, t, n);
  if ((l && (t = n), !!w.isString(t))) {
    if (w.isString(r)) return t.indexOf(r) !== -1;
    if (w.isRegExp(r)) return r.test(t);
  }
}
function eg(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function tg(e, t) {
  const n = w.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (l, o, i) {
        return this[r].call(this, t, l, o, i);
      },
      configurable: !0,
    });
  });
}
class mo {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const l = this;
    function o(s, u, a) {
      const c = Qn(u);
      if (!c) throw new Error("header name must be a non-empty string");
      const f = w.findKey(l, c);
      (!f || l[f] === void 0 || a === !0 || (a === void 0 && l[f] !== !1)) &&
        (l[f || u] = pl(s));
    }
    const i = (s, u) => w.forEach(s, (a, c) => o(a, c, u));
    if (w.isPlainObject(t) || t instanceof this.constructor) i(t, n);
    else if (w.isString(t) && (t = t.trim()) && !b0(t)) i(Y0(t), n);
    else if (w.isObject(t) && w.isIterable(t)) {
      let s = {},
        u,
        a;
      for (const c of t) {
        if (!w.isArray(c))
          throw TypeError("Object iterator must return a key-value pair");
        s[(a = c[0])] = (u = s[a])
          ? w.isArray(u)
            ? [...u, c[1]]
            : [u, c[1]]
          : c[1];
      }
      i(s, n);
    } else t != null && o(n, t, r);
    return this;
  }
  get(t, n) {
    if (((t = Qn(t)), t)) {
      const r = w.findKey(this, t);
      if (r) {
        const l = this[r];
        if (!n) return l;
        if (n === !0) return Z0(l);
        if (w.isFunction(n)) return n.call(this, l, r);
        if (w.isRegExp(n)) return n.exec(l);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = Qn(t)), t)) {
      const r = w.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Xo(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let l = !1;
    function o(i) {
      if (((i = Qn(i)), i)) {
        const s = w.findKey(r, i);
        s && (!n || Xo(r, r[s], s, n)) && (delete r[s], (l = !0));
      }
    }
    return w.isArray(t) ? t.forEach(o) : o(t), l;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      l = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || Xo(this, this[o], o, t, !0)) && (delete this[o], (l = !0));
    }
    return l;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      w.forEach(this, (l, o) => {
        const i = w.findKey(r, o);
        if (i) {
          (n[i] = pl(l)), delete n[o];
          return;
        }
        const s = t ? eg(o) : String(o).trim();
        s !== o && delete n[o], (n[s] = pl(l)), (r[s] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      w.forEach(this, (r, l) => {
        r != null && r !== !1 && (n[l] = t && w.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((l) => r.set(l)), r;
  }
  static accessor(t) {
    const r = (this[Ta] = this[Ta] = { accessors: {} }).accessors,
      l = this.prototype;
    function o(i) {
      const s = Qn(i);
      r[s] || (tg(l, i), (r[s] = !0));
    }
    return w.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
mo.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
w.reduceDescriptors(mo.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
w.freezeMethods(mo);
const $e = mo;
function Go(e, t) {
  const n = this || ru,
    r = t || n,
    l = $e.from(r.headers);
  let o = r.data;
  return (
    w.forEach(e, function (s) {
      o = s.call(n, o, l.normalize(), t ? t.status : void 0);
    }),
    l.normalize(),
    o
  );
}
function Td(e) {
  return !!(e && e.__CANCEL__);
}
function Dn(e, t, n) {
  O.call(this, e ?? "canceled", O.ERR_CANCELED, t, n),
    (this.name = "CanceledError");
}
w.inherits(Dn, O, { __CANCEL__: !0 });
function Od(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new O(
          "Request failed with status code " + n.status,
          [O.ERR_BAD_REQUEST, O.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
function ng(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function rg(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let l = 0,
    o = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (u) {
      const a = Date.now(),
        c = r[o];
      i || (i = a), (n[l] = u), (r[l] = a);
      let f = o,
        m = 0;
      for (; f !== l; ) (m += n[f++]), (f = f % e);
      if (((l = (l + 1) % e), l === o && (o = (o + 1) % e), a - i < t)) return;
      const S = c && a - c;
      return S ? Math.round((m * 1e3) / S) : void 0;
    }
  );
}
function lg(e, t) {
  let n = 0,
    r = 1e3 / t,
    l,
    o;
  const i = (a, c = Date.now()) => {
    (n = c), (l = null), o && (clearTimeout(o), (o = null)), e(...a);
  };
  return [
    (...a) => {
      const c = Date.now(),
        f = c - n;
      f >= r
        ? i(a, c)
        : ((l = a),
          o ||
            (o = setTimeout(() => {
              (o = null), i(l);
            }, r - f)));
    },
    () => l && i(l),
  ];
}
const Wl = (e, t, n = 3) => {
    let r = 0;
    const l = rg(50, 250);
    return lg((o) => {
      const i = o.loaded,
        s = o.lengthComputable ? o.total : void 0,
        u = i - r,
        a = l(u),
        c = i <= s;
      r = i;
      const f = {
        loaded: i,
        total: s,
        progress: s ? i / s : void 0,
        bytes: u,
        rate: a || void 0,
        estimated: a && s && c ? (s - i) / a : void 0,
        event: o,
        lengthComputable: s != null,
        [t ? "download" : "upload"]: !0,
      };
      e(f);
    }, n);
  },
  Oa = (e, t) => {
    const n = e != null;
    return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
  },
  La =
    (e) =>
    (...t) =>
      w.asap(() => e(...t)),
  og = ce.hasStandardBrowserEnv
    ? ((e, t) => (n) => (
        (n = new URL(n, ce.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(ce.origin),
        ce.navigator && /(msie|trident)/i.test(ce.navigator.userAgent)
      )
    : () => !0,
  ig = ce.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, l, o) {
          const i = [e + "=" + encodeURIComponent(t)];
          w.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()),
            w.isString(r) && i.push("path=" + r),
            w.isString(l) && i.push("domain=" + l),
            o === !0 && i.push("secure"),
            (document.cookie = i.join("; "));
        },
        read(e) {
          const t = document.cookie.match(
            new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
          );
          return t ? decodeURIComponent(t[3]) : null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function sg(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function ug(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Ld(e, t, n) {
  let r = !sg(t);
  return e && (r || n == !1) ? ug(e, t) : t;
}
const za = (e) => (e instanceof $e ? { ...e } : e);
function Kt(e, t) {
  t = t || {};
  const n = {};
  function r(a, c, f, m) {
    return w.isPlainObject(a) && w.isPlainObject(c)
      ? w.merge.call({ caseless: m }, a, c)
      : w.isPlainObject(c)
      ? w.merge({}, c)
      : w.isArray(c)
      ? c.slice()
      : c;
  }
  function l(a, c, f, m) {
    if (w.isUndefined(c)) {
      if (!w.isUndefined(a)) return r(void 0, a, f, m);
    } else return r(a, c, f, m);
  }
  function o(a, c) {
    if (!w.isUndefined(c)) return r(void 0, c);
  }
  function i(a, c) {
    if (w.isUndefined(c)) {
      if (!w.isUndefined(a)) return r(void 0, a);
    } else return r(void 0, c);
  }
  function s(a, c, f) {
    if (f in t) return r(a, c);
    if (f in e) return r(void 0, a);
  }
  const u = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: s,
    headers: (a, c, f) => l(za(a), za(c), f, !0),
  };
  return (
    w.forEach(Object.keys({ ...e, ...t }), function (c) {
      const f = u[c] || l,
        m = f(e[c], t[c], c);
      (w.isUndefined(m) && f !== s) || (n[c] = m);
    }),
    n
  );
}
const zd = (e) => {
    const t = Kt({}, e);
    let {
      data: n,
      withXSRFToken: r,
      xsrfHeaderName: l,
      xsrfCookieName: o,
      headers: i,
      auth: s,
    } = t;
    (t.headers = i = $e.from(i)),
      (t.url = _d(
        Ld(t.baseURL, t.url, t.allowAbsoluteUrls),
        e.params,
        e.paramsSerializer
      )),
      s &&
        i.set(
          "Authorization",
          "Basic " +
            btoa(
              (s.username || "") +
                ":" +
                (s.password ? unescape(encodeURIComponent(s.password)) : "")
            )
        );
    let u;
    if (w.isFormData(n)) {
      if (ce.hasStandardBrowserEnv || ce.hasStandardBrowserWebWorkerEnv)
        i.setContentType(void 0);
      else if ((u = i.getContentType()) !== !1) {
        const [a, ...c] = u
          ? u
              .split(";")
              .map((f) => f.trim())
              .filter(Boolean)
          : [];
        i.setContentType([a || "multipart/form-data", ...c].join("; "));
      }
    }
    if (
      ce.hasStandardBrowserEnv &&
      (r && w.isFunction(r) && (r = r(t)), r || (r !== !1 && og(t.url)))
    ) {
      const a = l && o && ig.read(o);
      a && i.set(l, a);
    }
    return t;
  },
  ag = typeof XMLHttpRequest < "u",
  cg =
    ag &&
    function (e) {
      return new Promise(function (n, r) {
        const l = zd(e);
        let o = l.data;
        const i = $e.from(l.headers).normalize();
        let { responseType: s, onUploadProgress: u, onDownloadProgress: a } = l,
          c,
          f,
          m,
          S,
          g;
        function v() {
          S && S(),
            g && g(),
            l.cancelToken && l.cancelToken.unsubscribe(c),
            l.signal && l.signal.removeEventListener("abort", c);
        }
        let x = new XMLHttpRequest();
        x.open(l.method.toUpperCase(), l.url, !0), (x.timeout = l.timeout);
        function p() {
          if (!x) return;
          const h = $e.from(
              "getAllResponseHeaders" in x && x.getAllResponseHeaders()
            ),
            N = {
              data:
                !s || s === "text" || s === "json"
                  ? x.responseText
                  : x.response,
              status: x.status,
              statusText: x.statusText,
              headers: h,
              config: e,
              request: x,
            };
          Od(
            function (P) {
              n(P), v();
            },
            function (P) {
              r(P), v();
            },
            N
          ),
            (x = null);
        }
        "onloadend" in x
          ? (x.onloadend = p)
          : (x.onreadystatechange = function () {
              !x ||
                x.readyState !== 4 ||
                (x.status === 0 &&
                  !(x.responseURL && x.responseURL.indexOf("file:") === 0)) ||
                setTimeout(p);
            }),
          (x.onabort = function () {
            x &&
              (r(new O("Request aborted", O.ECONNABORTED, e, x)), (x = null));
          }),
          (x.onerror = function () {
            r(new O("Network Error", O.ERR_NETWORK, e, x)), (x = null);
          }),
          (x.ontimeout = function () {
            let E = l.timeout
              ? "timeout of " + l.timeout + "ms exceeded"
              : "timeout exceeded";
            const N = l.transitional || Pd;
            l.timeoutErrorMessage && (E = l.timeoutErrorMessage),
              r(
                new O(
                  E,
                  N.clarifyTimeoutError ? O.ETIMEDOUT : O.ECONNABORTED,
                  e,
                  x
                )
              ),
              (x = null);
          }),
          o === void 0 && i.setContentType(null),
          "setRequestHeader" in x &&
            w.forEach(i.toJSON(), function (E, N) {
              x.setRequestHeader(N, E);
            }),
          w.isUndefined(l.withCredentials) ||
            (x.withCredentials = !!l.withCredentials),
          s && s !== "json" && (x.responseType = l.responseType),
          a && (([m, g] = Wl(a, !0)), x.addEventListener("progress", m)),
          u &&
            x.upload &&
            (([f, S] = Wl(u)),
            x.upload.addEventListener("progress", f),
            x.upload.addEventListener("loadend", S)),
          (l.cancelToken || l.signal) &&
            ((c = (h) => {
              x &&
                (r(!h || h.type ? new Dn(null, e, x) : h),
                x.abort(),
                (x = null));
            }),
            l.cancelToken && l.cancelToken.subscribe(c),
            l.signal &&
              (l.signal.aborted ? c() : l.signal.addEventListener("abort", c)));
        const d = ng(l.url);
        if (d && ce.protocols.indexOf(d) === -1) {
          r(new O("Unsupported protocol " + d + ":", O.ERR_BAD_REQUEST, e));
          return;
        }
        x.send(o || null);
      });
    },
  fg = (e, t) => {
    const { length: n } = (e = e ? e.filter(Boolean) : []);
    if (t || n) {
      let r = new AbortController(),
        l;
      const o = function (a) {
        if (!l) {
          (l = !0), s();
          const c = a instanceof Error ? a : this.reason;
          r.abort(
            c instanceof O ? c : new Dn(c instanceof Error ? c.message : c)
          );
        }
      };
      let i =
        t &&
        setTimeout(() => {
          (i = null), o(new O(`timeout ${t} of ms exceeded`, O.ETIMEDOUT));
        }, t);
      const s = () => {
        e &&
          (i && clearTimeout(i),
          (i = null),
          e.forEach((a) => {
            a.unsubscribe
              ? a.unsubscribe(o)
              : a.removeEventListener("abort", o);
          }),
          (e = null));
      };
      e.forEach((a) => a.addEventListener("abort", o));
      const { signal: u } = r;
      return (u.unsubscribe = () => w.asap(s)), u;
    }
  },
  dg = fg,
  pg = function* (e, t) {
    let n = e.byteLength;
    if (!t || n < t) {
      yield e;
      return;
    }
    let r = 0,
      l;
    for (; r < n; ) (l = r + t), yield e.slice(r, l), (r = l);
  },
  hg = async function* (e, t) {
    for await (const n of mg(e)) yield* pg(n, t);
  },
  mg = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: n, value: r } = await t.read();
        if (n) break;
        yield r;
      }
    } finally {
      await t.cancel();
    }
  },
  Da = (e, t, n, r) => {
    const l = hg(e, t);
    let o = 0,
      i,
      s = (u) => {
        i || ((i = !0), r && r(u));
      };
    return new ReadableStream(
      {
        async pull(u) {
          try {
            const { done: a, value: c } = await l.next();
            if (a) {
              s(), u.close();
              return;
            }
            let f = c.byteLength;
            if (n) {
              let m = (o += f);
              n(m);
            }
            u.enqueue(new Uint8Array(c));
          } catch (a) {
            throw (s(a), a);
          }
        },
        cancel(u) {
          return s(u), l.return();
        },
      },
      { highWaterMark: 2 }
    );
  },
  yo =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  Dd = yo && typeof ReadableStream == "function",
  yg =
    yo &&
    (typeof TextEncoder == "function"
      ? (
          (e) => (t) =>
            e.encode(t)
        )(new TextEncoder())
      : async (e) => new Uint8Array(await new Response(e).arrayBuffer())),
  Ad = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  gg =
    Dd &&
    Ad(() => {
      let e = !1;
      const t = new Request(ce.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return (e = !0), "half";
        },
      }).headers.has("Content-Type");
      return e && !t;
    }),
  Aa = 64 * 1024,
  Yi = Dd && Ad(() => w.isReadableStream(new Response("").body)),
  Hl = { stream: Yi && ((e) => e.body) };
yo &&
  ((e) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
      !Hl[t] &&
        (Hl[t] = w.isFunction(e[t])
          ? (n) => n[t]()
          : (n, r) => {
              throw new O(
                `Response type '${t}' is not supported`,
                O.ERR_NOT_SUPPORT,
                r
              );
            });
    });
  })(new Response());
const vg = async (e) => {
    if (e == null) return 0;
    if (w.isBlob(e)) return e.size;
    if (w.isSpecCompliantForm(e))
      return (
        await new Request(ce.origin, { method: "POST", body: e }).arrayBuffer()
      ).byteLength;
    if (w.isArrayBufferView(e) || w.isArrayBuffer(e)) return e.byteLength;
    if ((w.isURLSearchParams(e) && (e = e + ""), w.isString(e)))
      return (await yg(e)).byteLength;
  },
  wg = async (e, t) => {
    const n = w.toFiniteNumber(e.getContentLength());
    return n ?? vg(t);
  },
  Sg =
    yo &&
    (async (e) => {
      let {
        url: t,
        method: n,
        data: r,
        signal: l,
        cancelToken: o,
        timeout: i,
        onDownloadProgress: s,
        onUploadProgress: u,
        responseType: a,
        headers: c,
        withCredentials: f = "same-origin",
        fetchOptions: m,
      } = zd(e);
      a = a ? (a + "").toLowerCase() : "text";
      let S = dg([l, o && o.toAbortSignal()], i),
        g;
      const v =
        S &&
        S.unsubscribe &&
        (() => {
          S.unsubscribe();
        });
      let x;
      try {
        if (
          u &&
          gg &&
          n !== "get" &&
          n !== "head" &&
          (x = await wg(c, r)) !== 0
        ) {
          let N = new Request(t, { method: "POST", body: r, duplex: "half" }),
            R;
          if (
            (w.isFormData(r) &&
              (R = N.headers.get("content-type")) &&
              c.setContentType(R),
            N.body)
          ) {
            const [P, T] = Oa(x, Wl(La(u)));
            r = Da(N.body, Aa, P, T);
          }
        }
        w.isString(f) || (f = f ? "include" : "omit");
        const p = "credentials" in Request.prototype;
        g = new Request(t, {
          ...m,
          signal: S,
          method: n.toUpperCase(),
          headers: c.normalize().toJSON(),
          body: r,
          duplex: "half",
          credentials: p ? f : void 0,
        });
        let d = await fetch(g, m);
        const h = Yi && (a === "stream" || a === "response");
        if (Yi && (s || (h && v))) {
          const N = {};
          ["status", "statusText", "headers"].forEach(($) => {
            N[$] = d[$];
          });
          const R = w.toFiniteNumber(d.headers.get("content-length")),
            [P, T] = (s && Oa(R, Wl(La(s), !0))) || [];
          d = new Response(
            Da(d.body, Aa, P, () => {
              T && T(), v && v();
            }),
            N
          );
        }
        a = a || "text";
        let E = await Hl[w.findKey(Hl, a) || "text"](d, e);
        return (
          !h && v && v(),
          await new Promise((N, R) => {
            Od(N, R, {
              data: E,
              headers: $e.from(d.headers),
              status: d.status,
              statusText: d.statusText,
              config: e,
              request: g,
            });
          })
        );
      } catch (p) {
        throw (
          (v && v(),
          p && p.name === "TypeError" && /Load failed|fetch/i.test(p.message)
            ? Object.assign(new O("Network Error", O.ERR_NETWORK, e, g), {
                cause: p.cause || p,
              })
            : O.from(p, p && p.code, e, g))
        );
      }
    }),
  Zi = { http: z0, xhr: cg, fetch: Sg };
w.forEach(Zi, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Ia = (e) => `- ${e}`,
  xg = (e) => w.isFunction(e) || e === null || e === !1,
  Id = {
    getAdapter: (e) => {
      e = w.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      const l = {};
      for (let o = 0; o < t; o++) {
        n = e[o];
        let i;
        if (
          ((r = n),
          !xg(n) && ((r = Zi[(i = String(n)).toLowerCase()]), r === void 0))
        )
          throw new O(`Unknown adapter '${i}'`);
        if (r) break;
        l[i || "#" + o] = r;
      }
      if (!r) {
        const o = Object.entries(l).map(
          ([s, u]) =>
            `adapter ${s} ` +
            (u === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let i = t
          ? o.length > 1
            ? `since :
` +
              o.map(Ia).join(`
`)
            : " " + Ia(o[0])
          : "as no adapter specified";
        throw new O(
          "There is no suitable adapter to dispatch the request " + i,
          "ERR_NOT_SUPPORT"
        );
      }
      return r;
    },
    adapters: Zi,
  };
function Yo(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Dn(null, e);
}
function Fa(e) {
  return (
    Yo(e),
    (e.headers = $e.from(e.headers)),
    (e.data = Go.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Id.getAdapter(e.adapter || ru.adapter)(e).then(
      function (r) {
        return (
          Yo(e),
          (r.data = Go.call(e, e.transformResponse, r)),
          (r.headers = $e.from(r.headers)),
          r
        );
      },
      function (r) {
        return (
          Td(r) ||
            (Yo(e),
            r &&
              r.response &&
              ((r.response.data = Go.call(e, e.transformResponse, r.response)),
              (r.response.headers = $e.from(r.response.headers)))),
          Promise.reject(r)
        );
      }
    )
  );
}
const Fd = "1.11.0",
  go = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    go[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const Ua = {};
go.transitional = function (t, n, r) {
  function l(o, i) {
    return (
      "[Axios v" +
      Fd +
      "] Transitional option '" +
      o +
      "'" +
      i +
      (r ? ". " + r : "")
    );
  }
  return (o, i, s) => {
    if (t === !1)
      throw new O(
        l(i, " has been removed" + (n ? " in " + n : "")),
        O.ERR_DEPRECATED
      );
    return (
      n &&
        !Ua[i] &&
        ((Ua[i] = !0),
        console.warn(
          l(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(o, i, s) : !0
    );
  };
};
go.spelling = function (t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function Eg(e, t, n) {
  if (typeof e != "object")
    throw new O("options must be an object", O.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let l = r.length;
  for (; l-- > 0; ) {
    const o = r[l],
      i = t[o];
    if (i) {
      const s = e[o],
        u = s === void 0 || i(s, o, e);
      if (u !== !0)
        throw new O("option " + o + " must be " + u, O.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new O("Unknown option " + o, O.ERR_BAD_OPTION);
  }
}
const hl = { assertOptions: Eg, validators: go },
  Qe = hl.validators;
class Ql {
  constructor(t) {
    (this.defaults = t || {}),
      (this.interceptors = { request: new ja(), response: new ja() });
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let l = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(l)
          : (l = new Error());
        const o = l.stack ? l.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack
            ? o &&
              !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) &&
              (r.stack +=
                `
` + o)
            : (r.stack = o);
        } catch {}
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = Kt(this.defaults, n));
    const { transitional: r, paramsSerializer: l, headers: o } = n;
    r !== void 0 &&
      hl.assertOptions(
        r,
        {
          silentJSONParsing: Qe.transitional(Qe.boolean),
          forcedJSONParsing: Qe.transitional(Qe.boolean),
          clarifyTimeoutError: Qe.transitional(Qe.boolean),
        },
        !1
      ),
      l != null &&
        (w.isFunction(l)
          ? (n.paramsSerializer = { serialize: l })
          : hl.assertOptions(
              l,
              { encode: Qe.function, serialize: Qe.function },
              !0
            )),
      n.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (n.allowAbsoluteUrls = !0)),
      hl.assertOptions(
        n,
        {
          baseUrl: Qe.spelling("baseURL"),
          withXsrfToken: Qe.spelling("withXSRFToken"),
        },
        !0
      ),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase());
    let i = o && w.merge(o.common, o[n.method]);
    o &&
      w.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (g) => {
          delete o[g];
        }
      ),
      (n.headers = $e.concat(i, o));
    const s = [];
    let u = !0;
    this.interceptors.request.forEach(function (v) {
      (typeof v.runWhen == "function" && v.runWhen(n) === !1) ||
        ((u = u && v.synchronous), s.unshift(v.fulfilled, v.rejected));
    });
    const a = [];
    this.interceptors.response.forEach(function (v) {
      a.push(v.fulfilled, v.rejected);
    });
    let c,
      f = 0,
      m;
    if (!u) {
      const g = [Fa.bind(this), void 0];
      for (
        g.unshift(...s), g.push(...a), m = g.length, c = Promise.resolve(n);
        f < m;

      )
        c = c.then(g[f++], g[f++]);
      return c;
    }
    m = s.length;
    let S = n;
    for (f = 0; f < m; ) {
      const g = s[f++],
        v = s[f++];
      try {
        S = g(S);
      } catch (x) {
        v.call(this, x);
        break;
      }
    }
    try {
      c = Fa.call(this, S);
    } catch (g) {
      return Promise.reject(g);
    }
    for (f = 0, m = a.length; f < m; ) c = c.then(a[f++], a[f++]);
    return c;
  }
  getUri(t) {
    t = Kt(this.defaults, t);
    const n = Ld(t.baseURL, t.url, t.allowAbsoluteUrls);
    return _d(n, t.params, t.paramsSerializer);
  }
}
w.forEach(["delete", "get", "head", "options"], function (t) {
  Ql.prototype[t] = function (n, r) {
    return this.request(
      Kt(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
w.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (o, i, s) {
      return this.request(
        Kt(s || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: i,
        })
      );
    };
  }
  (Ql.prototype[t] = n()), (Ql.prototype[t + "Form"] = n(!0));
});
const ml = Ql;
class lu {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o;
    });
    const r = this;
    this.promise.then((l) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; ) r._listeners[o](l);
      r._listeners = null;
    }),
      (this.promise.then = (l) => {
        let o;
        const i = new Promise((s) => {
          r.subscribe(s), (o = s);
        }).then(l);
        return (
          (i.cancel = function () {
            r.unsubscribe(o);
          }),
          i
        );
      }),
      t(function (o, i, s) {
        r.reason || ((r.reason = new Dn(o, i, s)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      n = (r) => {
        t.abort(r);
      };
    return (
      this.subscribe(n),
      (t.signal.unsubscribe = () => this.unsubscribe(n)),
      t.signal
    );
  }
  static source() {
    let t;
    return {
      token: new lu(function (l) {
        t = l;
      }),
      cancel: t,
    };
  }
}
const kg = lu;
function Cg(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function Ng(e) {
  return w.isObject(e) && e.isAxiosError === !0;
}
const bi = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(bi).forEach(([e, t]) => {
  bi[t] = e;
});
const Rg = bi;
function Ud(e) {
  const t = new ml(e),
    n = md(ml.prototype.request, t);
  return (
    w.extend(n, ml.prototype, t, { allOwnKeys: !0 }),
    w.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (l) {
      return Ud(Kt(e, l));
    }),
    n
  );
}
const Y = Ud(ru);
Y.Axios = ml;
Y.CanceledError = Dn;
Y.CancelToken = kg;
Y.isCancel = Td;
Y.VERSION = Fd;
Y.toFormData = ho;
Y.AxiosError = O;
Y.Cancel = Y.CanceledError;
Y.all = function (t) {
  return Promise.all(t);
};
Y.spread = Cg;
Y.isAxiosError = Ng;
Y.mergeConfig = Kt;
Y.AxiosHeaders = $e;
Y.formToJSON = (e) => jd(w.isHTMLForm(e) ? new FormData(e) : e);
Y.getAdapter = Id.getAdapter;
Y.HttpStatusCode = Rg;
Y.default = Y;
const Jt = Y,
  _g = () => {
    const [e, t] = k.useState(""),
      [n, r] = k.useState(""),
      [l, o] = k.useState(""),
      i = Or(),
      s = async (u) => {
        var a, c;
        u.preventDefault(), o("");
        try {
          const { data: f } = await Jt.post(
            "http://localhost:5000/api/auth/login",
            { username: e, password: n }
          );
          localStorage.setItem("token", f.token),
            localStorage.setItem("user", JSON.stringify(f.user)),
            localStorage.setItem("loginTime", Date.now()),
            i("/repairs");
        } catch (f) {
          o(
            ((c = (a = f.response) == null ? void 0 : a.data) == null
              ? void 0
              : c.message) || "حدث خطأ أثناء تسجيل الدخول"
          );
        }
      };
    return y.jsx("div", {
      className:
        "flex items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900",
      children: y.jsxs("form", {
        onSubmit: s,
        className:
          "w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded px-6 py-8",
        children: [
          y.jsx("h1", {
            className: "text-2xl font-bold mb-6 text-center",
            children: "تسجيل الدخول",
          }),
          l && y.jsx(Ln, { type: "error", message: l }),
          y.jsxs("div", {
            className: "relative",
            children: [
              y.jsx(Cr, {
                label: "اسم المستخدم",
                value: e,
                onChange: (u) => t(u.target.value),
                placeholder: "ادخل اسم المستخدم",
                required: !0,
              }),
              y.jsx("div", {
                className: "absolute top-[1.8rem] left-[-0.5rem]",
                children: y.jsx(Vl, { onText: (u) => t(u) }),
              }),
            ],
          }),
          y.jsxs("div", {
            className: "relative",
            children: [
              y.jsx(Cr, {
                label: "كلمة المرور",
                type: "password",
                value: n,
                onChange: (u) => r(u.target.value),
                placeholder: "ادخل كلمة المرور",
                required: !0,
              }),
              y.jsx("div", {
                className: "absolute top-[1.8rem] left-[-0.5rem]",
                children: y.jsx(Vl, { onText: (u) => r(u) }),
              }),
            ],
          }),
          y.jsx(Bt, {
            type: "submit",
            className: "w-full mt-4",
            children: "دخول",
          }),
        ],
      }),
    });
  },
  Pg = () =>
    y.jsx(Tn, {
      children: y.jsx(ue, { path: "/login", element: y.jsx(_g, {}) }),
    }),
  jg = () => {
    const [e, t] = k.useState([]),
      [n, r] = k.useState(""),
      { token: l } = On(),
      o = Or(),
      i = async () => {
        try {
          const { data: s } = await Jt.get(
            "http://localhost:5000/api/repairs",
            { headers: { Authorization: `Bearer ${l}` } }
          );
          t(s);
        } catch {
          r("فشل في تحميل بيانات الصيانة");
        }
      };
    return (
      k.useEffect(() => {
        i();
      }, []),
      y.jsxs("div", {
        className: "p-4",
        children: [
          y.jsxs("div", {
            className: "flex justify-between items-center mb-4",
            children: [
              y.jsx("h2", {
                className: "text-xl font-bold",
                children: "قائمة الصيانات",
              }),
              y.jsx(Bt, {
                onClick: () => o("/repairs/new"),
                children: "إضافة صيانة جديدة",
              }),
            ],
          }),
          n && y.jsx(Ln, { type: "error", message: n }),
          y.jsx("div", {
            className: "overflow-auto",
            children: y.jsxs("table", {
              className: "min-w-full bg-white dark:bg-gray-800 border text-sm",
              children: [
                y.jsx("thead", {
                  className: "bg-gray-200 dark:bg-gray-700",
                  children: y.jsxs("tr", {
                    children: [
                      y.jsx("th", {
                        className: "p-2 border",
                        children: "اسم العميل",
                      }),
                      y.jsx("th", {
                        className: "p-2 border",
                        children: "نوع الجهاز",
                      }),
                      y.jsx("th", {
                        className: "p-2 border",
                        children: "رقم الهاتف",
                      }),
                      y.jsx("th", {
                        className: "p-2 border",
                        children: "السعر",
                      }),
                      y.jsx("th", {
                        className: "p-2 border",
                        children: "الحالة",
                      }),
                    ],
                  }),
                }),
                y.jsx("tbody", {
                  children: e.map((s) =>
                    y.jsxs(
                      "tr",
                      {
                        children: [
                          y.jsx("td", {
                            className: "p-2 border",
                            children: s.customerName,
                          }),
                          y.jsx("td", {
                            className: "p-2 border",
                            children: s.deviceType,
                          }),
                          y.jsx("td", {
                            className: "p-2 border",
                            children: s.phone,
                          }),
                          y.jsxs("td", {
                            className: "p-2 border",
                            children: [s.price, " ج"],
                          }),
                          y.jsx("td", {
                            className: "p-2 border",
                            children: s.status,
                          }),
                        ],
                      },
                      s._id
                    )
                  ),
                }),
              ],
            }),
          }),
        ],
      })
    );
  },
  Tg = () => {
    const [e, t] = k.useState({
        customerName: "",
        deviceType: "",
        issue: "",
        color: "",
        phone: "",
        price: "",
        parts: [],
        notes: "",
      }),
      [n, r] = k.useState(""),
      l = Or(),
      { token: o } = On(),
      i = (u) => {
        t({ ...e, [u.target.name]: u.target.value });
      },
      s = async (u) => {
        u.preventDefault(), r("");
        try {
          const { data: a } = await Jt.post(
            "http://localhost:5000/api/repairs",
            e,
            { headers: { Authorization: `Bearer ${o}` } }
          );
          l("/repairs");
        } catch {
          r("فشل في حفظ الصيانة");
        }
      };
    return y.jsxs("div", {
      className: "p-4 max-w-2xl mx-auto",
      children: [
        y.jsx("h2", {
          className: "text-xl font-bold mb-4",
          children: "إضافة صيانة جديدة",
        }),
        n && y.jsx(Ln, { type: "error", message: n }),
        y.jsxs("form", {
          onSubmit: s,
          children: [
            [
              ["customerName", "اسم العميل"],
              ["deviceType", "نوع الجهاز"],
              ["issue", "العطل"],
              ["color", "اللون"],
              ["phone", "رقم التليفون"],
              ["price", "سعر الصيانة"],
            ].map(([u, a]) =>
              y.jsxs(
                "div",
                {
                  className: "relative",
                  children: [
                    y.jsx(Cr, {
                      label: a,
                      name: u,
                      value: e[u],
                      onChange: i,
                      placeholder: `ادخل ${a}`,
                      required: !0,
                    }),
                    y.jsx("div", {
                      className: "absolute top-[1.8rem] left-[-0.5rem]",
                      children: y.jsx(Vl, {
                        onText: (c) => t({ ...e, [u]: c }),
                      }),
                    }),
                  ],
                },
                u
              )
            ),
            y.jsx(Cr, {
              label: "ملاحظات",
              name: "notes",
              value: e.notes,
              onChange: i,
              placeholder: "ملاحظات إن وجدت",
            }),
            y.jsx(Bt, {
              type: "submit",
              className: "w-full mt-4",
              children: "حفظ الصيانة",
            }),
          ],
        }),
      ],
    });
  },
  Og = () =>
    y.jsxs(Tn, {
      children: [
        y.jsx(ue, { path: "/repairs", element: y.jsx(jg, {}) }),
        y.jsx(ue, { path: "/repairs/new", element: y.jsx(Tg, {}) }),
      ],
    }),
  Lg = () => {
    const [e, t] = k.useState([]),
      [n, r] = k.useState({
        name: "",
        username: "",
        password: "",
        permissions: {
          addRepair: !0,
          editRepair: !0,
          deleteRepair: !1,
          receiveDevice: !0,
        },
      }),
      [l, o] = k.useState(""),
      { token: i } = On(),
      s = async () => {
        try {
          const { data: c } = await Jt.get(
            "http://localhost:5000/api/technicians",
            { headers: { Authorization: `Bearer ${i}` } }
          );
          t(c);
        } catch {
          o("فشل تحميل الفنيين");
        }
      };
    k.useEffect(() => {
      s();
    }, []);
    const u = (c) => {
        const { name: f, value: m, type: S, checked: g } = c.target;
        f in n.permissions
          ? r({ ...n, permissions: { ...n.permissions, [f]: g } })
          : r({ ...n, [f]: m });
      },
      a = async (c) => {
        c.preventDefault(), o("");
        try {
          await Jt.post("http://localhost:5000/api/technicians", n, {
            headers: { Authorization: `Bearer ${i}` },
          }),
            s(),
            r({ ...n, name: "", username: "", password: "" });
        } catch {
          o("فشل في إنشاء الفني");
        }
      };
    return y.jsxs("div", {
      className: "p-4 max-w-4xl mx-auto",
      children: [
        y.jsx("h2", {
          className: "text-xl font-bold mb-4",
          children: "الفنيين",
        }),
        l && y.jsx(Ln, { type: "error", message: l }),
        y.jsxs("form", {
          onSubmit: a,
          className: "mb-6 bg-white dark:bg-gray-800 p-4 rounded shadow",
          children: [
            y.jsx("h3", {
              className: "text-lg font-semibold mb-2",
              children: "إضافة فني جديد",
            }),
            ["name", "username", "password"].map((c) =>
              y.jsxs(
                "div",
                {
                  className: "relative",
                  children: [
                    y.jsx(Cr, {
                      label:
                        c === "name"
                          ? "اسم الفني"
                          : c === "username"
                          ? "اسم المستخدم"
                          : "كلمة المرور",
                      name: c,
                      type: c === "password" ? "password" : "text",
                      value: n[c],
                      onChange: u,
                      required: !0,
                    }),
                    y.jsx("div", {
                      className: "absolute top-[1.8rem] left-[-0.5rem]",
                      children: y.jsx(Vl, {
                        onText: (f) => r({ ...n, [c]: f }),
                      }),
                    }),
                  ],
                },
                c
              )
            ),
            y.jsx("div", {
              className: "grid grid-cols-2 gap-4 mt-4 text-sm",
              children: Object.keys(n.permissions).map((c) =>
                y.jsxs(
                  "label",
                  {
                    className: "flex items-center gap-2",
                    children: [
                      y.jsx("input", {
                        type: "checkbox",
                        name: c,
                        checked: n.permissions[c],
                        onChange: u,
                      }),
                      c,
                    ],
                  },
                  c
                )
              ),
            }),
            y.jsx(Bt, {
              type: "submit",
              className: "mt-4 w-full",
              children: "إضافة الفني",
            }),
          ],
        }),
        y.jsx("div", {
          className: "overflow-auto",
          children: y.jsxs("table", {
            className: "min-w-full text-sm border bg-white dark:bg-gray-800",
            children: [
              y.jsx("thead", {
                className: "bg-gray-100 dark:bg-gray-700",
                children: y.jsxs("tr", {
                  children: [
                    y.jsx("th", { className: "p-2 border", children: "الاسم" }),
                    y.jsx("th", {
                      className: "p-2 border",
                      children: "اسم المستخدم",
                    }),
                    y.jsx("th", {
                      className: "p-2 border",
                      children: "الصلاحيات",
                    }),
                  ],
                }),
              }),
              y.jsx("tbody", {
                children: e.map((c) =>
                  y.jsxs(
                    "tr",
                    {
                      children: [
                        y.jsx("td", {
                          className: "p-2 border",
                          children: c.name,
                        }),
                        y.jsx("td", {
                          className: "p-2 border",
                          children: c.username,
                        }),
                        y.jsx("td", {
                          className: "p-2 border",
                          children: Object.entries(c.permissions)
                            .filter(([f, m]) => m)
                            .map(([f]) => f)
                            .join(", "),
                        }),
                      ],
                    },
                    c._id
                  )
                ),
              }),
            ],
          }),
        }),
      ],
    });
  },
  zg = () =>
    y.jsx(Tn, {
      children: y.jsx(ue, { path: "/technicians", element: y.jsx(Lg, {}) }),
    }),
  Dg = () => {
    const [e, t] = k.useState([]),
      [n, r] = k.useState(""),
      { token: l } = On(),
      o = async () => {
        try {
          const { data: s } = await Jt.get(
            "http://localhost:5000/api/invoices",
            { headers: { Authorization: `Bearer ${l}` } }
          );
          t(s);
        } catch {
          r("فشل تحميل الفواتير");
        }
      };
    k.useEffect(() => {
      o();
    }, []);
    const i = (s) => new Date(s).toLocaleDateString("ar-EG");
    return y.jsxs("div", {
      className: "p-4 max-w-5xl mx-auto",
      children: [
        y.jsx("h2", {
          className: "text-xl font-bold mb-4",
          children: "الفواتير والإحصائيات",
        }),
        n && y.jsx(Ln, { type: "error", message: n }),
        y.jsx("div", {
          className: "overflow-auto",
          children: y.jsxs("table", {
            className: "min-w-full bg-white dark:bg-gray-800 border text-sm",
            children: [
              y.jsx("thead", {
                className: "bg-gray-200 dark:bg-gray-700",
                children: y.jsxs("tr", {
                  children: [
                    y.jsx("th", {
                      className: "p-2 border",
                      children: "التاريخ",
                    }),
                    y.jsx("th", { className: "p-2 border", children: "الفني" }),
                    y.jsx("th", {
                      className: "p-2 border",
                      children: "سعر الإصلاح",
                    }),
                    y.jsx("th", {
                      className: "p-2 border",
                      children: "سعر الجملة",
                    }),
                    y.jsx("th", {
                      className: "p-2 border",
                      children: "ربح المحل",
                    }),
                    y.jsx("th", {
                      className: "p-2 border",
                      children: "ربح الفني",
                    }),
                  ],
                }),
              }),
              y.jsx("tbody", {
                children: e.map((s) => {
                  var u;
                  return y.jsxs(
                    "tr",
                    {
                      children: [
                        y.jsx("td", {
                          className: "p-2 border",
                          children: i(s.date),
                        }),
                        y.jsx("td", {
                          className: "p-2 border",
                          children:
                            (u = s.technician) == null ? void 0 : u.name,
                        }),
                        y.jsxs("td", {
                          className: "p-2 border",
                          children: [s.totalRepairPrice, " ج"],
                        }),
                        y.jsxs("td", {
                          className: "p-2 border",
                          children: [s.totalPartsCost, " ج"],
                        }),
                        y.jsxs("td", {
                          className: "p-2 border",
                          children: [s.shopProfit, " ج"],
                        }),
                        y.jsxs("td", {
                          className: "p-2 border",
                          children: [s.techProfit, " ج"],
                        }),
                      ],
                    },
                    s._id
                  );
                }),
              }),
            ],
          }),
        }),
      ],
    });
  },
  Ag = () =>
    y.jsx(Tn, {
      children: y.jsx(ue, { path: "/invoices", element: y.jsx(Dg, {}) }),
    }),
  Ig = () => {
    const { token: e } = On(),
      [t, n] = k.useState({
        repairs: 0,
        technicians: 0,
        dbSize: 0,
        warning: !1,
      }),
      [r, l] = k.useState(""),
      o = async () => {
        try {
          const { data: a } = await Jt.get(
            "http://localhost:5000/api/backup/stats",
            { headers: { Authorization: `Bearer ${e}` } }
          );
          n(a);
        } catch {
          l("فشل تحميل إحصائيات النظام");
        }
      },
      i = async () => {
        try {
          window.open("http://localhost:5000/api/backup/export", "_blank");
        } catch {
          l("فشل في التصدير");
        }
      },
      s = () => {
        alert("قريبًا: سيتم دعم استيراد النسخة الاحتياطية من ملف");
      },
      u = () => {
        window.confirm("هل أنت متأكد من مسح كل البيانات؟") &&
          alert("سيتم تنفيذ هذه العملية لاحقًا");
      };
    return (
      k.useEffect(() => {
        o();
      }, []),
      y.jsxs("div", {
        className: "p-4 max-w-3xl mx-auto",
        children: [
          y.jsx("h2", {
            className: "text-xl font-bold mb-4",
            children: "النسخ الاحتياطي وإحصائيات النظام",
          }),
          r && y.jsx(Ln, { type: "error", message: r }),
          y.jsxs("div", {
            className: "bg-white dark:bg-gray-800 p-4 rounded shadow mb-4",
            children: [
              y.jsxs("p", { children: ["عدد الصيانات: ", t.repairs] }),
              y.jsxs("p", { children: ["عدد الفنيين: ", t.technicians] }),
              y.jsxs("p", {
                children: [
                  "حجم قاعدة البيانات: ",
                  t.dbSize,
                  " MB",
                  " ",
                  t.warning &&
                    y.jsx("span", {
                      className: "text-red-600 font-bold",
                      children: "(اقتربت من الحد!)",
                    }),
                ],
              }),
            ],
          }),
          y.jsxs("div", {
            className: "grid grid-cols-1 gap-3 sm:grid-cols-3",
            children: [
              y.jsx(Bt, {
                onClick: i,
                variant: "primary",
                children: "تصدير نسخة احتياطية",
              }),
              y.jsx(Bt, {
                onClick: s,
                variant: "secondary",
                children: "استيراد نسخة احتياطية",
              }),
              y.jsx(Bt, {
                onClick: u,
                variant: "danger",
                children: "مسح كل البيانات",
              }),
            ],
          }),
        ],
      })
    );
  },
  Fg = () =>
    y.jsx(Tn, {
      children: y.jsx(ue, { path: "/backup", element: y.jsx(Ig, {}) }),
    }),
  Ug = (e) => {
    k.useEffect(() => {
      document.title = `${e} | Aqsa System`;
    }, [e]);
  },
  Mg = () => (
    Ug("الرئيسية"),
    y.jsxs("div", {
      className: "text-center py-10",
      children: [
        y.jsx("h2", {
          className: "text-2xl font-bold mb-4",
          children: "مرحبًا بك في نظام إدارة صيانة الأجهزة",
        }),
        y.jsx("p", {
          className: "text-sm text-gray-600 dark:text-gray-300",
          children: "ابدأ باختيار أحد الأقسام من القائمة العلوية.",
        }),
      ],
    })
  ),
  Bg = () =>
    y.jsxs("div", {
      className: "text-center py-20",
      children: [
        y.jsx("h1", { className: "text-5xl font-bold mb-4", children: "404" }),
        y.jsx("p", { className: "mb-4", children: "الصفحة غير موجودة" }),
        y.jsx(ad, {
          to: "/",
          className: "text-blue-600 underline",
          children: "العودة للصفحة الرئيسية",
        }),
      ],
    }),
  $g = () =>
    y.jsxs(Tn, {
      children: [
        y.jsx(ue, {
          element: y.jsx(yy, {}),
          children: y.jsx(ue, { path: "/login/*", element: y.jsx(Pg, {}) }),
        }),
        y.jsxs(ue, {
          element: y.jsx(Qy, {}),
          children: [
            y.jsx(ue, { index: !0, element: y.jsx(Mg, {}) }),
            y.jsx(ue, { path: "/repairs/*", element: y.jsx(Og, {}) }),
            y.jsx(ue, { path: "/technicians/*", element: y.jsx(zg, {}) }),
            y.jsx(ue, { path: "/invoices/*", element: y.jsx(Ag, {}) }),
            y.jsx(ue, { path: "/backup/*", element: y.jsx(Fg, {}) }),
          ],
        }),
        y.jsx(ue, { path: "*", element: y.jsx(Bg, {}) }),
      ],
    });
Zo.createRoot(document.getElementById("root")).render(
  y.jsx(dy, { children: y.jsx($g, {}) })
);

var $p = (n) => {
  throw TypeError(n);
};
var Lf = (n, l, i) => l.has(n) || $p("Cannot " + i);
var R = (n, l, i) => (
    Lf(n, l, "read from private field"), i ? i.call(n) : l.get(n)
  ),
  ye = (n, l, i) =>
    l.has(n)
      ? $p("Cannot add the same private member more than once")
      : l instanceof WeakSet
      ? l.add(n)
      : l.set(n, i),
  ne = (n, l, i, r) => (
    Lf(n, l, "write to private field"), r ? r.call(n, i) : l.set(n, i), i
  ),
  je = (n, l, i) => (Lf(n, l, "access private method"), i);
var qu = (n, l, i, r) => ({
  set _(c) {
    ne(n, l, c, i);
  },
  get _() {
    return R(n, l, r);
  },
});
(function () {
  const l = document.createElement("link").relList;
  if (l && l.supports && l.supports("modulepreload")) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) r(c);
  new MutationObserver((c) => {
    for (const f of c)
      if (f.type === "childList")
        for (const d of f.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && r(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(c) {
    const f = {};
    return (
      c.integrity && (f.integrity = c.integrity),
      c.referrerPolicy && (f.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === "use-credentials"
        ? (f.credentials = "include")
        : c.crossOrigin === "anonymous"
        ? (f.credentials = "omit")
        : (f.credentials = "same-origin"),
      f
    );
  }
  function r(c) {
    if (c.ep) return;
    c.ep = !0;
    const f = i(c);
    fetch(c.href, f);
  }
})();
function lb(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default")
    ? n.default
    : n;
}
var Hf = { exports: {} },
  nr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Jp;
function sb() {
  if (Jp) return nr;
  Jp = 1;
  var n = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.fragment");
  function i(r, c, f) {
    var d = null;
    if (
      (f !== void 0 && (d = "" + f),
      c.key !== void 0 && (d = "" + c.key),
      "key" in c)
    ) {
      f = {};
      for (var y in c) y !== "key" && (f[y] = c[y]);
    } else f = c;
    return (
      (c = f.ref),
      { $$typeof: n, type: r, key: d, ref: c !== void 0 ? c : null, props: f }
    );
  }
  return (nr.Fragment = l), (nr.jsx = i), (nr.jsxs = i), nr;
}
var Wp;
function ib() {
  return Wp || ((Wp = 1), (Hf.exports = sb())), Hf.exports;
}
var h = ib(),
  Bf = { exports: {} },
  ar = {},
  Vf = { exports: {} },
  qf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ip;
function rb() {
  return (
    Ip ||
      ((Ip = 1),
      (function (n) {
        function l(K, oe) {
          var me = K.length;
          K.push(oe);
          e: for (; 0 < me; ) {
            var He = (me - 1) >>> 1,
              A = K[He];
            if (0 < c(A, oe)) (K[He] = oe), (K[me] = A), (me = He);
            else break e;
          }
        }
        function i(K) {
          return K.length === 0 ? null : K[0];
        }
        function r(K) {
          if (K.length === 0) return null;
          var oe = K[0],
            me = K.pop();
          if (me !== oe) {
            K[0] = me;
            e: for (var He = 0, A = K.length, Z = A >>> 1; He < Z; ) {
              var ge = 2 * (He + 1) - 1,
                pe = K[ge],
                ae = ge + 1,
                Ce = K[ae];
              if (0 > c(pe, me))
                ae < A && 0 > c(Ce, pe)
                  ? ((K[He] = Ce), (K[ae] = me), (He = ae))
                  : ((K[He] = pe), (K[ge] = me), (He = ge));
              else if (ae < A && 0 > c(Ce, me))
                (K[He] = Ce), (K[ae] = me), (He = ae);
              else break e;
            }
          }
          return oe;
        }
        function c(K, oe) {
          var me = K.sortIndex - oe.sortIndex;
          return me !== 0 ? me : K.id - oe.id;
        }
        if (
          ((n.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var f = performance;
          n.unstable_now = function () {
            return f.now();
          };
        } else {
          var d = Date,
            y = d.now();
          n.unstable_now = function () {
            return d.now() - y;
          };
        }
        var p = [],
          m = [],
          v = 1,
          b = null,
          E = 3,
          j = !1,
          _ = !1,
          D = !1,
          T = typeof setTimeout == "function" ? setTimeout : null,
          U = typeof clearTimeout == "function" ? clearTimeout : null,
          L = typeof setImmediate < "u" ? setImmediate : null;
        function V(K) {
          for (var oe = i(m); oe !== null; ) {
            if (oe.callback === null) r(m);
            else if (oe.startTime <= K)
              r(m), (oe.sortIndex = oe.expirationTime), l(p, oe);
            else break;
            oe = i(m);
          }
        }
        function I(K) {
          if (((D = !1), V(K), !_))
            if (i(p) !== null) (_ = !0), Le();
            else {
              var oe = i(m);
              oe !== null && xe(I, oe.startTime - K);
            }
        }
        var Y = !1,
          te = -1,
          de = 5,
          ee = -1;
        function G() {
          return !(n.unstable_now() - ee < de);
        }
        function le() {
          if (Y) {
            var K = n.unstable_now();
            ee = K;
            var oe = !0;
            try {
              e: {
                (_ = !1), D && ((D = !1), U(te), (te = -1)), (j = !0);
                var me = E;
                try {
                  t: {
                    for (
                      V(K), b = i(p);
                      b !== null && !(b.expirationTime > K && G());

                    ) {
                      var He = b.callback;
                      if (typeof He == "function") {
                        (b.callback = null), (E = b.priorityLevel);
                        var A = He(b.expirationTime <= K);
                        if (((K = n.unstable_now()), typeof A == "function")) {
                          (b.callback = A), V(K), (oe = !0);
                          break t;
                        }
                        b === i(p) && r(p), V(K);
                      } else r(p);
                      b = i(p);
                    }
                    if (b !== null) oe = !0;
                    else {
                      var Z = i(m);
                      Z !== null && xe(I, Z.startTime - K), (oe = !1);
                    }
                  }
                  break e;
                } finally {
                  (b = null), (E = me), (j = !1);
                }
                oe = void 0;
              }
            } finally {
              oe ? ke() : (Y = !1);
            }
          }
        }
        var ke;
        if (typeof L == "function")
          ke = function () {
            L(le);
          };
        else if (typeof MessageChannel < "u") {
          var he = new MessageChannel(),
            we = he.port2;
          (he.port1.onmessage = le),
            (ke = function () {
              we.postMessage(null);
            });
        } else
          ke = function () {
            T(le, 0);
          };
        function Le() {
          Y || ((Y = !0), ke());
        }
        function xe(K, oe) {
          te = T(function () {
            K(n.unstable_now());
          }, oe);
        }
        (n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (K) {
            K.callback = null;
          }),
          (n.unstable_continueExecution = function () {
            _ || j || ((_ = !0), Le());
          }),
          (n.unstable_forceFrameRate = function (K) {
            0 > K || 125 < K
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (de = 0 < K ? Math.floor(1e3 / K) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return E;
          }),
          (n.unstable_getFirstCallbackNode = function () {
            return i(p);
          }),
          (n.unstable_next = function (K) {
            switch (E) {
              case 1:
              case 2:
              case 3:
                var oe = 3;
                break;
              default:
                oe = E;
            }
            var me = E;
            E = oe;
            try {
              return K();
            } finally {
              E = me;
            }
          }),
          (n.unstable_pauseExecution = function () {}),
          (n.unstable_requestPaint = function () {}),
          (n.unstable_runWithPriority = function (K, oe) {
            switch (K) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                K = 3;
            }
            var me = E;
            E = K;
            try {
              return oe();
            } finally {
              E = me;
            }
          }),
          (n.unstable_scheduleCallback = function (K, oe, me) {
            var He = n.unstable_now();
            switch (
              (typeof me == "object" && me !== null
                ? ((me = me.delay),
                  (me = typeof me == "number" && 0 < me ? He + me : He))
                : (me = He),
              K)
            ) {
              case 1:
                var A = -1;
                break;
              case 2:
                A = 250;
                break;
              case 5:
                A = 1073741823;
                break;
              case 4:
                A = 1e4;
                break;
              default:
                A = 5e3;
            }
            return (
              (A = me + A),
              (K = {
                id: v++,
                callback: oe,
                priorityLevel: K,
                startTime: me,
                expirationTime: A,
                sortIndex: -1,
              }),
              me > He
                ? ((K.sortIndex = me),
                  l(m, K),
                  i(p) === null &&
                    K === i(m) &&
                    (D ? (U(te), (te = -1)) : (D = !0), xe(I, me - He)))
                : ((K.sortIndex = A), l(p, K), _ || j || ((_ = !0), Le())),
              K
            );
          }),
          (n.unstable_shouldYield = G),
          (n.unstable_wrapCallback = function (K) {
            var oe = E;
            return function () {
              var me = E;
              E = oe;
              try {
                return K.apply(this, arguments);
              } finally {
                E = me;
              }
            };
          });
      })(qf)),
    qf
  );
}
var ey;
function ub() {
  return ey || ((ey = 1), (Vf.exports = rb())), Vf.exports;
}
var kf = { exports: {} },
  _e = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ty;
function cb() {
  if (ty) return _e;
  ty = 1;
  var n = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.portal"),
    i = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    c = Symbol.for("react.profiler"),
    f = Symbol.for("react.consumer"),
    d = Symbol.for("react.context"),
    y = Symbol.for("react.forward_ref"),
    p = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    v = Symbol.for("react.lazy"),
    b = Symbol.iterator;
  function E(A) {
    return A === null || typeof A != "object"
      ? null
      : ((A = (b && A[b]) || A["@@iterator"]),
        typeof A == "function" ? A : null);
  }
  var j = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    _ = Object.assign,
    D = {};
  function T(A, Z, ge) {
    (this.props = A),
      (this.context = Z),
      (this.refs = D),
      (this.updater = ge || j);
  }
  (T.prototype.isReactComponent = {}),
    (T.prototype.setState = function (A, Z) {
      if (typeof A != "object" && typeof A != "function" && A != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, A, Z, "setState");
    }),
    (T.prototype.forceUpdate = function (A) {
      this.updater.enqueueForceUpdate(this, A, "forceUpdate");
    });
  function U() {}
  U.prototype = T.prototype;
  function L(A, Z, ge) {
    (this.props = A),
      (this.context = Z),
      (this.refs = D),
      (this.updater = ge || j);
  }
  var V = (L.prototype = new U());
  (V.constructor = L), _(V, T.prototype), (V.isPureReactComponent = !0);
  var I = Array.isArray,
    Y = { H: null, A: null, T: null, S: null },
    te = Object.prototype.hasOwnProperty;
  function de(A, Z, ge, pe, ae, Ce) {
    return (
      (ge = Ce.ref),
      {
        $$typeof: n,
        type: A,
        key: Z,
        ref: ge !== void 0 ? ge : null,
        props: Ce,
      }
    );
  }
  function ee(A, Z) {
    return de(A.type, Z, void 0, void 0, void 0, A.props);
  }
  function G(A) {
    return typeof A == "object" && A !== null && A.$$typeof === n;
  }
  function le(A) {
    var Z = { "=": "=0", ":": "=2" };
    return (
      "$" +
      A.replace(/[=:]/g, function (ge) {
        return Z[ge];
      })
    );
  }
  var ke = /\/+/g;
  function he(A, Z) {
    return typeof A == "object" && A !== null && A.key != null
      ? le("" + A.key)
      : Z.toString(36);
  }
  function we() {}
  function Le(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (
          (typeof A.status == "string"
            ? A.then(we, we)
            : ((A.status = "pending"),
              A.then(
                function (Z) {
                  A.status === "pending" &&
                    ((A.status = "fulfilled"), (A.value = Z));
                },
                function (Z) {
                  A.status === "pending" &&
                    ((A.status = "rejected"), (A.reason = Z));
                }
              )),
          A.status)
        ) {
          case "fulfilled":
            return A.value;
          case "rejected":
            throw A.reason;
        }
    }
    throw A;
  }
  function xe(A, Z, ge, pe, ae) {
    var Ce = typeof A;
    (Ce === "undefined" || Ce === "boolean") && (A = null);
    var Se = !1;
    if (A === null) Se = !0;
    else
      switch (Ce) {
        case "bigint":
        case "string":
        case "number":
          Se = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case n:
            case l:
              Se = !0;
              break;
            case v:
              return (Se = A._init), xe(Se(A._payload), Z, ge, pe, ae);
          }
      }
    if (Se)
      return (
        (ae = ae(A)),
        (Se = pe === "" ? "." + he(A, 0) : pe),
        I(ae)
          ? ((ge = ""),
            Se != null && (ge = Se.replace(ke, "$&/") + "/"),
            xe(ae, Z, ge, "", function (Je) {
              return Je;
            }))
          : ae != null &&
            (G(ae) &&
              (ae = ee(
                ae,
                ge +
                  (ae.key == null || (A && A.key === ae.key)
                    ? ""
                    : ("" + ae.key).replace(ke, "$&/") + "/") +
                  Se
              )),
            Z.push(ae)),
        1
      );
    Se = 0;
    var wt = pe === "" ? "." : pe + ":";
    if (I(A))
      for (var Me = 0; Me < A.length; Me++)
        (pe = A[Me]), (Ce = wt + he(pe, Me)), (Se += xe(pe, Z, ge, Ce, ae));
    else if (((Me = E(A)), typeof Me == "function"))
      for (A = Me.call(A), Me = 0; !(pe = A.next()).done; )
        (pe = pe.value),
          (Ce = wt + he(pe, Me++)),
          (Se += xe(pe, Z, ge, Ce, ae));
    else if (Ce === "object") {
      if (typeof A.then == "function") return xe(Le(A), Z, ge, pe, ae);
      throw (
        ((Z = String(A)),
        Error(
          "Objects are not valid as a React child (found: " +
            (Z === "[object Object]"
              ? "object with keys {" + Object.keys(A).join(", ") + "}"
              : Z) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return Se;
  }
  function K(A, Z, ge) {
    if (A == null) return A;
    var pe = [],
      ae = 0;
    return (
      xe(A, pe, "", "", function (Ce) {
        return Z.call(ge, Ce, ae++);
      }),
      pe
    );
  }
  function oe(A) {
    if (A._status === -1) {
      var Z = A._result;
      (Z = Z()),
        Z.then(
          function (ge) {
            (A._status === 0 || A._status === -1) &&
              ((A._status = 1), (A._result = ge));
          },
          function (ge) {
            (A._status === 0 || A._status === -1) &&
              ((A._status = 2), (A._result = ge));
          }
        ),
        A._status === -1 && ((A._status = 0), (A._result = Z));
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var me =
    typeof reportError == "function"
      ? reportError
      : function (A) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var Z = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof A == "object" &&
                A !== null &&
                typeof A.message == "string"
                  ? String(A.message)
                  : String(A),
              error: A,
            });
            if (!window.dispatchEvent(Z)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", A);
            return;
          }
          console.error(A);
        };
  function He() {}
  return (
    (_e.Children = {
      map: K,
      forEach: function (A, Z, ge) {
        K(
          A,
          function () {
            Z.apply(this, arguments);
          },
          ge
        );
      },
      count: function (A) {
        var Z = 0;
        return (
          K(A, function () {
            Z++;
          }),
          Z
        );
      },
      toArray: function (A) {
        return (
          K(A, function (Z) {
            return Z;
          }) || []
        );
      },
      only: function (A) {
        if (!G(A))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return A;
      },
    }),
    (_e.Component = T),
    (_e.Fragment = i),
    (_e.Profiler = c),
    (_e.PureComponent = L),
    (_e.StrictMode = r),
    (_e.Suspense = p),
    (_e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Y),
    (_e.act = function () {
      throw Error("act(...) is not supported in production builds of React.");
    }),
    (_e.cache = function (A) {
      return function () {
        return A.apply(null, arguments);
      };
    }),
    (_e.cloneElement = function (A, Z, ge) {
      if (A == null)
        throw Error(
          "The argument must be a React element, but you passed " + A + "."
        );
      var pe = _({}, A.props),
        ae = A.key,
        Ce = void 0;
      if (Z != null)
        for (Se in (Z.ref !== void 0 && (Ce = void 0),
        Z.key !== void 0 && (ae = "" + Z.key),
        Z))
          !te.call(Z, Se) ||
            Se === "key" ||
            Se === "__self" ||
            Se === "__source" ||
            (Se === "ref" && Z.ref === void 0) ||
            (pe[Se] = Z[Se]);
      var Se = arguments.length - 2;
      if (Se === 1) pe.children = ge;
      else if (1 < Se) {
        for (var wt = Array(Se), Me = 0; Me < Se; Me++)
          wt[Me] = arguments[Me + 2];
        pe.children = wt;
      }
      return de(A.type, ae, void 0, void 0, Ce, pe);
    }),
    (_e.createContext = function (A) {
      return (
        (A = {
          $$typeof: d,
          _currentValue: A,
          _currentValue2: A,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (A.Provider = A),
        (A.Consumer = { $$typeof: f, _context: A }),
        A
      );
    }),
    (_e.createElement = function (A, Z, ge) {
      var pe,
        ae = {},
        Ce = null;
      if (Z != null)
        for (pe in (Z.key !== void 0 && (Ce = "" + Z.key), Z))
          te.call(Z, pe) &&
            pe !== "key" &&
            pe !== "__self" &&
            pe !== "__source" &&
            (ae[pe] = Z[pe]);
      var Se = arguments.length - 2;
      if (Se === 1) ae.children = ge;
      else if (1 < Se) {
        for (var wt = Array(Se), Me = 0; Me < Se; Me++)
          wt[Me] = arguments[Me + 2];
        ae.children = wt;
      }
      if (A && A.defaultProps)
        for (pe in ((Se = A.defaultProps), Se))
          ae[pe] === void 0 && (ae[pe] = Se[pe]);
      return de(A, Ce, void 0, void 0, null, ae);
    }),
    (_e.createRef = function () {
      return { current: null };
    }),
    (_e.forwardRef = function (A) {
      return { $$typeof: y, render: A };
    }),
    (_e.isValidElement = G),
    (_e.lazy = function (A) {
      return { $$typeof: v, _payload: { _status: -1, _result: A }, _init: oe };
    }),
    (_e.memo = function (A, Z) {
      return { $$typeof: m, type: A, compare: Z === void 0 ? null : Z };
    }),
    (_e.startTransition = function (A) {
      var Z = Y.T,
        ge = {};
      Y.T = ge;
      try {
        var pe = A(),
          ae = Y.S;
        ae !== null && ae(ge, pe),
          typeof pe == "object" &&
            pe !== null &&
            typeof pe.then == "function" &&
            pe.then(He, me);
      } catch (Ce) {
        me(Ce);
      } finally {
        Y.T = Z;
      }
    }),
    (_e.unstable_useCacheRefresh = function () {
      return Y.H.useCacheRefresh();
    }),
    (_e.use = function (A) {
      return Y.H.use(A);
    }),
    (_e.useActionState = function (A, Z, ge) {
      return Y.H.useActionState(A, Z, ge);
    }),
    (_e.useCallback = function (A, Z) {
      return Y.H.useCallback(A, Z);
    }),
    (_e.useContext = function (A) {
      return Y.H.useContext(A);
    }),
    (_e.useDebugValue = function () {}),
    (_e.useDeferredValue = function (A, Z) {
      return Y.H.useDeferredValue(A, Z);
    }),
    (_e.useEffect = function (A, Z) {
      return Y.H.useEffect(A, Z);
    }),
    (_e.useId = function () {
      return Y.H.useId();
    }),
    (_e.useImperativeHandle = function (A, Z, ge) {
      return Y.H.useImperativeHandle(A, Z, ge);
    }),
    (_e.useInsertionEffect = function (A, Z) {
      return Y.H.useInsertionEffect(A, Z);
    }),
    (_e.useLayoutEffect = function (A, Z) {
      return Y.H.useLayoutEffect(A, Z);
    }),
    (_e.useMemo = function (A, Z) {
      return Y.H.useMemo(A, Z);
    }),
    (_e.useOptimistic = function (A, Z) {
      return Y.H.useOptimistic(A, Z);
    }),
    (_e.useReducer = function (A, Z, ge) {
      return Y.H.useReducer(A, Z, ge);
    }),
    (_e.useRef = function (A) {
      return Y.H.useRef(A);
    }),
    (_e.useState = function (A) {
      return Y.H.useState(A);
    }),
    (_e.useSyncExternalStore = function (A, Z, ge) {
      return Y.H.useSyncExternalStore(A, Z, ge);
    }),
    (_e.useTransition = function () {
      return Y.H.useTransition();
    }),
    (_e.version = "19.0.0"),
    _e
  );
}
var ny;
function Bd() {
  return ny || ((ny = 1), (kf.exports = cb())), kf.exports;
}
var Ff = { exports: {} },
  Ut = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ay;
function ob() {
  if (ay) return Ut;
  ay = 1;
  var n = Bd();
  function l(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        m += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return (
      "Minified React error #" +
      p +
      "; visit " +
      m +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function i() {}
  var r = {
      d: {
        f: i,
        r: function () {
          throw Error(l(522));
        },
        D: i,
        C: i,
        L: i,
        m: i,
        X: i,
        S: i,
        M: i,
      },
      p: 0,
      findDOMNode: null,
    },
    c = Symbol.for("react.portal");
  function f(p, m, v) {
    var b =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: b == null ? null : "" + b,
      children: p,
      containerInfo: m,
      implementation: v,
    };
  }
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function y(p, m) {
    if (p === "font") return "";
    if (typeof m == "string") return m === "use-credentials" ? m : "";
  }
  return (
    (Ut.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (Ut.createPortal = function (p, m) {
      var v =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
        throw Error(l(299));
      return f(p, m, null, v);
    }),
    (Ut.flushSync = function (p) {
      var m = d.T,
        v = r.p;
      try {
        if (((d.T = null), (r.p = 2), p)) return p();
      } finally {
        (d.T = m), (r.p = v), r.d.f();
      }
    }),
    (Ut.preconnect = function (p, m) {
      typeof p == "string" &&
        (m
          ? ((m = m.crossOrigin),
            (m =
              typeof m == "string"
                ? m === "use-credentials"
                  ? m
                  : ""
                : void 0))
          : (m = null),
        r.d.C(p, m));
    }),
    (Ut.prefetchDNS = function (p) {
      typeof p == "string" && r.d.D(p);
    }),
    (Ut.preinit = function (p, m) {
      if (typeof p == "string" && m && typeof m.as == "string") {
        var v = m.as,
          b = y(v, m.crossOrigin),
          E = typeof m.integrity == "string" ? m.integrity : void 0,
          j = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
        v === "style"
          ? r.d.S(p, typeof m.precedence == "string" ? m.precedence : void 0, {
              crossOrigin: b,
              integrity: E,
              fetchPriority: j,
            })
          : v === "script" &&
            r.d.X(p, {
              crossOrigin: b,
              integrity: E,
              fetchPriority: j,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
      }
    }),
    (Ut.preinitModule = function (p, m) {
      if (typeof p == "string")
        if (typeof m == "object" && m !== null) {
          if (m.as == null || m.as === "script") {
            var v = y(m.as, m.crossOrigin);
            r.d.M(p, {
              crossOrigin: v,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
          }
        } else m == null && r.d.M(p);
    }),
    (Ut.preload = function (p, m) {
      if (
        typeof p == "string" &&
        typeof m == "object" &&
        m !== null &&
        typeof m.as == "string"
      ) {
        var v = m.as,
          b = y(v, m.crossOrigin);
        r.d.L(p, v, {
          crossOrigin: b,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          type: typeof m.type == "string" ? m.type : void 0,
          fetchPriority:
            typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
          referrerPolicy:
            typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
          imageSrcSet:
            typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
          media: typeof m.media == "string" ? m.media : void 0,
        });
      }
    }),
    (Ut.preloadModule = function (p, m) {
      if (typeof p == "string")
        if (m) {
          var v = y(m.as, m.crossOrigin);
          r.d.m(p, {
            as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
            crossOrigin: v,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          });
        } else r.d.m(p);
    }),
    (Ut.requestFormReset = function (p) {
      r.d.r(p);
    }),
    (Ut.unstable_batchedUpdates = function (p, m) {
      return p(m);
    }),
    (Ut.useFormState = function (p, m, v) {
      return d.H.useFormState(p, m, v);
    }),
    (Ut.useFormStatus = function () {
      return d.H.useHostTransitionStatus();
    }),
    (Ut.version = "19.0.0"),
    Ut
  );
}
var ly;
function fb() {
  if (ly) return Ff.exports;
  ly = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (l) {
        console.error(l);
      }
  }
  return n(), (Ff.exports = ob()), Ff.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var sy;
function db() {
  if (sy) return ar;
  sy = 1;
  var n = ub(),
    l = Bd(),
    i = fb();
  function r(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function c(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  var f = Symbol.for("react.element"),
    d = Symbol.for("react.transitional.element"),
    y = Symbol.for("react.portal"),
    p = Symbol.for("react.fragment"),
    m = Symbol.for("react.strict_mode"),
    v = Symbol.for("react.profiler"),
    b = Symbol.for("react.provider"),
    E = Symbol.for("react.consumer"),
    j = Symbol.for("react.context"),
    _ = Symbol.for("react.forward_ref"),
    D = Symbol.for("react.suspense"),
    T = Symbol.for("react.suspense_list"),
    U = Symbol.for("react.memo"),
    L = Symbol.for("react.lazy"),
    V = Symbol.for("react.offscreen"),
    I = Symbol.for("react.memo_cache_sentinel"),
    Y = Symbol.iterator;
  function te(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Y && e[Y]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var de = Symbol.for("react.client.reference");
  function ee(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === de ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case p:
        return "Fragment";
      case y:
        return "Portal";
      case v:
        return "Profiler";
      case m:
        return "StrictMode";
      case D:
        return "Suspense";
      case T:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case j:
          return (e.displayName || "Context") + ".Provider";
        case E:
          return (e._context.displayName || "Context") + ".Consumer";
        case _:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case U:
          return (
            (t = e.displayName || null), t !== null ? t : ee(e.type) || "Memo"
          );
        case L:
          (t = e._payload), (e = e._init);
          try {
            return ee(e(t));
          } catch {}
      }
    return null;
  }
  var G = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    le = Object.assign,
    ke,
    he;
  function we(e) {
    if (ke === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        (ke = (t && t[1]) || ""),
          (he =
            -1 <
            a.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < a.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      ke +
      e +
      he
    );
  }
  var Le = !1;
  function xe(e, t) {
    if (!e || Le) return "";
    Le = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var s = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var X = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(X.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(X, []);
                } catch (F) {
                  var B = F;
                }
                Reflect.construct(e, [], X);
              } else {
                try {
                  X.call();
                } catch (F) {
                  B = F;
                }
                e.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (F) {
                B = F;
              }
              (X = e()) &&
                typeof X.catch == "function" &&
                X.catch(function () {});
            }
          } catch (F) {
            if (F && B && typeof F.stack == "string") return [F.stack, B.stack];
          }
          return [null, null];
        },
      };
      s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        s.DetermineComponentFrameRoot,
        "name"
      );
      u &&
        u.configurable &&
        Object.defineProperty(s.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var o = s.DetermineComponentFrameRoot(),
        g = o[0],
        x = o[1];
      if (g && x) {
        var S = g.split(`
`),
          O = x.split(`
`);
        for (
          u = s = 0;
          s < S.length && !S[s].includes("DetermineComponentFrameRoot");

        )
          s++;
        for (; u < O.length && !O[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (s === S.length || u === O.length)
          for (
            s = S.length - 1, u = O.length - 1;
            1 <= s && 0 <= u && S[s] !== O[u];

          )
            u--;
        for (; 1 <= s && 0 <= u; s--, u--)
          if (S[s] !== O[u]) {
            if (s !== 1 || u !== 1)
              do
                if ((s--, u--, 0 > u || S[s] !== O[u])) {
                  var Q =
                    `
` + S[s].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      Q.includes("<anonymous>") &&
                      (Q = Q.replace("<anonymous>", e.displayName)),
                    Q
                  );
                }
              while (1 <= s && 0 <= u);
            break;
          }
      }
    } finally {
      (Le = !1), (Error.prepareStackTrace = a);
    }
    return (a = e ? e.displayName || e.name : "") ? we(a) : "";
  }
  function K(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return we(e.type);
      case 16:
        return we("Lazy");
      case 13:
        return we("Suspense");
      case 19:
        return we("SuspenseList");
      case 0:
      case 15:
        return (e = xe(e.type, !1)), e;
      case 11:
        return (e = xe(e.type.render, !1)), e;
      case 1:
        return (e = xe(e.type, !0)), e;
      default:
        return "";
    }
  }
  function oe(e) {
    try {
      var t = "";
      do (t += K(e)), (e = e.return);
      while (e);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  function me(e) {
    var t = e,
      a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), t.flags & 4098 && (a = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function He(e) {
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
  function A(e) {
    if (me(e) !== e) throw Error(r(188));
  }
  function Z(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = me(e)), t === null)) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var a = e, s = t; ; ) {
      var u = a.return;
      if (u === null) break;
      var o = u.alternate;
      if (o === null) {
        if (((s = u.return), s !== null)) {
          a = s;
          continue;
        }
        break;
      }
      if (u.child === o.child) {
        for (o = u.child; o; ) {
          if (o === a) return A(u), e;
          if (o === s) return A(u), t;
          o = o.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== s.return) (a = u), (s = o);
      else {
        for (var g = !1, x = u.child; x; ) {
          if (x === a) {
            (g = !0), (a = u), (s = o);
            break;
          }
          if (x === s) {
            (g = !0), (s = u), (a = o);
            break;
          }
          x = x.sibling;
        }
        if (!g) {
          for (x = o.child; x; ) {
            if (x === a) {
              (g = !0), (a = o), (s = u);
              break;
            }
            if (x === s) {
              (g = !0), (s = o), (a = u);
              break;
            }
            x = x.sibling;
          }
          if (!g) throw Error(r(189));
        }
      }
      if (a.alternate !== s) throw Error(r(190));
    }
    if (a.tag !== 3) throw Error(r(188));
    return a.stateNode.current === a ? e : t;
  }
  function ge(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = ge(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var pe = Array.isArray,
    ae = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Ce = { pending: !1, data: null, method: null, action: null },
    Se = [],
    wt = -1;
  function Me(e) {
    return { current: e };
  }
  function Je(e) {
    0 > wt || ((e.current = Se[wt]), (Se[wt] = null), wt--);
  }
  function Ge(e, t) {
    wt++, (Se[wt] = e.current), (e.current = t);
  }
  var tn = Me(null),
    fl = Me(null),
    Tn = Me(null),
    dl = Me(null);
  function si(e, t) {
    switch ((Ge(Tn, t), Ge(fl, e), Ge(tn, null), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) && (t = t.namespaceURI) ? Rp(t) : 0;
        break;
      default:
        if (
          ((e = e === 8 ? t.parentNode : t),
          (t = e.tagName),
          (e = e.namespaceURI))
        )
          (e = Rp(e)), (t = jp(e, t));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    Je(tn), Ge(tn, t);
  }
  function hl() {
    Je(tn), Je(fl), Je(Tn);
  }
  function Ar(e) {
    e.memoizedState !== null && Ge(dl, e);
    var t = tn.current,
      a = jp(t, e.type);
    t !== a && (Ge(fl, e), Ge(tn, a));
  }
  function N(e) {
    fl.current === e && (Je(tn), Je(fl)),
      dl.current === e && (Je(dl), (Ji._currentValue = Ce));
  }
  var H = Object.prototype.hasOwnProperty,
    k = n.unstable_scheduleCallback,
    W = n.unstable_cancelCallback,
    J = n.unstable_shouldYield,
    $ = n.unstable_requestPaint,
    ue = n.unstable_now,
    Re = n.unstable_getCurrentPriorityLevel,
    it = n.unstable_ImmediatePriority,
    rt = n.unstable_UserBlockingPriority,
    nn = n.unstable_NormalPriority,
    Nc = n.unstable_LowPriority,
    Jl = n.unstable_IdlePriority,
    ii = n.log,
    Ac = n.unstable_setDisableYieldValue,
    ja = null,
    Ht = null;
  function Tr(e) {
    if (Ht && typeof Ht.onCommitFiberRoot == "function")
      try {
        Ht.onCommitFiberRoot(ja, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  function Na(e) {
    if (
      (typeof ii == "function" && Ac(e),
      Ht && typeof Ht.setStrictMode == "function")
    )
      try {
        Ht.setStrictMode(ja, e);
      } catch {}
  }
  var an = Math.clz32 ? Math.clz32 : Yg,
    Qg = Math.log,
    Pg = Math.LN2;
  function Yg(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((Qg(e) / Pg) | 0)) | 0;
  }
  var Cr = 128,
    Or = 4194304;
  function ml(e) {
    var t = e & 42;
    if (t !== 0) return t;
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
        return 64;
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
        return e & 4194176;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Dr(e, t) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var s = 0,
      u = e.suspendedLanes,
      o = e.pingedLanes,
      g = e.warmLanes;
    e = e.finishedLanes !== 0;
    var x = a & 134217727;
    return (
      x !== 0
        ? ((a = x & ~u),
          a !== 0
            ? (s = ml(a))
            : ((o &= x),
              o !== 0
                ? (s = ml(o))
                : e || ((g = x & ~g), g !== 0 && (s = ml(g)))))
        : ((x = a & ~u),
          x !== 0
            ? (s = ml(x))
            : o !== 0
            ? (s = ml(o))
            : e || ((g = a & ~g), g !== 0 && (s = ml(g)))),
      s === 0
        ? 0
        : t !== 0 &&
          t !== s &&
          !(t & u) &&
          ((u = s & -s),
          (g = t & -t),
          u >= g || (u === 32 && (g & 4194176) !== 0))
        ? t
        : s
    );
  }
  function ri(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Gg(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
        return t + 250;
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
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function gh() {
    var e = Cr;
    return (Cr <<= 1), !(Cr & 4194176) && (Cr = 128), e;
  }
  function vh() {
    var e = Or;
    return (Or <<= 1), !(Or & 62914560) && (Or = 4194304), e;
  }
  function Tc(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function ui(e, t) {
    (e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
  }
  function Xg(e, t, a, s, u, o) {
    var g = e.pendingLanes;
    (e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0);
    var x = e.entanglements,
      S = e.expirationTimes,
      O = e.hiddenUpdates;
    for (a = g & ~a; 0 < a; ) {
      var Q = 31 - an(a),
        X = 1 << Q;
      (x[Q] = 0), (S[Q] = -1);
      var B = O[Q];
      if (B !== null)
        for (O[Q] = null, Q = 0; Q < B.length; Q++) {
          var F = B[Q];
          F !== null && (F.lane &= -536870913);
        }
      a &= ~X;
    }
    s !== 0 && bh(e, s, 0),
      o !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= o & ~(g & ~t));
  }
  function bh(e, t, a) {
    (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
    var s = 31 - an(t);
    (e.entangledLanes |= t),
      (e.entanglements[s] = e.entanglements[s] | 1073741824 | (a & 4194218));
  }
  function xh(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var s = 31 - an(a),
        u = 1 << s;
      (u & t) | (e[s] & t) && (e[s] |= t), (a &= ~u);
    }
  }
  function Sh(e) {
    return (
      (e &= -e), 2 < e ? (8 < e ? (e & 134217727 ? 32 : 268435456) : 8) : 2
    );
  }
  function wh() {
    var e = ae.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Pp(e.type));
  }
  function Zg(e, t) {
    var a = ae.p;
    try {
      return (ae.p = e), t();
    } finally {
      ae.p = a;
    }
  }
  var Aa = Math.random().toString(36).slice(2),
    Dt = "__reactFiber$" + Aa,
    Yt = "__reactProps$" + Aa,
    Wl = "__reactContainer$" + Aa,
    Cc = "__reactEvents$" + Aa,
    Kg = "__reactListeners$" + Aa,
    $g = "__reactHandles$" + Aa,
    Eh = "__reactResources$" + Aa,
    ci = "__reactMarker$" + Aa;
  function Oc(e) {
    delete e[Dt], delete e[Yt], delete e[Cc], delete e[Kg], delete e[$g];
  }
  function pl(e) {
    var t = e[Dt];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Wl] || a[Dt])) {
        if (
          ((a = t.alternate),
          t.child !== null || (a !== null && a.child !== null))
        )
          for (e = Tp(e); e !== null; ) {
            if ((a = e[Dt])) return a;
            e = Tp(e);
          }
        return t;
      }
      (e = a), (a = e.parentNode);
    }
    return null;
  }
  function Il(e) {
    if ((e = e[Dt] || e[Wl])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function oi(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function es(e) {
    var t = e[Eh];
    return (
      t ||
        (t = e[Eh] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Et(e) {
    e[ci] = !0;
  }
  var _h = new Set(),
    Rh = {};
  function yl(e, t) {
    ts(e, t), ts(e + "Capture", t);
  }
  function ts(e, t) {
    for (Rh[e] = t, e = 0; e < t.length; e++) _h.add(t[e]);
  }
  var ta = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Jg = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    jh = {},
    Nh = {};
  function Wg(e) {
    return H.call(Nh, e)
      ? !0
      : H.call(jh, e)
      ? !1
      : Jg.test(e)
      ? (Nh[e] = !0)
      : ((jh[e] = !0), !1);
  }
  function Mr(e, t, a) {
    if (Wg(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var s = t.toLowerCase().slice(0, 5);
            if (s !== "data-" && s !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + a);
      }
  }
  function Ur(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + a);
    }
  }
  function na(e, t, a, s) {
    if (s === null) e.removeAttribute(a);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, "" + s);
    }
  }
  function fn(e) {
    switch (typeof e) {
      case "bigint":
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
  function Ah(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function Ig(e) {
    var t = Ah(e) ? "checked" : "value",
      a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      s = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var u = a.get,
        o = a.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (g) {
            (s = "" + g), o.call(this, g);
          },
        }),
        Object.defineProperty(e, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return s;
          },
          setValue: function (g) {
            s = "" + g;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function zr(e) {
    e._valueTracker || (e._valueTracker = Ig(e));
  }
  function Th(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      s = "";
    return (
      e && (s = Ah(e) ? (e.checked ? "true" : "false") : e.value),
      (e = s),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function Lr(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var ev = /[\n"\\]/g;
  function dn(e) {
    return e.replace(ev, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function Dc(e, t, a, s, u, o, g, x) {
    (e.name = ""),
      g != null &&
      typeof g != "function" &&
      typeof g != "symbol" &&
      typeof g != "boolean"
        ? (e.type = g)
        : e.removeAttribute("type"),
      t != null
        ? g === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + fn(t))
          : e.value !== "" + fn(t) && (e.value = "" + fn(t))
        : (g !== "submit" && g !== "reset") || e.removeAttribute("value"),
      t != null
        ? Mc(e, g, fn(t))
        : a != null
        ? Mc(e, g, fn(a))
        : s != null && e.removeAttribute("value"),
      u == null && o != null && (e.defaultChecked = !!o),
      u != null &&
        (e.checked = u && typeof u != "function" && typeof u != "symbol"),
      x != null &&
      typeof x != "function" &&
      typeof x != "symbol" &&
      typeof x != "boolean"
        ? (e.name = "" + fn(x))
        : e.removeAttribute("name");
  }
  function Ch(e, t, a, s, u, o, g, x) {
    if (
      (o != null &&
        typeof o != "function" &&
        typeof o != "symbol" &&
        typeof o != "boolean" &&
        (e.type = o),
      t != null || a != null)
    ) {
      if (!((o !== "submit" && o !== "reset") || t != null)) return;
      (a = a != null ? "" + fn(a) : ""),
        (t = t != null ? "" + fn(t) : a),
        x || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (s = s ?? u),
      (s = typeof s != "function" && typeof s != "symbol" && !!s),
      (e.checked = x ? e.checked : !!s),
      (e.defaultChecked = !!s),
      g != null &&
        typeof g != "function" &&
        typeof g != "symbol" &&
        typeof g != "boolean" &&
        (e.name = g);
  }
  function Mc(e, t, a) {
    (t === "number" && Lr(e.ownerDocument) === e) ||
      e.defaultValue === "" + a ||
      (e.defaultValue = "" + a);
  }
  function ns(e, t, a, s) {
    if (((e = e.options), t)) {
      t = {};
      for (var u = 0; u < a.length; u++) t["$" + a[u]] = !0;
      for (a = 0; a < e.length; a++)
        (u = t.hasOwnProperty("$" + e[a].value)),
          e[a].selected !== u && (e[a].selected = u),
          u && s && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + fn(a), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === a) {
          (e[u].selected = !0), s && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Oh(e, t, a) {
    if (
      t != null &&
      ((t = "" + fn(t)), t !== e.value && (e.value = t), a == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + fn(a) : "";
  }
  function Dh(e, t, a, s) {
    if (t == null) {
      if (s != null) {
        if (a != null) throw Error(r(92));
        if (pe(s)) {
          if (1 < s.length) throw Error(r(93));
          s = s[0];
        }
        a = s;
      }
      a == null && (a = ""), (t = a);
    }
    (a = fn(t)),
      (e.defaultValue = a),
      (s = e.textContent),
      s === a && s !== "" && s !== null && (e.value = s);
  }
  function as(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var tv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Mh(e, t, a) {
    var s = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? s
        ? e.setProperty(t, "")
        : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
      : s
      ? e.setProperty(t, a)
      : typeof a != "number" || a === 0 || tv.has(t)
      ? t === "float"
        ? (e.cssFloat = a)
        : (e[t] = ("" + a).trim())
      : (e[t] = a + "px");
  }
  function Uh(e, t, a) {
    if (t != null && typeof t != "object") throw Error(r(62));
    if (((e = e.style), a != null)) {
      for (var s in a)
        !a.hasOwnProperty(s) ||
          (t != null && t.hasOwnProperty(s)) ||
          (s.indexOf("--") === 0
            ? e.setProperty(s, "")
            : s === "float"
            ? (e.cssFloat = "")
            : (e[s] = ""));
      for (var u in t)
        (s = t[u]), t.hasOwnProperty(u) && a[u] !== s && Mh(e, u, s);
    } else for (var o in t) t.hasOwnProperty(o) && Mh(e, o, t[o]);
  }
  function Uc(e) {
    if (e.indexOf("-") === -1) return !1;
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
  var nv = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    av =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Hr(e) {
    return av.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var zc = null;
  function Lc(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var ls = null,
    ss = null;
  function zh(e) {
    var t = Il(e);
    if (t && (e = t.stateNode)) {
      var a = e[Yt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (Dc(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ),
            (t = a.name),
            a.type === "radio" && t != null)
          ) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + dn("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < a.length;
              t++
            ) {
              var s = a[t];
              if (s !== e && s.form === e.form) {
                var u = s[Yt] || null;
                if (!u) throw Error(r(90));
                Dc(
                  s,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              (s = a[t]), s.form === e.form && Th(s);
          }
          break e;
        case "textarea":
          Oh(e, a.value, a.defaultValue);
          break e;
        case "select":
          (t = a.value), t != null && ns(e, !!a.multiple, t, !1);
      }
    }
  }
  var Hc = !1;
  function Lh(e, t, a) {
    if (Hc) return e(t, a);
    Hc = !0;
    try {
      var s = e(t);
      return s;
    } finally {
      if (
        ((Hc = !1),
        (ls !== null || ss !== null) &&
          (xu(), ls && ((t = ls), (e = ss), (ss = ls = null), zh(t), e)))
      )
        for (t = 0; t < e.length; t++) zh(e[t]);
    }
  }
  function fi(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var s = a[Yt] || null;
    if (s === null) return null;
    a = s[t];
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
        (s = !s.disabled) ||
          ((e = e.type),
          (s = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !s);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != "function") throw Error(r(231, t, typeof a));
    return a;
  }
  var Bc = !1;
  if (ta)
    try {
      var di = {};
      Object.defineProperty(di, "passive", {
        get: function () {
          Bc = !0;
        },
      }),
        window.addEventListener("test", di, di),
        window.removeEventListener("test", di, di);
    } catch {
      Bc = !1;
    }
  var Ta = null,
    Vc = null,
    Br = null;
  function Hh() {
    if (Br) return Br;
    var e,
      t = Vc,
      a = t.length,
      s,
      u = "value" in Ta ? Ta.value : Ta.textContent,
      o = u.length;
    for (e = 0; e < a && t[e] === u[e]; e++);
    var g = a - e;
    for (s = 1; s <= g && t[a - s] === u[o - s]; s++);
    return (Br = u.slice(e, 1 < s ? 1 - s : void 0));
  }
  function Vr(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function qr() {
    return !0;
  }
  function Bh() {
    return !1;
  }
  function Gt(e) {
    function t(a, s, u, o, g) {
      (this._reactName = a),
        (this._targetInst = u),
        (this.type = s),
        (this.nativeEvent = o),
        (this.target = g),
        (this.currentTarget = null);
      for (var x in e)
        e.hasOwnProperty(x) && ((a = e[x]), (this[x] = a ? a(o) : o[x]));
      return (
        (this.isDefaultPrevented = (
          o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
        )
          ? qr
          : Bh),
        (this.isPropagationStopped = Bh),
        this
      );
    }
    return (
      le(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = qr));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = qr));
        },
        persist: function () {},
        isPersistent: qr,
      }),
      t
    );
  }
  var gl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    kr = Gt(gl),
    hi = le({}, gl, { view: 0, detail: 0 }),
    lv = Gt(hi),
    qc,
    kc,
    mi,
    Fr = le({}, hi, {
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
      getModifierState: Qc,
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
          : (e !== mi &&
              (mi && e.type === "mousemove"
                ? ((qc = e.screenX - mi.screenX), (kc = e.screenY - mi.screenY))
                : (kc = qc = 0),
              (mi = e)),
            qc);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : kc;
      },
    }),
    Vh = Gt(Fr),
    sv = le({}, Fr, { dataTransfer: 0 }),
    iv = Gt(sv),
    rv = le({}, hi, { relatedTarget: 0 }),
    Fc = Gt(rv),
    uv = le({}, gl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    cv = Gt(uv),
    ov = le({}, gl, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    fv = Gt(ov),
    dv = le({}, gl, { data: 0 }),
    qh = Gt(dv),
    hv = {
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
    mv = {
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
    pv = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function yv(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = pv[e])
      ? !!t[e]
      : !1;
  }
  function Qc() {
    return yv;
  }
  var gv = le({}, hi, {
      key: function (e) {
        if (e.key) {
          var t = hv[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Vr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
          ? mv[e.keyCode] || "Unidentified"
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
      getModifierState: Qc,
      charCode: function (e) {
        return e.type === "keypress" ? Vr(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Vr(e)
          : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
      },
    }),
    vv = Gt(gv),
    bv = le({}, Fr, {
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
    kh = Gt(bv),
    xv = le({}, hi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Qc,
    }),
    Sv = Gt(xv),
    wv = le({}, gl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ev = Gt(wv),
    _v = le({}, Fr, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
          ? -e.wheelDeltaX
          : 0;
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
    Rv = Gt(_v),
    jv = le({}, gl, { newState: 0, oldState: 0 }),
    Nv = Gt(jv),
    Av = [9, 13, 27, 32],
    Pc = ta && "CompositionEvent" in window,
    pi = null;
  ta && "documentMode" in document && (pi = document.documentMode);
  var Tv = ta && "TextEvent" in window && !pi,
    Fh = ta && (!Pc || (pi && 8 < pi && 11 >= pi)),
    Qh = " ",
    Ph = !1;
  function Yh(e, t) {
    switch (e) {
      case "keyup":
        return Av.indexOf(t.keyCode) !== -1;
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
  function Gh(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var is = !1;
  function Cv(e, t) {
    switch (e) {
      case "compositionend":
        return Gh(t);
      case "keypress":
        return t.which !== 32 ? null : ((Ph = !0), Qh);
      case "textInput":
        return (e = t.data), e === Qh && Ph ? null : e;
      default:
        return null;
    }
  }
  function Ov(e, t) {
    if (is)
      return e === "compositionend" || (!Pc && Yh(e, t))
        ? ((e = Hh()), (Br = Vc = Ta = null), (is = !1), e)
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
        return Fh && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Dv = {
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
  function Xh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Dv[e.type] : t === "textarea";
  }
  function Zh(e, t, a, s) {
    ls ? (ss ? ss.push(s) : (ss = [s])) : (ls = s),
      (t = Ru(t, "onChange")),
      0 < t.length &&
        ((a = new kr("onChange", "change", null, a, s)),
        e.push({ event: a, listeners: t }));
  }
  var yi = null,
    gi = null;
  function Mv(e) {
    xp(e, 0);
  }
  function Qr(e) {
    var t = oi(e);
    if (Th(t)) return e;
  }
  function Kh(e, t) {
    if (e === "change") return t;
  }
  var $h = !1;
  if (ta) {
    var Yc;
    if (ta) {
      var Gc = "oninput" in document;
      if (!Gc) {
        var Jh = document.createElement("div");
        Jh.setAttribute("oninput", "return;"),
          (Gc = typeof Jh.oninput == "function");
      }
      Yc = Gc;
    } else Yc = !1;
    $h = Yc && (!document.documentMode || 9 < document.documentMode);
  }
  function Wh() {
    yi && (yi.detachEvent("onpropertychange", Ih), (gi = yi = null));
  }
  function Ih(e) {
    if (e.propertyName === "value" && Qr(gi)) {
      var t = [];
      Zh(t, gi, e, Lc(e)), Lh(Mv, t);
    }
  }
  function Uv(e, t, a) {
    e === "focusin"
      ? (Wh(), (yi = t), (gi = a), yi.attachEvent("onpropertychange", Ih))
      : e === "focusout" && Wh();
  }
  function zv(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Qr(gi);
  }
  function Lv(e, t) {
    if (e === "click") return Qr(t);
  }
  function Hv(e, t) {
    if (e === "input" || e === "change") return Qr(t);
  }
  function Bv(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var ln = typeof Object.is == "function" ? Object.is : Bv;
  function vi(e, t) {
    if (ln(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var a = Object.keys(e),
      s = Object.keys(t);
    if (a.length !== s.length) return !1;
    for (s = 0; s < a.length; s++) {
      var u = a[s];
      if (!H.call(t, u) || !ln(e[u], t[u])) return !1;
    }
    return !0;
  }
  function em(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function tm(e, t) {
    var a = em(e);
    e = 0;
    for (var s; a; ) {
      if (a.nodeType === 3) {
        if (((s = e + a.textContent.length), e <= t && s >= t))
          return { node: a, offset: t - e };
        e = s;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = em(a);
    }
  }
  function nm(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? nm(e, t.parentNode)
        : "contains" in e
        ? e.contains(t)
        : e.compareDocumentPosition
        ? !!(e.compareDocumentPosition(t) & 16)
        : !1
      : !1;
  }
  function am(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Lr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Lr(e.document);
    }
    return t;
  }
  function Xc(e) {
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
  function Vv(e, t) {
    var a = am(t);
    t = e.focusedElem;
    var s = e.selectionRange;
    if (
      a !== t &&
      t &&
      t.ownerDocument &&
      nm(t.ownerDocument.documentElement, t)
    ) {
      if (s !== null && Xc(t)) {
        if (
          ((e = s.start),
          (a = s.end),
          a === void 0 && (a = e),
          "selectionStart" in t)
        )
          (t.selectionStart = e),
            (t.selectionEnd = Math.min(a, t.value.length));
        else if (
          ((a = ((e = t.ownerDocument || document) && e.defaultView) || window),
          a.getSelection)
        ) {
          a = a.getSelection();
          var u = t.textContent.length,
            o = Math.min(s.start, u);
          (s = s.end === void 0 ? o : Math.min(s.end, u)),
            !a.extend && o > s && ((u = s), (s = o), (o = u)),
            (u = tm(t, o));
          var g = tm(t, s);
          u &&
            g &&
            (a.rangeCount !== 1 ||
              a.anchorNode !== u.node ||
              a.anchorOffset !== u.offset ||
              a.focusNode !== g.node ||
              a.focusOffset !== g.offset) &&
            ((e = e.createRange()),
            e.setStart(u.node, u.offset),
            a.removeAllRanges(),
            o > s
              ? (a.addRange(e), a.extend(g.node, g.offset))
              : (e.setEnd(g.node, g.offset), a.addRange(e)));
        }
      }
      for (e = [], a = t; (a = a.parentNode); )
        a.nodeType === 1 &&
          e.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
      for (typeof t.focus == "function" && t.focus(), t = 0; t < e.length; t++)
        (a = e[t]),
          (a.element.scrollLeft = a.left),
          (a.element.scrollTop = a.top);
    }
  }
  var qv = ta && "documentMode" in document && 11 >= document.documentMode,
    rs = null,
    Zc = null,
    bi = null,
    Kc = !1;
  function lm(e, t, a) {
    var s =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Kc ||
      rs == null ||
      rs !== Lr(s) ||
      ((s = rs),
      "selectionStart" in s && Xc(s)
        ? (s = { start: s.selectionStart, end: s.selectionEnd })
        : ((s = (
            (s.ownerDocument && s.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (s = {
            anchorNode: s.anchorNode,
            anchorOffset: s.anchorOffset,
            focusNode: s.focusNode,
            focusOffset: s.focusOffset,
          })),
      (bi && vi(bi, s)) ||
        ((bi = s),
        (s = Ru(Zc, "onSelect")),
        0 < s.length &&
          ((t = new kr("onSelect", "select", null, t, a)),
          e.push({ event: t, listeners: s }),
          (t.target = rs))));
  }
  function vl(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a["Webkit" + e] = "webkit" + t),
      (a["Moz" + e] = "moz" + t),
      a
    );
  }
  var us = {
      animationend: vl("Animation", "AnimationEnd"),
      animationiteration: vl("Animation", "AnimationIteration"),
      animationstart: vl("Animation", "AnimationStart"),
      transitionrun: vl("Transition", "TransitionRun"),
      transitionstart: vl("Transition", "TransitionStart"),
      transitioncancel: vl("Transition", "TransitionCancel"),
      transitionend: vl("Transition", "TransitionEnd"),
    },
    $c = {},
    sm = {};
  ta &&
    ((sm = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete us.animationend.animation,
      delete us.animationiteration.animation,
      delete us.animationstart.animation),
    "TransitionEvent" in window || delete us.transitionend.transition);
  function bl(e) {
    if ($c[e]) return $c[e];
    if (!us[e]) return e;
    var t = us[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in sm) return ($c[e] = t[a]);
    return e;
  }
  var im = bl("animationend"),
    rm = bl("animationiteration"),
    um = bl("animationstart"),
    kv = bl("transitionrun"),
    Fv = bl("transitionstart"),
    Qv = bl("transitioncancel"),
    cm = bl("transitionend"),
    om = new Map(),
    fm =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
        " "
      );
  function Cn(e, t) {
    om.set(e, t), yl(t, [e]);
  }
  var hn = [],
    cs = 0,
    Jc = 0;
  function Pr() {
    for (var e = cs, t = (Jc = cs = 0); t < e; ) {
      var a = hn[t];
      hn[t++] = null;
      var s = hn[t];
      hn[t++] = null;
      var u = hn[t];
      hn[t++] = null;
      var o = hn[t];
      if (((hn[t++] = null), s !== null && u !== null)) {
        var g = s.pending;
        g === null ? (u.next = u) : ((u.next = g.next), (g.next = u)),
          (s.pending = u);
      }
      o !== 0 && dm(a, u, o);
    }
  }
  function Yr(e, t, a, s) {
    (hn[cs++] = e),
      (hn[cs++] = t),
      (hn[cs++] = a),
      (hn[cs++] = s),
      (Jc |= s),
      (e.lanes |= s),
      (e = e.alternate),
      e !== null && (e.lanes |= s);
  }
  function Wc(e, t, a, s) {
    return Yr(e, t, a, s), Gr(e);
  }
  function Ca(e, t) {
    return Yr(e, null, null, t), Gr(e);
  }
  function dm(e, t, a) {
    e.lanes |= a;
    var s = e.alternate;
    s !== null && (s.lanes |= a);
    for (var u = !1, o = e.return; o !== null; )
      (o.childLanes |= a),
        (s = o.alternate),
        s !== null && (s.childLanes |= a),
        o.tag === 22 &&
          ((e = o.stateNode), e === null || e._visibility & 1 || (u = !0)),
        (e = o),
        (o = o.return);
    u &&
      t !== null &&
      e.tag === 3 &&
      ((o = e.stateNode),
      (u = 31 - an(a)),
      (o = o.hiddenUpdates),
      (e = o[u]),
      e === null ? (o[u] = [t]) : e.push(t),
      (t.lane = a | 536870912));
  }
  function Gr(e) {
    if (50 < Pi) throw ((Pi = 0), (sf = null), Error(r(185)));
    for (var t = e.return; t !== null; ) (e = t), (t = e.return);
    return e.tag === 3 ? e.stateNode : null;
  }
  var os = {},
    hm = new WeakMap();
  function mn(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = hm.get(e);
      return a !== void 0
        ? a
        : ((t = { value: e, source: t, stack: oe(t) }), hm.set(e, t), t);
    }
    return { value: e, source: t, stack: oe(t) };
  }
  var fs = [],
    ds = 0,
    Xr = null,
    Zr = 0,
    pn = [],
    yn = 0,
    xl = null,
    aa = 1,
    la = "";
  function Sl(e, t) {
    (fs[ds++] = Zr), (fs[ds++] = Xr), (Xr = e), (Zr = t);
  }
  function mm(e, t, a) {
    (pn[yn++] = aa), (pn[yn++] = la), (pn[yn++] = xl), (xl = e);
    var s = aa;
    e = la;
    var u = 32 - an(s) - 1;
    (s &= ~(1 << u)), (a += 1);
    var o = 32 - an(t) + u;
    if (30 < o) {
      var g = u - (u % 5);
      (o = (s & ((1 << g) - 1)).toString(32)),
        (s >>= g),
        (u -= g),
        (aa = (1 << (32 - an(t) + u)) | (a << u) | s),
        (la = o + e);
    } else (aa = (1 << o) | (a << u) | s), (la = e);
  }
  function Ic(e) {
    e.return !== null && (Sl(e, 1), mm(e, 1, 0));
  }
  function eo(e) {
    for (; e === Xr; )
      (Xr = fs[--ds]), (fs[ds] = null), (Zr = fs[--ds]), (fs[ds] = null);
    for (; e === xl; )
      (xl = pn[--yn]),
        (pn[yn] = null),
        (la = pn[--yn]),
        (pn[yn] = null),
        (aa = pn[--yn]),
        (pn[yn] = null);
  }
  var Bt = null,
    At = null,
    Be = !1,
    On = null,
    Fn = !1,
    to = Error(r(519));
  function wl(e) {
    var t = Error(r(418, ""));
    throw (wi(mn(t, e)), to);
  }
  function pm(e) {
    var t = e.stateNode,
      a = e.type,
      s = e.memoizedProps;
    switch (((t[Dt] = e), (t[Yt] = s), a)) {
      case "dialog":
        Oe("cancel", t), Oe("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Oe("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Gi.length; a++) Oe(Gi[a], t);
        break;
      case "source":
        Oe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Oe("error", t), Oe("load", t);
        break;
      case "details":
        Oe("toggle", t);
        break;
      case "input":
        Oe("invalid", t),
          Ch(
            t,
            s.value,
            s.defaultValue,
            s.checked,
            s.defaultChecked,
            s.type,
            s.name,
            !0
          ),
          zr(t);
        break;
      case "select":
        Oe("invalid", t);
        break;
      case "textarea":
        Oe("invalid", t), Dh(t, s.value, s.defaultValue, s.children), zr(t);
    }
    (a = s.children),
      (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
      t.textContent === "" + a ||
      s.suppressHydrationWarning === !0 ||
      _p(t.textContent, a)
        ? (s.popover != null && (Oe("beforetoggle", t), Oe("toggle", t)),
          s.onScroll != null && Oe("scroll", t),
          s.onScrollEnd != null && Oe("scrollend", t),
          s.onClick != null && (t.onclick = ju),
          (t = !0))
        : (t = !1),
      t || wl(e);
  }
  function ym(e) {
    for (Bt = e.return; Bt; )
      switch (Bt.tag) {
        case 3:
        case 27:
          Fn = !0;
          return;
        case 5:
        case 13:
          Fn = !1;
          return;
        default:
          Bt = Bt.return;
      }
  }
  function xi(e) {
    if (e !== Bt) return !1;
    if (!Be) return ym(e), (Be = !0), !1;
    var t = !1,
      a;
    if (
      ((a = e.tag !== 3 && e.tag !== 27) &&
        ((a = e.tag === 5) &&
          ((a = e.type),
          (a =
            !(a !== "form" && a !== "button") || Ef(e.type, e.memoizedProps))),
        (a = !a)),
      a && (t = !0),
      t && At && wl(e),
      ym(e),
      e.tag === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(r(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((a = e.data), a === "/$")) {
              if (t === 0) {
                At = Mn(e.nextSibling);
                break e;
              }
              t--;
            } else (a !== "$" && a !== "$!" && a !== "$?") || t++;
          e = e.nextSibling;
        }
        At = null;
      }
    } else At = Bt ? Mn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Si() {
    (At = Bt = null), (Be = !1);
  }
  function wi(e) {
    On === null ? (On = [e]) : On.push(e);
  }
  var Ei = Error(r(460)),
    gm = Error(r(474)),
    no = { then: function () {} };
  function vm(e) {
    return (e = e.status), e === "fulfilled" || e === "rejected";
  }
  function Kr() {}
  function bm(e, t, a) {
    switch (
      ((a = e[a]),
      a === void 0 ? e.push(t) : a !== t && (t.then(Kr, Kr), (t = a)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), e === Ei ? Error(r(483)) : e);
      default:
        if (typeof t.status == "string") t.then(Kr, Kr);
        else {
          if (((e = Xe), e !== null && 100 < e.shellSuspendCounter))
            throw Error(r(482));
          (e = t),
            (e.status = "pending"),
            e.then(
              function (s) {
                if (t.status === "pending") {
                  var u = t;
                  (u.status = "fulfilled"), (u.value = s);
                }
              },
              function (s) {
                if (t.status === "pending") {
                  var u = t;
                  (u.status = "rejected"), (u.reason = s);
                }
              }
            );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), e === Ei ? Error(r(483)) : e);
        }
        throw ((_i = t), Ei);
    }
  }
  var _i = null;
  function xm() {
    if (_i === null) throw Error(r(459));
    var e = _i;
    return (_i = null), e;
  }
  var hs = null,
    Ri = 0;
  function $r(e) {
    var t = Ri;
    return (Ri += 1), hs === null && (hs = []), bm(hs, e, t);
  }
  function ji(e, t) {
    (t = t.props.ref), (e.ref = t !== void 0 ? t : null);
  }
  function Jr(e, t) {
    throw t.$$typeof === f
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function Sm(e) {
    var t = e._init;
    return t(e._payload);
  }
  function wm(e) {
    function t(M, C) {
      if (e) {
        var z = M.deletions;
        z === null ? ((M.deletions = [C]), (M.flags |= 16)) : z.push(C);
      }
    }
    function a(M, C) {
      if (!e) return null;
      for (; C !== null; ) t(M, C), (C = C.sibling);
      return null;
    }
    function s(M) {
      for (var C = new Map(); M !== null; )
        M.key !== null ? C.set(M.key, M) : C.set(M.index, M), (M = M.sibling);
      return C;
    }
    function u(M, C) {
      return (M = Fa(M, C)), (M.index = 0), (M.sibling = null), M;
    }
    function o(M, C, z) {
      return (
        (M.index = z),
        e
          ? ((z = M.alternate),
            z !== null
              ? ((z = z.index), z < C ? ((M.flags |= 33554434), C) : z)
              : ((M.flags |= 33554434), C))
          : ((M.flags |= 1048576), C)
      );
    }
    function g(M) {
      return e && M.alternate === null && (M.flags |= 33554434), M;
    }
    function x(M, C, z, P) {
      return C === null || C.tag !== 6
        ? ((C = Jo(z, M.mode, P)), (C.return = M), C)
        : ((C = u(C, z)), (C.return = M), C);
    }
    function S(M, C, z, P) {
      var se = z.type;
      return se === p
        ? Q(M, C, z.props.children, P, z.key)
        : C !== null &&
          (C.elementType === se ||
            (typeof se == "object" &&
              se !== null &&
              se.$$typeof === L &&
              Sm(se) === C.type))
        ? ((C = u(C, z.props)), ji(C, z), (C.return = M), C)
        : ((C = pu(z.type, z.key, z.props, null, M.mode, P)),
          ji(C, z),
          (C.return = M),
          C);
    }
    function O(M, C, z, P) {
      return C === null ||
        C.tag !== 4 ||
        C.stateNode.containerInfo !== z.containerInfo ||
        C.stateNode.implementation !== z.implementation
        ? ((C = Wo(z, M.mode, P)), (C.return = M), C)
        : ((C = u(C, z.children || [])), (C.return = M), C);
    }
    function Q(M, C, z, P, se) {
      return C === null || C.tag !== 7
        ? ((C = Dl(z, M.mode, P, se)), (C.return = M), C)
        : ((C = u(C, z)), (C.return = M), C);
    }
    function X(M, C, z) {
      if (
        (typeof C == "string" && C !== "") ||
        typeof C == "number" ||
        typeof C == "bigint"
      )
        return (C = Jo("" + C, M.mode, z)), (C.return = M), C;
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case d:
            return (
              (z = pu(C.type, C.key, C.props, null, M.mode, z)),
              ji(z, C),
              (z.return = M),
              z
            );
          case y:
            return (C = Wo(C, M.mode, z)), (C.return = M), C;
          case L:
            var P = C._init;
            return (C = P(C._payload)), X(M, C, z);
        }
        if (pe(C) || te(C))
          return (C = Dl(C, M.mode, z, null)), (C.return = M), C;
        if (typeof C.then == "function") return X(M, $r(C), z);
        if (C.$$typeof === j) return X(M, du(M, C), z);
        Jr(M, C);
      }
      return null;
    }
    function B(M, C, z, P) {
      var se = C !== null ? C.key : null;
      if (
        (typeof z == "string" && z !== "") ||
        typeof z == "number" ||
        typeof z == "bigint"
      )
        return se !== null ? null : x(M, C, "" + z, P);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case d:
            return z.key === se ? S(M, C, z, P) : null;
          case y:
            return z.key === se ? O(M, C, z, P) : null;
          case L:
            return (se = z._init), (z = se(z._payload)), B(M, C, z, P);
        }
        if (pe(z) || te(z)) return se !== null ? null : Q(M, C, z, P, null);
        if (typeof z.then == "function") return B(M, C, $r(z), P);
        if (z.$$typeof === j) return B(M, C, du(M, z), P);
        Jr(M, z);
      }
      return null;
    }
    function F(M, C, z, P, se) {
      if (
        (typeof P == "string" && P !== "") ||
        typeof P == "number" ||
        typeof P == "bigint"
      )
        return (M = M.get(z) || null), x(C, M, "" + P, se);
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case d:
            return (
              (M = M.get(P.key === null ? z : P.key) || null), S(C, M, P, se)
            );
          case y:
            return (
              (M = M.get(P.key === null ? z : P.key) || null), O(C, M, P, se)
            );
          case L:
            var Ae = P._init;
            return (P = Ae(P._payload)), F(M, C, z, P, se);
        }
        if (pe(P) || te(P)) return (M = M.get(z) || null), Q(C, M, P, se, null);
        if (typeof P.then == "function") return F(M, C, z, $r(P), se);
        if (P.$$typeof === j) return F(M, C, z, du(C, P), se);
        Jr(C, P);
      }
      return null;
    }
    function ce(M, C, z, P) {
      for (
        var se = null, Ae = null, fe = C, ve = (C = 0), jt = null;
        fe !== null && ve < z.length;
        ve++
      ) {
        fe.index > ve ? ((jt = fe), (fe = null)) : (jt = fe.sibling);
        var Ve = B(M, fe, z[ve], P);
        if (Ve === null) {
          fe === null && (fe = jt);
          break;
        }
        e && fe && Ve.alternate === null && t(M, fe),
          (C = o(Ve, C, ve)),
          Ae === null ? (se = Ve) : (Ae.sibling = Ve),
          (Ae = Ve),
          (fe = jt);
      }
      if (ve === z.length) return a(M, fe), Be && Sl(M, ve), se;
      if (fe === null) {
        for (; ve < z.length; ve++)
          (fe = X(M, z[ve], P)),
            fe !== null &&
              ((C = o(fe, C, ve)),
              Ae === null ? (se = fe) : (Ae.sibling = fe),
              (Ae = fe));
        return Be && Sl(M, ve), se;
      }
      for (fe = s(fe); ve < z.length; ve++)
        (jt = F(fe, M, ve, z[ve], P)),
          jt !== null &&
            (e &&
              jt.alternate !== null &&
              fe.delete(jt.key === null ? ve : jt.key),
            (C = o(jt, C, ve)),
            Ae === null ? (se = jt) : (Ae.sibling = jt),
            (Ae = jt));
      return (
        e &&
          fe.forEach(function (Ka) {
            return t(M, Ka);
          }),
        Be && Sl(M, ve),
        se
      );
    }
    function be(M, C, z, P) {
      if (z == null) throw Error(r(151));
      for (
        var se = null,
          Ae = null,
          fe = C,
          ve = (C = 0),
          jt = null,
          Ve = z.next();
        fe !== null && !Ve.done;
        ve++, Ve = z.next()
      ) {
        fe.index > ve ? ((jt = fe), (fe = null)) : (jt = fe.sibling);
        var Ka = B(M, fe, Ve.value, P);
        if (Ka === null) {
          fe === null && (fe = jt);
          break;
        }
        e && fe && Ka.alternate === null && t(M, fe),
          (C = o(Ka, C, ve)),
          Ae === null ? (se = Ka) : (Ae.sibling = Ka),
          (Ae = Ka),
          (fe = jt);
      }
      if (Ve.done) return a(M, fe), Be && Sl(M, ve), se;
      if (fe === null) {
        for (; !Ve.done; ve++, Ve = z.next())
          (Ve = X(M, Ve.value, P)),
            Ve !== null &&
              ((C = o(Ve, C, ve)),
              Ae === null ? (se = Ve) : (Ae.sibling = Ve),
              (Ae = Ve));
        return Be && Sl(M, ve), se;
      }
      for (fe = s(fe); !Ve.done; ve++, Ve = z.next())
        (Ve = F(fe, M, ve, Ve.value, P)),
          Ve !== null &&
            (e &&
              Ve.alternate !== null &&
              fe.delete(Ve.key === null ? ve : Ve.key),
            (C = o(Ve, C, ve)),
            Ae === null ? (se = Ve) : (Ae.sibling = Ve),
            (Ae = Ve));
      return (
        e &&
          fe.forEach(function (ab) {
            return t(M, ab);
          }),
        Be && Sl(M, ve),
        se
      );
    }
    function nt(M, C, z, P) {
      if (
        (typeof z == "object" &&
          z !== null &&
          z.type === p &&
          z.key === null &&
          (z = z.props.children),
        typeof z == "object" && z !== null)
      ) {
        switch (z.$$typeof) {
          case d:
            e: {
              for (var se = z.key; C !== null; ) {
                if (C.key === se) {
                  if (((se = z.type), se === p)) {
                    if (C.tag === 7) {
                      a(M, C.sibling),
                        (P = u(C, z.props.children)),
                        (P.return = M),
                        (M = P);
                      break e;
                    }
                  } else if (
                    C.elementType === se ||
                    (typeof se == "object" &&
                      se !== null &&
                      se.$$typeof === L &&
                      Sm(se) === C.type)
                  ) {
                    a(M, C.sibling),
                      (P = u(C, z.props)),
                      ji(P, z),
                      (P.return = M),
                      (M = P);
                    break e;
                  }
                  a(M, C);
                  break;
                } else t(M, C);
                C = C.sibling;
              }
              z.type === p
                ? ((P = Dl(z.props.children, M.mode, P, z.key)),
                  (P.return = M),
                  (M = P))
                : ((P = pu(z.type, z.key, z.props, null, M.mode, P)),
                  ji(P, z),
                  (P.return = M),
                  (M = P));
            }
            return g(M);
          case y:
            e: {
              for (se = z.key; C !== null; ) {
                if (C.key === se)
                  if (
                    C.tag === 4 &&
                    C.stateNode.containerInfo === z.containerInfo &&
                    C.stateNode.implementation === z.implementation
                  ) {
                    a(M, C.sibling),
                      (P = u(C, z.children || [])),
                      (P.return = M),
                      (M = P);
                    break e;
                  } else {
                    a(M, C);
                    break;
                  }
                else t(M, C);
                C = C.sibling;
              }
              (P = Wo(z, M.mode, P)), (P.return = M), (M = P);
            }
            return g(M);
          case L:
            return (se = z._init), (z = se(z._payload)), nt(M, C, z, P);
        }
        if (pe(z)) return ce(M, C, z, P);
        if (te(z)) {
          if (((se = te(z)), typeof se != "function")) throw Error(r(150));
          return (z = se.call(z)), be(M, C, z, P);
        }
        if (typeof z.then == "function") return nt(M, C, $r(z), P);
        if (z.$$typeof === j) return nt(M, C, du(M, z), P);
        Jr(M, z);
      }
      return (typeof z == "string" && z !== "") ||
        typeof z == "number" ||
        typeof z == "bigint"
        ? ((z = "" + z),
          C !== null && C.tag === 6
            ? (a(M, C.sibling), (P = u(C, z)), (P.return = M), (M = P))
            : (a(M, C), (P = Jo(z, M.mode, P)), (P.return = M), (M = P)),
          g(M))
        : a(M, C);
    }
    return function (M, C, z, P) {
      try {
        Ri = 0;
        var se = nt(M, C, z, P);
        return (hs = null), se;
      } catch (fe) {
        if (fe === Ei) throw fe;
        var Ae = xn(29, fe, null, M.mode);
        return (Ae.lanes = P), (Ae.return = M), Ae;
      } finally {
      }
    };
  }
  var El = wm(!0),
    Em = wm(!1),
    ms = Me(null),
    Wr = Me(0);
  function _m(e, t) {
    (e = pa), Ge(Wr, e), Ge(ms, t), (pa = e | t.baseLanes);
  }
  function ao() {
    Ge(Wr, pa), Ge(ms, ms.current);
  }
  function lo() {
    (pa = Wr.current), Je(ms), Je(Wr);
  }
  var gn = Me(null),
    Qn = null;
  function Oa(e) {
    var t = e.alternate;
    Ge(vt, vt.current & 1),
      Ge(gn, e),
      Qn === null &&
        (t === null || ms.current !== null || t.memoizedState !== null) &&
        (Qn = e);
  }
  function Rm(e) {
    if (e.tag === 22) {
      if ((Ge(vt, vt.current), Ge(gn, e), Qn === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (Qn = e);
      }
    } else Da();
  }
  function Da() {
    Ge(vt, vt.current), Ge(gn, gn.current);
  }
  function sa(e) {
    Je(gn), Qn === e && (Qn = null), Je(vt);
  }
  var vt = Me(0);
  function Ir(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (
          a !== null &&
          ((a = a.dehydrated), a === null || a.data === "$?" || a.data === "$!")
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
  var Pv =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, s) {
                  e.push(s);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                e.forEach(function (a) {
                  return a();
                });
            };
          },
    Yv = n.unstable_scheduleCallback,
    Gv = n.unstable_NormalPriority,
    bt = {
      $$typeof: j,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function so() {
    return { controller: new Pv(), data: new Map(), refCount: 0 };
  }
  function Ni(e) {
    e.refCount--,
      e.refCount === 0 &&
        Yv(Gv, function () {
          e.controller.abort();
        });
  }
  var Ai = null,
    io = 0,
    ps = 0,
    ys = null;
  function Xv(e, t) {
    if (Ai === null) {
      var a = (Ai = []);
      (io = 0),
        (ps = mf()),
        (ys = {
          status: "pending",
          value: void 0,
          then: function (s) {
            a.push(s);
          },
        });
    }
    return io++, t.then(jm, jm), t;
  }
  function jm() {
    if (--io === 0 && Ai !== null) {
      ys !== null && (ys.status = "fulfilled");
      var e = Ai;
      (Ai = null), (ps = 0), (ys = null);
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Zv(e, t) {
    var a = [],
      s = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          a.push(u);
        },
      };
    return (
      e.then(
        function () {
          (s.status = "fulfilled"), (s.value = t);
          for (var u = 0; u < a.length; u++) (0, a[u])(t);
        },
        function (u) {
          for (s.status = "rejected", s.reason = u, u = 0; u < a.length; u++)
            (0, a[u])(void 0);
        }
      ),
      s
    );
  }
  var Nm = G.S;
  G.S = function (e, t) {
    typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      Xv(e, t),
      Nm !== null && Nm(e, t);
  };
  var _l = Me(null);
  function ro() {
    var e = _l.current;
    return e !== null ? e : Xe.pooledCache;
  }
  function eu(e, t) {
    t === null ? Ge(_l, _l.current) : Ge(_l, t.pool);
  }
  function Am() {
    var e = ro();
    return e === null ? null : { parent: bt._currentValue, pool: e };
  }
  var Ma = 0,
    Ne = null,
    Fe = null,
    dt = null,
    tu = !1,
    gs = !1,
    Rl = !1,
    nu = 0,
    Ti = 0,
    vs = null,
    Kv = 0;
  function ut() {
    throw Error(r(321));
  }
  function uo(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!ln(e[a], t[a])) return !1;
    return !0;
  }
  function co(e, t, a, s, u, o) {
    return (
      (Ma = o),
      (Ne = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (G.H = e === null || e.memoizedState === null ? jl : Ua),
      (Rl = !1),
      (o = a(s, u)),
      (Rl = !1),
      gs && (o = Cm(t, a, s, u)),
      Tm(e),
      o
    );
  }
  function Tm(e) {
    G.H = Pn;
    var t = Fe !== null && Fe.next !== null;
    if (((Ma = 0), (dt = Fe = Ne = null), (tu = !1), (Ti = 0), (vs = null), t))
      throw Error(r(300));
    e === null ||
      _t ||
      ((e = e.dependencies), e !== null && fu(e) && (_t = !0));
  }
  function Cm(e, t, a, s) {
    Ne = e;
    var u = 0;
    do {
      if ((gs && (vs = null), (Ti = 0), (gs = !1), 25 <= u))
        throw Error(r(301));
      if (((u += 1), (dt = Fe = null), e.updateQueue != null)) {
        var o = e.updateQueue;
        (o.lastEffect = null),
          (o.events = null),
          (o.stores = null),
          o.memoCache != null && (o.memoCache.index = 0);
      }
      (G.H = Nl), (o = t(a, s));
    } while (gs);
    return o;
  }
  function $v() {
    var e = G.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? Ci(t) : t),
      (e = e.useState()[0]),
      (Fe !== null ? Fe.memoizedState : null) !== e && (Ne.flags |= 1024),
      t
    );
  }
  function oo() {
    var e = nu !== 0;
    return (nu = 0), e;
  }
  function fo(e, t, a) {
    (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a);
  }
  function ho(e) {
    if (tu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), (e = e.next);
      }
      tu = !1;
    }
    (Ma = 0), (dt = Fe = Ne = null), (gs = !1), (Ti = nu = 0), (vs = null);
  }
  function Xt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return dt === null ? (Ne.memoizedState = dt = e) : (dt = dt.next = e), dt;
  }
  function ht() {
    if (Fe === null) {
      var e = Ne.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Fe.next;
    var t = dt === null ? Ne.memoizedState : dt.next;
    if (t !== null) (dt = t), (Fe = e);
    else {
      if (e === null)
        throw Ne.alternate === null ? Error(r(467)) : Error(r(310));
      (Fe = e),
        (e = {
          memoizedState: Fe.memoizedState,
          baseState: Fe.baseState,
          baseQueue: Fe.baseQueue,
          queue: Fe.queue,
          next: null,
        }),
        dt === null ? (Ne.memoizedState = dt = e) : (dt = dt.next = e);
    }
    return dt;
  }
  var au;
  au = function () {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  };
  function Ci(e) {
    var t = Ti;
    return (
      (Ti += 1),
      vs === null && (vs = []),
      (e = bm(vs, e, t)),
      (t = Ne),
      (dt === null ? t.memoizedState : dt.next) === null &&
        ((t = t.alternate),
        (G.H = t === null || t.memoizedState === null ? jl : Ua)),
      e
    );
  }
  function lu(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ci(e);
      if (e.$$typeof === j) return Mt(e);
    }
    throw Error(r(438, String(e)));
  }
  function mo(e) {
    var t = null,
      a = Ne.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var s = Ne.alternate;
      s !== null &&
        ((s = s.updateQueue),
        s !== null &&
          ((s = s.memoCache),
          s != null &&
            (t = {
              data: s.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = au()), (Ne.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), s = 0; s < e; s++) a[s] = I;
    return t.index++, a;
  }
  function ia(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function su(e) {
    var t = ht();
    return po(t, Fe, e);
  }
  function po(e, t, a) {
    var s = e.queue;
    if (s === null) throw Error(r(311));
    s.lastRenderedReducer = a;
    var u = e.baseQueue,
      o = s.pending;
    if (o !== null) {
      if (u !== null) {
        var g = u.next;
        (u.next = o.next), (o.next = g);
      }
      (t.baseQueue = u = o), (s.pending = null);
    }
    if (((o = e.baseState), u === null)) e.memoizedState = o;
    else {
      t = u.next;
      var x = (g = null),
        S = null,
        O = t,
        Q = !1;
      do {
        var X = O.lane & -536870913;
        if (X !== O.lane ? (Ue & X) === X : (Ma & X) === X) {
          var B = O.revertLane;
          if (B === 0)
            S !== null &&
              (S = S.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: O.action,
                  hasEagerState: O.hasEagerState,
                  eagerState: O.eagerState,
                  next: null,
                }),
              X === ps && (Q = !0);
          else if ((Ma & B) === B) {
            (O = O.next), B === ps && (Q = !0);
            continue;
          } else
            (X = {
              lane: 0,
              revertLane: O.revertLane,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null,
            }),
              S === null ? ((x = S = X), (g = o)) : (S = S.next = X),
              (Ne.lanes |= B),
              (Qa |= B);
          (X = O.action),
            Rl && a(o, X),
            (o = O.hasEagerState ? O.eagerState : a(o, X));
        } else
          (B = {
            lane: X,
            revertLane: O.revertLane,
            action: O.action,
            hasEagerState: O.hasEagerState,
            eagerState: O.eagerState,
            next: null,
          }),
            S === null ? ((x = S = B), (g = o)) : (S = S.next = B),
            (Ne.lanes |= X),
            (Qa |= X);
        O = O.next;
      } while (O !== null && O !== t);
      if (
        (S === null ? (g = o) : (S.next = x),
        !ln(o, e.memoizedState) && ((_t = !0), Q && ((a = ys), a !== null)))
      )
        throw a;
      (e.memoizedState = o),
        (e.baseState = g),
        (e.baseQueue = S),
        (s.lastRenderedState = o);
    }
    return u === null && (s.lanes = 0), [e.memoizedState, s.dispatch];
  }
  function yo(e) {
    var t = ht(),
      a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var s = a.dispatch,
      u = a.pending,
      o = t.memoizedState;
    if (u !== null) {
      a.pending = null;
      var g = (u = u.next);
      do (o = e(o, g.action)), (g = g.next);
      while (g !== u);
      ln(o, t.memoizedState) || (_t = !0),
        (t.memoizedState = o),
        t.baseQueue === null && (t.baseState = o),
        (a.lastRenderedState = o);
    }
    return [o, s];
  }
  function Om(e, t, a) {
    var s = Ne,
      u = ht(),
      o = Be;
    if (o) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = t();
    var g = !ln((Fe || u).memoizedState, a);
    if (
      (g && ((u.memoizedState = a), (_t = !0)),
      (u = u.queue),
      bo(Um.bind(null, s, u, e), [e]),
      u.getSnapshot !== t || g || (dt !== null && dt.memoizedState.tag & 1))
    ) {
      if (
        ((s.flags |= 2048),
        bs(9, Mm.bind(null, s, u, a, t), { destroy: void 0 }, null),
        Xe === null)
      )
        throw Error(r(349));
      o || Ma & 60 || Dm(s, t, a);
    }
    return a;
  }
  function Dm(e, t, a) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = Ne.updateQueue),
      t === null
        ? ((t = au()), (Ne.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e));
  }
  function Mm(e, t, a, s) {
    (t.value = a), (t.getSnapshot = s), zm(t) && Lm(e);
  }
  function Um(e, t, a) {
    return a(function () {
      zm(t) && Lm(e);
    });
  }
  function zm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !ln(e, a);
    } catch {
      return !0;
    }
  }
  function Lm(e) {
    var t = Ca(e, 2);
    t !== null && Vt(t, e, 2);
  }
  function go(e) {
    var t = Xt();
    if (typeof e == "function") {
      var a = e;
      if (((e = a()), Rl)) {
        Na(!0);
        try {
          a();
        } finally {
          Na(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ia,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Hm(e, t, a, s) {
    return (e.baseState = a), po(e, Fe, typeof s == "function" ? s : ia);
  }
  function Jv(e, t, a, s, u) {
    if (uu(e)) throw Error(r(485));
    if (((e = t.action), e !== null)) {
      var o = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (g) {
          o.listeners.push(g);
        },
      };
      G.T !== null ? a(!0) : (o.isTransition = !1),
        s(o),
        (a = t.pending),
        a === null
          ? ((o.next = t.pending = o), Bm(t, o))
          : ((o.next = a.next), (t.pending = a.next = o));
    }
  }
  function Bm(e, t) {
    var a = t.action,
      s = t.payload,
      u = e.state;
    if (t.isTransition) {
      var o = G.T,
        g = {};
      G.T = g;
      try {
        var x = a(u, s),
          S = G.S;
        S !== null && S(g, x), Vm(e, t, x);
      } catch (O) {
        vo(e, t, O);
      } finally {
        G.T = o;
      }
    } else
      try {
        (o = a(u, s)), Vm(e, t, o);
      } catch (O) {
        vo(e, t, O);
      }
  }
  function Vm(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (s) {
            qm(e, t, s);
          },
          function (s) {
            return vo(e, t, s);
          }
        )
      : qm(e, t, a);
  }
  function qm(e, t, a) {
    (t.status = "fulfilled"),
      (t.value = a),
      km(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next),
        a === t ? (e.pending = null) : ((a = a.next), (t.next = a), Bm(e, a)));
  }
  function vo(e, t, a) {
    var s = e.pending;
    if (((e.pending = null), s !== null)) {
      s = s.next;
      do (t.status = "rejected"), (t.reason = a), km(t), (t = t.next);
      while (t !== s);
    }
    e.action = null;
  }
  function km(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Fm(e, t) {
    return t;
  }
  function Qm(e, t) {
    if (Be) {
      var a = Xe.formState;
      if (a !== null) {
        e: {
          var s = Ne;
          if (Be) {
            if (At) {
              t: {
                for (var u = At, o = Fn; u.nodeType !== 8; ) {
                  if (!o) {
                    u = null;
                    break t;
                  }
                  if (((u = Mn(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                (o = u.data), (u = o === "F!" || o === "F" ? u : null);
              }
              if (u) {
                (At = Mn(u.nextSibling)), (s = u.data === "F!");
                break e;
              }
            }
            wl(s);
          }
          s = !1;
        }
        s && (t = a[0]);
      }
    }
    return (
      (a = Xt()),
      (a.memoizedState = a.baseState = t),
      (s = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Fm,
        lastRenderedState: t,
      }),
      (a.queue = s),
      (a = r0.bind(null, Ne, s)),
      (s.dispatch = a),
      (s = go(!1)),
      (o = _o.bind(null, Ne, !1, s.queue)),
      (s = Xt()),
      (u = { state: t, dispatch: null, action: e, pending: null }),
      (s.queue = u),
      (a = Jv.bind(null, Ne, u, o, a)),
      (u.dispatch = a),
      (s.memoizedState = e),
      [t, a, !1]
    );
  }
  function Pm(e) {
    var t = ht();
    return Ym(t, Fe, e);
  }
  function Ym(e, t, a) {
    (t = po(e, t, Fm)[0]),
      (e = su(ia)[0]),
      (t =
        typeof t == "object" && t !== null && typeof t.then == "function"
          ? Ci(t)
          : t);
    var s = ht(),
      u = s.queue,
      o = u.dispatch;
    return (
      a !== s.memoizedState &&
        ((Ne.flags |= 2048),
        bs(9, Wv.bind(null, u, a), { destroy: void 0 }, null)),
      [t, o, e]
    );
  }
  function Wv(e, t) {
    e.action = t;
  }
  function Gm(e) {
    var t = ht(),
      a = Fe;
    if (a !== null) return Ym(t, a, e);
    ht(), (t = t.memoizedState), (a = ht());
    var s = a.queue.dispatch;
    return (a.memoizedState = e), [t, s, !1];
  }
  function bs(e, t, a, s) {
    return (
      (e = { tag: e, create: t, inst: a, deps: s, next: null }),
      (t = Ne.updateQueue),
      t === null && ((t = au()), (Ne.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((s = a.next), (a.next = e), (e.next = s), (t.lastEffect = e)),
      e
    );
  }
  function Xm() {
    return ht().memoizedState;
  }
  function iu(e, t, a, s) {
    var u = Xt();
    (Ne.flags |= e),
      (u.memoizedState = bs(
        1 | t,
        a,
        { destroy: void 0 },
        s === void 0 ? null : s
      ));
  }
  function ru(e, t, a, s) {
    var u = ht();
    s = s === void 0 ? null : s;
    var o = u.memoizedState.inst;
    Fe !== null && s !== null && uo(s, Fe.memoizedState.deps)
      ? (u.memoizedState = bs(t, a, o, s))
      : ((Ne.flags |= e), (u.memoizedState = bs(1 | t, a, o, s)));
  }
  function Zm(e, t) {
    iu(8390656, 8, e, t);
  }
  function bo(e, t) {
    ru(2048, 8, e, t);
  }
  function Km(e, t) {
    return ru(4, 2, e, t);
  }
  function $m(e, t) {
    return ru(4, 4, e, t);
  }
  function Jm(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function () {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Wm(e, t, a) {
    (a = a != null ? a.concat([e]) : null), ru(4, 4, Jm.bind(null, t, e), a);
  }
  function xo() {}
  function Im(e, t) {
    var a = ht();
    t = t === void 0 ? null : t;
    var s = a.memoizedState;
    return t !== null && uo(t, s[1]) ? s[0] : ((a.memoizedState = [e, t]), e);
  }
  function e0(e, t) {
    var a = ht();
    t = t === void 0 ? null : t;
    var s = a.memoizedState;
    if (t !== null && uo(t, s[1])) return s[0];
    if (((s = e()), Rl)) {
      Na(!0);
      try {
        e();
      } finally {
        Na(!1);
      }
    }
    return (a.memoizedState = [s, t]), s;
  }
  function So(e, t, a) {
    return a === void 0 || Ma & 1073741824
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = np()), (Ne.lanes |= e), (Qa |= e), a);
  }
  function t0(e, t, a, s) {
    return ln(a, t)
      ? a
      : ms.current !== null
      ? ((e = So(e, a, s)), ln(e, t) || (_t = !0), e)
      : Ma & 42
      ? ((e = np()), (Ne.lanes |= e), (Qa |= e), t)
      : ((_t = !0), (e.memoizedState = a));
  }
  function n0(e, t, a, s, u) {
    var o = ae.p;
    ae.p = o !== 0 && 8 > o ? o : 8;
    var g = G.T,
      x = {};
    (G.T = x), _o(e, !1, t, a);
    try {
      var S = u(),
        O = G.S;
      if (
        (O !== null && O(x, S),
        S !== null && typeof S == "object" && typeof S.then == "function")
      ) {
        var Q = Zv(S, s);
        Oi(e, t, Q, cn(e));
      } else Oi(e, t, s, cn(e));
    } catch (X) {
      Oi(e, t, { then: function () {}, status: "rejected", reason: X }, cn());
    } finally {
      (ae.p = o), (G.T = g);
    }
  }
  function Iv() {}
  function wo(e, t, a, s) {
    if (e.tag !== 5) throw Error(r(476));
    var u = a0(e).queue;
    n0(
      e,
      u,
      t,
      Ce,
      a === null
        ? Iv
        : function () {
            return l0(e), a(s);
          }
    );
  }
  function a0(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Ce,
      baseState: Ce,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ia,
        lastRenderedState: Ce,
      },
      next: null,
    };
    var a = {};
    return (
      (t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: ia,
          lastRenderedState: a,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function l0(e) {
    var t = a0(e).next.queue;
    Oi(e, t, {}, cn());
  }
  function Eo() {
    return Mt(Ji);
  }
  function s0() {
    return ht().memoizedState;
  }
  function i0() {
    return ht().memoizedState;
  }
  function e2(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = cn();
          e = Ha(a);
          var s = Ba(t, e, a);
          s !== null && (Vt(s, t, a), Ui(s, t, a)),
            (t = { cache: so() }),
            (e.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function t2(e, t, a) {
    var s = cn();
    (a = {
      lane: s,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      uu(e)
        ? u0(t, a)
        : ((a = Wc(e, t, a, s)), a !== null && (Vt(a, e, s), c0(a, t, s)));
  }
  function r0(e, t, a) {
    var s = cn();
    Oi(e, t, a, s);
  }
  function Oi(e, t, a, s) {
    var u = {
      lane: s,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (uu(e)) u0(t, u);
    else {
      var o = e.alternate;
      if (
        e.lanes === 0 &&
        (o === null || o.lanes === 0) &&
        ((o = t.lastRenderedReducer), o !== null)
      )
        try {
          var g = t.lastRenderedState,
            x = o(g, a);
          if (((u.hasEagerState = !0), (u.eagerState = x), ln(x, g)))
            return Yr(e, t, u, 0), Xe === null && Pr(), !1;
        } catch {
        } finally {
        }
      if (((a = Wc(e, t, u, s)), a !== null))
        return Vt(a, e, s), c0(a, t, s), !0;
    }
    return !1;
  }
  function _o(e, t, a, s) {
    if (
      ((s = {
        lane: 2,
        revertLane: mf(),
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      uu(e))
    ) {
      if (t) throw Error(r(479));
    } else (t = Wc(e, a, s, 2)), t !== null && Vt(t, e, 2);
  }
  function uu(e) {
    var t = e.alternate;
    return e === Ne || (t !== null && t === Ne);
  }
  function u0(e, t) {
    gs = tu = !0;
    var a = e.pending;
    a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
      (e.pending = t);
  }
  function c0(e, t, a) {
    if (a & 4194176) {
      var s = t.lanes;
      (s &= e.pendingLanes), (a |= s), (t.lanes = a), xh(e, a);
    }
  }
  var Pn = {
    readContext: Mt,
    use: lu,
    useCallback: ut,
    useContext: ut,
    useEffect: ut,
    useImperativeHandle: ut,
    useLayoutEffect: ut,
    useInsertionEffect: ut,
    useMemo: ut,
    useReducer: ut,
    useRef: ut,
    useState: ut,
    useDebugValue: ut,
    useDeferredValue: ut,
    useTransition: ut,
    useSyncExternalStore: ut,
    useId: ut,
  };
  (Pn.useCacheRefresh = ut),
    (Pn.useMemoCache = ut),
    (Pn.useHostTransitionStatus = ut),
    (Pn.useFormState = ut),
    (Pn.useActionState = ut),
    (Pn.useOptimistic = ut);
  var jl = {
    readContext: Mt,
    use: lu,
    useCallback: function (e, t) {
      return (Xt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Mt,
    useEffect: Zm,
    useImperativeHandle: function (e, t, a) {
      (a = a != null ? a.concat([e]) : null),
        iu(4194308, 4, Jm.bind(null, t, e), a);
    },
    useLayoutEffect: function (e, t) {
      return iu(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      iu(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var a = Xt();
      t = t === void 0 ? null : t;
      var s = e();
      if (Rl) {
        Na(!0);
        try {
          e();
        } finally {
          Na(!1);
        }
      }
      return (a.memoizedState = [s, t]), s;
    },
    useReducer: function (e, t, a) {
      var s = Xt();
      if (a !== void 0) {
        var u = a(t);
        if (Rl) {
          Na(!0);
          try {
            a(t);
          } finally {
            Na(!1);
          }
        }
      } else u = t;
      return (
        (s.memoizedState = s.baseState = u),
        (e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: u,
        }),
        (s.queue = e),
        (e = e.dispatch = t2.bind(null, Ne, e)),
        [s.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Xt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: function (e) {
      e = go(e);
      var t = e.queue,
        a = r0.bind(null, Ne, t);
      return (t.dispatch = a), [e.memoizedState, a];
    },
    useDebugValue: xo,
    useDeferredValue: function (e, t) {
      var a = Xt();
      return So(a, e, t);
    },
    useTransition: function () {
      var e = go(!1);
      return (
        (e = n0.bind(null, Ne, e.queue, !0, !1)),
        (Xt().memoizedState = e),
        [!1, e]
      );
    },
    useSyncExternalStore: function (e, t, a) {
      var s = Ne,
        u = Xt();
      if (Be) {
        if (a === void 0) throw Error(r(407));
        a = a();
      } else {
        if (((a = t()), Xe === null)) throw Error(r(349));
        Ue & 60 || Dm(s, t, a);
      }
      u.memoizedState = a;
      var o = { value: a, getSnapshot: t };
      return (
        (u.queue = o),
        Zm(Um.bind(null, s, o, e), [e]),
        (s.flags |= 2048),
        bs(9, Mm.bind(null, s, o, a, t), { destroy: void 0 }, null),
        a
      );
    },
    useId: function () {
      var e = Xt(),
        t = Xe.identifierPrefix;
      if (Be) {
        var a = la,
          s = aa;
        (a = (s & ~(1 << (32 - an(s) - 1))).toString(32) + a),
          (t = ":" + t + "R" + a),
          (a = nu++),
          0 < a && (t += "H" + a.toString(32)),
          (t += ":");
      } else (a = Kv++), (t = ":" + t + "r" + a.toString(32) + ":");
      return (e.memoizedState = t);
    },
    useCacheRefresh: function () {
      return (Xt().memoizedState = e2.bind(null, Ne));
    },
  };
  (jl.useMemoCache = mo),
    (jl.useHostTransitionStatus = Eo),
    (jl.useFormState = Qm),
    (jl.useActionState = Qm),
    (jl.useOptimistic = function (e) {
      var t = Xt();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null,
      };
      return (
        (t.queue = a), (t = _o.bind(null, Ne, !0, a)), (a.dispatch = t), [e, t]
      );
    });
  var Ua = {
    readContext: Mt,
    use: lu,
    useCallback: Im,
    useContext: Mt,
    useEffect: bo,
    useImperativeHandle: Wm,
    useInsertionEffect: Km,
    useLayoutEffect: $m,
    useMemo: e0,
    useReducer: su,
    useRef: Xm,
    useState: function () {
      return su(ia);
    },
    useDebugValue: xo,
    useDeferredValue: function (e, t) {
      var a = ht();
      return t0(a, Fe.memoizedState, e, t);
    },
    useTransition: function () {
      var e = su(ia)[0],
        t = ht().memoizedState;
      return [typeof e == "boolean" ? e : Ci(e), t];
    },
    useSyncExternalStore: Om,
    useId: s0,
  };
  (Ua.useCacheRefresh = i0),
    (Ua.useMemoCache = mo),
    (Ua.useHostTransitionStatus = Eo),
    (Ua.useFormState = Pm),
    (Ua.useActionState = Pm),
    (Ua.useOptimistic = function (e, t) {
      var a = ht();
      return Hm(a, Fe, e, t);
    });
  var Nl = {
    readContext: Mt,
    use: lu,
    useCallback: Im,
    useContext: Mt,
    useEffect: bo,
    useImperativeHandle: Wm,
    useInsertionEffect: Km,
    useLayoutEffect: $m,
    useMemo: e0,
    useReducer: yo,
    useRef: Xm,
    useState: function () {
      return yo(ia);
    },
    useDebugValue: xo,
    useDeferredValue: function (e, t) {
      var a = ht();
      return Fe === null ? So(a, e, t) : t0(a, Fe.memoizedState, e, t);
    },
    useTransition: function () {
      var e = yo(ia)[0],
        t = ht().memoizedState;
      return [typeof e == "boolean" ? e : Ci(e), t];
    },
    useSyncExternalStore: Om,
    useId: s0,
  };
  (Nl.useCacheRefresh = i0),
    (Nl.useMemoCache = mo),
    (Nl.useHostTransitionStatus = Eo),
    (Nl.useFormState = Gm),
    (Nl.useActionState = Gm),
    (Nl.useOptimistic = function (e, t) {
      var a = ht();
      return Fe !== null
        ? Hm(a, Fe, e, t)
        : ((a.baseState = e), [e, a.queue.dispatch]);
    });
  function Ro(e, t, a, s) {
    (t = e.memoizedState),
      (a = a(s, t)),
      (a = a == null ? t : le({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var jo = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? me(e) === e : !1;
    },
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var s = cn(),
        u = Ha(s);
      (u.payload = t),
        a != null && (u.callback = a),
        (t = Ba(e, u, s)),
        t !== null && (Vt(t, e, s), Ui(t, e, s));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var s = cn(),
        u = Ha(s);
      (u.tag = 1),
        (u.payload = t),
        a != null && (u.callback = a),
        (t = Ba(e, u, s)),
        t !== null && (Vt(t, e, s), Ui(t, e, s));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = cn(),
        s = Ha(a);
      (s.tag = 2),
        t != null && (s.callback = t),
        (t = Ba(e, s, a)),
        t !== null && (Vt(t, e, a), Ui(t, e, a));
    },
  };
  function o0(e, t, a, s, u, o, g) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(s, o, g)
        : t.prototype && t.prototype.isPureReactComponent
        ? !vi(a, s) || !vi(u, o)
        : !0
    );
  }
  function f0(e, t, a, s) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(a, s),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(a, s),
      t.state !== e && jo.enqueueReplaceState(t, t.state, null);
  }
  function Al(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var s in t) s !== "ref" && (a[s] = t[s]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = le({}, a));
      for (var u in e) a[u] === void 0 && (a[u] = e[u]);
    }
    return a;
  }
  var cu =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function d0(e) {
    cu(e);
  }
  function h0(e) {
    console.error(e);
  }
  function m0(e) {
    cu(e);
  }
  function ou(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function p0(e, t, a) {
    try {
      var s = e.onCaughtError;
      s(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function No(e, t, a) {
    return (
      (a = Ha(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        ou(e, t);
      }),
      a
    );
  }
  function y0(e) {
    return (e = Ha(e)), (e.tag = 3), e;
  }
  function g0(e, t, a, s) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var o = s.value;
      (e.payload = function () {
        return u(o);
      }),
        (e.callback = function () {
          p0(t, a, s);
        });
    }
    var g = a.stateNode;
    g !== null &&
      typeof g.componentDidCatch == "function" &&
      (e.callback = function () {
        p0(t, a, s),
          typeof u != "function" &&
            (Pa === null ? (Pa = new Set([this])) : Pa.add(this));
        var x = s.stack;
        this.componentDidCatch(s.value, {
          componentStack: x !== null ? x : "",
        });
      });
  }
  function n2(e, t, a, s, u) {
    if (
      ((a.flags |= 32768),
      s !== null && typeof s == "object" && typeof s.then == "function")
    ) {
      if (
        ((t = a.alternate),
        t !== null && Mi(t, a, u, !0),
        (a = gn.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 13:
            return (
              Qn === null ? cf() : a.alternate === null && tt === 0 && (tt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = u),
              s === no
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([s])) : t.add(s),
                  ff(e, s, u)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              s === no
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([s]),
                      }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue),
                      a === null ? (t.retryQueue = new Set([s])) : a.add(s)),
                  ff(e, s, u)),
              !1
            );
        }
        throw Error(r(435, a.tag));
      }
      return ff(e, s, u), cf(), !1;
    }
    if (Be)
      return (
        (t = gn.current),
        t !== null
          ? (!(t.flags & 65536) && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            s !== to && ((e = Error(r(422), { cause: s })), wi(mn(e, a))))
          : (s !== to && ((t = Error(r(423), { cause: s })), wi(mn(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (u &= -u),
            (e.lanes |= u),
            (s = mn(s, a)),
            (u = No(e.stateNode, s, u)),
            Fo(e, u),
            tt !== 4 && (tt = 2)),
        !1
      );
    var o = Error(r(520), { cause: s });
    if (
      ((o = mn(o, a)),
      Fi === null ? (Fi = [o]) : Fi.push(o),
      tt !== 4 && (tt = 2),
      t === null)
    )
      return !0;
    (s = mn(s, a)), (a = t);
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = u & -u),
            (a.lanes |= e),
            (e = No(a.stateNode, s, e)),
            Fo(a, e),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (o = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (o !== null &&
                  typeof o.componentDidCatch == "function" &&
                  (Pa === null || !Pa.has(o)))))
          )
            return (
              (a.flags |= 65536),
              (u &= -u),
              (a.lanes |= u),
              (u = y0(u)),
              g0(u, e, a, s),
              Fo(a, u),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var v0 = Error(r(461)),
    _t = !1;
  function Tt(e, t, a, s) {
    t.child = e === null ? Em(t, null, a, s) : El(t, e.child, a, s);
  }
  function b0(e, t, a, s, u) {
    a = a.render;
    var o = t.ref;
    if ("ref" in s) {
      var g = {};
      for (var x in s) x !== "ref" && (g[x] = s[x]);
    } else g = s;
    return (
      Cl(t),
      (s = co(e, t, a, g, o, u)),
      (x = oo()),
      e !== null && !_t
        ? (fo(e, t, u), ra(e, t, u))
        : (Be && x && Ic(t), (t.flags |= 1), Tt(e, t, s, u), t.child)
    );
  }
  function x0(e, t, a, s, u) {
    if (e === null) {
      var o = a.type;
      return typeof o == "function" &&
        !$o(o) &&
        o.defaultProps === void 0 &&
        a.compare === null
        ? ((t.tag = 15), (t.type = o), S0(e, t, o, s, u))
        : ((e = pu(a.type, null, s, t, t.mode, u)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((o = e.child), !Lo(e, u))) {
      var g = o.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : vi), a(g, s) && e.ref === t.ref)
      )
        return ra(e, t, u);
    }
    return (
      (t.flags |= 1),
      (e = Fa(o, s)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function S0(e, t, a, s, u) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (vi(o, s) && e.ref === t.ref)
        if (((_t = !1), (t.pendingProps = s = o), Lo(e, u)))
          e.flags & 131072 && (_t = !0);
        else return (t.lanes = e.lanes), ra(e, t, u);
    }
    return Ao(e, t, a, s, u);
  }
  function w0(e, t, a) {
    var s = t.pendingProps,
      u = s.children,
      o = (t.stateNode._pendingVisibility & 2) !== 0,
      g = e !== null ? e.memoizedState : null;
    if ((Di(e, t), s.mode === "hidden" || o)) {
      if (t.flags & 128) {
        if (((s = g !== null ? g.baseLanes | a : a), e !== null)) {
          for (u = t.child = e.child, o = 0; u !== null; )
            (o = o | u.lanes | u.childLanes), (u = u.sibling);
          t.childLanes = o & ~s;
        } else (t.childLanes = 0), (t.child = null);
        return E0(e, t, s, a);
      }
      if (a & 536870912)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && eu(t, g !== null ? g.cachePool : null),
          g !== null ? _m(t, g) : ao(),
          Rm(t);
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          E0(e, t, g !== null ? g.baseLanes | a : a, a)
        );
    } else
      g !== null
        ? (eu(t, g.cachePool), _m(t, g), Da(), (t.memoizedState = null))
        : (e !== null && eu(t, null), ao(), Da());
    return Tt(e, t, u, a), t.child;
  }
  function E0(e, t, a, s) {
    var u = ro();
    return (
      (u = u === null ? null : { parent: bt._currentValue, pool: u }),
      (t.memoizedState = { baseLanes: a, cachePool: u }),
      e !== null && eu(t, null),
      ao(),
      Rm(t),
      e !== null && Mi(e, t, s, !0),
      null
    );
  }
  function Di(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 2097664);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(r(284));
      (e === null || e.ref !== a) && (t.flags |= 2097664);
    }
  }
  function Ao(e, t, a, s, u) {
    return (
      Cl(t),
      (a = co(e, t, a, s, void 0, u)),
      (s = oo()),
      e !== null && !_t
        ? (fo(e, t, u), ra(e, t, u))
        : (Be && s && Ic(t), (t.flags |= 1), Tt(e, t, a, u), t.child)
    );
  }
  function _0(e, t, a, s, u, o) {
    return (
      Cl(t),
      (t.updateQueue = null),
      (a = Cm(t, s, a, u)),
      Tm(e),
      (s = oo()),
      e !== null && !_t
        ? (fo(e, t, o), ra(e, t, o))
        : (Be && s && Ic(t), (t.flags |= 1), Tt(e, t, a, o), t.child)
    );
  }
  function R0(e, t, a, s, u) {
    if ((Cl(t), t.stateNode === null)) {
      var o = os,
        g = a.contextType;
      typeof g == "object" && g !== null && (o = Mt(g)),
        (o = new a(s, o)),
        (t.memoizedState =
          o.state !== null && o.state !== void 0 ? o.state : null),
        (o.updater = jo),
        (t.stateNode = o),
        (o._reactInternals = t),
        (o = t.stateNode),
        (o.props = s),
        (o.state = t.memoizedState),
        (o.refs = {}),
        qo(t),
        (g = a.contextType),
        (o.context = typeof g == "object" && g !== null ? Mt(g) : os),
        (o.state = t.memoizedState),
        (g = a.getDerivedStateFromProps),
        typeof g == "function" && (Ro(t, a, g, s), (o.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == "function" ||
          typeof o.getSnapshotBeforeUpdate == "function" ||
          (typeof o.UNSAFE_componentWillMount != "function" &&
            typeof o.componentWillMount != "function") ||
          ((g = o.state),
          typeof o.componentWillMount == "function" && o.componentWillMount(),
          typeof o.UNSAFE_componentWillMount == "function" &&
            o.UNSAFE_componentWillMount(),
          g !== o.state && jo.enqueueReplaceState(o, o.state, null),
          Li(t, s, o, u),
          zi(),
          (o.state = t.memoizedState)),
        typeof o.componentDidMount == "function" && (t.flags |= 4194308),
        (s = !0);
    } else if (e === null) {
      o = t.stateNode;
      var x = t.memoizedProps,
        S = Al(a, x);
      o.props = S;
      var O = o.context,
        Q = a.contextType;
      (g = os), typeof Q == "object" && Q !== null && (g = Mt(Q));
      var X = a.getDerivedStateFromProps;
      (Q =
        typeof X == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function"),
        (x = t.pendingProps !== x),
        Q ||
          (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
            typeof o.componentWillReceiveProps != "function") ||
          ((x || O !== g) && f0(t, o, s, g)),
        (La = !1);
      var B = t.memoizedState;
      (o.state = B),
        Li(t, s, o, u),
        zi(),
        (O = t.memoizedState),
        x || B !== O || La
          ? (typeof X == "function" && (Ro(t, a, X, s), (O = t.memoizedState)),
            (S = La || o0(t, a, S, s, B, O, g))
              ? (Q ||
                  (typeof o.UNSAFE_componentWillMount != "function" &&
                    typeof o.componentWillMount != "function") ||
                  (typeof o.componentWillMount == "function" &&
                    o.componentWillMount(),
                  typeof o.UNSAFE_componentWillMount == "function" &&
                    o.UNSAFE_componentWillMount()),
                typeof o.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof o.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = s),
                (t.memoizedState = O)),
            (o.props = s),
            (o.state = O),
            (o.context = g),
            (s = S))
          : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
            (s = !1));
    } else {
      (o = t.stateNode),
        ko(e, t),
        (g = t.memoizedProps),
        (Q = Al(a, g)),
        (o.props = Q),
        (X = t.pendingProps),
        (B = o.context),
        (O = a.contextType),
        (S = os),
        typeof O == "object" && O !== null && (S = Mt(O)),
        (x = a.getDerivedStateFromProps),
        (O =
          typeof x == "function" ||
          typeof o.getSnapshotBeforeUpdate == "function") ||
          (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
            typeof o.componentWillReceiveProps != "function") ||
          ((g !== X || B !== S) && f0(t, o, s, S)),
        (La = !1),
        (B = t.memoizedState),
        (o.state = B),
        Li(t, s, o, u),
        zi();
      var F = t.memoizedState;
      g !== X ||
      B !== F ||
      La ||
      (e !== null && e.dependencies !== null && fu(e.dependencies))
        ? (typeof x == "function" && (Ro(t, a, x, s), (F = t.memoizedState)),
          (Q =
            La ||
            o0(t, a, Q, s, B, F, S) ||
            (e !== null && e.dependencies !== null && fu(e.dependencies)))
            ? (O ||
                (typeof o.UNSAFE_componentWillUpdate != "function" &&
                  typeof o.componentWillUpdate != "function") ||
                (typeof o.componentWillUpdate == "function" &&
                  o.componentWillUpdate(s, F, S),
                typeof o.UNSAFE_componentWillUpdate == "function" &&
                  o.UNSAFE_componentWillUpdate(s, F, S)),
              typeof o.componentDidUpdate == "function" && (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof o.componentDidUpdate != "function" ||
                (g === e.memoizedProps && B === e.memoizedState) ||
                (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != "function" ||
                (g === e.memoizedProps && B === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = s),
              (t.memoizedState = F)),
          (o.props = s),
          (o.state = F),
          (o.context = S),
          (s = Q))
        : (typeof o.componentDidUpdate != "function" ||
            (g === e.memoizedProps && B === e.memoizedState) ||
            (t.flags |= 4),
          typeof o.getSnapshotBeforeUpdate != "function" ||
            (g === e.memoizedProps && B === e.memoizedState) ||
            (t.flags |= 1024),
          (s = !1));
    }
    return (
      (o = s),
      Di(e, t),
      (s = (t.flags & 128) !== 0),
      o || s
        ? ((o = t.stateNode),
          (a =
            s && typeof a.getDerivedStateFromError != "function"
              ? null
              : o.render()),
          (t.flags |= 1),
          e !== null && s
            ? ((t.child = El(t, e.child, null, u)),
              (t.child = El(t, null, a, u)))
            : Tt(e, t, a, u),
          (t.memoizedState = o.state),
          (e = t.child))
        : (e = ra(e, t, u)),
      e
    );
  }
  function j0(e, t, a, s) {
    return Si(), (t.flags |= 256), Tt(e, t, a, s), t.child;
  }
  var To = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Co(e) {
    return { baseLanes: e, cachePool: Am() };
  }
  function Oo(e, t, a) {
    return (e = e !== null ? e.childLanes & ~a : 0), t && (e |= Sn), e;
  }
  function N0(e, t, a) {
    var s = t.pendingProps,
      u = !1,
      o = (t.flags & 128) !== 0,
      g;
    if (
      ((g = o) ||
        (g =
          e !== null && e.memoizedState === null ? !1 : (vt.current & 2) !== 0),
      g && ((u = !0), (t.flags &= -129)),
      (g = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Be) {
        if ((u ? Oa(t) : Da(), Be)) {
          var x = At,
            S;
          if ((S = x)) {
            e: {
              for (S = x, x = Fn; S.nodeType !== 8; ) {
                if (!x) {
                  x = null;
                  break e;
                }
                if (((S = Mn(S.nextSibling)), S === null)) {
                  x = null;
                  break e;
                }
              }
              x = S;
            }
            x !== null
              ? ((t.memoizedState = {
                  dehydrated: x,
                  treeContext: xl !== null ? { id: aa, overflow: la } : null,
                  retryLane: 536870912,
                }),
                (S = xn(18, null, null, 0)),
                (S.stateNode = x),
                (S.return = t),
                (t.child = S),
                (Bt = t),
                (At = null),
                (S = !0))
              : (S = !1);
          }
          S || wl(t);
        }
        if (
          ((x = t.memoizedState),
          x !== null && ((x = x.dehydrated), x !== null))
        )
          return x.data === "$!" ? (t.lanes = 16) : (t.lanes = 536870912), null;
        sa(t);
      }
      return (
        (x = s.children),
        (s = s.fallback),
        u
          ? (Da(),
            (u = t.mode),
            (x = Mo({ mode: "hidden", children: x }, u)),
            (s = Dl(s, u, a, null)),
            (x.return = t),
            (s.return = t),
            (x.sibling = s),
            (t.child = x),
            (u = t.child),
            (u.memoizedState = Co(a)),
            (u.childLanes = Oo(e, g, a)),
            (t.memoizedState = To),
            s)
          : (Oa(t), Do(t, x))
      );
    }
    if (
      ((S = e.memoizedState), S !== null && ((x = S.dehydrated), x !== null))
    ) {
      if (o)
        t.flags & 256
          ? (Oa(t), (t.flags &= -257), (t = Uo(e, t, a)))
          : t.memoizedState !== null
          ? (Da(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (Da(),
            (u = s.fallback),
            (x = t.mode),
            (s = Mo({ mode: "visible", children: s.children }, x)),
            (u = Dl(u, x, a, null)),
            (u.flags |= 2),
            (s.return = t),
            (u.return = t),
            (s.sibling = u),
            (t.child = s),
            El(t, e.child, null, a),
            (s = t.child),
            (s.memoizedState = Co(a)),
            (s.childLanes = Oo(e, g, a)),
            (t.memoizedState = To),
            (t = u));
      else if ((Oa(t), x.data === "$!")) {
        if (((g = x.nextSibling && x.nextSibling.dataset), g)) var O = g.dgst;
        (g = O),
          (s = Error(r(419))),
          (s.stack = ""),
          (s.digest = g),
          wi({ value: s, source: null, stack: null }),
          (t = Uo(e, t, a));
      } else if (
        (_t || Mi(e, t, a, !1), (g = (a & e.childLanes) !== 0), _t || g)
      ) {
        if (((g = Xe), g !== null)) {
          if (((s = a & -a), s & 42)) s = 1;
          else
            switch (s) {
              case 2:
                s = 1;
                break;
              case 8:
                s = 4;
                break;
              case 32:
                s = 16;
                break;
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
                s = 64;
                break;
              case 268435456:
                s = 134217728;
                break;
              default:
                s = 0;
            }
          if (
            ((s = s & (g.suspendedLanes | a) ? 0 : s),
            s !== 0 && s !== S.retryLane)
          )
            throw ((S.retryLane = s), Ca(e, s), Vt(g, e, s), v0);
        }
        x.data === "$?" || cf(), (t = Uo(e, t, a));
      } else
        x.data === "$?"
          ? ((t.flags |= 128),
            (t.child = e.child),
            (t = g2.bind(null, e)),
            (x._reactRetry = t),
            (t = null))
          : ((e = S.treeContext),
            (At = Mn(x.nextSibling)),
            (Bt = t),
            (Be = !0),
            (On = null),
            (Fn = !1),
            e !== null &&
              ((pn[yn++] = aa),
              (pn[yn++] = la),
              (pn[yn++] = xl),
              (aa = e.id),
              (la = e.overflow),
              (xl = t)),
            (t = Do(t, s.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (Da(),
        (u = s.fallback),
        (x = t.mode),
        (S = e.child),
        (O = S.sibling),
        (s = Fa(S, { mode: "hidden", children: s.children })),
        (s.subtreeFlags = S.subtreeFlags & 31457280),
        O !== null ? (u = Fa(O, u)) : ((u = Dl(u, x, a, null)), (u.flags |= 2)),
        (u.return = t),
        (s.return = t),
        (s.sibling = u),
        (t.child = s),
        (s = u),
        (u = t.child),
        (x = e.child.memoizedState),
        x === null
          ? (x = Co(a))
          : ((S = x.cachePool),
            S !== null
              ? ((O = bt._currentValue),
                (S = S.parent !== O ? { parent: O, pool: O } : S))
              : (S = Am()),
            (x = { baseLanes: x.baseLanes | a, cachePool: S })),
        (u.memoizedState = x),
        (u.childLanes = Oo(e, g, a)),
        (t.memoizedState = To),
        s)
      : (Oa(t),
        (a = e.child),
        (e = a.sibling),
        (a = Fa(a, { mode: "visible", children: s.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((g = t.deletions),
          g === null ? ((t.deletions = [e]), (t.flags |= 16)) : g.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function Do(e, t) {
    return (
      (t = Mo({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Mo(e, t) {
    return I0(e, t, 0, null);
  }
  function Uo(e, t, a) {
    return (
      El(t, e.child, null, a),
      (e = Do(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function A0(e, t, a) {
    e.lanes |= t;
    var s = e.alternate;
    s !== null && (s.lanes |= t), Bo(e.return, t, a);
  }
  function zo(e, t, a, s, u) {
    var o = e.memoizedState;
    o === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: s,
          tail: a,
          tailMode: u,
        })
      : ((o.isBackwards = t),
        (o.rendering = null),
        (o.renderingStartTime = 0),
        (o.last = s),
        (o.tail = a),
        (o.tailMode = u));
  }
  function T0(e, t, a) {
    var s = t.pendingProps,
      u = s.revealOrder,
      o = s.tail;
    if ((Tt(e, t, s.children, a), (s = vt.current), s & 2))
      (s = (s & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && e.flags & 128)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && A0(e, a, t);
          else if (e.tag === 19) A0(e, a, t);
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
      s &= 1;
    }
    switch ((Ge(vt, s), u)) {
      case "forwards":
        for (a = t.child, u = null; a !== null; )
          (e = a.alternate),
            e !== null && Ir(e) === null && (u = a),
            (a = a.sibling);
        (a = u),
          a === null
            ? ((u = t.child), (t.child = null))
            : ((u = a.sibling), (a.sibling = null)),
          zo(t, !1, u, a, o);
        break;
      case "backwards":
        for (a = null, u = t.child, t.child = null; u !== null; ) {
          if (((e = u.alternate), e !== null && Ir(e) === null)) {
            t.child = u;
            break;
          }
          (e = u.sibling), (u.sibling = a), (a = u), (u = e);
        }
        zo(t, !0, a, null, o);
        break;
      case "together":
        zo(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function ra(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Qa |= t.lanes),
      !(a & t.childLanes))
    )
      if (e !== null) {
        if ((Mi(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(r(153));
    if (t.child !== null) {
      for (
        e = t.child, a = Fa(e, e.pendingProps), t.child = a, a.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (a = a.sibling = Fa(e, e.pendingProps)),
          (a.return = t);
      a.sibling = null;
    }
    return t.child;
  }
  function Lo(e, t) {
    return e.lanes & t ? !0 : ((e = e.dependencies), !!(e !== null && fu(e)));
  }
  function a2(e, t, a) {
    switch (t.tag) {
      case 3:
        si(t, t.stateNode.containerInfo),
          za(t, bt, e.memoizedState.cache),
          Si();
        break;
      case 27:
      case 5:
        Ar(t);
        break;
      case 4:
        si(t, t.stateNode.containerInfo);
        break;
      case 10:
        za(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var s = t.memoizedState;
        if (s !== null)
          return s.dehydrated !== null
            ? (Oa(t), (t.flags |= 128), null)
            : a & t.child.childLanes
            ? N0(e, t, a)
            : (Oa(t), (e = ra(e, t, a)), e !== null ? e.sibling : null);
        Oa(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (
          ((s = (a & t.childLanes) !== 0),
          s || (Mi(e, t, a, !1), (s = (a & t.childLanes) !== 0)),
          u)
        ) {
          if (s) return T0(e, t, a);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          Ge(vt, vt.current),
          s)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), w0(e, t, a);
      case 24:
        za(t, bt, e.memoizedState.cache);
    }
    return ra(e, t, a);
  }
  function C0(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) _t = !0;
      else {
        if (!Lo(e, a) && !(t.flags & 128)) return (_t = !1), a2(e, t, a);
        _t = !!(e.flags & 131072);
      }
    else (_t = !1), Be && t.flags & 1048576 && mm(t, Zr, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var s = t.elementType,
            u = s._init;
          if (((s = u(s._payload)), (t.type = s), typeof s == "function"))
            $o(s)
              ? ((e = Al(s, e)), (t.tag = 1), (t = R0(null, t, s, e, a)))
              : ((t.tag = 0), (t = Ao(null, t, s, e, a)));
          else {
            if (s != null) {
              if (((u = s.$$typeof), u === _)) {
                (t.tag = 11), (t = b0(null, t, s, e, a));
                break e;
              } else if (u === U) {
                (t.tag = 14), (t = x0(null, t, s, e, a));
                break e;
              }
            }
            throw ((t = ee(s) || s), Error(r(306, t, "")));
          }
        }
        return t;
      case 0:
        return Ao(e, t, t.type, t.pendingProps, a);
      case 1:
        return (s = t.type), (u = Al(s, t.pendingProps)), R0(e, t, s, u, a);
      case 3:
        e: {
          if ((si(t, t.stateNode.containerInfo), e === null))
            throw Error(r(387));
          var o = t.pendingProps;
          (u = t.memoizedState), (s = u.element), ko(e, t), Li(t, o, null, a);
          var g = t.memoizedState;
          if (
            ((o = g.cache),
            za(t, bt, o),
            o !== u.cache && Vo(t, [bt], a, !0),
            zi(),
            (o = g.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: o, isDehydrated: !1, cache: g.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = j0(e, t, o, a);
              break e;
            } else if (o !== s) {
              (s = mn(Error(r(424)), t)), wi(s), (t = j0(e, t, o, a));
              break e;
            } else
              for (
                At = Mn(t.stateNode.containerInfo.firstChild),
                  Bt = t,
                  Be = !0,
                  On = null,
                  Fn = !0,
                  a = Em(t, null, o, a),
                  t.child = a;
                a;

              )
                (a.flags = (a.flags & -3) | 4096), (a = a.sibling);
          else {
            if ((Si(), o === s)) {
              t = ra(e, t, a);
              break e;
            }
            Tt(e, t, o, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Di(e, t),
          e === null
            ? (a = Mp(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : Be ||
                ((a = t.type),
                (e = t.pendingProps),
                (s = Nu(Tn.current).createElement(a)),
                (s[Dt] = t),
                (s[Yt] = e),
                Ct(s, a, e),
                Et(s),
                (t.stateNode = s))
            : (t.memoizedState = Mp(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          Ar(t),
          e === null &&
            Be &&
            ((s = t.stateNode = Cp(t.type, t.pendingProps, Tn.current)),
            (Bt = t),
            (Fn = !0),
            (At = Mn(s.firstChild))),
          (s = t.pendingProps.children),
          e !== null || Be ? Tt(e, t, s, a) : (t.child = El(t, null, s, a)),
          Di(e, t),
          t.child
        );
      case 5:
        return (
          e === null &&
            Be &&
            ((u = s = At) &&
              ((s = M2(s, t.type, t.pendingProps, Fn)),
              s !== null
                ? ((t.stateNode = s),
                  (Bt = t),
                  (At = Mn(s.firstChild)),
                  (Fn = !1),
                  (u = !0))
                : (u = !1)),
            u || wl(t)),
          Ar(t),
          (u = t.type),
          (o = t.pendingProps),
          (g = e !== null ? e.memoizedProps : null),
          (s = o.children),
          Ef(u, o) ? (s = null) : g !== null && Ef(u, g) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((u = co(e, t, $v, null, null, a)), (Ji._currentValue = u)),
          Di(e, t),
          Tt(e, t, s, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            Be &&
            ((e = a = At) &&
              ((a = U2(a, t.pendingProps, Fn)),
              a !== null
                ? ((t.stateNode = a), (Bt = t), (At = null), (e = !0))
                : (e = !1)),
            e || wl(t)),
          null
        );
      case 13:
        return N0(e, t, a);
      case 4:
        return (
          si(t, t.stateNode.containerInfo),
          (s = t.pendingProps),
          e === null ? (t.child = El(t, null, s, a)) : Tt(e, t, s, a),
          t.child
        );
      case 11:
        return b0(e, t, t.type, t.pendingProps, a);
      case 7:
        return Tt(e, t, t.pendingProps, a), t.child;
      case 8:
        return Tt(e, t, t.pendingProps.children, a), t.child;
      case 12:
        return Tt(e, t, t.pendingProps.children, a), t.child;
      case 10:
        return (
          (s = t.pendingProps),
          za(t, t.type, s.value),
          Tt(e, t, s.children, a),
          t.child
        );
      case 9:
        return (
          (u = t.type._context),
          (s = t.pendingProps.children),
          Cl(t),
          (u = Mt(u)),
          (s = s(u)),
          (t.flags |= 1),
          Tt(e, t, s, a),
          t.child
        );
      case 14:
        return x0(e, t, t.type, t.pendingProps, a);
      case 15:
        return S0(e, t, t.type, t.pendingProps, a);
      case 19:
        return T0(e, t, a);
      case 22:
        return w0(e, t, a);
      case 24:
        return (
          Cl(t),
          (s = Mt(bt)),
          e === null
            ? ((u = ro()),
              u === null &&
                ((u = Xe),
                (o = so()),
                (u.pooledCache = o),
                o.refCount++,
                o !== null && (u.pooledCacheLanes |= a),
                (u = o)),
              (t.memoizedState = { parent: s, cache: u }),
              qo(t),
              za(t, bt, u))
            : (e.lanes & a && (ko(e, t), Li(t, null, null, a), zi()),
              (u = e.memoizedState),
              (o = t.memoizedState),
              u.parent !== s
                ? ((u = { parent: s, cache: s }),
                  (t.memoizedState = u),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = u),
                  za(t, bt, s))
                : ((s = o.cache),
                  za(t, bt, s),
                  s !== u.cache && Vo(t, [bt], a, !0))),
          Tt(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  var Ho = Me(null),
    Tl = null,
    ua = null;
  function za(e, t, a) {
    Ge(Ho, t._currentValue), (t._currentValue = a);
  }
  function ca(e) {
    (e._currentValue = Ho.current), Je(Ho);
  }
  function Bo(e, t, a) {
    for (; e !== null; ) {
      var s = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), s !== null && (s.childLanes |= t))
          : s !== null && (s.childLanes & t) !== t && (s.childLanes |= t),
        e === a)
      )
        break;
      e = e.return;
    }
  }
  function Vo(e, t, a, s) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var o = u.dependencies;
      if (o !== null) {
        var g = u.child;
        o = o.firstContext;
        e: for (; o !== null; ) {
          var x = o;
          o = u;
          for (var S = 0; S < t.length; S++)
            if (x.context === t[S]) {
              (o.lanes |= a),
                (x = o.alternate),
                x !== null && (x.lanes |= a),
                Bo(o.return, a, e),
                s || (g = null);
              break e;
            }
          o = x.next;
        }
      } else if (u.tag === 18) {
        if (((g = u.return), g === null)) throw Error(r(341));
        (g.lanes |= a),
          (o = g.alternate),
          o !== null && (o.lanes |= a),
          Bo(g, a, e),
          (g = null);
      } else g = u.child;
      if (g !== null) g.return = u;
      else
        for (g = u; g !== null; ) {
          if (g === e) {
            g = null;
            break;
          }
          if (((u = g.sibling), u !== null)) {
            (u.return = g.return), (g = u);
            break;
          }
          g = g.return;
        }
      u = g;
    }
  }
  function Mi(e, t, a, s) {
    e = null;
    for (var u = t, o = !1; u !== null; ) {
      if (!o) {
        if (u.flags & 524288) o = !0;
        else if (u.flags & 262144) break;
      }
      if (u.tag === 10) {
        var g = u.alternate;
        if (g === null) throw Error(r(387));
        if (((g = g.memoizedProps), g !== null)) {
          var x = u.type;
          ln(u.pendingProps.value, g.value) ||
            (e !== null ? e.push(x) : (e = [x]));
        }
      } else if (u === dl.current) {
        if (((g = u.alternate), g === null)) throw Error(r(387));
        g.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (e !== null ? e.push(Ji) : (e = [Ji]));
      }
      u = u.return;
    }
    e !== null && Vo(t, e, a, s), (t.flags |= 262144);
  }
  function fu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ln(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Cl(e) {
    (Tl = e),
      (ua = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null);
  }
  function Mt(e) {
    return O0(Tl, e);
  }
  function du(e, t) {
    return Tl === null && Cl(e), O0(e, t);
  }
  function O0(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), ua === null)) {
      if (e === null) throw Error(r(308));
      (ua = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288);
    } else ua = ua.next = t;
    return a;
  }
  var La = !1;
  function qo(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function ko(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        });
  }
  function Ha(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ba(e, t, a) {
    var s = e.updateQueue;
    if (s === null) return null;
    if (((s = s.shared), Ie & 2)) {
      var u = s.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (s.pending = t),
        (t = Gr(e)),
        dm(e, null, a),
        t
      );
    }
    return Yr(e, s, t, a), Gr(e);
  }
  function Ui(e, t, a) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194176) !== 0))
    ) {
      var s = t.lanes;
      (s &= e.pendingLanes), (a |= s), (t.lanes = a), xh(e, a);
    }
  }
  function Fo(e, t) {
    var a = e.updateQueue,
      s = e.alternate;
    if (s !== null && ((s = s.updateQueue), a === s)) {
      var u = null,
        o = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var g = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          o === null ? (u = o = g) : (o = o.next = g), (a = a.next);
        } while (a !== null);
        o === null ? (u = o = t) : (o = o.next = t);
      } else u = o = t;
      (a = {
        baseState: s.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: o,
        shared: s.shared,
        callbacks: s.callbacks,
      }),
        (e.updateQueue = a);
      return;
    }
    (e = a.lastBaseUpdate),
      e === null ? (a.firstBaseUpdate = t) : (e.next = t),
      (a.lastBaseUpdate = t);
  }
  var Qo = !1;
  function zi() {
    if (Qo) {
      var e = ys;
      if (e !== null) throw e;
    }
  }
  function Li(e, t, a, s) {
    Qo = !1;
    var u = e.updateQueue;
    La = !1;
    var o = u.firstBaseUpdate,
      g = u.lastBaseUpdate,
      x = u.shared.pending;
    if (x !== null) {
      u.shared.pending = null;
      var S = x,
        O = S.next;
      (S.next = null), g === null ? (o = O) : (g.next = O), (g = S);
      var Q = e.alternate;
      Q !== null &&
        ((Q = Q.updateQueue),
        (x = Q.lastBaseUpdate),
        x !== g &&
          (x === null ? (Q.firstBaseUpdate = O) : (x.next = O),
          (Q.lastBaseUpdate = S)));
    }
    if (o !== null) {
      var X = u.baseState;
      (g = 0), (Q = O = S = null), (x = o);
      do {
        var B = x.lane & -536870913,
          F = B !== x.lane;
        if (F ? (Ue & B) === B : (s & B) === B) {
          B !== 0 && B === ps && (Qo = !0),
            Q !== null &&
              (Q = Q.next =
                {
                  lane: 0,
                  tag: x.tag,
                  payload: x.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var ce = e,
              be = x;
            B = t;
            var nt = a;
            switch (be.tag) {
              case 1:
                if (((ce = be.payload), typeof ce == "function")) {
                  X = ce.call(nt, X, B);
                  break e;
                }
                X = ce;
                break e;
              case 3:
                ce.flags = (ce.flags & -65537) | 128;
              case 0:
                if (
                  ((ce = be.payload),
                  (B = typeof ce == "function" ? ce.call(nt, X, B) : ce),
                  B == null)
                )
                  break e;
                X = le({}, X, B);
                break e;
              case 2:
                La = !0;
            }
          }
          (B = x.callback),
            B !== null &&
              ((e.flags |= 64),
              F && (e.flags |= 8192),
              (F = u.callbacks),
              F === null ? (u.callbacks = [B]) : F.push(B));
        } else
          (F = {
            lane: B,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null,
          }),
            Q === null ? ((O = Q = F), (S = X)) : (Q = Q.next = F),
            (g |= B);
        if (((x = x.next), x === null)) {
          if (((x = u.shared.pending), x === null)) break;
          (F = x),
            (x = F.next),
            (F.next = null),
            (u.lastBaseUpdate = F),
            (u.shared.pending = null);
        }
      } while (!0);
      Q === null && (S = X),
        (u.baseState = S),
        (u.firstBaseUpdate = O),
        (u.lastBaseUpdate = Q),
        o === null && (u.shared.lanes = 0),
        (Qa |= g),
        (e.lanes = g),
        (e.memoizedState = X);
    }
  }
  function D0(e, t) {
    if (typeof e != "function") throw Error(r(191, e));
    e.call(t);
  }
  function M0(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++) D0(a[e], t);
  }
  function Hi(e, t) {
    try {
      var a = t.updateQueue,
        s = a !== null ? a.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            s = void 0;
            var o = a.create,
              g = a.inst;
            (s = o()), (g.destroy = s);
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (x) {
      Ye(t, t.return, x);
    }
  }
  function Va(e, t, a) {
    try {
      var s = t.updateQueue,
        u = s !== null ? s.lastEffect : null;
      if (u !== null) {
        var o = u.next;
        s = o;
        do {
          if ((s.tag & e) === e) {
            var g = s.inst,
              x = g.destroy;
            if (x !== void 0) {
              (g.destroy = void 0), (u = t);
              var S = a;
              try {
                x();
              } catch (O) {
                Ye(u, S, O);
              }
            }
          }
          s = s.next;
        } while (s !== o);
      }
    } catch (O) {
      Ye(t, t.return, O);
    }
  }
  function U0(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        M0(t, a);
      } catch (s) {
        Ye(e, e.return, s);
      }
    }
  }
  function z0(e, t, a) {
    (a.props = Al(e.type, e.memoizedProps)), (a.state = e.memoizedState);
    try {
      a.componentWillUnmount();
    } catch (s) {
      Ye(e, t, s);
    }
  }
  function Ol(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        var s = e.stateNode;
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var u = s;
            break;
          default:
            u = s;
        }
        typeof a == "function" ? (e.refCleanup = a(u)) : (a.current = u);
      }
    } catch (o) {
      Ye(e, t, o);
    }
  }
  function sn(e, t) {
    var a = e.ref,
      s = e.refCleanup;
    if (a !== null)
      if (typeof s == "function")
        try {
          s();
        } catch (u) {
          Ye(e, t, u);
        } finally {
          (e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          Ye(e, t, u);
        }
      else a.current = null;
  }
  function L0(e) {
    var t = e.type,
      a = e.memoizedProps,
      s = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && s.focus();
          break e;
        case "img":
          a.src ? (s.src = a.src) : a.srcSet && (s.srcset = a.srcSet);
      }
    } catch (u) {
      Ye(e, e.return, u);
    }
  }
  function H0(e, t, a) {
    try {
      var s = e.stateNode;
      A2(s, e.type, a, t), (s[Yt] = t);
    } catch (u) {
      Ye(e, e.return, u);
    }
  }
  function B0(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 || e.tag === 4
    );
  }
  function Po(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || B0(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 27 && e.tag !== 18;

      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Yo(e, t, a) {
    var s = e.tag;
    if (s === 5 || s === 6)
      (e = e.stateNode),
        t
          ? a.nodeType === 8
            ? a.parentNode.insertBefore(e, t)
            : a.insertBefore(e, t)
          : (a.nodeType === 8
              ? ((t = a.parentNode), t.insertBefore(e, a))
              : ((t = a), t.appendChild(e)),
            (a = a._reactRootContainer),
            a != null || t.onclick !== null || (t.onclick = ju));
    else if (s !== 4 && s !== 27 && ((e = e.child), e !== null))
      for (Yo(e, t, a), e = e.sibling; e !== null; )
        Yo(e, t, a), (e = e.sibling);
  }
  function hu(e, t, a) {
    var s = e.tag;
    if (s === 5 || s === 6)
      (e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (s !== 4 && s !== 27 && ((e = e.child), e !== null))
      for (hu(e, t, a), e = e.sibling; e !== null; )
        hu(e, t, a), (e = e.sibling);
  }
  var oa = !1,
    et = !1,
    Go = !1,
    V0 = typeof WeakSet == "function" ? WeakSet : Set,
    Rt = null,
    q0 = !1;
  function l2(e, t) {
    if (((e = e.containerInfo), (Sf = Mu), (e = am(e)), Xc(e))) {
      if ("selectionStart" in e)
        var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var s = a.getSelection && a.getSelection();
          if (s && s.rangeCount !== 0) {
            a = s.anchorNode;
            var u = s.anchorOffset,
              o = s.focusNode;
            s = s.focusOffset;
            try {
              a.nodeType, o.nodeType;
            } catch {
              a = null;
              break e;
            }
            var g = 0,
              x = -1,
              S = -1,
              O = 0,
              Q = 0,
              X = e,
              B = null;
            t: for (;;) {
              for (
                var F;
                X !== a || (u !== 0 && X.nodeType !== 3) || (x = g + u),
                  X !== o || (s !== 0 && X.nodeType !== 3) || (S = g + s),
                  X.nodeType === 3 && (g += X.nodeValue.length),
                  (F = X.firstChild) !== null;

              )
                (B = X), (X = F);
              for (;;) {
                if (X === e) break t;
                if (
                  (B === a && ++O === u && (x = g),
                  B === o && ++Q === s && (S = g),
                  (F = X.nextSibling) !== null)
                )
                  break;
                (X = B), (B = X.parentNode);
              }
              X = F;
            }
            a = x === -1 || S === -1 ? null : { start: x, end: S };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      wf = { focusedElem: e, selectionRange: a }, Mu = !1, Rt = t;
      Rt !== null;

    )
      if (
        ((t = Rt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      )
        (e.return = t), (Rt = e);
      else
        for (; Rt !== null; ) {
          switch (((t = Rt), (o = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if (e & 1024 && o !== null) {
                (e = void 0),
                  (a = t),
                  (u = o.memoizedProps),
                  (o = o.memoizedState),
                  (s = a.stateNode);
                try {
                  var ce = Al(a.type, u, a.elementType === a.type);
                  (e = s.getSnapshotBeforeUpdate(ce, o)),
                    (s.__reactInternalSnapshotBeforeUpdate = e);
                } catch (be) {
                  Ye(a, a.return, be);
                }
              }
              break;
            case 3:
              if (e & 1024) {
                if (
                  ((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)
                )
                  jf(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      jf(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if (e & 1024) throw Error(r(163));
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (Rt = e);
            break;
          }
          Rt = t.return;
        }
    return (ce = q0), (q0 = !1), ce;
  }
  function k0(e, t, a) {
    var s = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        da(e, a), s & 4 && Hi(5, a);
        break;
      case 1:
        if ((da(e, a), s & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (x) {
              Ye(a, a.return, x);
            }
          else {
            var u = Al(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(u, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (x) {
              Ye(a, a.return, x);
            }
          }
        s & 64 && U0(a), s & 512 && Ol(a, a.return);
        break;
      case 3:
        if ((da(e, a), s & 64 && ((s = a.updateQueue), s !== null))) {
          if (((e = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                e = a.child.stateNode;
                break;
              case 1:
                e = a.child.stateNode;
            }
          try {
            M0(s, e);
          } catch (x) {
            Ye(a, a.return, x);
          }
        }
        break;
      case 26:
        da(e, a), s & 512 && Ol(a, a.return);
        break;
      case 27:
      case 5:
        da(e, a), t === null && s & 4 && L0(a), s & 512 && Ol(a, a.return);
        break;
      case 12:
        da(e, a);
        break;
      case 13:
        da(e, a), s & 4 && P0(e, a);
        break;
      case 22:
        if (((u = a.memoizedState !== null || oa), !u)) {
          t = (t !== null && t.memoizedState !== null) || et;
          var o = oa,
            g = et;
          (oa = u),
            (et = t) && !g ? qa(e, a, (a.subtreeFlags & 8772) !== 0) : da(e, a),
            (oa = o),
            (et = g);
        }
        s & 512 &&
          (a.memoizedProps.mode === "manual"
            ? Ol(a, a.return)
            : sn(a, a.return));
        break;
      default:
        da(e, a);
    }
  }
  function F0(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), F0(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Oc(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  var mt = null,
    rn = !1;
  function fa(e, t, a) {
    for (a = a.child; a !== null; ) Q0(e, t, a), (a = a.sibling);
  }
  function Q0(e, t, a) {
    if (Ht && typeof Ht.onCommitFiberUnmount == "function")
      try {
        Ht.onCommitFiberUnmount(ja, a);
      } catch {}
    switch (a.tag) {
      case 26:
        et || sn(a, t),
          fa(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a));
        break;
      case 27:
        et || sn(a, t);
        var s = mt,
          u = rn;
        for (
          mt = a.stateNode, fa(e, t, a), a = a.stateNode, t = a.attributes;
          t.length;

        )
          a.removeAttributeNode(t[0]);
        Oc(a), (mt = s), (rn = u);
        break;
      case 5:
        et || sn(a, t);
      case 6:
        u = mt;
        var o = rn;
        if (((mt = null), fa(e, t, a), (mt = u), (rn = o), mt !== null))
          if (rn)
            try {
              (e = mt),
                (s = a.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(s)
                  : e.removeChild(s);
            } catch (g) {
              Ye(a, t, g);
            }
          else
            try {
              mt.removeChild(a.stateNode);
            } catch (g) {
              Ye(a, t, g);
            }
        break;
      case 18:
        mt !== null &&
          (rn
            ? ((t = mt),
              (a = a.stateNode),
              t.nodeType === 8
                ? Rf(t.parentNode, a)
                : t.nodeType === 1 && Rf(t, a),
              tr(t))
            : Rf(mt, a.stateNode));
        break;
      case 4:
        (s = mt),
          (u = rn),
          (mt = a.stateNode.containerInfo),
          (rn = !0),
          fa(e, t, a),
          (mt = s),
          (rn = u);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        et || Va(2, a, t), et || Va(4, a, t), fa(e, t, a);
        break;
      case 1:
        et ||
          (sn(a, t),
          (s = a.stateNode),
          typeof s.componentWillUnmount == "function" && z0(a, t, s)),
          fa(e, t, a);
        break;
      case 21:
        fa(e, t, a);
        break;
      case 22:
        et || sn(a, t),
          (et = (s = et) || a.memoizedState !== null),
          fa(e, t, a),
          (et = s);
        break;
      default:
        fa(e, t, a);
    }
  }
  function P0(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        tr(e);
      } catch (a) {
        Ye(t, t.return, a);
      }
  }
  function s2(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new V0()), t;
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new V0()),
          t
        );
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Xo(e, t) {
    var a = s2(e);
    t.forEach(function (s) {
      var u = v2.bind(null, e, s);
      a.has(s) || (a.add(s), s.then(u, u));
    });
  }
  function vn(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var s = 0; s < a.length; s++) {
        var u = a[s],
          o = e,
          g = t,
          x = g;
        e: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
            case 5:
              (mt = x.stateNode), (rn = !1);
              break e;
            case 3:
              (mt = x.stateNode.containerInfo), (rn = !0);
              break e;
            case 4:
              (mt = x.stateNode.containerInfo), (rn = !0);
              break e;
          }
          x = x.return;
        }
        if (mt === null) throw Error(r(160));
        Q0(o, g, u),
          (mt = null),
          (rn = !1),
          (o = u.alternate),
          o !== null && (o.return = null),
          (u.return = null);
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) Y0(t, e), (t = t.sibling);
  }
  var Dn = null;
  function Y0(e, t) {
    var a = e.alternate,
      s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        vn(t, e),
          bn(e),
          s & 4 && (Va(3, e, e.return), Hi(3, e), Va(5, e, e.return));
        break;
      case 1:
        vn(t, e),
          bn(e),
          s & 512 && (et || a === null || sn(a, a.return)),
          s & 64 &&
            oa &&
            ((e = e.updateQueue),
            e !== null &&
              ((s = e.callbacks),
              s !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? s : a.concat(s)))));
        break;
      case 26:
        var u = Dn;
        if (
          (vn(t, e),
          bn(e),
          s & 512 && (et || a === null || sn(a, a.return)),
          s & 4)
        ) {
          var o = a !== null ? a.memoizedState : null;
          if (((s = e.memoizedState), a === null))
            if (s === null)
              if (e.stateNode === null) {
                e: {
                  (s = e.type),
                    (a = e.memoizedProps),
                    (u = u.ownerDocument || u);
                  t: switch (s) {
                    case "title":
                      (o = u.getElementsByTagName("title")[0]),
                        (!o ||
                          o[ci] ||
                          o[Dt] ||
                          o.namespaceURI === "http://www.w3.org/2000/svg" ||
                          o.hasAttribute("itemprop")) &&
                          ((o = u.createElement(s)),
                          u.head.insertBefore(
                            o,
                            u.querySelector("head > title")
                          )),
                        Ct(o, s, a),
                        (o[Dt] = e),
                        Et(o),
                        (s = o);
                      break e;
                    case "link":
                      var g = Lp("link", "href", u).get(s + (a.href || ""));
                      if (g) {
                        for (var x = 0; x < g.length; x++)
                          if (
                            ((o = g[x]),
                            o.getAttribute("href") ===
                              (a.href == null ? null : a.href) &&
                              o.getAttribute("rel") ===
                                (a.rel == null ? null : a.rel) &&
                              o.getAttribute("title") ===
                                (a.title == null ? null : a.title) &&
                              o.getAttribute("crossorigin") ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            g.splice(x, 1);
                            break t;
                          }
                      }
                      (o = u.createElement(s)),
                        Ct(o, s, a),
                        u.head.appendChild(o);
                      break;
                    case "meta":
                      if (
                        (g = Lp("meta", "content", u).get(
                          s + (a.content || "")
                        ))
                      ) {
                        for (x = 0; x < g.length; x++)
                          if (
                            ((o = g[x]),
                            o.getAttribute("content") ===
                              (a.content == null ? null : "" + a.content) &&
                              o.getAttribute("name") ===
                                (a.name == null ? null : a.name) &&
                              o.getAttribute("property") ===
                                (a.property == null ? null : a.property) &&
                              o.getAttribute("http-equiv") ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              o.getAttribute("charset") ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            g.splice(x, 1);
                            break t;
                          }
                      }
                      (o = u.createElement(s)),
                        Ct(o, s, a),
                        u.head.appendChild(o);
                      break;
                    default:
                      throw Error(r(468, s));
                  }
                  (o[Dt] = e), Et(o), (s = o);
                }
                e.stateNode = s;
              } else Hp(u, e.type, e.stateNode);
            else e.stateNode = zp(u, s, e.memoizedProps);
          else
            o !== s
              ? (o === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : o.count--,
                s === null
                  ? Hp(u, e.type, e.stateNode)
                  : zp(u, s, e.memoizedProps))
              : s === null &&
                e.stateNode !== null &&
                H0(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        if (s & 4 && e.alternate === null) {
          (u = e.stateNode), (o = e.memoizedProps);
          try {
            for (var S = u.firstChild; S; ) {
              var O = S.nextSibling,
                Q = S.nodeName;
              S[ci] ||
                Q === "HEAD" ||
                Q === "BODY" ||
                Q === "SCRIPT" ||
                Q === "STYLE" ||
                (Q === "LINK" && S.rel.toLowerCase() === "stylesheet") ||
                u.removeChild(S),
                (S = O);
            }
            for (var X = e.type, B = u.attributes; B.length; )
              u.removeAttributeNode(B[0]);
            Ct(u, X, o), (u[Dt] = e), (u[Yt] = o);
          } catch (ce) {
            Ye(e, e.return, ce);
          }
        }
      case 5:
        if (
          (vn(t, e),
          bn(e),
          s & 512 && (et || a === null || sn(a, a.return)),
          e.flags & 32)
        ) {
          u = e.stateNode;
          try {
            as(u, "");
          } catch (ce) {
            Ye(e, e.return, ce);
          }
        }
        s & 4 &&
          e.stateNode != null &&
          ((u = e.memoizedProps), H0(e, u, a !== null ? a.memoizedProps : u)),
          s & 1024 && (Go = !0);
        break;
      case 6:
        if ((vn(t, e), bn(e), s & 4)) {
          if (e.stateNode === null) throw Error(r(162));
          (s = e.memoizedProps), (a = e.stateNode);
          try {
            a.nodeValue = s;
          } catch (ce) {
            Ye(e, e.return, ce);
          }
        }
        break;
      case 3:
        if (
          ((Cu = null),
          (u = Dn),
          (Dn = Au(t.containerInfo)),
          vn(t, e),
          (Dn = u),
          bn(e),
          s & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            tr(t.containerInfo);
          } catch (ce) {
            Ye(e, e.return, ce);
          }
        Go && ((Go = !1), G0(e));
        break;
      case 4:
        (s = Dn),
          (Dn = Au(e.stateNode.containerInfo)),
          vn(t, e),
          bn(e),
          (Dn = s);
        break;
      case 12:
        vn(t, e), bn(e);
        break;
      case 13:
        vn(t, e),
          bn(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (nf = ue()),
          s & 4 &&
            ((s = e.updateQueue),
            s !== null && ((e.updateQueue = null), Xo(e, s)));
        break;
      case 22:
        if (
          (s & 512 && (et || a === null || sn(a, a.return)),
          (S = e.memoizedState !== null),
          (O = a !== null && a.memoizedState !== null),
          (Q = oa),
          (X = et),
          (oa = Q || S),
          (et = X || O),
          vn(t, e),
          (et = X),
          (oa = Q),
          bn(e),
          (t = e.stateNode),
          (t._current = e),
          (t._visibility &= -3),
          (t._visibility |= t._pendingVisibility & 2),
          s & 8192 &&
            ((t._visibility = S ? t._visibility & -2 : t._visibility | 1),
            S && ((t = oa || et), a === null || O || t || xs(e)),
            e.memoizedProps === null || e.memoizedProps.mode !== "manual"))
        )
          e: for (a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26 || t.tag === 27) {
              if (a === null) {
                O = a = t;
                try {
                  if (((u = O.stateNode), S))
                    (o = u.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none");
                  else {
                    (g = O.stateNode), (x = O.memoizedProps.style);
                    var F =
                      x != null && x.hasOwnProperty("display")
                        ? x.display
                        : null;
                    g.style.display =
                      F == null || typeof F == "boolean" ? "" : ("" + F).trim();
                  }
                } catch (ce) {
                  Ye(O, O.return, ce);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                O = t;
                try {
                  O.stateNode.nodeValue = S ? "" : O.memoizedProps;
                } catch (ce) {
                  Ye(O, O.return, ce);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              a === t && (a = null), (t = t.return);
            }
            a === t && (a = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        s & 4 &&
          ((s = e.updateQueue),
          s !== null &&
            ((a = s.retryQueue),
            a !== null && ((s.retryQueue = null), Xo(e, a))));
        break;
      case 19:
        vn(t, e),
          bn(e),
          s & 4 &&
            ((s = e.updateQueue),
            s !== null && ((e.updateQueue = null), Xo(e, s)));
        break;
      case 21:
        break;
      default:
        vn(t, e), bn(e);
    }
  }
  function bn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        if (e.tag !== 27) {
          e: {
            for (var a = e.return; a !== null; ) {
              if (B0(a)) {
                var s = a;
                break e;
              }
              a = a.return;
            }
            throw Error(r(160));
          }
          switch (s.tag) {
            case 27:
              var u = s.stateNode,
                o = Po(e);
              hu(e, o, u);
              break;
            case 5:
              var g = s.stateNode;
              s.flags & 32 && (as(g, ""), (s.flags &= -33));
              var x = Po(e);
              hu(e, x, g);
              break;
            case 3:
            case 4:
              var S = s.stateNode.containerInfo,
                O = Po(e);
              Yo(e, O, S);
              break;
            default:
              throw Error(r(161));
          }
        }
      } catch (Q) {
        Ye(e, e.return, Q);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function G0(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        G0(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling);
      }
  }
  function da(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) k0(e, t.alternate, t), (t = t.sibling);
  }
  function xs(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Va(4, t, t.return), xs(t);
          break;
        case 1:
          sn(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && z0(t, t.return, a),
            xs(t);
          break;
        case 26:
        case 27:
        case 5:
          sn(t, t.return), xs(t);
          break;
        case 22:
          sn(t, t.return), t.memoizedState === null && xs(t);
          break;
        default:
          xs(t);
      }
      e = e.sibling;
    }
  }
  function qa(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var s = t.alternate,
        u = e,
        o = t,
        g = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          qa(u, o, a), Hi(4, o);
          break;
        case 1:
          if (
            (qa(u, o, a),
            (s = o),
            (u = s.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (O) {
              Ye(s, s.return, O);
            }
          if (((s = o), (u = s.updateQueue), u !== null)) {
            var x = s.stateNode;
            try {
              var S = u.shared.hiddenCallbacks;
              if (S !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < S.length; u++)
                  D0(S[u], x);
            } catch (O) {
              Ye(s, s.return, O);
            }
          }
          a && g & 64 && U0(o), Ol(o, o.return);
          break;
        case 26:
        case 27:
        case 5:
          qa(u, o, a), a && s === null && g & 4 && L0(o), Ol(o, o.return);
          break;
        case 12:
          qa(u, o, a);
          break;
        case 13:
          qa(u, o, a), a && g & 4 && P0(u, o);
          break;
        case 22:
          o.memoizedState === null && qa(u, o, a), Ol(o, o.return);
          break;
        default:
          qa(u, o, a);
      }
      t = t.sibling;
    }
  }
  function Zo(e, t) {
    var a = null;
    e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && Ni(a));
  }
  function Ko(e, t) {
    (e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Ni(e));
  }
  function ka(e, t, a, s) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) X0(e, t, a, s), (t = t.sibling);
  }
  function X0(e, t, a, s) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ka(e, t, a, s), u & 2048 && Hi(9, t);
        break;
      case 3:
        ka(e, t, a, s),
          u & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Ni(e)));
        break;
      case 12:
        if (u & 2048) {
          ka(e, t, a, s), (e = t.stateNode);
          try {
            var o = t.memoizedProps,
              g = o.id,
              x = o.onPostCommit;
            typeof x == "function" &&
              x(
                g,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (S) {
            Ye(t, t.return, S);
          }
        } else ka(e, t, a, s);
        break;
      case 23:
        break;
      case 22:
        (o = t.stateNode),
          t.memoizedState !== null
            ? o._visibility & 4
              ? ka(e, t, a, s)
              : Bi(e, t)
            : o._visibility & 4
            ? ka(e, t, a, s)
            : ((o._visibility |= 4),
              Ss(e, t, a, s, (t.subtreeFlags & 10256) !== 0)),
          u & 2048 && Zo(t.alternate, t);
        break;
      case 24:
        ka(e, t, a, s), u & 2048 && Ko(t.alternate, t);
        break;
      default:
        ka(e, t, a, s);
    }
  }
  function Ss(e, t, a, s, u) {
    for (u = u && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var o = e,
        g = t,
        x = a,
        S = s,
        O = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          Ss(o, g, x, S, u), Hi(8, g);
          break;
        case 23:
          break;
        case 22:
          var Q = g.stateNode;
          g.memoizedState !== null
            ? Q._visibility & 4
              ? Ss(o, g, x, S, u)
              : Bi(o, g)
            : ((Q._visibility |= 4), Ss(o, g, x, S, u)),
            u && O & 2048 && Zo(g.alternate, g);
          break;
        case 24:
          Ss(o, g, x, S, u), u && O & 2048 && Ko(g.alternate, g);
          break;
        default:
          Ss(o, g, x, S, u);
      }
      t = t.sibling;
    }
  }
  function Bi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          s = t,
          u = s.flags;
        switch (s.tag) {
          case 22:
            Bi(a, s), u & 2048 && Zo(s.alternate, s);
            break;
          case 24:
            Bi(a, s), u & 2048 && Ko(s.alternate, s);
            break;
          default:
            Bi(a, s);
        }
        t = t.sibling;
      }
  }
  var Vi = 8192;
  function ws(e) {
    if (e.subtreeFlags & Vi)
      for (e = e.child; e !== null; ) Z0(e), (e = e.sibling);
  }
  function Z0(e) {
    switch (e.tag) {
      case 26:
        ws(e),
          e.flags & Vi &&
            e.memoizedState !== null &&
            X2(Dn, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        ws(e);
        break;
      case 3:
      case 4:
        var t = Dn;
        (Dn = Au(e.stateNode.containerInfo)), ws(e), (Dn = t);
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = Vi), (Vi = 16777216), ws(e), (Vi = t))
            : ws(e));
        break;
      default:
        ws(e);
    }
  }
  function K0(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do (t = e.sibling), (e.sibling = null), (e = t);
      while (e !== null);
    }
  }
  function qi(e) {
    var t = e.deletions;
    if (e.flags & 16) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var s = t[a];
          (Rt = s), J0(s, e);
        }
      K0(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) $0(e), (e = e.sibling);
  }
  function $0(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        qi(e), e.flags & 2048 && Va(9, e, e.return);
        break;
      case 3:
        qi(e);
        break;
      case 12:
        qi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 4 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -5), mu(e))
          : qi(e);
        break;
      default:
        qi(e);
    }
  }
  function mu(e) {
    var t = e.deletions;
    if (e.flags & 16) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var s = t[a];
          (Rt = s), J0(s, e);
        }
      K0(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          Va(8, t, t.return), mu(t);
          break;
        case 22:
          (a = t.stateNode),
            a._visibility & 4 && ((a._visibility &= -5), mu(t));
          break;
        default:
          mu(t);
      }
      e = e.sibling;
    }
  }
  function J0(e, t) {
    for (; Rt !== null; ) {
      var a = Rt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Va(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var s = a.memoizedState.cachePool.pool;
            s != null && s.refCount++;
          }
          break;
        case 24:
          Ni(a.memoizedState.cache);
      }
      if (((s = a.child), s !== null)) (s.return = a), (Rt = s);
      else
        e: for (a = e; Rt !== null; ) {
          s = Rt;
          var u = s.sibling,
            o = s.return;
          if ((F0(s), s === a)) {
            Rt = null;
            break e;
          }
          if (u !== null) {
            (u.return = o), (Rt = u);
            break e;
          }
          Rt = o;
        }
    }
  }
  function i2(e, t, a, s) {
    (this.tag = e),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = s),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function xn(e, t, a, s) {
    return new i2(e, t, a, s);
  }
  function $o(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function Fa(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = xn(e.tag, t, e.key, e.mode)),
          (a.elementType = e.elementType),
          (a.type = e.type),
          (a.stateNode = e.stateNode),
          (a.alternate = e),
          (e.alternate = a))
        : ((a.pendingProps = t),
          (a.type = e.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = e.flags & 31457280),
      (a.childLanes = e.childLanes),
      (a.lanes = e.lanes),
      (a.child = e.child),
      (a.memoizedProps = e.memoizedProps),
      (a.memoizedState = e.memoizedState),
      (a.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (a.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (a.sibling = e.sibling),
      (a.index = e.index),
      (a.ref = e.ref),
      (a.refCleanup = e.refCleanup),
      a
    );
  }
  function W0(e, t) {
    e.flags &= 31457282;
    var a = e.alternate;
    return (
      a === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = a.childLanes),
          (e.lanes = a.lanes),
          (e.child = a.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = a.memoizedProps),
          (e.memoizedState = a.memoizedState),
          (e.updateQueue = a.updateQueue),
          (e.type = a.type),
          (t = a.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function pu(e, t, a, s, u, o) {
    var g = 0;
    if (((s = e), typeof e == "function")) $o(e) && (g = 1);
    else if (typeof e == "string")
      g = Y2(e, a, tn.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
        ? 27
        : 5;
    else
      e: switch (e) {
        case p:
          return Dl(a.children, u, o, t);
        case m:
          (g = 8), (u |= 24);
          break;
        case v:
          return (
            (e = xn(12, a, t, u | 2)), (e.elementType = v), (e.lanes = o), e
          );
        case D:
          return (e = xn(13, a, t, u)), (e.elementType = D), (e.lanes = o), e;
        case T:
          return (e = xn(19, a, t, u)), (e.elementType = T), (e.lanes = o), e;
        case V:
          return I0(a, u, o, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case b:
              case j:
                g = 10;
                break e;
              case E:
                g = 9;
                break e;
              case _:
                g = 11;
                break e;
              case U:
                g = 14;
                break e;
              case L:
                (g = 16), (s = null);
                break e;
            }
          (g = 29),
            (a = Error(r(130, e === null ? "null" : typeof e, ""))),
            (s = null);
      }
    return (
      (t = xn(g, a, t, u)), (t.elementType = e), (t.type = s), (t.lanes = o), t
    );
  }
  function Dl(e, t, a, s) {
    return (e = xn(7, e, s, t)), (e.lanes = a), e;
  }
  function I0(e, t, a, s) {
    (e = xn(22, e, s, t)), (e.elementType = V), (e.lanes = a);
    var u = {
      _visibility: 1,
      _pendingVisibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null,
      _current: null,
      detach: function () {
        var o = u._current;
        if (o === null) throw Error(r(456));
        if (!(u._pendingVisibility & 2)) {
          var g = Ca(o, 2);
          g !== null && ((u._pendingVisibility |= 2), Vt(g, o, 2));
        }
      },
      attach: function () {
        var o = u._current;
        if (o === null) throw Error(r(456));
        if (u._pendingVisibility & 2) {
          var g = Ca(o, 2);
          g !== null && ((u._pendingVisibility &= -3), Vt(g, o, 2));
        }
      },
    };
    return (e.stateNode = u), e;
  }
  function Jo(e, t, a) {
    return (e = xn(6, e, null, t)), (e.lanes = a), e;
  }
  function Wo(e, t, a) {
    return (
      (t = xn(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function ha(e) {
    e.flags |= 4;
  }
  function ep(e, t) {
    if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Bp(t))) {
      if (
        ((t = gn.current),
        t !== null &&
          ((Ue & 4194176) === Ue
            ? Qn !== null
            : ((Ue & 62914560) !== Ue && !(Ue & 536870912)) || t !== Qn))
      )
        throw ((_i = no), gm);
      e.flags |= 8192;
    }
  }
  function yu(e, t) {
    t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? vh() : 536870912), (e.lanes |= t), (_s |= t));
  }
  function ki(e, t) {
    if (!Be)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), (t = t.sibling);
          a === null ? (e.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = e.tail;
          for (var s = null; a !== null; )
            a.alternate !== null && (s = a), (a = a.sibling);
          s === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (s.sibling = null);
      }
  }
  function We(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      s = 0;
    if (t)
      for (var u = e.child; u !== null; )
        (a |= u.lanes | u.childLanes),
          (s |= u.subtreeFlags & 31457280),
          (s |= u.flags & 31457280),
          (u.return = e),
          (u = u.sibling);
    else
      for (u = e.child; u !== null; )
        (a |= u.lanes | u.childLanes),
          (s |= u.subtreeFlags),
          (s |= u.flags),
          (u.return = e),
          (u = u.sibling);
    return (e.subtreeFlags |= s), (e.childLanes = a), t;
  }
  function r2(e, t, a) {
    var s = t.pendingProps;
    switch ((eo(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return We(t), null;
      case 1:
        return We(t), null;
      case 3:
        return (
          (a = t.stateNode),
          (s = null),
          e !== null && (s = e.memoizedState.cache),
          t.memoizedState.cache !== s && (t.flags |= 2048),
          ca(bt),
          hl(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (xi(t)
              ? ha(t)
              : e === null ||
                (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                ((t.flags |= 1024), On !== null && (rf(On), (On = null)))),
          We(t),
          null
        );
      case 26:
        return (
          (a = t.memoizedState),
          e === null
            ? (ha(t),
              a !== null ? (We(t), ep(t, a)) : (We(t), (t.flags &= -16777217)))
            : a
            ? a !== e.memoizedState
              ? (ha(t), We(t), ep(t, a))
              : (We(t), (t.flags &= -16777217))
            : (e.memoizedProps !== s && ha(t), We(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        N(t), (a = Tn.current);
        var u = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== s && ha(t);
        else {
          if (!s) {
            if (t.stateNode === null) throw Error(r(166));
            return We(t), null;
          }
          (e = tn.current),
            xi(t) ? pm(t) : ((e = Cp(u, s, a)), (t.stateNode = e), ha(t));
        }
        return We(t), null;
      case 5:
        if ((N(t), (a = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== s && ha(t);
        else {
          if (!s) {
            if (t.stateNode === null) throw Error(r(166));
            return We(t), null;
          }
          if (((e = tn.current), xi(t))) pm(t);
          else {
            switch (((u = Nu(Tn.current)), e)) {
              case 1:
                e = u.createElementNS("http://www.w3.org/2000/svg", a);
                break;
              case 2:
                e = u.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                break;
              default:
                switch (a) {
                  case "svg":
                    e = u.createElementNS("http://www.w3.org/2000/svg", a);
                    break;
                  case "math":
                    e = u.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    (e = u.createElement("div")),
                      (e.innerHTML = "<script></script>"),
                      (e = e.removeChild(e.firstChild));
                    break;
                  case "select":
                    (e =
                      typeof s.is == "string"
                        ? u.createElement("select", { is: s.is })
                        : u.createElement("select")),
                      s.multiple
                        ? (e.multiple = !0)
                        : s.size && (e.size = s.size);
                    break;
                  default:
                    e =
                      typeof s.is == "string"
                        ? u.createElement(a, { is: s.is })
                        : u.createElement(a);
                }
            }
            (e[Dt] = t), (e[Yt] = s);
            e: for (u = t.child; u !== null; ) {
              if (u.tag === 5 || u.tag === 6) e.appendChild(u.stateNode);
              else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                (u.child.return = u), (u = u.child);
                continue;
              }
              if (u === t) break e;
              for (; u.sibling === null; ) {
                if (u.return === null || u.return === t) break e;
                u = u.return;
              }
              (u.sibling.return = u.return), (u = u.sibling);
            }
            t.stateNode = e;
            e: switch ((Ct(e, a, s), a)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!s.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && ha(t);
          }
        }
        return We(t), (t.flags &= -16777217), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== s && ha(t);
        else {
          if (typeof s != "string" && t.stateNode === null) throw Error(r(166));
          if (((e = Tn.current), xi(t))) {
            if (
              ((e = t.stateNode),
              (a = t.memoizedProps),
              (s = null),
              (u = Bt),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  s = u.memoizedProps;
              }
            (e[Dt] = t),
              (e = !!(
                e.nodeValue === a ||
                (s !== null && s.suppressHydrationWarning === !0) ||
                _p(e.nodeValue, a)
              )),
              e || wl(t);
          } else (e = Nu(e).createTextNode(s)), (e[Dt] = t), (t.stateNode = e);
        }
        return We(t), null;
      case 13:
        if (
          ((s = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((u = xi(t)), s !== null && s.dehydrated !== null)) {
            if (e === null) {
              if (!u) throw Error(r(318));
              if (
                ((u = t.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(r(317));
              u[Dt] = t;
            } else
              Si(),
                !(t.flags & 128) && (t.memoizedState = null),
                (t.flags |= 4);
            We(t), (u = !1);
          } else On !== null && (rf(On), (On = null)), (u = !0);
          if (!u) return t.flags & 256 ? (sa(t), t) : (sa(t), null);
        }
        if ((sa(t), t.flags & 128)) return (t.lanes = a), t;
        if (
          ((a = s !== null), (e = e !== null && e.memoizedState !== null), a)
        ) {
          (s = t.child),
            (u = null),
            s.alternate !== null &&
              s.alternate.memoizedState !== null &&
              s.alternate.memoizedState.cachePool !== null &&
              (u = s.alternate.memoizedState.cachePool.pool);
          var o = null;
          s.memoizedState !== null &&
            s.memoizedState.cachePool !== null &&
            (o = s.memoizedState.cachePool.pool),
            o !== u && (s.flags |= 2048);
        }
        return (
          a !== e && a && (t.child.flags |= 8192),
          yu(t, t.updateQueue),
          We(t),
          null
        );
      case 4:
        return hl(), e === null && vf(t.stateNode.containerInfo), We(t), null;
      case 10:
        return ca(t.type), We(t), null;
      case 19:
        if ((Je(vt), (u = t.memoizedState), u === null)) return We(t), null;
        if (((s = (t.flags & 128) !== 0), (o = u.rendering), o === null))
          if (s) ki(u, !1);
          else {
            if (tt !== 0 || (e !== null && e.flags & 128))
              for (e = t.child; e !== null; ) {
                if (((o = Ir(e)), o !== null)) {
                  for (
                    t.flags |= 128,
                      ki(u, !1),
                      e = o.updateQueue,
                      t.updateQueue = e,
                      yu(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;

                  )
                    W0(a, e), (a = a.sibling);
                  return Ge(vt, (vt.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            u.tail !== null &&
              ue() > gu &&
              ((t.flags |= 128), (s = !0), ki(u, !1), (t.lanes = 4194304));
          }
        else {
          if (!s)
            if (((e = Ir(o)), e !== null)) {
              if (
                ((t.flags |= 128),
                (s = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                yu(t, e),
                ki(u, !0),
                u.tail === null &&
                  u.tailMode === "hidden" &&
                  !o.alternate &&
                  !Be)
              )
                return We(t), null;
            } else
              2 * ue() - u.renderingStartTime > gu &&
                a !== 536870912 &&
                ((t.flags |= 128), (s = !0), ki(u, !1), (t.lanes = 4194304));
          u.isBackwards
            ? ((o.sibling = t.child), (t.child = o))
            : ((e = u.last),
              e !== null ? (e.sibling = o) : (t.child = o),
              (u.last = o));
        }
        return u.tail !== null
          ? ((t = u.tail),
            (u.rendering = t),
            (u.tail = t.sibling),
            (u.renderingStartTime = ue()),
            (t.sibling = null),
            (e = vt.current),
            Ge(vt, s ? (e & 1) | 2 : e & 1),
            t)
          : (We(t), null);
      case 22:
      case 23:
        return (
          sa(t),
          lo(),
          (s = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== s && (t.flags |= 8192)
            : s && (t.flags |= 8192),
          s
            ? a & 536870912 &&
              !(t.flags & 128) &&
              (We(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : We(t),
          (a = t.updateQueue),
          a !== null && yu(t, a.retryQueue),
          (a = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          (s = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (s = t.memoizedState.cachePool.pool),
          s !== a && (t.flags |= 2048),
          e !== null && Je(_l),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          ca(bt),
          We(t),
          null
        );
      case 25:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function u2(e, t) {
    switch ((eo(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          ca(bt),
          hl(),
          (e = t.flags),
          e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return N(t), null;
      case 13:
        if (
          (sa(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(r(340));
          Si();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return Je(vt), null;
      case 4:
        return hl(), null;
      case 10:
        return ca(t.type), null;
      case 22:
      case 23:
        return (
          sa(t),
          lo(),
          e !== null && Je(_l),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return ca(bt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function tp(e, t) {
    switch ((eo(t), t.tag)) {
      case 3:
        ca(bt), hl();
        break;
      case 26:
      case 27:
      case 5:
        N(t);
        break;
      case 4:
        hl();
        break;
      case 13:
        sa(t);
        break;
      case 19:
        Je(vt);
        break;
      case 10:
        ca(t.type);
        break;
      case 22:
      case 23:
        sa(t), lo(), e !== null && Je(_l);
        break;
      case 24:
        ca(bt);
    }
  }
  var c2 = {
      getCacheForType: function (e) {
        var t = Mt(bt),
          a = t.data.get(e);
        return a === void 0 && ((a = e()), t.data.set(e, a)), a;
      },
    },
    o2 = typeof WeakMap == "function" ? WeakMap : Map,
    Ie = 0,
    Xe = null,
    Te = null,
    Ue = 0,
    Ze = 0,
    un = null,
    ma = !1,
    Es = !1,
    Io = !1,
    pa = 0,
    tt = 0,
    Qa = 0,
    Ml = 0,
    ef = 0,
    Sn = 0,
    _s = 0,
    Fi = null,
    Yn = null,
    tf = !1,
    nf = 0,
    gu = 1 / 0,
    vu = null,
    Pa = null,
    bu = !1,
    Ul = null,
    Qi = 0,
    af = 0,
    lf = null,
    Pi = 0,
    sf = null;
  function cn() {
    if (Ie & 2 && Ue !== 0) return Ue & -Ue;
    if (G.T !== null) {
      var e = ps;
      return e !== 0 ? e : mf();
    }
    return wh();
  }
  function np() {
    Sn === 0 && (Sn = !(Ue & 536870912) || Be ? gh() : 536870912);
    var e = gn.current;
    return e !== null && (e.flags |= 32), Sn;
  }
  function Vt(e, t, a) {
    ((e === Xe && Ze === 2) || e.cancelPendingCommit !== null) &&
      (Rs(e, 0), ya(e, Ue, Sn, !1)),
      ui(e, a),
      (!(Ie & 2) || e !== Xe) &&
        (e === Xe && (!(Ie & 2) && (Ml |= a), tt === 4 && ya(e, Ue, Sn, !1)),
        Gn(e));
  }
  function ap(e, t, a) {
    if (Ie & 6) throw Error(r(327));
    var s = (!a && (t & 60) === 0 && (t & e.expiredLanes) === 0) || ri(e, t),
      u = s ? h2(e, t) : of(e, t, !0),
      o = s;
    do {
      if (u === 0) {
        Es && !s && ya(e, t, 0, !1);
        break;
      } else if (u === 6) ya(e, t, 0, !ma);
      else {
        if (((a = e.current.alternate), o && !f2(a))) {
          (u = of(e, t, !1)), (o = !1);
          continue;
        }
        if (u === 2) {
          if (((o = t), e.errorRecoveryDisabledLanes & o)) var g = 0;
          else
            (g = e.pendingLanes & -536870913),
              (g = g !== 0 ? g : g & 536870912 ? 536870912 : 0);
          if (g !== 0) {
            t = g;
            e: {
              var x = e;
              u = Fi;
              var S = x.current.memoizedState.isDehydrated;
              if ((S && (Rs(x, g).flags |= 256), (g = of(x, g, !1)), g !== 2)) {
                if (Io && !S) {
                  (x.errorRecoveryDisabledLanes |= o), (Ml |= o), (u = 4);
                  break e;
                }
                (o = Yn), (Yn = u), o !== null && rf(o);
              }
              u = g;
            }
            if (((o = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          Rs(e, 0), ya(e, t, 0, !0);
          break;
        }
        e: {
          switch (((s = e), u)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194176) === t) {
                ya(s, t, Sn, !ma);
                break e;
              }
              break;
            case 2:
              Yn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if (
            ((s.finishedWork = a),
            (s.finishedLanes = t),
            (t & 62914560) === t && ((o = nf + 300 - ue()), 10 < o))
          ) {
            if ((ya(s, t, Sn, !ma), Dr(s, 0) !== 0)) break e;
            s.timeoutHandle = Np(
              lp.bind(null, s, a, Yn, vu, tf, t, Sn, Ml, _s, ma, 2, -0, 0),
              o
            );
            break e;
          }
          lp(s, a, Yn, vu, tf, t, Sn, Ml, _s, ma, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    Gn(e);
  }
  function rf(e) {
    Yn === null ? (Yn = e) : Yn.push.apply(Yn, e);
  }
  function lp(e, t, a, s, u, o, g, x, S, O, Q, X, B) {
    var F = t.subtreeFlags;
    if (
      (F & 8192 || (F & 16785408) === 16785408) &&
      (($i = { stylesheets: null, count: 0, unsuspend: G2 }),
      Z0(t),
      (t = Z2()),
      t !== null)
    ) {
      (e.cancelPendingCommit = t(fp.bind(null, e, a, s, u, g, x, S, 1, X, B))),
        ya(e, o, g, !O);
      return;
    }
    fp(e, a, s, u, g, x, S, Q, X, B);
  }
  function f2(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var s = 0; s < a.length; s++) {
          var u = a[s],
            o = u.getSnapshot;
          u = u.value;
          try {
            if (!ln(o(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = t.child), t.subtreeFlags & 16384 && a !== null))
        (a.return = t), (t = a);
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
  function ya(e, t, a, s) {
    (t &= ~ef),
      (t &= ~Ml),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      s && (e.warmLanes |= t),
      (s = e.expirationTimes);
    for (var u = t; 0 < u; ) {
      var o = 31 - an(u),
        g = 1 << o;
      (s[o] = -1), (u &= ~g);
    }
    a !== 0 && bh(e, a, t);
  }
  function xu() {
    return Ie & 6 ? !0 : (Yi(0), !1);
  }
  function uf() {
    if (Te !== null) {
      if (Ze === 0) var e = Te.return;
      else (e = Te), (ua = Tl = null), ho(e), (hs = null), (Ri = 0), (e = Te);
      for (; e !== null; ) tp(e.alternate, e), (e = e.return);
      Te = null;
    }
  }
  function Rs(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var a = e.timeoutHandle;
    a !== -1 && ((e.timeoutHandle = -1), C2(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      uf(),
      (Xe = e),
      (Te = a = Fa(e.current, null)),
      (Ue = t),
      (Ze = 0),
      (un = null),
      (ma = !1),
      (Es = ri(e, t)),
      (Io = !1),
      (_s = Sn = ef = Ml = Qa = tt = 0),
      (Yn = Fi = null),
      (tf = !1),
      t & 8 && (t |= t & 32);
    var s = e.entangledLanes;
    if (s !== 0)
      for (e = e.entanglements, s &= t; 0 < s; ) {
        var u = 31 - an(s),
          o = 1 << u;
        (t |= e[u]), (s &= ~o);
      }
    return (pa = t), Pr(), a;
  }
  function sp(e, t) {
    (Ne = null),
      (G.H = Pn),
      t === Ei
        ? ((t = xm()), (Ze = 3))
        : t === gm
        ? ((t = xm()), (Ze = 4))
        : (Ze =
            t === v0
              ? 8
              : t !== null &&
                typeof t == "object" &&
                typeof t.then == "function"
              ? 6
              : 1),
      (un = t),
      Te === null && ((tt = 1), ou(e, mn(t, e.current)));
  }
  function ip() {
    var e = G.H;
    return (G.H = Pn), e === null ? Pn : e;
  }
  function rp() {
    var e = G.A;
    return (G.A = c2), e;
  }
  function cf() {
    (tt = 4),
      ma || ((Ue & 4194176) !== Ue && gn.current !== null) || (Es = !0),
      (!(Qa & 134217727) && !(Ml & 134217727)) ||
        Xe === null ||
        ya(Xe, Ue, Sn, !1);
  }
  function of(e, t, a) {
    var s = Ie;
    Ie |= 2;
    var u = ip(),
      o = rp();
    (Xe !== e || Ue !== t) && ((vu = null), Rs(e, t)), (t = !1);
    var g = tt;
    e: do
      try {
        if (Ze !== 0 && Te !== null) {
          var x = Te,
            S = un;
          switch (Ze) {
            case 8:
              uf(), (g = 6);
              break e;
            case 3:
            case 2:
            case 6:
              gn.current === null && (t = !0);
              var O = Ze;
              if (((Ze = 0), (un = null), js(e, x, S, O), a && Es)) {
                g = 0;
                break e;
              }
              break;
            default:
              (O = Ze), (Ze = 0), (un = null), js(e, x, S, O);
          }
        }
        d2(), (g = tt);
        break;
      } catch (Q) {
        sp(e, Q);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (ua = Tl = null),
      (Ie = s),
      (G.H = u),
      (G.A = o),
      Te === null && ((Xe = null), (Ue = 0), Pr()),
      g
    );
  }
  function d2() {
    for (; Te !== null; ) up(Te);
  }
  function h2(e, t) {
    var a = Ie;
    Ie |= 2;
    var s = ip(),
      u = rp();
    Xe !== e || Ue !== t
      ? ((vu = null), (gu = ue() + 500), Rs(e, t))
      : (Es = ri(e, t));
    e: do
      try {
        if (Ze !== 0 && Te !== null) {
          t = Te;
          var o = un;
          t: switch (Ze) {
            case 1:
              (Ze = 0), (un = null), js(e, t, o, 1);
              break;
            case 2:
              if (vm(o)) {
                (Ze = 0), (un = null), cp(t);
                break;
              }
              (t = function () {
                Ze === 2 && Xe === e && (Ze = 7), Gn(e);
              }),
                o.then(t, t);
              break e;
            case 3:
              Ze = 7;
              break e;
            case 4:
              Ze = 5;
              break e;
            case 7:
              vm(o)
                ? ((Ze = 0), (un = null), cp(t))
                : ((Ze = 0), (un = null), js(e, t, o, 7));
              break;
            case 5:
              var g = null;
              switch (Te.tag) {
                case 26:
                  g = Te.memoizedState;
                case 5:
                case 27:
                  var x = Te;
                  if (!g || Bp(g)) {
                    (Ze = 0), (un = null);
                    var S = x.sibling;
                    if (S !== null) Te = S;
                    else {
                      var O = x.return;
                      O !== null ? ((Te = O), Su(O)) : (Te = null);
                    }
                    break t;
                  }
              }
              (Ze = 0), (un = null), js(e, t, o, 5);
              break;
            case 6:
              (Ze = 0), (un = null), js(e, t, o, 6);
              break;
            case 8:
              uf(), (tt = 6);
              break e;
            default:
              throw Error(r(462));
          }
        }
        m2();
        break;
      } catch (Q) {
        sp(e, Q);
      }
    while (!0);
    return (
      (ua = Tl = null),
      (G.H = s),
      (G.A = u),
      (Ie = a),
      Te !== null ? 0 : ((Xe = null), (Ue = 0), Pr(), tt)
    );
  }
  function m2() {
    for (; Te !== null && !J(); ) up(Te);
  }
  function up(e) {
    var t = C0(e.alternate, e, pa);
    (e.memoizedProps = e.pendingProps), t === null ? Su(e) : (Te = t);
  }
  function cp(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = _0(a, t, t.pendingProps, t.type, void 0, Ue);
        break;
      case 11:
        t = _0(a, t, t.pendingProps, t.type.render, t.ref, Ue);
        break;
      case 5:
        ho(t);
      default:
        tp(a, t), (t = Te = W0(t, pa)), (t = C0(a, t, pa));
    }
    (e.memoizedProps = e.pendingProps), t === null ? Su(e) : (Te = t);
  }
  function js(e, t, a, s) {
    (ua = Tl = null), ho(t), (hs = null), (Ri = 0);
    var u = t.return;
    try {
      if (n2(e, u, t, a, Ue)) {
        (tt = 1), ou(e, mn(a, e.current)), (Te = null);
        return;
      }
    } catch (o) {
      if (u !== null) throw ((Te = u), o);
      (tt = 1), ou(e, mn(a, e.current)), (Te = null);
      return;
    }
    t.flags & 32768
      ? (Be || s === 1
          ? (e = !0)
          : Es || Ue & 536870912
          ? (e = !1)
          : ((ma = e = !0),
            (s === 2 || s === 3 || s === 6) &&
              ((s = gn.current),
              s !== null && s.tag === 13 && (s.flags |= 16384))),
        op(t, e))
      : Su(t);
  }
  function Su(e) {
    var t = e;
    do {
      if (t.flags & 32768) {
        op(t, ma);
        return;
      }
      e = t.return;
      var a = r2(t.alternate, t, pa);
      if (a !== null) {
        Te = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Te = t;
        return;
      }
      Te = t = e;
    } while (t !== null);
    tt === 0 && (tt = 5);
  }
  function op(e, t) {
    do {
      var a = u2(e.alternate, e);
      if (a !== null) {
        (a.flags &= 32767), (Te = a);
        return;
      }
      if (
        ((a = e.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        Te = e;
        return;
      }
      Te = e = a;
    } while (e !== null);
    (tt = 6), (Te = null);
  }
  function fp(e, t, a, s, u, o, g, x, S, O) {
    var Q = G.T,
      X = ae.p;
    try {
      (ae.p = 2), (G.T = null), p2(e, t, a, s, X, u, o, g, x, S, O);
    } finally {
      (G.T = Q), (ae.p = X);
    }
  }
  function p2(e, t, a, s, u, o, g, x) {
    do Ns();
    while (Ul !== null);
    if (Ie & 6) throw Error(r(327));
    var S = e.finishedWork;
    if (((s = e.finishedLanes), S === null)) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), S === e.current))
      throw Error(r(177));
    (e.callbackNode = null),
      (e.callbackPriority = 0),
      (e.cancelPendingCommit = null);
    var O = S.lanes | S.childLanes;
    if (
      ((O |= Jc),
      Xg(e, s, O, o, g, x),
      e === Xe && ((Te = Xe = null), (Ue = 0)),
      (!(S.subtreeFlags & 10256) && !(S.flags & 10256)) ||
        bu ||
        ((bu = !0),
        (af = O),
        (lf = a),
        b2(nn, function () {
          return Ns(), null;
        })),
      (a = (S.flags & 15990) !== 0),
      S.subtreeFlags & 15990 || a
        ? ((a = G.T),
          (G.T = null),
          (o = ae.p),
          (ae.p = 2),
          (g = Ie),
          (Ie |= 4),
          l2(e, S),
          Y0(S, e),
          Vv(wf, e.containerInfo),
          (Mu = !!Sf),
          (wf = Sf = null),
          (e.current = S),
          k0(e, S.alternate, S),
          $(),
          (Ie = g),
          (ae.p = o),
          (G.T = a))
        : (e.current = S),
      bu ? ((bu = !1), (Ul = e), (Qi = s)) : dp(e, O),
      (O = e.pendingLanes),
      O === 0 && (Pa = null),
      Tr(S.stateNode),
      Gn(e),
      t !== null)
    )
      for (u = e.onRecoverableError, S = 0; S < t.length; S++)
        (O = t[S]), u(O.value, { componentStack: O.stack });
    return (
      Qi & 3 && Ns(),
      (O = e.pendingLanes),
      s & 4194218 && O & 42
        ? e === sf
          ? Pi++
          : ((Pi = 0), (sf = e))
        : (Pi = 0),
      Yi(0),
      null
    );
  }
  function dp(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Ni(t)));
  }
  function Ns() {
    if (Ul !== null) {
      var e = Ul,
        t = af;
      af = 0;
      var a = Sh(Qi),
        s = G.T,
        u = ae.p;
      try {
        if (((ae.p = 32 > a ? 32 : a), (G.T = null), Ul === null)) var o = !1;
        else {
          (a = lf), (lf = null);
          var g = Ul,
            x = Qi;
          if (((Ul = null), (Qi = 0), Ie & 6)) throw Error(r(331));
          var S = Ie;
          if (
            ((Ie |= 4),
            $0(g.current),
            X0(g, g.current, x, a),
            (Ie = S),
            Yi(0, !1),
            Ht && typeof Ht.onPostCommitFiberRoot == "function")
          )
            try {
              Ht.onPostCommitFiberRoot(ja, g);
            } catch {}
          o = !0;
        }
        return o;
      } finally {
        (ae.p = u), (G.T = s), dp(e, t);
      }
    }
    return !1;
  }
  function hp(e, t, a) {
    (t = mn(a, t)),
      (t = No(e.stateNode, t, 2)),
      (e = Ba(e, t, 2)),
      e !== null && (ui(e, 2), Gn(e));
  }
  function Ye(e, t, a) {
    if (e.tag === 3) hp(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          hp(t, e, a);
          break;
        } else if (t.tag === 1) {
          var s = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof s.componentDidCatch == "function" &&
              (Pa === null || !Pa.has(s)))
          ) {
            (e = mn(a, e)),
              (a = y0(2)),
              (s = Ba(t, a, 2)),
              s !== null && (g0(a, s, t, e), ui(s, 2), Gn(s));
            break;
          }
        }
        t = t.return;
      }
  }
  function ff(e, t, a) {
    var s = e.pingCache;
    if (s === null) {
      s = e.pingCache = new o2();
      var u = new Set();
      s.set(t, u);
    } else (u = s.get(t)), u === void 0 && ((u = new Set()), s.set(t, u));
    u.has(a) ||
      ((Io = !0), u.add(a), (e = y2.bind(null, e, t, a)), t.then(e, e));
  }
  function y2(e, t, a) {
    var s = e.pingCache;
    s !== null && s.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Xe === e &&
        (Ue & a) === a &&
        (tt === 4 || (tt === 3 && (Ue & 62914560) === Ue && 300 > ue() - nf)
          ? !(Ie & 2) && Rs(e, 0)
          : (ef |= a),
        _s === Ue && (_s = 0)),
      Gn(e);
  }
  function mp(e, t) {
    t === 0 && (t = vh()), (e = Ca(e, t)), e !== null && (ui(e, t), Gn(e));
  }
  function g2(e) {
    var t = e.memoizedState,
      a = 0;
    t !== null && (a = t.retryLane), mp(e, a);
  }
  function v2(e, t) {
    var a = 0;
    switch (e.tag) {
      case 13:
        var s = e.stateNode,
          u = e.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        s = e.stateNode;
        break;
      case 22:
        s = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    s !== null && s.delete(t), mp(e, a);
  }
  function b2(e, t) {
    return k(e, t);
  }
  var wu = null,
    As = null,
    df = !1,
    Eu = !1,
    hf = !1,
    zl = 0;
  function Gn(e) {
    e !== As &&
      e.next === null &&
      (As === null ? (wu = As = e) : (As = As.next = e)),
      (Eu = !0),
      df || ((df = !0), S2(x2));
  }
  function Yi(e, t) {
    if (!hf && Eu) {
      hf = !0;
      do
        for (var a = !1, s = wu; s !== null; ) {
          if (e !== 0) {
            var u = s.pendingLanes;
            if (u === 0) var o = 0;
            else {
              var g = s.suspendedLanes,
                x = s.pingedLanes;
              (o = (1 << (31 - an(42 | e) + 1)) - 1),
                (o &= u & ~(g & ~x)),
                (o = o & 201326677 ? (o & 201326677) | 1 : o ? o | 2 : 0);
            }
            o !== 0 && ((a = !0), gp(s, o));
          } else
            (o = Ue),
              (o = Dr(s, s === Xe ? o : 0)),
              !(o & 3) || ri(s, o) || ((a = !0), gp(s, o));
          s = s.next;
        }
      while (a);
      hf = !1;
    }
  }
  function x2() {
    Eu = df = !1;
    var e = 0;
    zl !== 0 && (T2() && (e = zl), (zl = 0));
    for (var t = ue(), a = null, s = wu; s !== null; ) {
      var u = s.next,
        o = pp(s, t);
      o === 0
        ? ((s.next = null),
          a === null ? (wu = u) : (a.next = u),
          u === null && (As = a))
        : ((a = s), (e !== 0 || o & 3) && (Eu = !0)),
        (s = u);
    }
    Yi(e);
  }
  function pp(e, t) {
    for (
      var a = e.suspendedLanes,
        s = e.pingedLanes,
        u = e.expirationTimes,
        o = e.pendingLanes & -62914561;
      0 < o;

    ) {
      var g = 31 - an(o),
        x = 1 << g,
        S = u[g];
      S === -1
        ? (!(x & a) || x & s) && (u[g] = Gg(x, t))
        : S <= t && (e.expiredLanes |= x),
        (o &= ~x);
    }
    if (
      ((t = Xe),
      (a = Ue),
      (a = Dr(e, e === t ? a : 0)),
      (s = e.callbackNode),
      a === 0 || (e === t && Ze === 2) || e.cancelPendingCommit !== null)
    )
      return (
        s !== null && s !== null && W(s),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if (!(a & 3) || ri(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((s !== null && W(s), Sh(a))) {
        case 2:
        case 8:
          a = rt;
          break;
        case 32:
          a = nn;
          break;
        case 268435456:
          a = Jl;
          break;
        default:
          a = nn;
      }
      return (
        (s = yp.bind(null, e)),
        (a = k(a, s)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      s !== null && s !== null && W(s),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function yp(e, t) {
    var a = e.callbackNode;
    if (Ns() && e.callbackNode !== a) return null;
    var s = Ue;
    return (
      (s = Dr(e, e === Xe ? s : 0)),
      s === 0
        ? null
        : (ap(e, s, t),
          pp(e, ue()),
          e.callbackNode != null && e.callbackNode === a
            ? yp.bind(null, e)
            : null)
    );
  }
  function gp(e, t) {
    if (Ns()) return null;
    ap(e, t, !0);
  }
  function S2(e) {
    O2(function () {
      Ie & 6 ? k(it, e) : e();
    });
  }
  function mf() {
    return zl === 0 && (zl = gh()), zl;
  }
  function vp(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
      ? e
      : Hr("" + e);
  }
  function bp(e, t) {
    var a = t.ownerDocument.createElement("input");
    return (
      (a.name = t.name),
      (a.value = t.value),
      e.id && a.setAttribute("form", e.id),
      t.parentNode.insertBefore(a, t),
      (e = new FormData(e)),
      a.parentNode.removeChild(a),
      e
    );
  }
  function w2(e, t, a, s, u) {
    if (t === "submit" && a && a.stateNode === u) {
      var o = vp((u[Yt] || null).action),
        g = s.submitter;
      g &&
        ((t = (t = g[Yt] || null)
          ? vp(t.formAction)
          : g.getAttribute("formAction")),
        t !== null && ((o = t), (g = null)));
      var x = new kr("action", "action", null, s, u);
      e.push({
        event: x,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (s.defaultPrevented) {
                if (zl !== 0) {
                  var S = g ? bp(u, g) : new FormData(u);
                  wo(
                    a,
                    { pending: !0, data: S, method: u.method, action: o },
                    null,
                    S
                  );
                }
              } else
                typeof o == "function" &&
                  (x.preventDefault(),
                  (S = g ? bp(u, g) : new FormData(u)),
                  wo(
                    a,
                    { pending: !0, data: S, method: u.method, action: o },
                    o,
                    S
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var pf = 0; pf < fm.length; pf++) {
    var yf = fm[pf],
      E2 = yf.toLowerCase(),
      _2 = yf[0].toUpperCase() + yf.slice(1);
    Cn(E2, "on" + _2);
  }
  Cn(im, "onAnimationEnd"),
    Cn(rm, "onAnimationIteration"),
    Cn(um, "onAnimationStart"),
    Cn("dblclick", "onDoubleClick"),
    Cn("focusin", "onFocus"),
    Cn("focusout", "onBlur"),
    Cn(kv, "onTransitionRun"),
    Cn(Fv, "onTransitionStart"),
    Cn(Qv, "onTransitionCancel"),
    Cn(cm, "onTransitionEnd"),
    ts("onMouseEnter", ["mouseout", "mouseover"]),
    ts("onMouseLeave", ["mouseout", "mouseover"]),
    ts("onPointerEnter", ["pointerout", "pointerover"]),
    ts("onPointerLeave", ["pointerout", "pointerover"]),
    yl(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    yl(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    yl("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    yl(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    yl(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    yl(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var Gi =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    R2 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Gi)
    );
  function xp(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var s = e[a],
        u = s.event;
      s = s.listeners;
      e: {
        var o = void 0;
        if (t)
          for (var g = s.length - 1; 0 <= g; g--) {
            var x = s[g],
              S = x.instance,
              O = x.currentTarget;
            if (((x = x.listener), S !== o && u.isPropagationStopped()))
              break e;
            (o = x), (u.currentTarget = O);
            try {
              o(u);
            } catch (Q) {
              cu(Q);
            }
            (u.currentTarget = null), (o = S);
          }
        else
          for (g = 0; g < s.length; g++) {
            if (
              ((x = s[g]),
              (S = x.instance),
              (O = x.currentTarget),
              (x = x.listener),
              S !== o && u.isPropagationStopped())
            )
              break e;
            (o = x), (u.currentTarget = O);
            try {
              o(u);
            } catch (Q) {
              cu(Q);
            }
            (u.currentTarget = null), (o = S);
          }
      }
    }
  }
  function Oe(e, t) {
    var a = t[Cc];
    a === void 0 && (a = t[Cc] = new Set());
    var s = e + "__bubble";
    a.has(s) || (Sp(t, e, 2, !1), a.add(s));
  }
  function gf(e, t, a) {
    var s = 0;
    t && (s |= 4), Sp(a, e, s, t);
  }
  var _u = "_reactListening" + Math.random().toString(36).slice(2);
  function vf(e) {
    if (!e[_u]) {
      (e[_u] = !0),
        _h.forEach(function (a) {
          a !== "selectionchange" && (R2.has(a) || gf(a, !1, e), gf(a, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[_u] || ((t[_u] = !0), gf("selectionchange", !1, t));
    }
  }
  function Sp(e, t, a, s) {
    switch (Pp(t)) {
      case 2:
        var u = J2;
        break;
      case 8:
        u = W2;
        break;
      default:
        u = Of;
    }
    (a = u.bind(null, t, a, e)),
      (u = void 0),
      !Bc ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (u = !0),
      s
        ? u !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: u })
          : e.addEventListener(t, a, !0)
        : u !== void 0
        ? e.addEventListener(t, a, { passive: u })
        : e.addEventListener(t, a, !1);
  }
  function bf(e, t, a, s, u) {
    var o = s;
    if (!(t & 1) && !(t & 2) && s !== null)
      e: for (;;) {
        if (s === null) return;
        var g = s.tag;
        if (g === 3 || g === 4) {
          var x = s.stateNode.containerInfo;
          if (x === u || (x.nodeType === 8 && x.parentNode === u)) break;
          if (g === 4)
            for (g = s.return; g !== null; ) {
              var S = g.tag;
              if (
                (S === 3 || S === 4) &&
                ((S = g.stateNode.containerInfo),
                S === u || (S.nodeType === 8 && S.parentNode === u))
              )
                return;
              g = g.return;
            }
          for (; x !== null; ) {
            if (((g = pl(x)), g === null)) return;
            if (((S = g.tag), S === 5 || S === 6 || S === 26 || S === 27)) {
              s = o = g;
              continue e;
            }
            x = x.parentNode;
          }
        }
        s = s.return;
      }
    Lh(function () {
      var O = o,
        Q = Lc(a),
        X = [];
      e: {
        var B = om.get(e);
        if (B !== void 0) {
          var F = kr,
            ce = e;
          switch (e) {
            case "keypress":
              if (Vr(a) === 0) break e;
            case "keydown":
            case "keyup":
              F = vv;
              break;
            case "focusin":
              (ce = "focus"), (F = Fc);
              break;
            case "focusout":
              (ce = "blur"), (F = Fc);
              break;
            case "beforeblur":
            case "afterblur":
              F = Fc;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              F = Vh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              F = iv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              F = Sv;
              break;
            case im:
            case rm:
            case um:
              F = cv;
              break;
            case cm:
              F = Ev;
              break;
            case "scroll":
            case "scrollend":
              F = lv;
              break;
            case "wheel":
              F = Rv;
              break;
            case "copy":
            case "cut":
            case "paste":
              F = fv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              F = kh;
              break;
            case "toggle":
            case "beforetoggle":
              F = Nv;
          }
          var be = (t & 4) !== 0,
            nt = !be && (e === "scroll" || e === "scrollend"),
            M = be ? (B !== null ? B + "Capture" : null) : B;
          be = [];
          for (var C = O, z; C !== null; ) {
            var P = C;
            if (
              ((z = P.stateNode),
              (P = P.tag),
              (P !== 5 && P !== 26 && P !== 27) ||
                z === null ||
                M === null ||
                ((P = fi(C, M)), P != null && be.push(Xi(C, P, z))),
              nt)
            )
              break;
            C = C.return;
          }
          0 < be.length &&
            ((B = new F(B, ce, null, a, Q)),
            X.push({ event: B, listeners: be }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (
            ((B = e === "mouseover" || e === "pointerover"),
            (F = e === "mouseout" || e === "pointerout"),
            B &&
              a !== zc &&
              (ce = a.relatedTarget || a.fromElement) &&
              (pl(ce) || ce[Wl]))
          )
            break e;
          if (
            (F || B) &&
            ((B =
              Q.window === Q
                ? Q
                : (B = Q.ownerDocument)
                ? B.defaultView || B.parentWindow
                : window),
            F
              ? ((ce = a.relatedTarget || a.toElement),
                (F = O),
                (ce = ce ? pl(ce) : null),
                ce !== null &&
                  ((nt = me(ce)),
                  (be = ce.tag),
                  ce !== nt || (be !== 5 && be !== 27 && be !== 6)) &&
                  (ce = null))
              : ((F = null), (ce = O)),
            F !== ce)
          ) {
            if (
              ((be = Vh),
              (P = "onMouseLeave"),
              (M = "onMouseEnter"),
              (C = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((be = kh),
                (P = "onPointerLeave"),
                (M = "onPointerEnter"),
                (C = "pointer")),
              (nt = F == null ? B : oi(F)),
              (z = ce == null ? B : oi(ce)),
              (B = new be(P, C + "leave", F, a, Q)),
              (B.target = nt),
              (B.relatedTarget = z),
              (P = null),
              pl(Q) === O &&
                ((be = new be(M, C + "enter", ce, a, Q)),
                (be.target = z),
                (be.relatedTarget = nt),
                (P = be)),
              (nt = P),
              F && ce)
            )
              t: {
                for (be = F, M = ce, C = 0, z = be; z; z = Ts(z)) C++;
                for (z = 0, P = M; P; P = Ts(P)) z++;
                for (; 0 < C - z; ) (be = Ts(be)), C--;
                for (; 0 < z - C; ) (M = Ts(M)), z--;
                for (; C--; ) {
                  if (be === M || (M !== null && be === M.alternate)) break t;
                  (be = Ts(be)), (M = Ts(M));
                }
                be = null;
              }
            else be = null;
            F !== null && wp(X, B, F, be, !1),
              ce !== null && nt !== null && wp(X, nt, ce, be, !0);
          }
        }
        e: {
          if (
            ((B = O ? oi(O) : window),
            (F = B.nodeName && B.nodeName.toLowerCase()),
            F === "select" || (F === "input" && B.type === "file"))
          )
            var se = Kh;
          else if (Xh(B))
            if ($h) se = Hv;
            else {
              se = zv;
              var Ae = Uv;
            }
          else
            (F = B.nodeName),
              !F ||
              F.toLowerCase() !== "input" ||
              (B.type !== "checkbox" && B.type !== "radio")
                ? O && Uc(O.elementType) && (se = Kh)
                : (se = Lv);
          if (se && (se = se(e, O))) {
            Zh(X, se, a, Q);
            break e;
          }
          Ae && Ae(e, B, O),
            e === "focusout" &&
              O &&
              B.type === "number" &&
              O.memoizedProps.value != null &&
              Mc(B, "number", B.value);
        }
        switch (((Ae = O ? oi(O) : window), e)) {
          case "focusin":
            (Xh(Ae) || Ae.contentEditable === "true") &&
              ((rs = Ae), (Zc = O), (bi = null));
            break;
          case "focusout":
            bi = Zc = rs = null;
            break;
          case "mousedown":
            Kc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (Kc = !1), lm(X, a, Q);
            break;
          case "selectionchange":
            if (qv) break;
          case "keydown":
          case "keyup":
            lm(X, a, Q);
        }
        var fe;
        if (Pc)
          e: {
            switch (e) {
              case "compositionstart":
                var ve = "onCompositionStart";
                break e;
              case "compositionend":
                ve = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ve = "onCompositionUpdate";
                break e;
            }
            ve = void 0;
          }
        else
          is
            ? Yh(e, a) && (ve = "onCompositionEnd")
            : e === "keydown" &&
              a.keyCode === 229 &&
              (ve = "onCompositionStart");
        ve &&
          (Fh &&
            a.locale !== "ko" &&
            (is || ve !== "onCompositionStart"
              ? ve === "onCompositionEnd" && is && (fe = Hh())
              : ((Ta = Q),
                (Vc = "value" in Ta ? Ta.value : Ta.textContent),
                (is = !0))),
          (Ae = Ru(O, ve)),
          0 < Ae.length &&
            ((ve = new qh(ve, e, null, a, Q)),
            X.push({ event: ve, listeners: Ae }),
            fe
              ? (ve.data = fe)
              : ((fe = Gh(a)), fe !== null && (ve.data = fe)))),
          (fe = Tv ? Cv(e, a) : Ov(e, a)) &&
            ((ve = Ru(O, "onBeforeInput")),
            0 < ve.length &&
              ((Ae = new qh("onBeforeInput", "beforeinput", null, a, Q)),
              X.push({ event: Ae, listeners: ve }),
              (Ae.data = fe))),
          w2(X, e, O, a, Q);
      }
      xp(X, t);
    });
  }
  function Xi(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function Ru(e, t) {
    for (var a = t + "Capture", s = []; e !== null; ) {
      var u = e,
        o = u.stateNode;
      (u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          o === null ||
          ((u = fi(e, a)),
          u != null && s.unshift(Xi(e, u, o)),
          (u = fi(e, t)),
          u != null && s.push(Xi(e, u, o))),
        (e = e.return);
    }
    return s;
  }
  function Ts(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function wp(e, t, a, s, u) {
    for (var o = t._reactName, g = []; a !== null && a !== s; ) {
      var x = a,
        S = x.alternate,
        O = x.stateNode;
      if (((x = x.tag), S !== null && S === s)) break;
      (x !== 5 && x !== 26 && x !== 27) ||
        O === null ||
        ((S = O),
        u
          ? ((O = fi(a, o)), O != null && g.unshift(Xi(a, O, S)))
          : u || ((O = fi(a, o)), O != null && g.push(Xi(a, O, S)))),
        (a = a.return);
    }
    g.length !== 0 && e.push({ event: t, listeners: g });
  }
  var j2 = /\r\n?/g,
    N2 = /\u0000|\uFFFD/g;
  function Ep(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        j2,
        `
`
      )
      .replace(N2, "");
  }
  function _p(e, t) {
    return (t = Ep(t)), Ep(e) === t;
  }
  function ju() {}
  function Qe(e, t, a, s, u, o) {
    switch (a) {
      case "children":
        typeof s == "string"
          ? t === "body" || (t === "textarea" && s === "") || as(e, s)
          : (typeof s == "number" || typeof s == "bigint") &&
            t !== "body" &&
            as(e, "" + s);
        break;
      case "className":
        Ur(e, "class", s);
        break;
      case "tabIndex":
        Ur(e, "tabindex", s);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ur(e, a, s);
        break;
      case "style":
        Uh(e, s, o);
        break;
      case "data":
        if (t !== "object") {
          Ur(e, "data", s);
          break;
        }
      case "src":
      case "href":
        if (s === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (
          s == null ||
          typeof s == "function" ||
          typeof s == "symbol" ||
          typeof s == "boolean"
        ) {
          e.removeAttribute(a);
          break;
        }
        (s = Hr("" + s)), e.setAttribute(a, s);
        break;
      case "action":
      case "formAction":
        if (typeof s == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof o == "function" &&
            (a === "formAction"
              ? (t !== "input" && Qe(e, t, "name", u.name, u, null),
                Qe(e, t, "formEncType", u.formEncType, u, null),
                Qe(e, t, "formMethod", u.formMethod, u, null),
                Qe(e, t, "formTarget", u.formTarget, u, null))
              : (Qe(e, t, "encType", u.encType, u, null),
                Qe(e, t, "method", u.method, u, null),
                Qe(e, t, "target", u.target, u, null)));
        if (s == null || typeof s == "symbol" || typeof s == "boolean") {
          e.removeAttribute(a);
          break;
        }
        (s = Hr("" + s)), e.setAttribute(a, s);
        break;
      case "onClick":
        s != null && (e.onclick = ju);
        break;
      case "onScroll":
        s != null && Oe("scroll", e);
        break;
      case "onScrollEnd":
        s != null && Oe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s)) throw Error(r(61));
          if (((a = s.__html), a != null)) {
            if (u.children != null) throw Error(r(60));
            e.innerHTML = a;
          }
        }
        break;
      case "multiple":
        e.multiple = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "muted":
        e.muted = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          s == null ||
          typeof s == "function" ||
          typeof s == "boolean" ||
          typeof s == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        (a = Hr("" + s)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        s != null && typeof s != "function" && typeof s != "symbol"
          ? e.setAttribute(a, "" + s)
          : e.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        s && typeof s != "function" && typeof s != "symbol"
          ? e.setAttribute(a, "")
          : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        s === !0
          ? e.setAttribute(a, "")
          : s !== !1 &&
            s != null &&
            typeof s != "function" &&
            typeof s != "symbol"
          ? e.setAttribute(a, s)
          : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        s != null &&
        typeof s != "function" &&
        typeof s != "symbol" &&
        !isNaN(s) &&
        1 <= s
          ? e.setAttribute(a, s)
          : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        s == null || typeof s == "function" || typeof s == "symbol" || isNaN(s)
          ? e.removeAttribute(a)
          : e.setAttribute(a, s);
        break;
      case "popover":
        Oe("beforetoggle", e), Oe("toggle", e), Mr(e, "popover", s);
        break;
      case "xlinkActuate":
        na(e, "http://www.w3.org/1999/xlink", "xlink:actuate", s);
        break;
      case "xlinkArcrole":
        na(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", s);
        break;
      case "xlinkRole":
        na(e, "http://www.w3.org/1999/xlink", "xlink:role", s);
        break;
      case "xlinkShow":
        na(e, "http://www.w3.org/1999/xlink", "xlink:show", s);
        break;
      case "xlinkTitle":
        na(e, "http://www.w3.org/1999/xlink", "xlink:title", s);
        break;
      case "xlinkType":
        na(e, "http://www.w3.org/1999/xlink", "xlink:type", s);
        break;
      case "xmlBase":
        na(e, "http://www.w3.org/XML/1998/namespace", "xml:base", s);
        break;
      case "xmlLang":
        na(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", s);
        break;
      case "xmlSpace":
        na(e, "http://www.w3.org/XML/1998/namespace", "xml:space", s);
        break;
      case "is":
        Mr(e, "is", s);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== "o" && a[0] !== "O") ||
          (a[1] !== "n" && a[1] !== "N")) &&
          ((a = nv.get(a) || a), Mr(e, a, s));
    }
  }
  function xf(e, t, a, s, u, o) {
    switch (a) {
      case "style":
        Uh(e, s, o);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s)) throw Error(r(61));
          if (((a = s.__html), a != null)) {
            if (u.children != null) throw Error(r(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof s == "string"
          ? as(e, s)
          : (typeof s == "number" || typeof s == "bigint") && as(e, "" + s);
        break;
      case "onScroll":
        s != null && Oe("scroll", e);
        break;
      case "onScrollEnd":
        s != null && Oe("scrollend", e);
        break;
      case "onClick":
        s != null && (e.onclick = ju);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Rh.hasOwnProperty(a))
          e: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((u = a.endsWith("Capture")),
              (t = a.slice(2, u ? a.length - 7 : void 0)),
              (o = e[Yt] || null),
              (o = o != null ? o[a] : null),
              typeof o == "function" && e.removeEventListener(t, o, u),
              typeof s == "function")
            ) {
              typeof o != "function" &&
                o !== null &&
                (a in e
                  ? (e[a] = null)
                  : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, s, u);
              break e;
            }
            a in e
              ? (e[a] = s)
              : s === !0
              ? e.setAttribute(a, "")
              : Mr(e, a, s);
          }
    }
  }
  function Ct(e, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Oe("error", e), Oe("load", e);
        var s = !1,
          u = !1,
          o;
        for (o in a)
          if (a.hasOwnProperty(o)) {
            var g = a[o];
            if (g != null)
              switch (o) {
                case "src":
                  s = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  Qe(e, t, o, g, a, null);
              }
          }
        u && Qe(e, t, "srcSet", a.srcSet, a, null),
          s && Qe(e, t, "src", a.src, a, null);
        return;
      case "input":
        Oe("invalid", e);
        var x = (o = g = u = null),
          S = null,
          O = null;
        for (s in a)
          if (a.hasOwnProperty(s)) {
            var Q = a[s];
            if (Q != null)
              switch (s) {
                case "name":
                  u = Q;
                  break;
                case "type":
                  g = Q;
                  break;
                case "checked":
                  S = Q;
                  break;
                case "defaultChecked":
                  O = Q;
                  break;
                case "value":
                  o = Q;
                  break;
                case "defaultValue":
                  x = Q;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Q != null) throw Error(r(137, t));
                  break;
                default:
                  Qe(e, t, s, Q, a, null);
              }
          }
        Ch(e, o, x, S, O, g, u, !1), zr(e);
        return;
      case "select":
        Oe("invalid", e), (s = g = o = null);
        for (u in a)
          if (a.hasOwnProperty(u) && ((x = a[u]), x != null))
            switch (u) {
              case "value":
                o = x;
                break;
              case "defaultValue":
                g = x;
                break;
              case "multiple":
                s = x;
              default:
                Qe(e, t, u, x, a, null);
            }
        (t = o),
          (a = g),
          (e.multiple = !!s),
          t != null ? ns(e, !!s, t, !1) : a != null && ns(e, !!s, a, !0);
        return;
      case "textarea":
        Oe("invalid", e), (o = u = s = null);
        for (g in a)
          if (a.hasOwnProperty(g) && ((x = a[g]), x != null))
            switch (g) {
              case "value":
                s = x;
                break;
              case "defaultValue":
                u = x;
                break;
              case "children":
                o = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(r(91));
                break;
              default:
                Qe(e, t, g, x, a, null);
            }
        Dh(e, s, u, o), zr(e);
        return;
      case "option":
        for (S in a)
          if (a.hasOwnProperty(S) && ((s = a[S]), s != null))
            switch (S) {
              case "selected":
                e.selected =
                  s && typeof s != "function" && typeof s != "symbol";
                break;
              default:
                Qe(e, t, S, s, a, null);
            }
        return;
      case "dialog":
        Oe("cancel", e), Oe("close", e);
        break;
      case "iframe":
      case "object":
        Oe("load", e);
        break;
      case "video":
      case "audio":
        for (s = 0; s < Gi.length; s++) Oe(Gi[s], e);
        break;
      case "image":
        Oe("error", e), Oe("load", e);
        break;
      case "details":
        Oe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Oe("error", e), Oe("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (O in a)
          if (a.hasOwnProperty(O) && ((s = a[O]), s != null))
            switch (O) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                Qe(e, t, O, s, a, null);
            }
        return;
      default:
        if (Uc(t)) {
          for (Q in a)
            a.hasOwnProperty(Q) &&
              ((s = a[Q]), s !== void 0 && xf(e, t, Q, s, a, void 0));
          return;
        }
    }
    for (x in a)
      a.hasOwnProperty(x) && ((s = a[x]), s != null && Qe(e, t, x, s, a, null));
  }
  function A2(e, t, a, s) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          o = null,
          g = null,
          x = null,
          S = null,
          O = null,
          Q = null;
        for (F in a) {
          var X = a[F];
          if (a.hasOwnProperty(F) && X != null)
            switch (F) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                S = X;
              default:
                s.hasOwnProperty(F) || Qe(e, t, F, null, s, X);
            }
        }
        for (var B in s) {
          var F = s[B];
          if (((X = a[B]), s.hasOwnProperty(B) && (F != null || X != null)))
            switch (B) {
              case "type":
                o = F;
                break;
              case "name":
                u = F;
                break;
              case "checked":
                O = F;
                break;
              case "defaultChecked":
                Q = F;
                break;
              case "value":
                g = F;
                break;
              case "defaultValue":
                x = F;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (F != null) throw Error(r(137, t));
                break;
              default:
                F !== X && Qe(e, t, B, F, s, X);
            }
        }
        Dc(e, g, x, S, O, Q, o, u);
        return;
      case "select":
        F = g = x = B = null;
        for (o in a)
          if (((S = a[o]), a.hasOwnProperty(o) && S != null))
            switch (o) {
              case "value":
                break;
              case "multiple":
                F = S;
              default:
                s.hasOwnProperty(o) || Qe(e, t, o, null, s, S);
            }
        for (u in s)
          if (
            ((o = s[u]),
            (S = a[u]),
            s.hasOwnProperty(u) && (o != null || S != null))
          )
            switch (u) {
              case "value":
                B = o;
                break;
              case "defaultValue":
                x = o;
                break;
              case "multiple":
                g = o;
              default:
                o !== S && Qe(e, t, u, o, s, S);
            }
        (t = x),
          (a = g),
          (s = F),
          B != null
            ? ns(e, !!a, B, !1)
            : !!s != !!a &&
              (t != null ? ns(e, !!a, t, !0) : ns(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        F = B = null;
        for (x in a)
          if (
            ((u = a[x]),
            a.hasOwnProperty(x) && u != null && !s.hasOwnProperty(x))
          )
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Qe(e, t, x, null, s, u);
            }
        for (g in s)
          if (
            ((u = s[g]),
            (o = a[g]),
            s.hasOwnProperty(g) && (u != null || o != null))
          )
            switch (g) {
              case "value":
                B = u;
                break;
              case "defaultValue":
                F = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== o && Qe(e, t, g, u, s, o);
            }
        Oh(e, B, F);
        return;
      case "option":
        for (var ce in a)
          if (
            ((B = a[ce]),
            a.hasOwnProperty(ce) && B != null && !s.hasOwnProperty(ce))
          )
            switch (ce) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Qe(e, t, ce, null, s, B);
            }
        for (S in s)
          if (
            ((B = s[S]),
            (F = a[S]),
            s.hasOwnProperty(S) && B !== F && (B != null || F != null))
          )
            switch (S) {
              case "selected":
                e.selected =
                  B && typeof B != "function" && typeof B != "symbol";
                break;
              default:
                Qe(e, t, S, B, s, F);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var be in a)
          (B = a[be]),
            a.hasOwnProperty(be) &&
              B != null &&
              !s.hasOwnProperty(be) &&
              Qe(e, t, be, null, s, B);
        for (O in s)
          if (
            ((B = s[O]),
            (F = a[O]),
            s.hasOwnProperty(O) && B !== F && (B != null || F != null))
          )
            switch (O) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null) throw Error(r(137, t));
                break;
              default:
                Qe(e, t, O, B, s, F);
            }
        return;
      default:
        if (Uc(t)) {
          for (var nt in a)
            (B = a[nt]),
              a.hasOwnProperty(nt) &&
                B !== void 0 &&
                !s.hasOwnProperty(nt) &&
                xf(e, t, nt, void 0, s, B);
          for (Q in s)
            (B = s[Q]),
              (F = a[Q]),
              !s.hasOwnProperty(Q) ||
                B === F ||
                (B === void 0 && F === void 0) ||
                xf(e, t, Q, B, s, F);
          return;
        }
    }
    for (var M in a)
      (B = a[M]),
        a.hasOwnProperty(M) &&
          B != null &&
          !s.hasOwnProperty(M) &&
          Qe(e, t, M, null, s, B);
    for (X in s)
      (B = s[X]),
        (F = a[X]),
        !s.hasOwnProperty(X) ||
          B === F ||
          (B == null && F == null) ||
          Qe(e, t, X, B, s, F);
  }
  var Sf = null,
    wf = null;
  function Nu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Rp(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function jp(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Ef(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var _f = null;
  function T2() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === _f
        ? !1
        : ((_f = e), !0)
      : ((_f = null), !1);
  }
  var Np = typeof setTimeout == "function" ? setTimeout : void 0,
    C2 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Ap = typeof Promise == "function" ? Promise : void 0,
    O2 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Ap < "u"
        ? function (e) {
            return Ap.resolve(null).then(e).catch(D2);
          }
        : Np;
  function D2(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Rf(e, t) {
    var a = t,
      s = 0;
    do {
      var u = a.nextSibling;
      if ((e.removeChild(a), u && u.nodeType === 8))
        if (((a = u.data), a === "/$")) {
          if (s === 0) {
            e.removeChild(u), tr(t);
            return;
          }
          s--;
        } else (a !== "$" && a !== "$?" && a !== "$!") || s++;
      a = u;
    } while (a);
    tr(t);
  }
  function jf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          jf(a), Oc(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(a);
    }
  }
  function M2(e, t, a, s) {
    for (; e.nodeType === 1; ) {
      var u = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!s && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (s) {
        if (!e[ci])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((o = e.getAttribute("rel")),
                o === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                o !== u.rel ||
                e.getAttribute("href") !== (u.href == null ? null : u.href) ||
                e.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                e.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((o = e.getAttribute("src")),
                (o !== (u.src == null ? null : u.src) ||
                  e.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  e.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  o &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var o = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === o) return e;
      } else return e;
      if (((e = Mn(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function U2(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !a) ||
        ((e = Mn(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Mn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function Tp(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?") {
          if (t === 0) return e;
          t--;
        } else a === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Cp(e, t, a) {
    switch (((t = Nu(a)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(r(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(r(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  var wn = new Map(),
    Op = new Set();
  function Au(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.ownerDocument;
  }
  var ga = ae.d;
  ae.d = { f: z2, r: L2, D: H2, C: B2, L: V2, m: q2, X: F2, S: k2, M: Q2 };
  function z2() {
    var e = ga.f(),
      t = xu();
    return e || t;
  }
  function L2(e) {
    var t = Il(e);
    t !== null && t.tag === 5 && t.type === "form" ? l0(t) : ga.r(e);
  }
  var Cs = typeof document > "u" ? null : document;
  function Dp(e, t, a) {
    var s = Cs;
    if (s && typeof t == "string" && t) {
      var u = dn(t);
      (u = 'link[rel="' + e + '"][href="' + u + '"]'),
        typeof a == "string" && (u += '[crossorigin="' + a + '"]'),
        Op.has(u) ||
          (Op.add(u),
          (e = { rel: e, crossOrigin: a, href: t }),
          s.querySelector(u) === null &&
            ((t = s.createElement("link")),
            Ct(t, "link", e),
            Et(t),
            s.head.appendChild(t)));
    }
  }
  function H2(e) {
    ga.D(e), Dp("dns-prefetch", e, null);
  }
  function B2(e, t) {
    ga.C(e, t), Dp("preconnect", e, t);
  }
  function V2(e, t, a) {
    ga.L(e, t, a);
    var s = Cs;
    if (s && e && t) {
      var u = 'link[rel="preload"][as="' + dn(t) + '"]';
      t === "image" && a && a.imageSrcSet
        ? ((u += '[imagesrcset="' + dn(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" &&
            (u += '[imagesizes="' + dn(a.imageSizes) + '"]'))
        : (u += '[href="' + dn(e) + '"]');
      var o = u;
      switch (t) {
        case "style":
          o = Os(e);
          break;
        case "script":
          o = Ds(e);
      }
      wn.has(o) ||
        ((e = le(
          {
            rel: "preload",
            href: t === "image" && a && a.imageSrcSet ? void 0 : e,
            as: t,
          },
          a
        )),
        wn.set(o, e),
        s.querySelector(u) !== null ||
          (t === "style" && s.querySelector(Zi(o))) ||
          (t === "script" && s.querySelector(Ki(o))) ||
          ((t = s.createElement("link")),
          Ct(t, "link", e),
          Et(t),
          s.head.appendChild(t)));
    }
  }
  function q2(e, t) {
    ga.m(e, t);
    var a = Cs;
    if (a && e) {
      var s = t && typeof t.as == "string" ? t.as : "script",
        u =
          'link[rel="modulepreload"][as="' + dn(s) + '"][href="' + dn(e) + '"]',
        o = u;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          o = Ds(e);
      }
      if (
        !wn.has(o) &&
        ((e = le({ rel: "modulepreload", href: e }, t)),
        wn.set(o, e),
        a.querySelector(u) === null)
      ) {
        switch (s) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Ki(o))) return;
        }
        (s = a.createElement("link")),
          Ct(s, "link", e),
          Et(s),
          a.head.appendChild(s);
      }
    }
  }
  function k2(e, t, a) {
    ga.S(e, t, a);
    var s = Cs;
    if (s && e) {
      var u = es(s).hoistableStyles,
        o = Os(e);
      t = t || "default";
      var g = u.get(o);
      if (!g) {
        var x = { loading: 0, preload: null };
        if ((g = s.querySelector(Zi(o)))) x.loading = 5;
        else {
          (e = le({ rel: "stylesheet", href: e, "data-precedence": t }, a)),
            (a = wn.get(o)) && Nf(e, a);
          var S = (g = s.createElement("link"));
          Et(S),
            Ct(S, "link", e),
            (S._p = new Promise(function (O, Q) {
              (S.onload = O), (S.onerror = Q);
            })),
            S.addEventListener("load", function () {
              x.loading |= 1;
            }),
            S.addEventListener("error", function () {
              x.loading |= 2;
            }),
            (x.loading |= 4),
            Tu(g, t, s);
        }
        (g = { type: "stylesheet", instance: g, count: 1, state: x }),
          u.set(o, g);
      }
    }
  }
  function F2(e, t) {
    ga.X(e, t);
    var a = Cs;
    if (a && e) {
      var s = es(a).hoistableScripts,
        u = Ds(e),
        o = s.get(u);
      o ||
        ((o = a.querySelector(Ki(u))),
        o ||
          ((e = le({ src: e, async: !0 }, t)),
          (t = wn.get(u)) && Af(e, t),
          (o = a.createElement("script")),
          Et(o),
          Ct(o, "link", e),
          a.head.appendChild(o)),
        (o = { type: "script", instance: o, count: 1, state: null }),
        s.set(u, o));
    }
  }
  function Q2(e, t) {
    ga.M(e, t);
    var a = Cs;
    if (a && e) {
      var s = es(a).hoistableScripts,
        u = Ds(e),
        o = s.get(u);
      o ||
        ((o = a.querySelector(Ki(u))),
        o ||
          ((e = le({ src: e, async: !0, type: "module" }, t)),
          (t = wn.get(u)) && Af(e, t),
          (o = a.createElement("script")),
          Et(o),
          Ct(o, "link", e),
          a.head.appendChild(o)),
        (o = { type: "script", instance: o, count: 1, state: null }),
        s.set(u, o));
    }
  }
  function Mp(e, t, a, s) {
    var u = (u = Tn.current) ? Au(u) : null;
    if (!u) throw Error(r(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((t = Os(a.href)),
            (a = es(u).hoistableStyles),
            (s = a.get(t)),
            s ||
              ((s = { type: "style", instance: null, count: 0, state: null }),
              a.set(t, s)),
            s)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          a.rel === "stylesheet" &&
          typeof a.href == "string" &&
          typeof a.precedence == "string"
        ) {
          e = Os(a.href);
          var o = es(u).hoistableStyles,
            g = o.get(e);
          if (
            (g ||
              ((u = u.ownerDocument || u),
              (g = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              o.set(e, g),
              (o = u.querySelector(Zi(e))) &&
                !o._p &&
                ((g.instance = o), (g.state.loading = 5)),
              wn.has(e) ||
                ((a = {
                  rel: "preload",
                  as: "style",
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                wn.set(e, a),
                o || P2(u, e, a, g.state))),
            t && s === null)
          )
            throw Error(r(528, ""));
          return g;
        }
        if (t && s !== null) throw Error(r(529, ""));
        return null;
      case "script":
        return (
          (t = a.async),
          (a = a.src),
          typeof a == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Ds(a)),
              (a = es(u).hoistableScripts),
              (s = a.get(t)),
              s ||
                ((s = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(t, s)),
              s)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, e));
    }
  }
  function Os(e) {
    return 'href="' + dn(e) + '"';
  }
  function Zi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Up(e) {
    return le({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function P2(e, t, a, s) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (s.loading = 1)
      : ((t = e.createElement("link")),
        (s.preload = t),
        t.addEventListener("load", function () {
          return (s.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (s.loading |= 2);
        }),
        Ct(t, "link", a),
        Et(t),
        e.head.appendChild(t));
  }
  function Ds(e) {
    return '[src="' + dn(e) + '"]';
  }
  function Ki(e) {
    return "script[async]" + e;
  }
  function zp(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var s = e.querySelector('style[data-href~="' + dn(a.href) + '"]');
          if (s) return (t.instance = s), Et(s), s;
          var u = le({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (s = (e.ownerDocument || e).createElement("style")),
            Et(s),
            Ct(s, "style", u),
            Tu(s, a.precedence, e),
            (t.instance = s)
          );
        case "stylesheet":
          u = Os(a.href);
          var o = e.querySelector(Zi(u));
          if (o) return (t.state.loading |= 4), (t.instance = o), Et(o), o;
          (s = Up(a)),
            (u = wn.get(u)) && Nf(s, u),
            (o = (e.ownerDocument || e).createElement("link")),
            Et(o);
          var g = o;
          return (
            (g._p = new Promise(function (x, S) {
              (g.onload = x), (g.onerror = S);
            })),
            Ct(o, "link", s),
            (t.state.loading |= 4),
            Tu(o, a.precedence, e),
            (t.instance = o)
          );
        case "script":
          return (
            (o = Ds(a.src)),
            (u = e.querySelector(Ki(o)))
              ? ((t.instance = u), Et(u), u)
              : ((s = a),
                (u = wn.get(o)) && ((s = le({}, a)), Af(s, u)),
                (e = e.ownerDocument || e),
                (u = e.createElement("script")),
                Et(u),
                Ct(u, "link", s),
                e.head.appendChild(u),
                (t.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        !(t.state.loading & 4) &&
        ((s = t.instance), (t.state.loading |= 4), Tu(s, a.precedence, e));
    return t.instance;
  }
  function Tu(e, t, a) {
    for (
      var s = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        u = s.length ? s[s.length - 1] : null,
        o = u,
        g = 0;
      g < s.length;
      g++
    ) {
      var x = s[g];
      if (x.dataset.precedence === t) o = x;
      else if (o !== u) break;
    }
    o
      ? o.parentNode.insertBefore(e, o.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function Nf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title);
  }
  function Af(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity);
  }
  var Cu = null;
  function Lp(e, t, a) {
    if (Cu === null) {
      var s = new Map(),
        u = (Cu = new Map());
      u.set(a, s);
    } else (u = Cu), (s = u.get(a)), s || ((s = new Map()), u.set(a, s));
    if (s.has(e)) return s;
    for (
      s.set(e, null), a = a.getElementsByTagName(e), u = 0;
      u < a.length;
      u++
    ) {
      var o = a[u];
      if (
        !(
          o[ci] ||
          o[Dt] ||
          (e === "link" && o.getAttribute("rel") === "stylesheet")
        ) &&
        o.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var g = o.getAttribute(t) || "";
        g = e + g;
        var x = s.get(g);
        x ? x.push(o) : s.set(g, [o]);
      }
    }
    return s;
  }
  function Hp(e, t, a) {
    (e = e.ownerDocument || e),
      e.head.insertBefore(
        a,
        t === "title" ? e.querySelector("head > title") : null
      );
  }
  function Y2(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled), typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function Bp(e) {
    return !(e.type === "stylesheet" && !(e.state.loading & 3));
  }
  var $i = null;
  function G2() {}
  function X2(e, t, a) {
    if ($i === null) throw Error(r(475));
    var s = $i;
    if (
      t.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      !(t.state.loading & 4)
    ) {
      if (t.instance === null) {
        var u = Os(a.href),
          o = e.querySelector(Zi(u));
        if (o) {
          (e = o._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (s.count++, (s = Ou.bind(s)), e.then(s, s)),
            (t.state.loading |= 4),
            (t.instance = o),
            Et(o);
          return;
        }
        (o = e.ownerDocument || e),
          (a = Up(a)),
          (u = wn.get(u)) && Nf(a, u),
          (o = o.createElement("link")),
          Et(o);
        var g = o;
        (g._p = new Promise(function (x, S) {
          (g.onload = x), (g.onerror = S);
        })),
          Ct(o, "link", a),
          (t.instance = o);
      }
      s.stylesheets === null && (s.stylesheets = new Map()),
        s.stylesheets.set(t, e),
        (e = t.state.preload) &&
          !(t.state.loading & 3) &&
          (s.count++,
          (t = Ou.bind(s)),
          e.addEventListener("load", t),
          e.addEventListener("error", t));
    }
  }
  function Z2() {
    if ($i === null) throw Error(r(475));
    var e = $i;
    return (
      e.stylesheets && e.count === 0 && Tf(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var a = setTimeout(function () {
              if ((e.stylesheets && Tf(e, e.stylesheets), e.unsuspend)) {
                var s = e.unsuspend;
                (e.unsuspend = null), s();
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                (e.unsuspend = null), clearTimeout(a);
              }
            );
          }
        : null
    );
  }
  function Ou() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) Tf(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        (this.unsuspend = null), e();
      }
    }
  }
  var Du = null;
  function Tf(e, t) {
    (e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Du = new Map()),
        t.forEach(K2, e),
        (Du = null),
        Ou.call(e));
  }
  function K2(e, t) {
    if (!(t.state.loading & 4)) {
      var a = Du.get(e);
      if (a) var s = a.get(null);
      else {
        (a = new Map()), Du.set(e, a);
        for (
          var u = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            o = 0;
          o < u.length;
          o++
        ) {
          var g = u[o];
          (g.nodeName === "LINK" || g.getAttribute("media") !== "not all") &&
            (a.set(g.dataset.precedence, g), (s = g));
        }
        s && a.set(null, s);
      }
      (u = t.instance),
        (g = u.getAttribute("data-precedence")),
        (o = a.get(g) || s),
        o === s && a.set(null, u),
        a.set(g, u),
        this.count++,
        (s = Ou.bind(this)),
        u.addEventListener("load", s),
        u.addEventListener("error", s),
        o
          ? o.parentNode.insertBefore(u, o.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(u, e.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var Ji = {
    $$typeof: j,
    Provider: null,
    Consumer: null,
    _currentValue: Ce,
    _currentValue2: Ce,
    _threadCount: 0,
  };
  function $2(e, t, a, s, u, o, g, x) {
    (this.tag = 1),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Tc(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.finishedLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Tc(0)),
      (this.hiddenUpdates = Tc(null)),
      (this.identifierPrefix = s),
      (this.onUncaughtError = u),
      (this.onCaughtError = o),
      (this.onRecoverableError = g),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map());
  }
  function Vp(e, t, a, s, u, o, g, x, S, O, Q, X) {
    return (
      (e = new $2(e, t, a, g, x, S, O, X)),
      (t = 1),
      o === !0 && (t |= 24),
      (o = xn(3, null, null, t)),
      (e.current = o),
      (o.stateNode = e),
      (t = so()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (o.memoizedState = { element: s, isDehydrated: a, cache: t }),
      qo(o),
      e
    );
  }
  function qp(e) {
    return e ? ((e = os), e) : os;
  }
  function kp(e, t, a, s, u, o) {
    (u = qp(u)),
      s.context === null ? (s.context = u) : (s.pendingContext = u),
      (s = Ha(t)),
      (s.payload = { element: a }),
      (o = o === void 0 ? null : o),
      o !== null && (s.callback = o),
      (a = Ba(e, s, t)),
      a !== null && (Vt(a, e, t), Ui(a, e, t));
  }
  function Fp(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Cf(e, t) {
    Fp(e, t), (e = e.alternate) && Fp(e, t);
  }
  function Qp(e) {
    if (e.tag === 13) {
      var t = Ca(e, 67108864);
      t !== null && Vt(t, e, 67108864), Cf(e, 67108864);
    }
  }
  var Mu = !0;
  function J2(e, t, a, s) {
    var u = G.T;
    G.T = null;
    var o = ae.p;
    try {
      (ae.p = 2), Of(e, t, a, s);
    } finally {
      (ae.p = o), (G.T = u);
    }
  }
  function W2(e, t, a, s) {
    var u = G.T;
    G.T = null;
    var o = ae.p;
    try {
      (ae.p = 8), Of(e, t, a, s);
    } finally {
      (ae.p = o), (G.T = u);
    }
  }
  function Of(e, t, a, s) {
    if (Mu) {
      var u = Df(s);
      if (u === null) bf(e, t, s, Uu, a), Yp(e, s);
      else if (eb(u, e, t, a, s)) s.stopPropagation();
      else if ((Yp(e, s), t & 4 && -1 < I2.indexOf(e))) {
        for (; u !== null; ) {
          var o = Il(u);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (((o = o.stateNode), o.current.memoizedState.isDehydrated)) {
                  var g = ml(o.pendingLanes);
                  if (g !== 0) {
                    var x = o;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; g; ) {
                      var S = 1 << (31 - an(g));
                      (x.entanglements[1] |= S), (g &= ~S);
                    }
                    Gn(o), !(Ie & 6) && ((gu = ue() + 500), Yi(0));
                  }
                }
                break;
              case 13:
                (x = Ca(o, 2)), x !== null && Vt(x, o, 2), xu(), Cf(o, 2);
            }
          if (((o = Df(s)), o === null && bf(e, t, s, Uu, a), o === u)) break;
          u = o;
        }
        u !== null && s.stopPropagation();
      } else bf(e, t, s, null, a);
    }
  }
  function Df(e) {
    return (e = Lc(e)), Mf(e);
  }
  var Uu = null;
  function Mf(e) {
    if (((Uu = null), (e = pl(e)), e !== null)) {
      var t = me(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = He(t)), e !== null)) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return (Uu = e), null;
  }
  function Pp(e) {
    switch (e) {
      case "beforetoggle":
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
      case "toggle":
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
        return 2;
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
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Re()) {
          case it:
            return 2;
          case rt:
            return 8;
          case nn:
          case Nc:
            return 32;
          case Jl:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Uf = !1,
    Ya = null,
    Ga = null,
    Xa = null,
    Wi = new Map(),
    Ii = new Map(),
    Za = [],
    I2 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function Yp(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ya = null;
        break;
      case "dragenter":
      case "dragleave":
        Ga = null;
        break;
      case "mouseover":
      case "mouseout":
        Xa = null;
        break;
      case "pointerover":
      case "pointerout":
        Wi.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ii.delete(t.pointerId);
    }
  }
  function er(e, t, a, s, u, o) {
    return e === null || e.nativeEvent !== o
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: s,
          nativeEvent: o,
          targetContainers: [u],
        }),
        t !== null && ((t = Il(t)), t !== null && Qp(t)),
        e)
      : ((e.eventSystemFlags |= s),
        (t = e.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        e);
  }
  function eb(e, t, a, s, u) {
    switch (t) {
      case "focusin":
        return (Ya = er(Ya, e, t, a, s, u)), !0;
      case "dragenter":
        return (Ga = er(Ga, e, t, a, s, u)), !0;
      case "mouseover":
        return (Xa = er(Xa, e, t, a, s, u)), !0;
      case "pointerover":
        var o = u.pointerId;
        return Wi.set(o, er(Wi.get(o) || null, e, t, a, s, u)), !0;
      case "gotpointercapture":
        return (
          (o = u.pointerId), Ii.set(o, er(Ii.get(o) || null, e, t, a, s, u)), !0
        );
    }
    return !1;
  }
  function Gp(e) {
    var t = pl(e.target);
    if (t !== null) {
      var a = me(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = He(a)), t !== null)) {
            (e.blockedOn = t),
              Zg(e.priority, function () {
                if (a.tag === 13) {
                  var s = cn(),
                    u = Ca(a, s);
                  u !== null && Vt(u, a, s), Cf(a, s);
                }
              });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function zu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Df(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var s = new a.constructor(a.type, a);
        (zc = s), a.target.dispatchEvent(s), (zc = null);
      } else return (t = Il(a)), t !== null && Qp(t), (e.blockedOn = a), !1;
      t.shift();
    }
    return !0;
  }
  function Xp(e, t, a) {
    zu(e) && a.delete(t);
  }
  function tb() {
    (Uf = !1),
      Ya !== null && zu(Ya) && (Ya = null),
      Ga !== null && zu(Ga) && (Ga = null),
      Xa !== null && zu(Xa) && (Xa = null),
      Wi.forEach(Xp),
      Ii.forEach(Xp);
  }
  function Lu(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Uf ||
        ((Uf = !0),
        n.unstable_scheduleCallback(n.unstable_NormalPriority, tb)));
  }
  var Hu = null;
  function Zp(e) {
    Hu !== e &&
      ((Hu = e),
      n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
        Hu === e && (Hu = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            s = e[t + 1],
            u = e[t + 2];
          if (typeof s != "function") {
            if (Mf(s || a) === null) continue;
            break;
          }
          var o = Il(a);
          o !== null &&
            (e.splice(t, 3),
            (t -= 3),
            wo(o, { pending: !0, data: u, method: a.method, action: s }, s, u));
        }
      }));
  }
  function tr(e) {
    function t(S) {
      return Lu(S, e);
    }
    Ya !== null && Lu(Ya, e),
      Ga !== null && Lu(Ga, e),
      Xa !== null && Lu(Xa, e),
      Wi.forEach(t),
      Ii.forEach(t);
    for (var a = 0; a < Za.length; a++) {
      var s = Za[a];
      s.blockedOn === e && (s.blockedOn = null);
    }
    for (; 0 < Za.length && ((a = Za[0]), a.blockedOn === null); )
      Gp(a), a.blockedOn === null && Za.shift();
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (s = 0; s < a.length; s += 3) {
        var u = a[s],
          o = a[s + 1],
          g = u[Yt] || null;
        if (typeof o == "function") g || Zp(a);
        else if (g) {
          var x = null;
          if (o && o.hasAttribute("formAction")) {
            if (((u = o), (g = o[Yt] || null))) x = g.formAction;
            else if (Mf(u) !== null) continue;
          } else x = g.action;
          typeof x == "function" ? (a[s + 1] = x) : (a.splice(s, 3), (s -= 3)),
            Zp(a);
        }
      }
  }
  function zf(e) {
    this._internalRoot = e;
  }
  (Bu.prototype.render = zf.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var a = t.current,
        s = cn();
      kp(a, s, e, t, null, null);
    }),
    (Bu.prototype.unmount = zf.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          e.tag === 0 && Ns(),
            kp(e.current, 2, null, e, null, null),
            xu(),
            (t[Wl] = null);
        }
      });
  function Bu(e) {
    this._internalRoot = e;
  }
  Bu.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = wh();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < Za.length && t !== 0 && t < Za[a].priority; a++);
      Za.splice(a, 0, e), a === 0 && Gp(e);
    }
  };
  var Kp = l.version;
  if (Kp !== "19.0.0") throw Error(r(527, Kp, "19.0.0"));
  ae.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(r(188))
        : ((e = Object.keys(e).join(",")), Error(r(268, e)));
    return (
      (e = Z(t)),
      (e = e !== null ? ge(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var nb = {
    bundleType: 0,
    version: "19.0.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: G,
    findFiberByHostInstance: pl,
    reconcilerVersion: "19.0.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Vu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Vu.isDisabled && Vu.supportsFiber)
      try {
        (ja = Vu.inject(nb)), (Ht = Vu);
      } catch {}
  }
  return (
    (ar.createRoot = function (e, t) {
      if (!c(e)) throw Error(r(299));
      var a = !1,
        s = "",
        u = d0,
        o = h0,
        g = m0,
        x = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (s = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (o = t.onCaughtError),
          t.onRecoverableError !== void 0 && (g = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (x = t.unstable_transitionCallbacks)),
        (t = Vp(e, 1, !1, null, null, a, s, u, o, g, x, null)),
        (e[Wl] = t.current),
        vf(e.nodeType === 8 ? e.parentNode : e),
        new zf(t)
      );
    }),
    (ar.hydrateRoot = function (e, t, a) {
      if (!c(e)) throw Error(r(299));
      var s = !1,
        u = "",
        o = d0,
        g = h0,
        x = m0,
        S = null,
        O = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (s = !0),
          a.identifierPrefix !== void 0 && (u = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (o = a.onUncaughtError),
          a.onCaughtError !== void 0 && (g = a.onCaughtError),
          a.onRecoverableError !== void 0 && (x = a.onRecoverableError),
          a.unstable_transitionCallbacks !== void 0 &&
            (S = a.unstable_transitionCallbacks),
          a.formState !== void 0 && (O = a.formState)),
        (t = Vp(e, 1, !0, t, a ?? null, s, u, o, g, x, S, O)),
        (t.context = qp(null)),
        (a = t.current),
        (s = cn()),
        (u = Ha(s)),
        (u.callback = null),
        Ba(a, u, s),
        (t.current.lanes = s),
        ui(t, s),
        Gn(t),
        (e[Wl] = t.current),
        vf(e),
        new Bu(t)
      );
    }),
    (ar.version = "19.0.0"),
    ar
  );
}
var iy;
function hb() {
  if (iy) return Bf.exports;
  iy = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (l) {
        console.error(l);
      }
  }
  return n(), (Bf.exports = db()), Bf.exports;
}
var mb = hb(),
  w = Bd();
const pt = lb(w);
var lr = {},
  ry;
function pb() {
  if (ry) return lr;
  (ry = 1),
    Object.defineProperty(lr, "__esModule", { value: !0 }),
    (lr.parse = d),
    (lr.serialize = m);
  const n = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    l = /^[\u0021-\u003A\u003C-\u007E]*$/,
    i =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    r = /^[\u0020-\u003A\u003D-\u007E]*$/,
    c = Object.prototype.toString,
    f = (() => {
      const E = function () {};
      return (E.prototype = Object.create(null)), E;
    })();
  function d(E, j) {
    const _ = new f(),
      D = E.length;
    if (D < 2) return _;
    const T = (j == null ? void 0 : j.decode) || v;
    let U = 0;
    do {
      const L = E.indexOf("=", U);
      if (L === -1) break;
      const V = E.indexOf(";", U),
        I = V === -1 ? D : V;
      if (L > I) {
        U = E.lastIndexOf(";", L - 1) + 1;
        continue;
      }
      const Y = y(E, U, L),
        te = p(E, L, Y),
        de = E.slice(Y, te);
      if (_[de] === void 0) {
        let ee = y(E, L + 1, I),
          G = p(E, I, ee);
        const le = T(E.slice(ee, G));
        _[de] = le;
      }
      U = I + 1;
    } while (U < D);
    return _;
  }
  function y(E, j, _) {
    do {
      const D = E.charCodeAt(j);
      if (D !== 32 && D !== 9) return j;
    } while (++j < _);
    return _;
  }
  function p(E, j, _) {
    for (; j > _; ) {
      const D = E.charCodeAt(--j);
      if (D !== 32 && D !== 9) return j + 1;
    }
    return _;
  }
  function m(E, j, _) {
    const D = (_ == null ? void 0 : _.encode) || encodeURIComponent;
    if (!n.test(E)) throw new TypeError(`argument name is invalid: ${E}`);
    const T = D(j);
    if (!l.test(T)) throw new TypeError(`argument val is invalid: ${j}`);
    let U = E + "=" + T;
    if (!_) return U;
    if (_.maxAge !== void 0) {
      if (!Number.isInteger(_.maxAge))
        throw new TypeError(`option maxAge is invalid: ${_.maxAge}`);
      U += "; Max-Age=" + _.maxAge;
    }
    if (_.domain) {
      if (!i.test(_.domain))
        throw new TypeError(`option domain is invalid: ${_.domain}`);
      U += "; Domain=" + _.domain;
    }
    if (_.path) {
      if (!r.test(_.path))
        throw new TypeError(`option path is invalid: ${_.path}`);
      U += "; Path=" + _.path;
    }
    if (_.expires) {
      if (!b(_.expires) || !Number.isFinite(_.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${_.expires}`);
      U += "; Expires=" + _.expires.toUTCString();
    }
    if (
      (_.httpOnly && (U += "; HttpOnly"),
      _.secure && (U += "; Secure"),
      _.partitioned && (U += "; Partitioned"),
      _.priority)
    )
      switch (
        typeof _.priority == "string" ? _.priority.toLowerCase() : void 0
      ) {
        case "low":
          U += "; Priority=Low";
          break;
        case "medium":
          U += "; Priority=Medium";
          break;
        case "high":
          U += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${_.priority}`);
      }
    if (_.sameSite)
      switch (
        typeof _.sameSite == "string" ? _.sameSite.toLowerCase() : _.sameSite
      ) {
        case !0:
        case "strict":
          U += "; SameSite=Strict";
          break;
        case "lax":
          U += "; SameSite=Lax";
          break;
        case "none":
          U += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${_.sameSite}`);
      }
    return U;
  }
  function v(E) {
    if (E.indexOf("%") === -1) return E;
    try {
      return decodeURIComponent(E);
    } catch {
      return E;
    }
  }
  function b(E) {
    return c.call(E) === "[object Date]";
  }
  return lr;
}
pb();
/**
 * react-router v7.2.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var uy = "popstate";
function yb(n = {}) {
  function l(r, c) {
    let { pathname: f, search: d, hash: y } = r.location;
    return ad(
      "",
      { pathname: f, search: d, hash: y },
      (c.state && c.state.usr) || null,
      (c.state && c.state.key) || "default"
    );
  }
  function i(r, c) {
    return typeof c == "string" ? c : fr(c);
  }
  return vb(l, i, null, n);
}
function $e(n, l) {
  if (n === !1 || n === null || typeof n > "u") throw new Error(l);
}
function jn(n, l) {
  if (!n) {
    typeof console < "u" && console.warn(l);
    try {
      throw new Error(l);
    } catch {}
  }
}
function gb() {
  return Math.random().toString(36).substring(2, 10);
}
function cy(n, l) {
  return { usr: n.state, key: n.key, idx: l };
}
function ad(n, l, i = null, r) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...(typeof l == "string" ? Ws(l) : l),
    state: i,
    key: (l && l.key) || r || gb(),
  };
}
function fr({ pathname: n = "/", search: l = "", hash: i = "" }) {
  return (
    l && l !== "?" && (n += l.charAt(0) === "?" ? l : "?" + l),
    i && i !== "#" && (n += i.charAt(0) === "#" ? i : "#" + i),
    n
  );
}
function Ws(n) {
  let l = {};
  if (n) {
    let i = n.indexOf("#");
    i >= 0 && ((l.hash = n.substring(i)), (n = n.substring(0, i)));
    let r = n.indexOf("?");
    r >= 0 && ((l.search = n.substring(r)), (n = n.substring(0, r))),
      n && (l.pathname = n);
  }
  return l;
}
function vb(n, l, i, r = {}) {
  let { window: c = document.defaultView, v5Compat: f = !1 } = r,
    d = c.history,
    y = "POP",
    p = null,
    m = v();
  m == null && ((m = 0), d.replaceState({ ...d.state, idx: m }, ""));
  function v() {
    return (d.state || { idx: null }).idx;
  }
  function b() {
    y = "POP";
    let T = v(),
      U = T == null ? null : T - m;
    (m = T), p && p({ action: y, location: D.location, delta: U });
  }
  function E(T, U) {
    y = "PUSH";
    let L = ad(D.location, T, U);
    m = v() + 1;
    let V = cy(L, m),
      I = D.createHref(L);
    try {
      d.pushState(V, "", I);
    } catch (Y) {
      if (Y instanceof DOMException && Y.name === "DataCloneError") throw Y;
      c.location.assign(I);
    }
    f && p && p({ action: y, location: D.location, delta: 1 });
  }
  function j(T, U) {
    y = "REPLACE";
    let L = ad(D.location, T, U);
    m = v();
    let V = cy(L, m),
      I = D.createHref(L);
    d.replaceState(V, "", I),
      f && p && p({ action: y, location: D.location, delta: 0 });
  }
  function _(T) {
    let U = c.location.origin !== "null" ? c.location.origin : c.location.href,
      L = typeof T == "string" ? T : fr(T);
    return (
      (L = L.replace(/ $/, "%20")),
      $e(
        U,
        `No window.location.(origin|href) available to create URL for href: ${L}`
      ),
      new URL(L, U)
    );
  }
  let D = {
    get action() {
      return y;
    },
    get location() {
      return n(c, d);
    },
    listen(T) {
      if (p) throw new Error("A history only accepts one active listener");
      return (
        c.addEventListener(uy, b),
        (p = T),
        () => {
          c.removeEventListener(uy, b), (p = null);
        }
      );
    },
    createHref(T) {
      return l(c, T);
    },
    createURL: _,
    encodeLocation(T) {
      let U = _(T);
      return { pathname: U.pathname, search: U.search, hash: U.hash };
    },
    push: E,
    replace: j,
    go(T) {
      return d.go(T);
    },
  };
  return D;
}
function u1(n, l, i = "/") {
  return bb(n, l, i, !1);
}
function bb(n, l, i, r) {
  let c = typeof l == "string" ? Ws(l) : l,
    f = ul(c.pathname || "/", i);
  if (f == null) return null;
  let d = c1(n);
  xb(d);
  let y = null;
  for (let p = 0; y == null && p < d.length; ++p) {
    let m = Ob(f);
    y = Tb(d[p], m, r);
  }
  return y;
}
function c1(n, l = [], i = [], r = "") {
  let c = (f, d, y) => {
    let p = {
      relativePath: y === void 0 ? f.path || "" : y,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: d,
      route: f,
    };
    p.relativePath.startsWith("/") &&
      ($e(
        p.relativePath.startsWith(r),
        `Absolute route path "${p.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
      (p.relativePath = p.relativePath.slice(r.length)));
    let m = Ea([r, p.relativePath]),
      v = i.concat(p);
    f.children &&
      f.children.length > 0 &&
      ($e(
        f.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${m}".`
      ),
      c1(f.children, l, v, m)),
      !(f.path == null && !f.index) &&
        l.push({ path: m, score: Nb(m, f.index), routesMeta: v });
  };
  return (
    n.forEach((f, d) => {
      var y;
      if (f.path === "" || !((y = f.path) != null && y.includes("?"))) c(f, d);
      else for (let p of o1(f.path)) c(f, d, p);
    }),
    l
  );
}
function o1(n) {
  let l = n.split("/");
  if (l.length === 0) return [];
  let [i, ...r] = l,
    c = i.endsWith("?"),
    f = i.replace(/\?$/, "");
  if (r.length === 0) return c ? [f, ""] : [f];
  let d = o1(r.join("/")),
    y = [];
  return (
    y.push(...d.map((p) => (p === "" ? f : [f, p].join("/")))),
    c && y.push(...d),
    y.map((p) => (n.startsWith("/") && p === "" ? "/" : p))
  );
}
function xb(n) {
  n.sort((l, i) =>
    l.score !== i.score
      ? i.score - l.score
      : Ab(
          l.routesMeta.map((r) => r.childrenIndex),
          i.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
var Sb = /^:[\w-]+$/,
  wb = 3,
  Eb = 2,
  _b = 1,
  Rb = 10,
  jb = -2,
  oy = (n) => n === "*";
function Nb(n, l) {
  let i = n.split("/"),
    r = i.length;
  return (
    i.some(oy) && (r += jb),
    l && (r += Eb),
    i
      .filter((c) => !oy(c))
      .reduce((c, f) => c + (Sb.test(f) ? wb : f === "" ? _b : Rb), r)
  );
}
function Ab(n, l) {
  return n.length === l.length && n.slice(0, -1).every((r, c) => r === l[c])
    ? n[n.length - 1] - l[l.length - 1]
    : 0;
}
function Tb(n, l, i = !1) {
  let { routesMeta: r } = n,
    c = {},
    f = "/",
    d = [];
  for (let y = 0; y < r.length; ++y) {
    let p = r[y],
      m = y === r.length - 1,
      v = f === "/" ? l : l.slice(f.length) || "/",
      b = Ju(
        { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
        v
      ),
      E = p.route;
    if (
      (!b &&
        m &&
        i &&
        !r[r.length - 1].route.index &&
        (b = Ju(
          { path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 },
          v
        )),
      !b)
    )
      return null;
    Object.assign(c, b.params),
      d.push({
        params: c,
        pathname: Ea([f, b.pathname]),
        pathnameBase: zb(Ea([f, b.pathnameBase])),
        route: E,
      }),
      b.pathnameBase !== "/" && (f = Ea([f, b.pathnameBase]));
  }
  return d;
}
function Ju(n, l) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [i, r] = Cb(n.path, n.caseSensitive, n.end),
    c = l.match(i);
  if (!c) return null;
  let f = c[0],
    d = f.replace(/(.)\/+$/, "$1"),
    y = c.slice(1);
  return {
    params: r.reduce((m, { paramName: v, isOptional: b }, E) => {
      if (v === "*") {
        let _ = y[E] || "";
        d = f.slice(0, f.length - _.length).replace(/(.)\/+$/, "$1");
      }
      const j = y[E];
      return (
        b && !j ? (m[v] = void 0) : (m[v] = (j || "").replace(/%2F/g, "/")), m
      );
    }, {}),
    pathname: f,
    pathnameBase: d,
    pattern: n,
  };
}
function Cb(n, l = !1, i = !0) {
  jn(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(
      /\*$/,
      "/*"
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(
      /\*$/,
      "/*"
    )}".`
  );
  let r = [],
    c =
      "^" +
      n
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (d, y, p) => (
            r.push({ paramName: y, isOptional: p != null }),
            p ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    n.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (c += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : i
      ? (c += "\\/*$")
      : n !== "" && n !== "/" && (c += "(?:(?=\\/|$))"),
    [new RegExp(c, l ? void 0 : "i"), r]
  );
}
function Ob(n) {
  try {
    return n
      .split("/")
      .map((l) => decodeURIComponent(l).replace(/\//g, "%2F"))
      .join("/");
  } catch (l) {
    return (
      jn(
        !1,
        `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${l}).`
      ),
      n
    );
  }
}
function ul(n, l) {
  if (l === "/") return n;
  if (!n.toLowerCase().startsWith(l.toLowerCase())) return null;
  let i = l.endsWith("/") ? l.length - 1 : l.length,
    r = n.charAt(i);
  return r && r !== "/" ? null : n.slice(i) || "/";
}
function Db(n, l = "/") {
  let {
    pathname: i,
    search: r = "",
    hash: c = "",
  } = typeof n == "string" ? Ws(n) : n;
  return {
    pathname: i ? (i.startsWith("/") ? i : Mb(i, l)) : l,
    search: Lb(r),
    hash: Hb(c),
  };
}
function Mb(n, l) {
  let i = l.replace(/\/+$/, "").split("/");
  return (
    n.split("/").forEach((c) => {
      c === ".." ? i.length > 1 && i.pop() : c !== "." && i.push(c);
    }),
    i.length > 1 ? i.join("/") : "/"
  );
}
function Qf(n, l, i, r) {
  return `Cannot include a '${n}' character in a manually specified \`to.${l}\` field [${JSON.stringify(
    r
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Ub(n) {
  return n.filter(
    (l, i) => i === 0 || (l.route.path && l.route.path.length > 0)
  );
}
function Vd(n) {
  let l = Ub(n);
  return l.map((i, r) => (r === l.length - 1 ? i.pathname : i.pathnameBase));
}
function qd(n, l, i, r = !1) {
  let c;
  typeof n == "string"
    ? (c = Ws(n))
    : ((c = { ...n }),
      $e(
        !c.pathname || !c.pathname.includes("?"),
        Qf("?", "pathname", "search", c)
      ),
      $e(
        !c.pathname || !c.pathname.includes("#"),
        Qf("#", "pathname", "hash", c)
      ),
      $e(!c.search || !c.search.includes("#"), Qf("#", "search", "hash", c)));
  let f = n === "" || c.pathname === "",
    d = f ? "/" : c.pathname,
    y;
  if (d == null) y = i;
  else {
    let b = l.length - 1;
    if (!r && d.startsWith("..")) {
      let E = d.split("/");
      for (; E[0] === ".."; ) E.shift(), (b -= 1);
      c.pathname = E.join("/");
    }
    y = b >= 0 ? l[b] : "/";
  }
  let p = Db(c, y),
    m = d && d !== "/" && d.endsWith("/"),
    v = (f || d === ".") && i.endsWith("/");
  return !p.pathname.endsWith("/") && (m || v) && (p.pathname += "/"), p;
}
var Ea = (n) => n.join("/").replace(/\/\/+/g, "/"),
  zb = (n) => n.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Lb = (n) => (!n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n),
  Hb = (n) => (!n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n);
function Bb(n) {
  return (
    n != null &&
    typeof n.status == "number" &&
    typeof n.statusText == "string" &&
    typeof n.internal == "boolean" &&
    "data" in n
  );
}
var f1 = ["POST", "PUT", "PATCH", "DELETE"];
new Set(f1);
var Vb = ["GET", ...f1];
new Set(Vb);
var Is = w.createContext(null);
Is.displayName = "DataRouter";
var fc = w.createContext(null);
fc.displayName = "DataRouterState";
var d1 = w.createContext({ isTransitioning: !1 });
d1.displayName = "ViewTransition";
var qb = w.createContext(new Map());
qb.displayName = "Fetchers";
var kb = w.createContext(null);
kb.displayName = "Await";
var Bn = w.createContext(null);
Bn.displayName = "Navigation";
var br = w.createContext(null);
br.displayName = "Location";
var Nn = w.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Nn.displayName = "Route";
var kd = w.createContext(null);
kd.displayName = "RouteError";
function Fb(n, { relative: l } = {}) {
  $e(
    ei(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: r } = w.useContext(Bn),
    { hash: c, pathname: f, search: d } = xr(n, { relative: l }),
    y = f;
  return (
    i !== "/" && (y = f === "/" ? i : Ea([i, f])),
    r.createHref({ pathname: y, search: d, hash: c })
  );
}
function ei() {
  return w.useContext(br) != null;
}
function st() {
  return (
    $e(
      ei(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    w.useContext(br).location
  );
}
var h1 =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function m1(n) {
  w.useContext(Bn).static || w.useLayoutEffect(n);
}
function gt() {
  let { isDataRoute: n } = w.useContext(Nn);
  return n ? lx() : Qb();
}
function Qb() {
  $e(
    ei(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = w.useContext(Is),
    { basename: l, navigator: i } = w.useContext(Bn),
    { matches: r } = w.useContext(Nn),
    { pathname: c } = st(),
    f = JSON.stringify(Vd(r)),
    d = w.useRef(!1);
  return (
    m1(() => {
      d.current = !0;
    }),
    w.useCallback(
      (p, m = {}) => {
        if ((jn(d.current, h1), !d.current)) return;
        if (typeof p == "number") {
          i.go(p);
          return;
        }
        let v = qd(p, JSON.parse(f), c, m.relative === "path");
        n == null &&
          l !== "/" &&
          (v.pathname = v.pathname === "/" ? l : Ea([l, v.pathname])),
          (m.replace ? i.replace : i.push)(v, m.state, m);
      },
      [l, i, f, c, n]
    )
  );
}
var Pb = w.createContext(null);
function Yb(n) {
  let l = w.useContext(Nn).outlet;
  return l && w.createElement(Pb.Provider, { value: n }, l);
}
function Gb() {
  let { matches: n } = w.useContext(Nn),
    l = n[n.length - 1];
  return l ? l.params : {};
}
function xr(n, { relative: l } = {}) {
  let { matches: i } = w.useContext(Nn),
    { pathname: r } = st(),
    c = JSON.stringify(Vd(i));
  return w.useMemo(() => qd(n, JSON.parse(c), r, l === "path"), [n, c, r, l]);
}
function Xb(n, l) {
  return p1(n, l);
}
function p1(n, l, i, r) {
  var L;
  $e(
    ei(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: c, static: f } = w.useContext(Bn),
    { matches: d } = w.useContext(Nn),
    y = d[d.length - 1],
    p = y ? y.params : {},
    m = y ? y.pathname : "/",
    v = y ? y.pathnameBase : "/",
    b = y && y.route;
  {
    let V = (b && b.path) || "";
    y1(
      m,
      !b || V.endsWith("*") || V.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${V}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${V}"> to <Route path="${
        V === "/" ? "*" : `${V}/*`
      }">.`
    );
  }
  let E = st(),
    j;
  if (l) {
    let V = typeof l == "string" ? Ws(l) : l;
    $e(
      v === "/" || ((L = V.pathname) == null ? void 0 : L.startsWith(v)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${v}" but pathname "${V.pathname}" was given in the \`location\` prop.`
    ),
      (j = V);
  } else j = E;
  let _ = j.pathname || "/",
    D = _;
  if (v !== "/") {
    let V = v.replace(/^\//, "").split("/");
    D = "/" + _.replace(/^\//, "").split("/").slice(V.length).join("/");
  }
  let T =
    !f && i && i.matches && i.matches.length > 0
      ? i.matches
      : u1(n, { pathname: D });
  jn(
    b || T != null,
    `No routes matched location "${j.pathname}${j.search}${j.hash}" `
  ),
    jn(
      T == null ||
        T[T.length - 1].route.element !== void 0 ||
        T[T.length - 1].route.Component !== void 0 ||
        T[T.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${j.pathname}${j.search}${j.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  let U = Wb(
    T &&
      T.map((V) =>
        Object.assign({}, V, {
          params: Object.assign({}, p, V.params),
          pathname: Ea([
            v,
            c.encodeLocation
              ? c.encodeLocation(V.pathname).pathname
              : V.pathname,
          ]),
          pathnameBase:
            V.pathnameBase === "/"
              ? v
              : Ea([
                  v,
                  c.encodeLocation
                    ? c.encodeLocation(V.pathnameBase).pathname
                    : V.pathnameBase,
                ]),
        })
      ),
    d,
    i,
    r
  );
  return l && U
    ? w.createElement(
        br.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...j,
            },
            navigationType: "POP",
          },
        },
        U
      )
    : U;
}
function Zb() {
  let n = ax(),
    l = Bb(n)
      ? `${n.status} ${n.statusText}`
      : n instanceof Error
      ? n.message
      : JSON.stringify(n),
    i = n instanceof Error ? n.stack : null,
    r = "rgba(200,200,200, 0.5)",
    c = { padding: "0.5rem", backgroundColor: r },
    f = { padding: "2px 4px", backgroundColor: r },
    d = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", n),
    (d = w.createElement(
      w.Fragment,
      null,
      w.createElement("p", null, "💿 Hey developer 👋"),
      w.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        w.createElement("code", { style: f }, "ErrorBoundary"),
        " or",
        " ",
        w.createElement("code", { style: f }, "errorElement"),
        " prop on your route."
      )
    )),
    w.createElement(
      w.Fragment,
      null,
      w.createElement("h2", null, "Unexpected Application Error!"),
      w.createElement("h3", { style: { fontStyle: "italic" } }, l),
      i ? w.createElement("pre", { style: c }, i) : null,
      d
    )
  );
}
var Kb = w.createElement(Zb, null),
  $b = class extends w.Component {
    constructor(n) {
      super(n),
        (this.state = {
          location: n.location,
          revalidation: n.revalidation,
          error: n.error,
        });
    }
    static getDerivedStateFromError(n) {
      return { error: n };
    }
    static getDerivedStateFromProps(n, l) {
      return l.location !== n.location ||
        (l.revalidation !== "idle" && n.revalidation === "idle")
        ? { error: n.error, location: n.location, revalidation: n.revalidation }
        : {
            error: n.error !== void 0 ? n.error : l.error,
            location: l.location,
            revalidation: n.revalidation || l.revalidation,
          };
    }
    componentDidCatch(n, l) {
      console.error(
        "React Router caught the following error during render",
        n,
        l
      );
    }
    render() {
      return this.state.error !== void 0
        ? w.createElement(
            Nn.Provider,
            { value: this.props.routeContext },
            w.createElement(kd.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function Jb({ routeContext: n, match: l, children: i }) {
  let r = w.useContext(Is);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (l.route.errorElement || l.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = l.route.id),
    w.createElement(Nn.Provider, { value: n }, i)
  );
}
function Wb(n, l = [], i = null, r = null) {
  if (n == null) {
    if (!i) return null;
    if (i.errors) n = i.matches;
    else if (l.length === 0 && !i.initialized && i.matches.length > 0)
      n = i.matches;
    else return null;
  }
  let c = n,
    f = i == null ? void 0 : i.errors;
  if (f != null) {
    let p = c.findIndex(
      (m) => m.route.id && (f == null ? void 0 : f[m.route.id]) !== void 0
    );
    $e(
      p >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        f
      ).join(",")}`
    ),
      (c = c.slice(0, Math.min(c.length, p + 1)));
  }
  let d = !1,
    y = -1;
  if (i)
    for (let p = 0; p < c.length; p++) {
      let m = c[p];
      if (
        ((m.route.HydrateFallback || m.route.hydrateFallbackElement) && (y = p),
        m.route.id)
      ) {
        let { loaderData: v, errors: b } = i,
          E =
            m.route.loader &&
            !v.hasOwnProperty(m.route.id) &&
            (!b || b[m.route.id] === void 0);
        if (m.route.lazy || E) {
          (d = !0), y >= 0 ? (c = c.slice(0, y + 1)) : (c = [c[0]]);
          break;
        }
      }
    }
  return c.reduceRight((p, m, v) => {
    let b,
      E = !1,
      j = null,
      _ = null;
    i &&
      ((b = f && m.route.id ? f[m.route.id] : void 0),
      (j = m.route.errorElement || Kb),
      d &&
        (y < 0 && v === 0
          ? (y1(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (E = !0),
            (_ = null))
          : y === v &&
            ((E = !0), (_ = m.route.hydrateFallbackElement || null))));
    let D = l.concat(c.slice(0, v + 1)),
      T = () => {
        let U;
        return (
          b
            ? (U = j)
            : E
            ? (U = _)
            : m.route.Component
            ? (U = w.createElement(m.route.Component, null))
            : m.route.element
            ? (U = m.route.element)
            : (U = p),
          w.createElement(Jb, {
            match: m,
            routeContext: { outlet: p, matches: D, isDataRoute: i != null },
            children: U,
          })
        );
      };
    return i && (m.route.ErrorBoundary || m.route.errorElement || v === 0)
      ? w.createElement($b, {
          location: i.location,
          revalidation: i.revalidation,
          component: j,
          error: b,
          children: T(),
          routeContext: { outlet: null, matches: D, isDataRoute: !0 },
        })
      : T();
  }, null);
}
function Fd(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ib(n) {
  let l = w.useContext(Is);
  return $e(l, Fd(n)), l;
}
function ex(n) {
  let l = w.useContext(fc);
  return $e(l, Fd(n)), l;
}
function tx(n) {
  let l = w.useContext(Nn);
  return $e(l, Fd(n)), l;
}
function Qd(n) {
  let l = tx(n),
    i = l.matches[l.matches.length - 1];
  return (
    $e(
      i.route.id,
      `${n} can only be used on routes that contain a unique "id"`
    ),
    i.route.id
  );
}
function nx() {
  return Qd("useRouteId");
}
function ax() {
  var r;
  let n = w.useContext(kd),
    l = ex("useRouteError"),
    i = Qd("useRouteError");
  return n !== void 0 ? n : (r = l.errors) == null ? void 0 : r[i];
}
function lx() {
  let { router: n } = Ib("useNavigate"),
    l = Qd("useNavigate"),
    i = w.useRef(!1);
  return (
    m1(() => {
      i.current = !0;
    }),
    w.useCallback(
      async (c, f = {}) => {
        jn(i.current, h1),
          i.current &&
            (typeof c == "number"
              ? n.navigate(c)
              : await n.navigate(c, { fromRouteId: l, ...f }));
      },
      [n, l]
    )
  );
}
var fy = {};
function y1(n, l, i) {
  !l && !fy[n] && ((fy[n] = !0), jn(!1, i));
}
w.memo(sx);
function sx({ routes: n, future: l, state: i }) {
  return p1(n, void 0, i, l);
}
function An({ to: n, replace: l, state: i, relative: r }) {
  $e(
    ei(),
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let { static: c } = w.useContext(Bn);
  jn(
    !c,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change."
  );
  let { matches: f } = w.useContext(Nn),
    { pathname: d } = st(),
    y = gt(),
    p = qd(n, Vd(f), d, r === "path"),
    m = JSON.stringify(p);
  return (
    w.useEffect(() => {
      y(JSON.parse(m), { replace: l, state: i, relative: r });
    }, [y, m, r, l, i]),
    null
  );
}
function Sr(n) {
  return Yb(n.context);
}
function at(n) {
  $e(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function ix({
  basename: n = "/",
  children: l = null,
  location: i,
  navigationType: r = "POP",
  navigator: c,
  static: f = !1,
}) {
  $e(
    !ei(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let d = n.replace(/^\/*/, "/"),
    y = w.useMemo(
      () => ({ basename: d, navigator: c, static: f, future: {} }),
      [d, c, f]
    );
  typeof i == "string" && (i = Ws(i));
  let {
      pathname: p = "/",
      search: m = "",
      hash: v = "",
      state: b = null,
      key: E = "default",
    } = i,
    j = w.useMemo(() => {
      let _ = ul(p, d);
      return _ == null
        ? null
        : {
            location: { pathname: _, search: m, hash: v, state: b, key: E },
            navigationType: r,
          };
    }, [d, p, m, v, b, E, r]);
  return (
    jn(
      j != null,
      `<Router basename="${d}"> is not able to match the URL "${p}${m}${v}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    j == null
      ? null
      : w.createElement(
          Bn.Provider,
          { value: y },
          w.createElement(br.Provider, { children: l, value: j })
        )
  );
}
function rx({ children: n, location: l }) {
  return Xb(ld(n), l);
}
function ld(n, l = []) {
  let i = [];
  return (
    w.Children.forEach(n, (r, c) => {
      if (!w.isValidElement(r)) return;
      let f = [...l, c];
      if (r.type === w.Fragment) {
        i.push.apply(i, ld(r.props.children, f));
        return;
      }
      $e(
        r.type === at,
        `[${
          typeof r.type == "string" ? r.type : r.type.name
        }] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        $e(
          !r.props.index || !r.props.children,
          "An index route cannot have child routes."
        );
      let d = {
        id: r.props.id || f.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (d.children = ld(r.props.children, f)), i.push(d);
    }),
    i
  );
}
var Qu = "get",
  Pu = "application/x-www-form-urlencoded";
function dc(n) {
  return n != null && typeof n.tagName == "string";
}
function ux(n) {
  return dc(n) && n.tagName.toLowerCase() === "button";
}
function cx(n) {
  return dc(n) && n.tagName.toLowerCase() === "form";
}
function ox(n) {
  return dc(n) && n.tagName.toLowerCase() === "input";
}
function fx(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function dx(n, l) {
  return n.button === 0 && (!l || l === "_self") && !fx(n);
}
function sd(n = "") {
  return new URLSearchParams(
    typeof n == "string" || Array.isArray(n) || n instanceof URLSearchParams
      ? n
      : Object.keys(n).reduce((l, i) => {
          let r = n[i];
          return l.concat(Array.isArray(r) ? r.map((c) => [i, c]) : [[i, r]]);
        }, [])
  );
}
function hx(n, l) {
  let i = sd(n);
  return (
    l &&
      l.forEach((r, c) => {
        i.has(c) ||
          l.getAll(c).forEach((f) => {
            i.append(c, f);
          });
      }),
    i
  );
}
var ku = null;
function mx() {
  if (ku === null)
    try {
      new FormData(document.createElement("form"), 0), (ku = !1);
    } catch {
      ku = !0;
    }
  return ku;
}
var px = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Pf(n) {
  return n != null && !px.has(n)
    ? (jn(
        !1,
        `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Pu}"`
      ),
      null)
    : n;
}
function yx(n, l) {
  let i, r, c, f, d;
  if (cx(n)) {
    let y = n.getAttribute("action");
    (r = y ? ul(y, l) : null),
      (i = n.getAttribute("method") || Qu),
      (c = Pf(n.getAttribute("enctype")) || Pu),
      (f = new FormData(n));
  } else if (ux(n) || (ox(n) && (n.type === "submit" || n.type === "image"))) {
    let y = n.form;
    if (y == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = n.getAttribute("formaction") || y.getAttribute("action");
    if (
      ((r = p ? ul(p, l) : null),
      (i = n.getAttribute("formmethod") || y.getAttribute("method") || Qu),
      (c =
        Pf(n.getAttribute("formenctype")) ||
        Pf(y.getAttribute("enctype")) ||
        Pu),
      (f = new FormData(y, n)),
      !mx())
    ) {
      let { name: m, type: v, value: b } = n;
      if (v === "image") {
        let E = m ? `${m}.` : "";
        f.append(`${E}x`, "0"), f.append(`${E}y`, "0");
      } else m && f.append(m, b);
    }
  } else {
    if (dc(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (i = Qu), (r = null), (c = Pu), (d = n);
  }
  return (
    f && c === "text/plain" && ((d = f), (f = void 0)),
    { action: r, method: i.toLowerCase(), encType: c, formData: f, body: d }
  );
}
function Pd(n, l) {
  if (n === !1 || n === null || typeof n > "u") throw new Error(l);
}
async function gx(n, l) {
  if (n.id in l) return l[n.id];
  try {
    let i = await import(n.module);
    return (l[n.id] = i), i;
  } catch (i) {
    return (
      console.error(
        `Error loading route module \`${n.module}\`, reloading page...`
      ),
      console.error(i),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function vx(n) {
  return n == null
    ? !1
    : n.href == null
    ? n.rel === "preload" &&
      typeof n.imageSrcSet == "string" &&
      typeof n.imageSizes == "string"
    : typeof n.rel == "string" && typeof n.href == "string";
}
async function bx(n, l, i) {
  let r = await Promise.all(
    n.map(async (c) => {
      let f = l.routes[c.route.id];
      if (f) {
        let d = await gx(f, i);
        return d.links ? d.links() : [];
      }
      return [];
    })
  );
  return Ex(
    r
      .flat(1)
      .filter(vx)
      .filter((c) => c.rel === "stylesheet" || c.rel === "preload")
      .map((c) =>
        c.rel === "stylesheet"
          ? { ...c, rel: "prefetch", as: "style" }
          : { ...c, rel: "prefetch" }
      )
  );
}
function dy(n, l, i, r, c, f) {
  let d = (p, m) => (i[m] ? p.route.id !== i[m].route.id : !0),
    y = (p, m) => {
      var v;
      return (
        i[m].pathname !== p.pathname ||
        (((v = i[m].route.path) == null ? void 0 : v.endsWith("*")) &&
          i[m].params["*"] !== p.params["*"])
      );
    };
  return f === "assets"
    ? l.filter((p, m) => d(p, m) || y(p, m))
    : f === "data"
    ? l.filter((p, m) => {
        var b;
        let v = r.routes[p.route.id];
        if (!v || !v.hasLoader) return !1;
        if (d(p, m) || y(p, m)) return !0;
        if (p.route.shouldRevalidate) {
          let E = p.route.shouldRevalidate({
            currentUrl: new URL(c.pathname + c.search + c.hash, window.origin),
            currentParams: ((b = i[0]) == null ? void 0 : b.params) || {},
            nextUrl: new URL(n, window.origin),
            nextParams: p.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof E == "boolean") return E;
        }
        return !0;
      })
    : [];
}
function xx(n, l, { includeHydrateFallback: i } = {}) {
  return Sx(
    n
      .map((r) => {
        let c = l.routes[r.route.id];
        if (!c) return [];
        let f = [c.module];
        return (
          c.clientActionModule && (f = f.concat(c.clientActionModule)),
          c.clientLoaderModule && (f = f.concat(c.clientLoaderModule)),
          i &&
            c.hydrateFallbackModule &&
            (f = f.concat(c.hydrateFallbackModule)),
          c.imports && (f = f.concat(c.imports)),
          f
        );
      })
      .flat(1)
  );
}
function Sx(n) {
  return [...new Set(n)];
}
function wx(n) {
  let l = {},
    i = Object.keys(n).sort();
  for (let r of i) l[r] = n[r];
  return l;
}
function Ex(n, l) {
  let i = new Set();
  return (
    new Set(l),
    n.reduce((r, c) => {
      let f = JSON.stringify(wx(c));
      return i.has(f) || (i.add(f), r.push({ key: f, link: c })), r;
    }, [])
  );
}
function _x(n) {
  let l =
    typeof n == "string"
      ? new URL(
          n,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : n;
  return (
    l.pathname === "/"
      ? (l.pathname = "_root.data")
      : (l.pathname = `${l.pathname.replace(/\/$/, "")}.data`),
    l
  );
}
function Rx() {
  let n = w.useContext(Is);
  return (
    Pd(
      n,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    n
  );
}
function jx() {
  let n = w.useContext(fc);
  return (
    Pd(
      n,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    n
  );
}
var Yd = w.createContext(void 0);
Yd.displayName = "FrameworkContext";
function g1() {
  let n = w.useContext(Yd);
  return (
    Pd(n, "You must render this element inside a <HydratedRouter> element"), n
  );
}
function Nx(n, l) {
  let i = w.useContext(Yd),
    [r, c] = w.useState(!1),
    [f, d] = w.useState(!1),
    {
      onFocus: y,
      onBlur: p,
      onMouseEnter: m,
      onMouseLeave: v,
      onTouchStart: b,
    } = l,
    E = w.useRef(null);
  w.useEffect(() => {
    if ((n === "render" && d(!0), n === "viewport")) {
      let D = (U) => {
          U.forEach((L) => {
            d(L.isIntersecting);
          });
        },
        T = new IntersectionObserver(D, { threshold: 0.5 });
      return (
        E.current && T.observe(E.current),
        () => {
          T.disconnect();
        }
      );
    }
  }, [n]),
    w.useEffect(() => {
      if (r) {
        let D = setTimeout(() => {
          d(!0);
        }, 100);
        return () => {
          clearTimeout(D);
        };
      }
    }, [r]);
  let j = () => {
      c(!0);
    },
    _ = () => {
      c(!1), d(!1);
    };
  return i
    ? n !== "intent"
      ? [f, E, {}]
      : [
          f,
          E,
          {
            onFocus: sr(y, j),
            onBlur: sr(p, _),
            onMouseEnter: sr(m, j),
            onMouseLeave: sr(v, _),
            onTouchStart: sr(b, j),
          },
        ]
    : [!1, E, {}];
}
function sr(n, l) {
  return (i) => {
    n && n(i), i.defaultPrevented || l(i);
  };
}
function Ax({ page: n, ...l }) {
  let { router: i } = Rx(),
    r = w.useMemo(() => u1(i.routes, n, i.basename), [i.routes, n, i.basename]);
  return r ? w.createElement(Cx, { page: n, matches: r, ...l }) : null;
}
function Tx(n) {
  let { manifest: l, routeModules: i } = g1(),
    [r, c] = w.useState([]);
  return (
    w.useEffect(() => {
      let f = !1;
      return (
        bx(n, l, i).then((d) => {
          f || c(d);
        }),
        () => {
          f = !0;
        }
      );
    }, [n, l, i]),
    r
  );
}
function Cx({ page: n, matches: l, ...i }) {
  let r = st(),
    { manifest: c, routeModules: f } = g1(),
    { loaderData: d, matches: y } = jx(),
    p = w.useMemo(() => dy(n, l, y, c, r, "data"), [n, l, y, c, r]),
    m = w.useMemo(() => dy(n, l, y, c, r, "assets"), [n, l, y, c, r]),
    v = w.useMemo(() => {
      if (n === r.pathname + r.search + r.hash) return [];
      let j = new Set(),
        _ = !1;
      if (
        (l.forEach((T) => {
          var L;
          let U = c.routes[T.route.id];
          !U ||
            !U.hasLoader ||
            ((!p.some((V) => V.route.id === T.route.id) &&
              T.route.id in d &&
              (L = f[T.route.id]) != null &&
              L.shouldRevalidate) ||
            U.hasClientLoader
              ? (_ = !0)
              : j.add(T.route.id));
        }),
        j.size === 0)
      )
        return [];
      let D = _x(n);
      return (
        _ &&
          j.size > 0 &&
          D.searchParams.set(
            "_routes",
            l
              .filter((T) => j.has(T.route.id))
              .map((T) => T.route.id)
              .join(",")
          ),
        [D.pathname + D.search]
      );
    }, [d, r, c, p, l, n, f]),
    b = w.useMemo(() => xx(m, c), [m, c]),
    E = Tx(m);
  return w.createElement(
    w.Fragment,
    null,
    v.map((j) =>
      w.createElement("link", {
        key: j,
        rel: "prefetch",
        as: "fetch",
        href: j,
        ...i,
      })
    ),
    b.map((j) =>
      w.createElement("link", { key: j, rel: "modulepreload", href: j, ...i })
    ),
    E.map(({ key: j, link: _ }) => w.createElement("link", { key: j, ..._ }))
  );
}
function Ox(...n) {
  return (l) => {
    n.forEach((i) => {
      typeof i == "function" ? i(l) : i != null && (i.current = l);
    });
  };
}
var v1 =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  v1 && (window.__reactRouterVersion = "7.2.0");
} catch {}
function Dx({ basename: n, children: l, window: i }) {
  let r = w.useRef();
  r.current == null && (r.current = yb({ window: i, v5Compat: !0 }));
  let c = r.current,
    [f, d] = w.useState({ action: c.action, location: c.location }),
    y = w.useCallback(
      (p) => {
        w.startTransition(() => d(p));
      },
      [d]
    );
  return (
    w.useLayoutEffect(() => c.listen(y), [c, y]),
    w.createElement(ix, {
      basename: n,
      children: l,
      location: f.location,
      navigationType: f.action,
      navigator: c,
    })
  );
}
var b1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  cl = w.forwardRef(function (
    {
      onClick: l,
      discover: i = "render",
      prefetch: r = "none",
      relative: c,
      reloadDocument: f,
      replace: d,
      state: y,
      target: p,
      to: m,
      preventScrollReset: v,
      viewTransition: b,
      ...E
    },
    j
  ) {
    let { basename: _ } = w.useContext(Bn),
      D = typeof m == "string" && b1.test(m),
      T,
      U = !1;
    if (typeof m == "string" && D && ((T = m), v1))
      try {
        let G = new URL(window.location.href),
          le = m.startsWith("//") ? new URL(G.protocol + m) : new URL(m),
          ke = ul(le.pathname, _);
        le.origin === G.origin && ke != null
          ? (m = ke + le.search + le.hash)
          : (U = !0);
      } catch {
        jn(
          !1,
          `<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let L = Fb(m, { relative: c }),
      [V, I, Y] = Nx(r, E),
      te = Lx(m, {
        replace: d,
        state: y,
        target: p,
        preventScrollReset: v,
        relative: c,
        viewTransition: b,
      });
    function de(G) {
      l && l(G), G.defaultPrevented || te(G);
    }
    let ee = w.createElement("a", {
      ...E,
      ...Y,
      href: T || L,
      onClick: U || f ? l : de,
      ref: Ox(j, I),
      target: p,
      "data-discover": !D && i === "render" ? "true" : void 0,
    });
    return V && !D
      ? w.createElement(w.Fragment, null, ee, w.createElement(Ax, { page: L }))
      : ee;
  });
cl.displayName = "Link";
var Mx = w.forwardRef(function (
  {
    "aria-current": l = "page",
    caseSensitive: i = !1,
    className: r = "",
    end: c = !1,
    style: f,
    to: d,
    viewTransition: y,
    children: p,
    ...m
  },
  v
) {
  let b = xr(d, { relative: m.relative }),
    E = st(),
    j = w.useContext(fc),
    { navigator: _, basename: D } = w.useContext(Bn),
    T = j != null && kx(b) && y === !0,
    U = _.encodeLocation ? _.encodeLocation(b).pathname : b.pathname,
    L = E.pathname,
    V =
      j && j.navigation && j.navigation.location
        ? j.navigation.location.pathname
        : null;
  i ||
    ((L = L.toLowerCase()),
    (V = V ? V.toLowerCase() : null),
    (U = U.toLowerCase())),
    V && D && (V = ul(V, D) || V);
  const I = U !== "/" && U.endsWith("/") ? U.length - 1 : U.length;
  let Y = L === U || (!c && L.startsWith(U) && L.charAt(I) === "/"),
    te =
      V != null &&
      (V === U || (!c && V.startsWith(U) && V.charAt(U.length) === "/")),
    de = { isActive: Y, isPending: te, isTransitioning: T },
    ee = Y ? l : void 0,
    G;
  typeof r == "function"
    ? (G = r(de))
    : (G = [
        r,
        Y ? "active" : null,
        te ? "pending" : null,
        T ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let le = typeof f == "function" ? f(de) : f;
  return w.createElement(
    cl,
    {
      ...m,
      "aria-current": ee,
      className: G,
      ref: v,
      style: le,
      to: d,
      viewTransition: y,
    },
    typeof p == "function" ? p(de) : p
  );
});
Mx.displayName = "NavLink";
var Ux = w.forwardRef(
  (
    {
      discover: n = "render",
      fetcherKey: l,
      navigate: i,
      reloadDocument: r,
      replace: c,
      state: f,
      method: d = Qu,
      action: y,
      onSubmit: p,
      relative: m,
      preventScrollReset: v,
      viewTransition: b,
      ...E
    },
    j
  ) => {
    let _ = Vx(),
      D = qx(y, { relative: m }),
      T = d.toLowerCase() === "get" ? "get" : "post",
      U = typeof y == "string" && b1.test(y),
      L = (V) => {
        if ((p && p(V), V.defaultPrevented)) return;
        V.preventDefault();
        let I = V.nativeEvent.submitter,
          Y = (I == null ? void 0 : I.getAttribute("formmethod")) || d;
        _(I || V.currentTarget, {
          fetcherKey: l,
          method: Y,
          navigate: i,
          replace: c,
          state: f,
          relative: m,
          preventScrollReset: v,
          viewTransition: b,
        });
      };
    return w.createElement("form", {
      ref: j,
      method: T,
      action: D,
      onSubmit: r ? p : L,
      ...E,
      "data-discover": !U && n === "render" ? "true" : void 0,
    });
  }
);
Ux.displayName = "Form";
function zx(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function x1(n) {
  let l = w.useContext(Is);
  return $e(l, zx(n)), l;
}
function Lx(
  n,
  {
    target: l,
    replace: i,
    state: r,
    preventScrollReset: c,
    relative: f,
    viewTransition: d,
  } = {}
) {
  let y = gt(),
    p = st(),
    m = xr(n, { relative: f });
  return w.useCallback(
    (v) => {
      if (dx(v, l)) {
        v.preventDefault();
        let b = i !== void 0 ? i : fr(p) === fr(m);
        y(n, {
          replace: b,
          state: r,
          preventScrollReset: c,
          relative: f,
          viewTransition: d,
        });
      }
    },
    [p, y, m, i, r, l, n, c, f, d]
  );
}
function Ra(n) {
  jn(
    typeof URLSearchParams < "u",
    "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params."
  );
  let l = w.useRef(sd(n)),
    i = w.useRef(!1),
    r = st(),
    c = w.useMemo(() => hx(r.search, i.current ? null : l.current), [r.search]),
    f = gt(),
    d = w.useCallback(
      (y, p) => {
        const m = sd(typeof y == "function" ? y(c) : y);
        (i.current = !0), f("?" + m, p);
      },
      [f, c]
    );
  return [c, d];
}
var Hx = 0,
  Bx = () => `__${String(++Hx)}__`;
function Vx() {
  let { router: n } = x1("useSubmit"),
    { basename: l } = w.useContext(Bn),
    i = nx();
  return w.useCallback(
    async (r, c = {}) => {
      let { action: f, method: d, encType: y, formData: p, body: m } = yx(r, l);
      if (c.navigate === !1) {
        let v = c.fetcherKey || Bx();
        await n.fetch(v, i, c.action || f, {
          preventScrollReset: c.preventScrollReset,
          formData: p,
          body: m,
          formMethod: c.method || d,
          formEncType: c.encType || y,
          flushSync: c.flushSync,
        });
      } else
        await n.navigate(c.action || f, {
          preventScrollReset: c.preventScrollReset,
          formData: p,
          body: m,
          formMethod: c.method || d,
          formEncType: c.encType || y,
          replace: c.replace,
          state: c.state,
          fromRouteId: i,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition,
        });
    },
    [n, l, i]
  );
}
function qx(n, { relative: l } = {}) {
  let { basename: i } = w.useContext(Bn),
    r = w.useContext(Nn);
  $e(r, "useFormAction must be used inside a RouteContext");
  let [c] = r.matches.slice(-1),
    f = { ...xr(n || ".", { relative: l }) },
    d = st();
  if (n == null) {
    f.search = d.search;
    let y = new URLSearchParams(f.search),
      p = y.getAll("index");
    if (p.some((v) => v === "")) {
      y.delete("index"),
        p.filter((b) => b).forEach((b) => y.append("index", b));
      let v = y.toString();
      f.search = v ? `?${v}` : "";
    }
  }
  return (
    (!n || n === ".") &&
      c.route.index &&
      (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"),
    i !== "/" && (f.pathname = f.pathname === "/" ? i : Ea([i, f.pathname])),
    fr(f)
  );
}
function kx(n, l = {}) {
  let i = w.useContext(d1);
  $e(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = x1("useViewTransitionState"),
    c = xr(n, { relative: l.relative });
  if (!i.isTransitioning) return !1;
  let f = ul(i.currentLocation.pathname, r) || i.currentLocation.pathname,
    d = ul(i.nextLocation.pathname, r) || i.nextLocation.pathname;
  return Ju(c.pathname, d) != null || Ju(c.pathname, f) != null;
}
new TextEncoder();
const It = () => {
    w.useEffect(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    }, []);
  },
  Fx = () => (
    It(),
    h.jsx("div", {
      className: "w-full flex flex-col items-center gap-y-5",
      children: h.jsxs("div", {
        className: "w-full flex flex-col items-start gap-y-3",
        children: [
          h.jsx("span", {
            className: "txt__04 text-[whitesmoke]",
            children: "Order Comfortably From Home",
          }),
          h.jsx("span", {
            className: "txt__04 text-[whitesmoke]",
            children: "Or Manage Your Business From Anywhere",
          }),
        ],
      }),
    })
  );
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Qx = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  S1 = (...n) =>
    n
      .filter((l, i, r) => !!l && l.trim() !== "" && r.indexOf(l) === i)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Px = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Yx = w.forwardRef(
  (
    {
      color: n = "currentColor",
      size: l = 24,
      strokeWidth: i = 2,
      absoluteStrokeWidth: r,
      className: c = "",
      children: f,
      iconNode: d,
      ...y
    },
    p
  ) =>
    w.createElement(
      "svg",
      {
        ref: p,
        ...Px,
        width: l,
        height: l,
        stroke: n,
        strokeWidth: r ? (Number(i) * 24) / Number(l) : i,
        className: S1("lucide", c),
        ...y,
      },
      [
        ...d.map(([m, v]) => w.createElement(m, v)),
        ...(Array.isArray(f) ? f : [f]),
      ]
    )
);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ze = (n, l) => {
  const i = w.forwardRef(({ className: r, ...c }, f) =>
    w.createElement(Yx, {
      ref: f,
      iconNode: l,
      className: S1(`lucide-${Qx(n)}`, r),
      ...c,
    })
  );
  return (i.displayName = `${n}`), i;
};
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Gx = [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
        key: "3c2336",
      },
    ],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
    ["line", { x1: "12", x2: "12.01", y1: "17", y2: "17", key: "io3f8k" }],
  ],
  Xx = ze("BadgeHelp", Gx);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Zx = [
    ["circle", { cx: "12.5", cy: "8.5", r: "2.5", key: "9738u8" }],
    [
      "path",
      {
        d: "M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z",
        key: "o0f6za",
      },
    ],
    [
      "path",
      {
        d: "m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5",
        key: "k7p6i0",
      },
    ],
  ],
  Kx = ze("Beef", Zx);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $x = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]],
  Jx = ze("ChevronDown", $x);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Wx = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]],
  Ix = ze("ChevronLeft", Wx);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const eS = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]],
  tS = ze("ChevronRight", eS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nS = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]],
  aS = ze("ChevronUp", nS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const lS = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ],
  hc = ze("CircleCheckBig", lS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const sS = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  iS = ze("CircleCheck", sS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const rS = [
    ["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }],
    ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ],
  uS = ze("CircleUserRound", rS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const cS = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
    [
      "path",
      { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662", key: "154egf" },
    ],
  ],
  hy = ze("CircleUser", cS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const oS = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
    ["path", { d: "m9 9 6 6", key: "z0biqf" }],
  ],
  Gd = ze("CircleX", oS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const fS = [
    [
      "path",
      {
        d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5",
        key: "laymnq",
      },
    ],
    ["path", { d: "M8.5 8.5v.01", key: "ue8clq" }],
    ["path", { d: "M16 15.5v.01", key: "14dtrp" }],
    ["path", { d: "M12 12v.01", key: "u5ubse" }],
    ["path", { d: "M11 17v.01", key: "1hyl5a" }],
    ["path", { d: "M7 14v.01", key: "uct60s" }],
  ],
  dS = ze("Cookie", fS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const hS = [
    [
      "path",
      {
        d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
        key: "ct8e1f",
      },
    ],
    ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
    [
      "path",
      {
        d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
        key: "13bj9a",
      },
    ],
    ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ],
  mS = ze("EyeOff", hS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const pS = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  yS = ze("Eye", pS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const gS = [
    [
      "path",
      {
        d: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",
        key: "15baut",
      },
    ],
    ["path", { d: "M18 12v.5", key: "18hhni" }],
    ["path", { d: "M16 17.93a9.77 9.77 0 0 1 0-11.86", key: "16dt7o" }],
    [
      "path",
      {
        d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",
        key: "l9di03",
      },
    ],
    [
      "path",
      {
        d: "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4",
        key: "1kjonw",
      },
    ],
    [
      "path",
      {
        d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98",
        key: "1zlm23",
      },
    ],
  ],
  vS = ze("Fish", gS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const bS = [
    [
      "path",
      {
        d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
        key: "tonef",
      },
    ],
    ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }],
  ],
  xS = ze("Github", bS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const SS = [
    [
      "path",
      { d: "M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856", key: "1k1t7q" },
    ],
    [
      "path",
      {
        d: "M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288",
        key: "153t1g",
      },
    ],
    [
      "path",
      {
        d: "M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025",
        key: "gzrt0n",
      },
    ],
    ["path", { d: "m8.5 16.5-1-1", key: "otr954" }],
  ],
  wS = ze("Ham", SS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ES = [
    ["path", { d: "M10 22v-6.57", key: "1wmca3" }],
    ["path", { d: "M12 11h.01", key: "z322tv" }],
    ["path", { d: "M12 7h.01", key: "1ivr5q" }],
    ["path", { d: "M14 15.43V22", key: "1q2vjd" }],
    ["path", { d: "M15 16a5 5 0 0 0-6 0", key: "o9wqvi" }],
    ["path", { d: "M16 11h.01", key: "xkw8gn" }],
    ["path", { d: "M16 7h.01", key: "1kdx03" }],
    ["path", { d: "M8 11h.01", key: "1dfujw" }],
    ["path", { d: "M8 7h.01", key: "1vti4s" }],
    [
      "rect",
      { x: "4", y: "2", width: "16", height: "20", rx: "2", key: "1uxh74" },
    ],
  ],
  _S = ze("Hotel", ES);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const RS = [
    [
      "path",
      { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" },
    ],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        key: "1d0kgt",
      },
    ],
  ],
  jS = ze("House", RS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const NS = [
    ["path", { d: "m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11", key: "1v6356" }],
    ["path", { d: "M17 7A5 5 0 0 0 7 7", key: "151p3v" }],
    ["path", { d: "M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4", key: "1sdaij" }],
  ],
  AS = ze("IceCreamCone", NS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const TS = [
    [
      "path",
      {
        d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
        key: "1s6t7t",
      },
    ],
    [
      "circle",
      { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" },
    ],
  ],
  w1 = ze("KeyRound", TS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const CS = [
    ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }],
    ["polyline", { points: "10 17 15 12 10 7", key: "1ail0h" }],
    ["line", { x1: "15", x2: "3", y1: "12", y2: "12", key: "v6grx8" }],
  ],
  E1 = ze("LogIn", CS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const OS = [
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
    ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
    ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }],
  ],
  _1 = ze("LogOut", OS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const DS = [
    [
      "rect",
      { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" },
    ],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ],
  MS = ze("Mail", DS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const US = [
    ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
    ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
    ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }],
  ],
  zS = ze("Menu", US);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const LS = [
    ["path", { d: "m12 14-1 1", key: "11onhr" }],
    ["path", { d: "m13.75 18.25-1.25 1.42", key: "1yisr3" }],
    [
      "path",
      { d: "M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12", key: "1qtqk6" },
    ],
    ["path", { d: "M18.8 9.3a1 1 0 0 0 2.1 7.7", key: "fbbbr2" }],
    [
      "path",
      {
        d: "M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",
        key: "1hyfdd",
      },
    ],
  ],
  HS = ze("Pizza", LS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const BS = [
    [
      "path",
      {
        d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
        key: "icamh8",
      },
    ],
    ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
    ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
    ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
    ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }],
  ],
  VS = ze("Ruler", BS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qS = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y",
      },
    ],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  R1 = ze("ShieldCheck", qS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const kS = [
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
    ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
    ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
    ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
  ],
  j1 = ze("Trash2", kS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const FS = [
    ["path", { d: "M11.5 15H7a4 4 0 0 0-4 4v2", key: "15lzij" }],
    [
      "path",
      {
        d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
        key: "1817ys",
      },
    ],
    ["circle", { cx: "10", cy: "7", r: "4", key: "e45bow" }],
  ],
  N1 = ze("UserPen", FS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const QS = [
    ["path", { d: "M2 21a8 8 0 0 1 10.821-7.487", key: "1c8h7z" }],
    [
      "path",
      {
        d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
        key: "1817ys",
      },
    ],
    ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ],
  PS = ze("UserRoundPen", QS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const YS = [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
  ],
  A1 = ze("User", YS);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const GS = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  Xd = ze("X", GS),
  T1 = w.createContext(null),
  Zd = () => {
    const n = w.useContext(T1);
    if (!n) throw new Error("useGlobal must be used within a GlobalProvider");
    return n;
  },
  Qt = () => Zd().toastState,
  Pt = () => Zd().userState,
  C1 = () => Zd().popupState,
  XS = () => {
    const n = w.useRef(null),
      [l, i] = w.useState(!1),
      r = w.useRef(null),
      { isToast: c, msg: f, type: d, closeToast: y } = Qt();
    return (
      w.useEffect(() => {
        let p;
        return (
          c &&
            (i(!1),
            (p = setTimeout(() => {
              y();
            }, 5e3)),
            (n.current = p)),
          () => {
            clearTimeout(p), c && i(!0), n.current && (n.current = null);
          }
        );
      }, [y, c]),
      w.useEffect(() => {
        r.current &&
          (r.current.classList.remove("toast__container_after"),
          requestAnimationFrame(() => {
            var p;
            return (p = r.current) == null
              ? void 0
              : p.classList.add("toast__container_after");
          }));
      }, [c, y]),
      {
        isToast: c,
        toastRef: r,
        msg: f,
        type: d,
        closeToast: y,
        closeClicked: l,
        setCloseClicked: i,
      }
    );
  },
  ZS = () => {
    const {
      isToast: n,
      msg: l,
      type: i,
      closeToast: r,
      closeClicked: c,
      setCloseClicked: f,
      toastRef: d,
    } = XS();
    return h.jsx("div", {
      id: "toast",
      className: `top-5 right-5 fixed toast__i bg-[#111] rounded-xl text-[whitesmoke] min-w-3/4 sm:min-w-1/2 max-w-3/4 h-fit min-h-[75px] flex border-t-2 border-r-2 transition-all duration-300  ${
        i === "SUCCESS" ? "border-green-600" : "border-red-600"
      } 
      ${
        n
          ? "toast__active_in"
          : !n && c
          ? "toast__active_out"
          : "translate-x-[120%] opacity-0"
      }
      `,
      children: h.jsxs("div", {
        ref: d,
        className: `w-full grid grid-cols-[75px_1fr] relative min-h-full rounded-xl border-l-[8px]  ${
          i === "SUCCESS" ? "border-green-600" : "border-red-600"
        }`,
        style: { "--toast-color": i === "SUCCESS" ? "#16a34a" : "#dc2626" },
        children: [
          h.jsx("div", {
            className: "w-full flex flex-col items-center justify-center",
            children:
              i === "SUCCESS"
                ? h.jsx(iS, {
                    className:
                      "h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] text-green-600",
                  })
                : h.jsx(Gd, {
                    className:
                      "h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] text-red-600",
                  }),
          }),
          h.jsx("div", {
            className: `absolute txt__03 top-3 left-[75px] ${
              i === "SUCCESS" ? "text-green-600" : "text-red-600"
            }`,
            children: i,
          }),
          h.jsx("div", {
            onClick: () => {
              f(!0), r();
            },
            className: "absolute right-5 top-3 ",
            children: h.jsx(Xd, {
              className:
                "h-[30px] w-[30px] sm:w-[32px] sm:h-[32px] text-red-600 hover:scale-120 btn__pseudo",
            }),
          }),
          h.jsx("div", {
            className: "w-full flex justify-start pr-6 pb-6 pt-12",
            children: h.jsx("span", { className: "txt__03", children: l }),
          }),
        ],
      }),
    });
  };
var ti = class {
    constructor() {
      (this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this));
    }
    subscribe(n) {
      return (
        this.listeners.add(n),
        this.onSubscribe(),
        () => {
          this.listeners.delete(n), this.onUnsubscribe();
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  Xl = typeof window > "u" || "Deno" in globalThis;
function Rn() {}
function KS(n, l) {
  return typeof n == "function" ? n(l) : n;
}
function id(n) {
  return typeof n == "number" && n >= 0 && n !== 1 / 0;
}
function O1(n, l) {
  return Math.max(n + (l || 0) - Date.now(), 0);
}
function Us(n, l) {
  return typeof n == "function" ? n(l) : n;
}
function Ln(n, l) {
  return typeof n == "function" ? n(l) : n;
}
function my(n, l) {
  const {
    type: i = "all",
    exact: r,
    fetchStatus: c,
    predicate: f,
    queryKey: d,
    stale: y,
  } = n;
  if (d) {
    if (r) {
      if (l.queryHash !== Kd(d, l.options)) return !1;
    } else if (!dr(l.queryKey, d)) return !1;
  }
  if (i !== "all") {
    const p = l.isActive();
    if ((i === "active" && !p) || (i === "inactive" && p)) return !1;
  }
  return !(
    (typeof y == "boolean" && l.isStale() !== y) ||
    (c && c !== l.state.fetchStatus) ||
    (f && !f(l))
  );
}
function py(n, l) {
  const { exact: i, status: r, predicate: c, mutationKey: f } = n;
  if (f) {
    if (!l.options.mutationKey) return !1;
    if (i) {
      if (Zl(l.options.mutationKey) !== Zl(f)) return !1;
    } else if (!dr(l.options.mutationKey, f)) return !1;
  }
  return !((r && l.state.status !== r) || (c && !c(l)));
}
function Kd(n, l) {
  return ((l == null ? void 0 : l.queryKeyHashFn) || Zl)(n);
}
function Zl(n) {
  return JSON.stringify(n, (l, i) =>
    rd(i)
      ? Object.keys(i)
          .sort()
          .reduce((r, c) => ((r[c] = i[c]), r), {})
      : i
  );
}
function dr(n, l) {
  return n === l
    ? !0
    : typeof n != typeof l
    ? !1
    : n && l && typeof n == "object" && typeof l == "object"
    ? !Object.keys(l).some((i) => !dr(n[i], l[i]))
    : !1;
}
function D1(n, l) {
  if (n === l) return n;
  const i = yy(n) && yy(l);
  if (i || (rd(n) && rd(l))) {
    const r = i ? n : Object.keys(n),
      c = r.length,
      f = i ? l : Object.keys(l),
      d = f.length,
      y = i ? [] : {};
    let p = 0;
    for (let m = 0; m < d; m++) {
      const v = i ? m : f[m];
      ((!i && r.includes(v)) || i) && n[v] === void 0 && l[v] === void 0
        ? ((y[v] = void 0), p++)
        : ((y[v] = D1(n[v], l[v])), y[v] === n[v] && n[v] !== void 0 && p++);
    }
    return c === d && p === c ? n : y;
  }
  return l;
}
function Wu(n, l) {
  if (!l || Object.keys(n).length !== Object.keys(l).length) return !1;
  for (const i in n) if (n[i] !== l[i]) return !1;
  return !0;
}
function yy(n) {
  return Array.isArray(n) && n.length === Object.keys(n).length;
}
function rd(n) {
  if (!gy(n)) return !1;
  const l = n.constructor;
  if (l === void 0) return !0;
  const i = l.prototype;
  return !(
    !gy(i) ||
    !i.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(n) !== Object.prototype
  );
}
function gy(n) {
  return Object.prototype.toString.call(n) === "[object Object]";
}
function $S(n) {
  return new Promise((l) => {
    setTimeout(l, n);
  });
}
function ud(n, l, i) {
  return typeof i.structuralSharing == "function"
    ? i.structuralSharing(n, l)
    : i.structuralSharing !== !1
    ? D1(n, l)
    : l;
}
function JS(n, l, i = 0) {
  const r = [...n, l];
  return i && r.length > i ? r.slice(1) : r;
}
function WS(n, l, i = 0) {
  const r = [l, ...n];
  return i && r.length > i ? r.slice(0, -1) : r;
}
var $d = Symbol();
function M1(n, l) {
  return !n.queryFn && l != null && l.initialPromise
    ? () => l.initialPromise
    : !n.queryFn || n.queryFn === $d
    ? () => Promise.reject(new Error(`Missing queryFn: '${n.queryHash}'`))
    : n.queryFn;
}
var Bl,
  Wa,
  Hs,
  Wy,
  IS =
    ((Wy = class extends ti {
      constructor() {
        super();
        ye(this, Bl);
        ye(this, Wa);
        ye(this, Hs);
        ne(this, Hs, (l) => {
          if (!Xl && window.addEventListener) {
            const i = () => l();
            return (
              window.addEventListener("visibilitychange", i, !1),
              () => {
                window.removeEventListener("visibilitychange", i);
              }
            );
          }
        });
      }
      onSubscribe() {
        R(this, Wa) || this.setEventListener(R(this, Hs));
      }
      onUnsubscribe() {
        var l;
        this.hasListeners() ||
          ((l = R(this, Wa)) == null || l.call(this), ne(this, Wa, void 0));
      }
      setEventListener(l) {
        var i;
        ne(this, Hs, l),
          (i = R(this, Wa)) == null || i.call(this),
          ne(
            this,
            Wa,
            l((r) => {
              typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
            })
          );
      }
      setFocused(l) {
        R(this, Bl) !== l && (ne(this, Bl, l), this.onFocus());
      }
      onFocus() {
        const l = this.isFocused();
        this.listeners.forEach((i) => {
          i(l);
        });
      }
      isFocused() {
        var l;
        return typeof R(this, Bl) == "boolean"
          ? R(this, Bl)
          : ((l = globalThis.document) == null ? void 0 : l.visibilityState) !==
              "hidden";
      }
    }),
    (Bl = new WeakMap()),
    (Wa = new WeakMap()),
    (Hs = new WeakMap()),
    Wy),
  Jd = new IS(),
  Bs,
  Ia,
  Vs,
  Iy,
  e5 =
    ((Iy = class extends ti {
      constructor() {
        super();
        ye(this, Bs, !0);
        ye(this, Ia);
        ye(this, Vs);
        ne(this, Vs, (l) => {
          if (!Xl && window.addEventListener) {
            const i = () => l(!0),
              r = () => l(!1);
            return (
              window.addEventListener("online", i, !1),
              window.addEventListener("offline", r, !1),
              () => {
                window.removeEventListener("online", i),
                  window.removeEventListener("offline", r);
              }
            );
          }
        });
      }
      onSubscribe() {
        R(this, Ia) || this.setEventListener(R(this, Vs));
      }
      onUnsubscribe() {
        var l;
        this.hasListeners() ||
          ((l = R(this, Ia)) == null || l.call(this), ne(this, Ia, void 0));
      }
      setEventListener(l) {
        var i;
        ne(this, Vs, l),
          (i = R(this, Ia)) == null || i.call(this),
          ne(this, Ia, l(this.setOnline.bind(this)));
      }
      setOnline(l) {
        R(this, Bs) !== l &&
          (ne(this, Bs, l),
          this.listeners.forEach((r) => {
            r(l);
          }));
      }
      isOnline() {
        return R(this, Bs);
      }
    }),
    (Bs = new WeakMap()),
    (Ia = new WeakMap()),
    (Vs = new WeakMap()),
    Iy),
  Iu = new e5();
function cd() {
  let n, l;
  const i = new Promise((c, f) => {
    (n = c), (l = f);
  });
  (i.status = "pending"), i.catch(() => {});
  function r(c) {
    Object.assign(i, c), delete i.resolve, delete i.reject;
  }
  return (
    (i.resolve = (c) => {
      r({ status: "fulfilled", value: c }), n(c);
    }),
    (i.reject = (c) => {
      r({ status: "rejected", reason: c }), l(c);
    }),
    i
  );
}
function t5(n) {
  return Math.min(1e3 * 2 ** n, 3e4);
}
function U1(n) {
  return (n ?? "online") === "online" ? Iu.isOnline() : !0;
}
var z1 = class extends Error {
  constructor(n) {
    super("CancelledError"),
      (this.revert = n == null ? void 0 : n.revert),
      (this.silent = n == null ? void 0 : n.silent);
  }
};
function Yf(n) {
  return n instanceof z1;
}
function L1(n) {
  let l = !1,
    i = 0,
    r = !1,
    c;
  const f = cd(),
    d = (D) => {
      var T;
      r || (E(new z1(D)), (T = n.abort) == null || T.call(n));
    },
    y = () => {
      l = !0;
    },
    p = () => {
      l = !1;
    },
    m = () =>
      Jd.isFocused() &&
      (n.networkMode === "always" || Iu.isOnline()) &&
      n.canRun(),
    v = () => U1(n.networkMode) && n.canRun(),
    b = (D) => {
      var T;
      r ||
        ((r = !0),
        (T = n.onSuccess) == null || T.call(n, D),
        c == null || c(),
        f.resolve(D));
    },
    E = (D) => {
      var T;
      r ||
        ((r = !0),
        (T = n.onError) == null || T.call(n, D),
        c == null || c(),
        f.reject(D));
    },
    j = () =>
      new Promise((D) => {
        var T;
        (c = (U) => {
          (r || m()) && D(U);
        }),
          (T = n.onPause) == null || T.call(n);
      }).then(() => {
        var D;
        (c = void 0), r || (D = n.onContinue) == null || D.call(n);
      }),
    _ = () => {
      if (r) return;
      let D;
      const T = i === 0 ? n.initialPromise : void 0;
      try {
        D = T ?? n.fn();
      } catch (U) {
        D = Promise.reject(U);
      }
      Promise.resolve(D)
        .then(b)
        .catch((U) => {
          var te;
          if (r) return;
          const L = n.retry ?? (Xl ? 0 : 3),
            V = n.retryDelay ?? t5,
            I = typeof V == "function" ? V(i, U) : V,
            Y =
              L === !0 ||
              (typeof L == "number" && i < L) ||
              (typeof L == "function" && L(i, U));
          if (l || !Y) {
            E(U);
            return;
          }
          i++,
            (te = n.onFail) == null || te.call(n, i, U),
            $S(I)
              .then(() => (m() ? void 0 : j()))
              .then(() => {
                l ? E(U) : _();
              });
        });
    };
  return {
    promise: f,
    cancel: d,
    continue: () => (c == null || c(), f),
    cancelRetry: y,
    continueRetry: p,
    canStart: v,
    start: () => (v() ? _() : j().then(_), f),
  };
}
function n5() {
  let n = [],
    l = 0,
    i = (y) => {
      y();
    },
    r = (y) => {
      y();
    },
    c = (y) => setTimeout(y, 0);
  const f = (y) => {
      l
        ? n.push(y)
        : c(() => {
            i(y);
          });
    },
    d = () => {
      const y = n;
      (n = []),
        y.length &&
          c(() => {
            r(() => {
              y.forEach((p) => {
                i(p);
              });
            });
          });
    };
  return {
    batch: (y) => {
      let p;
      l++;
      try {
        p = y();
      } finally {
        l--, l || d();
      }
      return p;
    },
    batchCalls:
      (y) =>
      (...p) => {
        f(() => {
          y(...p);
        });
      },
    schedule: f,
    setNotifyFunction: (y) => {
      i = y;
    },
    setBatchNotifyFunction: (y) => {
      r = y;
    },
    setScheduler: (y) => {
      c = y;
    },
  };
}
var St = n5(),
  Vl,
  e1,
  H1 =
    ((e1 = class {
      constructor() {
        ye(this, Vl);
      }
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        this.clearGcTimeout(),
          id(this.gcTime) &&
            ne(
              this,
              Vl,
              setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime)
            );
      }
      updateGcTime(n) {
        this.gcTime = Math.max(
          this.gcTime || 0,
          n ?? (Xl ? 1 / 0 : 5 * 60 * 1e3)
        );
      }
      clearGcTimeout() {
        R(this, Vl) && (clearTimeout(R(this, Vl)), ne(this, Vl, void 0));
      }
    }),
    (Vl = new WeakMap()),
    e1),
  qs,
  ks,
  _n,
  ql,
  zt,
  pr,
  kl,
  Un,
  xa,
  t1,
  a5 =
    ((t1 = class extends H1 {
      constructor(l) {
        super();
        ye(this, Un);
        ye(this, qs);
        ye(this, ks);
        ye(this, _n);
        ye(this, ql);
        ye(this, zt);
        ye(this, pr);
        ye(this, kl);
        ne(this, kl, !1),
          ne(this, pr, l.defaultOptions),
          this.setOptions(l.options),
          (this.observers = []),
          ne(this, ql, l.client),
          ne(this, _n, R(this, ql).getQueryCache()),
          (this.queryKey = l.queryKey),
          (this.queryHash = l.queryHash),
          ne(this, qs, l5(this.options)),
          (this.state = l.state ?? R(this, qs)),
          this.scheduleGc();
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        var l;
        return (l = R(this, zt)) == null ? void 0 : l.promise;
      }
      setOptions(l) {
        (this.options = { ...R(this, pr), ...l }),
          this.updateGcTime(this.options.gcTime);
      }
      optionalRemove() {
        !this.observers.length &&
          this.state.fetchStatus === "idle" &&
          R(this, _n).remove(this);
      }
      setData(l, i) {
        const r = ud(this.state.data, l, this.options);
        return (
          je(this, Un, xa).call(this, {
            data: r,
            type: "success",
            dataUpdatedAt: i == null ? void 0 : i.updatedAt,
            manual: i == null ? void 0 : i.manual,
          }),
          r
        );
      }
      setState(l, i) {
        je(this, Un, xa).call(this, {
          type: "setState",
          state: l,
          setStateOptions: i,
        });
      }
      cancel(l) {
        var r, c;
        const i = (r = R(this, zt)) == null ? void 0 : r.promise;
        return (
          (c = R(this, zt)) == null || c.cancel(l),
          i ? i.then(Rn).catch(Rn) : Promise.resolve()
        );
      }
      destroy() {
        super.destroy(), this.cancel({ silent: !0 });
      }
      reset() {
        this.destroy(), this.setState(R(this, qs));
      }
      isActive() {
        return this.observers.some((l) => Ln(l.options.enabled, this) !== !1);
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === $d ||
              this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
      }
      isStale() {
        return this.state.isInvalidated
          ? !0
          : this.getObserversCount() > 0
          ? this.observers.some((l) => l.getCurrentResult().isStale)
          : this.state.data === void 0;
      }
      isStaleByTime(l = 0) {
        return (
          this.state.isInvalidated ||
          this.state.data === void 0 ||
          !O1(this.state.dataUpdatedAt, l)
        );
      }
      onFocus() {
        var i;
        const l = this.observers.find((r) => r.shouldFetchOnWindowFocus());
        l == null || l.refetch({ cancelRefetch: !1 }),
          (i = R(this, zt)) == null || i.continue();
      }
      onOnline() {
        var i;
        const l = this.observers.find((r) => r.shouldFetchOnReconnect());
        l == null || l.refetch({ cancelRefetch: !1 }),
          (i = R(this, zt)) == null || i.continue();
      }
      addObserver(l) {
        this.observers.includes(l) ||
          (this.observers.push(l),
          this.clearGcTimeout(),
          R(this, _n).notify({
            type: "observerAdded",
            query: this,
            observer: l,
          }));
      }
      removeObserver(l) {
        this.observers.includes(l) &&
          ((this.observers = this.observers.filter((i) => i !== l)),
          this.observers.length ||
            (R(this, zt) &&
              (R(this, kl)
                ? R(this, zt).cancel({ revert: !0 })
                : R(this, zt).cancelRetry()),
            this.scheduleGc()),
          R(this, _n).notify({
            type: "observerRemoved",
            query: this,
            observer: l,
          }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated ||
          je(this, Un, xa).call(this, { type: "invalidate" });
      }
      fetch(l, i) {
        var p, m, v;
        if (this.state.fetchStatus !== "idle") {
          if (this.state.data !== void 0 && i != null && i.cancelRefetch)
            this.cancel({ silent: !0 });
          else if (R(this, zt))
            return R(this, zt).continueRetry(), R(this, zt).promise;
        }
        if ((l && this.setOptions(l), !this.options.queryFn)) {
          const b = this.observers.find((E) => E.options.queryFn);
          b && this.setOptions(b.options);
        }
        const r = new AbortController(),
          c = (b) => {
            Object.defineProperty(b, "signal", {
              enumerable: !0,
              get: () => (ne(this, kl, !0), r.signal),
            });
          },
          f = () => {
            const b = M1(this.options, i),
              E = {
                client: R(this, ql),
                queryKey: this.queryKey,
                meta: this.meta,
              };
            return (
              c(E),
              ne(this, kl, !1),
              this.options.persister ? this.options.persister(b, E, this) : b(E)
            );
          },
          d = {
            fetchOptions: i,
            options: this.options,
            queryKey: this.queryKey,
            client: R(this, ql),
            state: this.state,
            fetchFn: f,
          };
        c(d),
          (p = this.options.behavior) == null || p.onFetch(d, this),
          ne(this, ks, this.state),
          (this.state.fetchStatus === "idle" ||
            this.state.fetchMeta !==
              ((m = d.fetchOptions) == null ? void 0 : m.meta)) &&
            je(this, Un, xa).call(this, {
              type: "fetch",
              meta: (v = d.fetchOptions) == null ? void 0 : v.meta,
            });
        const y = (b) => {
          var E, j, _, D;
          (Yf(b) && b.silent) ||
            je(this, Un, xa).call(this, { type: "error", error: b }),
            Yf(b) ||
              ((j = (E = R(this, _n).config).onError) == null ||
                j.call(E, b, this),
              (D = (_ = R(this, _n).config).onSettled) == null ||
                D.call(_, this.state.data, b, this)),
            this.scheduleGc();
        };
        return (
          ne(
            this,
            zt,
            L1({
              initialPromise: i == null ? void 0 : i.initialPromise,
              fn: d.fetchFn,
              abort: r.abort.bind(r),
              onSuccess: (b) => {
                var E, j, _, D;
                if (b === void 0) {
                  y(new Error(`${this.queryHash} data is undefined`));
                  return;
                }
                try {
                  this.setData(b);
                } catch (T) {
                  y(T);
                  return;
                }
                (j = (E = R(this, _n).config).onSuccess) == null ||
                  j.call(E, b, this),
                  (D = (_ = R(this, _n).config).onSettled) == null ||
                    D.call(_, b, this.state.error, this),
                  this.scheduleGc();
              },
              onError: y,
              onFail: (b, E) => {
                je(this, Un, xa).call(this, {
                  type: "failed",
                  failureCount: b,
                  error: E,
                });
              },
              onPause: () => {
                je(this, Un, xa).call(this, { type: "pause" });
              },
              onContinue: () => {
                je(this, Un, xa).call(this, { type: "continue" });
              },
              retry: d.options.retry,
              retryDelay: d.options.retryDelay,
              networkMode: d.options.networkMode,
              canRun: () => !0,
            })
          ),
          R(this, zt).start()
        );
      }
    }),
    (qs = new WeakMap()),
    (ks = new WeakMap()),
    (_n = new WeakMap()),
    (ql = new WeakMap()),
    (zt = new WeakMap()),
    (pr = new WeakMap()),
    (kl = new WeakMap()),
    (Un = new WeakSet()),
    (xa = function (l) {
      const i = (r) => {
        switch (l.type) {
          case "failed":
            return {
              ...r,
              fetchFailureCount: l.failureCount,
              fetchFailureReason: l.error,
            };
          case "pause":
            return { ...r, fetchStatus: "paused" };
          case "continue":
            return { ...r, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...r,
              ...B1(r.data, this.options),
              fetchMeta: l.meta ?? null,
            };
          case "success":
            return {
              ...r,
              data: l.data,
              dataUpdateCount: r.dataUpdateCount + 1,
              dataUpdatedAt: l.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: !1,
              status: "success",
              ...(!l.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
          case "error":
            const c = l.error;
            return Yf(c) && c.revert && R(this, ks)
              ? { ...R(this, ks), fetchStatus: "idle" }
              : {
                  ...r,
                  error: c,
                  errorUpdateCount: r.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: r.fetchFailureCount + 1,
                  fetchFailureReason: c,
                  fetchStatus: "idle",
                  status: "error",
                };
          case "invalidate":
            return { ...r, isInvalidated: !0 };
          case "setState":
            return { ...r, ...l.state };
        }
      };
      (this.state = i(this.state)),
        St.batch(() => {
          this.observers.forEach((r) => {
            r.onQueryUpdate();
          }),
            R(this, _n).notify({ query: this, type: "updated", action: l });
        });
    }),
    t1);
function B1(n, l) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: U1(l.networkMode) ? "fetching" : "paused",
    ...(n === void 0 && { error: null, status: "pending" }),
  };
}
function l5(n) {
  const l =
      typeof n.initialData == "function" ? n.initialData() : n.initialData,
    i = l !== void 0,
    r = i
      ? typeof n.initialDataUpdatedAt == "function"
        ? n.initialDataUpdatedAt()
        : n.initialDataUpdatedAt
      : 0;
  return {
    data: l,
    dataUpdateCount: 0,
    dataUpdatedAt: i ? r ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: i ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var Kn,
  n1,
  s5 =
    ((n1 = class extends ti {
      constructor(l = {}) {
        super();
        ye(this, Kn);
        (this.config = l), ne(this, Kn, new Map());
      }
      build(l, i, r) {
        const c = i.queryKey,
          f = i.queryHash ?? Kd(c, i);
        let d = this.get(f);
        return (
          d ||
            ((d = new a5({
              client: l,
              queryKey: c,
              queryHash: f,
              options: l.defaultQueryOptions(i),
              state: r,
              defaultOptions: l.getQueryDefaults(c),
            })),
            this.add(d)),
          d
        );
      }
      add(l) {
        R(this, Kn).has(l.queryHash) ||
          (R(this, Kn).set(l.queryHash, l),
          this.notify({ type: "added", query: l }));
      }
      remove(l) {
        const i = R(this, Kn).get(l.queryHash);
        i &&
          (l.destroy(),
          i === l && R(this, Kn).delete(l.queryHash),
          this.notify({ type: "removed", query: l }));
      }
      clear() {
        St.batch(() => {
          this.getAll().forEach((l) => {
            this.remove(l);
          });
        });
      }
      get(l) {
        return R(this, Kn).get(l);
      }
      getAll() {
        return [...R(this, Kn).values()];
      }
      find(l) {
        const i = { exact: !0, ...l };
        return this.getAll().find((r) => my(i, r));
      }
      findAll(l = {}) {
        const i = this.getAll();
        return Object.keys(l).length > 0 ? i.filter((r) => my(l, r)) : i;
      }
      notify(l) {
        St.batch(() => {
          this.listeners.forEach((i) => {
            i(l);
          });
        });
      }
      onFocus() {
        St.batch(() => {
          this.getAll().forEach((l) => {
            l.onFocus();
          });
        });
      }
      onOnline() {
        St.batch(() => {
          this.getAll().forEach((l) => {
            l.onOnline();
          });
        });
      }
    }),
    (Kn = new WeakMap()),
    n1),
  $n,
  qt,
  Fl,
  Jn,
  $a,
  a1,
  i5 =
    ((a1 = class extends H1 {
      constructor(l) {
        super();
        ye(this, Jn);
        ye(this, $n);
        ye(this, qt);
        ye(this, Fl);
        (this.mutationId = l.mutationId),
          ne(this, qt, l.mutationCache),
          ne(this, $n, []),
          (this.state = l.state || V1()),
          this.setOptions(l.options),
          this.scheduleGc();
      }
      setOptions(l) {
        (this.options = l), this.updateGcTime(this.options.gcTime);
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(l) {
        R(this, $n).includes(l) ||
          (R(this, $n).push(l),
          this.clearGcTimeout(),
          R(this, qt).notify({
            type: "observerAdded",
            mutation: this,
            observer: l,
          }));
      }
      removeObserver(l) {
        ne(
          this,
          $n,
          R(this, $n).filter((i) => i !== l)
        ),
          this.scheduleGc(),
          R(this, qt).notify({
            type: "observerRemoved",
            mutation: this,
            observer: l,
          });
      }
      optionalRemove() {
        R(this, $n).length ||
          (this.state.status === "pending"
            ? this.scheduleGc()
            : R(this, qt).remove(this));
      }
      continue() {
        var l;
        return (
          ((l = R(this, Fl)) == null ? void 0 : l.continue()) ??
          this.execute(this.state.variables)
        );
      }
      async execute(l) {
        var c, f, d, y, p, m, v, b, E, j, _, D, T, U, L, V, I, Y, te, de;
        ne(
          this,
          Fl,
          L1({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(l)
                : Promise.reject(new Error("No mutationFn found")),
            onFail: (ee, G) => {
              je(this, Jn, $a).call(this, {
                type: "failed",
                failureCount: ee,
                error: G,
              });
            },
            onPause: () => {
              je(this, Jn, $a).call(this, { type: "pause" });
            },
            onContinue: () => {
              je(this, Jn, $a).call(this, { type: "continue" });
            },
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => R(this, qt).canRun(this),
          })
        );
        const i = this.state.status === "pending",
          r = !R(this, Fl).canStart();
        try {
          if (!i) {
            je(this, Jn, $a).call(this, {
              type: "pending",
              variables: l,
              isPaused: r,
            }),
              await ((f = (c = R(this, qt).config).onMutate) == null
                ? void 0
                : f.call(c, l, this));
            const G = await ((y = (d = this.options).onMutate) == null
              ? void 0
              : y.call(d, l));
            G !== this.state.context &&
              je(this, Jn, $a).call(this, {
                type: "pending",
                context: G,
                variables: l,
                isPaused: r,
              });
          }
          const ee = await R(this, Fl).start();
          return (
            await ((m = (p = R(this, qt).config).onSuccess) == null
              ? void 0
              : m.call(p, ee, l, this.state.context, this)),
            await ((b = (v = this.options).onSuccess) == null
              ? void 0
              : b.call(v, ee, l, this.state.context)),
            await ((j = (E = R(this, qt).config).onSettled) == null
              ? void 0
              : j.call(
                  E,
                  ee,
                  null,
                  this.state.variables,
                  this.state.context,
                  this
                )),
            await ((D = (_ = this.options).onSettled) == null
              ? void 0
              : D.call(_, ee, null, l, this.state.context)),
            je(this, Jn, $a).call(this, { type: "success", data: ee }),
            ee
          );
        } catch (ee) {
          try {
            throw (
              (await ((U = (T = R(this, qt).config).onError) == null
                ? void 0
                : U.call(T, ee, l, this.state.context, this)),
              await ((V = (L = this.options).onError) == null
                ? void 0
                : V.call(L, ee, l, this.state.context)),
              await ((Y = (I = R(this, qt).config).onSettled) == null
                ? void 0
                : Y.call(
                    I,
                    void 0,
                    ee,
                    this.state.variables,
                    this.state.context,
                    this
                  )),
              await ((de = (te = this.options).onSettled) == null
                ? void 0
                : de.call(te, void 0, ee, l, this.state.context)),
              ee)
            );
          } finally {
            je(this, Jn, $a).call(this, { type: "error", error: ee });
          }
        } finally {
          R(this, qt).runNext(this);
        }
      }
    }),
    ($n = new WeakMap()),
    (qt = new WeakMap()),
    (Fl = new WeakMap()),
    (Jn = new WeakSet()),
    ($a = function (l) {
      const i = (r) => {
        switch (l.type) {
          case "failed":
            return {
              ...r,
              failureCount: l.failureCount,
              failureReason: l.error,
            };
          case "pause":
            return { ...r, isPaused: !0 };
          case "continue":
            return { ...r, isPaused: !1 };
          case "pending":
            return {
              ...r,
              context: l.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: l.isPaused,
              status: "pending",
              variables: l.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...r,
              data: l.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...r,
              data: void 0,
              error: l.error,
              failureCount: r.failureCount + 1,
              failureReason: l.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      (this.state = i(this.state)),
        St.batch(() => {
          R(this, $n).forEach((r) => {
            r.onMutationUpdate(l);
          }),
            R(this, qt).notify({ mutation: this, type: "updated", action: l });
        });
    }),
    a1);
function V1() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var Sa,
  zn,
  yr,
  l1,
  r5 =
    ((l1 = class extends ti {
      constructor(l = {}) {
        super();
        ye(this, Sa);
        ye(this, zn);
        ye(this, yr);
        (this.config = l),
          ne(this, Sa, new Set()),
          ne(this, zn, new Map()),
          ne(this, yr, 0);
      }
      build(l, i, r) {
        const c = new i5({
          mutationCache: this,
          mutationId: ++qu(this, yr)._,
          options: l.defaultMutationOptions(i),
          state: r,
        });
        return this.add(c), c;
      }
      add(l) {
        R(this, Sa).add(l);
        const i = Fu(l);
        if (typeof i == "string") {
          const r = R(this, zn).get(i);
          r ? r.push(l) : R(this, zn).set(i, [l]);
        }
        this.notify({ type: "added", mutation: l });
      }
      remove(l) {
        if (R(this, Sa).delete(l)) {
          const i = Fu(l);
          if (typeof i == "string") {
            const r = R(this, zn).get(i);
            if (r)
              if (r.length > 1) {
                const c = r.indexOf(l);
                c !== -1 && r.splice(c, 1);
              } else r[0] === l && R(this, zn).delete(i);
          }
        }
        this.notify({ type: "removed", mutation: l });
      }
      canRun(l) {
        const i = Fu(l);
        if (typeof i == "string") {
          const r = R(this, zn).get(i),
            c =
              r == null ? void 0 : r.find((f) => f.state.status === "pending");
          return !c || c === l;
        } else return !0;
      }
      runNext(l) {
        var r;
        const i = Fu(l);
        if (typeof i == "string") {
          const c =
            (r = R(this, zn).get(i)) == null
              ? void 0
              : r.find((f) => f !== l && f.state.isPaused);
          return (c == null ? void 0 : c.continue()) ?? Promise.resolve();
        } else return Promise.resolve();
      }
      clear() {
        St.batch(() => {
          R(this, Sa).forEach((l) => {
            this.notify({ type: "removed", mutation: l });
          }),
            R(this, Sa).clear(),
            R(this, zn).clear();
        });
      }
      getAll() {
        return Array.from(R(this, Sa));
      }
      find(l) {
        const i = { exact: !0, ...l };
        return this.getAll().find((r) => py(i, r));
      }
      findAll(l = {}) {
        return this.getAll().filter((i) => py(l, i));
      }
      notify(l) {
        St.batch(() => {
          this.listeners.forEach((i) => {
            i(l);
          });
        });
      }
      resumePausedMutations() {
        const l = this.getAll().filter((i) => i.state.isPaused);
        return St.batch(() =>
          Promise.all(l.map((i) => i.continue().catch(Rn)))
        );
      }
    }),
    (Sa = new WeakMap()),
    (zn = new WeakMap()),
    (yr = new WeakMap()),
    l1);
function Fu(n) {
  var l;
  return (l = n.options.scope) == null ? void 0 : l.id;
}
function vy(n) {
  return {
    onFetch: (l, i) => {
      var v, b, E, j, _;
      const r = l.options,
        c =
          (E =
            (b = (v = l.fetchOptions) == null ? void 0 : v.meta) == null
              ? void 0
              : b.fetchMore) == null
            ? void 0
            : E.direction,
        f = ((j = l.state.data) == null ? void 0 : j.pages) || [],
        d = ((_ = l.state.data) == null ? void 0 : _.pageParams) || [];
      let y = { pages: [], pageParams: [] },
        p = 0;
      const m = async () => {
        let D = !1;
        const T = (V) => {
            Object.defineProperty(V, "signal", {
              enumerable: !0,
              get: () => (
                l.signal.aborted
                  ? (D = !0)
                  : l.signal.addEventListener("abort", () => {
                      D = !0;
                    }),
                l.signal
              ),
            });
          },
          U = M1(l.options, l.fetchOptions),
          L = async (V, I, Y) => {
            if (D) return Promise.reject();
            if (I == null && V.pages.length) return Promise.resolve(V);
            const te = {
              client: l.client,
              queryKey: l.queryKey,
              pageParam: I,
              direction: Y ? "backward" : "forward",
              meta: l.options.meta,
            };
            T(te);
            const de = await U(te),
              { maxPages: ee } = l.options,
              G = Y ? WS : JS;
            return {
              pages: G(V.pages, de, ee),
              pageParams: G(V.pageParams, I, ee),
            };
          };
        if (c && f.length) {
          const V = c === "backward",
            I = V ? u5 : by,
            Y = { pages: f, pageParams: d },
            te = I(r, Y);
          y = await L(Y, te, V);
        } else {
          const V = n ?? f.length;
          do {
            const I = p === 0 ? d[0] ?? r.initialPageParam : by(r, y);
            if (p > 0 && I == null) break;
            (y = await L(y, I)), p++;
          } while (p < V);
        }
        return y;
      };
      l.options.persister
        ? (l.fetchFn = () => {
            var D, T;
            return (T = (D = l.options).persister) == null
              ? void 0
              : T.call(
                  D,
                  m,
                  {
                    client: l.client,
                    queryKey: l.queryKey,
                    meta: l.options.meta,
                    signal: l.signal,
                  },
                  i
                );
          })
        : (l.fetchFn = m);
    },
  };
}
function by(n, { pages: l, pageParams: i }) {
  const r = l.length - 1;
  return l.length > 0 ? n.getNextPageParam(l[r], l, i[r], i) : void 0;
}
function u5(n, { pages: l, pageParams: i }) {
  var r;
  return l.length > 0
    ? (r = n.getPreviousPageParam) == null
      ? void 0
      : r.call(n, l[0], l, i[0], i)
    : void 0;
}
var lt,
  el,
  tl,
  Fs,
  Qs,
  nl,
  Ps,
  Ys,
  s1,
  c5 =
    ((s1 = class {
      constructor(n = {}) {
        ye(this, lt);
        ye(this, el);
        ye(this, tl);
        ye(this, Fs);
        ye(this, Qs);
        ye(this, nl);
        ye(this, Ps);
        ye(this, Ys);
        ne(this, lt, n.queryCache || new s5()),
          ne(this, el, n.mutationCache || new r5()),
          ne(this, tl, n.defaultOptions || {}),
          ne(this, Fs, new Map()),
          ne(this, Qs, new Map()),
          ne(this, nl, 0);
      }
      mount() {
        qu(this, nl)._++,
          R(this, nl) === 1 &&
            (ne(
              this,
              Ps,
              Jd.subscribe(async (n) => {
                n &&
                  (await this.resumePausedMutations(), R(this, lt).onFocus());
              })
            ),
            ne(
              this,
              Ys,
              Iu.subscribe(async (n) => {
                n &&
                  (await this.resumePausedMutations(), R(this, lt).onOnline());
              })
            ));
      }
      unmount() {
        var n, l;
        qu(this, nl)._--,
          R(this, nl) === 0 &&
            ((n = R(this, Ps)) == null || n.call(this),
            ne(this, Ps, void 0),
            (l = R(this, Ys)) == null || l.call(this),
            ne(this, Ys, void 0));
      }
      isFetching(n) {
        return R(this, lt).findAll({ ...n, fetchStatus: "fetching" }).length;
      }
      isMutating(n) {
        return R(this, el).findAll({ ...n, status: "pending" }).length;
      }
      getQueryData(n) {
        var i;
        const l = this.defaultQueryOptions({ queryKey: n });
        return (i = R(this, lt).get(l.queryHash)) == null
          ? void 0
          : i.state.data;
      }
      ensureQueryData(n) {
        const l = this.defaultQueryOptions(n),
          i = R(this, lt).build(this, l),
          r = i.state.data;
        return r === void 0
          ? this.fetchQuery(n)
          : (n.revalidateIfStale &&
              i.isStaleByTime(Us(l.staleTime, i)) &&
              this.prefetchQuery(l),
            Promise.resolve(r));
      }
      getQueriesData(n) {
        return R(this, lt)
          .findAll(n)
          .map(({ queryKey: l, state: i }) => {
            const r = i.data;
            return [l, r];
          });
      }
      setQueryData(n, l, i) {
        const r = this.defaultQueryOptions({ queryKey: n }),
          c = R(this, lt).get(r.queryHash),
          f = c == null ? void 0 : c.state.data,
          d = KS(l, f);
        if (d !== void 0)
          return R(this, lt)
            .build(this, r)
            .setData(d, { ...i, manual: !0 });
      }
      setQueriesData(n, l, i) {
        return St.batch(() =>
          R(this, lt)
            .findAll(n)
            .map(({ queryKey: r }) => [r, this.setQueryData(r, l, i)])
        );
      }
      getQueryState(n) {
        var i;
        const l = this.defaultQueryOptions({ queryKey: n });
        return (i = R(this, lt).get(l.queryHash)) == null ? void 0 : i.state;
      }
      removeQueries(n) {
        const l = R(this, lt);
        St.batch(() => {
          l.findAll(n).forEach((i) => {
            l.remove(i);
          });
        });
      }
      resetQueries(n, l) {
        const i = R(this, lt),
          r = { type: "active", ...n };
        return St.batch(
          () => (
            i.findAll(n).forEach((c) => {
              c.reset();
            }),
            this.refetchQueries(r, l)
          )
        );
      }
      cancelQueries(n, l = {}) {
        const i = { revert: !0, ...l },
          r = St.batch(() =>
            R(this, lt)
              .findAll(n)
              .map((c) => c.cancel(i))
          );
        return Promise.all(r).then(Rn).catch(Rn);
      }
      invalidateQueries(n, l = {}) {
        return St.batch(() => {
          if (
            (R(this, lt)
              .findAll(n)
              .forEach((r) => {
                r.invalidate();
              }),
            (n == null ? void 0 : n.refetchType) === "none")
          )
            return Promise.resolve();
          const i = {
            ...n,
            type:
              (n == null ? void 0 : n.refetchType) ??
              (n == null ? void 0 : n.type) ??
              "active",
          };
          return this.refetchQueries(i, l);
        });
      }
      refetchQueries(n, l = {}) {
        const i = { ...l, cancelRefetch: l.cancelRefetch ?? !0 },
          r = St.batch(() =>
            R(this, lt)
              .findAll(n)
              .filter((c) => !c.isDisabled())
              .map((c) => {
                let f = c.fetch(void 0, i);
                return (
                  i.throwOnError || (f = f.catch(Rn)),
                  c.state.fetchStatus === "paused" ? Promise.resolve() : f
                );
              })
          );
        return Promise.all(r).then(Rn);
      }
      fetchQuery(n) {
        const l = this.defaultQueryOptions(n);
        l.retry === void 0 && (l.retry = !1);
        const i = R(this, lt).build(this, l);
        return i.isStaleByTime(Us(l.staleTime, i))
          ? i.fetch(l)
          : Promise.resolve(i.state.data);
      }
      prefetchQuery(n) {
        return this.fetchQuery(n).then(Rn).catch(Rn);
      }
      fetchInfiniteQuery(n) {
        return (n.behavior = vy(n.pages)), this.fetchQuery(n);
      }
      prefetchInfiniteQuery(n) {
        return this.fetchInfiniteQuery(n).then(Rn).catch(Rn);
      }
      ensureInfiniteQueryData(n) {
        return (n.behavior = vy(n.pages)), this.ensureQueryData(n);
      }
      resumePausedMutations() {
        return Iu.isOnline()
          ? R(this, el).resumePausedMutations()
          : Promise.resolve();
      }
      getQueryCache() {
        return R(this, lt);
      }
      getMutationCache() {
        return R(this, el);
      }
      getDefaultOptions() {
        return R(this, tl);
      }
      setDefaultOptions(n) {
        ne(this, tl, n);
      }
      setQueryDefaults(n, l) {
        R(this, Fs).set(Zl(n), { queryKey: n, defaultOptions: l });
      }
      getQueryDefaults(n) {
        const l = [...R(this, Fs).values()],
          i = {};
        return (
          l.forEach((r) => {
            dr(n, r.queryKey) && Object.assign(i, r.defaultOptions);
          }),
          i
        );
      }
      setMutationDefaults(n, l) {
        R(this, Qs).set(Zl(n), { mutationKey: n, defaultOptions: l });
      }
      getMutationDefaults(n) {
        const l = [...R(this, Qs).values()];
        let i = {};
        return (
          l.forEach((r) => {
            dr(n, r.mutationKey) && (i = { ...i, ...r.defaultOptions });
          }),
          i
        );
      }
      defaultQueryOptions(n) {
        if (n._defaulted) return n;
        const l = {
          ...R(this, tl).queries,
          ...this.getQueryDefaults(n.queryKey),
          ...n,
          _defaulted: !0,
        };
        return (
          l.queryHash || (l.queryHash = Kd(l.queryKey, l)),
          l.refetchOnReconnect === void 0 &&
            (l.refetchOnReconnect = l.networkMode !== "always"),
          l.throwOnError === void 0 && (l.throwOnError = !!l.suspense),
          !l.networkMode && l.persister && (l.networkMode = "offlineFirst"),
          l.queryFn === $d && (l.enabled = !1),
          l
        );
      }
      defaultMutationOptions(n) {
        return n != null && n._defaulted
          ? n
          : {
              ...R(this, tl).mutations,
              ...((n == null ? void 0 : n.mutationKey) &&
                this.getMutationDefaults(n.mutationKey)),
              ...n,
              _defaulted: !0,
            };
      }
      clear() {
        R(this, lt).clear(), R(this, el).clear();
      }
    }),
    (lt = new WeakMap()),
    (el = new WeakMap()),
    (tl = new WeakMap()),
    (Fs = new WeakMap()),
    (Qs = new WeakMap()),
    (nl = new WeakMap()),
    (Ps = new WeakMap()),
    (Ys = new WeakMap()),
    s1),
  Zt,
  De,
  gr,
  kt,
  Ql,
  Gs,
  al,
  Wn,
  vr,
  Xs,
  Zs,
  Pl,
  Yl,
  ll,
  Ks,
  qe,
  cr,
  od,
  fd,
  dd,
  hd,
  md,
  pd,
  yd,
  q1,
  i1,
  o5 =
    ((i1 = class extends ti {
      constructor(l, i) {
        super();
        ye(this, qe);
        ye(this, Zt);
        ye(this, De);
        ye(this, gr);
        ye(this, kt);
        ye(this, Ql);
        ye(this, Gs);
        ye(this, al);
        ye(this, Wn);
        ye(this, vr);
        ye(this, Xs);
        ye(this, Zs);
        ye(this, Pl);
        ye(this, Yl);
        ye(this, ll);
        ye(this, Ks, new Set());
        (this.options = i),
          ne(this, Zt, l),
          ne(this, Wn, null),
          ne(this, al, cd()),
          this.options.experimental_prefetchInRender ||
            R(this, al).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            ),
          this.bindMethods(),
          this.setOptions(i);
      }
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        this.listeners.size === 1 &&
          (R(this, De).addObserver(this),
          xy(R(this, De), this.options)
            ? je(this, qe, cr).call(this)
            : this.updateResult(),
          je(this, qe, hd).call(this));
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy();
      }
      shouldFetchOnReconnect() {
        return gd(R(this, De), this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return gd(R(this, De), this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        (this.listeners = new Set()),
          je(this, qe, md).call(this),
          je(this, qe, pd).call(this),
          R(this, De).removeObserver(this);
      }
      setOptions(l, i) {
        const r = this.options,
          c = R(this, De);
        if (
          ((this.options = R(this, Zt).defaultQueryOptions(l)),
          this.options.enabled !== void 0 &&
            typeof this.options.enabled != "boolean" &&
            typeof this.options.enabled != "function" &&
            typeof Ln(this.options.enabled, R(this, De)) != "boolean")
        )
          throw new Error(
            "Expected enabled to be a boolean or a callback that returns a boolean"
          );
        je(this, qe, yd).call(this),
          R(this, De).setOptions(this.options),
          r._defaulted &&
            !Wu(this.options, r) &&
            R(this, Zt)
              .getQueryCache()
              .notify({
                type: "observerOptionsUpdated",
                query: R(this, De),
                observer: this,
              });
        const f = this.hasListeners();
        f && Sy(R(this, De), c, this.options, r) && je(this, qe, cr).call(this),
          this.updateResult(i),
          f &&
            (R(this, De) !== c ||
              Ln(this.options.enabled, R(this, De)) !==
                Ln(r.enabled, R(this, De)) ||
              Us(this.options.staleTime, R(this, De)) !==
                Us(r.staleTime, R(this, De))) &&
            je(this, qe, od).call(this);
        const d = je(this, qe, fd).call(this);
        f &&
          (R(this, De) !== c ||
            Ln(this.options.enabled, R(this, De)) !==
              Ln(r.enabled, R(this, De)) ||
            d !== R(this, ll)) &&
          je(this, qe, dd).call(this, d);
      }
      getOptimisticResult(l) {
        const i = R(this, Zt).getQueryCache().build(R(this, Zt), l),
          r = this.createResult(i, l);
        return (
          d5(this, r) &&
            (ne(this, kt, r),
            ne(this, Gs, this.options),
            ne(this, Ql, R(this, De).state)),
          r
        );
      }
      getCurrentResult() {
        return R(this, kt);
      }
      trackResult(l, i) {
        const r = {};
        return (
          Object.keys(l).forEach((c) => {
            Object.defineProperty(r, c, {
              configurable: !1,
              enumerable: !0,
              get: () => (this.trackProp(c), i == null || i(c), l[c]),
            });
          }),
          r
        );
      }
      trackProp(l) {
        R(this, Ks).add(l);
      }
      getCurrentQuery() {
        return R(this, De);
      }
      refetch({ ...l } = {}) {
        return this.fetch({ ...l });
      }
      fetchOptimistic(l) {
        const i = R(this, Zt).defaultQueryOptions(l),
          r = R(this, Zt).getQueryCache().build(R(this, Zt), i);
        return r.fetch().then(() => this.createResult(r, i));
      }
      fetch(l) {
        return je(this, qe, cr)
          .call(this, { ...l, cancelRefetch: l.cancelRefetch ?? !0 })
          .then(() => (this.updateResult(), R(this, kt)));
      }
      createResult(l, i) {
        var ee;
        const r = R(this, De),
          c = this.options,
          f = R(this, kt),
          d = R(this, Ql),
          y = R(this, Gs),
          m = l !== r ? l.state : R(this, gr),
          { state: v } = l;
        let b = { ...v },
          E = !1,
          j;
        if (i._optimisticResults) {
          const G = this.hasListeners(),
            le = !G && xy(l, i),
            ke = G && Sy(l, r, i, c);
          (le || ke) && (b = { ...b, ...B1(v.data, l.options) }),
            i._optimisticResults === "isRestoring" && (b.fetchStatus = "idle");
        }
        let { error: _, errorUpdatedAt: D, status: T } = b;
        if (i.select && b.data !== void 0)
          if (
            f &&
            b.data === (d == null ? void 0 : d.data) &&
            i.select === R(this, vr)
          )
            j = R(this, Xs);
          else
            try {
              ne(this, vr, i.select),
                (j = i.select(b.data)),
                (j = ud(f == null ? void 0 : f.data, j, i)),
                ne(this, Xs, j),
                ne(this, Wn, null);
            } catch (G) {
              ne(this, Wn, G);
            }
        else j = b.data;
        if (i.placeholderData !== void 0 && j === void 0 && T === "pending") {
          let G;
          if (
            f != null &&
            f.isPlaceholderData &&
            i.placeholderData === (y == null ? void 0 : y.placeholderData)
          )
            G = f.data;
          else if (
            ((G =
              typeof i.placeholderData == "function"
                ? i.placeholderData(
                    (ee = R(this, Zs)) == null ? void 0 : ee.state.data,
                    R(this, Zs)
                  )
                : i.placeholderData),
            i.select && G !== void 0)
          )
            try {
              (G = i.select(G)), ne(this, Wn, null);
            } catch (le) {
              ne(this, Wn, le);
            }
          G !== void 0 &&
            ((T = "success"),
            (j = ud(f == null ? void 0 : f.data, G, i)),
            (E = !0));
        }
        R(this, Wn) &&
          ((_ = R(this, Wn)),
          (j = R(this, Xs)),
          (D = Date.now()),
          (T = "error"));
        const U = b.fetchStatus === "fetching",
          L = T === "pending",
          V = T === "error",
          I = L && U,
          Y = j !== void 0,
          de = {
            status: T,
            fetchStatus: b.fetchStatus,
            isPending: L,
            isSuccess: T === "success",
            isError: V,
            isInitialLoading: I,
            isLoading: I,
            data: j,
            dataUpdatedAt: b.dataUpdatedAt,
            error: _,
            errorUpdatedAt: D,
            failureCount: b.fetchFailureCount,
            failureReason: b.fetchFailureReason,
            errorUpdateCount: b.errorUpdateCount,
            isFetched: b.dataUpdateCount > 0 || b.errorUpdateCount > 0,
            isFetchedAfterMount:
              b.dataUpdateCount > m.dataUpdateCount ||
              b.errorUpdateCount > m.errorUpdateCount,
            isFetching: U,
            isRefetching: U && !L,
            isLoadingError: V && !Y,
            isPaused: b.fetchStatus === "paused",
            isPlaceholderData: E,
            isRefetchError: V && Y,
            isStale: Wd(l, i),
            refetch: this.refetch,
            promise: R(this, al),
          };
        if (this.options.experimental_prefetchInRender) {
          const G = (he) => {
              de.status === "error"
                ? he.reject(de.error)
                : de.data !== void 0 && he.resolve(de.data);
            },
            le = () => {
              const he = ne(this, al, (de.promise = cd()));
              G(he);
            },
            ke = R(this, al);
          switch (ke.status) {
            case "pending":
              l.queryHash === r.queryHash && G(ke);
              break;
            case "fulfilled":
              (de.status === "error" || de.data !== ke.value) && le();
              break;
            case "rejected":
              (de.status !== "error" || de.error !== ke.reason) && le();
              break;
          }
        }
        return de;
      }
      updateResult(l) {
        const i = R(this, kt),
          r = this.createResult(R(this, De), this.options);
        if (
          (ne(this, Ql, R(this, De).state),
          ne(this, Gs, this.options),
          R(this, Ql).data !== void 0 && ne(this, Zs, R(this, De)),
          Wu(r, i))
        )
          return;
        ne(this, kt, r);
        const c = {},
          f = () => {
            if (!i) return !0;
            const { notifyOnChangeProps: d } = this.options,
              y = typeof d == "function" ? d() : d;
            if (y === "all" || (!y && !R(this, Ks).size)) return !0;
            const p = new Set(y ?? R(this, Ks));
            return (
              this.options.throwOnError && p.add("error"),
              Object.keys(R(this, kt)).some((m) => {
                const v = m;
                return R(this, kt)[v] !== i[v] && p.has(v);
              })
            );
          };
        (l == null ? void 0 : l.listeners) !== !1 && f() && (c.listeners = !0),
          je(this, qe, q1).call(this, { ...c, ...l });
      }
      onQueryUpdate() {
        this.updateResult(), this.hasListeners() && je(this, qe, hd).call(this);
      }
    }),
    (Zt = new WeakMap()),
    (De = new WeakMap()),
    (gr = new WeakMap()),
    (kt = new WeakMap()),
    (Ql = new WeakMap()),
    (Gs = new WeakMap()),
    (al = new WeakMap()),
    (Wn = new WeakMap()),
    (vr = new WeakMap()),
    (Xs = new WeakMap()),
    (Zs = new WeakMap()),
    (Pl = new WeakMap()),
    (Yl = new WeakMap()),
    (ll = new WeakMap()),
    (Ks = new WeakMap()),
    (qe = new WeakSet()),
    (cr = function (l) {
      je(this, qe, yd).call(this);
      let i = R(this, De).fetch(this.options, l);
      return (l != null && l.throwOnError) || (i = i.catch(Rn)), i;
    }),
    (od = function () {
      je(this, qe, md).call(this);
      const l = Us(this.options.staleTime, R(this, De));
      if (Xl || R(this, kt).isStale || !id(l)) return;
      const r = O1(R(this, kt).dataUpdatedAt, l) + 1;
      ne(
        this,
        Pl,
        setTimeout(() => {
          R(this, kt).isStale || this.updateResult();
        }, r)
      );
    }),
    (fd = function () {
      return (
        (typeof this.options.refetchInterval == "function"
          ? this.options.refetchInterval(R(this, De))
          : this.options.refetchInterval) ?? !1
      );
    }),
    (dd = function (l) {
      je(this, qe, pd).call(this),
        ne(this, ll, l),
        !(
          Xl ||
          Ln(this.options.enabled, R(this, De)) === !1 ||
          !id(R(this, ll)) ||
          R(this, ll) === 0
        ) &&
          ne(
            this,
            Yl,
            setInterval(() => {
              (this.options.refetchIntervalInBackground || Jd.isFocused()) &&
                je(this, qe, cr).call(this);
            }, R(this, ll))
          );
    }),
    (hd = function () {
      je(this, qe, od).call(this),
        je(this, qe, dd).call(this, je(this, qe, fd).call(this));
    }),
    (md = function () {
      R(this, Pl) && (clearTimeout(R(this, Pl)), ne(this, Pl, void 0));
    }),
    (pd = function () {
      R(this, Yl) && (clearInterval(R(this, Yl)), ne(this, Yl, void 0));
    }),
    (yd = function () {
      const l = R(this, Zt).getQueryCache().build(R(this, Zt), this.options);
      if (l === R(this, De)) return;
      const i = R(this, De);
      ne(this, De, l),
        ne(this, gr, l.state),
        this.hasListeners() &&
          (i == null || i.removeObserver(this), l.addObserver(this));
    }),
    (q1 = function (l) {
      St.batch(() => {
        l.listeners &&
          this.listeners.forEach((i) => {
            i(R(this, kt));
          }),
          R(this, Zt)
            .getQueryCache()
            .notify({ query: R(this, De), type: "observerResultsUpdated" });
      });
    }),
    i1);
function f5(n, l) {
  return (
    Ln(l.enabled, n) !== !1 &&
    n.state.data === void 0 &&
    !(n.state.status === "error" && l.retryOnMount === !1)
  );
}
function xy(n, l) {
  return f5(n, l) || (n.state.data !== void 0 && gd(n, l, l.refetchOnMount));
}
function gd(n, l, i) {
  if (Ln(l.enabled, n) !== !1) {
    const r = typeof i == "function" ? i(n) : i;
    return r === "always" || (r !== !1 && Wd(n, l));
  }
  return !1;
}
function Sy(n, l, i, r) {
  return (
    (n !== l || Ln(r.enabled, n) === !1) &&
    (!i.suspense || n.state.status !== "error") &&
    Wd(n, i)
  );
}
function Wd(n, l) {
  return Ln(l.enabled, n) !== !1 && n.isStaleByTime(Us(l.staleTime, n));
}
function d5(n, l) {
  return !Wu(n.getCurrentResult(), l);
}
var sl,
  il,
  Kt,
  wa,
  _a,
  Yu,
  vd,
  r1,
  h5 =
    ((r1 = class extends ti {
      constructor(i, r) {
        super();
        ye(this, _a);
        ye(this, sl);
        ye(this, il);
        ye(this, Kt);
        ye(this, wa);
        ne(this, sl, i),
          this.setOptions(r),
          this.bindMethods(),
          je(this, _a, Yu).call(this);
      }
      bindMethods() {
        (this.mutate = this.mutate.bind(this)),
          (this.reset = this.reset.bind(this));
      }
      setOptions(i) {
        var c;
        const r = this.options;
        (this.options = R(this, sl).defaultMutationOptions(i)),
          Wu(this.options, r) ||
            R(this, sl)
              .getMutationCache()
              .notify({
                type: "observerOptionsUpdated",
                mutation: R(this, Kt),
                observer: this,
              }),
          r != null &&
          r.mutationKey &&
          this.options.mutationKey &&
          Zl(r.mutationKey) !== Zl(this.options.mutationKey)
            ? this.reset()
            : ((c = R(this, Kt)) == null ? void 0 : c.state.status) ===
                "pending" && R(this, Kt).setOptions(this.options);
      }
      onUnsubscribe() {
        var i;
        this.hasListeners() ||
          (i = R(this, Kt)) == null ||
          i.removeObserver(this);
      }
      onMutationUpdate(i) {
        je(this, _a, Yu).call(this), je(this, _a, vd).call(this, i);
      }
      getCurrentResult() {
        return R(this, il);
      }
      reset() {
        var i;
        (i = R(this, Kt)) == null || i.removeObserver(this),
          ne(this, Kt, void 0),
          je(this, _a, Yu).call(this),
          je(this, _a, vd).call(this);
      }
      mutate(i, r) {
        var c;
        return (
          ne(this, wa, r),
          (c = R(this, Kt)) == null || c.removeObserver(this),
          ne(
            this,
            Kt,
            R(this, sl).getMutationCache().build(R(this, sl), this.options)
          ),
          R(this, Kt).addObserver(this),
          R(this, Kt).execute(i)
        );
      }
    }),
    (sl = new WeakMap()),
    (il = new WeakMap()),
    (Kt = new WeakMap()),
    (wa = new WeakMap()),
    (_a = new WeakSet()),
    (Yu = function () {
      var r;
      const i = ((r = R(this, Kt)) == null ? void 0 : r.state) ?? V1();
      ne(this, il, {
        ...i,
        isPending: i.status === "pending",
        isSuccess: i.status === "success",
        isError: i.status === "error",
        isIdle: i.status === "idle",
        mutate: this.mutate,
        reset: this.reset,
      });
    }),
    (vd = function (i) {
      St.batch(() => {
        var r, c, f, d, y, p, m, v;
        if (R(this, wa) && this.hasListeners()) {
          const b = R(this, il).variables,
            E = R(this, il).context;
          (i == null ? void 0 : i.type) === "success"
            ? ((c = (r = R(this, wa)).onSuccess) == null ||
                c.call(r, i.data, b, E),
              (d = (f = R(this, wa)).onSettled) == null ||
                d.call(f, i.data, null, b, E))
            : (i == null ? void 0 : i.type) === "error" &&
              ((p = (y = R(this, wa)).onError) == null ||
                p.call(y, i.error, b, E),
              (v = (m = R(this, wa)).onSettled) == null ||
                v.call(m, void 0, i.error, b, E));
        }
        this.listeners.forEach((b) => {
          b(R(this, il));
        });
      });
    }),
    r1),
  k1 = w.createContext(void 0),
  Id = (n) => {
    const l = w.useContext(k1);
    if (!l)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return l;
  },
  m5 = ({ client: n, children: l }) => (
    w.useEffect(
      () => (
        n.mount(),
        () => {
          n.unmount();
        }
      ),
      [n]
    ),
    h.jsx(k1.Provider, { value: n, children: l })
  ),
  F1 = w.createContext(!1),
  p5 = () => w.useContext(F1);
F1.Provider;
function y5() {
  let n = !1;
  return {
    clearReset: () => {
      n = !1;
    },
    reset: () => {
      n = !0;
    },
    isReset: () => n,
  };
}
var g5 = w.createContext(y5()),
  v5 = () => w.useContext(g5);
function Q1(n, l) {
  return typeof n == "function" ? n(...l) : !!n;
}
function bd() {}
var b5 = (n, l) => {
    (n.suspense || n.throwOnError || n.experimental_prefetchInRender) &&
      (l.isReset() || (n.retryOnMount = !1));
  },
  x5 = (n) => {
    w.useEffect(() => {
      n.clearReset();
    }, [n]);
  },
  S5 = ({
    result: n,
    errorResetBoundary: l,
    throwOnError: i,
    query: r,
    suspense: c,
  }) =>
    n.isError &&
    !l.isReset() &&
    !n.isFetching &&
    r &&
    ((c && n.data === void 0) || Q1(i, [n.error, r])),
  w5 = (n) => {
    const l = n.staleTime;
    n.suspense &&
      ((n.staleTime =
        typeof l == "function"
          ? (...i) => Math.max(l(...i), 1e3)
          : Math.max(l ?? 1e3, 1e3)),
      typeof n.gcTime == "number" && (n.gcTime = Math.max(n.gcTime, 1e3)));
  },
  E5 = (n, l) => n.isLoading && n.isFetching && !l,
  _5 = (n, l) => (n == null ? void 0 : n.suspense) && l.isPending,
  wy = (n, l, i) =>
    l.fetchOptimistic(n).catch(() => {
      i.clearReset();
    });
function R5(n, l, i) {
  var b, E, j, _, D;
  const r = Id(),
    c = p5(),
    f = v5(),
    d = r.defaultQueryOptions(n);
  (E =
    (b = r.getDefaultOptions().queries) == null
      ? void 0
      : b._experimental_beforeQuery) == null || E.call(b, d),
    (d._optimisticResults = c ? "isRestoring" : "optimistic"),
    w5(d),
    b5(d, f),
    x5(f);
  const y = !r.getQueryCache().get(d.queryHash),
    [p] = w.useState(() => new l(r, d)),
    m = p.getOptimisticResult(d),
    v = !c && n.subscribed !== !1;
  if (
    (w.useSyncExternalStore(
      w.useCallback(
        (T) => {
          const U = v ? p.subscribe(St.batchCalls(T)) : bd;
          return p.updateResult(), U;
        },
        [p, v]
      ),
      () => p.getCurrentResult(),
      () => p.getCurrentResult()
    ),
    w.useEffect(() => {
      p.setOptions(d, { listeners: !1 });
    }, [d, p]),
    _5(d, m))
  )
    throw wy(d, p, f);
  if (
    S5({
      result: m,
      errorResetBoundary: f,
      throwOnError: d.throwOnError,
      query: r.getQueryCache().get(d.queryHash),
      suspense: d.suspense,
    })
  )
    throw m.error;
  if (
    ((_ =
      (j = r.getDefaultOptions().queries) == null
        ? void 0
        : j._experimental_afterQuery) == null || _.call(j, d, m),
    d.experimental_prefetchInRender && !Xl && E5(m, c))
  ) {
    const T = y
      ? wy(d, p, f)
      : (D = r.getQueryCache().get(d.queryHash)) == null
      ? void 0
      : D.promise;
    T == null ||
      T.catch(bd).finally(() => {
        p.updateResult();
      });
  }
  return d.notifyOnChangeProps ? m : p.trackResult(m);
}
function mc(n, l) {
  return R5(n, o5);
}
function Nt(n, l) {
  const i = Id(),
    [r] = w.useState(() => new h5(i, n));
  w.useEffect(() => {
    r.setOptions(n);
  }, [r, n]);
  const c = w.useSyncExternalStore(
      w.useCallback((d) => r.subscribe(St.batchCalls(d)), [r]),
      () => r.getCurrentResult(),
      () => r.getCurrentResult()
    ),
    f = w.useCallback(
      (d, y) => {
        r.mutate(d, y).catch(bd);
      },
      [r]
    );
  if (c.error && Q1(r.options.throwOnError, [c.error])) throw c.error;
  return { ...c, mutate: f, mutateAsync: c.mutate };
}
function P1(n, l) {
  return function () {
    return n.apply(l, arguments);
  };
}
const { toString: j5 } = Object.prototype,
  { getPrototypeOf: eh } = Object,
  pc = ((n) => (l) => {
    const i = j5.call(l);
    return n[i] || (n[i] = i.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Vn = (n) => ((n = n.toLowerCase()), (l) => pc(l) === n),
  yc = (n) => (l) => typeof l === n,
  { isArray: ni } = Array,
  hr = yc("undefined");
function N5(n) {
  return (
    n !== null &&
    !hr(n) &&
    n.constructor !== null &&
    !hr(n.constructor) &&
    on(n.constructor.isBuffer) &&
    n.constructor.isBuffer(n)
  );
}
const Y1 = Vn("ArrayBuffer");
function A5(n) {
  let l;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (l = ArrayBuffer.isView(n))
      : (l = n && n.buffer && Y1(n.buffer)),
    l
  );
}
const T5 = yc("string"),
  on = yc("function"),
  G1 = yc("number"),
  gc = (n) => n !== null && typeof n == "object",
  C5 = (n) => n === !0 || n === !1,
  Gu = (n) => {
    if (pc(n) !== "object") return !1;
    const l = eh(n);
    return (
      (l === null ||
        l === Object.prototype ||
        Object.getPrototypeOf(l) === null) &&
      !(Symbol.toStringTag in n) &&
      !(Symbol.iterator in n)
    );
  },
  O5 = Vn("Date"),
  D5 = Vn("File"),
  M5 = Vn("Blob"),
  U5 = Vn("FileList"),
  z5 = (n) => gc(n) && on(n.pipe),
  L5 = (n) => {
    let l;
    return (
      n &&
      ((typeof FormData == "function" && n instanceof FormData) ||
        (on(n.append) &&
          ((l = pc(n)) === "formdata" ||
            (l === "object" &&
              on(n.toString) &&
              n.toString() === "[object FormData]"))))
    );
  },
  H5 = Vn("URLSearchParams"),
  [B5, V5, q5, k5] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Vn
  ),
  F5 = (n) =>
    n.trim ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function wr(n, l, { allOwnKeys: i = !1 } = {}) {
  if (n === null || typeof n > "u") return;
  let r, c;
  if ((typeof n != "object" && (n = [n]), ni(n)))
    for (r = 0, c = n.length; r < c; r++) l.call(null, n[r], r, n);
  else {
    const f = i ? Object.getOwnPropertyNames(n) : Object.keys(n),
      d = f.length;
    let y;
    for (r = 0; r < d; r++) (y = f[r]), l.call(null, n[y], y, n);
  }
}
function X1(n, l) {
  l = l.toLowerCase();
  const i = Object.keys(n);
  let r = i.length,
    c;
  for (; r-- > 0; ) if (((c = i[r]), l === c.toLowerCase())) return c;
  return null;
}
const Ll =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global,
  Z1 = (n) => !hr(n) && n !== Ll;
function xd() {
  const { caseless: n } = (Z1(this) && this) || {},
    l = {},
    i = (r, c) => {
      const f = (n && X1(l, c)) || c;
      Gu(l[f]) && Gu(r)
        ? (l[f] = xd(l[f], r))
        : Gu(r)
        ? (l[f] = xd({}, r))
        : ni(r)
        ? (l[f] = r.slice())
        : (l[f] = r);
    };
  for (let r = 0, c = arguments.length; r < c; r++)
    arguments[r] && wr(arguments[r], i);
  return l;
}
const Q5 = (n, l, i, { allOwnKeys: r } = {}) => (
    wr(
      l,
      (c, f) => {
        i && on(c) ? (n[f] = P1(c, i)) : (n[f] = c);
      },
      { allOwnKeys: r }
    ),
    n
  ),
  P5 = (n) => (n.charCodeAt(0) === 65279 && (n = n.slice(1)), n),
  Y5 = (n, l, i, r) => {
    (n.prototype = Object.create(l.prototype, r)),
      (n.prototype.constructor = n),
      Object.defineProperty(n, "super", { value: l.prototype }),
      i && Object.assign(n.prototype, i);
  },
  G5 = (n, l, i, r) => {
    let c, f, d;
    const y = {};
    if (((l = l || {}), n == null)) return l;
    do {
      for (c = Object.getOwnPropertyNames(n), f = c.length; f-- > 0; )
        (d = c[f]), (!r || r(d, n, l)) && !y[d] && ((l[d] = n[d]), (y[d] = !0));
      n = i !== !1 && eh(n);
    } while (n && (!i || i(n, l)) && n !== Object.prototype);
    return l;
  },
  X5 = (n, l, i) => {
    (n = String(n)),
      (i === void 0 || i > n.length) && (i = n.length),
      (i -= l.length);
    const r = n.indexOf(l, i);
    return r !== -1 && r === i;
  },
  Z5 = (n) => {
    if (!n) return null;
    if (ni(n)) return n;
    let l = n.length;
    if (!G1(l)) return null;
    const i = new Array(l);
    for (; l-- > 0; ) i[l] = n[l];
    return i;
  },
  K5 = (
    (n) => (l) =>
      n && l instanceof n
  )(typeof Uint8Array < "u" && eh(Uint8Array)),
  $5 = (n, l) => {
    const r = (n && n[Symbol.iterator]).call(n);
    let c;
    for (; (c = r.next()) && !c.done; ) {
      const f = c.value;
      l.call(n, f[0], f[1]);
    }
  },
  J5 = (n, l) => {
    let i;
    const r = [];
    for (; (i = n.exec(l)) !== null; ) r.push(i);
    return r;
  },
  W5 = Vn("HTMLFormElement"),
  I5 = (n) =>
    n.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (i, r, c) {
      return r.toUpperCase() + c;
    }),
  Ey = (
    ({ hasOwnProperty: n }) =>
    (l, i) =>
      n.call(l, i)
  )(Object.prototype),
  ew = Vn("RegExp"),
  K1 = (n, l) => {
    const i = Object.getOwnPropertyDescriptors(n),
      r = {};
    wr(i, (c, f) => {
      let d;
      (d = l(c, f, n)) !== !1 && (r[f] = d || c);
    }),
      Object.defineProperties(n, r);
  },
  tw = (n) => {
    K1(n, (l, i) => {
      if (on(n) && ["arguments", "caller", "callee"].indexOf(i) !== -1)
        return !1;
      const r = n[i];
      if (on(r)) {
        if (((l.enumerable = !1), "writable" in l)) {
          l.writable = !1;
          return;
        }
        l.set ||
          (l.set = () => {
            throw Error("Can not rewrite read-only method '" + i + "'");
          });
      }
    });
  },
  nw = (n, l) => {
    const i = {},
      r = (c) => {
        c.forEach((f) => {
          i[f] = !0;
        });
      };
    return ni(n) ? r(n) : r(String(n).split(l)), i;
  },
  aw = () => {},
  lw = (n, l) => (n != null && Number.isFinite((n = +n)) ? n : l);
function sw(n) {
  return !!(
    n &&
    on(n.append) &&
    n[Symbol.toStringTag] === "FormData" &&
    n[Symbol.iterator]
  );
}
const iw = (n) => {
    const l = new Array(10),
      i = (r, c) => {
        if (gc(r)) {
          if (l.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            l[c] = r;
            const f = ni(r) ? [] : {};
            return (
              wr(r, (d, y) => {
                const p = i(d, c + 1);
                !hr(p) && (f[y] = p);
              }),
              (l[c] = void 0),
              f
            );
          }
        }
        return r;
      };
    return i(n, 0);
  },
  rw = Vn("AsyncFunction"),
  uw = (n) => n && (gc(n) || on(n)) && on(n.then) && on(n.catch),
  $1 = ((n, l) =>
    n
      ? setImmediate
      : l
      ? ((i, r) => (
          Ll.addEventListener(
            "message",
            ({ source: c, data: f }) => {
              c === Ll && f === i && r.length && r.shift()();
            },
            !1
          ),
          (c) => {
            r.push(c), Ll.postMessage(i, "*");
          }
        ))(`axios@${Math.random()}`, [])
      : (i) => setTimeout(i))(
    typeof setImmediate == "function",
    on(Ll.postMessage)
  ),
  cw =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(Ll)
      : (typeof process < "u" && process.nextTick) || $1,
  q = {
    isArray: ni,
    isArrayBuffer: Y1,
    isBuffer: N5,
    isFormData: L5,
    isArrayBufferView: A5,
    isString: T5,
    isNumber: G1,
    isBoolean: C5,
    isObject: gc,
    isPlainObject: Gu,
    isReadableStream: B5,
    isRequest: V5,
    isResponse: q5,
    isHeaders: k5,
    isUndefined: hr,
    isDate: O5,
    isFile: D5,
    isBlob: M5,
    isRegExp: ew,
    isFunction: on,
    isStream: z5,
    isURLSearchParams: H5,
    isTypedArray: K5,
    isFileList: U5,
    forEach: wr,
    merge: xd,
    extend: Q5,
    trim: F5,
    stripBOM: P5,
    inherits: Y5,
    toFlatObject: G5,
    kindOf: pc,
    kindOfTest: Vn,
    endsWith: X5,
    toArray: Z5,
    forEachEntry: $5,
    matchAll: J5,
    isHTMLForm: W5,
    hasOwnProperty: Ey,
    hasOwnProp: Ey,
    reduceDescriptors: K1,
    freezeMethods: tw,
    toObjectSet: nw,
    toCamelCase: I5,
    noop: aw,
    toFiniteNumber: lw,
    findKey: X1,
    global: Ll,
    isContextDefined: Z1,
    isSpecCompliantForm: sw,
    toJSONObject: iw,
    isAsyncFn: rw,
    isThenable: uw,
    setImmediate: $1,
    asap: cw,
  };
function Ee(n, l, i, r, c) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = n),
    (this.name = "AxiosError"),
    l && (this.code = l),
    i && (this.config = i),
    r && (this.request = r),
    c && ((this.response = c), (this.status = c.status ? c.status : null));
}
q.inherits(Ee, Error, {
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
      config: q.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const J1 = Ee.prototype,
  W1 = {};
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
].forEach((n) => {
  W1[n] = { value: n };
});
Object.defineProperties(Ee, W1);
Object.defineProperty(J1, "isAxiosError", { value: !0 });
Ee.from = (n, l, i, r, c, f) => {
  const d = Object.create(J1);
  return (
    q.toFlatObject(
      n,
      d,
      function (p) {
        return p !== Error.prototype;
      },
      (y) => y !== "isAxiosError"
    ),
    Ee.call(d, n.message, l, i, r, c),
    (d.cause = n),
    (d.name = n.name),
    f && Object.assign(d, f),
    d
  );
};
const ow = null;
function Sd(n) {
  return q.isPlainObject(n) || q.isArray(n);
}
function I1(n) {
  return q.endsWith(n, "[]") ? n.slice(0, -2) : n;
}
function _y(n, l, i) {
  return n
    ? n
        .concat(l)
        .map(function (c, f) {
          return (c = I1(c)), !i && f ? "[" + c + "]" : c;
        })
        .join(i ? "." : "")
    : l;
}
function fw(n) {
  return q.isArray(n) && !n.some(Sd);
}
const dw = q.toFlatObject(q, {}, null, function (l) {
  return /^is[A-Z]/.test(l);
});
function vc(n, l, i) {
  if (!q.isObject(n)) throw new TypeError("target must be an object");
  (l = l || new FormData()),
    (i = q.toFlatObject(
      i,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (D, T) {
        return !q.isUndefined(T[D]);
      }
    ));
  const r = i.metaTokens,
    c = i.visitor || v,
    f = i.dots,
    d = i.indexes,
    p = (i.Blob || (typeof Blob < "u" && Blob)) && q.isSpecCompliantForm(l);
  if (!q.isFunction(c)) throw new TypeError("visitor must be a function");
  function m(_) {
    if (_ === null) return "";
    if (q.isDate(_)) return _.toISOString();
    if (!p && q.isBlob(_))
      throw new Ee("Blob is not supported. Use a Buffer instead.");
    return q.isArrayBuffer(_) || q.isTypedArray(_)
      ? p && typeof Blob == "function"
        ? new Blob([_])
        : Buffer.from(_)
      : _;
  }
  function v(_, D, T) {
    let U = _;
    if (_ && !T && typeof _ == "object") {
      if (q.endsWith(D, "{}"))
        (D = r ? D : D.slice(0, -2)), (_ = JSON.stringify(_));
      else if (
        (q.isArray(_) && fw(_)) ||
        ((q.isFileList(_) || q.endsWith(D, "[]")) && (U = q.toArray(_)))
      )
        return (
          (D = I1(D)),
          U.forEach(function (V, I) {
            !(q.isUndefined(V) || V === null) &&
              l.append(
                d === !0 ? _y([D], I, f) : d === null ? D : D + "[]",
                m(V)
              );
          }),
          !1
        );
    }
    return Sd(_) ? !0 : (l.append(_y(T, D, f), m(_)), !1);
  }
  const b = [],
    E = Object.assign(dw, {
      defaultVisitor: v,
      convertValue: m,
      isVisitable: Sd,
    });
  function j(_, D) {
    if (!q.isUndefined(_)) {
      if (b.indexOf(_) !== -1)
        throw Error("Circular reference detected in " + D.join("."));
      b.push(_),
        q.forEach(_, function (U, L) {
          (!(q.isUndefined(U) || U === null) &&
            c.call(l, U, q.isString(L) ? L.trim() : L, D, E)) === !0 &&
            j(U, D ? D.concat(L) : [L]);
        }),
        b.pop();
    }
  }
  if (!q.isObject(n)) throw new TypeError("data must be an object");
  return j(n), l;
}
function Ry(n) {
  const l = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(n).replace(/[!'()~]|%20|%00/g, function (r) {
    return l[r];
  });
}
function th(n, l) {
  (this._pairs = []), n && vc(n, this, l);
}
const eg = th.prototype;
eg.append = function (l, i) {
  this._pairs.push([l, i]);
};
eg.toString = function (l) {
  const i = l
    ? function (r) {
        return l.call(this, r, Ry);
      }
    : Ry;
  return this._pairs
    .map(function (c) {
      return i(c[0]) + "=" + i(c[1]);
    }, "")
    .join("&");
};
function hw(n) {
  return encodeURIComponent(n)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function tg(n, l, i) {
  if (!l) return n;
  const r = (i && i.encode) || hw;
  q.isFunction(i) && (i = { serialize: i });
  const c = i && i.serialize;
  let f;
  if (
    (c
      ? (f = c(l, i))
      : (f = q.isURLSearchParams(l) ? l.toString() : new th(l, i).toString(r)),
    f)
  ) {
    const d = n.indexOf("#");
    d !== -1 && (n = n.slice(0, d)),
      (n += (n.indexOf("?") === -1 ? "?" : "&") + f);
  }
  return n;
}
class jy {
  constructor() {
    this.handlers = [];
  }
  use(l, i, r) {
    return (
      this.handlers.push({
        fulfilled: l,
        rejected: i,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(l) {
    this.handlers[l] && (this.handlers[l] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(l) {
    q.forEach(this.handlers, function (r) {
      r !== null && l(r);
    });
  }
}
const ng = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  mw = typeof URLSearchParams < "u" ? URLSearchParams : th,
  pw = typeof FormData < "u" ? FormData : null,
  yw = typeof Blob < "u" ? Blob : null,
  gw = {
    isBrowser: !0,
    classes: { URLSearchParams: mw, FormData: pw, Blob: yw },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  nh = typeof window < "u" && typeof document < "u",
  wd = (typeof navigator == "object" && navigator) || void 0,
  vw =
    nh &&
    (!wd || ["ReactNative", "NativeScript", "NS"].indexOf(wd.product) < 0),
  bw =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  xw = (nh && window.location.href) || "http://localhost",
  Sw = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: nh,
        hasStandardBrowserEnv: vw,
        hasStandardBrowserWebWorkerEnv: bw,
        navigator: wd,
        origin: xw,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Lt = { ...Sw, ...gw };
function ww(n, l) {
  return vc(
    n,
    new Lt.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (i, r, c, f) {
          return Lt.isNode && q.isBuffer(i)
            ? (this.append(r, i.toString("base64")), !1)
            : f.defaultVisitor.apply(this, arguments);
        },
      },
      l
    )
  );
}
function Ew(n) {
  return q
    .matchAll(/\w+|\[(\w*)]/g, n)
    .map((l) => (l[0] === "[]" ? "" : l[1] || l[0]));
}
function _w(n) {
  const l = {},
    i = Object.keys(n);
  let r;
  const c = i.length;
  let f;
  for (r = 0; r < c; r++) (f = i[r]), (l[f] = n[f]);
  return l;
}
function ag(n) {
  function l(i, r, c, f) {
    let d = i[f++];
    if (d === "__proto__") return !0;
    const y = Number.isFinite(+d),
      p = f >= i.length;
    return (
      (d = !d && q.isArray(c) ? c.length : d),
      p
        ? (q.hasOwnProp(c, d) ? (c[d] = [c[d], r]) : (c[d] = r), !y)
        : ((!c[d] || !q.isObject(c[d])) && (c[d] = []),
          l(i, r, c[d], f) && q.isArray(c[d]) && (c[d] = _w(c[d])),
          !y)
    );
  }
  if (q.isFormData(n) && q.isFunction(n.entries)) {
    const i = {};
    return (
      q.forEachEntry(n, (r, c) => {
        l(Ew(r), c, i, 0);
      }),
      i
    );
  }
  return null;
}
function Rw(n, l, i) {
  if (q.isString(n))
    try {
      return (l || JSON.parse)(n), q.trim(n);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (i || JSON.stringify)(n);
}
const Er = {
  transitional: ng,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (l, i) {
      const r = i.getContentType() || "",
        c = r.indexOf("application/json") > -1,
        f = q.isObject(l);
      if ((f && q.isHTMLForm(l) && (l = new FormData(l)), q.isFormData(l)))
        return c ? JSON.stringify(ag(l)) : l;
      if (
        q.isArrayBuffer(l) ||
        q.isBuffer(l) ||
        q.isStream(l) ||
        q.isFile(l) ||
        q.isBlob(l) ||
        q.isReadableStream(l)
      )
        return l;
      if (q.isArrayBufferView(l)) return l.buffer;
      if (q.isURLSearchParams(l))
        return (
          i.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          l.toString()
        );
      let y;
      if (f) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return ww(l, this.formSerializer).toString();
        if ((y = q.isFileList(l)) || r.indexOf("multipart/form-data") > -1) {
          const p = this.env && this.env.FormData;
          return vc(
            y ? { "files[]": l } : l,
            p && new p(),
            this.formSerializer
          );
        }
      }
      return f || c ? (i.setContentType("application/json", !1), Rw(l)) : l;
    },
  ],
  transformResponse: [
    function (l) {
      const i = this.transitional || Er.transitional,
        r = i && i.forcedJSONParsing,
        c = this.responseType === "json";
      if (q.isResponse(l) || q.isReadableStream(l)) return l;
      if (l && q.isString(l) && ((r && !this.responseType) || c)) {
        const d = !(i && i.silentJSONParsing) && c;
        try {
          return JSON.parse(l);
        } catch (y) {
          if (d)
            throw y.name === "SyntaxError"
              ? Ee.from(y, Ee.ERR_BAD_RESPONSE, this, null, this.response)
              : y;
        }
      }
      return l;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Lt.classes.FormData, Blob: Lt.classes.Blob },
  validateStatus: function (l) {
    return l >= 200 && l < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
q.forEach(["delete", "get", "head", "post", "put", "patch"], (n) => {
  Er.headers[n] = {};
});
const jw = q.toObjectSet([
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
  Nw = (n) => {
    const l = {};
    let i, r, c;
    return (
      n &&
        n
          .split(
            `
`
          )
          .forEach(function (d) {
            (c = d.indexOf(":")),
              (i = d.substring(0, c).trim().toLowerCase()),
              (r = d.substring(c + 1).trim()),
              !(!i || (l[i] && jw[i])) &&
                (i === "set-cookie"
                  ? l[i]
                    ? l[i].push(r)
                    : (l[i] = [r])
                  : (l[i] = l[i] ? l[i] + ", " + r : r));
          }),
      l
    );
  },
  Ny = Symbol("internals");
function ir(n) {
  return n && String(n).trim().toLowerCase();
}
function Xu(n) {
  return n === !1 || n == null ? n : q.isArray(n) ? n.map(Xu) : String(n);
}
function Aw(n) {
  const l = Object.create(null),
    i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = i.exec(n)); ) l[r[1]] = r[2];
  return l;
}
const Tw = (n) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());
function Gf(n, l, i, r, c) {
  if (q.isFunction(r)) return r.call(this, l, i);
  if ((c && (l = i), !!q.isString(l))) {
    if (q.isString(r)) return l.indexOf(r) !== -1;
    if (q.isRegExp(r)) return r.test(l);
  }
}
function Cw(n) {
  return n
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (l, i, r) => i.toUpperCase() + r);
}
function Ow(n, l) {
  const i = q.toCamelCase(" " + l);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(n, r + i, {
      value: function (c, f, d) {
        return this[r].call(this, l, c, f, d);
      },
      configurable: !0,
    });
  });
}
let Wt = class {
  constructor(l) {
    l && this.set(l);
  }
  set(l, i, r) {
    const c = this;
    function f(y, p, m) {
      const v = ir(p);
      if (!v) throw new Error("header name must be a non-empty string");
      const b = q.findKey(c, v);
      (!b || c[b] === void 0 || m === !0 || (m === void 0 && c[b] !== !1)) &&
        (c[b || p] = Xu(y));
    }
    const d = (y, p) => q.forEach(y, (m, v) => f(m, v, p));
    if (q.isPlainObject(l) || l instanceof this.constructor) d(l, i);
    else if (q.isString(l) && (l = l.trim()) && !Tw(l)) d(Nw(l), i);
    else if (q.isHeaders(l)) for (const [y, p] of l.entries()) f(p, y, r);
    else l != null && f(i, l, r);
    return this;
  }
  get(l, i) {
    if (((l = ir(l)), l)) {
      const r = q.findKey(this, l);
      if (r) {
        const c = this[r];
        if (!i) return c;
        if (i === !0) return Aw(c);
        if (q.isFunction(i)) return i.call(this, c, r);
        if (q.isRegExp(i)) return i.exec(c);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(l, i) {
    if (((l = ir(l)), l)) {
      const r = q.findKey(this, l);
      return !!(r && this[r] !== void 0 && (!i || Gf(this, this[r], r, i)));
    }
    return !1;
  }
  delete(l, i) {
    const r = this;
    let c = !1;
    function f(d) {
      if (((d = ir(d)), d)) {
        const y = q.findKey(r, d);
        y && (!i || Gf(r, r[y], y, i)) && (delete r[y], (c = !0));
      }
    }
    return q.isArray(l) ? l.forEach(f) : f(l), c;
  }
  clear(l) {
    const i = Object.keys(this);
    let r = i.length,
      c = !1;
    for (; r--; ) {
      const f = i[r];
      (!l || Gf(this, this[f], f, l, !0)) && (delete this[f], (c = !0));
    }
    return c;
  }
  normalize(l) {
    const i = this,
      r = {};
    return (
      q.forEach(this, (c, f) => {
        const d = q.findKey(r, f);
        if (d) {
          (i[d] = Xu(c)), delete i[f];
          return;
        }
        const y = l ? Cw(f) : String(f).trim();
        y !== f && delete i[f], (i[y] = Xu(c)), (r[y] = !0);
      }),
      this
    );
  }
  concat(...l) {
    return this.constructor.concat(this, ...l);
  }
  toJSON(l) {
    const i = Object.create(null);
    return (
      q.forEach(this, (r, c) => {
        r != null && r !== !1 && (i[c] = l && q.isArray(r) ? r.join(", ") : r);
      }),
      i
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([l, i]) => l + ": " + i).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(l) {
    return l instanceof this ? l : new this(l);
  }
  static concat(l, ...i) {
    const r = new this(l);
    return i.forEach((c) => r.set(c)), r;
  }
  static accessor(l) {
    const r = (this[Ny] = this[Ny] = { accessors: {} }).accessors,
      c = this.prototype;
    function f(d) {
      const y = ir(d);
      r[y] || (Ow(c, d), (r[y] = !0));
    }
    return q.isArray(l) ? l.forEach(f) : f(l), this;
  }
};
Wt.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
q.reduceDescriptors(Wt.prototype, ({ value: n }, l) => {
  let i = l[0].toUpperCase() + l.slice(1);
  return {
    get: () => n,
    set(r) {
      this[i] = r;
    },
  };
});
q.freezeMethods(Wt);
function Xf(n, l) {
  const i = this || Er,
    r = l || i,
    c = Wt.from(r.headers);
  let f = r.data;
  return (
    q.forEach(n, function (y) {
      f = y.call(i, f, c.normalize(), l ? l.status : void 0);
    }),
    c.normalize(),
    f
  );
}
function lg(n) {
  return !!(n && n.__CANCEL__);
}
function ai(n, l, i) {
  Ee.call(this, n ?? "canceled", Ee.ERR_CANCELED, l, i),
    (this.name = "CanceledError");
}
q.inherits(ai, Ee, { __CANCEL__: !0 });
function sg(n, l, i) {
  const r = i.config.validateStatus;
  !i.status || !r || r(i.status)
    ? n(i)
    : l(
        new Ee(
          "Request failed with status code " + i.status,
          [Ee.ERR_BAD_REQUEST, Ee.ERR_BAD_RESPONSE][
            Math.floor(i.status / 100) - 4
          ],
          i.config,
          i.request,
          i
        )
      );
}
function Dw(n) {
  const l = /^([-+\w]{1,25})(:?\/\/|:)/.exec(n);
  return (l && l[1]) || "";
}
function Mw(n, l) {
  n = n || 10;
  const i = new Array(n),
    r = new Array(n);
  let c = 0,
    f = 0,
    d;
  return (
    (l = l !== void 0 ? l : 1e3),
    function (p) {
      const m = Date.now(),
        v = r[f];
      d || (d = m), (i[c] = p), (r[c] = m);
      let b = f,
        E = 0;
      for (; b !== c; ) (E += i[b++]), (b = b % n);
      if (((c = (c + 1) % n), c === f && (f = (f + 1) % n), m - d < l)) return;
      const j = v && m - v;
      return j ? Math.round((E * 1e3) / j) : void 0;
    }
  );
}
function Uw(n, l) {
  let i = 0,
    r = 1e3 / l,
    c,
    f;
  const d = (m, v = Date.now()) => {
    (i = v), (c = null), f && (clearTimeout(f), (f = null)), n.apply(null, m);
  };
  return [
    (...m) => {
      const v = Date.now(),
        b = v - i;
      b >= r
        ? d(m, v)
        : ((c = m),
          f ||
            (f = setTimeout(() => {
              (f = null), d(c);
            }, r - b)));
    },
    () => c && d(c),
  ];
}
const ec = (n, l, i = 3) => {
    let r = 0;
    const c = Mw(50, 250);
    return Uw((f) => {
      const d = f.loaded,
        y = f.lengthComputable ? f.total : void 0,
        p = d - r,
        m = c(p),
        v = d <= y;
      r = d;
      const b = {
        loaded: d,
        total: y,
        progress: y ? d / y : void 0,
        bytes: p,
        rate: m || void 0,
        estimated: m && y && v ? (y - d) / m : void 0,
        event: f,
        lengthComputable: y != null,
        [l ? "download" : "upload"]: !0,
      };
      n(b);
    }, i);
  },
  Ay = (n, l) => {
    const i = n != null;
    return [(r) => l[0]({ lengthComputable: i, total: n, loaded: r }), l[1]];
  },
  Ty =
    (n) =>
    (...l) =>
      q.asap(() => n(...l)),
  zw = Lt.hasStandardBrowserEnv
    ? ((n, l) => (i) => (
        (i = new URL(i, Lt.origin)),
        n.protocol === i.protocol &&
          n.host === i.host &&
          (l || n.port === i.port)
      ))(
        new URL(Lt.origin),
        Lt.navigator && /(msie|trident)/i.test(Lt.navigator.userAgent)
      )
    : () => !0,
  Lw = Lt.hasStandardBrowserEnv
    ? {
        write(n, l, i, r, c, f) {
          const d = [n + "=" + encodeURIComponent(l)];
          q.isNumber(i) && d.push("expires=" + new Date(i).toGMTString()),
            q.isString(r) && d.push("path=" + r),
            q.isString(c) && d.push("domain=" + c),
            f === !0 && d.push("secure"),
            (document.cookie = d.join("; "));
        },
        read(n) {
          const l = document.cookie.match(
            new RegExp("(^|;\\s*)(" + n + ")=([^;]*)")
          );
          return l ? decodeURIComponent(l[3]) : null;
        },
        remove(n) {
          this.write(n, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function Hw(n) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(n);
}
function Bw(n, l) {
  return l ? n.replace(/\/?\/$/, "") + "/" + l.replace(/^\/+/, "") : n;
}
function ig(n, l, i) {
  let r = !Hw(l);
  return (n && r) || i == !1 ? Bw(n, l) : l;
}
const Cy = (n) => (n instanceof Wt ? { ...n } : n);
function Kl(n, l) {
  l = l || {};
  const i = {};
  function r(m, v, b, E) {
    return q.isPlainObject(m) && q.isPlainObject(v)
      ? q.merge.call({ caseless: E }, m, v)
      : q.isPlainObject(v)
      ? q.merge({}, v)
      : q.isArray(v)
      ? v.slice()
      : v;
  }
  function c(m, v, b, E) {
    if (q.isUndefined(v)) {
      if (!q.isUndefined(m)) return r(void 0, m, b, E);
    } else return r(m, v, b, E);
  }
  function f(m, v) {
    if (!q.isUndefined(v)) return r(void 0, v);
  }
  function d(m, v) {
    if (q.isUndefined(v)) {
      if (!q.isUndefined(m)) return r(void 0, m);
    } else return r(void 0, v);
  }
  function y(m, v, b) {
    if (b in l) return r(m, v);
    if (b in n) return r(void 0, m);
  }
  const p = {
    url: f,
    method: f,
    data: f,
    baseURL: d,
    transformRequest: d,
    transformResponse: d,
    paramsSerializer: d,
    timeout: d,
    timeoutMessage: d,
    withCredentials: d,
    withXSRFToken: d,
    adapter: d,
    responseType: d,
    xsrfCookieName: d,
    xsrfHeaderName: d,
    onUploadProgress: d,
    onDownloadProgress: d,
    decompress: d,
    maxContentLength: d,
    maxBodyLength: d,
    beforeRedirect: d,
    transport: d,
    httpAgent: d,
    httpsAgent: d,
    cancelToken: d,
    socketPath: d,
    responseEncoding: d,
    validateStatus: y,
    headers: (m, v, b) => c(Cy(m), Cy(v), b, !0),
  };
  return (
    q.forEach(Object.keys(Object.assign({}, n, l)), function (v) {
      const b = p[v] || c,
        E = b(n[v], l[v], v);
      (q.isUndefined(E) && b !== y) || (i[v] = E);
    }),
    i
  );
}
const rg = (n) => {
    const l = Kl({}, n);
    let {
      data: i,
      withXSRFToken: r,
      xsrfHeaderName: c,
      xsrfCookieName: f,
      headers: d,
      auth: y,
    } = l;
    (l.headers = d = Wt.from(d)),
      (l.url = tg(ig(l.baseURL, l.url), n.params, n.paramsSerializer)),
      y &&
        d.set(
          "Authorization",
          "Basic " +
            btoa(
              (y.username || "") +
                ":" +
                (y.password ? unescape(encodeURIComponent(y.password)) : "")
            )
        );
    let p;
    if (q.isFormData(i)) {
      if (Lt.hasStandardBrowserEnv || Lt.hasStandardBrowserWebWorkerEnv)
        d.setContentType(void 0);
      else if ((p = d.getContentType()) !== !1) {
        const [m, ...v] = p
          ? p
              .split(";")
              .map((b) => b.trim())
              .filter(Boolean)
          : [];
        d.setContentType([m || "multipart/form-data", ...v].join("; "));
      }
    }
    if (
      Lt.hasStandardBrowserEnv &&
      (r && q.isFunction(r) && (r = r(l)), r || (r !== !1 && zw(l.url)))
    ) {
      const m = c && f && Lw.read(f);
      m && d.set(c, m);
    }
    return l;
  },
  Vw = typeof XMLHttpRequest < "u",
  qw =
    Vw &&
    function (n) {
      return new Promise(function (i, r) {
        const c = rg(n);
        let f = c.data;
        const d = Wt.from(c.headers).normalize();
        let { responseType: y, onUploadProgress: p, onDownloadProgress: m } = c,
          v,
          b,
          E,
          j,
          _;
        function D() {
          j && j(),
            _ && _(),
            c.cancelToken && c.cancelToken.unsubscribe(v),
            c.signal && c.signal.removeEventListener("abort", v);
        }
        let T = new XMLHttpRequest();
        T.open(c.method.toUpperCase(), c.url, !0), (T.timeout = c.timeout);
        function U() {
          if (!T) return;
          const V = Wt.from(
              "getAllResponseHeaders" in T && T.getAllResponseHeaders()
            ),
            Y = {
              data:
                !y || y === "text" || y === "json"
                  ? T.responseText
                  : T.response,
              status: T.status,
              statusText: T.statusText,
              headers: V,
              config: n,
              request: T,
            };
          sg(
            function (de) {
              i(de), D();
            },
            function (de) {
              r(de), D();
            },
            Y
          ),
            (T = null);
        }
        "onloadend" in T
          ? (T.onloadend = U)
          : (T.onreadystatechange = function () {
              !T ||
                T.readyState !== 4 ||
                (T.status === 0 &&
                  !(T.responseURL && T.responseURL.indexOf("file:") === 0)) ||
                setTimeout(U);
            }),
          (T.onabort = function () {
            T &&
              (r(new Ee("Request aborted", Ee.ECONNABORTED, n, T)), (T = null));
          }),
          (T.onerror = function () {
            r(new Ee("Network Error", Ee.ERR_NETWORK, n, T)), (T = null);
          }),
          (T.ontimeout = function () {
            let I = c.timeout
              ? "timeout of " + c.timeout + "ms exceeded"
              : "timeout exceeded";
            const Y = c.transitional || ng;
            c.timeoutErrorMessage && (I = c.timeoutErrorMessage),
              r(
                new Ee(
                  I,
                  Y.clarifyTimeoutError ? Ee.ETIMEDOUT : Ee.ECONNABORTED,
                  n,
                  T
                )
              ),
              (T = null);
          }),
          f === void 0 && d.setContentType(null),
          "setRequestHeader" in T &&
            q.forEach(d.toJSON(), function (I, Y) {
              T.setRequestHeader(Y, I);
            }),
          q.isUndefined(c.withCredentials) ||
            (T.withCredentials = !!c.withCredentials),
          y && y !== "json" && (T.responseType = c.responseType),
          m && (([E, _] = ec(m, !0)), T.addEventListener("progress", E)),
          p &&
            T.upload &&
            (([b, j] = ec(p)),
            T.upload.addEventListener("progress", b),
            T.upload.addEventListener("loadend", j)),
          (c.cancelToken || c.signal) &&
            ((v = (V) => {
              T &&
                (r(!V || V.type ? new ai(null, n, T) : V),
                T.abort(),
                (T = null));
            }),
            c.cancelToken && c.cancelToken.subscribe(v),
            c.signal &&
              (c.signal.aborted ? v() : c.signal.addEventListener("abort", v)));
        const L = Dw(c.url);
        if (L && Lt.protocols.indexOf(L) === -1) {
          r(new Ee("Unsupported protocol " + L + ":", Ee.ERR_BAD_REQUEST, n));
          return;
        }
        T.send(f || null);
      });
    },
  kw = (n, l) => {
    const { length: i } = (n = n ? n.filter(Boolean) : []);
    if (l || i) {
      let r = new AbortController(),
        c;
      const f = function (m) {
        if (!c) {
          (c = !0), y();
          const v = m instanceof Error ? m : this.reason;
          r.abort(
            v instanceof Ee ? v : new ai(v instanceof Error ? v.message : v)
          );
        }
      };
      let d =
        l &&
        setTimeout(() => {
          (d = null), f(new Ee(`timeout ${l} of ms exceeded`, Ee.ETIMEDOUT));
        }, l);
      const y = () => {
        n &&
          (d && clearTimeout(d),
          (d = null),
          n.forEach((m) => {
            m.unsubscribe
              ? m.unsubscribe(f)
              : m.removeEventListener("abort", f);
          }),
          (n = null));
      };
      n.forEach((m) => m.addEventListener("abort", f));
      const { signal: p } = r;
      return (p.unsubscribe = () => q.asap(y)), p;
    }
  },
  Fw = function* (n, l) {
    let i = n.byteLength;
    if (i < l) {
      yield n;
      return;
    }
    let r = 0,
      c;
    for (; r < i; ) (c = r + l), yield n.slice(r, c), (r = c);
  },
  Qw = async function* (n, l) {
    for await (const i of Pw(n)) yield* Fw(i, l);
  },
  Pw = async function* (n) {
    if (n[Symbol.asyncIterator]) {
      yield* n;
      return;
    }
    const l = n.getReader();
    try {
      for (;;) {
        const { done: i, value: r } = await l.read();
        if (i) break;
        yield r;
      }
    } finally {
      await l.cancel();
    }
  },
  Oy = (n, l, i, r) => {
    const c = Qw(n, l);
    let f = 0,
      d,
      y = (p) => {
        d || ((d = !0), r && r(p));
      };
    return new ReadableStream(
      {
        async pull(p) {
          try {
            const { done: m, value: v } = await c.next();
            if (m) {
              y(), p.close();
              return;
            }
            let b = v.byteLength;
            if (i) {
              let E = (f += b);
              i(E);
            }
            p.enqueue(new Uint8Array(v));
          } catch (m) {
            throw (y(m), m);
          }
        },
        cancel(p) {
          return y(p), c.return();
        },
      },
      { highWaterMark: 2 }
    );
  },
  bc =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  ug = bc && typeof ReadableStream == "function",
  Yw =
    bc &&
    (typeof TextEncoder == "function"
      ? (
          (n) => (l) =>
            n.encode(l)
        )(new TextEncoder())
      : async (n) => new Uint8Array(await new Response(n).arrayBuffer())),
  cg = (n, ...l) => {
    try {
      return !!n(...l);
    } catch {
      return !1;
    }
  },
  Gw =
    ug &&
    cg(() => {
      let n = !1;
      const l = new Request(Lt.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return (n = !0), "half";
        },
      }).headers.has("Content-Type");
      return n && !l;
    }),
  Dy = 64 * 1024,
  Ed = ug && cg(() => q.isReadableStream(new Response("").body)),
  tc = { stream: Ed && ((n) => n.body) };
bc &&
  ((n) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((l) => {
      !tc[l] &&
        (tc[l] = q.isFunction(n[l])
          ? (i) => i[l]()
          : (i, r) => {
              throw new Ee(
                `Response type '${l}' is not supported`,
                Ee.ERR_NOT_SUPPORT,
                r
              );
            });
    });
  })(new Response());
const Xw = async (n) => {
    if (n == null) return 0;
    if (q.isBlob(n)) return n.size;
    if (q.isSpecCompliantForm(n))
      return (
        await new Request(Lt.origin, { method: "POST", body: n }).arrayBuffer()
      ).byteLength;
    if (q.isArrayBufferView(n) || q.isArrayBuffer(n)) return n.byteLength;
    if ((q.isURLSearchParams(n) && (n = n + ""), q.isString(n)))
      return (await Yw(n)).byteLength;
  },
  Zw = async (n, l) => {
    const i = q.toFiniteNumber(n.getContentLength());
    return i ?? Xw(l);
  },
  Kw =
    bc &&
    (async (n) => {
      let {
        url: l,
        method: i,
        data: r,
        signal: c,
        cancelToken: f,
        timeout: d,
        onDownloadProgress: y,
        onUploadProgress: p,
        responseType: m,
        headers: v,
        withCredentials: b = "same-origin",
        fetchOptions: E,
      } = rg(n);
      m = m ? (m + "").toLowerCase() : "text";
      let j = kw([c, f && f.toAbortSignal()], d),
        _;
      const D =
        j &&
        j.unsubscribe &&
        (() => {
          j.unsubscribe();
        });
      let T;
      try {
        if (
          p &&
          Gw &&
          i !== "get" &&
          i !== "head" &&
          (T = await Zw(v, r)) !== 0
        ) {
          let Y = new Request(l, { method: "POST", body: r, duplex: "half" }),
            te;
          if (
            (q.isFormData(r) &&
              (te = Y.headers.get("content-type")) &&
              v.setContentType(te),
            Y.body)
          ) {
            const [de, ee] = Ay(T, ec(Ty(p)));
            r = Oy(Y.body, Dy, de, ee);
          }
        }
        q.isString(b) || (b = b ? "include" : "omit");
        const U = "credentials" in Request.prototype;
        _ = new Request(l, {
          ...E,
          signal: j,
          method: i.toUpperCase(),
          headers: v.normalize().toJSON(),
          body: r,
          duplex: "half",
          credentials: U ? b : void 0,
        });
        let L = await fetch(_);
        const V = Ed && (m === "stream" || m === "response");
        if (Ed && (y || (V && D))) {
          const Y = {};
          ["status", "statusText", "headers"].forEach((G) => {
            Y[G] = L[G];
          });
          const te = q.toFiniteNumber(L.headers.get("content-length")),
            [de, ee] = (y && Ay(te, ec(Ty(y), !0))) || [];
          L = new Response(
            Oy(L.body, Dy, de, () => {
              ee && ee(), D && D();
            }),
            Y
          );
        }
        m = m || "text";
        let I = await tc[q.findKey(tc, m) || "text"](L, n);
        return (
          !V && D && D(),
          await new Promise((Y, te) => {
            sg(Y, te, {
              data: I,
              headers: Wt.from(L.headers),
              status: L.status,
              statusText: L.statusText,
              config: n,
              request: _,
            });
          })
        );
      } catch (U) {
        throw (
          (D && D(),
          U && U.name === "TypeError" && /fetch/i.test(U.message)
            ? Object.assign(new Ee("Network Error", Ee.ERR_NETWORK, n, _), {
                cause: U.cause || U,
              })
            : Ee.from(U, U && U.code, n, _))
        );
      }
    }),
  _d = { http: ow, xhr: qw, fetch: Kw };
q.forEach(_d, (n, l) => {
  if (n) {
    try {
      Object.defineProperty(n, "name", { value: l });
    } catch {}
    Object.defineProperty(n, "adapterName", { value: l });
  }
});
const My = (n) => `- ${n}`,
  $w = (n) => q.isFunction(n) || n === null || n === !1,
  og = {
    getAdapter: (n) => {
      n = q.isArray(n) ? n : [n];
      const { length: l } = n;
      let i, r;
      const c = {};
      for (let f = 0; f < l; f++) {
        i = n[f];
        let d;
        if (
          ((r = i),
          !$w(i) && ((r = _d[(d = String(i)).toLowerCase()]), r === void 0))
        )
          throw new Ee(`Unknown adapter '${d}'`);
        if (r) break;
        c[d || "#" + f] = r;
      }
      if (!r) {
        const f = Object.entries(c).map(
          ([y, p]) =>
            `adapter ${y} ` +
            (p === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let d = l
          ? f.length > 1
            ? `since :
` +
              f.map(My).join(`
`)
            : " " + My(f[0])
          : "as no adapter specified";
        throw new Ee(
          "There is no suitable adapter to dispatch the request " + d,
          "ERR_NOT_SUPPORT"
        );
      }
      return r;
    },
    adapters: _d,
  };
function Zf(n) {
  if (
    (n.cancelToken && n.cancelToken.throwIfRequested(),
    n.signal && n.signal.aborted)
  )
    throw new ai(null, n);
}
function Uy(n) {
  return (
    Zf(n),
    (n.headers = Wt.from(n.headers)),
    (n.data = Xf.call(n, n.transformRequest)),
    ["post", "put", "patch"].indexOf(n.method) !== -1 &&
      n.headers.setContentType("application/x-www-form-urlencoded", !1),
    og
      .getAdapter(n.adapter || Er.adapter)(n)
      .then(
        function (r) {
          return (
            Zf(n),
            (r.data = Xf.call(n, n.transformResponse, r)),
            (r.headers = Wt.from(r.headers)),
            r
          );
        },
        function (r) {
          return (
            lg(r) ||
              (Zf(n),
              r &&
                r.response &&
                ((r.response.data = Xf.call(
                  n,
                  n.transformResponse,
                  r.response
                )),
                (r.response.headers = Wt.from(r.response.headers)))),
            Promise.reject(r)
          );
        }
      )
  );
}
const fg = "1.8.1",
  xc = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (n, l) => {
    xc[n] = function (r) {
      return typeof r === n || "a" + (l < 1 ? "n " : " ") + n;
    };
  }
);
const zy = {};
xc.transitional = function (l, i, r) {
  function c(f, d) {
    return (
      "[Axios v" +
      fg +
      "] Transitional option '" +
      f +
      "'" +
      d +
      (r ? ". " + r : "")
    );
  }
  return (f, d, y) => {
    if (l === !1)
      throw new Ee(
        c(d, " has been removed" + (i ? " in " + i : "")),
        Ee.ERR_DEPRECATED
      );
    return (
      i &&
        !zy[d] &&
        ((zy[d] = !0),
        console.warn(
          c(
            d,
            " has been deprecated since v" +
              i +
              " and will be removed in the near future"
          )
        )),
      l ? l(f, d, y) : !0
    );
  };
};
xc.spelling = function (l) {
  return (i, r) => (console.warn(`${r} is likely a misspelling of ${l}`), !0);
};
function Jw(n, l, i) {
  if (typeof n != "object")
    throw new Ee("options must be an object", Ee.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(n);
  let c = r.length;
  for (; c-- > 0; ) {
    const f = r[c],
      d = l[f];
    if (d) {
      const y = n[f],
        p = y === void 0 || d(y, f, n);
      if (p !== !0)
        throw new Ee("option " + f + " must be " + p, Ee.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (i !== !0) throw new Ee("Unknown option " + f, Ee.ERR_BAD_OPTION);
  }
}
const Zu = { assertOptions: Jw, validators: xc },
  Xn = Zu.validators;
let Gl = class {
  constructor(l) {
    (this.defaults = l),
      (this.interceptors = { request: new jy(), response: new jy() });
  }
  async request(l, i) {
    try {
      return await this._request(l, i);
    } catch (r) {
      if (r instanceof Error) {
        let c = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(c)
          : (c = new Error());
        const f = c.stack ? c.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack
            ? f &&
              !String(r.stack).endsWith(f.replace(/^.+\n.+\n/, "")) &&
              (r.stack +=
                `
` + f)
            : (r.stack = f);
        } catch {}
      }
      throw r;
    }
  }
  _request(l, i) {
    typeof l == "string" ? ((i = i || {}), (i.url = l)) : (i = l || {}),
      (i = Kl(this.defaults, i));
    const { transitional: r, paramsSerializer: c, headers: f } = i;
    r !== void 0 &&
      Zu.assertOptions(
        r,
        {
          silentJSONParsing: Xn.transitional(Xn.boolean),
          forcedJSONParsing: Xn.transitional(Xn.boolean),
          clarifyTimeoutError: Xn.transitional(Xn.boolean),
        },
        !1
      ),
      c != null &&
        (q.isFunction(c)
          ? (i.paramsSerializer = { serialize: c })
          : Zu.assertOptions(
              c,
              { encode: Xn.function, serialize: Xn.function },
              !0
            )),
      i.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (i.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (i.allowAbsoluteUrls = !0)),
      Zu.assertOptions(
        i,
        {
          baseUrl: Xn.spelling("baseURL"),
          withXsrfToken: Xn.spelling("withXSRFToken"),
        },
        !0
      ),
      (i.method = (i.method || this.defaults.method || "get").toLowerCase());
    let d = f && q.merge(f.common, f[i.method]);
    f &&
      q.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (_) => {
          delete f[_];
        }
      ),
      (i.headers = Wt.concat(d, f));
    const y = [];
    let p = !0;
    this.interceptors.request.forEach(function (D) {
      (typeof D.runWhen == "function" && D.runWhen(i) === !1) ||
        ((p = p && D.synchronous), y.unshift(D.fulfilled, D.rejected));
    });
    const m = [];
    this.interceptors.response.forEach(function (D) {
      m.push(D.fulfilled, D.rejected);
    });
    let v,
      b = 0,
      E;
    if (!p) {
      const _ = [Uy.bind(this), void 0];
      for (
        _.unshift.apply(_, y),
          _.push.apply(_, m),
          E = _.length,
          v = Promise.resolve(i);
        b < E;

      )
        v = v.then(_[b++], _[b++]);
      return v;
    }
    E = y.length;
    let j = i;
    for (b = 0; b < E; ) {
      const _ = y[b++],
        D = y[b++];
      try {
        j = _(j);
      } catch (T) {
        D.call(this, T);
        break;
      }
    }
    try {
      v = Uy.call(this, j);
    } catch (_) {
      return Promise.reject(_);
    }
    for (b = 0, E = m.length; b < E; ) v = v.then(m[b++], m[b++]);
    return v;
  }
  getUri(l) {
    l = Kl(this.defaults, l);
    const i = ig(l.baseURL, l.url, l.allowAbsoluteUrls);
    return tg(i, l.params, l.paramsSerializer);
  }
};
q.forEach(["delete", "get", "head", "options"], function (l) {
  Gl.prototype[l] = function (i, r) {
    return this.request(
      Kl(r || {}, { method: l, url: i, data: (r || {}).data })
    );
  };
});
q.forEach(["post", "put", "patch"], function (l) {
  function i(r) {
    return function (f, d, y) {
      return this.request(
        Kl(y || {}, {
          method: l,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: f,
          data: d,
        })
      );
    };
  }
  (Gl.prototype[l] = i()), (Gl.prototype[l + "Form"] = i(!0));
});
let Ww = class dg {
  constructor(l) {
    if (typeof l != "function")
      throw new TypeError("executor must be a function.");
    let i;
    this.promise = new Promise(function (f) {
      i = f;
    });
    const r = this;
    this.promise.then((c) => {
      if (!r._listeners) return;
      let f = r._listeners.length;
      for (; f-- > 0; ) r._listeners[f](c);
      r._listeners = null;
    }),
      (this.promise.then = (c) => {
        let f;
        const d = new Promise((y) => {
          r.subscribe(y), (f = y);
        }).then(c);
        return (
          (d.cancel = function () {
            r.unsubscribe(f);
          }),
          d
        );
      }),
      l(function (f, d, y) {
        r.reason || ((r.reason = new ai(f, d, y)), i(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(l) {
    if (this.reason) {
      l(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(l) : (this._listeners = [l]);
  }
  unsubscribe(l) {
    if (!this._listeners) return;
    const i = this._listeners.indexOf(l);
    i !== -1 && this._listeners.splice(i, 1);
  }
  toAbortSignal() {
    const l = new AbortController(),
      i = (r) => {
        l.abort(r);
      };
    return (
      this.subscribe(i),
      (l.signal.unsubscribe = () => this.unsubscribe(i)),
      l.signal
    );
  }
  static source() {
    let l;
    return {
      token: new dg(function (c) {
        l = c;
      }),
      cancel: l,
    };
  }
};
function Iw(n) {
  return function (i) {
    return n.apply(null, i);
  };
}
function e4(n) {
  return q.isObject(n) && n.isAxiosError === !0;
}
const Rd = {
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
Object.entries(Rd).forEach(([n, l]) => {
  Rd[l] = n;
});
function hg(n) {
  const l = new Gl(n),
    i = P1(Gl.prototype.request, l);
  return (
    q.extend(i, Gl.prototype, l, { allOwnKeys: !0 }),
    q.extend(i, l, null, { allOwnKeys: !0 }),
    (i.create = function (c) {
      return hg(Kl(n, c));
    }),
    i
  );
}
const ot = hg(Er);
ot.Axios = Gl;
ot.CanceledError = ai;
ot.CancelToken = Ww;
ot.isCancel = lg;
ot.VERSION = fg;
ot.toFormData = vc;
ot.AxiosError = Ee;
ot.Cancel = ot.CanceledError;
ot.all = function (l) {
  return Promise.all(l);
};
ot.spread = Iw;
ot.isAxiosError = e4;
ot.mergeConfig = Kl;
ot.AxiosHeaders = Wt;
ot.formToJSON = (n) => ag(q.isHTMLForm(n) ? new FormData(n) : n);
ot.getAdapter = og.getAdapter;
ot.HttpStatusCode = Rd;
ot.default = ot;
const {
    Axios: D6,
    AxiosError: M6,
    CanceledError: U6,
    isCancel: z6,
    CancelToken: L6,
    VERSION: H6,
    all: B6,
    Cancel: V6,
    isAxiosError: q6,
    spread: k6,
    toFormData: F6,
    AxiosHeaders: Q6,
    HttpStatusCode: P6,
    formToJSON: Y6,
    getAdapter: G6,
    mergeConfig: X6,
  } = ot,
  Pe = ot.create({ baseURL: "/api/v1", withCredentials: !0 });
Pe.interceptors.request.use(
  (n) => {
    const l = sessionStorage.getItem("accessToken");
    return l && (n.headers.Authorization = `Bearer ${l}`), n;
  },
  (n) => Promise.reject(n)
);
Pe.interceptors.response.use(
  (n) => n,
  async (n) => {
    var r, c, f;
    const l = n.config,
      i = l.url === "/auth/refresh";
    if (
      ((r = n == null ? void 0 : n.response) == null ? void 0 : r.status) ===
        401 &&
      [
        "ACCESS TOKEN EXPIRED",
        "ACCESS TOKEN INVALID",
        "ACCESS TOKEN NOT PROVIDED",
      ].includes(
        (f = (c = n == null ? void 0 : n.response) == null ? void 0 : c.data) ==
          null
          ? void 0
          : f.msg
      ) &&
      !i &&
      !l.retry
    )
      try {
        l.retry = !0;
        const { data: d } = await Pe.get("/auth/refresh");
        return (
          sessionStorage.setItem("accessToken", d.accessToken),
          (l.headers.Authorization = `Bearer ${d.accessToken}`),
          Pe(l)
        );
      } catch (d) {
        return sessionStorage.removeItem("accessToken"), Promise.reject(d);
      }
    return Promise.reject(n);
  }
);
const t4 = async (n) => {
    const { data: l } = await Pe.post("/auth/register", { ...n });
    return l;
  },
  n4 = async ({ email: n, password: l }) => {
    const { data: i } = await Pe.post("/auth/login", { email: n, password: l });
    return i;
  },
  a4 = async () => {
    const { data: n } = await Pe.post("/auth/logout");
    return n;
  },
  l4 = async ({ email: n, type: l }) => {
    const { data: i } = await Pe.post(`/auth/send-email?type=${l}`, {
      email: n,
    });
    return i;
  },
  s4 = async ({ ...n }) => {
    const { data: l } = await Pe.post("/auth/verify-account", n);
    return l;
  },
  i4 = async ({ ...n }) => {
    const { data: l } = await Pe.post("/auth/verify-recover-pwd", n);
    return l;
  },
  r4 = async ({ ...n }) => {
    const { data: l } = await Pe.patch("/auth/recover-pwd", n);
    return l;
  },
  u4 = async () => {
    const { data: n } = await Pe.get("/auth/refresh");
    return n;
  },
  mg = () => {
    const { showToastMsg: n } = Qt(),
      { logoutUser: l } = Pt(),
      i = gt(),
      { mutate: r, isPending: c } = Nt({
        mutationFn: () => a4(),
        onSuccess: () => {
          n("Logout successful", "SUCCESS");
        },
        onError: (f) => {
          var d, y;
          n(
            ((y =
              (d = f == null ? void 0 : f.response) == null
                ? void 0
                : d.data) == null
              ? void 0
              : y.msg) || (f == null ? void 0 : f.message),
            "ERROR"
          );
        },
        onSettled: () => {
          l(), i("/", { replace: !0 });
        },
      });
    return { isPending: c, mutate: r };
  },
  c4 = () => {
    const { mutate: n, isPending: l } = mg();
    return {
      handleDropLogout: () => {
        n();
      },
      isPending: l,
    };
  };
var o4 = {
  cm: !0,
  mm: !0,
  in: !0,
  px: !0,
  pt: !0,
  pc: !0,
  em: !0,
  ex: !0,
  ch: !0,
  rem: !0,
  vw: !0,
  vh: !0,
  vmin: !0,
  vmax: !0,
  "%": !0,
};
function jd(n) {
  if (typeof n == "number") return { value: n, unit: "px" };
  var l,
    i = (n.match(/^[0-9.]*/) || "").toString();
  i.includes(".") ? (l = parseFloat(i)) : (l = parseInt(i, 10));
  var r = (n.match(/[^0-9]*$/) || "").toString();
  return o4[r]
    ? { value: l, unit: r }
    : (console.warn(
        "React Spinners: "
          .concat(n, " is not a valid css value. Defaulting to ")
          .concat(l, "px.")
      ),
      { value: l, unit: "px" });
}
function zs(n) {
  var l = jd(n);
  return "".concat(l.value).concat(l.unit);
}
var pg = function (n, l, i) {
    var r = "react-spinners-".concat(n, "-").concat(i);
    if (typeof window > "u" || !window.document) return r;
    var c = document.createElement("style");
    document.head.appendChild(c);
    var f = c.sheet,
      d = `
    @keyframes `
        .concat(
          r,
          ` {
      `
        )
        .concat(
          l,
          `
    }
  `
        );
    return f && f.insertRule(d, 0), r;
  },
  nc = function () {
    return (
      (nc =
        Object.assign ||
        function (n) {
          for (var l, i = 1, r = arguments.length; i < r; i++) {
            l = arguments[i];
            for (var c in l)
              Object.prototype.hasOwnProperty.call(l, c) && (n[c] = l[c]);
          }
          return n;
        }),
      nc.apply(this, arguments)
    );
  },
  f4 = function (n, l) {
    var i = {};
    for (var r in n)
      Object.prototype.hasOwnProperty.call(n, r) &&
        l.indexOf(r) < 0 &&
        (i[r] = n[r]);
    if (n != null && typeof Object.getOwnPropertySymbols == "function")
      for (var c = 0, r = Object.getOwnPropertySymbols(n); c < r.length; c++)
        l.indexOf(r[c]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(n, r[c]) &&
          (i[r[c]] = n[r[c]]);
    return i;
  },
  d4 = pg(
    "GridLoader",
    "0% {transform: scale(1)} 50% {transform: scale(0.5); opacity: 0.7} 100% {transform: scale(1); opacity: 1}",
    "grid"
  ),
  va = function (n) {
    return Math.random() * n;
  };
function h4(n) {
  var l = n.loading,
    i = l === void 0 ? !0 : l,
    r = n.color,
    c = r === void 0 ? "#000000" : r,
    f = n.speedMultiplier,
    d = f === void 0 ? 1 : f,
    y = n.cssOverride,
    p = y === void 0 ? {} : y,
    m = n.size,
    v = m === void 0 ? 15 : m,
    b = n.margin,
    E = b === void 0 ? 2 : b,
    j = f4(n, [
      "loading",
      "color",
      "speedMultiplier",
      "cssOverride",
      "size",
      "margin",
    ]),
    _ = jd(v),
    D = jd(E),
    T = parseFloat(_.value.toString()) * 3 + parseFloat(D.value.toString()) * 6,
    U = nc(
      {
        width: "".concat(T).concat(_.unit),
        fontSize: 0,
        display: "inline-block",
      },
      p
    ),
    L = function (V) {
      return {
        display: "inline-block",
        backgroundColor: c,
        width: "".concat(zs(v)),
        height: "".concat(zs(v)),
        margin: zs(E),
        borderRadius: "100%",
        animationFillMode: "both",
        animation: ""
          .concat(d4, " ")
          .concat((V / 100 + 0.6) / d, "s ")
          .concat(V / 100 - 0.2, "s infinite ease"),
      };
    };
  return i
    ? w.createElement(
        "span",
        nc({ style: U }, j, {
          ref: function (V) {
            V &&
              V.style.setProperty(
                "width",
                "".concat(T).concat(_.unit),
                "important"
              );
          },
        }),
        w.createElement("span", { style: L(va(100)) }),
        w.createElement("span", { style: L(va(100)) }),
        w.createElement("span", { style: L(va(100)) }),
        w.createElement("span", { style: L(va(100)) }),
        w.createElement("span", { style: L(va(100)) }),
        w.createElement("span", { style: L(va(100)) }),
        w.createElement("span", { style: L(va(100)) }),
        w.createElement("span", { style: L(va(100)) }),
        w.createElement("span", { style: L(va(100)) })
      )
    : null;
}
var ac = function () {
    return (
      (ac =
        Object.assign ||
        function (n) {
          for (var l, i = 1, r = arguments.length; i < r; i++) {
            l = arguments[i];
            for (var c in l)
              Object.prototype.hasOwnProperty.call(l, c) && (n[c] = l[c]);
          }
          return n;
        }),
      ac.apply(this, arguments)
    );
  },
  m4 = function (n, l) {
    var i = {};
    for (var r in n)
      Object.prototype.hasOwnProperty.call(n, r) &&
        l.indexOf(r) < 0 &&
        (i[r] = n[r]);
    if (n != null && typeof Object.getOwnPropertySymbols == "function")
      for (var c = 0, r = Object.getOwnPropertySymbols(n); c < r.length; c++)
        l.indexOf(r[c]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(n, r[c]) &&
          (i[r[c]] = n[r[c]]);
    return i;
  },
  p4 = pg(
    "PulseLoader",
    "0% {transform: scale(1); opacity: 1} 45% {transform: scale(0.1); opacity: 0.7} 80% {transform: scale(1); opacity: 1}",
    "pulse"
  );
function y4(n) {
  var l = n.loading,
    i = l === void 0 ? !0 : l,
    r = n.color,
    c = r === void 0 ? "#000000" : r,
    f = n.speedMultiplier,
    d = f === void 0 ? 1 : f,
    y = n.cssOverride,
    p = y === void 0 ? {} : y,
    m = n.size,
    v = m === void 0 ? 15 : m,
    b = n.margin,
    E = b === void 0 ? 2 : b,
    j = m4(n, [
      "loading",
      "color",
      "speedMultiplier",
      "cssOverride",
      "size",
      "margin",
    ]),
    _ = ac({ display: "inherit" }, p),
    D = function (T) {
      return {
        backgroundColor: c,
        width: zs(v),
        height: zs(v),
        margin: zs(E),
        borderRadius: "100%",
        display: "inline-block",
        animation: ""
          .concat(p4, " ")
          .concat(0.75 / d, "s ")
          .concat(
            (T * 0.12) / d,
            "s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)"
          ),
        animationFillMode: "both",
      };
    };
  return i
    ? w.createElement(
        "span",
        ac({ style: _ }, j),
        w.createElement("span", { style: D(1) }),
        w.createElement("span", { style: D(2) }),
        w.createElement("span", { style: D(3) })
      )
    : null;
}
const Ls = { sm: 640, md: 768, lg: 1024, xl: 1280 },
  g4 = () => {
    const [n, l] = w.useState(25);
    return (
      w.useEffect(() => {
        const i = () => (window.innerWidth > Ls.sm ? l(40) : l(30));
        return (
          i(),
          window.addEventListener("resize", i),
          () => window.removeEventListener("resize", i)
        );
      }, [l]),
      { size: n }
    );
  },
  Sc = ({ sizeGiven: n }) => {
    const { size: l } = g4();
    return h.jsx("div", {
      className: "w-full flex max-w-fit",
      children: h.jsx(y4, { color: "#f97316", size: n ?? l }),
    });
  },
  v4 = () => {
    const [n, l] = w.useState(!1),
      i = w.useRef(null),
      r = w.useRef(null),
      c = gt();
    return (
      w.useEffect(() => {
        const m = (v) => {
          i.current && !i.current.contains(v.target) && l(!1);
        };
        return (
          document.addEventListener("mousedown", m),
          () => {
            document.removeEventListener("mousedown", m);
          }
        );
      }, []),
      {
        toggleDrop: () => l((m) => !m),
        dropOpen: n,
        dropRef: i,
        handleSideClick: (m, v) => {
          c(m, v ? { state: { from: v } } : void 0), l(!1);
        },
        handleMouseEnter: () => {
          r.current && clearTimeout(r.current), l(!0);
        },
        handleMouseLeave: () => {
          r.current = setTimeout(() => {
            l(!1);
          }, 250);
        },
      }
    );
  };
var yg = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  Ly = pt.createContext && pt.createContext(yg),
  b4 = ["attr", "size", "title"];
function x4(n, l) {
  if (n == null) return {};
  var i = S4(n, l),
    r,
    c;
  if (Object.getOwnPropertySymbols) {
    var f = Object.getOwnPropertySymbols(n);
    for (c = 0; c < f.length; c++)
      (r = f[c]),
        !(l.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(n, r) &&
          (i[r] = n[r]);
  }
  return i;
}
function S4(n, l) {
  if (n == null) return {};
  var i = {};
  for (var r in n)
    if (Object.prototype.hasOwnProperty.call(n, r)) {
      if (l.indexOf(r) >= 0) continue;
      i[r] = n[r];
    }
  return i;
}
function lc() {
  return (
    (lc = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var l = 1; l < arguments.length; l++) {
            var i = arguments[l];
            for (var r in i)
              Object.prototype.hasOwnProperty.call(i, r) && (n[r] = i[r]);
          }
          return n;
        }),
    lc.apply(this, arguments)
  );
}
function Hy(n, l) {
  var i = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    l &&
      (r = r.filter(function (c) {
        return Object.getOwnPropertyDescriptor(n, c).enumerable;
      })),
      i.push.apply(i, r);
  }
  return i;
}
function sc(n) {
  for (var l = 1; l < arguments.length; l++) {
    var i = arguments[l] != null ? arguments[l] : {};
    l % 2
      ? Hy(Object(i), !0).forEach(function (r) {
          w4(n, r, i[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i))
      : Hy(Object(i)).forEach(function (r) {
          Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(i, r));
        });
  }
  return n;
}
function w4(n, l, i) {
  return (
    (l = E4(l)),
    l in n
      ? Object.defineProperty(n, l, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (n[l] = i),
    n
  );
}
function E4(n) {
  var l = _4(n, "string");
  return typeof l == "symbol" ? l : l + "";
}
function _4(n, l) {
  if (typeof n != "object" || !n) return n;
  var i = n[Symbol.toPrimitive];
  if (i !== void 0) {
    var r = i.call(n, l);
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (l === "string" ? String : Number)(n);
}
function gg(n) {
  return (
    n &&
    n.map((l, i) =>
      pt.createElement(l.tag, sc({ key: i }, l.attr), gg(l.child))
    )
  );
}
function ft(n) {
  return (l) =>
    pt.createElement(R4, lc({ attr: sc({}, n.attr) }, l), gg(n.child));
}
function R4(n) {
  var l = (i) => {
    var { attr: r, size: c, title: f } = n,
      d = x4(n, b4),
      y = c || i.size || "1em",
      p;
    return (
      i.className && (p = i.className),
      n.className && (p = (p ? p + " " : "") + n.className),
      pt.createElement(
        "svg",
        lc(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          i.attr,
          r,
          d,
          {
            className: p,
            style: sc(sc({ color: n.color || i.color }, i.style), n.style),
            height: y,
            width: y,
            xmlns: "http://www.w3.org/2000/svg",
          }
        ),
        f && pt.createElement("title", null, f),
        n.children
      )
    );
  };
  return Ly !== void 0
    ? pt.createElement(Ly.Consumer, null, (i) => l(i))
    : l(yg);
}
function By(n) {
  return ft({
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "M17 11c.34 0 .67.04 1 .09V6.27L10.5 3 3 6.27v4.91c0 4.54 3.2 8.79 7.5 9.82.55-.13 1.08-.32 1.6-.55-.69-.98-1.1-2.17-1.1-3.45 0-3.31 2.69-6 6-6z",
        },
        child: [],
      },
      {
        tag: "path",
        attr: {
          d: "M17 13c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 1.38c.62 0 1.12.51 1.12 1.12s-.51 1.12-1.12 1.12-1.12-.51-1.12-1.12.5-1.12 1.12-1.12zm0 5.37c-.93 0-1.74-.46-2.24-1.17.05-.72 1.51-1.08 2.24-1.08s2.19.36 2.24 1.08c-.5.71-1.31 1.17-2.24 1.17z",
        },
        child: [],
      },
    ],
  })(n);
}
function j4(n) {
  return ft({
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "M18.41 5.8 17.2 4.59c-.78-.78-2.05-.78-2.83 0l-2.68 2.68L3 15.96V20h4.04l8.74-8.74 2.63-2.63c.79-.78.79-2.05 0-2.83zM6.21 18H5v-1.21l8.66-8.66 1.21 1.21L6.21 18zM11 20l4-4h6v4H11z",
        },
        child: [],
      },
    ],
  })(n);
}
function N4(n) {
  return ft({
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" }, child: [] },
      { tag: "path", attr: { d: "m12 2-5.5 9h11z" }, child: [] },
      { tag: "circle", attr: { cx: "17.5", cy: "17.5", r: "4.5" }, child: [] },
      { tag: "path", attr: { d: "M3 13.5h8v8H3z" }, child: [] },
    ],
  })(n);
}
function vg(n) {
  return ft({
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1z",
        },
        child: [],
      },
      {
        tag: "path",
        attr: {
          d: "M5 6h5v2H5zM19 13c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z",
        },
        child: [],
      },
    ],
  })(n);
}
function bg(n) {
  return ft({
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0z" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "M11 14H9a9 9 0 0 1 9-9v2c-3.87 0-7 3.13-7 7zm7-3V9c-2.76 0-5 2.24-5 5h2c0-1.66 1.34-3 3-3zM7 4c0-1.11-.89-2-2-2s-2 .89-2 2 .89 2 2 2 2-.89 2-2zm4.45.5h-2A2.99 2.99 0 0 1 6.5 7h-3C2.67 7 2 7.67 2 8.5V11h6V8.74a4.97 4.97 0 0 0 3.45-4.24zM19 17c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm1.5 1h-3a2.99 2.99 0 0 1-2.95-2.5h-2A4.97 4.97 0 0 0 16 19.74V22h6v-2.5c0-.83-.67-1.5-1.5-1.5z",
        },
        child: [],
      },
    ],
  })(n);
}
function A4(n) {
  return ft({
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0V0z" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zm-9.5-2H18v-2h-5.5zm3.86-5.87c.2-.2.2-.51 0-.71l-1.77-1.77c-.2-.2-.51-.2-.71 0L6 11.53V14h2.47l5.89-5.87z",
        },
        child: [],
      },
    ],
  })(n);
}
const Ot = [];
for (let n = 0; n < 256; ++n) Ot.push((n + 256).toString(16).slice(1));
function T4(n, l = 0) {
  return (
    Ot[n[l + 0]] +
    Ot[n[l + 1]] +
    Ot[n[l + 2]] +
    Ot[n[l + 3]] +
    "-" +
    Ot[n[l + 4]] +
    Ot[n[l + 5]] +
    "-" +
    Ot[n[l + 6]] +
    Ot[n[l + 7]] +
    "-" +
    Ot[n[l + 8]] +
    Ot[n[l + 9]] +
    "-" +
    Ot[n[l + 10]] +
    Ot[n[l + 11]] +
    Ot[n[l + 12]] +
    Ot[n[l + 13]] +
    Ot[n[l + 14]] +
    Ot[n[l + 15]]
  ).toLowerCase();
}
let Kf;
const C4 = new Uint8Array(16);
function O4() {
  if (!Kf) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    Kf = crypto.getRandomValues.bind(crypto);
  }
  return Kf(C4);
}
const D4 =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  Vy = { randomUUID: D4 };
function M4(n, l, i) {
  var c;
  if (Vy.randomUUID && !n) return Vy.randomUUID();
  n = n || {};
  const r = n.random ?? ((c = n.rng) == null ? void 0 : c.call(n)) ?? O4();
  if (r.length < 16) throw new Error("Random bytes length must be >= 16");
  return (r[6] = (r[6] & 15) | 64), (r[8] = (r[8] & 63) | 128), T4(r);
}
const re = () => M4(),
  U4 = [{ id: re(), path: "/", label: "Home", svg: jS }],
  xg = [
    { id: re(), path: "/user/profile", label: "Profile", svg: A1 },
    {
      id: re(),
      path: "/user/manage-account",
      label: "Manage Account",
      svg: PS,
    },
    {
      id: re(),
      path: "/my-restaurants/add-restaurant",
      label: "Create restaurant",
      svg: By,
    },
    { id: re(), path: "/my-restaurants", label: "My restaurants", svg: By },
  ],
  z4 = xg.slice(0, 2),
  Sg = [
    { id: re(), path: "/auth/login", label: "Login", svg: E1 },
    {
      id: re(),
      path: "/auth/send-email?type=recover-pwd",
      label: "Recover Password",
      from: "/auth/login",
      svg: w1,
    },
    { id: re(), path: "/auth/register", label: "Register", svg: N1 },
    {
      id: re(),
      path: "/auth/send-email?type=verify-account",
      label: "Verify Account",
      from: "/auth/register",
      svg: R1,
    },
  ],
  wg = ({ location: n, el: l, type: i }) =>
    l != null && l.from && i
      ? i === l.path.split("=")[1]
        ? "active"
        : ""
      : n.pathname === l.path
      ? "active"
      : "",
  Eg = ({ isLogged: n, children: l }) => {
    const i = st(),
      [r] = Ra(),
      c = r.get("type"),
      {
        toggleDrop: f,
        dropOpen: d,
        dropRef: y,
        handleSideClick: p,
        handleMouseEnter: m,
        handleMouseLeave: v,
      } = v4(),
      b = n ? z4 : Sg;
    return h.jsxs("div", {
      ref: y,
      className: "flex items-center justify-center cursor-pointer relative",
      children: [
        h.jsx("div", {
          onMouseEnter: m,
          onMouseLeave: v,
          onClick: f,
          className: `txt__01 ${
            n
              ? "transition-all duration-300 hover:text-orange-500 hover:scale-120 border-2 py-1 px-2 rounded-xl"
              : ""
          }`,
          children: n
            ? sessionStorage.getItem("initName") ?? ""
            : h.jsx(A1, {
                className:
                  "w-[37.5px] h-[37.5px] transition-all duration-300 hover:text-orange-500 hover:scale-120",
              }),
        }),
        h.jsx("div", {
          onMouseEnter: m,
          onMouseLeave: v,
          className: `absolute border-2 border-orange-500 bg-[#111] -top-full -right-full h-fit w-fit rounded-xl z-10 transition-all duration-300  ${
            d
              ? "translate-y-[40%] opacity-100"
              : "opacity-0 translate-y-0 pointer-events-none"
          }`,
          children: h.jsxs("div", {
            className: "w-full flex flex-col items-start",
            children: [
              b.map((E) =>
                h.jsxs(
                  "button",
                  {
                    onClick: () =>
                      p(E.path, (E == null ? void 0 : E.from) ?? ""),
                    className: `min-w-[300px] w-full flex gap-3 border-b-orange-500 border-b-2 pl-3 pr-10 py-3 justify-start group cursor-pointer hover:text-orange-500 ${
                      wg({ location: i, el: E, type: c })
                        ? "text-orange-500"
                        : ""
                    }`,
                    children: [
                      h.jsx(E.svg, { className: "svg__drop" }),
                      h.jsx("span", {
                        className: "txt__02 transition-all duration-300",
                        children: E.label,
                      }),
                    ],
                  },
                  E.id
                )
              ),
              l ?? null,
            ],
          }),
        }),
      ],
    });
  },
  L4 = () => {
    const { handleDropLogout: n, isPending: l } = c4();
    return h.jsx(Eg, {
      isLogged: !0,
      children: l
        ? h.jsx("div", {
            className: "h-[50px] w-full flex items-center justify-start pl-5",
            children: h.jsx(Sc, { sizeGiven: 25 }),
          })
        : h.jsxs("button", {
            onClick: n,
            className:
              "w-full cursor-pointer flex gap-3 pl-3 pr-10 py-3 justify-start group",
            children: [
              h.jsx(_1, { className: "svg__drop" }),
              h.jsx("span", {
                className:
                  "txt__02 group-hover:text-orange-500 duration-300 transition-all",
                children: "Logout",
              }),
            ],
          }),
    });
  },
  H4 = () => h.jsx(Eg, { isLogged: !1 }),
  B4 = ({ setSideOpen: n, sideOpen: l }) => {
    const { isLogged: i } = Pt(),
      c = st().pathname !== "/notice-email-sent";
    return h.jsx("div", {
      className:
        "sticky top-0 left-0 h-[75px] w-full border-b-3 border-orange-500 bg-[#111] pad__page flex items-center header__i",
      children: h.jsxs("div", {
        className: "w-full grid grid-cols-2",
        children: [
          h.jsx(cl, {
            className: "txt__05 text-orange-500 max-w-fit",
            to: "/",
            children: "MERN__EAT",
          }),
          c &&
            h.jsxs("div", {
              className: "flex w-full gap-5 items-center justify-end",
              children: [
                i ? h.jsx(L4, {}) : h.jsx(H4, {}),
                l
                  ? h.jsx("div", {
                      onClick: () => (n == null ? void 0 : n(!1)),
                      className:
                        "max-w-fit justify-self-end group flex items-center",
                      children: h.jsx(Xd, { className: "svg__header" }),
                    })
                  : h.jsx("div", {
                      onClick: () => (n == null ? void 0 : n(!0)),
                      className:
                        "max-w-fit justify-self-end group flex items-center",
                      children: h.jsx(zS, { className: "svg__header" }),
                    }),
              ],
            }),
        ],
      }),
    });
  },
  V4 = ({ sideRef: n, setSideOpen: l }) => {
    const i = gt();
    w.useEffect(() => {
      const y = (p) => {
        var m;
        ((m = n.current) != null && m.contains(p.target)) || l(!1);
      };
      return (
        document.addEventListener("mousedown", y),
        () => {
          document.removeEventListener("mousedown", y);
        }
      );
    }, [l, n]);
    const { mutate: r, isPending: c } = mg();
    return {
      isPending: c,
      handleLogout: () => r(),
      handleSideClick: (y, p) => {
        i(y, p ? { state: { from: p } } : void 0), l(!1);
      },
    };
  },
  $f = ({ handleSideClick: n, type: l, location: i, el: r }) =>
    h.jsxs(
      "button",
      {
        onClick: () => n(r.path, r == null ? void 0 : r.from),
        className: `ml-3 w-full cursor-pointer flex gap-3 group max-w-fit items-center el__after_below sideLink ${wg(
          { location: i, el: r, type: l }
        )}`,
        children: [
          h.jsx(r.svg, { className: "svg__sidebar" }),
          h.jsx("span", {
            className:
              "cursor-pointer txt__02 group-hover:text-orange-500 transition-all duration-300",
            children: r.label,
          }),
        ],
      },
      r.id
    ),
  q4 = ({ handleLogout: n, isPending: l }) =>
    l
      ? h.jsx("div", { className: "ml-3", children: h.jsx(Sc, {}) })
      : h.jsxs("button", {
          onClick: n,
          className:
            "ml-3 w-full flex gap-3 group max-w-fit items-center el__after_below",
          children: [
            h.jsx(_1, { className: "svg__sidebar" }),
            h.jsx("span", {
              className:
                "cursor-pointer txt__02 group-hover:text-orange-500 transition-all duration-300",
              children: "Logout",
            }),
          ],
        }),
  k4 = ({ currUser: n }) =>
    h.jsx("div", {
      className: "w-full flex items-center border-b-2 border-orange-500",
      children: h.jsxs("div", {
        className: "w-full flex items-center pb-4 pl-3 gap-3",
        children: [
          h.jsx(uS, {
            className: " w-[35px] h-[35px] sm:w-[40px] sm:h-[40px]",
          }),
          h.jsx("span", {
            className: "txt__02 max-w-full truncate",
            children: n.email,
          }),
        ],
      }),
    }),
  F4 = ({ sideOpen: n, setSideOpen: l }) => {
    const i = w.useRef(null),
      r = st(),
      [c] = Ra(),
      f = c.get("type"),
      { isLogged: d, currUser: y } = Pt(),
      {
        isPending: p,
        handleLogout: m,
        handleSideClick: v,
      } = V4({ sideRef: i, setSideOpen: l });
    return h.jsxs(h.Fragment, {
      children: [
        h.jsx("div", {
          className: `${
            n ? "fixed" : "hidden"
          } inset-0 bg-black/50 sidebar__i_bg transition-none`,
        }),
        h.jsx("div", {
          ref: i,
          className: `${
            n ? "translate-x-0" : "translate-x-full"
          } sidebar__content sidebar__i_content`,
          children: h.jsxs("div", {
            className: "w-full grid grid-cols-1 justify-items-start gap-5 pt-4",
            children: [
              y && h.jsx(k4, { currUser: y }),
              U4.map((b) =>
                h.jsx(
                  $f,
                  { handleSideClick: v, type: f, location: r, el: b },
                  b.id
                )
              ),
              d
                ? xg.map((b) =>
                    h.jsx(
                      $f,
                      { handleSideClick: v, type: f, location: r, el: b },
                      b.id
                    )
                  )
                : Sg.map((b) =>
                    h.jsx(
                      $f,
                      { handleSideClick: v, type: f, location: r, el: b },
                      b.id
                    )
                  ),
              d && h.jsx(q4, { isPending: p, handleLogout: m }),
            ],
          }),
        }),
      ],
    });
  },
  Q4 = "/assets/hero-C0USUQ76.avif",
  P4 = "/assets/hero_2-My4mLI9C.avif",
  Y4 = "/assets/hero_5-DfOWyyJE.avif",
  G4 = "/assets/hero_6-B4eY8YHC.avif",
  Nd = [
    { id: re(), img: Q4 },
    { id: re(), img: P4 },
    { id: re(), img: Y4 },
    { id: re(), img: G4 },
  ],
  X4 = () => {
    const [n, l] = w.useState(0),
      [i, r] = w.useState(!1),
      [c, f] = w.useState(100);
    w.useEffect(() => {
      const p = () =>
        window.innerWidth <= Ls.md
          ? f(100)
          : window.innerWidth <= Ls.lg
          ? f(90)
          : window.innerWidth <= Ls.xl
          ? f(80)
          : f(75);
      return (
        p(),
        window.addEventListener("resize", p),
        () => window.removeEventListener("resize", p)
      );
    }, []);
    const d = w.useCallback(() => {
        n === Nd.length - 1 ? l(0) : l((p) => p + 1);
      }, [n]),
      y = () => {
        l(n === 0 ? Nd.length - 1 : (p) => p - 1);
      };
    return (
      w.useEffect(() => {
        if (i) return;
        const p = setInterval(() => {
          d();
        }, 1500);
        return () => clearInterval(p);
      }, [i, d]),
      {
        activeIndx: n,
        handleNext: d,
        handlePrev: y,
        setBtnClicked: r,
        translateVal: c,
      }
    );
  },
  Z4 = () => {
    const {
      activeIndx: n,
      handleNext: l,
      handlePrev: i,
      setBtnClicked: r,
      translateVal: c,
    } = X4();
    return h.jsx("div", {
      className: "pad__page w-full pt-5 flex flex-col justify-center",
      children: h.jsxs("div", {
        className: "w-full flex items-center relative",
        children: [
          h.jsx("button", {
            onClick: () => {
              r(!0), i();
            },
            className:
              "absolute top-1/2 left-0 -translate-y-1/2 hero__i_arrow outline-none",
            children: h.jsx(Ix, {
              className:
                "h-[50px] w-[50px] text-orange-500 btn__pseudo hover:scale-120",
            }),
          }),
          h.jsx("div", {
            className:
              "w-full flex justify-items-center gap-[10%] overflow-x-auto hide_scrollbar snap-mandatory snap-x p-6 border-2 border-orange-500 rounded-xl",
            children: Nd.map((f) =>
              h.jsx(
                "div",
                {
                  className:
                    "min-w-[75vw] sm:min-w-[450px] snap-center rounded-xl transition-all duration-500 overflow-hidden",
                  style: { transform: `translateX(-${n * c + n * 10}%)` },
                  children: h.jsx("img", {
                    src: f.img,
                    alt: "burger_hero",
                    className: "w-full object-cover h-fit ",
                  }),
                },
                f.id
              )
            ),
          }),
          h.jsx("button", {
            onClick: () => {
              r(!0), l();
            },
            className:
              "absolute top-1/2 right-0 -translate-y-1/2 hero__i_arrow outline-none",
            children: h.jsx(tS, {
              className:
                "h-[50px] w-[50px] text-orange-500 btn__pseudo hover:scale-120",
            }),
          }),
        ],
      }),
    });
  },
  en = () => {
    const { showToastMsg: n } = Qt(),
      l = gt(),
      { logoutUser: i } = Pt();
    return {
      handleErrAPI: w.useCallback(
        ({ err: c, push: f = !1, toast: d = !0 }) => {
          var v, b, E, j, _;
          console.log(c);
          const y =
              ((b =
                (v = c == null ? void 0 : c.response) == null
                  ? void 0
                  : v.data) == null
                ? void 0
                : b.msg) || c.message,
            p =
              ((j =
                (E = c == null ? void 0 : c.response) == null
                  ? void 0
                  : E.config) == null
                ? void 0
                : j.url) || "",
            m =
              (_ = c == null ? void 0 : c.response) == null ? void 0 : _.status;
          p === "/auth/refresh"
            ? (i(), l("/", { replace: !0 }), n("SESSION EXPIRED", "ERROR"))
            : [401, 403, 429].includes(m)
            ? (l("/", { replace: !0 }), n(y, "ERROR"))
            : (f && l("/", { replace: !0 }), d && n(y, "ERROR"));
        },
        [l, n, i]
      ),
    };
  },
  K4 = async ({ type: n }) => {
    const { data: l } = await Pe.patch("/newsletter/toggle-logged", {
      type: n,
    });
    return l;
  },
  $4 = async (n) => {
    const { data: l } = await Pe.post("/newsletter/subscribe-non-logged", {
      email: n,
    });
    return l;
  },
  J4 = async (n) => {
    const { data: l } = await Pe.patch(
      "/newsletter/unsubscribe-via-link-logged",
      n
    );
    return l;
  },
  W4 = async (n) => {
    const { data: l } = await Pe.delete(
      "/newsletter/unsubscribe-via-link-non-logged",
      { data: n }
    );
    return l;
  },
  I4 = async ({ email: n }) => {
    const { data: l } = await Pe.post("/newsletter/send-email-unsubscribe", {
      email: n,
    });
    return l;
  };
var _r = (n) => n.type === "checkbox",
  Hl = (n) => n instanceof Date,
  Ft = (n) => n == null;
const _g = (n) => typeof n == "object";
var ct = (n) => !Ft(n) && !Array.isArray(n) && _g(n) && !Hl(n),
  e3 = (n) =>
    ct(n) && n.target ? (_r(n.target) ? n.target.checked : n.target.value) : n,
  t3 = (n) => n.substring(0, n.search(/\.\d+(\.|$)/)) || n,
  n3 = (n, l) => n.has(t3(l)),
  a3 = (n) => {
    const l = n.constructor && n.constructor.prototype;
    return ct(l) && l.hasOwnProperty("isPrototypeOf");
  },
  ah =
    typeof window < "u" &&
    typeof window.HTMLElement < "u" &&
    typeof document < "u";
function En(n) {
  let l;
  const i = Array.isArray(n),
    r = typeof FileList < "u" ? n instanceof FileList : !1;
  if (n instanceof Date) l = new Date(n);
  else if (n instanceof Set) l = new Set(n);
  else if (!(ah && (n instanceof Blob || r)) && (i || ct(n)))
    if (((l = i ? [] : {}), !i && !a3(n))) l = n;
    else for (const c in n) n.hasOwnProperty(c) && (l[c] = En(n[c]));
  else return n;
  return l;
}
var wc = (n) => (Array.isArray(n) ? n.filter(Boolean) : []),
  yt = (n) => n === void 0,
  ie = (n, l, i) => {
    if (!l || !ct(n)) return i;
    const r = wc(l.split(/[,[\].]+?/)).reduce((c, f) => (Ft(c) ? c : c[f]), n);
    return yt(r) || r === n ? (yt(n[l]) ? i : n[l]) : r;
  },
  Zn = (n) => typeof n == "boolean",
  lh = (n) => /^\w*$/.test(n),
  Rg = (n) => wc(n.replace(/["|']|\]/g, "").split(/\.|\[/)),
  Ke = (n, l, i) => {
    let r = -1;
    const c = lh(l) ? [l] : Rg(l),
      f = c.length,
      d = f - 1;
    for (; ++r < f; ) {
      const y = c[r];
      let p = i;
      if (r !== d) {
        const m = n[y];
        p = ct(m) || Array.isArray(m) ? m : isNaN(+c[r + 1]) ? {} : [];
      }
      if (y === "__proto__" || y === "constructor" || y === "prototype") return;
      (n[y] = p), (n = n[y]);
    }
    return n;
  };
const qy = { BLUR: "blur", FOCUS_OUT: "focusout" },
  Hn = {
    onBlur: "onBlur",
    onChange: "onChange",
    onSubmit: "onSubmit",
    onTouched: "onTouched",
    all: "all",
  },
  ba = {
    max: "max",
    min: "min",
    maxLength: "maxLength",
    minLength: "minLength",
    pattern: "pattern",
    required: "required",
    validate: "validate",
  },
  l3 = pt.createContext(null),
  jg = (n) => {
    const { children: l, ...i } = n;
    return pt.createElement(l3.Provider, { value: i }, l);
  };
var s3 = (n, l, i, r = !0) => {
    const c = { defaultValues: l._defaultValues };
    for (const f in n)
      Object.defineProperty(c, f, {
        get: () => {
          const d = f;
          return (
            l._proxyFormState[d] !== Hn.all &&
              (l._proxyFormState[d] = !r || Hn.all),
            n[d]
          );
        },
      });
    return c;
  },
  $t = (n) => ct(n) && !Object.keys(n).length,
  i3 = (n, l, i, r) => {
    i(n);
    const { name: c, ...f } = n;
    return (
      $t(f) ||
      Object.keys(f).length >= Object.keys(l).length ||
      Object.keys(f).find((d) => l[d] === Hn.all)
    );
  },
  Ku = (n) => (Array.isArray(n) ? n : [n]);
function r3(n) {
  const l = pt.useRef(n);
  (l.current = n),
    pt.useEffect(() => {
      const i =
        !n.disabled &&
        l.current.subject &&
        l.current.subject.subscribe({ next: l.current.next });
      return () => {
        i && i.unsubscribe();
      };
    }, [n.disabled]);
}
var ea = (n) => typeof n == "string",
  u3 = (n, l, i, r, c) =>
    ea(n)
      ? (r && l.watch.add(n), ie(i, n, c))
      : Array.isArray(n)
      ? n.map((f) => (r && l.watch.add(f), ie(i, f)))
      : (r && (l.watchAll = !0), i),
  c3 = (n, l, i, r, c) =>
    l
      ? {
          ...i[n],
          types: { ...(i[n] && i[n].types ? i[n].types : {}), [r]: c || !0 },
        }
      : {},
  ky = (n) => ({
    isOnSubmit: !n || n === Hn.onSubmit,
    isOnBlur: n === Hn.onBlur,
    isOnChange: n === Hn.onChange,
    isOnAll: n === Hn.all,
    isOnTouch: n === Hn.onTouched,
  }),
  Fy = (n, l, i) =>
    !i &&
    (l.watchAll ||
      l.watch.has(n) ||
      [...l.watch].some(
        (r) => n.startsWith(r) && /^\.\w+/.test(n.slice(r.length))
      ));
const or = (n, l, i, r) => {
  for (const c of i || Object.keys(n)) {
    const f = ie(n, c);
    if (f) {
      const { _f: d, ...y } = f;
      if (d) {
        if (d.refs && d.refs[0] && l(d.refs[0], c) && !r) return !0;
        if (d.ref && l(d.ref, d.name) && !r) return !0;
        if (or(y, l)) break;
      } else if (ct(y) && or(y, l)) break;
    }
  }
};
var o3 = (n, l, i) => {
    const r = Ku(ie(n, i));
    return Ke(r, "root", l[i]), Ke(n, i, r), n;
  },
  sh = (n) => n.type === "file",
  In = (n) => typeof n == "function",
  ic = (n) => {
    if (!ah) return !1;
    const l = n ? n.ownerDocument : 0;
    return (
      n instanceof
      (l && l.defaultView ? l.defaultView.HTMLElement : HTMLElement)
    );
  },
  $u = (n) => ea(n),
  ih = (n) => n.type === "radio",
  rc = (n) => n instanceof RegExp;
const Qy = { value: !1, isValid: !1 },
  Py = { value: !0, isValid: !0 };
var Ng = (n) => {
  if (Array.isArray(n)) {
    if (n.length > 1) {
      const l = n
        .filter((i) => i && i.checked && !i.disabled)
        .map((i) => i.value);
      return { value: l, isValid: !!l.length };
    }
    return n[0].checked && !n[0].disabled
      ? n[0].attributes && !yt(n[0].attributes.value)
        ? yt(n[0].value) || n[0].value === ""
          ? Py
          : { value: n[0].value, isValid: !0 }
        : Py
      : Qy;
  }
  return Qy;
};
const Yy = { isValid: !1, value: null };
var Ag = (n) =>
  Array.isArray(n)
    ? n.reduce(
        (l, i) =>
          i && i.checked && !i.disabled ? { isValid: !0, value: i.value } : l,
        Yy
      )
    : Yy;
function Gy(n, l, i = "validate") {
  if ($u(n) || (Array.isArray(n) && n.every($u)) || (Zn(n) && !n))
    return { type: i, message: $u(n) ? n : "", ref: l };
}
var Ms = (n) => (ct(n) && !rc(n) ? n : { value: n, message: "" }),
  Xy = async (n, l, i, r, c, f) => {
    const {
        ref: d,
        refs: y,
        required: p,
        maxLength: m,
        minLength: v,
        min: b,
        max: E,
        pattern: j,
        validate: _,
        name: D,
        valueAsNumber: T,
        mount: U,
      } = n._f,
      L = ie(i, D);
    if (!U || l.has(D)) return {};
    const V = y ? y[0] : d,
      I = (he) => {
        c &&
          V.reportValidity &&
          (V.setCustomValidity(Zn(he) ? "" : he || ""), V.reportValidity());
      },
      Y = {},
      te = ih(d),
      de = _r(d),
      ee = te || de,
      G =
        ((T || sh(d)) && yt(d.value) && yt(L)) ||
        (ic(d) && d.value === "") ||
        L === "" ||
        (Array.isArray(L) && !L.length),
      le = c3.bind(null, D, r, Y),
      ke = (he, we, Le, xe = ba.maxLength, K = ba.minLength) => {
        const oe = he ? we : Le;
        Y[D] = {
          type: he ? xe : K,
          message: oe,
          ref: d,
          ...le(he ? xe : K, oe),
        };
      };
    if (
      f
        ? !Array.isArray(L) || !L.length
        : p &&
          ((!ee && (G || Ft(L))) ||
            (Zn(L) && !L) ||
            (de && !Ng(y).isValid) ||
            (te && !Ag(y).isValid))
    ) {
      const { value: he, message: we } = $u(p)
        ? { value: !!p, message: p }
        : Ms(p);
      if (
        he &&
        ((Y[D] = {
          type: ba.required,
          message: we,
          ref: V,
          ...le(ba.required, we),
        }),
        !r)
      )
        return I(we), Y;
    }
    if (!G && (!Ft(b) || !Ft(E))) {
      let he, we;
      const Le = Ms(E),
        xe = Ms(b);
      if (!Ft(L) && !isNaN(L)) {
        const K = d.valueAsNumber || (L && +L);
        Ft(Le.value) || (he = K > Le.value),
          Ft(xe.value) || (we = K < xe.value);
      } else {
        const K = d.valueAsDate || new Date(L),
          oe = (A) => new Date(new Date().toDateString() + " " + A),
          me = d.type == "time",
          He = d.type == "week";
        ea(Le.value) &&
          L &&
          (he = me
            ? oe(L) > oe(Le.value)
            : He
            ? L > Le.value
            : K > new Date(Le.value)),
          ea(xe.value) &&
            L &&
            (we = me
              ? oe(L) < oe(xe.value)
              : He
              ? L < xe.value
              : K < new Date(xe.value));
      }
      if ((he || we) && (ke(!!he, Le.message, xe.message, ba.max, ba.min), !r))
        return I(Y[D].message), Y;
    }
    if ((m || v) && !G && (ea(L) || (f && Array.isArray(L)))) {
      const he = Ms(m),
        we = Ms(v),
        Le = !Ft(he.value) && L.length > +he.value,
        xe = !Ft(we.value) && L.length < +we.value;
      if ((Le || xe) && (ke(Le, he.message, we.message), !r))
        return I(Y[D].message), Y;
    }
    if (j && !G && ea(L)) {
      const { value: he, message: we } = Ms(j);
      if (
        rc(he) &&
        !L.match(he) &&
        ((Y[D] = {
          type: ba.pattern,
          message: we,
          ref: d,
          ...le(ba.pattern, we),
        }),
        !r)
      )
        return I(we), Y;
    }
    if (_) {
      if (In(_)) {
        const he = await _(L, i),
          we = Gy(he, V);
        if (we && ((Y[D] = { ...we, ...le(ba.validate, we.message) }), !r))
          return I(we.message), Y;
      } else if (ct(_)) {
        let he = {};
        for (const we in _) {
          if (!$t(he) && !r) break;
          const Le = Gy(await _[we](L, i), V, we);
          Le &&
            ((he = { ...Le, ...le(we, Le.message) }),
            I(Le.message),
            r && (Y[D] = he));
        }
        if (!$t(he) && ((Y[D] = { ref: V, ...he }), !r)) return Y;
      }
    }
    return I(!0), Y;
  };
function f3(n, l) {
  const i = l.slice(0, -1).length;
  let r = 0;
  for (; r < i; ) n = yt(n) ? r++ : n[l[r++]];
  return n;
}
function d3(n) {
  for (const l in n) if (n.hasOwnProperty(l) && !yt(n[l])) return !1;
  return !0;
}
function xt(n, l) {
  const i = Array.isArray(l) ? l : lh(l) ? [l] : Rg(l),
    r = i.length === 1 ? n : f3(n, i),
    c = i.length - 1,
    f = i[c];
  return (
    r && delete r[f],
    c !== 0 &&
      ((ct(r) && $t(r)) || (Array.isArray(r) && d3(r))) &&
      xt(n, i.slice(0, -1)),
    n
  );
}
var Jf = () => {
    let n = [];
    return {
      get observers() {
        return n;
      },
      next: (c) => {
        for (const f of n) f.next && f.next(c);
      },
      subscribe: (c) => (
        n.push(c),
        {
          unsubscribe: () => {
            n = n.filter((f) => f !== c);
          },
        }
      ),
      unsubscribe: () => {
        n = [];
      },
    };
  },
  Ad = (n) => Ft(n) || !_g(n);
function Ja(n, l) {
  if (Ad(n) || Ad(l)) return n === l;
  if (Hl(n) && Hl(l)) return n.getTime() === l.getTime();
  const i = Object.keys(n),
    r = Object.keys(l);
  if (i.length !== r.length) return !1;
  for (const c of i) {
    const f = n[c];
    if (!r.includes(c)) return !1;
    if (c !== "ref") {
      const d = l[c];
      if (
        (Hl(f) && Hl(d)) ||
        (ct(f) && ct(d)) ||
        (Array.isArray(f) && Array.isArray(d))
          ? !Ja(f, d)
          : f !== d
      )
        return !1;
    }
  }
  return !0;
}
var Tg = (n) => n.type === "select-multiple",
  h3 = (n) => ih(n) || _r(n),
  Wf = (n) => ic(n) && n.isConnected,
  Cg = (n) => {
    for (const l in n) if (In(n[l])) return !0;
    return !1;
  };
function uc(n, l = {}) {
  const i = Array.isArray(n);
  if (ct(n) || i)
    for (const r in n)
      Array.isArray(n[r]) || (ct(n[r]) && !Cg(n[r]))
        ? ((l[r] = Array.isArray(n[r]) ? [] : {}), uc(n[r], l[r]))
        : Ft(n[r]) || (l[r] = !0);
  return l;
}
function Og(n, l, i) {
  const r = Array.isArray(n);
  if (ct(n) || r)
    for (const c in n)
      Array.isArray(n[c]) || (ct(n[c]) && !Cg(n[c]))
        ? yt(l) || Ad(i[c])
          ? (i[c] = Array.isArray(n[c]) ? uc(n[c], []) : { ...uc(n[c]) })
          : Og(n[c], Ft(l) ? {} : l[c], i[c])
        : (i[c] = !Ja(n[c], l[c]));
  return i;
}
var rr = (n, l) => Og(n, l, uc(l)),
  Dg = (n, { valueAsNumber: l, valueAsDate: i, setValueAs: r }) =>
    yt(n)
      ? n
      : l
      ? n === ""
        ? NaN
        : n && +n
      : i && ea(n)
      ? new Date(n)
      : r
      ? r(n)
      : n;
function If(n) {
  const l = n.ref;
  return sh(l)
    ? l.files
    : ih(l)
    ? Ag(n.refs).value
    : Tg(l)
    ? [...l.selectedOptions].map(({ value: i }) => i)
    : _r(l)
    ? Ng(n.refs).value
    : Dg(yt(l.value) ? n.ref.value : l.value, n);
}
var m3 = (n, l, i, r) => {
    const c = {};
    for (const f of n) {
      const d = ie(l, f);
      d && Ke(c, f, d._f);
    }
    return {
      criteriaMode: i,
      names: [...n],
      fields: c,
      shouldUseNativeValidation: r,
    };
  },
  ur = (n) =>
    yt(n)
      ? n
      : rc(n)
      ? n.source
      : ct(n)
      ? rc(n.value)
        ? n.value.source
        : n.value
      : n;
const Zy = "AsyncFunction";
var p3 = (n) =>
    !!n &&
    !!n.validate &&
    !!(
      (In(n.validate) && n.validate.constructor.name === Zy) ||
      (ct(n.validate) &&
        Object.values(n.validate).find((l) => l.constructor.name === Zy))
    ),
  y3 = (n) =>
    n.mount &&
    (n.required ||
      n.min ||
      n.max ||
      n.maxLength ||
      n.minLength ||
      n.pattern ||
      n.validate);
function Ky(n, l, i) {
  const r = ie(n, i);
  if (r || lh(i)) return { error: r, name: i };
  const c = i.split(".");
  for (; c.length; ) {
    const f = c.join("."),
      d = ie(l, f),
      y = ie(n, f);
    if (d && !Array.isArray(d) && i !== f) return { name: i };
    if (y && y.type) return { name: f, error: y };
    c.pop();
  }
  return { name: i };
}
var g3 = (n, l, i, r, c) =>
    c.isOnAll
      ? !1
      : !i && c.isOnTouch
      ? !(l || n)
      : (i ? r.isOnBlur : c.isOnBlur)
      ? !n
      : (i ? r.isOnChange : c.isOnChange)
      ? n
      : !0,
  v3 = (n, l) => !wc(ie(n, l)).length && xt(n, l);
const b3 = {
  mode: Hn.onSubmit,
  reValidateMode: Hn.onChange,
  shouldFocusError: !0,
};
function x3(n = {}) {
  let l = { ...b3, ...n },
    i = {
      submitCount: 0,
      isDirty: !1,
      isLoading: In(l.defaultValues),
      isValidating: !1,
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      touchedFields: {},
      dirtyFields: {},
      validatingFields: {},
      errors: l.errors || {},
      disabled: l.disabled || !1,
    },
    r = {},
    c =
      ct(l.defaultValues) || ct(l.values)
        ? En(l.defaultValues || l.values) || {}
        : {},
    f = l.shouldUnregister ? {} : En(c),
    d = { action: !1, mount: !1, watch: !1 },
    y = {
      mount: new Set(),
      disabled: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
    },
    p,
    m = 0;
  const v = {
      isDirty: !1,
      dirtyFields: !1,
      validatingFields: !1,
      touchedFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1,
    },
    b = { values: Jf(), array: Jf(), state: Jf() },
    E = ky(l.mode),
    j = ky(l.reValidateMode),
    _ = l.criteriaMode === Hn.all,
    D = (N) => (H) => {
      clearTimeout(m), (m = setTimeout(N, H));
    },
    T = async (N) => {
      if (!l.disabled && (v.isValid || N)) {
        const H = l.resolver ? $t((await ee()).errors) : await le(r, !0);
        H !== i.isValid && b.state.next({ isValid: H });
      }
    },
    U = (N, H) => {
      !l.disabled &&
        (v.isValidating || v.validatingFields) &&
        ((N || Array.from(y.mount)).forEach((k) => {
          k && (H ? Ke(i.validatingFields, k, H) : xt(i.validatingFields, k));
        }),
        b.state.next({
          validatingFields: i.validatingFields,
          isValidating: !$t(i.validatingFields),
        }));
    },
    L = (N, H = [], k, W, J = !0, $ = !0) => {
      if (W && k && !l.disabled) {
        if (((d.action = !0), $ && Array.isArray(ie(r, N)))) {
          const ue = k(ie(r, N), W.argA, W.argB);
          J && Ke(r, N, ue);
        }
        if ($ && Array.isArray(ie(i.errors, N))) {
          const ue = k(ie(i.errors, N), W.argA, W.argB);
          J && Ke(i.errors, N, ue), v3(i.errors, N);
        }
        if (v.touchedFields && $ && Array.isArray(ie(i.touchedFields, N))) {
          const ue = k(ie(i.touchedFields, N), W.argA, W.argB);
          J && Ke(i.touchedFields, N, ue);
        }
        v.dirtyFields && (i.dirtyFields = rr(c, f)),
          b.state.next({
            name: N,
            isDirty: he(N, H),
            dirtyFields: i.dirtyFields,
            errors: i.errors,
            isValid: i.isValid,
          });
      } else Ke(f, N, H);
    },
    V = (N, H) => {
      Ke(i.errors, N, H), b.state.next({ errors: i.errors });
    },
    I = (N) => {
      (i.errors = N), b.state.next({ errors: i.errors, isValid: !1 });
    },
    Y = (N, H, k, W) => {
      const J = ie(r, N);
      if (J) {
        const $ = ie(f, N, yt(k) ? ie(c, N) : k);
        yt($) || (W && W.defaultChecked) || H
          ? Ke(f, N, H ? $ : If(J._f))
          : xe(N, $),
          d.mount && T();
      }
    },
    te = (N, H, k, W, J) => {
      let $ = !1,
        ue = !1;
      const Re = { name: N };
      if (!l.disabled) {
        const it = !!(ie(r, N) && ie(r, N)._f && ie(r, N)._f.disabled);
        if (!k || W) {
          v.isDirty &&
            ((ue = i.isDirty),
            (i.isDirty = Re.isDirty = he()),
            ($ = ue !== Re.isDirty));
          const rt = it || Ja(ie(c, N), H);
          (ue = !!(!it && ie(i.dirtyFields, N))),
            rt || it ? xt(i.dirtyFields, N) : Ke(i.dirtyFields, N, !0),
            (Re.dirtyFields = i.dirtyFields),
            ($ = $ || (v.dirtyFields && ue !== !rt));
        }
        if (k) {
          const rt = ie(i.touchedFields, N);
          rt ||
            (Ke(i.touchedFields, N, k),
            (Re.touchedFields = i.touchedFields),
            ($ = $ || (v.touchedFields && rt !== k)));
        }
        $ && J && b.state.next(Re);
      }
      return $ ? Re : {};
    },
    de = (N, H, k, W) => {
      const J = ie(i.errors, N),
        $ = v.isValid && Zn(H) && i.isValid !== H;
      if (
        (l.delayError && k
          ? ((p = D(() => V(N, k))), p(l.delayError))
          : (clearTimeout(m),
            (p = null),
            k ? Ke(i.errors, N, k) : xt(i.errors, N)),
        (k ? !Ja(J, k) : J) || !$t(W) || $)
      ) {
        const ue = {
          ...W,
          ...($ && Zn(H) ? { isValid: H } : {}),
          errors: i.errors,
          name: N,
        };
        (i = { ...i, ...ue }), b.state.next(ue);
      }
    },
    ee = async (N) => {
      U(N, !0);
      const H = await l.resolver(
        f,
        l.context,
        m3(N || y.mount, r, l.criteriaMode, l.shouldUseNativeValidation)
      );
      return U(N), H;
    },
    G = async (N) => {
      const { errors: H } = await ee(N);
      if (N)
        for (const k of N) {
          const W = ie(H, k);
          W ? Ke(i.errors, k, W) : xt(i.errors, k);
        }
      else i.errors = H;
      return H;
    },
    le = async (N, H, k = { valid: !0 }) => {
      for (const W in N) {
        const J = N[W];
        if (J) {
          const { _f: $, ...ue } = J;
          if ($) {
            const Re = y.array.has($.name),
              it = J._f && p3(J._f);
            it && v.validatingFields && U([W], !0);
            const rt = await Xy(
              J,
              y.disabled,
              f,
              _,
              l.shouldUseNativeValidation && !H,
              Re
            );
            if (
              (it && v.validatingFields && U([W]),
              rt[$.name] && ((k.valid = !1), H))
            )
              break;
            !H &&
              (ie(rt, $.name)
                ? Re
                  ? o3(i.errors, rt, $.name)
                  : Ke(i.errors, $.name, rt[$.name])
                : xt(i.errors, $.name));
          }
          !$t(ue) && (await le(ue, H, k));
        }
      }
      return k.valid;
    },
    ke = () => {
      for (const N of y.unMount) {
        const H = ie(r, N);
        H &&
          (H._f.refs ? H._f.refs.every((k) => !Wf(k)) : !Wf(H._f.ref)) &&
          Se(N);
      }
      y.unMount = new Set();
    },
    he = (N, H) => !l.disabled && (N && H && Ke(f, N, H), !Ja(Z(), c)),
    we = (N, H, k) =>
      u3(N, y, { ...(d.mount ? f : yt(H) ? c : ea(N) ? { [N]: H } : H) }, k, H),
    Le = (N) =>
      wc(ie(d.mount ? f : c, N, l.shouldUnregister ? ie(c, N, []) : [])),
    xe = (N, H, k = {}) => {
      const W = ie(r, N);
      let J = H;
      if (W) {
        const $ = W._f;
        $ &&
          (!$.disabled && Ke(f, N, Dg(H, $)),
          (J = ic($.ref) && Ft(H) ? "" : H),
          Tg($.ref)
            ? [...$.ref.options].forEach(
                (ue) => (ue.selected = J.includes(ue.value))
              )
            : $.refs
            ? _r($.ref)
              ? $.refs.length > 1
                ? $.refs.forEach(
                    (ue) =>
                      (!ue.defaultChecked || !ue.disabled) &&
                      (ue.checked = Array.isArray(J)
                        ? !!J.find((Re) => Re === ue.value)
                        : J === ue.value)
                  )
                : $.refs[0] && ($.refs[0].checked = !!J)
              : $.refs.forEach((ue) => (ue.checked = ue.value === J))
            : sh($.ref)
            ? ($.ref.value = "")
            : (($.ref.value = J),
              $.ref.type || b.values.next({ name: N, values: { ...f } })));
      }
      (k.shouldDirty || k.shouldTouch) &&
        te(N, J, k.shouldTouch, k.shouldDirty, !0),
        k.shouldValidate && A(N);
    },
    K = (N, H, k) => {
      for (const W in H) {
        const J = H[W],
          $ = `${N}.${W}`,
          ue = ie(r, $);
        (y.array.has(N) || ct(J) || (ue && !ue._f)) && !Hl(J)
          ? K($, J, k)
          : xe($, J, k);
      }
    },
    oe = (N, H, k = {}) => {
      const W = ie(r, N),
        J = y.array.has(N),
        $ = En(H);
      Ke(f, N, $),
        J
          ? (b.array.next({ name: N, values: { ...f } }),
            (v.isDirty || v.dirtyFields) &&
              k.shouldDirty &&
              b.state.next({
                name: N,
                dirtyFields: rr(c, f),
                isDirty: he(N, $),
              }))
          : W && !W._f && !Ft($)
          ? K(N, $, k)
          : xe(N, $, k),
        Fy(N, y) && b.state.next({ ...i }),
        b.values.next({ name: d.mount ? N : void 0, values: { ...f } });
    },
    me = async (N) => {
      d.mount = !0;
      const H = N.target;
      let k = H.name,
        W = !0;
      const J = ie(r, k),
        $ = () => (H.type ? If(J._f) : e3(N)),
        ue = (Re) => {
          W =
            Number.isNaN(Re) ||
            (Hl(Re) && isNaN(Re.getTime())) ||
            Ja(Re, ie(f, k, Re));
        };
      if (J) {
        let Re, it;
        const rt = $(),
          nn = N.type === qy.BLUR || N.type === qy.FOCUS_OUT,
          Nc =
            (!y3(J._f) && !l.resolver && !ie(i.errors, k) && !J._f.deps) ||
            g3(nn, ie(i.touchedFields, k), i.isSubmitted, j, E),
          Jl = Fy(k, y, nn);
        Ke(f, k, rt),
          nn
            ? (J._f.onBlur && J._f.onBlur(N), p && p(0))
            : J._f.onChange && J._f.onChange(N);
        const ii = te(k, rt, nn, !1),
          Ac = !$t(ii) || Jl;
        if (
          (!nn && b.values.next({ name: k, type: N.type, values: { ...f } }),
          Nc)
        )
          return (
            v.isValid && (l.mode === "onBlur" && nn ? T() : nn || T()),
            Ac && b.state.next({ name: k, ...(Jl ? {} : ii) })
          );
        if ((!nn && Jl && b.state.next({ ...i }), l.resolver)) {
          const { errors: ja } = await ee([k]);
          if ((ue(rt), W)) {
            const Ht = Ky(i.errors, r, k),
              Tr = Ky(ja, r, Ht.name || k);
            (Re = Tr.error), (k = Tr.name), (it = $t(ja));
          }
        } else
          U([k], !0),
            (Re = (await Xy(J, y.disabled, f, _, l.shouldUseNativeValidation))[
              k
            ]),
            U([k]),
            ue(rt),
            W && (Re ? (it = !1) : v.isValid && (it = await le(r, !0)));
        W && (J._f.deps && A(J._f.deps), de(k, it, Re, ii));
      }
    },
    He = (N, H) => {
      if (ie(i.errors, H) && N.focus) return N.focus(), 1;
    },
    A = async (N, H = {}) => {
      let k, W;
      const J = Ku(N);
      if (l.resolver) {
        const $ = await G(yt(N) ? N : J);
        (k = $t($)), (W = N ? !J.some((ue) => ie($, ue)) : k);
      } else
        N
          ? ((W = (
              await Promise.all(
                J.map(async ($) => {
                  const ue = ie(r, $);
                  return await le(ue && ue._f ? { [$]: ue } : ue);
                })
              )
            ).every(Boolean)),
            !(!W && !i.isValid) && T())
          : (W = k = await le(r));
      return (
        b.state.next({
          ...(!ea(N) || (v.isValid && k !== i.isValid) ? {} : { name: N }),
          ...(l.resolver || !N ? { isValid: k } : {}),
          errors: i.errors,
        }),
        H.shouldFocus && !W && or(r, He, N ? J : y.mount),
        W
      );
    },
    Z = (N) => {
      const H = { ...(d.mount ? f : c) };
      return yt(N) ? H : ea(N) ? ie(H, N) : N.map((k) => ie(H, k));
    },
    ge = (N, H) => ({
      invalid: !!ie((H || i).errors, N),
      isDirty: !!ie((H || i).dirtyFields, N),
      error: ie((H || i).errors, N),
      isValidating: !!ie(i.validatingFields, N),
      isTouched: !!ie((H || i).touchedFields, N),
    }),
    pe = (N) => {
      N && Ku(N).forEach((H) => xt(i.errors, H)),
        b.state.next({ errors: N ? i.errors : {} });
    },
    ae = (N, H, k) => {
      const W = (ie(r, N, { _f: {} })._f || {}).ref,
        J = ie(i.errors, N) || {},
        { ref: $, message: ue, type: Re, ...it } = J;
      Ke(i.errors, N, { ...it, ...H, ref: W }),
        b.state.next({ name: N, errors: i.errors, isValid: !1 }),
        k && k.shouldFocus && W && W.focus && W.focus();
    },
    Ce = (N, H) =>
      In(N)
        ? b.values.subscribe({ next: (k) => N(we(void 0, H), k) })
        : we(N, H, !0),
    Se = (N, H = {}) => {
      for (const k of N ? Ku(N) : y.mount)
        y.mount.delete(k),
          y.array.delete(k),
          H.keepValue || (xt(r, k), xt(f, k)),
          !H.keepError && xt(i.errors, k),
          !H.keepDirty && xt(i.dirtyFields, k),
          !H.keepTouched && xt(i.touchedFields, k),
          !H.keepIsValidating && xt(i.validatingFields, k),
          !l.shouldUnregister && !H.keepDefaultValue && xt(c, k);
      b.values.next({ values: { ...f } }),
        b.state.next({ ...i, ...(H.keepDirty ? { isDirty: he() } : {}) }),
        !H.keepIsValid && T();
    },
    wt = ({ disabled: N, name: H, field: k, fields: W }) => {
      ((Zn(N) && d.mount) || N || y.disabled.has(H)) &&
        (N ? y.disabled.add(H) : y.disabled.delete(H),
        te(H, If(k ? k._f : ie(W, H)._f), !1, !1, !0));
    },
    Me = (N, H = {}) => {
      let k = ie(r, N);
      const W = Zn(H.disabled) || Zn(l.disabled);
      return (
        Ke(r, N, {
          ...(k || {}),
          _f: {
            ...(k && k._f ? k._f : { ref: { name: N } }),
            name: N,
            mount: !0,
            ...H,
          },
        }),
        y.mount.add(N),
        k
          ? wt({
              field: k,
              disabled: Zn(H.disabled) ? H.disabled : l.disabled,
              name: N,
            })
          : Y(N, !0, H.value),
        {
          ...(W ? { disabled: H.disabled || l.disabled } : {}),
          ...(l.progressive
            ? {
                required: !!H.required,
                min: ur(H.min),
                max: ur(H.max),
                minLength: ur(H.minLength),
                maxLength: ur(H.maxLength),
                pattern: ur(H.pattern),
              }
            : {}),
          name: N,
          onChange: me,
          onBlur: me,
          ref: (J) => {
            if (J) {
              Me(N, H), (k = ie(r, N));
              const $ =
                  (yt(J.value) &&
                    J.querySelectorAll &&
                    J.querySelectorAll("input,select,textarea")[0]) ||
                  J,
                ue = h3($),
                Re = k._f.refs || [];
              if (ue ? Re.find((it) => it === $) : $ === k._f.ref) return;
              Ke(r, N, {
                _f: {
                  ...k._f,
                  ...(ue
                    ? {
                        refs: [
                          ...Re.filter(Wf),
                          $,
                          ...(Array.isArray(ie(c, N)) ? [{}] : []),
                        ],
                        ref: { type: $.type, name: N },
                      }
                    : { ref: $ }),
                },
              }),
                Y(N, !1, void 0, $);
            } else
              (k = ie(r, N, {})),
                k._f && (k._f.mount = !1),
                (l.shouldUnregister || H.shouldUnregister) &&
                  !(n3(y.array, N) && d.action) &&
                  y.unMount.add(N);
          },
        }
      );
    },
    Je = () => l.shouldFocusError && or(r, He, y.mount),
    Ge = (N) => {
      Zn(N) &&
        (b.state.next({ disabled: N }),
        or(
          r,
          (H, k) => {
            const W = ie(r, k);
            W &&
              ((H.disabled = W._f.disabled || N),
              Array.isArray(W._f.refs) &&
                W._f.refs.forEach((J) => {
                  J.disabled = W._f.disabled || N;
                }));
          },
          0,
          !1
        ));
    },
    tn = (N, H) => async (k) => {
      let W;
      k && (k.preventDefault && k.preventDefault(), k.persist && k.persist());
      let J = En(f);
      if (y.disabled.size) for (const $ of y.disabled) Ke(J, $, void 0);
      if ((b.state.next({ isSubmitting: !0 }), l.resolver)) {
        const { errors: $, values: ue } = await ee();
        (i.errors = $), (J = ue);
      } else await le(r);
      if ((xt(i.errors, "root"), $t(i.errors))) {
        b.state.next({ errors: {} });
        try {
          await N(J, k);
        } catch ($) {
          W = $;
        }
      } else H && (await H({ ...i.errors }, k)), Je(), setTimeout(Je);
      if (
        (b.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: $t(i.errors) && !W,
          submitCount: i.submitCount + 1,
          errors: i.errors,
        }),
        W)
      )
        throw W;
    },
    fl = (N, H = {}) => {
      ie(r, N) &&
        (yt(H.defaultValue)
          ? oe(N, En(ie(c, N)))
          : (oe(N, H.defaultValue), Ke(c, N, En(H.defaultValue))),
        H.keepTouched || xt(i.touchedFields, N),
        H.keepDirty ||
          (xt(i.dirtyFields, N),
          (i.isDirty = H.defaultValue ? he(N, En(ie(c, N))) : he())),
        H.keepError || (xt(i.errors, N), v.isValid && T()),
        b.state.next({ ...i }));
    },
    Tn = (N, H = {}) => {
      const k = N ? En(N) : c,
        W = En(k),
        J = $t(N),
        $ = J ? c : W;
      if ((H.keepDefaultValues || (c = k), !H.keepValues)) {
        if (H.keepDirtyValues) {
          const ue = new Set([...y.mount, ...Object.keys(rr(c, f))]);
          for (const Re of Array.from(ue))
            ie(i.dirtyFields, Re) ? Ke($, Re, ie(f, Re)) : oe(Re, ie($, Re));
        } else {
          if (ah && yt(N))
            for (const ue of y.mount) {
              const Re = ie(r, ue);
              if (Re && Re._f) {
                const it = Array.isArray(Re._f.refs)
                  ? Re._f.refs[0]
                  : Re._f.ref;
                if (ic(it)) {
                  const rt = it.closest("form");
                  if (rt) {
                    rt.reset();
                    break;
                  }
                }
              }
            }
          r = {};
        }
        (f = l.shouldUnregister ? (H.keepDefaultValues ? En(c) : {}) : En($)),
          b.array.next({ values: { ...$ } }),
          b.values.next({ values: { ...$ } });
      }
      (y = {
        mount: H.keepDirtyValues ? y.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        disabled: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: "",
      }),
        (d.mount = !v.isValid || !!H.keepIsValid || !!H.keepDirtyValues),
        (d.watch = !!l.shouldUnregister),
        b.state.next({
          submitCount: H.keepSubmitCount ? i.submitCount : 0,
          isDirty: J
            ? !1
            : H.keepDirty
            ? i.isDirty
            : !!(H.keepDefaultValues && !Ja(N, c)),
          isSubmitted: H.keepIsSubmitted ? i.isSubmitted : !1,
          dirtyFields: J
            ? {}
            : H.keepDirtyValues
            ? H.keepDefaultValues && f
              ? rr(c, f)
              : i.dirtyFields
            : H.keepDefaultValues && N
            ? rr(c, N)
            : H.keepDirty
            ? i.dirtyFields
            : {},
          touchedFields: H.keepTouched ? i.touchedFields : {},
          errors: H.keepErrors ? i.errors : {},
          isSubmitSuccessful: H.keepIsSubmitSuccessful
            ? i.isSubmitSuccessful
            : !1,
          isSubmitting: !1,
        });
    },
    dl = (N, H) => Tn(In(N) ? N(f) : N, H);
  return {
    control: {
      register: Me,
      unregister: Se,
      getFieldState: ge,
      handleSubmit: tn,
      setError: ae,
      _executeSchema: ee,
      _getWatch: we,
      _getDirty: he,
      _updateValid: T,
      _removeUnmounted: ke,
      _updateFieldArray: L,
      _updateDisabledField: wt,
      _getFieldArray: Le,
      _reset: Tn,
      _resetDefaultValues: () =>
        In(l.defaultValues) &&
        l.defaultValues().then((N) => {
          dl(N, l.resetOptions), b.state.next({ isLoading: !1 });
        }),
      _updateFormState: (N) => {
        i = { ...i, ...N };
      },
      _disableForm: Ge,
      _subjects: b,
      _proxyFormState: v,
      _setErrors: I,
      get _fields() {
        return r;
      },
      get _formValues() {
        return f;
      },
      get _state() {
        return d;
      },
      set _state(N) {
        d = N;
      },
      get _defaultValues() {
        return c;
      },
      get _names() {
        return y;
      },
      set _names(N) {
        y = N;
      },
      get _formState() {
        return i;
      },
      set _formState(N) {
        i = N;
      },
      get _options() {
        return l;
      },
      set _options(N) {
        l = { ...l, ...N };
      },
    },
    trigger: A,
    register: Me,
    handleSubmit: tn,
    watch: Ce,
    setValue: oe,
    getValues: Z,
    reset: dl,
    resetField: fl,
    clearErrors: pe,
    unregister: Se,
    setError: ae,
    setFocus: (N, H = {}) => {
      const k = ie(r, N),
        W = k && k._f;
      if (W) {
        const J = W.refs ? W.refs[0] : W.ref;
        J.focus && (J.focus(), H.shouldSelect && In(J.select) && J.select());
      }
    },
    getFieldState: ge,
  };
}
function qn(n = {}) {
  const l = pt.useRef(void 0),
    i = pt.useRef(void 0),
    [r, c] = pt.useState({
      isDirty: !1,
      isValidating: !1,
      isLoading: In(n.defaultValues),
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      validatingFields: {},
      errors: n.errors || {},
      disabled: n.disabled || !1,
      defaultValues: In(n.defaultValues) ? void 0 : n.defaultValues,
    });
  l.current || (l.current = { ...x3(n), formState: r });
  const f = l.current.control;
  return (
    (f._options = n),
    r3({
      subject: f._subjects.state,
      next: (d) => {
        i3(d, f._proxyFormState, f._updateFormState) && c({ ...f._formState });
      },
    }),
    pt.useEffect(() => f._disableForm(n.disabled), [f, n.disabled]),
    pt.useEffect(() => {
      if (f._proxyFormState.isDirty) {
        const d = f._getDirty();
        d !== r.isDirty && f._subjects.state.next({ isDirty: d });
      }
    }, [f, r.isDirty]),
    pt.useEffect(() => {
      n.values && !Ja(n.values, i.current)
        ? (f._reset(n.values, f._options.resetOptions),
          (i.current = n.values),
          c((d) => ({ ...d })))
        : f._resetDefaultValues();
    }, [n.values, f]),
    pt.useEffect(() => {
      n.errors && f._setErrors(n.errors);
    }, [n.errors, f]),
    pt.useEffect(() => {
      f._state.mount || (f._updateValid(), (f._state.mount = !0)),
        f._state.watch &&
          ((f._state.watch = !1), f._subjects.state.next({ ...f._formState })),
        f._removeUnmounted();
    }),
    pt.useEffect(() => {
      n.shouldUnregister && f._subjects.values.next({ values: f._getWatch() });
    }, [n.shouldUnregister, f]),
    (l.current.formState = s3(r, f)),
    l.current
  );
}
const S3 = () => {
    const { isLogged: n, currUser: l, setCurrUser: i } = Pt(),
      { showToastMsg: r } = Qt(),
      { handleErrAPI: c } = en(),
      f = gt(),
      {
        register: d,
        formState: { errors: y },
        handleSubmit: p,
        reset: m,
      } = qn({ mode: "onChange" }),
      { mutate: v, isPending: b } = Nt({
        mutationFn: (U) => $4(U),
        onSuccess: () => {
          m(),
            r("You have successfully subscribed to out newsLetter", "SUCCESS");
        },
        onError: (U) => {
          var L, V;
          r(
            ((V =
              (L = U == null ? void 0 : U.response) == null
                ? void 0
                : L.data) == null
              ? void 0
              : V.msg) || U.message,
            "ERROR"
          );
        },
      }),
      E = p((U) => {
        v(U.email);
      }),
      { mutate: j, isPending: _ } = Nt({
        mutationFn: ({ type: U }) => K4({ type: U }),
        onSuccess: (U) => {
          var L;
          i({ user: U == null ? void 0 : U.user }),
            r(
              `You have ${
                (L = U == null ? void 0 : U.user) != null &&
                L.hasSubscribedToNewsletter
                  ? "subscribed"
                  : "unsubscribed"
              } to our newsletter successfully`,
              "SUCCESS"
            );
        },
        onError: (U) => {
          var L, V, I;
          ((L = U == null ? void 0 : U.response) == null
            ? void 0
            : L.status) === 401
            ? c({ err: U })
            : r(
                ((I =
                  (V = U == null ? void 0 : U.response) == null
                    ? void 0
                    : V.data) == null
                  ? void 0
                  : I.msg) || U.message,
                "ERROR"
              );
        },
      });
    return {
      isLogged: n,
      toggleNewsLetter: () => {
        j({
          type:
            l != null && l.hasSubscribedToNewsletter
              ? "unsubscribe"
              : "subscribe",
        });
      },
      isPendingLogged: _,
      register: d,
      errors: y,
      currUser: l,
      submitSubscribeNonLoggedUser: E,
      isPendingNonLogged: b,
      handleRedirection: () =>
        f("/newsletter/notice-unsubscribe-with-retry?success=false", {
          state: { from: "/newsletter/verify-unsubscribe" },
        }),
    };
  },
  kn = ({
    isDisabled: n,
    label: l,
    type: i = "button",
    handleClick: r,
    styleTxt: c,
    isPending: f,
  }) =>
    f
      ? h.jsx(Sc, {})
      : h.jsxs("button", {
          onClick: r,
          type: i,
          disabled: n,
          className: "btn_container",
          children: [
            h.jsxs("div", {
              className: "btn_container__content",
              children: [
                h.jsx("div", {
                  className: "content__btn",
                  children: h.jsx("span", {
                    className: `relative z-40 ${c ?? "btn__txt"}`,
                    children: l ?? "BUTTON",
                  }),
                }),
                h.jsx("span", { className: "btn__ref_1" }),
                h.jsx("span", { className: "btn__ref_2" }),
              ],
            }),
            h.jsx("span", { className: "btn_container__shadow" }),
            h.jsx(HS, { className: "btn_container__svg_1" }),
            h.jsx(wS, { className: "btn_container__svg_2" }),
            h.jsx(Kx, { className: "btn_container__svg_3" }),
            h.jsx(vS, { className: "btn_container__svg_4" }),
            h.jsx(dS, { className: "btn_container__svg_5" }),
            h.jsx(AS, { className: "btn_container__svg_6" }),
          ],
        }),
  w3 = ({ isPending: n, currUser: l, submitNewsLetter: i }) =>
    h.jsx("div", {
      className: "max-w-[200px] md:max-w-[225px] flex justify-start",
      children: h.jsx(kn, {
        label:
          l != null && l.hasSubscribedToNewsletter
            ? "Unsubscribe"
            : "Subscribe",
        type: "button",
        handleClick: i,
        isPending: n,
      }),
    }),
  cc = /^[A-Z][a-zA-ZÀ-ÿ`'-\d\s]*$/,
  Mg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{8,}$/,
  rh =
    /^(?![.-])(?!.*[.-]$)(?!.*\.\.)(?!.*@.*@)[A-Za-zÀ-ÿ0-9._%+-]+@[A-Za-zÀ-ÿ0-9]+\.[A-Za-z]{2,}$/,
  Rr = /^[a-f0-9]{24}$/,
  Ec = /^[a-f0-9]{128}$/,
  E3 = /^[A-Za-zÀ-ÿ\d\s]{2,50}$/,
  _3 = /^[A-Za-zÀ-ÿ\d\s-]{2,50}$/,
  R3 = /^[A-Za-zÀ-ÿ\d\s-]{2,50}$/,
  j3 = /^[A-Za-zÀ-ÿ0-9\s,.#-]{5,100}$/,
  N3 = /^\d{5}(-\d{4})?$/,
  Ug = /^\+?\d{1,4}[\s-]?\(?\d{2,3}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}$/,
  A3 = /^[A-Za-zÀ-ÿ0-9\s,&`'-]{2,50}$/,
  T3 =
    /^(https?:\/\/)?(www\.)?[A-Za-z0-9-]+(\.[A-Za-z]{2,})(\/[A-Za-z0-9-/]*)?(\?[A-Za-z0-9=&]*)?(#[A-Za-z0-9-_]*)?$/,
  Td = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
  $y = /^\d+(\.\d{1,2})?$/,
  C3 = /^\d+$/,
  O3 = ({
    isPending: n,
    currUser: l,
    submitNewsLetter: i,
    register: r,
    errors: c,
  }) => {
    var f, d;
    return h.jsx("div", {
      className: "w-full flex flex-col gap-5",
      children: h.jsxs("form", {
        className:
          "grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] sm:grid-cols-2 gap-5 sm:gap-x-10 items-center",
        children: [
          h.jsxs("div", {
            className: "w-full flex flex-col gap-3",
            children: [
              h.jsx("input", {
                type: "email",
                className: "input__base txt__01",
                placeholder: "Your email...",
                ...r("email", {
                  required: "Email is required",
                  pattern: {
                    value: rh,
                    message: "Enter a valid email to receive great discounts ",
                  },
                }),
              }),
              ((f = c == null ? void 0 : c.email) == null
                ? void 0
                : f.message) &&
                h.jsx("span", {
                  className: "txt__00 text-red-600",
                  children:
                    (d = c == null ? void 0 : c.email) == null
                      ? void 0
                      : d.message,
                }),
            ],
          }),
          h.jsx("div", {
            className:
              "w-full max-w-[200px] md:max-w-[225px] flex justify-start items-start",
            children: h.jsx(kn, {
              label:
                l != null && l.hasSubscribedToNewsletter
                  ? "Unsubscribe"
                  : "Subscribe",
              type: "submit",
              handleClick: i,
              isPending: n,
            }),
          }),
        ],
      }),
    });
  },
  D3 = () => {
    const {
      isLogged: n,
      toggleNewsLetter: l,
      isPendingLogged: i,
      register: r,
      errors: c,
      currUser: f,
      submitSubscribeNonLoggedUser: d,
      isPendingNonLogged: y,
      handleRedirection: p,
    } = S3();
    return h.jsxs("div", {
      className: "flex w-full flex-col items-start gap-5",
      children: [
        h.jsxs("div", {
          className: `w-full grid items-center gap-4  ${
            n
              ? "grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:grid-cols-2"
              : " grid-cols-1 lg:grid-cols-[200px_1fr]"
          }`,
          children: [
            h.jsx("div", {
              className: "w-full flex flex-col self-start",
              children: h.jsx("span", {
                className: "txt__02",
                children: "Newsletter",
              }),
            }),
            n
              ? h.jsx(w3, { currUser: f, submitNewsLetter: l, isPending: i })
              : h.jsx(O3, {
                  register: r,
                  errors: c,
                  submitNewsLetter: d,
                  currUser: f,
                  isPending: y,
                }),
          ],
        }),
        !n &&
          h.jsx("div", {
            className: "w-full flex justify-start",
            children: h.jsx("span", {
              onClick: p,
              className:
                "txt__01 el__after_below cursor-pointer transition-all duration-300 hover:text-orange-500",
              children: "Send link to unsubscribe",
            }),
          }),
        h.jsx("div", {
          className: "w-full flex",
          children: h.jsx("span", {
            className: "txt__00",
            children:
              "Subscribe to our newsletter to receive the latest updates and get a chance to win a discount coupon.",
          }),
        }),
      ],
    });
  },
  M3 = [
    { id: re(), label: "About", path: "/" },
    { id: re(), label: "Privacy Policy", path: "/" },
    { id: re(), label: "Terms & Conditions", path: "/" },
    { id: re(), label: "Contact", path: "/" },
  ],
  U3 = [
    {
      id: re(),
      label: "Source Code",
      svg: xS,
      url: "https://github.com/AlexanderMatveev2908/FOOD_APP",
    },
    {
      id: re(),
      label: "Hotels App",
      svg: _S,
      url: "https://mern-booking-app-0w8v.onrender.com/",
    },
  ],
  z3 = () =>
    h.jsxs("div", {
      className:
        "pad__page py-5 border-t-2 border-orange-500 w-full flex flex-col items-center gap-y-5",
      children: [
        h.jsxs("div", {
          className: "grid w-full gap-y-5 ",
          children: [
            h.jsx(cl, {
              to: "/",
              className: "txt__05 text-orange-500",
              children: "LOGO",
            }),
            h.jsx("div", {
              className:
                "w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4",
              children: M3.map((n) =>
                h.jsx(
                  "div",
                  {
                    className: "w-full flex flex-col items-start",
                    children: h.jsx(cl, {
                      to: n.path,
                      className:
                        "el__after_below txt__02 transition-all duration-300 hover:text-orange-500 opacity-50",
                      children: n.label,
                    }),
                  },
                  n.id
                )
              ),
            }),
          ],
        }),
        h.jsx("ul", {
          className:
            "w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[200px_1fr] justify-items-start gap-y-5",
          children: U3.map((n) =>
            h.jsx(
              "li",
              {
                children: h.jsxs("a", {
                  href: n.url,
                  className:
                    "grid max-w-fit grid-cols-[40px_1fr] items-end transition-all duration-300 el__after_below hover:text-orange-500",
                  children: [
                    h.jsx(n.svg, { className: "w-[30px] h-[30px] " }),
                    h.jsx("span", { className: "txt__01", children: n.label }),
                  ],
                }),
              },
              n.id
            )
          ),
        }),
        h.jsx(D3, {}),
        h.jsx("div", {
          className: "w-full flex justify-center py-5",
          children: h.jsxs("span", {
            className: "txt__01",
            children: [
              "© ",
              new Date().getFullYear(),
              " MERN__EAT. No rights reserved just making it for fun ✌🏼",
            ],
          }),
        }),
      ],
    }),
  mr = ({
    isDisabled: n,
    label: l,
    type: i = "button",
    handleClick: r,
    styleTxt: c,
    styleBtn: f,
    isPending: d,
  }) =>
    d
      ? h.jsx(Sc, {})
      : h.jsxs("button", {
          disabled: n,
          onClick: r,
          type: i,
          className: "btn__with_shadow_container group",
          children: [
            h.jsx("div", {
              className: `${
                f ?? "group-hover:text-orange-500"
              } btn__with_shadow_container__content`,
              children: h.jsx("span", {
                className: `${c} content__txt`,
                children: l,
              }),
            }),
            h.jsx("span", {
              className: `${
                f ?? "group-hover:text-orange-500"
              } btn__with_shadow_container__shadow`,
            }),
          ],
        }),
  L3 = () => {
    const { setPopup: n, popup: l } = C1(),
      {
        txt: i,
        greenLabel: r,
        redLabel: c,
        confirmAction: f,
        isPending: d,
      } = l ?? {};
    return h.jsx("div", {
      className: `${
        l ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full bg-black/50 popup__i flex justify-center items-center`,
      children: h.jsxs("div", {
        className:
          "w-[75vw] max-w-[750px] h-1/2 bg-[#111] border-[3px] border-orange-500 rounded-2xl grid grid-cols-1 p-5 content-start relative",
        children: [
          h.jsx("div", {
            onClick: () => n(null),
            className:
              "w-fit h-fit justify-self-end flex justify-end -mt-3 -mr-2",
            children: h.jsx(Xd, {
              className:
                "w-[35px] h-[35px] sm:h-[40px] sm:w-[40px] text-red-600 btn__pseudo hover:scale-120",
            }),
          }),
          h.jsx("div", {
            className: "w-full h-fit flex justify-center self-start mt-[5%]",
            children: h.jsxs("span", {
              className: "txt__03",
              children: ["Are you sure you want to ", i],
            }),
          }),
          h.jsxs("div", {
            className:
              "w-full h-fit grid grid-cols-1 sm:grid-cols-2 absolute bottom-[20%] left-1/2 -translate-x-1/2 justify-items-center gap-5",
            children: [
              h.jsx("div", {
                className: "w-full max-w-[250px] flex justify-center",
                children: h.jsx(mr, {
                  label: r ?? "I change idea",
                  styleTxt: "txt__02 text-green-600",
                  styleBtn: "border-green-600",
                  handleClick: () => n(null),
                  isDisabled: d,
                }),
              }),
              h.jsx("div", {
                className: "w-full max-w-[250px] flex justify-center",
                children: h.jsx(mr, {
                  label: c,
                  styleTxt: "txt__02 text-red-600",
                  styleBtn: "border-red-600",
                  handleClick: f,
                  isPending: d,
                }),
              }),
            ],
          }),
        ],
      }),
    });
  },
  H3 = ({ children: n }) => {
    const [l, i] = w.useState(!1),
      r = st();
    return h.jsxs("div", {
      className: "w-full min-h-screen flex flex-col items-center",
      children: [
        h.jsx(B4, { setSideOpen: i, sideOpen: l }),
        h.jsx(F4, { sideOpen: l, setSideOpen: i }),
        h.jsx(L3, {}),
        h.jsx(ZS, {}),
        r.pathname === "/" && h.jsx(Z4, {}),
        h.jsx("div", {
          className:
            "flex flex-col items-center w-full pad__page py-5 pb-[150px] sm:pb-[250px] lg:pb-[350px]",
          children: n,
        }),
        h.jsx(z3, {}),
      ],
    });
  },
  B3 = () => h.jsx(H3, { children: h.jsx(Sr, {}) }),
  $l = (n, l) => n && l.test(n),
  $s = (n, l) => n.includes(l ?? ""),
  V3 = () => {
    var d;
    It();
    const [n] = Ra(),
      l = st(),
      i = n.get("type"),
      r = (d = l == null ? void 0 : l.state) == null ? void 0 : d.from;
    return {
      canStay:
        $s(
          [
            "verify-account",
            "recover-pwd",
            "sentEmailUnsubscribe",
            "change-email",
            "change-pwd",
          ],
          i ?? ""
        ) &&
        $s(
          [
            "/auth/register",
            "/auth/login",
            "/newsletter/notice-unsubscribe-with-retry",
            "/user/manage-account",
          ],
          r
        ),
      txt:
        i === "verify-account"
          ? "to verify your account"
          : i === "recover-pwd"
          ? "with a link to recover your password"
          : i === "change-email"
          ? "to verify your new email"
          : "with a link to unsubscribe from our newsletter",
    };
  },
  q3 = () => {
    const { canStay: n, txt: l } = V3();
    return n
      ? h.jsxs("div", {
          className: "w-full flex flex-col items-center gap-y-14",
          children: [
            h.jsx("div", {
              className: "w-full flex justify-center",
              children: h.jsx("span", {
                className: "txt__04 leading-10 lg:leading-16",
                children: `We've sent you an email ${l}! If you don't see it, check your
          spam folder, it might be partying there`,
              }),
            }),
            h.jsx("div", {
              className: "w-full flex justify-center items-center",
              children: h.jsx(hc, {
                className:
                  "w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] md:w-[400px] md:h-[400px] text-green-600",
              }),
            }),
          ],
        })
      : h.jsx(An, { to: "/", replace: !0 });
  },
  k3 = async () => {
    const { data: n } = await Pe.get("/user/info-basic");
    return n;
  },
  F3 = async () => {
    const { data: n } = await Pe.get("/user/profile-details");
    return n;
  },
  Q3 = async (n) => {
    const { data: l } = await Pe.patch("/user/profile-details", n);
    return l;
  },
  P3 = async (n) => {
    const { data: l } = await Pe.post("/user/manage-account", { password: n });
    return l;
  },
  Y3 = async (n) => {
    const { data: l } = await Pe.patch("/user/change-email", { ...n });
    return l;
  },
  G3 = async (n) => {
    const { data: l } = await Pe.post("/user/verify-new-email", n);
    return l;
  },
  X3 = async (n) => {
    const { data: l } = await Pe.patch("/user/change-old-pwd", n);
    return l;
  },
  Z3 = async (n) => {
    const { data: l } = await Pe.delete("/user/delete-account", {
      data: { manageAccountToken: n },
    });
    return l;
  },
  K3 = () => {
    const {
        setCurrUser: n,
        isLogged: l,
        setUserLogged: i,
        logoutUser: r,
      } = Pt(),
      { handleErrAPI: c } = en(),
      f = w.useRef(0),
      { mutate: d } = Nt({
        mutationFn: u4,
        onSuccess: (b) => {
          i(b == null ? void 0 : b.accessToken);
        },
        onError: () => {
          l && r();
        },
      }),
      {
        data: y,
        isSuccess: p,
        isError: m,
        error: v,
      } = mc({ queryKey: ["currUser", l], queryFn: k3, enabled: l });
    w.useEffect(() => {
      (() => {
        if (m) c({ err: v });
        else if (p) {
          const { user: E = {} } = y ?? {};
          n({ user: E });
        }
      })();
    }, [m, p, c, v, n, y, r]),
      w.useEffect(() => {
        !l && (f == null ? void 0 : f.current) < 3 && ((f.current += 1), d());
      }, [l, d]);
  },
  $3 = () => h.jsx(Sr, {}),
  jr = ({ register: n, errors: l, field: i, custom: r }) => {
    var c, f;
    return h.jsxs("label", {
      className: "grid grid-cols-1 gap-y-3",
      children: [
        h.jsx("span", { className: "txt__02", children: i.label }),
        h.jsxs("div", {
          className: "w-full relative",
          children: [
            h.jsx("input", {
              type: i.type,
              className: "input__auth_field ",
              placeholder: `Your ${i.label}...`,
              ...n(i.field, {
                required: `${i.label} is required`,
                validate: (d) =>
                  !d || !i.reg.test(d)
                    ? i.msg
                    : r
                    ? r == null
                      ? void 0
                      : r(d)
                    : !0,
              }),
            }),
            h.jsx(i.svg, { className: "svg__auth_field" }),
          ],
        }),
        ((c = l == null ? void 0 : l[i.field]) == null ? void 0 : c.message) &&
          h.jsx("span", {
            className: "txt__00 text-red-600",
            children:
              (f = l == null ? void 0 : l[i.field]) == null
                ? void 0
                : f.message,
          }),
      ],
    });
  },
  J3 = () => {
    const { setUserLogged: n } = Pt(),
      { showToastMsg: l } = Qt(),
      { handleErrAPI: i } = en();
    It();
    const r = gt(),
      {
        register: c,
        handleSubmit: f,
        reset: d,
        formState: { errors: y },
        setFocus: p,
      } = qn({ mode: "onSubmit" });
    w.useEffect(() => {
      p("email");
    }, [p]);
    const { mutate: m, isPending: v } = Nt({
        mutationFn: (E) => n4(E),
        onSuccess: (E) => {
          d(),
            n(E.accessToken),
            l("User logged in successfully", "SUCCESS"),
            r("/");
        },
        onError: (E) => {
          var j, _, D;
          [401, 403].includes(
            (j = E == null ? void 0 : E.response) == null ? void 0 : j.status
          )
            ? l(
                (D =
                  (_ = E == null ? void 0 : E.response) == null
                    ? void 0
                    : _.data) == null
                  ? void 0
                  : D.msg,
                "ERROR"
              )
            : i({ err: E });
        },
      }),
      b = f((E) => {
        m({ ...E });
      });
    return { register: c, errors: y, handleLoginUser: b, isPending: v };
  },
  W3 = [
    { id: re(), label: "Forgot password", svg: w1, type: "login" },
    { id: re(), label: "Verify account", svg: R1, type: "register" },
  ],
  I3 = [
    { id: re(), label: "Create account", svg: N1, type: "login" },
    { id: re(), label: "Login in your account", svg: E1, type: "register" },
  ],
  zg = ({ type: n }) => {
    const l = gt(),
      i = st();
    return h.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2",
      children: [
        h.jsx("button", {
          type: "button",
          onClick: () =>
            l(
              `/auth/send-email?type=${
                n === "login" ? "recover-pwd" : "verify-account"
              }`,
              { state: { from: i.pathname } }
            ),
          className:
            "w-full flex items-center gap-3 group el__after_below cursor-pointer",
          children: W3.map(
            (r) =>
              r.type === n &&
              h.jsxs(
                w.Fragment,
                {
                  children: [
                    h.jsx(r.svg, { className: "svg__switch_form" }),
                    " ",
                    h.jsx("span", {
                      className:
                        "transition-all duration-300 group-hover:text-orange-500 txt__00",
                      children: r.label,
                    }),
                  ],
                },
                r.id
              )
          ),
        }),
        h.jsx(cl, {
          to: n === "login" ? "/auth/register" : "/auth/login",
          className:
            "w-full flex items-center gap-3 group el__after_below sm:justify-self-end",
          children: I3.map(
            (r) =>
              r.type === n &&
              h.jsxs(
                w.Fragment,
                {
                  children: [
                    h.jsx(r.svg, { className: "svg__switch_form" }),
                    h.jsx("span", {
                      className:
                        "transition-all duration-300 group-hover:text-orange-500 txt__00",
                      children: r.label,
                    }),
                  ],
                },
                r.id
              )
          ),
        }),
      ],
    });
  },
  ol = ({
    register: n,
    errors: l,
    isVisible: i,
    handleChangeVisibility: r,
    field: c,
    custom: f,
  }) => {
    var y, p;
    const d = {
      required: "Password is required",
      pattern: { value: c.reg, message: c.msg },
      validate: (m) => (f ? f(m) : !0),
    };
    return h.jsxs("label", {
      className: "grid grid-cols-1 gap-y-3 relative",
      children: [
        h.jsx("span", { className: "txt__02", children: c.label }),
        h.jsxs("div", {
          className: "w-full relative",
          children: [
            h.jsx("input", {
              type: i ? "text" : "password",
              className: "input__auth_field ",
              placeholder: c.place,
              ...n(c.field, d),
            }),
            h.jsx("span", {
              onClick: () => r(),
              className: "w-fit flex justify-center items-center",
              children: i
                ? h.jsx(yS, { className: "svg__auth_field" })
                : h.jsx(mS, { className: "svg__auth_field" }),
            }),
          ],
        }),
        ((y = l == null ? void 0 : l[c.field]) == null ? void 0 : y.message) &&
          h.jsx("span", {
            className: "txt__00 text-red-600",
            children:
              (p = l == null ? void 0 : l[c.field]) == null
                ? void 0
                : p.message,
          }),
      ],
    });
  },
  Nr = {
    id: re(),
    field: "email",
    label: "Email",
    reg: rh,
    msg: "Email must follow this pattern /^(?![.-])(?!.*[.-]$)(?!.*\\.\\.)(?!.*@.*@)[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\\.[A-Za-z]{2,}$/ 🧐",
    svg: MS,
    type: "email",
  },
  eE = { ...Nr, label: "New Email", field: "newEmail" },
  tE = [
    {
      id: re(),
      field: "firstName",
      label: "First Name",
      reg: cc,
      msg: "A First Name must start with uppercase letter, and can include only letters and apostrophe.",
      svg: hy,
      type: "text",
    },
    {
      id: re(),
      field: "lastName",
      label: "Last Name",
      reg: cc,
      msg: "A Last Name must start with uppercase letter, and can include only letters and apostrophe",
      svg: hy,
      type: "text",
    },
  ],
  uh = {
    id: re(),
    field: "password",
    label: "Password",
    place: "Your password",
    msg: "Invalid password",
    reg: /.*/,
  },
  ch = {
    ...uh,
    reg: Mg,
    msg: "Password must follow this pattern /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,}$/ 🧐",
  },
  nE = {
    ...ch,
    label: "New Password",
    place: "Your new password",
    field: "newPassword",
  },
  oh = {
    id: re(),
    field: "confirmPassword",
    label: "Confirm Password",
    place: "Confirm your password",
    msg: "",
    reg: /.*/,
  },
  aE = () => {
    const { register: n, errors: l, isPending: i, handleLoginUser: r } = J3(),
      [c, f] = w.useState(!1);
    return h.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-10 items-center",
      children: [
        h.jsx("div", {
          className: "w-full flex justify-center",
          children: h.jsx("span", { className: "txt__04", children: "Login" }),
        }),
        h.jsx("div", {
          className:
            "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
          children: h.jsx("div", {
            className: "w-full grid grid-cols-1",
            children: h.jsxs("form", {
              onSubmit: r,
              className: "grid grid-cols-1 w-full gap-y-8",
              children: [
                h.jsx(jr, { register: n, errors: l, field: Nr }),
                h.jsx(ol, {
                  register: n,
                  errors: l,
                  isVisible: c,
                  handleChangeVisibility: () => f(!c),
                  field: uh,
                }),
                h.jsx("div", {
                  className:
                    "w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center",
                  children: h.jsx(kn, {
                    styleTxt: "txt__02",
                    label: "Login",
                    type: "submit",
                    isPending: i,
                  }),
                }),
                h.jsx("div", {
                  className: "w-full",
                  children: h.jsx(zg, { type: "login" }),
                }),
              ],
            }),
          }),
        }),
      ],
    });
  },
  lE = ({ register: n, errors: l, valTerms: i }) => {
    var y, p;
    const r = !!(
        (y = l == null ? void 0 : l.acceptedTerms) != null && y.message
      ),
      c = w.useRef(null),
      [f, d] = w.useState(!1);
    return (
      w.useEffect(() => {
        const m = (v) => {
          var b;
          if (
            !(!c.current || i === void 0) &&
            (b = c.current) != null &&
            b.contains(v.target)
          ) {
            const E = document.getElementById("squareCheck");
            E == null || E.classList.remove("register__checkbox"),
              requestAnimationFrame(() => {
                E == null || E.classList.add("register__checkbox");
              });
          }
        };
        return (
          document.addEventListener("click", m),
          () => {
            document.removeEventListener("click", m);
          }
        );
      }, [i, f]),
      h.jsxs("div", {
        className: "w-full grid grid-cols-1 gap-2 ",
        children: [
          h.jsxs("label", {
            ref: c,
            className:
              "w-full flex gap-10 max-w-fit justify-start relative py-2 cursor-pointer items-center",
            children: [
              h.jsx("input", {
                type: "checkbox",
                className: "opacity-0",
                ...n("acceptedTerms", {
                  required: "You must accept terms and conditions",
                }),
              }),
              h.jsx("span", {
                id: "squareCheck",
                onClick: () => d(!0),
                className: `absolute top-1 left-0 border-[3px] rounded-xl w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] cursor-pointer ${
                  i
                    ? "border-green-600"
                    : i === void 0 || !f
                    ? "border-white"
                    : "border-red-600"
                }`,
              }),
              h.jsx("span", {
                className: `absolute delay-75 -top-2 sm:-top-3 left-4 w-3 sm:w-4 h-8 sm:h-10 border-r-4 border-b-4 rotate-45 border-green-600 transition-all duration-300 cursor-pointer ${
                  i ? "scale-100" : "scale-0"
                }`,
              }),
              h.jsx("span", {
                className: `txt__01 transition-all duration-300 ${
                  i
                    ? "hover:text-green-600"
                    : i === void 0
                    ? "border-white"
                    : "hover:text-red-600"
                }`,
                children: "I Accept Terms And Conditions",
              }),
            ],
          }),
          r &&
            h.jsx("span", {
              className: "txt__00 text-red-600",
              children:
                (p = l == null ? void 0 : l.acceptedTerms) == null
                  ? void 0
                  : p.message,
            }),
        ],
      })
    );
  },
  fh = ({
    isConfirmPwdVisible: n,
    setIsConfirmPwdVisible: l,
    isPwdVisible: i,
    setIsPwdVisible: r,
  }) => ({
    handleChangePwdVisibility: () => {
      n ? (l(!1), r(!0)) : r(!i);
    },
    handleChangeConfirmPwdVisibility: () => {
      i ? (r(!1), l(!0)) : l(!n);
    },
  }),
  sE = () => {
    const [n, l] = w.useState(!1),
      [i, r] = w.useState(!1);
    It();
    const c = gt(),
      f = st(),
      { handleChangePwdVisibility: d, handleChangeConfirmPwdVisibility: y } =
        fh({
          isPwdVisible: n,
          setIsPwdVisible: l,
          isConfirmPwdVisible: i,
          setIsConfirmPwdVisible: r,
        }),
      { showToastMsg: p } = Qt(),
      {
        register: m,
        handleSubmit: v,
        reset: b,
        watch: E,
        trigger: j,
        formState: { errors: _ },
        setFocus: D,
      } = qn({ mode: "onChange" });
    w.useEffect(() => {
      D("firstName");
    }, [D]);
    const T = E("password");
    w.useEffect(() => {
      T && j("confirmPassword");
    }, [T, j]);
    const { mutate: U, isPending: L } = Nt({
        mutationFn: (te) => t4(te),
        onSuccess: () => {
          b(),
            p("Account created successfully", "SUCCESS"),
            c("/notice-email?type=verify-account", {
              state: { from: f.pathname },
            });
        },
        onError: (te) => {
          var de, ee;
          p(
            ((ee =
              (de = te == null ? void 0 : te.response) == null
                ? void 0
                : de.data) == null
              ? void 0
              : ee.msg) || (te == null ? void 0 : te.message),
            "ERROR"
          );
        },
      }),
      V = v((te) => {
        const { confirmPassword: de, ...ee } = te;
        U(ee);
      });
    return {
      register: m,
      errors: _,
      watch: E,
      trigger: j,
      isPwdVisible: n,
      isConfirmPwdVisible: i,
      handleChangePwdVisibility: d,
      handleChangeConfirmPwdVisibility: y,
      isPending: L,
      handleRegister: V,
      customPwd: (te) =>
        te === E("email") ? "Password must be different from email" : !0,
      customConfirmPwd: (te) =>
        te !== E("password") ? "Passwords do not match 🤔" : !0,
    };
  },
  dh = ({ watch: n }) => {
    const l = n("password"),
      i = (l == null ? void 0 : l.length) >= 8;
    return h.jsxs("div", {
      className:
        "w-full col-span-2 grid grid-cols-[35px_70px_1fr] items-center",
      children: [
        h.jsx("span", {
          children: i
            ? h.jsx(hc, { className: "w-[30px] h-[30px] text-green-600" })
            : h.jsx(Gd, { className: "w-[30px] h-[30px] text-red-600" }),
        }),
        h.jsx("span", {
          className: `txt__00 ml-2 px-3 py-1 border-2 rounded-xl ${
            i
              ? "text-green-600 border-green-600"
              : "text-red-600 border-red-600"
          }`,
          children: h.jsx(VS, {}),
        }),
        h.jsxs("span", {
          className: `txt__01 ml-4 ${i ? "text-green-600" : "text-red-600"}`,
          children: [(l == null ? void 0 : l.length) ?? 0, " / 8"],
        }),
      ],
    });
  },
  iE = /(?=.*[A-Z])/,
  rE = /[a-z]+/,
  uE = /(?=.*\d)/,
  cE = /(?=.*[\W_])/,
  oE = [
    { id: re(), msg: "Uppercase letters", reg: iE, label: "ABC..." },
    { id: re(), msg: "Lowercase letters", reg: rE, label: "abc..." },
    { id: re(), msg: "Numbers", reg: uE, label: "123..." },
    { id: re(), msg: "Symbols", reg: cE, label: "!@#$..." },
  ],
  hh = ({ watch: n }) =>
    oE.map((l) => {
      const i = $l(n("password"), l.reg);
      return h.jsxs(
        "div",
        {
          className: "w-full grid grid-cols-[35px_70px_1fr] items-center",
          children: [
            h.jsx("span", {
              children: i
                ? h.jsx(hc, { className: "w-[30px] h-[30px] text-green-600" })
                : h.jsx(Gd, { className: "w-[30px] h-[30px] text-red-600" }),
            }),
            h.jsx("span", {
              className: `txt__00 ml-2 px-3 py-1 border-2 rounded-xl ${
                i
                  ? "text-green-600 border-green-600"
                  : "text-red-600 border-red-600"
              }`,
              children: l.label,
            }),
            h.jsx("span", {
              className: `txt__00 hidden ml-4 ${
                i ? "text-green-600" : "text-red-600"
              }`,
              children: l.msg,
            }),
          ],
        },
        l.id
      );
    }),
  fE = () => {
    const [n, l] = w.useState(""),
      i = w.useRef(null);
    w.useEffect(() => {
      const p = (m) => {
        var v;
        if (i.current && (v = i.current) != null && v.contains(m.target)) {
          const b = document.getElementById("tooltip");
          b == null || b.classList.remove("generate_password__tooltip"),
            requestAnimationFrame(() =>
              b == null ? void 0 : b.classList.add("generate_password__tooltip")
            );
        }
      };
      return (
        document.addEventListener("click", p),
        () => document.removeEventListener("click", p)
      );
    }, []);
    const r =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]<>-+~/$\\|",
      c = () => {
        const p = r.split("");
        for (let m = p.length - 1; m > 0; m--) {
          const v = Math.floor(Math.random() * (m + 1));
          [p[m], p[v]] = [p[v], p[m]];
        }
        return p.join("");
      },
      f = () => {
        const p = new Uint8Array(24);
        window.crypto.getRandomValues(p);
        const m = c();
        return Array.from(p, (v) => m[v % m.length]).join("");
      };
    return {
      generatePwd: async () => {
        let p = "";
        for (; !Mg.test(p); ) p = await f();
        l(p);
      },
      handleCopyPwd: async () => {
        if (n)
          try {
            await navigator.clipboard.writeText(n);
          } catch {}
      },
      strongPwd: n,
      tooltipRef: i,
    };
  },
  mh = () => {
    const {
      strongPwd: n,
      generatePwd: l,
      handleCopyPwd: i,
      tooltipRef: r,
    } = fE();
    return h.jsxs("div", {
      className: "w-full max-w-full grid grid-cols-1 gap-3",
      children: [
        h.jsx("div", {
          className: "w-full max-w-fit flex hover:text-orange-500 btn__pseudo",
          children: h.jsxs("button", {
            onClick: l,
            type: "button",
            className:
              "justify-self-start flex gap-4 items-center cursor-pointer",
            children: [
              h.jsx(Xx, { className: "w-[30px] h-[30px]" }),
              h.jsx("span", {
                className: "txt__00",
                children: "Generate strong password",
              }),
            ],
          }),
        }),
        !!n &&
          h.jsxs("div", {
            className: "relative group w-full flex max-w-fit",
            children: [
              h.jsx("button", {
                type: "button",
                ref: r,
                onClick: i,
                className:
                  "txt__00 btn__pseudo border-2 border-orange-500 rounded-xl w-full max-w-fit px-6 py-1 cursor-pointer hover:text-orange-500 break-all text-start",
                children: n,
              }),
              h.jsx("span", {
                id: "tooltip",
                className:
                  "tooltip txt__00 max-w-fit px-6 min-w-[150px] opacity-0",
                children: "Password Copied",
              }),
            ],
          }),
      ],
    });
  },
  dE = () => {
    const {
      register: n,
      errors: l,
      watch: i,
      isPwdVisible: r,
      isConfirmPwdVisible: c,
      handleChangePwdVisibility: f,
      handleChangeConfirmPwdVisibility: d,
      isPending: y,
      handleRegister: p,
      customPwd: m,
      customConfirmPwd: v,
    } = sE();
    return h.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-10 items-center",
      children: [
        h.jsx("div", {
          className: "w-full flex justify-center",
          children: h.jsx("span", {
            className: "txt__04",
            children: "Register",
          }),
        }),
        h.jsx("div", {
          className:
            "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
          children: h.jsx("div", {
            className: "w-full grid grid-cols-1",
            children: h.jsxs("form", {
              onSubmit: p,
              className: "grid grid-cols-1 w-full gap-y-8",
              children: [
                [...tE, Nr].map((b) =>
                  h.jsx(jr, { register: n, errors: l, field: b }, b.id)
                ),
                h.jsx(ol, {
                  register: n,
                  errors: l,
                  custom: m,
                  isVisible: r,
                  handleChangeVisibility: f,
                  field: ch,
                }),
                h.jsx(mh, {}),
                !!Object.keys((l == null ? void 0 : l.password) ?? {}).length &&
                  h.jsxs("div", {
                    className: "w-full grid grid-cols-2 gap-5 sm:grid-cols-4",
                    children: [
                      h.jsx(hh, { watch: i }),
                      h.jsx(dh, { watch: i }),
                    ],
                  }),
                h.jsx(ol, {
                  register: n,
                  errors: l,
                  custom: v,
                  isVisible: c,
                  handleChangeVisibility: d,
                  field: oh,
                }),
                h.jsx(lE, {
                  register: n,
                  errors: l,
                  valTerms: i("acceptedTerms"),
                }),
                h.jsx("div", {
                  className:
                    "w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center",
                  children: h.jsx(kn, {
                    styleTxt: "txt__02",
                    label: "Register",
                    type: "submit",
                    isPending: y,
                  }),
                }),
                h.jsx("div", {
                  className: "w-full",
                  children: h.jsx(zg, { type: "register" }),
                }),
              ],
            }),
          }),
        }),
      ],
    });
  },
  hE = ({ reset: n, callAPI: l, type: i, from: r }) => {
    const { showToastMsg: c } = Qt(),
      { handleErrAPI: f } = en(),
      d = gt(),
      { mutate: y, isPending: p } = Nt({
        mutationFn: ({ email: m }) => l({ email: m, type: i }),
        onSuccess: () => {
          n(),
            c("Verification Email sent successfully", "SUCCESS"),
            d(`/notice-email?type=${i ?? ""}`, { state: { from: r } });
        },
        onError: (m) => {
          var v, b, E;
          ((v = m == null ? void 0 : m.response) == null
            ? void 0
            : v.status) === 403
            ? c(
                (E =
                  (b = m == null ? void 0 : m.response) == null
                    ? void 0
                    : b.data) == null
                  ? void 0
                  : E.msg,
                "ERROR"
              )
            : f({ err: m });
        },
      });
    return { mutate: y, isPending: p };
  },
  mE = () => {
    var j;
    It();
    const [n] = Ra(),
      l = st(),
      i = (j = l == null ? void 0 : l.state) == null ? void 0 : j.from,
      r = n.get("type"),
      c =
        $s(["/auth/register", "/auth/login"], i) &&
        $s(["recover-pwd", "verify-account"], r ?? ""),
      {
        register: f,
        handleSubmit: d,
        formState: { errors: y },
        reset: p,
        setFocus: m,
      } = qn({ mode: "onChange" });
    w.useEffect(() => {
      m("email");
    }, [m]);
    const { mutate: v, isPending: b } = hE({
        reset: p,
        callAPI: l4,
        from: i,
        type: r,
      }),
      E = d((_) => {
        v({ email: _.email });
      });
    return {
      register: f,
      errors: y,
      canStay: c,
      type: r,
      isPending: b,
      handleSubmitEmail: E,
    };
  },
  pE = () => {
    const {
      register: n,
      errors: l,
      canStay: i,
      type: r,
      isPending: c,
      handleSubmitEmail: f,
    } = mE();
    return i
      ? h.jsxs("div", {
          className: "w-full grid grid-cols-1 gap-y-10 items-center",
          children: [
            h.jsx("div", {
              className: "w-full flex justify-center",
              children: h.jsx("span", {
                className: "txt__04",
                children:
                  r === "recover-pwd" ? "Recover Password" : "Verify Account",
              }),
            }),
            h.jsx("div", {
              className:
                "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
              children: h.jsx("div", {
                className: "w-full grid grid-cols-1",
                children: h.jsxs("form", {
                  onSubmit: f,
                  className: "grid grid-cols-1 w-full gap-y-8",
                  children: [
                    h.jsx(jr, { register: n, errors: l, field: Nr }),
                    h.jsx("div", {
                      className:
                        "w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center",
                      children: h.jsx(kn, {
                        styleTxt: "txt__02",
                        label: "Send Email",
                        type: "submit",
                        isPending: c,
                      }),
                    }),
                  ],
                }),
              }),
            }),
          ],
        })
      : h.jsx(An, { to: "/", replace: !0 });
  },
  Jy = ({ callAPI: n, successCB: l }) => {
    const { handleErrAPI: i } = en(),
      { mutate: r } = Nt({
        mutationFn: ({ userId: c, token: f }) => n({ userId: c, token: f }),
        onSuccess: (c) => {
          l(c);
        },
        onError: (c) => {
          i({ err: c, push: !0 });
        },
      });
    return { mutate: r };
  },
  yE = (n, l) => {
    const { showToastMsg: i } = Qt(),
      { setUserLogged: r } = Pt(),
      c = gt(),
      f = st(),
      d = (v) => {
        r(v.accessToken),
          i("Account Verified Successfully", "SUCCESS"),
          c("/", { replace: !0 });
      },
      { mutate: y } = Jy({
        callAPI: ({ userId: v, token: b }) => s4({ userId: v, token: b }),
        successCB: (v) => d(v),
      }),
      p = () => {
        i("Email verified Successfully", "SUCCESS"),
          c(`/auth/recover-pwd?userId=${n}&token=${l}`, {
            state: { from: f.pathname },
            replace: !0,
          });
      },
      { mutate: m } = Jy({
        callAPI: ({ userId: v, token: b }) => i4({ userId: v, token: b }),
        successCB: () => p(),
      });
    return { mutateVerify: y, mutateRecover: m };
  },
  gE = () => {
    const { isLogged: n } = Pt();
    It();
    const [l] = Ra(),
      i = l.get("type"),
      r = l.get("token"),
      c = l.get("userId"),
      f = $l(c ?? "", Rr),
      d = $l(r ?? "", Ec),
      y = $s(["recover-pwd", "verify-account"], i ?? ""),
      p = [d, f, y].every((E) => !!E) && !n,
      { mutateVerify: m, mutateRecover: v } = yE(c, r),
      b = w.useCallback(() => {
        if (p)
          i === "verify-account"
            ? m({ userId: c, token: r })
            : i === "recover-pwd" && v({ userId: c, token: r });
        else return;
      }, [p, m, v, i, r, c]);
    return (
      w.useEffect(() => {
        b();
      }, [b]),
      { canStay: p }
    );
  },
  vE = () => {
    const [n, l] = w.useState(50);
    return (
      w.useEffect(() => {
        const i = () => {
          const r = window.innerWidth;
          return r > Ls.md ? l(100) : r > Ls.sm ? l(75) : l(50);
        };
        return (
          i(),
          window.addEventListener("resize", i),
          () => window.removeEventListener("resize", i)
        );
      }, [l]),
      { size: n }
    );
  },
  li = () => {
    const { size: n } = vE();
    return h.jsx("div", {
      className: "w-full h-[50vh] sm:h-[75vh] flex justify-center items-center",
      children: h.jsx(h4, { color: "#f97316", size: n }),
    });
  },
  bE = () => {
    const { canStay: n } = gE();
    return n ? h.jsx(li, {}) : h.jsx(An, { to: "/", replace: !0 });
  },
  xE = () => {
    var Le;
    const [n, l] = w.useState(!1),
      [i, r] = w.useState(!1),
      { handleErrAPI: c } = en(),
      { showToastMsg: f } = Qt(),
      { setUserLogged: d, isLogged: y } = Pt();
    It();
    const p = st(),
      m = gt(),
      [v] = Ra(),
      b = v.get("token"),
      E = v.get("userId"),
      j = Rr.test(E ?? ""),
      _ = Ec.test(b ?? ""),
      D =
        ((Le = p == null ? void 0 : p.state) == null ? void 0 : Le.from) ===
          "/auth/verify" &&
        j &&
        _ &&
        !y,
      { handleChangePwdVisibility: T, handleChangeConfirmPwdVisibility: U } =
        fh({
          isPwdVisible: n,
          setIsPwdVisible: l,
          isConfirmPwdVisible: i,
          setIsConfirmPwdVisible: r,
        }),
      {
        register: L,
        setFocus: V,
        formState: { errors: I },
        handleSubmit: Y,
        reset: te,
        watch: de,
        trigger: ee,
      } = qn({ mode: "onChange" }),
      { mutate: G, isPending: le } = Nt({
        mutationFn: ({ password: xe, token: K, userId: oe }) =>
          r4({ password: xe, token: K, userId: oe }),
        onSuccess: (xe) => {
          te(),
            d(xe == null ? void 0 : xe.accessToken),
            f("Password changed successfully", "SUCCESS"),
            m("/", { replace: !0 });
        },
        onError: (xe) => {
          c({ err: xe });
        },
      }),
      ke = Y((xe) => {
        const { password: K } = xe;
        G({ password: K, token: b, userId: E });
      }),
      he = de("password");
    return (
      w.useEffect(() => {
        V("password");
      }, [V]),
      w.useEffect(() => {
        he && ee("confirmPassword");
      }, [he, ee]),
      {
        register: L,
        errors: I,
        watch: de,
        isPwdVisible: n,
        isConfirmPwdVisible: i,
        handleChangePwdVisibility: T,
        handleChangeConfirmPwdVisibility: U,
        canStay: D,
        handleSubmitRecoverPwd: ke,
        isPending: le,
        customConfirmPwd: (xe) =>
          xe !== de("password") ? "Passwords do not match 🤔" : !0,
      }
    );
  },
  SE = () => {
    const {
      register: n,
      errors: l,
      watch: i,
      isPwdVisible: r,
      isConfirmPwdVisible: c,
      handleChangePwdVisibility: f,
      handleChangeConfirmPwdVisibility: d,
      canStay: y,
      isPending: p,
      handleSubmitRecoverPwd: m,
      customConfirmPwd: v,
    } = xE();
    return y
      ? h.jsxs("div", {
          className: "w-full grid grid-cols-1 gap-y-10 items-center",
          children: [
            h.jsx("div", {
              className: "w-full flex justify-center",
              children: h.jsx("span", {
                className: "txt__04",
                children: "Recover Password",
              }),
            }),
            h.jsx("div", {
              className:
                "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
              children: h.jsx("div", {
                className: "w-full grid grid-cols-1",
                children: h.jsxs("form", {
                  onSubmit: m,
                  className: "grid grid-cols-1 w-full gap-y-8",
                  children: [
                    h.jsx(ol, {
                      register: n,
                      errors: l,
                      isVisible: r,
                      handleChangeVisibility: f,
                      field: ch,
                    }),
                    !!Object.keys((l == null ? void 0 : l.password) ?? {})
                      .length &&
                      h.jsxs("div", {
                        className:
                          "w-full grid grid-cols-2 gap-5 sm:grid-cols-4",
                        children: [
                          h.jsx(hh, { watch: i }),
                          h.jsx(dh, { watch: i }),
                        ],
                      }),
                    h.jsx(mh, {}),
                    h.jsx(ol, {
                      register: n,
                      errors: l,
                      custom: v,
                      isVisible: c,
                      handleChangeVisibility: d,
                      field: oh,
                    }),
                    h.jsx("div", {
                      className:
                        "w-full mt-2 max-w-[250px] md:max-w-[300px] justify-self-center flex justify-center",
                      children: h.jsx(kn, {
                        styleTxt: "txt__02",
                        label: "Change Password",
                        type: "submit",
                        isPending: p,
                      }),
                    }),
                  ],
                }),
              }),
            }),
          ],
        })
      : h.jsx(An, { to: "/", replace: !0 });
  },
  ph = [
    {
      id: re(),
      field: "firstName",
      label: "First Name",
      reg: cc,
      msg: "First Name should start with a capital letter and can only contains letters and apostrophe ",
    },
    {
      id: re(),
      field: "lastName",
      label: "Last Name",
      reg: cc,
      msg: "Last Name should start with a capital letter and can only contains letters and apostrophe",
    },
  ],
  _c = [
    {
      id: re(),
      field: "country",
      label: "Country",
      reg: E3,
      msg: "Country can only contains letters, and must be at least 2 chars",
    },
    {
      id: re(),
      field: "state",
      label: "State",
      reg: _3,
      msg: "State can only contains can only contains letters and hyphens if needed, and must be at least 2 chars ",
    },
    {
      id: re(),
      field: "city",
      label: "City",
      reg: R3,
      msg: "City can only contains letters and hyphens if needed, and must be at least 2 chars",
    },
  ],
  Rc = [
    {
      id: re(),
      field: "street",
      label: "Street",
      reg: j3,
      msg: "Street can only contains letters, numbers, and spaces, and must be at least 5 chars",
    },
    {
      id: re(),
      field: "zipCode",
      label: "Zip Code",
      reg: N3,
      msg: "Zip Code can only contains numbers, at least 5 up to 10 digits",
    },
    {
      id: re(),
      field: "phone",
      label: "Phone",
      reg: Ug,
      msg: "Phone can only contains numbers,and including country prefix up to 15 digits ",
    },
  ],
  wE = [...ph, ..._c, ...Rc],
  EE = [[...ph], [..._c], [...Rc]],
  yh = 3;
var Jt = ((n) => (
  (n.UPDATE_FIELD = "UPDATE_FIELD"),
  (n.SET_ERR = "SET_ERR"),
  (n.SET_REQUIRED = "SET_REQUIRED"),
  (n.SET_PREV_DISABLED = "SET_PREV_DISABLED"),
  (n.SET_NEXT_DISABLED = "SET_NEXT_DISABLED"),
  (n.SET_CURR = "SET_CURR"),
  (n.SET_FETCHED_DATA = "SET_FETCHED_DATA"),
  n
))(Jt || {});
const _E = (n, l) => {
    var i, r, c, f, d, y;
    switch (l.type) {
      case Jt.UPDATE_FIELD: {
        const { field: p, val: m } = l.payload;
        return { ...n, user: { ...n.user, [p]: m } };
      }
      case Jt.SET_ERR: {
        const { field: p, msg: m } = l.payload;
        return { ...n, errs: { ...n.errs, [p]: { ...n.errs[p], msg: m } } };
      }
      case Jt.SET_REQUIRED: {
        const { field: p, required: m } = l.payload;
        return {
          ...n,
          errs: { ...n.errs, [p]: { ...n.errs[p], required: m } },
        };
      }
      case Jt.SET_CURR: {
        const { curr: p } = l.payload;
        return p === "PREV" && !n.currForm.isPrevDisabled
          ? {
              ...n,
              currForm: {
                curr: n.currForm.curr - 1,
                isPrevDisabled: n.currForm.curr - 1 === 0,
                isNextDisabled: !1,
              },
            }
          : {
              ...n,
              currForm: {
                curr: n.currForm.curr + 1,
                isPrevDisabled: !1,
                isNextDisabled: n.currForm.curr + 1 === yh - 1,
              },
            };
      }
      case Jt.SET_NEXT_DISABLED: {
        const { isNextDisabled: p } = l.payload;
        return { ...n, currForm: { ...n.currForm, isNextDisabled: p } };
      }
      case Jt.SET_FETCHED_DATA: {
        const { user: p } = l.payload;
        return {
          ...n,
          user: {
            firstName: (p == null ? void 0 : p.firstName) ?? "",
            lastName: (p == null ? void 0 : p.lastName) ?? "",
            country:
              ((i = p == null ? void 0 : p.address) == null
                ? void 0
                : i.country) ?? "",
            state:
              ((r = p == null ? void 0 : p.address) == null
                ? void 0
                : r.state) ?? "",
            city:
              ((c = p == null ? void 0 : p.address) == null
                ? void 0
                : c.city) ?? "",
            street:
              ((f = p == null ? void 0 : p.address) == null
                ? void 0
                : f.street) ?? "",
            zipCode:
              ((d = p == null ? void 0 : p.address) == null
                ? void 0
                : d.zipCode) ?? "",
            phone:
              ((y = p == null ? void 0 : p.address) == null
                ? void 0
                : y.phone) ?? "",
          },
          errs: {},
        };
      }
      default:
        return n;
    }
  },
  RE = (n, l) => {
    let i;
    for (const r in l)
      n.map((c) => c.field).includes(r) && (i = { ...i, [r]: l[r] });
    return i;
  },
  jE = (n, l) => {
    let i = !0;
    for (let r = 0; r < l.length; r++) l[r].reg.test(n[l[r].field]) || (i = !1);
    return i;
  },
  NE = (n, l, i, r) => {
    n({
      type: Jt.SET_ERR,
      payload: { field: l, msg: r.reg.test(i ?? "") ? null : r.msg },
    }),
      n({
        type: Jt.SET_REQUIRED,
        payload: { field: l, required: i ? null : `${r.label} is required` },
      });
  },
  AE = (n, l, i, r, c) => {
    const f = EE[c ?? l.currForm.curr],
      d = RE(f, l.user);
    i !== void 0 && r !== void 0 && (d[i] = r);
    const y = jE(d, f);
    n({ type: Jt.SET_NEXT_DISABLED, payload: { isNextDisabled: !y } });
  },
  TE = (n, l, i, r) => {
    const { name: c, value: f } = r.target,
      [d] = wE.filter((y) => y.field === c);
    l(c, f, d),
      i(c, f),
      n({ type: Jt.UPDATE_FIELD, payload: { field: c, val: f } });
  },
  CE = (n, l) =>
    l > 0 ? n({ type: Jt.SET_CURR, payload: { curr: "PREV" } }) : void 0,
  OE = (n, l, i) => {
    l.curr < yh - 1 &&
      !l.isNextDisabled &&
      n({ type: Jt.SET_CURR, payload: { curr: "NEXT" } }),
      i(void 0, void 0, l.curr + 1);
  },
  DE = (n, l) => n({ type: Jt.SET_FETCHED_DATA, payload: { user: l } }),
  ME = {
    currForm: { curr: 0, isPrevDisabled: !0, isNextDisabled: !1 },
    user: {
      firstName: "",
      lastName: "",
      country: "",
      state: "",
      city: "",
      street: "",
      zipCode: "",
      phone: "",
    },
    errs: {},
  },
  UE = () => {
    const { handleErrAPI: n } = en(),
      { showToastMsg: l } = Qt(),
      i = Id(),
      {
        data: r,
        isPending: c,
        isError: f,
        isSuccess: d,
        error: y,
      } = mc({ queryKey: ["userProfileDetails"], queryFn: F3 }),
      {
        mutate: p,
        isPending: m,
        isSuccess: v,
        isError: b,
        error: E,
      } = Nt({ mutationFn: (ee) => Q3(ee) }),
      [j, _] = w.useReducer(_E, ME),
      D = w.useCallback((ee) => DE(_, ee), [_]),
      T = w.useCallback(() => {
        if (f) n({ err: y });
        else if (d) {
          const { user: ee = {} } = r ?? {};
          D(ee);
        }
      }, [r, d, f, y, n, D]),
      U = w.useCallback(async () => {
        b
          ? n({ err: E })
          : v &&
            (l("Profile updated successfully", "SUCCESS"),
            await i.invalidateQueries({ queryKey: ["userProfileDetails"] }));
      }, [i, b, n, E, v, l]);
    w.useEffect(() => {
      T();
    }, [T]),
      w.useEffect(() => {
        U();
      }, [U]);
    const L = (ee, G, le) => NE(_, ee, G, le),
      V = (ee, G, le) => AE(_, j, ee, G, le);
    return {
      state: j,
      handleChangeHigher: (ee) => TE(_, L, V, ee),
      handlePrevHigher: () => CE(_, j.currForm.curr),
      handleNextHigher: () => OE(_, j.currForm, V),
      isPending: c,
      isPendingUpdate: m,
      handleSubmit: (ee) => {
        ee.preventDefault(), p({ ...j.user });
      },
    };
  },
  zE = () => {
    const n = w.useRef(null),
      l = w.useRef(null),
      i = w.useRef(null),
      {
        state: r,
        handleChangeHigher: c,
        handlePrevHigher: f,
        handleNextHigher: d,
        isPending: y,
        isPendingUpdate: p,
        handleSubmit: m,
      } = UE();
    It(),
      w.useEffect(() => {
        setTimeout(() => {
          var j;
          (j = n.current) == null || j.focus();
        }, 500);
      }, []),
      w.useEffect(() => {
        r.currForm.curr === 0 &&
          setTimeout(() => {
            var j;
            (j = n.current) == null || j.focus();
          }, 600),
          r.currForm.curr === 1 &&
            setTimeout(() => {
              var j;
              (j = l.current) == null || j.focus();
            }, 600),
          r.currForm.curr === 2 &&
            setTimeout(() => {
              var j;
              (j = i.current) == null || j.focus();
            }, 600);
      }, [r.currForm.curr]);
    const { isPrevDisabled: v, isNextDisabled: b, curr: E } = r.currForm;
    return {
      isPrevDisabled: v,
      isNextDisabled: b,
      handleNext: d,
      handlePrev: f,
      curr: E,
      state: r,
      handleChange: c,
      isPending: y,
      isPendingUpdate: p,
      handleSubmit: m,
      inputRef_0: n,
      inputRef_1: l,
      inputRef_2: i,
    };
  },
  jc = ({
    currForm: n,
    isPrevDisabled: l,
    isNextDisabled: i,
    handlePrev: r,
    handleNext: c,
    totLen: f,
    hiddenLg: d,
    children: y = !1,
  }) =>
    h.jsxs("div", {
      className: `w-full grid grid-cols-2 sm:justify-items-center ${
        d ? "lg:hidden" : ""
      }`,
      children: [
        h.jsx("div", {
          className:
            "w-full max-w-[30vw] sm:max-w-[200px] justify-self-start sm:justify-self-center",
          children: h.jsx(mr, {
            label: "Prev",
            isDisabled: l,
            handleClick: r,
            styleTxt: "txt__02",
            type: "button",
          }),
        }),
        n === f - 1
          ? y ?? null
          : h.jsx("div", {
              className:
                "w-full max-w-[30vw] sm:max-w-[200px] justify-self-end sm:justify-self-center",
              children: h.jsx(mr, {
                label: "Next",
                isDisabled: i,
                handleClick: c,
                styleTxt: "txt__02",
                type: "button",
              }),
            }),
      ],
    }),
  LE = ({
    isPrevDisabled: n,
    isNextDisabled: l,
    handlePrev: i,
    handleNext: r,
    curr: c,
    isPendingUpdate: f,
  }) =>
    h.jsx(jc, {
      isPrevDisabled: n,
      isNextDisabled: l,
      handleNext: r,
      handlePrev: i,
      currForm: c,
      totLen: yh,
      hiddenLg: !1,
      children: h.jsx("div", {
        className: "w-full max-w-[200px] h-full flex items-center",
        children: h.jsx(kn, {
          label: "Save",
          isDisabled: l,
          type: "submit",
          styleTxt: "txt__02",
          isPending: f,
        }),
      }),
    }),
  ed = ({ el: n, state: l, handleChange: i, inputRef: r }) => {
    var f;
    const c = (f = l.errs) == null ? void 0 : f[n.field];
    return h.jsxs(
      "label",
      {
        className: "w-full flex flex-col gap-y-2",
        children: [
          h.jsx("span", { className: "txt__02", children: n.label }),
          h.jsx("input", {
            ref: r,
            onChange: i,
            type: "text",
            className:
              "w-full outline-none px-5 py-1 txt__01 border-2 border-orange-500 rounded-full focus__base transition-all duration-300",
            placeholder: `${n.label}`,
            name: n.field,
            value: l.user[n.field],
          }),
          !!Object.keys(c ?? {}).length &&
            h.jsx("span", {
              className: "txt__00 text-red-600",
              children:
                (c == null ? void 0 : c.required) ||
                (c == null ? void 0 : c.msg) ||
                "",
            }),
        ],
      },
      n.id
    );
  },
  HE = ({
    state: n,
    handleChange: l,
    inputRef_0: i,
    inputRef_1: r,
    inputRef_2: c,
  }) =>
    h.jsxs(h.Fragment, {
      children: [
        h.jsx("div", {
          className:
            "grid grid-cols-1 p-5 gap-y-5 h-fit transition-all duration-500",
          children: ph.map((f, d) =>
            h.jsx(
              ed,
              {
                state: n,
                handleChange: l,
                el: f,
                inputRef: n.currForm.curr === 0 && d === 0 ? i : null,
              },
              f.id
            )
          ),
        }),
        h.jsx("div", {
          className:
            "min-w-full grid grid-cols-1 p-5 gap-y-5 transition-all duration-500 h-fit ",
          children: _c.map((f, d) =>
            h.jsx(
              ed,
              {
                state: n,
                handleChange: l,
                el: f,
                inputRef: n.currForm.curr === 1 && d === 0 ? r : null,
              },
              f.id
            )
          ),
        }),
        h.jsx("div", {
          className:
            "min-w-full grid grid-cols-1 p-5 gap-y-5 transition-all duration-500 h-fit ",
          children: Rc.map((f, d) =>
            h.jsx(
              ed,
              {
                state: n,
                handleChange: l,
                el: f,
                inputRef: n.currForm.curr === 2 && d === 0 ? c : null,
              },
              f.id
            )
          ),
        }),
      ],
    }),
  BE = () => {
    const {
      isPrevDisabled: n,
      isNextDisabled: l,
      handleNext: i,
      handlePrev: r,
      curr: c,
      state: f,
      handleChange: d,
      isPending: y,
      isPendingUpdate: p,
      handleSubmit: m,
      inputRef_0: v,
      inputRef_1: b,
      inputRef_2: E,
    } = zE();
    return h.jsxs("div", {
      className: "w-full grid grid-cols-1 justify-items-center gap-y-5",
      children: [
        h.jsx("span", {
          className: "txt__04",
          children: "Your Profile Details",
        }),
        y
          ? h.jsx(li, {})
          : h.jsxs("form", {
              onSubmit: m,
              className:
                "w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-5 border-orange-500 rounded-xl h-fit p-5 sm:px-10",
              children: [
                h.jsx("div", {
                  className: "w-full overflow-hidden",
                  children: h.jsx("div", {
                    className:
                      "w-[300%] grid grid-cols-3 transition-all duration-500 min-h-[250px]",
                    style: { transform: `translateX(-${(c * 100) / 3}%)` },
                    children: h.jsx(HE, {
                      state: f,
                      handleChange: d,
                      inputRef_0: v,
                      inputRef_1: b,
                      inputRef_2: E,
                    }),
                  }),
                }),
                h.jsx(LE, {
                  isPrevDisabled: n,
                  isNextDisabled: l,
                  handlePrev: r,
                  handleNext: i,
                  curr: c,
                  isPendingUpdate: p,
                }),
              ],
            }),
      ],
    });
  },
  VE = () => {
    It();
    const [n] = Ra(),
      l = gt(),
      i = st(),
      { showToastMsg: r } = Qt(),
      { handleErrAPI: c } = en(),
      f = n.get("typeUser"),
      d = n.get("userId"),
      y = n.get("token"),
      p =
        $s(["non-logged", "logged"], f ?? "") &&
        $l(y ?? "", Ec) &&
        $l(d ?? "", Rr),
      m = { userId: d ?? "", token: y ?? "" },
      { mutate: v } = Nt({
        mutationFn: () => (f === "logged" ? J4({ ...m }) : W4({ ...m })),
        onSuccess: () => {
          l("/newsletter/notice-unsubscribe-with-retry?success=true", {
            state: { from: i.pathname },
            replace: !0,
          }),
            r("Subscription deleted successfully", "SUCCESS");
        },
        onError: (b) => {
          var E, j, _;
          ((E = b == null ? void 0 : b.response) == null
            ? void 0
            : E.status) === 401
            ? (l("/newsletter/notice-unsubscribe-with-retry?success=false", {
                state: { from: i.pathname },
                replace: !0,
              }),
              r(
                (_ =
                  (j = b == null ? void 0 : b.response) == null
                    ? void 0
                    : j.data) == null
                  ? void 0
                  : _.msg,
                "ERROR"
              ))
            : c({ err: b, push: !0 });
        },
      });
    return (
      w.useEffect(() => {
        p && v();
      }, [p, v]),
      { canStay: p }
    );
  },
  qE = () => {
    const { canStay: n } = VE();
    return n ? h.jsx(li, {}) : h.jsx(An, { to: "/", replace: !0 });
  },
  kE = () => {
    var _;
    const { showToastMsg: n } = Qt(),
      { handleErrAPI: l } = en();
    It();
    const [i] = Ra(),
      r = st(),
      c = gt(),
      f = i.get("success"),
      d =
        ((_ = r == null ? void 0 : r.state) == null ? void 0 : _.from) ===
        "/newsletter/verify-unsubscribe",
      {
        register: y,
        formState: { errors: p },
        handleSubmit: m,
        reset: v,
      } = qn({ mode: "onChange" }),
      { mutate: b, isPending: E } = Nt({
        mutationFn: ({ email: D }) => I4({ email: D }),
        onSuccess: () => {
          v(),
            n("Email sent successfully", "SUCCESS"),
            c("/notice-email?type=sentEmailUnsubscribe", {
              state: { from: r.pathname },
            });
        },
        onError: (D) => {
          l({ err: D });
        },
      }),
      j = m((D) => {
        b({ email: D.email });
      });
    return {
      canStay: d,
      success: f,
      register: y,
      errors: p,
      handleSubmitEmail: j,
      isPending: E,
    };
  },
  FE = () => {
    const {
      canStay: n,
      success: l,
      register: i,
      errors: r,
      handleSubmitEmail: c,
      isPending: f,
    } = kE();
    return n
      ? l === "true"
        ? h.jsxs("div", {
            className: "w-full flex flex-col items-center gap-y-14",
            children: [
              h.jsx("div", {
                className: "w-full flex justify-center",
                children: h.jsx("span", {
                  className: "txt__04 leading-10 lg:leading-16",
                  children:
                    "Your subscription has deleted successfully, if you unsubscribe by mistake don't worry, you can subscribe again anytime ✌🏼",
                }),
              }),
              h.jsx("div", {
                className: "w-full flex justify-center items-center",
                children: h.jsx(hc, {
                  className:
                    "w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] md:w-[400px] md:h-[400px] text-green-600",
                }),
              }),
            ],
          })
        : h.jsxs("div", {
            className: "w-full grid grid-cols-1 gap-y-10 items-center",
            children: [
              h.jsx("div", {
                className: "w-full flex justify-center",
                children: h.jsx("span", {
                  className: "txt__04",
                  children: "Send unsubscribe link",
                }),
              }),
              h.jsx("div", {
                className:
                  "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
                children: h.jsx("div", {
                  className: "w-full grid grid-cols-1",
                  children: h.jsxs("form", {
                    onSubmit: c,
                    className: "grid grid-cols-1 w-full gap-y-8",
                    children: [
                      h.jsx(jr, { register: i, errors: r, field: Nr }),
                      h.jsx("div", {
                        className:
                          "w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center",
                        children: h.jsx(kn, {
                          styleTxt: "txt__02",
                          label: "Send Email",
                          type: "submit",
                          isPending: f,
                        }),
                      }),
                    ],
                  }),
                }),
              }),
            ],
          })
      : h.jsx(An, { to: "/", replace: !0 });
  },
  QE = () => {
    It();
    const { showToastMsg: n, closeToast: l } = Qt(),
      { handleErrAPI: i } = en(),
      {
        setCanManageAccount: r,
        canManageAccount: c,
        currUser: f,
        logoutUser: d,
      } = Pt();
    return {
      showToastMsg: n,
      canManageAccount: c,
      setCanManageAccount: r,
      currUser: f,
      handleErrManageUser: (p) => {
        var E, j, _, D, T;
        const m =
            (E = p == null ? void 0 : p.response) == null ? void 0 : E.status,
          v =
            (_ =
              (j = p == null ? void 0 : p.response) == null
                ? void 0
                : j.config) == null
              ? void 0
              : _.url,
          b =
            ((T =
              (D = p == null ? void 0 : p.response) == null
                ? void 0
                : D.data) == null
              ? void 0
              : T.msg) || p.message;
        v === "/user/manage-account"
          ? m === 401
            ? n(b, "ERROR")
            : m === 429 && (d(), i({ err: p }))
          : ([401, 429].includes(m) && r(!1), i({ err: p }));
      },
      closeToast: l,
    };
  },
  PE = ({ setCanManageAccount: n, handleErrManageUser: l, closeToast: i }) => {
    const [r, c] = w.useState(!1),
      f = () => c(!r),
      {
        register: d,
        formState: { errors: y },
        handleSubmit: p,
        setFocus: m,
      } = qn({ mode: "onChange" });
    w.useEffect(() => {
      m("password");
    }, [m]);
    const { mutate: v, isPending: b } = Nt({
        mutationFn: (j) => P3(j),
        onSuccess: (j) => {
          n(j.manageAccountToken), i();
        },
        onError: (j) => {
          l(j);
        },
      }),
      E = p((j) => {
        v(j.password);
      });
    return {
      register: d,
      errors: y,
      isPwdVisible: r,
      handleChangeVisibility: f,
      submitManageForm: E,
      isPending: b,
    };
  },
  YE = ({ setCanManageAccount: n, handleErrManageUser: l, closeToast: i }) => {
    const {
      register: r,
      errors: c,
      isPwdVisible: f,
      handleChangeVisibility: d,
      submitManageForm: y,
      isPending: p,
    } = PE({ setCanManageAccount: n, handleErrManageUser: l, closeToast: i });
    return h.jsxs("form", {
      onSubmit: y,
      className:
        "w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-10 border-orange-500 rounded-xl h-fit p-5 sm:px-10 justify-items-center",
      children: [
        h.jsx("span", {
          className: "txt__03",
          children: "Confirm your password before proceeding",
        }),
        h.jsx("div", {
          className: "w-full",
          children: h.jsx(ol, {
            field: uh,
            register: r,
            errors: c,
            isVisible: f,
            handleChangeVisibility: d,
          }),
        }),
        h.jsx("div", {
          className:
            "w-full flex max-w-[200px] sm:max-w-[250px] justify-center",
          children: h.jsx(mr, {
            label: "Submit",
            styleTxt: "txt__02",
            type: "submit",
            isPending: p,
          }),
        }),
      ],
    });
  },
  GE = ({ showToastMsg: n, setIsChildLoading: l, handleErrManageUser: i }) => {
    const r = st(),
      c = gt(),
      {
        register: f,
        formState: { errors: d },
        handleSubmit: y,
        setFocus: p,
      } = qn({ mode: "onChange" });
    w.useEffect(() => {
      p("newEmail");
    }, [p]);
    const { mutate: m, isPending: v } = Nt({
        mutationFn: (j) => (l(!0), Y3(j)),
        onSuccess: () => {
          n("Email changed successfully!", "SUCCESS"),
            c("/notice-email?type=change-email", {
              state: { from: r.pathname },
            });
        },
        onError: (j) => {
          i(j);
        },
        onSettled: () => {
          l(!1);
        },
      }),
      b = y((j) => {
        m({
          newEmail: j.newEmail,
          manageAccountToken:
            sessionStorage.getItem("manageAccountToken") ?? "",
        });
      });
    return {
      register: f,
      errors: d,
      handleSubmitChangeEmail: b,
      isPending: v,
      custom: (j, _) =>
        j === _ ? "New Email must be different from old one" : !0,
    };
  },
  XE = ({
    currUser: n,
    showToastMsg: l,
    setIsChildLoading: i,
    handleErrManageUser: r,
  }) => {
    const {
      register: c,
      errors: f,
      handleSubmitChangeEmail: d,
      isPending: y,
      custom: p,
    } = GE({ showToastMsg: l, setIsChildLoading: i, handleErrManageUser: r });
    return h.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 px-5 sm:px-10 h-[300px]",
      children: [
        h.jsx("span", { className: "txt__03", children: "Change Email" }),
        h.jsxs("form", {
          onSubmit: d,
          className: "w-full grid grid-cols-1 justify-items-center gap-y-6",
          children: [
            h.jsx("div", {
              className: "w-full",
              children: h.jsx(jr, {
                register: c,
                errors: f,
                field: eE,
                custom: (m) => p(m, n == null ? void 0 : n.email),
              }),
            }),
            h.jsx("div", {
              className: "w-full flex justify-center max-w-[250px]",
              children: h.jsx(kn, {
                styleTxt: "txt__02",
                label: "Submit",
                type: "submit",
                isPending: y,
              }),
            }),
          ],
        }),
      ],
    });
  },
  Cd = 3,
  ZE = () => {
    const [n, l] = w.useState(0),
      [i, r] = w.useState(!1),
      c = n === 0,
      f = n === Cd - 1;
    return {
      currForm: n,
      handlePrev: () => (n > 0 ? l((p) => p - 1) : void 0),
      handleNext: () => (n < Cd - 1 ? l((p) => p + 1) : void 0),
      isPrevDisabled: c,
      isNextDisabled: f,
      isChildLoading: i,
      setIsChildLoading: r,
    };
  },
  KE = ({
    showToastMsg: n,
    handleErrManageUser: l,
    setIsChildLoading: i,
    setCanManageAccount: r,
  }) => {
    const [c, f] = w.useState(!1),
      [d, y] = w.useState(!1),
      p = gt(),
      {
        register: m,
        watch: v,
        reset: b,
        formState: { errors: E },
        handleSubmit: j,
      } = qn({ mode: "onChange" }),
      { handleChangePwdVisibility: _, handleChangeConfirmPwdVisibility: D } =
        fh({
          isConfirmPwdVisible: d,
          setIsConfirmPwdVisible: y,
          isPwdVisible: c,
          setIsPwdVisible: f,
        }),
      { mutate: T, isPending: U } = Nt({
        mutationFn: (Y) => (i(!0), X3(Y)),
        onSuccess: () => {
          b(), n("Password changed successfully", "SUCCESS"), p("/");
        },
        onError: (Y) => {
          l(Y);
        },
        onSettled: () => {
          i(!1), r(!1);
        },
      }),
      L = j((Y) => {
        const { newPassword: te } = Y;
        T({
          newPassword: te,
          manageAccountToken:
            sessionStorage.getItem("manageAccountToken") ?? "",
        });
      });
    return {
      register: m,
      errors: E,
      watch: v,
      handleChangePwdVisibility: _,
      handleChangeConfirmPwdVisibility: D,
      isConfirmPwdVisible: d,
      isPwdVisible: c,
      customPwd: (Y, te) =>
        Y === te ? "Password must be different from email" : !0,
      customConfirmPwd: (Y) =>
        Y !== v("newPassword") ? "Passwords do not match 🤔" : !0,
      isPending: U,
      handleSubmitChangePwd: L,
    };
  },
  $E = ({
    showToastMsg: n,
    handleErrManageUser: l,
    setIsChildLoading: i,
    currUser: r,
    setCanManageAccount: c,
  }) => {
    const {
      register: f,
      errors: d,
      watch: y,
      handleChangePwdVisibility: p,
      handleChangeConfirmPwdVisibility: m,
      isConfirmPwdVisible: v,
      isPwdVisible: b,
      customPwd: E,
      customConfirmPwd: j,
      isPending: _,
      handleSubmitChangePwd: D,
    } = KE({
      showToastMsg: n,
      handleErrManageUser: l,
      setIsChildLoading: i,
      setCanManageAccount: c,
    });
    return h.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 pb-10 px-5 sm:px-10",
      children: [
        h.jsx("span", { className: "txt__03", children: "Change Password" }),
        h.jsxs("form", {
          onSubmit: D,
          className: "w-full grid grid-cols-1 justify-items-center gap-y-5",
          children: [
            h.jsx("div", {
              className: "w-full",
              children: h.jsx(ol, {
                field: nE,
                register: f,
                errors: d,
                isVisible: b,
                handleChangeVisibility: p,
                custom: (T) => E(T, r == null ? void 0 : r.email),
              }),
            }),
            !!Object.keys((d == null ? void 0 : d.newPassword) ?? {}).length &&
              h.jsxs("div", {
                className: "w-full grid grid-cols-2 sm:grid-cols-3 gap-3",
                children: [h.jsx(hh, { watch: y }), h.jsx(dh, { watch: y })],
              }),
            h.jsx(mh, {}),
            h.jsx("div", {
              className: "w-full",
              children: h.jsx(ol, {
                field: oh,
                register: f,
                errors: d,
                isVisible: v,
                handleChangeVisibility: m,
                custom: j,
              }),
            }),
            h.jsx("div", {
              className: "w-full flex justify-center max-w-[250px] mt-5",
              children: h.jsx(kn, {
                styleTxt: "txt__02",
                label: "Submit",
                type: "submit",
                isPending: _,
              }),
            }),
          ],
        }),
      ],
    });
  },
  JE = ({ showToastMsg: n, setIsChildLoading: l, handleErrManageUser: i }) => {
    const r = gt(),
      { logoutUser: c } = Pt(),
      { setPopup: f, popup: d } = C1(),
      { mutate: y, isPending: p } = Nt({
        mutationFn: (b) => (l(!0), f({ ...d, isPending: !0 }), Z3(b)),
        onSuccess: () => {
          r("/", { replace: !0 }),
            c(),
            n("Account deleted successfully", "SUCCESS");
        },
        onError: (b) => {
          i(b);
        },
        onSettled: () => {
          f(null), l(!1);
        },
      }),
      m = () => {
        y(sessionStorage.getItem("manageAccountToken") ?? "");
      };
    return {
      handleSubmitDeleteAccount: () => {
        f({
          txt: "delete your account?",
          greenLabel: "I change Idea",
          redLabel: "Delete account",
          isPending: p,
          confirmAction: m,
        });
      },
      isPending: p,
      handleDeleteAccount: m,
    };
  },
  WE = ({ showToastMsg: n, setIsChildLoading: l, handleErrManageUser: i }) => {
    const { handleSubmitDeleteAccount: r } = JE({
      showToastMsg: n,
      setIsChildLoading: l,
      handleErrManageUser: i,
    });
    return h.jsx("div", {
      className: "w-full flex justify-center mt-14",
      children: h.jsx("button", {
        onClick: r,
        className:
          "max-w-fit group border-2 border-red-600 transition-all duration-300 hover:scale-120 rounded-xl gap-3 cursor-pointer",
        children: h.jsxs("div", {
          className: "px-5 py-2 w-full flex justify-start gap-3",
          children: [
            h.jsx(j1, {
              className:
                "w-[30px] h-[30px] transition-all duration-300 group-hover:text-red-600",
            }),
            h.jsx("span", {
              className:
                "txt__02 transition-all duration-300 group-hover:text-red-600",
              children: "Delete Account",
            }),
          ],
        }),
      }),
    });
  },
  IE = ({ showToastMsg: n, setIsChildLoading: l, handleErrManageUser: i }) =>
    h.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 pb-10 px-5 sm:px-10",
      children: [
        h.jsx("span", { className: "txt__03", children: "Delete Account" }),
        h.jsxs("div", {
          children: [
            h.jsx("span", {
              className: "txt__02",
              children: "This action is ",
            }),
            h.jsx("span", { className: "txt__03", children: "irreversible " }),
            h.jsx("span", {
              className: "txt__02",
              children:
                ", continuing you will delete your account and all associated data, without possibility of recovery.",
            }),
          ],
        }),
        h.jsx(WE, {
          showToastMsg: n,
          setIsChildLoading: l,
          handleErrManageUser: i,
        }),
      ],
    }),
  e_ = ({
    currUser: n,
    showToastMsg: l,
    handleErrManageUser: i,
    setCanManageAccount: r,
  }) => {
    const {
      currForm: c,
      handlePrev: f,
      handleNext: d,
      isPrevDisabled: y,
      isNextDisabled: p,
      isChildLoading: m,
      setIsChildLoading: v,
    } = ZE();
    return h.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-y-10 max-w-[600px]",
      children: [
        h.jsx("div", {
          className: `w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-5 border-orange-500 rounded-xl overflow-hidden h-fit  transition-all duration-500 ${
            c === 0
              ? "max-h-[350px]"
              : c === 1
              ? "max-h-[750px]"
              : "max-h-[350px]"
          }`,
          children: h.jsxs("div", {
            className:
              "w-[300%] grid grid-cols-3 transition-all duration-500 place-items-start justify-items-start",
            style: { transform: `translateX(-${(c * 100) / 3}%)` },
            children: [
              h.jsx(XE, {
                currUser: n,
                showToastMsg: l,
                setIsChildLoading: v,
                handleErrManageUser: i,
              }),
              h.jsx($E, {
                currUser: n,
                showToastMsg: l,
                setIsChildLoading: v,
                handleErrManageUser: i,
                setCanManageAccount: r,
              }),
              h.jsx(IE, {
                showToastMsg: l,
                setIsChildLoading: v,
                handleErrManageUser: i,
              }),
            ],
          }),
        }),
        h.jsx(jc, {
          hiddenLg: !1,
          currForm: c,
          totLen: Cd,
          bothDisabled: m,
          isPrevDisabled: y,
          isNextDisabled: p,
          handlePrev: f,
          handleNext: d,
        }),
      ],
    });
  },
  t_ = () => {
    const {
      showToastMsg: n,
      canManageAccount: l,
      currUser: i,
      handleErrManageUser: r,
      setCanManageAccount: c,
      closeToast: f,
    } = QE();
    return h.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-5 sm:gap-y-10",
      children: [
        h.jsx("span", {
          className: "txt__04",
          children: "Manage your account",
        }),
        l
          ? h.jsx(e_, {
              currUser: i,
              showToastMsg: n,
              handleErrManageUser: r,
              setCanManageAccount: c,
            })
          : h.jsx(YE, {
              handleErrManageUser: r,
              setCanManageAccount: c,
              closeToast: f,
            }),
      ],
    });
  },
  n_ = () => {
    const [n] = Ra(),
      l = gt(),
      { showToastMsg: i } = Qt(),
      { handleErrAPI: r } = en(),
      c = n.get("token"),
      f = n.get("userId"),
      d = $l(f ?? "", Rr),
      y = $l(c ?? "", Ec),
      p = d && y,
      { mutate: m } = Nt({
        mutationFn: (v) => G3(v),
        onSuccess: () => {
          i("New Email successfully verified!", "SUCCESS"),
            l("/", { replace: !0 });
        },
        onError: (v) => {
          r({ err: v, push: !0 });
        },
      });
    return (
      w.useEffect(() => {
        p && m({ token: c ?? "", userId: f ?? "" });
      }, [p, m, c, f]),
      { canStay: p }
    );
  },
  a_ = () => {
    const { canStay: n } = n_();
    return n ? h.jsx(li, {}) : h.jsx(An, { to: "/", replace: !0 });
  },
  Od = (n) => {
    const l = Math.floor(n / 60),
      i = n % 60;
    return `${(l + "").padStart(2, "0")}:${(i + "").padStart(2, "0")}`;
  },
  Dd = (n) => {
    if (!n || !Td.test(n)) return 0;
    const [l, i] = n.split(":").map((r) => +r);
    return l * 60 + i;
  },
  td = (n, l) => Dd(n) / 60 - Dd(l) / 60,
  l_ = (n) => {
    const l = new FormData(),
      { images: i, categories: r, ...c } = n;
    [...i].forEach((f) => l.append("restaurantImages", f)),
      r.forEach((f) => l.append("categories", f));
    for (const f in c)
      c[f] &&
        (["openTime", "closeTime"].includes(f)
          ? l.append(f, `${Dd(c[f]) + ""}`)
          : l.append(f, c[f]));
    return l;
  },
  s_ = async (n) => {
    const { data: l } = await Pe.post("/my-restaurants", n);
    return l;
  },
  i_ = async () => {
    const { data: n } = await Pe.get("/my-restaurants");
    return n;
  },
  r_ = async (n) => {
    const { data: l } = await Pe.get(`/my-restaurants/info-restaurant/${n}`);
    return l;
  },
  u_ = () => {
    const { showToastMsg: n } = Qt(),
      { handleErrAPI: l } = en(),
      i = qn({ mode: "onChange", defaultValues: {} });
    It(),
      w.useEffect(() => {
        i.setFocus("name");
      }, [i]);
    const { mutate: r, isPending: c } = Nt({
        mutationFn: (d) => s_(d),
        onSuccess: () => {
          n("Restaurant created successfully", "SUCCESS");
        },
        onError: (d) => {
          l({ err: d });
        },
      }),
      f = i.handleSubmit((d) => {
        const y = l_(d);
        r(y);
      });
    return { formContext: i, handleSave: f, isPending: c };
  },
  c_ = {
    id: re(),
    label: "Name",
    field: "name",
    required: !0,
    reg: A3,
    msg: "Restaurant name must be between 2 and 50 characters",
  },
  Lg = [..._c.map((n) => ({ ...n, required: !0 }))],
  Hg = Rc.filter((n) => n.field !== "phone").map((n) => ({
    ...n,
    required: !0,
  })),
  o_ = [[...Lg], [...Hg]],
  Md = 2,
  f_ = [
    {
      id: re(),
      field: "email",
      label: "Email (if different from personal)",
      place: "Your email address...",
      required: !1,
      reg: rh,
      msg: "Email must follow this pattern /^(?![.-])(?!.*[.-]$)(?!.*\\.\\.)(?!.*@.*@)[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\\.[A-Za-z]{2,}$/ 🧐",
      type: "email",
    },
    {
      id: re(),
      field: "phone",
      label: "Phone (if different from personal)",
      place: "Your phone number...",
      required: !1,
      reg: Ug,
      msg: "Phone can only contains numbers,and including country prefix up to 15 digits",
    },
    {
      id: re(),
      field: "website",
      label: "Website (if you have one)",
      place: "Your website url...",
      required: !1,
      reg: T3,
      msg: "A URL can have optionally the protocol, subdomain, must have main domain and eventually path query or fragment",
      type: "url",
    },
  ],
  d_ = [
    {
      id: re(),
      field: "openTime",
      label: "Open time",
      place: "Open time (8:00 e.g)",
      reg: Td,
      required: !0,
      msg: "Follow format HH:MM",
    },
    {
      id: re(),
      field: "closeTime",
      label: "Close time",
      place: "Close time (21:00 e.g)",
      reg: Td,
      required: !0,
      msg: "Follow the format HH:MM",
    },
  ],
  h_ = [
    "italian",
    "chinese",
    "japanese",
    "mexican",
    "indian",
    "french",
    "mediterranean",
    "fast-food",
    "vegetarian",
    "vegan",
    "seafood",
    "steakhouse",
  ],
  rl = h_.map((n) => ({
    field: n,
    id: re(),
    label:
      n === "fast-food" ? "Fast-Food" : n.charAt(0).toUpperCase() + n.slice(1),
  })),
  oc = Math.ceil(rl.length / 6),
  Bg = [];
for (let n = 0; n < (rl == null ? void 0 : rl.length) - 1; n++)
  n % 6 === 0 && Bg.push([...rl.slice(n, n + 6)]);
const m_ = [
    {
      id: re(),
      type: "number",
      field: "estTimeDelivery",
      label: "Delivery time",
      msg: "Estimated delivery time must be a decimal number not bigger than time while restaurant is open",
      required: !0,
      place: "Delivery time...",
      reg: C3,
    },
    {
      id: re(),
      type: "number",
      field: "price",
      label: "Charge for delivery",
      msg: "Delivery charge must be a decimal number with at most 2 decimal places.",
      required: !1,
      place: "Leave empty if no charge",
      reg: $y,
    },
    {
      id: re(),
      type: "number",
      field: "freeDeliveryPrice",
      label: "Amount free delivery",
      msg: "The value must be a decimal number with at most 2 decimal places.",
      required: !1,
      place: "Leave empty if no amount",
      reg: $y,
    },
  ],
  Js = ({ field: n, register: l, errors: i, customValidate: r }) => {
    var c, f;
    return h.jsxs("div", {
      className:
        "max-w-full w-full grid grid-cols-1 gap-y-3 justify-items-start",
      children: [
        h.jsxs("label", {
          className: "w-full flex flex-col gap-y-2 justify-start",
          children: [
            h.jsx("span", { className: "txt__02", children: n.label }),
            h.jsx("input", {
              type: (n == null ? void 0 : n.type) ?? "text",
              ...l(n.field, {
                required:
                  n != null && n.required ? `${n.label} is required` : !1,
                pattern: { value: n.reg, message: n.msg },
                validate: (d) => (r ? r(d) : !0),
              }),
              className: "input__base txt__02",
              placeholder:
                (n == null ? void 0 : n.place) ?? `Your ${n.label}...`,
            }),
          ],
        }),
        ((c = i == null ? void 0 : i[n.field]) == null ? void 0 : c.message) &&
          h.jsx("span", {
            className: "txt__01 text-red-600",
            children: (f = i[n.field]) == null ? void 0 : f.message,
          }),
      ],
    });
  },
  p_ = ({ formContext: n }) => {
    const {
      register: l,
      formState: { errors: i },
    } = n;
    return h.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-5",
      children: [
        h.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [h.jsx(bg, { className: "w-[35px] h-[35px]" }), "Contact"],
        }),
        h.jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10",
          children: f_.map((r) =>
            h.jsx(Js, { register: l, errors: i, field: r }, r.id)
          ),
        }),
      ],
    });
  };
function y_(n) {
  return ft({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z",
        },
        child: [],
      },
    ],
  })(n);
}
function g_(n) {
  return ft({
    attr: { viewBox: "0 0 640 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z",
        },
        child: [],
      },
    ],
  })(n);
}
function v_(n) {
  return ft({
    attr: { viewBox: "0 0 640 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M624 448H512V50.8C512 22.78 490.47 0 464 0H175.99c-26.47 0-48 22.78-48 50.8V448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM415.99 288c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32c.01 17.67-14.32 32-32 32z",
        },
        child: [],
      },
    ],
  })(n);
}
function b_(n) {
  return ft({
    attr: { viewBox: "0 0 640 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M624 448h-80V113.45C544 86.19 522.47 64 496 64H384v64h96v384h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM312.24 1.01l-192 49.74C105.99 54.44 96 67.7 96 82.92V448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h336V33.18c0-21.58-19.56-37.41-39.76-32.17zM264 288c-13.25 0-24-14.33-24-32s10.75-32 24-32 24 14.33 24 32-10.75 32-24 32z",
        },
        child: [],
      },
    ],
  })(n);
}
function x_(n) {
  return ft({
    attr: { viewBox: "0 0 576 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v208c0 44.112 35.888 80 80 80h336zm96-80V80c0-26.51-21.49-48-48-48H144c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48h384c26.51 0 48-21.49 48-48zM256 128c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-96 144l55.515-55.515c4.686-4.686 12.284-4.686 16.971 0L272 256l135.515-135.515c4.686-4.686 12.284-4.686 16.971 0L512 208v112H160v-48z",
        },
        child: [],
      },
    ],
  })(n);
}
function S_(n) {
  return ft({
    attr: { viewBox: "0 0 536 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z",
        },
        child: [],
      },
    ],
  })(n);
}
function w_(n) {
  return ft({
    attr: { viewBox: "0 0 576 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z",
        },
        child: [],
      },
    ],
  })(n);
}
function E_(n) {
  return ft({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z",
        },
        child: [],
      },
    ],
  })(n);
}
function __(n) {
  return ft({
    attr: { viewBox: "0 0 576 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z",
        },
        child: [],
      },
    ],
  })(n);
}
const R_ = ({ formContext: n }) => {
    const {
        register: l,
        watch: i,
        formState: { errors: r },
        trigger: c,
      } = n,
      f = i("openTime"),
      d = i("closeTime");
    w.useEffect(() => {
      (() => {
        td(d, f) !== 0 && (c("openTime"), c("closeTime"));
      })();
    }, [f, d, c]);
    const y = (m) => {
        const v = td(m, i("openTime"));
        return v > 0 && v < 4
          ? "You must keep open at least 4 hours (part-time)"
          : !0;
      },
      p = (m) => {
        const v = td(i("closeTime"), m);
        return v > 0 && v < 4
          ? "You must keep open at least 4 hours (part-time)"
          : !0;
      };
    return h.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-5",
      children: [
        h.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [
            h.jsx(E_, { className: "w-[35px] h-[35px]" }),
            "Opening and closing times",
          ],
        }),
        h.jsx("div", {
          className: "w-full sm:grid grid-cols-2 gap-5",
          children: d_.map((m) =>
            h.jsx(
              Js,
              {
                field: m,
                errors: r,
                register: l,
                customValidate: m.field === "closeTime" ? y : p,
              },
              m.id
            )
          ),
        }),
      ],
    });
  },
  j_ = () => {
    const [n, l] = w.useState(0),
      i = () => (n > 0 ? l((d) => d - 1) : void 0),
      r = () => (n < oc - 1 ? l((d) => d + 1) : void 0),
      c = n === 0,
      f = n === oc - 1;
    return {
      propsBtns: {
        currForm: n,
        handlePrev: i,
        handleNext: r,
        isPrevDisabled: c,
        isNextDisabled: f,
      },
    };
  },
  N_ = ({ field: n, register: l, valsChosen: i }) => {
    var c;
    const r =
      (c = i == null ? void 0 : i.includes) == null
        ? void 0
        : c.call(i, n.field);
    return h.jsxs("label", {
      className: `w-full flex items-center border-2 rounded-xl py-2 transition-all duration-300 cursor-pointer ${
        r ? "scale-105 border-orange-500" : "border-[#222]"
      }`,
      children: [
        h.jsx("input", {
          type: "checkbox",
          value: n.field,
          ...l("categories", {
            validate: (f) =>
              f != null && f.length
                ? (f == null ? void 0 : f.length) > 3
                  ? "You can chose up to 3 categories for your restaurant"
                  : !0
                : "You must chose at least one category for your restaurant",
          }),
          className: "opacity-0 w-0 h-0",
        }),
        h.jsx("span", {
          className: `txt__01 w-full flex justify-center break-all transition-all duration-300 ${
            r ? "text-orange-500" : ""
          }`,
          children: (n == null ? void 0 : n.label) ?? n.field.toUpperCase(),
        }),
      ],
    });
  },
  A_ = ({ formContext: n }) => {
    var f, d;
    const {
        register: l,
        watch: i,
        formState: { errors: r },
      } = n,
      { propsBtns: c } = j_();
    return h.jsxs("div", {
      className: "w-full flex flex-col gap-y-5",
      children: [
        h.jsx("div", {
          className: "w-full p-5 overflow-x-hidden",
          children: h.jsx("div", {
            className:
              "grid lg:max-w-full lg:gap-x-10 lg:grid-cols-2 transition-all duration-500",
            style: {
              width: `${((rl == null ? void 0 : rl.length) / 6) * 100}%`,
              gridTemplateColumns: `repeat(${oc}, 1fr)`,
              transform: `translateX(-${c.currForm * 50}%)`,
            },
            children: Bg.map((y, p) =>
              h.jsx(
                "div",
                {
                  className: `transition-all lg:opacity-100 duration-300 grid grid-cols-2 gap-x-10 gap-y-5 ${
                    c.currForm !== p ? "opacity-0" : "opacity-100"
                  }`,
                  children: y.map((m) =>
                    h.jsx(
                      N_,
                      { register: l, field: m, valsChosen: i("categories") },
                      m.id
                    )
                  ),
                },
                p
              )
            ),
          }),
        }),
        ((f = r == null ? void 0 : r.categories) == null
          ? void 0
          : f.message) &&
          h.jsx("span", {
            className: "txt__01 -mt-5 text-red-600 pl-5",
            children:
              (d = r == null ? void 0 : r.categories) == null
                ? void 0
                : d.message,
          }),
        h.jsx("div", {
          className: "w-full flex px-5",
          children: h.jsx(jc, { totLen: oc, ...c, hiddenLg: !0 }),
        }),
      ],
    });
  },
  T_ = ({ formContext: n }) =>
    h.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-5",
      children: [
        h.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [
            h.jsx(N4, { className: "w-[35px] h-[35px]" }),
            "Restaurant Category",
          ],
        }),
        h.jsx(A_, { formContext: n }),
      ],
    }),
  C_ = ({ formContext: n }) => {
    const {
      register: l,
      formState: { errors: i },
    } = n;
    return h.jsxs("div", {
      className: "w-full flex flex-col gap-5",
      children: [
        h.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [
            h.jsx(j4, { className: "h-[35px] w-[35px]" }),
            "Restaurant name",
          ],
        }),
        h.jsx("div", {
          className:
            "w-full justify-self-start grid lg:grid-cols-2 gap-y-3 gap-x-10",
          children: h.jsx(Js, { field: c_, register: l, errors: i }),
        }),
      ],
    });
  },
  O_ = ({ trigger: n, setValue: l, images: i, img: r }) => ({
    handleRemoveExistingFile: () => {
      const d = [...i].filter((y) => y !== r);
      l("images", d), n("images");
    },
    handleRemoveExistingImgUploaded: () => {
      const d = i.filter((y) => y._id !== r._id);
      l("images", d), n("images");
    },
  }),
  D_ = ({ img: n, trigger: l, images: i, setValue: r }) => {
    const { handleRemoveExistingFile: c, handleRemoveExistingImgUploaded: f } =
      O_({ img: n, trigger: l, images: i, setValue: r });
    return h.jsxs("div", {
      onClick: n instanceof File ? c : f,
      className:
        "min-w-[100px] max-w-[100px] sm:min-w-[200px] sm:max-w-[200px] h-[100px] sm:h-[200px] snap-center relative group cursor-pointer",
      children: [
        n &&
          h.jsx("img", {
            className: "w-full h-full",
            src:
              n instanceof File
                ? URL.createObjectURL(n)
                : n == null
                ? void 0
                : n.url,
            alt: "",
          }),
        h.jsx("div", {
          className:
            "absolute inset-0 bg-black/70 opacity-0 transition-all duration-300 group-hover:opacity-100",
        }),
        h.jsxs("div", {
          className:
            "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full flex justify-center items-center z-20 gap-4 transition-all duration-300 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100  group-hover:scale-120",
          children: [
            h.jsx(j1, { className: "w-[30px] h-[30px] text-red-600" }),
            h.jsx("span", {
              className: "txt__01 text-red-600",
              children: "Remove",
            }),
          ],
        }),
      ],
    });
  },
  M_ = ({ register: n, watch: l }) =>
    h.jsx("div", {
      className: "w-full grid ",
      children: h.jsxs("label", {
        className: "w-fit grid relative",
        children: [
          h.jsx("input", {
            type: "file",
            multiple: !0,
            className: "opacity-0 absolute",
            ...n("images", {
              validate: () => {
                const i = l("images");
                return i != null && i.length
                  ? (i == null ? void 0 : i.length) > 5
                    ? "You can upload up to 5 images"
                    : !0
                  : "You should upload at least one img";
              },
            }),
          }),
          h.jsxs("button", {
            type: "button",
            onClick: (i) => {
              var r, c;
              (c =
                (r = i == null ? void 0 : i.currentTarget) == null
                  ? void 0
                  : r.previousElementSibling) == null || c.click();
            },
            className:
              "w-full flex items-center gap-3 group transition-all duration-300 hover:scale-110 hover:text-orange-500 pl-5 pr-14 py-2 border-[3px] border-orange-500 rounded-xl cursor-pointer justify-self-start",
            children: [
              h.jsx(g_, { className: "h-[35px] w-[35px]" }),
              h.jsx("span", { className: "txt__02", children: "Upload" }),
            ],
          }),
        ],
      }),
    }),
  U_ = ({ formContext: n }) => {
    var y;
    const {
        register: l,
        formState: { errors: i },
        watch: r,
        trigger: c,
        setValue: f,
      } = n,
      d = r("images");
    return h.jsxs("div", {
      className: "w-full flex flex-col gap-5",
      children: [
        h.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [
            h.jsx(x_, { className: "h-[35px] w-[35px]" }),
            "Restaurant images",
          ],
        }),
        h.jsx("div", {
          className: `w-full flex flex-row overflow-x-auto snap-x snap-mandatory gap-5 sm:gap-10 hide_scrollbar border-[3px] rounded-xl transition-all duration-300 ${
            (y = r("images")) != null && y.length
              ? "max-h-[500px] p-5 sm:p-8 border-orange-500 "
              : "max-h-0 border-transparent"
          }`,
          children:
            !!(d != null && d.length) &&
            [...d].map((p, m) =>
              h.jsx(D_, { img: d[m], trigger: c, images: d, setValue: f }, m)
            ),
        }),
        h.jsx(M_, { register: l, watch: r }),
        (i == null ? void 0 : i.images) &&
          h.jsx("span", {
            className: "txt__01 text-red-600",
            children: i.images.message,
          }),
      ],
    });
  },
  z_ = ({ formContext: n }) => {
    const {
        register: l,
        formState: { errors: i },
        watch: r,
        trigger: c,
      } = n,
      f = r("price");
    w.useEffect(() => {
      f && c("freeDeliveryPrice");
    }, [f, c]);
    const d = (p) => {
        const m = +r("closeTime") - +r("openTime");
        return m > 0 && m < +p
          ? "Delivery time can not take more than your business activity"
          : !0;
      },
      y = (p) =>
        !r("price") && p
          ? "You can not set a free delivery without a delivery charge"
          : !0;
    return h.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-5",
      children: [
        h.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [h.jsx(vg, { className: "w-[40px] h-[40px]" }), "Delivery"],
        }),
        h.jsx("div", {
          className:
            "w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-10 lg:grid-cols-3",
          children: m_.map((p) =>
            h.jsx(
              Js,
              {
                register: l,
                errors: i,
                field: p,
                customValidate:
                  p.field === "estTimeDelivery"
                    ? d
                    : p.field === "freeDeliveryPrice"
                    ? y
                    : void 0,
              },
              p.id
            )
          ),
        }),
      ],
    });
  },
  L_ = ({ currForm: n, formContext: l }) => {
    const {
      register: i,
      formState: { errors: r },
    } = l;
    return h.jsx("div", {
      className: "overflow-hidden py-5",
      children: h.jsxs("div", {
        className:
          "w-[200%] flex transition-all duration-500 justify-items-start items-start h-fit lg:grid lg:grid-cols-2 lg:w-full lg:gap-10",
        style: {
          transform: `translateX(-${n * 50}%)`,
          maxHeight: n === 0 ? "600px" : "275px",
        },
        children: [
          h.jsx("div", {
            className:
              "w-full flex gap-y-5 flex-col max-h-fit px-2 sm:px-5 lg:p-0",
            children: Lg.map((c) =>
              h.jsx(Js, { register: i, errors: r, field: c }, c.id)
            ),
          }),
          h.jsx("div", {
            className:
              "w-full flex gap-y-5 flex-col max-h-fit px-2 sm:px-5 lg:p-0",
            children: Hg.map((c) =>
              h.jsx(Js, { register: i, errors: r, field: c }, c.id)
            ),
          }),
        ],
      }),
    });
  };
function Vg(n) {
  return ft({
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-.899.156-1.762.431-2.569L6 11l2 2v2l2 2 1 1v1.931C7.061 19.436 4 16.072 4 12zm14.33 4.873C17.677 16.347 16.687 16 16 16v-1a2 2 0 0 0-2-2h-4v-3a2 2 0 0 0 2-2V7h1a2 2 0 0 0 2-2v-.411C17.928 5.778 20 8.65 20 12a7.947 7.947 0 0 1-1.67 4.873z",
        },
        child: [],
      },
    ],
  })(n);
}
function H_(n) {
  return ft({
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M21 15c0-4.625-3.507-8.441-8-8.941V4h-2v2.059c-4.493.5-8 4.316-8 8.941v2h18v-2zM2 18h20v2H2z",
        },
        child: [],
      },
    ],
  })(n);
}
const B_ = ({ watch: n }) => {
    const [l, i] = w.useState(0),
      [r, c] = w.useState(!1),
      d = o_[l].map((b) => ({ val: n(b.field), reg: b.reg }));
    w.useEffect(() => {
      (() => {
        c(!1);
        for (const E of d) E.reg.test(E.val) || c(!0);
      })();
    }, [l, n, d]);
    const y = () => (l > 0 ? i((b) => b - 1) : void 0),
      p = () => (l < Md - 1 ? i((b) => b + 1) : void 0),
      m = l === 0,
      v = r || l === Md - 1;
    return {
      currForm: l,
      buttonsProps: {
        handlePrev: y,
        handleNext: p,
        isPrevDisabled: m,
        isNextDisabled: v,
      },
    };
  },
  V_ = ({ formContext: n }) => {
    const { buttonsProps: l, currForm: i } = B_({ watch: n.watch });
    return h.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-5",
      children: [
        h.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [
            h.jsx(Vg, { className: "w-[35px] h-[35px]" }),
            "Restaurant Address",
          ],
        }),
        h.jsxs("div", {
          className:
            "w-full grid grid-cols-1 border-[3px] rounded-xl border-orange-500 lg:border-0 lg:p-0 p-5 pb-10 gap-y-8",
          children: [
            h.jsx(L_, { currForm: i, formContext: n }),
            h.jsx(jc, { ...l, currForm: i, totLen: Md, hiddenLg: !0 }),
          ],
        }),
      ],
    });
  },
  qg = ({ formContext: n, handleSave: l, isPending: i }) =>
    h.jsxs("form", {
      onSubmit: l,
      className: "w-full grid grid-cols-1 justify-items-center gap-y-10",
      children: [
        h.jsx(C_, { formContext: n }),
        h.jsx(U_, { formContext: n }),
        h.jsx(V_, { formContext: n }),
        h.jsx(p_, { formContext: n }),
        h.jsx(R_, { formContext: n }),
        h.jsx(T_, { formContext: n }),
        h.jsx(z_, { formContext: n }),
        h.jsx("div", {
          className: "max-w-[300px] justify-center mt-10",
          children: h.jsx(kn, {
            label: "Create Restaurant",
            type: "submit",
            styleTxt: "txt__02",
            isPending: i,
          }),
        }),
      ],
    }),
  q_ = () => {
    const { formContext: n, handleSave: l, isPending: i } = u_();
    return h.jsx(jg, {
      ...n,
      children: h.jsxs("div", {
        className: "w-full grid grid-cols-1 justify-items-center gap-y-5",
        children: [
          h.jsx("span", {
            className: "txt__04",
            children: "Create new restaurant",
          }),
          h.jsx(qg, { formContext: n, handleSave: l, isPending: i }),
        ],
      }),
    });
  },
  k_ = () => {
    const { isLogged: n } = Pt();
    return n ? h.jsx(Sr, {}) : h.jsx(An, { to: "/", replace: !0 });
  },
  F_ = () => {
    const { isLogged: n } = Pt();
    return n ? h.jsx(Sr, {}) : h.jsx(An, { to: "/", replace: !0 });
  },
  Q_ = () => {
    const { isLogged: n } = Pt();
    return n ? h.jsx(An, { to: "/", replace: !0 }) : h.jsx(Sr, {});
  },
  P_ = () => {
    const { handleErrAPI: n } = en();
    It();
    const {
      data: l,
      isPending: i,
      isSuccess: r,
      isError: c,
      error: f,
    } = mc({ queryKey: ["myRestaurants"], queryFn: i_ });
    w.useEffect(() => {
      c && n({ err: f });
    }, [n, c, f, r, l]);
    const { restaurants: d, totRestaurants: y } = l ?? {};
    return { isPending: i, restaurants: d, totRestaurants: y };
  },
  Y_ = ({ txt: n }) =>
    h.jsx("div", {
      className: "w-full flex flex-col h-[30vh] justify-center items-center",
      children: h.jsx("span", { className: "txt__03", children: n }),
    });
function G_(n) {
  return ft({
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "g",
        attr: { id: "Database" },
        child: [
          {
            tag: "path",
            attr: {
              d: "M12,2.06c-3.53,0-6.18,1.23-6.18,2.86V19.08c0,1.63,2.65,2.86,6.18,2.86s6.18-1.23,6.18-2.86V4.92C18.18,3.29,15.52,2.06,12,2.06Zm5.18,17.02c0,.78-1.97,1.86-5.18,1.86s-5.18-1.08-5.18-1.86V15.96A9.349,9.349,0,0,0,12,17.22a9.373,9.373,0,0,0,5.18-1.26Zm0-4.72c0,.78-1.97,1.86-5.18,1.86s-5.18-1.08-5.18-1.86V11.24A9.349,9.349,0,0,0,12,12.5a9.373,9.373,0,0,0,5.18-1.26Zm0-4.72c0,.78-1.97,1.86-5.18,1.86S6.82,10.42,6.82,9.64V6.52A9.349,9.349,0,0,0,12,7.78a9.373,9.373,0,0,0,5.18-1.26ZM12,6.78c-3.21,0-5.18-1.08-5.18-1.86S8.79,3.06,12,3.06s5.18,1.08,5.18,1.86S15.21,6.78,12,6.78Z",
            },
            child: [],
          },
        ],
      },
    ],
  })(n);
}
function X_(n) {
  return ft({
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "g",
        attr: { id: "Delivery_Truck" },
        child: [
          {
            tag: "g",
            attr: {},
            child: [
              {
                tag: "path",
                attr: {
                  d: "M21.47,11.185l-1.03-1.43a2.5,2.5,0,0,0-2.03-1.05H14.03V6.565a2.5,2.5,0,0,0-2.5-2.5H4.56a2.507,2.507,0,0,0-2.5,2.5v9.94a1.5,1.5,0,0,0,1.5,1.5H4.78a2.242,2.242,0,0,0,4.44,0h5.56a2.242,2.242,0,0,0,4.44,0h1.22a1.5,1.5,0,0,0,1.5-1.5v-3.87A2.508,2.508,0,0,0,21.47,11.185ZM7,18.935a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,7,18.935Zm6.03-1.93H9.15a2.257,2.257,0,0,0-4.3,0H3.56a.5.5,0,0,1-.5-.5V6.565a1.5,1.5,0,0,1,1.5-1.5h6.97a1.5,1.5,0,0,1,1.5,1.5ZM17,18.935a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,17,18.935Zm3.94-2.43a.5.5,0,0,1-.5.5H19.15a2.257,2.257,0,0,0-4.3,0h-.82v-7.3h4.38a1.516,1.516,0,0,1,1.22.63l1.03,1.43a1.527,1.527,0,0,1,.28.87Z",
                },
                child: [],
              },
              {
                tag: "path",
                attr: {
                  d: "M18.029,12.205h-2a.5.5,0,0,1,0-1h2a.5.5,0,0,1,0,1Z",
                },
                child: [],
              },
            ],
          },
        ],
      },
    ],
  })(n);
}
const Z_ = ({ id: n }) =>
  h.jsxs("div", {
    className:
      "border-b-2 border-orange-500 w-full grid grid-cols-[75px_1fr] justify-items-center",
    children: [
      h.jsxs("div", {
        className: "w-full flex gap-2 items-center px-3 py-2",
        children: [
          h.jsx(G_, {
            className: "text-orange-500 min-w-[25px] min-h-[25px] -ml-2",
          }),
          h.jsx("span", { className: "txt__02 ", children: "ID:" }),
        ],
      }),
      h.jsx("div", {
        className:
          "w-full flex justify-start items-center overflow-x-auto hide_scrollbar",
        children: h.jsx("span", { className: "txt__01", children: n }),
      }),
    ],
  });
function K_(n) {
  return ft({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M357.57 223.94a79.48 79.48 0 0 0 56.58-23.44l77-76.95c6.09-6.09 6.65-16 .85-22.39a16 16 0 0 0-23.17-.56l-68.63 68.58a12.29 12.29 0 0 1-17.37 0c-4.79-4.78-4.53-12.86.25-17.64l68.33-68.33a16 16 0 0 0-.56-23.16A15.62 15.62 0 0 0 440.27 56a16.71 16.71 0 0 0-11.81 4.9l-68.27 68.26a12.29 12.29 0 0 1-17.37 0c-4.78-4.78-4.53-12.86.25-17.64l68.33-68.31a16 16 0 0 0-.56-23.16A15.62 15.62 0 0 0 400.26 16a16.73 16.73 0 0 0-11.81 4.9L311.5 97.85a79.49 79.49 0 0 0-23.44 56.59v8.23a16 16 0 0 1-4.69 11.33l-35.61 35.62a4 4 0 0 1-5.66 0L68.82 36.33a16 16 0 0 0-22.58-.06C31.09 51.28 23 72.47 23 97.54c-.1 41.4 21.66 89 56.79 124.08l85.45 85.45A64.79 64.79 0 0 0 211 326a64 64 0 0 0 16.21-2.08 16.24 16.24 0 0 1 4.07-.53 15.93 15.93 0 0 1 10.83 4.25l11.39 10.52a16.12 16.12 0 0 1 4.6 11.23v5.54a47.73 47.73 0 0 0 13.77 33.65l90.05 91.57.09.1a53.29 53.29 0 0 0 75.36-75.37L302.39 269.9a4 4 0 0 1 0-5.66L338 228.63a16 16 0 0 1 11.32-4.69z",
        },
        child: [],
      },
      {
        tag: "path",
        attr: {
          d: "M211 358a97.32 97.32 0 0 1-68.36-28.25l-13.86-13.86a8 8 0 0 0-11.3 0l-85 84.56c-15.15 15.15-20.56 37.45-13.06 59.29a30.63 30.63 0 0 0 1.49 3.6C31 484 50.58 496 72 496a55.68 55.68 0 0 0 39.64-16.44L225 365.66a4.69 4.69 0 0 0 1.32-3.72v-.26a4.63 4.63 0 0 0-5.15-4.27A97.09 97.09 0 0 1 211 358z",
        },
        child: [],
      },
    ],
  })(n);
}
const $_ = (...n) => [
    { id: re(), label: "Location", vals: n[0], icon: Vg },
    { id: re(), label: "Contact", vals: n[1], icon: bg },
    { id: re(), label: "Categories", vals: n[2], icon: K_ },
  ],
  J_ = { id: re(), label: "Open Hours", icon: y_ },
  W_ = (...n) => [
    { id: re(), icon: b_, val: Od(n[0]) },
    { id: re(), icon: v_, val: Od(n[1]) },
  ],
  I_ = { id: re(), label: "Delivery", icon: vg },
  e6 = (...n) => [
    { id: re(), label: "Delivery time", val: n[0] },
    { id: re(), label: "Price", val: n[1] },
    { id: re(), label: "Free meal", val: n[2] },
  ],
  t6 = (...n) => [
    { id: re(), label: "Dishes", icon: H_, val: n[0] },
    { id: re(), label: "Orders", icon: X_, val: n[2] },
    { id: re(), label: "Reviews", icon: A4, val: n[1] },
  ],
  nd = ({ el: n, children: l }) => {
    var m;
    const [i, r] = w.useState(!1),
      [c, f] = w.useState(!1),
      d = w.useRef(null),
      y = () => {
        d.current && clearTimeout(d.current), r(!0);
      },
      p = () => {
        d.current = setTimeout(() => {
          r(!1);
        }, 250);
      };
    return h.jsxs("div", {
      className:
        "w-full grid grid-cols-1 transition-all duration-300 relative px-3",
      children: [
        h.jsxs("div", {
          onClick: () => {
            r(!i), f(!c);
          },
          onMouseEnter: y,
          onMouseLeave: p,
          className:
            "w-full flex justify-between items-center py-1 group cursor-pointer transition-all duration-300",
          children: [
            h.jsxs("div", {
              className:
                " transition-all duration-300 group-hover:text-orange-500 flex gap-3 items-center",
              children: [
                h.jsx(n.icon, { className: "w-[25px] h-[25px]" }),
                h.jsx("span", { className: "txt__01", children: n.label }),
              ],
            }),
            h.jsx(aS, {
              className: `w-[35px] h-[35px] transition-all duration-300 group-hover:text-orange-500 ${
                c || i ? "rotate-180" : ""
              }`,
            }),
          ],
        }),
        h.jsx("ul", {
          onMouseEnter: y,
          onMouseLeave: p,
          className: `w-[80%] right-0 max-h-fit grid py-1 border-2 border-orange-500 rounded-xl bg-[#111] transition-all duration-500 absolute  ${
            ["Categories", "Open Hours"].includes(n.label)
              ? "grid-cols-2"
              : " grid-cols-1 gap-1"
          } ${
            c || i
              ? "opacity-100 -translate-y-full pointer-events-auto"
              : "translate-y-full opacity-0 pointer-events-none"
          }`,
          children:
            l ??
            ((m = n == null ? void 0 : n.vals) == null
              ? void 0
              : m.map((v, b) =>
                  h.jsx(
                    "li",
                    {
                      className:
                        "px-3 transition-all duration-300 truncate pointer-events-none cursor-pointer",
                      children: h.jsx("span", {
                        className: "txt__01",
                        children: v,
                      }),
                    },
                    b
                  )
                )),
        }),
      ],
    });
  },
  n6 = (n) =>
    n
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(n)
      : "Free",
  a6 = ({ rest: n }) => {
    const [l, i] = w.useState(!1);
    return h.jsxs(h.Fragment, {
      children: [
        h.jsxs("div", {
          onClick: () => i(!l),
          className:
            "w-full flex justify-between border-b-2 border-orange-500 group cursor-pointer items-center px-3 py-1",
          children: [
            h.jsx("span", {
              className:
                "txt__02 transition-all duration-300 group-hover:text-orange-500",
              children: "Details",
            }),
            h.jsx(Jx, {
              className: `min-w-[40px] min-h-[40px] transition-all duration-300 group-hover:text-orange-500 ${
                l ? "rotate-180" : ""
              }`,
            }),
          ],
        }),
        h.jsxs("div", {
          className: `w-full transition-all duration-300 grid grid-cols-1 gap-1 ${
            l
              ? "opacity-100 max-h-[500px] pointer-events-auto"
              : "opacity-0 max-h-0 pointer-events-none"
          }`,
          children: [
            $_(
              Object.values(n.address),
              Object.values(n.contact),
              n.categories
            ).map((r, c) => h.jsx(nd, { el: r }, c)),
            h.jsx(nd, {
              el: J_,
              children: W_(...Object.values(n.openHours)).map((r, c) =>
                h.jsxs(
                  "li",
                  {
                    className:
                      "px-3 transition-all duration-300 truncate pointer-events-none cursor-pointer flex items-center gap-3",
                    children: [
                      h.jsx(r.icon, { className: "w-[25px] h-[25px]" }),
                      h.jsx("span", { className: "txt__01", children: r.val }),
                    ],
                  },
                  c
                )
              ),
            }),
            h.jsx(nd, {
              el: I_,
              children: e6(...Object.values(n.delivery)).map((r, c) =>
                r.label === "Free meal" && !r.val
                  ? null
                  : h.jsxs(
                      "li",
                      {
                        className:
                          "px-3 transition-all duration-300 truncate pointer-events-none cursor-pointer grid grid-cols-[125px_1fr]",
                        children: [
                          h.jsx("span", {
                            className: "txt__01",
                            children: r.label,
                          }),
                          h.jsx("span", {
                            className: "txt__01",
                            children:
                              r.label !== "Delivery time"
                                ? n6(r.val)
                                : `${r.val} minutes`,
                          }),
                        ],
                      },
                      c
                    )
              ),
            }),
          ],
        }),
      ],
    });
  },
  l6 = ({ el: n }) =>
    h.jsxs("div", {
      className:
        "w-full grid grid-cols-[120px_20px_1fr] gap-5 items-center py-1 px-3",
      children: [
        h.jsxs("div", {
          className: "flex w-full items-center gap-3",
          children: [
            h.jsx(n.icon, { className: "min-w-[30px] min-h-[30px]" }),
            h.jsx("span", { className: "txt__01", children: n.label }),
          ],
        }),
        h.jsx("span", {
          className: "txt__02 text-center justify-self-center",
          children: n.val,
        }),
        h.jsx(cl, {
          to: "/",
          className:
            "txt__02 justify-self-end transition-all duration-300 cursor-pointer hover:text-orange-500 hover:scale-110 border-2 rounded-xl py-1 border-orange-500 w-full max-w-[120px] text-center",
          children: "View",
        }),
      ],
    }),
  s6 = ({ url: n, name: l }) =>
    h.jsxs("div", {
      className: "w-full flex justify-center relative mb-1",
      children: [
        h.jsx("div", {
          className:
            "w-full absolute top-0 left-0 flex justify-start h-[50px] bg-black/90 items-center ",
          children: h.jsx("span", {
            className: "txt__03 px-3 overflow-x-auto hide_scrollbar",
            children: l,
          }),
        }),
        h.jsx("div", {
          className:
            "w-full min-w-[200px] max-w-[700px] h-full min-h-[40vw] max-h-[40vw] md:min-h-[250px] md:max-h-[250px] rounded-xl overflow-hidden aspect-[16/9]",
          children: h.jsx("img", {
            src: n,
            alt: "Your main img uploaded",
            className: "w-full h-full object-cover",
          }),
        }),
      ],
    });
function i6(n) {
  return ft({
    attr: { viewBox: "0 0 640 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32l0 192c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-192c0-17.7-14.3-32-32-32l-128 0zM32 320c-17.7 0-32 14.3-32 32L0 480c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L32 320zm416 96l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-128 0c-17.7 0-32 14.3-32 32z",
        },
        child: [],
      },
    ],
  })(n);
}
const r6 = ({ rating: n }) =>
    h.jsxs("div", {
      className: "w-full py-2 px-3 grid grid-cols-[125px_1fr]",
      children: [
        h.jsxs("div", {
          className: "flex w-full items-center gap-3",
          children: [
            h.jsx(i6, { className: "min-w-[30px] min-h-[30px]" }),
            h.jsx("span", { className: "txt__01", children: "Rating" }),
          ],
        }),
        h.jsx("div", {
          className: "w-full flex gap-2 items-center",
          children: Array.from({ length: 5 }).map((l, i) =>
            n > i + 1
              ? h.jsx(w_, { className: "w-[25px] h-[25px]" }, i)
              : i === Math.floor(n) && n % 1 >= 0.5
              ? h.jsx(S_, { className: "w-[25px] h-[25px]" }, i)
              : h.jsx(__, { className: "w-[25px] h-[25px]" }, i)
          ),
        }),
      ],
    }),
  u6 = ({ rest: n }) =>
    h.jsxs("div", {
      className:
        "w-full grid grid-cols-1 border-2 rounded-xl border-orange-500 max-w-fit place-content-start justify-items-start items-start pt-1 pb-5",
      children: [
        h.jsxs("div", {
          className: "w-full flex flex-col",
          children: [
            h.jsx(Z_, { id: n._id }),
            h.jsx(s6, { name: n.name, url: n.images[0].url }),
            h.jsx(a6, { rest: n }),
            h.jsx("div", {
              className: "w-full mt-3 ",
              children: t6(n.dishesCount, n.ordersCount, n.reviewsCount).map(
                (l) => h.jsx(l6, { el: l }, l.id)
              ),
            }),
            h.jsx(r6, { rating: n.avgRating }),
          ],
        }),
        h.jsx("div", {
          className:
            "w-full max-w-fit justify-center justify-self-center flex mt-5",
          children: h.jsx(cl, {
            to: `/my-restaurants/update/${n._id}`,
            className:
              "txt__02 border-2 border-orange-500 rounded-xl px-12 py-1 transition-all duration-300 hover:text-orange-500 hover:scale-110 cursor-pointer",
            children: "View Details",
          }),
        }),
      ],
    }),
  c6 = () => {
    const { isPending: n, restaurants: l, totRestaurants: i } = P_();
    return h.jsxs("div", {
      className: "w-full grid grid-cols-1 justify-items-center",
      children: [
        h.jsx("span", { className: "txt__04", children: "My Restaurants" }),
        n
          ? h.jsx(li, {})
          : i
          ? h.jsx("div", {
              className:
                "w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center mt-8 gap-5 place-content-start items-start",
              children:
                l == null
                  ? void 0
                  : l.map((r) => h.jsx(u6, { rest: r }, r._id)),
            })
          : h.jsx(Y_, {
              txt: "It seems you do not have any restaurants right now 🧐",
            }),
      ],
    });
  },
  o6 = () => {
    const { restId: n } = Gb(),
      l = Rr.test(n ?? "");
    It();
    const { handleErrAPI: i } = en(),
      r = qn({ mode: "onChange" });
    w.useEffect(() => {
      r.setFocus("name");
    }, [r]);
    const {
      data: c,
      isPending: f,
      isSuccess: d,
      isError: y,
      error: p,
    } = mc({
      queryFn: () => r_(n ?? ""),
      queryKey: ["infoMyRestaurant"],
      enabled: l,
    });
    return (
      w.useEffect(() => {
        if ((y && i({ err: p }), d)) {
          const { restaurant: m } = c ?? {};
          r.setValue("name", (m == null ? void 0 : m.name) ?? ""),
            r.setValue("images", (m == null ? void 0 : m.images) ?? []),
            r.setValue("categories", (m == null ? void 0 : m.categories) ?? []);
          for (const v in m == null ? void 0 : m.address)
            r.setValue(`${v}`, m == null ? void 0 : m.address[v]);
          for (const v in m == null ? void 0 : m.contact)
            r.setValue(`${v}`, m == null ? void 0 : m.contact[v]);
          for (const v in m == null ? void 0 : m.delivery)
            r.setValue(`${v}`, m == null ? void 0 : m.delivery[v]);
          for (const v in m == null ? void 0 : m.openHours)
            r.setValue(`${v}`, Od(m == null ? void 0 : m.openHours[v]));
        }
      }, [p, y, i, d, c, r]),
      { formContext: r, canStay: l, isPendingInfo: f }
    );
  },
  f6 = () => {
    const { formContext: n, canStay: l, isPendingInfo: i } = o6();
    return l
      ? i
        ? h.jsx(li, {})
        : h.jsx(jg, {
            ...n,
            children: h.jsxs("div", {
              className: "w-full grid grid-cols-1 justify-items-center gap-y-5",
              children: [
                h.jsx("span", {
                  className: "txt__04",
                  children: "Update your restaurant",
                }),
                h.jsx(qg, { formContext: n }),
              ],
            }),
          })
      : h.jsx(An, { to: "/", replace: !0 });
  },
  d6 = () => (
    K3(),
    h.jsxs(rx, {
      children: [
        h.jsxs(at, {
          path: "/",
          element: h.jsx(B3, {}),
          children: [
            h.jsx(at, { index: !0, element: h.jsx(Fx, {}) }),
            h.jsxs(at, {
              path: "auth",
              element: h.jsx(Q_, {}),
              children: [
                h.jsx(at, { path: "login", element: h.jsx(aE, {}) }),
                h.jsx(at, { path: "register", element: h.jsx(dE, {}) }),
                h.jsx(at, { path: "send-email", element: h.jsx(pE, {}) }),
                h.jsx(at, { path: "verify", element: h.jsx(bE, {}) }),
                h.jsx(at, { path: "recover-pwd", element: h.jsx(SE, {}) }),
              ],
            }),
            h.jsxs(at, {
              path: "user",
              element: h.jsx(k_, {}),
              children: [
                h.jsx(at, { path: "profile", element: h.jsx(BE, {}) }),
                h.jsx(at, { path: "manage-account", element: h.jsx(t_, {}) }),
              ],
            }),
            h.jsx(at, { path: "verify-new-email", element: h.jsx(a_, {}) }),
            h.jsx(at, { path: "notice-email", element: h.jsx(q3, {}) }),
            h.jsxs(at, {
              path: "newsletter",
              element: h.jsx($3, {}),
              children: [
                h.jsx(at, {
                  path: "verify-unsubscribe",
                  element: h.jsx(qE, {}),
                }),
                h.jsx(at, {
                  path: "notice-unsubscribe-with-retry",
                  element: h.jsx(FE, {}),
                }),
              ],
            }),
            h.jsxs(at, {
              path: "my-restaurants",
              element: h.jsx(F_, {}),
              children: [
                h.jsx(at, { index: !0, element: h.jsx(c6, {}) }),
                h.jsx(at, { path: "add-restaurant", element: h.jsx(q_, {}) }),
                h.jsx(at, { path: "update/:restId", element: h.jsx(f6, {}) }),
              ],
            }),
          ],
        }),
        h.jsx(at, { path: "*", element: h.jsx(An, { to: "/", replace: !0 }) }),
      ],
    })
  ),
  kg = "SET_IS_POPUP",
  Fg = { popup: null },
  h6 = (n, l) => {
    switch (l.type) {
      case kg: {
        const i = l.payload;
        return i ? { popup: i } : Fg;
      }
      default:
        return n;
    }
  },
  Ud = "SET_IS_TOAST",
  m6 = (n, l) => {
    const { isToast: i, msg: r, type: c } = l.payload;
    if (!i) return { ...n, isToast: i };
    if (i && [r, c].some((f) => !f))
      throw new Error("Missing fields " + l.type);
    return { ...n, isToast: i, msg: r ?? "", type: c ?? "SUCCESS" };
  },
  p6 = (n, l) => {
    switch (l.type) {
      case Ud:
        return m6(n, l);
      default:
        return n;
    }
  },
  zd = "SET_IS_LOGGED",
  Ld = "SET_CURR_USER",
  Hd = "SET_CAN_MANAGE_ACCOUNT",
  y6 = (n, l) => {
    switch (l.type) {
      case zd:
        return { ...n, isLogged: l.payload };
      case Ld:
        return { ...n, currUser: l.payload };
      case Hd:
        return { ...n, canManageAccount: l.payload };
      default:
        return n;
    }
  },
  g6 = (n, l) => ({
    toastState: p6(n.toastState, l),
    userState: y6(n.userState, l),
    popupState: h6(n.popupState, l),
  }),
  v6 = { isToast: !1, msg: "", type: "SUCCESS" },
  b6 = {
    currUser: null,
    isLogged: !!sessionStorage.getItem("accessToken"),
    canManageAccount: !!sessionStorage.getItem("manageAccountToken"),
  },
  x6 = { toastState: v6, userState: b6, popupState: Fg },
  S6 = (n, l) => {
    const i = () => l({ type: Ud, payload: { isToast: !1 } }),
      r = w.useCallback(
        (c, f) => {
          setTimeout(() => {
            l({ type: Ud, payload: { isToast: !0, msg: c, type: f } });
          }, 250);
        },
        [l]
      );
    return { closeToast: i, showToastMsg: r, ...n };
  },
  w6 = (n) => {
    var l, i;
    return (
      ((l = n.firstName.slice(0, 1)) == null ? void 0 : l.toUpperCase()) +
      ((i = n.lastName.slice(0, 1)) == null ? void 0 : i.toUpperCase())
    );
  },
  E6 = (n, l) => {
    const i = w.useCallback(
        (d) => {
          d
            ? sessionStorage.setItem("accessToken", d)
            : sessionStorage.removeItem("accessToken"),
            l({ type: zd, payload: !!d });
        },
        [l]
      ),
      r = w.useCallback(
        ({ user: d }) => {
          d
            ? sessionStorage.getItem("initName") ||
              sessionStorage.setItem("initName", w6(d))
            : sessionStorage.removeItem("initName"),
            l({ type: Ld, payload: d });
        },
        [l]
      ),
      c = w.useCallback(
        (d) => {
          d
            ? sessionStorage.setItem("manageAccountToken", d)
            : sessionStorage.removeItem("manageAccountToken"),
            l({ type: Hd, payload: !!d });
        },
        [l]
      ),
      f = w.useCallback(() => {
        sessionStorage.removeItem("accessToken"),
          sessionStorage.removeItem("manageAccountToken"),
          sessionStorage.removeItem("initName"),
          l({ type: zd, payload: !1 }),
          l({ type: Ld, payload: null }),
          l({ type: Hd, payload: !1 });
      }, [l]);
    return {
      ...n,
      setCurrUser: r,
      setUserLogged: i,
      setCanManageAccount: c,
      logoutUser: f,
    };
  },
  _6 = (n, l) => ({
    setPopup: w.useCallback((r) => l({ type: kg, payload: r }), [l]),
    ...n,
  }),
  R6 = () => {
    const [n, l] = w.useReducer(g6, x6),
      i = S6(n.toastState, l),
      r = E6(n.userState, l),
      c = _6(n.popupState, l);
    return { toastState: { ...i }, userState: { ...r }, popupState: { ...c } };
  },
  j6 = ({ children: n }) =>
    h.jsx(T1.Provider, { value: { ...R6() }, children: n }),
  N6 = new c5({
    defaultOptions: {
      queries: { retry: !1, refetchOnWindowFocus: !1 },
      mutations: { retry: !1 },
    },
  });
mb.createRoot(document.getElementById("root")).render(
  h.jsx(Dx, {
    children: h.jsx(m5, {
      client: N6,
      children: h.jsx(j6, { children: h.jsx(d6, {}) }),
    }),
  })
);

var s = Object.create;
var j = Object.defineProperty
  , t = Object.defineProperties
  , u = Object.getOwnPropertyDescriptor
  , v = Object.getOwnPropertyDescriptors
  , w = Object.getOwnPropertyNames
  , k = Object.getOwnPropertySymbols
  , q = Object.getPrototypeOf
  , o = Object.prototype.hasOwnProperty
  , r = Object.prototype.propertyIsEnumerable
  , x = Reflect.get;
var n = (b, a) => (a = Symbol[b]) ? a : Symbol.for("Symbol." + b)
  , y = b => {
    throw TypeError(b)
}
;
var p = (b, a, c) => a in b ? j(b, a, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: c
}) : b[a] = c
  , A = (b, a) => {
    for (var c in a ||= {})
        o.call(a, c) && p(b, c, a[c]);
    if (k)
        for (var c of k(a))
            r.call(a, c) && p(b, c, a[c]);
    return b
}
  , B = (b, a) => t(b, v(a));
var C = b => a => {
    var c = b[a];
    if (c)
        return c();
    throw new Error("Module not found in bundle: " + a)
}
;
var D = (b, a) => {
    var c = {};
    for (var d in b)
        o.call(b, d) && a.indexOf(d) < 0 && (c[d] = b[d]);
    if (b != null && k)
        for (var d of k(b))
            a.indexOf(d) < 0 && r.call(b, d) && (c[d] = b[d]);
    return c
}
;
var E = (b, a) => () => (b && (a = b(b = 0)),
a);
var F = (b, a) => () => (a || b((a = {
    exports: {}
}).exports, a),
a.exports)
  , G = (b, a) => {
    for (var c in a)
        j(b, c, {
            get: a[c],
            enumerable: !0
        })
}
  , l = (b, a, c, d) => {
    if (a && typeof a == "object" || typeof a == "function")
        for (let e of w(a))
            !o.call(b, e) && e !== c && j(b, e, {
                get: () => a[e],
                enumerable: !(d = u(a, e)) || d.enumerable
            });
    return b
}
  , H = (b, a, c) => (l(b, a, "default"),
c && l(c, a, "default"))
  , I = (b, a, c) => (c = b != null ? s(q(b)) : {},
l(a || !b || !b.__esModule ? j(c, "default", {
    value: b,
    enumerable: !0
}) : c, b))
  , J = b => l(j({}, "__esModule", {
    value: !0
}), b);
var K = (b, a, c) => x(q(b), c, a);
var L = (b, a, c) => new Promise( (d, e) => {
    var f = g => {
        try {
            i(c.next(g))
        } catch (m) {
            e(m)
        }
    }
      , h = g => {
        try {
            i(c.throw(g))
        } catch (m) {
            e(m)
        }
    }
      , i = g => g.done ? d(g.value) : Promise.resolve(g.value).then(f, h);
    i((c = c.apply(b, a)).next())
}
)
  , z = function(b, a) {
    this[0] = b,
    this[1] = a
};
var M = b => {
    var a = b[n("asyncIterator")], c = !1, d, e = {};
    return a == null ? (a = b[n("iterator")](),
    d = f => e[f] = h => a[f](h)) : (a = a.call(b),
    d = f => e[f] = h => {
        if (c) {
            if (c = !1,
            f === "throw")
                throw h;
            return h
        }
        return c = !0,
        {
            done: !1,
            value: new z(new Promise(i => {
                var g = a[f](h);
                g instanceof Object || y("Object expected"),
                i(g)
            }
            ),1)
        }
    }
    ),
    e[n("iterator")] = () => e,
    d("next"),
    "throw"in a ? d("throw") : e.throw = f => {
        throw f
    }
    ,
    "return"in a && d("return"),
    e
}
;
export {A as a, B as b, C as c, D as d, E as e, F as f, G as g, H as h, I as i, J as j, K as k, L as l, M as m};

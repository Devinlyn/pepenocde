var Gt = (n, t) => () => (t || n((t = {
    exports: {}
}).exports, t),
t.exports);
var We = Gt(Xt => {
    "use strict";
    Xt.byteLength = Un;
    Xt.toByteArray = Mn;
    Xt.fromByteArray = jn;
    var ft = []
      , st = []
      , On = typeof Uint8Array < "u" ? Uint8Array : Array
      , pe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (bt = 0,
    ze = pe.length; bt < ze; ++bt)
        ft[bt] = pe[bt],
        st[pe.charCodeAt(bt)] = bt;
    var bt, ze;
    st[45] = 62;
    st[95] = 63;
    function qe(n) {
        var t = n.length;
        if (t % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
        var e = n.indexOf("=");
        e === -1 && (e = t);
        var r = e === t ? 0 : 4 - e % 4;
        return [e, r]
    }
    function Un(n) {
        var t = qe(n)
          , e = t[0]
          , r = t[1];
        return (e + r) * 3 / 4 - r
    }
    function Ln(n, t, e) {
        return (t + e) * 3 / 4 - e
    }
    function Mn(n) {
        var t, e = qe(n), r = e[0], i = e[1], o = new On(Ln(n, r, i)), s = 0, f = i > 0 ? r - 4 : r, d;
        for (d = 0; d < f; d += 4)
            t = st[n.charCodeAt(d)] << 18 | st[n.charCodeAt(d + 1)] << 12 | st[n.charCodeAt(d + 2)] << 6 | st[n.charCodeAt(d + 3)],
            o[s++] = t >> 16 & 255,
            o[s++] = t >> 8 & 255,
            o[s++] = t & 255;
        return i === 2 && (t = st[n.charCodeAt(d)] << 2 | st[n.charCodeAt(d + 1)] >> 4,
        o[s++] = t & 255),
        i === 1 && (t = st[n.charCodeAt(d)] << 10 | st[n.charCodeAt(d + 1)] << 4 | st[n.charCodeAt(d + 2)] >> 2,
        o[s++] = t >> 8 & 255,
        o[s++] = t & 255),
        o
    }
    function Zn(n) {
        return ft[n >> 18 & 63] + ft[n >> 12 & 63] + ft[n >> 6 & 63] + ft[n & 63]
    }
    function $n(n, t, e) {
        for (var r, i = [], o = t; o < e; o += 3)
            r = (n[o] << 16 & 16711680) + (n[o + 1] << 8 & 65280) + (n[o + 2] & 255),
            i.push(Zn(r));
        return i.join("")
    }
    function jn(n) {
        for (var t, e = n.length, r = e % 3, i = [], o = 16383, s = 0, f = e - r; s < f; s += o)
            i.push($n(n, s, s + o > f ? f : s + o));
        return r === 1 ? (t = n[e - 1],
        i.push(ft[t >> 2] + ft[t << 4 & 63] + "==")) : r === 2 && (t = (n[e - 2] << 8) + n[e - 1],
        i.push(ft[t >> 10] + ft[t >> 4 & 63] + ft[t << 2 & 63] + "=")),
        i.join("")
    }
}
);
var Xe = Gt(ye => {
    "use strict";
    ye.read = function(n, t, e, r, i) {
        var o, s, f = i * 8 - r - 1, d = (1 << f) - 1, y = d >> 1, h = -7, m = e ? i - 1 : 0, A = e ? -1 : 1, b = n[t + m];
        for (m += A,
        o = b & (1 << -h) - 1,
        b >>= -h,
        h += f; h > 0; o = o * 256 + n[t + m],
        m += A,
        h -= 8)
            ;
        for (s = o & (1 << -h) - 1,
        o >>= -h,
        h += r; h > 0; s = s * 256 + n[t + m],
        m += A,
        h -= 8)
            ;
        if (o === 0)
            o = 1 - y;
        else {
            if (o === d)
                return s ? NaN : (b ? -1 : 1) * (1 / 0);
            s = s + Math.pow(2, r),
            o = o - y
        }
        return (b ? -1 : 1) * s * Math.pow(2, o - r)
    }
    ;
    ye.write = function(n, t, e, r, i, o) {
        var s, f, d, y = o * 8 - i - 1, h = (1 << y) - 1, m = h >> 1, A = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, b = r ? 0 : o - 1, Z = r ? 1 : -1, U = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t),
        isNaN(t) || t === 1 / 0 ? (f = isNaN(t) ? 1 : 0,
        s = h) : (s = Math.floor(Math.log(t) / Math.LN2),
        t * (d = Math.pow(2, -s)) < 1 && (s--,
        d *= 2),
        s + m >= 1 ? t += A / d : t += A * Math.pow(2, 1 - m),
        t * d >= 2 && (s++,
        d /= 2),
        s + m >= h ? (f = 0,
        s = h) : s + m >= 1 ? (f = (t * d - 1) * Math.pow(2, i),
        s = s + m) : (f = t * Math.pow(2, m - 1) * Math.pow(2, i),
        s = 0)); i >= 8; n[e + b] = f & 255,
        b += Z,
        f /= 256,
        i -= 8)
            ;
        for (s = s << i | f,
        y += i; y > 0; n[e + b] = s & 255,
        b += Z,
        s /= 256,
        y -= 8)
            ;
        n[e + b - Z] |= U * 128
    }
}
);
var Ie = Gt(Ot => {
    "use strict";
    var Ee = We()
      , Ft = Xe()
      , Ye = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    Ot.Buffer = a;
    Ot.SlowBuffer = Wn;
    Ot.INSPECT_MAX_BYTES = 50;
    var Yt = 2147483647;
    Ot.kMaxLength = Yt;
    a.TYPED_ARRAY_SUPPORT = Hn();
    !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    function Hn() {
        try {
            let n = new Uint8Array(1)
              , t = {
                foo: function() {
                    return 42
                }
            };
            return Object.setPrototypeOf(t, Uint8Array.prototype),
            Object.setPrototypeOf(n, t),
            n.foo() === 42
        } catch {
            return !1
        }
    }
    Object.defineProperty(a.prototype, "parent", {
        enumerable: !0,
        get: function() {
            if (a.isBuffer(this))
                return this.buffer
        }
    });
    Object.defineProperty(a.prototype, "offset", {
        enumerable: !0,
        get: function() {
            if (a.isBuffer(this))
                return this.byteOffset
        }
    });
    function Tt(n) {
        if (n > Yt)
            throw new RangeError('The value "' + n + '" is invalid for option "size"');
        let t = new Uint8Array(n);
        return Object.setPrototypeOf(t, a.prototype),
        t
    }
    function a(n, t, e) {
        if (typeof n == "number") {
            if (typeof t == "string")
                throw new TypeError('The "string" argument must be of type string. Received type number');
            return _e(n)
        }
        return tn(n, t, e)
    }
    a.poolSize = 8192;
    function tn(n, t, e) {
        if (typeof n == "string")
            return Vn(n, t);
        if (ArrayBuffer.isView(n))
            return zn(n);
        if (n == null)
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof n);
        if (ht(n, ArrayBuffer) || n && ht(n.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ht(n, SharedArrayBuffer) || n && ht(n.buffer, SharedArrayBuffer)))
            return me(n, t, e);
        if (typeof n == "number")
            throw new TypeError('The "value" argument must not be of type number. Received type number');
        let r = n.valueOf && n.valueOf();
        if (r != null && r !== n)
            return a.from(r, t, e);
        let i = qn(n);
        if (i)
            return i;
        if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof n[Symbol.toPrimitive] == "function")
            return a.from(n[Symbol.toPrimitive]("string"), t, e);
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof n)
    }
    a.from = function(n, t, e) {
        return tn(n, t, e)
    }
    ;
    Object.setPrototypeOf(a.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(a, Uint8Array);
    function en(n) {
        if (typeof n != "number")
            throw new TypeError('"size" argument must be of type number');
        if (n < 0)
            throw new RangeError('The value "' + n + '" is invalid for option "size"')
    }
    function Gn(n, t, e) {
        return en(n),
        n <= 0 ? Tt(n) : t !== void 0 ? typeof e == "string" ? Tt(n).fill(t, e) : Tt(n).fill(t) : Tt(n)
    }
    a.alloc = function(n, t, e) {
        return Gn(n, t, e)
    }
    ;
    function _e(n) {
        return en(n),
        Tt(n < 0 ? 0 : we(n) | 0)
    }
    a.allocUnsafe = function(n) {
        return _e(n)
    }
    ;
    a.allocUnsafeSlow = function(n) {
        return _e(n)
    }
    ;
    function Vn(n, t) {
        if ((typeof t != "string" || t === "") && (t = "utf8"),
        !a.isEncoding(t))
            throw new TypeError("Unknown encoding: " + t);
        let e = nn(n, t) | 0
          , r = Tt(e)
          , i = r.write(n, t);
        return i !== e && (r = r.slice(0, i)),
        r
    }
    function ge(n) {
        let t = n.length < 0 ? 0 : we(n.length) | 0
          , e = Tt(t);
        for (let r = 0; r < t; r += 1)
            e[r] = n[r] & 255;
        return e
    }
    function zn(n) {
        if (ht(n, Uint8Array)) {
            let t = new Uint8Array(n);
            return me(t.buffer, t.byteOffset, t.byteLength)
        }
        return ge(n)
    }
    function me(n, t, e) {
        if (t < 0 || n.byteLength < t)
            throw new RangeError('"offset" is outside of buffer bounds');
        if (n.byteLength < t + (e || 0))
            throw new RangeError('"length" is outside of buffer bounds');
        let r;
        return t === void 0 && e === void 0 ? r = new Uint8Array(n) : e === void 0 ? r = new Uint8Array(n,t) : r = new Uint8Array(n,t,e),
        Object.setPrototypeOf(r, a.prototype),
        r
    }
    function qn(n) {
        if (a.isBuffer(n)) {
            let t = we(n.length) | 0
              , e = Tt(t);
            return e.length === 0 || n.copy(e, 0, 0, t),
            e
        }
        if (n.length !== void 0)
            return typeof n.length != "number" || ke(n.length) ? Tt(0) : ge(n);
        if (n.type === "Buffer" && Array.isArray(n.data))
            return ge(n.data)
    }
    function we(n) {
        if (n >= Yt)
            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + Yt.toString(16) + " bytes");
        return n | 0
    }
    function Wn(n) {
        return +n != n && (n = 0),
        a.alloc(+n)
    }
    a.isBuffer = function(t) {
        return t != null && t._isBuffer === !0 && t !== a.prototype
    }
    ;
    a.compare = function(t, e) {
        if (ht(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
        ht(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
        !a.isBuffer(t) || !a.isBuffer(e))
            throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        if (t === e)
            return 0;
        let r = t.length
          , i = e.length;
        for (let o = 0, s = Math.min(r, i); o < s; ++o)
            if (t[o] !== e[o]) {
                r = t[o],
                i = e[o];
                break
            }
        return r < i ? -1 : i < r ? 1 : 0
    }
    ;
    a.isEncoding = function(t) {
        switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return !0;
        default:
            return !1
        }
    }
    ;
    a.concat = function(t, e) {
        if (!Array.isArray(t))
            throw new TypeError('"list" argument must be an Array of Buffers');
        if (t.length === 0)
            return a.alloc(0);
        let r;
        if (e === void 0)
            for (e = 0,
            r = 0; r < t.length; ++r)
                e += t[r].length;
        let i = a.allocUnsafe(e)
          , o = 0;
        for (r = 0; r < t.length; ++r) {
            let s = t[r];
            if (ht(s, Uint8Array))
                o + s.length > i.length ? (a.isBuffer(s) || (s = a.from(s)),
                s.copy(i, o)) : Uint8Array.prototype.set.call(i, s, o);
            else if (a.isBuffer(s))
                s.copy(i, o);
            else
                throw new TypeError('"list" argument must be an Array of Buffers');
            o += s.length
        }
        return i
    }
    ;
    function nn(n, t) {
        if (a.isBuffer(n))
            return n.length;
        if (ArrayBuffer.isView(n) || ht(n, ArrayBuffer))
            return n.byteLength;
        if (typeof n != "string")
            throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof n);
        let e = n.length
          , r = arguments.length > 2 && arguments[2] === !0;
        if (!r && e === 0)
            return 0;
        let i = !1;
        for (; ; )
            switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
                return e;
            case "utf8":
            case "utf-8":
                return Te(n).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return e * 2;
            case "hex":
                return e >>> 1;
            case "base64":
                return hn(n).length;
            default:
                if (i)
                    return r ? -1 : Te(n).length;
                t = ("" + t).toLowerCase(),
                i = !0
            }
    }
    a.byteLength = nn;
    function Xn(n, t, e) {
        let r = !1;
        if ((t === void 0 || t < 0) && (t = 0),
        t > this.length || ((e === void 0 || e > this.length) && (e = this.length),
        e <= 0) || (e >>>= 0,
        t >>>= 0,
        e <= t))
            return "";
        for (n || (n = "utf8"); ; )
            switch (n) {
            case "hex":
                return or(this, t, e);
            case "utf8":
            case "utf-8":
                return on(this, t, e);
            case "ascii":
                return rr(this, t, e);
            case "latin1":
            case "binary":
                return ir(this, t, e);
            case "base64":
                return er(this, t, e);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return sr(this, t, e);
            default:
                if (r)
                    throw new TypeError("Unknown encoding: " + n);
                n = (n + "").toLowerCase(),
                r = !0
            }
    }
    a.prototype._isBuffer = !0;
    function Rt(n, t, e) {
        let r = n[t];
        n[t] = n[e],
        n[e] = r
    }
    a.prototype.swap16 = function() {
        let t = this.length;
        if (t % 2 !== 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (let e = 0; e < t; e += 2)
            Rt(this, e, e + 1);
        return this
    }
    ;
    a.prototype.swap32 = function() {
        let t = this.length;
        if (t % 4 !== 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (let e = 0; e < t; e += 4)
            Rt(this, e, e + 3),
            Rt(this, e + 1, e + 2);
        return this
    }
    ;
    a.prototype.swap64 = function() {
        let t = this.length;
        if (t % 8 !== 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (let e = 0; e < t; e += 8)
            Rt(this, e, e + 7),
            Rt(this, e + 1, e + 6),
            Rt(this, e + 2, e + 5),
            Rt(this, e + 3, e + 4);
        return this
    }
    ;
    a.prototype.toString = function() {
        let t = this.length;
        return t === 0 ? "" : arguments.length === 0 ? on(this, 0, t) : Xn.apply(this, arguments)
    }
    ;
    a.prototype.toLocaleString = a.prototype.toString;
    a.prototype.equals = function(t) {
        if (!a.isBuffer(t))
            throw new TypeError("Argument must be a Buffer");
        return this === t ? !0 : a.compare(this, t) === 0
    }
    ;
    a.prototype.inspect = function() {
        let t = ""
          , e = Ot.INSPECT_MAX_BYTES;
        return t = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(),
        this.length > e && (t += " ... "),
        "<Buffer " + t + ">"
    }
    ;
    Ye && (a.prototype[Ye] = a.prototype.inspect);
    a.prototype.compare = function(t, e, r, i, o) {
        if (ht(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
        !a.isBuffer(t))
            throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
        if (e === void 0 && (e = 0),
        r === void 0 && (r = t ? t.length : 0),
        i === void 0 && (i = 0),
        o === void 0 && (o = this.length),
        e < 0 || r > t.length || i < 0 || o > this.length)
            throw new RangeError("out of range index");
        if (i >= o && e >= r)
            return 0;
        if (i >= o)
            return -1;
        if (e >= r)
            return 1;
        if (e >>>= 0,
        r >>>= 0,
        i >>>= 0,
        o >>>= 0,
        this === t)
            return 0;
        let s = o - i
          , f = r - e
          , d = Math.min(s, f)
          , y = this.slice(i, o)
          , h = t.slice(e, r);
        for (let m = 0; m < d; ++m)
            if (y[m] !== h[m]) {
                s = y[m],
                f = h[m];
                break
            }
        return s < f ? -1 : f < s ? 1 : 0
    }
    ;
    function rn(n, t, e, r, i) {
        if (n.length === 0)
            return -1;
        if (typeof e == "string" ? (r = e,
        e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648),
        e = +e,
        ke(e) && (e = i ? 0 : n.length - 1),
        e < 0 && (e = n.length + e),
        e >= n.length) {
            if (i)
                return -1;
            e = n.length - 1
        } else if (e < 0)
            if (i)
                e = 0;
            else
                return -1;
        if (typeof t == "string" && (t = a.from(t, r)),
        a.isBuffer(t))
            return t.length === 0 ? -1 : Ke(n, t, e, r, i);
        if (typeof t == "number")
            return t = t & 255,
            typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(n, t, e) : Uint8Array.prototype.lastIndexOf.call(n, t, e) : Ke(n, [t], e, r, i);
        throw new TypeError("val must be string, number or Buffer")
    }
    function Ke(n, t, e, r, i) {
        let o = 1
          , s = n.length
          , f = t.length;
        if (r !== void 0 && (r = String(r).toLowerCase(),
        r === "ucs2" || r === "ucs-2" || r === "utf16le" || r === "utf-16le")) {
            if (n.length < 2 || t.length < 2)
                return -1;
            o = 2,
            s /= 2,
            f /= 2,
            e /= 2
        }
        function d(h, m) {
            return o === 1 ? h[m] : h.readUInt16BE(m * o)
        }
        let y;
        if (i) {
            let h = -1;
            for (y = e; y < s; y++)
                if (d(n, y) === d(t, h === -1 ? 0 : y - h)) {
                    if (h === -1 && (h = y),
                    y - h + 1 === f)
                        return h * o
                } else
                    h !== -1 && (y -= y - h),
                    h = -1
        } else
            for (e + f > s && (e = s - f),
            y = e; y >= 0; y--) {
                let h = !0;
                for (let m = 0; m < f; m++)
                    if (d(n, y + m) !== d(t, m)) {
                        h = !1;
                        break
                    }
                if (h)
                    return y
            }
        return -1
    }
    a.prototype.includes = function(t, e, r) {
        return this.indexOf(t, e, r) !== -1
    }
    ;
    a.prototype.indexOf = function(t, e, r) {
        return rn(this, t, e, r, !0)
    }
    ;
    a.prototype.lastIndexOf = function(t, e, r) {
        return rn(this, t, e, r, !1)
    }
    ;
    function Yn(n, t, e, r) {
        e = Number(e) || 0;
        let i = n.length - e;
        r ? (r = Number(r),
        r > i && (r = i)) : r = i;
        let o = t.length;
        r > o / 2 && (r = o / 2);
        let s;
        for (s = 0; s < r; ++s) {
            let f = parseInt(t.substr(s * 2, 2), 16);
            if (ke(f))
                return s;
            n[e + s] = f
        }
        return s
    }
    function Kn(n, t, e, r) {
        return Kt(Te(t, n.length - e), n, e, r)
    }
    function Jn(n, t, e, r) {
        return Kt(lr(t), n, e, r)
    }
    function Qn(n, t, e, r) {
        return Kt(hn(t), n, e, r)
    }
    function tr(n, t, e, r) {
        return Kt(fr(t, n.length - e), n, e, r)
    }
    a.prototype.write = function(t, e, r, i) {
        if (e === void 0)
            i = "utf8",
            r = this.length,
            e = 0;
        else if (r === void 0 && typeof e == "string")
            i = e,
            r = this.length,
            e = 0;
        else if (isFinite(e))
            e = e >>> 0,
            isFinite(r) ? (r = r >>> 0,
            i === void 0 && (i = "utf8")) : (i = r,
            r = void 0);
        else
            throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        let o = this.length - e;
        if ((r === void 0 || r > o) && (r = o),
        t.length > 0 && (r < 0 || e < 0) || e > this.length)
            throw new RangeError("Attempt to write outside buffer bounds");
        i || (i = "utf8");
        let s = !1;
        for (; ; )
            switch (i) {
            case "hex":
                return Yn(this, t, e, r);
            case "utf8":
            case "utf-8":
                return Kn(this, t, e, r);
            case "ascii":
            case "latin1":
            case "binary":
                return Jn(this, t, e, r);
            case "base64":
                return Qn(this, t, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return tr(this, t, e, r);
            default:
                if (s)
                    throw new TypeError("Unknown encoding: " + i);
                i = ("" + i).toLowerCase(),
                s = !0
            }
    }
    ;
    a.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    }
    ;
    function er(n, t, e) {
        return t === 0 && e === n.length ? Ee.fromByteArray(n) : Ee.fromByteArray(n.slice(t, e))
    }
    function on(n, t, e) {
        e = Math.min(n.length, e);
        let r = []
          , i = t;
        for (; i < e; ) {
            let o = n[i]
              , s = null
              , f = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
            if (i + f <= e) {
                let d, y, h, m;
                switch (f) {
                case 1:
                    o < 128 && (s = o);
                    break;
                case 2:
                    d = n[i + 1],
                    (d & 192) === 128 && (m = (o & 31) << 6 | d & 63,
                    m > 127 && (s = m));
                    break;
                case 3:
                    d = n[i + 1],
                    y = n[i + 2],
                    (d & 192) === 128 && (y & 192) === 128 && (m = (o & 15) << 12 | (d & 63) << 6 | y & 63,
                    m > 2047 && (m < 55296 || m > 57343) && (s = m));
                    break;
                case 4:
                    d = n[i + 1],
                    y = n[i + 2],
                    h = n[i + 3],
                    (d & 192) === 128 && (y & 192) === 128 && (h & 192) === 128 && (m = (o & 15) << 18 | (d & 63) << 12 | (y & 63) << 6 | h & 63,
                    m > 65535 && m < 1114112 && (s = m))
                }
            }
            s === null ? (s = 65533,
            f = 1) : s > 65535 && (s -= 65536,
            r.push(s >>> 10 & 1023 | 55296),
            s = 56320 | s & 1023),
            r.push(s),
            i += f
        }
        return nr(r)
    }
    var Je = 4096;
    function nr(n) {
        let t = n.length;
        if (t <= Je)
            return String.fromCharCode.apply(String, n);
        let e = ""
          , r = 0;
        for (; r < t; )
            e += String.fromCharCode.apply(String, n.slice(r, r += Je));
        return e
    }
    function rr(n, t, e) {
        let r = "";
        e = Math.min(n.length, e);
        for (let i = t; i < e; ++i)
            r += String.fromCharCode(n[i] & 127);
        return r
    }
    function ir(n, t, e) {
        let r = "";
        e = Math.min(n.length, e);
        for (let i = t; i < e; ++i)
            r += String.fromCharCode(n[i]);
        return r
    }
    function or(n, t, e) {
        let r = n.length;
        (!t || t < 0) && (t = 0),
        (!e || e < 0 || e > r) && (e = r);
        let i = "";
        for (let o = t; o < e; ++o)
            i += hr[n[o]];
        return i
    }
    function sr(n, t, e) {
        let r = n.slice(t, e)
          , i = "";
        for (let o = 0; o < r.length - 1; o += 2)
            i += String.fromCharCode(r[o] + r[o + 1] * 256);
        return i
    }
    a.prototype.slice = function(t, e) {
        let r = this.length;
        t = ~~t,
        e = e === void 0 ? r : ~~e,
        t < 0 ? (t += r,
        t < 0 && (t = 0)) : t > r && (t = r),
        e < 0 ? (e += r,
        e < 0 && (e = 0)) : e > r && (e = r),
        e < t && (e = t);
        let i = this.subarray(t, e);
        return Object.setPrototypeOf(i, a.prototype),
        i
    }
    ;
    function Q(n, t, e) {
        if (n % 1 !== 0 || n < 0)
            throw new RangeError("offset is not uint");
        if (n + t > e)
            throw new RangeError("Trying to access beyond buffer length")
    }
    a.prototype.readUintLE = a.prototype.readUIntLE = function(t, e, r) {
        t = t >>> 0,
        e = e >>> 0,
        r || Q(t, e, this.length);
        let i = this[t]
          , o = 1
          , s = 0;
        for (; ++s < e && (o *= 256); )
            i += this[t + s] * o;
        return i
    }
    ;
    a.prototype.readUintBE = a.prototype.readUIntBE = function(t, e, r) {
        t = t >>> 0,
        e = e >>> 0,
        r || Q(t, e, this.length);
        let i = this[t + --e]
          , o = 1;
        for (; e > 0 && (o *= 256); )
            i += this[t + --e] * o;
        return i
    }
    ;
    a.prototype.readUint8 = a.prototype.readUInt8 = function(t, e) {
        return t = t >>> 0,
        e || Q(t, 1, this.length),
        this[t]
    }
    ;
    a.prototype.readUint16LE = a.prototype.readUInt16LE = function(t, e) {
        return t = t >>> 0,
        e || Q(t, 2, this.length),
        this[t] | this[t + 1] << 8
    }
    ;
    a.prototype.readUint16BE = a.prototype.readUInt16BE = function(t, e) {
        return t = t >>> 0,
        e || Q(t, 2, this.length),
        this[t] << 8 | this[t + 1]
    }
    ;
    a.prototype.readUint32LE = a.prototype.readUInt32LE = function(t, e) {
        return t = t >>> 0,
        e || Q(t, 4, this.length),
        (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216
    }
    ;
    a.prototype.readUint32BE = a.prototype.readUInt32BE = function(t, e) {
        return t = t >>> 0,
        e || Q(t, 4, this.length),
        this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
    }
    ;
    a.prototype.readBigUInt64LE = It(function(t) {
        t = t >>> 0,
        Dt(t, "offset");
        let e = this[t]
          , r = this[t + 7];
        (e === void 0 || r === void 0) && jt(t, this.length - 8);
        let i = e + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24
          , o = this[++t] + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + r * 2 ** 24;
        return BigInt(i) + (BigInt(o) << BigInt(32))
    });
    a.prototype.readBigUInt64BE = It(function(t) {
        t = t >>> 0,
        Dt(t, "offset");
        let e = this[t]
          , r = this[t + 7];
        (e === void 0 || r === void 0) && jt(t, this.length - 8);
        let i = e * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t]
          , o = this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + r;
        return (BigInt(i) << BigInt(32)) + BigInt(o)
    });
    a.prototype.readIntLE = function(t, e, r) {
        t = t >>> 0,
        e = e >>> 0,
        r || Q(t, e, this.length);
        let i = this[t]
          , o = 1
          , s = 0;
        for (; ++s < e && (o *= 256); )
            i += this[t + s] * o;
        return o *= 128,
        i >= o && (i -= Math.pow(2, 8 * e)),
        i
    }
    ;
    a.prototype.readIntBE = function(t, e, r) {
        t = t >>> 0,
        e = e >>> 0,
        r || Q(t, e, this.length);
        let i = e
          , o = 1
          , s = this[t + --i];
        for (; i > 0 && (o *= 256); )
            s += this[t + --i] * o;
        return o *= 128,
        s >= o && (s -= Math.pow(2, 8 * e)),
        s
    }
    ;
    a.prototype.readInt8 = function(t, e) {
        return t = t >>> 0,
        e || Q(t, 1, this.length),
        this[t] & 128 ? (255 - this[t] + 1) * -1 : this[t]
    }
    ;
    a.prototype.readInt16LE = function(t, e) {
        t = t >>> 0,
        e || Q(t, 2, this.length);
        let r = this[t] | this[t + 1] << 8;
        return r & 32768 ? r | 4294901760 : r
    }
    ;
    a.prototype.readInt16BE = function(t, e) {
        t = t >>> 0,
        e || Q(t, 2, this.length);
        let r = this[t + 1] | this[t] << 8;
        return r & 32768 ? r | 4294901760 : r
    }
    ;
    a.prototype.readInt32LE = function(t, e) {
        return t = t >>> 0,
        e || Q(t, 4, this.length),
        this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
    }
    ;
    a.prototype.readInt32BE = function(t, e) {
        return t = t >>> 0,
        e || Q(t, 4, this.length),
        this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
    }
    ;
    a.prototype.readBigInt64LE = It(function(t) {
        t = t >>> 0,
        Dt(t, "offset");
        let e = this[t]
          , r = this[t + 7];
        (e === void 0 || r === void 0) && jt(t, this.length - 8);
        let i = this[t + 4] + this[t + 5] * 2 ** 8 + this[t + 6] * 2 ** 16 + (r << 24);
        return (BigInt(i) << BigInt(32)) + BigInt(e + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24)
    });
    a.prototype.readBigInt64BE = It(function(t) {
        t = t >>> 0,
        Dt(t, "offset");
        let e = this[t]
          , r = this[t + 7];
        (e === void 0 || r === void 0) && jt(t, this.length - 8);
        let i = (e << 24) + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t];
        return (BigInt(i) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + r)
    });
    a.prototype.readFloatLE = function(t, e) {
        return t = t >>> 0,
        e || Q(t, 4, this.length),
        Ft.read(this, t, !0, 23, 4)
    }
    ;
    a.prototype.readFloatBE = function(t, e) {
        return t = t >>> 0,
        e || Q(t, 4, this.length),
        Ft.read(this, t, !1, 23, 4)
    }
    ;
    a.prototype.readDoubleLE = function(t, e) {
        return t = t >>> 0,
        e || Q(t, 8, this.length),
        Ft.read(this, t, !0, 52, 8)
    }
    ;
    a.prototype.readDoubleBE = function(t, e) {
        return t = t >>> 0,
        e || Q(t, 8, this.length),
        Ft.read(this, t, !1, 52, 8)
    }
    ;
    function it(n, t, e, r, i, o) {
        if (!a.isBuffer(n))
            throw new TypeError('"buffer" argument must be a Buffer instance');
        if (t > i || t < o)
            throw new RangeError('"value" argument is out of bounds');
        if (e + r > n.length)
            throw new RangeError("Index out of range")
    }
    a.prototype.writeUintLE = a.prototype.writeUIntLE = function(t, e, r, i) {
        if (t = +t,
        e = e >>> 0,
        r = r >>> 0,
        !i) {
            let f = Math.pow(2, 8 * r) - 1;
            it(this, t, e, r, f, 0)
        }
        let o = 1
          , s = 0;
        for (this[e] = t & 255; ++s < r && (o *= 256); )
            this[e + s] = t / o & 255;
        return e + r
    }
    ;
    a.prototype.writeUintBE = a.prototype.writeUIntBE = function(t, e, r, i) {
        if (t = +t,
        e = e >>> 0,
        r = r >>> 0,
        !i) {
            let f = Math.pow(2, 8 * r) - 1;
            it(this, t, e, r, f, 0)
        }
        let o = r - 1
          , s = 1;
        for (this[e + o] = t & 255; --o >= 0 && (s *= 256); )
            this[e + o] = t / s & 255;
        return e + r
    }
    ;
    a.prototype.writeUint8 = a.prototype.writeUInt8 = function(t, e, r) {
        return t = +t,
        e = e >>> 0,
        r || it(this, t, e, 1, 255, 0),
        this[e] = t & 255,
        e + 1
    }
    ;
    a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(t, e, r) {
        return t = +t,
        e = e >>> 0,
        r || it(this, t, e, 2, 65535, 0),
        this[e] = t & 255,
        this[e + 1] = t >>> 8,
        e + 2
    }
    ;
    a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(t, e, r) {
        return t = +t,
        e = e >>> 0,
        r || it(this, t, e, 2, 65535, 0),
        this[e] = t >>> 8,
        this[e + 1] = t & 255,
        e + 2
    }
    ;
    a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(t, e, r) {
        return t = +t,
        e = e >>> 0,
        r || it(this, t, e, 4, 4294967295, 0),
        this[e + 3] = t >>> 24,
        this[e + 2] = t >>> 16,
        this[e + 1] = t >>> 8,
        this[e] = t & 255,
        e + 4
    }
    ;
    a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(t, e, r) {
        return t = +t,
        e = e >>> 0,
        r || it(this, t, e, 4, 4294967295, 0),
        this[e] = t >>> 24,
        this[e + 1] = t >>> 16,
        this[e + 2] = t >>> 8,
        this[e + 3] = t & 255,
        e + 4
    }
    ;
    function sn(n, t, e, r, i) {
        fn(t, r, i, n, e, 7);
        let o = Number(t & BigInt(4294967295));
        n[e++] = o,
        o = o >> 8,
        n[e++] = o,
        o = o >> 8,
        n[e++] = o,
        o = o >> 8,
        n[e++] = o;
        let s = Number(t >> BigInt(32) & BigInt(4294967295));
        return n[e++] = s,
        s = s >> 8,
        n[e++] = s,
        s = s >> 8,
        n[e++] = s,
        s = s >> 8,
        n[e++] = s,
        e
    }
    function cn(n, t, e, r, i) {
        fn(t, r, i, n, e, 7);
        let o = Number(t & BigInt(4294967295));
        n[e + 7] = o,
        o = o >> 8,
        n[e + 6] = o,
        o = o >> 8,
        n[e + 5] = o,
        o = o >> 8,
        n[e + 4] = o;
        let s = Number(t >> BigInt(32) & BigInt(4294967295));
        return n[e + 3] = s,
        s = s >> 8,
        n[e + 2] = s,
        s = s >> 8,
        n[e + 1] = s,
        s = s >> 8,
        n[e] = s,
        e + 8
    }
    a.prototype.writeBigUInt64LE = It(function(t, e=0) {
        return sn(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
    });
    a.prototype.writeBigUInt64BE = It(function(t, e=0) {
        return cn(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
    });
    a.prototype.writeIntLE = function(t, e, r, i) {
        if (t = +t,
        e = e >>> 0,
        !i) {
            let d = Math.pow(2, 8 * r - 1);
            it(this, t, e, r, d - 1, -d)
        }
        let o = 0
          , s = 1
          , f = 0;
        for (this[e] = t & 255; ++o < r && (s *= 256); )
            t < 0 && f === 0 && this[e + o - 1] !== 0 && (f = 1),
            this[e + o] = (t / s >> 0) - f & 255;
        return e + r
    }
    ;
    a.prototype.writeIntBE = function(t, e, r, i) {
        if (t = +t,
        e = e >>> 0,
        !i) {
            let d = Math.pow(2, 8 * r - 1);
            it(this, t, e, r, d - 1, -d)
        }
        let o = r - 1
          , s = 1
          , f = 0;
        for (this[e + o] = t & 255; --o >= 0 && (s *= 256); )
            t < 0 && f === 0 && this[e + o + 1] !== 0 && (f = 1),
            this[e + o] = (t / s >> 0) - f & 255;
        return e + r
    }
    ;
    a.prototype.writeInt8 = function(t, e, r) {
        return t = +t,
        e = e >>> 0,
        r || it(this, t, e, 1, 127, -128),
        t < 0 && (t = 255 + t + 1),
        this[e] = t & 255,
        e + 1
    }
    ;
    a.prototype.writeInt16LE = function(t, e, r) {
        return t = +t,
        e = e >>> 0,
        r || it(this, t, e, 2, 32767, -32768),
        this[e] = t & 255,
        this[e + 1] = t >>> 8,
        e + 2
    }
    ;
    a.prototype.writeInt16BE = function(t, e, r) {
        return t = +t,
        e = e >>> 0,
        r || it(this, t, e, 2, 32767, -32768),
        this[e] = t >>> 8,
        this[e + 1] = t & 255,
        e + 2
    }
    ;
    a.prototype.writeInt32LE = function(t, e, r) {
        return t = +t,
        e = e >>> 0,
        r || it(this, t, e, 4, 2147483647, -2147483648),
        this[e] = t & 255,
        this[e + 1] = t >>> 8,
        this[e + 2] = t >>> 16,
        this[e + 3] = t >>> 24,
        e + 4
    }
    ;
    a.prototype.writeInt32BE = function(t, e, r) {
        return t = +t,
        e = e >>> 0,
        r || it(this, t, e, 4, 2147483647, -2147483648),
        t < 0 && (t = 4294967295 + t + 1),
        this[e] = t >>> 24,
        this[e + 1] = t >>> 16,
        this[e + 2] = t >>> 8,
        this[e + 3] = t & 255,
        e + 4
    }
    ;
    a.prototype.writeBigInt64LE = It(function(t, e=0) {
        return sn(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
    });
    a.prototype.writeBigInt64BE = It(function(t, e=0) {
        return cn(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
    });
    function un(n, t, e, r, i, o) {
        if (e + r > n.length)
            throw new RangeError("Index out of range");
        if (e < 0)
            throw new RangeError("Index out of range")
    }
    function an(n, t, e, r, i) {
        return t = +t,
        e = e >>> 0,
        i || un(n, t, e, 4, 34028234663852886e22, -34028234663852886e22),
        Ft.write(n, t, e, r, 23, 4),
        e + 4
    }
    a.prototype.writeFloatLE = function(t, e, r) {
        return an(this, t, e, !0, r)
    }
    ;
    a.prototype.writeFloatBE = function(t, e, r) {
        return an(this, t, e, !1, r)
    }
    ;
    function ln(n, t, e, r, i) {
        return t = +t,
        e = e >>> 0,
        i || un(n, t, e, 8, 17976931348623157e292, -17976931348623157e292),
        Ft.write(n, t, e, r, 52, 8),
        e + 8
    }
    a.prototype.writeDoubleLE = function(t, e, r) {
        return ln(this, t, e, !0, r)
    }
    ;
    a.prototype.writeDoubleBE = function(t, e, r) {
        return ln(this, t, e, !1, r)
    }
    ;
    a.prototype.copy = function(t, e, r, i) {
        if (!a.isBuffer(t))
            throw new TypeError("argument should be a Buffer");
        if (r || (r = 0),
        !i && i !== 0 && (i = this.length),
        e >= t.length && (e = t.length),
        e || (e = 0),
        i > 0 && i < r && (i = r),
        i === r || t.length === 0 || this.length === 0)
            return 0;
        if (e < 0)
            throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length)
            throw new RangeError("Index out of range");
        if (i < 0)
            throw new RangeError("sourceEnd out of bounds");
        i > this.length && (i = this.length),
        t.length - e < i - r && (i = t.length - e + r);
        let o = i - r;
        return this === t && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(e, r, i) : Uint8Array.prototype.set.call(t, this.subarray(r, i), e),
        o
    }
    ;
    a.prototype.fill = function(t, e, r, i) {
        if (typeof t == "string") {
            if (typeof e == "string" ? (i = e,
            e = 0,
            r = this.length) : typeof r == "string" && (i = r,
            r = this.length),
            i !== void 0 && typeof i != "string")
                throw new TypeError("encoding must be a string");
            if (typeof i == "string" && !a.isEncoding(i))
                throw new TypeError("Unknown encoding: " + i);
            if (t.length === 1) {
                let s = t.charCodeAt(0);
                (i === "utf8" && s < 128 || i === "latin1") && (t = s)
            }
        } else
            typeof t == "number" ? t = t & 255 : typeof t == "boolean" && (t = Number(t));
        if (e < 0 || this.length < e || this.length < r)
            throw new RangeError("Out of range index");
        if (r <= e)
            return this;
        e = e >>> 0,
        r = r === void 0 ? this.length : r >>> 0,
        t || (t = 0);
        let o;
        if (typeof t == "number")
            for (o = e; o < r; ++o)
                this[o] = t;
        else {
            let s = a.isBuffer(t) ? t : a.from(t, i)
              , f = s.length;
            if (f === 0)
                throw new TypeError('The value "' + t + '" is invalid for argument "value"');
            for (o = 0; o < r - e; ++o)
                this[o + e] = s[o % f]
        }
        return this
    }
    ;
    var vt = {};
    function xe(n, t, e) {
        vt[n] = class extends e {
            constructor() {
                super(),
                Object.defineProperty(this, "message", {
                    value: t.apply(this, arguments),
                    writable: !0,
                    configurable: !0
                }),
                this.name = `${this.name} [${n}]`,
                this.stack,
                delete this.name
            }
            get code() {
                return n
            }
            set code(i) {
                Object.defineProperty(this, "code", {
                    configurable: !0,
                    enumerable: !0,
                    value: i,
                    writable: !0
                })
            }
            toString() {
                return `${this.name} [${n}]: ${this.message}`
            }
        }
    }
    xe("ERR_BUFFER_OUT_OF_BOUNDS", function(n) {
        return n ? `${n} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
    }, RangeError);
    xe("ERR_INVALID_ARG_TYPE", function(n, t) {
        return `The "${n}" argument must be of type number. Received type ${typeof t}`
    }, TypeError);
    xe("ERR_OUT_OF_RANGE", function(n, t, e) {
        let r = `The value of "${n}" is out of range.`
          , i = e;
        return Number.isInteger(e) && Math.abs(e) > 2 ** 32 ? i = Qe(String(e)) : typeof e == "bigint" && (i = String(e),
        (e > BigInt(2) ** BigInt(32) || e < -(BigInt(2) ** BigInt(32))) && (i = Qe(i)),
        i += "n"),
        r += ` It must be ${t}. Received ${i}`,
        r
    }, RangeError);
    function Qe(n) {
        let t = ""
          , e = n.length
          , r = n[0] === "-" ? 1 : 0;
        for (; e >= r + 4; e -= 3)
            t = `_${n.slice(e - 3, e)}${t}`;
        return `${n.slice(0, e)}${t}`
    }
    function cr(n, t, e) {
        Dt(t, "offset"),
        (n[t] === void 0 || n[t + e] === void 0) && jt(t, n.length - (e + 1))
    }
    function fn(n, t, e, r, i, o) {
        if (n > e || n < t) {
            let s = typeof t == "bigint" ? "n" : "", f;
            throw o > 3 ? t === 0 || t === BigInt(0) ? f = `>= 0${s} and < 2${s} ** ${(o + 1) * 8}${s}` : f = `>= -(2${s} ** ${(o + 1) * 8 - 1}${s}) and < 2 ** ${(o + 1) * 8 - 1}${s}` : f = `>= ${t}${s} and <= ${e}${s}`,
            new vt.ERR_OUT_OF_RANGE("value",f,n)
        }
        cr(r, i, o)
    }
    function Dt(n, t) {
        if (typeof n != "number")
            throw new vt.ERR_INVALID_ARG_TYPE(t,"number",n)
    }
    function jt(n, t, e) {
        throw Math.floor(n) !== n ? (Dt(n, e),
        new vt.ERR_OUT_OF_RANGE(e || "offset","an integer",n)) : t < 0 ? new vt.ERR_BUFFER_OUT_OF_BOUNDS : new vt.ERR_OUT_OF_RANGE(e || "offset",`>= ${e ? 1 : 0} and <= ${t}`,n)
    }
    var ur = /[^+/0-9A-Za-z-_]/g;
    function ar(n) {
        if (n = n.split("=")[0],
        n = n.trim().replace(ur, ""),
        n.length < 2)
            return "";
        for (; n.length % 4 !== 0; )
            n = n + "=";
        return n
    }
    function Te(n, t) {
        t = t || 1 / 0;
        let e, r = n.length, i = null, o = [];
        for (let s = 0; s < r; ++s) {
            if (e = n.charCodeAt(s),
            e > 55295 && e < 57344) {
                if (!i) {
                    if (e > 56319) {
                        (t -= 3) > -1 && o.push(239, 191, 189);
                        continue
                    } else if (s + 1 === r) {
                        (t -= 3) > -1 && o.push(239, 191, 189);
                        continue
                    }
                    i = e;
                    continue
                }
                if (e < 56320) {
                    (t -= 3) > -1 && o.push(239, 191, 189),
                    i = e;
                    continue
                }
                e = (i - 55296 << 10 | e - 56320) + 65536
            } else
                i && (t -= 3) > -1 && o.push(239, 191, 189);
            if (i = null,
            e < 128) {
                if ((t -= 1) < 0)
                    break;
                o.push(e)
            } else if (e < 2048) {
                if ((t -= 2) < 0)
                    break;
                o.push(e >> 6 | 192, e & 63 | 128)
            } else if (e < 65536) {
                if ((t -= 3) < 0)
                    break;
                o.push(e >> 12 | 224, e >> 6 & 63 | 128, e & 63 | 128)
            } else if (e < 1114112) {
                if ((t -= 4) < 0)
                    break;
                o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, e & 63 | 128)
            } else
                throw new Error("Invalid code point")
        }
        return o
    }
    function lr(n) {
        let t = [];
        for (let e = 0; e < n.length; ++e)
            t.push(n.charCodeAt(e) & 255);
        return t
    }
    function fr(n, t) {
        let e, r, i, o = [];
        for (let s = 0; s < n.length && !((t -= 2) < 0); ++s)
            e = n.charCodeAt(s),
            r = e >> 8,
            i = e % 256,
            o.push(i),
            o.push(r);
        return o
    }
    function hn(n) {
        return Ee.toByteArray(ar(n))
    }
    function Kt(n, t, e, r) {
        let i;
        for (i = 0; i < r && !(i + e >= t.length || i >= n.length); ++i)
            t[i + e] = n[i];
        return i
    }
    function ht(n, t) {
        return n instanceof t || n != null && n.constructor != null && n.constructor.name != null && n.constructor.name === t.name
    }
    function ke(n) {
        return n !== n
    }
    var hr = function() {
        let n = "0123456789abcdef"
          , t = new Array(256);
        for (let e = 0; e < 16; ++e) {
            let r = e * 16;
            for (let i = 0; i < 16; ++i)
                t[r + i] = n[e] + n[i]
        }
        return t
    }();
    function It(n) {
        return typeof BigInt > "u" ? dr : n
    }
    function dr() {
        throw new Error("BigInt not supported")
    }
}
);
var gn = Gt( (Ir, En) => {
    "use strict";
    var W = En.exports = {}, dt, pt;
    function Be() {
        throw new Error("setTimeout has not been defined")
    }
    function be() {
        throw new Error("clearTimeout has not been defined")
    }
    (function() {
        try {
            typeof setTimeout == "function" ? dt = setTimeout : dt = Be
        } catch {
            dt = Be
        }
        try {
            typeof clearTimeout == "function" ? pt = clearTimeout : pt = be
        } catch {
            pt = be
        }
    }
    )();
    function dn(n) {
        if (dt === setTimeout)
            return setTimeout(n, 0);
        if ((dt === Be || !dt) && setTimeout)
            return dt = setTimeout,
            setTimeout(n, 0);
        try {
            return dt(n, 0)
        } catch {
            try {
                return dt.call(null, n, 0)
            } catch {
                return dt.call(this, n, 0)
            }
        }
    }
    function pr(n) {
        if (pt === clearTimeout)
            return clearTimeout(n);
        if ((pt === be || !pt) && clearTimeout)
            return pt = clearTimeout,
            clearTimeout(n);
        try {
            return pt(n)
        } catch {
            try {
                return pt.call(null, n)
            } catch {
                return pt.call(this, n)
            }
        }
    }
    var _t = [], Ut = !1, At, Jt = -1;
    function yr() {
        !Ut || !At || (Ut = !1,
        At.length ? _t = At.concat(_t) : Jt = -1,
        _t.length && pn())
    }
    function pn() {
        if (!Ut) {
            var n = dn(yr);
            Ut = !0;
            for (var t = _t.length; t; ) {
                for (At = _t,
                _t = []; ++Jt < t; )
                    At && At[Jt].run();
                Jt = -1,
                t = _t.length
            }
            At = null,
            Ut = !1,
            pr(n)
        }
    }
    W.nextTick = function(n) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var e = 1; e < arguments.length; e++)
                t[e - 1] = arguments[e];
        _t.push(new yn(n,t)),
        _t.length === 1 && !Ut && dn(pn)
    }
    ;
    function yn(n, t) {
        this.fun = n,
        this.array = t
    }
    yn.prototype.run = function() {
        this.fun.apply(null, this.array)
    }
    ;
    W.title = "browser";
    W.browser = !0;
    W.env = {};
    W.argv = [];
    W.version = "";
    W.versions = {};
    function wt() {}
    W.on = wt;
    W.addListener = wt;
    W.once = wt;
    W.off = wt;
    W.removeListener = wt;
    W.removeAllListeners = wt;
    W.emit = wt;
    W.prependListener = wt;
    W.prependOnceListener = wt;
    W.listeners = function(n) {
        return []
    }
    ;
    W.binding = function(n) {
        throw new Error("process.binding is not supported")
    }
    ;
    W.cwd = function() {
        return "/"
    }
    ;
    W.chdir = function(n) {
        throw new Error("process.chdir is not supported")
    }
    ;
    W.umask = function() {
        return 0
    }
}
);
(function(n) {
    let t = n.performance;
    function e(O) {
        t && t.mark && t.mark(O)
    }
    function r(O, x) {
        t && t.measure && t.measure(O, x)
    }
    e("Zone");
    let i = n.__Zone_symbol_prefix || "__zone_symbol__";
    function o(O) {
        return i + O
    }
    let s = n[o("forceDuplicateZoneCheck")] === !0;
    if (n.Zone) {
        if (s || typeof n.Zone.__symbol__ != "function")
            throw new Error("Zone already loaded.");
        return n.Zone
    }
    let f = ( () => {
        class O {
            static{this.__symbol__ = o
            }static assertZonePatched() {
                if (n.Promise !== at.ZoneAwarePromise)
                    throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")
            }
            static get root() {
                let c = O.current;
                for (; c.parent; )
                    c = c.parent;
                return c
            }
            static get current() {
                return V.zone
            }
            static get currentTask() {
                return ct
            }
            static __load_patch(c, u, B=!1) {
                if (at.hasOwnProperty(c)) {
                    if (!B && s)
                        throw Error("Already loaded patch: " + c)
                } else if (!n["__Zone_disable_" + c]) {
                    let P = "Zone:" + c;
                    e(P),
                    at[c] = u(n, O, Y),
                    r(P, P)
                }
            }
            get parent() {
                return this._parent
            }
            get name() {
                return this._name
            }
            constructor(c, u) {
                this._parent = c,
                this._name = u ? u.name || "unnamed" : "<root>",
                this._properties = u && u.properties || {},
                this._zoneDelegate = new y(this,this._parent && this._parent._zoneDelegate,u)
            }
            get(c) {
                let u = this.getZoneWith(c);
                if (u)
                    return u._properties[c]
            }
            getZoneWith(c) {
                let u = this;
                for (; u; ) {
                    if (u._properties.hasOwnProperty(c))
                        return u;
                    u = u._parent
                }
                return null
            }
            fork(c) {
                if (!c)
                    throw new Error("ZoneSpec required!");
                return this._zoneDelegate.fork(this, c)
            }
            wrap(c, u) {
                if (typeof c != "function")
                    throw new Error("Expecting function got: " + c);
                let B = this._zoneDelegate.intercept(this, c, u)
                  , P = this;
                return function() {
                    return P.runGuarded(B, this, arguments, u)
                }
            }
            run(c, u, B, P) {
                V = {
                    parent: V,
                    zone: this
                };
                try {
                    return this._zoneDelegate.invoke(this, c, u, B, P)
                } finally {
                    V = V.parent
                }
            }
            runGuarded(c, u=null, B, P) {
                V = {
                    parent: V,
                    zone: this
                };
                try {
                    try {
                        return this._zoneDelegate.invoke(this, c, u, B, P)
                    } catch (K) {
                        if (this._zoneDelegate.handleError(this, K))
                            throw K
                    }
                } finally {
                    V = V.parent
                }
            }
            runTask(c, u, B) {
                if (c.zone != this)
                    throw new Error("A task can only be run in the zone of creation! (Creation: " + (c.zone || tt).name + "; Execution: " + this.name + ")");
                if (c.state === $ && (c.type === nt || c.type === R))
                    return;
                let P = c.state != w;
                P && c._transitionTo(w, L),
                c.runCount++;
                let K = ct;
                ct = c,
                V = {
                    parent: V,
                    zone: this
                };
                try {
                    c.type == R && c.data && !c.data.isPeriodic && (c.cancelFn = void 0);
                    try {
                        return this._zoneDelegate.invokeTask(this, c, u, B)
                    } catch (p) {
                        if (this._zoneDelegate.handleError(this, p))
                            throw p
                    }
                } finally {
                    c.state !== $ && c.state !== T && (c.type == nt || c.data && c.data.isPeriodic ? P && c._transitionTo(L, w) : (c.runCount = 0,
                    this._updateTaskCount(c, -1),
                    P && c._transitionTo($, w, $))),
                    V = V.parent,
                    ct = K
                }
            }
            scheduleTask(c) {
                if (c.zone && c.zone !== this) {
                    let B = this;
                    for (; B; ) {
                        if (B === c.zone)
                            throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${c.zone.name}`);
                        B = B.parent
                    }
                }
                c._transitionTo(X, $);
                let u = [];
                c._zoneDelegates = u,
                c._zone = this;
                try {
                    c = this._zoneDelegate.scheduleTask(this, c)
                } catch (B) {
                    throw c._transitionTo(T, X, $),
                    this._zoneDelegate.handleError(this, B),
                    B
                }
                return c._zoneDelegates === u && this._updateTaskCount(c, 1),
                c.state == X && c._transitionTo(L, X),
                c
            }
            scheduleMicroTask(c, u, B, P) {
                return this.scheduleTask(new h(D,c,u,B,P,void 0))
            }
            scheduleMacroTask(c, u, B, P, K) {
                return this.scheduleTask(new h(R,c,u,B,P,K))
            }
            scheduleEventTask(c, u, B, P, K) {
                return this.scheduleTask(new h(nt,c,u,B,P,K))
            }
            cancelTask(c) {
                if (c.zone != this)
                    throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (c.zone || tt).name + "; Execution: " + this.name + ")");
                if (!(c.state !== L && c.state !== w)) {
                    c._transitionTo(j, L, w);
                    try {
                        this._zoneDelegate.cancelTask(this, c)
                    } catch (u) {
                        throw c._transitionTo(T, j),
                        this._zoneDelegate.handleError(this, u),
                        u
                    }
                    return this._updateTaskCount(c, -1),
                    c._transitionTo($, j),
                    c.runCount = 0,
                    c
                }
            }
            _updateTaskCount(c, u) {
                let B = c._zoneDelegates;
                u == -1 && (c._zoneDelegates = null);
                for (let P = 0; P < B.length; P++)
                    B[P]._updateTaskCount(c.type, u)
            }
        }
        return O
    }
    )()
      , d = {
        name: "",
        onHasTask: (O, x, c, u) => O.hasTask(c, u),
        onScheduleTask: (O, x, c, u) => O.scheduleTask(c, u),
        onInvokeTask: (O, x, c, u, B, P) => O.invokeTask(c, u, B, P),
        onCancelTask: (O, x, c, u) => O.cancelTask(c, u)
    };
    class y {
        constructor(x, c, u) {
            this._taskCounts = {
                microTask: 0,
                macroTask: 0,
                eventTask: 0
            },
            this.zone = x,
            this._parentDelegate = c,
            this._forkZS = u && (u && u.onFork ? u : c._forkZS),
            this._forkDlgt = u && (u.onFork ? c : c._forkDlgt),
            this._forkCurrZone = u && (u.onFork ? this.zone : c._forkCurrZone),
            this._interceptZS = u && (u.onIntercept ? u : c._interceptZS),
            this._interceptDlgt = u && (u.onIntercept ? c : c._interceptDlgt),
            this._interceptCurrZone = u && (u.onIntercept ? this.zone : c._interceptCurrZone),
            this._invokeZS = u && (u.onInvoke ? u : c._invokeZS),
            this._invokeDlgt = u && (u.onInvoke ? c : c._invokeDlgt),
            this._invokeCurrZone = u && (u.onInvoke ? this.zone : c._invokeCurrZone),
            this._handleErrorZS = u && (u.onHandleError ? u : c._handleErrorZS),
            this._handleErrorDlgt = u && (u.onHandleError ? c : c._handleErrorDlgt),
            this._handleErrorCurrZone = u && (u.onHandleError ? this.zone : c._handleErrorCurrZone),
            this._scheduleTaskZS = u && (u.onScheduleTask ? u : c._scheduleTaskZS),
            this._scheduleTaskDlgt = u && (u.onScheduleTask ? c : c._scheduleTaskDlgt),
            this._scheduleTaskCurrZone = u && (u.onScheduleTask ? this.zone : c._scheduleTaskCurrZone),
            this._invokeTaskZS = u && (u.onInvokeTask ? u : c._invokeTaskZS),
            this._invokeTaskDlgt = u && (u.onInvokeTask ? c : c._invokeTaskDlgt),
            this._invokeTaskCurrZone = u && (u.onInvokeTask ? this.zone : c._invokeTaskCurrZone),
            this._cancelTaskZS = u && (u.onCancelTask ? u : c._cancelTaskZS),
            this._cancelTaskDlgt = u && (u.onCancelTask ? c : c._cancelTaskDlgt),
            this._cancelTaskCurrZone = u && (u.onCancelTask ? this.zone : c._cancelTaskCurrZone),
            this._hasTaskZS = null,
            this._hasTaskDlgt = null,
            this._hasTaskDlgtOwner = null,
            this._hasTaskCurrZone = null;
            let B = u && u.onHasTask
              , P = c && c._hasTaskZS;
            (B || P) && (this._hasTaskZS = B ? u : d,
            this._hasTaskDlgt = c,
            this._hasTaskDlgtOwner = this,
            this._hasTaskCurrZone = x,
            u.onScheduleTask || (this._scheduleTaskZS = d,
            this._scheduleTaskDlgt = c,
            this._scheduleTaskCurrZone = this.zone),
            u.onInvokeTask || (this._invokeTaskZS = d,
            this._invokeTaskDlgt = c,
            this._invokeTaskCurrZone = this.zone),
            u.onCancelTask || (this._cancelTaskZS = d,
            this._cancelTaskDlgt = c,
            this._cancelTaskCurrZone = this.zone))
        }
        fork(x, c) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, x, c) : new f(x,c)
        }
        intercept(x, c, u) {
            return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, x, c, u) : c
        }
        invoke(x, c, u, B, P) {
            return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, x, c, u, B, P) : c.apply(u, B)
        }
        handleError(x, c) {
            return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, x, c) : !0
        }
        scheduleTask(x, c) {
            let u = c;
            if (this._scheduleTaskZS)
                this._hasTaskZS && u._zoneDelegates.push(this._hasTaskDlgtOwner),
                u = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, x, c),
                u || (u = c);
            else if (c.scheduleFn)
                c.scheduleFn(c);
            else if (c.type == D)
                S(c);
            else
                throw new Error("Task is missing scheduleFn.");
            return u
        }
        invokeTask(x, c, u, B) {
            return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, x, c, u, B) : c.callback.apply(u, B)
        }
        cancelTask(x, c) {
            let u;
            if (this._cancelTaskZS)
                u = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, x, c);
            else {
                if (!c.cancelFn)
                    throw Error("Task is not cancelable");
                u = c.cancelFn(c)
            }
            return u
        }
        hasTask(x, c) {
            try {
                this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, x, c)
            } catch (u) {
                this.handleError(x, u)
            }
        }
        _updateTaskCount(x, c) {
            let u = this._taskCounts
              , B = u[x]
              , P = u[x] = B + c;
            if (P < 0)
                throw new Error("More tasks executed then were scheduled.");
            if (B == 0 || P == 0) {
                let K = {
                    microTask: u.microTask > 0,
                    macroTask: u.macroTask > 0,
                    eventTask: u.eventTask > 0,
                    change: x
                };
                this.hasTask(this.zone, K)
            }
        }
    }
    class h {
        constructor(x, c, u, B, P, K) {
            if (this._zone = null,
            this.runCount = 0,
            this._zoneDelegates = null,
            this._state = "notScheduled",
            this.type = x,
            this.source = c,
            this.data = B,
            this.scheduleFn = P,
            this.cancelFn = K,
            !u)
                throw new Error("callback is not defined");
            this.callback = u;
            let p = this;
            x === nt && B && B.useG ? this.invoke = h.invokeTask : this.invoke = function() {
                return h.invokeTask.call(n, p, this, arguments)
            }
        }
        static invokeTask(x, c, u) {
            x || (x = this),
            rt++;
            try {
                return x.runCount++,
                x.zone.runTask(x, c, u)
            } finally {
                rt == 1 && _(),
                rt--
            }
        }
        get zone() {
            return this._zone
        }
        get state() {
            return this._state
        }
        cancelScheduleRequest() {
            this._transitionTo($, X)
        }
        _transitionTo(x, c, u) {
            if (this._state === c || this._state === u)
                this._state = x,
                x == $ && (this._zoneDelegates = null);
            else
                throw new Error(`${this.type} '${this.source}': can not transition to '${x}', expecting state '${c}'${u ? " or '" + u + "'" : ""}, was '${this._state}'.`)
        }
        toString() {
            return this.data && typeof this.data.handleId < "u" ? this.data.handleId.toString() : Object.prototype.toString.call(this)
        }
        toJSON() {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                runCount: this.runCount
            }
        }
    }
    let m = o("setTimeout"), A = o("Promise"), b = o("then"), Z = [], U = !1, et;
    function q(O) {
        if (et || n[A] && (et = n[A].resolve(0)),
        et) {
            let x = et[b];
            x || (x = et.then),
            x.call(et, O)
        } else
            n[m](O, 0)
    }
    function S(O) {
        rt === 0 && Z.length === 0 && q(_),
        O && Z.push(O)
    }
    function _() {
        if (!U) {
            for (U = !0; Z.length; ) {
                let O = Z;
                Z = [];
                for (let x = 0; x < O.length; x++) {
                    let c = O[x];
                    try {
                        c.zone.runTask(c, null, null)
                    } catch (u) {
                        Y.onUnhandledError(u)
                    }
                }
            }
            Y.microtaskDrainDone(),
            U = !1
        }
    }
    let tt = {
        name: "NO ZONE"
    }
      , $ = "notScheduled"
      , X = "scheduling"
      , L = "scheduled"
      , w = "running"
      , j = "canceling"
      , T = "unknown"
      , D = "microTask"
      , R = "macroTask"
      , nt = "eventTask"
      , at = {}
      , Y = {
        symbol: o,
        currentZoneFrame: () => V,
        onUnhandledError: z,
        microtaskDrainDone: z,
        scheduleMicroTask: S,
        showUncaughtError: () => !f[o("ignoreConsoleErrorUncaughtError")],
        patchEventTarget: () => [],
        patchOnProperties: z,
        patchMethod: () => z,
        bindArguments: () => [],
        patchThen: () => z,
        patchMacroTask: () => z,
        patchEventPrototype: () => z,
        isIEOrEdge: () => !1,
        getGlobalObjects: () => {}
        ,
        ObjectDefineProperty: () => z,
        ObjectGetOwnPropertyDescriptor: () => {}
        ,
        ObjectCreate: () => {}
        ,
        ArraySlice: () => [],
        patchClass: () => z,
        wrapWithCurrentZone: () => z,
        filterProperties: () => [],
        attachOriginToPatched: () => z,
        _redefineProperty: () => z,
        patchCallbacks: () => z,
        nativeScheduleMicroTask: q
    }
      , V = {
        parent: null,
        zone: new f(null,null)
    }
      , ct = null
      , rt = 0;
    function z() {}
    return r("Zone", "Zone"),
    n.Zone = f
}
)(typeof window < "u" && window || typeof self < "u" && self || global);
var Mt = Object.getOwnPropertyDescriptor
  , se = Object.defineProperty
  , ce = Object.getPrototypeOf
  , _n = Object.create
  , wn = Array.prototype.slice
  , ue = "addEventListener"
  , ae = "removeEventListener"
  , ne = Zone.__symbol__(ue)
  , re = Zone.__symbol__(ae)
  , yt = "true"
  , Et = "false"
  , Zt = Zone.__symbol__("");
function le(n, t) {
    return Zone.current.wrap(n, t)
}
function fe(n, t, e, r, i) {
    return Zone.current.scheduleMacroTask(n, t, e, r, i)
}
var M = Zone.__symbol__
  , qt = typeof window < "u"
  , Nt = qt ? window : void 0
  , J = qt && Nt || typeof self == "object" && self || global
  , xn = "removeAttribute";
function he(n, t) {
    for (let e = n.length - 1; e >= 0; e--)
        typeof n[e] == "function" && (n[e] = le(n[e], t + "_" + e));
    return n
}
function kn(n, t) {
    let e = n.constructor.name;
    for (let r = 0; r < t.length; r++) {
        let i = t[r]
          , o = n[i];
        if (o) {
            let s = Mt(n, i);
            if (!Oe(s))
                continue;
            n[i] = (f => {
                let d = function() {
                    return f.apply(this, he(arguments, e + "." + i))
                };
                return gt(d, f),
                d
            }
            )(o)
        }
    }
}
function Oe(n) {
    return n ? n.writable === !1 ? !1 : !(typeof n.get == "function" && typeof n.set > "u") : !0
}
var Ue = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope
  , Wt = !("nw"in J) && typeof J.process < "u" && {}.toString.call(J.process) === "[object process]"
  , de = !Wt && !Ue && !!(qt && Nt.HTMLElement)
  , Le = typeof J.process < "u" && {}.toString.call(J.process) === "[object process]" && !Ue && !!(qt && Nt.HTMLElement)
  , zt = {}
  , Ne = function(n) {
    if (n = n || J.event,
    !n)
        return;
    let t = zt[n.type];
    t || (t = zt[n.type] = M("ON_PROPERTY" + n.type));
    let e = this || n.target || J, r = e[t], i;
    if (de && e === Nt && n.type === "error") {
        let o = n;
        i = r && r.call(this, o.message, o.filename, o.lineno, o.colno, o.error),
        i === !0 && n.preventDefault()
    } else
        i = r && r.apply(this, arguments),
        i != null && !i && n.preventDefault();
    return i
};
function ve(n, t, e) {
    let r = Mt(n, t);
    if (!r && e && Mt(e, t) && (r = {
        enumerable: !0,
        configurable: !0
    }),
    !r || !r.configurable)
        return;
    let i = M("on" + t + "patched");
    if (n.hasOwnProperty(i) && n[i])
        return;
    delete r.writable,
    delete r.value;
    let o = r.get
      , s = r.set
      , f = t.slice(2)
      , d = zt[f];
    d || (d = zt[f] = M("ON_PROPERTY" + f)),
    r.set = function(y) {
        let h = this;
        if (!h && n === J && (h = J),
        !h)
            return;
        typeof h[d] == "function" && h.removeEventListener(f, Ne),
        s && s.call(h, null),
        h[d] = y,
        typeof y == "function" && h.addEventListener(f, Ne, !1)
    }
    ,
    r.get = function() {
        let y = this;
        if (!y && n === J && (y = J),
        !y)
            return null;
        let h = y[d];
        if (h)
            return h;
        if (o) {
            let m = o.call(this);
            if (m)
                return r.set.call(this, m),
                typeof y[xn] == "function" && y.removeAttribute(t),
                m
        }
        return null
    }
    ,
    se(n, t, r),
    n[i] = !0
}
function Me(n, t, e) {
    if (t)
        for (let r = 0; r < t.length; r++)
            ve(n, "on" + t[r], e);
    else {
        let r = [];
        for (let i in n)
            i.slice(0, 2) == "on" && r.push(i);
        for (let i = 0; i < r.length; i++)
            ve(n, r[i], e)
    }
}
var ut = M("originalInstance");
function $t(n) {
    let t = J[n];
    if (!t)
        return;
    J[M(n)] = t,
    J[n] = function() {
        let i = he(arguments, n);
        switch (i.length) {
        case 0:
            this[ut] = new t;
            break;
        case 1:
            this[ut] = new t(i[0]);
            break;
        case 2:
            this[ut] = new t(i[0],i[1]);
            break;
        case 3:
            this[ut] = new t(i[0],i[1],i[2]);
            break;
        case 4:
            this[ut] = new t(i[0],i[1],i[2],i[3]);
            break;
        default:
            throw new Error("Arg list too long.")
        }
    }
    ,
    gt(J[n], t);
    let e = new t(function() {}
    ), r;
    for (r in e)
        n === "XMLHttpRequest" && r === "responseBlob" || function(i) {
            typeof e[i] == "function" ? J[n].prototype[i] = function() {
                return this[ut][i].apply(this[ut], arguments)
            }
            : se(J[n].prototype, i, {
                set: function(o) {
                    typeof o == "function" ? (this[ut][i] = le(o, n + "." + i),
                    gt(this[ut][i], o)) : this[ut][i] = o
                },
                get: function() {
                    return this[ut][i]
                }
            })
        }(r);
    for (r in t)
        r !== "prototype" && t.hasOwnProperty(r) && (J[n][r] = t[r])
}
function mt(n, t, e) {
    let r = n;
    for (; r && !r.hasOwnProperty(t); )
        r = ce(r);
    !r && n[t] && (r = n);
    let i = M(t)
      , o = null;
    if (r && (!(o = r[i]) || !r.hasOwnProperty(i))) {
        o = r[i] = r[t];
        let s = r && Mt(r, t);
        if (Oe(s)) {
            let f = e(o, i, t);
            r[t] = function() {
                return f(this, arguments)
            }
            ,
            gt(r[t], o)
        }
    }
    return o
}
function In(n, t, e) {
    let r = null;
    function i(o) {
        let s = o.data;
        return s.args[s.cbIdx] = function() {
            o.invoke.apply(this, arguments)
        }
        ,
        r.apply(s.target, s.args),
        o
    }
    r = mt(n, t, o => function(s, f) {
        let d = e(s, f);
        return d.cbIdx >= 0 && typeof f[d.cbIdx] == "function" ? fe(d.name, f[d.cbIdx], d, i) : o.apply(s, f)
    }
    )
}
function gt(n, t) {
    n[M("OriginalDelegate")] = t
}
var Fe = !1
  , ie = !1;
function Bn() {
    try {
        let n = Nt.navigator.userAgent;
        if (n.indexOf("MSIE ") !== -1 || n.indexOf("Trident/") !== -1)
            return !0
    } catch {}
    return !1
}
function bn() {
    if (Fe)
        return ie;
    Fe = !0;
    try {
        let n = Nt.navigator.userAgent;
        (n.indexOf("MSIE ") !== -1 || n.indexOf("Trident/") !== -1 || n.indexOf("Edge/") !== -1) && (ie = !0)
    } catch {}
    return ie
}
Zone.__load_patch("ZoneAwarePromise", (n, t, e) => {
    let r = Object.getOwnPropertyDescriptor
      , i = Object.defineProperty;
    function o(p) {
        if (p && p.toString === Object.prototype.toString) {
            let E = p.constructor && p.constructor.name;
            return (E || "") + ": " + JSON.stringify(p)
        }
        return p ? p.toString() : Object.prototype.toString.call(p)
    }
    let s = e.symbol
      , f = []
      , d = n[s("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] === !0
      , y = s("Promise")
      , h = s("then")
      , m = "__creationTrace__";
    e.onUnhandledError = p => {
        if (e.showUncaughtError()) {
            let E = p && p.rejection;
            E ? console.error("Unhandled Promise rejection:", E instanceof Error ? E.message : E, "; Zone:", p.zone.name, "; Task:", p.task && p.task.source, "; Value:", E, E instanceof Error ? E.stack : void 0) : console.error(p)
        }
    }
    ,
    e.microtaskDrainDone = () => {
        for (; f.length; ) {
            let p = f.shift();
            try {
                p.zone.runGuarded( () => {
                    throw p.throwOriginal ? p.rejection : p
                }
                )
            } catch (E) {
                b(E)
            }
        }
    }
    ;
    let A = s("unhandledPromiseRejectionHandler");
    function b(p) {
        e.onUnhandledError(p);
        try {
            let E = t[A];
            typeof E == "function" && E.call(this, p)
        } catch {}
    }
    function Z(p) {
        return p && p.then
    }
    function U(p) {
        return p
    }
    function et(p) {
        return c.reject(p)
    }
    let q = s("state")
      , S = s("value")
      , _ = s("finally")
      , tt = s("parentPromiseValue")
      , $ = s("parentPromiseState")
      , X = "Promise.then"
      , L = null
      , w = !0
      , j = !1
      , T = 0;
    function D(p, E) {
        return l => {
            try {
                Y(p, E, l)
            } catch (g) {
                Y(p, !1, g)
            }
        }
    }
    let R = function() {
        let p = !1;
        return function(l) {
            return function() {
                p || (p = !0,
                l.apply(null, arguments))
            }
        }
    }
      , nt = "Promise resolved with itself"
      , at = s("currentTaskTrace");
    function Y(p, E, l) {
        let g = R();
        if (p === l)
            throw new TypeError(nt);
        if (p[q] === L) {
            let I = null;
            try {
                (typeof l == "object" || typeof l == "function") && (I = l && l.then)
            } catch (C) {
                return g( () => {
                    Y(p, !1, C)
                }
                )(),
                p
            }
            if (E !== j && l instanceof c && l.hasOwnProperty(q) && l.hasOwnProperty(S) && l[q] !== L)
                ct(l),
                Y(p, l[q], l[S]);
            else if (E !== j && typeof I == "function")
                try {
                    I.call(l, g(D(p, E)), g(D(p, !1)))
                } catch (C) {
                    g( () => {
                        Y(p, !1, C)
                    }
                    )()
                }
            else {
                p[q] = E;
                let C = p[S];
                if (p[S] = l,
                p[_] === _ && E === w && (p[q] = p[$],
                p[S] = p[tt]),
                E === j && l instanceof Error) {
                    let k = t.currentTask && t.currentTask.data && t.currentTask.data[m];
                    k && i(l, at, {
                        configurable: !0,
                        enumerable: !1,
                        writable: !0,
                        value: k
                    })
                }
                for (let k = 0; k < C.length; )
                    rt(p, C[k++], C[k++], C[k++], C[k++]);
                if (C.length == 0 && E == j) {
                    p[q] = T;
                    let k = l;
                    try {
                        throw new Error("Uncaught (in promise): " + o(l) + (l && l.stack ? `
` + l.stack : ""))
                    } catch (N) {
                        k = N
                    }
                    d && (k.throwOriginal = !0),
                    k.rejection = l,
                    k.promise = p,
                    k.zone = t.current,
                    k.task = t.currentTask,
                    f.push(k),
                    e.scheduleMicroTask()
                }
            }
        }
        return p
    }
    let V = s("rejectionHandledHandler");
    function ct(p) {
        if (p[q] === T) {
            try {
                let E = t[V];
                E && typeof E == "function" && E.call(this, {
                    rejection: p[S],
                    promise: p
                })
            } catch {}
            p[q] = j;
            for (let E = 0; E < f.length; E++)
                p === f[E].promise && f.splice(E, 1)
        }
    }
    function rt(p, E, l, g, I) {
        ct(p);
        let C = p[q]
          , k = C ? typeof g == "function" ? g : U : typeof I == "function" ? I : et;
        E.scheduleMicroTask(X, () => {
            try {
                let N = p[S]
                  , v = !!l && _ === l[_];
                v && (l[tt] = N,
                l[$] = C);
                let F = E.run(k, void 0, v && k !== et && k !== U ? [] : [N]);
                Y(l, !0, F)
            } catch (N) {
                Y(l, !1, N)
            }
        }
        , l)
    }
    let z = "function ZoneAwarePromise() { [native code] }"
      , O = function() {}
      , x = n.AggregateError;
    class c {
        static toString() {
            return z
        }
        static resolve(E) {
            return Y(new this(null), w, E)
        }
        static reject(E) {
            return Y(new this(null), j, E)
        }
        static any(E) {
            if (!E || typeof E[Symbol.iterator] != "function")
                return Promise.reject(new x([],"All promises were rejected"));
            let l = []
              , g = 0;
            try {
                for (let k of E)
                    g++,
                    l.push(c.resolve(k))
            } catch {
                return Promise.reject(new x([],"All promises were rejected"))
            }
            if (g === 0)
                return Promise.reject(new x([],"All promises were rejected"));
            let I = !1
              , C = [];
            return new c( (k, N) => {
                for (let v = 0; v < l.length; v++)
                    l[v].then(F => {
                        I || (I = !0,
                        k(F))
                    }
                    , F => {
                        C.push(F),
                        g--,
                        g === 0 && (I = !0,
                        N(new x(C,"All promises were rejected")))
                    }
                    )
            }
            )
        }
        static race(E) {
            let l, g, I = new this( (N, v) => {
                l = N,
                g = v
            }
            );
            function C(N) {
                l(N)
            }
            function k(N) {
                g(N)
            }
            for (let N of E)
                Z(N) || (N = this.resolve(N)),
                N.then(C, k);
            return I
        }
        static all(E) {
            return c.allWithCallback(E)
        }
        static allSettled(E) {
            return (this && this.prototype instanceof c ? this : c).allWithCallback(E, {
                thenCallback: g => ({
                    status: "fulfilled",
                    value: g
                }),
                errorCallback: g => ({
                    status: "rejected",
                    reason: g
                })
            })
        }
        static allWithCallback(E, l) {
            let g, I, C = new this( (F, H) => {
                g = F,
                I = H
            }
            ), k = 2, N = 0, v = [];
            for (let F of E) {
                Z(F) || (F = this.resolve(F));
                let H = N;
                try {
                    F.then(G => {
                        v[H] = l ? l.thenCallback(G) : G,
                        k--,
                        k === 0 && g(v)
                    }
                    , G => {
                        l ? (v[H] = l.errorCallback(G),
                        k--,
                        k === 0 && g(v)) : I(G)
                    }
                    )
                } catch (G) {
                    I(G)
                }
                k++,
                N++
            }
            return k -= 2,
            k === 0 && g(v),
            C
        }
        constructor(E) {
            let l = this;
            if (!(l instanceof c))
                throw new Error("Must be an instanceof Promise.");
            l[q] = L,
            l[S] = [];
            try {
                let g = R();
                E && E(g(D(l, w)), g(D(l, j)))
            } catch (g) {
                Y(l, !1, g)
            }
        }
        get[Symbol.toStringTag]() {
            return "Promise"
        }
        get[Symbol.species]() {
            return c
        }
        then(E, l) {
            let g = this.constructor?.[Symbol.species];
            (!g || typeof g != "function") && (g = this.constructor || c);
            let I = new g(O)
              , C = t.current;
            return this[q] == L ? this[S].push(C, I, E, l) : rt(this, C, I, E, l),
            I
        }
        catch(E) {
            return this.then(null, E)
        }
        finally(E) {
            let l = this.constructor?.[Symbol.species];
            (!l || typeof l != "function") && (l = c);
            let g = new l(O);
            g[_] = _;
            let I = t.current;
            return this[q] == L ? this[S].push(I, g, E, E) : rt(this, I, g, E, E),
            g
        }
    }
    c.resolve = c.resolve,
    c.reject = c.reject,
    c.race = c.race,
    c.all = c.all;
    let u = n[y] = n.Promise;
    n.Promise = c;
    let B = s("thenPatched");
    function P(p) {
        let E = p.prototype
          , l = r(E, "then");
        if (l && (l.writable === !1 || !l.configurable))
            return;
        let g = E.then;
        E[h] = g,
        p.prototype.then = function(I, C) {
            return new c( (N, v) => {
                g.call(this, N, v)
            }
            ).then(I, C)
        }
        ,
        p[B] = !0
    }
    e.patchThen = P;
    function K(p) {
        return function(E, l) {
            let g = p.apply(E, l);
            if (g instanceof c)
                return g;
            let I = g.constructor;
            return I[B] || P(I),
            g
        }
    }
    return u && (P(u),
    mt(n, "fetch", p => K(p))),
    Promise[t.__symbol__("uncaughtPromiseErrors")] = f,
    c
}
);
Zone.__load_patch("toString", n => {
    let t = Function.prototype.toString
      , e = M("OriginalDelegate")
      , r = M("Promise")
      , i = M("Error")
      , o = function() {
        if (typeof this == "function") {
            let y = this[e];
            if (y)
                return typeof y == "function" ? t.call(y) : Object.prototype.toString.call(y);
            if (this === Promise) {
                let h = n[r];
                if (h)
                    return t.call(h)
            }
            if (this === Error) {
                let h = n[i];
                if (h)
                    return t.call(h)
            }
        }
        return t.call(this)
    };
    o[e] = t,
    Function.prototype.toString = o;
    let s = Object.prototype.toString
      , f = "[object Promise]";
    Object.prototype.toString = function() {
        return typeof Promise == "function" && this instanceof Promise ? f : s.call(this)
    }
}
);
var St = !1;
if (typeof window < "u")
    try {
        let n = Object.defineProperty({}, "passive", {
            get: function() {
                St = !0
            }
        });
        window.addEventListener("test", n, n),
        window.removeEventListener("test", n, n)
    } catch {
        St = !1
    }
var Rn = {
    useG: !0
}
  , ot = {}
  , Ze = {}
  , $e = new RegExp("^" + Zt + "(\\w+)(true|false)$")
  , je = M("propagationStopped");
function He(n, t) {
    let e = (t ? t(n) : n) + Et
      , r = (t ? t(n) : n) + yt
      , i = Zt + e
      , o = Zt + r;
    ot[n] = {},
    ot[n][Et] = i,
    ot[n][yt] = o
}
function An(n, t, e, r) {
    let i = r && r.add || ue
      , o = r && r.rm || ae
      , s = r && r.listeners || "eventListeners"
      , f = r && r.rmAll || "removeAllListeners"
      , d = M(i)
      , y = "." + i + ":"
      , h = "prependListener"
      , m = "." + h + ":"
      , A = function(S, _, tt) {
        if (S.isRemoved)
            return;
        let $ = S.callback;
        typeof $ == "object" && $.handleEvent && (S.callback = w => $.handleEvent(w),
        S.originalDelegate = $);
        let X;
        try {
            S.invoke(S, _, [tt])
        } catch (w) {
            X = w
        }
        let L = S.options;
        if (L && typeof L == "object" && L.once) {
            let w = S.originalDelegate ? S.originalDelegate : S.callback;
            _[o].call(_, tt.type, w, L)
        }
        return X
    };
    function b(S, _, tt) {
        if (_ = _ || n.event,
        !_)
            return;
        let $ = S || _.target || n
          , X = $[ot[_.type][tt ? yt : Et]];
        if (X) {
            let L = [];
            if (X.length === 1) {
                let w = A(X[0], $, _);
                w && L.push(w)
            } else {
                let w = X.slice();
                for (let j = 0; j < w.length && !(_ && _[je] === !0); j++) {
                    let T = A(w[j], $, _);
                    T && L.push(T)
                }
            }
            if (L.length === 1)
                throw L[0];
            for (let w = 0; w < L.length; w++) {
                let j = L[w];
                t.nativeScheduleMicroTask( () => {
                    throw j
                }
                )
            }
        }
    }
    let Z = function(S) {
        return b(this, S, !1)
    }
      , U = function(S) {
        return b(this, S, !0)
    };
    function et(S, _) {
        if (!S)
            return !1;
        let tt = !0;
        _ && _.useG !== void 0 && (tt = _.useG);
        let $ = _ && _.vh
          , X = !0;
        _ && _.chkDup !== void 0 && (X = _.chkDup);
        let L = !1;
        _ && _.rt !== void 0 && (L = _.rt);
        let w = S;
        for (; w && !w.hasOwnProperty(i); )
            w = ce(w);
        if (!w && S[i] && (w = S),
        !w || w[d])
            return !1;
        let j = _ && _.eventNameToString, T = {}, D = w[d] = w[i], R = w[M(o)] = w[o], nt = w[M(s)] = w[s], at = w[M(f)] = w[f], Y;
        _ && _.prepend && (Y = w[M(_.prepend)] = w[_.prepend]);
        function V(l, g) {
            return !St && typeof l == "object" && l ? !!l.capture : !St || !g ? l : typeof l == "boolean" ? {
                capture: l,
                passive: !0
            } : l ? typeof l == "object" && l.passive !== !1 ? {
                ...l,
                passive: !0
            } : l : {
                passive: !0
            }
        }
        let ct = function(l) {
            if (!T.isExisting)
                return D.call(T.target, T.eventName, T.capture ? U : Z, T.options)
        }
          , rt = function(l) {
            if (!l.isRemoved) {
                let g = ot[l.eventName], I;
                g && (I = g[l.capture ? yt : Et]);
                let C = I && l.target[I];
                if (C) {
                    for (let k = 0; k < C.length; k++)
                        if (C[k] === l) {
                            C.splice(k, 1),
                            l.isRemoved = !0,
                            C.length === 0 && (l.allRemoved = !0,
                            l.target[I] = null);
                            break
                        }
                }
            }
            if (l.allRemoved)
                return R.call(l.target, l.eventName, l.capture ? U : Z, l.options)
        }
          , z = function(l) {
            return D.call(T.target, T.eventName, l.invoke, T.options)
        }
          , O = function(l) {
            return Y.call(T.target, T.eventName, l.invoke, T.options)
        }
          , x = function(l) {
            return R.call(l.target, l.eventName, l.invoke, l.options)
        }
          , c = tt ? ct : z
          , u = tt ? rt : x
          , B = function(l, g) {
            let I = typeof g;
            return I === "function" && l.callback === g || I === "object" && l.originalDelegate === g
        }
          , P = _ && _.diff ? _.diff : B
          , K = Zone[M("UNPATCHED_EVENTS")]
          , p = n[M("PASSIVE_EVENTS")]
          , E = function(l, g, I, C, k=!1, N=!1) {
            return function() {
                let v = this || n
                  , F = arguments[0];
                _ && _.transferEventName && (F = _.transferEventName(F));
                let H = arguments[1];
                if (!H)
                    return l.apply(this, arguments);
                if (Wt && F === "uncaughtException")
                    return l.apply(this, arguments);
                let G = !1;
                if (typeof H != "function") {
                    if (!H.handleEvent)
                        return l.apply(this, arguments);
                    G = !0
                }
                if ($ && !$(l, H, v, arguments))
                    return;
                let xt = St && !!p && p.indexOf(F) !== -1
                  , lt = V(arguments[2], xt);
                if (K) {
                    for (let Bt = 0; Bt < K.length; Bt++)
                        if (F === K[Bt])
                            return xt ? l.call(v, F, H, lt) : l.apply(this, arguments)
                }
                let te = lt ? typeof lt == "boolean" ? !0 : lt.capture : !1
                  , Re = lt && typeof lt == "object" ? lt.once : !1
                  , Tn = Zone.current
                  , ee = ot[F];
                ee || (He(F, j),
                ee = ot[F]);
                let Ae = ee[te ? yt : Et]
                  , Ct = v[Ae]
                  , Ce = !1;
                if (Ct) {
                    if (Ce = !0,
                    X) {
                        for (let Bt = 0; Bt < Ct.length; Bt++)
                            if (P(Ct[Bt], H))
                                return
                    }
                } else
                    Ct = v[Ae] = [];
                let Ht, Se = v.constructor.name, Pe = Ze[Se];
                Pe && (Ht = Pe[F]),
                Ht || (Ht = Se + g + (j ? j(F) : F)),
                T.options = lt,
                Re && (T.options.once = !1),
                T.target = v,
                T.capture = te,
                T.eventName = F,
                T.isExisting = Ce;
                let Lt = tt ? Rn : void 0;
                Lt && (Lt.taskData = T);
                let kt = Tn.scheduleEventTask(Ht, H, Lt, I, C);
                if (T.target = null,
                Lt && (Lt.taskData = null),
                Re && (lt.once = !0),
                !St && typeof kt.options == "boolean" || (kt.options = lt),
                kt.target = v,
                kt.capture = te,
                kt.eventName = F,
                G && (kt.originalDelegate = H),
                N ? Ct.unshift(kt) : Ct.push(kt),
                k)
                    return v
            }
        };
        return w[i] = E(D, y, c, u, L),
        Y && (w[h] = E(Y, m, O, u, L, !0)),
        w[o] = function() {
            let l = this || n
              , g = arguments[0];
            _ && _.transferEventName && (g = _.transferEventName(g));
            let I = arguments[2]
              , C = I ? typeof I == "boolean" ? !0 : I.capture : !1
              , k = arguments[1];
            if (!k)
                return R.apply(this, arguments);
            if ($ && !$(R, k, l, arguments))
                return;
            let N = ot[g], v;
            N && (v = N[C ? yt : Et]);
            let F = v && l[v];
            if (F)
                for (let H = 0; H < F.length; H++) {
                    let G = F[H];
                    if (P(G, k)) {
                        if (F.splice(H, 1),
                        G.isRemoved = !0,
                        F.length === 0 && (G.allRemoved = !0,
                        l[v] = null,
                        typeof g == "string")) {
                            let xt = Zt + "ON_PROPERTY" + g;
                            l[xt] = null
                        }
                        return G.zone.cancelTask(G),
                        L ? l : void 0
                    }
                }
            return R.apply(this, arguments)
        }
        ,
        w[s] = function() {
            let l = this || n
              , g = arguments[0];
            _ && _.transferEventName && (g = _.transferEventName(g));
            let I = []
              , C = Ge(l, j ? j(g) : g);
            for (let k = 0; k < C.length; k++) {
                let N = C[k]
                  , v = N.originalDelegate ? N.originalDelegate : N.callback;
                I.push(v)
            }
            return I
        }
        ,
        w[f] = function() {
            let l = this || n
              , g = arguments[0];
            if (g) {
                _ && _.transferEventName && (g = _.transferEventName(g));
                let I = ot[g];
                if (I) {
                    let C = I[Et]
                      , k = I[yt]
                      , N = l[C]
                      , v = l[k];
                    if (N) {
                        let F = N.slice();
                        for (let H = 0; H < F.length; H++) {
                            let G = F[H]
                              , xt = G.originalDelegate ? G.originalDelegate : G.callback;
                            this[o].call(this, g, xt, G.options)
                        }
                    }
                    if (v) {
                        let F = v.slice();
                        for (let H = 0; H < F.length; H++) {
                            let G = F[H]
                              , xt = G.originalDelegate ? G.originalDelegate : G.callback;
                            this[o].call(this, g, xt, G.options)
                        }
                    }
                }
            } else {
                let I = Object.keys(l);
                for (let C = 0; C < I.length; C++) {
                    let k = I[C]
                      , N = $e.exec(k)
                      , v = N && N[1];
                    v && v !== "removeListener" && this[f].call(this, v)
                }
                this[f].call(this, "removeListener")
            }
            if (L)
                return this
        }
        ,
        gt(w[i], D),
        gt(w[o], R),
        at && gt(w[f], at),
        nt && gt(w[s], nt),
        !0
    }
    let q = [];
    for (let S = 0; S < e.length; S++)
        q[S] = et(e[S], r);
    return q
}
function Ge(n, t) {
    if (!t) {
        let o = [];
        for (let s in n) {
            let f = $e.exec(s)
              , d = f && f[1];
            if (d && (!t || d === t)) {
                let y = n[s];
                if (y)
                    for (let h = 0; h < y.length; h++)
                        o.push(y[h])
            }
        }
        return o
    }
    let e = ot[t];
    e || (He(t),
    e = ot[t]);
    let r = n[e[Et]]
      , i = n[e[yt]];
    return r ? i ? r.concat(i) : r.slice() : i ? i.slice() : []
}
function Cn(n, t) {
    let e = n.Event;
    e && e.prototype && t.patchMethod(e.prototype, "stopImmediatePropagation", r => function(i, o) {
        i[je] = !0,
        r && r.apply(i, o)
    }
    )
}
function Sn(n, t, e, r, i) {
    let o = Zone.__symbol__(r);
    if (t[o])
        return;
    let s = t[o] = t[r];
    t[r] = function(f, d, y) {
        return d && d.prototype && i.forEach(function(h) {
            let m = `${e}.${r}::` + h
              , A = d.prototype;
            try {
                if (A.hasOwnProperty(h)) {
                    let b = n.ObjectGetOwnPropertyDescriptor(A, h);
                    b && b.value ? (b.value = n.wrapWithCurrentZone(b.value, m),
                    n._redefineProperty(d.prototype, h, b)) : A[h] && (A[h] = n.wrapWithCurrentZone(A[h], m))
                } else
                    A[h] && (A[h] = n.wrapWithCurrentZone(A[h], m))
            } catch {}
        }),
        s.call(t, f, d, y)
    }
    ,
    n.attachOriginToPatched(t[r], s)
}
function Ve(n, t, e) {
    if (!e || e.length === 0)
        return t;
    let r = e.filter(o => o.target === n);
    if (!r || r.length === 0)
        return t;
    let i = r[0].ignoreProperties;
    return t.filter(o => i.indexOf(o) === -1)
}
function De(n, t, e, r) {
    if (!n)
        return;
    let i = Ve(n, t, e);
    Me(n, i, r)
}
function oe(n) {
    return Object.getOwnPropertyNames(n).filter(t => t.startsWith("on") && t.length > 2).map(t => t.substring(2))
}
function Pn(n, t) {
    if (Wt && !Le || Zone[n.symbol("patchEvents")])
        return;
    let e = t.__Zone_ignore_on_properties
      , r = [];
    if (de) {
        let i = window;
        r = r.concat(["Document", "SVGElement", "Element", "HTMLElement", "HTMLBodyElement", "HTMLMediaElement", "HTMLFrameSetElement", "HTMLFrameElement", "HTMLIFrameElement", "HTMLMarqueeElement", "Worker"]);
        let o = Bn() ? [{
            target: i,
            ignoreProperties: ["error"]
        }] : [];
        De(i, oe(i), e && e.concat(o), ce(i))
    }
    r = r.concat(["XMLHttpRequest", "XMLHttpRequestEventTarget", "IDBIndex", "IDBRequest", "IDBOpenDBRequest", "IDBDatabase", "IDBTransaction", "IDBCursor", "WebSocket"]);
    for (let i = 0; i < r.length; i++) {
        let o = t[r[i]];
        o && o.prototype && De(o.prototype, oe(o.prototype), e)
    }
}
Zone.__load_patch("util", (n, t, e) => {
    let r = oe(n);
    e.patchOnProperties = Me,
    e.patchMethod = mt,
    e.bindArguments = he,
    e.patchMacroTask = In;
    let i = t.__symbol__("BLACK_LISTED_EVENTS")
      , o = t.__symbol__("UNPATCHED_EVENTS");
    n[o] && (n[i] = n[o]),
    n[i] && (t[i] = t[o] = n[i]),
    e.patchEventPrototype = Cn,
    e.patchEventTarget = An,
    e.isIEOrEdge = bn,
    e.ObjectDefineProperty = se,
    e.ObjectGetOwnPropertyDescriptor = Mt,
    e.ObjectCreate = _n,
    e.ArraySlice = wn,
    e.patchClass = $t,
    e.wrapWithCurrentZone = le,
    e.filterProperties = Ve,
    e.attachOriginToPatched = gt,
    e._redefineProperty = Object.defineProperty,
    e.patchCallbacks = Sn,
    e.getGlobalObjects = () => ({
        globalSources: Ze,
        zoneSymbolEventNames: ot,
        eventNames: r,
        isBrowser: de,
        isMix: Le,
        isNode: Wt,
        TRUE_STR: yt,
        FALSE_STR: Et,
        ZONE_SYMBOL_PREFIX: Zt,
        ADD_EVENT_LISTENER_STR: ue,
        REMOVE_EVENT_LISTENER_STR: ae
    })
}
);
function Nn(n, t) {
    t.patchMethod(n, "queueMicrotask", e => function(r, i) {
        Zone.current.scheduleMicroTask("queueMicrotask", i[0])
    }
    )
}
var Vt = M("zoneTask");
function Pt(n, t, e, r) {
    let i = null
      , o = null;
    t += r,
    e += r;
    let s = {};
    function f(y) {
        let h = y.data;
        return h.args[0] = function() {
            return y.invoke.apply(this, arguments)
        }
        ,
        h.handleId = i.apply(n, h.args),
        y
    }
    function d(y) {
        return o.call(n, y.data.handleId)
    }
    i = mt(n, t, y => function(h, m) {
        if (typeof m[0] == "function") {
            let A = {
                isPeriodic: r === "Interval",
                delay: r === "Timeout" || r === "Interval" ? m[1] || 0 : void 0,
                args: m
            }
              , b = m[0];
            m[0] = function() {
                try {
                    return b.apply(this, arguments)
                } finally {
                    A.isPeriodic || (typeof A.handleId == "number" ? delete s[A.handleId] : A.handleId && (A.handleId[Vt] = null))
                }
            }
            ;
            let Z = fe(t, m[0], A, f, d);
            if (!Z)
                return Z;
            let U = Z.data.handleId;
            return typeof U == "number" ? s[U] = Z : U && (U[Vt] = Z),
            U && U.ref && U.unref && typeof U.ref == "function" && typeof U.unref == "function" && (Z.ref = U.ref.bind(U),
            Z.unref = U.unref.bind(U)),
            typeof U == "number" || U ? U : Z
        } else
            return y.apply(n, m)
    }
    ),
    o = mt(n, e, y => function(h, m) {
        let A = m[0], b;
        typeof A == "number" ? b = s[A] : (b = A && A[Vt],
        b || (b = A)),
        b && typeof b.type == "string" ? b.state !== "notScheduled" && (b.cancelFn && b.data.isPeriodic || b.runCount === 0) && (typeof A == "number" ? delete s[A] : A && (A[Vt] = null),
        b.zone.cancelTask(b)) : y.apply(n, m)
    }
    )
}
function vn(n, t) {
    let {isBrowser: e, isMix: r} = t.getGlobalObjects();
    if (!e && !r || !n.customElements || !("customElements"in n))
        return;
    let i = ["connectedCallback", "disconnectedCallback", "adoptedCallback", "attributeChangedCallback"];
    t.patchCallbacks(t, n.customElements, "customElements", "define", i)
}
function Fn(n, t) {
    if (Zone[t.symbol("patchEventTarget")])
        return;
    let {eventNames: e, zoneSymbolEventNames: r, TRUE_STR: i, FALSE_STR: o, ZONE_SYMBOL_PREFIX: s} = t.getGlobalObjects();
    for (let d = 0; d < e.length; d++) {
        let y = e[d]
          , h = y + o
          , m = y + i
          , A = s + h
          , b = s + m;
        r[y] = {},
        r[y][o] = A,
        r[y][i] = b
    }
    let f = n.EventTarget;
    if (!(!f || !f.prototype))
        return t.patchEventTarget(n, t, [f && f.prototype]),
        !0
}
function Dn(n, t) {
    t.patchEventPrototype(n, t)
}
Zone.__load_patch("legacy", n => {
    let t = n[Zone.__symbol__("legacyPatch")];
    t && t()
}
);
Zone.__load_patch("timers", n => {
    let t = "set"
      , e = "clear";
    Pt(n, t, e, "Timeout"),
    Pt(n, t, e, "Interval"),
    Pt(n, t, e, "Immediate")
}
);
Zone.__load_patch("requestAnimationFrame", n => {
    Pt(n, "request", "cancel", "AnimationFrame"),
    Pt(n, "mozRequest", "mozCancel", "AnimationFrame"),
    Pt(n, "webkitRequest", "webkitCancel", "AnimationFrame")
}
);
Zone.__load_patch("blocking", (n, t) => {
    let e = ["alert", "prompt", "confirm"];
    for (let r = 0; r < e.length; r++) {
        let i = e[r];
        mt(n, i, (o, s, f) => function(d, y) {
            return t.current.run(o, n, y, f)
        }
        )
    }
}
);
Zone.__load_patch("EventTarget", (n, t, e) => {
    Dn(n, e),
    Fn(n, e);
    let r = n.XMLHttpRequestEventTarget;
    r && r.prototype && e.patchEventTarget(n, e, [r.prototype])
}
);
Zone.__load_patch("MutationObserver", (n, t, e) => {
    $t("MutationObserver"),
    $t("WebKitMutationObserver")
}
);
Zone.__load_patch("IntersectionObserver", (n, t, e) => {
    $t("IntersectionObserver")
}
);
Zone.__load_patch("FileReader", (n, t, e) => {
    $t("FileReader")
}
);
Zone.__load_patch("on_property", (n, t, e) => {
    Pn(e, n)
}
);
Zone.__load_patch("customElements", (n, t, e) => {
    vn(n, e)
}
);
Zone.__load_patch("XHR", (n, t) => {
    d(n);
    let e = M("xhrTask")
      , r = M("xhrSync")
      , i = M("xhrListener")
      , o = M("xhrScheduled")
      , s = M("xhrURL")
      , f = M("xhrErrorBeforeScheduled");
    function d(y) {
        let h = y.XMLHttpRequest;
        if (!h)
            return;
        let m = h.prototype;
        function A(T) {
            return T[e]
        }
        let b = m[ne]
          , Z = m[re];
        if (!b) {
            let T = y.XMLHttpRequestEventTarget;
            if (T) {
                let D = T.prototype;
                b = D[ne],
                Z = D[re]
            }
        }
        let U = "readystatechange"
          , et = "scheduled";
        function q(T) {
            let D = T.data
              , R = D.target;
            R[o] = !1,
            R[f] = !1;
            let nt = R[i];
            b || (b = R[ne],
            Z = R[re]),
            nt && Z.call(R, U, nt);
            let at = R[i] = () => {
                if (R.readyState === R.DONE)
                    if (!D.aborted && R[o] && T.state === et) {
                        let V = R[t.__symbol__("loadfalse")];
                        if (R.status !== 0 && V && V.length > 0) {
                            let ct = T.invoke;
                            T.invoke = function() {
                                let rt = R[t.__symbol__("loadfalse")];
                                for (let z = 0; z < rt.length; z++)
                                    rt[z] === T && rt.splice(z, 1);
                                !D.aborted && T.state === et && ct.call(T)
                            }
                            ,
                            V.push(T)
                        } else
                            T.invoke()
                    } else
                        !D.aborted && R[o] === !1 && (R[f] = !0)
            }
            ;
            return b.call(R, U, at),
            R[e] || (R[e] = T),
            w.apply(R, D.args),
            R[o] = !0,
            T
        }
        function S() {}
        function _(T) {
            let D = T.data;
            return D.aborted = !0,
            j.apply(D.target, D.args)
        }
        let tt = mt(m, "open", () => function(T, D) {
            return T[r] = D[2] == !1,
            T[s] = D[1],
            tt.apply(T, D)
        }
        )
          , $ = "XMLHttpRequest.send"
          , X = M("fetchTaskAborting")
          , L = M("fetchTaskScheduling")
          , w = mt(m, "send", () => function(T, D) {
            if (t.current[L] === !0 || T[r])
                return w.apply(T, D);
            {
                let R = {
                    target: T,
                    url: T[s],
                    isPeriodic: !1,
                    args: D,
                    aborted: !1
                }
                  , nt = fe($, S, R, q, _);
                T && T[f] === !0 && !R.aborted && nt.state === et && nt.invoke()
            }
        }
        )
          , j = mt(m, "abort", () => function(T, D) {
            let R = A(T);
            if (R && typeof R.type == "string") {
                if (R.cancelFn == null || R.data && R.data.aborted)
                    return;
                R.zone.cancelTask(R)
            } else if (t.current[X] === !0)
                return j.apply(T, D)
        }
        )
    }
}
);
Zone.__load_patch("geolocation", n => {
    n.navigator && n.navigator.geolocation && kn(n.navigator.geolocation, ["getCurrentPosition", "watchPosition"])
}
);
Zone.__load_patch("PromiseRejectionEvent", (n, t) => {
    function e(r) {
        return function(i) {
            Ge(n, r).forEach(s => {
                let f = n.PromiseRejectionEvent;
                if (f) {
                    let d = new f(r,{
                        promise: i.promise,
                        reason: i.rejection
                    });
                    s.invoke(d)
                }
            }
            )
        }
    }
    n.PromiseRejectionEvent && (t[M("unhandledPromiseRejectionHandler")] = e("unhandledrejection"),
    t[M("rejectionHandledHandler")] = e("rejectionhandled"))
}
);
Zone.__load_patch("queueMicrotask", (n, t, e) => {
    Nn(n, e)
}
);
window.global = window;
global.Buffer = global.Buffer || Ie().Buffer;
window.Buffer = window.Buffer || Ie().Buffer;
global.process = gn();
var Er = ":";
function gr(n, t) {
    for (let e = 1, r = 1; e < n.length; e++,
    r++)
        if (t[r] === "\\")
            r++;
        else if (n[e] === Er)
            return e;
    throw new Error(`Unterminated $localize metadata block in "${t}".`)
}
var Qt = function(n, ...t) {
    if (Qt.translate) {
        let r = Qt.translate(n, t);
        n = r[0],
        t = r[1]
    }
    let e = mn(n[0], n.raw[0]);
    for (let r = 1; r < n.length; r++)
        e += t[r - 1] + mn(n[r], n.raw[r]);
    return e
}
  , mr = ":";
function mn(n, t) {
    return t.charAt(0) === mr ? n.substring(gr(n, t) + 1) : n
}
globalThis.$localize = Qt;

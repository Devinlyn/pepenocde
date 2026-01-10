import {a as On, b as $t} from "./chunk-TLA6RWUK.js";
import {a as Fn, b as Cn, c as kn, d as Un, e as Hn, g as At, h as Pt, j as It, k as Nn, l as Ln, m as Tt, p as Mt, t as Dn, v as Gn, w as Vn} from "./chunk-AMK2IOJV.js";
import {a as b, b as A, d as H, l as M} from "./chunk-JOVT4LBN.js";
var Wn = "0.1.1";
function _n() {
    return Wn
}
var Pe = class e extends Error {
    constructor(t, n={}) {
        let r = ( () => {
            if (n.cause instanceof e) {
                if (n.cause.details)
                    return n.cause.details;
                if (n.cause.shortMessage)
                    return n.cause.shortMessage
            }
            return n.cause && "details"in n.cause && typeof n.cause.details == "string" ? n.cause.details : n.cause?.message ? n.cause.message : n.details
        }
        )()
          , o = n.cause instanceof e && n.cause.docsPath || n.docsPath
          , i = `https://oxlib.sh${o ?? ""}`
          , a = [t || "An error occurred.", ...n.metaMessages ? ["", ...n.metaMessages] : [], ...r || o ? ["", r ? `Details: ${r}` : void 0, o ? `See: ${i}` : void 0] : []].filter(c => typeof c == "string").join(`
`);
        super(a, n.cause ? {
            cause: n.cause
        } : void 0),
        Object.defineProperty(this, "details", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "docs", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "docsPath", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "shortMessage", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "cause", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "name", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: "BaseError"
        }),
        Object.defineProperty(this, "version", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: `ox@${_n()}`
        }),
        this.cause = n.cause,
        this.details = r,
        this.docs = i,
        this.docsPath = o,
        this.shortMessage = t
    }
    walk(t) {
        return qn(this, t)
    }
}
;
function qn(e, t) {
    return t?.(e) ? e : e && typeof e == "object" && "cause"in e && e.cause ? qn(e.cause, t) : t ? null : e
}
function Xn(e, t={}) {
    let {dir: n, size: r=32} = t;
    if (r === 0)
        return e;
    let o = e.replace("0x", "");
    if (o.length > r * 2)
        throw new Ue({
            size: Math.ceil(o.length / 2),
            targetSize: r,
            type: "Hex"
        });
    return `0x${o[n === "right" ? "padEnd" : "padStart"](r * 2, "0")}`
}
function j(e, t={}) {
    let {signed: n, size: r} = t, o = BigInt(e), s;
    r ? n ? s = (1n << BigInt(r) * 8n - 1n) - 1n : s = 2n ** (BigInt(r) * 8n) - 1n : typeof e == "number" && (s = BigInt(Number.MAX_SAFE_INTEGER));
    let i = typeof s == "bigint" && n ? -s - 1n : 0;
    if (s && o > s || o < i) {
        let p = typeof e == "bigint" ? "n" : "";
        throw new Bt({
            max: s ? `${s}${p}` : void 0,
            min: `${i}${p}`,
            signed: n,
            size: r,
            value: `${e}${p}`
        })
    }
    let c = `0x${(n && o < 0 ? (1n << BigInt(r * 8)) + BigInt(o) : o).toString(16)}`;
    return r ? xo(c, r) : c
}
function xo(e, t) {
    return Xn(e, {
        dir: "left",
        size: t
    })
}
var Bt = class extends Pe {
    constructor({max: t, min: n, signed: r, size: o, value: s}) {
        super(`Number \`${s}\` is not in safe${o ? ` ${o * 8}-bit` : ""}${r ? " signed" : " unsigned"} integer range ${t ? `(\`${n}\` to \`${t}\`)` : `(above \`${n}\`)`}`),
        Object.defineProperty(this, "name", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: "Hex.IntegerOutOfRangeError"
        })
    }
}
;
var Ue = class extends Pe {
    constructor({size: t, targetSize: n, type: r}) {
        super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (\`${t}\`) exceeds padding size (\`${n}\`).`),
        Object.defineProperty(this, "name", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: "Hex.SizeExceedsPaddingSizeError"
        })
    }
}
;
function Jn(e) {
    return {
        address: e.address,
        amount: j(e.amount),
        index: j(e.index),
        validatorIndex: j(e.validatorIndex)
    }
}
function Yn(e) {
    return b(b(b(b(b(b(b(b({}, typeof e.baseFeePerGas == "bigint" && {
        baseFeePerGas: j(e.baseFeePerGas)
    }), typeof e.blobBaseFee == "bigint" && {
        blobBaseFee: j(e.blobBaseFee)
    }), typeof e.feeRecipient == "string" && {
        feeRecipient: e.feeRecipient
    }), typeof e.gasLimit == "bigint" && {
        gasLimit: j(e.gasLimit)
    }), typeof e.number == "bigint" && {
        number: j(e.number)
    }), typeof e.prevRandao == "bigint" && {
        prevRandao: j(e.prevRandao)
    }), typeof e.time == "bigint" && {
        time: j(e.time)
    }), e.withdrawals && {
        withdrawals: e.withdrawals.map(Jn)
    })
}
function ne(e) {
    return typeof e == "string" ? {
        address: e,
        type: "json-rpc"
    } : e
}
var St = [{
    inputs: [{
        components: [{
            name: "target",
            type: "address"
        }, {
            name: "allowFailure",
            type: "bool"
        }, {
            name: "callData",
            type: "bytes"
        }],
        name: "calls",
        type: "tuple[]"
    }],
    name: "aggregate3",
    outputs: [{
        components: [{
            name: "success",
            type: "bool"
        }, {
            name: "returnData",
            type: "bytes"
        }],
        name: "returnData",
        type: "tuple[]"
    }],
    stateMutability: "view",
    type: "function"
}]
  , He = [{
    name: "query",
    type: "function",
    stateMutability: "view",
    inputs: [{
        type: "tuple[]",
        name: "queries",
        components: [{
            type: "address",
            name: "sender"
        }, {
            type: "string[]",
            name: "urls"
        }, {
            type: "bytes",
            name: "data"
        }]
    }],
    outputs: [{
        type: "bool[]",
        name: "failures"
    }, {
        type: "bytes[]",
        name: "responses"
    }]
}, {
    name: "HttpError",
    type: "error",
    inputs: [{
        type: "uint16",
        name: "status"
    }, {
        type: "string",
        name: "message"
    }]
}]
  , Zn = [{
    inputs: [],
    name: "ResolverNotFound",
    type: "error"
}, {
    inputs: [],
    name: "ResolverWildcardNotSupported",
    type: "error"
}, {
    inputs: [],
    name: "ResolverNotContract",
    type: "error"
}, {
    inputs: [{
        name: "returnData",
        type: "bytes"
    }],
    name: "ResolverError",
    type: "error"
}, {
    inputs: [{
        components: [{
            name: "status",
            type: "uint16"
        }, {
            name: "message",
            type: "string"
        }],
        name: "errors",
        type: "tuple[]"
    }],
    name: "HttpError",
    type: "error"
}]
  , js = [...Zn, {
    name: "resolve",
    type: "function",
    stateMutability: "view",
    inputs: [{
        name: "name",
        type: "bytes"
    }, {
        name: "data",
        type: "bytes"
    }],
    outputs: [{
        name: "",
        type: "bytes"
    }, {
        name: "address",
        type: "address"
    }]
}, {
    name: "resolve",
    type: "function",
    stateMutability: "view",
    inputs: [{
        name: "name",
        type: "bytes"
    }, {
        name: "data",
        type: "bytes"
    }, {
        name: "gateways",
        type: "string[]"
    }],
    outputs: [{
        name: "",
        type: "bytes"
    }, {
        name: "address",
        type: "address"
    }]
}]
  , zs = [...Zn, {
    name: "reverse",
    type: "function",
    stateMutability: "view",
    inputs: [{
        type: "bytes",
        name: "reverseName"
    }],
    outputs: [{
        type: "string",
        name: "resolvedName"
    }, {
        type: "address",
        name: "resolvedAddress"
    }, {
        type: "address",
        name: "reverseResolver"
    }, {
        type: "address",
        name: "resolver"
    }]
}, {
    name: "reverse",
    type: "function",
    stateMutability: "view",
    inputs: [{
        type: "bytes",
        name: "reverseName"
    }, {
        type: "string[]",
        name: "gateways"
    }],
    outputs: [{
        type: "string",
        name: "resolvedName"
    }, {
        type: "address",
        name: "resolvedAddress"
    }, {
        type: "address",
        name: "reverseResolver"
    }, {
        type: "address",
        name: "resolver"
    }]
}];
var Kn = "0x82ad56cb";
var Qn = "0x608060405234801561001057600080fd5b5060405161018e38038061018e83398101604081905261002f91610124565b6000808351602085016000f59050803b61004857600080fd5b6000808351602085016000855af16040513d6000823e81610067573d81fd5b3d81f35b634e487b7160e01b600052604160045260246000fd5b600082601f83011261009257600080fd5b81516001600160401b038111156100ab576100ab61006b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d9576100d961006b565b6040528181528382016020018510156100f157600080fd5b60005b82811015610110576020818601810151838301820152016100f4565b506000918101602001919091529392505050565b6000806040838503121561013757600080fd5b82516001600160401b0381111561014d57600080fd5b61015985828601610081565b602085015190935090506001600160401b0381111561017757600080fd5b61018385828601610081565b915050925092905056fe"
  , er = "0x608060405234801561001057600080fd5b506040516102c03803806102c083398101604081905261002f916101e6565b836001600160a01b03163b6000036100e457600080836001600160a01b03168360405161005c9190610270565b6000604051808303816000865af19150503d8060008114610099576040519150601f19603f3d011682016040523d82523d6000602084013e61009e565b606091505b50915091508115806100b857506001600160a01b0386163b155b156100e1578060405163101bb98d60e01b81526004016100d8919061028c565b60405180910390fd5b50505b6000808451602086016000885af16040513d6000823e81610103573d81fd5b3d81f35b80516001600160a01b038116811461011e57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561015457818101518382015260200161013c565b50506000910152565b600082601f83011261016e57600080fd5b81516001600160401b0381111561018757610187610123565b604051601f8201601f19908116603f011681016001600160401b03811182821017156101b5576101b5610123565b6040528181528382016020018510156101cd57600080fd5b6101de826020830160208701610139565b949350505050565b600080600080608085870312156101fc57600080fd5b61020585610107565b60208601519094506001600160401b0381111561022157600080fd5b61022d8782880161015d565b93505061023c60408601610107565b60608601519092506001600160401b0381111561025857600080fd5b6102648782880161015d565b91505092959194509250565b60008251610282818460208701610139565b9190910192915050565b60208152600082518060208401526102ab816040850160208701610139565b601f01601f1916919091016040019291505056fe";
var jt = "2.33.2";
var zt = {
    getDocsUrl: ({docsBaseUrl: e, docsPath: t="", docsSlug: n}) => t ? `${e ?? "https://viem.sh"}${t}${n ? `#${n}` : ""}` : void 0,
    version: `viem@${jt}`
};
var u = class e extends Error {
    constructor(t, n={}) {
        let r = n.cause instanceof e ? n.cause.details : n.cause?.message ? n.cause.message : n.details
          , o = n.cause instanceof e && n.cause.docsPath || n.docsPath
          , s = zt.getDocsUrl?.(A(b({}, n), {
            docsPath: o
        }))
          , i = [t || "An error occurred.", "", ...n.metaMessages ? [...n.metaMessages, ""] : [], ...s ? [`Docs: ${s}`] : [], ...r ? [`Details: ${r}`] : [], ...zt.version ? [`Version: ${zt.version}`] : []].join(`
`);
        super(i, n.cause ? {
            cause: n.cause
        } : void 0),
        Object.defineProperty(this, "details", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "docsPath", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "metaMessages", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "shortMessage", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "version", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "name", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: "BaseError"
        }),
        this.details = r,
        this.docsPath = o,
        this.metaMessages = n.metaMessages,
        this.name = n.name ?? this.name,
        this.shortMessage = t,
        this.version = jt
    }
    walk(t) {
        return tr(this, t)
    }
}
;
function tr(e, t) {
    return t?.(e) ? e : e && typeof e == "object" && "cause"in e && e.cause !== void 0 ? tr(e.cause, t) : t ? null : e
}
var Z = class extends u {
    constructor({blockNumber: t, chain: n, contract: r}) {
        super(`Chain "${n.name}" does not support contract "${r.name}".`, {
            metaMessages: ["This could be due to any of the following:", ...t && r.blockCreated && r.blockCreated > t ? [`- The contract "${r.name}" was not deployed until block ${r.blockCreated} (current block ${t}).`] : [`- The chain does not have the contract "${r.name}" configured.`]],
            name: "ChainDoesNotSupportContract"
        })
    }
}
  , nr = class extends u {
    constructor({chain: t, currentChainId: n}) {
        super(`The current chain of the wallet (id: ${n}) does not match the target chain for the transaction (id: ${t.id} \u2013 ${t.name}).`, {
            metaMessages: [`Current Chain ID:  ${n}`, `Expected Chain ID: ${t.id} \u2013 ${t.name}`],
            name: "ChainMismatchError"
        })
    }
}
  , rr = class extends u {
    constructor() {
        super(["No chain was provided to the request.", "Please provide a chain with the `chain` argument on the Action, or by supplying a `chain` to WalletClient."].join(`
`), {
            name: "ChainNotFoundError"
        })
    }
}
  , Ie = class extends u {
    constructor() {
        super("No chain was provided to the Client.", {
            name: "ClientChainNotConfiguredError"
        })
    }
}
;
var or = {
    1: "An `assert` condition failed.",
    17: "Arithmetic operation resulted in underflow or overflow.",
    18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
    33: "Attempted to convert to an invalid type.",
    34: "Attempted to access a storage byte array that is incorrectly encoded.",
    49: "Performed `.pop()` on an empty array",
    50: "Array index is out of bounds.",
    65: "Allocated too much memory or created an array which is too large.",
    81: "Attempted to call a zero-initialized variable of internal function type."
}
  , Ne = {
    inputs: [{
        name: "message",
        type: "string"
    }],
    name: "Error",
    type: "error"
}
  , sr = {
    inputs: [{
        name: "reason",
        type: "uint256"
    }],
    name: "Panic",
    type: "error"
};
function P(e, {includeName: t=!1}={}) {
    if (e.type !== "function" && e.type !== "event" && e.type !== "error")
        throw new De(e.type);
    return `${e.name}(${Le(e.inputs, {
        includeName: t
    })})`
}
function Le(e, {includeName: t=!1}={}) {
    return e ? e.map(n => vo(n, {
        includeName: t
    })).join(t ? ", " : ",") : ""
}
function vo(e, {includeName: t}) {
    return e.type.startsWith("tuple") ? `(${Le(e.components, {
        includeName: t
    })})${e.type.slice(5)}` : e.type + (t && e.name ? ` ${e.name}` : "")
}
function B(e, {strict: t=!0}={}) {
    return !e || typeof e != "string" ? !1 : t ? /^0x[0-9a-fA-F]*$/.test(e) : e.startsWith("0x")
}
function x(e) {
    return B(e, {
        strict: !1
    }) ? Math.ceil((e.length - 2) / 2) : e.length
}
var Ge = class extends u {
    constructor({docsPath: t}) {
        super(["A constructor was not found on the ABI.", "Make sure you are using the correct ABI and that the constructor exists on it."].join(`
`), {
            docsPath: t,
            name: "AbiConstructorNotFoundError"
        })
    }
}
  , Te = class extends u {
    constructor({docsPath: t}) {
        super(["Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.", "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists."].join(`
`), {
            docsPath: t,
            name: "AbiConstructorParamsNotFoundError"
        })
    }
}
;
var Ve = class extends u {
    constructor({data: t, params: n, size: r}) {
        super([`Data size of ${r} bytes is too small for given parameters.`].join(`
`), {
            metaMessages: [`Params: (${Le(n, {
                includeName: !0
            })})`, `Data:   ${t} (${r} bytes)`],
            name: "AbiDecodingDataSizeTooSmallError"
        }),
        Object.defineProperty(this, "data", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "params", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "size", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.data = t,
        this.params = n,
        this.size = r
    }
}
  , re = class extends u {
    constructor() {
        super('Cannot decode zero data ("0x") with ABI parameters.', {
            name: "AbiDecodingZeroDataError"
        })
    }
}
  , We = class extends u {
    constructor({expectedLength: t, givenLength: n, type: r}) {
        super([`ABI encoding array length mismatch for type ${r}.`, `Expected length: ${t}`, `Given length: ${n}`].join(`
`), {
            name: "AbiEncodingArrayLengthMismatchError"
        })
    }
}
  , _e = class extends u {
    constructor({expectedSize: t, value: n}) {
        super(`Size of bytes "${n}" (bytes${x(n)}) does not match expected size (bytes${t}).`, {
            name: "AbiEncodingBytesSizeMismatchError"
        })
    }
}
  , qe = class extends u {
    constructor({expectedLength: t, givenLength: n}) {
        super(["ABI encoding params/values length mismatch.", `Expected length (params): ${t}`, `Given length (values): ${n}`].join(`
`), {
            name: "AbiEncodingLengthMismatchError"
        })
    }
}
  , Xe = class extends u {
    constructor(t, {docsPath: n}) {
        super([`Arguments (\`args\`) were provided to "${t}", but "${t}" on the ABI does not contain any parameters (\`inputs\`).`, "Cannot encode error result without knowing what the parameter types are.", "Make sure you are using the correct ABI and that the inputs exist on it."].join(`
`), {
            docsPath: n,
            name: "AbiErrorInputsNotFoundError"
        })
    }
}
  , Me = class extends u {
    constructor(t, {docsPath: n}={}) {
        super([`Error ${t ? `"${t}" ` : ""}not found on ABI.`, "Make sure you are using the correct ABI and that the error exists on it."].join(`
`), {
            docsPath: n,
            name: "AbiErrorNotFoundError"
        })
    }
}
  , oe = class extends u {
    constructor(t, {docsPath: n}) {
        super([`Encoded error signature "${t}" not found on ABI.`, "Make sure you are using the correct ABI and that the error exists on it.", `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${t}.`].join(`
`), {
            docsPath: n,
            name: "AbiErrorSignatureNotFoundError"
        }),
        Object.defineProperty(this, "signature", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.signature = t
    }
}
;
var z = class extends u {
    constructor(t, {docsPath: n}={}) {
        super([`Function ${t ? `"${t}" ` : ""}not found on ABI.`, "Make sure you are using the correct ABI and that the function exists on it."].join(`
`), {
            docsPath: n,
            name: "AbiFunctionNotFoundError"
        })
    }
}
  , se = class extends u {
    constructor(t, {docsPath: n}) {
        super([`Function "${t}" does not contain any \`outputs\` on ABI.`, "Cannot decode function result without knowing what the parameter types are.", "Make sure you are using the correct ABI and that the function exists on it."].join(`
`), {
            docsPath: n,
            name: "AbiFunctionOutputsNotFoundError"
        })
    }
}
  , Je = class extends u {
    constructor(t, {docsPath: n}) {
        super([`Encoded function signature "${t}" not found on ABI.`, "Make sure you are using the correct ABI and that the function exists on it.", `You can look up the signature here: https://openchain.xyz/signatures?query=${t}.`].join(`
`), {
            docsPath: n,
            name: "AbiFunctionSignatureNotFoundError"
        })
    }
}
  , Ye = class extends u {
    constructor(t, n) {
        super("Found ambiguous types in overloaded ABI items.", {
            metaMessages: [`\`${t.type}\` in \`${P(t.abiItem)}\`, and`, `\`${n.type}\` in \`${P(n.abiItem)}\``, "", "These types encode differently and cannot be distinguished at runtime.", "Remove one of the ambiguous items in the ABI."],
            name: "AbiItemAmbiguityError"
        })
    }
}
  , ir = class extends u {
    constructor({expectedSize: t, givenSize: n}) {
        super(`Expected bytes${t}, got bytes${n}.`, {
            name: "BytesSizeMismatchError"
        })
    }
}
;
var Ze = class extends u {
    constructor(t, {docsPath: n}) {
        super([`Type "${t}" is not a valid encoding type.`, "Please provide a valid ABI type."].join(`
`), {
            docsPath: n,
            name: "InvalidAbiEncodingType"
        })
    }
}
  , Ke = class extends u {
    constructor(t, {docsPath: n}) {
        super([`Type "${t}" is not a valid decoding type.`, "Please provide a valid ABI type."].join(`
`), {
            docsPath: n,
            name: "InvalidAbiDecodingType"
        })
    }
}
  , ie = class extends u {
    constructor(t) {
        super([`Value "${t}" is not a valid array.`].join(`
`), {
            name: "InvalidArrayError"
        })
    }
}
  , De = class extends u {
    constructor(t) {
        super([`"${t}" is not a valid definition type.`, 'Valid types: "function", "event", "error"'].join(`
`), {
            name: "InvalidDefinitionTypeError"
        })
    }
}
;
var Ee = class extends u {
    constructor({offset: t, position: n, size: r}) {
        super(`Slice ${n === "start" ? "starting" : "ending"} at offset "${t}" is out-of-bounds (size: ${r}).`, {
            name: "SliceOffsetOutOfBoundsError"
        })
    }
}
  , Be = class extends u {
    constructor({size: t, targetSize: n, type: r}) {
        super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (${t}) exceeds padding size (${n}).`, {
            name: "SizeExceedsPaddingSizeError"
        })
    }
}
  , Se = class extends u {
    constructor({size: t, targetSize: n, type: r}) {
        super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} is expected to be ${n} ${r} long, but is ${t} ${r} long.`, {
            name: "InvalidBytesLengthError"
        })
    }
}
;
function R(e, t, n, {strict: r}={}) {
    return B(e, {
        strict: !1
    }) ? $o(e, t, n, {
        strict: r
    }) : Rt(e, t, n, {
        strict: r
    })
}
function ar(e, t) {
    if (typeof t == "number" && t > 0 && t > x(e) - 1)
        throw new Ee({
            offset: t,
            position: "start",
            size: x(e)
        })
}
function ur(e, t, n) {
    if (typeof t == "number" && typeof n == "number" && x(e) !== n - t)
        throw new Ee({
            offset: n,
            position: "end",
            size: x(e)
        })
}
function Rt(e, t, n, {strict: r}={}) {
    ar(e, t);
    let o = e.slice(t, n);
    return r && ur(o, t, n),
    o
}
function $o(e, t, n, {strict: r}={}) {
    ar(e, t);
    let o = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
    return r && ur(o, t, n),
    o
}
function _(e, {dir: t, size: n=32}={}) {
    return typeof e == "string" ? N(e, {
        dir: t,
        size: n
    }) : Ao(e, {
        dir: t,
        size: n
    })
}
function N(e, {dir: t, size: n=32}={}) {
    if (n === null)
        return e;
    let r = e.replace("0x", "");
    if (r.length > n * 2)
        throw new Be({
            size: Math.ceil(r.length / 2),
            targetSize: n,
            type: "hex"
        });
    return `0x${r[t === "right" ? "padEnd" : "padStart"](n * 2, "0")}`
}
function Ao(e, {dir: t, size: n=32}={}) {
    if (n === null)
        return e;
    if (e.length > n)
        throw new Be({
            size: e.length,
            targetSize: n,
            type: "bytes"
        });
    let r = new Uint8Array(n);
    for (let o = 0; o < n; o++) {
        let s = t === "right";
        r[s ? o : n - o - 1] = e[s ? o : e.length - o - 1]
    }
    return r
}
var ae = class extends u {
    constructor({max: t, min: n, signed: r, size: o, value: s}) {
        super(`Number "${s}" is not in safe ${o ? `${o * 8}-bit ${r ? "signed" : "unsigned"} ` : ""}integer range ${t ? `(${n} to ${t})` : `(above ${n})`}`, {
            name: "IntegerOutOfRangeError"
        })
    }
}
  , Qe = class extends u {
    constructor(t) {
        super(`Bytes value "${t}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`, {
            name: "InvalidBytesBooleanError"
        })
    }
}
;
var et = class extends u {
    constructor({givenSize: t, maxSize: n}) {
        super(`Size cannot exceed ${n} bytes. Given size: ${t} bytes.`, {
            name: "SizeOverflowError"
        })
    }
}
;
function K(e, {dir: t="left"}={}) {
    let n = typeof e == "string" ? e.replace("0x", "") : e
      , r = 0;
    for (let o = 0; o < n.length - 1 && n[t === "left" ? o : n.length - o - 1].toString() === "0"; o++)
        r++;
    return n = t === "left" ? n.slice(r) : n.slice(0, n.length - r),
    typeof e == "string" ? (n.length === 1 && t === "right" && (n = `${n}0`),
    `0x${n.length % 2 === 1 ? `0${n}` : n}`) : n
}
function I(e, {size: t}) {
    if (x(e) > t)
        throw new et({
            givenSize: x(e),
            maxSize: t
        })
}
function Ot(e, t={}) {
    let {signed: n} = t;
    t.size && I(e, {
        size: t.size
    });
    let r = BigInt(e);
    if (!n)
        return r;
    let o = (e.length - 2) / 2
      , s = (1n << BigInt(o) * 8n - 1n) - 1n;
    return r <= s ? r : r - BigInt(`0x${"f".padStart(o * 2, "f")}`) - 1n
}
function cr(e, t={}) {
    return Number(Ot(e, t))
}
function mi(e, t={}) {
    let n = ue(e);
    return t.size && (I(n, {
        size: t.size
    }),
    n = K(n, {
        dir: "right"
    })),
    new TextDecoder().decode(n)
}
var Po = Array.from({
    length: 256
}, (e, t) => t.toString(16).padStart(2, "0"));
function pr(e, t={}) {
    return typeof e == "number" || typeof e == "bigint" ? y(e, t) : typeof e == "string" ? Ct(e, t) : typeof e == "boolean" ? Ft(e, t) : S(e, t)
}
function Ft(e, t={}) {
    let n = `0x${Number(e)}`;
    return typeof t.size == "number" ? (I(n, {
        size: t.size
    }),
    _(n, {
        size: t.size
    })) : n
}
function S(e, t={}) {
    let n = "";
    for (let o = 0; o < e.length; o++)
        n += Po[e[o]];
    let r = `0x${n}`;
    return typeof t.size == "number" ? (I(r, {
        size: t.size
    }),
    _(r, {
        dir: "right",
        size: t.size
    })) : r
}
function y(e, t={}) {
    let {signed: n, size: r} = t, o = BigInt(e), s;
    r ? n ? s = (1n << BigInt(r) * 8n - 1n) - 1n : s = 2n ** (BigInt(r) * 8n) - 1n : typeof e == "number" && (s = BigInt(Number.MAX_SAFE_INTEGER));
    let i = typeof s == "bigint" && n ? -s - 1n : 0;
    if (s && o > s || o < i) {
        let c = typeof e == "bigint" ? "n" : "";
        throw new ae({
            max: s ? `${s}${c}` : void 0,
            min: `${i}${c}`,
            signed: n,
            size: r,
            value: `${e}${c}`
        })
    }
    let a = `0x${(n && o < 0 ? (1n << BigInt(r * 8)) + BigInt(o) : o).toString(16)}`;
    return r ? _(a, {
        size: r
    }) : a
}
var Io = new TextEncoder;
function Ct(e, t={}) {
    let n = Io.encode(e);
    return S(n, t)
}
var To = new TextEncoder;
function tt(e, t={}) {
    return typeof e == "number" || typeof e == "bigint" ? Eo(e, t) : typeof e == "boolean" ? Mo(e, t) : B(e) ? ue(e, t) : kt(e, t)
}
function Mo(e, t={}) {
    let n = new Uint8Array(1);
    return n[0] = Number(e),
    typeof t.size == "number" ? (I(n, {
        size: t.size
    }),
    _(n, {
        size: t.size
    })) : n
}
var L = {
    zero: 48,
    nine: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function dr(e) {
    if (e >= L.zero && e <= L.nine)
        return e - L.zero;
    if (e >= L.A && e <= L.F)
        return e - (L.A - 10);
    if (e >= L.a && e <= L.f)
        return e - (L.a - 10)
}
function ue(e, t={}) {
    let n = e;
    t.size && (I(n, {
        size: t.size
    }),
    n = _(n, {
        dir: "right",
        size: t.size
    }));
    let r = n.slice(2);
    r.length % 2 && (r = `0${r}`);
    let o = r.length / 2
      , s = new Uint8Array(o);
    for (let i = 0, a = 0; i < o; i++) {
        let c = dr(r.charCodeAt(a++))
          , p = dr(r.charCodeAt(a++));
        if (c === void 0 || p === void 0)
            throw new u(`Invalid byte sequence ("${r[a - 2]}${r[a - 1]}" in "${r}").`);
        s[i] = c * 16 + p
    }
    return s
}
function Eo(e, t) {
    let n = y(e, t);
    return ue(n)
}
function kt(e, t={}) {
    let n = To.encode(e);
    return typeof t.size == "number" ? (I(n, {
        size: t.size
    }),
    _(n, {
        dir: "right",
        size: t.size
    })) : n
}
var Bo = BigInt(0)
  , je = BigInt(1)
  , So = BigInt(2)
  , jo = BigInt(7)
  , zo = BigInt(256)
  , Ro = BigInt(113)
  , mr = []
  , yr = []
  , br = [];
for (let e = 0, t = je, n = 1, r = 0; e < 24; e++) {
    [n,r] = [r, (2 * n + 3 * r) % 5],
    mr.push(2 * (5 * r + n)),
    yr.push((e + 1) * (e + 2) / 2 % 64);
    let o = Bo;
    for (let s = 0; s < 7; s++)
        t = (t << je ^ (t >> jo) * Ro) % zo,
        t & So && (o ^= je << (je << BigInt(s)) - je);
    br.push(o)
}
var hr = Fn(br, !0)
  , Oo = hr[0]
  , Fo = hr[1]
  , fr = (e, t, n) => n > 32 ? Un(e, t, n) : Cn(e, t, n)
  , lr = (e, t, n) => n > 32 ? Hn(e, t, n) : kn(e, t, n);
function Co(e, t=24) {
    let n = new Uint32Array(10);
    for (let r = 24 - t; r < 24; r++) {
        for (let i = 0; i < 10; i++)
            n[i] = e[i] ^ e[i + 10] ^ e[i + 20] ^ e[i + 30] ^ e[i + 40];
        for (let i = 0; i < 10; i += 2) {
            let a = (i + 8) % 10
              , c = (i + 2) % 10
              , p = n[c]
              , f = n[c + 1]
              , d = fr(p, f, 1) ^ n[a]
              , m = lr(p, f, 1) ^ n[a + 1];
            for (let l = 0; l < 50; l += 10)
                e[i + l] ^= d,
                e[i + l + 1] ^= m
        }
        let o = e[2]
          , s = e[3];
        for (let i = 0; i < 24; i++) {
            let a = yr[i]
              , c = fr(o, s, a)
              , p = lr(o, s, a)
              , f = mr[i];
            o = e[f],
            s = e[f + 1],
            e[f] = c,
            e[f + 1] = p
        }
        for (let i = 0; i < 50; i += 10) {
            for (let a = 0; a < 10; a++)
                n[a] = e[i + a];
            for (let a = 0; a < 10; a++)
                e[i + a] ^= ~n[(a + 2) % 10] & n[(a + 4) % 10]
        }
        e[0] ^= Oo[r],
        e[1] ^= Fo[r]
    }
    Tt(n)
}
var Ut = class e extends Gn {
    constructor(t, n, r, o=!1, s=24) {
        if (super(),
        this.pos = 0,
        this.posOut = 0,
        this.finished = !1,
        this.destroyed = !1,
        this.enableXOF = !1,
        this.blockLen = t,
        this.suffix = n,
        this.outputLen = r,
        this.enableXOF = o,
        this.rounds = s,
        At(r),
        !(0 < t && t < 200))
            throw new Error("only keccak-f1600 function is supported");
        this.state = new Uint8Array(200),
        this.state32 = Ln(this.state)
    }
    clone() {
        return this._cloneInto()
    }
    keccak() {
        Mt(this.state32),
        Co(this.state32, this.rounds),
        Mt(this.state32),
        this.posOut = 0,
        this.pos = 0
    }
    update(t) {
        It(this),
        t = Dn(t),
        Pt(t);
        let {blockLen: n, state: r} = this
          , o = t.length;
        for (let s = 0; s < o; ) {
            let i = Math.min(n - this.pos, o - s);
            for (let a = 0; a < i; a++)
                r[this.pos++] ^= t[s++];
            this.pos === n && this.keccak()
        }
        return this
    }
    finish() {
        if (this.finished)
            return;
        this.finished = !0;
        let {state: t, suffix: n, pos: r, blockLen: o} = this;
        t[r] ^= n,
        n & 128 && r === o - 1 && this.keccak(),
        t[o - 1] ^= 128,
        this.keccak()
    }
    writeInto(t) {
        It(this, !1),
        Pt(t),
        this.finish();
        let n = this.state
          , {blockLen: r} = this;
        for (let o = 0, s = t.length; o < s; ) {
            this.posOut >= r && this.keccak();
            let i = Math.min(r - this.posOut, s - o);
            t.set(n.subarray(this.posOut, this.posOut + i), o),
            this.posOut += i,
            o += i
        }
        return t
    }
    xofInto(t) {
        if (!this.enableXOF)
            throw new Error("XOF is not possible for this instance");
        return this.writeInto(t)
    }
    xof(t) {
        return At(t),
        this.xofInto(new Uint8Array(t))
    }
    digestInto(t) {
        if (Nn(t, this),
        this.finished)
            throw new Error("digest() was already called");
        return this.writeInto(t),
        this.destroy(),
        t
    }
    digest() {
        return this.digestInto(new Uint8Array(this.outputLen))
    }
    destroy() {
        this.destroyed = !0,
        Tt(this.state)
    }
    _cloneInto(t) {
        let {blockLen: n, suffix: r, outputLen: o, rounds: s, enableXOF: i} = this;
        return t || (t = new e(n,r,o,i,s)),
        t.state32.set(this.state32),
        t.pos = this.pos,
        t.posOut = this.posOut,
        t.finished = this.finished,
        t.rounds = s,
        t.suffix = r,
        t.outputLen = o,
        t.enableXOF = i,
        t.destroyed = this.destroyed,
        t
    }
}
  , ko = (e, t, n) => Vn( () => new Ut(t,e,n));
var xr = ko(1, 136, 256 / 8);
function nt(e, t) {
    let n = t || "hex"
      , r = xr(B(e, {
        strict: !1
    }) ? tt(e) : e);
    return n === "bytes" ? r : pr(r)
}
var Uo = e => nt(tt(e));
function gr(e) {
    return Uo(e)
}
function wr(e) {
    let t = !0
      , n = ""
      , r = 0
      , o = ""
      , s = !1;
    for (let i = 0; i < e.length; i++) {
        let a = e[i];
        if (["(", ")", ","].includes(a) && (t = !0),
        a === "(" && r++,
        a === ")" && r--,
        !!t) {
            if (r === 0) {
                if (a === " " && ["event", "function", ""].includes(o))
                    o = "";
                else if (o += a,
                a === ")") {
                    s = !0;
                    break
                }
                continue
            }
            if (a === " ") {
                e[i - 1] !== "," && n !== "," && n !== ",(" && (n = "",
                t = !1);
                continue
            }
            o += a,
            n += a
        }
    }
    if (!s)
        throw new u("Unable to normalize signature.");
    return o
}
var vr = e => {
    let t = typeof e == "string" ? e : On(e);
    return wr(t)
}
;
function rt(e) {
    return gr(vr(e))
}
var O = e => R(rt(e), 0, 4);
var T = class extends u {
    constructor({address: t}) {
        super(`Address "${t}" is invalid.`, {
            metaMessages: ["- Address must be a hex value of 20 bytes (40 hex characters).", "- Address must match its checksum counterpart."],
            name: "InvalidAddressError"
        })
    }
}
;
var ce = class extends Map {
    constructor(t) {
        super(),
        Object.defineProperty(this, "maxSize", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.maxSize = t
    }
    get(t) {
        let n = super.get(t);
        return super.has(t) && n !== void 0 && (this.delete(t),
        super.set(t, n)),
        n
    }
    set(t, n) {
        if (super.set(t, n),
        this.maxSize && this.size > this.maxSize) {
            let r = this.keys().next().value;
            r && this.delete(r)
        }
        return this
    }
}
;
var Ho = /^0x[a-fA-F0-9]{40}$/
  , Ht = new ce(8192);
function w(e, t) {
    let {strict: n=!0} = t ?? {}
      , r = `${e}.${n}`;
    if (Ht.has(r))
        return Ht.get(r);
    let o = Ho.test(e) ? e.toLowerCase() === e ? !0 : n ? ze(e) === e : !0 : !1;
    return Ht.set(r, o),
    o
}
var Nt = new ce(8192);
function ze(e, t) {
    if (Nt.has(`${e}.${t}`))
        return Nt.get(`${e}.${t}`);
    let n = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase()
      , r = nt(kt(n), "bytes")
      , o = (t ? n.substring(`${t}0x`.length) : n).split("");
    for (let i = 0; i < 40; i += 2)
        r[i >> 1] >> 4 >= 8 && o[i] && (o[i] = o[i].toUpperCase()),
        (r[i >> 1] & 15) >= 8 && o[i + 1] && (o[i + 1] = o[i + 1].toUpperCase());
    let s = `0x${o.join("")}`;
    return Nt.set(`${e}.${t}`, s),
    s
}
function ia(e, t) {
    if (!w(e, {
        strict: !1
    }))
        throw new T({
            address: e
        });
    return ze(e, t)
}
var Re = class extends u {
    constructor({offset: t}) {
        super(`Offset \`${t}\` cannot be negative.`, {
            name: "NegativeOffsetError"
        })
    }
}
  , ot = class extends u {
    constructor({length: t, position: n}) {
        super(`Position \`${n}\` is out of bounds (\`0 < position < ${t}\`).`, {
            name: "PositionOutOfBoundsError"
        })
    }
}
  , st = class extends u {
    constructor({count: t, limit: n}) {
        super(`Recursive read limit of \`${n}\` exceeded (recursive read count: \`${t}\`).`, {
            name: "RecursiveReadLimitExceededError"
        })
    }
}
;
var No = {
    bytes: new Uint8Array,
    dataView: new DataView(new ArrayBuffer(0)),
    position: 0,
    positionReadCount: new Map,
    recursiveReadCount: 0,
    recursiveReadLimit: Number.POSITIVE_INFINITY,
    assertReadLimit() {
        if (this.recursiveReadCount >= this.recursiveReadLimit)
            throw new st({
                count: this.recursiveReadCount + 1,
                limit: this.recursiveReadLimit
            })
    },
    assertPosition(e) {
        if (e < 0 || e > this.bytes.length - 1)
            throw new ot({
                length: this.bytes.length,
                position: e
            })
    },
    decrementPosition(e) {
        if (e < 0)
            throw new Re({
                offset: e
            });
        let t = this.position - e;
        this.assertPosition(t),
        this.position = t
    },
    getReadCount(e) {
        return this.positionReadCount.get(e || this.position) || 0
    },
    incrementPosition(e) {
        if (e < 0)
            throw new Re({
                offset: e
            });
        let t = this.position + e;
        this.assertPosition(t),
        this.position = t
    },
    inspectByte(e) {
        let t = e ?? this.position;
        return this.assertPosition(t),
        this.bytes[t]
    },
    inspectBytes(e, t) {
        let n = t ?? this.position;
        return this.assertPosition(n + e - 1),
        this.bytes.subarray(n, n + e)
    },
    inspectUint8(e) {
        let t = e ?? this.position;
        return this.assertPosition(t),
        this.bytes[t]
    },
    inspectUint16(e) {
        let t = e ?? this.position;
        return this.assertPosition(t + 1),
        this.dataView.getUint16(t)
    },
    inspectUint24(e) {
        let t = e ?? this.position;
        return this.assertPosition(t + 2),
        (this.dataView.getUint16(t) << 8) + this.dataView.getUint8(t + 2)
    },
    inspectUint32(e) {
        let t = e ?? this.position;
        return this.assertPosition(t + 3),
        this.dataView.getUint32(t)
    },
    pushByte(e) {
        this.assertPosition(this.position),
        this.bytes[this.position] = e,
        this.position++
    },
    pushBytes(e) {
        this.assertPosition(this.position + e.length - 1),
        this.bytes.set(e, this.position),
        this.position += e.length
    },
    pushUint8(e) {
        this.assertPosition(this.position),
        this.bytes[this.position] = e,
        this.position++
    },
    pushUint16(e) {
        this.assertPosition(this.position + 1),
        this.dataView.setUint16(this.position, e),
        this.position += 2
    },
    pushUint24(e) {
        this.assertPosition(this.position + 2),
        this.dataView.setUint16(this.position, e >> 8),
        this.dataView.setUint8(this.position + 2, e & 255),
        this.position += 3
    },
    pushUint32(e) {
        this.assertPosition(this.position + 3),
        this.dataView.setUint32(this.position, e),
        this.position += 4
    },
    readByte() {
        this.assertReadLimit(),
        this._touch();
        let e = this.inspectByte();
        return this.position++,
        e
    },
    readBytes(e, t) {
        this.assertReadLimit(),
        this._touch();
        let n = this.inspectBytes(e);
        return this.position += t ?? e,
        n
    },
    readUint8() {
        this.assertReadLimit(),
        this._touch();
        let e = this.inspectUint8();
        return this.position += 1,
        e
    },
    readUint16() {
        this.assertReadLimit(),
        this._touch();
        let e = this.inspectUint16();
        return this.position += 2,
        e
    },
    readUint24() {
        this.assertReadLimit(),
        this._touch();
        let e = this.inspectUint24();
        return this.position += 3,
        e
    },
    readUint32() {
        this.assertReadLimit(),
        this._touch();
        let e = this.inspectUint32();
        return this.position += 4,
        e
    },
    get remaining() {
        return this.bytes.length - this.position
    },
    setPosition(e) {
        let t = this.position;
        return this.assertPosition(e),
        this.position = e,
        () => this.position = t
    },
    _touch() {
        if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
            return;
        let e = this.getReadCount();
        this.positionReadCount.set(this.position, e + 1),
        e > 0 && this.recursiveReadCount++
    }
};
function $r(e, {recursiveReadLimit: t=8192}={}) {
    let n = Object.create(No);
    return n.bytes = e,
    n.dataView = new DataView(e.buffer,e.byteOffset,e.byteLength),
    n.positionReadCount = new Map,
    n.recursiveReadLimit = t,
    n
}
function Ar(e, t={}) {
    typeof t.size < "u" && I(e, {
        size: t.size
    });
    let n = S(e, t);
    return Ot(n, t)
}
function Pr(e, t={}) {
    let n = e;
    if (typeof t.size < "u" && (I(n, {
        size: t.size
    }),
    n = K(n)),
    n.length > 1 || n[0] > 1)
        throw new Qe(n);
    return !!n[0]
}
function F(e, t={}) {
    typeof t.size < "u" && I(e, {
        size: t.size
    });
    let n = S(e, t);
    return cr(n, t)
}
function Ir(e, t={}) {
    let n = e;
    return typeof t.size < "u" && (I(n, {
        size: t.size
    }),
    n = K(n, {
        dir: "right"
    })),
    new TextDecoder().decode(n)
}
function D(e) {
    return typeof e[0] == "string" ? Q(e) : Lo(e)
}
function Lo(e) {
    let t = 0;
    for (let o of e)
        t += o.length;
    let n = new Uint8Array(t)
      , r = 0;
    for (let o of e)
        n.set(o, r),
        r += o.length;
    return n
}
function Q(e) {
    return `0x${e.reduce( (t, n) => t + n.replace("0x", ""), "")}`
}
var xa = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/
  , Tr = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
function C(e, t) {
    if (e.length !== t.length)
        throw new qe({
            expectedLength: e.length,
            givenLength: t.length
        });
    let n = Do({
        params: e,
        values: t
    })
      , r = Dt(n);
    return r.length === 0 ? "0x" : r
}
function Do({params: e, values: t}) {
    let n = [];
    for (let r = 0; r < e.length; r++)
        n.push(Lt({
            param: e[r],
            value: t[r]
        }));
    return n
}
function Lt({param: e, value: t}) {
    let n = it(e.type);
    if (n) {
        let[r,o] = n;
        return Vo(t, {
            length: r,
            param: A(b({}, e), {
                type: o
            })
        })
    }
    if (e.type === "tuple")
        return Jo(t, {
            param: e
        });
    if (e.type === "address")
        return Go(t);
    if (e.type === "bool")
        return _o(t);
    if (e.type.startsWith("uint") || e.type.startsWith("int")) {
        let r = e.type.startsWith("int")
          , [,,o="256"] = Tr.exec(e.type) ?? [];
        return qo(t, {
            signed: r,
            size: Number(o)
        })
    }
    if (e.type.startsWith("bytes"))
        return Wo(t, {
            param: e
        });
    if (e.type === "string")
        return Xo(t);
    throw new Ze(e.type,{
        docsPath: "/docs/contract/encodeAbiParameters"
    })
}
function Dt(e) {
    let t = 0;
    for (let s = 0; s < e.length; s++) {
        let {dynamic: i, encoded: a} = e[s];
        i ? t += 32 : t += x(a)
    }
    let n = []
      , r = []
      , o = 0;
    for (let s = 0; s < e.length; s++) {
        let {dynamic: i, encoded: a} = e[s];
        i ? (n.push(y(t + o, {
            size: 32
        })),
        r.push(a),
        o += x(a)) : n.push(a)
    }
    return D([...n, ...r])
}
function Go(e) {
    if (!w(e))
        throw new T({
            address: e
        });
    return {
        dynamic: !1,
        encoded: N(e.toLowerCase())
    }
}
function Vo(e, {length: t, param: n}) {
    let r = t === null;
    if (!Array.isArray(e))
        throw new ie(e);
    if (!r && e.length !== t)
        throw new We({
            expectedLength: t,
            givenLength: e.length,
            type: `${n.type}[${t}]`
        });
    let o = !1
      , s = [];
    for (let i = 0; i < e.length; i++) {
        let a = Lt({
            param: n,
            value: e[i]
        });
        a.dynamic && (o = !0),
        s.push(a)
    }
    if (r || o) {
        let i = Dt(s);
        if (r) {
            let a = y(s.length, {
                size: 32
            });
            return {
                dynamic: !0,
                encoded: s.length > 0 ? D([a, i]) : a
            }
        }
        if (o)
            return {
                dynamic: !0,
                encoded: i
            }
    }
    return {
        dynamic: !1,
        encoded: D(s.map( ({encoded: i}) => i))
    }
}
function Wo(e, {param: t}) {
    let[,n] = t.type.split("bytes")
      , r = x(e);
    if (!n) {
        let o = e;
        return r % 32 !== 0 && (o = N(o, {
            dir: "right",
            size: Math.ceil((e.length - 2) / 2 / 32) * 32
        })),
        {
            dynamic: !0,
            encoded: D([N(y(r, {
                size: 32
            })), o])
        }
    }
    if (r !== Number.parseInt(n))
        throw new _e({
            expectedSize: Number.parseInt(n),
            value: e
        });
    return {
        dynamic: !1,
        encoded: N(e, {
            dir: "right"
        })
    }
}
function _o(e) {
    if (typeof e != "boolean")
        throw new u(`Invalid boolean value: "${e}" (type: ${typeof e}). Expected: \`true\` or \`false\`.`);
    return {
        dynamic: !1,
        encoded: N(Ft(e))
    }
}
function qo(e, {signed: t, size: n=256}) {
    if (typeof n == "number") {
        let r = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n
          , o = t ? -r - 1n : 0n;
        if (e > r || e < o)
            throw new ae({
                max: r.toString(),
                min: o.toString(),
                signed: t,
                size: n / 8,
                value: e.toString()
            })
    }
    return {
        dynamic: !1,
        encoded: y(e, {
            size: 32,
            signed: t
        })
    }
}
function Xo(e) {
    let t = Ct(e)
      , n = Math.ceil(x(t) / 32)
      , r = [];
    for (let o = 0; o < n; o++)
        r.push(N(R(t, o * 32, (o + 1) * 32), {
            dir: "right"
        }));
    return {
        dynamic: !0,
        encoded: D([N(y(x(t), {
            size: 32
        })), ...r])
    }
}
function Jo(e, {param: t}) {
    let n = !1
      , r = [];
    for (let o = 0; o < t.components.length; o++) {
        let s = t.components[o]
          , i = Array.isArray(e) ? o : s.name
          , a = Lt({
            param: s,
            value: e[i]
        });
        r.push(a),
        a.dynamic && (n = !0)
    }
    return {
        dynamic: n,
        encoded: n ? Dt(r) : D(r.map( ({encoded: o}) => o))
    }
}
function it(e) {
    let t = e.match(/^(.*)\[(\d+)?\]$/);
    return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0
}
function de(e, t) {
    let n = typeof t == "string" ? ue(t) : t
      , r = $r(n);
    if (x(n) === 0 && e.length > 0)
        throw new re;
    if (x(t) && x(t) < 32)
        throw new Ve({
            data: typeof t == "string" ? t : S(t),
            params: e,
            size: x(t)
        });
    let o = 0
      , s = [];
    for (let i = 0; i < e.length; ++i) {
        let a = e[i];
        r.setPosition(o);
        let[c,p] = pe(r, a, {
            staticPosition: 0
        });
        o += p,
        s.push(c)
    }
    return s
}
function pe(e, t, {staticPosition: n}) {
    let r = it(t.type);
    if (r) {
        let[o,s] = r;
        return Zo(e, A(b({}, t), {
            type: s
        }), {
            length: o,
            staticPosition: n
        })
    }
    if (t.type === "tuple")
        return ts(e, t, {
            staticPosition: n
        });
    if (t.type === "address")
        return Yo(e);
    if (t.type === "bool")
        return Ko(e);
    if (t.type.startsWith("bytes"))
        return Qo(e, t, {
            staticPosition: n
        });
    if (t.type.startsWith("uint") || t.type.startsWith("int"))
        return es(e, t);
    if (t.type === "string")
        return ns(e, {
            staticPosition: n
        });
    throw new Ke(t.type,{
        docsPath: "/docs/contract/decodeAbiParameters"
    })
}
var Mr = 32
  , Gt = 32;
function Yo(e) {
    let t = e.readBytes(32);
    return [ze(S(Rt(t, -20))), 32]
}
function Zo(e, t, {length: n, staticPosition: r}) {
    if (!n) {
        let i = F(e.readBytes(Gt))
          , a = r + i
          , c = a + Mr;
        e.setPosition(a);
        let p = F(e.readBytes(Mr))
          , f = Oe(t)
          , d = 0
          , m = [];
        for (let l = 0; l < p; ++l) {
            e.setPosition(c + (f ? l * 32 : d));
            let[h,g] = pe(e, t, {
                staticPosition: c
            });
            d += g,
            m.push(h)
        }
        return e.setPosition(r + 32),
        [m, 32]
    }
    if (Oe(t)) {
        let i = F(e.readBytes(Gt))
          , a = r + i
          , c = [];
        for (let p = 0; p < n; ++p) {
            e.setPosition(a + p * 32);
            let[f] = pe(e, t, {
                staticPosition: a
            });
            c.push(f)
        }
        return e.setPosition(r + 32),
        [c, 32]
    }
    let o = 0
      , s = [];
    for (let i = 0; i < n; ++i) {
        let[a,c] = pe(e, t, {
            staticPosition: r + o
        });
        o += c,
        s.push(a)
    }
    return [s, o]
}
function Ko(e) {
    return [Pr(e.readBytes(32), {
        size: 32
    }), 32]
}
function Qo(e, t, {staticPosition: n}) {
    let[r,o] = t.type.split("bytes");
    if (!o) {
        let i = F(e.readBytes(32));
        e.setPosition(n + i);
        let a = F(e.readBytes(32));
        if (a === 0)
            return e.setPosition(n + 32),
            ["0x", 32];
        let c = e.readBytes(a);
        return e.setPosition(n + 32),
        [S(c), 32]
    }
    return [S(e.readBytes(Number.parseInt(o), 32)), 32]
}
function es(e, t) {
    let n = t.type.startsWith("int")
      , r = Number.parseInt(t.type.split("int")[1] || "256")
      , o = e.readBytes(32);
    return [r > 48 ? Ar(o, {
        signed: n
    }) : F(o, {
        signed: n
    }), 32]
}
function ts(e, t, {staticPosition: n}) {
    let r = t.components.length === 0 || t.components.some( ({name: i}) => !i)
      , o = r ? [] : {}
      , s = 0;
    if (Oe(t)) {
        let i = F(e.readBytes(Gt))
          , a = n + i;
        for (let c = 0; c < t.components.length; ++c) {
            let p = t.components[c];
            e.setPosition(a + s);
            let[f,d] = pe(e, p, {
                staticPosition: a
            });
            s += d,
            o[r ? c : p?.name] = f
        }
        return e.setPosition(n + 32),
        [o, 32]
    }
    for (let i = 0; i < t.components.length; ++i) {
        let a = t.components[i]
          , [c,p] = pe(e, a, {
            staticPosition: n
        });
        o[r ? i : a?.name] = c,
        s += p
    }
    return [o, s]
}
function ns(e, {staticPosition: t}) {
    let n = F(e.readBytes(32))
      , r = t + n;
    e.setPosition(r);
    let o = F(e.readBytes(32));
    if (o === 0)
        return e.setPosition(t + 32),
        ["", 32];
    let s = e.readBytes(o, 32)
      , i = Ir(K(s));
    return e.setPosition(t + 32),
    [i, 32]
}
function Oe(e) {
    let {type: t} = e;
    if (t === "string" || t === "bytes" || t.endsWith("[]"))
        return !0;
    if (t === "tuple")
        return e.components?.some(Oe);
    let n = it(e.type);
    return !!(n && Oe(A(b({}, e), {
        type: n[1]
    })))
}
function at(e) {
    let {abi: t, data: n} = e
      , r = R(n, 0, 4);
    if (r === "0x")
        throw new re;
    let s = [...t || [], Ne, sr].find(i => i.type === "error" && r === O(P(i)));
    if (!s)
        throw new oe(r,{
            docsPath: "/docs/contract/decodeErrorResult"
        });
    return {
        abiItem: s,
        args: "inputs"in s && s.inputs && s.inputs.length > 0 ? de(s.inputs, R(n, 4)) : void 0,
        errorName: s.name
    }
}
var k = (e, t, n) => JSON.stringify(e, (r, o) => {
    let s = typeof o == "bigint" ? o.toString() : o;
    return typeof t == "function" ? t(r, s) : s
}
, n);
function Vt({abiItem: e, args: t, includeFunctionName: n=!0, includeName: r=!1}) {
    if ("name"in e && "inputs"in e && e.inputs)
        return `${n ? e.name : ""}(${e.inputs.map( (o, s) => `${r && o.name ? `${o.name}: ` : ""}${typeof t[s] == "object" ? k(t[s]) : t[s]}`).join(", ")})`
}
var Er = rt;
function U(e) {
    let {abi: t, args: n=[], name: r} = e
      , o = B(r, {
        strict: !1
    })
      , s = t.filter(a => o ? a.type === "function" ? O(a) === r : a.type === "event" ? Er(a) === r : !1 : "name"in a && a.name === r);
    if (s.length === 0)
        return;
    if (s.length === 1)
        return s[0];
    let i;
    for (let a of s) {
        if (!("inputs"in a))
            continue;
        if (!n || n.length === 0) {
            if (!a.inputs || a.inputs.length === 0)
                return a;
            continue
        }
        if (!a.inputs || a.inputs.length === 0 || a.inputs.length !== n.length)
            continue;
        if (n.every( (p, f) => {
            let d = "inputs"in a && a.inputs[f];
            return d ? Wt(p, d) : !1
        }
        )) {
            if (i && "inputs"in i && i.inputs) {
                let p = Br(a.inputs, i.inputs, n);
                if (p)
                    throw new Ye({
                        abiItem: a,
                        type: p[0]
                    },{
                        abiItem: i,
                        type: p[1]
                    })
            }
            i = a
        }
    }
    return i || s[0]
}
function Wt(e, t) {
    let n = typeof e
      , r = t.type;
    switch (r) {
    case "address":
        return w(e, {
            strict: !1
        });
    case "bool":
        return n === "boolean";
    case "function":
        return n === "string";
    case "string":
        return n === "string";
    default:
        return r === "tuple" && "components"in t ? Object.values(t.components).every( (o, s) => Wt(Object.values(e)[s], o)) : /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(r) ? n === "number" || n === "bigint" : /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(r) ? n === "string" || e instanceof Uint8Array : /[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(r) ? Array.isArray(e) && e.every(o => Wt(o, A(b({}, t), {
            type: r.replace(/(\[[0-9]{0,}\])$/, "")
        }))) : !1
    }
}
function Br(e, t, n) {
    for (let r in e) {
        let o = e[r]
          , s = t[r];
        if (o.type === "tuple" && s.type === "tuple" && "components"in o && "components"in s)
            return Br(o.components, s.components, n[r]);
        let i = [o.type, s.type];
        if (i.includes("address") && i.includes("bytes20") ? !0 : i.includes("address") && i.includes("string") ? w(n[r], {
            strict: !1
        }) : i.includes("address") && i.includes("bytes") ? w(n[r], {
            strict: !1
        }) : !1)
            return i
    }
}
var Sr = {
    gwei: 9,
    wei: 18
}
  , jr = {
    ether: -9,
    wei: 9
}
  , pu = {
    ether: -18,
    gwei: -9
};
function ut(e, t) {
    let n = e.toString()
      , r = n.startsWith("-");
    r && (n = n.slice(1)),
    n = n.padStart(t, "0");
    let[o,s] = [n.slice(0, n.length - t), n.slice(n.length - t)];
    return s = s.replace(/(0+)$/, ""),
    `${r ? "-" : ""}${o || "0"}${s ? `.${s}` : ""}`
}
function ct(e, t="wei") {
    return ut(e, Sr[t])
}
function E(e, t="wei") {
    return ut(e, jr[t])
}
var pt = class extends u {
    constructor({address: t}) {
        super(`State for account "${t}" is set multiple times.`, {
            name: "AccountStateConflictError"
        })
    }
}
  , dt = class extends u {
    constructor() {
        super("state and stateDiff are set on the same account.", {
            name: "StateAssignmentConflictError"
        })
    }
}
;
function zr(e) {
    return e.reduce( (t, {slot: n, value: r}) => `${t}        ${n}: ${r}
`, "")
}
function Rr(e) {
    return e.reduce( (t, o) => {
        var s = o
          , {address: n} = s
          , r = H(s, ["address"]);
        let i = `${t}    ${n}:
`;
        return r.nonce && (i += `      nonce: ${r.nonce}
`),
        r.balance && (i += `      balance: ${r.balance}
`),
        r.code && (i += `      code: ${r.code}
`),
        r.state && (i += `      state:
`,
        i += zr(r.state)),
        r.stateDiff && (i += `      stateDiff:
`,
        i += zr(r.stateDiff)),
        i
    }
    , `  State Override:
`).slice(0, -1)
}
function Fe(e) {
    let t = Object.entries(e).map( ([r,o]) => o === void 0 || o === !1 ? null : [r, o]).filter(Boolean)
      , n = t.reduce( (r, [o]) => Math.max(r, o.length), 0);
    return t.map( ([r,o]) => `  ${`${r}:`.padEnd(n + 1)}  ${o}`).join(`
`)
}
var ft = class extends u {
    constructor() {
        super(["Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.", "Use `maxFeePerGas`/`maxPriorityFeePerGas` for EIP-1559 compatible networks, and `gasPrice` for others."].join(`
`), {
            name: "FeeConflictError"
        })
    }
}
;
var Or = class extends u {
    constructor({transaction: t}) {
        super("Cannot infer a transaction type from provided transaction.", {
            metaMessages: ["Provided Transaction:", "{", Fe(t), "}", "", "To infer the type, either provide:", "- a `type` to the Transaction, or", "- an EIP-1559 Transaction with `maxFeePerGas`, or", "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or", "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or", "- an EIP-7702 Transaction with `authorizationList`, or", "- a Legacy Transaction with `gasPrice`"],
            name: "InvalidSerializableTransactionError"
        })
    }
}
;
var Fr = class extends u {
    constructor(t, {account: n, docsPath: r, chain: o, data: s, gas: i, gasPrice: a, maxFeePerGas: c, maxPriorityFeePerGas: p, nonce: f, to: d, value: m}) {
        let l = Fe({
            chain: o && `${o?.name} (id: ${o?.id})`,
            from: n?.address,
            to: d,
            value: typeof m < "u" && `${ct(m)} ${o?.nativeCurrency?.symbol || "ETH"}`,
            data: s,
            gas: i,
            gasPrice: typeof a < "u" && `${E(a)} gwei`,
            maxFeePerGas: typeof c < "u" && `${E(c)} gwei`,
            maxPriorityFeePerGas: typeof p < "u" && `${E(p)} gwei`,
            nonce: f
        });
        super(t.shortMessage, {
            cause: t,
            docsPath: r,
            metaMessages: [...t.metaMessages ? [...t.metaMessages, " "] : [], "Request Arguments:", l].filter(Boolean),
            name: "TransactionExecutionError"
        }),
        Object.defineProperty(this, "cause", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.cause = t
    }
}
  , Cr = class extends u {
    constructor({blockHash: t, blockNumber: n, blockTag: r, hash: o, index: s}) {
        let i = "Transaction";
        r && s !== void 0 && (i = `Transaction at block time "${r}" at index "${s}"`),
        t && s !== void 0 && (i = `Transaction at block hash "${t}" at index "${s}"`),
        n && s !== void 0 && (i = `Transaction at block number "${n}" at index "${s}"`),
        o && (i = `Transaction with hash "${o}"`),
        super(`${i} could not be found.`, {
            name: "TransactionNotFoundError"
        })
    }
}
  , kr = class extends u {
    constructor({hash: t}) {
        super(`Transaction receipt with hash "${t}" could not be found. The Transaction may not be processed on a block yet.`, {
            name: "TransactionReceiptNotFoundError"
        })
    }
}
  , Ur = class extends u {
    constructor({hash: t}) {
        super(`Timed out while waiting for transaction with hash "${t}" to be confirmed.`, {
            name: "WaitForTransactionReceiptTimeoutError"
        })
    }
}
;
var Hr = e => e
  , ee = e => e;
var lt = class extends u {
    constructor(t, {account: n, docsPath: r, chain: o, data: s, gas: i, gasPrice: a, maxFeePerGas: c, maxPriorityFeePerGas: p, nonce: f, to: d, value: m, stateOverride: l}) {
        let h = n ? ne(n) : void 0
          , g = Fe({
            from: h?.address,
            to: d,
            value: typeof m < "u" && `${ct(m)} ${o?.nativeCurrency?.symbol || "ETH"}`,
            data: s,
            gas: i,
            gasPrice: typeof a < "u" && `${E(a)} gwei`,
            maxFeePerGas: typeof c < "u" && `${E(c)} gwei`,
            maxPriorityFeePerGas: typeof p < "u" && `${E(p)} gwei`,
            nonce: f
        });
        l && (g += `
${Rr(l)}`),
        super(t.shortMessage, {
            cause: t,
            docsPath: r,
            metaMessages: [...t.metaMessages ? [...t.metaMessages, " "] : [], "Raw Call Arguments:", g].filter(Boolean),
            name: "CallExecutionError"
        }),
        Object.defineProperty(this, "cause", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.cause = t
    }
}
  , Nr = class extends u {
    constructor(t, {abi: n, args: r, contractAddress: o, docsPath: s, functionName: i, sender: a}) {
        let c = U({
            abi: n,
            args: r,
            name: i
        })
          , p = c ? Vt({
            abiItem: c,
            args: r,
            includeFunctionName: !1,
            includeName: !1
        }) : void 0
          , f = c ? P(c, {
            includeName: !0
        }) : void 0
          , d = Fe({
            address: o && Hr(o),
            function: f,
            args: p && p !== "()" && `${[...Array(i?.length ?? 0).keys()].map( () => " ").join("")}${p}`,
            sender: a
        });
        super(t.shortMessage || `An unknown error occurred while executing the contract function "${i}".`, {
            cause: t,
            docsPath: s,
            metaMessages: [...t.metaMessages ? [...t.metaMessages, " "] : [], d && "Contract Call:", d].filter(Boolean),
            name: "ContractFunctionExecutionError"
        }),
        Object.defineProperty(this, "abi", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "args", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "cause", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "contractAddress", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "formattedArgs", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "functionName", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "sender", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.abi = n,
        this.args = r,
        this.cause = t,
        this.contractAddress = o,
        this.functionName = i,
        this.sender = a
    }
}
  , Lr = class extends u {
    constructor({abi: t, data: n, functionName: r, message: o}) {
        let s, i, a, c;
        if (n && n !== "0x")
            try {
                i = at({
                    abi: t,
                    data: n
                });
                let {abiItem: f, errorName: d, args: m} = i;
                if (d === "Error")
                    c = m[0];
                else if (d === "Panic") {
                    let[l] = m;
                    c = or[l]
                } else {
                    let l = f ? P(f, {
                        includeName: !0
                    }) : void 0
                      , h = f && m ? Vt({
                        abiItem: f,
                        args: m,
                        includeFunctionName: !1,
                        includeName: !1
                    }) : void 0;
                    a = [l ? `Error: ${l}` : "", h && h !== "()" ? `       ${[...Array(d?.length ?? 0).keys()].map( () => " ").join("")}${h}` : ""]
                }
            } catch (f) {
                s = f
            }
        else
            o && (c = o);
        let p;
        s instanceof oe && (p = s.signature,
        a = [`Unable to decode signature "${p}" as it was not found on the provided ABI.`, "Make sure you are using the correct ABI and that the error exists on it.", `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${p}.`]),
        super(c && c !== "execution reverted" || p ? [`The contract function "${r}" reverted with the following ${p ? "signature" : "reason"}:`, c || p].join(`
`) : `The contract function "${r}" reverted.`, {
            cause: s,
            metaMessages: a,
            name: "ContractFunctionRevertedError"
        }),
        Object.defineProperty(this, "data", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "raw", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "reason", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "signature", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.data = i,
        this.raw = n,
        this.reason = c,
        this.signature = p
    }
}
  , Dr = class extends u {
    constructor({functionName: t}) {
        super(`The contract function "${t}" returned no data ("0x").`, {
            metaMessages: ["This could be due to any of the following:", `  - The contract does not have the function "${t}",`, "  - The parameters passed to the contract function may be invalid, or", "  - The address is not a contract."],
            name: "ContractFunctionZeroDataError"
        })
    }
}
  , mt = class extends u {
    constructor({factory: t}) {
        super(`Deployment for counterfactual contract call failed${t ? ` for factory "${t}".` : ""}`, {
            metaMessages: ["Please ensure:", "- The `factory` is a valid contract deployment factory (ie. Create2 Factory, ERC-4337 Factory, etc).", "- The `factoryData` is a valid encoded function call for contract deployment function on the factory."],
            name: "CounterfactualDeploymentFailedError"
        })
    }
}
  , yt = class extends u {
    constructor({data: t, message: n}) {
        super(n || "", {
            name: "RawContractError"
        }),
        Object.defineProperty(this, "code", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: 3
        }),
        Object.defineProperty(this, "data", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.data = t
    }
}
;
var _t = "/docs/contract/decodeFunctionResult";
function Gr(e) {
    let {abi: t, args: n, functionName: r, data: o} = e
      , s = t[0];
    if (r) {
        let a = U({
            abi: t,
            args: n,
            name: r
        });
        if (!a)
            throw new z(r,{
                docsPath: _t
            });
        s = a
    }
    if (s.type !== "function")
        throw new z(void 0,{
            docsPath: _t
        });
    if (!s.outputs)
        throw new se(s.name,{
            docsPath: _t
        });
    let i = de(s.outputs, o);
    if (i && i.length > 1)
        return i;
    if (i && i.length === 1)
        return i[0]
}
var qt = "/docs/contract/encodeDeployData";
function Xt(e) {
    let {abi: t, args: n, bytecode: r} = e;
    if (!n || n.length === 0)
        return r;
    let o = t.find(i => "type"in i && i.type === "constructor");
    if (!o)
        throw new Ge({
            docsPath: qt
        });
    if (!("inputs"in o))
        throw new Te({
            docsPath: qt
        });
    if (!o.inputs || o.inputs.length === 0)
        throw new Te({
            docsPath: qt
        });
    let s = C(o.inputs, n);
    return Q([r, s])
}
var Vr = "/docs/contract/encodeFunctionData";
function Wr(e) {
    let {abi: t, args: n, functionName: r} = e
      , o = t[0];
    if (r) {
        let s = U({
            abi: t,
            args: n,
            name: r
        });
        if (!s)
            throw new z(r,{
                docsPath: Vr
            });
        o = s
    }
    if (o.type !== "function")
        throw new z(void 0,{
            docsPath: Vr
        });
    return {
        abi: [o],
        functionName: O(P(o))
    }
}
function _r(e) {
    let {args: t} = e
      , {abi: n, functionName: r} = e.abi.length === 1 && e.functionName?.startsWith("0x") ? e : Wr(e)
      , o = n[0]
      , s = r
      , i = "inputs"in o && o.inputs ? C(o.inputs, t ?? []) : void 0;
    return Q([s, i ?? "0x"])
}
function qr({blockNumber: e, chain: t, contract: n}) {
    let r = t?.contracts?.[n];
    if (!r)
        throw new Z({
            chain: t,
            contract: {
                name: n
            }
        });
    if (e && r.blockCreated && r.blockCreated > e)
        throw new Z({
            blockNumber: e,
            chain: t,
            contract: {
                name: n,
                blockCreated: r.blockCreated
            }
        });
    return r.address
}
var G = class extends u {
    constructor({cause: t, message: n}={}) {
        let r = n?.replace("execution reverted: ", "")?.replace("execution reverted", "");
        super(`Execution reverted ${r ? `with reason: ${r}` : "for an unknown reason"}.`, {
            cause: t,
            name: "ExecutionRevertedError"
        })
    }
}
;
Object.defineProperty(G, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 3
});
Object.defineProperty(G, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /execution reverted/
});
var q = class extends u {
    constructor({cause: t, maxFeePerGas: n}={}) {
        super(`The fee cap (\`maxFeePerGas\`${n ? ` = ${E(n)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
            cause: t,
            name: "FeeCapTooHighError"
        })
    }
}
;
Object.defineProperty(q, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
});
var fe = class extends u {
    constructor({cause: t, maxFeePerGas: n}={}) {
        super(`The fee cap (\`maxFeePerGas\`${n ? ` = ${E(n)}` : ""} gwei) cannot be lower than the block base fee.`, {
            cause: t,
            name: "FeeCapTooLowError"
        })
    }
}
;
Object.defineProperty(fe, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
});
var le = class extends u {
    constructor({cause: t, nonce: n}={}) {
        super(`Nonce provided for the transaction ${n ? `(${n}) ` : ""}is higher than the next one expected.`, {
            cause: t,
            name: "NonceTooHighError"
        })
    }
}
;
Object.defineProperty(le, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /nonce too high/
});
var me = class extends u {
    constructor({cause: t, nonce: n}={}) {
        super([`Nonce provided for the transaction ${n ? `(${n}) ` : ""}is lower than the current nonce of the account.`, "Try increasing the nonce or find the latest nonce with `getTransactionCount`."].join(`
`), {
            cause: t,
            name: "NonceTooLowError"
        })
    }
}
;
Object.defineProperty(me, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /nonce too low|transaction already imported|already known/
});
var ye = class extends u {
    constructor({cause: t, nonce: n}={}) {
        super(`Nonce provided for the transaction ${n ? `(${n}) ` : ""}exceeds the maximum allowed nonce.`, {
            cause: t,
            name: "NonceMaxValueError"
        })
    }
}
;
Object.defineProperty(ye, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /nonce has max value/
});
var be = class extends u {
    constructor({cause: t}={}) {
        super(["The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."].join(`
`), {
            cause: t,
            metaMessages: ["This error could arise when the account does not have enough funds to:", " - pay for the total gas fee,", " - pay for the value to send.", " ", "The cost of the transaction is calculated as `gas * gas fee + value`, where:", " - `gas` is the amount of gas needed for transaction to execute,", " - `gas fee` is the gas fee,", " - `value` is the amount of ether to send to the recipient."],
            name: "InsufficientFundsError"
        })
    }
}
;
Object.defineProperty(be, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /insufficient funds|exceeds transaction sender account balance/
});
var he = class extends u {
    constructor({cause: t, gas: n}={}) {
        super(`The amount of gas ${n ? `(${n}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
            cause: t,
            name: "IntrinsicGasTooHighError"
        })
    }
}
;
Object.defineProperty(he, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /intrinsic gas too high|gas limit reached/
});
var xe = class extends u {
    constructor({cause: t, gas: n}={}) {
        super(`The amount of gas ${n ? `(${n}) ` : ""}provided for the transaction is too low.`, {
            cause: t,
            name: "IntrinsicGasTooLowError"
        })
    }
}
;
Object.defineProperty(xe, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /intrinsic gas too low/
});
var ge = class extends u {
    constructor({cause: t}) {
        super("The transaction type is not supported for this chain.", {
            cause: t,
            name: "TransactionTypeNotSupportedError"
        })
    }
}
;
Object.defineProperty(ge, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /transaction type not valid/
});
var X = class extends u {
    constructor({cause: t, maxPriorityFeePerGas: n, maxFeePerGas: r}={}) {
        super([`The provided tip (\`maxPriorityFeePerGas\`${n ? ` = ${E(n)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${r ? ` = ${E(r)} gwei` : ""}).`].join(`
`), {
            cause: t,
            name: "TipAboveFeeCapError"
        })
    }
}
;
Object.defineProperty(X, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
});
var we = class extends u {
    constructor({cause: t}) {
        super(`An error occurred while executing: ${t?.shortMessage}`, {
            cause: t,
            name: "UnknownNodeError"
        })
    }
}
;
var Ce = class extends u {
    constructor({body: t, cause: n, details: r, headers: o, status: s, url: i}) {
        super("HTTP request failed.", {
            cause: n,
            details: r,
            metaMessages: [s && `Status: ${s}`, `URL: ${ee(i)}`, t && `Request body: ${k(t)}`].filter(Boolean),
            name: "HttpRequestError"
        }),
        Object.defineProperty(this, "body", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "headers", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "status", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "url", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.body = t,
        this.headers = o,
        this.status = s,
        this.url = i
    }
}
;
var bt = class extends u {
    constructor({body: t, error: n, url: r}) {
        super("RPC Request failed.", {
            cause: n,
            details: n.message,
            metaMessages: [`URL: ${ee(r)}`, `Request body: ${k(t)}`],
            name: "RpcRequestError"
        }),
        Object.defineProperty(this, "code", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "data", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.code = n.code,
        this.data = n.data
    }
}
;
var Xr = class extends u {
    constructor({body: t, url: n}) {
        super("The request took too long to respond.", {
            details: "The request timed out.",
            metaMessages: [`URL: ${ee(n)}`, `Request body: ${k(t)}`],
            name: "TimeoutError"
        })
    }
}
;
var rs = -1
  , v = class extends u {
    constructor(t, {code: n, docsPath: r, metaMessages: o, name: s, shortMessage: i}) {
        super(i, {
            cause: t,
            docsPath: r,
            metaMessages: o || t?.metaMessages,
            name: s || "RpcError"
        }),
        Object.defineProperty(this, "code", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.name = s || t.name,
        this.code = t instanceof bt ? t.code : n ?? rs
    }
}
  , $ = class extends v {
    constructor(t, n) {
        super(t, n),
        Object.defineProperty(this, "data", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.data = n.data
    }
}
  , Jt = class e extends v {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "ParseRpcError",
            shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
        })
    }
}
;
Object.defineProperty(Jt, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32700
});
var Yt = class e extends v {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "InvalidRequestRpcError",
            shortMessage: "JSON is not a valid request object."
        })
    }
}
;
Object.defineProperty(Yt, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32600
});
var Zt = class e extends v {
    constructor(t, {method: n}={}) {
        super(t, {
            code: e.code,
            name: "MethodNotFoundRpcError",
            shortMessage: `The method${n ? ` "${n}"` : ""} does not exist / is not available.`
        })
    }
}
;
Object.defineProperty(Zt, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32601
});
var Kt = class e extends v {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "InvalidParamsRpcError",
            shortMessage: ["Invalid parameters were provided to the RPC method.", "Double check you have provided the correct parameters."].join(`
`)
        })
    }
}
;
Object.defineProperty(Kt, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32602
});
var Qt = class e extends v {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "InternalRpcError",
            shortMessage: "An internal error was received."
        })
    }
}
;
Object.defineProperty(Qt, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32603
});
var en = class e extends v {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "InvalidInputRpcError",
            shortMessage: ["Missing or invalid parameters.", "Double check you have provided the correct parameters."].join(`
`)
        })
    }
}
;
Object.defineProperty(en, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32e3
});
var tn = class e extends v {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "ResourceNotFoundRpcError",
            shortMessage: "Requested resource not found."
        }),
        Object.defineProperty(this, "name", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: "ResourceNotFoundRpcError"
        })
    }
}
;
Object.defineProperty(tn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32001
});
var nn = class e extends v {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "ResourceUnavailableRpcError",
            shortMessage: "Requested resource not available."
        })
    }
}
;
Object.defineProperty(nn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32002
});
var rn = class e extends v {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "TransactionRejectedRpcError",
            shortMessage: "Transaction creation failed."
        })
    }
}
;
Object.defineProperty(rn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32003
});
var on = class e extends v {
    constructor(t, {method: n}={}) {
        super(t, {
            code: e.code,
            name: "MethodNotSupportedRpcError",
            shortMessage: `Method${n ? ` "${n}"` : ""} is not supported.`
        })
    }
}
;
Object.defineProperty(on, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32004
});
var sn = class e extends v {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "LimitExceededRpcError",
            shortMessage: "Request exceeds defined limit."
        })
    }
}
;
Object.defineProperty(sn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32005
});
var an = class e extends v {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "JsonRpcVersionUnsupportedError",
            shortMessage: "Version of JSON-RPC protocol is not supported."
        })
    }
}
;
Object.defineProperty(an, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32006
});
var un = class e extends $ {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "UserRejectedRequestError",
            shortMessage: "User rejected the request."
        })
    }
}
;
Object.defineProperty(un, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4001
});
var cn = class e extends $ {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "UnauthorizedProviderError",
            shortMessage: "The requested method and/or account has not been authorized by the user."
        })
    }
}
;
Object.defineProperty(cn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4100
});
var pn = class e extends $ {
    constructor(t, {method: n}={}) {
        super(t, {
            code: e.code,
            name: "UnsupportedProviderMethodError",
            shortMessage: `The Provider does not support the requested method${n ? ` " ${n}"` : ""}.`
        })
    }
}
;
Object.defineProperty(pn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4200
});
var dn = class e extends $ {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "ProviderDisconnectedError",
            shortMessage: "The Provider is disconnected from all chains."
        })
    }
}
;
Object.defineProperty(dn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4900
});
var fn = class e extends $ {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "ChainDisconnectedError",
            shortMessage: "The Provider is not connected to the requested chain."
        })
    }
}
;
Object.defineProperty(fn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4901
});
var ln = class e extends $ {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "SwitchChainError",
            shortMessage: "An error occurred when attempting to switch chain."
        })
    }
}
;
Object.defineProperty(ln, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4902
});
var mn = class e extends $ {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "UnsupportedNonOptionalCapabilityError",
            shortMessage: "This Wallet does not support a capability that was not marked as optional."
        })
    }
}
;
Object.defineProperty(mn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5700
});
var yn = class e extends $ {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "UnsupportedChainIdError",
            shortMessage: "This Wallet does not support the requested chain ID."
        })
    }
}
;
Object.defineProperty(yn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5710
});
var bn = class e extends $ {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "DuplicateIdError",
            shortMessage: "There is already a bundle submitted with this ID."
        })
    }
}
;
Object.defineProperty(bn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5720
});
var hn = class e extends $ {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "UnknownBundleIdError",
            shortMessage: "This bundle id is unknown / has not been submitted"
        })
    }
}
;
Object.defineProperty(hn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5730
});
var xn = class e extends $ {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "BundleTooLargeError",
            shortMessage: "The call bundle is too large for the Wallet to process."
        })
    }
}
;
Object.defineProperty(xn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5740
});
var gn = class e extends $ {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "AtomicReadyWalletRejectedUpgradeError",
            shortMessage: "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade."
        })
    }
}
;
Object.defineProperty(gn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5750
});
var wn = class e extends $ {
    constructor(t) {
        super(t, {
            code: e.code,
            name: "AtomicityNotSupportedError",
            shortMessage: "The wallet does not support atomic execution but the request requires it."
        })
    }
}
;
Object.defineProperty(wn, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5760
});
var Jr = class extends v {
    constructor(t) {
        super(t, {
            name: "UnknownRpcError",
            shortMessage: "An unknown RPC error occurred."
        })
    }
}
;
function Yr(e, t) {
    let n = (e.details || "").toLowerCase()
      , r = e instanceof u ? e.walk(o => o?.code === G.code) : e;
    return r instanceof u ? new G({
        cause: e,
        message: r.details
    }) : G.nodeMessage.test(n) ? new G({
        cause: e,
        message: e.details
    }) : q.nodeMessage.test(n) ? new q({
        cause: e,
        maxFeePerGas: t?.maxFeePerGas
    }) : fe.nodeMessage.test(n) ? new fe({
        cause: e,
        maxFeePerGas: t?.maxFeePerGas
    }) : le.nodeMessage.test(n) ? new le({
        cause: e,
        nonce: t?.nonce
    }) : me.nodeMessage.test(n) ? new me({
        cause: e,
        nonce: t?.nonce
    }) : ye.nodeMessage.test(n) ? new ye({
        cause: e,
        nonce: t?.nonce
    }) : be.nodeMessage.test(n) ? new be({
        cause: e
    }) : he.nodeMessage.test(n) ? new he({
        cause: e,
        gas: t?.gas
    }) : xe.nodeMessage.test(n) ? new xe({
        cause: e,
        gas: t?.gas
    }) : ge.nodeMessage.test(n) ? new ge({
        cause: e
    }) : X.nodeMessage.test(n) ? new X({
        cause: e,
        maxFeePerGas: t?.maxFeePerGas,
        maxPriorityFeePerGas: t?.maxPriorityFeePerGas
    }) : new we({
        cause: e
    })
}
function Zr(e, r) {
    var o = r
      , {docsPath: t} = o
      , n = H(o, ["docsPath"]);
    let s = ( () => {
        let i = Yr(e, n);
        return i instanceof we ? e : i
    }
    )();
    return new lt(s,b({
        docsPath: t
    }, n))
}
function Kr(e, {format: t}) {
    if (!t)
        return {};
    let n = {};
    function r(s) {
        let i = Object.keys(s);
        for (let a of i)
            a in e && (n[a] = e[a]),
            s[a] && typeof s[a] == "object" && !Array.isArray(s[a]) && r(s[a])
    }
    let o = t(e || {});
    return r(o),
    n
}
var os = {
    legacy: "0x0",
    eip2930: "0x1",
    eip1559: "0x2",
    eip4844: "0x3",
    eip7702: "0x4"
};
function Qr(e) {
    let t = {};
    return typeof e.authorizationList < "u" && (t.authorizationList = ss(e.authorizationList)),
    typeof e.accessList < "u" && (t.accessList = e.accessList),
    typeof e.blobVersionedHashes < "u" && (t.blobVersionedHashes = e.blobVersionedHashes),
    typeof e.blobs < "u" && (typeof e.blobs[0] != "string" ? t.blobs = e.blobs.map(n => S(n)) : t.blobs = e.blobs),
    typeof e.data < "u" && (t.data = e.data),
    typeof e.from < "u" && (t.from = e.from),
    typeof e.gas < "u" && (t.gas = y(e.gas)),
    typeof e.gasPrice < "u" && (t.gasPrice = y(e.gasPrice)),
    typeof e.maxFeePerBlobGas < "u" && (t.maxFeePerBlobGas = y(e.maxFeePerBlobGas)),
    typeof e.maxFeePerGas < "u" && (t.maxFeePerGas = y(e.maxFeePerGas)),
    typeof e.maxPriorityFeePerGas < "u" && (t.maxPriorityFeePerGas = y(e.maxPriorityFeePerGas)),
    typeof e.nonce < "u" && (t.nonce = y(e.nonce)),
    typeof e.to < "u" && (t.to = e.to),
    typeof e.type < "u" && (t.type = os[e.type]),
    typeof e.value < "u" && (t.value = y(e.value)),
    t
}
function ss(e) {
    return e.map(t => b(b({
        address: t.address,
        r: t.r ? y(BigInt(t.r)) : t.r,
        s: t.s ? y(BigInt(t.s)) : t.s,
        chainId: y(t.chainId),
        nonce: y(t.nonce)
    }, typeof t.yParity < "u" ? {
        yParity: y(t.yParity)
    } : {}), typeof t.v < "u" && typeof t.yParity > "u" ? {
        v: y(t.v)
    } : {}))
}
function eo() {
    let e = () => {}
      , t = () => {}
    ;
    return {
        promise: new Promise( (r, o) => {
            e = r,
            t = o
        }
        ),
        resolve: e,
        reject: t
    }
}
var vn = new Map;
function to({fn: e, id: t, shouldSplitBatch: n, wait: r=0, sort: o}) {
    let s = () => M(this, null, function*() {
        let d = c();
        i();
        let m = d.map( ({args: l}) => l);
        m.length !== 0 && e(m).then(l => {
            o && Array.isArray(l) && l.sort(o);
            for (let h = 0; h < d.length; h++) {
                let {resolve: g} = d[h];
                g?.([l[h], l])
            }
        }
        ).catch(l => {
            for (let h = 0; h < d.length; h++) {
                let {reject: g} = d[h];
                g?.(l)
            }
        }
        )
    })
      , i = () => vn.delete(t)
      , a = () => c().map( ({args: d}) => d)
      , c = () => vn.get(t) || []
      , p = d => vn.set(t, [...c(), d]);
    return {
        flush: i,
        schedule(d) {
            return M(this, null, function*() {
                let {promise: m, resolve: l, reject: h} = eo();
                return n?.([...a(), d]) && s(),
                c().length > 0 ? (p({
                    args: d,
                    resolve: l,
                    reject: h
                }),
                m) : (p({
                    args: d,
                    resolve: l,
                    reject: h
                }),
                setTimeout(s, r),
                m)
            })
        }
    }
}
function no(e) {
    if (!(!e || e.length === 0))
        return e.reduce( (t, {slot: n, value: r}) => {
            if (n.length !== 66)
                throw new Se({
                    size: n.length,
                    targetSize: 66,
                    type: "hex"
                });
            if (r.length !== 66)
                throw new Se({
                    size: r.length,
                    targetSize: 66,
                    type: "hex"
                });
            return t[n] = r,
            t
        }
        , {})
}
function is(e) {
    let {balance: t, nonce: n, state: r, stateDiff: o, code: s} = e
      , i = {};
    if (s !== void 0 && (i.code = s),
    t !== void 0 && (i.balance = y(t)),
    n !== void 0 && (i.nonce = y(n)),
    r !== void 0 && (i.state = no(r)),
    o !== void 0) {
        if (i.state)
            throw new dt;
        i.stateDiff = no(o)
    }
    return i
}
function ro(e) {
    if (!e)
        return;
    let t = {};
    for (let n of e) {
        let r = n
          , {address: o} = r
          , s = H(r, ["address"]);
        if (!w(o, {
            strict: !1
        }))
            throw new T({
                address: o
            });
        if (t[o])
            throw new pt({
                address: o
            });
        t[o] = is(s)
    }
    return t
}
var Hc = 2n ** (8n - 1n) - 1n
  , Nc = 2n ** (16n - 1n) - 1n
  , Lc = 2n ** (24n - 1n) - 1n
  , Dc = 2n ** (32n - 1n) - 1n
  , Gc = 2n ** (40n - 1n) - 1n
  , Vc = 2n ** (48n - 1n) - 1n
  , Wc = 2n ** (56n - 1n) - 1n
  , _c = 2n ** (64n - 1n) - 1n
  , qc = 2n ** (72n - 1n) - 1n
  , Xc = 2n ** (80n - 1n) - 1n
  , Jc = 2n ** (88n - 1n) - 1n
  , Yc = 2n ** (96n - 1n) - 1n
  , Zc = 2n ** (104n - 1n) - 1n
  , Kc = 2n ** (112n - 1n) - 1n
  , Qc = 2n ** (120n - 1n) - 1n
  , ep = 2n ** (128n - 1n) - 1n
  , tp = 2n ** (136n - 1n) - 1n
  , np = 2n ** (144n - 1n) - 1n
  , rp = 2n ** (152n - 1n) - 1n
  , op = 2n ** (160n - 1n) - 1n
  , sp = 2n ** (168n - 1n) - 1n
  , ip = 2n ** (176n - 1n) - 1n
  , ap = 2n ** (184n - 1n) - 1n
  , up = 2n ** (192n - 1n) - 1n
  , cp = 2n ** (200n - 1n) - 1n
  , pp = 2n ** (208n - 1n) - 1n
  , dp = 2n ** (216n - 1n) - 1n
  , fp = 2n ** (224n - 1n) - 1n
  , lp = 2n ** (232n - 1n) - 1n
  , mp = 2n ** (240n - 1n) - 1n
  , yp = 2n ** (248n - 1n) - 1n
  , bp = 2n ** (256n - 1n) - 1n
  , hp = -(2n ** (8n - 1n))
  , xp = -(2n ** (16n - 1n))
  , gp = -(2n ** (24n - 1n))
  , wp = -(2n ** (32n - 1n))
  , vp = -(2n ** (40n - 1n))
  , $p = -(2n ** (48n - 1n))
  , Ap = -(2n ** (56n - 1n))
  , Pp = -(2n ** (64n - 1n))
  , Ip = -(2n ** (72n - 1n))
  , Tp = -(2n ** (80n - 1n))
  , Mp = -(2n ** (88n - 1n))
  , Ep = -(2n ** (96n - 1n))
  , Bp = -(2n ** (104n - 1n))
  , Sp = -(2n ** (112n - 1n))
  , jp = -(2n ** (120n - 1n))
  , zp = -(2n ** (128n - 1n))
  , Rp = -(2n ** (136n - 1n))
  , Op = -(2n ** (144n - 1n))
  , Fp = -(2n ** (152n - 1n))
  , Cp = -(2n ** (160n - 1n))
  , kp = -(2n ** (168n - 1n))
  , Up = -(2n ** (176n - 1n))
  , Hp = -(2n ** (184n - 1n))
  , Np = -(2n ** (192n - 1n))
  , Lp = -(2n ** (200n - 1n))
  , Dp = -(2n ** (208n - 1n))
  , Gp = -(2n ** (216n - 1n))
  , Vp = -(2n ** (224n - 1n))
  , Wp = -(2n ** (232n - 1n))
  , _p = -(2n ** (240n - 1n))
  , qp = -(2n ** (248n - 1n))
  , Xp = -(2n ** (256n - 1n))
  , Jp = 2n ** 8n - 1n
  , Yp = 2n ** 16n - 1n
  , Zp = 2n ** 24n - 1n
  , Kp = 2n ** 32n - 1n
  , Qp = 2n ** 40n - 1n
  , ed = 2n ** 48n - 1n
  , td = 2n ** 56n - 1n
  , nd = 2n ** 64n - 1n
  , rd = 2n ** 72n - 1n
  , od = 2n ** 80n - 1n
  , sd = 2n ** 88n - 1n
  , id = 2n ** 96n - 1n
  , ad = 2n ** 104n - 1n
  , ud = 2n ** 112n - 1n
  , cd = 2n ** 120n - 1n
  , pd = 2n ** 128n - 1n
  , dd = 2n ** 136n - 1n
  , fd = 2n ** 144n - 1n
  , ld = 2n ** 152n - 1n
  , md = 2n ** 160n - 1n
  , yd = 2n ** 168n - 1n
  , bd = 2n ** 176n - 1n
  , hd = 2n ** 184n - 1n
  , xd = 2n ** 192n - 1n
  , gd = 2n ** 200n - 1n
  , wd = 2n ** 208n - 1n
  , vd = 2n ** 216n - 1n
  , $d = 2n ** 224n - 1n
  , Ad = 2n ** 232n - 1n
  , Pd = 2n ** 240n - 1n
  , Id = 2n ** 248n - 1n
  , oo = 2n ** 256n - 1n;
function so(e) {
    let {account: t, gasPrice: n, maxFeePerGas: r, maxPriorityFeePerGas: o, to: s} = e
      , i = t ? ne(t) : void 0;
    if (i && !w(i.address))
        throw new T({
            address: i.address
        });
    if (s && !w(s))
        throw new T({
            address: s
        });
    if (typeof n < "u" && (typeof r < "u" || typeof o < "u"))
        throw new ft;
    if (r && r > oo)
        throw new q({
            maxFeePerGas: r
        });
    if (o && r && o > r)
        throw new X({
            maxFeePerGas: r,
            maxPriorityFeePerGas: o
        })
}
function io(e, t) {
    return M(this, null, function*() {
        let jn = t
          , {account: n=e.account, authorizationList: r, batch: o=!!e.batch?.multicall, blockNumber: s, blockTag: i=e.experimental_blockTag ?? "latest", accessList: a, blobs: c, blockOverrides: p, code: f, data: d, factory: m, factoryData: l, gas: h, gasPrice: g, maxFeePerBlobGas: V, maxFeePerGas: ve, maxPriorityFeePerGas: $e, nonce: ke, to: te, value: po, stateOverride: fo} = jn
          , lo = H(jn, ["account", "authorizationList", "batch", "blockNumber", "blockTag", "accessList", "blobs", "blockOverrides", "code", "data", "factory", "factoryData", "gas", "gasPrice", "maxFeePerBlobGas", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "to", "value", "stateOverride"])
          , Mn = n ? ne(n) : void 0;
        if (f && (m || l))
            throw new u("Cannot provide both `code` & `factory`/`factoryData` as parameters.");
        if (f && te)
            throw new u("Cannot provide both `code` & `to` as parameters.");
        let En = f && d
          , Bn = m && l && te && d
          , Sn = En || Bn
          , mo = En ? cs({
            code: f,
            data: d
        }) : Bn ? ps({
            data: d,
            factory: m,
            factoryData: l,
            to: te
        }) : d;
        try {
            so(t);
            let Ae = (typeof s == "bigint" ? y(s) : void 0) || i
              , J = p ? Yn(p) : void 0
              , Y = ro(fo)
              , zn = e.chain?.formatters?.transactionRequest?.format
              , vt = (zn || Qr)(A(b({}, Kr(lo, {
                format: zn
            })), {
                from: Mn?.address,
                accessList: a,
                authorizationList: r,
                blobs: c,
                data: mo,
                gas: h,
                gasPrice: g,
                maxFeePerBlobGas: V,
                maxFeePerGas: ve,
                maxPriorityFeePerGas: $e,
                nonce: ke,
                to: Sn ? void 0 : te,
                value: po
            }));
            if (o && as({
                request: vt
            }) && !Y && !J)
                try {
                    return yield us(e, A(b({}, vt), {
                        blockNumber: s,
                        blockTag: i
                    }))
                } catch (W) {
                    if (!(W instanceof Ie) && !(W instanceof Z))
                        throw W
                }
            let yo = ( () => {
                let W = [vt, Ae];
                return Y && J ? [...W, Y, J] : Y ? [...W, Y] : J ? [...W, {}, J] : W
            }
            )()
              , Rn = yield e.request({
                method: "eth_call",
                params: yo
            });
            return Rn === "0x" ? {
                data: void 0
            } : {
                data: Rn
            }
        } catch (wt) {
            let Ae = ds(wt)
              , {offchainLookup: J, offchainLookupSignature: Y} = yield import("./chunk-OE4OGKQT.js");
            if (e.ccipRead !== !1 && Ae?.slice(0, 10) === Y && te)
                return {
                    data: yield J(e, {
                        data: Ae,
                        to: te
                    })
                };
            throw Sn && Ae?.slice(0, 10) === "0x101bb98d" ? new mt({
                factory: m
            }) : Zr(wt, A(b({}, t), {
                account: Mn,
                chain: e.chain
            }))
        }
    })
}
function as({request: e}) {
    let o = e
      , {data: t, to: n} = o
      , r = H(o, ["data", "to"]);
    return !(!t || t.startsWith(Kn) || !n || Object.values(r).filter(s => typeof s < "u").length > 0)
}
function us(e, t) {
    return M(this, null, function*() {
        let {batchSize: n=1024, wait: r=0} = typeof e.batch?.multicall == "object" ? e.batch.multicall : {}
          , {blockNumber: o, blockTag: s=e.experimental_blockTag ?? "latest", data: i, multicallAddress: a, to: c} = t
          , p = a;
        if (!p) {
            if (!e.chain)
                throw new Ie;
            p = qr({
                blockNumber: o,
                chain: e.chain,
                contract: "multicall3"
            })
        }
        let d = (typeof o == "bigint" ? y(o) : void 0) || s
          , {schedule: m} = to({
            id: `${e.uid}.${d}`,
            wait: r,
            shouldSplitBatch(g) {
                return g.reduce( (ve, {data: $e}) => ve + ($e.length - 2), 0) > n * 2
            },
            fn: g => M(this, null, function*() {
                let V = g.map(ke => ({
                    allowFailure: !0,
                    callData: ke.data,
                    target: ke.to
                }))
                  , ve = _r({
                    abi: St,
                    args: [V],
                    functionName: "aggregate3"
                })
                  , $e = yield e.request({
                    method: "eth_call",
                    params: [{
                        data: ve,
                        to: p
                    }, d]
                });
                return Gr({
                    abi: St,
                    args: [V],
                    functionName: "aggregate3",
                    data: $e || "0x"
                })
            })
        })
          , [{returnData: l, success: h}] = yield m({
            data: i,
            to: c
        });
        if (!h)
            throw new yt({
                data: l
            });
        return l === "0x" ? {
            data: void 0
        } : {
            data: l
        }
    })
}
function cs(e) {
    let {code: t, data: n} = e;
    return Xt({
        abi: $t(["constructor(bytes, bytes)"]),
        bytecode: Qn,
        args: [t, n]
    })
}
function ps(e) {
    let {data: t, factory: n, factoryData: r, to: o} = e;
    return Xt({
        abi: $t(["constructor(address, bytes, address, bytes)"]),
        bytecode: er,
        args: [o, t, n, r]
    })
}
function ds(e) {
    if (!(e instanceof u))
        return;
    let t = e.walk();
    return typeof t?.data == "object" ? t.data?.data : t.data
}
var ht = class extends u {
    constructor({callbackSelector: t, cause: n, data: r, extraData: o, sender: s, urls: i}) {
        super(n.shortMessage || "An error occurred while fetching for an offchain result.", {
            cause: n,
            metaMessages: [...n.metaMessages || [], n.metaMessages?.length ? "" : [], "Offchain Gateway Call:", i && ["  Gateway URL(s):", ...i.map(a => `    ${ee(a)}`)], `  Sender: ${s}`, `  Data: ${r}`, `  Callback selector: ${t}`, `  Extra data: ${o}`].flat(),
            name: "OffchainLookupError"
        })
    }
}
  , xt = class extends u {
    constructor({result: t, url: n}) {
        super("Offchain gateway response is malformed. Response data must be a hex value.", {
            metaMessages: [`Gateway URL: ${ee(n)}`, `Response: ${k(t)}`],
            name: "OffchainLookupResponseMalformedError"
        })
    }
}
  , gt = class extends u {
    constructor({sender: t, to: n}) {
        super("Reverted sender address does not match target contract address (`to`).", {
            metaMessages: [`Contract address: ${n}`, `OffchainLookup sender address: ${t}`],
            name: "OffchainLookupSenderMismatchError"
        })
    }
}
;
function ao(e, t) {
    if (!w(e, {
        strict: !1
    }))
        throw new T({
            address: e
        });
    if (!w(t, {
        strict: !1
    }))
        throw new T({
            address: t
        });
    return e.toLowerCase() === t.toLowerCase()
}
function uo(e) {
    let {abi: t, data: n} = e
      , r = R(n, 0, 4)
      , o = t.find(s => s.type === "function" && r === O(P(s)));
    if (!o)
        throw new Je(r,{
            docsPath: "/docs/contract/decodeFunctionData"
        });
    return {
        functionName: o.name,
        args: "inputs"in o && o.inputs && o.inputs.length > 0 ? de(o.inputs, R(n, 4)) : void 0
    }
}
var $n = "/docs/contract/encodeErrorResult";
function An(e) {
    let {abi: t, errorName: n, args: r} = e
      , o = t[0];
    if (n) {
        let c = U({
            abi: t,
            args: r,
            name: n
        });
        if (!c)
            throw new Me(n,{
                docsPath: $n
            });
        o = c
    }
    if (o.type !== "error")
        throw new Me(void 0,{
            docsPath: $n
        });
    let s = P(o)
      , i = O(s)
      , a = "0x";
    if (r && r.length > 0) {
        if (!o.inputs)
            throw new Xe(o.name,{
                docsPath: $n
            });
        a = C(o.inputs, r)
    }
    return Q([i, a])
}
var Pn = "/docs/contract/encodeFunctionResult";
function co(e) {
    let {abi: t, functionName: n, result: r} = e
      , o = t[0];
    if (n) {
        let i = U({
            abi: t,
            name: n
        });
        if (!i)
            throw new z(n,{
                docsPath: Pn
            });
        o = i
    }
    if (o.type !== "function")
        throw new z(void 0,{
            docsPath: Pn
        });
    if (!o.outputs)
        throw new se(o.name,{
            docsPath: Pn
        });
    let s = ( () => {
        if (o.outputs.length === 0)
            return [];
        if (o.outputs.length === 1)
            return [r];
        if (Array.isArray(r))
            return r;
        throw new ie(r)
    }
    )();
    return C(o.outputs, s)
}
var In = "x-batch-gateway:true";
function Tn(e) {
    return M(this, null, function*() {
        let {data: t, ccipRequest: n} = e
          , {args: [r]} = uo({
            abi: He,
            data: t
        })
          , o = []
          , s = [];
        return yield Promise.all(r.map( (i, a) => M(this, null, function*() {
            try {
                s[a] = i.urls.includes(In) ? yield Tn({
                    data: i.data,
                    ccipRequest: n
                }) : yield n(i),
                o[a] = !1
            } catch (c) {
                o[a] = !0,
                s[a] = fs(c)
            }
        }))),
        co({
            abi: He,
            functionName: "query",
            result: [o, s]
        })
    })
}
function fs(e) {
    return e.name === "HttpRequestError" && e.status ? An({
        abi: He,
        errorName: "HttpError",
        args: [e.status, e.shortMessage]
    }) : An({
        abi: [Ne],
        errorName: "Error",
        args: ["shortMessage"in e ? e.shortMessage : e.message]
    })
}
var D0 = "0x556f1830"
  , ls = {
    name: "OffchainLookup",
    type: "error",
    inputs: [{
        name: "sender",
        type: "address"
    }, {
        name: "urls",
        type: "string[]"
    }, {
        name: "callData",
        type: "bytes"
    }, {
        name: "callbackFunction",
        type: "bytes4"
    }, {
        name: "extraData",
        type: "bytes"
    }]
};
function G0(s, i) {
    return M(this, arguments, function*(e, {blockNumber: t, blockTag: n, data: r, to: o}) {
        let {args: a} = at({
            data: r,
            abi: [ls]
        })
          , [c,p,f,d,m] = a
          , {ccipRead: l} = e
          , h = l && typeof l?.request == "function" ? l.request : ms;
        try {
            if (!ao(o, c))
                throw new gt({
                    sender: c,
                    to: o
                });
            let g = p.includes(In) ? yield Tn({
                data: f,
                ccipRequest: h
            }) : yield h({
                data: f,
                sender: c,
                urls: p
            })
              , {data: V} = yield io(e, {
                blockNumber: t,
                blockTag: n,
                data: D([d, C([{
                    type: "bytes"
                }, {
                    type: "bytes"
                }], [g, m])]),
                to: o
            });
            return V
        } catch (g) {
            throw new ht({
                callbackSelector: d,
                cause: g,
                data: r,
                extraData: m,
                sender: c,
                urls: p
            })
        }
    })
}
function ms(r) {
    return M(this, arguments, function*({data: e, sender: t, urls: n}) {
        let o = new Error("An unknown error occurred.");
        for (let s = 0; s < n.length; s++) {
            let i = n[s]
              , a = i.includes("{data}") ? "GET" : "POST"
              , c = a === "POST" ? {
                data: e,
                sender: t
            } : void 0
              , p = a === "POST" ? {
                "Content-Type": "application/json"
            } : {};
            try {
                let f = yield fetch(i.replace("{sender}", t.toLowerCase()).replace("{data}", e), {
                    body: JSON.stringify(c),
                    headers: p,
                    method: a
                }), d;
                if (f.headers.get("Content-Type")?.startsWith("application/json") ? d = (yield f.json()).data : d = yield f.text(),
                !f.ok) {
                    o = new Ce({
                        body: c,
                        details: d?.error ? k(d.error) : f.statusText,
                        headers: f.headers,
                        status: f.status,
                        url: i
                    });
                    continue
                }
                if (!B(d)) {
                    o = new xt({
                        result: d,
                        url: i
                    });
                    continue
                }
                return d
            } catch (f) {
                o = new Ce({
                    body: c,
                    details: f.message,
                    url: i
                })
            }
        }
        throw o
    })
}
export {B as a, x as b, u as c, re as d, ir as e, K as f, Ot as g, cr as h, mi as i, pr as j, S as k, y as l, Ct as m, tt as n, ue as o, nt as p, T as q, ce as r, ze as s, ia as t, w as u, D as v, Q as w, xa as x, Tr as y, C as z, ne as A, _r as B, $r as C, k as D, Sr as E, pu as F, ut as G, ct as H, E as I, Fe as J, Or as K, Fr as L, Cr as M, kr as N, Ur as O, Nr as P, Lr as Q, Dr as R, yt as S, Ce as T, bt as U, Xr as V, Jt as W, Yt as X, Zt as Y, Kt as Z, Qt as _, en as $, tn as aa, nn as ba, rn as ca, on as da, sn as ea, an as fa, un as ga, cn as ha, pn as ia, dn as ja, fn as ka, ln as la, mn as ma, yn as na, bn as oa, hn as pa, xn as qa, gn as ra, wn as sa, Jr as ta, G as ua, we as va, Yr as wa, Kr as xa, Qr as ya, ro as za, so as Aa, Gr as Ba, St as Ca, nr as Da, rr as Ea, qr as Fa, eo as Ga, to as Ha, D0 as Ia, ls as Ja, G0 as Ka, ms as La, io as Ma};

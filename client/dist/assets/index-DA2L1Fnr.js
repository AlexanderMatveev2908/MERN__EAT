import {
  r as m,
  j as s,
  u as te,
  a as T,
  N as M,
  C as Ie,
  P as ra,
  H as la,
  B as ia,
  F as ca,
  b as oa,
  I as da,
  c as Z,
  d as F,
  e as V,
  f as P,
  g as ua,
  h as Re,
  G as ma,
  T as cs,
  i as Bs,
  M as pa,
  k as q,
  l as os,
  m as Qs,
  n as zs,
  o as ds,
  p as xa,
  q as ga,
  s as ha,
  t as Ve,
  v as Gs,
  w as fa,
  x as ya,
  K as Ys,
  S as Hs,
  U as Ks,
  L as Zs,
  y as ja,
  z as wa,
  A as Us,
  D as _a,
  E as ba,
  J as va,
  O as us,
  Q as ms,
  R as Ws,
  V as Xs,
  W as Js,
  X as et,
  Y as Na,
  Z as ps,
  _ as Sa,
  $ as Ca,
  a0 as Pa,
  a1 as be,
  a2 as H,
  a3 as Ea,
  a4 as Ia,
  a5 as xs,
  a6 as Ra,
  a7 as Aa,
  a8 as ae,
  a9 as Da,
  aa as Ta,
  ab as st,
  ac as Fa,
  ad as tt,
  ae as de,
  af as ka,
  ag as La,
  ah as at,
  ai as Ua,
  aj as nt,
  ak as rt,
  al as lt,
  am as Va,
  an as it,
  ao as $a,
  ap as Ma,
  aq as Oa,
  ar as ct,
  as as qa,
  at as Ae,
  au as ot,
  av as Ba,
  aw as ve,
  ax as Qa,
  ay as za,
  az as Ga,
  aA as Ya,
  aB as Ha,
  aC as he,
  aD as gs,
  aE as Ka,
  aF as Za,
  aG as Wa,
  aH as Xa,
  aI as Ja,
  aJ as en,
  aK as sn,
  aL as C,
  aM as tn,
  aN as an,
  aO as nn,
} from "./vendor-react-nKOnvXsD.js";
import { a as rn, v as ln, b as cn } from "./vendor-BimTZaDL.js";
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) n(r);
  new MutationObserver((r) => {
    for (const l of r)
      if (l.type === "childList")
        for (const i of l.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(r) {
    const l = {};
    return (
      r.integrity && (l.integrity = r.integrity),
      r.referrerPolicy && (l.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : r.crossOrigin === "anonymous"
        ? (l.credentials = "omit")
        : (l.credentials = "same-origin"),
      l
    );
  }
  function n(r) {
    if (r.ep) return;
    r.ep = !0;
    const l = a(r);
    fetch(r.href, l);
  }
})();
const L = () => {
    m.useEffect(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    }, []);
  },
  on = () => (
    L(),
    s.jsx("div", {
      className: "w-full flex flex-col items-center gap-y-5",
      children: s.jsxs("div", {
        className: "w-full flex flex-col items-start gap-y-3",
        children: [
          s.jsx("span", {
            className: "txt__04 text-[whitesmoke]",
            children: "Order Comfortably From Home",
          }),
          s.jsx("span", {
            className: "txt__04 text-[whitesmoke]",
            children: "Or Manage Your Business From Anywhere",
          }),
        ],
      }),
    })
  ),
  ge = (e, t) => e && t.test(e),
  le = (e, t) => e.includes(t ?? ""),
  we = (e) => !!Object.keys(e ?? {}).length,
  dn = () => {
    var i;
    const [e] = te(),
      t = T(),
      a = e.get("type"),
      n = (i = t == null ? void 0 : t.state) == null ? void 0 : i.from;
    return {
      canStay:
        le(
          [
            "verify-account",
            "recover-pwd",
            "sentEmailUnsubscribe",
            "change-email",
            "change-pwd",
          ],
          a ?? ""
        ) &&
        le(
          [
            "/auth/register",
            "/auth/login",
            "/newsletter/notice-unsubscribe-with-retry",
            "/user/manage-account",
          ],
          n
        ),
      txt:
        a === "verify-account"
          ? "to verify your account"
          : a === "recover-pwd"
          ? "with a link to recover your password"
          : a === "change-email"
          ? "to verify your new email"
          : "with a link to unsubscribe from our newsletter",
    };
  },
  un = () => {
    L();
    const { canStay: e, txt: t } = dn();
    return e
      ? s.jsxs("div", {
          className: "w-full flex flex-col items-center gap-y-14",
          children: [
            s.jsx("div", {
              className: "w-full flex justify-center",
              children: s.jsx("span", {
                className: "txt__04 leading-10 lg:leading-16",
                children: `We've sent you an email ${t}! If you don't see it, check your
          spam folder, it might be partying there`,
              }),
            }),
            s.jsx("div", {
              className: "w-full flex justify-center items-center",
              children: s.jsx(Ie, {
                className:
                  "w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] md:w-[400px] md:h-[400px] text-green-600",
              }),
            }),
          ],
        })
      : s.jsx(M, { to: "/", replace: !0 });
  },
  mn = () =>
    s.jsx("div", {
      className: "w-full spinner_btn flex justify-center gap-4",
      children: Array.from({ length: 4 }).map((e, t) =>
        s.jsx(
          "span",
          { className: "spinner_tbn__el", style: { "--i": t + 1 } },
          t
        )
      ),
    }),
  De = () =>
    s.jsx("div", {
      className: "w-full flex justify-self-center",
      children: s.jsx(mn, {}),
    }),
  G = ({
    isDisabled: e,
    label: t,
    type: a = "button",
    handleClick: n,
    styleTxt: r,
    isPending: l,
  }) =>
    l
      ? s.jsx(De, {})
      : s.jsxs("button", {
          onClick: n,
          type: a,
          disabled: e,
          className: "btn_container outline-none",
          children: [
            s.jsxs("div", {
              className: "btn_container__content",
              children: [
                s.jsx("div", {
                  className: "content__btn",
                  children: s.jsx("span", {
                    className: `relative z-40 ${r ?? "btn__txt"}`,
                    children: t ?? "BUTTON",
                  }),
                }),
                s.jsx("span", { className: "btn__ref_1" }),
                s.jsx("span", { className: "btn__ref_2" }),
              ],
            }),
            s.jsx("span", { className: "btn_container__shadow" }),
            s.jsx(ra, { className: "btn_container__svg_1" }),
            s.jsx(la, { className: "btn_container__svg_2" }),
            s.jsx(ia, { className: "btn_container__svg_3" }),
            s.jsx(ca, { className: "btn_container__svg_4" }),
            s.jsx(oa, { className: "btn_container__svg_5" }),
            s.jsx(da, { className: "btn_container__svg_6" }),
          ],
        }),
  Te = ({ register: e, errors: t, field: a, custom: n }) => {
    var r, l;
    return s.jsxs("label", {
      className: "grid grid-cols-1 gap-y-3",
      children: [
        s.jsx("span", { className: "txt__02", children: a.label }),
        s.jsxs("div", {
          className: "w-full relative",
          children: [
            s.jsx("input", {
              type: a.type,
              className: "input__auth_field ",
              placeholder: `Your ${a.label}...`,
              ...e(a.field, {
                required: `${a.label} is required`,
                validate: (i) =>
                  !i || !a.reg.test(i)
                    ? a.msg
                    : n
                    ? n == null
                      ? void 0
                      : n(i)
                    : !0,
              }),
            }),
            s.jsx(a.svg, { className: "svg__auth_field" }),
          ],
        }),
        ((r = t == null ? void 0 : t[a.field]) == null ? void 0 : r.message) &&
          s.jsx("span", {
            className: "txt__00 text-red-600",
            children:
              (l = t == null ? void 0 : t[a.field]) == null
                ? void 0
                : l.message,
          }),
      ],
    });
  },
  dt = m.createContext(null),
  ue = () => {
    const e = m.useContext(dt);
    if (!e) throw new Error("useGlobal must be used within a GlobalProvider");
    return e;
  },
  A = () => ue().toastState,
  k = () => ue().userState,
  Ne = () => ue().popupState,
  fe = () => ue().formsState,
  hs = () => ue().sideState,
  Se = () => ue().cartState,
  pn = () => ue().noticeState,
  xn = () => ue().infoPopState,
  I = () => {
    const e = Z(),
      t = F(),
      { showToastMsg: a } = A(),
      { setUserLogged: n } = k();
    return {
      handleErrAPI: m.useCallback(
        ({ err: l, push: i = !1, toast: o = !0 }) => {
          var x, g, h, f, p;
          console.log(l);
          const c =
              ((g =
                (x = l == null ? void 0 : l.response) == null
                  ? void 0
                  : x.data) == null
                ? void 0
                : g.msg) || l.message,
            d =
              ((f =
                (h = l == null ? void 0 : l.response) == null
                  ? void 0
                  : h.config) == null
                ? void 0
                : f.url) || "",
            u =
              (p = l == null ? void 0 : l.response) == null ? void 0 : p.status;
          d === "/auth/refresh"
            ? (n(!1),
              e.resetQueries({ queryKey: ["myCart"] }),
              t("/", { replace: !0 }),
              a("SESSION EXPIRED", "ERROR"))
            : [401, 403, 429].includes(u ?? 400)
            ? (["USER DOES NOT EXIST", "USER NOT VERIFIED"].includes(c) &&
                (n(!1), e.resetQueries({ queryKey: ["myCart"] })),
              t("/", { replace: !0 }),
              a(c, "ERROR"))
            : (i && t("/", { replace: !0 }), o && a(c, "ERROR"));
        },
        [t, a, n, e]
      ),
    };
  },
  gn = !1,
  b = rn.create({ baseURL: "/api/v1", withCredentials: !0 });
b.interceptors.request.use(
  (e) => {
    const t = sessionStorage.getItem("accessToken");
    return t && (e.headers.Authorization = `Bearer ${t}`), e;
  },
  (e) => Promise.reject(e)
);
b.interceptors.response.use(
  (e) => e,
  async (e) => {
    var n, r, l;
    const t = e.config,
      a = t.url === "/auth/refresh";
    if (
      ((n = e == null ? void 0 : e.response) == null ? void 0 : n.status) ===
        401 &&
      [
        "ACCESS TOKEN EXPIRED",
        "ACCESS TOKEN INVALID",
        "ACCESS TOKEN NOT PROVIDED",
      ].includes(
        (l = (r = e == null ? void 0 : e.response) == null ? void 0 : r.data) ==
          null
          ? void 0
          : l.msg
      ) &&
      !a &&
      !t.retry
    )
      try {
        t.retry = !0;
        const { data: i } = await b.get("/auth/refresh");
        return (
          sessionStorage.setItem("accessToken", i.accessToken),
          (t.headers.Authorization = `Bearer ${i.accessToken}`),
          b(t)
        );
      } catch (i) {
        return sessionStorage.removeItem("accessToken"), Promise.reject(i);
      }
    return Promise.reject(e);
  }
);
const hn = async () => {
    const { data: e } = await b.get("/user/info-basic");
    return e;
  },
  fn = async () => {
    const { data: e } = await b.get("/user/profile-details");
    return e;
  },
  yn = async (e) => {
    const { data: t } = await b.patch("/user/profile-details", e);
    return t;
  },
  jn = async (e) => {
    const { data: t } = await b.post("/user/manage-account", { password: e });
    return t;
  },
  wn = async (e) => {
    const { data: t } = await b.patch("/user/change-email", { ...e });
    return t;
  },
  _n = async (e) => {
    const { data: t } = await b.post("/user/verify-new-email", e);
    return t;
  },
  bn = async (e) => {
    const { data: t } = await b.patch("/user/change-old-pwd", e);
    return t;
  },
  vn = async (e) => {
    const { data: t } = await b.delete("/user/delete-account", {
      data: { manageAccountToken: e },
    });
    return t;
  },
  Nn = async ({ type: e }) => {
    const { data: t } = await b.patch("/newsletter/toggle-logged", { type: e });
    return t;
  },
  Sn = async (e) => {
    const { data: t } = await b.post("/newsletter/subscribe-non-logged", {
      email: e,
    });
    return t;
  },
  Cn = async (e) => {
    const { data: t } = await b.patch(
      "/newsletter/unsubscribe-via-link-logged",
      e
    );
    return t;
  },
  Pn = async (e) => {
    const { data: t } = await b.delete(
      "/newsletter/unsubscribe-via-link-non-logged",
      { data: e }
    );
    return t;
  },
  En = async ({ email: e }) => {
    const { data: t } = await b.post("/newsletter/send-email-unsubscribe", {
      email: e,
    });
    return t;
  },
  In = async (e) => {
    const { data: t } = await b.post("/my-restaurants", e);
    return t;
  },
  Rn = async (e) => {
    const { data: t } = await b.get(`/my-restaurants?${e}`);
    return t;
  },
  An = async (e) => {
    const { data: t } = await b.get(`/my-restaurants/info-restaurant/${e}`);
    return t;
  },
  Dn = async ({ id: e, formData: t }) => {
    const { data: a } = await b.patch(`/my-restaurants/${e}`, t);
    return a;
  },
  Tn = async (e) => {
    const { data: t } = await b.delete(`/my-restaurants/${e}`);
    return t;
  },
  Fn = async (e) => {
    const { data: t } = await b.get(`/my-restaurants/${e}`);
    return t;
  },
  kn = async (e) => {
    const { data: t } = await b.post("/auth/register", { ...e });
    return t;
  },
  Ln = async ({ email: e, password: t }) => {
    const { data: a } = await b.post("/auth/login", { email: e, password: t });
    return a;
  },
  Un = async () => {
    const { data: e } = await b.post("/auth/logout");
    return e;
  },
  Vn = async ({ email: e, type: t }) => {
    const { data: a } = await b.post(`/auth/send-email?type=${t}`, {
      email: e,
    });
    return a;
  },
  $n = async ({ ...e }) => {
    const { data: t } = await b.post("/auth/verify-account", e);
    return t;
  },
  Mn = async ({ ...e }) => {
    const { data: t } = await b.post("/auth/verify-recover-pwd", e);
    return t;
  },
  On = async ({ ...e }) => {
    const { data: t } = await b.patch("/auth/recover-pwd", e);
    return t;
  },
  X = async (e) => {
    const { data: t } = await e();
    return t;
  },
  qn = async () => X(() => b.get("/my-cart")),
  Bn = async ({ dishId: e }) => X(() => b.post(`/my-cart?dishId=${e}`)),
  Qn = async ({ dishId: e }) => X(() => b.put(`/my-cart?dishId=${e}`)),
  zn = async ({ dishId: e }) => X(() => b.put(`/my-cart/del-item?dishId=${e}`)),
  Gn = async () => X(() => b.delete("/my-cart/del-cart")),
  Yn = async ({ dishId: e, quantity: t }) =>
    X(() => b.put(`/my-cart/put-input?dishId=${e}`, { quantity: t })),
  Hn = async ({ dishId: e, quantity: t }) =>
    X(() => b.put(`/my-cart/put-int?dishId=${e}`, { quantity: t })),
  Kn = async ({ dishId: e }) =>
    X(() => b.get(`/my-cart/dish-info?dishId=${e}`)),
  Zn = () => {
    const { setUserLogged: e } = k(),
      { showToastMsg: t } = A(),
      { handleErrAPI: a } = I(),
      n = F(),
      {
        register: r,
        handleSubmit: l,
        reset: i,
        formState: { errors: o },
        setFocus: c,
      } = V({ mode: "onSubmit" });
    m.useEffect(() => {
      c("email");
    }, [c]);
    const { mutate: d, isPending: u } = P({
        mutationFn: (g) => Ln(g),
        onSuccess: (g) => {
          i(),
            e(g.accessToken),
            t("User logged in successfully", "SUCCESS"),
            n("/");
        },
        onError: (g) => {
          var h, f, p;
          [401, 403].includes(
            ((h = g == null ? void 0 : g.response) == null
              ? void 0
              : h.status) ?? 400
          )
            ? t(
                ((p =
                  (f = g == null ? void 0 : g.response) == null
                    ? void 0
                    : f.data) == null
                  ? void 0
                  : p.msg) ?? "",
                "ERROR"
              )
            : a({ err: g });
        },
      }),
      x = l((g) => {
        d({ ...g });
      });
    return { register: r, errors: o, handleLoginUser: x, isPending: u };
  },
  $e = /^[A-Z][a-zA-ZÀ-ÿ`'-_\d\s]*$/,
  ut = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-zÀ-ÿ\d\W_]{8,}$/,
  fs =
    /^(?![.-])(?!.*[.-]$)(?!.*\.\.)(?!.*@.*@)[A-Za-zÀ-ÿ0-9._%+-]+@[A-Za-zÀ-ÿ0-9]+\.[A-Za-z]{2,}$/,
  J = /^[a-f0-9]{24}$/,
  Me = /^[a-f0-9]{128}$/,
  Wn = /^[A-Za-zÀ-ÿ\d\s_]{2,50}$/,
  Xn = /^[A-Za-zÀ-ÿ\d\s-_]{2,50}$/,
  Jn = /^[A-Za-zÀ-ÿ\d\s-_]{2,50}$/,
  er = /^[A-Za-zÀ-ÿ0-9\s,.#-]{5,100}$/,
  sr = /^\d{5}(-\d{4})?$/,
  mt = /^\+?\d{1,4}[\s-]?\(?\d{2,3}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}$/,
  tr = /^[A-Za-zÀ-ÿ0-9\s_\-!@#$%^&*()+=.,'"_]{2,50}$/,
  ar =
    /^(https?:\/\/)?(www\.)?[A-Za-z0-9-]+(\.[A-Za-z]{2,})(\/[A-Za-z0-9-/]*)?(\?[A-Za-z0-9=&]*)?(#[A-Za-z0-9-_]*)?$/,
  Je = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
  _e = /^\d+(\.\d{1,2})?$/,
  pt = /^\d+$/,
  Oe = /^[A-Za-zÀ-ÿ0-9\s,&!`'_-]*$/,
  es = /^\d*$/,
  xt = /^\d+$/,
  nr = /^[A-Za-zÀ-ÿ0-9\s_\-!@#$%^&*()+=.,'"_]{2,30}$/,
  Pe = /\/search\/?/,
  ie = /^\/search\/[a-f0-9]{24}$/,
  ys = /\/my-dishes\/?/,
  js = /\/my-restaurants\/?/,
  gt = (e, t) => {
    var a, n;
    return !(
      !e[1] ||
      (["search", "searchVals"].includes(e[0]) &&
        (!((a = t.searchVals) != null && a.length) ||
          !t.search ||
          !Oe.test(t.search) ||
          (["id", "restaurantId"].includes(
            (n = t.searchVals) == null ? void 0 : n[0]
          ) &&
            !J.test(t.search))))
    );
  },
  rr = (e) => {
    var a;
    const t = new URLSearchParams();
    for (const n of Object.entries(e ?? {}))
      gt(n, e) &&
        (Array.isArray(n[1])
          ? (a = n[1]) != null && a.length && t.append(n[0], n[1].join(","))
          : t.append(n[0], n[1]));
    return t;
  },
  ht = (e) => {
    var a;
    const t = new URLSearchParams();
    if (!e) return t;
    for (const n of Object.entries(e ?? {}))
      if (n[1] && gt(n, e))
        if (Array.isArray(n[1]))
          (a = n[1]) != null && a.length && t.append(n[0], n[1].join(", "));
        else {
          if (
            (["minPrice", "maxPrice"].includes(n[0]) &&
              (!_e.test(n[1] ?? "") ||
                (e != null &&
                  e.minPrice &&
                  e != null &&
                  e.maxPrice &&
                  ((n[0] === "minPrice" && +n[1] > +e.maxPrice) ||
                    (n[0] === "maxPrice" && +n[1] < e.minPrice))))) ||
            (["minQuantity", "maxQuantity"].includes(n[0]) &&
              (!es.test(n[1] ?? "") ||
                (e != null &&
                  e.minQuantity &&
                  e != null &&
                  e.maxQuantity &&
                  ((n[0] === "minQuantity" && +n[1] > +e.maxQuantity) ||
                    (n[0] === "maxQuantity" && +n[1] < +e.minQuantity)))))
          )
            continue;
          t.append(n[0], n[1]);
        }
    return t;
  },
  lr = (e) => {
    var a;
    const t = new URLSearchParams();
    for (const n of Object.entries(e))
      if (
        n[1] &&
        !(Array.isArray(n[1]) && !n[1].length) &&
        n[0] !== "searchVals"
      )
        if (n[0] === "items")
          for (const r of n[1])
            r.search &&
              Oe.test(r.search) &&
              (a = e.searchVals) != null &&
              a.length &&
              t.append(r.searchVal, r.search);
        else t.append(n[0], n[1]);
    return t;
  },
  ir = (e) => {
    var t, a;
    return (
      ((t = e.firstName.slice(0, 1)) == null ? void 0 : t.toUpperCase()) +
      ((a = e.lastName.slice(0, 1)) == null ? void 0 : a.toUpperCase())
    );
  },
  ss = (e) => {
    if (!pt.test(e + "")) return "00:00";
    const t = Math.floor(e / 60),
      a = e % 60;
    return `${(t + "").padStart(2, "0")}:${(a + "").padStart(2, "0")}`;
  },
  Ee = (e) => {
    if (!e || !Je.test(e)) return 0;
    const [t, a] = e.split(":").map((n) => +n);
    return t * 60 + a;
  },
  Ze = (e, t) => (Ee(e) - Ee(t)) / 60,
  ft = (e) => {
    const t = new FormData(),
      { images: a, categories: n, ...r } = e;
    [...a].every((i) => i instanceof File)
      ? [...a].forEach((i) => t.append("restaurantImages", i))
      : t.append("restaurantImages", JSON.stringify(a)),
      n.forEach((i) => t.append("categories", i));
    for (const i in r)
      r[i] &&
        (["openTime", "closeTime"].includes(i)
          ? t.append(i, `${Ee(r[i]) + ""}`)
          : t.append(i, r[i]));
    return t;
  },
  cr = (e) => {
    const t = new FormData();
    let a = 0;
    for (; a < e.items.length; ) {
      const { images: n, ...r } = e.items[a],
        l = [...n].every((i) => i instanceof File);
      n != null && n.length && l
        ? [...n].forEach((i) => {
            t.append(`images_${a}`, i);
          })
        : t.append(`images_${a}`, JSON.stringify(n));
      for (const i in r) t.append(`dishes[${a}][${i}]`, r[i]);
      a++;
    }
    return t;
  },
  or = (e) => {
    const t = new FormData(),
      { images: a, ...n } = e.items[0],
      r = [...a].every((l) => l instanceof File);
    a != null && a.length && r
      ? [...a].forEach((l) => {
          t.append("images", l);
        })
      : t.append("images", JSON.stringify(a));
    for (const l in n) t.append(l, n[l]);
    return t.append("restaurant", e.restaurant), t;
  },
  W = ({ price: e, showStr: t = !1 }) => {
    const a = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(e ?? 0);
    return !e && t ? "Free" : a;
  },
  dr = (e) => W({ price: e.quantity * e.price }),
  ur = (e, t) => W({ price: e + t }),
  yt = ({ location: e, el: t, type: a }) =>
    t != null && t.from && a
      ? a === t.path.split("=")[1]
        ? "active"
        : ""
      : e.pathname === t.path
      ? "active"
      : "",
  Vs = { full: ua, empty: Re },
  mr = (e) => {
    const t = [];
    for (let a = 0; a < 5; a++) e >= a + 1 ? t.push(Vs.full) : t.push(Vs.empty);
    return t;
  },
  y = () => ln(),
  pr = (e) =>
    [
      { label: "Update", path: `/my-restaurants/update/${e}`, icon: ma },
      { label: "Delete", path: "", icon: cs },
      { label: "Add dish", path: "/my-dishes/add-dish", icon: Bs },
      { label: "My dishes", path: "/my-dishes", icon: pa },
      { label: "My orders", path: "/my-orders", icon: q },
      { label: "My reviews", path: "/my-reviews", icon: os },
    ].map((t) => ({ ...t, id: y() })),
  xr = (...e) => [
    { id: y(), label: "Location", vals: e[0], icon: Qs },
    { id: y(), label: "Contact", vals: e[1], icon: zs },
    { id: y(), label: "Categories", vals: e[2], icon: ds },
  ],
  gr = { id: y(), label: "Open Hours", icon: ha },
  hr = (...e) => [
    { id: y(), icon: xa, val: ss(e[0]) },
    { id: y(), icon: ga, val: ss(e[1]) },
  ],
  fr = { id: y(), label: "Delivery", icon: Ve },
  yr = (...e) => [
    { id: y(), label: "Time", val: e[0] },
    { id: y(), label: "Price", val: e[1] },
    { id: y(), label: "Free meal", val: e[2] },
  ],
  jr = (...e) =>
    ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(
      (t, a) => ({ id: y(), label: t, val: e[a].count })
    ),
  wr = { id: y(), icon: Gs, label: "Orders" },
  _r = { id: y(), label: "Reviews", icon: fa },
  br = (...e) =>
    Array.from({ length: 5 }).map((t, a) => ({
      id: y(),
      val: e[a].count,
      stars: mr(a + 1),
    })),
  vr = { id: y(), label: "Dishes", icon: ya },
  Nr = (...e) => [
    { label: "Avg price", field: W({ price: e[0] }) },
    { label: "Avg quantity", field: e[1].toFixed(0) },
    { label: "Dishes count", field: e[2] },
  ],
  Sr = (...e) =>
    [
      { label: "Avg rating", field: e[0] },
      { label: "Reviews count", field: e[1] },
    ].map((t) => ({ ...t, id: y() })),
  Cr = [
    { id: y(), label: "Forgot password", svg: Ys, type: "login" },
    { id: y(), label: "Verify account", svg: Hs, type: "register" },
  ],
  Pr = [
    { id: y(), label: "Create account", svg: Ks, type: "login" },
    { id: y(), label: "Login in your account", svg: Zs, type: "register" },
  ],
  ws = [
    {
      id: y(),
      field: "firstName",
      label: "First Name",
      reg: $e,
      msg: "First Name should start with a capital letter and can only contains letters and apostrophe ",
    },
    {
      id: y(),
      field: "lastName",
      label: "Last Name",
      reg: $e,
      msg: "Last Name should start with a capital letter and can only contains letters and apostrophe",
    },
  ],
  qe = [
    {
      id: y(),
      field: "country",
      label: "Country",
      reg: Wn,
      msg: "Country can only contains letters, and must be at least 2 chars",
    },
    {
      id: y(),
      field: "state",
      label: "State",
      reg: Xn,
      msg: "State can only contains can only contains letters and hyphens if needed, and must be at least 2 chars ",
    },
    {
      id: y(),
      field: "city",
      label: "City",
      reg: Jn,
      msg: "City can only contains letters and hyphens if needed, and must be at least 2 chars",
    },
  ],
  Be = [
    {
      id: y(),
      field: "street",
      label: "Street",
      reg: er,
      msg: "Street can only contains letters, numbers, and spaces, and must be at least 5 chars",
    },
    {
      id: y(),
      field: "zipCode",
      label: "Zip Code",
      reg: sr,
      msg: "Zip Code can only contains numbers, at least 5 up to 10 digits",
    },
    {
      id: y(),
      field: "phone",
      label: "Phone",
      reg: mt,
      msg: "Phone can only contains numbers,and including country prefix up to 15 digits ",
    },
  ],
  Er = [...ws, ...qe, ...Be],
  Ir = [[...ws], [...qe], [...Be]],
  _s = 3,
  Rr = /(?=.*[A-Z])/,
  Ar = /[a-z]+/,
  Dr = /(?=.*\d)/,
  Tr = /(?=.*[\W_])/,
  Fr = [
    { id: y(), msg: "Uppercase letters", reg: Rr, label: "ABC..." },
    { id: y(), msg: "Lowercase letters", reg: Ar, label: "abc..." },
    { id: y(), msg: "Numbers", reg: Dr, label: "123..." },
    { id: y(), msg: "Symbols", reg: Tr, label: "!@#$..." },
  ],
  kr = "/assets/hero-C0USUQ76.avif",
  Lr = "/assets/hero_2-My4mLI9C.avif",
  Ur = "/assets/hero_5-DfOWyyJE.avif",
  Vr = "/assets/hero_6-B4eY8YHC.avif",
  $r = [
    { id: y(), img: kr },
    { id: y(), img: Lr },
    { id: y(), img: Ur },
    { id: y(), img: Vr },
  ],
  Mr = [
    { id: y(), label: "About", path: "/" },
    { id: y(), label: "Privacy Policy", path: "/" },
    { id: y(), label: "Terms & Conditions", path: "/" },
    { id: y(), label: "Contact", path: "/" },
  ],
  Or = [
    {
      id: y(),
      label: "Source Code",
      svg: ja,
      url: "https://github.com/AlexanderMatveev2908/FOOD_APP",
    },
    {
      id: y(),
      label: "Hotels App",
      svg: wa,
      url: "https://mern-booking-app-0w8v.onrender.com/",
    },
  ],
  Fe = {
    id: y(),
    field: "email",
    label: "Email",
    reg: fs,
    msg: "Email must follow this pattern /^(?![.-])(?!.*[.-]$)(?!.*\\.\\.)(?!.*@.*@)[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\\.[A-Za-z]{2,}$/ 🧐",
    svg: _a,
    type: "email",
  },
  qr = { ...Fe, label: "New Email", field: "newEmail" },
  Br = [
    {
      id: y(),
      field: "firstName",
      label: "First Name",
      reg: $e,
      msg: "A First Name must start with uppercase letter, and can include only letters and apostrophe.",
      svg: Us,
      type: "text",
    },
    {
      id: y(),
      field: "lastName",
      label: "Last Name",
      reg: $e,
      msg: "A Last Name must start with uppercase letter, and can include only letters and apostrophe",
      svg: Us,
      type: "text",
    },
  ],
  bs = {
    id: y(),
    field: "password",
    label: "Password",
    place: "Your password",
    msg: "Invalid password",
    reg: /.*/,
  },
  vs = {
    ...bs,
    reg: ut,
    msg: "Password must follow this pattern /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{8,}$/ 🧐",
  },
  Qr = {
    ...vs,
    label: "New Password",
    place: "Your new password",
    field: "newPassword",
  },
  Ns = {
    id: y(),
    field: "confirmPassword",
    label: "Confirm Password",
    place: "Confirm your password",
    msg: "",
    reg: /.*/,
  },
  jt = [
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
  pe = jt.map((e) => ({
    field: e,
    id: y(),
    label: e === "fast-food" ? "Fast-Food" : e[0].toUpperCase() + e.slice(1),
  })),
  zr = ["0-19", "20-39", "40-59", "60-79", "80-100"],
  wt = zr.map((e, t, a) => ({
    field: e,
    id: y(),
    label: `$${e}${t === a.length - 1 ? "+" : ""}`,
  })),
  Gr = ["0-1", "1.1-2", "2.1-3", "3.1-4", "4.1-5"],
  _t = Gr.map((e) => ({ field: e, id: y(), label: `⭐ ${e}` })),
  Qe = [
    { field: "asc", icon: ba },
    { field: "desc", icon: va },
  ],
  Yr = {
    id: y(),
    label: "Name",
    field: "name",
    required: !0,
    reg: tr,
    msg: "Restaurant name must be between 2 and 50 characters",
  },
  bt = [...qe.map((e) => ({ ...e, required: !0 }))],
  vt = Be.filter((e) => e.field !== "phone").map((e) => ({
    ...e,
    required: !0,
  })),
  Hr = [[...bt], [...vt]],
  ts = 2,
  Kr = [
    {
      id: y(),
      field: "email",
      label: "Email (if different from personal)",
      place: "Your email address...",
      required: !1,
      reg: fs,
      msg: "Email must follow this pattern /^(?![.-])(?!.*[.-]$)(?!.*\\.\\.)(?!.*@.*@)[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\\.[A-Za-z]{2,}$/ 🧐",
      type: "email",
    },
    {
      id: y(),
      field: "phone",
      label: "Phone (if different from personal)",
      place: "Your phone number...",
      required: !1,
      reg: mt,
      msg: "Phone can only contains numbers,and including country prefix up to 15 digits",
    },
    {
      id: y(),
      field: "website",
      label: "Website (if you have one)",
      place: "Your website url...",
      required: !1,
      reg: ar,
      msg: "A URL can have optionally the protocol, subdomain, must have main domain and eventually path query or fragment",
      type: "url",
    },
  ],
  Zr = [
    {
      id: y(),
      field: "openTime",
      label: "Open time",
      place: "Open time (8:00 e.g)",
      reg: Je,
      required: !0,
      msg: "Follow format HH:MM",
    },
    {
      id: y(),
      field: "closeTime",
      label: "Close time",
      place: "Close time (21:00 e.g)",
      reg: Je,
      required: !0,
      msg: "Follow the format HH:MM",
    },
  ],
  je = Math.ceil(jt.length / 6),
  Nt = [];
for (let e = 0; e < (pe == null ? void 0 : pe.length); e++)
  e % 6 === 0 && Nt.push([...pe.slice(e, e + 6)]);
const Wr = [
    {
      id: y(),
      type: "number",
      field: "estTimeDelivery",
      label: "Delivery time",
      msg: "Invalid format, write delivery time in minutes (e.g 20)",
      required: !0,
      place: "Delivery time...",
      reg: pt,
    },
    {
      id: y(),
      type: "number",
      field: "price",
      label: "Charge for delivery",
      msg: "Delivery charge must be a positive decimal number with at most 2 decimal places.",
      required: !1,
      place: "Leave empty if no charge",
      reg: _e,
    },
    {
      id: y(),
      type: "number",
      field: "freeDeliveryPrice",
      label: "Amount free delivery",
      msg: "The value must be a positive decimal number with at most 2 decimal places.",
      required: !1,
      place: "Leave empty if no amount",
      reg: _e,
    },
  ],
  Xr = ["name", "country", "state", "city", "id"],
  St = Xr.map((e) => ({
    field: e,
    id: y(),
    label: e[0].toUpperCase() + e.slice(1),
  })),
  Jr = ["pending", "processing", "shipped", "delivered", "cancelled"].map(
    (e) => ({ field: e, id: y(), label: e[0].toUpperCase() + e.slice(1) })
  ),
  el = [
    "0-9",
    "10-19",
    "20-29",
    "30-39",
    "40-49",
    "50-59",
    "60-69",
    "70-79",
    "80-89",
    "90-100",
  ].map((e, t, a) => ({
    id: y(),
    label: t === a.length - 1 ? "100+" : e,
    field: e,
  })),
  Ct = [
    { field: "ordersStatus", label: "Orders status", subFields: Jr, icon: q },
    {
      field: "avgRatingRange",
      label: "Avg rating",
      subFields: [..._t],
      icon: Re,
    },
    { field: "categories", label: "Category", subFields: [...pe], icon: us },
    {
      field: "avgPriceRange",
      label: "Avg price dish",
      subFields: [...wt],
      icon: ms,
    },
    {
      field: "avgQuantityRange",
      label: "Avg quantity dish",
      subFields: el,
      icon: q,
    },
  ].map((e) => ({ ...e, id: y() })),
  Pt = [
    { field: "createdAtSort", label: "Created at", icon: Ws },
    { field: "updatedAtSort", label: "Updated at", icon: Xs },
    { field: "avgRatingSort", label: "Avg rating", icon: Re },
    { field: "pendingOrdersSort", label: "Pending orders", icon: q },
    { field: "processingOrdersSort", label: "Processing orders", icon: q },
    { field: "shippedOrdersSort", label: "Shipped orders", icon: q },
    { field: "deliveredOrdersSort", label: "Delivered orders", icon: q },
    { field: "cancelledOrdersSort", label: "Cancelled orders", icon: q },
    { field: "ordersCountSort", label: "No. of orders", icon: Gs },
    { field: "reviewCountsSort", label: "No. of reviews", icon: os },
    { field: "avgPriceSort", label: "Avg price dish", icon: ms },
    { field: "avgQuantitySort", label: "Avg quantity dish", icon: q },
    { field: "dishesCountSort", label: "No. of dishes", icon: ds },
  ],
  sl = Pt.map((e) => ({
    ...e,
    id: y(),
    subFields: [...Qe.map((t) => ({ ...t, id: y() }))],
  }));
[...Ct.map((e) => e.field), ...Pt.map((e) => e.field)];
const tl = {
    search: "",
    searchVals: ["name"],
    categories: [],
    ordersStatus: [],
    avgPriceRange: [],
    avgQuantityRange: [],
    avgRatingRange: [],
    avgRatingSort: [],
    reviewsCountSort: [],
    avgPriceSort: [],
    dishesCountSort: [],
    avgQuantitySort: [],
    ordersCountSort: [],
    createdAtSort: [],
    updatedAtSort: [],
    pendingOrdersSort: [],
    processingOrdersSort: [],
    shippedOrdersSort: [],
    deliveredOrdersSort: [],
    cancelledOrdersSort: [],
    page: "1",
  },
  al = { id: y(), path: "/", label: "Home", svg: Ca },
  nl = [{ id: y(), path: "/search", label: "Restaurants", svg: Js }],
  Et = [
    { id: y(), path: "/user/profile", label: "Profile", svg: et },
    { id: y(), path: "/user/manage-account", label: "Manage Account", svg: Na },
  ],
  rl = [
    { id: y(), path: "/my-restaurants", label: "My restaurants", svg: Js },
    {
      id: y(),
      path: "/my-restaurants/add-restaurant",
      label: "Create restaurant",
      svg: ps,
    },
    { id: y(), path: "/my-dishes", label: "My dishes", svg: Sa },
    { id: y(), label: "Add dish", path: "/my-dishes/add-dish", svg: Bs },
    { id: y(), path: "/manage-orders", label: "Manage orders", svg: q },
    { id: y(), path: "/users-reviews", label: "Users reviews", svg: os },
  ],
  ll = { id: y(), label: "Admin menu", icon: be },
  il = Et.slice(0, 2),
  cl = { id: y(), label: "Account", icon: Pa },
  It = [
    { id: y(), path: "/auth/login", label: "Login", svg: Zs },
    {
      id: y(),
      path: "/auth/send-email?type=recover-pwd",
      label: "Recover Password",
      from: "/auth/login",
      svg: Ys,
    },
    { id: y(), path: "/auth/register", label: "Register", svg: Ks },
    {
      id: y(),
      path: "/auth/send-email?type=verify-account",
      label: "Verify Account",
      from: "/auth/register",
      svg: Hs,
    },
  ],
  Rt = ({ type: e }) => {
    const t = F(),
      a = T();
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2",
      children: [
        s.jsx("button", {
          type: "button",
          onClick: () =>
            t(
              `/auth/send-email?type=${
                e === "login" ? "recover-pwd" : "verify-account"
              }`,
              { state: { from: a.pathname } }
            ),
          className:
            "w-full flex items-center gap-3 group el__after_below cursor-pointer",
          children: Cr.map(
            (n) =>
              n.type === e &&
              s.jsxs(
                m.Fragment,
                {
                  children: [
                    s.jsx(n.svg, { className: "svg__switch_form" }),
                    " ",
                    s.jsx("span", {
                      className: "el__flow group-hover:text-orange-500 txt__00",
                      children: n.label,
                    }),
                  ],
                },
                n.id
              )
          ),
        }),
        s.jsx(H, {
          to: e === "login" ? "/auth/register" : "/auth/login",
          className:
            "w-full flex items-center gap-3 group el__after_below sm:justify-self-end",
          children: Pr.map(
            (n) =>
              n.type === e &&
              s.jsxs(
                m.Fragment,
                {
                  children: [
                    s.jsx(n.svg, { className: "svg__switch_form" }),
                    s.jsx("span", {
                      className: "el__flow group-hover:text-orange-500 txt__00",
                      children: n.label,
                    }),
                  ],
                },
                n.id
              )
          ),
        }),
      ],
    });
  },
  ce = ({
    register: e,
    errors: t,
    isVisible: a,
    handleChangeVisibility: n,
    field: r,
    custom: l,
  }) => {
    var o, c;
    const i = {
      required: "Password is required",
      pattern: { value: r.reg, message: r.msg },
      validate: (d) => (l ? l(d) : !0),
    };
    return s.jsxs("label", {
      className: "grid grid-cols-1 gap-y-3 relative",
      children: [
        s.jsx("span", { className: "txt__02", children: r.label }),
        s.jsxs("div", {
          className: "w-full relative",
          children: [
            s.jsx("input", {
              type: a ? "text" : "password",
              className: "input__auth_field ",
              placeholder: r.place,
              ...e(r.field, i),
            }),
            s.jsx("span", {
              onClick: () => n(),
              className: "w-fit flex justify-center items-center",
              children: a
                ? s.jsx(Ea, { className: "svg__auth_field" })
                : s.jsx(Ia, { className: "svg__auth_field" }),
            }),
          ],
        }),
        ((o = t == null ? void 0 : t[r.field]) == null ? void 0 : o.message) &&
          s.jsx("span", {
            className: "txt__00 text-red-600",
            children:
              (c = t == null ? void 0 : t[r.field]) == null
                ? void 0
                : c.message,
          }),
      ],
    });
  },
  ol = () => {
    L();
    const { register: e, errors: t, isPending: a, handleLoginUser: n } = Zn(),
      [r, l] = m.useState(!1);
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-10 items-center",
      children: [
        s.jsx("div", {
          className: "w-full flex justify-center",
          children: s.jsx("span", { className: "txt__04", children: "Login" }),
        }),
        s.jsx("div", {
          className:
            "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
          children: s.jsx("div", {
            className: "w-full grid grid-cols-1",
            children: s.jsxs("form", {
              onSubmit: n,
              className: "grid grid-cols-1 w-full gap-y-8",
              children: [
                s.jsx(Te, { register: e, errors: t, field: Fe }),
                s.jsx(ce, {
                  register: e,
                  errors: t,
                  isVisible: r,
                  handleChangeVisibility: () => l(!r),
                  field: bs,
                }),
                s.jsx("div", {
                  className:
                    "w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center",
                  children: s.jsx(G, {
                    styleTxt: "txt__02",
                    label: "Login",
                    type: "submit",
                    isPending: a,
                  }),
                }),
                s.jsx("div", {
                  className: "w-full",
                  children: s.jsx(Rt, { type: "login" }),
                }),
              ],
            }),
          }),
        }),
      ],
    });
  },
  dl = ({ register: e, errors: t, valTerms: a }) => {
    var o, c;
    const n = !!(
        (o = t == null ? void 0 : t.acceptedTerms) != null && o.message
      ),
      r = m.useRef(null),
      [l, i] = m.useState(!1);
    return (
      m.useEffect(() => {
        const d = (u) => {
          var x;
          if (
            !(!r.current || a === void 0) &&
            (x = r.current) != null &&
            x.contains(u.target)
          ) {
            const g = document.getElementById("squareCheck");
            g == null || g.classList.remove("register__checkbox"),
              requestAnimationFrame(() => {
                g == null || g.classList.add("register__checkbox");
              });
          }
        };
        return (
          document.addEventListener("click", d),
          () => {
            document.removeEventListener("click", d);
          }
        );
      }, [a, l]),
      s.jsxs("div", {
        className: "w-full grid grid-cols-1 gap-2 ",
        children: [
          s.jsxs("label", {
            ref: r,
            className:
              "w-full flex gap-10 max-w-fit justify-start relative py-2 cursor-pointer items-center",
            children: [
              s.jsx("input", {
                type: "checkbox",
                className: "opacity-0",
                ...e("acceptedTerms", {
                  required: "You must accept terms and conditions",
                }),
              }),
              s.jsx("span", {
                id: "squareCheck",
                onClick: () => i(!0),
                className: `absolute top-1 left-0 border-[3px] rounded-xl w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] cursor-pointer ${
                  a
                    ? "border-green-600"
                    : a === void 0 || !l
                    ? "border-white"
                    : "border-red-600"
                }`,
              }),
              s.jsx("span", {
                className: `absolute delay-75 -top-2 sm:-top-3 left-4 w-3 sm:w-4 h-8 sm:h-10 border-r-4 border-b-4 rotate-45 border-green-600 el__flow cursor-pointer ${
                  a ? "scale-100" : "scale-0"
                }`,
              }),
              s.jsx("span", {
                className: `txt__01 el__flow ${
                  a
                    ? "hover:text-green-600"
                    : a === void 0
                    ? "border-white"
                    : "hover:text-red-600"
                }`,
                children: "I Accept Terms And Conditions",
              }),
            ],
          }),
          n &&
            s.jsx("span", {
              className: "txt__00 text-red-600",
              children:
                (c = t == null ? void 0 : t.acceptedTerms) == null
                  ? void 0
                  : c.message,
            }),
        ],
      })
    );
  },
  Ss = ({
    isConfirmPwdVisible: e,
    setIsConfirmPwdVisible: t,
    isPwdVisible: a,
    setIsPwdVisible: n,
  }) => ({
    handleChangePwdVisibility: () => {
      e ? (t(!1), n(!0)) : n(!a);
    },
    handleChangeConfirmPwdVisibility: () => {
      a ? (n(!1), t(!0)) : t(!e);
    },
  }),
  ul = () => {
    const [e, t] = m.useState(!1),
      [a, n] = m.useState(!1),
      r = F(),
      l = T(),
      { handleChangePwdVisibility: i, handleChangeConfirmPwdVisibility: o } =
        Ss({
          isPwdVisible: e,
          setIsPwdVisible: t,
          isConfirmPwdVisible: a,
          setIsConfirmPwdVisible: n,
        }),
      { showToastMsg: c } = A(),
      {
        register: d,
        handleSubmit: u,
        reset: x,
        watch: g,
        trigger: h,
        formState: { errors: f },
        setFocus: p,
      } = V({ mode: "onChange" });
    m.useEffect(() => {
      p("firstName");
    }, [p]);
    const j = g("password");
    m.useEffect(() => {
      j && h("confirmPassword");
    }, [j, h]);
    const { mutate: w, isPending: _ } = P({
        mutationFn: (S) => kn(S),
        onSuccess: () => {
          x(),
            c("Account created successfully", "SUCCESS"),
            r("/notice-email?type=verify-account", {
              state: { from: l.pathname },
            });
        },
        onError: (S) => {
          var O, E;
          c(
            ((E =
              (O = S == null ? void 0 : S.response) == null
                ? void 0
                : O.data) == null
              ? void 0
              : E.msg) || (S == null ? void 0 : S.message),
            "ERROR"
          );
        },
      }),
      v = u((S) => {
        const { confirmPassword: O, ...E } = S;
        w(E);
      });
    return {
      register: d,
      errors: f,
      watch: g,
      trigger: h,
      isPwdVisible: e,
      isConfirmPwdVisible: a,
      handleChangePwdVisibility: i,
      handleChangeConfirmPwdVisibility: o,
      isPending: _,
      handleRegister: v,
      customPwd: (S) =>
        S === g("email") ? "Password must be different from email" : !0,
      customConfirmPwd: (S) =>
        S !== g("password") ? "Passwords do not match 🤔" : !0,
    };
  },
  Cs = ({ watch: e }) => {
    const t = e("password"),
      a = (t == null ? void 0 : t.length) >= 8;
    return s.jsxs("div", {
      className:
        "w-full col-span-2 grid grid-cols-[35px_70px_1fr] items-center",
      children: [
        s.jsx("span", {
          children: a
            ? s.jsx(Ie, { className: "w-[30px] h-[30px] text-green-600" })
            : s.jsx(xs, { className: "w-[30px] h-[30px] text-red-600" }),
        }),
        s.jsx("span", {
          className: `txt__00 ml-2 px-3 py-1 border-2 rounded-xl ${
            a
              ? "text-green-600 border-green-600"
              : "text-red-600 border-red-600"
          }`,
          children: s.jsx(Ra, {}),
        }),
        s.jsxs("span", {
          className: `txt__01 ml-4 ${a ? "text-green-600" : "text-red-600"}`,
          children: [(t == null ? void 0 : t.length) ?? 0, " / 8"],
        }),
      ],
    });
  },
  Ps = ({ watch: e }) =>
    Fr.map((t) => {
      const a = ge(e("password"), t.reg);
      return s.jsxs(
        "div",
        {
          className: "w-full grid grid-cols-[35px_70px_1fr] items-center",
          children: [
            s.jsx("span", {
              children: a
                ? s.jsx(Ie, { className: "w-[30px] h-[30px] text-green-600" })
                : s.jsx(xs, { className: "w-[30px] h-[30px] text-red-600" }),
            }),
            s.jsx("span", {
              className: `txt__00 ml-2 px-3 py-1 border-2 rounded-xl ${
                a
                  ? "text-green-600 border-green-600"
                  : "text-red-600 border-red-600"
              }`,
              children: t.label,
            }),
            s.jsx("span", {
              className: `txt__00 hidden ml-4 ${
                a ? "text-green-600" : "text-red-600"
              }`,
              children: t.msg,
            }),
          ],
        },
        t.id
      );
    }),
  ml = () => {
    const [e, t] = m.useState(""),
      a = m.useRef(null);
    m.useEffect(() => {
      const c = (d) => {
        var u;
        if (a.current && (u = a.current) != null && u.contains(d.target)) {
          const x = document.getElementById("tooltip");
          x == null || x.classList.remove("generate_password__tooltip"),
            requestAnimationFrame(() =>
              x == null ? void 0 : x.classList.add("generate_password__tooltip")
            );
        }
      };
      return (
        document.addEventListener("click", c),
        () => document.removeEventListener("click", c)
      );
    }, []);
    const n =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]<>-+~/$\\|",
      r = () => {
        const c = n.split("");
        for (let d = c.length - 1; d > 0; d--) {
          const u = Math.floor(Math.random() * (d + 1));
          [c[d], c[u]] = [c[u], c[d]];
        }
        return c.join("");
      },
      l = () => {
        const c = new Uint8Array(24);
        window.crypto.getRandomValues(c);
        const d = r();
        return Array.from(c, (u) => d[u % d.length]).join("");
      };
    return {
      generatePwd: async () => {
        let c = "";
        for (; !ut.test(c); ) c = await l();
        t(c);
      },
      handleCopyPwd: async () => {
        if (e)
          try {
            await navigator.clipboard.writeText(e);
          } catch {}
      },
      strongPwd: e,
      tooltipRef: a,
    };
  },
  Es = () => {
    const {
      strongPwd: e,
      generatePwd: t,
      handleCopyPwd: a,
      tooltipRef: n,
    } = ml();
    return s.jsxs("div", {
      className: "w-full max-w-full grid grid-cols-1 gap-3",
      children: [
        s.jsx("div", {
          className: "w-full max-w-fit flex hover:text-orange-500 btn__pseudo",
          children: s.jsxs("button", {
            onClick: t,
            type: "button",
            className:
              "justify-self-start flex gap-4 items-center cursor-pointer",
            children: [
              s.jsx(Aa, { className: "w-[30px] h-[30px]" }),
              s.jsx("span", {
                className: "txt__00",
                children: "Generate strong password",
              }),
            ],
          }),
        }),
        !!e &&
          s.jsxs("div", {
            className: "relative group w-full flex max-w-fit",
            children: [
              s.jsx("button", {
                type: "button",
                ref: n,
                onClick: a,
                className:
                  "txt__00 btn__pseudo border-2 border-orange-500 rounded-xl w-full max-w-fit px-6 py-1 cursor-pointer hover:text-orange-500 break-all text-start",
                children: e,
              }),
              s.jsx("span", {
                id: "tooltip",
                className:
                  "absolute text-sm lg:text-base px-4 py-1 -top-1/2 left-1/2 border-2 border-orange-500 rounded-xl w-full whitespace-nowrap bg-[#111] pointer-events-none z-10 txt__00 max-w-fit px-6 min-w-[150px] opacity-0",
                children: "Password Copied",
              }),
            ],
          }),
      ],
    });
  },
  pl = () => {
    L();
    const {
      register: e,
      errors: t,
      watch: a,
      isPwdVisible: n,
      isConfirmPwdVisible: r,
      handleChangePwdVisibility: l,
      handleChangeConfirmPwdVisibility: i,
      isPending: o,
      handleRegister: c,
      customPwd: d,
      customConfirmPwd: u,
    } = ul();
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-10 items-center",
      children: [
        s.jsx("div", {
          className: "w-full flex justify-center",
          children: s.jsx("span", {
            className: "txt__04",
            children: "Register",
          }),
        }),
        s.jsx("div", {
          className:
            "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
          children: s.jsx("div", {
            className: "w-full grid grid-cols-1",
            children: s.jsxs("form", {
              onSubmit: c,
              className: "grid grid-cols-1 w-full gap-y-8",
              children: [
                [...Br, Fe].map((x) =>
                  s.jsx(Te, { register: e, errors: t, field: x }, x.id)
                ),
                s.jsx(ce, {
                  register: e,
                  errors: t,
                  custom: d,
                  isVisible: n,
                  handleChangeVisibility: l,
                  field: vs,
                }),
                s.jsx(Es, {}),
                !!Object.keys((t == null ? void 0 : t.password) ?? {}).length &&
                  s.jsxs("div", {
                    className: "w-full grid grid-cols-2 gap-5 sm:grid-cols-4",
                    children: [
                      s.jsx(Ps, { watch: a }),
                      s.jsx(Cs, { watch: a }),
                    ],
                  }),
                s.jsx(ce, {
                  register: e,
                  errors: t,
                  custom: u,
                  isVisible: r,
                  handleChangeVisibility: i,
                  field: Ns,
                }),
                s.jsx(dl, {
                  register: e,
                  errors: t,
                  valTerms: a("acceptedTerms"),
                }),
                s.jsx("div", {
                  className:
                    "w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center",
                  children: s.jsx(G, {
                    styleTxt: "txt__02",
                    label: "Register",
                    type: "submit",
                    isPending: o,
                  }),
                }),
                s.jsx("div", {
                  className: "w-full",
                  children: s.jsx(Rt, { type: "register" }),
                }),
              ],
            }),
          }),
        }),
      ],
    });
  },
  xl = ({ reset: e, callAPI: t, type: a, from: n }) => {
    const { showToastMsg: r } = A(),
      { handleErrAPI: l } = I(),
      i = F(),
      { mutate: o, isPending: c } = P({
        mutationFn: ({ email: d }) => t({ email: d, type: a }),
        onSuccess: () => {
          e(),
            r("Verification Email sent successfully", "SUCCESS"),
            i(`/notice-email?type=${a ?? ""}`, { state: { from: n } });
        },
        onError: (d) => {
          var u, x, g;
          ((u = d == null ? void 0 : d.response) == null
            ? void 0
            : u.status) === 403
            ? r(
                (g =
                  (x = d == null ? void 0 : d.response) == null
                    ? void 0
                    : x.data) == null
                  ? void 0
                  : g.msg,
                "ERROR"
              )
            : l({ err: d });
        },
      });
    return { mutate: o, isPending: c };
  },
  gl = () => {
    var h;
    const [e] = te(),
      t = T(),
      a = (h = t == null ? void 0 : t.state) == null ? void 0 : h.from,
      n = e.get("type"),
      r =
        le(["/auth/register", "/auth/login"], a) &&
        le(["recover-pwd", "verify-account"], n ?? ""),
      {
        register: l,
        handleSubmit: i,
        formState: { errors: o },
        reset: c,
        setFocus: d,
      } = V({ mode: "onChange" });
    m.useEffect(() => {
      d("email");
    }, [d]);
    const { mutate: u, isPending: x } = xl({
        reset: c,
        callAPI: Vn,
        from: a,
        type: n,
      }),
      g = i((f) => {
        u({ email: f.email });
      });
    return {
      register: l,
      errors: o,
      canStay: r,
      type: n,
      isPending: x,
      handleSubmitEmail: g,
    };
  },
  hl = () => {
    L();
    const {
      register: e,
      errors: t,
      canStay: a,
      type: n,
      isPending: r,
      handleSubmitEmail: l,
    } = gl();
    return a
      ? s.jsxs("div", {
          className: "w-full grid grid-cols-1 gap-y-10 items-center",
          children: [
            s.jsx("div", {
              className: "w-full flex justify-center",
              children: s.jsx("span", {
                className: "txt__04",
                children:
                  n === "recover-pwd" ? "Recover Password" : "Verify Account",
              }),
            }),
            s.jsx("div", {
              className:
                "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
              children: s.jsx("div", {
                className: "w-full grid grid-cols-1",
                children: s.jsxs("form", {
                  onSubmit: l,
                  className: "grid grid-cols-1 w-full gap-y-8",
                  children: [
                    s.jsx(Te, { register: e, errors: t, field: Fe }),
                    s.jsx("div", {
                      className:
                        "w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center",
                      children: s.jsx(G, {
                        styleTxt: "txt__02",
                        label: "Send Email",
                        type: "submit",
                        isPending: r,
                      }),
                    }),
                  ],
                }),
              }),
            }),
          ],
        })
      : s.jsx(M, { to: "/", replace: !0 });
  },
  $s = ({ callAPI: e, successCB: t }) => {
    const a = F(),
      { handleErrAPI: n } = I(),
      { showToastMsg: r } = A(),
      l = (o) => {
        var c, d, u, x, g, h, f;
        ((c = o == null ? void 0 : o.response) == null ? void 0 : c.status) ===
          401 &&
        ["VERIFY TOKEN EXPIRED"].includes(
          (u =
            (d = o == null ? void 0 : o.response) == null ? void 0 : d.data) ==
            null
            ? void 0
            : u.msg
        )
          ? (((g =
              (x = o == null ? void 0 : o.response) == null
                ? void 0
                : x.config) == null
              ? void 0
              : g.url) === "/auth/verify-account"
              ? a("/auth/send-email?type=verify-account", {
                  replace: !0,
                  state: { from: "/auth/register" },
                })
              : a("/auth/send-email?type=recover-pwd", {
                  replace: !0,
                  state: { from: "/auth/login" },
                }),
            r(
              (f =
                (h = o == null ? void 0 : o.response) == null
                  ? void 0
                  : h.data) == null
                ? void 0
                : f.msg,
              "ERROR"
            ))
          : n({ err: o, push: !0 });
      },
      { mutate: i } = P({
        mutationFn: ({ userId: o, token: c }) => e({ userId: o, token: c }),
        onSuccess: (o) => {
          t(o);
        },
        onError: (o) => {
          l(o);
        },
      });
    return { mutate: i };
  },
  fl = () => {
    const e = m.useRef(!1),
      { isLogged: t, setUserLogged: a } = k(),
      { showToastMsg: n } = A(),
      [r] = te(),
      l = F(),
      i = r.get("type"),
      o = r.get("token"),
      c = r.get("userId"),
      d = ge(c ?? "", J),
      u = ge(o ?? "", Me),
      x = le(["recover-pwd", "verify-account"], i ?? ""),
      g = [u, d, x].every((_) => !!_) && !t,
      h = (_) => {
        a(_.accessToken),
          n("Account Verified Successfully", "SUCCESS"),
          l("/", { replace: !0 });
      },
      { mutate: f } = $s({
        callAPI: ({ userId: _, token: v }) => $n({ userId: _, token: v }),
        successCB: (_) => h(_),
      }),
      p = () => {
        n("Email verified Successfully", "SUCCESS"),
          l(`/auth/recover-pwd?userId=${c}&token=${o}`, {
            state: { from: "/auth/verify" },
            replace: !0,
          });
      },
      { mutate: j } = $s({
        callAPI: ({ userId: _, token: v }) => Mn({ userId: _, token: v }),
        successCB: () => p(),
      }),
      w = m.useCallback(() => {
        e.current ||
          ((e.current = !0),
          i === "verify-account"
            ? f({ userId: c, token: o })
            : i === "recover-pwd" && j({ userId: c, token: o }));
      }, [f, j, i, o, c]);
    return (
      m.useEffect(() => {
        w();
      }, [w]),
      { canStay: g }
    );
  },
  xe = { sm: 640, md: 768, lg: 1024, _2xl: 1536 },
  yl = () => {
    const [e, t] = m.useState(35),
      a = 360 / e;
    return (
      m.useEffect(() => {
        const n = () => (window.innerWidth > xe.lg ? t(40) : t(30));
        return (
          window.addEventListener("resize", n),
          () => window.removeEventListener("resize", n)
        );
      }, []),
      { numEls: e, deg: a }
    );
  },
  jl = () => {
    const { numEls: e, deg: t } = yl();
    return s.jsx("div", {
      className: "w-[200px] h-[200px] lg:h-[300px] lg:w-[300px] relative",
      children: Array.from({ length: e }).map((a, n) =>
        s.jsx(
          "span",
          {
            className:
              " spinner__el absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 min-w-full min-h-full",
            style: {
              "--i": n,
              "--numEls": e,
              "--deg": `${t}deg`,
              transform: `rotate(${t * n}deg)`,
            },
          },
          n
        )
      ),
    });
  },
  z = ({ pad: e }) =>
    s.jsx("div", {
      className: `w-full flex justify-center items-center ${
        e ?? "pt-[20vw] lg:pt-[12.5vw]"
      }`,
      children: s.jsx(jl, {}),
    }),
  wl = () => {
    L();
    const { canStay: e } = fl();
    return e ? s.jsx(z, {}) : s.jsx(M, { to: "/", replace: !0 });
  },
  _l = () => {
    var re;
    const [e, t] = m.useState(!1),
      [a, n] = m.useState(!1),
      { handleErrAPI: r } = I(),
      { showToastMsg: l } = A(),
      { setUserLogged: i } = k(),
      o = T(),
      c = F(),
      [d] = te(),
      u = d.get("token"),
      x = d.get("userId"),
      g = J.test(x ?? ""),
      h = Me.test(u ?? ""),
      f =
        ((re = o == null ? void 0 : o.state) == null ? void 0 : re.from) ===
          "/auth/verify" &&
        g &&
        h,
      { handleChangePwdVisibility: p, handleChangeConfirmPwdVisibility: j } =
        Ss({
          isPwdVisible: e,
          setIsPwdVisible: t,
          isConfirmPwdVisible: a,
          setIsConfirmPwdVisible: n,
        }),
      {
        register: w,
        setFocus: _,
        formState: { errors: v },
        handleSubmit: D,
        reset: N,
        watch: S,
        trigger: O,
      } = V({ mode: "onChange" }),
      { mutate: E, isPending: Y } = P({
        mutationFn: ({ password: $, token: me, userId: ye }) =>
          On({ password: $, token: me, userId: ye }),
        onSuccess: ($) => {
          N(),
            i($ == null ? void 0 : $.accessToken),
            l("Password changed successfully", "SUCCESS"),
            c("/", { replace: !0 });
        },
        onError: ($) => {
          r({ err: $ });
        },
      }),
      ee = D(($) => {
        const { password: me } = $;
        E({ password: me, token: u, userId: x });
      }),
      R = S("password");
    return (
      m.useEffect(() => {
        _("password");
      }, [_]),
      m.useEffect(() => {
        R && O("confirmPassword");
      }, [R, O]),
      {
        register: w,
        errors: v,
        watch: S,
        isPwdVisible: e,
        isConfirmPwdVisible: a,
        handleChangePwdVisibility: p,
        handleChangeConfirmPwdVisibility: j,
        canStay: f,
        handleSubmitRecoverPwd: ee,
        isPending: Y,
        customConfirmPwd: ($) =>
          $ !== S("password") ? "Passwords do not match 🤔" : !0,
      }
    );
  },
  bl = () => {
    L();
    const {
      register: e,
      errors: t,
      watch: a,
      isPwdVisible: n,
      isConfirmPwdVisible: r,
      handleChangePwdVisibility: l,
      handleChangeConfirmPwdVisibility: i,
      canStay: o,
      isPending: c,
      handleSubmitRecoverPwd: d,
      customConfirmPwd: u,
    } = _l();
    return o
      ? s.jsxs("div", {
          className: "w-full grid grid-cols-1 gap-y-10 items-center",
          children: [
            s.jsx("div", {
              className: "w-full flex justify-center",
              children: s.jsx("span", {
                className: "txt__04",
                children: "Recover Password",
              }),
            }),
            s.jsx("div", {
              className:
                "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
              children: s.jsx("div", {
                className: "w-full grid grid-cols-1",
                children: s.jsxs("form", {
                  onSubmit: d,
                  className: "grid grid-cols-1 w-full gap-y-8",
                  children: [
                    s.jsx(ce, {
                      register: e,
                      errors: t,
                      isVisible: n,
                      handleChangeVisibility: l,
                      field: vs,
                    }),
                    !!Object.keys((t == null ? void 0 : t.password) ?? {})
                      .length &&
                      s.jsxs("div", {
                        className:
                          "w-full grid grid-cols-2 gap-5 sm:grid-cols-4",
                        children: [
                          s.jsx(Ps, { watch: a }),
                          s.jsx(Cs, { watch: a }),
                        ],
                      }),
                    s.jsx(Es, {}),
                    s.jsx(ce, {
                      register: e,
                      errors: t,
                      custom: u,
                      isVisible: r,
                      handleChangeVisibility: i,
                      field: Ns,
                    }),
                    s.jsx("div", {
                      className:
                        "w-full mt-2 max-w-[250px] md:max-w-[300px] justify-self-center flex justify-center",
                      children: s.jsx(G, {
                        styleTxt: "txt__02",
                        label: "Change Password",
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
      : s.jsx(M, { to: "/", replace: !0 });
  };
var Q = ((e) => (
  (e.UPDATE_FIELD = "UPDATE_FIELD"),
  (e.SET_ERR = "SET_ERR"),
  (e.SET_REQUIRED = "SET_REQUIRED"),
  (e.SET_PREV_DISABLED = "SET_PREV_DISABLED"),
  (e.SET_NEXT_DISABLED = "SET_NEXT_DISABLED"),
  (e.SET_CURR = "SET_CURR"),
  (e.SET_FETCHED_DATA = "SET_FETCHED_DATA"),
  e
))(Q || {});
const vl = (e, t) => {
    var a, n, r, l, i, o;
    switch (t.type) {
      case Q.UPDATE_FIELD: {
        const { field: c, val: d } = t.payload;
        return { ...e, user: { ...e.user, [c]: d } };
      }
      case Q.SET_ERR: {
        const { field: c, msg: d } = t.payload;
        return { ...e, errs: { ...e.errs, [c]: { ...e.errs[c], msg: d } } };
      }
      case Q.SET_REQUIRED: {
        const { field: c, required: d } = t.payload;
        return {
          ...e,
          errs: { ...e.errs, [c]: { ...e.errs[c], required: d } },
        };
      }
      case Q.SET_CURR: {
        const { curr: c } = t.payload;
        return c === "PREV" && !e.currForm.isPrevDisabled
          ? {
              ...e,
              currForm: {
                curr: e.currForm.curr - 1,
                isPrevDisabled: e.currForm.curr - 1 === 0,
                isNextDisabled: !1,
              },
            }
          : {
              ...e,
              currForm: {
                curr: e.currForm.curr + 1,
                isPrevDisabled: !1,
                isNextDisabled: e.currForm.curr + 1 === _s - 1,
              },
            };
      }
      case Q.SET_NEXT_DISABLED: {
        const { isNextDisabled: c } = t.payload;
        return { ...e, currForm: { ...e.currForm, isNextDisabled: c } };
      }
      case Q.SET_FETCHED_DATA: {
        const { user: c } = t.payload;
        return {
          ...e,
          user: {
            firstName: (c == null ? void 0 : c.firstName) ?? "",
            lastName: (c == null ? void 0 : c.lastName) ?? "",
            country:
              ((a = c == null ? void 0 : c.address) == null
                ? void 0
                : a.country) ?? "",
            state:
              ((n = c == null ? void 0 : c.address) == null
                ? void 0
                : n.state) ?? "",
            city:
              ((r = c == null ? void 0 : c.address) == null
                ? void 0
                : r.city) ?? "",
            street:
              ((l = c == null ? void 0 : c.address) == null
                ? void 0
                : l.street) ?? "",
            zipCode:
              ((i = c == null ? void 0 : c.address) == null
                ? void 0
                : i.zipCode) ?? "",
            phone:
              ((o = c == null ? void 0 : c.address) == null
                ? void 0
                : o.phone) ?? "",
          },
          errs: {},
        };
      }
      default:
        return e;
    }
  },
  Nl = (e, t) => {
    let a;
    for (const n in t)
      e.map((r) => r.field).includes(n) && (a = { ...a, [n]: t[n] });
    return a;
  },
  Sl = (e, t) => {
    let a = !0;
    for (let n = 0; n < t.length; n++) t[n].reg.test(e[t[n].field]) || (a = !1);
    return a;
  },
  Cl = (e, t, a, n) => {
    e({
      type: Q.SET_ERR,
      payload: { field: t, msg: n.reg.test(a ?? "") ? null : n.msg },
    }),
      e({
        type: Q.SET_REQUIRED,
        payload: { field: t, required: a ? null : `${n.label} is required` },
      });
  },
  Pl = (e, t, a, n, r) => {
    const l = Ir[r ?? t.currForm.curr],
      i = Nl(l, t.user);
    a !== void 0 && n !== void 0 && (i[a] = n);
    const o = Sl(i, l);
    e({ type: Q.SET_NEXT_DISABLED, payload: { isNextDisabled: !o } });
  },
  El = (e, t, a, n) => {
    const { name: r, value: l } = n.target,
      [i] = Er.filter((o) => o.field === r);
    t(r, l, i),
      a(r, l),
      e({ type: Q.UPDATE_FIELD, payload: { field: r, val: l } });
  },
  Il = (e, t) =>
    t > 0 ? e({ type: Q.SET_CURR, payload: { curr: "PREV" } }) : void 0,
  Rl = (e, t, a) => {
    t.curr < _s - 1 &&
      !t.isNextDisabled &&
      e({ type: Q.SET_CURR, payload: { curr: "NEXT" } }),
      a(void 0, void 0, t.curr + 1);
  },
  Al = (e, t) => e({ type: Q.SET_FETCHED_DATA, payload: { user: t } }),
  Dl = {
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
  Tl = () => {
    const { handleErrAPI: e } = I(),
      { showToastMsg: t } = A(),
      a = Z(),
      {
        data: n,
        isPending: r,
        isError: l,
        isSuccess: i,
        error: o,
      } = ae({ queryKey: ["userProfileDetails"], queryFn: fn }),
      {
        mutate: c,
        isPending: d,
        isSuccess: u,
        isError: x,
        error: g,
      } = P({ mutationFn: (E) => yn(E) }),
      [h, f] = m.useReducer(vl, Dl),
      p = m.useCallback((E) => Al(f, E), [f]),
      j = m.useCallback(() => {
        if (l) e({ err: o });
        else if (i) {
          const { user: E = {} } = n ?? {};
          p(E);
        }
      }, [n, i, l, o, e, p]),
      w = m.useCallback(async () => {
        x
          ? e({ err: g })
          : u &&
            (t("Profile updated successfully", "SUCCESS"),
            await a.invalidateQueries({ queryKey: ["userProfileDetails"] }));
      }, [a, x, e, g, u, t]);
    m.useEffect(() => {
      j();
    }, [j]),
      m.useEffect(() => {
        w();
      }, [w]);
    const _ = (E, Y, ee) => Cl(f, E, Y, ee),
      v = (E, Y, ee) => Pl(f, h, E, Y, ee);
    return {
      state: h,
      handleChangeHigher: (E) => El(f, _, v, E),
      handlePrevHigher: () => Il(f, h.currForm.curr),
      handleNextHigher: () => Rl(f, h.currForm, v),
      isPending: r,
      isPendingUpdate: d,
      handleSubmit: (E) => {
        E.preventDefault(), c({ ...h.user });
      },
    };
  },
  Fl = () => {
    const e = m.useRef(null),
      t = m.useRef(null),
      a = m.useRef(null),
      {
        state: n,
        handleChangeHigher: r,
        handlePrevHigher: l,
        handleNextHigher: i,
        isPending: o,
        isPendingUpdate: c,
        handleSubmit: d,
      } = Tl(),
      u = m.useCallback(() => {
        const f = [e, t, a],
          p = n.currForm.curr;
        f[p].current &&
          setTimeout(() => {
            var j;
            (j = f[p].current) == null || j.focus();
          }, 600);
      }, [n.currForm.curr]);
    m.useEffect(() => {
      setTimeout(() => {
        u();
      }, 200);
    }, []),
      m.useEffect(() => {
        u();
      }, [u]);
    const { isPrevDisabled: x, isNextDisabled: g, curr: h } = n.currForm;
    return {
      propsBtns: {
        isPrevDisabled: x,
        isNextDisabled: g,
        handleNext: i,
        handlePrev: l,
      },
      curr: h,
      state: n,
      handleChange: r,
      isPending: o,
      isPendingUpdate: c,
      handleSubmit: d,
      refs: { inputRef_0: e, inputRef_1: t, inputRef_2: a },
    };
  },
  K = ({
    isDisabled: e,
    label: t,
    type: a = "button",
    handleClick: n,
    styleTxt: r,
    styleBtn: l,
    isPending: i,
  }) =>
    i
      ? s.jsx(De, {})
      : s.jsxs("button", {
          disabled: e,
          onClick: n,
          type: a,
          className: "btn__with_shadow_container group outline-none",
          children: [
            s.jsx("div", {
              className: `${
                l ?? "group-hover:text-orange-500 border-orange-500"
              } btn__with_shadow_container__content`,
              children: s.jsx("span", { className: `${r}`, children: t }),
            }),
            s.jsx("span", {
              className: `${
                l ?? "border-orange-500"
              } btn__with_shadow_container__shadow`,
            }),
          ],
        }),
  ze = ({
    currForm: e,
    isPrevDisabled: t,
    isNextDisabled: a,
    handlePrev: n,
    handleNext: r,
    totLen: l,
    hiddenLg: i,
    children: o = !1,
  }) =>
    s.jsxs("div", {
      className: `w-full grid grid-cols-2 sm:justify-items-center ${
        i ? "lg:hidden" : ""
      }`,
      children: [
        s.jsx("div", {
          className:
            "w-full max-w-[30vw] sm:max-w-[200px] justify-self-start sm:justify-self-center",
          children: s.jsx(K, {
            label: "Prev",
            isDisabled: t,
            handleClick: n,
            styleTxt: "txt__02",
            type: "button",
          }),
        }),
        e === l - 1
          ? o ?? null
          : s.jsx("div", {
              className:
                "w-full max-w-[30vw] sm:max-w-[200px] justify-self-end sm:justify-self-center",
              children: s.jsx(K, {
                label: "Next",
                isDisabled: a,
                handleClick: r,
                styleTxt: "txt__02",
                type: "button",
              }),
            }),
      ],
    }),
  kl = ({
    isPrevDisabled: e,
    isNextDisabled: t,
    handlePrev: a,
    handleNext: n,
    curr: r,
    isPendingUpdate: l,
  }) =>
    s.jsx(ze, {
      isPrevDisabled: e,
      isNextDisabled: t,
      handleNext: n,
      handlePrev: a,
      currForm: r,
      totLen: _s,
      hiddenLg: !1,
      children: s.jsx("div", {
        className: "w-full max-w-[200px] h-full flex items-center",
        children: s.jsx(G, {
          label: "Save",
          isDisabled: t,
          type: "submit",
          styleTxt: "txt__02",
          isPending: l,
        }),
      }),
    }),
  We = ({ el: e, state: t, handleChange: a, inputRef: n }) => {
    var l;
    const r = (l = t.errs) == null ? void 0 : l[e.field];
    return s.jsxs(
      "label",
      {
        className: "w-full flex flex-col gap-y-2",
        children: [
          s.jsx("span", { className: "txt__02", children: e.label }),
          s.jsx("input", {
            ref: n,
            onChange: a,
            type: "text",
            className:
              "w-full outline-none px-5 py-1 txt__01 border-2 border-orange-500 rounded-full focus__base el__flow",
            placeholder: `${e.label}`,
            name: e.field,
            value: t.user[e.field],
          }),
          !!Object.keys(r ?? {}).length &&
            s.jsx("span", {
              className: "txt__00 text-red-600",
              children:
                (r == null ? void 0 : r.required) ||
                (r == null ? void 0 : r.msg) ||
                "",
            }),
        ],
      },
      e.id
    );
  },
  Ll = ({
    state: e,
    handleChange: t,
    inputRef_0: a,
    inputRef_1: n,
    inputRef_2: r,
  }) =>
    s.jsxs(s.Fragment, {
      children: [
        s.jsx("div", {
          className:
            "grid grid-cols-1 p-5 gap-y-5 h-fit transition-all duration-500",
          children: ws.map((l, i) =>
            s.jsx(
              We,
              {
                state: e,
                handleChange: t,
                el: l,
                inputRef: e.currForm.curr === 0 && !i ? a : null,
              },
              l.id
            )
          ),
        }),
        s.jsx("div", {
          className:
            "min-w-full grid grid-cols-1 p-5 gap-y-5 transition-all duration-500 h-fit ",
          children: qe.map((l, i) =>
            s.jsx(
              We,
              {
                state: e,
                handleChange: t,
                el: l,
                inputRef: e.currForm.curr === 1 && !i ? n : null,
              },
              l.id
            )
          ),
        }),
        s.jsx("div", {
          className:
            "min-w-full grid grid-cols-1 p-5 gap-y-5 transition-all duration-500 h-fit ",
          children: Be.map((l, i) =>
            s.jsx(
              We,
              {
                state: e,
                handleChange: t,
                el: l,
                inputRef: e.currForm.curr === 2 && !i ? r : null,
              },
              l.id
            )
          ),
        }),
      ],
    }),
  Ul = () => {
    L();
    const {
      propsBtns: e,
      curr: t,
      state: a,
      handleChange: n,
      isPending: r,
      isPendingUpdate: l,
      handleSubmit: i,
      refs: o,
    } = Fl();
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 justify-items-center gap-y-5",
      children: [
        s.jsx("span", {
          className: "txt__04",
          children: "Your Profile Details",
        }),
        r
          ? s.jsx(z, {})
          : s.jsxs("form", {
              onSubmit: i,
              className:
                "w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-5 border-orange-500 rounded-xl h-fit p-5 sm:px-10",
              children: [
                s.jsx("div", {
                  className: "w-full overflow-hidden",
                  children: s.jsx("div", {
                    className:
                      "w-[300%] grid grid-cols-3 transition-all duration-500 min-h-[250px]",
                    style: { transform: `translateX(-${(t * 100) / 3}%)` },
                    children: s.jsx(Ll, { state: a, handleChange: n, ...o }),
                  }),
                }),
                s.jsx(kl, { ...e, curr: t, isPendingUpdate: l }),
              ],
            }),
      ],
    });
  },
  Vl = () => {
    const e = m.useRef(!1),
      [t] = te(),
      a = F(),
      n = T(),
      { showToastMsg: r } = A(),
      { handleErrAPI: l } = I(),
      i = t.get("typeUser"),
      o = t.get("userId"),
      c = t.get("token"),
      d =
        le(["non-logged", "logged"], i ?? "") &&
        ge(c ?? "", Me) &&
        ge(o ?? "", J),
      u = { userId: o ?? "", token: c ?? "" },
      { mutate: x } = P({
        mutationFn: () => (i === "logged" ? Cn({ ...u }) : Pn({ ...u })),
        onSuccess: () => {
          a("/newsletter/notice-unsubscribe-with-retry?success=true", {
            state: { from: n.pathname },
            replace: !0,
          }),
            r("Subscription deleted successfully", "SUCCESS");
        },
        onError: (g) => {
          var h, f, p;
          ((h = g == null ? void 0 : g.response) == null
            ? void 0
            : h.status) === 401
            ? (a("/newsletter/notice-unsubscribe-with-retry?success=false", {
                state: { from: n.pathname },
                replace: !0,
              }),
              r(
                (p =
                  (f = g == null ? void 0 : g.response) == null
                    ? void 0
                    : f.data) == null
                  ? void 0
                  : p.msg,
                "ERROR"
              ))
            : l({ err: g, push: !0 });
        },
      });
    return (
      m.useEffect(() => {
        if (d) {
          if (e.current) return;
          (e.current = !0), x();
        }
      }, [d, x]),
      { canStay: d }
    );
  },
  $l = () => {
    L();
    const { canStay: e } = Vl();
    return e ? s.jsx(z, {}) : s.jsx(M, { to: "/", replace: !0 });
  },
  Ml = () => {
    var f;
    const { showToastMsg: e } = A(),
      { handleErrAPI: t } = I(),
      [a] = te(),
      n = T(),
      r = F(),
      l = a.get("success"),
      i =
        ((f = n == null ? void 0 : n.state) == null ? void 0 : f.from) ===
        "/newsletter/verify-unsubscribe",
      {
        register: o,
        formState: { errors: c },
        handleSubmit: d,
        reset: u,
      } = V({ mode: "onChange" }),
      { mutate: x, isPending: g } = P({
        mutationFn: ({ email: p }) => En({ email: p }),
        onSuccess: () => {
          u(),
            e("Email sent successfully", "SUCCESS"),
            r("/notice-email?type=sentEmailUnsubscribe", {
              state: { from: n.pathname },
            });
        },
        onError: (p) => {
          t({ err: p });
        },
      }),
      h = d((p) => {
        x({ email: p.email });
      });
    return {
      canStay: i,
      success: l,
      register: o,
      errors: c,
      handleSubmitEmail: h,
      isPending: g,
    };
  },
  Ol = () => {
    L();
    const {
      canStay: e,
      success: t,
      register: a,
      errors: n,
      handleSubmitEmail: r,
      isPending: l,
    } = Ml();
    return e
      ? t === "true"
        ? s.jsxs("div", {
            className: "w-full flex flex-col items-center gap-y-14",
            children: [
              s.jsx("div", {
                className: "w-full flex justify-center",
                children: s.jsx("span", {
                  className: "txt__04 leading-10 lg:leading-16",
                  children:
                    "Your subscription has deleted successfully, if you unsubscribe by mistake don't worry, you can subscribe again anytime ✌🏼",
                }),
              }),
              s.jsx("div", {
                className: "w-full flex justify-center items-center",
                children: s.jsx(Ie, {
                  className:
                    "w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] md:w-[400px] md:h-[400px] text-green-600",
                }),
              }),
            ],
          })
        : s.jsxs("div", {
            className: "w-full grid grid-cols-1 gap-y-10 items-center",
            children: [
              s.jsx("div", {
                className: "w-full flex justify-center",
                children: s.jsx("span", {
                  className: "txt__04",
                  children: "Send unsubscribe link",
                }),
              }),
              s.jsx("div", {
                className:
                  "w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10",
                children: s.jsx("div", {
                  className: "w-full grid grid-cols-1",
                  children: s.jsxs("form", {
                    onSubmit: r,
                    className: "grid grid-cols-1 w-full gap-y-8",
                    children: [
                      s.jsx(Te, { register: a, errors: n, field: Fe }),
                      s.jsx("div", {
                        className:
                          "w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center",
                        children: s.jsx(G, {
                          styleTxt: "txt__02",
                          label: "Send Email",
                          type: "submit",
                          isPending: l,
                        }),
                      }),
                    ],
                  }),
                }),
              }),
            ],
          })
      : s.jsx(M, { to: "/", replace: !0 });
  },
  ql = () => {
    const { showToastMsg: e, closeToast: t } = A(),
      { handleErrAPI: a } = I(),
      {
        setCanManageAccount: n,
        canManageAccount: r,
        currUser: l,
        setUserLogged: i,
      } = k();
    return {
      showToastMsg: e,
      canManageAccount: r,
      setCanManageAccount: n,
      currUser: l,
      handleErrManageUser: ({ err: c }) => {
        var g, h, f, p, j;
        const d =
            (g = c == null ? void 0 : c.response) == null ? void 0 : g.status,
          u =
            (f =
              (h = c == null ? void 0 : c.response) == null
                ? void 0
                : h.config) == null
              ? void 0
              : f.url,
          x =
            ((j =
              (p = c == null ? void 0 : c.response) == null
                ? void 0
                : p.data) == null
              ? void 0
              : j.msg) || c.message;
        u === "/user/manage-account"
          ? d === 401
            ? e(x, "ERROR")
            : d === 429 && (i(!1), a({ err: c }))
          : ([401, 429].includes(d ?? 500) && n(!1), a({ err: c }));
      },
      closeToast: t,
    };
  },
  Bl = ({ setCanManageAccount: e, handleErrManageUser: t, closeToast: a }) => {
    const [n, r] = m.useState(!1),
      l = () => r(!n),
      {
        register: i,
        formState: { errors: o },
        handleSubmit: c,
        setFocus: d,
      } = V({ mode: "onChange" });
    m.useEffect(() => {
      d("password");
    }, [d]);
    const { mutate: u, isPending: x } = P({
        mutationFn: (h) => jn(h),
        onSuccess: (h) => {
          e(h.manageAccountToken), a();
        },
        onError: (h) => {
          t({ err: h });
        },
      }),
      g = c((h) => {
        u(h.password);
      });
    return {
      register: i,
      errors: o,
      isPwdVisible: n,
      handleChangeVisibility: l,
      submitManageForm: g,
      isPending: x,
    };
  },
  Ql = ({ setCanManageAccount: e, handleErrManageUser: t, closeToast: a }) => {
    const {
      register: n,
      errors: r,
      isPwdVisible: l,
      handleChangeVisibility: i,
      submitManageForm: o,
      isPending: c,
    } = Bl({ setCanManageAccount: e, handleErrManageUser: t, closeToast: a });
    return s.jsxs("form", {
      onSubmit: o,
      className:
        "w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-10 border-orange-500 rounded-xl h-fit p-5 sm:px-10 justify-items-center",
      children: [
        s.jsx("span", {
          className: "txt__03",
          children: "Confirm your password before proceeding",
        }),
        s.jsx("div", {
          className: "w-full",
          children: s.jsx(ce, {
            field: bs,
            register: n,
            errors: r,
            isVisible: l,
            handleChangeVisibility: i,
          }),
        }),
        s.jsx("div", {
          className:
            "w-full flex max-w-[200px] sm:max-w-[250px] justify-center",
          children: s.jsx(K, {
            label: "Submit",
            styleTxt: "txt__02",
            type: "submit",
            isPending: c,
          }),
        }),
      ],
    });
  },
  zl = ({ showToastMsg: e, setIsChildLoading: t, handleErrManageUser: a }) => {
    const n = T(),
      r = F(),
      {
        register: l,
        formState: { errors: i },
        handleSubmit: o,
        setFocus: c,
      } = V({ mode: "onChange" });
    m.useEffect(() => {
      c("newEmail");
    }, [c]);
    const { mutate: d, isPending: u } = P({
        mutationFn: (h) => (t(!0), wn(h)),
        onSuccess: () => {
          e("Email changed successfully!", "SUCCESS"),
            r("/notice-email?type=change-email", {
              state: { from: n.pathname },
            });
        },
        onError: (h) => {
          a({ err: h });
        },
        onSettled: () => {
          t(!1);
        },
      }),
      x = o((h) => {
        d({
          newEmail: h.newEmail,
          manageAccountToken:
            sessionStorage.getItem("manageAccountToken") ?? "",
        });
      });
    return {
      register: l,
      errors: i,
      handleSubmitChangeEmail: x,
      isPending: u,
      custom: (h, f) =>
        h === f ? "New Email must be different from old one" : !0,
    };
  },
  Gl = ({
    currUser: e,
    showToastMsg: t,
    setIsChildLoading: a,
    handleErrManageUser: n,
  }) => {
    const {
      register: r,
      errors: l,
      handleSubmitChangeEmail: i,
      isPending: o,
      custom: c,
    } = zl({ showToastMsg: t, setIsChildLoading: a, handleErrManageUser: n });
    return s.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 px-5 sm:px-10 h-[300px]",
      children: [
        s.jsx("span", { className: "txt__03", children: "Change Email" }),
        s.jsxs("form", {
          onSubmit: i,
          className: "w-full grid grid-cols-1 justify-items-center gap-y-6",
          children: [
            s.jsx("div", {
              className: "w-full",
              children: s.jsx(Te, {
                register: r,
                errors: l,
                field: qr,
                custom: (d) => c(d, e == null ? void 0 : e.email),
              }),
            }),
            s.jsx("div", {
              className: "w-full flex justify-center max-w-[250px]",
              children: s.jsx(G, {
                styleTxt: "txt__02",
                label: "Submit",
                type: "submit",
                isPending: o,
              }),
            }),
          ],
        }),
      ],
    });
  },
  as = 3,
  Yl = () => {
    const [e, t] = m.useState(0),
      [a, n] = m.useState(!1),
      r = e === 0,
      l = e === as - 1;
    return {
      currForm: e,
      propsBtns: {
        handlePrev: () => (e > 0 ? t((c) => c - 1) : void 0),
        handleNext: () => (e < as - 1 ? t((c) => c + 1) : void 0),
        isPrevDisabled: r,
        isNextDisabled: l,
      },
      isChildLoading: a,
      setIsChildLoading: n,
    };
  },
  Hl = ({
    showToastMsg: e,
    handleErrManageUser: t,
    setIsChildLoading: a,
    setCanManageAccount: n,
  }) => {
    const [r, l] = m.useState(!1),
      [i, o] = m.useState(!1),
      c = F(),
      {
        register: d,
        watch: u,
        reset: x,
        formState: { errors: g },
        handleSubmit: h,
      } = V({ mode: "onChange" }),
      { handleChangePwdVisibility: f, handleChangeConfirmPwdVisibility: p } =
        Ss({
          isConfirmPwdVisible: i,
          setIsConfirmPwdVisible: o,
          isPwdVisible: r,
          setIsPwdVisible: l,
        }),
      { mutate: j, isPending: w } = P({
        mutationFn: (N) => (a(!0), bn(N)),
        onSuccess: () => {
          x(), e("Password changed successfully", "SUCCESS"), c("/");
        },
        onError: (N) => {
          t({ err: N });
        },
        onSettled: () => {
          a(!1), n(!1);
        },
      }),
      _ = h((N) => {
        const { newPassword: S } = N;
        j({
          newPassword: S,
          manageAccountToken:
            sessionStorage.getItem("manageAccountToken") ?? "",
        });
      });
    return {
      register: d,
      errors: g,
      watch: u,
      handleChangePwdVisibility: f,
      handleChangeConfirmPwdVisibility: p,
      isConfirmPwdVisible: i,
      isPwdVisible: r,
      customPwd: (N, S) =>
        N === S ? "Password must be different from email" : !0,
      customConfirmPwd: (N) =>
        N !== u("newPassword") ? "Passwords do not match 🤔" : !0,
      isPending: w,
      handleSubmitChangePwd: _,
    };
  },
  Kl = ({
    showToastMsg: e,
    handleErrManageUser: t,
    setIsChildLoading: a,
    currUser: n,
    setCanManageAccount: r,
  }) => {
    const {
      register: l,
      errors: i,
      watch: o,
      handleChangePwdVisibility: c,
      handleChangeConfirmPwdVisibility: d,
      isConfirmPwdVisible: u,
      isPwdVisible: x,
      customPwd: g,
      customConfirmPwd: h,
      isPending: f,
      handleSubmitChangePwd: p,
    } = Hl({
      showToastMsg: e,
      handleErrManageUser: t,
      setIsChildLoading: a,
      setCanManageAccount: r,
    });
    return s.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 pb-10 px-5 sm:px-10",
      children: [
        s.jsx("span", { className: "txt__03", children: "Change Password" }),
        s.jsxs("form", {
          onSubmit: p,
          className: "w-full grid grid-cols-1 justify-items-center gap-y-5",
          children: [
            s.jsx("div", {
              className: "w-full",
              children: s.jsx(ce, {
                field: Qr,
                register: l,
                errors: i,
                isVisible: x,
                handleChangeVisibility: c,
                custom: (j) => g(j, n == null ? void 0 : n.email),
              }),
            }),
            !!Object.keys((i == null ? void 0 : i.newPassword) ?? {}).length &&
              s.jsxs("div", {
                className: "w-full grid grid-cols-2 sm:grid-cols-3 gap-3",
                children: [s.jsx(Ps, { watch: o }), s.jsx(Cs, { watch: o })],
              }),
            s.jsx(Es, {}),
            s.jsx("div", {
              className: "w-full",
              children: s.jsx(ce, {
                field: Ns,
                register: l,
                errors: i,
                isVisible: u,
                handleChangeVisibility: d,
                custom: h,
              }),
            }),
            s.jsx("div", {
              className: "w-full flex justify-center max-w-[250px] mt-5",
              children: s.jsx(G, {
                styleTxt: "txt__02",
                label: "Submit",
                type: "submit",
                isPending: f,
              }),
            }),
          ],
        }),
      ],
    });
  },
  oe = ({ handleDelete: e, txt: t, border: a = !0 }) =>
    s.jsx("button", {
      type: "button",
      onClick: e,
      className: `min-w-full group ${
        a ? "border-2 border-red-600 " : ""
      }el__flow hover:scale-110 rounded-xl gap-3 cursor-pointer`,
      children: s.jsxs("div", {
        className: "py-2 px-4 w-full flex justify-center gap-3",
        children: [
          s.jsx(cs, {
            className: "w-[30px] h-[30px] el__flow group-hover:text-red-600",
          }),
          s.jsx("span", {
            className: "txt__02 el__flow group-hover:text-red-600",
            children: t,
          }),
        ],
      }),
    }),
  Zl = ({ showToastMsg: e, setIsChildLoading: t, handleErrManageUser: a }) => {
    const n = F(),
      { setUserLogged: r } = k(),
      { setPopup: l, popup: i } = Ne(),
      { mutate: o, isPending: c } = P({
        mutationFn: (x) => (t(!0), l({ ...i, isPending: !0 }), vn(x)),
        onSuccess: () => {
          r(!1),
            n("/", { replace: !0 }),
            e("Account deleted successfully", "SUCCESS");
        },
        onError: (x) => {
          a({ err: x });
        },
        onSettled: () => {
          l(null), t(!1);
        },
      }),
      d = () => {
        o(sessionStorage.getItem("manageAccountToken") ?? "");
      };
    return {
      handleSubmitDeleteAccount: () => {
        l({
          txt: "delete your account?",
          redLabel: "Delete account",
          isPending: c,
          confirmAction: d,
        });
      },
      isPending: c,
      handleDeleteAccount: d,
    };
  },
  Wl = ({ showToastMsg: e, setIsChildLoading: t, handleErrManageUser: a }) => {
    const { handleSubmitDeleteAccount: n } = Zl({
      showToastMsg: e,
      setIsChildLoading: t,
      handleErrManageUser: a,
    });
    return s.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 pb-10 px-5 sm:px-10",
      children: [
        s.jsx("span", { className: "txt__03", children: "Delete Account" }),
        s.jsxs("div", {
          children: [
            s.jsx("span", {
              className: "txt__02",
              children: "This action is ",
            }),
            s.jsx("span", { className: "txt__03", children: "irreversible " }),
            s.jsx("span", {
              className: "txt__02",
              children:
                ", continuing you will delete your account and all associated data, without possibility of recovery.",
            }),
          ],
        }),
        s.jsx("div", {
          className: "w-fit justify-self-center mt-14",
          children: s.jsx(oe, { handleDelete: n, txt: "Delete account" }),
        }),
      ],
    });
  },
  Xl = ({
    currUser: e,
    showToastMsg: t,
    handleErrManageUser: a,
    setCanManageAccount: n,
  }) => {
    const {
      currForm: r,
      propsBtns: l,
      isChildLoading: i,
      setIsChildLoading: o,
    } = Yl();
    return s.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-y-10 max-w-[600px]",
      children: [
        s.jsx("div", {
          className: `w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-5 border-orange-500 rounded-xl overflow-hidden h-fit  transition-all duration-500 ${
            r === 0
              ? "max-h-[350px]"
              : r === 1
              ? "max-h-[750px]"
              : "max-h-[350px]"
          }`,
          children: s.jsxs("div", {
            className:
              "w-[300%] grid grid-cols-3 transition-all duration-500 place-items-start justify-items-start",
            style: { transform: `translateX(-${(r * 100) / 3}%)` },
            children: [
              s.jsx(Gl, {
                currUser: e,
                showToastMsg: t,
                setIsChildLoading: o,
                handleErrManageUser: a,
              }),
              s.jsx(Kl, {
                currUser: e,
                showToastMsg: t,
                setIsChildLoading: o,
                handleErrManageUser: a,
                setCanManageAccount: n,
              }),
              s.jsx(Wl, {
                showToastMsg: t,
                setIsChildLoading: o,
                handleErrManageUser: a,
              }),
            ],
          }),
        }),
        s.jsx(ze, {
          hiddenLg: !1,
          currForm: r,
          totLen: as,
          bothDisabled: i,
          ...l,
        }),
      ],
    });
  },
  Jl = () => {
    L();
    const {
      showToastMsg: e,
      canManageAccount: t,
      currUser: a,
      handleErrManageUser: n,
      setCanManageAccount: r,
      closeToast: l,
    } = ql();
    return s.jsxs("div", {
      className:
        "w-full grid grid-cols-1 justify-items-center gap-5 sm:gap-y-10",
      children: [
        s.jsx("span", {
          className: "txt__04",
          children: "Manage your account",
        }),
        t
          ? s.jsx(Xl, {
              currUser: a,
              showToastMsg: e,
              handleErrManageUser: n,
              setCanManageAccount: r,
            })
          : s.jsx(Ql, {
              handleErrManageUser: n,
              setCanManageAccount: r,
              closeToast: l,
            }),
      ],
    });
  },
  ei = () => {
    const e = m.useRef(!1),
      t = Z(),
      [a] = te(),
      n = F(),
      { showToastMsg: r } = A(),
      { handleErrAPI: l } = I(),
      i = a.get("token"),
      o = a.get("userId"),
      c = ge(o ?? "", J),
      d = ge(i ?? "", Me),
      u = c && d,
      { mutate: x } = P({
        mutationFn: (g) => _n(g),
        onSuccess: () => {
          r("New Email successfully verified!", "SUCCESS"),
            t.resetQueries({ queryKey: ["currUser"] }),
            n("/", { replace: !0 });
        },
        onError: (g) => {
          l({ err: g, push: !0 });
        },
      });
    return (
      m.useEffect(() => {
        if (u) {
          if (e.current) return;
          (e.current = !0), x({ token: i ?? "", userId: o ?? "" });
        }
      }, [u, x, i, o]),
      { canStay: u }
    );
  },
  si = () => {
    const { canStay: e } = ei();
    return e ? s.jsx(z, {}) : s.jsx(M, { to: "/", replace: !0 });
  },
  ti = () => {
    const e = F(),
      { showToastMsg: t } = A(),
      { handleErrAPI: a } = I(),
      n = V({ mode: "onChange", defaultValues: {} });
    m.useEffect(() => {
      n.setFocus("name");
    }, [n]);
    const { mutate: r, isPending: l } = P({
        mutationFn: (o) => In(o),
        onSuccess: (o) => {
          t("Restaurant created successfully", "SUCCESS"),
            e(`/my-restaurants/${o == null ? void 0 : o.restId}`);
        },
        onError: (o) => {
          a({ err: o });
        },
      }),
      i = n.handleSubmit((o) => {
        const c = ft(o);
        r(c);
      });
    return { formContext: n, handleSave: i, isPending: l };
  },
  se = ({
    field: e,
    register: t,
    errors: a,
    customValidate: n,
    indexForm: r,
  }) => {
    var i, o, c, d;
    const l =
      r || r === 0
        ? (c =
            (o = (i = a == null ? void 0 : a.items) == null ? void 0 : i[r]) ==
            null
              ? void 0
              : o[e.field.split(".").pop()]) == null
          ? void 0
          : c.message
        : (d = a == null ? void 0 : a[e.field]) == null
        ? void 0
        : d.message;
    return s.jsxs("div", {
      className:
        "max-w-full w-full grid grid-cols-1 gap-y-3 justify-items-start",
      children: [
        s.jsxs("label", {
          className: "w-full flex flex-col gap-y-2 justify-start",
          children: [
            s.jsx("span", { className: "txt__02", children: e.label }),
            s.jsx("input", {
              step: (e == null ? void 0 : e.type) === "number" ? "any" : void 0,
              type: (e == null ? void 0 : e.type) ?? "text",
              ...t(e.field, {
                required:
                  e != null && e.required ? `${e.label} is required` : !1,
                pattern: { value: e.reg, message: e.msg },
                validate: (u) => (n ? n(u) : !0),
              }),
              className: "input__base txt__02",
              placeholder:
                (e == null ? void 0 : e.place) ?? `Your ${e.label}...`,
            }),
          ],
        }),
        l && s.jsx("span", { className: "txt__01 text-red-600", children: l }),
      ],
    });
  },
  ai = ({ formContext: e }) => {
    const {
      register: t,
      formState: { errors: a },
    } = e;
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-5",
      children: [
        s.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [s.jsx(zs, { className: "w-[35px] h-[35px]" }), "Contact"],
        }),
        s.jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10",
          children: Kr.map((n) =>
            s.jsx(se, { register: t, errors: a, field: n }, n.id)
          ),
        }),
      ],
    });
  },
  ni = ({ formContext: e }) => {
    const {
        register: t,
        watch: a,
        formState: { errors: n },
        trigger: r,
      } = e,
      l = a("openTime"),
      i = a("closeTime");
    m.useEffect(() => {
      (() => {
        Ze(i, l) !== 0 && (r("openTime"), r("closeTime"));
      })();
    }, [l, i, r]);
    const o = (d) => {
        const u = Ze(d, a("openTime"));
        return u > 0 && u < 4
          ? "You must keep open at least 4 hours (part-time)"
          : !0;
      },
      c = (d) => {
        const u = Ze(a("closeTime"), d);
        return u > 0 && u < 4
          ? "You must keep open at least 4 hours (part-time)"
          : !0;
      };
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-5",
      children: [
        s.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [
            s.jsx(Da, { className: "w-[35px] h-[35px]" }),
            "Opening and closing times",
          ],
        }),
        s.jsx("div", {
          className: "w-full sm:grid grid-cols-2 gap-5",
          children: Zr.map((d) =>
            s.jsx(
              se,
              {
                field: d,
                errors: n,
                register: t,
                customValidate: d.field === "closeTime" ? o : c,
              },
              d.id
            )
          ),
        }),
      ],
    });
  },
  ri = () => {
    const [e, t] = m.useState(0),
      a = () => (e > 0 ? t((i) => i - 1) : void 0),
      n = () => (e < je - 1 ? t((i) => i + 1) : void 0),
      r = e === 0,
      l = e === je - 1;
    return {
      propsBtns: {
        currForm: e,
        handlePrev: a,
        handleNext: n,
        isPrevDisabled: r,
        isNextDisabled: l,
      },
    };
  },
  At = ({
    field: e,
    register: t,
    valsChosen: a,
    customValidate: n,
    currCategory: r,
  }) => {
    var i;
    const l =
      (i = a == null ? void 0 : a.includes) == null
        ? void 0
        : i.call(a, e.field);
    return s.jsxs("label", {
      className: `w-full flex items-center border-2 rounded-xl py-2 el__flow cursor-pointer ${
        l ? "scale-105 border-orange-500" : "border-[#222]"
      }`,
      children: [
        s.jsx("input", {
          type: "checkbox",
          value: e.field,
          ...t(r, { validate: (o) => (n ? n(o) : !0) }),
          className: "opacity-0 w-0 h-0",
        }),
        s.jsx("span", {
          className: `txt__01 w-full flex justify-center break-all el__flow ${
            l ? "text-orange-500" : ""
          }`,
          children: (e == null ? void 0 : e.label) ?? e.field.toUpperCase(),
        }),
      ],
    });
  },
  li = ({ formContext: e }) => {
    var i, o;
    const {
        register: t,
        watch: a,
        formState: { errors: n },
      } = e,
      { propsBtns: r } = ri(),
      l = (c) =>
        c != null && c.length
          ? (c == null ? void 0 : c.length) > 3
            ? "You can chose up to 3 categories for your restaurant"
            : !0
          : "You must chose at least one category for your restaurant";
    return s.jsxs("div", {
      className: "w-full flex flex-col gap-y-5",
      children: [
        s.jsx("div", {
          className: "w-full p-5 overflow-x-hidden",
          children: s.jsx("div", {
            className:
              "grid lg:max-w-full lg:gap-x-10 lg:grid-cols-2 transition-all duration-500 items-start",
            style: {
              width: `${Math.ceil(je) * 100}%`,
              gridTemplateColumns: `repeat(${je}, 1fr)`,
              transform: `translateX(-${r.currForm * (100 / Math.ceil(je))}%)`,
            },
            children: Nt.map((c, d) =>
              s.jsx(
                "div",
                {
                  className: `transition-all lg:opacity-100 duration-300 grid grid-cols-2 gap-x-10 gap-y-5 ${
                    r.currForm !== d ? "opacity-0" : "opacity-100"
                  }`,
                  children: c.map((u) =>
                    s.jsx(
                      At,
                      {
                        register: t,
                        field: u,
                        valsChosen: a("categories"),
                        customValidate: l,
                        currCategory: "categories",
                      },
                      u.id
                    )
                  ),
                },
                d
              )
            ),
          }),
        }),
        ((i = n == null ? void 0 : n.categories) == null
          ? void 0
          : i.message) &&
          s.jsx("span", {
            className: "txt__01 -mt-5 text-red-600 pl-5",
            children:
              (o = n == null ? void 0 : n.categories) == null
                ? void 0
                : o.message,
          }),
        s.jsx("div", {
          className: "w-full flex px-5",
          children: s.jsx(ze, { totLen: je, ...r, hiddenLg: !0 }),
        }),
      ],
    });
  },
  ii = ({ formContext: e }) =>
    s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-5",
      children: [
        s.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [
            s.jsx(Ta, { className: "w-[35px] h-[35px]" }),
            "Restaurant Category",
          ],
        }),
        s.jsx(li, { formContext: e }),
      ],
    }),
  ci = ({ formContext: e }) => {
    const {
      register: t,
      formState: { errors: a },
    } = e;
    return s.jsxs("div", {
      className: "w-full flex flex-col gap-5",
      children: [
        s.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [
            s.jsx(st, { className: "h-[35px] w-[35px]" }),
            "Restaurant name",
          ],
        }),
        s.jsx("div", {
          className:
            "w-full justify-self-start grid lg:grid-cols-2 gap-y-3 gap-x-10",
          children: s.jsx(se, { field: Yr, register: t, errors: a }),
        }),
      ],
    });
  },
  oi = ({ indexForm: e, setValue: t, images: a, img: n }) => {
    const r = e || e === 0 ? `items.${e}.images` : "images";
    return {
      handleRemoveExistingFile: () => {
        const o = [...a].filter((c) => c !== n);
        t(r, o, { shouldValidate: !0 });
      },
      handleRemoveExistingImgUploaded: () => {
        const o = a.filter((c) =>
          n instanceof File
            ? !0
            : c.public_id !== (n == null ? void 0 : n.public_id)
        );
        t(r, o, { shouldValidate: !0 });
      },
    };
  },
  Dt = ({ img: e, images: t, setValue: a, indexForm: n }) => {
    const { handleRemoveExistingFile: r, handleRemoveExistingImgUploaded: l } =
      oi({ img: e, images: t, setValue: a, indexForm: n });
    return s.jsxs("div", {
      onClick: e instanceof File ? r : l,
      className:
        "min-w-[150px] max-w-[150px] h-[150px] sm:min-w-[200px] sm:max-w-[200px] sm:h-[200px] rounded-xl snap-center relative group cursor-pointer",
      children: [
        e &&
          s.jsx("img", {
            className: "w-full h-full",
            src:
              e instanceof File
                ? URL.createObjectURL(e)
                : e == null
                ? void 0
                : e.url,
            alt: "",
          }),
        s.jsx("div", {
          className:
            "absolute inset-0 bg-black/70 opacity-0 el__flow group-hover:opacity-100",
        }),
        s.jsxs("div", {
          className:
            "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full flex justify-center items-center z-20 gap-4 el__flow opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100  group-hover:scale-120",
          children: [
            s.jsx(cs, { className: "w-[30px] h-[30px] text-red-600" }),
            s.jsx("span", {
              className: "txt__01 text-red-600",
              children: "Remove",
            }),
          ],
        }),
      ],
    });
  },
  Tt = ({ register: e, watch: t, indexForm: a }) => {
    const n = a || a === 0 ? `items.${a}.images` : "images";
    return s.jsx("div", {
      className: "w-full grid ",
      children: s.jsxs("label", {
        className: "w-fit grid relative",
        children: [
          s.jsx("input", {
            type: "file",
            multiple: !0,
            className: "opacity-0 absolute outline-none",
            ...e(n, {
              validate: () => {
                const r = t(n);
                return r != null && r.length
                  ? (r == null ? void 0 : r.length) > 5
                    ? "You can upload up to 5 images"
                    : !0
                  : "You should upload at least one img";
              },
            }),
          }),
          s.jsxs("button", {
            type: "button",
            onClick: (r) => {
              var l, i;
              (i =
                (l = r == null ? void 0 : r.currentTarget) == null
                  ? void 0
                  : l.previousElementSibling) == null || i.click();
            },
            className:
              "w-full flex items-center gap-3 group el__flow hover:scale-110 hover:text-orange-500 pl-5 pr-14 py-2 border-[3px] border-orange-500 rounded-xl cursor-pointer justify-self-start outline-none",
            children: [
              s.jsx(Fa, { className: "h-[35px] w-[35px]" }),
              s.jsx("span", { className: "txt__02", children: "Upload" }),
            ],
          }),
        ],
      }),
    });
  },
  di = ({ formContext: e }) => {
    var o;
    const {
        register: t,
        formState: { errors: a },
        watch: n,
        trigger: r,
        setValue: l,
      } = e,
      i = n("images");
    return s.jsxs("div", {
      className: "w-full flex flex-col gap-5",
      children: [
        s.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [
            s.jsx(tt, { className: "h-[35px] w-[35px]" }),
            "Restaurant images",
          ],
        }),
        s.jsx("div", {
          className: `w-full flex flex-row overflow-x-auto snap-x snap-mandatory gap-5 sm:gap-10 hide_scrollbar border-[3px] rounded-xl el__flow ${
            (o = n("images")) != null && o.length
              ? "max-h-[500px] p-5 sm:p-8 border-orange-500 "
              : "max-h-0 border-transparent"
          }`,
          children:
            !!(i != null && i.length) &&
            [...i].map((c, d) =>
              s.jsx(Dt, { img: i[d], trigger: r, images: i, setValue: l }, d)
            ),
        }),
        s.jsx(Tt, { register: t, watch: n }),
        (a == null ? void 0 : a.images) &&
          s.jsx("span", {
            className: "txt__01 text-red-600",
            children: a.images.message,
          }),
      ],
    });
  },
  ui = ({ formContext: e }) => {
    const {
        register: t,
        formState: { errors: a },
        watch: n,
        trigger: r,
      } = e,
      l = n("price");
    m.useEffect(() => {
      l && r("freeDeliveryPrice");
    }, [l, r]);
    const i = (c) => {
        const d = Ee(n("closeTime")) - Ee(n("openTime"));
        return d > 0 && d < +c
          ? "Delivery time can not take more than your business activity"
          : +c
          ? !0
          : "Delivery time can not be 0";
      },
      o = (c) =>
        !+n("price") && c
          ? "You can not set a free delivery without a delivery charge"
          : !0;
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-5",
      children: [
        s.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [s.jsx(Ve, { className: "w-[40px] h-[40px]" }), "Delivery"],
        }),
        s.jsx("div", {
          className:
            "w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-10 lg:grid-cols-3",
          children: Wr.map((c) =>
            s.jsx(
              se,
              {
                register: t,
                errors: a,
                field: c,
                customValidate:
                  c.field === "estTimeDelivery"
                    ? i
                    : c.field === "freeDeliveryPrice"
                    ? o
                    : void 0,
              },
              c.id
            )
          ),
        }),
      ],
    });
  },
  mi = ({ currForm: e, formContext: t }) => {
    const {
      register: a,
      formState: { errors: n },
    } = t;
    return s.jsx("div", {
      className: "overflow-hidden py-5",
      children: s.jsxs("div", {
        className:
          "w-[200%] flex transition-all duration-500 justify-items-start items-start h-fit lg:grid lg:grid-cols-2 lg:w-full lg:gap-10",
        style: {
          transform: `translateX(-${e * 50}%)`,
          maxHeight: e === 0 ? "600px" : "275px",
        },
        children: [
          s.jsx("div", {
            className:
              "w-full flex gap-y-5 flex-col max-h-fit px-2 sm:px-5 lg:p-0",
            children: bt.map((r) =>
              s.jsx(se, { register: a, errors: n, field: r }, r.id)
            ),
          }),
          s.jsx("div", {
            className:
              "w-full flex gap-y-5 flex-col max-h-fit px-2 sm:px-5 lg:p-0",
            children: vt.map((r) =>
              s.jsx(se, { register: a, errors: n, field: r }, r.id)
            ),
          }),
        ],
      }),
    });
  },
  pi = ({ watch: e }) => {
    const [t, a] = m.useState(0),
      [n, r] = m.useState(!1),
      i = Hr[t].map((x) => ({ val: e(x.field), reg: x.reg }));
    m.useEffect(() => {
      (() => {
        r(!1);
        for (const g of i) g.reg.test(g.val) || r(!0);
      })();
    }, [t, e, i]);
    const o = () => (t > 0 ? a((x) => x - 1) : void 0),
      c = () => (t < ts - 1 ? a((x) => x + 1) : void 0),
      d = t === 0,
      u = n || t === ts - 1;
    return {
      currForm: t,
      buttonsProps: {
        handlePrev: o,
        handleNext: c,
        isPrevDisabled: d,
        isNextDisabled: u,
      },
    };
  },
  xi = ({ formContext: e }) => {
    const { buttonsProps: t, currForm: a } = pi({ watch: e.watch });
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-5",
      children: [
        s.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [
            s.jsx(Qs, { className: "w-[35px] h-[35px]" }),
            "Restaurant Address",
          ],
        }),
        s.jsxs("div", {
          className:
            "w-full grid grid-cols-1 border-[3px] rounded-xl border-orange-500 lg:border-0 lg:p-0 p-5 pb-10 gap-y-8",
          children: [
            s.jsx(mi, { currForm: a, formContext: e }),
            s.jsx(ze, { ...t, currForm: a, totLen: ts, hiddenLg: !0 }),
          ],
        }),
      ],
    });
  },
  Ft = ({ formContext: e, handleSave: t, isPending: a }) => {
    const n = T();
    return s.jsxs("form", {
      onSubmit: t,
      className: "w-full grid grid-cols-1 justify-items-center gap-y-10",
      children: [
        s.jsx(ci, { formContext: e }),
        s.jsx(di, { formContext: e }),
        s.jsx(xi, { formContext: e }),
        s.jsx(ai, { formContext: e }),
        s.jsx(ni, { formContext: e }),
        s.jsx(ii, { formContext: e }),
        s.jsx(ui, { formContext: e }),
        s.jsx("div", {
          className: "w-[250px] sm:w-[325px] justify-center mt-10",
          children: s.jsx(G, {
            label: `${
              n.pathname.includes("update") ? "Update" : "Create"
            } Restaurant`,
            type: "submit",
            styleTxt: "txt__02",
            isPending: a,
          }),
        }),
      ],
    });
  },
  gi = () => {
    L();
    const { formContext: e, handleSave: t, isPending: a } = ti();
    return s.jsx(de, {
      ...e,
      children: s.jsxs("div", {
        className: "w-full grid grid-cols-1 justify-items-center gap-y-5",
        children: [
          s.jsx("span", {
            className: "txt__04",
            children: "Create new restaurant",
          }),
          s.jsx(Ft, { formContext: e, handleSave: t, isPending: a }),
        ],
      }),
    });
  },
  kt = ({ txt: e, label: t }) => {
    const a = m.useRef(null),
      n = m.useRef(null);
    m.useEffect(() => {
      const l = (i) => {
        const o = a.current,
          c = n.current;
        o &&
          c &&
          o != null &&
          o.contains(i.target) &&
          (c == null || c.classList.remove("generate_password__tooltip"),
          requestAnimationFrame(() =>
            c == null ? void 0 : c.classList.add("generate_password__tooltip")
          ));
      };
      return (
        document.addEventListener("click", l),
        () => document.removeEventListener("click", l)
      );
    }, [e]);
    const r = () => {
      a.current && navigator.clipboard.writeText(a.current.innerText);
    };
    return s.jsxs("div", {
      className: "relative group flex items-center",
      children: [
        s.jsx("button", {
          type: "button",
          ref: a,
          onClick: r,
          className:
            "el__flow cursor-pointer hover:text-orange-500 outline-none",
          children: s.jsx("span", {
            className:
              "txt__01 block overflow-x-auto sm:max-w-[200px] hide_scrollbar",
            children: e,
          }),
        }),
        s.jsxs("span", {
          ref: n,
          className:
            "absolute lg:text-lg px-4 py-1 -top-full left-1/4 border-2 border-orange-500 rounded-xl w-full whitespace-nowrap bg-[#111] pointer-events-none z-20 txt__00 max-w-fit px-6 min-w-[150px] opacity-0",
          children: [t, " copied ✌🏼"],
        }),
      ],
    });
  },
  Lt = ({ id: e }) =>
    s.jsxs("div", {
      className:
        "border-b-2 border-orange-500 w-full grid grid-cols-[75px_1fr] max-w-full",
      children: [
        s.jsxs("div", {
          className: "w-full flex gap-2 items-center px-3 py-2",
          children: [
            s.jsx(ka, { className: "text-orange-500 icon__base -ml-2" }),
            s.jsx("span", { className: "txt__02", children: "ID:" }),
          ],
        }),
        s.jsx("div", {
          className: "w-full max-w-full flex items-center",
          children: s.jsx(kt, { txt: e, label: "Id" }),
        }),
      ],
    }),
  B = ({
    isOpen: e,
    setIsOpen: t,
    txt: a,
    Icon: n,
    closeAllDrop: r,
    customStyle: l,
    customIconStyle: i,
  }) => (
    m.useEffect(() => {
      r && t(!1);
    }, [r, t]),
    s.jsxs("div", {
      onClick: () => t(!e),
      className: `w-full grid grid-cols-[1fr_65px] items-center group cursor-pointer ${
        l ?? ""
      }`,
      children: [
        s.jsxs("div", {
          className: "w-fit flex gap-5 items-center",
          children: [
            s.jsx(n, {
              className: `${
                i ?? "icon__base"
              } group-hover:text-orange-500 el__flow`,
            }),
            s.jsx("span", {
              className: "txt__02 group-hover:text-orange-500 el__flow",
              children: a,
            }),
          ],
        }),
        s.jsx(La, {
          className: `w-[35px] h-[35px] justify-self-end group-hover:text-orange-500 el__flow ${
            e ? "rotate-180" : ""
          }`,
        }),
      ],
    })
  ),
  Ge = ({ el: e, children: t }) => {
    var r;
    const [a, n] = m.useState(!1);
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 el__flow relative",
      children: [
        s.jsx(B, {
          isOpen: a,
          setIsOpen: n,
          txt: e.label,
          Icon: e.icon,
          customStyle: "px-3",
          customIconStyle: "min-w-[25px] min-h-[25px]",
        }),
        s.jsx("ul", {
          className: `w-[80%] px-3 right-0 max-h-fit grid py-1 border-2 border-orange-500 rounded-xl bg-[#111] transition-all duration-500 absolute ${
            ["Categories", "Open Hours"].includes(e.label)
              ? "grid-cols-2"
              : " grid-cols-1 gap-1"
          } ${
            a
              ? "opacity-100 -translate-y-full pointer-events-auto z-60"
              : "translate-y-full opacity-0 pointer-events-none"
          }`,
          children:
            t ??
            ((r = e == null ? void 0 : e.vals) == null
              ? void 0
              : r.map((l, i) =>
                  s.jsx(
                    "li",
                    {
                      className: "el__flow hide_scrollbar overflow-x-auto",
                      children: s.jsx("span", {
                        className: "txt__01",
                        children: l,
                      }),
                    },
                    i
                  )
                )),
        }),
      ],
    });
  },
  Le = ({ el: e, children: t }) => {
    var l;
    const [a, n] = m.useState(!1),
      r = T();
    return (
      m.useEffect(() => {
        const i = () =>
          /^\/(my-restaurants)\/[a-f0-9]{24}/.test(r.pathname) &&
          window.innerWidth > xe.sm
            ? n(!0)
            : n(!1);
        return (
          i(),
          window.addEventListener("resize", i),
          () => window.removeEventListener("resize", i)
        );
      }, [r.pathname]),
      s.jsxs("div", {
        className: "w-full grid grid-cols-1 items-start",
        children: [
          s.jsx(B, {
            isOpen: a,
            setIsOpen: n,
            txt: e.label,
            Icon: e.icon,
            customStyle: "py-1 border-b-2 border-orange-500 px-3",
          }),
          s.jsx("ul", {
            className: `w-full el__flow grid gap-1 gap-2 items-start px-3 ${
              a
                ? "opacity-100 max-h-[500px] pointer-events-auto pt-2"
                : "opacity-0 max-h-0 pointer-events-none"
            } ${
              ["Categories", "Open Hours"].includes(e.label)
                ? "grid-cols-2"
                : "grid-cols-1"
            }`,
            children:
              t ||
              ((l = e == null ? void 0 : e.vals) != null && l.length
                ? e == null
                  ? void 0
                  : e.vals.map((i, o) =>
                      s.jsx(
                        "li",
                        {
                          className: "el__flow hide_scrollbar overflow-x-auto",
                          children: s.jsx("span", {
                            className: "txt__01",
                            children: i,
                          }),
                        },
                        o
                      )
                    )
                : null),
          }),
        ],
      })
    );
  },
  Ut = ({ rest: e }) =>
    s.jsxs(s.Fragment, {
      children: [
        s.jsxs(Le, {
          el: wr,
          children: [
            jr(...e.ordersByStatus).map((t) =>
              s.jsxs(
                "li",
                {
                  className: "w-full grid grid-cols-[1fr_50px] items-center",
                  children: [
                    s.jsx("span", { className: "txt__01", children: t.label }),
                    s.jsx("span", {
                      className: "txt__02 justify-self-end",
                      children: t.val,
                    }),
                  ],
                },
                t.id
              )
            ),
            s.jsxs("li", {
              className: "w-full grid grid-cols-[1fr_50px] items-center",
              children: [
                s.jsx("span", {
                  className: "txt__01",
                  children: "Orders count",
                }),
                s.jsx("span", {
                  className: "txt__02 justify-self-end",
                  children: e.ordersCount,
                }),
              ],
            }),
          ],
        }),
        s.jsxs(Le, {
          el: _r,
          children: [
            br(...e.reviewsByRating).map((t) =>
              s.jsxs(
                "li",
                {
                  className: "w-full grid grid-cols-[1fr_50px] items-center",
                  children: [
                    s.jsx("div", {
                      className: "w-full flex gap-2",
                      children: t.stars.map((a, n) => s.jsx(a, {}, n)),
                    }),
                    s.jsx("span", {
                      className: "txt__02 justify-self-end",
                      children: t.val,
                    }),
                  ],
                },
                t.id
              )
            ),
            Sr(e.avgRating, e.reviewsCount).map((t) =>
              s.jsxs(
                "li",
                {
                  className: "w-full grid grid-cols-[1fr_50px] items-center",
                  children: [
                    s.jsx("span", { className: "txt__01", children: t.label }),
                    s.jsx("span", {
                      className: "txt__02 justify-self-end",
                      children: t.field,
                    }),
                  ],
                },
                t.id
              )
            ),
          ],
        }),
        s.jsx(Le, {
          el: vr,
          children: Nr(e.avgPrice, e.avgQuantity, e.dishesCount).map((t, a) =>
            s.jsxs(
              "li",
              {
                className: "w-full grid grid-cols-[1fr_50px] items-center",
                children: [
                  s.jsx("span", { className: "txt__01", children: t.label }),
                  s.jsx("span", {
                    className: "txt__02 justify-self-end",
                    children: t.field,
                  }),
                ],
              },
              a
            )
          ),
        }),
      ],
    }),
  Ye = ({ rest: e, Container: t }) =>
    s.jsxs(s.Fragment, {
      children: [
        xr(
          Object.values(e.address),
          Object.values(e.contact),
          e.categories
        ).map((a, n) => s.jsx(t, { el: a }, n)),
        s.jsx(t, {
          el: gr,
          children: hr(...Object.values(e.openHours)).map((a, n) =>
            s.jsxs(
              "li",
              {
                className:
                  "el__flow overflow-x-auto hide_scrollbar pointer-events-none cursor-pointer flex items-center gap-3",
                children: [
                  s.jsx(a.icon, { className: "w-[25px] h-[25px]" }),
                  s.jsx("span", { className: "txt__01", children: a.val }),
                ],
              },
              n
            )
          ),
        }),
        s.jsx(t, {
          el: fr,
          children: yr(...Object.values(e.delivery)).map((a, n) =>
            a.label === "Free meal" && !a.val
              ? null
              : s.jsxs(
                  "li",
                  {
                    className:
                      "el__flow cursor-pointer grid grid-cols-[120px_1fr]",
                    children: [
                      s.jsx("span", {
                        className: "txt__01",
                        children: a.label,
                      }),
                      s.jsx("span", {
                        className:
                          "txt__01 justify-self-end max-w-full overflow-x-auto text-nowrap hide_scrollbar ",
                        children:
                          a.label !== "Time"
                            ? W({ price: a.val, showStr: !0 })
                            : `${a.val} minute${a.val > 1 ? "s" : ""}`,
                      }),
                    ],
                  },
                  n
                )
          ),
        }),
      ],
    }),
  Is = ({ images: e }) =>
    s.jsx("div", {
      className: "w-full flex justify-center",
      children: s.jsx("div", {
        className:
          "w-full overflow-x-auto hide_scrollbar snap-x snap-mandatory flex gap-4 p-4",
        children: e.map((t) =>
          s.jsx(
            "div",
            {
              className:
                "min-w-[200px] h-[200px] flex justify-center items-center border-2 border-orange-500 overflow-hidden rounded-xl",
              children: s.jsx("img", {
                src: t.url,
                alt: "🧐",
                className: "w-full h-full object-cover snap-center",
              }),
            },
            t.public_id
          )
        ),
      }),
    }),
  Rs = ({ name: e }) =>
    s.jsx("div", {
      className: "w-full flex justify-start h-[50px] bg-black/90 items-center ",
      children: s.jsx("span", {
        className: "txt__03 px-3 overflow-x-auto hide_scrollbar",
        children: e,
      }),
    }),
  Vt = ({ images: e, name: t }) =>
    s.jsxs(s.Fragment, {
      children: [s.jsx(Rs, { name: t }), s.jsx(Is, { images: e })],
    }),
  hi = ({ rest: e }) => {
    const [t, a] = m.useState(!1);
    return s.jsxs("div", {
      className: "card__el_grid border-orange-500",
      children: [
        s.jsxs("div", {
          className: "w-full flex flex-col",
          children: [
            s.jsx(Lt, { id: e._id }),
            s.jsx(Vt, { images: e.images, name: e.name }),
            s.jsxs("div", {
              className: "w-full grid grid-cols-1",
              children: [
                s.jsx(B, {
                  isOpen: t,
                  setIsOpen: a,
                  txt: "Details",
                  Icon: ps,
                  customStyle: "px-3 border-b-2 border-orange-500 py-1",
                }),
                s.jsx("div", {
                  className: `w-full el__flow grid grid-cols-1 gap-3 ${
                    t
                      ? "opacity-100 max-h-[500px] pointer-events-auto pt-3"
                      : "opacity-0 max-h-0 pointer-events-none"
                  }`,
                  children: s.jsx(Ye, { rest: e, Container: Ge }),
                }),
                s.jsx(Ut, { rest: e }),
              ],
            }),
          ],
        }),
        s.jsx("div", {
          className:
            "w-full max-w-fit justify-center justify-self-center flex mt-5",
          children: s.jsx(H, {
            to: `/my-restaurants/${e._id}`,
            className:
              "txt__02 border-2 border-orange-500 rounded-xl px-12 py-1 el__flow hover:text-orange-500 hover:scale-110 cursor-pointer",
            children: "View Details",
          }),
        }),
      ],
    });
  },
  $t = [
    { field: "name", label: "Name" },
    { field: "id", label: "Id" },
    { field: "restaurantName", label: "Restaurant name" },
    { field: "restaurantId", label: "Restaurant id" },
  ].map((e) => ({ ...e, id: y() })),
  As = [
    {
      field: "minPrice",
      label: "Min price",
      reg: _e,
      msg: "Price must be a number with up to 2 decimal places",
    },
    {
      field: "maxPrice",
      label: "Max price",
      reg: _e,
      msg: "Price must be a number with up to 2 decimal places",
    },
    {
      field: "minQuantity",
      label: "Min quantity",
      reg: es,
      msg: "Quantity must be a prime number without decimals",
    },
    {
      field: "maxQuantity",
      label: "Max quantity",
      reg: es,
      msg: "Quantity must be a prime number without decimals",
    },
  ].map((e) => ({ ...e, id: y(), required: !1, type: "number" })),
  Mt = [
    {
      id: y(),
      field: "categories",
      label: "Category",
      subFields: [...pe],
      icon: us,
    },
  ],
  Ds = [
    { field: "createdAtSort", label: "Created at", icon: Ws },
    { field: "updatedAtSort", label: "Updated at", icon: Xs },
    { field: "priceSort", label: "Price", icon: ms },
    { field: "quantitySort", label: "Quantity", icon: q },
  ].map((e) => ({
    ...e,
    id: y(),
    subFields: [...Qe.map((t) => ({ ...t, id: y() }))],
  }));
[
  ...As.map((e) => e.field),
  ...Mt.map((e) => e.field),
  ...Ds.map((e) => e.field),
];
const fi = {
    search: "",
    searchVals: ["name"],
    categories: [],
    minPrice: "",
    maxPrice: "",
    minQuantity: "",
    maxQuantity: "",
    priceSort: [],
    quantitySort: [],
    createdAtSort: [],
    updatedAtSort: [],
    page: "1",
  },
  yi = ["name", "country", "state", "city"],
  Ot = yi.map((e) => ({
    field: e,
    id: y(),
    label: e[0].toUpperCase() + e.slice(1),
  })),
  ji = [
    {
      field: "avgRatingRange",
      label: "Avg rating",
      subFields: [..._t],
      icon: Re,
    },
    { field: "categories", label: "Category", subFields: [...pe], icon: us },
    {
      field: "avgPriceRange",
      label: "Avg price dish",
      subFields: [...wt],
      icon: at,
    },
  ].map((e) => ({ ...e, id: y() })),
  wi = [
    { field: "avgRatingSort", label: "Avg rating", icon: Re },
    { field: "avgPriceSort", label: "Avg price dish", icon: Ua },
    { field: "deliveryTimeSort", label: "Delivery time", icon: Ve },
    { field: "deliveryPriceSort", label: "Delivery price", icon: Ve },
    { field: "dishesCountSort", label: "No. of dishes", icon: ds },
  ].map((e) => ({
    ...e,
    id: y(),
    subFields: [...Qe.map((t) => ({ ...t, id: y() }))],
  })),
  _i = {
    searchVals: ["name"],
    categories: [],
    avgPriceRange: [],
    avgRatingRange: [],
    avgRatingSort: [],
    avgPriceSort: [],
    dishesCountSort: [],
    deliveryTimeSort: [],
    deliveryPriceSort: [],
    items: [{ searchVal: "name", search: "" }],
    page: "1",
  };
As.map((e) => ({ ...e, id: y() }));
const bi = Ds.filter((e) =>
    ["createdAtSort", "updatedAtSort", "priceSort", "quantitySort"].includes(
      e.field
    )
  )
    .map((e) => ({
      ...e,
      id: y(),
      subFields: [...Qe.map((t) => ({ ...t, id: y() }))],
    }))
    .reverse()
    .sort((e, t) => (e.field === "priceSort" ? -1 : 0)),
  vi = {
    minPrice: "",
    maxPrice: "",
    minQuantity: "",
    maxQuantity: "",
    priceSort: [],
    createdAtSort: [],
    updateAtSort: [],
  },
  Ni = {
    id: y(),
    field: "coupon",
    label: "Coupon",
    msg: "Invalid code coupon",
    reg: /^\d{1}$/,
    place: "Coupon code...",
    required: !1,
  },
  Si = (...e) =>
    [
      { label: "Price", val: W({ price: e[0] }), icon: nt },
      { label: "Avl quantity", val: e[1], icon: q },
    ].map((t) => ({ ...t, id: y() })),
  qt = (e) => {
    let t = "",
      a = [];
    return (
      Pe.test(e) && ((t = "restaurant"), (a = Ot)),
      js.test(e) && ((t = "restaurant"), (a = St)),
      ys.test(e) && ((t = "dish"), (a = $t)),
      { target: t, arrToCheck: a }
    );
  },
  Bt = ({ searchVals: e, customFilter: t }) => {
    var c, d, u;
    const [a, n] = m.useState(""),
      r = T().pathname,
      { target: l, arrToCheck: i } = qt(r),
      o = t
        ? t(i)
        : (u =
            (d =
              (c = i.filter((x) => x.field === e)) == null ? void 0 : c[0]) ==
            null
              ? void 0
              : d.label) == null
        ? void 0
        : u.toLowerCase();
    return (
      m.useEffect(() => {
        const x = () => {
          window.innerWidth > xe.sm
            ? n(`Search a ${l}${o ? ` by ${o}` : ""}...`)
            : n(`${o[0].toUpperCase() + o.slice(1)}...`);
        };
        return (
          x(),
          window.addEventListener("resize", x),
          () => window.removeEventListener("resize", x)
        );
      }, [l, o]),
      { place: a }
    );
  },
  Ci = ({ formContext: e }) => {
    var o, c;
    const {
        register: t,
        formState: { errors: a },
        watch: n,
        trigger: r,
      } = e,
      l = (o = n("searchVals")) == null ? void 0 : o[0],
      { place: i } = Bt({ searchVals: l });
    return (
      m.useEffect(() => {
        var d;
        (d = a == null ? void 0 : a.search) != null &&
          d.message &&
          !["id", "restaurantId"].includes(l) &&
          r("search");
      }, [r, l, a]),
      s.jsxs("div", {
        className: "w-full flex flex-col gap-3",
        children: [
          s.jsxs("label", {
            className:
              "w-full grid grid-cols-1 justify-items-start gap-2 relative",
            children: [
              s.jsx("input", {
                type: "text",
                placeholder: i,
                className:
                  "focus__base el__flow outline-none border-2 border-orange-500 rounded-full w-full px-5 pr-14 py-2 txt__01",
                ...t("search", {
                  pattern: {
                    value: Oe,
                    message: "Invalid search length or chars 🥸",
                  },
                  validate: (d) =>
                    ["restaurantId", "id"].includes(l) && !J.test(d)
                      ? "Invalid Mongo ID"
                      : !0,
                }),
              }),
              s.jsx(rt, {
                className:
                  "absolute top-1/2 -translate-y-1/2 right-[20px] w-[25px] h-[25px] text-orange-500 pointer-events-none",
              }),
            ],
          }),
          (a == null ? void 0 : a.search) &&
            s.jsx("span", {
              className: "txt__01 text-red-600",
              children:
                (c = a == null ? void 0 : a.search) == null
                  ? void 0
                  : c.message,
            }),
        ],
      })
    );
  },
  Qt = ({ formContext: e, field: t, closeAllDrop: a }) => {
    const [n, r] = m.useState(!1),
      { register: l, watch: i } = e;
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1",
      children: [
        s.jsx(B, {
          isOpen: n,
          setIsOpen: r,
          txt: t.label,
          Icon: t.icon,
          closeAllDrop: a,
        }),
        s.jsx("div", {
          className: `w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-all duration-300 ${
            n
              ? "max-h-[700px] opacity-100 pointer-events-auto py-3"
              : "opacity-0 max-h-0 pointer-events-none"
          }`,
          children: t.subFields.map((o) =>
            s.jsx(
              At,
              {
                register: l,
                field: o,
                valsChosen: i(t.field),
                currCategory: t.field,
              },
              o.id
            )
          ),
        }),
      ],
    });
  },
  zt = ({ register: e, el: t, watch: a, handleChange: n }) => {
    const r = a("searchVals"),
      l = Array.isArray(r) ? r : [];
    return s.jsxs("div", {
      className: "w-full grid grid-cols-2 items-center px-2",
      children: [
        s.jsx("span", { className: "txt__01", children: t.label }),
        s.jsxs("label", {
          className:
            "w-[100px] h-[40px] rounded-full check_swap__label justify-self-center relative cursor-pointer",
          children: [
            s.jsx("input", {
              value: t.field,
              type: "checkbox",
              className: "opacity-0",
              ...e("searchVals"),
              onChange: () => n && n(t.field),
            }),
            s.jsx("span", {
              className: `absolute w-[40px] h-[40px] top-0 left-0 rounded-full check_swap__swap scale-90 transition-all duration-500 ${
                l.includes(t.field) ? "translate-x-[60px]" : "translate-x-0"
              }`,
              style: {
                "--color-swap": l.includes(t.field) ? "#16A34A" : "#DC2626",
              },
            }),
          ],
        }),
      ],
    });
  },
  Pi = ({ searchFields: e, formContext: t, closeAllDrop: a }) => {
    const [n, r] = m.useState(!1),
      { register: l, watch: i, setValue: o, setError: c } = t,
      d = (u) => {
        (i("searchVals") || []).includes(u)
          ? o("searchVals", [], { shouldValidate: !0 })
          : o("searchVals", [u], { shouldValidate: !0 }),
          ["id", "restaurantId"].includes(u) &&
            !J.test(i("search")) &&
            c("search", { message: "Invalid Mongo ID" });
      };
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1",
      children: [
        s.jsx(B, {
          isOpen: n,
          setIsOpen: r,
          txt: "Text",
          Icon: lt,
          closeAllDrop: a,
        }),
        s.jsx("div", {
          className: `w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 transition-all duration-300 ${
            n
              ? "max-h-[700px] opacity-100 pointer-events-auto py-2"
              : "opacity-0 max-h-0 pointer-events-none"
          }`,
          children:
            !!(e != null && e.length) &&
            e.map((u) =>
              s.jsx(zt, { register: l, el: u, watch: i, handleChange: d }, u.id)
            ),
        }),
      ],
    });
  },
  Gt = ({ formContext: e, closeAllDrop: t }) => {
    const {
        register: a,
        formState: { errors: n },
        watch: r,
        trigger: l,
      } = e,
      [i, o] = m.useState(!1),
      c = r("minPrice"),
      d = r("maxPrice");
    m.useEffect(() => {
      (+c <= +d || !d) && (l("minPrice"), l("maxPrice"));
    }, [l, c, d]);
    const u = (j) =>
        d && +d < +j
          ? "With max price fewer than min one you will get no results"
          : !0,
      x = (j) =>
        j && c > +j
          ? "With min price greater than max one you will get no results"
          : !0,
      g = r("minQuantity"),
      h = r("maxQuantity");
    m.useEffect(() => {
      (+g <= +h || !h) && (l("minQuantity"), l("maxQuantity"));
    }, [l, g, h]);
    const f = (j) =>
        h && +h < +j
          ? "With max quantity fewer than min one you will get no results"
          : !0,
      p = (j) =>
        j && g > +j
          ? "With min quantity greater than max one you will get no results"
          : !0;
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1",
      children: [
        s.jsx(B, {
          isOpen: i,
          setIsOpen: o,
          txt: "Stats",
          Icon: Va,
          closeAllDrop: t,
        }),
        s.jsx("div", {
          className: `w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-all duration-300 ${
            i
              ? "max-h-[7000px] opacity-100 pointer-events-auto py-2"
              : "opacity-0 max-h-0 pointer-events-none"
          }`,
          children: As.map((j) =>
            s.jsx(
              se,
              {
                field: j,
                register: a,
                errors: n,
                customValidate:
                  j.field === "minPrice"
                    ? u
                    : j.field === "maxPrice"
                    ? x
                    : j.field === "minQuantity"
                    ? f
                    : j.field === "maxQuantity"
                    ? p
                    : void 0,
              },
              j.id
            )
          ),
        }),
      ],
    });
  },
  Ei = ({ searchFields: e, formContext: t, filters: a, closeAllDrop: n }) => {
    const [r, l] = m.useState(!1),
      i = T();
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-3 mt-5",
      children: [
        s.jsx(B, {
          txt: "Filter by",
          Icon: it,
          isOpen: r,
          setIsOpen: l,
          customStyle: "pb-1 border-b-[3px] border-orange-500",
          closeAllDrop: n,
        }),
        s.jsxs("div", {
          className: `w-full grid grid-cols-1 pb-3 transition-all duration-300 gap-2 ${
            r
              ? "max-h-[2000px] opacity-100 pointer-events-auto"
              : "opacity-0 max-h-0 pointer-events-none -z-10"
          }`,
          children: [
            !!(e != null && e.length) &&
              s.jsx(Pi, { formContext: t, searchFields: e, closeAllDrop: n }),
            (/^\/(my-dishes).*/.test(i.pathname) || ie.test(i.pathname)) &&
              s.jsx(Gt, { formContext: t, closeAllDrop: n }),
            !!(a != null && a.length) &&
              a.map((o) =>
                s.jsx(Qt, { field: o, formContext: t, closeAllDrop: n }, o.id)
              ),
          ],
        }),
      ],
    });
  },
  Ii = ({
    el: e,
    currSorter: t,
    register: a,
    currVals: n,
    handleChange: r,
    customStyle: l,
  }) =>
    s.jsxs(
      "label",
      {
        className: `w-full max-w-[65px] py-3 px-8 pr-10 border-2 rounded-xl cursor-pointer group flex justify-center items-center el__flow relative justify-self-center ${
          (n || []).includes(e.field)
            ? "border-orange-500 scale-110"
            : "border-[#333] scale-100"
        } ${l ?? ""}`,
        children: [
          s.jsx("input", {
            value: e.field,
            type: "checkbox",
            className:
              "opacity-0 absolute inset-0 w-full h-full cursor-pointer",
            ...a(`${t}`),
            onChange: () => r(e.field),
          }),
          s.jsx(e.icon, {
            className: `icon__base el__flow pointer-events-none ${
              (n || []).includes(e.field) ? "text-orange-500" : ""
            }`,
          }),
        ],
      },
      e.id
    ),
  Ri = ({ formContext: e, sorter: t, closeAllDrop: a }) => {
    const { register: n, watch: r, setValue: l } = e,
      [i, o] = m.useState(!1),
      c = (d) =>
        l(
          t.field,
          (r(t.field) || []).includes(d)
            ? r(t.field).filter((u) => u !== d)
            : [d],
          { shouldValidate: !0 }
        );
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-y-3",
      children: [
        s.jsx(B, {
          isOpen: i,
          setIsOpen: o,
          txt: t.label,
          Icon: t.icon,
          closeAllDrop: a,
        }),
        s.jsx("div", {
          className: `w-full grid grid-cols-2 el__flow ${
            i
              ? "max-h-[700px] opacity-100 pointer-events-auto py-2"
              : "opacity-0 max-h-0 pointer-events-none"
          }`,
          children: t.subFields.map((d, u) =>
            s.jsx(
              Ii,
              {
                el: d,
                register: n,
                currSorter: t.field,
                currVals: r(t.field),
                handleChange: c,
                customStyle: "",
              },
              d.id
            )
          ),
        }),
      ],
    });
  },
  Yt = ({ formContext: e, sorters: t, closeAllDrop: a }) => {
    const [n, r] = m.useState(!1);
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-3",
      children: [
        s.jsx(B, {
          txt: "Sort by",
          Icon: $a,
          isOpen: n,
          setIsOpen: r,
          closeAllDrop: a,
          customStyle: "pb-1 border-b-[3px] border-orange-500",
        }),
        s.jsx("div", {
          className: `w-full items-start grid sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] transition-all duration-300 gap-4 ${
            n
              ? "max-h-[2000px] opacity-100 pointer-events-auto"
              : "opacity-0 max-h-0 pointer-events-none"
          }`,
          children:
            !!(t != null && t.length) &&
            t.map((l) =>
              s.jsx(Ri, { formContext: e, sorter: l, closeAllDrop: a }, l.id)
            ),
        }),
      ],
    });
  },
  Ts = ({
    searchFields: e,
    formContext: t,
    sorters: a,
    filters: n,
    handleSave: r,
    handleClear: l,
    isPending: i,
    closeAllDrop: o,
  }) => {
    const c = T().pathname,
      d = !ie.test(c);
    return t
      ? s.jsxs("form", {
          className: `w-full max-w-[90%] border-[3px] border-orange-500 rounded-xl p-6 ${
            d ? "" : "pt-0"
          }`,
          children: [
            s.jsxs("div", {
              className: "w-full grid grid-cols-1",
              children: [
                d && s.jsx(Ci, { formContext: t }),
                s.jsx(Ei, {
                  formContext: t,
                  searchFields: e,
                  filters: n,
                  closeAllDrop: o,
                }),
                s.jsx(Yt, { formContext: t, sorters: a, closeAllDrop: o }),
              ],
            }),
            s.jsxs("div", {
              className: "w-full grid grid-cols-2 mt-5",
              children: [
                s.jsx("div", {
                  className:
                    "sm:w-full justify-self-start w-[30vw] sm:max-w-[200px] sm:justify-self-center",
                  children: s.jsx(K, {
                    type: "submit",
                    label: "Search",
                    styleBtn: "text-green-600",
                    styleTxt: "text-green-600 txt__02",
                    handleClick: r,
                    isPending: i,
                  }),
                }),
                s.jsx("div", {
                  className:
                    "sm:w-full justify-self-end w-[30vw] sm:max-w-[200px] sm:justify-self-center",
                  children: s.jsx(K, {
                    type: "button",
                    label: "Clear",
                    styleBtn: "text-red-600",
                    styleTxt: "text-red-600 txt__02",
                    handleClick: l,
                    isDisabled: i,
                  }),
                }),
              ],
            }),
          ],
        })
      : null;
  },
  Ai = ({ totPages: e }) => {
    const [t, a] = m.useState(3),
      [n, r] = m.useState(1),
      l = m.useRef(null);
    m.useEffect(() => {
      const p = () =>
        a(
          window.innerWidth > xe._2xl
            ? 12
            : window.innerWidth > xe.lg
            ? 10
            : window.innerWidth > xe.md
            ? 8
            : window.innerWidth > xe.sm
            ? 5
            : 3
        );
      return (
        p(),
        window.addEventListener("resize", p),
        () => window.removeEventListener("resize", p)
      );
    }, []);
    const i = Math.min(t, e - (n - 1) * t),
      o = n === 1,
      c = n * t >= e,
      d = Array.from({ length: i }, (p, j) => j + 1 + (n - 1) * t),
      u = () => (c ? null : r(n + 1)),
      x = () => (o ? null : r(n - 1)),
      g = () => {
        l.current ||
          (l.current = setInterval(() => {
            r((p) => (p === 1 ? (f(), p) : p - 1));
          }, 150));
      },
      h = () => {
        l.current ||
          (l.current = setInterval(() => {
            r((p) => (p * t >= e ? (f(), p) : p + 1));
          }, 150));
      },
      f = () => {
        l.current && (clearInterval(l.current), (l.current = null));
      };
    return (
      m.useEffect(() => () => f(), []),
      {
        handleNext: u,
        handlePrev: x,
        isPrevDisabled: o,
        isNextDisabled: c,
        arrToMakeBtns: d,
        handlePrevInterval: g,
        handleNextInterval: h,
        clearIntervalHandler: f,
        blockSize: t,
        currBlock: n,
      }
    );
  },
  He = ({ totPages: e = 0, currPage: t, setCurrPage: a }) => {
    const {
      handleNext: n,
      handlePrev: r,
      arrToMakeBtns: l,
      isPrevDisabled: i,
      isNextDisabled: o,
      handlePrevInterval: c,
      handleNextInterval: d,
      clearIntervalHandler: u,
      blockSize: x,
      currBlock: g,
    } = Ai({ totPages: e });
    return (
      !!e &&
      s.jsx("div", {
        className: "w-[95%] flex flex-col items-center absolute bottom-10",
        children: s.jsxs("div", {
          className: "w-full grid grid-cols-[50px_1fr_50px] items-center",
          children: [
            g > 1
              ? s.jsx("button", {
                  disabled: i,
                  onClick: r,
                  onMouseDown: c,
                  onMouseUp: u,
                  className:
                    "w-full flex items-center justify-center btn__brand",
                  children: s.jsx(Ma, { className: "h-[50px] w-[50px] " }),
                })
              : s.jsx("div", { className: "" }),
            s.jsx("div", {
              className: "max-w-full flex items-center justify-around",
              children: l.map((h) =>
                s.jsx(
                  "button",
                  {
                    onClick: () => a(h),
                    className: `${
                      t === h
                        ? "text-orange-500 border-orange-500 scale-120"
                        : "text-white"
                    } btn__brand txt__02 border-2 rounded-xl px-4 py-1`,
                    children: h,
                  },
                  h
                )
              ),
            }),
            g < Math.ceil(e / x) &&
              s.jsx("button", {
                disabled: o,
                onClick: n,
                onMouseDown: d,
                onMouseUp: u,
                className: "w-full flex items-center justify-center btn__brand",
                children: s.jsx(Oa, { className: "h-[50px] w-[50px] " }),
              }),
          ],
        }),
      })
    );
  },
  Fs = ({ nHits: e, totDocuments: t, search: a, searchVal: n }) => {
    var d;
    const r = T().pathname,
      l = ys.test(r)
        ? "dishes"
        : [js, Pe].some((u) => u.test(r))
        ? "restaurants"
        : ie.test(r)
        ? "dishes"
        : null,
      { arrToCheck: i } = qt(r),
      o =
        (d = i == null ? void 0 : i.filter((u) => u.field === n)) == null
          ? void 0
          : d[0];
    let c;
    return (
      a &&
        (["country", "state", "city"].includes(o == null ? void 0 : o.field) &&
          (c = ` in ${a}`),
        ["name", "id", "restaurantName", "restaurantId"].includes(
          o == null ? void 0 : o.field
        ) && (c = ` for ${a}`)),
      s.jsx("div", {
        className: "w-full grid grid-cols-1",
        children: t
          ? e
            ? s.jsxs("div", {
                className: "w-full flex gap-5 items-center mt-[25px]",
                children: [
                  s.jsx(ct, { className: "min-w-[35px] min-h-[35px]" }),
                  s.jsxs("div", {
                    className: "w-fit flex gap-2 items-center",
                    children: [
                      s.jsxs("span", {
                        className: "txt__04",
                        children: [e, " "],
                      }),
                      s.jsxs("span", {
                        className: "txt__03",
                        children: ["Result", e > 1 ? "s" : "", c],
                      }),
                    ],
                  }),
                ],
              })
            : s.jsx("div", {
                className:
                  "w-full flex justify-self-center justify-center items-center mt-[50px]",
                children: s.jsxs("span", {
                  className: "txt__03",
                  children: ["Results Number(new String()) 🥸", c],
                }),
              })
          : s.jsx("div", {
              className:
                "w-full flex justify-self-center justify-center mt-[50px]",
              children: s.jsx("span", {
                className: "txt__03",
                children: Pe.test(r)
                  ? "Good news, there are not restaurants available so you could be the first that could create one ✌🏼"
                  : ie.test(r)
                  ? "This restaurant does not have dishes right now, they are strategically preparing 🧐"
                  : `You have Number(Array().fill()+Array().fill()) ${l} 🥸`,
              }),
            }),
      })
    );
  },
  ne = ({ err: e }) => {
    var t, a;
    return s.jsx("div", {
      className: "w-full flex flex-col h-[30vh] justify-center items-center",
      children: s.jsxs("div", {
        className: "w-full flex gap-5 items-center justify-center",
        children: [
          s.jsx(qa, { className: "min-w-[40px] min-h-[40px] text-red-600" }),
          s.jsx("span", {
            className: "txt__03",
            children:
              ((a =
                (t = e == null ? void 0 : e.response) == null
                  ? void 0
                  : t.data) == null
                ? void 0
                : a.msg) ||
              (e == null ? void 0 : e.message) ||
              "Our hamster-powered servers took a break, try later 🐹.",
          }),
        ],
      }),
    });
  },
  Di = (e, t) => {
    const a = T().pathname;
    return (
      m.useEffect(() => {
        const n = () => {
          const r = window.innerWidth;
          [Pe, ie].some((l) => l.test(a)) ||
            (r > 1250 ? t(9) : (r > 835, t(6)));
        };
        return (
          n(),
          window.addEventListener("resize", n),
          () => {
            window.removeEventListener("resize", n);
          }
        );
      }, [e, t, a]),
      { limit: e }
    );
  },
  Ke = ({ formCtx: e, key: t, cbAPI: a, cbProcessForm: n }) => {
    const [r, l] = m.useState(1),
      [i, o] = m.useState(5),
      [c, d] = m.useState(!1),
      u = T().pathname,
      x = Z();
    Di(i, o);
    const { handleSubmit: g, reset: h, trigger: f } = e,
      p = js.test(u)
        ? tl
        : ys.test(u)
        ? fi
        : Pe.test(u)
        ? _i
        : ie.test(u)
        ? vi
        : {},
      j = g((R) => {
        (R.page = r + ""),
          sessionStorage.setItem(t, JSON.stringify(R)),
          x.resetQueries({ queryKey: [t] });
      }),
      w = () => {
        sessionStorage.removeItem(t),
          h(p),
          l(1),
          f(),
          x.resetQueries({ queryKey: [t] });
      },
      _ = e.watch();
    (_.page = r + ""), (_.limit = i + "");
    const {
        data: v,
        isPending: D,
        isSuccess: N,
        isError: S,
        error: O,
      } = ae({ queryKey: [t, _], queryFn: () => a(n ? n(_) : rr(_)) }),
      { handleErrAPI: E } = I(),
      Y = m.useCallback(() => {
        S && E({ err: O }), N && (v == null ? void 0 : v.nHits) < i && l(1);
      }, [S, N, O, E, v, i, l]);
    return (
      m.useEffect(() => {
        Y();
      }, [Y]),
      {
        formVals: _,
        handleSave: j,
        handleClear: w,
        limit: i,
        propsBlock: {
          currPage: r,
          setCurrPage: (R) => {
            var $;
            d(!0), l(R);
            const U = document.getElementById("summaryRestPage"),
              re =
                ($ = U == null ? void 0 : U.getBoundingClientRect()) == null
                  ? void 0
                  : $.height;
            window.scrollTo({
              top: ie.test(u) ? (re ?? 0) + 800 : 200,
              behavior: "smooth",
            });
          },
        },
        closeAllDrop: c,
        setCloseAllDrop: d,
        data: v,
        isSuccess: N,
        isPending: D,
        isError: S,
        error: O,
      }
    );
  },
  Ti = () => {
    L();
    const { formContextMyRestaurants: e } = fe(),
      { watch: t } = e,
      a = t("searchVals"),
      n = t("search"),
      {
        handleSave: r,
        handleClear: l,
        propsBlock: i,
        data: o,
        isPending: c,
        isError: d,
        error: u,
        isSuccess: x,
        closeAllDrop: g,
      } = Ke({ formCtx: e, key: "myRestaurantsSearch", cbAPI: Rn }),
      {
        restaurants: h,
        totDocuments: f = 0,
        totPages: p = 0,
        nHits: j = 0,
      } = o ?? {};
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 justify-items-center gap-5",
      children: [
        s.jsx("span", { className: "txt__04", children: "My Restaurants" }),
        s.jsx(de, {
          ...e,
          children: s.jsx(Ts, {
            searchFields: St,
            sorters: sl,
            filters: Ct,
            formContext: e,
            handleSave: r,
            handleClear: l,
            isPending: c,
            closeAllDrop: g,
          }),
        }),
        x &&
          s.jsx(Fs, {
            nHits: j,
            totDocuments: f,
            search: n,
            searchVal: a == null ? void 0 : a[0],
          }),
        c
          ? s.jsx(z, {})
          : d
          ? s.jsx(ne, { err: u })
          : !!(h != null && h.length) &&
            s.jsx("div", {
              className: "container__cards__grid",
              children:
                h == null
                  ? void 0
                  : h.map((w) => s.jsx(hi, { rest: w }, w._id)),
            }),
        s.jsx(He, { ...i, totPages: p }),
      ],
    });
  },
  Ht = () => {
    var u;
    const { popup: e, setPopup: t } = Ne(),
      { handleErrAPI: a } = I(),
      { showToastMsg: n } = A(),
      r = (u = Ae()) == null ? void 0 : u.restId,
      l = F(),
      { mutate: i, isPending: o } = P({
        mutationFn: () => (t({ ...e, isPending: !0 }), Tn(r ?? "")),
        onSuccess: () => {
          n("Restaurant deleted", "SUCCESS"),
            l("/my-restaurants", { replace: !0 });
        },
        onError: (x) => {
          a({ err: x });
        },
        onSettled: () => t(null),
      }),
      c = () => {
        i();
      };
    return {
      handleClickToOpenPopup: () => {
        t({
          txt: "delete this restaurant?",
          redLabel: "Delete restaurant",
          isPending: o,
          confirmAction: c,
        });
      },
    };
  },
  Fi = () => {
    const { restId: e } = Ae(),
      t = F(),
      a = J.test(e ?? ""),
      { handleErrAPI: n } = I(),
      { showToastMsg: r } = A(),
      l = V({ mode: "onChange" });
    m.useEffect(() => {
      l.setFocus("name");
    }, [l]);
    const {
      data: i,
      isPending: o,
      isSuccess: c,
      isError: d,
      error: u,
    } = ae({
      queryFn: () => An(e ?? ""),
      queryKey: ["infoMyRestaurant"],
      enabled: a,
    });
    m.useEffect(() => {
      if (d) n({ err: u });
      else if (c) {
        const { restaurant: p } = i ?? {};
        l.setValue("name", (p == null ? void 0 : p.name) ?? ""),
          l.setValue("images", (p == null ? void 0 : p.images) ?? []),
          l.setValue("categories", (p == null ? void 0 : p.categories) ?? []);
        for (const j in p == null ? void 0 : p.address)
          l.setValue(`${j}`, p == null ? void 0 : p.address[j]);
        for (const j in p == null ? void 0 : p.contact)
          l.setValue(`${j}`, p == null ? void 0 : p.contact[j]);
        for (const j in p == null ? void 0 : p.delivery)
          l.setValue(`${j}`, p == null ? void 0 : p.delivery[j]);
        for (const j in p == null ? void 0 : p.openHours)
          l.setValue(`${j}`, ss(p == null ? void 0 : p.openHours[j]));
      }
    }, [u, d, n, c, i, l]);
    const { mutate: x, isPending: g } = P({
        mutationFn: ({ id: p, formData: j }) => Dn({ id: p, formData: j }),
        onSuccess: (p) => {
          r("Restaurant updated", "SUCCESS"),
            t(`/my-restaurants/${p == null ? void 0 : p.restId}`);
        },
        onError: (p) => {
          n({ err: p });
        },
      }),
      h = l.handleSubmit((p) => {
        const j = ft(p);
        x({ id: e ?? "", formData: j });
      }),
      { handleClickToOpenPopup: f } = Ht();
    return {
      formContext: l,
      canStay: a,
      isPendingInfo: o,
      handleSave: h,
      isPendingUpdate: g,
      handleClickToOpenPopup: f,
      isErrorInfo: d,
      isSuccessInfo:
        c && Object.keys((i == null ? void 0 : i.restaurant) ?? {}).length,
      errorInfo: u,
    };
  },
  ki = () => {
    L();
    const {
      formContext: e,
      canStay: t,
      isPendingInfo: a,
      handleSave: n,
      isPendingUpdate: r,
      handleClickToOpenPopup: l,
      isSuccessInfo: i,
      errorInfo: o,
    } = Fi();
    return t
      ? a
        ? s.jsx(z, {})
        : i
        ? s.jsx(de, {
            ...e,
            children: s.jsxs("div", {
              className: "w-full grid grid-cols-1 justify-items-center gap-y-5",
              children: [
                s.jsx("span", {
                  className: "txt__04",
                  children: "Update your restaurant",
                }),
                s.jsx("div", {
                  className: "w-fit justify-self-end",
                  children: s.jsx(oe, {
                    txt: "Delete restaurant",
                    handleDelete: l,
                  }),
                }),
                s.jsx(Ft, { formContext: e, handleSave: n, isPending: r }),
              ],
            }),
          })
        : s.jsx(ne, { err: o })
      : s.jsx(M, { to: "/", replace: !0 });
  },
  Li = () => {
    const { isLogged: e } = k(),
      { handleErrAPI: t } = I(),
      { setCartLogged: a } = Se(),
      {
        data: n,
        isPending: r,
        isError: l,
        isSuccess: i,
        error: o,
      } = ae({ queryKey: ["myCart"], queryFn: qn, enabled: e });
    m.useEffect(() => {
      l && t({ err: o }),
        i &&
          (console.log(n == null ? void 0 : n.cart),
          a(n == null ? void 0 : n.cart));
    }, [n, r, l, i, o, t, a]);
  },
  Ui = () => {
    const { setCurrUser: e, isLogged: t } = k(),
      { handleErrAPI: a } = I(),
      {
        data: n,
        isSuccess: r,
        isError: l,
        error: i,
      } = ae({ queryKey: ["currUser", t], queryFn: hn });
    m.useEffect(() => {
      (() => {
        if (l) a({ err: i });
        else if (r) {
          if (!(n != null && n.success)) return;
          const { user: c = {} } = n ?? {};
          e({ user: c });
        }
      })();
    }, [l, r, a, i, e, n, t]);
  },
  Vi = () => {
    Ui(), Li();
  },
  $i = () => {
    const [e, t] = m.useState(!1),
      a = m.useRef(null),
      n = m.useRef(null),
      r = F();
    return (
      m.useEffect(() => {
        const d = (u) => {
          a.current && !a.current.contains(u.target) && t(!1);
        };
        return (
          document.addEventListener("mousedown", d),
          () => {
            document.removeEventListener("mousedown", d);
          }
        );
      }, []),
      {
        toggleDrop: () => t((d) => !d),
        dropOpen: e,
        dropRef: a,
        handleSideClick: (d, u) => {
          r(d, u ? { state: { from: u } } : void 0), t(!1);
        },
        handleMouseEnter: () => {
          n.current && clearTimeout(n.current), t(!0);
        },
        handleMouseLeave: () => {
          n.current = setTimeout(() => {
            t(!1);
          }, 250);
        },
      }
    );
  },
  Kt = ({ isLogged: e, children: t }) => {
    const a = T(),
      [n] = te(),
      r = n.get("type"),
      { toggleDrop: l, dropOpen: i, dropRef: o, handleSideClick: c } = $i(),
      d = e ? il : It;
    return s.jsxs("div", {
      ref: o,
      className: "flex items-center justify-center cursor-pointer relative",
      children: [
        s.jsx("div", {
          onClick: l,
          className: `txt__01 ${
            e
              ? "el__flow hover:text-orange-500 hover:scale-120 border-2 py-1 px-2 rounded-xl"
              : ""
          }`,
          children: e
            ? sessionStorage.getItem("initName") ?? ""
            : s.jsx(et, {
                className:
                  "w-[37.5px] h-[37.5px] el__flow hover:text-orange-500 hover:scale-120",
              }),
        }),
        s.jsx("div", {
          className: `absolute border-2 border-orange-500 bg-[#111] -top-full -right-full h-fit w-fit rounded-xl z-10 el__flow  ${
            i
              ? "translate-y-[40%] opacity-100"
              : "opacity-0 translate-y-0 pointer-events-none"
          }`,
          children: s.jsxs("div", {
            className: "w-full flex flex-col items-start",
            children: [
              d.map((u) =>
                s.jsxs(
                  "button",
                  {
                    onClick: () =>
                      c(u.path, (u == null ? void 0 : u.from) ?? ""),
                    className: `min-w-[300px] w-full flex gap-3 border-b-orange-500 border-b-2 pl-3 pr-10 py-3 justify-start group cursor-pointer hover:text-orange-500 ${
                      yt({ location: a, el: u, type: r })
                        ? "text-orange-500"
                        : ""
                    }`,
                    children: [
                      s.jsx(u.svg, { className: "svg__drop" }),
                      s.jsx("span", {
                        className: "txt__02 el__flow",
                        children: u.label,
                      }),
                    ],
                  },
                  u.id
                )
              ),
              t ?? null,
            ],
          }),
        }),
      ],
    });
  },
  Zt = () => {
    const e = Z(),
      { showToastMsg: t } = A(),
      { setUserLogged: a } = k(),
      n = F(),
      { mutate: r, isPending: l } = P({
        mutationFn: () => Un(),
        onSuccess: () => {
          t("Logout successful", "SUCCESS");
        },
        onError: (i) => {
          var o, c;
          t(
            ((c =
              (o = i == null ? void 0 : i.response) == null
                ? void 0
                : o.data) == null
              ? void 0
              : c.msg) || (i == null ? void 0 : i.message),
            "ERROR"
          );
        },
        onSettled: () => {
          a(!1),
            e.resetQueries({ queryKey: ["myCart"] }),
            n("/", { replace: !0 });
        },
      });
    return { isPending: l, mutate: r };
  },
  Mi = () => {
    const { mutate: e, isPending: t } = Zt(),
      a = () => {
        e();
      };
    return s.jsx(Kt, {
      isLogged: !0,
      children: t
        ? s.jsx("div", {
            className: "h-[50px] w-full flex items-center justify-start pl-5",
            children: s.jsx(De, {}),
          })
        : s.jsxs("button", {
            onClick: a,
            className:
              "w-full cursor-pointer flex gap-3 pl-3 pr-10 py-3 justify-start group",
            children: [
              s.jsx(ot, { className: "svg__drop" }),
              s.jsx("span", {
                className:
                  "txt__02 group-hover:text-orange-500 duration-300 transition-all",
                children: "Logout",
              }),
            ],
          }),
    });
  },
  Oi = () => s.jsx(Kt, { isLogged: !1 }),
  qi = () => {
    const { isLogged: e } = k(),
      { isOpenSide: t, setIsOpenSide: a } = hs(),
      { cart: n, cartNonLogged: r } = Se(),
      i = T().pathname !== "/notice-email-sent";
    return s.jsx("div", {
      className:
        "sticky top-0 left-0 h-fit min-h-[75px] w-full border-b-3 border-orange-500 bg-[#111] pad__page flex items-center header__i",
      children: s.jsxs("div", {
        className:
          "w-full grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-2 py-2 gap-2",
        children: [
          s.jsx(H, {
            className: "txt__05 text-orange-500 max-w-fit",
            to: "/",
            children: "MERN__EAT",
          }),
          i &&
            s.jsxs("div", {
              className: "flex w-full gap-5 items-center justify-end",
              children: [
                (we(n) || we(r)) &&
                  s.jsxs(H, {
                    to: `/search/${n == null ? void 0 : n.restaurant}`,
                    className: "group relative el__flow hover:scale-110",
                    children: [
                      s.jsx("span", {
                        className:
                          "absolute border-2 px-2 border-orange-500 text-orange-500 rounded-full bg-[#000] -top-3 -right-2",
                        children:
                          (r == null ? void 0 : r.totQty) ??
                          (n == null ? void 0 : n.totQty),
                      }),
                      s.jsx(Ba, {
                        className:
                          "min-w-[35px] min-h-[35px] group-hover:text-orange-500 el__flow",
                      }),
                    ],
                  }),
                e ? s.jsx(Mi, {}) : s.jsx(Oi, {}),
                t
                  ? s.jsx("div", {
                      onClick: () => (a == null ? void 0 : a(!1)),
                      className:
                        "max-w-fit justify-self-end group flex items-center",
                      children: s.jsx(ve, { className: "svg__header" }),
                    })
                  : s.jsx("div", {
                      onClick: () => (a == null ? void 0 : a(!0)),
                      className:
                        "max-w-fit justify-self-end group flex items-center",
                      children: s.jsx(Qa, { className: "svg__header" }),
                    }),
              ],
            }),
        ],
      }),
    });
  },
  Bi = () => {
    const { setPopup: e, popup: t } = Ne(),
      {
        txt: a,
        greenLabel: n = "I change idea",
        redLabel: r,
        confirmAction: l,
        isPending: i,
      } = t ?? {};
    return s.jsx("div", {
      className: `${
        t ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full bg-black/50 popup__i flex justify-center items-center`,
      children: s.jsxs("div", {
        className:
          "w-[75vw] max-w-[750px] h-1/2 bg-[#111] border-[3px] border-orange-500 rounded-2xl grid grid-cols-1 p-5 content-start relative",
        children: [
          s.jsx("div", {
            onClick: () => e(null),
            className:
              "w-fit h-fit justify-self-end flex justify-end -mt-3 -mr-2",
            children: s.jsx(ve, {
              className:
                "w-[35px] h-[35px] sm:h-[40px] sm:w-[40px] text-red-600 btn__pseudo hover:scale-120",
            }),
          }),
          s.jsx("div", {
            className: "w-full h-fit flex justify-center self-start mt-[5%]",
            children: s.jsxs("span", {
              className: "txt__03",
              children: ["Are you sure you want to ", a],
            }),
          }),
          s.jsxs("div", {
            className:
              "w-full h-fit grid grid-cols-1 sm:grid-cols-2 absolute bottom-[20%] left-1/2 -translate-x-1/2 justify-items-center gap-5",
            children: [
              s.jsx("div", {
                className: "w-full max-w-[250px] flex justify-center",
                children: s.jsx(K, {
                  label: n ?? "I change idea",
                  styleTxt: "txt__02 text-green-600",
                  styleBtn: "border-green-600",
                  handleClick: () => e(null),
                  isDisabled: i,
                }),
              }),
              s.jsx("div", {
                className: "w-full max-w-[250px] flex justify-center",
                children: s.jsx(K, {
                  label: r,
                  styleTxt: "txt__02 text-red-600",
                  styleBtn: "border-red-600",
                  handleClick: l,
                  isPending: i,
                }),
              }),
            ],
          }),
        ],
      }),
    });
  },
  Qi = () => {
    const e = m.useRef(null),
      t = m.useRef(null),
      {
        isToast: a,
        msg: n,
        type: r,
        closeToast: l,
        toastClicked: i,
        setToastClicked: o,
      } = A();
    return (
      m.useEffect(() => {
        (() => {
          const d = document.getElementById("toast");
          t != null &&
            t.current &&
            d &&
            (a
              ? (d.classList.remove("toast__no"),
                d.classList.remove("toast__active_out"),
                t.current.classList.remove("toast__container_after"),
                requestAnimationFrame(() => {
                  var u;
                  d.classList.add("toast__active_in"),
                    (u = t == null ? void 0 : t.current) == null ||
                      u.classList.add("toast__container_after");
                }),
                e.current && clearTimeout(e.current),
                (e.current = setTimeout(() => {
                  o(!0), l(), (e.current = null);
                }, 5e3)))
              : (d.classList.remove("toast__active_in"),
                i
                  ? (d.classList.remove("toast__no"),
                    requestAnimationFrame(() => {
                      d.classList.add("toast__active_out");
                    }))
                  : d.classList.add("toast__no")));
        })();
      }, [a, i, l, o]),
      {
        isToast: a,
        afterRef: t,
        msg: n,
        type: r,
        closeToast: l,
        setToastClicked: o,
      }
    );
  },
  zi = () => {
    const {
      afterRef: e,
      msg: t,
      type: a,
      closeToast: n,
      setToastClicked: r,
    } = Qi();
    return s.jsx("div", {
      id: "toast",
      className: `top-5 right-5 fixed toast__i bg-[#111] rounded-xl text-[whitesmoke] min-w-3/4 sm:min-w-1/2 max-w-3/4 h-fit min-h-[75px] flex border-t-2 border-r-2 el__flow  ${
        a === "SUCCESS" ? "border-green-600" : "border-red-600"
      }
      toast__no
      `,
      children: s.jsxs("div", {
        ref: e,
        className: `w-full grid grid-cols-[75px_1fr] relative min-h-full rounded-xl border-l-[8px]  ${
          a === "SUCCESS" ? "border-green-600" : "border-red-600"
        }`,
        style: { "--toast-color": a === "SUCCESS" ? "#16a34a" : "#dc2626" },
        children: [
          s.jsx("div", {
            className: "w-full flex flex-col items-center justify-center",
            children:
              a === "SUCCESS"
                ? s.jsx(za, {
                    className:
                      "h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] text-green-600",
                  })
                : s.jsx(xs, {
                    className:
                      "h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] text-red-600",
                  }),
          }),
          s.jsx("div", {
            className: `absolute txt__03 top-3 left-[75px] ${
              a === "SUCCESS" ? "text-green-600" : "text-red-600"
            }`,
            children: a,
          }),
          s.jsx("div", {
            onClick: () => {
              r(!0), n();
            },
            className: "absolute right-5 top-3 ",
            children: s.jsx(ve, {
              className:
                "h-[30px] w-[30px] sm:w-[32px] sm:h-[32px] text-red-600 hover:scale-120 btn__pseudo",
            }),
          }),
          s.jsx("div", {
            className: "w-full flex justify-start pr-6 pb-6 pt-12",
            children: s.jsx("span", { className: "txt__03", children: t }),
          }),
        ],
      }),
    });
  },
  Gi = () => {
    const { isLogged: e, currUser: t } = k(),
      { showToastMsg: a } = A(),
      { handleErrAPI: n } = I(),
      r = Z(),
      l = F(),
      {
        register: i,
        formState: { errors: o },
        handleSubmit: c,
        reset: d,
      } = V({ mode: "onChange" }),
      { mutate: u, isPending: x } = P({
        mutationFn: (w) => Sn(w),
        onSuccess: () => {
          d(),
            a("You have successfully subscribed to out newsLetter", "SUCCESS");
        },
        onError: (w) => {
          var _, v;
          a(
            ((v =
              (_ = w == null ? void 0 : w.response) == null
                ? void 0
                : _.data) == null
              ? void 0
              : v.msg) || w.message,
            "ERROR"
          );
        },
      }),
      g = c((w) => {
        u(w.email);
      }),
      { mutate: h, isPending: f } = P({
        mutationFn: ({ type: w }) => Nn({ type: w }),
        onSuccess: () => {
          r.resetQueries({ queryKey: ["currUser"] }),
            a(
              `You have ${
                t != null && t.hasSubscribedToNewsletter
                  ? "unsubscribed"
                  : "subscribed"
              } to our newsletter successfully`,
              "SUCCESS"
            );
        },
        onError: (w) => {
          var _, v, D;
          ((_ = w == null ? void 0 : w.response) == null
            ? void 0
            : _.status) === 401
            ? n({ err: w })
            : a(
                ((D =
                  (v = w == null ? void 0 : w.response) == null
                    ? void 0
                    : v.data) == null
                  ? void 0
                  : D.msg) || w.message,
                "ERROR"
              );
        },
      });
    return {
      isLogged: e,
      toggleNewsLetter: () => {
        h({
          type:
            t != null && t.hasSubscribedToNewsletter
              ? "unsubscribe"
              : "subscribe",
        });
      },
      isPendingLogged: f,
      register: i,
      errors: o,
      currUser: t,
      submitSubscribeNonLoggedUser: g,
      isPendingNonLogged: x,
      handleRedirection: () =>
        l("/newsletter/notice-unsubscribe-with-retry?success=false", {
          state: { from: "/newsletter/verify-unsubscribe" },
        }),
    };
  },
  Yi = ({ isPending: e, currUser: t, submitNewsLetter: a }) =>
    s.jsx("div", {
      className: "max-w-[200px] md:max-w-[225px] flex justify-start",
      children: s.jsx(G, {
        label:
          t != null && t.hasSubscribedToNewsletter
            ? "Unsubscribe"
            : "Subscribe",
        type: "button",
        handleClick: a,
        isPending: e,
      }),
    }),
  Hi = ({
    isPending: e,
    currUser: t,
    submitNewsLetter: a,
    register: n,
    errors: r,
  }) => {
    var l, i;
    return s.jsx("div", {
      className: "w-full flex flex-col gap-5",
      children: s.jsxs("form", {
        className:
          "grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] sm:grid-cols-2 gap-5 sm:gap-x-10 items-center",
        children: [
          s.jsxs("div", {
            className: "w-full flex flex-col gap-3",
            children: [
              s.jsx("input", {
                type: "email",
                className: "input__base txt__01",
                placeholder: "Your email...",
                ...n("email", {
                  required: "Email is required",
                  pattern: {
                    value: fs,
                    message: "Enter a valid email to receive great discounts ",
                  },
                }),
              }),
              ((l = r == null ? void 0 : r.email) == null
                ? void 0
                : l.message) &&
                s.jsx("span", {
                  className: "txt__00 text-red-600",
                  children:
                    (i = r == null ? void 0 : r.email) == null
                      ? void 0
                      : i.message,
                }),
            ],
          }),
          s.jsx("div", {
            className:
              "w-full max-w-[200px] md:max-w-[225px] flex justify-start items-start",
            children: s.jsx(G, {
              label:
                t != null && t.hasSubscribedToNewsletter
                  ? "Unsubscribe"
                  : "Subscribe",
              type: "submit",
              handleClick: a,
              isPending: e,
            }),
          }),
        ],
      }),
    });
  },
  Ki = () => {
    const {
      isLogged: e,
      toggleNewsLetter: t,
      isPendingLogged: a,
      register: n,
      errors: r,
      currUser: l,
      submitSubscribeNonLoggedUser: i,
      isPendingNonLogged: o,
      handleRedirection: c,
    } = Gi();
    return s.jsxs("div", {
      className: "flex w-full flex-col items-start gap-5",
      children: [
        s.jsxs("div", {
          className: `w-full grid items-center gap-4  ${
            e
              ? "grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:grid-cols-2"
              : " grid-cols-1 lg:grid-cols-[200px_1fr]"
          }`,
          children: [
            s.jsx("div", {
              className: "w-full flex flex-col self-start",
              children: s.jsx("span", {
                className: "txt__02",
                children: "Newsletter",
              }),
            }),
            e
              ? s.jsx(Yi, { currUser: l, submitNewsLetter: t, isPending: a })
              : s.jsx(Hi, {
                  register: n,
                  errors: r,
                  submitNewsLetter: i,
                  currUser: l,
                  isPending: o,
                }),
          ],
        }),
        !e &&
          s.jsx("div", {
            className: "w-full flex justify-start",
            children: s.jsx("span", {
              onClick: c,
              className:
                "txt__01 el__after_below cursor-pointer el__flow hover:text-orange-500",
              children: "Send link to unsubscribe",
            }),
          }),
        s.jsx("div", {
          className: "w-full flex",
          children: s.jsx("span", {
            className: "txt__00",
            children:
              "Subscribe to our newsletter to receive the latest updates and get a chance to win a discount coupon.",
          }),
        }),
      ],
    });
  },
  Zi = () =>
    s.jsxs("div", {
      className:
        "pad__page py-5 border-t-2 border-orange-500 w-full flex flex-col items-center gap-y-5",
      children: [
        s.jsxs("div", {
          className: "grid w-full gap-y-5 ",
          children: [
            s.jsx(H, {
              to: "/",
              className: "txt__05 text-orange-500",
              children: "LOGO",
            }),
            s.jsx("div", {
              className:
                "w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4",
              children: Mr.map((e) =>
                s.jsx(
                  "div",
                  {
                    className: "w-full flex flex-col items-start",
                    children: s.jsx(H, {
                      to: e.path,
                      className:
                        "el__after_below txt__02 el__flow hover:text-orange-500 opacity-50",
                      children: e.label,
                    }),
                  },
                  e.id
                )
              ),
            }),
          ],
        }),
        s.jsx("ul", {
          className:
            "w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[200px_1fr] justify-items-start gap-y-5",
          children: Or.map((e) =>
            s.jsx(
              "li",
              {
                children: s.jsxs("a", {
                  href: e.url,
                  className:
                    "grid max-w-fit grid-cols-[40px_1fr] items-end el__flow el__after_below hover:text-orange-500",
                  children: [
                    s.jsx(e.svg, { className: "w-[30px] h-[30px] " }),
                    s.jsx("span", { className: "txt__01", children: e.label }),
                  ],
                }),
              },
              e.id
            )
          ),
        }),
        s.jsx(Ki, {}),
        s.jsx("div", {
          className: "w-full flex justify-center py-5",
          children: s.jsxs("span", {
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
  Wi = ({ email: e }) =>
    s.jsx("div", {
      className:
        "w-full flex items-center border-b-2 border-orange-500 sticky pt-4 top-0 z-20 bg-[#111]",
      children: s.jsxs("div", {
        className: "w-full flex items-center pb-4 pl-3 gap-3",
        children: [
          s.jsx(Ga, {
            className: " w-[35px] h-[35px] sm:w-[40px] sm:h-[40px]",
          }),
          s.jsx("span", {
            className: "txt__02 max-w-full truncate",
            children: e,
          }),
        ],
      }),
    }),
  Ue = ({ handleSideClick: e, el: t, customStyle: a }) => {
    const n = T(),
      [r] = te(),
      l = r.get("type");
    return s.jsxs(
      "button",
      {
        onClick: () => e(t.path, t == null ? void 0 : t.from),
        className: `w-full cursor-pointer flex gap-3 group max-w-fit items-center el__after_below sideLink ${
          a ?? ""
        } ${yt({ location: n, el: t, type: l })}`,
        children: [
          s.jsx(t.svg, { className: "svg__sidebar" }),
          s.jsx("span", {
            className:
              "cursor-pointer txt__02 group-hover:text-orange-500 el__flow",
            children: t.label,
          }),
        ],
      },
      t.id
    );
  },
  Xi = ({ handleLogout: e, isPending: t }) =>
    t
      ? s.jsx("div", { className: "mt-[10px]", children: s.jsx(De, {}) })
      : s.jsxs("button", {
          onClick: e,
          className:
            "w-full flex gap-3 group max-w-fit items-center el__after_below",
          children: [
            s.jsx(ot, { className: "svg__sidebar" }),
            s.jsx("span", {
              className:
                "cursor-pointer txt__02 group-hover:text-orange-500 el__flow",
              children: "Logout",
            }),
          ],
        }),
  Ms = ({ handleSideClick: e, el: t, fields: a }) => {
    const [n, r] = m.useState(!1),
      { isOpenSide: l } = hs();
    return (
      m.useEffect(() => {
        l || r(!1);
      }, [l]),
      s.jsxs("div", {
        className: "w-full grid grid-cols-1",
        children: [
          s.jsx(B, {
            txt: t.label,
            Icon: t.icon,
            isOpen: n,
            setIsOpen: r,
            customIconStyle: "min-w-[40px] min-h-[40px]",
          }),
          s.jsx("div", {
            className: `w-full grid grid-cols-1 el__flow gap-6 pl-5 ${
              n
                ? "max-h-[500px] opacity-100 pointer-events-auto pt-3"
                : "max-h-0 opacity-0 pointer-events-none"
            }`,
            children: a.map((i, o) =>
              s.jsx(
                Ue,
                { el: i, handleSideClick: e, customStyle: o ? void 0 : "pt-2" },
                i.id
              )
            ),
          }),
        ],
      })
    );
  },
  Ji = () => {
    const { isOpenSide: e, setIsOpenSide: t } = hs(),
      a = m.useRef(null),
      n = F(),
      { isLogged: r, currUser: l } = k();
    m.useEffect(() => {
      const u = (x) => {
        var g;
        ((g = a.current) != null && g.contains(x.target)) || t(!1);
      };
      return (
        document.addEventListener("mousedown", u),
        () => {
          document.removeEventListener("mousedown", u);
        }
      );
    }, [t, a]);
    const { mutate: i, isPending: o } = Zt(),
      c = () => i(),
      d = (u, x) => {
        n(u, x ? { state: { from: x } } : void 0), t(!1);
      };
    return s.jsxs(s.Fragment, {
      children: [
        s.jsx("div", {
          className: `${
            e ? "fixed" : "hidden"
          } inset-0 bg-black/50 sidebar__i_bg transition-none`,
        }),
        s.jsx("div", {
          ref: a,
          className: `${
            e
              ? "translate-x-0 overflow-y-auto hide_scrollbar pb-[50px]"
              : "translate-x-full"
          } sidebar__content sidebar__i_content ${r ? "" : "pt-6"}`,
          children: s.jsxs("div", {
            className: "w-full grid grid-cols-1 justify-items-start gap-5 px-3",
            children: [
              (l == null ? void 0 : l.email) && s.jsx(Wi, { email: l.email }),
              s.jsx(Ue, { el: al, handleSideClick: d }),
              r
                ? Et.map((u) => s.jsx(Ue, { handleSideClick: d, el: u }, u.id))
                : s.jsx(Ms, { handleSideClick: d, el: cl, fields: It }),
              r && s.jsx(Ms, { handleSideClick: d, el: ll, fields: rl }),
              nl.map((u) => s.jsx(Ue, { handleSideClick: d, el: u }, u.id)),
              r && s.jsx(Xi, { isPending: o, handleLogout: c }),
            ],
          }),
        }),
      ],
    });
  },
  ec = ({ images: e }) => {
    const [t, a] = m.useState(0),
      [n, r] = m.useState(!1),
      l = m.useCallback(() => {
        t === e.length - 1 ? a(0) : a((o) => o + 1);
      }, [t, e.length]),
      i = () => {
        a(t === 0 ? e.length - 1 : (o) => o - 1);
      };
    return (
      m.useEffect(() => {
        if (n) return;
        const o = setInterval(() => {
          l();
        }, 1500);
        return () => clearInterval(o);
      }, [n, l]),
      { activeIndx: t, handleNext: l, handlePrev: i, setBtnClicked: r }
    );
  },
  ks = ({ images: e }) => {
    const t = T().pathname,
      {
        activeIndx: a,
        handleNext: n,
        handlePrev: r,
        setBtnClicked: l,
      } = ec({ images: e });
    return s.jsx("div", {
      className: "pad__page w-full pt-5 flex flex-col justify-center",
      children: s.jsxs("div", {
        className: "w-full flex items-center relative",
        children: [
          s.jsx("button", {
            onClick: () => {
              l(!0), r();
            },
            className:
              "absolute top-1/2 left-0 -translate-y-1/2 hero__i_arrow outline-none",
            children: s.jsx(Ya, {
              className:
                "h-[50px] w-[50px] text-orange-500 btn__pseudo hover:scale-120",
            }),
          }),
          s.jsx("div", {
            className:
              "flex w-full overflow-hidden border-2 border-orange-500 p-6 rounded-xl gap-[10%]",
            children: e.map((i) =>
              s.jsx(
                "div",
                {
                  className: `min-w-[200px] h-[200px] ${
                    ie.test(t) ? "" : "sm:min-w-[350px] sm:h-[350px]"
                  } rounded-xl transition-all duration-500 overflow-hidden`,
                  style: { transform: `translateX(-${a * 100}%` },
                  children: s.jsx("img", {
                    src: (i == null ? void 0 : i.url) ?? i.img,
                    alt: "burger_hero",
                    className: "min-w-full object-cover h-full ",
                  }),
                },
                (i == null ? void 0 : i.public_id) ?? i.id
              )
            ),
          }),
          s.jsx("button", {
            onClick: () => {
              l(!0), n();
            },
            className:
              "absolute top-1/2 right-0 -translate-y-1/2 hero__i_arrow outline-none",
            children: s.jsx(Ha, {
              className:
                "h-[50px] w-[50px] text-orange-500 btn__pseudo hover:scale-120",
            }),
          }),
        ],
      }),
    });
  },
  sc = () => s.jsx(ks, { images: $r }),
  tc = () => {
    const { infoPop: e, setInfoPop: t } = xn();
    return s.jsx("div", {
      className: `${
        e ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full bg-black/50 popup__i flex justify-center items-center`,
      children: s.jsxs("div", {
        className:
          "w-[75vw] max-w-[750px] h-1/2 bg-[#111] border-[3px] border-orange-500 rounded-2xl grid grid-cols-1 p-5 content-start relative",
        children: [
          s.jsx("div", {
            onClick: () => t(null),
            className:
              "w-fit h-fit justify-self-end flex justify-end -mt-3 -mr-2",
            children: s.jsx(ve, {
              className:
                "w-[35px] h-[35px] sm:h-[40px] sm:w-[40px] text-red-600 btn__pseudo hover:scale-120",
            }),
          }),
          s.jsx("div", {
            className: "w-full h-fit flex justify-center self-start mt-[5%]",
            children: s.jsx("span", {
              className: "txt__03",
              children: e == null ? void 0 : e.msg,
            }),
          }),
          s.jsxs("div", {
            className:
              "w-full h-fit grid grid-cols-1 sm:grid-cols-2 absolute bottom-[20%] left-1/2 -translate-x-1/2 justify-items-center gap-5",
            children: [
              s.jsx("div", {
                className: "w-full max-w-[250px] flex justify-center",
                children: s.jsx(K, {
                  label: e == null ? void 0 : e.confirmActMsg,
                  styleTxt: "txt__02 ",
                  handleClick: () => (e == null ? void 0 : e.confirmActCb()),
                  isDisabled: e == null ? void 0 : e.isPending,
                  isPending: e == null ? void 0 : e.isPending,
                }),
              }),
              s.jsx("div", {
                className: "w-full max-w-[250px] flex justify-center",
                children: s.jsx(K, {
                  label: e == null ? void 0 : e.cancelActMsg,
                  styleTxt: "txt__02",
                  handleClick: () => (e == null ? void 0 : e.cancelActCb()),
                  isDisabled: e == null ? void 0 : e.isPending,
                  isPending: e == null ? void 0 : e.isPending,
                }),
              }),
            ],
          }),
        ],
      }),
    });
  },
  ac = ({ children: e }) => {
    const t = T();
    return s.jsxs("div", {
      className: "w-full min-h-screen flex flex-col items-center",
      children: [
        s.jsx(qi, {}),
        s.jsx(Ji, {}),
        s.jsx(Bi, {}),
        s.jsx(tc, {}),
        s.jsx(zi, {}),
        t.pathname === "/" && s.jsx(sc, {}),
        s.jsx("div", {
          className:
            "flex flex-col items-center w-full pad__page py-5 pb-[150px] sm:pb-[200px] relative",
          children: e,
        }),
        s.jsx(Zi, {}),
      ],
    });
  },
  nc = () => s.jsx(ac, { children: s.jsx(he, {}) }),
  rc = () => {
    const { isLogged: e } = k();
    return e ? s.jsx(M, { to: "/", replace: !0 }) : s.jsx(he, {});
  },
  lc = () => {
    const { isLogged: e } = k();
    return e ? s.jsx(he, {}) : s.jsx(M, { to: "/", replace: !0 });
  },
  ic = () => s.jsx(he, {}),
  cc = () => {
    const { isLogged: e } = k();
    return e ? s.jsx(he, {}) : s.jsx(M, { to: "/", replace: !0 });
  },
  oc = () => {
    const { handleErrAPI: e } = I(),
      { restId: t } = Ae(),
      a = J.test(t ?? ""),
      {
        data: n,
        isPending: r,
        isError: l,
        error: i,
        isSuccess: o,
      } = ae({
        queryKey: ["mySingleRestaurant", t],
        queryFn: () => Fn(t ?? ""),
        enabled: a,
      }),
      c = m.useCallback(() => {
        l && e({ err: i });
      }, [l, e, i]);
    m.useEffect(() => {
      c();
    }, [c]);
    const { restaurant: d, success: u } = n ?? {};
    return {
      canStay: a,
      isPending: r,
      restaurant: d,
      success: u,
      restId: t,
      isError: l,
      error: i,
      isSuccess: o && Object.keys(d ?? {}).length,
    };
  },
  dc = ({ restId: e }) => {
    const [t, a] = m.useState(!1),
      { formContextMyDishesAddItem: n, formContextMyDishesSearch: r } = fe(),
      l = () => {
        const { setValue: c } = r;
        c("searchVals", ["restaurantId"]), c("search", e ?? "");
      },
      i = () => n.setValue("restaurant", e ?? ""),
      { handleClickToOpenPopup: o } = Ht();
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 relative my_restaurant_drop__i",
      children: [
        s.jsx("div", { className: "h-[50px]" }),
        s.jsxs("div", {
          className:
            "border-2 border-orange-500 rounded-xl w-fit justify-self-end py-2 px-3 absolute z-10 bg-[#111]",
          children: [
            s.jsx("div", {
              className: "w-full ",
              children: s.jsx(B, {
                isOpen: t,
                setIsOpen: a,
                txt: "Business",
                Icon: be,
              }),
            }),
            s.jsx("ul", {
              className: `w-full grid grid-cols-1 el__flow pl-1 gap-6 ${
                t
                  ? "opacity-100 pointer-events-auto max-h-[500px] pb-4"
                  : "opacity-0 pointer-events-none max-h-0"
              }`,
              children: pr(e ?? "").map((c) =>
                s.jsx(
                  "li",
                  {
                    onClick: () =>
                      c.label === "Add dish"
                        ? i()
                        : c.label === "My dishes"
                        ? l()
                        : c.label === "Delete"
                        ? o()
                        : null,
                    className:
                      "w-full flex items-center gap-3 group el__flow cursor-pointer first:pt-4 hover:text-orange-500 el__after_below",
                    children:
                      c.label === "Delete"
                        ? s.jsxs("div", {
                            className: "w-full flex items-center gap-3",
                            children: [
                              s.jsx(c.icon, {
                                className:
                                  "min-w-[25px] min-h-[25px] group-hover:text-orange-500 el__flow",
                              }),
                              s.jsx("span", {
                                className:
                                  "txt__02 group-hover:text-orange-500 el__flow ",
                                children: c.label,
                              }),
                            ],
                          })
                        : s.jsxs(H, {
                            to: c.path,
                            className: "w-full flex items-center gap-3",
                            children: [
                              s.jsx(c.icon, {
                                className:
                                  "min-w-[25px] min-h-[25px] group-hover:text-orange-500 el__flow",
                              }),
                              s.jsx("span", {
                                className:
                                  "txt__02 group-hover:text-orange-500 el__flow ",
                                children: c.label,
                              }),
                            ],
                          }),
                  },
                  c.id
                )
              ),
            }),
          ],
        }),
      ],
    });
  },
  uc = () => {
    L();
    const {
      canStay: e,
      isPending: t,
      restaurant: a,
      restId: n,
      error: r,
      isSuccess: l,
    } = oc();
    return e
      ? t
        ? s.jsx(z, {})
        : l
        ? s.jsxs("div", {
            className: "w-full grid grid-cols-1 justify-items-center gap-5",
            children: [
              s.jsx("span", {
                className: "txt__04 truncate max-w-full",
                children: a.name,
              }),
              s.jsx(dc, { restId: n }),
              s.jsx(ks, { images: a.images }),
              s.jsxs("div", {
                className:
                  "w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-3 gap-x-6 items-start",
                children: [
                  s.jsx(Ye, { rest: a, Container: Le }),
                  s.jsx(Ut, { rest: a }),
                ],
              }),
            ],
          })
        : s.jsx(ne, { err: r })
      : s.jsx(M, { to: "/", replace: !0 });
  },
  mc = () => {
    const { isLogged: e } = k();
    return e ? s.jsx(he, {}) : s.jsx(M, { to: "/", replace: !0 });
  },
  pc = async () => {
    const { data: e } = await b.get("/my-dishes/restaurant-ids");
    return e;
  },
  xc = async ({ restId: e, form: t }) => {
    const { data: a } = await b.post(`/my-dishes?restId=${e}`, t);
    return a;
  },
  gc = async (e) => {
    const { data: t } = await b.get(`/my-dishes?${e}`);
    return t;
  },
  hc = async (e) => {
    const { data: t } = await b.get(`/my-dishes/info-dish/${e}`);
    return t;
  },
  fc = async (e) => {
    const { data: t } = await b.delete(`/my-dishes/${e}`);
    return t;
  },
  yc = async ({ formData: e, id: t }) => {
    const { data: a } = await b.put(`/my-dishes/${t}`, e);
    return a;
  },
  jc = async (e) => {
    const { data: t } = await b.delete("/my-dishes/bulk-delete", {
      data: { ids: e },
    });
    return t;
  },
  wc = async (e) => {
    const { data: t } = await b.delete(`/my-dishes/bulk-delete-query?${e}`);
    return t;
  },
  Wt = () => {
    var o;
    const { handleErrAPI: e } = I(),
      {
        data: t,
        isPending: a,
        isSuccess: n,
        isError: r,
        error: l,
      } = ae({ queryKey: ["restaurantIds"], queryFn: pc }),
      i = m.useCallback(() => {
        r && e({ err: l });
      }, [r, l, e]);
    return (
      m.useEffect(() => {
        i();
      }, [i]),
      {
        isPendingIds: a,
        restInfo: t == null ? void 0 : t.infoRestaurants,
        isSuccessIds:
          n &&
          ((o = t == null ? void 0 : t.infoRestaurants) == null
            ? void 0
            : o.length),
        isErrorIds: r,
        errorIds: l,
      }
    );
  },
  Xt = [
    "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg",
    "https://img.freepik.com/free-photo/side-view-penne-pasta-with-tomato-sauce-greens-plate_141793-5043.jpg",
    "https://img.freepik.com/free-photo/grilled-stake-with-black-pepper-baked-potato-tomatoes-rosemary-board_140725-10939.jpg",
    "https://img.freepik.com/free-photo/dessert-table_181624-10310.jpg?uid=R172218062&ga=GA1.1.1226271393.1737553858&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/fried-meat-served-with-arugula-grilled-tomato_141793-1181.jpg",
  ],
  _c = async () => {
    const { data: e } = await b.post("/proxy", { urls: Xt });
    return e;
  },
  bc = (e, t) => {
    const a = atob(e.base64.split(",")[1]),
      n = [];
    let r = 0;
    for (; r < a.length; ) n.push(a.charCodeAt(r)), r++;
    const l = new Uint8Array(n);
    return new File([l], `img_${t}`, { type: e.mimeType });
  },
  vc = ({ setValue: e, reset: t }) => {
    const { showToastMsg: a } = A(),
      {
        data: n,
        isPending: r,
        isSuccess: l,
        isError: i,
        error: o,
      } = ae({ queryKey: ["urls", Xt], queryFn: _c, enabled: gn });
    return (
      m.useEffect(() => {
        if (i) console.log(o), a("Error", "ERROR");
        else if (l) {
          const c = n.base64Imgs.map((d, u) => bc(d, u));
          t({
            restaurant: "",
            items: [
              ...Array.from({ length: 10 }).map((d, u) => ({
                name: `item_${u + 1 + ""}`,
                price: "9.99",
                quantity: "12",
                images: [c == null ? void 0 : c[0]],
              })),
            ],
          });
        }
      }, [l, i, o, n, a, e, t]),
      { isPending: r }
    );
  },
  Nc = () => {
    const { handleErrAPI: e } = I(),
      { formContextMyDishesAddItem: t, formContextMyDishesSearch: a } = fe(),
      { showToastMsg: n } = A(),
      r = F();
    vc({ setValue: t.setValue, reset: t.reset });
    const {
        isPendingIds: l,
        restInfo: i,
        isSuccessIds: o,
        isErrorIds: c,
        errorIds: d,
      } = Wt(),
      { fields: u } = gs({ control: t.control, name: "items" });
    m.useEffect(() => {
      t != null &&
        t.setFocus &&
        setTimeout(() => {
          t.setFocus(`items.${u.length - 1}`);
        }, 500);
    }, [t, u.length]);
    const { mutate: x, isPending: g } = P({
        mutationFn: ({ form: f, restId: p }) => xc({ form: f, restId: p }),
        onSuccess: (f) => {
          n(`Dish${u.length > 1 ? "es" : ""} created successfully`, "SUCCESS");
          const { setValue: p } = a;
          p("searchVals", ["restaurantId"]),
            p("search", f.restId),
            p("createdAtSort", ["desc"]),
            r("/my-dishes"),
            t.reset({
              restaurant: "",
              items: [{ name: "", price: "", quantity: "", images: [] }],
            });
        },
        onError: (f) => e({ err: f }),
      }),
      h = t.handleSubmit((f) => {
        const p = cr(f);
        x({ form: p, restId: f.restaurant });
      });
    return {
      isPendingIds: l || !1,
      formContext: t,
      restInfo: i,
      isSuccessIds: o,
      handleSave: h,
      isPending: g,
      isErrorIds: c,
      errorIds: d,
    };
  },
  Sc = ({ formContext: e, restInfo: t }) => {
    var d;
    const [a, n] = m.useState(!1),
      {
        register: r,
        watch: l,
        formState: { errors: i },
        setValue: o,
      } = e,
      c = (u) => l("restaurant") === u;
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 relative my_restaurant_drop__i",
      children: [
        s.jsx("div", { className: "h-[60px] sm:h-[50px]" }),
        ((d = i == null ? void 0 : i.restaurant) == null
          ? void 0
          : d.message) &&
          s.jsx("span", {
            className:
              "txt__01 -mt-5 sm:mt-0 justify-self-end self-center text-red-600 pt-5",
            children: i.restaurant.message,
          }),
        s.jsx("input", {
          type: "text",
          ...r("restaurant", {
            required: {
              value: !0,
              message:
                "We need to know to which restaurant you want to add dish 🧐",
            },
          }),
          className: "opacity-0 pointer-events-none",
        }),
        s.jsxs("div", {
          className:
            "border-2 border-orange-500 rounded-xl w-fit justify-self-end py-1 sm:py-2 px-1 sm:px-3 absolute z-10 bg-[#111]",
          children: [
            s.jsx("div", {
              className: "w-full ",
              children: s.jsx(B, {
                isOpen: a,
                setIsOpen: n,
                txt: "Restaurant",
                Icon: be,
              }),
            }),
            s.jsx("ul", {
              className: `w-full grid grid-cols-1 el__flow pl-1 gap-2 sm:gap-4 overflow-x-scroll hide_scrollbar ${
                a
                  ? "opacity-100 pointer-events-auto max-h-[250px] pb-4"
                  : "opacity-0 pointer-events-none max-h-0"
              }`,
              children:
                t == null
                  ? void 0
                  : t.map((u) =>
                      s.jsx(
                        "li",
                        {
                          onClick: () => {
                            o("restaurant", c(u._id) ? "" : u._id, {
                              shouldValidate: !0,
                            }),
                              n(!1);
                          },
                          className: `grid w-full grid-cols-1 border-2 first:mt-3 rounded-xl py-1 sm:py-2 px-2 sm:px-3 cursor-pointer el__flow ${
                            c(u._id)
                              ? "border-orange-500 text-orange-500"
                              : "border-[#333]"
                          }`,
                          children: s.jsx("span", {
                            className: "txt__01 break-all",
                            children: u.name,
                          }),
                        },
                        u._id
                      )
                    ),
            }),
          ],
        }),
      ],
    });
  },
  Cc = ({ formContext: e, indexForm: t }) => {
    var o, c, d, u;
    const {
        register: a,
        watch: n,
        setValue: r,
        formState: { errors: l },
      } = e,
      i = n(`items.${t}.images`);
    return s.jsxs("div", {
      className: "w-full flex flex-col gap-2",
      children: [
        s.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [
            s.jsx(tt, { className: "h-[35px] w-[35px]" }),
            "Dish images",
          ],
        }),
        s.jsx("div", {
          className: `w-full flex flex-row overflow-x-auto border-[3px] snap-x snap-mandatory gap-5 sm:gap-10 hide_scrollbar rounded-xl el__flow ${
            (o = n(`items.${t}.images`)) != null && o.length
              ? "max-h-[500px] p-3 sm:p-6 border-orange-500 mb-2"
              : "max-h-0 border-transparent p-0"
          }`,
          children:
            !!(i != null && i.length) &&
            [...i].map((x, g) =>
              s.jsx(Dt, { img: i[g], images: i, setValue: r, indexForm: t }, g)
            ),
        }),
        s.jsx(Tt, { register: a, watch: n, indexForm: t }),
        ((d = (c = l == null ? void 0 : l.items) == null ? void 0 : c[t]) ==
        null
          ? void 0
          : d.images) &&
          s.jsx("span", {
            className: "txt__01 text-red-600",
            children:
              (u = l == null ? void 0 : l.items) == null
                ? void 0
                : u[t].images.message,
          }),
      ],
    });
  },
  ns = {
    id: y(),
    label: "Name",
    field: "name",
    place: "Dish name...",
    required: !0,
    reg: nr,
    msg: "Dish name must be between 2 and 50 characters",
  },
  Jt = [
    {
      field: "price",
      reg: _e,
      msg: "Price must be a positive number with up to 2 decimal places",
    },
    {
      field: "quantity",
      reg: xt,
      msg: "Quantity must be a prime number without decimals",
    },
  ].map((e) => ({
    ...e,
    id: y(),
    label: e.field[0].toUpperCase() + e.field.slice(1),
    place: `Dish ${e.field}...`,
    required: !0,
    type: "number",
  })),
  Pc = [
    { field: ns.field, reg: ns.reg },
    ...Jt.map((e) => ({ field: e.field, reg: e.reg })),
  ],
  Ec = ({ formContext: e, indexForm: t }) => {
    const {
      register: a,
      formState: { errors: n },
    } = e;
    return s.jsxs("div", {
      className: "w-full grid gap-3",
      children: [
        s.jsxs("span", {
          className: "txt__03 el__sub_title_my_restaurants_form",
          children: [
            s.jsx(st, { className: "h-[35px] w-[35px]" }),
            "Dish name",
          ],
        }),
        s.jsx("div", {
          className: "w-full grid grid-cols-1 sm:grid-cols-2",
          children: s.jsx(se, {
            field: { ...ns, field: `items.${t}.name` },
            register: a,
            errors: n,
            indexForm: t,
          }),
        }),
      ],
    });
  },
  Ic = ({ formContext: e, indexForm: t }) => {
    const {
        register: a,
        formState: { errors: n },
      } = e,
      r = (l) => (+l < 0.01 ? "Price must up greater than $0.01" : !0);
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-5",
      children: [
        s.jsxs("div", {
          className:
            "txt__03 flex flex-wrap items-center gap-5 text-orange-500",
          children: [
            s.jsxs("span", {
              className: "txt__03 flex items-center gap-5 text-orange-500",
              children: [
                s.jsx(at, { className: "h-[35px] w-[35px]" }),
                "Dish price and",
              ],
            }),
            s.jsxs("span", {
              className: "txt__03 flex items-center gap-5 text-orange-500",
              children: [
                s.jsx(q, { className: "h-[35px] w-[35px]" }),
                "Dish quantity",
              ],
            }),
          ],
        }),
        s.jsx("div", {
          className: "w-full grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-5",
          children: Jt.map((l) =>
            s.jsx(
              se,
              {
                field: { ...l, field: `items.${t}.${l.field}` },
                register: a,
                errors: n,
                indexForm: t,
                customValidate: l.field === "price" ? r : void 0,
              },
              l.id
            )
          ),
        }),
      ],
    });
  },
  Rc = ({ formContext: e, indexForm: t, removeForm: a }) =>
    s.jsxs("div", {
      className:
        "w-full grid grid-cols-1 border-2 rounded-xl border-orange-500 p-5 py-8 gap-5 relative",
      children: [
        t !== 0 &&
          s.jsx("div", {
            className: "justify-self-end sm:absolute top-5 right-5",
            children: s.jsx(oe, { txt: "Remove", handleDelete: () => a(t) }),
          }),
        s.jsx(Ec, { formContext: e, indexForm: t }),
        s.jsx(Cc, { formContext: e, indexForm: t }),
        s.jsx(Ic, { formContext: e, indexForm: t }),
      ],
    }),
  ea = ({ formContext: e, handleSave: t, isPending: a, restInfo: n }) => {
    const [r, l] = m.useState(!0),
      i = T(),
      { control: o, watch: c } = e,
      { fields: d, append: u, remove: x } = gs({ control: o, name: "items" });
    m.useEffect(() => {
      const f = c((p) => {
        var _, v;
        const j = (_ = p.items) == null ? void 0 : _[d.length - 1];
        let w = !((v = j == null ? void 0 : j.images) != null && v.length);
        for (const D of Pc) {
          const N = j == null ? void 0 : j[D.field];
          if (!D.reg.test(N)) {
            w = !0;
            break;
          }
        }
        l(w);
      });
      return () => f.unsubscribe();
    }, [d, c]);
    const g = () => {
        u({ name: "", price: "", quantity: "", images: [] }), l(!0);
      },
      h = (f) => {
        d.length > 1 && (x(f), l(!1));
      };
    return s.jsxs("form", {
      className: "w-full grid grid-cols-1 gap-5",
      children: [
        s.jsx(Sc, { restInfo: n, formContext: e }),
        d.map((f, p) =>
          s.jsx(
            Rc,
            { formContext: e, restInfo: n, indexForm: p, removeForm: h },
            p
          )
        ),
        s.jsx("div", {
          className:
            "w-full max-w-[250px] justify-self-center justify-center flex mt-5",
          children: s.jsx(G, {
            label: i.pathname === "/my-dishes/add-dish" ? "Create" : "Update",
            type: "submit",
            handleClick: t,
            isPending: a,
          }),
        }),
        /^\/(my-dishes)\/(add-dish)/.test(i.pathname) &&
          (d == null ? void 0 : d.length) < 20 &&
          s.jsx("div", {
            className: "w-full max-w-[150px] justify-self-start",
            children: s.jsx(K, {
              type: "button",
              label: "Add",
              styleTxt: "txt__02",
              handleClick: g,
              isDisabled: a || r,
            }),
          }),
      ],
    });
  },
  Ac = () => {
    L();
    const {
      isPendingIds: e,
      formContext: t,
      restInfo: a,
      isSuccessIds: n,
      handleSave: r,
      isPending: l,
      errorIds: i,
    } = Nc();
    return e
      ? s.jsx(z, {})
      : s.jsxs("div", {
          className: "w-full grid grid-cols-1 gap-5 justify-items-center",
          children: [
            s.jsx("span", { className: "txt__04", children: "Add Dish" }),
            n
              ? s.jsx(de, {
                  ...t,
                  children: s.jsx(ea, {
                    formContext: t,
                    restInfo: a,
                    handleSave: r,
                    isPending: l,
                  }),
                })
              : s.jsx(ne, { err: i }),
          ],
        });
  },
  Os = ({ cbMutation: e, setSelected: t }) => {
    const a = Z(),
      { popup: n, setPopup: r } = Ne(),
      { showToastMsg: l } = A(),
      { handleErrAPI: i } = I(),
      { mutate: o, isPending: c } = P({
        mutationFn: () => (r({ ...n, isPending: !0 }), e()),
        onSuccess: () => {
          l("Dishes Deleted successfully", "SUCCESS"),
            t([]),
            a.resetQueries({ queryKey: ["myDishesSearch"] });
        },
        onError: (u) => i({ err: u }),
        onSettled: () => r(null),
      });
    return { handleDelete: () => o(), isPending: c };
  },
  Dc = () => {
    const [e, t] = m.useState([]),
      { formContextMyDishesSearch: a } = fe(),
      { setPopup: n } = Ne(),
      {
        formVals: r,
        handleSave: l,
        handleClear: i,
        propsBlock: o,
        data: c,
        closeAllDrop: d,
        ...u
      } = Ke({ formCtx: a, key: "myDishesSearch", cbAPI: gc }),
      x = (v) =>
        t((D) => (D.includes(v) ? D.filter((N) => N !== v) : [...D, v])),
      g = () => t([]),
      { handleDelete: h, isPending: f } = Os({
        cbMutation: () => jc(e),
        setSelected: t,
      }),
      p = () =>
        n({
          txt: `delete ${e.length} dish${e.length > 1 ? "es" : ""} ?`,
          greenLabel: "I changes idea",
          redLabel: "Delete dishes",
          confirmAction: h,
          isPending: f,
        }),
      { handleDelete: j, isPending: w } = Os({
        cbMutation: () => wc(ht(r)),
        setSelected: t,
      }),
      _ = () => {
        var v;
        (v = c == null ? void 0 : c.dishes) != null &&
          v.length &&
          t(c.dishes.map((D) => D._id)),
          n({
            txt: `delete ${c == null ? void 0 : c.nHits} dish${
              (c == null ? void 0 : c.nHits) > 1 ? "es" : ""
            } ?`,
            redLabel: "Delete dishes",
            confirmAction: j,
            isPending: w,
          });
      };
    return {
      propsForm: {
        handleSave: l,
        handleClear: i,
        formContext: a,
        isPending: u.isPending,
      },
      propsBlock: o,
      data: c,
      toggleSelected: x,
      selected: e,
      clearSelected: g,
      handleOpenPopup: p,
      handleOpenPopupBulkQuery: _,
      closeAllDrop: d,
      ...u,
    };
  },
  Tc = (e) => ({ id: y(), label: "Categories", icon: Ka, vals: e }),
  Fc = (...e) =>
    [
      { label: "Price", val: W({ price: e[0] }), icon: nt },
      { label: "Quantity", val: e[1], icon: q },
    ].map((t) => ({ ...t, id: y() })),
  kc = ({ dish: e, toggleSelected: t, selected: a }) => {
    const [n, r] = m.useState(!1);
    return s.jsxs("div", {
      className: `card__el_grid ${
        a.includes(e._id)
          ? "border-red-600 opacity-50 scale-105"
          : "border-orange-500"
      }`,
      children: [
        s.jsxs("div", {
          className: "w-full flex flex-col",
          children: [
            s.jsx(Lt, { id: e._id }),
            s.jsx(Vt, { images: e.images, name: e.name }),
            s.jsxs("div", {
              className: "w-full grid grid-cols-1",
              children: [
                s.jsx(B, {
                  isOpen: n,
                  setIsOpen: r,
                  txt: "Restaurant",
                  Icon: ps,
                  customStyle: "px-3 border-b-2 border-orange-500 py-1",
                }),
                s.jsxs("ul", {
                  className: `w-full el__flow grid grid-cols-1 gap-3 px-3 ${
                    n
                      ? "opacity-100 max-h-[500px] pointer-events-auto pt-3"
                      : "opacity-0 max-h-0 pointer-events-none"
                  }`,
                  children: [
                    s.jsxs("li", {
                      className: "w-full grid grid-cols-[80px_1fr]",
                      children: [
                        s.jsxs("div", {
                          className:
                            "w-full flex gap-5 justify-start items-center",
                          children: [
                            s.jsx(Za, { className: "icon__base" }),
                            s.jsx("span", {
                              className: "txt__01",
                              children: "Name",
                            }),
                          ],
                        }),
                        s.jsx("span", {
                          className: "txt__01 justify-self-end",
                          children: e.restaurantName,
                        }),
                      ],
                    }),
                    s.jsxs("li", {
                      className: "w-full grid grid-cols-[80px_1fr]",
                      children: [
                        s.jsxs("div", {
                          className:
                            "w-full flex gap-5 justify-start items-center",
                          children: [
                            s.jsx(q, { className: "icon__base" }),
                            s.jsx("span", {
                              className: "txt__01",
                              children: "Id",
                            }),
                          ],
                        }),
                        s.jsx("div", {
                          className: "flex w-full justify-end",
                          children: s.jsx(kt, {
                            txt: e.restaurant,
                            label: "Id",
                          }),
                        }),
                      ],
                    }),
                    s.jsx("div", {
                      className: "-mx-3",
                      children: s.jsx(Ge, { el: Tc(e.categories) }),
                    }),
                  ],
                }),
                s.jsx("ul", {
                  className: "w-full grid grid-cols-1 gap-2 px-3",
                  children: Fc(e.price, e.quantity).map((l, i) =>
                    s.jsxs(
                      "li",
                      {
                        className:
                          "w-full grid grid-cols-[80px_1fr] first:pt-2",
                        children: [
                          s.jsxs("div", {
                            className: "w-full flex gap-5 items-center",
                            children: [
                              s.jsx(l.icon, { className: "icon__base" }),
                              s.jsx("span", {
                                className: "txt__01",
                                children: l.label,
                              }),
                            ],
                          }),
                          s.jsx("span", {
                            className: "txt__01 justify-self-end",
                            children: l.val,
                          }),
                        ],
                      },
                      i
                    )
                  ),
                }),
              ],
            }),
          ],
        }),
        s.jsxs("div", {
          className: "w-full grid grid-cols-2 mt-5 items-center",
          children: [
            s.jsxs(H, {
              to: `/my-dishes/update/${e._id}`,
              className:
                "el__flow el__after_below txt__02 justify-self-center w-fit flex gap-3 group cursor-pointer",
              children: [
                s.jsx(Wa, {
                  className: "icon__base el__flow group-hover:text-orange-500",
                }),
                s.jsx("span", {
                  className: "el__flow txt__02 group-hover:text-orange-500",
                  children: "Update",
                }),
              ],
            }),
            s.jsx("div", {
              className: "w-fit justify-self-center",
              children: s.jsx(oe, {
                txt: "Delete",
                border: !1,
                handleDelete: () => t(e._id),
              }),
            }),
          ],
        }),
      ],
    });
  },
  Lc = () => {
    L();
    const {
        propsForm: e,
        propsBlock: t,
        data: a,
        toggleSelected: n,
        selected: r,
        clearSelected: l,
        handleOpenPopup: i,
        handleOpenPopupBulkQuery: o,
        isError: c,
        error: d,
        isSuccess: u,
        isPending: x,
        closeAllDrop: g,
      } = Dc(),
      { watch: h } = e.formContext,
      f = h("search"),
      p = h("searchVals"),
      { totDocuments: j, nHits: w, dishes: _ } = a ?? {};
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 justify-items-center gap-5",
      children: [
        s.jsx("span", { className: "txt__04", children: "My Dishes" }),
        s.jsx(de, {
          ...e.formContext,
          children: s.jsx(Ts, {
            ...e,
            searchFields: $t,
            filters: Mt,
            sorters: Ds,
            closeAllDrop: g,
          }),
        }),
        u &&
          s.jsx(Fs, {
            nHits: w,
            totDocuments: j,
            search: f,
            searchVal: p == null ? void 0 : p[0],
          }),
        !!(r != null && r.length) &&
          s.jsxs("div", {
            className:
              "w-full grid grid-cols-1 sm:grid-cols-2 mt-3 px-3 gap-4 justify-items-start sm:justify-items-center",
            children: [
              s.jsx("div", {
                className:
                  "w-full flex gap-5 border-2 border-red-600 rounded-xl py-2 px-4 pr-6 max-w-fit items-center",
                children: s.jsxs("span", {
                  className: "txt__02",
                  children: ["Items selected: ", r.length],
                }),
              }),
              s.jsx("button", {
                onClick: l,
                className:
                  "w-full flex gap-5 border-2 border-green-600 rounded-xl py-2 px-4 pr-6 max-w-fit el__flow hover:text-green-600 hover:scale-110 cursor-pointer items-center",
                children: s.jsx("span", {
                  className: "txt__02",
                  children: "Cancel operation",
                }),
              }),
              s.jsx("div", {
                className: "w-fit",
                children: s.jsx(oe, {
                  txt: "Delete selected",
                  handleDelete: i,
                }),
              }),
              s.jsx("div", {
                className: "w-fit",
                children: s.jsx(oe, {
                  txt: "Delete results searched",
                  handleDelete: o,
                }),
              }),
            ],
          }),
        x
          ? s.jsx(z, {})
          : c
          ? s.jsx(ne, { err: d })
          : !!(_ != null && _.length) &&
            s.jsx("div", {
              className: "container__cards",
              children: _.map((v) =>
                s.jsx(kc, { dish: v, toggleSelected: n, selected: r }, v._id)
              ),
            }),
        s.jsx(He, { ...t, totPages: a == null ? void 0 : a.totPages }),
      ],
    });
  },
  Uc = () => {
    const { formContextMyDishesUpdate: e, formContextMyDishesSearch: t } = fe(),
      { handleErrAPI: a } = I(),
      { showToastMsg: n } = A(),
      { setPopup: r, popup: l } = Ne(),
      { setValue: i, reset: o } = e,
      c = Ae(),
      d = F(),
      u = c == null ? void 0 : c.dishId,
      x = J.test(u ?? ""),
      { isPendingIds: g, restInfo: h, isSuccessIds: f } = Wt(),
      {
        data: p,
        isPending: j,
        isSuccess: w,
        isError: _,
        error: v,
      } = ae({
        queryKey: ["myDishInfo", u],
        queryFn: () => hc(u ?? ""),
        enabled: x,
      });
    m.useEffect(() => {
      (() => {
        if (_) a({ err: v });
        else if (w && Object.keys(p ?? {}).length) {
          const {
            dish: {
              name: U = "",
              price: re = 0,
              quantity: $ = 0,
              images: me = [],
              restaurant: ye = "",
            } = {},
          } = p ?? {};
          o({
            restaurant: ye,
            items: [{ name: U, price: re + "", quantity: $ + "", images: me }],
          });
        }
      })();
    }, [a, w, _, v, p, u, i, o]);
    const { mutate: D, isPending: N } = P({
        mutationFn: ({ formData: R, id: U }) => yc({ formData: R, id: U }),
        onSuccess: (R) => {
          n("Dish updated successfully", "SUCCESS");
          const { setValue: U } = t;
          U("searchVals", ["id"]),
            U("search", R.dishId),
            U("updatedAtSort", ["desc"]),
            d("/my-dishes", { replace: !0 }),
            o();
        },
        onError: (R) => {
          a({ err: R });
        },
      }),
      S = e.handleSubmit((R) => {
        const U = or(R);
        D({ formData: U, id: u ?? "" });
      }),
      { mutate: O, isPending: E } = P({
        mutationFn: () => (r({ ...l, isPending: !0 }), fc(u ?? "")),
        onSuccess: () => {
          var U;
          n("Dish deleted successfully", "SUCCESS");
          const { setValue: R } = t;
          R("searchVals", ["restaurantId"]),
            R(
              "search",
              ((U = p == null ? void 0 : p.dish) == null
                ? void 0
                : U.restaurant) ?? ""
            ),
            d("/my-dishes", { replace: !0 }),
            o();
        },
        onError: (R) => {
          a({ err: R });
        },
        onSettled: () => r(null),
      }),
      Y = () => {
        O();
      },
      ee = () => {
        r({
          txt: "delete this dish ?",
          greenLabel: "I change idea",
          redLabel: "Delete dish",
          isPending: E,
          confirmAction: Y,
        });
      };
    return {
      formContext: e,
      handleSave: S,
      isPendingPage: g || j,
      restInfo: h,
      isSuccess:
        f && w && Object.keys((p == null ? void 0 : p.dish) ?? {}).length,
      canStay: x,
      handleOpenPopup: ee,
      isPending: N,
      errorInfo: v,
    };
  },
  Vc = () => {
    L();
    const {
      formContext: e,
      handleSave: t,
      isPendingPage: a,
      restInfo: n,
      isSuccess: r,
      canStay: l,
      handleOpenPopup: i,
      isPending: o,
      errorInfo: c,
    } = Uc();
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-5 justify-items-center",
      children: [
        s.jsx("span", { className: "txt__04", children: "Update Dish" }),
        r &&
          s.jsx("div", {
            className: "justify-self-start",
            children: s.jsx(oe, { txt: "Delete Dish", handleDelete: i }),
          }),
        l
          ? a
            ? s.jsx(z, {})
            : r
            ? s.jsx(de, {
                ...e,
                children: s.jsx(ea, {
                  formContext: e,
                  handleSave: t,
                  restInfo: n,
                  isPending: o,
                }),
              })
            : s.jsx(ne, { err: c })
          : s.jsx(M, { to: "/", replace: !0 }),
      ],
    });
  },
  $c = () => s.jsx(he, {}),
  Mc = ({ formContext: e, i: t, fieldHook: a }) => {
    var c, d, u, x;
    const {
        register: n,
        formState: { errors: r },
      } = e,
      l = t || t === 0 ? `items.${t}.search` : "search",
      i =
        t || t === 0
          ? (u =
              (d =
                (c = r == null ? void 0 : r.items) == null ? void 0 : c[t]) ==
              null
                ? void 0
                : d.search) == null
            ? void 0
            : u.message
          : (x = r == null ? void 0 : r.search) == null
          ? void 0
          : x.message,
      { place: o } = Bt({
        customFilter: (g) => {
          var h, f, p;
          return (p =
            (f =
              (h = g.filter(
                (j) => j.field === (a == null ? void 0 : a.searchVal)
              )) == null
                ? void 0
                : h[0]) == null
              ? void 0
              : f.label) == null
            ? void 0
            : p.toLowerCase();
        },
      });
    return s.jsxs("div", {
      className: "w-full flex flex-col gap-3",
      children: [
        s.jsxs("label", {
          className:
            "w-full grid grid-cols-1 justify-items-start gap-2 relative",
          children: [
            s.jsx("input", {
              type: "text",
              placeholder: o,
              className:
                "focus__base el__flow outline-none border-2 border-orange-500 rounded-full w-full px-5 pr-14 py-2 txt__01",
              ...n(l, {
                pattern: {
                  value: Oe,
                  message: "Invalid search length or chars 🥸",
                },
              }),
            }),
            s.jsx(rt, {
              className:
                "absolute top-1/2 -translate-y-1/2 right-[20px] w-[25px] h-[25px] text-orange-500 pointer-events-none",
            }),
          ],
        }),
        i && s.jsx("span", { className: "txt__01 text-red-600", children: i }),
      ],
    });
  },
  Oc = ({
    searchFields: e,
    formContext: t,
    append: a,
    remove: n,
    fields: r,
    closeAllDrop: l,
  }) => {
    const [i, o] = m.useState(!1),
      { register: c, watch: d, setValue: u } = t,
      x = d("searchVals"),
      g = (h) => {
        (x ?? []).includes(h)
          ? (u(
              "searchVals",
              d("searchVals").filter((f) => f !== h)
            ),
            n(r.findIndex((f) => f.searchVal === h)))
          : (u("searchVals", [...x, h]), a({ searchVal: h, search: "" }));
      };
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1",
      children: [
        s.jsx(B, {
          isOpen: i,
          setIsOpen: o,
          txt: "Text",
          Icon: lt,
          closeAllDrop: l,
        }),
        s.jsx("div", {
          className: `w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 transition-all duration-300 ${
            i
              ? "max-h-[700px] opacity-100 pointer-events-auto py-2"
              : "opacity-0 max-h-0 pointer-events-none"
          }`,
          children:
            !!(e != null && e.length) &&
            e.map((h) =>
              s.jsx(zt, { register: c, el: h, watch: d, handleChange: g }, h.id)
            ),
        }),
      ],
    });
  },
  qc = ({ formContext: e, filters: t, children: a, closeAllDrop: n }) => {
    const [r, l] = m.useState(!1),
      i = T();
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 gap-3 mt-5",
      children: [
        s.jsx(B, {
          txt: "Filter by",
          Icon: it,
          isOpen: r,
          setIsOpen: l,
          closeAllDrop: n,
          customStyle: "pb-1 border-b-[3px] border-orange-500",
        }),
        s.jsxs("div", {
          className: `w-full grid grid-cols-1 pb-3 transition-all duration-300 gap-2 ${
            r
              ? "max-h-[2000px] opacity-100 pointer-events-auto"
              : "opacity-0 max-h-0 pointer-events-none"
          }`,
          children: [
            a,
            /^\/(my-dishes).*/.test(i.pathname) &&
              s.jsx(Gt, { formContext: e, closeAllDrop: n }),
            !!(t != null && t.length) &&
              t.map((o) =>
                s.jsx(Qt, { field: o, formContext: e, closeAllDrop: n }, o.id)
              ),
          ],
        }),
      ],
    });
  },
  Bc = ({
    searchFields: e,
    formContext: t,
    sorters: a,
    filters: n,
    handleSave: r,
    handleClear: l,
    isPending: i,
    closeAllDrop: o,
  }) => {
    const c = m.useRef(!1),
      d = T().pathname,
      { control: u } = t,
      { fields: x, append: g, remove: h } = gs({ control: u, name: "items" });
    return (
      m.useEffect(() => {
        !x.length &&
          x.length + 1 < 2 &&
          !c.current &&
          /^\/search\/?$/.test(d) &&
          ((c.current = !0), g({ search: "", searchVal: "name" }));
      }, [x, d, g]),
      t
        ? s.jsxs("form", {
            className:
              "w-full max-w-[90%] border-[3px] border-orange-500 rounded-xl p-6",
            children: [
              s.jsxs("div", {
                className: "w-full grid grid-cols-1",
                children: [
                  s.jsx("div", {
                    className: "w-full grid grid-cols-1 gap-4",
                    children: x.map((f, p) =>
                      m.createElement(Mc, {
                        formContext: t,
                        i: p,
                        fieldHook: x == null ? void 0 : x[p],
                        key: p,
                      })
                    ),
                  }),
                  s.jsx(qc, {
                    formContext: t,
                    searchFields: e,
                    filters: n,
                    closeAllDrop: o,
                    children: s.jsx(Oc, {
                      append: g,
                      remove: h,
                      fields: x,
                      formContext: t,
                      searchFields: e,
                      closeAllDrop: o,
                    }),
                  }),
                  s.jsx(Yt, { formContext: t, sorters: a, closeAllDrop: o }),
                ],
              }),
              s.jsxs("div", {
                className: "w-full grid grid-cols-2 mt-5",
                children: [
                  s.jsx("div", {
                    className:
                      "sm:w-full justify-self-start w-[30vw] sm:max-w-[200px] sm:justify-self-center",
                    children: s.jsx(K, {
                      type: "submit",
                      label: "Search",
                      styleBtn: "text-green-600",
                      styleTxt: "text-green-600 txt__02",
                      handleClick: r,
                      isPending: i,
                    }),
                  }),
                  s.jsx("div", {
                    className:
                      "sm:w-full justify-self-end w-[30vw] sm:max-w-[200px] sm:justify-self-center",
                    children: s.jsx(K, {
                      type: "button",
                      label: "Clear",
                      styleBtn: "text-red-600",
                      styleTxt: "text-red-600 txt__02",
                      handleClick: l,
                      isDisabled: i,
                    }),
                  }),
                ],
              }),
            ],
          })
        : null
    );
  },
  Qc = async (e) => X(() => b.get(`/search?${e}`)),
  zc = async (e) => X(() => b.get(`/search/${e}`)),
  Gc = async (e, t) => X(() => b.get(`/search/dishes/${t}?${e}`)),
  Yc = ({ rest: e }) =>
    s.jsxs("div", {
      className: "card__el border-orange-500 relative",
      children: [
        e.isAdmin &&
          s.jsxs(H, {
            to: `/my-restaurants/${e._id}`,
            className:
              "absolute min-w-[150px] min-h-[50px] border-2 border-orange-500 rounded-xl bg-[#000] top-0 -translate-y-1/2 -right-6 z-20 flex gap-5 items-center px-3 pr-10 group cursor-pointer",
            children: [
              s.jsx(be, {
                className: "icon__base el__flow group-hover:text-orange-500",
              }),
              s.jsx("span", {
                className: "txt__02 el__flow group-hover:text-orange-500",
                children: "Admin page",
              }),
            ],
          }),
        s.jsx(Rs, { name: e.name }),
        s.jsxs("div", {
          className:
            "sm:grid grid-cols-2 place-items-center place-content-center",
          children: [
            s.jsx("div", {
              className:
                "flex w-full sm:w-[90%] sm:h-[90%] sm:py-3 items-center sm:border-2 border-orange-500 rounded-xl",
              children: s.jsx(Is, { images: e.images }),
            }),
            s.jsx("div", {
              className: "w-full grid grid-cols-1",
              children: s.jsx("div", {
                className: "pt-3 w-full el__flow grid grid-cols-1 gap-3",
                children: s.jsx(Ye, { rest: e, Container: Ge }),
              }),
            }),
          ],
        }),
        s.jsx("div", {
          className:
            "w-full max-w-fit justify-center justify-self-center flex mt-5",
          children: s.jsx(H, {
            to: `/search/${e._id}`,
            className:
              "txt__02 border-2 border-orange-500 rounded-xl px-12 py-1 el__flow hover:text-orange-500 hover:scale-110 cursor-pointer",
            children: "View Menu",
          }),
        }),
      ],
    }),
  Hc = () => {
    L();
    const { formContextSearchRestAllUsers: e } = fe(),
      {
        handleSave: t,
        handleClear: a,
        propsBlock: n,
        data: r,
        isPending: l,
        isError: i,
        error: o,
        isSuccess: c,
        closeAllDrop: d,
      } = Ke({
        formCtx: e,
        key: "searchAllUsersRest",
        cbAPI: Qc,
        cbProcessForm: lr,
      }),
      { watch: u } = e,
      x = u("items"),
      g =
        (x == null ? void 0 : x.length) &&
        x.filter((_) => !!(_ != null && _.search)),
      h = g == null ? void 0 : g[(g == null ? void 0 : g.length) - 1],
      { totDocuments: f, nHits: p, totPages: j, restaurants: w } = r ?? {};
    return s.jsxs("div", {
      className: "w-full grid grid-cols-1 justify-items-center gap-5",
      children: [
        s.jsx(de, {
          ...e,
          children: s.jsx(Bc, {
            searchFields: Ot,
            filters: ji,
            sorters: wi,
            formContext: e,
            isPending: l,
            handleSave: t,
            handleClear: a,
            closeAllDrop: d,
          }),
        }),
        c &&
          s.jsx(Fs, {
            nHits: p,
            totDocuments: f,
            search: h == null ? void 0 : h.search,
            searchVal: h == null ? void 0 : h.searchVal,
          }),
        l
          ? s.jsx(z, {})
          : i
          ? s.jsx(ne, { err: o })
          : !!(w != null && w.length) &&
            s.jsx("div", {
              className: "container__cards",
              children: w.map((_) => s.jsx(Yc, { rest: _ }, _._id)),
            }),
        s.jsx(He, { ...n, totPages: j }),
      ],
    });
  },
  sa = () =>
    s.jsx("div", {
      className:
        "w-[40px] h-[40px] border-[3px] border-orange-500 rounded-full border-l-transparent border-r-transparent mini_spinner",
    }),
  ta = ({ dish: e }) => {
    const t = Z(),
      { handleErrAPI: a } = I(),
      { showToastMsg: n } = A(),
      { isLogged: r } = k(),
      l = e && "dishId" in e ? e.dishId : e == null ? void 0 : e._id,
      { mutate: i, isPending: o } = P({
        mutationFn: (d) =>
          d === "inc"
            ? Bn({ dishId: l })
            : d === "dec"
            ? Qn({ dishId: l })
            : d === "del-item"
            ? zn({ dishId: l })
            : null,
        onSuccess: (d) => {
          n((d == null ? void 0 : d.msg) ?? "", "SUCCESS");
        },
        onError: (d) => a({ err: d }),
        onSettled: () => t.resetQueries({ queryKey: ["myCart"] }),
      });
    return { handleClickCart: (d) => (r ? i(d) : null), isPending: o };
  },
  Kc = ({ dish: e }) => {
    var D;
    const [t, a] = m.useState(0),
      n = m.useRef(null),
      [r, l] = m.useState(!1),
      i = Z(),
      { handleErrAPI: o } = I(),
      { showToastMsg: c } = A(),
      { isLogged: d } = k(),
      { cart: u, cartNonLogged: x } = Se(),
      g = d ? u : x,
      h = we(g)
        ? (D = g == null ? void 0 : g.items.find((N) => N.dishId === e._id)) ==
          null
          ? void 0
          : D.quantity
        : null,
      f = () => {
        n != null &&
          n.current &&
          (clearInterval(n.current), (n.current = null)),
          l(!0);
      },
      p = (N) => {
        f(),
          (n.current = setInterval(() => {
            a((S) =>
              N(S) ? S + 1 : (clearInterval(n.current), (n.current = null), S)
            );
          }, 150));
      },
      j = () => {
        f(),
          (n.current = setInterval(() => {
            a((N) =>
              N <= 1 ? (clearInterval(n.current), (n.current = null), N) : N - 1
            );
          }, 150));
      },
      { isPending: w, mutate: _ } = P({
        mutationFn: ({ dishId: N, quantity: S }) =>
          Hn({ dishId: N, quantity: S }),
        onSuccess: () => c("Cart updated ✌🏼", "SUCCESS"),
        onError: (N) => o({ err: N }),
        onSettled: () => i.resetQueries({ queryKey: ["myCart"] }),
      });
    return {
      localQty: t,
      setLocalQty: a,
      handleAddInt: p,
      handleDecInt: j,
      handleMouseUp: (N) => {
        n != null &&
          n.current &&
          (clearInterval(n.current), (n.current = null)),
          r && (l(!1), t === h ? N() : _({ dishId: e._id, quantity: t }));
      },
      isPendingInt: w,
      qtyItem: h,
    };
  },
  Zc = ({ dish: e }) => {
    var j;
    const { isLogged: t } = k(),
      { cart: a, cartNonLogged: n } = Se(),
      { handleClickCart: r, isPending: l } = ta({ dish: e }),
      {
        handleAddInt: i,
        handleDecInt: o,
        handleMouseUp: c,
        isPendingInt: d,
        localQty: u,
        setLocalQty: x,
      } = Kc({ dish: e }),
      g = l || d,
      h = t ? a : n,
      f = we(h)
        ? (j = h == null ? void 0 : h.items.find((w) => w.dishId === e._id)) ==
          null
          ? void 0
          : j.quantity
        : null;
    let p = !0;
    return (
      (f || f === 0) && f >= e.quantity && (p = !1),
      m.useEffect(() => {
        x(f ?? 0);
      }, [f, x]),
      s.jsxs("div", {
        className: "w-full max-w-full grid grid-cols-[1fr_75px] mt-3",
        children: [
          s.jsxs("div", {
            className: "w-full flex gap-6 items-center justify-center",
            children: [
              s.jsx("button", {
                disabled: !e.quantity || !p || g,
                onMouseDown: () => i((w) => w < e.quantity),
                onMouseUp: () => c(() => r("inc")),
                onMouseLeave: () => c(() => r("inc")),
                className: "border-green-600 el__flow btn__icon group",
                children: s.jsx(Xa, {
                  className:
                    "group-hover:text-green-600 el__flow btn__icon_icon",
                }),
              }),
              g
                ? s.jsx(sa, {})
                : s.jsx("span", {
                    className: "txt__03",
                    children: u !== f ? u : f,
                  }),
              s.jsx("button", {
                onMouseDown: o,
                onMouseUp: () => c(() => r("dec")),
                onMouseLeave: () => c(() => r("dec")),
                disabled: !f || f === 1 || g,
                className: "border-yellow-600 el__flow btn__icon group",
                children: s.jsx(Ja, {
                  className:
                    "btn__icon_icon  group-hover:text-yellow-600 el__flow",
                }),
              }),
            ],
          }),
          s.jsx("button", {
            onClick: () => r("del-item"),
            disabled: !f || l,
            className:
              "btn__icon el__flow border-red-600   justify-self-end group",
            children: s.jsx(ve, {
              className: "btn__icon_icon el__flow  group-hover:text-red-600",
            }),
          }),
        ],
      })
    );
  },
  Wc = ({ dish: e, isAdmin: t }) =>
    s.jsxs("div", {
      className: "card__el border-orange-500 relative",
      children: [
        t &&
          s.jsxs(H, {
            to: `/my-dishes/update/${e._id}`,
            className:
              "absolute min-w-[150px] min-h-[50px] border-2 border-orange-500 rounded-xl bg-[#000] top-0 -translate-y-1/2 -right-6 z-20 flex gap-5 items-center px-3 pr-10 group cursor-pointer",
            children: [
              s.jsx(be, {
                className: "icon__base el__flow group-hover:text-orange-500",
              }),
              s.jsx("span", {
                className: "txt__02 el__flow group-hover:text-orange-500",
                children: "Update dish",
              }),
            ],
          }),
        s.jsx(Rs, { name: e.name }),
        s.jsxs("div", {
          className:
            "sm:grid grid-cols-2 place-items-center place-content-center",
          children: [
            s.jsx("div", {
              className:
                "flex w-full sm:w-[90%] sm:h-[90%] sm:py-3 items-center sm:border-2 border-orange-500 rounded-xl",
              children: s.jsx(Is, { images: e.images }),
            }),
            s.jsxs("ul", {
              className:
                "w-full grid grid-cols-1 gap-4 px-3 pr-6 sm:py-1 self-start",
              children: [
                Si(e.price, e.quantity).map((a, n) =>
                  s.jsxs(
                    "li",
                    {
                      className: "w-full grid grid-cols-[1fr_50px] first:pt-2",
                      children: [
                        s.jsxs("div", {
                          className: "w-full flex gap-5 items-center",
                          children: [
                            s.jsx(a.icon, { className: "icon__base" }),
                            s.jsx("span", {
                              className: "txt__01",
                              children: a.label,
                            }),
                          ],
                        }),
                        s.jsx("span", {
                          className: "txt__01 justify-self-end",
                          children: a.val,
                        }),
                      ],
                    },
                    n
                  )
                ),
                s.jsx(Zc, { dish: e }),
              ],
            }),
          ],
        }),
      ],
    }),
  Xc = ({
    nHits: e,
    totDocuments: t,
    minPrice: a,
    maxPrice: n,
    minQuantity: r,
    maxQuantity: l,
    errors: i,
  }) => {
    let o = "";
    if (!(i != null && i.minPrice) && !(i != null && i.maxPrice)) {
      a && (o += ` above ${W({ price: +a })}`);
      const c = W({ price: +n || 0 });
      n && (o += ` ${a && n ? "and" : ""} below ${c}`);
    }
    return (
      !(i != null && i.minQuantity) &&
        !(i != null && i.maxQuantity) &&
        (r && (o += ` ${a || n ? ", " : ""}above ${r}`),
        l && (o += `${r ? " and" : a || n ? ", " : " "} below ${l}`)),
      s.jsx("div", {
        className: "w-full grid grid-cols-1",
        children: t
          ? e
            ? s.jsxs("div", {
                className: "w-full flex gap-5 items-center mt-[25px]",
                children: [
                  s.jsx(ct, { className: "min-w-[35px] min-h-[35px]" }),
                  s.jsxs("div", {
                    className: "w-fit flex gap-2 items-center",
                    children: [
                      s.jsxs("span", {
                        className: "txt__04",
                        children: [e, " "],
                      }),
                      s.jsxs("span", {
                        className: "txt__03",
                        children: ["Result", e > 1 ? "s" : "", o],
                      }),
                    ],
                  }),
                ],
              })
            : s.jsx("div", {
                className:
                  "w-full flex justify-self-center justify-center items-center mt-[50px]",
                children: s.jsxs("span", {
                  className: "txt__03",
                  children: ["Results Number(new String()) 🥸", o],
                }),
              })
          : s.jsx("div", {
              className:
                "w-full flex justify-self-center justify-center mt-[50px]",
              children: s.jsx("span", {
                className: "txt__03",
                children:
                  "This restaurant does not have dishes right now, they are strategically preparing 🧐",
              }),
            }),
      })
    );
  },
  Xe = { field: "quantity", msg: "Invalid quantity value", reg: xt },
  Jc = ({ dish: e }) => {
    const t = m.useRef(!1),
      a = Z(),
      { showToastMsg: n } = A(),
      { handleErrAPI: r } = I(),
      {
        register: l,
        setValue: i,
        formState: { errors: o },
        handleSubmit: c,
        getValues: d,
      } = V({
        mode: "onChange",
        defaultValues: { quantity: (e == null ? void 0 : e.quantity) + "" },
      });
    m.useEffect(() => {
      i("quantity", (e == null ? void 0 : e.quantity) + "");
    }, [e, i]);
    const { isPending: u, mutate: x } = P({
        mutationFn: (h) => Yn({ dishId: e.dishId, quantity: h }),
        onSuccess: () => {
          n("Cart updated", "SUCCESS"),
            a.resetQueries({ queryKey: ["myCart"] });
          const h = document.querySelectorAll(".input__blur");
          if (h != null && h.length) {
            let f = 0;
            do
              if (document.activeElement === h[f]) {
                h[f].blur();
                break;
              } else f++;
            while (f < h.length);
          }
        },
        onError: (h) => {
          r({ err: h }), i("quantity", (e == null ? void 0 : e.quantity) + "");
        },
        onSettled: () => (t.current = !1),
      }),
      g = c((h) => {
        t.current ||
          (+d("quantity") !== e.quantity && ((t.current = !0), x(h.quantity)));
      });
    return { register: l, errors: o, isPendingInputQTy: u, changeQtyInput: g };
  },
  eo = ({ item: e }) => {
    const { handleErrAPI: t } = I(),
      { handleClickCart: a, isPending: n } = ta({ dish: e }),
      {
        register: r,
        errors: l,
        isPendingInputQTy: i,
        changeQtyInput: o,
      } = Jc({ dish: e }),
      { data: c, mutate: d } = P({
        mutationFn: () => Kn({ dishId: e.dishId }),
        onError: (x) => t({ err: x }),
      }),
      u = () => d();
    return (
      console.log(c),
      s.jsxs("li", {
        className: "w-full grid gap-y-1 items-center md:grid-cols-2 gap-10",
        children: [
          s.jsxs("form", {
            onSubmit: o,
            className: "w-full flex gap-5 justify-between items-center",
            children: [
              s.jsx("span", { className: "txt__02", children: e.name }),
              s.jsx("span", {
                className: "txt__03 md:justify-self-start",
                children: "x",
              }),
              s.jsx("input", {
                step: "any",
                type: "number",
                className:
                  "txt__02 border-orange-500 border-2 outline-none rounded-xl focus__base el__flow px-3 py-[0.1rem] max-w-[100px] md:justify-self-start input__blur",
                ...r(Xe.field, {
                  pattern: { value: Xe.reg, message: Xe.msg },
                  validate: (x) => {
                    var g;
                    return +x >
                      (((g = c == null ? void 0 : c.dish) == null
                        ? void 0
                        : g.quantity) ?? 0)
                      ? "Dish not available"
                      : !0;
                  },
                }),
                onBlur: () => {
                  var x;
                  return (x = l == null ? void 0 : l.quantity) != null &&
                    x.message
                    ? null
                    : o;
                },
                onFocus: u,
              }),
            ],
          }),
          s.jsxs("div", {
            className: "w-full flex gap-5 justify-between items-center",
            children: [
              s.jsx("span", {
                className: "txt__02 justify-self-start",
                children: W({ price: e.price }),
              }),
              s.jsx("span", {
                className: "txt__02 justify-self-center",
                children: dr(e),
              }),
              n || i
                ? s.jsx("div", {
                    className: "justify-self-end",
                    children: s.jsx(sa, {}),
                  })
                : s.jsx("button", {
                    disabled: n,
                    onClick: () => a("del-item"),
                    className:
                      "w-fit p-1 border-2 border-red-600 rounded-xl group hover:scale-120 el__flow flex items-center justify-center cursor-pointer justify-self-end",
                    children: s.jsx(ve, {
                      className:
                        "min-w-[25px] min-h-[25px] group-hover:text-red-600 el__flow",
                    }),
                  }),
            ],
          }),
          (l == null ? void 0 : l.quantity) &&
            s.jsx("span", {
              className: "txt__01 text-red-600",
              children: l.quantity.message,
            }),
        ],
      })
    );
  },
  so = ({ cart: e, rest: t }) => {
    const a =
      ((e == null ? void 0 : e.totPrice) ?? 0) >= t.delivery.freeDeliveryPrice;
    return s.jsxs("div", {
      className: "w-full flex flex-col gap-2",
      children: [
        s.jsxs("div", {
          className: "w-full flex justify-between items-center",
          children: [
            s.jsx("span", {
              className: "txt__01",
              children: a ? "Total" : "Subtotal",
            }),
            s.jsx("span", {
              className: "txt__01",
              children: W({ price: (e == null ? void 0 : e.totPrice) ?? 0 }),
            }),
          ],
        }),
        !a &&
          s.jsxs(s.Fragment, {
            children: [
              s.jsxs("div", {
                className: "w-full flex justify-between items-center",
                children: [
                  s.jsx("span", { className: "txt__01", children: "Delivery" }),
                  s.jsx("span", {
                    className: "txt__01",
                    children: W({ price: t.delivery.price }),
                  }),
                ],
              }),
              s.jsxs("div", {
                className: "w-full flex justify-between items-center",
                children: [
                  s.jsx("span", { className: "txt__01", children: "Total" }),
                  s.jsx("span", {
                    className: "txt__01",
                    children: ur(
                      (e == null ? void 0 : e.totPrice) ?? 0,
                      t.delivery.price
                    ),
                  }),
                ],
              }),
            ],
          }),
      ],
    });
  },
  to = () => {
    const e = Z(),
      { showToastMsg: t } = A(),
      { handleErrAPI: a } = I(),
      { isLogged: n } = k(),
      { mutate: r, isPending: l } = P({
        mutationFn: Gn,
        onSuccess: (o) => {
          t((o == null ? void 0 : o.msg) ?? "", "SUCCESS");
        },
        onError: (o) => a({ err: o }),
        onSettled: () => e.resetQueries({ queryKey: ["myCart"] }),
      });
    return { handleDeleteCart: () => (n ? r() : null), isPending: l };
  },
  ao = ({ rest: e }) => {
    const {
        register: t,
        formState: { errors: a },
      } = V({ mode: "onChange" }),
      { cart: n, cartNonLogged: r } = Se(),
      { isLogged: l } = k(),
      { isPending: i, handleDeleteCart: o } = to(),
      c = l ? n : r;
    return (
      c &&
      we(n) &&
      s.jsxs("div", {
        className:
          "w-full grid grid-cols-1 gap-4 border-[3px] border-orange-500 rounded-xl p-6 mb-6",
        children: [
          s.jsx("span", {
            className: "txt__03 justify-self-center",
            children: "Your Order",
          }),
          s.jsx("ul", {
            className: "w-full grid gap-5",
            children: c.items.map((d) => s.jsx(eo, { item: d }, d.dishId)),
          }),
          s.jsx(so, { cart: c, rest: e }),
          s.jsxs("form", {
            className: "w-full grid gap-6",
            children: [
              s.jsx(se, { field: Ni, register: t, errors: a }),
              s.jsxs("div", {
                className:
                  "w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 sm:gap-0 sm:grid-cols-2 items-center",
                children: [
                  s.jsx("div", {
                    className: "w-[200px] justify-self-center flex ic",
                    children: s.jsx(G, {
                      label: "Checkout",
                      type: "button",
                      isDisabled: i,
                    }),
                  }),
                  s.jsx("div", {
                    className: "w-[200px] justify-self-center",
                    children: i
                      ? s.jsx(De, {})
                      : s.jsx(oe, { txt: "Clear", handleDelete: o }),
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  },
  no = () => {
    var ye;
    L();
    const { handleErrAPI: e } = I(),
      { cart: t, cartNonLogged: a } = Se(),
      { formContextSearchDishesAllUSers: n } = fe(),
      {
        watch: r,
        formState: { errors: l },
      } = n,
      i = r("minPrice"),
      o = r("maxPrice"),
      c = r("minQuantity"),
      d = r("maxQuantity"),
      u = (ye = Ae()) == null ? void 0 : ye.restId,
      x = J.test(u ?? ""),
      {
        data: g,
        isPending: h,
        isSuccess: f,
        isError: p,
        error: j,
      } = ae({
        queryKey: ["restAsUser", u],
        queryFn: () => zc(u ?? ""),
        enabled: x,
      });
    m.useEffect(() => {
      p && e({ err: j });
    }, [f, p, j, g, e]);
    const { restaurant: w } = g ?? {},
      {
        handleSave: _,
        handleClear: v,
        propsBlock: D,
        data: N,
        isPending: S,
        isError: O,
        error: E,
        isSuccess: Y,
        closeAllDrop: ee,
      } = Ke({
        formCtx: n,
        key: "myRestaurantsSearch",
        cbAPI: (ke) => Gc(ke, u ?? ""),
        cbProcessForm: ht,
      }),
      {
        dishes: R,
        totDocuments: U,
        totPages: re,
        nHits: $,
        isAdmin: me,
      } = N ?? {};
    return x
      ? h
        ? s.jsx(z, {})
        : p
        ? s.jsx(ne, { err: j })
        : w &&
          we(w) &&
          s.jsxs("div", {
            className: "w-full grid grid-cols-1 justify-items-center gap-5",
            children: [
              s.jsx("span", {
                className: "txt__04 truncate max-w-full",
                children: w.name,
              }),
              w.isAdmin &&
                s.jsxs(H, {
                  to: `/my-restaurants/${w._id}`,
                  className:
                    "justify-self-end border-2 border-orange-500 py-1 sm:py-2 px-4 pr-6 rounded-xl group flex gap-4 items-center hover:scale-110 el__flow cursor-pointer",
                  children: [
                    s.jsx(be, {
                      className:
                        "icon__base group-hover:text-orange-500 el__flow",
                    }),
                    s.jsx("span", {
                      className: "txt__02 group-hover:text-orange-500 el__flow",
                      children: "Admin page",
                    }),
                  ],
                }),
              s.jsx(ks, { images: w.images }),
              s.jsx("div", {
                className:
                  "w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-3 gap-x-6 items-start",
                children: s.jsx(Ye, { rest: w, Container: Ge }),
              }),
              (t || a) &&
                s.jsx("div", {
                  id: "summaryRestPage",
                  className: "w-full mt-6",
                  children: s.jsx(ao, {
                    rest: g == null ? void 0 : g.restaurant,
                  }),
                }),
              s.jsx(de, {
                ...n,
                children: s.jsx(Ts, {
                  formContext: n,
                  handleSave: _,
                  handleClear: v,
                  closeAllDrop: ee,
                  isPending: S,
                  sorters: bi,
                }),
              }),
              Y &&
                s.jsx(Xc, {
                  nHits: $,
                  totDocuments: U,
                  minPrice: i,
                  maxPrice: o,
                  minQuantity: c,
                  maxQuantity: d,
                  errors: l,
                }),
              S
                ? s.jsx(z, {})
                : O
                ? s.jsx(ne, { err: E })
                : !!(R != null && R.length) &&
                  s.jsx("div", {
                    className: "container__cards",
                    children: R.map((ke) =>
                      s.jsx(Wc, { dish: ke, isAdmin: me }, ke._id)
                    ),
                  }),
              s.jsx(He, { ...D, totPages: re }),
            ],
          })
      : s.jsx(M, { to: "/", replace: !0 });
  },
  ro = () => {
    var i;
    const [e] = te(),
      t = T(),
      { notice: a } = pn(),
      n = e.get("type"),
      r = (i = t == null ? void 0 : t.state) == null ? void 0 : i.from;
    return le(
      [
        "verify-account",
        "recover-pwd",
        "sentEmailUnsubscribe",
        "change-email",
        "change-pwd",
      ],
      n ?? ""
    ) &&
      le(
        [
          "/auth/register",
          "/auth/login",
          "/newsletter/notice-unsubscribe-with-retry",
          "/user/manage-account",
        ],
        r
      )
      ? s.jsx("div", {
          className: "w-full flex justify-center items-center",
          children: s.jsx("div", {
            className: "w-full flex flex-col items-center gap-30",
            children: a
              ? s.jsxs(s.Fragment, {
                  children: [
                    s.jsx("span", {
                      className: "txt__04 leading-10 lg:leading-16",
                      children: a.msg,
                    }),
                    s.jsx("div", {
                      className: "w-full flex justify-center items-center",
                      children:
                        a.type === "success"
                          ? s.jsx(Ie, { className: "notice text-red-600" })
                          : s.jsx(en, { className: "notice text-red-600" }),
                    }),
                  ],
                })
              : null,
          }),
        })
      : s.jsx(M, { to: "/", replace: !0 });
  },
  lo = () => (
    Vi(),
    s.jsxs(sn, {
      children: [
        s.jsxs(C, {
          path: "/",
          element: s.jsx(nc, {}),
          children: [
            s.jsx(C, { index: !0, element: s.jsx(on, {}) }),
            s.jsxs(C, {
              path: "auth",
              element: s.jsx(rc, {}),
              children: [
                s.jsx(C, { path: "login", element: s.jsx(ol, {}) }),
                s.jsx(C, { path: "register", element: s.jsx(pl, {}) }),
                s.jsx(C, { path: "send-email", element: s.jsx(hl, {}) }),
                s.jsx(C, { path: "verify", element: s.jsx(wl, {}) }),
                s.jsx(C, { path: "recover-pwd", element: s.jsx(bl, {}) }),
              ],
            }),
            s.jsxs(C, {
              path: "user",
              element: s.jsx(lc, {}),
              children: [
                s.jsx(C, { path: "profile", element: s.jsx(Ul, {}) }),
                s.jsx(C, { path: "manage-account", element: s.jsx(Jl, {}) }),
              ],
            }),
            s.jsx(C, { path: "verify-new-email", element: s.jsx(si, {}) }),
            s.jsx(C, { path: "notice-email", element: s.jsx(un, {}) }),
            s.jsx(C, { path: "notice", element: s.jsx(ro, {}) }),
            s.jsxs(C, {
              path: "newsletter",
              element: s.jsx(ic, {}),
              children: [
                s.jsx(C, {
                  path: "verify-unsubscribe",
                  element: s.jsx($l, {}),
                }),
                s.jsx(C, {
                  path: "notice-unsubscribe-with-retry",
                  element: s.jsx(Ol, {}),
                }),
              ],
            }),
            s.jsxs(C, {
              path: "my-restaurants",
              element: s.jsx(cc, {}),
              children: [
                s.jsx(C, { index: !0, element: s.jsx(Ti, {}) }),
                s.jsx(C, { path: ":restId", element: s.jsx(uc, {}) }),
                s.jsx(C, { path: "add-restaurant", element: s.jsx(gi, {}) }),
                s.jsx(C, { path: "update/:restId", element: s.jsx(ki, {}) }),
              ],
            }),
            s.jsxs(C, {
              path: "my-dishes",
              element: s.jsx(mc, {}),
              children: [
                s.jsx(C, { index: !0, element: s.jsx(Lc, {}) }),
                s.jsx(C, { path: "add-dish", element: s.jsx(Ac, {}) }),
                s.jsx(C, { path: "update/:dishId", element: s.jsx(Vc, {}) }),
              ],
            }),
            s.jsxs(C, {
              path: "search",
              element: s.jsx($c, {}),
              children: [
                s.jsx(C, { index: !0, element: s.jsx(Hc, {}) }),
                s.jsx(C, { path: ":restId", element: s.jsx(no, {}) }),
              ],
            }),
          ],
        }),
        s.jsx(C, { path: "*", element: s.jsx(M, { to: "/", replace: !0 }) }),
      ],
    })
  );
var Ls = ((e) => ((e.SET_CART = "SET_CART"), e))(Ls || {});
const io = (e, t) => {
    switch (t.type) {
      case Ls.SET_CART:
        return { ...e, cart: t.payload.cart };
      default:
        return e;
    }
  },
  aa = "SET_IS_POPUP",
  na = { popup: null },
  co = (e, t) => {
    switch (t.type) {
      case aa: {
        const a = t.payload;
        return a ? { popup: a } : na;
      }
      default:
        return e;
    }
  },
  Ce = "SET_IS_TOAST",
  oo = (e, t) => {
    const { isToast: a, msg: n, type: r } = t.payload;
    if (!a) return { ...e, isToast: a };
    if (a && [n, r].some((l) => !l))
      throw new Error("Missing fields " + t.type);
    return { ...e, isToast: a, msg: n ?? "", type: r ?? "SUCCESS" };
  },
  uo = (e, t) => {
    switch (t.type) {
      case Ce:
        return oo(e, t);
      default:
        return e;
    }
  },
  rs = "SET_IS_LOGGED",
  ls = "SET_CURR_USER",
  is = "SET_CAN_MANAGE_ACCOUNT",
  mo = (e, t) => {
    switch (t.type) {
      case rs:
        return { ...e, isLogged: t.payload };
      case ls:
        return { ...e, currUser: t.payload };
      case is:
        return { ...e, canManageAccount: t.payload };
      default:
        return e;
    }
  },
  po = (e, t) => ({
    toastState: uo(e.toastState, t),
    userState: mo(e.userState, t),
    popupState: co(e.popupState, t),
    cartState: io(e.cartState, t),
  }),
  xo = {
    cart: null,
    cartNonLogged:
      JSON.parse(localStorage.getItem("cartNonLogged") ?? "{}") || null,
  },
  go = { isToast: !1, msg: "", type: "SUCCESS" },
  ho = {
    currUser: null,
    isLogged: !!sessionStorage.getItem("accessToken"),
    canManageAccount: !!sessionStorage.getItem("manageAccountToken"),
  },
  fo = { toastState: go, userState: ho, popupState: na, cartState: xo },
  yo = (e, t) => {
    const [a, n] = m.useState(!1),
      [r, l] = m.useState(!1),
      i = () => {
        l(!1), t({ type: Ce, payload: { isToast: !1 } });
      },
      o = m.useCallback(
        (c, d) => {
          n(!1),
            r
              ? (t({ type: Ce, payload: { isToast: !1 } }),
                setTimeout(() => {
                  t({ type: Ce, payload: { isToast: !0, msg: c, type: d } });
                }, 100))
              : (l(!0),
                t({ type: Ce, payload: { isToast: !0, msg: c, type: d } }));
        },
        [t, r]
      );
    return {
      closeToast: i,
      showToastMsg: o,
      toastClicked: a,
      setToastClicked: n,
      wasToast: r,
      setWasToast: l,
      ...e,
    };
  },
  qs = [
    "myRestaurantsSearch",
    "myDishesSearch",
    "searchAllUsersRest",
    "accessToken",
    "manageAccountToken",
    "initName",
  ],
  jo = (e, t) => {
    const a = Z(),
      n = m.useCallback(() => {
        let o = 0;
        do sessionStorage.removeItem(qs[o]), o++;
        while (o < qs.length);
        t({ type: rs, payload: !1 }),
          t({ type: ls, payload: null }),
          t({ type: is, payload: !1 });
      }, [t]),
      r = m.useCallback(
        (o) => {
          o
            ? (sessionStorage.setItem("accessToken", o),
              t({ type: rs, payload: !0 }))
            : n(),
            a.resetQueries();
        },
        [t, n, a]
      ),
      l = m.useCallback(
        ({ user: o }) => {
          o
            ? sessionStorage.getItem("initName") ||
              sessionStorage.setItem("initName", ir(o))
            : sessionStorage.removeItem("initName"),
            t({ type: ls, payload: o });
        },
        [t]
      ),
      i = m.useCallback(
        (o) => {
          o
            ? sessionStorage.setItem("manageAccountToken", o)
            : sessionStorage.removeItem("manageAccountToken"),
            t({ type: is, payload: !!o });
        },
        [t]
      );
    return {
      ...e,
      setCurrUser: l,
      setUserLogged: r,
      setCanManageAccount: i,
      logoutUser: n,
    };
  },
  wo = (e, t) => ({
    setPopup: m.useCallback((n) => t({ type: aa, payload: n }), [t]),
    ...e,
  }),
  _o = () => {
    const e = sessionStorage.getItem("myRestaurantsSearch"),
      t = V({
        mode: "onChange",
        defaultValues: e ? { ...JSON.parse(e) } : { searchVals: ["name"] },
      }),
      a = V({
        mode: "onChange",
        defaultValues: {
          restaurant: "",
          items: [{ name: "", quantity: "", price: "", images: [] }],
        },
      }),
      n = V({ mode: "onChange" }),
      r = sessionStorage.getItem("myDishesSearch"),
      l = V({
        mode: "onChange",
        defaultValues: r ? { ...JSON.parse(r) } : { searchVals: ["name"] },
      }),
      i = sessionStorage.getItem("searchAllUsersRest"),
      o = V({
        mode: "onChange",
        defaultValues: i ? { ...JSON.parse(i) } : { searchVals: ["name"] },
      }),
      c = V({ mode: "onChange" });
    return {
      formContextMyRestaurants: t,
      formContextMyDishesAddItem: a,
      formContextMyDishesSearch: l,
      formContextMyDishesUpdate: n,
      formContextSearchRestAllUsers: o,
      formContextSearchDishesAllUSers: c,
    };
  },
  bo = () => {
    const [e, t] = m.useState(!1);
    return { isOpenSide: e, setIsOpenSide: t };
  },
  vo = (e, t) => ({
    setCartLogged: m.useCallback(
      (n) => {
        t({ type: Ls.SET_CART, payload: { cart: n } });
      },
      [t]
    ),
    ...e,
  }),
  No = () => {
    const [e, t] = m.useState(null);
    return { notice: e, setNotice: t };
  },
  So = () => {
    const [e, t] = m.useState(null);
    return { infoPop: e, setInfoPop: t };
  },
  Co = () => {
    const [e, t] = m.useReducer(po, fo),
      a = yo(e.toastState, t),
      n = jo(e.userState, t),
      r = wo(e.popupState, t),
      l = bo(),
      i = vo(e.cartState, t),
      o = No(),
      c = So(),
      d = _o();
    return {
      toastState: { ...a },
      userState: { ...n },
      popupState: { ...r },
      sideState: { ...l },
      cartState: { ...i },
      noticeState: { ...o },
      infoPopState: { ...c },
      formsState: { ...d },
    };
  },
  Po = ({ children: e }) =>
    s.jsx(dt.Provider, { value: { ...Co() }, children: e }),
  Eo = new cn({
    defaultOptions: {
      queries: { retry: !1, refetchOnWindowFocus: !1 },
      mutations: { retry: !1 },
    },
  });
tn.createRoot(document.getElementById("root")).render(
  s.jsx(m.StrictMode, {
    children: s.jsx(an, {
      children: s.jsx(nn, {
        client: Eo,
        children: s.jsx(Po, { children: s.jsx(lo, {}) }),
      }),
    }),
  })
);

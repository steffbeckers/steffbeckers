import{d as i,u as c,Q as m,R as P,s as h,S as v,U as b,r as L,a as k,V as u,W as g,X as R,Y as l,Z as S,$ as T,a0 as j,T as _,a1 as x,a2 as A,E as d}from"./IqgVVEOx.js";const O=i({name:"LayoutLoader",inheritAttrs:!1,props:{name:String,layoutProps:Object},setup(e,a){return()=>l(u[e.name],e.layoutProps,a.slots)}}),H=i({name:"NuxtLayout",inheritAttrs:!1,props:{name:{type:[String,Boolean,Object],default:null},fallback:{type:[String,Object],default:null}},setup(e,a){const t=c(),s=m(P),n=s===h()?v():s,r=b(()=>{let o=d(e.name)??n.meta.layout??"default";return o&&!(o in u)&&e.fallback&&(o=d(e.fallback)),o}),y=L();a.expose({layoutRef:y});const p=t.deferHydration();if(t.isHydrating){const o=t.hooks.hookOnce("app:error",p);k().beforeEach(o)}return()=>{const o=r.value&&r.value in u,f=n.meta.layoutTransition??g;return R(_,o&&f,{default:()=>l(j,{suspensible:!0,onResolve:()=>{T(p)}},{default:()=>l(B,{layoutProps:S(a.attrs,{ref:y}),key:r.value||void 0,name:r.value,shouldProvide:!e.name,hasTransition:!!f},a.slots)})}).default()}}}),B=i({name:"NuxtLayoutProvider",inheritAttrs:!1,props:{name:{type:[String,Boolean]},layoutProps:{type:Object},hasTransition:{type:Boolean},shouldProvide:{type:Boolean}},setup(e,a){const t=e.name;return e.shouldProvide&&x(A,{isCurrent:s=>t===(s.meta.layout??"default")}),()=>{var s,n;return!t||typeof t=="string"&&!(t in u)?(n=(s=a.slots).default)==null?void 0:n.call(s):l(O,{key:t,layoutProps:e.layoutProps,name:t},a.slots)}}});export{H as _};

import{_ as q,c as C}from"./CX8Zsmqz.js";import{_ as B}from"./BiZ_YpHp.js";import T from"./CF23ccjH.js";import V from"./D1cXkBZb.js";import{N as d,u as L,D as v,E as A,G as E,C as n,c as s,d as F,H as f,w as h,B as O,s as P,f as e,t as a,i as _,g as R,e as u,F as x,I as g,h as S}from"./Dn7HAbWN.js";import{_ as b}from"./c97hJJoJ.js";import"./BgpPL5ou.js";import"./CxYJgpPD.js";import"./6UZFpDj5.js";import"./DqBIUTJi.js";import"./DdRGlgW-.js";import"./DMpbmg0c.js";import"./DuFpGm1c.js";const z={__name:"DisqusComments",props:{...d.props,shortname:{type:String,default:()=>{var r,t;return(t=(r=L())==null?void 0:r.$disqusOptions)==null?void 0:t.shortname}}},setup(r){const t=r;return(i,o)=>(s(),v(n(d),A(E(t)),null,16))}},G=C(B),H=C(z),I={key:0,class:"flex-shrink-0"},j=["href"],J=["href"],at=F({__name:"[slug]",async setup(r){let t,i;const o=([t,i]=f(()=>O()),t=await t,i(),t),y=([t,i]=f(()=>P()),t=await t,i(),t);return(c,l)=>{const D=G,w=T,N=V,$=H,k=b;return s(),v(k,null,{default:h(()=>[e("article",null,[e("h1",null,a(n(o).page.value.title),1),_(w,null,{default:h(()=>[R(a(("formatDateTime"in c?c.formatDateTime:n(q))(n(o).page.value.date))+" | "+a(n(o).page.value.readingTime.text)+" | ",1),_(D,{style:{"text-transform":"lowercase"},identifier:n(o).page.value._path},null,8,["identifier"])]),_:1}),e("p",null,a(n(o).page.value.description),1),n(o).toc.value.links.length>0?(s(),u("aside",I,[l[0]||(l[0]=e("h2",null,"Contents",-1)),e("nav",null,[e("ul",null,[(s(!0),u(x,null,g(n(o).toc.value.links,m=>(s(),u("li",{key:m.id},[e("a",{href:`#${m.id}`},a(m.text),9,j),e("ul",null,[(s(!0),u(x,null,g(m.children,p=>(s(),u("li",{key:p.id},[e("a",{href:`#${p.id}`},a(p.text),9,J)]))),128))])]))),128))])])])):S("",!0),_(N,{document:n(o)},null,8,["document"])]),e("section",null,[l[1]||(l[1]=e("h2",null,"Leave a comment or question",-1)),_($,{identifier:n(y).path},null,8,["identifier"])])]),_:1})}}});export{at as default};
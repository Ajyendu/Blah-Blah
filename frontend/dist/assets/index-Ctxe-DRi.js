const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ProfilePage-CyBU5pq6.js","assets/react-vendor-BHdfzitw.js","assets/socket-qXw27f4H.js","assets/ProfilePage-BNLT-Q0Y.css","assets/FriendsPage-BXgU4KNU.js","assets/FriendsPage-CHhpB6xp.css"])))=>i.map(i=>d[i]);
import{R as on,r as d,a as Ea,j as a,b as Ta,c as Ra}from"./react-vendor-BHdfzitw.js";import{l as Ma}from"./socket-qXw27f4H.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const Pa="modulepreload",Ia=function(e){return"/"+e},Sr={},Ns=function(t,n,r){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(n.map(c=>{if(c=Ia(c),c in Sr)return;Sr[c]=!0;const u=c.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${f}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Pa,u||(h.as="script"),h.crossOrigin="",h.href=c,l&&h.setAttribute("nonce",l),document.head.appendChild(h),u)return new Promise((y,b)=>{h.addEventListener("load",y),h.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})},jr=e=>{let t;const n=new Set,r=(u,f)=>{const h=typeof u=="function"?u(t):u;if(!Object.is(h,t)){const y=t;t=f??(typeof h!="object"||h===null)?h:Object.assign({},t,h),n.forEach(b=>b(t,y))}},s=()=>t,l={setState:r,getState:s,getInitialState:()=>c,subscribe:u=>(n.add(u),()=>n.delete(u))},c=t=e(r,s,l);return l},Aa=e=>e?jr(e):jr,Oa=e=>e;function Da(e,t=Oa){const n=on.useSyncExternalStore(e.subscribe,on.useCallback(()=>t(e.getState()),[e,t]),on.useCallback(()=>t(e.getInitialState()),[e,t]));return on.useDebugValue(n),n}const kr=e=>{const t=Aa(e),n=r=>Da(t,r);return Object.assign(n,t),n},en=e=>e?kr(e):kr;let Ba={data:""},La=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||Ba},Ua=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Fa=/\/\*[^]*?\*\/|  +/g,Cr=/\n+/g,xt=(e,t)=>{let n="",r="",s="";for(let i in e){let o=e[i];i[0]=="@"?i[1]=="i"?n=i+" "+o+";":r+=i[1]=="f"?xt(o,i):i+"{"+xt(o,i[1]=="k"?"":t)+"}":typeof o=="object"?r+=xt(o,t?t.replace(/([^,])+/g,l=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,l):l?l+" "+c:c)):i):o!=null&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=xt.p?xt.p(i,o):i+":"+o+";")}return n+(t&&s?t+"{"+s+"}":s)+r},gt={},Es=e=>{if(typeof e=="object"){let t="";for(let n in e)t+=n+Es(e[n]);return t}return e},za=(e,t,n,r,s)=>{let i=Es(e),o=gt[i]||(gt[i]=(c=>{let u=0,f=11;for(;u<c.length;)f=101*f+c.charCodeAt(u++)>>>0;return"go"+f})(i));if(!gt[o]){let c=i!==e?e:(u=>{let f,h,y=[{}];for(;f=Ua.exec(u.replace(Fa,""));)f[4]?y.shift():f[3]?(h=f[3].replace(Cr," ").trim(),y.unshift(y[0][h]=y[0][h]||{})):y[0][f[1]]=f[2].replace(Cr," ").trim();return y[0]})(e);gt[o]=xt(s?{["@keyframes "+o]:c}:c,n?"":"."+o)}let l=n&&gt.g?gt.g:null;return n&&(gt.g=gt[o]),((c,u,f,h)=>{h?u.data=u.data.replace(h,c):u.data.indexOf(c)===-1&&(u.data=f?c+u.data:u.data+c)})(gt[o],t,r,l),o},$a=(e,t,n)=>e.reduce((r,s,i)=>{let o=t[i];if(o&&o.call){let l=o(n),c=l&&l.props&&l.props.className||/^go/.test(l)&&l;o=c?"."+c:l&&typeof l=="object"?l.props?"":xt(l,""):l===!1?"":l}return r+s+(o??"")},"");function Tn(e){let t=this||{},n=e.call?e(t.p):e;return za(n.unshift?n.raw?$a(n,[].slice.call(arguments,1),t.p):n.reduce((r,s)=>Object.assign(r,s&&s.call?s(t.p):s),{}):n,La(t.target),t.g,t.o,t.k)}let Ts,Xn,Kn;Tn.bind({g:1});let yt=Tn.bind({k:1});function Ha(e,t,n,r){xt.p=t,Ts=e,Xn=n,Kn=r}function Ct(e,t){let n=this||{};return function(){let r=arguments;function s(i,o){let l=Object.assign({},i),c=l.className||s.className;n.p=Object.assign({theme:Xn&&Xn()},l),n.o=/ *go\d+/.test(c),l.className=Tn.apply(n,r)+(c?" "+c:"");let u=e;return e[0]&&(u=l.as||e,delete l.as),Kn&&u[0]&&Kn(l),Ts(u,l)}return s}}var Va=e=>typeof e=="function",vn=(e,t)=>Va(e)?e(t):e,qa=(()=>{let e=0;return()=>(++e).toString()})(),Rs=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Wa=20,cr="default",Ms=(e,t)=>{let{toastLimit:n}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(o=>o.id===t.toast.id?{...o,...t.toast}:o)};case 2:let{toast:r}=t;return Ms(e,{type:e.toasts.find(o=>o.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(o=>o.id===s||s===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(o=>o.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+i}))}}},mn=[],Ps={toasts:[],pausedAt:void 0,settings:{toastLimit:Wa}},pt={},Is=(e,t=cr)=>{pt[t]=Ms(pt[t]||Ps,e),mn.forEach(([n,r])=>{n===t&&r(pt[t])})},As=e=>Object.keys(pt).forEach(t=>Is(e,t)),Ya=e=>Object.keys(pt).find(t=>pt[t].toasts.some(n=>n.id===e)),Rn=(e=cr)=>t=>{Is(t,e)},Ga={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Ja=(e={},t=cr)=>{let[n,r]=d.useState(pt[t]||Ps),s=d.useRef(pt[t]);d.useEffect(()=>(s.current!==pt[t]&&r(pt[t]),mn.push([t,r]),()=>{let o=mn.findIndex(([l])=>l===t);o>-1&&mn.splice(o,1)}),[t]);let i=n.toasts.map(o=>{var l,c,u;return{...e,...e[o.type],...o,removeDelay:o.removeDelay||((l=e[o.type])==null?void 0:l.removeDelay)||(e==null?void 0:e.removeDelay),duration:o.duration||((c=e[o.type])==null?void 0:c.duration)||(e==null?void 0:e.duration)||Ga[o.type],style:{...e.style,...(u=e[o.type])==null?void 0:u.style,...o.style}}});return{...n,toasts:i}},Xa=(e,t="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(n==null?void 0:n.id)||qa()}),tn=e=>(t,n)=>{let r=Xa(t,e,n);return Rn(r.toasterId||Ya(r.id))({type:2,toast:r}),r.id},Ge=(e,t)=>tn("blank")(e,t);Ge.error=tn("error");Ge.success=tn("success");Ge.loading=tn("loading");Ge.custom=tn("custom");Ge.dismiss=(e,t)=>{let n={type:3,toastId:e};t?Rn(t)(n):As(n)};Ge.dismissAll=e=>Ge.dismiss(void 0,e);Ge.remove=(e,t)=>{let n={type:4,toastId:e};t?Rn(t)(n):As(n)};Ge.removeAll=e=>Ge.remove(void 0,e);Ge.promise=(e,t,n)=>{let r=Ge.loading(t.loading,{...n,...n==null?void 0:n.loading});return typeof e=="function"&&(e=e()),e.then(s=>{let i=t.success?vn(t.success,s):void 0;return i?Ge.success(i,{id:r,...n,...n==null?void 0:n.success}):Ge.dismiss(r),s}).catch(s=>{let i=t.error?vn(t.error,s):void 0;i?Ge.error(i,{id:r,...n,...n==null?void 0:n.error}):Ge.dismiss(r)}),e};var Ka=1e3,Za=(e,t="default")=>{let{toasts:n,pausedAt:r}=Ja(e,t),s=d.useRef(new Map).current,i=d.useCallback((h,y=Ka)=>{if(s.has(h))return;let b=setTimeout(()=>{s.delete(h),o({type:4,toastId:h})},y);s.set(h,b)},[]);d.useEffect(()=>{if(r)return;let h=Date.now(),y=n.map(b=>{if(b.duration===1/0)return;let g=(b.duration||0)+b.pauseDuration-(h-b.createdAt);if(g<0){b.visible&&Ge.dismiss(b.id);return}return setTimeout(()=>Ge.dismiss(b.id,t),g)});return()=>{y.forEach(b=>b&&clearTimeout(b))}},[n,r,t]);let o=d.useCallback(Rn(t),[t]),l=d.useCallback(()=>{o({type:5,time:Date.now()})},[o]),c=d.useCallback((h,y)=>{o({type:1,toast:{id:h,height:y}})},[o]),u=d.useCallback(()=>{r&&o({type:6,time:Date.now()})},[r,o]),f=d.useCallback((h,y)=>{let{reverseOrder:b=!1,gutter:g=8,defaultPosition:_}=y||{},j=n.filter(v=>(v.position||_)===(h.position||_)&&v.height),k=j.findIndex(v=>v.id===h.id),x=j.filter((v,E)=>E<k&&v.visible).length;return j.filter(v=>v.visible).slice(...b?[x+1]:[0,x]).reduce((v,E)=>v+(E.height||0)+g,0)},[n]);return d.useEffect(()=>{n.forEach(h=>{if(h.dismissed)i(h.id,h.removeDelay);else{let y=s.get(h.id);y&&(clearTimeout(y),s.delete(h.id))}})},[n,i]),{toasts:n,handlers:{updateHeight:c,startPause:l,endPause:u,calculateOffset:f}}},Qa=yt`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,eo=yt`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,to=yt`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,no=Ct("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Qa} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${eo} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${to} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ro=yt`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,so=Ct("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ro} 1s linear infinite;
`,ao=yt`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,oo=yt`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,io=Ct("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ao} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${oo} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,lo=Ct("div")`
  position: absolute;
`,co=Ct("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,uo=yt`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,fo=Ct("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${uo} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ho=({toast:e})=>{let{icon:t,type:n,iconTheme:r}=e;return t!==void 0?typeof t=="string"?d.createElement(fo,null,t):t:n==="blank"?null:d.createElement(co,null,d.createElement(so,{...r}),n!=="loading"&&d.createElement(lo,null,n==="error"?d.createElement(no,{...r}):d.createElement(io,{...r})))},mo=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,po=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,go="0%{opacity:0;} 100%{opacity:1;}",yo="0%{opacity:1;} 100%{opacity:0;}",bo=Ct("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,_o=Ct("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,xo=(e,t)=>{let n=e.includes("top")?1:-1,[r,s]=Rs()?[go,yo]:[mo(n),po(n)];return{animation:t?`${yt(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${yt(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},wo=d.memo(({toast:e,position:t,style:n,children:r})=>{let s=e.height?xo(e.position||t||"top-center",e.visible):{opacity:0},i=d.createElement(ho,{toast:e}),o=d.createElement(_o,{...e.ariaProps},vn(e.message,e));return d.createElement(bo,{className:e.className,style:{...s,...n,...e.style}},typeof r=="function"?r({icon:i,message:o}):d.createElement(d.Fragment,null,i,o))});Ha(d.createElement);var vo=({id:e,className:t,style:n,onHeightUpdate:r,children:s})=>{let i=d.useCallback(o=>{if(o){let l=()=>{let c=o.getBoundingClientRect().height;r(e,c)};l(),new MutationObserver(l).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return d.createElement("div",{ref:i,className:t,style:n},s)},So=(e,t)=>{let n=e.includes("top"),r=n?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Rs()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(n?1:-1)}px)`,...r,...s}},jo=Tn`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ln=16,ko=({reverseOrder:e,position:t="top-center",toastOptions:n,gutter:r,children:s,toasterId:i,containerStyle:o,containerClassName:l})=>{let{toasts:c,handlers:u}=Za(n,i);return d.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:ln,left:ln,right:ln,bottom:ln,pointerEvents:"none",...o},className:l,onMouseEnter:u.startPause,onMouseLeave:u.endPause},c.map(f=>{let h=f.position||t,y=u.calculateOffset(f,{reverseOrder:e,gutter:r,defaultPosition:t}),b=So(h,y);return d.createElement(vo,{id:f.id,key:f.id,onHeightUpdate:u.updateHeight,className:f.visible?jo:"",style:b},f.type==="custom"?vn(f.message,f):s?s(f):d.createElement(wo,{toast:f,position:h}))}))},se=Ge;function Os(e,t){return function(){return e.apply(t,arguments)}}const{toString:Co}=Object.prototype,{getPrototypeOf:dr}=Object,{iterator:Mn,toStringTag:Ds}=Symbol,Pn=(e=>t=>{const n=Co.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),ut=e=>(e=e.toLowerCase(),t=>Pn(t)===e),In=e=>t=>typeof t===e,{isArray:Ht}=Array,$t=In("undefined");function nn(e){return e!==null&&!$t(e)&&e.constructor!==null&&!$t(e.constructor)&&it(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Bs=ut("ArrayBuffer");function No(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Bs(e.buffer),t}const Eo=In("string"),it=In("function"),Ls=In("number"),rn=e=>e!==null&&typeof e=="object",To=e=>e===!0||e===!1,pn=e=>{if(Pn(e)!=="object")return!1;const t=dr(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Ds in e)&&!(Mn in e)},Ro=e=>{if(!rn(e)||nn(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Mo=ut("Date"),Po=ut("File"),Io=ut("Blob"),Ao=ut("FileList"),Oo=e=>rn(e)&&it(e.pipe),Do=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||it(e.append)&&((t=Pn(e))==="formdata"||t==="object"&&it(e.toString)&&e.toString()==="[object FormData]"))},Bo=ut("URLSearchParams"),[Lo,Uo,Fo,zo]=["ReadableStream","Request","Response","Headers"].map(ut),$o=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function sn(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,s;if(typeof e!="object"&&(e=[e]),Ht(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{if(nn(e))return;const i=n?Object.getOwnPropertyNames(e):Object.keys(e),o=i.length;let l;for(r=0;r<o;r++)l=i[r],t.call(null,e[l],l,e)}}function Us(e,t){if(nn(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r=n.length,s;for(;r-- >0;)if(s=n[r],t===s.toLowerCase())return s;return null}const It=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Fs=e=>!$t(e)&&e!==It;function Zn(){const{caseless:e,skipUndefined:t}=Fs(this)&&this||{},n={},r=(s,i)=>{const o=e&&Us(n,i)||i;pn(n[o])&&pn(s)?n[o]=Zn(n[o],s):pn(s)?n[o]=Zn({},s):Ht(s)?n[o]=s.slice():(!t||!$t(s))&&(n[o]=s)};for(let s=0,i=arguments.length;s<i;s++)arguments[s]&&sn(arguments[s],r);return n}const Ho=(e,t,n,{allOwnKeys:r}={})=>(sn(t,(s,i)=>{n&&it(s)?e[i]=Os(s,n):e[i]=s},{allOwnKeys:r}),e),Vo=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),qo=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Wo=(e,t,n,r)=>{let s,i,o;const l={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),i=s.length;i-- >0;)o=s[i],(!r||r(o,e,t))&&!l[o]&&(t[o]=e[o],l[o]=!0);e=n!==!1&&dr(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Yo=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},Go=e=>{if(!e)return null;if(Ht(e))return e;let t=e.length;if(!Ls(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Jo=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&dr(Uint8Array)),Xo=(e,t)=>{const r=(e&&e[Mn]).call(e);let s;for(;(s=r.next())&&!s.done;){const i=s.value;t.call(e,i[0],i[1])}},Ko=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Zo=ut("HTMLFormElement"),Qo=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),Nr=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),ei=ut("RegExp"),zs=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};sn(n,(s,i)=>{let o;(o=t(s,i,e))!==!1&&(r[i]=o||s)}),Object.defineProperties(e,r)},ti=e=>{zs(e,(t,n)=>{if(it(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(it(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},ni=(e,t)=>{const n={},r=s=>{s.forEach(i=>{n[i]=!0})};return Ht(e)?r(e):r(String(e).split(t)),n},ri=()=>{},si=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function ai(e){return!!(e&&it(e.append)&&e[Ds]==="FormData"&&e[Mn])}const oi=e=>{const t=new Array(10),n=(r,s)=>{if(rn(r)){if(t.indexOf(r)>=0)return;if(nn(r))return r;if(!("toJSON"in r)){t[s]=r;const i=Ht(r)?[]:{};return sn(r,(o,l)=>{const c=n(o,s+1);!$t(c)&&(i[l]=c)}),t[s]=void 0,i}}return r};return n(e,0)},ii=ut("AsyncFunction"),li=e=>e&&(rn(e)||it(e))&&it(e.then)&&it(e.catch),$s=((e,t)=>e?setImmediate:t?((n,r)=>(It.addEventListener("message",({source:s,data:i})=>{s===It&&i===n&&r.length&&r.shift()()},!1),s=>{r.push(s),It.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",it(It.postMessage)),ci=typeof queueMicrotask<"u"?queueMicrotask.bind(It):typeof process<"u"&&process.nextTick||$s,di=e=>e!=null&&it(e[Mn]),C={isArray:Ht,isArrayBuffer:Bs,isBuffer:nn,isFormData:Do,isArrayBufferView:No,isString:Eo,isNumber:Ls,isBoolean:To,isObject:rn,isPlainObject:pn,isEmptyObject:Ro,isReadableStream:Lo,isRequest:Uo,isResponse:Fo,isHeaders:zo,isUndefined:$t,isDate:Mo,isFile:Po,isBlob:Io,isRegExp:ei,isFunction:it,isStream:Oo,isURLSearchParams:Bo,isTypedArray:Jo,isFileList:Ao,forEach:sn,merge:Zn,extend:Ho,trim:$o,stripBOM:Vo,inherits:qo,toFlatObject:Wo,kindOf:Pn,kindOfTest:ut,endsWith:Yo,toArray:Go,forEachEntry:Xo,matchAll:Ko,isHTMLForm:Zo,hasOwnProperty:Nr,hasOwnProp:Nr,reduceDescriptors:zs,freezeMethods:ti,toObjectSet:ni,toCamelCase:Qo,noop:ri,toFiniteNumber:si,findKey:Us,global:It,isContextDefined:Fs,isSpecCompliantForm:ai,toJSONObject:oi,isAsyncFn:ii,isThenable:li,setImmediate:$s,asap:ci,isIterable:di};function Q(e,t,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s,this.status=s.status?s.status:null)}C.inherits(Q,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:C.toJSONObject(this.config),code:this.code,status:this.status}}});const Hs=Q.prototype,Vs={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Vs[e]={value:e}});Object.defineProperties(Q,Vs);Object.defineProperty(Hs,"isAxiosError",{value:!0});Q.from=(e,t,n,r,s,i)=>{const o=Object.create(Hs);C.toFlatObject(e,o,function(f){return f!==Error.prototype},u=>u!=="isAxiosError");const l=e&&e.message?e.message:"Error",c=t==null&&e?e.code:t;return Q.call(o,l,c,n,r,s),e&&o.cause==null&&Object.defineProperty(o,"cause",{value:e,configurable:!0}),o.name=e&&e.name||"Error",i&&Object.assign(o,i),o};const ui=null;function Qn(e){return C.isPlainObject(e)||C.isArray(e)}function qs(e){return C.endsWith(e,"[]")?e.slice(0,-2):e}function Er(e,t,n){return e?e.concat(t).map(function(s,i){return s=qs(s),!n&&i?"["+s+"]":s}).join(n?".":""):t}function fi(e){return C.isArray(e)&&!e.some(Qn)}const hi=C.toFlatObject(C,{},null,function(t){return/^is[A-Z]/.test(t)});function An(e,t,n){if(!C.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=C.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(_,j){return!C.isUndefined(j[_])});const r=n.metaTokens,s=n.visitor||f,i=n.dots,o=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&C.isSpecCompliantForm(t);if(!C.isFunction(s))throw new TypeError("visitor must be a function");function u(g){if(g===null)return"";if(C.isDate(g))return g.toISOString();if(C.isBoolean(g))return g.toString();if(!c&&C.isBlob(g))throw new Q("Blob is not supported. Use a Buffer instead.");return C.isArrayBuffer(g)||C.isTypedArray(g)?c&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function f(g,_,j){let k=g;if(g&&!j&&typeof g=="object"){if(C.endsWith(_,"{}"))_=r?_:_.slice(0,-2),g=JSON.stringify(g);else if(C.isArray(g)&&fi(g)||(C.isFileList(g)||C.endsWith(_,"[]"))&&(k=C.toArray(g)))return _=qs(_),k.forEach(function(v,E){!(C.isUndefined(v)||v===null)&&t.append(o===!0?Er([_],E,i):o===null?_:_+"[]",u(v))}),!1}return Qn(g)?!0:(t.append(Er(j,_,i),u(g)),!1)}const h=[],y=Object.assign(hi,{defaultVisitor:f,convertValue:u,isVisitable:Qn});function b(g,_){if(!C.isUndefined(g)){if(h.indexOf(g)!==-1)throw Error("Circular reference detected in "+_.join("."));h.push(g),C.forEach(g,function(k,x){(!(C.isUndefined(k)||k===null)&&s.call(t,k,C.isString(x)?x.trim():x,_,y))===!0&&b(k,_?_.concat(x):[x])}),h.pop()}}if(!C.isObject(e))throw new TypeError("data must be an object");return b(e),t}function Tr(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function ur(e,t){this._pairs=[],e&&An(e,this,t)}const Ws=ur.prototype;Ws.append=function(t,n){this._pairs.push([t,n])};Ws.toString=function(t){const n=t?function(r){return t.call(this,r,Tr)}:Tr;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function mi(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Ys(e,t,n){if(!t)return e;const r=n&&n.encode||mi;C.isFunction(n)&&(n={serialize:n});const s=n&&n.serialize;let i;if(s?i=s(t,n):i=C.isURLSearchParams(t)?t.toString():new ur(t,n).toString(r),i){const o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}class Rr{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){C.forEach(this.handlers,function(r){r!==null&&t(r)})}}const Gs={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},pi=typeof URLSearchParams<"u"?URLSearchParams:ur,gi=typeof FormData<"u"?FormData:null,yi=typeof Blob<"u"?Blob:null,bi={isBrowser:!0,classes:{URLSearchParams:pi,FormData:gi,Blob:yi},protocols:["http","https","file","blob","url","data"]},fr=typeof window<"u"&&typeof document<"u",er=typeof navigator=="object"&&navigator||void 0,_i=fr&&(!er||["ReactNative","NativeScript","NS"].indexOf(er.product)<0),xi=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",wi=fr&&window.location.href||"http://localhost",vi=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:fr,hasStandardBrowserEnv:_i,hasStandardBrowserWebWorkerEnv:xi,navigator:er,origin:wi},Symbol.toStringTag,{value:"Module"})),tt={...vi,...bi};function Si(e,t){return An(e,new tt.classes.URLSearchParams,{visitor:function(n,r,s,i){return tt.isNode&&C.isBuffer(n)?(this.append(r,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)},...t})}function ji(e){return C.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function ki(e){const t={},n=Object.keys(e);let r;const s=n.length;let i;for(r=0;r<s;r++)i=n[r],t[i]=e[i];return t}function Js(e){function t(n,r,s,i){let o=n[i++];if(o==="__proto__")return!0;const l=Number.isFinite(+o),c=i>=n.length;return o=!o&&C.isArray(s)?s.length:o,c?(C.hasOwnProp(s,o)?s[o]=[s[o],r]:s[o]=r,!l):((!s[o]||!C.isObject(s[o]))&&(s[o]=[]),t(n,r,s[o],i)&&C.isArray(s[o])&&(s[o]=ki(s[o])),!l)}if(C.isFormData(e)&&C.isFunction(e.entries)){const n={};return C.forEachEntry(e,(r,s)=>{t(ji(r),s,n,0)}),n}return null}function Ci(e,t,n){if(C.isString(e))try{return(t||JSON.parse)(e),C.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const an={transitional:Gs,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,i=C.isObject(t);if(i&&C.isHTMLForm(t)&&(t=new FormData(t)),C.isFormData(t))return s?JSON.stringify(Js(t)):t;if(C.isArrayBuffer(t)||C.isBuffer(t)||C.isStream(t)||C.isFile(t)||C.isBlob(t)||C.isReadableStream(t))return t;if(C.isArrayBufferView(t))return t.buffer;if(C.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(i){if(r.indexOf("application/x-www-form-urlencoded")>-1)return Si(t,this.formSerializer).toString();if((l=C.isFileList(t))||r.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return An(l?{"files[]":t}:t,c&&new c,this.formSerializer)}}return i||s?(n.setContentType("application/json",!1),Ci(t)):t}],transformResponse:[function(t){const n=this.transitional||an.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(C.isResponse(t)||C.isReadableStream(t))return t;if(t&&C.isString(t)&&(r&&!this.responseType||s)){const o=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t,this.parseReviver)}catch(l){if(o)throw l.name==="SyntaxError"?Q.from(l,Q.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:tt.classes.FormData,Blob:tt.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};C.forEach(["delete","get","head","post","put","patch"],e=>{an.headers[e]={}});const Ni=C.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Ei=e=>{const t={};let n,r,s;return e&&e.split(`
`).forEach(function(o){s=o.indexOf(":"),n=o.substring(0,s).trim().toLowerCase(),r=o.substring(s+1).trim(),!(!n||t[n]&&Ni[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},Mr=Symbol("internals");function Gt(e){return e&&String(e).trim().toLowerCase()}function gn(e){return e===!1||e==null?e:C.isArray(e)?e.map(gn):String(e)}function Ti(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Ri=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Ln(e,t,n,r,s){if(C.isFunction(r))return r.call(this,t,n);if(s&&(t=n),!!C.isString(t)){if(C.isString(r))return t.indexOf(r)!==-1;if(C.isRegExp(r))return r.test(t)}}function Mi(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Pi(e,t){const n=C.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(s,i,o){return this[r].call(this,t,s,i,o)},configurable:!0})})}let lt=class{constructor(t){t&&this.set(t)}set(t,n,r){const s=this;function i(l,c,u){const f=Gt(c);if(!f)throw new Error("header name must be a non-empty string");const h=C.findKey(s,f);(!h||s[h]===void 0||u===!0||u===void 0&&s[h]!==!1)&&(s[h||c]=gn(l))}const o=(l,c)=>C.forEach(l,(u,f)=>i(u,f,c));if(C.isPlainObject(t)||t instanceof this.constructor)o(t,n);else if(C.isString(t)&&(t=t.trim())&&!Ri(t))o(Ei(t),n);else if(C.isObject(t)&&C.isIterable(t)){let l={},c,u;for(const f of t){if(!C.isArray(f))throw TypeError("Object iterator must return a key-value pair");l[u=f[0]]=(c=l[u])?C.isArray(c)?[...c,f[1]]:[c,f[1]]:f[1]}o(l,n)}else t!=null&&i(n,t,r);return this}get(t,n){if(t=Gt(t),t){const r=C.findKey(this,t);if(r){const s=this[r];if(!n)return s;if(n===!0)return Ti(s);if(C.isFunction(n))return n.call(this,s,r);if(C.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Gt(t),t){const r=C.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||Ln(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let s=!1;function i(o){if(o=Gt(o),o){const l=C.findKey(r,o);l&&(!n||Ln(r,r[l],l,n))&&(delete r[l],s=!0)}}return C.isArray(t)?t.forEach(i):i(t),s}clear(t){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const i=n[r];(!t||Ln(this,this[i],i,t,!0))&&(delete this[i],s=!0)}return s}normalize(t){const n=this,r={};return C.forEach(this,(s,i)=>{const o=C.findKey(r,i);if(o){n[o]=gn(s),delete n[i];return}const l=t?Mi(i):String(i).trim();l!==i&&delete n[i],n[l]=gn(s),r[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return C.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=t&&C.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(s=>r.set(s)),r}static accessor(t){const r=(this[Mr]=this[Mr]={accessors:{}}).accessors,s=this.prototype;function i(o){const l=Gt(o);r[l]||(Pi(s,o),r[l]=!0)}return C.isArray(t)?t.forEach(i):i(t),this}};lt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);C.reduceDescriptors(lt.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});C.freezeMethods(lt);function Un(e,t){const n=this||an,r=t||n,s=lt.from(r.headers);let i=r.data;return C.forEach(e,function(l){i=l.call(n,i,s.normalize(),t?t.status:void 0)}),s.normalize(),i}function Xs(e){return!!(e&&e.__CANCEL__)}function Vt(e,t,n){Q.call(this,e??"canceled",Q.ERR_CANCELED,t,n),this.name="CanceledError"}C.inherits(Vt,Q,{__CANCEL__:!0});function Ks(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new Q("Request failed with status code "+n.status,[Q.ERR_BAD_REQUEST,Q.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Ii(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Ai(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s=0,i=0,o;return t=t!==void 0?t:1e3,function(c){const u=Date.now(),f=r[i];o||(o=u),n[s]=c,r[s]=u;let h=i,y=0;for(;h!==s;)y+=n[h++],h=h%e;if(s=(s+1)%e,s===i&&(i=(i+1)%e),u-o<t)return;const b=f&&u-f;return b?Math.round(y*1e3/b):void 0}}function Oi(e,t){let n=0,r=1e3/t,s,i;const o=(u,f=Date.now())=>{n=f,s=null,i&&(clearTimeout(i),i=null),e(...u)};return[(...u)=>{const f=Date.now(),h=f-n;h>=r?o(u,f):(s=u,i||(i=setTimeout(()=>{i=null,o(s)},r-h)))},()=>s&&o(s)]}const Sn=(e,t,n=3)=>{let r=0;const s=Ai(50,250);return Oi(i=>{const o=i.loaded,l=i.lengthComputable?i.total:void 0,c=o-r,u=s(c),f=o<=l;r=o;const h={loaded:o,total:l,progress:l?o/l:void 0,bytes:c,rate:u||void 0,estimated:u&&l&&f?(l-o)/u:void 0,event:i,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(h)},n)},Pr=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},Ir=e=>(...t)=>C.asap(()=>e(...t)),Di=tt.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,tt.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(tt.origin),tt.navigator&&/(msie|trident)/i.test(tt.navigator.userAgent)):()=>!0,Bi=tt.hasStandardBrowserEnv?{write(e,t,n,r,s,i,o){if(typeof document>"u")return;const l=[`${e}=${encodeURIComponent(t)}`];C.isNumber(n)&&l.push(`expires=${new Date(n).toUTCString()}`),C.isString(r)&&l.push(`path=${r}`),C.isString(s)&&l.push(`domain=${s}`),i===!0&&l.push("secure"),C.isString(o)&&l.push(`SameSite=${o}`),document.cookie=l.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Li(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Ui(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Zs(e,t,n){let r=!Li(t);return e&&(r||n==!1)?Ui(e,t):t}const Ar=e=>e instanceof lt?{...e}:e;function Dt(e,t){t=t||{};const n={};function r(u,f,h,y){return C.isPlainObject(u)&&C.isPlainObject(f)?C.merge.call({caseless:y},u,f):C.isPlainObject(f)?C.merge({},f):C.isArray(f)?f.slice():f}function s(u,f,h,y){if(C.isUndefined(f)){if(!C.isUndefined(u))return r(void 0,u,h,y)}else return r(u,f,h,y)}function i(u,f){if(!C.isUndefined(f))return r(void 0,f)}function o(u,f){if(C.isUndefined(f)){if(!C.isUndefined(u))return r(void 0,u)}else return r(void 0,f)}function l(u,f,h){if(h in t)return r(u,f);if(h in e)return r(void 0,u)}const c={url:i,method:i,data:i,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:l,headers:(u,f,h)=>s(Ar(u),Ar(f),h,!0)};return C.forEach(Object.keys({...e,...t}),function(f){const h=c[f]||s,y=h(e[f],t[f],f);C.isUndefined(y)&&h!==l||(n[f]=y)}),n}const Qs=e=>{const t=Dt({},e);let{data:n,withXSRFToken:r,xsrfHeaderName:s,xsrfCookieName:i,headers:o,auth:l}=t;if(t.headers=o=lt.from(o),t.url=Ys(Zs(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),l&&o.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):""))),C.isFormData(n)){if(tt.hasStandardBrowserEnv||tt.hasStandardBrowserWebWorkerEnv)o.setContentType(void 0);else if(C.isFunction(n.getHeaders)){const c=n.getHeaders(),u=["content-type","content-length"];Object.entries(c).forEach(([f,h])=>{u.includes(f.toLowerCase())&&o.set(f,h)})}}if(tt.hasStandardBrowserEnv&&(r&&C.isFunction(r)&&(r=r(t)),r||r!==!1&&Di(t.url))){const c=s&&i&&Bi.read(i);c&&o.set(s,c)}return t},Fi=typeof XMLHttpRequest<"u",zi=Fi&&function(e){return new Promise(function(n,r){const s=Qs(e);let i=s.data;const o=lt.from(s.headers).normalize();let{responseType:l,onUploadProgress:c,onDownloadProgress:u}=s,f,h,y,b,g;function _(){b&&b(),g&&g(),s.cancelToken&&s.cancelToken.unsubscribe(f),s.signal&&s.signal.removeEventListener("abort",f)}let j=new XMLHttpRequest;j.open(s.method.toUpperCase(),s.url,!0),j.timeout=s.timeout;function k(){if(!j)return;const v=lt.from("getAllResponseHeaders"in j&&j.getAllResponseHeaders()),R={data:!l||l==="text"||l==="json"?j.responseText:j.response,status:j.status,statusText:j.statusText,headers:v,config:e,request:j};Ks(function(M){n(M),_()},function(M){r(M),_()},R),j=null}"onloadend"in j?j.onloadend=k:j.onreadystatechange=function(){!j||j.readyState!==4||j.status===0&&!(j.responseURL&&j.responseURL.indexOf("file:")===0)||setTimeout(k)},j.onabort=function(){j&&(r(new Q("Request aborted",Q.ECONNABORTED,e,j)),j=null)},j.onerror=function(E){const R=E&&E.message?E.message:"Network Error",I=new Q(R,Q.ERR_NETWORK,e,j);I.event=E||null,r(I),j=null},j.ontimeout=function(){let E=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const R=s.transitional||Gs;s.timeoutErrorMessage&&(E=s.timeoutErrorMessage),r(new Q(E,R.clarifyTimeoutError?Q.ETIMEDOUT:Q.ECONNABORTED,e,j)),j=null},i===void 0&&o.setContentType(null),"setRequestHeader"in j&&C.forEach(o.toJSON(),function(E,R){j.setRequestHeader(R,E)}),C.isUndefined(s.withCredentials)||(j.withCredentials=!!s.withCredentials),l&&l!=="json"&&(j.responseType=s.responseType),u&&([y,g]=Sn(u,!0),j.addEventListener("progress",y)),c&&j.upload&&([h,b]=Sn(c),j.upload.addEventListener("progress",h),j.upload.addEventListener("loadend",b)),(s.cancelToken||s.signal)&&(f=v=>{j&&(r(!v||v.type?new Vt(null,e,j):v),j.abort(),j=null)},s.cancelToken&&s.cancelToken.subscribe(f),s.signal&&(s.signal.aborted?f():s.signal.addEventListener("abort",f)));const x=Ii(s.url);if(x&&tt.protocols.indexOf(x)===-1){r(new Q("Unsupported protocol "+x+":",Q.ERR_BAD_REQUEST,e));return}j.send(i||null)})},$i=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,s;const i=function(u){if(!s){s=!0,l();const f=u instanceof Error?u:this.reason;r.abort(f instanceof Q?f:new Vt(f instanceof Error?f.message:f))}};let o=t&&setTimeout(()=>{o=null,i(new Q(`timeout ${t} of ms exceeded`,Q.ETIMEDOUT))},t);const l=()=>{e&&(o&&clearTimeout(o),o=null,e.forEach(u=>{u.unsubscribe?u.unsubscribe(i):u.removeEventListener("abort",i)}),e=null)};e.forEach(u=>u.addEventListener("abort",i));const{signal:c}=r;return c.unsubscribe=()=>C.asap(l),c}},Hi=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,s;for(;r<n;)s=r+t,yield e.slice(r,s),r=s},Vi=async function*(e,t){for await(const n of qi(e))yield*Hi(n,t)},qi=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},Or=(e,t,n,r)=>{const s=Vi(e,t);let i=0,o,l=c=>{o||(o=!0,r&&r(c))};return new ReadableStream({async pull(c){try{const{done:u,value:f}=await s.next();if(u){l(),c.close();return}let h=f.byteLength;if(n){let y=i+=h;n(y)}c.enqueue(new Uint8Array(f))}catch(u){throw l(u),u}},cancel(c){return l(c),s.return()}},{highWaterMark:2})},Dr=64*1024,{isFunction:cn}=C,Wi=(({Request:e,Response:t})=>({Request:e,Response:t}))(C.global),{ReadableStream:Br,TextEncoder:Lr}=C.global,Ur=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Yi=e=>{e=C.merge.call({skipUndefined:!0},Wi,e);const{fetch:t,Request:n,Response:r}=e,s=t?cn(t):typeof fetch=="function",i=cn(n),o=cn(r);if(!s)return!1;const l=s&&cn(Br),c=s&&(typeof Lr=="function"?(g=>_=>g.encode(_))(new Lr):async g=>new Uint8Array(await new n(g).arrayBuffer())),u=i&&l&&Ur(()=>{let g=!1;const _=new n(tt.origin,{body:new Br,method:"POST",get duplex(){return g=!0,"half"}}).headers.has("Content-Type");return g&&!_}),f=o&&l&&Ur(()=>C.isReadableStream(new r("").body)),h={stream:f&&(g=>g.body)};s&&["text","arrayBuffer","blob","formData","stream"].forEach(g=>{!h[g]&&(h[g]=(_,j)=>{let k=_&&_[g];if(k)return k.call(_);throw new Q(`Response type '${g}' is not supported`,Q.ERR_NOT_SUPPORT,j)})});const y=async g=>{if(g==null)return 0;if(C.isBlob(g))return g.size;if(C.isSpecCompliantForm(g))return(await new n(tt.origin,{method:"POST",body:g}).arrayBuffer()).byteLength;if(C.isArrayBufferView(g)||C.isArrayBuffer(g))return g.byteLength;if(C.isURLSearchParams(g)&&(g=g+""),C.isString(g))return(await c(g)).byteLength},b=async(g,_)=>{const j=C.toFiniteNumber(g.getContentLength());return j??y(_)};return async g=>{let{url:_,method:j,data:k,signal:x,cancelToken:v,timeout:E,onDownloadProgress:R,onUploadProgress:I,responseType:M,headers:O,withCredentials:z="same-origin",fetchOptions:F}=Qs(g),D=t||fetch;M=M?(M+"").toLowerCase():"text";let ee=$i([x,v&&v.toAbortSignal()],E),$=null;const oe=ee&&ee.unsubscribe&&(()=>{ee.unsubscribe()});let He;try{if(I&&u&&j!=="get"&&j!=="head"&&(He=await b(O,k))!==0){let T=new n(_,{method:"POST",body:k,duplex:"half"}),J;if(C.isFormData(k)&&(J=T.headers.get("content-type"))&&O.setContentType(J),T.body){const[ge,fe]=Pr(He,Sn(Ir(I)));k=Or(T.body,Dr,ge,fe)}}C.isString(z)||(z=z?"include":"omit");const he=i&&"credentials"in n.prototype,te={...F,signal:ee,method:j.toUpperCase(),headers:O.normalize().toJSON(),body:k,duplex:"half",credentials:he?z:void 0};$=i&&new n(_,te);let W=await(i?D($,F):D(_,te));const ue=f&&(M==="stream"||M==="response");if(f&&(R||ue&&oe)){const T={};["status","statusText","headers"].forEach(X=>{T[X]=W[X]});const J=C.toFiniteNumber(W.headers.get("content-length")),[ge,fe]=R&&Pr(J,Sn(Ir(R),!0))||[];W=new r(Or(W.body,Dr,ge,()=>{fe&&fe(),oe&&oe()}),T)}M=M||"text";let q=await h[C.findKey(h,M)||"text"](W,g);return!ue&&oe&&oe(),await new Promise((T,J)=>{Ks(T,J,{data:q,headers:lt.from(W.headers),status:W.status,statusText:W.statusText,config:g,request:$})})}catch(he){throw oe&&oe(),he&&he.name==="TypeError"&&/Load failed|fetch/i.test(he.message)?Object.assign(new Q("Network Error",Q.ERR_NETWORK,g,$),{cause:he.cause||he}):Q.from(he,he&&he.code,g,$)}}},Gi=new Map,ea=e=>{let t=e&&e.env||{};const{fetch:n,Request:r,Response:s}=t,i=[r,s,n];let o=i.length,l=o,c,u,f=Gi;for(;l--;)c=i[l],u=f.get(c),u===void 0&&f.set(c,u=l?new Map:Yi(t)),f=u;return u};ea();const hr={http:ui,xhr:zi,fetch:{get:ea}};C.forEach(hr,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Fr=e=>`- ${e}`,Ji=e=>C.isFunction(e)||e===null||e===!1;function Xi(e,t){e=C.isArray(e)?e:[e];const{length:n}=e;let r,s;const i={};for(let o=0;o<n;o++){r=e[o];let l;if(s=r,!Ji(r)&&(s=hr[(l=String(r)).toLowerCase()],s===void 0))throw new Q(`Unknown adapter '${l}'`);if(s&&(C.isFunction(s)||(s=s.get(t))))break;i[l||"#"+o]=s}if(!s){const o=Object.entries(i).map(([c,u])=>`adapter ${c} `+(u===!1?"is not supported by the environment":"is not available in the build"));let l=n?o.length>1?`since :
`+o.map(Fr).join(`
`):" "+Fr(o[0]):"as no adapter specified";throw new Q("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return s}const ta={getAdapter:Xi,adapters:hr};function Fn(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Vt(null,e)}function zr(e){return Fn(e),e.headers=lt.from(e.headers),e.data=Un.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),ta.getAdapter(e.adapter||an.adapter,e)(e).then(function(r){return Fn(e),r.data=Un.call(e,e.transformResponse,r),r.headers=lt.from(r.headers),r},function(r){return Xs(r)||(Fn(e),r&&r.response&&(r.response.data=Un.call(e,e.transformResponse,r.response),r.response.headers=lt.from(r.response.headers))),Promise.reject(r)})}const na="1.13.2",On={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{On[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const $r={};On.transitional=function(t,n,r){function s(i,o){return"[Axios v"+na+"] Transitional option '"+i+"'"+o+(r?". "+r:"")}return(i,o,l)=>{if(t===!1)throw new Q(s(o," has been removed"+(n?" in "+n:"")),Q.ERR_DEPRECATED);return n&&!$r[o]&&($r[o]=!0,console.warn(s(o," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(i,o,l):!0}};On.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function Ki(e,t,n){if(typeof e!="object")throw new Q("options must be an object",Q.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const i=r[s],o=t[i];if(o){const l=e[i],c=l===void 0||o(l,i,e);if(c!==!0)throw new Q("option "+i+" must be "+c,Q.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new Q("Unknown option "+i,Q.ERR_BAD_OPTION)}}const yn={assertOptions:Ki,validators:On},ht=yn.validators;let At=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Rr,response:new Rr}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const i=s.stack?s.stack.replace(/^.+\n/,""):"";try{r.stack?i&&!String(r.stack).endsWith(i.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+i):r.stack=i}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=Dt(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:i}=n;r!==void 0&&yn.assertOptions(r,{silentJSONParsing:ht.transitional(ht.boolean),forcedJSONParsing:ht.transitional(ht.boolean),clarifyTimeoutError:ht.transitional(ht.boolean)},!1),s!=null&&(C.isFunction(s)?n.paramsSerializer={serialize:s}:yn.assertOptions(s,{encode:ht.function,serialize:ht.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),yn.assertOptions(n,{baseUrl:ht.spelling("baseURL"),withXsrfToken:ht.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=i&&C.merge(i.common,i[n.method]);i&&C.forEach(["delete","get","head","post","put","patch","common"],g=>{delete i[g]}),n.headers=lt.concat(o,i);const l=[];let c=!0;this.interceptors.request.forEach(function(_){typeof _.runWhen=="function"&&_.runWhen(n)===!1||(c=c&&_.synchronous,l.unshift(_.fulfilled,_.rejected))});const u=[];this.interceptors.response.forEach(function(_){u.push(_.fulfilled,_.rejected)});let f,h=0,y;if(!c){const g=[zr.bind(this),void 0];for(g.unshift(...l),g.push(...u),y=g.length,f=Promise.resolve(n);h<y;)f=f.then(g[h++],g[h++]);return f}y=l.length;let b=n;for(;h<y;){const g=l[h++],_=l[h++];try{b=g(b)}catch(j){_.call(this,j);break}}try{f=zr.call(this,b)}catch(g){return Promise.reject(g)}for(h=0,y=u.length;h<y;)f=f.then(u[h++],u[h++]);return f}getUri(t){t=Dt(this.defaults,t);const n=Zs(t.baseURL,t.url,t.allowAbsoluteUrls);return Ys(n,t.params,t.paramsSerializer)}};C.forEach(["delete","get","head","options"],function(t){At.prototype[t]=function(n,r){return this.request(Dt(r||{},{method:t,url:n,data:(r||{}).data}))}});C.forEach(["post","put","patch"],function(t){function n(r){return function(i,o,l){return this.request(Dt(l||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:i,data:o}))}}At.prototype[t]=n(),At.prototype[t+"Form"]=n(!0)});let Zi=class ra{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const r=this;this.promise.then(s=>{if(!r._listeners)return;let i=r._listeners.length;for(;i-- >0;)r._listeners[i](s);r._listeners=null}),this.promise.then=s=>{let i;const o=new Promise(l=>{r.subscribe(l),i=l}).then(s);return o.cancel=function(){r.unsubscribe(i)},o},t(function(i,o,l){r.reason||(r.reason=new Vt(i,o,l),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new ra(function(s){t=s}),cancel:t}}};function Qi(e){return function(n){return e.apply(null,n)}}function el(e){return C.isObject(e)&&e.isAxiosError===!0}const tr={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(tr).forEach(([e,t])=>{tr[t]=e});function sa(e){const t=new At(e),n=Os(At.prototype.request,t);return C.extend(n,At.prototype,t,{allOwnKeys:!0}),C.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return sa(Dt(e,s))},n}const $e=sa(an);$e.Axios=At;$e.CanceledError=Vt;$e.CancelToken=Zi;$e.isCancel=Xs;$e.VERSION=na;$e.toFormData=An;$e.AxiosError=Q;$e.Cancel=$e.CanceledError;$e.all=function(t){return Promise.all(t)};$e.spread=Qi;$e.isAxiosError=el;$e.mergeConfig=Dt;$e.AxiosHeaders=lt;$e.formToJSON=e=>Js(C.isHTMLForm(e)?new FormData(e):e);$e.getAdapter=ta.getAdapter;$e.HttpStatusCode=tr;$e.default=$e;const{Axios:xu,AxiosError:wu,CanceledError:vu,isCancel:Su,CancelToken:ju,VERSION:ku,all:Cu,Cancel:Nu,isAxiosError:Eu,spread:Tu,toFormData:Ru,AxiosHeaders:Mu,HttpStatusCode:Pu,formToJSON:Iu,getAdapter:Au,mergeConfig:Ou}=$e,tl="http://localhost:5050".trim()||"http://localhost:5050",zn=tl.replace(/\/$/,""),nl=zn.endsWith("/api")?zn:`${zn}/api`,be=$e.create({baseURL:nl,withCredentials:!0}),Z=en((e,t)=>({notes:[],loading:!1,isNotesOpen:!1,isDrawingOpen:!1,isVideoPanelOpen:!1,panelMinimized:!1,videoPanelWidth:280,pendingYoutubeUrl:null,drawingUserIdByChat:{},videoUserIdByChat:{},watchPartyYoutubeUrlByChat:{},watchPartyLocalVideoUrlByChat:{},watchPartyResumeByChat:{},watchPartyClearedByOtherByChat:{},pendingDrawingCanvasByChat:{},noteIds:new Set,setIsNotesOpen:n=>e({isNotesOpen:n,panelMinimized:n?!1:t().panelMinimized}),setIsDrawingOpen:n=>e({isDrawingOpen:n,panelMinimized:n?!1:t().panelMinimized}),setIsVideoPanelOpen:n=>e({isVideoPanelOpen:n,panelMinimized:n?!1:t().panelMinimized}),setPanelMinimized:n=>e({panelMinimized:!!n}),setVideoPanelWidth:n=>e({videoPanelWidth:Math.min(600,Math.max(240,n))}),setPendingYoutubeUrl:n=>e({pendingYoutubeUrl:n}),setDrawingInChat:(n,r)=>e(s=>{const i=n!=null?String(n):null;if(!i)return s;const o={...s.drawingUserIdByChat};return r==null?delete o[i]:o[i]=r!=null?String(r):r,{drawingUserIdByChat:o}}),setVideoInChat:(n,r)=>e(s=>{const i=n!=null?String(n):null;if(!i)return s;const o={...s.videoUserIdByChat};return r==null?delete o[i]:o[i]=r!=null?String(r):r,{videoUserIdByChat:o}}),setWatchPartyYoutubeUrl:(n,r)=>e(s=>{const i=n!=null?String(n):null;if(!i)return s;const o={...s.watchPartyYoutubeUrlByChat};return r==null||r===""?delete o[i]:o[i]=r,{watchPartyYoutubeUrlByChat:o}}),setWatchPartyLocalVideoUrl:(n,r)=>e(s=>{const i=n!=null?String(n):null;if(!i)return s;const o={...s.watchPartyLocalVideoUrlByChat};return r==null||r===""?delete o[i]:o[i]=r,{watchPartyLocalVideoUrlByChat:o}}),setWatchPartyResume:(n,r,s,i)=>e(o=>{const l=n!=null?String(n):null;if(!l||r!=="youtube"&&r!=="local")return o;const c={...o.watchPartyResumeByChat},u=c[l]??{};return c[l]={...u,[r]:{currentTime:typeof s=="number"&&s>=0?s:0,isPaused:!!i}},{watchPartyResumeByChat:c}}),setWatchPartyClearedByOther:(n,r)=>e(s=>{const i=n!=null?String(n):null;if(!i)return s;const o={...s.watchPartyClearedByOtherByChat};return r?o[i]=!0:delete o[i],{watchPartyClearedByOtherByChat:o}}),setPendingDrawingCanvas:(n,r)=>e(s=>{const i=n!=null?String(n):null;return i?{pendingDrawingCanvasByChat:{...s.pendingDrawingCanvasByChat,[i]:r}}:s}),clearPendingDrawingCanvas:n=>e(r=>{const s=n!=null?String(n):null;if(!s)return r;const i={...r.pendingDrawingCanvasByChat};return delete i[s],{pendingDrawingCanvasByChat:i}}),fetchNotes:async n=>{try{e({loading:!0});const r=await be.get(`/notes/${n}`),s=new Set(r.data.map(i=>i.messageId));e({notes:r.data.sort((i,o)=>new Date(i.messageCreatedAt)-new Date(o.messageCreatedAt)),noteIds:s,loading:!1})}catch(r){console.error("fetchNotes error:",r),e({loading:!1})}},toggleNote:async({chatId:n,messageId:r})=>{var s,i;try{const o=await be.post("/notes/toggle",{chatId:n,messageId:r}),l=t().notes,c=new Set(t().noteIds);o.data.saved?(c.add(r),e({notes:[...l,o.data.note],noteIds:c})):(c.delete(r),e({notes:l.filter(u=>u.messageId!==r),noteIds:c}))}catch(o){console.error("toggleNote error:",o);const l=(i=(s=o.response)==null?void 0:s.data)==null?void 0:i.message;l&&se.error(l)}},isNote:n=>t().noteIds.has(n),removeNoteByMessageId:async n=>{const r=typeof n=="object"&&(n!=null&&n.toString)?n.toString():String(n),s=t().notes.find(i=>String(i.messageId)===r);if(!s){e(i=>{const o=i.notes.filter(c=>String(c.messageId)!==r),l=new Set(i.noteIds);return l.delete(r),{notes:o,noteIds:l}});return}try{await be.delete(`/notes/${s._id}`)}catch(i){console.error("removeNoteByMessageId API error:",i)}e(i=>{const o=i.notes.filter(c=>String(c.messageId)!==r),l=new Set(i.noteIds);return l.delete(r),{notes:o,noteIds:l}})}})),ke=en(e=>({isTruthDareOpen:!1,panelMinimized:!1,currentGameName:null,gamePlayingNotification:null,gamePlayingUserIdByChat:{},gamePlayingGameNameByChat:{},openToGameIndex:null,setTruthDareOpen:t=>e(n=>({isTruthDareOpen:!!t,panelMinimized:t?!1:n.panelMinimized})),setPanelMinimized:t=>e({panelMinimized:!!t}),setOpenToGameIndex:t=>e({openToGameIndex:t>=0&&t<=2?t:null}),setCurrentGameName:t=>e({currentGameName:t??null}),setGamePlayingNotification:t=>e({gamePlayingNotification:t??null}),setGamePlayingInChat:(t,n,r)=>e(s=>{const i=t!=null?String(t):null;if(!i)return s;const o={...s.gamePlayingUserIdByChat},l={...s.gamePlayingGameNameByChat};return n==null?(delete o[i],delete l[i]):(o[i]=n!=null?String(n):n,l[i]=r??"Truth or Dare"),{gamePlayingUserIdByChat:o,gamePlayingGameNameByChat:l}})})),mt={pageBg:"#ffffff",appBg:"#ffffff",panelBg:"#ffffff",primary:"#2563eb",secondary:"#e5e7eb",accent:"#ec4899",accentDark:"#be185d",darkBg:"#000000",textPrimary:"#111827",textSecondary:"#6b7280",chatBg:"#f4f4f5",bubbleMine:"#2563eb",bubbleOther:"#d1d5db",inputBg:"#f8f9fb",deleteBtnBg:"#dc2626",dangerZoneBg:"#fef2f2",chatListItemHoverBg:"#f1f5f9",chatListItemSelectedBg:"#fce7f3",chatListItemSelectedBorder:"transparent",surfaceBorder:"#e2e8f0",contentBorder:"#000000",surfaceBorderOnDark:"transparent",panelDivider:"#e2e8f0",noteMineBg:"#ec4899",profileCardBorder:"#e2e8f0",profileAvatarRing:"rgba(255,255,255,0.9)",profileDecorativeBorder:"#ffffff"},rl={...mt,pageBg:"#0a0a0a",chatBg:"#0a0a0a",darkBg:"#0d0d0d",appBg:"#111111",panelBg:"#141414",inputBg:"#1a1a1a",dangerZoneBg:"#141414",chatListItemHoverBg:"#1e1e1e",chatListItemSelectedBg:"#262626",chatListItemSelectedBorder:"#404040",surfaceBorder:"#404040",contentBorder:"transparent",surfaceBorderOnDark:"#525252",panelDivider:"transparent",noteMineBg:mt.noteMineBg,profileCardBorder:"transparent",profileAvatarRing:"transparent",profileDecorativeBorder:"transparent",textPrimary:"#e5e5e5",textSecondary:"#a1a1aa",bubbleMine:"#2563eb",bubbleOther:"#404040",deleteBtnBg:"#171717"},Mt="blah-blah-theme",nr="blah-blah-theme-before-reset";let $n=null,Hr="";const Vr=()=>{try{const e=localStorage.getItem(Mt);if(e){const t=JSON.parse(e);return{...mt,...t}}}catch{}return mt},qr=()=>{try{const e=localStorage.getItem(nr);if(e)return JSON.parse(e)}catch{}return null},dn=e=>{if(!e)return;const t=JSON.stringify(e);t!==Hr&&($n&&clearTimeout($n),$n=setTimeout(async()=>{try{await be.put("/auth/update-profile",{theme:e}),Hr=t}catch{}},350))},dt=en((e,t)=>({theme:Vr(),draftTheme:null,initDraft:()=>{const{theme:n}=t();e({draftTheme:n?{...n}:null})},resetDraft:()=>{const{theme:n}=t();try{n&&localStorage.setItem(nr,JSON.stringify(n))}catch{}e({draftTheme:{...mt}})},setThemeValue:(n,r)=>e(s=>{const i={...s.theme,[n]:r};try{localStorage.setItem(Mt,JSON.stringify(i))}catch{}return dn(i),{theme:i}}),setDraftValue:(n,r)=>e(s=>s.draftTheme?{draftTheme:{...s.draftTheme,[n]:r}}:s),saveDraft:()=>{const{draftTheme:n}=t();if(n){try{localStorage.setItem(Mt,JSON.stringify(n))}catch{}e({theme:n}),dn(n)}},initDraftFromSaved:()=>{const n=Vr();e({draftTheme:n?{...n}:null})},undoReset:()=>{const n=qr();if(!n)return!1;try{localStorage.setItem(Mt,JSON.stringify(n)),localStorage.removeItem(nr)}catch{return!1}return e({theme:n,draftTheme:{...n}}),!0},hasResetBackup:()=>!!qr(),resetToDefault:()=>{try{localStorage.setItem(Mt,JSON.stringify(mt))}catch{}const n={...mt};e({theme:n}),dn(n)},applyPreset:n=>{const r=n==="dark"?{...rl}:{...mt};try{localStorage.setItem(Mt,JSON.stringify(r))}catch{}e({theme:r}),dn(r)},hydrateFromAccountTheme:n=>{const r=n?{...mt,...n}:{...mt};try{localStorage.setItem(Mt,JSON.stringify(r))}catch{}e({theme:r})}}));function Hn(){Z.getState().setIsNotesOpen(!1),ke.getState().setTruthDareOpen(!1),Re.getState().clearSelectedChat()}function sl(){var n;if(typeof window>"u"||!((n=window.history)!=null&&n.replaceState))return;const e=new URL(window.location.href);let t=!1;for(const r of["token","access_token"])e.searchParams.has(r)&&(e.searchParams.delete(r),t=!0);if(e.hash){const r=new URLSearchParams(e.hash.replace(/^#/,""));for(const i of["token","access_token"])r.has(i)&&(r.delete(i),t=!0);const s=r.toString()?`#${r.toString()}`:"";e.hash!==s&&(e.hash=s,t=!0)}t&&window.history.replaceState(null,"",e.pathname+e.search+e.hash)}const K=en((e,t)=>({authUser:null,token:localStorage.getItem("token"),isSigningUp:!1,isLoggingIn:!1,isUpdatingProfile:!1,isCheckingAuth:!0,onlineUsers:[],socket:null,checkAuth:async()=>{sl();try{const n=localStorage.getItem("token");n&&(be.defaults.headers.common.Authorization=`Bearer ${n}`);const r=await be.get("/auth/check",{withCredentials:!0});e({authUser:r.data}),dt.getState().hydrateFromAccountTheme(r.data.theme),Hn(),t().connectSocket()}catch(n){console.log("Error in checkAuth:",n),e({authUser:null})}finally{e({isCheckingAuth:!1})}},signup:async n=>{var r,s;e({isSigningUp:!0});try{const i=await be.post("/auth/signup",n),{user:o,token:l}=i.data;localStorage.setItem("token",l),be.defaults.headers.common.Authorization=`Bearer ${l}`,e({authUser:o,token:l}),dt.getState().hydrateFromAccountTheme(o.theme),Hn(),se.success("Account created successfully"),t().connectSocket()}catch(i){se.error(((s=(r=i.response)==null?void 0:r.data)==null?void 0:s.message)||"Signup failed")}finally{e({isSigningUp:!1})}},login:async n=>{var r,s;e({isLoggingIn:!0});try{const i=await be.post("/auth/login",n),{user:o,token:l}=i.data;localStorage.setItem("token",l),be.defaults.headers.common.Authorization=`Bearer ${l}`,e({authUser:o,token:l}),dt.getState().hydrateFromAccountTheme(o.theme),Hn(),se.success("Logged in successfully"),t().connectSocket()}catch(i){se.error(((s=(r=i.response)==null?void 0:r.data)==null?void 0:s.message)||"Login failed")}finally{e({isLoggingIn:!1})}},logout:async()=>{var n,r;try{await be.post("/auth/logout"),localStorage.removeItem("token"),delete be.defaults.headers.common.Authorization,e({authUser:null,token:null}),se.success("Logged out successfully");const s=t().socket;s==null||s.off(),s==null||s.disconnect(),e({messages:[],chats:[],selectedChat:null,selectedUser:null}),t().disconnectSocket()}catch(s){se.error(((r=(n=s.response)==null?void 0:n.data)==null?void 0:r.message)||"Logout failed")}},deleteAccount:async()=>{var n,r;try{await be.post("/auth/delete-account",{},{withCredentials:!0}),localStorage.removeItem("token"),delete be.defaults.headers.common.Authorization,e({authUser:null,token:null});const s=t().socket;s==null||s.off(),s==null||s.disconnect(),t().disconnectSocket(),se.success("Account deleted")}catch(s){throw se.error(((r=(n=s.response)==null?void 0:n.data)==null?void 0:r.message)||"Failed to delete account"),s}},updateProfile:async n=>{var r,s;e({isUpdatingProfile:!0});try{const i=await be.put("/auth/update-profile",n);e({authUser:i.data}),se.success("Profile updated successfully")}catch(i){se.error(((s=(r=i.response)==null?void 0:r.data)==null?void 0:s.message)||"Update failed")}finally{e({isUpdatingProfile:!1})}},connectSocket:()=>{const{authUser:n,token:r}=t();if(!n||!r||!n||t().socket)return;const s="http://localhost:5050".trim()||"http://localhost:5050",i=Ma(s,{auth:{token:r},transports:["websocket","polling"],reconnectionAttempts:12,reconnectionDelay:1e3});window.socket=i,i.on("connect",()=>{Re.getState().subscribeToMessages()}),i.on("connect_error",o=>{console.error("❌ SOCKET CONNECT ERROR:",o.message)}),i.on("getOnlineUsers",o=>{const l=Array.isArray(o)?o.map(c=>String(c)):[];e({onlineUsers:l})}),e({socket:i})},disconnectSocket:()=>{var n;(n=t().socket)!=null&&n.connected&&(t().socket.disconnect(),e({socket:null}))}})),al=30,Re=en((e,t)=>({messages:[],messagesByChatId:{},users:[],selectedUser:null,isUsersLoading:!1,isMessagesLoading:!1,isMessagesLoadingMore:!1,hasMoreOlderMessages:!1,chats:[],selectedChat:null,lastSeenAtByConversation:{},rejectedChatId:null,unreadCountByChatId:{},isScreenSharing:!1,sendByCodeLoading:!1,isChatsLoading:!1,friendsChats:[],acceptChat:async n=>{await be.post("/conversations/accept",{conversationId:n});const r=await be.get("/conversations/my");e(s=>{const i=r.data,o=i.find(l=>l._id===n);return{chats:i,selectedChat:o??s.selectedChat}}),t().getMyFriends()},rejectChat:async n=>{await be.post("/conversations/reject",{conversationId:n}),e(r=>{var i;const s=((i=r.selectedChat)==null?void 0:i._id)===n;return{chats:r.chats.filter(o=>o._id!==n),selectedChat:s?null:r.selectedChat,selectedUser:s?null:r.selectedUser,messages:s?[]:r.messages}}),se.success("Chat rejected")},removeFriend:async n=>{var r,s,i,o,l;try{const c=n!=null?typeof n=="object"&&(n!=null&&n.toString)?n.toString():String(n):null;if(!c){se.error("Invalid conversation");return}await be.post("/conversations/remove",{conversationId:c});const u=await be.get("/conversations/my");e(f=>{var g,_,j;const h=u.data||[],y=((g=f.selectedChat)==null?void 0:g._id)===c||((_=f.selectedChat)==null?void 0:_._id)===n,b=h.find(k=>String(k._id)===String(c));return{chats:h,selectedChat:y&&b?b:y?null:f.selectedChat,selectedUser:y&&b?((j=b.participants)==null?void 0:j.find(k=>{var x;return k&&String(k._id??k)!==String((x=K.getState().authUser)==null?void 0:x._id)}))??null:y?null:f.selectedUser,messages:y&&!b?[]:f.messages}}),se.success("Friend removed"),t().getMyFriends()}catch(c){const u=((s=(r=c.response)==null?void 0:r.data)==null?void 0:s.message)||c.message||"Failed to remove friend";se.error(u),((i=c.response)==null?void 0:i.status)===404&&!((l=(o=c.response)==null?void 0:o.data)!=null&&l.message)&&console.warn("Remove friend 404: check VITE_BACKEND_URL points to your backend (no /api suffix)")}},getMyChats:async()=>{e({isChatsLoading:!0});try{const r=(await be.get("/conversations/my")).data||[];e(s=>{var o,l,c;const i={chats:r};if((o=s.selectedChat)!=null&&o._id){const u=r.find(f=>String(f._id)===String(s.selectedChat._id));if(u){i.selectedChat=u;const f=(l=K.getState().authUser)==null?void 0:l._id;i.selectedUser=((c=u.participants)==null?void 0:c.find(h=>h&&String(h._id??h)!==String(f)))??s.selectedUser}}return i})}catch{se.error("Failed to load chats")}finally{e({isChatsLoading:!1})}},getMyFriends:async()=>{try{const n=await be.get("/conversations/friends");e({friendsChats:n.data||[]})}catch{se.error("Failed to load friends")}},ensureChatInList:n=>{n!=null&&n._id&&e(r=>r.chats.some(i=>String(i._id)===String(n._id))?r:{chats:[n,...r.chats]})},startScreenShare:()=>{e({isScreenSharing:!0}),K.getState().socket.emit("start_screen_share")},stopScreenShare:()=>{e({isScreenSharing:!1}),K.getState().socket.emit("stop_screen_share")},setSelectedChat:n=>{const r=Z.getState(),s=ke.getState();return r.setIsNotesOpen(!1),r.setIsDrawingOpen(!1),r.setIsVideoPanelOpen(!1),r.setPanelMinimized(!1),s.setTruthDareOpen(!1),s.setPanelMinimized(!1),e(i=>{var h,y;if(((h=i.selectedChat)==null?void 0:h._id)===(n==null?void 0:n._id))return i;const l=n.participants.find(b=>b._id!==K.getState().authUser._id),c=(n==null?void 0:n._id)!=null?String(n._id):null,u=c&&Array.isArray((y=i.messagesByChatId)==null?void 0:y[c])?i.messagesByChatId[c]:[],f={...i.unreadCountByChatId};return n!=null&&n._id&&delete f[n._id],{selectedChat:n,selectedUser:l,messages:u,unreadCountByChatId:f}})},getUsers:async()=>{e({isUsersLoading:!0});try{const n=await be.get("/messages/users");e({users:n.data})}catch(n){se.error(n.response.data.message)}finally{e({isUsersLoading:!1})}},deleteMessage:async(n,r)=>{try{const s=typeof n=="object"&&(n!=null&&n.toString)?n.toString():n;if(await be.delete(`/messages/delete/${s}?scope=${encodeURIComponent(r)}`,{data:{scope:r}}),Z.getState().removeNoteByMessageId(s),r==="me"){const i=typeof n=="object"&&(n!=null&&n.toString)?n.toString():String(n);e(o=>{var u;const l=o.messages.filter(f=>String(f._id)!==i),c=((u=o.selectedChat)==null?void 0:u._id)!=null?String(o.selectedChat._id):null;return{messages:l,messagesByChatId:c?{...o.messagesByChatId,[c]:l}:o.messagesByChatId}})}}catch(s){console.error(s),se.error("Delete failed")}},getMessagesByConversation:async n=>{var o;if(!n){e({messages:[],hasMoreOlderMessages:!1});return}const r=String(n),s=(o=t().messagesByChatId)==null?void 0:o[r],i=Array.isArray(s)&&s.length>0;e(i?{messages:s,isMessagesLoading:!1}:{isMessagesLoading:!0});try{const c=(await be.get(`/messages/conversation/${n}`,{params:{limit:al}})).data||{},u=Array.isArray(c)?c:c.messages||[],f=c.hasMore===!0;e(y=>({messages:u,hasMoreOlderMessages:f,isMessagesLoading:!1,messagesByChatId:{...y.messagesByChatId,[r]:u}}));const h=u.length>0?u[u.length-1]:null;e(y=>({chats:y.chats.map(b=>String(b._id)===String(n)?{...b,lastMessage:h}:b)}))}catch{e({isMessagesLoading:!1})}},loadMoreOlderMessages:async n=>{const r=t(),{messages:s,hasMoreOlderMessages:i,isMessagesLoadingMore:o}=r;if(!n||!i||o||!Array.isArray(s)||s.length===0)return;const l=s[0]._id;e({isMessagesLoadingMore:!0});try{const u=(await be.get(`/messages/conversation/${n}`,{params:{limit:50,before:l}})).data||{},f=Array.isArray(u)?[]:u.messages||[],h=u.hasMore===!0;e(y=>({messages:[...f,...y.messages],hasMoreOlderMessages:h,isMessagesLoadingMore:!1,messagesByChatId:{...y.messagesByChatId,[String(n)]:[...f,...y.messages]}}))}catch{e({isMessagesLoadingMore:!1})}},sendMessageByCode:async({userCode:n,text:r})=>{e({sendByCodeLoading:!0});try{const s=await be.post("/messages/send-by-code",{userCode:n,text:r},{withCredentials:!0}),{chat:i}=s.data||{};return i&&(e(o=>({chats:o.chats.some(c=>c._id===i._id)?o.chats.map(c=>c._id===i._id?i:c):[i,...o.chats]})),t().setSelectedChat(i)),s.data}finally{e({sendByCodeLoading:!1})}},sendMessage:async n=>{var s,i;const{selectedUser:r}=t();try{await be.post(`/messages/send/${r._id}`,n,{maxContentLength:50*1024*1024,maxBodyLength:50*1024*1024,timeout:6e4});const o=K.getState().socket;o.emit("join_chat",{chatId:n.conversationId}),n.image||o.emit("send_message",{chatId:n.conversationId,message:n.text}),t().getMyChats()}catch(o){console.error("Send failed:",o),se.error(((i=(s=o.response)==null?void 0:s.data)==null?void 0:i.message)||"Failed to send message")}},markMessageRevealed:n=>e(r=>{var o;const s=r.messages.map(l=>l._id===n?{...l,revealed:!0}:l),i=((o=r.selectedChat)==null?void 0:o._id)!=null?String(r.selectedChat._id):null;return{messages:s,messagesByChatId:i?{...r.messagesByChatId,[i]:s}:r.messagesByChatId}}),subscribeToMessages:()=>{const n=K.getState().socket;n&&(n.off("messagesSeen"),n.off("messageSeen"),n.off("newMessage"),n.off("newChatMessage"),n.off("messageDeletedForEveryone"),n.off("message-revealed"),n.off("chat_seen_update"),n.on("chat_seen_update",({chatId:r,seenAt:s})=>{var o;const i=(o=K.getState().authUser)==null?void 0:o._id;e(l=>({messages:l.messages.map(c=>String(c.chatId)===String(r)&&String(c.senderId)===String(i)?{...c,seen:!0,seenAt:s}:c)}))}),n.on("messageSeen",({messageId:r,seenAt:s})=>{e(i=>({messages:i.messages.map(o=>String(o._id)===String(r)?{...o,seen:!0,seenAt:s}:o)}))}),n.on("new_message",r=>{var o;const s=r.message??r,i=(o=K.getState().authUser)==null?void 0:o._id;if(e(l=>{const c=l.selectedChat&&String(l.selectedChat._id)===String(s.chatId),u=s.senderId&&String(s.senderId)!==String(i),f=s.receiverId&&String(s.receiverId)===String(i),h={...l.unreadCountByChatId};if(f&&u&&!c&&s.chatId){const g=String(s.chatId);h[g]=(h[g]??0)+1}const y=s.chatId!=null?String(s.chatId):null;let b=l.chats;if(y){const g=l.chats.find(j=>String(j._id)===y),_=g?{...g,lastMessage:s,updatedAt:s.createdAt||g.updatedAt}:null;_&&(b=[_,...l.chats.filter(j=>String(j._id)!==y)])}return{messages:c?[...l.messages,s]:l.messages,unreadCountByChatId:h,chats:b,messagesByChatId:c&&s.chatId?{...l.messagesByChatId,[String(s.chatId)]:[...l.messages,s]}:l.messagesByChatId}}),typeof document<"u"&&document.visibilityState==="visible"&&s.chatId&&i&&String(s.receiverId)===String(i)){const l=t();l.selectedChat&&String(l.selectedChat._id)===String(s.chatId)&&n.emit("chat_opened",{chatId:s.chatId,userId:i})}}),n.on("messageDeletedForEveryone",({messageId:r,deletedBy:s})=>{Z.getState().removeNoteByMessageId(r),e(i=>({messages:i.messages.map(o=>o._id===r?{...o,deleted:!0,deletedBy:s,text:""}:o)}))}))},markChatSeen:(n,r)=>e(s=>({messages:s.messages.map(i=>String(i.chatId)===String(n)?{...i,seen:!0,seenAt:r}:i)})),subscribeToChatEvents:()=>{const n=K.getState().socket;n&&(n.off("newChatMessage"),n.on("chatRejected",({conversationId:r})=>{const{selectedChat:s}=t();if(s&&String(s._id)===String(r)){e({rejectedChatId:r}),setTimeout(()=>{e(o=>({chats:o.chats.filter(l=>String(l._id)!==String(r)),selectedChat:null,selectedUser:null,messages:[],rejectedChatId:null}))},2500);return}e(o=>({chats:o.chats.filter(l=>l._id!==r),selectedChat:o.selectedChat,messages:o.messages,selectedUser:o.selectedUser}))}),n.on("chatUnaccepted",()=>{t().getMyChats(),t().getMyFriends()}),n.on("chatAccepted",()=>{t().getMyChats(),t().getMyFriends()}),n.on("ai_private_reply",r=>{e(s=>({messages:[...s.messages,r]}))}),n.on("newChatMessage",({chat:r,message:s})=>{var o;const i=(o=K.getState().authUser)==null?void 0:o._id;e(l=>{const c=l.chats.some(y=>y._id===r._id),u=l.selectedChat&&String(l.selectedChat._id)===String(r._id),f=(s==null?void 0:s.senderId)&&String(s.senderId)!==String(i),h={...l.unreadCountByChatId};if(s&&f&&!u&&r._id){const y=String(r._id);h[y]=(h[y]??0)+1}return{chats:c?l.chats.map(y=>y._id===r._id?r:y):[r,...l.chats],unreadCountByChatId:h}})}))},setSelectedUser:n=>e({selectedUser:n}),clearSelectedChat:()=>e({selectedChat:null,selectedUser:null,messages:[]}),clearMessagesForCurrentChat:async()=>{var o;const n=t(),r=[...n.messages||[]],s=((o=n.selectedChat)==null?void 0:o._id)!=null?String(n.selectedChat._id):null;e({messages:[],chats:s?n.chats.map(l=>String(l._id)===s?{...l,lastMessage:null}:l):n.chats});let i=0;for(const l of r)try{const c=l._id!=null?String(l._id):l._id;if(!c)continue;await be.delete(`/messages/delete/${c}?scope=me`,{data:{scope:"me"}}),Z.getState().removeNoteByMessageId(c)}catch{i+=1}i===0&&(se.success("Conversation cleared for you. The other person can still see the messages."),e(l=>({chats:s?l.chats.filter(c=>String(c._id)!==s):l.chats,selectedChat:null,selectedUser:null,messages:[]})))}}));/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ol=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),aa=(...e)=>e.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var il={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ll=d.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:s="",children:i,iconNode:o,...l},c)=>d.createElement("svg",{ref:c,...il,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:aa("lucide",s),...l},[...o.map(([u,f])=>d.createElement(u,f)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=(e,t)=>{const n=d.forwardRef(({className:r,...s},i)=>d.createElement(ll,{ref:i,iconNode:t,className:aa(`lucide-${ol(e)}`,r),...s}));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cl=ae("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dl=ae("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ul=ae("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fl=ae("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hl=ae("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ml=ae("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wr=ae("EllipsisVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pl=ae("Eraser",[["path",{d:"m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21",key:"182aya"}],["path",{d:"M22 21H7",key:"t4ddhn"}],["path",{d:"m5 11 9 9",key:"1mo9qw"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jn=ae("EyeOff",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kn=ae("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rr=ae("Gamepad2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gl=ae("GripVertical",[["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}],["circle",{cx:"9",cy:"5",r:"1",key:"hp0tcf"}],["circle",{cx:"9",cy:"19",r:"1",key:"fkjjf6"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["circle",{cx:"15",cy:"19",r:"1",key:"f4zoj3"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yl=ae("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oa=ae("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ia=ae("Loader",[["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m16.2 7.8 2.9-2.9",key:"r700ao"}],["path",{d:"M18 12h4",key:"wj9ykh"}],["path",{d:"m16.2 16.2 2.9 2.9",key:"1bxg5t"}],["path",{d:"M12 18v4",key:"jadmvz"}],["path",{d:"m4.9 19.1 2.9-2.9",key:"bwix9q"}],["path",{d:"M2 12h4",key:"j09sii"}],["path",{d:"m4.9 4.9 2.9 2.9",key:"giyufr"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bl=ae("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const la=ae("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ca=ae("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yr=ae("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sr=ae("MonitorPlay",[["path",{d:"M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z",key:"1pctta"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["rect",{x:"2",y:"3",width:"20",height:"14",rx:"2",key:"x3v2xh"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _l=ae("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xl=ae("Paperclip",[["path",{d:"m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",key:"1u3ebp"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wl=ae("Pause",[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cn=ae("Pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vl=ae("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sl=ae("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jl=ae("Redo2",[["path",{d:"m15 14 5-5-5-5",key:"12vg1m"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",key:"6uklza"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ar=ae("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kl=ae("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cl=ae("SkipBack",[["polygon",{points:"19 20 9 12 19 4 19 20",key:"o2sva"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5",key:"1ocqjk"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nl=ae("SkipForward",[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xt=ae("StickyNote",[["path",{d:"M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z",key:"qazsjp"}],["path",{d:"M15 3v4a2 2 0 0 0 2 2h4",key:"40519r"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const El=ae("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=ae("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tl=ae("Undo2",[["path",{d:"M9 14 4 9l5-5",key:"102s5s"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",key:"f3b9sd"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rl=ae("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nn=ae("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ml=ae("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pl=ae("Video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kt=ae("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Kt(){return Kt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Kt.apply(this,arguments)}var vt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(vt||(vt={}));const Gr="popstate";function Il(e){e===void 0&&(e={});function t(r,s){let{pathname:i,search:o,hash:l}=r.location;return or("",{pathname:i,search:o,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function n(r,s){return typeof s=="string"?s:En(s)}return Ol(t,n,null,e)}function ze(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function mr(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Al(){return Math.random().toString(36).substr(2,8)}function Jr(e,t){return{usr:e.state,key:e.key,idx:t}}function or(e,t,n,r){return n===void 0&&(n=null),Kt({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?qt(t):t,{state:n,key:t&&t.key||r||Al()})}function En(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function qt(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Ol(e,t,n,r){r===void 0&&(r={});let{window:s=document.defaultView,v5Compat:i=!1}=r,o=s.history,l=vt.Pop,c=null,u=f();u==null&&(u=0,o.replaceState(Kt({},o.state,{idx:u}),""));function f(){return(o.state||{idx:null}).idx}function h(){l=vt.Pop;let j=f(),k=j==null?null:j-u;u=j,c&&c({action:l,location:_.location,delta:k})}function y(j,k){l=vt.Push;let x=or(_.location,j,k);u=f()+1;let v=Jr(x,u),E=_.createHref(x);try{o.pushState(v,"",E)}catch(R){if(R instanceof DOMException&&R.name==="DataCloneError")throw R;s.location.assign(E)}i&&c&&c({action:l,location:_.location,delta:1})}function b(j,k){l=vt.Replace;let x=or(_.location,j,k);u=f();let v=Jr(x,u),E=_.createHref(x);o.replaceState(v,"",E),i&&c&&c({action:l,location:_.location,delta:0})}function g(j){let k=s.location.origin!=="null"?s.location.origin:s.location.href,x=typeof j=="string"?j:En(j);return x=x.replace(/ $/,"%20"),ze(k,"No window.location.(origin|href) available to create URL for href: "+x),new URL(x,k)}let _={get action(){return l},get location(){return e(s,o)},listen(j){if(c)throw new Error("A history only accepts one active listener");return s.addEventListener(Gr,h),c=j,()=>{s.removeEventListener(Gr,h),c=null}},createHref(j){return t(s,j)},createURL:g,encodeLocation(j){let k=g(j);return{pathname:k.pathname,search:k.search,hash:k.hash}},push:y,replace:b,go(j){return o.go(j)}};return _}var Xr;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Xr||(Xr={}));function Dl(e,t,n){return n===void 0&&(n="/"),Bl(e,t,n)}function Bl(e,t,n,r){let s=typeof t=="string"?qt(t):t,i=pr(s.pathname||"/",n);if(i==null)return null;let o=da(e);Ll(o);let l=null;for(let c=0;l==null&&c<o.length;++c){let u=Xl(i);l=Yl(o[c],u)}return l}function da(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let s=(i,o,l)=>{let c={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};c.relativePath.startsWith("/")&&(ze(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let u=St([r,c.relativePath]),f=n.concat(c);i.children&&i.children.length>0&&(ze(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),da(i.children,t,f,u)),!(i.path==null&&!i.index)&&t.push({path:u,score:ql(u,i.index),routesMeta:f})};return e.forEach((i,o)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))s(i,o);else for(let c of ua(i.path))s(i,o,c)}),t}function ua(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,s=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return s?[i,""]:[i];let o=ua(r.join("/")),l=[];return l.push(...o.map(c=>c===""?i:[i,c].join("/"))),s&&l.push(...o),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function Ll(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Wl(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Ul=/^:[\w-]+$/,Fl=3,zl=2,$l=1,Hl=10,Vl=-2,Kr=e=>e==="*";function ql(e,t){let n=e.split("/"),r=n.length;return n.some(Kr)&&(r+=Vl),t&&(r+=zl),n.filter(s=>!Kr(s)).reduce((s,i)=>s+(Ul.test(i)?Fl:i===""?$l:Hl),r)}function Wl(e,t){return e.length===t.length&&e.slice(0,-1).every((r,s)=>r===t[s])?e[e.length-1]-t[t.length-1]:0}function Yl(e,t,n){let{routesMeta:r}=e,s={},i="/",o=[];for(let l=0;l<r.length;++l){let c=r[l],u=l===r.length-1,f=i==="/"?t:t.slice(i.length)||"/",h=Gl({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},f),y=c.route;if(!h)return null;Object.assign(s,h.params),o.push({params:s,pathname:St([i,h.pathname]),pathnameBase:tc(St([i,h.pathnameBase])),route:y}),h.pathnameBase!=="/"&&(i=St([i,h.pathnameBase]))}return o}function Gl(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Jl(e.path,e.caseSensitive,e.end),s=t.match(n);if(!s)return null;let i=s[0],o=i.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:r.reduce((u,f,h)=>{let{paramName:y,isOptional:b}=f;if(y==="*"){let _=l[h]||"";o=i.slice(0,i.length-_.length).replace(/(.)\/+$/,"$1")}const g=l[h];return b&&!g?u[y]=void 0:u[y]=(g||"").replace(/%2F/g,"/"),u},{}),pathname:i,pathnameBase:o,pattern:e}}function Jl(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),mr(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],s="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,c)=>(r.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),s+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":e!==""&&e!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,t?void 0:"i"),r]}function Xl(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return mr(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function pr(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const Kl=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Zl=e=>Kl.test(e);function Ql(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:s=""}=typeof e=="string"?qt(e):e,i;if(n)if(Zl(n))i=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),mr(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?i=Zr(n.substring(1),"/"):i=Zr(n,t)}else i=t;return{pathname:i,search:nc(r),hash:rc(s)}}function Zr(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function Vn(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function ec(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function gr(e,t){let n=ec(e);return t?n.map((r,s)=>s===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function yr(e,t,n,r){r===void 0&&(r=!1);let s;typeof e=="string"?s=qt(e):(s=Kt({},e),ze(!s.pathname||!s.pathname.includes("?"),Vn("?","pathname","search",s)),ze(!s.pathname||!s.pathname.includes("#"),Vn("#","pathname","hash",s)),ze(!s.search||!s.search.includes("#"),Vn("#","search","hash",s)));let i=e===""||s.pathname==="",o=i?"/":s.pathname,l;if(o==null)l=n;else{let h=t.length-1;if(!r&&o.startsWith("..")){let y=o.split("/");for(;y[0]==="..";)y.shift(),h-=1;s.pathname=y.join("/")}l=h>=0?t[h]:"/"}let c=Ql(s,l),u=o&&o!=="/"&&o.endsWith("/"),f=(i||o===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||f)&&(c.pathname+="/"),c}const St=e=>e.join("/").replace(/\/\/+/g,"/"),tc=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),nc=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,rc=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function sc(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const fa=["post","put","patch","delete"];new Set(fa);const ac=["get",...fa];new Set(ac);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Zt(){return Zt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Zt.apply(this,arguments)}const br=d.createContext(null),oc=d.createContext(null),Nt=d.createContext(null),Dn=d.createContext(null),Et=d.createContext({outlet:null,matches:[],isDataRoute:!1}),ha=d.createContext(null);function ic(e,t){let{relative:n}=t===void 0?{}:t;Wt()||ze(!1);let{basename:r,navigator:s}=d.useContext(Nt),{hash:i,pathname:o,search:l}=pa(e,{relative:n}),c=o;return r!=="/"&&(c=o==="/"?r:St([r,o])),s.createHref({pathname:c,search:l,hash:i})}function Wt(){return d.useContext(Dn)!=null}function Bt(){return Wt()||ze(!1),d.useContext(Dn).location}function ma(e){d.useContext(Nt).static||d.useLayoutEffect(e)}function _r(){let{isDataRoute:e}=d.useContext(Et);return e?xc():lc()}function lc(){Wt()||ze(!1);let e=d.useContext(br),{basename:t,future:n,navigator:r}=d.useContext(Nt),{matches:s}=d.useContext(Et),{pathname:i}=Bt(),o=JSON.stringify(gr(s,n.v7_relativeSplatPath)),l=d.useRef(!1);return ma(()=>{l.current=!0}),d.useCallback(function(u,f){if(f===void 0&&(f={}),!l.current)return;if(typeof u=="number"){r.go(u);return}let h=yr(u,JSON.parse(o),i,f.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:St([t,h.pathname])),(f.replace?r.replace:r.push)(h,f.state,f)},[t,r,o,i,e])}function pa(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=d.useContext(Nt),{matches:s}=d.useContext(Et),{pathname:i}=Bt(),o=JSON.stringify(gr(s,r.v7_relativeSplatPath));return d.useMemo(()=>yr(e,JSON.parse(o),i,n==="path"),[e,o,i,n])}function cc(e,t){return dc(e,t)}function dc(e,t,n,r){Wt()||ze(!1);let{navigator:s}=d.useContext(Nt),{matches:i}=d.useContext(Et),o=i[i.length-1],l=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:"/";o&&o.route;let u=Bt(),f;if(t){var h;let j=typeof t=="string"?qt(t):t;c==="/"||(h=j.pathname)!=null&&h.startsWith(c)||ze(!1),f=j}else f=u;let y=f.pathname||"/",b=y;if(c!=="/"){let j=c.replace(/^\//,"").split("/");b="/"+y.replace(/^\//,"").split("/").slice(j.length).join("/")}let g=Dl(e,{pathname:b}),_=pc(g&&g.map(j=>Object.assign({},j,{params:Object.assign({},l,j.params),pathname:St([c,s.encodeLocation?s.encodeLocation(j.pathname).pathname:j.pathname]),pathnameBase:j.pathnameBase==="/"?c:St([c,s.encodeLocation?s.encodeLocation(j.pathnameBase).pathname:j.pathnameBase])})),i,n,r);return t&&_?d.createElement(Dn.Provider,{value:{location:Zt({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:vt.Pop}},_):_}function uc(){let e=_c(),t=sc(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return d.createElement(d.Fragment,null,d.createElement("h2",null,"Unexpected Application Error!"),d.createElement("h3",{style:{fontStyle:"italic"}},t),n?d.createElement("pre",{style:s},n):null,null)}const fc=d.createElement(uc,null);class hc extends d.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?d.createElement(Et.Provider,{value:this.props.routeContext},d.createElement(ha.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function mc(e){let{routeContext:t,match:n,children:r}=e,s=d.useContext(br);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),d.createElement(Et.Provider,{value:t},r)}function pc(e,t,n,r){var s;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,l=(s=n)==null?void 0:s.errors;if(l!=null){let f=o.findIndex(h=>h.route.id&&(l==null?void 0:l[h.route.id])!==void 0);f>=0||ze(!1),o=o.slice(0,Math.min(o.length,f+1))}let c=!1,u=-1;if(n&&r&&r.v7_partialHydration)for(let f=0;f<o.length;f++){let h=o[f];if((h.route.HydrateFallback||h.route.hydrateFallbackElement)&&(u=f),h.route.id){let{loaderData:y,errors:b}=n,g=h.route.loader&&y[h.route.id]===void 0&&(!b||b[h.route.id]===void 0);if(h.route.lazy||g){c=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((f,h,y)=>{let b,g=!1,_=null,j=null;n&&(b=l&&h.route.id?l[h.route.id]:void 0,_=h.route.errorElement||fc,c&&(u<0&&y===0?(wc("route-fallback"),g=!0,j=null):u===y&&(g=!0,j=h.route.hydrateFallbackElement||null)));let k=t.concat(o.slice(0,y+1)),x=()=>{let v;return b?v=_:g?v=j:h.route.Component?v=d.createElement(h.route.Component,null):h.route.element?v=h.route.element:v=f,d.createElement(mc,{match:h,routeContext:{outlet:f,matches:k,isDataRoute:n!=null},children:v})};return n&&(h.route.ErrorBoundary||h.route.errorElement||y===0)?d.createElement(hc,{location:n.location,revalidation:n.revalidation,component:_,error:b,children:x(),routeContext:{outlet:null,matches:k,isDataRoute:!0}}):x()},null)}var ga=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ga||{}),ya=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(ya||{});function gc(e){let t=d.useContext(br);return t||ze(!1),t}function yc(e){let t=d.useContext(oc);return t||ze(!1),t}function bc(e){let t=d.useContext(Et);return t||ze(!1),t}function ba(e){let t=bc(),n=t.matches[t.matches.length-1];return n.route.id||ze(!1),n.route.id}function _c(){var e;let t=d.useContext(ha),n=yc(),r=ba();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function xc(){let{router:e}=gc(ga.UseNavigateStable),t=ba(ya.UseNavigateStable),n=d.useRef(!1);return ma(()=>{n.current=!0}),d.useCallback(function(s,i){i===void 0&&(i={}),n.current&&(typeof s=="number"?e.navigate(s):e.navigate(s,Zt({fromRouteId:t},i)))},[e,t])}const Qr={};function wc(e,t,n){Qr[e]||(Qr[e]=!0)}function vc(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Tt(e){let{to:t,replace:n,state:r,relative:s}=e;Wt()||ze(!1);let{future:i,static:o}=d.useContext(Nt),{matches:l}=d.useContext(Et),{pathname:c}=Bt(),u=_r(),f=yr(t,gr(l,i.v7_relativeSplatPath),c,s==="path"),h=JSON.stringify(f);return d.useEffect(()=>u(JSON.parse(h),{replace:n,state:r,relative:s}),[u,h,s,n,r]),null}function Pt(e){ze(!1)}function Sc(e){let{basename:t="/",children:n=null,location:r,navigationType:s=vt.Pop,navigator:i,static:o=!1,future:l}=e;Wt()&&ze(!1);let c=t.replace(/^\/*/,"/"),u=d.useMemo(()=>({basename:c,navigator:i,static:o,future:Zt({v7_relativeSplatPath:!1},l)}),[c,l,i,o]);typeof r=="string"&&(r=qt(r));let{pathname:f="/",search:h="",hash:y="",state:b=null,key:g="default"}=r,_=d.useMemo(()=>{let j=pr(f,c);return j==null?null:{location:{pathname:j,search:h,hash:y,state:b,key:g},navigationType:s}},[c,f,h,y,b,g,s]);return _==null?null:d.createElement(Nt.Provider,{value:u},d.createElement(Dn.Provider,{children:n,value:_}))}function jc(e){let{children:t,location:n}=e;return cc(ir(t),n)}new Promise(()=>{});function ir(e,t){t===void 0&&(t=[]);let n=[];return d.Children.forEach(e,(r,s)=>{if(!d.isValidElement(r))return;let i=[...t,s];if(r.type===d.Fragment){n.push.apply(n,ir(r.props.children,i));return}r.type!==Pt&&ze(!1),!r.props.index||!r.props.children||ze(!1);let o={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=ir(r.props.children,i)),n.push(o)}),n}/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function lr(){return lr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},lr.apply(this,arguments)}function kc(e,t){if(e==null)return{};var n={},r=Object.keys(e),s,i;for(i=0;i<r.length;i++)s=r[i],!(t.indexOf(s)>=0)&&(n[s]=e[s]);return n}function Cc(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Nc(e,t){return e.button===0&&(!t||t==="_self")&&!Cc(e)}const Ec=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Tc="6";try{window.__reactRouterVersion=Tc}catch{}const Rc="startTransition",es=Ea[Rc];function Mc(e){let{basename:t,children:n,future:r,window:s}=e,i=d.useRef();i.current==null&&(i.current=Il({window:s,v5Compat:!0}));let o=i.current,[l,c]=d.useState({action:o.action,location:o.location}),{v7_startTransition:u}=r||{},f=d.useCallback(h=>{u&&es?es(()=>c(h)):c(h)},[c,u]);return d.useLayoutEffect(()=>o.listen(f),[o,f]),d.useEffect(()=>vc(r),[r]),d.createElement(Sc,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:o,future:r})}const Pc=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Ic=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Qt=d.forwardRef(function(t,n){let{onClick:r,relative:s,reloadDocument:i,replace:o,state:l,target:c,to:u,preventScrollReset:f,viewTransition:h}=t,y=kc(t,Ec),{basename:b}=d.useContext(Nt),g,_=!1;if(typeof u=="string"&&Ic.test(u)&&(g=u,Pc))try{let v=new URL(window.location.href),E=u.startsWith("//")?new URL(v.protocol+u):new URL(u),R=pr(E.pathname,b);E.origin===v.origin&&R!=null?u=R+E.search+E.hash:_=!0}catch{}let j=ic(u,{relative:s}),k=Ac(u,{replace:o,state:l,target:c,preventScrollReset:f,relative:s,viewTransition:h});function x(v){r&&r(v),v.defaultPrevented||k(v)}return d.createElement("a",lr({},y,{href:g||j,onClick:_||i?r:x,ref:n,target:c}))});var ts;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(ts||(ts={}));var ns;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(ns||(ns={}));function Ac(e,t){let{target:n,replace:r,state:s,preventScrollReset:i,relative:o,viewTransition:l}=t===void 0?{}:t,c=_r(),u=Bt(),f=pa(e,{relative:o});return d.useCallback(h=>{if(Nc(h,n)){h.preventDefault();let y=r!==void 0?r:En(u)===En(f);c(e,{replace:y,state:s,preventScrollReset:i,relative:o,viewTransition:l})}},[u,c,f,r,s,n,e,i,o,l])}function Oc(e){const[t,n]=d.useState(()=>typeof window>"u"?!1:window.matchMedia(e).matches);return d.useEffect(()=>{const r=window.matchMedia(e);n(r.matches);const s=i=>n(i.matches);return r.addEventListener("change",s),()=>r.removeEventListener("change",s)},[e]),t}const Dc=768;function Yt(){return Oc(`(max-width: ${Dc}px)`)}const rs=["#0a0a0a","#0f0f0f","#000000"],Bc=[{id:"all",label:"All chats",Icon:ca,badge:!0},{id:"friends",label:"Friends",Icon:Ml,badge:!1},{id:"profile",label:"Profile",Icon:Nn,badge:!1}],Lc=()=>{const e=_r(),t=Bt(),n=Yt(),{unreadCountByChatId:r}=Re(),{logout:s}=K(),i=dt(b=>b.theme),o=dt(b=>b.applyPreset),l=i&&(rs.includes(i.chatBg)||rs.includes(i.pageBg)),c=t.pathname==="/friends"?"friends":t.pathname==="/profile"?"profile":"all",u=b=>{b==="profile"&&e("/profile"),b==="friends"&&e("/friends"),b==="all"&&e("/")},f=()=>{o(l?"light":"dark")},h=r?Object.keys(r).filter(b=>(r[b]??0)>0).length:0,y=h>0?h>99?"99+":String(h):null;return a.jsxs("aside",{className:`sidebar-ref${n?" sidebar-ref--mobile":""}`,children:[a.jsx("div",{className:"sidebar-ref__logo",children:a.jsxs("div",{className:"sidebar-ref__logo-wrap",children:[a.jsx("img",{src:"/logo.png",alt:"Blah Blah",className:"sidebar-ref__logo-img",onError:b=>{var g;b.target.style.display="none",(g=b.target.nextElementSibling)==null||g.classList.remove("sidebar-ref__logo-fallback--hide")}}),a.jsx("span",{className:"sidebar-ref__logo-fallback sidebar-ref__logo-fallback--hide","aria-hidden":!0,children:"BLAH BLAH"})]})}),a.jsxs("nav",{className:"sidebar-ref__nav",children:[Bc.map(({id:b,label:g,Icon:_,badge:j})=>a.jsxs("button",{type:"button",onClick:()=>u(b),className:`sidebar-ref__nav-item ${c===b?"active":""}`,children:[a.jsxs("span",{className:"sidebar-ref__nav-icon-wrap",children:[a.jsx(_,{size:22}),j&&y!=null&&a.jsx("span",{className:"sidebar-ref__nav-badge",children:y})]}),a.jsx("span",{className:"sidebar-ref__nav-label",children:g})]},b)),a.jsxs("button",{type:"button",onClick:f,className:"sidebar-ref__nav-item","aria-label":l?"Switch to light mode":"Switch to dark mode",children:[a.jsx("span",{className:"sidebar-ref__nav-icon-wrap",children:l?a.jsx(El,{size:22}):a.jsx(_l,{size:22})}),a.jsx("span",{className:"sidebar-ref__nav-label",children:l?"Light mode":"Dark mode"})]})]}),a.jsx("div",{className:"sidebar-ref__bottom",children:a.jsxs("button",{onClick:()=>s==null?void 0:s(),className:"sidebar-ref__bottom-item",children:[a.jsx(bl,{size:22}),a.jsx("span",{children:"Log out"})]})})]})},Uc=({isOpen:e,onClose:t})=>{const[n,r]=d.useState(""),[s,i]=d.useState(""),{sendMessageByCode:o,sendByCodeLoading:l}=Re();if(!e)return null;const c=async u=>{var f,h;if(u==null||u.preventDefault(),!n.trim()){se.error("Enter a user ID");return}try{const y=await o({userCode:n.trim(),text:s.trim()});r(""),i(""),t(),y!=null&&y.chat&&!y.chat.acceptedBy?se.success("Request sent"):y!=null&&y.chat&&se.success("Chat opened")}catch(y){se.error(((h=(f=y.response)==null?void 0:f.data)==null?void 0:h.message)||"Failed to start chat")}};return a.jsx("div",{className:"new-chat-modal__overlay",onClick:t,children:a.jsxs("div",{className:"new-chat-modal__card",onClick:u=>u.stopPropagation(),children:[a.jsxs("div",{className:"new-chat-modal__header",children:[a.jsx("h2",{className:"new-chat-modal__title",children:"New Chat"}),a.jsx("button",{type:"button",onClick:t,className:"new-chat-modal__close","aria-label":"Close",children:a.jsx(kt,{size:20})})]}),a.jsxs("form",{onSubmit:c,className:"new-chat-modal__form",children:[a.jsxs("div",{className:"new-chat-modal__group",children:[a.jsx("label",{className:"new-chat-modal__label",htmlFor:"new-chat-user-id",children:"User ID"}),a.jsxs("div",{className:"new-chat-modal__input-wrap",children:[a.jsx(Nn,{className:"new-chat-modal__icon",size:18}),a.jsx("input",{id:"new-chat-user-id",type:"text",className:"new-chat-modal__input",placeholder:"Enter user ID",value:n,onChange:u=>r(u.target.value),autoComplete:"off"})]})]}),a.jsxs("div",{className:"new-chat-modal__group",children:[a.jsx("label",{className:"new-chat-modal__label",htmlFor:"new-chat-message",children:"Message"}),a.jsxs("div",{className:"new-chat-modal__input-wrap",children:[a.jsx(ca,{className:"new-chat-modal__icon",size:18}),a.jsx("textarea",{id:"new-chat-message",className:"new-chat-modal__input new-chat-modal__textarea",placeholder:"Your message (optional)",value:s,onChange:u=>i(u.target.value),rows:2})]})]}),a.jsx("button",{type:"submit",className:"new-chat-modal__submit",disabled:l,children:l?"Starting...":"Start Chat"})]})]})})},Fc="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239ca3af"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="9" r="3.5"/><path d="M12 14c-3 0-5 2-5 4v1h10v-1c0-2-2-4-5-4z"/></svg>'),bt=Fc,zt=["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1587300003388-59208cc9627d?w=400&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1543548789-05f6d0ae145c?w=400&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=400&fit=crop&q=80"];function zc(){return zt[Math.floor(Math.random()*zt.length)]}function Du(e){if(!zt.length)return bt;if(!e)return zt[0];const t=String(e);let n=0;for(let s=0;s<t.length;s++)n=(n<<5)-n+t.charCodeAt(s);const r=Math.abs(n)%zt.length;return zt[r]}function $c(e){return new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})}function Hc(e){const t=new Date(e),r=new Date-t,s=Math.floor(r/6e4),i=Math.floor(r/36e5),o=Math.floor(r/864e5);return s<1?"now":s<60?`${s}m`:i<24?`${i}h`:o<7?`${o}d`:t.toLocaleDateString(void 0,{day:"numeric",month:"short"})}const Vc=200,qc=1e4,Wc=()=>{const{chats:e,getMyChats:t,selectedChat:n,setSelectedChat:r,unreadCountByChatId:s}=Re(),i=Z(x=>x.setIsNotesOpen),o=ke(x=>x.setTruthDareOpen),{onlineUsers:l,authUser:c}=K(),[u,f]=d.useState(!1),[h,y]=d.useState(""),[b,g]=d.useState(""),_=d.useRef(0),j=d.useCallback((x=!1)=>{if(!(c!=null&&c._id))return;const v=Date.now();!x&&v-_.current<qc||(_.current=v,t())},[c==null?void 0:c._id,t]);d.useEffect(()=>{const x=setTimeout(()=>g(h.trim()),Vc);return()=>clearTimeout(x)},[h]),d.useEffect(()=>{j(!0)},[j]),d.useEffect(()=>{const x=()=>{j(!1)};window.addEventListener("focus",x);const v=()=>{document.visibilityState==="visible"&&j(!1)};return document.addEventListener("visibilitychange",v),()=>{window.removeEventListener("focus",x),document.removeEventListener("visibilitychange",v)}},[j]);const k=d.useMemo(()=>Array.isArray(e)?b?e.filter(x=>{var E,R;const v=(E=x.participants)==null?void 0:E.find(I=>I._id!==(c==null?void 0:c._id));return(R=v==null?void 0:v.fullName)==null?void 0:R.toLowerCase().includes(b.toLowerCase())}):e:[],[e,b,c==null?void 0:c._id]);return a.jsxs("div",{className:"chat-list-panel",children:[a.jsxs("div",{className:"chat-list-panel__search",children:[a.jsx(ar,{className:"chat-list-panel__search-icon",size:18}),a.jsx("input",{type:"text",placeholder:"Search",value:h,onChange:x=>y(x.target.value),className:"chat-list-panel__search-input"})]}),a.jsx("div",{className:"chat-list-panel__new-chat",children:a.jsx("button",{onClick:()=>f(!0),className:"chat-list-panel__new-chat-btn",children:"+ New Chat"})}),a.jsxs("div",{className:"chat-list-panel__list",children:[k.map(x=>{var D,ee,$;const v=(D=x.participants)==null?void 0:D.find(oe=>oe._id!==(c==null?void 0:c._id)),E=(n==null?void 0:n._id)===x._id,R=x.updatedAt||((ee=x.lastMessage)==null?void 0:ee.createdAt),I=s&&(s[x._id]??0)>0,M=(($=x.createdBy)==null?void 0:$._id)??x.createdBy,O=!x.acceptedBy,z=(c==null?void 0:c._id)&&String(M)===String(c._id),F=O?z?"Request sent":"Accept to chat":null;return a.jsxs("button",{onClick:()=>{i(!1),o(!1),r(x)},className:`chat-list-panel__item ${E?"selected":""} ${I?"chat-list-panel__item--unread":""}`,children:[a.jsxs("div",{className:"chat-list-panel__avatar-wrap",children:[a.jsx("img",{src:(v==null?void 0:v.profilePic)||bt,alt:v==null?void 0:v.fullName,className:"chat-list-panel__avatar"}),x.acceptedBy&&(l||[]).some(oe=>String(oe)===String(v==null?void 0:v._id))&&a.jsx("span",{className:"chat-list-panel__online"})]}),a.jsxs("div",{className:"chat-list-panel__body",children:[a.jsxs("div",{className:"chat-list-panel__row",children:[a.jsx("span",{className:"chat-list-panel__name",children:(v==null?void 0:v.fullName)||"Unknown"}),!F&&R&&a.jsx("span",{className:"chat-list-panel__time",children:Hc(R)})]}),F?a.jsx("p",{className:`chat-list-panel__status ${z?"chat-list-panel__status--sent":"chat-list-panel__status--accept"}`,children:F}):x.lastMessage?a.jsx("p",{className:"chat-list-panel__preview",children:x.lastMessage.image?"Photo":x.lastMessage.fileName?x.lastMessage.fileName:x.lastMessage.text||"Message"}):null]})]},x._id)}),k.length===0&&a.jsx("div",{className:"chat-list-panel__empty",children:"No conversations"})]}),u&&a.jsx(Uc,{isOpen:u,onClose:()=>f(!1)})]})},ss=["#0a0a0a","#0f0f0f","#000000"],_a=()=>{const e=dt(n=>n.theme),t=e&&(ss.includes(e.chatBg)||ss.includes(e.pageBg));return a.jsx("div",{className:`no-chat-ref${t?" no-chat-ref--dark":""}`,style:t?{backgroundColor:e.chatBg||e.pageBg||"#0a0a0a"}:void 0,children:!t&&a.jsx("img",{src:"/wall.png",alt:"",className:"no-chat-ref__illus"})})},Yc=({src:e,onClose:t})=>{if(!e)return null;const n=async()=>{try{const s=await(await fetch(e)).blob(),i=window.URL.createObjectURL(s),o=document.createElement("a");o.href=i,o.download="image.jpg",document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(i)}catch(r){alert("Download failed"),console.error(r)}};return a.jsx("div",{className:"fixed inset-0 z-50 bg-black/90 flex items-center justify-center",onClick:t,children:a.jsxs("div",{className:"relative max-w-[90%] max-h-[90%]",onClick:r=>r.stopPropagation(),children:[a.jsx("img",{src:e,alt:"Preview",className:"max-w-full max-h-[80vh] rounded-lg"}),a.jsx("button",{onClick:n,className:"absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded",children:"Download"}),a.jsx("button",{onClick:t,className:"absolute top-3 left-3 bg-black/60 text-white px-3 py-1 rounded",children:"✕"})]})})},as=({setCalling:e,setCallType:t,setCallActive:n,setActiveCallUserId:r,setActiveCallUserName:s,setActiveCallUserAvatar:i,startCall:o})=>{var fe;const{selectedUser:l,selectedChat:c,clearSelectedChat:u,clearMessagesForCurrentChat:f,rejectedChatId:h,acceptChat:y,rejectChat:b}=Re(),{authUser:g,onlineUsers:_}=K(),{isNotesOpen:j,setIsNotesOpen:k,isDrawingOpen:x,setIsDrawingOpen:v,isVideoPanelOpen:E,setIsVideoPanelOpen:R}=Z(),I=ke(X=>X.isTruthDareOpen),M=ke(X=>X.setTruthDareOpen),O=Yt(),[z,F]=d.useState(!1),[D,ee]=d.useState(!1);if(!l)return null;const $=(_||[]).some(X=>String(X)===String(l._id)),oe=h&&c&&String(c._id)===String(h),He=((fe=c==null?void 0:c.createdBy)==null?void 0:fe._id)??(c==null?void 0:c.createdBy),he=c&&!c.acceptedBy&&(g==null?void 0:g._id)&&String(He)===String(g._id),te=c&&!c.acceptedBy,W=te&&!he,ue=oe?"Request rejected":he?"Request sent":te?"":$?"Online":"Offline",q=oe?"chat-header-ref__subtitle chat-header-ref__subtitle--rejected":he?"chat-header-ref__subtitle chat-header-ref__subtitle--sent":te?"chat-header-ref__subtitle chat-header-ref__subtitle--pending":"chat-header-ref__subtitle",T=te||oe,J=()=>{typeof o=="function"&&o(l._id,"video"),t("video"),e(!0),r(l._id),s(l.fullName),i(l.profilePic)},ge=()=>{typeof o=="function"&&o(l._id,"audio"),t("audio"),e(!0),r(l._id),s(l.fullName),i(l.profilePic)};return a.jsxs("header",{className:"chat-header-ref",children:[a.jsxs("div",{className:"chat-header-ref__left",children:[O&&a.jsx("button",{type:"button",className:"chat-header-ref__icon chat-header-ref__back",onClick:()=>u(),"aria-label":"Back to chats",title:"Back to chats",children:a.jsx(cl,{size:24})}),a.jsx("img",{src:l.profilePic||bt,alt:l.fullName,className:"chat-header-ref__avatar"}),a.jsxs("div",{className:"chat-header-ref__info",children:[a.jsx("h1",{className:"chat-header-ref__title",children:l.fullName}),a.jsx("p",{className:q,children:ue}),O&&W&&a.jsxs("div",{className:"chat-header-ref__accept-reject",children:[a.jsx("button",{type:"button",className:"chat-header-ref__accept",onClick:()=>y(c._id),children:"Accept"}),a.jsx("button",{type:"button",className:"chat-header-ref__reject",onClick:()=>b(c._id),children:"Reject"})]})]})]}),a.jsxs("div",{className:"chat-header-ref__actions",children:[!O&&a.jsx("button",{type:"button",className:`chat-header-ref__icon ${T?"chat-header-ref__icon--disabled":""}`,"aria-label":"Search",disabled:T,title:T?"Available after chat is accepted":"Search",children:a.jsx(ar,{size:24})}),a.jsx("button",{type:"button",className:`chat-header-ref__icon ${T?"chat-header-ref__icon--disabled":""}`,onClick:T?void 0:ge,"aria-label":"Voice call",disabled:T,title:T?"Available after chat is accepted":"Voice call",children:a.jsx(vl,{size:24})}),a.jsx("button",{type:"button",className:`chat-header-ref__icon ${T?"chat-header-ref__icon--disabled":""}`,onClick:T?void 0:J,"aria-label":"Video call",disabled:T,title:T?"Available after chat is accepted":"Video call",children:a.jsx(Pl,{size:24})}),a.jsxs("div",{className:"chat-header-ref__more-wrap",children:[z&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"chat-header-ref__backdrop",onClick:()=>F(!1)}),O?a.jsxs("div",{className:"chat-header-ref__dropdown chat-header-ref__dropdown--mobile",children:[a.jsx("div",{className:"chat-header-ref__dropdown-section",children:a.jsxs("button",{type:"button",className:`chat-header-ref__dropdown-row ${T?"chat-header-ref__dropdown-btn--disabled":""}`,disabled:T,"aria-label":"Search",children:[a.jsx(ar,{size:22}),a.jsx("span",{children:"Search"})]})}),a.jsx("div",{className:"chat-header-ref__dropdown-divider"}),a.jsxs("div",{className:"chat-header-ref__dropdown-section",children:[a.jsxs("button",{type:"button",className:`chat-header-ref__dropdown-row ${x?"chat-header-ref__dropdown-btn--active":""} ${T?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(T)return;!x&&(k(!1),R(!1),M(!1)),v(!x),F(!1)},disabled:T,children:[a.jsx(Cn,{size:22}),a.jsx("span",{children:"Drawing"})]}),a.jsxs("button",{type:"button",className:`chat-header-ref__dropdown-row ${E?"chat-header-ref__dropdown-btn--active":""} ${T?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(T)return;!E&&(k(!1),v(!1),M(!1)),R(!E),F(!1)},disabled:T,children:[a.jsx(sr,{size:22}),a.jsx("span",{children:"Watch Together"})]}),a.jsxs("button",{type:"button",className:`chat-header-ref__dropdown-row ${j?"chat-header-ref__dropdown-btn--active":""} ${T?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(T)return;!j&&(v(!1),R(!1),M(!1)),k(!j),F(!1)},disabled:T,children:[a.jsx(Xt,{size:22}),a.jsx("span",{children:"Notes"})]}),a.jsxs("button",{type:"button",className:`chat-header-ref__dropdown-row ${I?"chat-header-ref__dropdown-btn--active":""} ${T?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(T)return;!I&&(k(!1),v(!1),R(!1)),M(!I),F(!1)},disabled:T,children:[a.jsx(rr,{size:22}),a.jsx("span",{children:"Truth or Dare"})]}),a.jsxs("button",{type:"button",className:"chat-header-ref__dropdown-row chat-header-ref__dropdown-btn--danger",onClick:()=>{F(!1),ee(!0)},children:[a.jsx(Ot,{size:22,className:"chat-header-ref__dropdown-icon--danger"}),a.jsx("span",{children:"Delete conversation"})]})]})]}):a.jsxs("div",{className:"chat-header-ref__dropdown",children:[a.jsx("button",{type:"button",className:`chat-header-ref__dropdown-btn ${x?"chat-header-ref__dropdown-btn--active":""} ${T?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(T)return;!x&&(k(!1),R(!1),M(!1)),v(!x),F(!1)},disabled:T,"aria-label":x?"Close drawing":"Drawing",title:x?"Close drawing":T?"Available after chat is accepted":"Drawing",children:a.jsx(Cn,{size:24})}),a.jsx("button",{type:"button",className:`chat-header-ref__dropdown-btn ${E?"chat-header-ref__dropdown-btn--active":""} ${T?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(T)return;!E&&(k(!1),v(!1),M(!1)),R(!E),F(!1)},disabled:T,"aria-label":E?"Close Watch Together":"Watch Together",title:E?"Close Watch Together":T?"Available after chat is accepted":"Watch Together",children:a.jsx(sr,{size:24})}),a.jsx("button",{type:"button",className:`chat-header-ref__dropdown-btn ${j?"chat-header-ref__dropdown-btn--active":""} ${T?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(T)return;!j&&(v(!1),R(!1),M(!1)),k(!j),F(!1)},disabled:T,"aria-label":j?"Close notes":"Notes",title:j?"Close notes":T?"Available after chat is accepted":"Notes",children:a.jsx(Xt,{size:24})}),a.jsx("button",{type:"button",className:`chat-header-ref__dropdown-btn ${I?"chat-header-ref__dropdown-btn--active":""} ${T?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(T)return;!I&&(k(!1),v(!1),R(!1)),M(!I),F(!1)},disabled:T,"aria-label":I?"Close games":"Truth or Dare",title:I?"Close games":T?"Available after chat is accepted":"Truth or Dare",children:a.jsx(rr,{size:24})}),a.jsx("button",{type:"button",className:"chat-header-ref__dropdown-btn chat-header-ref__dropdown-btn--danger",onClick:()=>{F(!1),ee(!0)},"aria-label":"Delete conversation",title:"Delete conversation",children:a.jsx(Ot,{size:24,className:"chat-header-ref__dropdown-icon--danger"})}),a.jsx("button",{type:"button",className:"chat-header-ref__dropdown-btn chat-header-ref__dropdown-btn--more",onClick:()=>F(!1),"aria-label":"Close menu",title:"Close",children:a.jsx(Wr,{size:24})})]})]}),!z&&a.jsx("button",{type:"button",className:"chat-header-ref__icon",onClick:()=>F(!0),"aria-label":"More",title:"More",children:a.jsx(Wr,{size:24})})]})]}),D&&a.jsx("div",{className:"chat-header-ref__confirm-overlay",onClick:()=>ee(!1),children:a.jsxs("div",{className:"chat-header-ref__confirm-panel",onClick:X=>X.stopPropagation(),children:[a.jsx("p",{className:"chat-header-ref__confirm-text",children:"Permanently delete all messages in this conversation for your account only. The other person will still see them. You will not be able to see these messages again."}),a.jsxs("div",{className:"chat-header-ref__confirm-actions",children:[a.jsx("button",{type:"button",className:"chat-header-ref__confirm-btn chat-header-ref__confirm-btn--cancel",onClick:()=>ee(!1),children:"Cancel"}),a.jsx("button",{type:"button",className:"chat-header-ref__confirm-btn chat-header-ref__confirm-btn--clear",onClick:()=>{f(),ee(!1)},children:"Clear messages"})]})]})})]})},Gc=`
Smileys & People
😀
😃
😄
😁
😆
🥹
😅
😂
🤣
🥲
☺️
😊
😇
🙂
🙃
😉
😌
😍
🥰
😘
😗
😙
😚
😋
😛
😝
😜
🤪
🤨
🧐
🤓
😎
🥸
🤩
🥳
🙂‍↕️
😏
😒
🙂‍↔️
😞
😔
😟
😕
🙁
☹️
😣
😖
😫
😩
🥺
😢
😭
😤
😠
😡
🤬
🤯
😳
🥵
🥶
😶‍🌫️
😱
😨
😰
😥
😓
🤗
🤔
🫣
🤭
🫢
🫡
🤫
🫠
🤥
😶
🫥
😐
🫤
😑
🫨
😬
🙄
😯
😦
😧
😮
😲
🥱
🫩
😴
🤤
😪
😮‍💨
😵
😵‍💫
🤐
🥴
🤢
🤮
🤧
😷
🤒
🤕
🤑
🤠
😈
👿
👹
👺
🤡
💩
👻
💀
☠️
👽
👾
🤖
🎃
😺
😸
😹
😻
😼
😽
🙀
😿
😾
🫶
🤲
👐
🙌
👏
🤝
👍
👎
👊
✊
🤛
🤜
🫷
🫸
🤞
✌️
🫰
🤟
🤘
👌
🤌
🤏
🫳
🫴
👈
👉
👆
👇
☝️
✋
🤚
🖐️
🖖
👋
🤙
🫲
🫱
💪
🦾
🖕
✍️
🙏
🫵
🦶
🦵
🦿
💄
💋
👄
🫦
🦷
👅
👂
🦻
👃
🫆
👣
👁️
👀
🫀
🫁
🧠
🗣️
👤
👥
🫂
👶
🧒
👧
👦
🧑
👩
👨
🧑‍🦱
👩‍🦱
👨‍🦱
🧑‍🦰
👩‍🦰
👨‍🦰
👱
👱‍♀️
👱‍♂️
🧑‍🦳
👩‍🦳
👨‍🦳
🧑‍🦲
👩‍🦲
👨‍🦲
🧔
🧔‍♀️
🧔‍♂️
🧓
👵
👴
👲
👳
👳‍♀️
👳‍♂️
🧕
👮
👮‍♀️
👮‍♂️
👷
👷‍♀️
👷‍♂️
💂
💂‍♀️
💂‍♂️
🕵️
🕵️‍♀️
🕵️‍♂️
🧑‍⚕️
👩‍⚕️
👨‍⚕️
🧑‍🌾
👩‍🌾
👨‍🌾
🧑‍🍳
👩‍🍳
👨‍🍳
🧑‍🎓
👩‍🎓
👨‍🎓
🧑‍🎤
👩‍🎤
👨‍🎤
🧑‍🏫
👩‍🏫
👨‍🏫
🧑‍🏭
👩‍🏭
👨‍🏭
🧑‍💻
👩‍💻
👨‍💻
🧑‍💼
👩‍💼
👨‍💼
🧑‍🔧
👩‍🔧
👨‍🔧
🧑‍🔬
👩‍🔬
👨‍🔬
🧑‍🎨
👩‍🎨
👨‍🎨
🧑‍🚒
👩‍🚒
👨‍🚒
🧑‍✈️
👩‍✈️
👨‍✈️
🧑‍🚀
👩‍🚀
👨‍🚀
🧑‍⚖️
👩‍⚖️
👨‍⚖️
👰
👰‍♀️
👰‍♂️
🤵
🤵‍♀️
🤵‍♂️
🫅
👸
🤴
🦸
🦸‍♀️
🦸‍♂️
🦹
🦹‍♀️
🦹‍♂️
🥷
🧑‍🎄
🤶
🎅
🧙
🧙‍♀️
🧙‍♂️
🧝
🧝‍♀️
🧝‍♂️
🧌
🧛
🧛‍♀️
🧛‍♂️
🧟
🧟‍♀️
🧟‍♂️
🧞
🧞‍♀️
🧞‍♂️
🧜
🧜‍♀️
🧜‍♂️
🧚
🧚‍♀️
🧚‍♂️
👼
🫄
🤰
🫃
🤱
🧑‍🍼
👩‍🍼
👨‍🍼
🙇
🙇‍♀️
🙇‍♂️
💁
💁‍♀️
💁‍♂️
🙅
🙅‍♀️
🙅‍♂️
🙆
🙆‍♀️
🙆‍♂️
🙋
🙋‍♀️
🙋‍♂️
🧏
🧏‍♀️
🧏‍♂️
🤦
🤦‍♀️
🤦‍♂️
🤷
🤷‍♀️
🤷‍♂️
🙎
🙎‍♀️
🙎‍♂️
🙍
🙍‍♀️
🙍‍♂️
💇
💇‍♀️
💇‍♂️
💆
💆‍♀️
💆‍♂️
🧖
🧖‍♀️
🧖‍♂️
💅
🤳
💃
🕺
👯
👯‍♀️
👯‍♂️
🕴️
🧑‍🦽
👩‍🦽
👨‍🦽
🧑‍🦽‍➡️
👩‍🦽‍➡️
👨‍🦽‍➡️
🧑‍🦼
👩‍🦼
👨‍🦼
🧑‍🦼‍➡️
👩‍🦼‍➡️
👨‍🦼‍➡️
🚶
🚶‍♀️
🚶‍♂️
🚶‍➡️
🚶‍♀️‍➡️
🚶‍♂️‍➡️
🧑‍🦯
👩‍🦯
👨‍🦯
🧑‍🦯‍➡️
👩‍🦯‍➡️
👨‍🦯‍➡️
🧎
🧎‍♀️
🧎‍♂️
🧎‍➡️
🧎‍♀️‍➡️
🧎‍♂️‍➡️
🏃
🏃‍♀️
🏃‍♂️
🏃‍➡️
🏃‍♀️‍➡️
🏃‍♂️‍➡️
🧍
🧍‍♀️
🧍‍♂️
🧑‍🤝‍🧑
👫
👭
👬
💑
👩‍❤️‍👨
👩‍❤️‍👩
👨‍❤️‍👨
💏
👩‍❤️‍💋‍👨
👩‍❤️‍💋‍👩
👨‍❤️‍💋‍👨
🧑‍🧑‍🧒
🧑‍🧑‍🧒‍🧒
🧑‍🧒‍🧒
🧑‍🧒
👪
👨‍👩‍👦
👨‍👩‍👧
👨‍👩‍👧‍👦
👨‍👩‍👦‍👦
👨‍👩‍👧‍👧
👩‍👩‍👦
👩‍👩‍👧
👩‍👩‍👧‍👦
👩‍👩‍👦‍👦
👩‍👩‍👧‍👧
👨‍👨‍👦
👨‍👨‍👧
👨‍👨‍👧‍👦
👨‍👨‍👦‍👦
👨‍👨‍👧‍👧
👩‍👦
👩‍👧
👩‍👧‍👦
👩‍👦‍👦
👩‍👧‍👧
👨‍👦
👨‍👧
👨‍👧‍👦
👨‍👦‍👦
👨‍👧‍👧
🪢
🧶
🧵
🪡
🧥
🥼
🦺
👚
👕
👖
🩲
🩳
👔
👗
👙
🩱
👘
🥻
🩴
🥿
👠
👡
👢
👞
👟
🥾
🧦
🧤
🧣
🎩
🧢
👒
🎓
⛑️
🪖
👑
💍
👝
👛
👜
💼
🎒
🧳
👓
🕶️
🥽
🌂
Animals & Nature
🐶
🐱
🐭
🐹
🐰
🦊
🐻
🐼
🐻‍❄️
🐨
🐯
🦁
🐮
🐷
🐽
🐸
🐵
🙈
🙉
🙊
🐒
🐔
🐧
🐦
🐤
🐣
🐥
🪿
🦆
🐦‍⬛
🦅
🦉
🦇
🐺
🐗
🐴
🦄
🫎
🐝
🪱
🐛
🦋
🐌
🐞
🐜
🪰
🪲
🪳
🦟
🦗
🕷️
🕸️
🦂
🐢
🐍
🦎
🦖
🦕
🐙
🦑
🪼
🦐
🦞
🦀
🐡
🐠
🐟
🐬
🐳
🐋
🦈
🦭
🐊
🐅
🐆
🦓
🦍
🦧
🦣
🐘
🦛
🦏
🐪
🐫
🦒
🦘
🦬
🐃
🐂
🐄
🫏
🐎
🐖
🐏
🐑
🦙
🐐
🦌
🐕
🐩
🦮
🐕‍🦺
🐈
🐈‍⬛
🪶
🪽
🐓
🦃
🦤
🦚
🦜
🦢
🦩
🕊️
🐇
🦝
🦨
🦡
🦫
🦦
🦥
🐁
🐀
🐿️
🦔
🐾
🐉
🐲
🐦‍🔥
🌵
🎄
🌲
🌳
🌴
🪾
🪵
🌱
🌿
☘️
🍀
🎍
🪴
🎋
🍃
🍂
🍁
🪺
🪹
🍄
🍄‍🟫
🐚
🪸
🪨
🌾
💐
🌷
🌹
🥀
🪻
🪷
🌺
🌸
🌼
🌻
🌞
🌝
🌛
🌜
🌚
🌕
🌖
🌗
🌘
🌑
🌒
🌓
🌔
🌙
🌎
🌍
🌏
🪐
💫
⭐
🌟
✨
⚡️
☄️
💥
🔥
🌪️
🌈
☀️
🌤️
⛅
🌥️
☁️
🌦️
🌧️
⛈️
🌩️
🌨️
❄️
☃️
⛄
🌬️
💨
💧
💦
🫧
☔
☂️
🌊
🌫️
Food & Drink
🍏
🍎
🍐
🍊
🍋
🍋‍🟩
🍌
🍉
🍇
🍓
🫐
🍈
🍒
🍑
🥭
🍍
🥥
🥝
🍅
🍆
🥑
🫛
🥦
🥬
🥒
🌶️
🫑
🌽
🥕
🫒
🧄
🧅
🥔
🫜
🍠
🫚
🥐
🥯
🍞
🥖
🥨
🧀
🥚
🍳
🧈
🥞
🧇
🥓
🥩
🍗
🍖
🦴
🌭
🍔
🍟
🍕
🫓
🥪
🥙
🧆
🌮
🌯
🫔
🥗
🥘
🫕
🥫
🫙
🍝
🍜
🍲
🍛
🍣
🍱
🥟
🦪
🍤
🍙
🍚
🍘
🍥
🥠
🥮
🍢
🍡
🍧
🍨
🍦
🥧
🧁
🍰
🎂
🍮
🍭
🍬
🍫
🍿
🍩
🍪
🌰
🥜
🫘
🍯
🥛
🫗
🍼
🫖
☕
🍵
🧉
🧃
🥤
🧋
🍶
🍺
🍻
🥂
🍷
🥃
🍸
🍹
🍾
🧊
🥄
🍴
🍽️
🥣
🥡
🥢
🧂
Activity
⚽
🏀
🏈
⚾
🥎
🎾
🏐
🏉
🥏
🎱
🪀
🏓
🏸
🏒
🏑
🥍
🏏
🪃
🥅
⛳
🪁
🛝
🏹
🎣
🤿
🥊
🥋
🎽
🛹
🛼
🛷
⛸️
🥌
🎿
⛷️
🏂
🪂
🏋️
🏋️‍♀️
🏋️‍♂️
🤼
🤼‍♀️
🤼‍♂️
🤸
🤸‍♀️
🤸‍♂️
⛹️
⛹️‍♀️
⛹️‍♂️
🤺
🤾
🤾‍♀️
🤾‍♂️
🏌️
🏌️‍♀️
🏌️‍♂️
🏇
🧘
🧘‍♀️
🧘‍♂️
🏄
🏄‍♀️
🏄‍♂️
🏊
🏊‍♀️
🏊‍♂️
🤽
🤽‍♀️
🤽‍♂️
🚣
🚣‍♀️
🚣‍♂️
🧗
🧗‍♀️
🧗‍♂️
🚵
🚵‍♀️
🚵‍♂️
🚴
🚴‍♀️
🚴‍♂️
🏆
🥇
🥈
🥉
🏅
🎖️
🏵️
🎗️
🎫
🎟️
🎪
🤹
🤹‍♀️
🤹‍♂️
🎭
🩰
🎨
🫟
🎬
🎤
🎧
🎼
🎹
🪇
🥁
🪘
🎷
🎺
🪗
🎸
🪕
🪉
🎻
🪈
🎲
♟️
🎯
🎳
🎮
🎰
🧩
Travel & Places
🚗
🚕
🚙
🛻
🚐
🚌
🚎
🏎️
🚓
🚑
🚒
🚚
🚛
🚜
🦯
🦽
🦼
🩼
🛴
🚲
🛵
🏍️
🛺
🛞
🚨
🚔
🚍
🚘
🚖
🚡
🚠
🚟
🚃
🚋
🚞
🚝
🚄
🚅
🚈
🚂
🚆
🚇
🚊
🚉
✈️
🛫
🛬
🛩️
💺
🛰️
🚀
🛸
🚁
🛶
⛵
🚤
🛥️
🛳️
⛴️
🚢
🛟
⚓
🪝
⛽
🚧
🚦
🚥
🚏
🗺️
🗿
🗽
🗼
🏰
🏯
🏟️
🎡
🎢
🎠
⛲
⛱️
🏖️
🏝️
🏜️
🌋
⛰️
🏔️
🗻
🏕️
⛺
🏠
🏡
🏘️
🏚️
🛖
🏗️
🏭
🏢
🏬
🏣
🏤
🏥
🏦
🏨
🏪
🏫
🏩
💒
🏛️
⛪
🕌
🕍
🛕
🕋
⛩️
🛤️
🛣️
🗾
🎑
🏞️
🌅
🌄
🌠
🎇
🎆
🌇
🌆
🏙️
🌃
🌌
🌉
🌁
Objects
⌚
📱
📲
💻
⌨️
🖥️
🖨️
🖱️
🖲️
🕹️
🗜️
💽
💾
💿
📀
📼
📷
📸
📹
🎥
📽️
🎞️
📞
☎️
📟
📠
📺
📻
🎙️
🎚️
🎛️
🧭
⏱️
⏲️
⏰
🕰️
⌛
⏳
📡
🔋
🪫
🔌
💡
🔦
🕯️
🪔
🧯
🛢️
💸
💵
💴
💶
💷
🪙
💰
💳
🪪
💎
⚖️
🪜
🧰
🪛
🔧
🔨
⚒️
🛠️
⛏️
🪏
🪚
🔩
⚙️
🪤
🧱
⛓️
⛓️‍💥
🧲
🔫
💣
🧨
🪓
🔪
🗡️
⚔️
🛡️
🚬
⚰️
🪦
⚱️
🏺
🔮
📿
🧿
🪬
💈
⚗️
🔭
🔬
🕳️
🩻
🩹
🩺
💊
💉
🩸
🧬
🦠
🧫
🧪
🌡️
🧹
🪠
🧺
🧻
🚽
🚰
🚿
🛁
🛀
🧼
🪥
🪒
🪮
🧽
🪣
🧴
🛎️
🔑
🗝️
🚪
🪑
🛋️
🛏️
🛌
🧸
🪆
🖼️
🪞
🪟
🛍️
🛒
🎁
🎈
🎏
🎀
🪄
🪅
🎊
🎉
🎎
🪭
🏮
🎐
🪩
🧧
✉️
📩
📨
📧
💌
📥
📤
📦
🏷️
🪧
📪
📫
📬
📭
📮
📯
📜
📃
📄
📑
🧾
📊
📈
📉
🗒️
🗓️
📆
📅
🗑️
📇
🗃️
🗳️
🗄️
📋
📁
📂
🗂️
🗞️
📰
📓
📔
📒
📕
📗
📘
📙
📚
📖
🔖
🧷
🔗
📎
🖇️
📐
📏
🧮
📌
📍
✂️
🖊️
🖋️
✒️
🖌️
🖍️
📝
✏️
🔍
🔎
🔏
🔐
🔒
🔓
Symbols
🩷
❤️
🧡
💛
💚
🩵
💙
💜
🖤
🩶
🤍
🤎
💔
❣️
💕
💞
💓
💗
💖
💘
💝
❤️‍🩹
❤️‍🔥
💟
☮️
✝️
☪️
🕉️
☸️
🪯
✡️
🔯
🕎
☯️
☦️
🛐
⛎
♈
♉
♊
♋
♌
♍
♎
♏
♐
♑
♒
♓
🆔
⚛️
🉑
☢️
☣️
📴
📳
🈶
🈚
🈸
🈺
🈷️
✴️
🆚
💮
🉐
㊙️
㊗️
🈴
🈵
🈹
🈲
🅰️
🅱️
🆎
🆑
🅾️
🆘
❌
⭕
🛑
⛔
📛
🚫
💯
💢
♨️
🚷
🚯
🚳
🚱
🔞
📵
🚭
❗
❕
❓
❔
‼️
⁉️
🔅
🔆
〽️
⚠️
🚸
🔱
⚜️
🔰
♻️
✅
🈯
💹
❇️
✳️
❎
🌐
💠
Ⓜ️
🌀
💤
🏧
🚾
♿
🅿️
🛗
🈳
🈂️
🛂
🛃
🛄
🛅
🛜
🚹
🚺
🚼
🚻
🚮
🎦
📶
🈁
🔣
ℹ️
🔤
🔡
🔠
🆖
🆗
🆙
🆒
🆕
🆓
0️⃣
1️⃣
2️⃣
3️⃣
4️⃣
5️⃣
6️⃣
7️⃣
8️⃣
9️⃣
🔟
🔢
#️⃣
*️⃣
⏏️
▶️
⏸️
⏯️
⏹️
⏺️
⏭️
⏮️
⏩
⏪
⏫
⏬
◀️
🔼
🔽
➡️
⬅️
⬆️
⬇️
↗️
↘️
↙️
↖️
↕️
↔️
↪️
↩️
⤴️
⤵️
🔀
🔁
🔂
🔄
🔃
🎵
🎶
➕
➖
➗
✖️
🟰
♾️
💲
💱
™️
©️
®️
〰️
➰
➿
🔚
🔙
🔛
🔝
🔜
✔️
☑️
🔘
⚪
⚫
🔴
🔵
🟤
🟣
🟢
🟡
🟠
🔺
🔻
🔸
🔹
🔶
🔷
🔳
🔲
▪️
▫️
◾
◽
◼️
◻️
⬛
⬜
🟧
🟦
🟥
🟫
🟪
🟩
🟨
🔈
🔇
🔉
🔊
🔔
🔕
📣
📢
🗨️
👁️‍🗨️
💬
💭
🗯️
♠️
♣️
♥️
♦️
🃏
🎴
🀄
🕐
🕑
🕒
🕓
🕔
🕕
🕖
🕗
🕘
🕙
🕚
🕛
🕜
🕝
🕞
🕟
🕠
🕡
🕢
🕣
🕤
🕥
🕦
🕧
♀️
♂️
⚧
⚕️
Flags
🏳️
🏴
🏴‍☠️
🏁
🚩
🏳️‍🌈
🏳️‍⚧️
🇺🇳
🇦🇫
🇦🇽
🇦🇱
🇩🇿
🇦🇸
🇦🇩
🇦🇴
🇦🇮
🇦🇶
🇦🇬
🇦🇷
🇦🇲
🇦🇼
🇦🇺
🇦🇹
🇦🇿
🇧🇸
🇧🇭
🇧🇩
🇧🇧
🇧🇾
🇧🇪
🇧🇿
🇧🇯
🇧🇲
🇧🇹
🇧🇴
🇧🇦
🇧🇼
🇧🇷
🇮🇴
🇻🇬
🇧🇳
🇧🇬
🇧🇫
🇧🇮
🇰🇭
🇨🇲
🇨🇦
🇮🇨
🇨🇻
🇧🇶
🇰🇾
🇨🇫
🇹🇩
🇨🇱
🇨🇳
🇨🇽
🇨🇨
🇨🇴
🇰🇲
🇨🇬
🇨🇩
🇨🇰
🇨🇷
🇨🇮
🇭🇷
🇨🇺
🇨🇼
🇨🇾
🇨🇿
🇩🇰
🇩🇯
🇩🇲
🇩🇴
🇪🇨
🇪🇬
🇸🇻
🇬🇶
🇪🇷
🇪🇪
🇪🇹
🇪🇺
🇫🇰
🇫🇴
🇫🇯
🇫🇮
🇫🇷
🇬🇫
🇵🇫
🇹🇫
🇬🇦
🇬🇲
🇬🇪
🇩🇪
🇬🇭
🇬🇮
🇬🇷
🇬🇱
🇬🇩
🇬🇵
🇬🇺
🇬🇹
🇬🇬
🇬🇳
🇬🇼
🇬🇾
🇭🇹
🇭🇳
🇭🇰
🇭🇺
🇮🇸
🇮🇳
🇮🇩
🇮🇷
🇮🇶
🇮🇪
🇮🇲
🇮🇱
🇮🇹
🇯🇲
🇯🇵
🎌
🇯🇪
🇯🇴
🇰🇿
🇰🇪
🇰🇮
🇽🇰
🇰🇼
🇰🇬
🇱🇦
🇱🇻
🇱🇧
🇱🇸
🇱🇷
🇱🇾
🇱🇮
🇱🇹
🇱🇺
🇲🇴
🇲🇰
🇲🇬
🇲🇼
🇲🇾
🇲🇻
🇲🇱
🇲🇹
🇲🇭
🇲🇶
🇲🇷
🇲🇺
🇾🇹
🇲🇽
🇫🇲
🇲🇩
🇲🇨
🇲🇳
🇲🇪
🇲🇸
🇲🇦
🇲🇿
🇲🇲
🇳🇦
🇳🇷
🇳🇵
🇳🇱
🇳🇨
🇳🇿
🇳🇮
🇳🇪
🇳🇬
🇳🇺
🇳🇫
🇰🇵
🇲🇵
🇳🇴
🇴🇲
🇵🇰
🇵🇼
🇵🇸
🇵🇦
🇵🇬
🇵🇾
🇵🇪
🇵🇭
🇵🇳
🇵🇱
🇵🇹
🇵🇷
🇶🇦
🇷🇪
🇷🇴
🇷🇺
🇷🇼
🇼🇸
🇸🇲
🇸🇹
🇨🇶
🇸🇦
🇸🇳
🇷🇸
🇸🇨
🇸🇱
🇸🇬
🇸🇽
🇸🇰
🇸🇮
🇬🇸
🇸🇧
🇸🇴
🇿🇦
🇰🇷
🇸🇸
🇪🇸
🇱🇰
🇧🇱
🇸🇭
🇰🇳
🇱🇨
🇵🇲
🇻🇨
🇸🇩
🇸🇷
🇸🇿
🇸🇪
🇨🇭
🇸🇾
🇹🇼
🇹🇯
🇹🇿
🇹🇭
🇹🇱
🇹🇬
🇹🇰
🇹🇴
🇹🇹
🇹🇳
🇹🇷
🇹🇲
🇹🇨
🇻🇮
🇹🇻
🇺🇬
🇺🇦
🇦🇪
🇬🇧
🏴
🏴
🏴
🇺🇸
🇺🇾
🇺🇿
🇻🇺
🇻🇦
🇻🇪
🇻🇳
🇼🇫
🇪🇭
🇾🇪
🇿🇲
🇿🇼
🇦🇨
🇧🇻
🇨🇵
🇪🇦
🇩🇬
🇭🇲
🇲🇫
🇸🇯
🇹🇦
🇺🇲
`,os={"Smileys & People":"smileys","Animals & Nature":"animals","Food & Drink":"food",Activity:"activity","Travel & Places":"travel",Objects:"objects",Symbols:"symbols",Flags:"flags"},Jc=["smileys","animals","food","activity","travel","objects","symbols","flags"],Xc={smileys:"Smileys",animals:"Animals",food:"Food",activity:"Activity",travel:"Travel",objects:"Objects",symbols:"Symbols",flags:"Flags"},Ft={};let Rt=null;Gc.split(`
`).forEach(e=>{const t=e.trim();if(t&&t!=="Advertisement"){if(os[t]){Rt=os[t],Ft[Rt]||(Ft[Rt]=[]);return}/^[A-Za-z0-9& ]+$/.test(t)||Rt&&(Ft[Rt]||(Ft[Rt]=[]),Ft[Rt].push(t))}});const bn=Jc.map(e=>({id:e,label:Xc[e],emojis:Ft[e]||[]}));bn.flatMap(e=>e.emojis);const Ut=new Date().getFullYear();function _n(e,t){return new Date(e,t,0).getDate()}function ct(e,t,n,r,s,i){const o=_n(e,t),l=Math.min(n,o),c=new Date(e,t-1,l,r,s,i),u=new Date;return c.getTime()<=u.getTime()?{year:u.getFullYear(),month:u.getMonth()+1,day:u.getDate(),hours:u.getHours(),minutes:u.getMinutes(),seconds:u.getSeconds()}:{year:e,month:t,day:l,hours:r,minutes:s,seconds:i}}const Kc=e=>{let t=Math.max(0,Math.floor(e/1e3));const n=Math.floor(t/3600);t%=3600;const r=Math.floor(t/60),s=t%60,i=String(n).padStart(2,"0"),o=String(r).padStart(2,"0"),l=String(s).padStart(2,"0");return`${i}h ${o}m ${l}s`},Zc=28;function rt({value:e,max:t,label:n,onChange:r,format:s}){const i=s?O=>s(O):O=>String(O).padStart(2,"0"),o=d.useRef(0),l=d.useRef(null),c=d.useRef(e),[u,f]=d.useState(null);d.useEffect(()=>{if(u===null)return;const O=requestAnimationFrame(()=>{requestAnimationFrame(()=>f(null))});return()=>cancelAnimationFrame(O)},[u]);const h=e===0?t:e-1,y=e===t?0:e+1,b=[h,e,y],g=O=>{f(O),c.current=e},_=O=>{O.preventDefault(),O.stopPropagation();const z=40;if(o.current+=O.deltaY,o.current>=z){o.current=0;const F=e===t?0:e+1;r(F),g("up")}else if(o.current<=-z){o.current=0;const F=e===0?t:e-1;r(F),g("down")}},j=O=>{!O.touches||O.touches.length===0||(l.current=O.touches[0].clientY)},k=O=>{if(l.current==null||!O.touches||O.touches.length===0)return;const z=O.touches[0].clientY,F=z-l.current,D=12;if(F>=D){l.current=z;const ee=e===0?t:e-1;r(ee),g("down")}else if(F<=-D){l.current=z;const ee=e===t?0:e+1;r(ee),g("up")}},x=()=>{l.current=null},v=()=>{const O=e===t?0:e+1;r(O),g("up")},E=()=>{const O=e===0?t:e-1;r(O),g("down")},R=O=>{O.preventDefault(),O.stopPropagation(),E()},I=O=>{O.preventDefault(),O.stopPropagation(),v()},M=["duration-wheel__strip",u==="up"&&"duration-wheel__strip--slide-from-up",u==="down"&&"duration-wheel__strip--slide-from-down"].filter(Boolean).join(" ");return a.jsxs("div",{className:"duration-wheel__col",children:[a.jsx("div",{className:"duration-wheel__label",children:n}),a.jsx("button",{type:"button",className:"duration-wheel__arrow duration-wheel__arrow--up",onClick:R,"aria-label":`Increase ${n}`,children:a.jsx(hl,{size:14})}),a.jsx("div",{className:"duration-wheel__viewport",onWheel:_,onTouchStart:j,onTouchMove:k,onTouchEnd:x,role:"region","aria-label":`Set ${n}`,children:a.jsx("div",{className:M,children:b.map((O,z)=>a.jsx("div",{className:`duration-wheel__item ${z===1?"duration-wheel__item--selected":""}`,style:{height:Zc},children:i(O)},z))})}),a.jsx("button",{type:"button",className:"duration-wheel__arrow duration-wheel__arrow--down",onClick:I,"aria-label":`Decrease ${n}`,children:a.jsx(dl,{size:14})})]})}const is=()=>{var p,S;const{authUser:e}=K(),{selectedChat:t,selectedUser:n,sendMessage:r,acceptChat:s,rejectChat:i}=Re(),o=d.useRef(null),l=d.useRef(null),[c,u]=d.useState(""),[f,h]=d.useState(null),[y,b]=d.useState(""),[g,_]=d.useState(!1),[j,k]=d.useState(!1),[x,v]=d.useState(((p=bn[0])==null?void 0:p.id)??"smileys"),[E,R]=d.useState([]),I="blah-blah-recent-emojis",[M,O]=d.useState("datetime"),[z,F]=d.useState(0),[D,ee]=d.useState(0),[$,oe]=d.useState(0),[He,he]=d.useState(0);d.useEffect(()=>{const m=document.querySelector(".chat-input-bar-wrap");if(!m)return;const w=N=>{N.target&&N.target.closest(".emoji-picker")||N.target&&N.target.closest(".timer-picker")||N.preventDefault()};return m.addEventListener("wheel",w,{passive:!1}),m.addEventListener("touchmove",w,{passive:!1}),()=>{m.removeEventListener("wheel",w),m.removeEventListener("touchmove",w)}},[]),d.useEffect(()=>{try{const m=localStorage.getItem(I);if(m){const w=JSON.parse(m);Array.isArray(w)&&R(w)}}catch{}},[]);const te=()=>{const m=new Date;return m.setHours(m.getHours()+1,0,0,0),{year:m.getFullYear(),month:m.getMonth()+1,day:m.getDate(),hours:m.getHours(),minutes:0,seconds:0}},[W,ue]=d.useState(()=>te().year),[q,T]=d.useState(()=>te().month),[J,ge]=d.useState(()=>te().day),[fe,X]=d.useState(()=>te().hours),[ne,Ce]=d.useState(()=>te().minutes),[_e,je]=d.useState(()=>te().seconds),[_t,Je]=d.useState(!0),[Ye,nt]=d.useState(null),[xe,me]=d.useState(!1),[Ve,Ue]=d.useState(null),[Ne,Ee]=d.useState(0);d.useEffect(()=>{const m=w=>{l.current&&!l.current.contains(w.target)&&(_(!1),k(!1))};return window.addEventListener("mousedown",m),()=>window.removeEventListener("mousedown",m)},[]),d.useEffect(()=>{if(!Ye||!xe)return;const m=setInterval(()=>Ee(w=>w+1),1e3);return()=>clearInterval(m)},[Ye,xe]),d.useEffect(()=>{if(g&&M==="datetime"){const m=ct(W,q,J,fe,ne,_e);(m.year!==W||m.month!==q||m.day!==J||m.hours!==fe||m.minutes!==ne||m.seconds!==_e)&&(ue(m.year),T(m.month),ge(m.day),X(m.hours),Ce(m.minutes),je(m.seconds))}},[g,M]);const Ie=((S=t==null?void 0:t.createdBy)==null?void 0:S._id)??(t==null?void 0:t.createdBy),Xe=(e==null?void 0:e._id)&&t&&String(Ie)!==String(e._id);t&&t.acceptedBy;const A=t&&!t.acceptedBy;d.useEffect(()=>{A&&_(!1)},[A]);const le=m=>{if(A){m.target.value="";return}const w=m.target.files[0];if(!w)return;const N=new FileReader;N.onloadend=()=>{h(N.result),b(w.name)},N.readAsDataURL(w),m.target.value=""},re=()=>{let m=null;if(M==="duration"&&(m=D*36e5+$*6e4+He*1e3,m<=0)){se.error("Timer must be > 0");return}if(M==="datetime"){const w=_n(W,q),N=Math.min(J,w),L=new Date(W,q-1,N,fe,ne,_e).getTime();if(L<=Date.now()){se.error("Choose a future date and time");return}m=L-Date.now()}nt(m),me(M==="datetime"),Ue(Date.now()+m),_(!1)},Ae=async m=>{if(m.preventDefault(),!c.trim()&&!f)return;if(A&&(f||Ye)){se.error("File and timer are available after chat is accepted");return}const w=A?null:Ye?Date.now()+Ye:null;await r({receiverId:n._id,conversationId:t._id,text:c.trim(),image:A?void 0:f,fileName:A?void 0:y||void 0,revealAt:w,revealed:!w}),u(""),h(null),b(""),nt(null),me(!1),Ue(null),ee(0),oe(0),he(0);const N=te();ue(N.year),T(N.month),ge(N.day),X(N.hours),Ce(N.minutes),je(N.seconds)},Oe=[{id:"recent",label:"Recent"},...bn.map(m=>({id:m.id,label:m.label}))],Be=m=>{var w;return m==="recent"?E:((w=bn.find(N=>N.id===m))==null?void 0:w.emojis)||[]},ot=m=>{u(w=>`${w}${m}`),R(w=>{const N=[m,...w.filter(L=>L!==m)].slice(0,40);try{localStorage.setItem(I,JSON.stringify(N))}catch{}return N})};return a.jsxs("div",{className:"message-input-ref relative",children:[Ye&&a.jsxs("div",{className:"message-input-ref__timer-info",children:[a.jsx("span",{className:"message-input-ref__timer-info-text",children:xe?(()=>{const m=new Date(Date.now()+Ye),w=m.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),N=m.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0});return`Reveal on ${w} at ${N}`})():(()=>{const m=xe&&Ve!=null?Math.max(0,Ve-Date.now()):Ye;return`Reveals in ${Kc(m)}`})()}),a.jsx("button",{type:"button",onClick:()=>{nt(null),me(!1),Ue(null)},className:"message-input-ref__timer-clear","aria-label":"Remove scheduled time",children:a.jsx(kt,{size:14})})]}),f&&a.jsxs("div",{className:"message-input-ref__preview",children:[f.startsWith("data:image/")?a.jsx("img",{src:f,alt:"Preview"}):a.jsx("span",{className:"message-input-ref__file-name",children:y||"File attached"}),a.jsx("button",{type:"button",onClick:()=>{h(null),b("")},className:"message-input-ref__preview-remove",children:a.jsx(kt,{size:14})})]}),a.jsxs("form",{onSubmit:Ae,className:"message-input-ref__bar",children:[a.jsx("input",{type:"file",ref:o,hidden:!0,accept:"*/*",onChange:le}),a.jsx("button",{type:"button",className:`message-input-ref__attach ${A?"message-input-ref__attach--disabled":""}`,onClick:()=>{var m;return!A&&((m=o.current)==null?void 0:m.click())},"aria-label":"Attach",disabled:A,title:A?"Available after chat is accepted":"Attach",children:a.jsx(xl,{size:20})}),a.jsx("input",{value:c,onChange:m=>u(m.target.value),className:"message-input-ref__input",placeholder:"Your message"}),a.jsxs("div",{className:"message-input-ref__extra message-input-ref__extra--has-picker",ref:l,children:[j&&a.jsxs("div",{className:"emoji-picker",children:[a.jsx("div",{className:"emoji-picker__tabs",children:Oe.map(m=>a.jsx("button",{type:"button",className:`emoji-picker__tab ${x===m.id?"emoji-picker__tab--active":""}`,onClick:()=>v(m.id),children:m.label},m.id))}),a.jsx("div",{className:"emoji-picker__grid",children:Be(x).map((m,w)=>a.jsx("button",{type:"button",className:"emoji-picker__item",onClick:()=>ot(m),children:m},`${m}-${w}`))})]}),a.jsx("button",{type:"button",onClick:()=>{k(m=>!m),_(!1)},className:"message-input-ref__attach","aria-label":"Emoji",title:"Emoji",children:"🙂"}),g&&a.jsxs("div",{className:`timer-picker ${Ye?"timer-picker--shift-up":""}`,children:[a.jsxs("div",{className:"timer-picker__tabs",children:[a.jsx("button",{type:"button",className:`timer-picker__tab ${M==="datetime"?"timer-picker__tab--active":""}`,onClick:()=>O("datetime"),children:"Date & Time"}),a.jsx("button",{type:"button",className:`timer-picker__tab ${M==="duration"?"timer-picker__tab--active":""}`,onClick:()=>O("duration"),children:"Duration"})]}),M==="duration"&&a.jsx("div",{className:"timer-picker__duration",children:a.jsxs("div",{className:"duration-wheel",children:[a.jsx(rt,{value:D,max:23,label:"h",onChange:ee,format:m=>String(m).padStart(2,"0")+"h"}),a.jsx(rt,{value:$,max:59,label:"m",onChange:oe,format:m=>String(m).padStart(2,"0")+"m"}),a.jsx(rt,{value:He,max:59,label:"s",onChange:he,format:m=>String(m).padStart(2,"0")+"s"})]})}),M==="datetime"&&a.jsx("div",{className:"timer-picker__datetime",children:a.jsx("div",{className:"timer-picker__duration timer-picker__duration--datetime",children:_t?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"duration-wheel",children:[a.jsx(rt,{value:fe,max:23,label:"Hours",onChange:m=>{Je(!0);const w=ct(W,q,J,m,ne,_e);ue(w.year),T(w.month),ge(w.day),X(w.hours),Ce(w.minutes),je(w.seconds)}}),a.jsx(rt,{value:ne,max:59,label:"Minutes",onChange:m=>{Je(!0);const w=ct(W,q,J,fe,m,_e);ue(w.year),T(w.month),ge(w.day),X(w.hours),Ce(w.minutes),je(w.seconds)}}),a.jsx(rt,{value:_e,max:59,label:"Seconds",onChange:m=>{Je(!0);const w=ct(W,q,J,fe,ne,m);ue(w.year),T(w.month),ge(w.day),X(w.hours),Ce(w.minutes),je(w.seconds)}})]}),a.jsxs("div",{className:"duration-wheel duration-wheel--row",children:[a.jsx(rt,{value:W-Ut,max:20,label:"Year",onChange:m=>{const w=Ut+m,N=ct(w,q,J,fe,ne,_e);ue(N.year),T(N.month),ge(N.day),X(N.hours),Ce(N.minutes),je(N.seconds)},format:m=>String(Ut+m)}),a.jsx(rt,{value:q-1,max:11,label:"Month",onChange:m=>{const w=m+1,N=ct(W,w,J,fe,ne,_e);ue(N.year),T(N.month),ge(N.day),X(N.hours),Ce(N.minutes),je(N.seconds)},format:m=>String(m+1).padStart(2,"0")}),a.jsx(rt,{value:Math.min(J,_n(W,q))-1,max:30,label:"Date",onChange:m=>{const w=m+1,N=ct(W,q,w,fe,ne,_e);ue(N.year),T(N.month),ge(N.day),X(N.hours),Ce(N.minutes),je(N.seconds)},format:m=>String(m+1).padStart(2,"0")})]})]}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"duration-wheel duration-wheel--row",children:[a.jsx(rt,{value:W-Ut,max:20,label:"Year",onChange:m=>{const w=Ut+m,N=ct(w,q,J,fe,ne,_e);ue(N.year),T(N.month),ge(N.day),X(N.hours),Ce(N.minutes),je(N.seconds)},format:m=>String(Ut+m)}),a.jsx(rt,{value:q-1,max:11,label:"Month",onChange:m=>{const w=m+1,N=ct(W,w,J,fe,ne,_e);ue(N.year),T(N.month),ge(N.day),X(N.hours),Ce(N.minutes),je(N.seconds)},format:m=>String(m+1).padStart(2,"0")}),a.jsx(rt,{value:Math.min(J,_n(W,q))-1,max:30,label:"Date",onChange:m=>{const w=m+1,N=ct(W,q,w,fe,ne,_e);ue(N.year),T(N.month),ge(N.day),X(N.hours),Ce(N.minutes),je(N.seconds)},format:m=>String(m+1).padStart(2,"0")})]}),a.jsxs("div",{className:"duration-wheel",children:[a.jsx(rt,{value:fe,max:23,label:"Hours",onChange:m=>{Je(!0);const w=ct(W,q,J,m,ne,_e);ue(w.year),T(w.month),ge(w.day),X(w.hours),Ce(w.minutes),je(w.seconds)}}),a.jsx(rt,{value:ne,max:59,label:"Minutes",onChange:m=>{Je(!0);const w=ct(W,q,J,fe,m,_e);ue(w.year),T(w.month),ge(w.day),X(w.hours),Ce(w.minutes),je(w.seconds)}}),a.jsx(rt,{value:_e,max:59,label:"Seconds",onChange:m=>{Je(!0);const w=ct(W,q,J,fe,ne,m);ue(w.year),T(w.month),ge(w.day),X(w.hours),Ce(w.minutes),je(w.seconds)}})]})]})})}),a.jsx("button",{type:"button",onClick:re,className:"timer-picker__submit",children:"Set Timer"})]}),a.jsx("button",{type:"button",onClick:()=>{A||(_(m=>!m),k(!1))},className:`message-input-ref__attach ${A?"message-input-ref__attach--disabled":""}`,"aria-label":"Schedule",disabled:A,title:A?"Available after chat is accepted":"Schedule",children:a.jsx(ml,{size:18})})]}),a.jsx("button",{type:"submit",className:"message-input-ref__send",disabled:!c.trim()&&!f,"aria-label":"Send",children:a.jsx(kl,{size:20})})]})]})},Qc=()=>{const e=Array(6).fill(null);return a.jsx("div",{className:"flex-1 overflow-y-auto p-4 space-y-4",children:e.map((t,n)=>a.jsxs("div",{className:`chat ${n%2===0?"chat-start":"chat-end"}`,children:[a.jsx("div",{className:"chat-image avatar",children:a.jsx("div",{className:"size-10 rounded-full",children:a.jsx("div",{className:"skeleton w-full h-full rounded-full"})})}),a.jsx("div",{className:"chat-header mb-1",children:a.jsx("div",{className:"skeleton h-4 w-16"})}),a.jsx("div",{className:"chat-bubble bg-transparent p-0",children:a.jsx("div",{className:"skeleton h-16 w-[200px]"})})]},n))})},ls={love:["love","luv","loved","loving","miss you","missing you","need you","forever","mine","my person","jaan","jaanu","baby","babe","shona","sona","cutie","meri","mera","dil","dil se","pyaar","pyar","ishq","❤️","💕","💖","💗","💞","💘","😍","🥰","😘","🤍"],happy:["happy","happiness","joy","joyful","awesome","amazing","great","nice","cool","fantastic","perfect","yay","yayy","yayyy","yess","yesss","hehe","haha","lol","lmao","rofl","mast","badiya","sahi","ekdum sahi","full on","mazza","mazaa","majaa","jhakaas","killer","😂","🤣","😄","😁","😆","😊","😎"],angry:["angry","anger","mad","furious","irritated","annoyed","annoying","hate","hated","hating","wtf","omfg","ffs","shit","bullshit","damn","bloody","gussa","bahut gussa","pagal","dimag kharab","irritate","pak gaya","bas yaar","chutiya","bakwaas","bekaar","😡","🤬","😠","💢","🔥"],sad:["sad","sadness","unhappy","cry","crying","cried","hurt","hurts","lonely","alone","broken","dukhi","udaas","mann nahi","bura lag raha","thak gaya","tired","exhausted","akela","akeli","😭","😢","😞","😔","☹️","🥺"],calm:["calm","relaxed","peace","peaceful","fine","okay","ok","alright","safe","comfortable","theek hai","thik hai","chill","koi baat nahi","sab theek","shaant","sukoon","😌","🙂","🫶"],anxious:["anxious","anxiety","stressed","stress","worried","scared","afraid","nervous","panic","overthinking","tension","dar lag raha","soch raha","overthink","ghabrahat","confused","samajh nahi aa raha","😰","😥","😨","😟","😬"]},ed={love:[330,70,75],happy:[120,70,75],angry:[0,0,18],sad:[220,40,75],calm:[180,30,85],anxious:[40,60,80]};function td(e){const t={};let n=0;if(Object.keys(ls).forEach(i=>t[i]=0),e.forEach(i=>{const o=i.toLowerCase();Object.entries(ls).forEach(([l,c])=>{c.forEach(u=>{o.includes(u)&&(t[l]++,n++)})})}),n===0)return null;const r={};Object.entries(t).forEach(([i,o])=>{o>0&&(r[i]=o/n)});const s=Math.min(n/6,1);return{mix:r,intensity:s}}function nd(e,t,n){t/=100,n/=100;const r=o=>(o+e/30)%12,s=t*Math.min(n,1-n),i=o=>n-s*Math.max(-1,Math.min(r(o)-3,Math.min(9-r(o),1)));return[255*i(0),255*i(8),255*i(4)]}function rd(e){let t=0,n=0,r=0;const s={angry:e.angry||0,sad:e.sad||0,anxious:e.anxious||0,love:e.love||0,happy:e.happy||0,calm:e.calm||0};if(Object.entries(e).forEach(([o,l])=>{const c=ed[o];if(!c)return;let[u,f,h]=c,[y,b,g]=nd(u,f,h);if(s.angry>.3&&o!=="angry"){const _=Math.min((s.angry-.3)/.7,1);y*=1-_,b*=1-_,g*=1-_}if(s.sad>.25&&o!=="sad"){const _=(y+b+g)/3,j=Math.min(s.sad/.8,1);y=y*(1-j)+_*j,b=b*(1-j)+_*j,g=g*(1-j)+_*j}if(s.anxious>.25&&o!=="anxious"){const _=Math.min(s.anxious/.8,1);y+=20*_,b+=20*_,g-=15*_}o==="love"&&(y*=1+s.love*.4,b*=1+s.love*.15),o==="happy"&&(y*=1+s.happy*.25,b*=1+s.happy*.25,g*=1+s.happy*.15),y=Math.min(255,Math.max(0,y)),b=Math.min(255,Math.max(0,b)),g=Math.min(255,Math.max(0,g)),t+=y*l,n+=b*l,r+=g*l}),s.calm>.3){const o=Math.min(s.calm/.8,1);t=t*(1-o)+245*o,n=n*(1-o)+245*o,r=r*(1-o)+245*o}const i=Math.max(t,n,r,1);return i>255&&(t=t/i*255,n=n/i*255,r=r/i*255),{r:Math.min(255,Math.round(t)),g:Math.min(255,Math.round(n)),b:Math.min(255,Math.round(r))}}const sd={r:245,g:245,b:245},xn={};function qn(e,t,n){return e+(t-e)*n}function ad(e,t,n,r,s){const i=n??"_global";if(xn[i]||(xn[i]={...sd}),r&&s){document.documentElement.style.setProperty("--chat-mood-bg",s);return}const o=xn[i],l=.06+t*.14;o.r=qn(o.r,e.r,l),o.g=qn(o.g,e.g,l),o.b=qn(o.b,e.b,l);const c=`rgb(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)})`;document.documentElement.style.setProperty("--chat-mood-bg",c)}function Wn(e,t,n){const r=e??"_global";if(delete xn[r],t&&n){document.documentElement.style.setProperty("--chat-mood-bg",n);return}const s=getComputedStyle(document.documentElement).getPropertyValue("--chat-bg").trim();s?document.documentElement.style.setProperty("--chat-mood-bg",s):document.documentElement.style.setProperty("--chat-mood-bg","rgb(245, 245, 245)")}function od(e,t){const n=[],r=[],s=t!=null?String(t):"";for(let i=e.length-1;i>=0;i--){const o=e[i];if(!(o!=null&&o.text)||typeof o.text!="string")continue;const l=o.senderId!=null?String(o.senderId):"";if(l===s&&n.length<8?n.push(o.text):l!==s&&r.length<8&&r.push(o.text),n.length>=8&&r.length>=8)break}return[...n,...r]}function id(e,t,n){const r=dt(o=>o.theme),s=(r==null?void 0:r.chatBg)==="#0f0f0f"||(r==null?void 0:r.chatBg)==="#000000"||(r==null?void 0:r.chatBg)==="#0a0a0a"||(r==null?void 0:r.pageBg)==="#0f0f0f"||(r==null?void 0:r.pageBg)==="#000000"||(r==null?void 0:r.pageBg)==="#0a0a0a",i=s?(r==null?void 0:r.chatBg)??"#0a0a0a":null;d.useEffect(()=>{if(!Array.isArray(e)||e.length===0||t==null){Wn(n,s,i);return}const o=od(e,t);if(o.length===0){Wn(n,s,i);return}const l=td(o);if(!l){Wn(n,s,i);return}const c=rd(l.mix);ad(c,l.intensity,n,s,i)},[e,t,n,s,i])}function wn(e){const t=new Date(e),n=new Date,r=$c(e),s=t.getDate()===n.getDate()&&t.getMonth()===n.getMonth()&&t.getFullYear()===n.getFullYear(),i=new Date(n);i.setDate(n.getDate()-1);const o=t.getDate()===i.getDate()&&t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear();if(s)return`${r} today`;if(o)return`${r} yesterday`;const l=t.toLocaleDateString(void 0,{day:"2-digit",month:"short",year:"numeric"});return`${r} on ${l}`}function ld(e){return new Date(e).toLocaleString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit"})}function cd({revealAt:e,onReveal:t}){const[n,r]=d.useState(Math.max(0,new Date(e)-Date.now()));if(d.useEffect(()=>{const f=setInterval(()=>{const h=new Date(e)-Date.now();h<=0?(clearInterval(f),t==null||t(),r(0)):r(h)},1e3);return()=>clearInterval(f)},[e,t]),n<=0)return null;const s=Math.floor(n/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),l=Math.floor(s%3600/60),c=s%60,u=f=>String(f).padStart(2,"0");return a.jsxs("div",{className:"countdown-flip",children:[a.jsx("div",{className:"countdown-flip__title",children:"SAVE THE DATE"}),a.jsxs("div",{className:"countdown-flip__row",children:[a.jsxs("div",{className:"countdown-flip__segment",children:[a.jsxs("div",{className:"countdown-flip__digits",children:[a.jsx("span",{className:"countdown-flip__digit",children:u(i)[0]}),a.jsx("span",{className:"countdown-flip__digit",children:u(i)[1]})]}),a.jsx("div",{className:"countdown-flip__label",children:"Days"})]}),a.jsx("span",{className:"countdown-flip__colon",children:":"}),a.jsxs("div",{className:"countdown-flip__segment",children:[a.jsxs("div",{className:"countdown-flip__digits",children:[a.jsx("span",{className:"countdown-flip__digit",children:u(o)[0]}),a.jsx("span",{className:"countdown-flip__digit",children:u(o)[1]})]}),a.jsx("div",{className:"countdown-flip__label",children:"Hours"})]}),a.jsx("span",{className:"countdown-flip__colon",children:":"}),a.jsxs("div",{className:"countdown-flip__segment",children:[a.jsxs("div",{className:"countdown-flip__digits",children:[a.jsx("span",{className:"countdown-flip__digit",children:u(l)[0]}),a.jsx("span",{className:"countdown-flip__digit",children:u(l)[1]})]}),a.jsx("div",{className:"countdown-flip__label",children:"Minutes"})]}),a.jsx("span",{className:"countdown-flip__colon",children:":"}),a.jsxs("div",{className:"countdown-flip__segment",children:[a.jsxs("div",{className:"countdown-flip__digits",children:[a.jsx("span",{className:"countdown-flip__digit",children:u(c)[0]}),a.jsx("span",{className:"countdown-flip__digit",children:u(c)[1]})]}),a.jsx("div",{className:"countdown-flip__label",children:"Seconds"})]})]}),a.jsx("div",{className:"countdown-flip__datetime",children:ld(e)})]})}function cs({message:e,onReveal:t}){const{authUser:n}=K(),r=e.senderId===n._id,s=e.revealAt&&!e.revealed;return s&&!e.revealed?a.jsx(cd,{revealAt:e.revealAt,revealed:e.revealed,onReveal:t}):a.jsx("div",{children:s&&!r&&a.jsx("div",{className:"message-bubble",children:e.text})})}function dd({message:e,onReveal:t}){const{authUser:n}=K(),[r,s]=d.useState(!1),i=e.senderId===n._id,o=e.revealAt&&!e.revealed,c=e.senderId==="6997e34d5bfffd55ff54458d";return o&&e.revealAt&&!i?a.jsx(cs,{message:e,onReveal:t}):o&&e.revealAt&&i?a.jsxs("div",{className:"message-bubble message-bubble--timed",children:[a.jsx(cs,{message:e,onReveal:t}),e.text&&a.jsx("div",{className:"timed-message-text",children:e.text})]}):a.jsxs("div",{className:`flex flex-col ${i?"items-end":"items-start"}`,children:[a.jsxs("div",{className:`message-bubble ${c?"bot-bubble":i?"sender-bubble":"receiver-bubble"}`,children:[a.jsx("div",{children:e.text}),e.image&&(e.fileName&&!/\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?|$)/i.test(e.fileName)||e.image.includes("/raw/")?a.jsxs("a",{href:e.image,target:"_blank",rel:"noopener noreferrer",className:"msg-attachment-link msg-attachment-file",children:["📎 ",e.fileName||"Download file"]}):a.jsx("a",{href:e.image,target:"_blank",rel:"noopener noreferrer",className:"msg-attachment-link",children:a.jsx("img",{src:e.image,alt:"",className:"msg-attachment-img"})}))]}),e.revealAt&&e.revealed&&a.jsx("div",{className:`text-[10px] opacity-60 mt-1 text-gray-500 ${i?"text-right":"text-left"}`,children:`Revealed at ${wn(e.revealAt)}`})]})}const ds=d.memo(dd,(e,t)=>{const n=e.message,r=t.message;return!n||!r||n._id!==r._id?!1:n.text===r.text&&n.revealed===r.revealed&&n.image===r.image&&n.fileName===r.fileName&&n.revealAt===r.revealAt}),us=24*60*60*1e3;function ud(e){const t=new Date(e),n=new Date,r=t.getDate()===n.getDate()&&t.getMonth()===n.getMonth()&&t.getFullYear()===n.getFullYear(),s=new Date(n);s.setDate(n.getDate()-1);const i=t.getDate()===s.getDate()&&t.getMonth()===s.getMonth()&&t.getFullYear()===s.getFullYear();return r?"Today":i?"Yesterday":t.toLocaleDateString(void 0,{weekday:"long",day:"numeric",month:"short",year:"numeric"})}const fd=({setCallType:e,setCallActive:t,setActiveCallUserId:n,setActiveCallUserName:r,setActiveCallUserAvatar:s,setCalling:i,startCall:o})=>{const{isScreenSharing:l,messages:c,getMessagesByConversation:u,loadMoreOlderMessages:f,isMessagesLoading:h,isMessagesLoadingMore:y,hasMoreOlderMessages:b,selectedUser:g,selectedChat:_,markMessageRevealed:j,subscribeToMessages:k,unsubscribeFromMessages:x,deleteMessage:v,subscribeToChatEvents:E,unsubscribeFromChatEvents:R}=Re(),{authUser:I}=K();dt(p=>p.theme);const M=Z(p=>p.toggleNote);Z(p=>p.searchNote);const O=Z(p=>p.noteIds),z=Z(p=>p.isDrawingOpen),F=Z(p=>p.setIsDrawingOpen),D=Z(p=>p.setIsNotesOpen),ee=Z(p=>p.drawingUserIdByChat),$=Z(p=>p.isVideoPanelOpen),oe=Z(p=>p.setIsVideoPanelOpen),He=Z(p=>p.videoUserIdByChat),he=Z(p=>p.isNotesOpen),te=Z(p=>p.panelMinimized),W=ke(p=>p.isTruthDareOpen),ue=ke(p=>p.panelMinimized),q=ke(p=>p.setTruthDareOpen),T=ke(p=>p.setOpenToGameIndex),J=ke(p=>p.gamePlayingUserIdByChat),ge=ke(p=>p.gamePlayingGameNameByChat),fe=Yt(),X={"Spin the bottle":0,"Flip the coin":1,"Roll the die":2},ne=(_==null?void 0:_._id)!=null?String(_._id):null,_e=ne&&J[ne]&&String(J[ne])===String(g==null?void 0:g._id)&&!W,je=ne?ge[ne]:null,Je=ne&&ee[ne]&&String(ee[ne])===String(g==null?void 0:g._id)&&!z,nt=ne&&He[ne]&&String(He[ne])===String(g==null?void 0:g._id)&&!$,xe=d.useRef(null),me=d.useRef(null),Ve=d.useRef(null),[Ue,Ne]=d.useState(null),[Ee,Ie]=d.useState(null),Xe=()=>{const p=me.current;if(!p||!(_!=null&&_._id)||!b||y||p.scrollTop>100)return;const S=p.scrollHeight;f(_._id).then(()=>{requestAnimationFrame(()=>{if(me.current){const m=me.current;m.scrollTop=m.scrollHeight-S}})})};if(!_)return a.jsx(_a,{});const Ke=Array.isArray(c)?c:[],A=Ke.length,le=_&&!_.acceptedBy;d.useEffect(()=>{E()},[]),d.useEffect(()=>{if(!(_!=null&&_._id)||!(I!=null&&I._id))return;const p=K.getState().socket;p.emit("join_chat",{chatId:_._id}),u(_._id),p.emit("chat_opened",{chatId:_._id,userId:I._id})},[_==null?void 0:_._id]);const re=Z(p=>p.fetchNotes);d.useEffect(()=>{_!=null&&_._id&&re(_._id)},[_==null?void 0:_._id]);const[Ae,Oe]=d.useState(!1);d.useEffect(()=>{const p=K.getState().socket;if(p)return p.on("bot_typing",S=>{Oe(S)}),()=>p.off("bot_typing")},[]),id(Ke,I._id,_._id),d.useEffect(()=>{if(!(_!=null&&_._id)||!me.current)return;const p=me.current,S=()=>{p.scrollTop=p.scrollHeight},m=requestAnimationFrame(S),w=setTimeout(S,150),N=setTimeout(S,400);return()=>{cancelAnimationFrame(m),clearTimeout(w),clearTimeout(N)}},[_==null?void 0:_._id]),d.useEffect(()=>{if(h||!(_!=null&&_._id)||!me.current)return;const p=me.current;p.scrollTop=p.scrollHeight;const S=setTimeout(()=>{p.scrollTop=p.scrollHeight},100);return()=>clearTimeout(S)},[_==null?void 0:_._id,h]),d.useLayoutEffect(()=>{const p=me.current;p&&(p.scrollTop=p.scrollHeight)},[A]);const Be=fe&&((he||z||$)&&te||W&&ue);if(d.useEffect(()=>{if(!Be||!me.current)return;const p=me.current;(()=>{p.scrollTo({top:p.scrollHeight,behavior:"smooth"})})();const m=setTimeout(()=>{p.scrollHeight-p.scrollTop-p.clientHeight>2&&p.scrollTo({top:p.scrollHeight,behavior:"smooth"})},350);return Ve.current={t:m},()=>{var w;clearTimeout((w=Ve.current)==null?void 0:w.t)}},[Be,A]),d.useEffect(()=>{const p=S=>{S.target.closest(".message-menu")||Ie(null)};return window.addEventListener("click",p),()=>window.removeEventListener("click",p)},[]),h)return a.jsxs("div",{className:"flex-1 flex flex-col overflow-auto",children:[a.jsx(as,{setCallType:e,setCalling:i,setCallActive:t,setActiveCallUserId:n,setActiveCallUserName:r,setActiveCallUserAvatar:s}),a.jsx(Qc,{}),a.jsx(is,{})]});const ot=(()=>{const p=Ke.filter(S=>String(S.senderId)===String(I._id)&&S.seenAt);return p.length===0?null:(p.sort((S,m)=>new Date(S.seenAt)-new Date(m.seenAt)),p[p.length-1]._id)})();return a.jsxs("div",{className:"flex flex-col h-full",children:[a.jsx(as,{setCallType:e,setCalling:i,setCallActive:t,setActiveCallUserId:n,setActiveCallUserName:r,setActiveCallUserAvatar:s,startCall:o}),a.jsxs("div",{className:`chat-container-wrap${_e||Je||nt?" chat-container-wrap--with-indicator":""}`,children:[_e&&a.jsxs("div",{className:"chat-playing-indicator chat-playing-indicator--overlay",children:[a.jsx("span",{className:"chat-playing-indicator__dot"}),a.jsxs("span",{className:"chat-playing-indicator__text",children:[g==null?void 0:g.fullName," is playing"," ",je??"this game"," — wanna join?"]}),a.jsx("button",{type:"button",className:"chat-playing-indicator__btn",onClick:()=>{D(!1),F(!1),oe(!1);const p=je!=null?X[je]:0;T(typeof p=="number"?p:0),q(!0)},children:"Join"})]}),Je&&!_e&&a.jsxs("div",{className:"chat-playing-indicator chat-playing-indicator--overlay",children:[a.jsx("span",{className:"chat-playing-indicator__dot"}),a.jsxs("span",{className:"chat-playing-indicator__text",children:[g==null?void 0:g.fullName," is drawing — wanna open?"]}),a.jsx("button",{type:"button",className:"chat-playing-indicator__btn",onClick:()=>{D(!1),q(!1),oe(!1),F(!0)},children:"Open"})]}),nt&&!_e&&!Je&&a.jsxs("div",{className:"chat-playing-indicator chat-playing-indicator--overlay",children:[a.jsx("span",{className:"chat-playing-indicator__dot"}),a.jsxs("span",{className:"chat-playing-indicator__text",children:[g==null?void 0:g.fullName," has Watch Party open — wanna join?"]}),a.jsx("button",{type:"button",className:"chat-playing-indicator__btn",onClick:()=>{D(!1),F(!1),q(!1),oe(!0)},children:"Open"})]}),a.jsxs("div",{ref:me,className:"chat-container chat-container-ref flex-1 overflow-y-auto",onScroll:Xe,children:[(()=>{const p=Ke.filter(S=>{var m;return!((m=S.deletedFor)!=null&&m.includes(I._id))});return p.map((S,m)=>{var Me;const w=p[m-1],N=w?new Date(w.createdAt).getTime():0,L=new Date(S.createdAt).getTime(),H=L-N>us,Y=S.senderId===I._id,G=Ee===S._id,ie=S._id===ot&&S.senderId===I._id,ye=((Me=_==null?void 0:_.participants)==null?void 0:Me.length)===2,ce=Y?(I==null?void 0:I.profilePic)||bt:(g==null?void 0:g.profilePic)||bt,Ze=!H&&w&&w.senderId===S.senderId,Fe=p[m+1],pe=Fe?new Date(Fe.createdAt).getTime():0,we=Fe&&Fe.senderId===S.senderId&&pe-L<=us;return a.jsxs(d.Fragment,{children:[H&&a.jsx("div",{className:"chat-date-divider",children:ud(S.createdAt)}),a.jsxs("div",{className:`msg-row ${Y?"msg-row--mine":"msg-row--theirs"} ${ye?"msg-row--no-avatar":""} ${Ze?"msg-row--follows-same":""} ${we?"msg-row--same-sender-below":""}`,children:[!ye&&a.jsx("img",{src:ce,alt:"",className:"msg-row__avatar"}),a.jsxs("div",{className:"relative flex items-start max-w-[75%] group message-menu",children:[!Y&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"msg-bubble-wrapper",children:a.jsx("div",{className:`msg-bubble-ref msg-bubble-ref--theirs ${O.has(S._id)?"msg-bubble-ref--note":""}`,id:`msg-${S._id}`,children:S.deleted?a.jsxs("p",{className:"italic text-xs opacity-70 text-inherit whitespace-nowrap",children:["Message deleted by ",g.fullName]}):a.jsx(ds,{message:S,onReveal:()=>j(S._id)})})}),!S.deleted&&!le&&a.jsxs("div",{className:"relative flex items-center flex-shrink-0",children:[G&&a.jsxs("div",{type:"button",onClick:Le=>Le.stopPropagation(),className:"msg-dropdown absolute left-full ml-2 top-0 z-50 rounded-md py-0.5 animate-scale-in",children:[a.jsxs("button",{onClick:()=>{v(S._id,"me"),Ie(null)},className:"msg-dropdown__item msg-dropdown__item--danger",children:[a.jsx(Ot,{size:12,className:"msg-dropdown__icon"}),a.jsx("span",{children:"Delete for me"})]}),a.jsxs("button",{onClick:()=>{M({chatId:_._id,messageId:S._id}),Ie(null)},className:"msg-dropdown__item",children:[a.jsx(Xt,{size:12,className:"msg-dropdown__icon text-gray-600"}),a.jsx("span",{children:O.has(S._id)?"Unmark note":"Mark note"})]}),a.jsx("div",{className:"msg-dropdown__item msg-dropdown__item--muted msg-dropdown__item--muted-left",children:a.jsx("span",{children:wn(S.createdAt)})})]}),a.jsx("button",{type:"button",onClick:Le=>{Le.stopPropagation(),Ie(S._id)},className:`msg-three-dots-btn ${G?"opacity-100":"opacity-0 group-hover:opacity-100"}`,children:"⋮"})]})]}),Y&&a.jsxs(a.Fragment,{children:[!S.deleted&&!le&&a.jsxs("div",{className:"relative flex items-center flex-shrink-0",children:[G&&a.jsxs("div",{type:"button",onClick:Le=>Le.stopPropagation(),className:"msg-dropdown absolute right-full mr-2 top-0 z-50 rounded-md py-0.5 animate-scale-in",children:[a.jsxs("div",{className:"msg-dropdown__row",children:[a.jsxs("button",{onClick:()=>{v(S._id,"me"),Ie(null)},className:"msg-dropdown__item msg-dropdown__item--danger",children:[a.jsx(Ot,{size:12,className:"msg-dropdown__icon"}),a.jsx("span",{children:"Delete for me"})]}),a.jsxs("button",{onClick:()=>{v(S._id,"everyone"),Ie(null)},className:"msg-dropdown__item msg-dropdown__item--danger",children:[a.jsx(Ot,{size:12,className:"msg-dropdown__icon"}),a.jsx("span",{children:"Delete for everyone"})]}),a.jsxs("button",{onClick:()=>{M({chatId:_._id,messageId:S._id}),Ie(null)},className:"msg-dropdown__item",children:[a.jsx(Xt,{size:12,className:"msg-dropdown__icon text-gray-600"}),a.jsx("span",{children:O.has(S._id)?"Unmark note":"Mark note"})]})]}),a.jsx("div",{className:"msg-dropdown__item msg-dropdown__item--muted",children:a.jsx("span",{children:wn(S.createdAt)})})]}),a.jsx("button",{type:"button",onClick:Le=>{Le.stopPropagation(),Ie(S._id)},className:`msg-three-dots-btn ${G?"opacity-100":"opacity-0 group-hover:opacity-100"}`,children:"⋮"})]}),a.jsxs("div",{className:"msg-bubble-wrapper",children:[a.jsx("div",{className:`msg-bubble-ref msg-bubble-ref--mine ${O.has(S._id)?"msg-bubble-ref--note":""}`,id:`msg-${S._id}`,children:S.deleted?a.jsx("p",{className:"italic text-xs opacity-70 text-inherit whitespace-nowrap",children:"Message deleted by you"}):a.jsx(ds,{message:S,onReveal:()=>j(S._id)})}),ie&&Y&&a.jsx("div",{className:"msg-seen-below msg-seen-below--mine",children:`Seen at ${wn(S.seenAt)}`})]})]})]})]})]},S._id)})})(),Ae&&a.jsxs("div",{className:"bot-typing",children:[a.jsx("span",{className:"bot-name"}),a.jsxs("div",{className:"typing-dots",children:[a.jsx("span",{}),a.jsx("span",{}),a.jsx("span",{})]})]}),a.jsx("div",{ref:xe})]})]}),a.jsx("div",{className:"chat-input-bar-wrap",children:a.jsx(is,{})}),a.jsx(Yc,{src:Ue,onClose:()=>Ne(null)})]})};window.jumpToMessage=e=>{const t=document.getElementById(`msg-${e}`);if(!t)return;t.scrollIntoView({behavior:"smooth",block:"center"});const r=t.classList.contains("msg-bubble-ref--mine")?"msg-bubble-ref--jump-mine":"msg-bubble-ref--jump-theirs";t.classList.remove("msg-bubble-ref--jump-mine","msg-bubble-ref--jump-theirs"),requestAnimationFrame(()=>{t.classList.add(r),setTimeout(()=>t.classList.remove(r),400)})};const fs=()=>{const{selectedChat:e,messages:t}=Re(),{notes:n,fetchNotes:r,setIsNotesOpen:s}=Z(),i=K(h=>h.authUser),[o,l]=d.useState(""),[c,u]=d.useState("added");d.useEffect(()=>{e!=null&&e._id&&r(e._id)},[e==null?void 0:e._id,r]);const f=n.filter(h=>{var b;const y=Array.isArray(t)?t.find(g=>String(g._id)===String(h.messageId)):null;return!(!y||y.deleted||(b=y.deletedFor)!=null&&b.includes(i==null?void 0:i._id))}).filter(h=>h.previewText.toLowerCase().includes(o.toLowerCase())).sort((h,y)=>{if(c==="added"){const _=new Date(h.createdAt||0).getTime();return new Date(y.createdAt||0).getTime()-_}const b=new Date(h.messageCreatedAt||0).getTime();return new Date(y.messageCreatedAt||0).getTime()-b});return a.jsxs("div",{className:"chat-notes-block",children:[a.jsxs("header",{className:"chat-notes-block__header",children:[a.jsx("h2",{className:"chat-notes-block__title",children:"Notes"}),a.jsx("button",{type:"button",className:"chat-notes-block__close",onClick:()=>s(!1),"aria-label":"Close notes",children:a.jsx(kt,{size:20})})]}),a.jsxs("div",{className:"chat-notes-block__body",children:[a.jsx("input",{type:"text",placeholder:"Search notes...",value:o,onChange:h=>l(h.target.value),className:"chat-notes-block__search"}),a.jsxs("div",{className:"chat-notes-block__sort",children:[a.jsx("span",{className:"chat-notes-block__sort-label",children:"Sort by"}),a.jsxs("div",{className:"chat-notes-block__sort-btns",children:[a.jsx("button",{type:"button",className:`chat-notes-block__sort-btn ${c==="added"?"chat-notes-block__sort-btn--active":""}`,onClick:()=>u("added"),children:"Date added"}),a.jsx("button",{type:"button",className:`chat-notes-block__sort-btn ${c==="message"?"chat-notes-block__sort-btn--active":""}`,onClick:()=>u("message"),children:"Message date"})]})]}),f.map(h=>{let y=h.messageSenderId;if(!y&&h.messageId&&Array.isArray(t)){const g=t.find(_=>String(_._id)===String(h.messageId));g&&(y=g.senderId)}const b=y&&String(y)===String(i==null?void 0:i._id);return a.jsxs("button",{type:"button",className:`chat-notes-block__item ${b?"chat-notes-block__item--mine":"chat-notes-block__item--theirs"}`,onClick:()=>window.jumpToMessage(h.messageId),children:[h.previewText,a.jsx("span",{className:"chat-notes-block__item-meta",children:new Date(h.messageCreatedAt).toLocaleString()})]},h._id)})]})]})},hd=600,Yn=["#1e293b","#dc2626","#ea580c","#ca8a04","#16a34a","#0891b2","#7c3aed","#db2777","#ffffff"],md=10,pd=4,jt=1e3,xa=750,hs=pd/400*jt,gd=600,yd=450,wa=.7;function bd(e,t,n){return!n||!n.width||!n.height?{x:e,y:t}:{x:e/n.width*jt,y:t/n.height*xa}}function va(e,t){return!t||!t.width||!t.height?{x:e.x,y:e.y,size:e.size}:{x:e.x/jt*t.width,y:e.y/xa*t.height,size:e.size!=null?e.size/jt*t.width:void 0}}function _d(e,t){return!t||!t.width?e??6:(e??6)/jt*t.width}function ms(e,t,n,r="#ffffff"){if(!e||!Array.isArray(t.points)||t.points.length<2)return;const s=t.points.map(h=>va(h,n)),i=_d(t.brushSize,n),o=s.reduce((h,y)=>h+(y.size??i??6),0)/s.length,{tool:l}=t,c=l==="eraser"?Math.max(1,o*1.5):Math.max(1,o*wa);e.beginPath(),e.moveTo(s[0].x,s[0].y);for(let h=1;h<s.length-1;h++){const y=s[h-1],b=s[h],g=(y.x+b.x)/2,_=(y.y+b.y)/2;e.quadraticCurveTo(y.x,y.y,g,_)}const u=s[s.length-1],f=s[s.length-2];e.quadraticCurveTo(f.x,f.y,u.x,u.y),e.lineWidth=c,e.lineCap="round",e.lineJoin="round",l==="eraser"?(e.globalAlpha=1,e.globalCompositeOperation="source-over",e.strokeStyle=r):(e.globalCompositeOperation="source-over",e.globalAlpha=1,e.strokeStyle=t.color??"#1e293b"),e.stroke(),e.globalAlpha=1,e.globalCompositeOperation="source-over"}const ps=()=>{var ot;const e=Z(p=>p.setIsDrawingOpen),t=Re(p=>p.selectedChat),n=Re(p=>p.selectedUser),{socket:r,authUser:s}=K(),i=((ot=t==null?void 0:t.participants)==null?void 0:ot.find(p=>String(p._id)!==String(s==null?void 0:s._id)))??n,o=(t==null?void 0:t._id)!=null?String(t._id):null,l=Z(p=>o?p.pendingDrawingCanvasByChat[o]:null),c=Z(p=>p.clearPendingDrawingCanvas),u=dt(p=>p.theme),h=(u==null?void 0:u.chatBg)==="#0a0a0a"||(u==null?void 0:u.pageBg)==="#0a0a0a"||(u==null?void 0:u.chatBg)==="#000000"?(u==null?void 0:u.chatBg)??"#0a0a0a":"#ffffff",y=d.useRef(h);y.current=h;const b=d.useRef(null),g=d.useRef(!1),_=d.useRef([]),j=d.useRef(null),k=d.useRef([]),x=d.useRef([]),v=d.useRef(null),E=d.useRef(2),[R,I]=d.useState(6),[M,O]=d.useState(6),[z,F]=d.useState(()=>[...Yn]),[D,ee]=d.useState(Yn[0]),[$,oe]=d.useState("pencil"),He=d.useRef(6),he=d.useRef(6),te=d.useRef("pencil"),W=d.useRef(Yn[0]),ue=d.useRef(null),q=d.useRef(null),T=d.useRef(null),J=d.useRef(null),ge=d.useRef(0);d.useEffect(()=>{He.current=R,he.current=M,te.current=$,W.current=D},[R,M,$,D]);const[fe,X]=d.useState(!1),[ne,Ce]=d.useState(!1),[_e,je]=d.useState(null),[_t,Je]=d.useState(0),Ye=d.useRef(0),nt=d.useRef(null),xe=d.useCallback(()=>{X(k.current.length>0),Ce(x.current.length>0)},[]),me=d.useCallback(()=>{q.current&&clearTimeout(q.current),q.current=setTimeout(()=>{var m;q.current=null;const p=(m=Re.getState().selectedChat)==null?void 0:m._id,S=b.current;if(!(!p||!(S!=null&&S.width)||!(S!=null&&S.height)))try{const w=S.toDataURL("image/png");be.put(`/drawings/${p}`,{imageData:w}).catch(N=>{console.warn("Drawing save failed:",N==null?void 0:N.message)})}catch{}},hd)},[]);d.useEffect(()=>(T.current=me,()=>{T.current=null}),[me]);const Ve=d.useCallback(p=>{const S=b.current;if(!S)return null;const m=S.getBoundingClientRect(),w=p.touches?p.touches[0].clientX:p.clientX,N=p.touches?p.touches[0].clientY:p.clientY,L=p.pressure!=null?p.pressure:1,H=w-m.left,Y=N-m.top,{x:G,y:ie}=bd(H,Y,m);return{logicalX:G,logicalY:ie,displayX:H,displayY:Y,pressure:Math.min(1,Math.max(0,L))}},[]),Ue=d.useCallback(p=>{k.current.push(p),k.current.length>md&&k.current.shift(),x.current=[],X(k.current.length>0),Ce(!1)},[]),Ne=d.useCallback(p=>{const S=b.current,m=S==null?void 0:S.getContext("2d",{willReadFrequently:!1});if(!S||!m){p==null||p();return}const w=S.getBoundingClientRect(),N=E.current,L=k.current,H=v.current,Y=()=>{m.save(),m.setTransform(N,0,0,N,0,0);const G=y.current;for(let ie=0;ie<L.length;ie++)ms(m,L[ie],w,G);m.restore(),p==null||p()};if(m.save(),m.setTransform(1,0,0,1,0,0),m.fillStyle=y.current,m.fillRect(0,0,S.width,S.height),m.restore(),H){const G=new Image;G.onload=()=>{m.save(),m.setTransform(1,0,0,1,0,0),m.drawImage(G,0,0,S.width,S.height),m.restore(),Y()},G.onerror=()=>Y(),G.src=H}else Y()},[]);d.useEffect(()=>{const p=b.current;!p||!p.width||!p.height||Ne()},[h,Ne]),d.useEffect(()=>(J.current=Ue,()=>{J.current=null}),[Ue]);const Ee=d.useCallback(()=>{const p=b.current;if(!(p!=null&&p.width)||!(p!=null&&p.height))return;const S=K.getState().socket;if(!(S!=null&&S.connected))return;const m=Re.getState().selectedChat;if(!(m!=null&&m._id))return;const w=String(m._id);try{const N=p.width,L=p.height,H=800,Y=.92;let G;if(N<=H&&L<=H)G=p.toDataURL("image/jpeg",Y);else{const ye=H/Math.max(N,L),ce=Math.max(1,Math.floor(N*ye)),Ze=Math.max(1,Math.floor(L*ye)),Fe=document.createElement("canvas");Fe.width=ce,Fe.height=Ze;const pe=Fe.getContext("2d",{willReadFrequently:!0});pe?(pe.drawImage(p,0,0,N,L,0,0,ce,Ze),G=Fe.toDataURL("image/jpeg",Y)):G=p.toDataURL("image/jpeg",Y)}const ie={chatId:w,imageData:G};S.emit("drawing_canvas_state",ie),setTimeout(()=>S.emit("drawing_canvas_state",ie),150)}catch{}},[]),Ie=d.useCallback(()=>{var N;const p=Re.getState().selectedChat,S=Re.getState().selectedUser,m=K.getState().authUser,w=((N=p==null?void 0:p.participants)==null?void 0:N.find(L=>String(L._id)!==String(m==null?void 0:m._id)))??S;return p!=null&&p._id&&w?{chatId:String(p._id),otherUserId:String(w._id??w)}:null},[]),Xe=d.useCallback((p=!1)=>{if(k.current.length===0)return;const S=k.current.pop();x.current.push(S),xe(),Ne(()=>{if(me(),!p){const m=K.getState().socket,w=Ie();m!=null&&m.connected&&w&&(m.emit("drawing_undo",w),Ee())}})},[Ne,xe,me,Ie,Ee]),Ke=d.useCallback((p=!1)=>{if(x.current.length===0)return;const S=x.current.pop();k.current.push(S),xe(),Ne(()=>{if(me(),!p){const m=K.getState().socket,w=Ie();m!=null&&m.connected&&w&&(m.emit("drawing_redo",w),Ee())}})},[Ne,xe,me,Ie,Ee]),A=d.useCallback((p=!1)=>{const S=b.current;if(!S)return;v.current=null,k.current=[],x.current=[];const m=S.getContext("2d",{willReadFrequently:!1});if(m.save(),m.setTransform(1,0,0,1,0,0),m.fillStyle=y.current,m.fillRect(0,0,S.width,S.height),m.restore(),xe(),me(),!p){const w=K.getState().socket,N=Ie();w!=null&&w.connected&&N&&(w.emit("drawing_clear",N),Ee())}},[xe,me,Ie,Ee]),le=d.useRef({w:0,h:0});d.useEffect(()=>{const p=t==null?void 0:t._id;if(!p)return;const S=String(p),m=setTimeout(()=>{const w=b.current;!(w!=null&&w.width)||!(w!=null&&w.height)||ue.current===S||Z.getState().pendingDrawingCanvasByChat[S]||(ue.current=S,be.get(`/drawings/${p}`).then(L=>{var ie;const H=(ie=L==null?void 0:L.data)==null?void 0:ie.imageData;if(!H||!b.current||Z.getState().pendingDrawingCanvasByChat[S]||Date.now()-ge.current<3e3||!b.current.getContext("2d",{willReadFrequently:!0}))return;const G=new Image;G.onload=()=>{const ye=b.current;if(!ye||Z.getState().pendingDrawingCanvasByChat[S])return;const ce=ye.getContext("2d",{willReadFrequently:!1});ce.save(),ce.setTransform(1,0,0,1,0,0),ce.fillStyle=y.current,ce.fillRect(0,0,ye.width,ye.height),ce.drawImage(G,0,0,ye.width,ye.height),ce.restore(),v.current=H,k.current=[],x.current=[],xe()},G.src=H}).catch(()=>{}))},150);return()=>clearTimeout(m)},[t==null?void 0:t._id,xe]),d.useEffect(()=>{const p=b.current;if(!p)return;const S=p.getContext("2d",{willReadFrequently:!1});if(!S)return;const m=Math.min(window.devicePixelRatio||1,3);E.current=m;const w=()=>{const L=p.parentElement;if(!L)return;const H=Math.max(1,L.clientWidth),Y=Math.max(1,L.clientHeight);if(Y<220||H===le.current.w&&Y===le.current.h)return;le.current={w:H,h:Y};const G=Math.max(gd,Math.floor(H*m)),ie=Math.max(yd,Math.floor(Y*m)),ce=p.width>0&&p.height>0?p.toDataURL("image/png"):null,Ze=p.width,Fe=p.height;if(p.width=G,p.height=ie,p.style.width=`${H}px`,p.style.height=`${Y}px`,p.style.flexShrink="0",S.setTransform(1,0,0,1,0,0),S.imageSmoothingEnabled=!0,S.imageSmoothingQuality="high",ce&&Ze>0&&Fe>0){const pe=new Image;pe.onload=()=>{const we=pe.naturalWidth,Me=pe.naturalHeight;if(S.fillStyle=y.current,S.fillRect(0,0,G,ie),G<=we&&ie<=Me)S.drawImage(pe,0,0,G,ie,0,0,G,ie);else{const Le=Math.floor((G-we)/2),P=Math.floor((ie-Me)/2);S.drawImage(pe,0,0,we,Me,Le,P,we,Me)}S.scale(m,m)},pe.src=ce}else S.fillStyle=y.current,S.fillRect(0,0,G,ie),S.scale(m,m)},N=new ResizeObserver(w);return N.observe(p.parentElement),w(),()=>N.disconnect()},[]);const re=d.useCallback(p=>{var ye;p.preventDefault();const S=b.current;S&&p.target===S&&((ye=S.setPointerCapture)==null||ye.call(S,p.pointerId));const m=Ve(p);if(!m||!S||!S.width||!S.height)return;const w=S.getBoundingClientRect();je({x:m.displayX,y:m.displayY});const N=S.getContext("2d",{willReadFrequently:!1}),L=te.current,H=L==="eraser"?he.current:He.current,G=(L==="eraser"?H*1.5:H)*(.5+.5*(m.pressure??1)),ie=w.width?G/w.width*jt:G;j.current=N.getImageData(0,0,S.width,S.height),_.current=[{x:m.logicalX,y:m.logicalY,size:ie}],g.current=!0},[Ve]),Ae=d.useCallback(p=>{if(p.preventDefault(),!g.current)return;const S=Ve(p);if(!S)return;const m=b.current,w=m==null?void 0:m.getContext("2d",{willReadFrequently:!0});if(!w||!j.current)return;const N=m.getBoundingClientRect();je({x:S.displayX,y:S.displayY});const L=_.current,H=te.current,Y=H==="eraser"?he.current:He.current,ie=(H==="eraser"?Y*1.5:Y)*(H==="eraser"?1:.5+.5*(S.pressure??1)),ye=N.width?ie/N.width*jt:ie;if(L.push({x:S.logicalX,y:S.logicalY,size:ye}),L.length<2)return;w.putImageData(j.current,0,0);const ce=L.map(Me=>va(Me,N));w.beginPath(),w.moveTo(ce[0].x,ce[0].y);for(let Me=1;Me<ce.length-1;Me++){const Le=ce[Me-1],P=ce[Me],U=(Le.x+P.x)/2,V=(Le.y+P.y)/2;w.quadraticCurveTo(Le.x,Le.y,U,V)}const Ze=ce[ce.length-1],Fe=ce[ce.length-2];w.quadraticCurveTo(Fe.x,Fe.y,Ze.x,Ze.y);const pe=ce.reduce((Me,Le)=>Me+(Le.size??6),0)/ce.length,we=H==="eraser"?pe:Math.max(1,pe*wa);w.lineWidth=we,w.lineCap="round",w.lineJoin="round",H==="eraser"?(w.globalAlpha=1,w.globalCompositeOperation="source-over",w.strokeStyle=y.current,w.stroke()):(w.globalCompositeOperation="source-over",w.globalAlpha=1,w.strokeStyle=W.current,w.stroke()),w.globalAlpha=1,w.globalCompositeOperation="source-over"},[Ve]),Oe=d.useCallback(()=>{var N;if(!g.current)return;g.current=!1;const p=_.current,S=b.current,m=S==null?void 0:S.getContext("2d",{willReadFrequently:!0}),w=j.current;if(j.current=null,p.length>0){if((p.length<2||(()=>{let pe=0;for(let we=1;we<p.length;we++)pe+=Math.hypot(p[we].x-p[we-1].x,p[we].y-p[we-1].y);return pe<hs})())&&w&&m){m.putImageData(w,0,0),_.current=[];return}const H=S.getBoundingClientRect(),Y=te.current==="eraser"?he.current:He.current,G=H.width?Y/H.width*jt:Y;if(Ue({points:p.map(pe=>({x:pe.x,y:pe.y,size:pe.size})),color:W.current,tool:te.current,brushSize:G}),te.current!=="eraser"){const pe=W.current;F(we=>we.includes(pe)?we:[...we,pe])}const ie=K.getState().socket,ye=Re.getState().selectedChat,ce=Re.getState().selectedUser,Ze=K.getState().authUser,Fe=((N=ye==null?void 0:ye.participants)==null?void 0:N.find(pe=>String(pe._id)!==String(Ze==null?void 0:Ze._id)))??ce;if(ie&&(ye!=null&&ye._id)&&Fe){const pe={chatId:String(ye._id),otherUserId:String(Fe._id??Fe),points:p.map(we=>({x:we.x,y:we.y,size:we.size})),color:W.current,brushSize:G,tool:te.current};ie.emit("drawing_stroke",pe)}me()}_.current=[]},[Ue,me]);d.useEffect(()=>{const p=b.current,S=nt.current;if(!p||!S)return;const m=N=>{const L=S.getBoundingClientRect();je({x:N.clientX-L.left,y:N.clientY-L.top})},w=()=>je(null);return p.addEventListener("pointerdown",re),p.addEventListener("pointermove",Ae),p.addEventListener("pointerup",Oe),p.addEventListener("pointerleave",Oe),p.addEventListener("pointercancel",Oe),S.addEventListener("pointermove",m),S.addEventListener("pointerleave",w),()=>{p.removeEventListener("pointerdown",re),p.removeEventListener("pointermove",Ae),p.removeEventListener("pointerup",Oe),p.removeEventListener("pointerleave",Oe),p.removeEventListener("pointercancel",Oe),S.removeEventListener("pointermove",m),S.removeEventListener("pointerleave",w)}},[re,Ae,Oe]),d.useEffect(()=>{const p=b.current;if(p)return p.style.touchAction="none",()=>{p.style.touchAction="",q.current&&(clearTimeout(q.current),q.current=null)}},[]),d.useEffect(()=>{if(!(t!=null&&t._id)||!i||!r)return;const p=String(t._id),S=String(i._id??i);return r.emit("join_chat",{chatId:p}),r.emit("drawing_playing",{chatId:p,otherUserId:S}),()=>{r.emit("drawing_left",{chatId:p,otherUserId:S})}},[t==null?void 0:t._id,i==null?void 0:i._id,r]),d.useEffect(()=>{const p=r;if(!p)return;const S=({chatId:m,points:w,color:N,brushSize:L,tool:H})=>{var pe,we;const Y=Re.getState().selectedChat,G=(Y==null?void 0:Y._id)!=null?String(Y._id):null;if(!G||G!==m)return;const ie=b.current,ye=ie==null?void 0:ie.getContext("2d",{willReadFrequently:!0});if(!ie||!ye||!Array.isArray(w)||w.length<2)return;let ce=0;for(let Me=1;Me<w.length;Me++){const Le=w[Me-1],P=w[Me];ce+=Math.hypot((P.x??0)-(Le.x??0),(P.y??0)-(Le.y??0))}if(ce<hs)return;const Ze=ie.getBoundingClientRect();ms(ye,{points:w,color:N,tool:H,brushSize:L},Ze,y.current),(pe=J.current)==null||pe.call(J,{points:w,color:N,tool:H,brushSize:L}),(we=T.current)==null||we.call(T)};return p.on("drawing_stroke",S),()=>p.off("drawing_stroke",S)},[r]),d.useEffect(()=>{const p=r;if(!p||!o)return;const S=({chatId:m})=>{String(m)===o&&Ee()};return p.on("drawing_request_canvas_state",S),()=>p.off("drawing_request_canvas_state",S)},[r,o,Ee]),d.useEffect(()=>{const p=r;if(!p||!o)return;const S=({chatId:N})=>{String(N)===o&&se("Other user undid",{icon:"↩️",duration:2e3})},m=({chatId:N})=>{String(N)===o&&se("Other user redid",{icon:"↪️",duration:2e3})},w=({chatId:N})=>{String(N)===o&&se("Other user cleared the canvas",{icon:"🗑️",duration:2e3})};return p.on("drawing_undo",S),p.on("drawing_redo",m),p.on("drawing_clear",w),()=>{p.off("drawing_undo",S),p.off("drawing_redo",m),p.off("drawing_clear",w)}},[r,o]);const Be=d.useRef(null);return d.useEffect(()=>{Be.current=({chatId:p,imageData:S})=>{var L;const m=((L=Re.getState().selectedChat)==null?void 0:L._id)!=null?String(Re.getState().selectedChat._id):null;if(!m||String(p)!==m||!S)return;const w=b.current;if(!(w!=null&&w.width)||!(w!=null&&w.height)){Z.getState().setPendingDrawingCanvas(m,S);return}const N=new Image;N.onerror=()=>Z.getState().clearPendingDrawingCanvas(m),N.onload=()=>{var G;const H=b.current;if(!H)return;ge.current=Date.now();const Y=H.getContext("2d",{willReadFrequently:!1});Y&&(Y.save(),Y.setTransform(1,0,0,1,0,0),Y.fillStyle=y.current,Y.fillRect(0,0,H.width,H.height),Y.drawImage(N,0,0,N.naturalWidth||H.width,N.naturalHeight||H.height,0,0,H.width,H.height),Y.restore(),v.current=S,k.current=[],x.current=[],xe(),(G=T.current)==null||G.call(T),Z.getState().clearPendingDrawingCanvas(m))},N.src=S}}),d.useEffect(()=>{if(!r||!o)return;const p=S=>{var m;return(m=Be.current)==null?void 0:m.call(Be,S)};return r.on("drawing_canvas_state",p),()=>r.off("drawing_canvas_state",p)},[r,o]),d.useEffect(()=>{if(!l||!o)return;const p=b.current;if(!p)return;if(!p.width||!p.height){if(Ye.current+=1,Ye.current>50){c(o),Ye.current=0;return}const w=setTimeout(()=>Je(N=>N+1),100);return()=>clearTimeout(w)}Ye.current=0;const S=l,m=new Image;m.onerror=()=>{c(o)},m.onload=()=>{var L;const w=b.current;if(!w)return;const N=w.getContext("2d",{willReadFrequently:!1});N&&(ge.current=Date.now(),N.save(),N.setTransform(1,0,0,1,0,0),N.fillStyle=y.current,N.fillRect(0,0,w.width,w.height),N.drawImage(m,0,0,m.naturalWidth||w.width,m.naturalHeight||w.height,0,0,w.width,w.height),N.restore(),v.current=S,k.current=[],x.current=[],xe(),(L=T.current)==null||L.call(T),c(o))},m.src=S},[l,o,_t,xe,c]),a.jsxs("div",{className:"chat-drawing-block",children:[a.jsxs("header",{className:"chat-drawing-block__header",children:[a.jsx("h2",{className:"chat-drawing-block__title",children:"Drawing"}),a.jsx("div",{className:"chat-drawing-block__header-actions",children:a.jsx("button",{type:"button",className:"chat-drawing-block__btn",onClick:()=>e(!1),"aria-label":"Close drawing",title:"Close",children:a.jsx(kt,{size:20})})})]}),a.jsx("div",{className:"chat-drawing-block__toolbar",children:a.jsxs("div",{className:"chat-drawing-block__toolbar-row",children:[a.jsxs("div",{className:"chat-drawing-block__tools",children:[a.jsx("button",{type:"button",className:`chat-drawing-block__tool-btn ${$==="pencil"?"chat-drawing-block__tool-btn--active":""}`,onClick:()=>oe("pencil"),title:"Pencil","aria-pressed":$==="pencil",children:a.jsx(Cn,{size:16})}),a.jsx("button",{type:"button",className:`chat-drawing-block__tool-btn ${$==="eraser"?"chat-drawing-block__tool-btn--active":""}`,onClick:()=>oe("eraser"),title:"Eraser","aria-pressed":$==="eraser",children:a.jsx(pl,{size:16})})]}),a.jsx("div",{className:"chat-drawing-block__size-inline",children:a.jsx("input",{type:"range",min:1,max:24,value:$==="eraser"?M:R,onChange:p=>$==="eraser"?O(Number(p.target.value)):I(Number(p.target.value)),className:"chat-drawing-block__size-slider",title:$==="eraser"?"Eraser size":"Pencil size","aria-label":$==="eraser"?"Eraser size":"Pencil size"})}),a.jsx("div",{className:`chat-drawing-block__colors-wrap ${$!=="pencil"?"chat-drawing-block__colors-wrap--hidden":""}`,children:a.jsxs("div",{className:"chat-drawing-block__colors",children:[z.map(p=>a.jsx("button",{type:"button",className:`chat-drawing-block__color-btn ${D===p?"chat-drawing-block__color-btn--active":""}`,style:{background:p},onClick:()=>ee(p),title:p,"aria-label":`Color ${p}`,children:D===p&&p==="#ffffff"?a.jsx("span",{className:"chat-drawing-block__color-check"}):null},p)),a.jsxs("label",{className:`chat-drawing-block__color-btn chat-drawing-block__color-btn--custom ${z.includes(D)?"":"chat-drawing-block__color-btn--active"}`,title:"Pick any colour",children:[a.jsx("input",{type:"color",value:D,onChange:p=>ee(p.target.value),className:"chat-drawing-block__color-input","aria-label":"Pick custom colour"}),a.jsx("span",{className:"chat-drawing-block__color-custom-icon","aria-hidden":!0,children:"+"})]})]})}),a.jsxs("div",{className:"chat-drawing-block__actions",children:[a.jsx("button",{type:"button",className:"chat-drawing-block__action-btn",onClick:()=>Xe(),disabled:!fe,"aria-label":"Undo",title:"Undo",children:a.jsx(Tl,{size:16})}),a.jsx("button",{type:"button",className:"chat-drawing-block__action-btn",onClick:()=>Ke(),disabled:!ne,"aria-label":"Redo",title:"Redo",children:a.jsx(jl,{size:16})}),a.jsx("button",{type:"button",className:"chat-drawing-block__action-btn",onClick:()=>A(),"aria-label":"Clear all",title:"Clear all",children:a.jsx(Ot,{size:16})})]})]})}),a.jsx("div",{className:"chat-drawing-block__body",children:a.jsxs("div",{ref:nt,className:"chat-drawing-block__canvas-wrap",children:[a.jsx("canvas",{ref:b,className:"chat-drawing-block__canvas","aria-label":"Drawing canvas",style:{cursor:"none"}}),_e!=null&&a.jsx("div",{className:`chat-drawing-block__cursor ${$==="eraser"?"chat-drawing-block__cursor--eraser":""}`,style:{left:_e.x,top:_e.y,width:($==="eraser"?M*1.5:R)*2,height:($==="eraser"?M*1.5:R)*2,marginLeft:-($==="eraser"?M*1.5:R),marginTop:-($==="eraser"?M*1.5:R),borderColor:$==="eraser"?"#94a3b8":D}})]})})]})};let un=null;function xd(){var e;return typeof window>"u"?Promise.resolve(null):(e=window.YT)!=null&&e.Player?Promise.resolve(window.YT):un||(un=new Promise(t=>{var o,l,c;if((o=window.YT)!=null&&o.Player){t(window.YT);return}const n=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{n&&n(),t(window.YT)};const r=document.createElement("script"),s=typeof((l=window.location)==null?void 0:l.origin)=="string"?window.location.origin:"";r.src=s?`https://www.youtube.com/iframe_api?origin=${encodeURIComponent(s)}`:"https://www.youtube.com/iframe_api";const i=document.getElementsByTagName("script")[0];(c=i==null?void 0:i.parentNode)==null||c.insertBefore(r,i)}),un)}const Jt=1,gs=2,Gn=3,Sa=100,wd=Sa*1024*1024,vd=100,Sd=280,jd=1,kd=2,Cd=600,Jn=1.2,Nd=80;function ys(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"0:00";const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60),s=i=>String(i).padStart(2,"0");return t>0?`${t}:${s(n)}:${s(r)}`:`${n}:${s(r)}`}function Ed(e){if(!e||typeof e!="string")return null;const t=e.trim(),n=t.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);if(n)return n[1];const r=t.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);if(r)return r[1];const s=t.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);return s?s[1]:null}const bs=()=>{var we,Me,Le;const e=Yt(),{setIsVideoPanelOpen:t,pendingYoutubeUrl:n,setPendingYoutubeUrl:r,videoPanelWidth:s,setVideoPanelWidth:i,watchPartyYoutubeUrlByChat:o,setWatchPartyYoutubeUrl:l,watchPartyLocalVideoUrlByChat:c,setWatchPartyLocalVideoUrl:u,videoUserIdByChat:f,watchPartyResumeByChat:h,setWatchPartyResume:y,watchPartyClearedByOtherByChat:b,setWatchPartyClearedByOther:g}=Z(),_=Re(P=>P.selectedChat),j=K(P=>P.authUser),k=K(P=>P.socket),x=(we=_==null?void 0:_.participants)==null?void 0:we.find(P=>String(P._id)!==String(j==null?void 0:j._id)),[v,E]=d.useState("youtube"),[R,I]=d.useState("stream"),[M,O]=d.useState(""),[z,F]=d.useState(null),[D,ee]=d.useState(""),$=d.useRef(0),oe=d.useRef(0),[He,he]=d.useState(!0),te=d.useRef(null),W=d.useRef(0),ue=d.useCallback(P=>{var Pe,de;P.preventDefault(),$.current=P.clientX??((de=(Pe=P.touches)==null?void 0:Pe[0])==null?void 0:de.clientX)??0,oe.current=s;const U=B=>{var Qe,We;const ve=B.clientX??((We=(Qe=B.touches)==null?void 0:Qe[0])==null?void 0:We.clientX)??$.current,qe=$.current-ve;i(oe.current+qe)},V=()=>{document.removeEventListener("mousemove",U),document.removeEventListener("mouseup",V),document.removeEventListener("touchmove",U),document.removeEventListener("touchend",V)};document.addEventListener("mousemove",U),document.addEventListener("mouseup",V),document.addEventListener("touchmove",U,{passive:!0}),document.addEventListener("touchend",V)},[s,i]),q=d.useMemo(()=>Ed(M),[M]);d.useEffect(()=>{n&&(O(n),r(null))},[n,r]),d.useEffect(()=>{if(!(_!=null&&_._id)||!x||!k)return;const P=String(_._id),U=String(x._id??x);return k.emit("join_chat",{chatId:P}),k.emit("watch_party_playing",{chatId:P,otherUserId:U}),()=>{k.emit("watch_party_left",{chatId:P,otherUserId:U})}},[_==null?void 0:_._id,x==null?void 0:x._id,k]);const T=(_==null?void 0:_._id)!=null?String(_._id):null,J=T?o==null?void 0:o[T]:void 0,ge=T&&x&&(f==null?void 0:f[T])&&String(f[T])===String(x._id??x),fe=d.useRef(void 0),X=T?(Me=h==null?void 0:h[T])==null?void 0:Me.youtube:void 0,ne=T?(Le=h==null?void 0:h[T])==null?void 0:Le.local:void 0;d.useEffect(()=>{const P=T,U=v;return()=>{var de;if(!P)return;const V=Ne.current,Pe=xe.current;if(U==="local"&&V&&Number.isFinite(V.currentTime))y(P,"local",V.currentTime,V.paused);else if(U==="youtube"&&(Pe!=null&&Pe.getCurrentTime))try{const B=Pe.getCurrentTime(),ve=(de=Pe.getPlayerState)==null?void 0:de.call(Pe);y(P,"youtube",B,ve!==Jt&&ve!==Gn)}catch{}}},[T,v,y]);const Ce=d.useRef(M);Ce.current=M,d.useEffect(()=>{if(v!=="youtube"||!T||!x||!k)return;const P=(Ce.current||"").trim();P&&k.emit("watch_party_youtube_url",{chatId:T,otherUserId:String(x._id??x),url:P})},[v,T,x==null?void 0:x._id,k]),d.useEffect(()=>{if(!T||v!=="youtube")return;const P=typeof J=="string"&&J.trim()!==""?J:null;P&&fe.current!==P&&(fe.current=P,O(P)),J||(fe.current=void 0)},[T,v,J]);const _e=T?b==null?void 0:b[T]:void 0;d.useEffect(()=>{if(!T||!_e)return;O("");const P=Ve.current;P&&URL.revokeObjectURL(P),F(null),ee(""),g(T,null)},[T,_e,g]),d.useEffect(()=>{if(v!=="youtube"||!T||!x||!k)return;const P=setTimeout(()=>{k.emit("watch_party_youtube_url",{chatId:T,otherUserId:String(x._id??x),url:M.trim()||""})},400);return()=>clearTimeout(P)},[v,T,x,k,M]);const je=async()=>{try{const P=await navigator.clipboard.readText();P&&O(P.trim())}catch{}},_t=P=>{var V;const U=(V=P.target.files)==null?void 0:V[0];if(D&&URL.revokeObjectURL(D),!U){F(null),ee("");return}if(R==="upload"&&U.size>wd){se.error(`In Upload mode, keep file under ${Sa} MB. Use Stream mode for larger videos.`),P.target.value="";return}F(U),ee(URL.createObjectURL(U))},[Je,Ye]=d.useState(!1),nt=d.useRef(null),xe=d.useRef(null),me=d.useRef(null),Ve=d.useRef("");Ve.current=D;const Ue=T?c==null?void 0:c[T]:void 0;d.useEffect(()=>{xd().then(P=>{P&&Ye(!0)})},[]);const Ne=d.useRef(null),Ee=d.useRef(!1),Ie=d.useRef(null),Xe=d.useRef(!1),Ke=d.useRef(!1),A=d.useRef(0),[le,re]=d.useState(0),[Ae,Oe]=d.useState(0),[Be,ot]=d.useState(!0),p=v==="youtube"&&q||v==="local"&&(Ue||D),S=d.useCallback(()=>{if(!p)return;const P=Date.now();e&&P-W.current<180||(W.current=P,he(U=>U||!0),e&&(te.current&&clearTimeout(te.current),te.current=setTimeout(()=>{he(!1)},3e3)))},[p,e]);d.useEffect(()=>{if(!p){he(!1),te.current&&(clearTimeout(te.current),te.current=null);return}return he(!0),e&&(te.current&&clearTimeout(te.current),te.current=setTimeout(()=>{he(!1)},3e3)),()=>{te.current&&(clearTimeout(te.current),te.current=null)}},[p,e]);const m=d.useCallback((P,U,V)=>{!T||!x||!k||k.emit("watch_party_sync",{chatId:T,otherUserId:String(x._id??x),event:P,currentTime:U,isPaused:V,ts:Date.now(),source:v})},[T,x,k,v]),w=d.useRef(m);w.current=m,d.useEffect(()=>{if(!k||!T||!x)return;const P=String(x._id??x),U=({chatId:V,userId:Pe,event:de,currentTime:B,isPaused:ve,ts:qe,source:Qe})=>{var wr,vr;if(String(V)!==T||String(Pe)!==P||Qe!==v)return;const We=Ne.current,Se=xe.current;let et=typeof B=="number"&&!Number.isNaN(B)?B:void 0;if(et!==void 0&&typeof qe=="number"&&(de==="play"||de==="timeupdate")&&!ve){const ft=(Date.now()-qe)/1e3;et=Math.max(0,et+ft),ft>2&&(et=B)}const Na=de==="timeupdate",xr=v==="local"?kd:jd;let Lt=0;if(v==="local"&&We)Lt=We.currentTime??0;else if(v==="youtube"&&(Se!=null&&Se.getCurrentTime))try{Lt=Se.getCurrentTime()??0}catch{}if(Na&&et!==void 0){if(v==="local"&&We){const ft=Date.now();if(ft-A.current<Cd)return;const Bn=et-Lt;if(Math.abs(Bn)<=xr||Bn<0&&-Bn<Jn)return;A.current=ft}else if(v==="youtube"&&(Se!=null&&Se.getCurrentTime)){const ft=et-Lt;if(Math.abs(ft)<=xr||ft<0&&-ft<Jn)return}}et!==void 0&&et<Lt&&Lt-et<Jn&&(et=void 0),Ee.current=!0,v==="local"&&We?(et!==void 0&&(We.currentTime=et),de==="play"||de==="timeupdate"&&!ve?We.play().catch(()=>{}):(de==="pause"||de==="timeupdate"&&ve)&&We.pause()):v==="youtube"&&(Se!=null&&Se.seekTo)&&(et!==void 0&&Se.seekTo(et,!0),de==="play"||de==="timeupdate"&&!ve?(wr=Se.playVideo)==null||wr.call(Se):(de==="pause"||de==="timeupdate"&&ve)&&((vr=Se.pauseVideo)==null||vr.call(Se))),setTimeout(()=>{Ee.current=!1},Nd)};return k.on("watch_party_sync",U),()=>k.off("watch_party_sync",U)},[k,T,x,v]),d.useEffect(()=>{A.current=0},[v,T]);const N=d.useCallback(()=>{var P;Ee.current||Xe.current||m("play",(P=Ne.current)==null?void 0:P.currentTime,!1)},[m]),L=d.useCallback(()=>{var U;if(Ee.current||Xe.current)return;const P=(U=Ne.current)==null?void 0:U.currentTime;m("pause",typeof P=="number"?P:void 0,!0)},[m]),H=d.useCallback(()=>{Ee.current||Xe.current||Ie.current||(Ie.current=setTimeout(()=>{Ie.current=null;const P=Ne.current;P&&m("timeupdate",P.currentTime,P.paused)},Sd))},[m]),Y=d.useCallback(()=>{var U,V;if(Ee.current||Xe.current)return;const P=(U=Ne.current)==null?void 0:U.currentTime;m("seek",typeof P=="number"?P:void 0,((V=Ne.current)==null?void 0:V.paused)??!0)},[m]),G=d.useCallback(()=>{var U,V;if(Ee.current||Xe.current)return;const P=(U=Ne.current)==null?void 0:U.currentTime;m("timeupdate",typeof P=="number"?P:void 0,((V=Ne.current)==null?void 0:V.paused)??!0)},[m]);d.useEffect(()=>{if(v!=="youtube"||!Je||!q||!nt.current||typeof window.YT>"u")return;const P=window.YT,U=nt.current,V=document.createElement("div");V.style.width="100%",V.style.height="100%",U.appendChild(V);const Pe=X,de=new P.Player(V,{videoId:q,width:"100%",height:"100%",playerVars:{autoplay:J&&M.trim()===(J||"").trim()?1:0},events:{onReady:ve=>{var qe,Qe,We,Se;if(Pe&&typeof Pe.currentTime=="number"&&Pe.currentTime>0)try{ve.target.seekTo(Pe.currentTime,!0),Pe.isPaused?(Qe=(qe=ve.target).pauseVideo)==null||Qe.call(qe):(Se=(We=ve.target).playVideo)==null||Se.call(We)}catch{}},onStateChange:ve=>{var We,Se;if(Ee.current||Xe.current)return;const qe=w.current;if(!qe)return;const Qe=(Se=(We=ve.target).getCurrentTime)==null?void 0:Se.call(We);ve.data===Jt?qe("play",Qe,!1):ve.data===gs?qe("pause",Qe,!0):ve.data===Gn&&qe("seek",Qe,!1)}}});xe.current=de;const B=setInterval(()=>{var ve,qe,Qe;if(!Ee.current)try{const We=(ve=de.getPlayerState)==null?void 0:ve.call(de);if(We===Jt){const Se=(qe=de.getCurrentTime)==null?void 0:qe.call(de);typeof Se=="number"&&w.current("timeupdate",Se,!1)}else if(We===gs){const Se=(Qe=de.getCurrentTime)==null?void 0:Qe.call(de);typeof Se=="number"&&w.current("timeupdate",Se,!0)}}catch{}},vd);return me.current=B,()=>{me.current&&clearInterval(me.current),me.current=null,xe.current=null;try{de.destroy&&de.destroy()}catch{}V.parentNode&&V.parentNode.removeChild(V)}},[v,Je,q]),d.useEffect(()=>{if(!p||Ke.current)return;const P=()=>{var V,Pe,de;if(!Ke.current){if(v==="local"){const B=Ne.current;B&&(re(B.currentTime),ot(B.paused),Number.isFinite(B.duration)&&B.duration>0&&Oe(B.duration))}else if(v==="youtube"){const B=xe.current;if((B==null?void 0:B.getCurrentTime)!=null)try{const ve=(V=B.getCurrentTime)==null?void 0:V.call(B),qe=(Pe=B.getDuration)==null?void 0:Pe.call(B),Qe=(de=B.getPlayerState)==null?void 0:de.call(B);typeof ve=="number"&&re(ve),typeof qe=="number"&&qe>0&&Oe(qe),ot(Qe!==Jt&&Qe!==Gn)}catch{}}}};P();const U=setInterval(P,300);return()=>clearInterval(U)},[v,p,q,Ue,D]);const ie=10,ye=d.useCallback(()=>{var P,U,V,Pe,de;if(S(),!!p)if(Xe.current=!0,setTimeout(()=>{Xe.current=!1},150),v==="local"){const B=Ne.current;if(!B)return;B.paused?(B.play().catch(()=>{}),m("play",B.currentTime,!1)):(B.pause(),m("pause",B.currentTime,!0))}else{const B=xe.current;if(!B)return;try{((P=B.getPlayerState)==null?void 0:P.call(B))===Jt?((U=B.pauseVideo)==null||U.call(B),m("pause",(V=B.getCurrentTime)==null?void 0:V.call(B),!0)):((Pe=B.playVideo)==null||Pe.call(B),m("play",(de=B.getCurrentTime)==null?void 0:de.call(B),!1))}catch{}}},[v,p,m]),ce=d.useCallback(P=>{if(S(),!p||typeof P!="number"||Number.isNaN(P))return;const U=Math.max(0,Math.min(P,Ae||P));if(Xe.current=!0,setTimeout(()=>{Xe.current=!1},150),v==="local"){const V=Ne.current;V&&(V.currentTime=U,m("seek",U,V.paused))}else{const V=xe.current;V!=null&&V.seekTo&&(V.seekTo(U,!0),m("seek",U,!1))}re(U)},[v,p,Ae,m]),Ze=d.useCallback(()=>{S(),ce(le-ie)},[le,ce]),Fe=d.useCallback(()=>{S(),ce(le+ie)},[le,ce]),pe=d.useCallback(()=>{v==="youtube"?(O(""),T&&x&&k&&(k.emit("watch_party_clear",{chatId:T,otherUserId:String(x._id??x)}),l(T,null))):(D&&URL.revokeObjectURL(D),F(null),ee(""),T&&(u(T,null),x&&k&&k.emit("watch_party_clear",{chatId:T,otherUserId:String(x._id??x)})))},[v,D,T,x,k,u,l]);return a.jsxs("div",{className:`chat-video-panel ${e?"chat-video-panel--mobile":""}`,style:e?void 0:{width:s,minWidth:s},children:[a.jsx("button",{type:"button",className:"chat-video-panel__resize",onMouseDown:ue,onTouchStart:ue,"aria-label":"Resize panel",children:a.jsx(gl,{size:16})}),a.jsxs("header",{className:"chat-video-panel__header",children:[a.jsx("h2",{className:"chat-video-panel__title",children:"Watch Party"}),a.jsx("button",{type:"button",className:"chat-video-panel__close",onClick:()=>t(!1),"aria-label":"Close video",children:a.jsx(kt,{size:20})})]}),x&&a.jsx("p",{className:`chat-video-panel__joined ${ge?"chat-video-panel__joined--active":""}`,role:"status",children:ge?`${x.fullName||"Friend"} is watching with you`:`Waiting for ${x.fullName||"friend"} to join…`}),a.jsxs("div",{className:`chat-video-panel__body ${v==="local"?"chat-video-panel__body--local":""}`,children:[a.jsxs("div",{className:"chat-video-panel__tabs",children:[a.jsx("div",{className:"chat-video-panel__tabs-slider","aria-hidden":!0,style:{transform:v==="youtube"?"translateX(0)":"translateX(100%)"}}),a.jsx("button",{type:"button",className:`chat-video-panel__tab ${v==="youtube"?"chat-video-panel__tab--active":""}`,onClick:()=>E("youtube"),children:"YouTube"}),a.jsx("button",{type:"button",className:`chat-video-panel__tab ${v==="local"?"chat-video-panel__tab--active":""}`,onClick:()=>E("local"),children:"Local"})]}),v==="youtube"&&a.jsx("div",{className:"chat-video-panel__youtube-controls",children:a.jsx("div",{className:"chat-video-panel__controls",children:a.jsxs("div",{className:"chat-video-panel__url-row",children:[a.jsx("button",{type:"button",className:"chat-video-panel__url-icon-wrap",onClick:je,title:"Paste from clipboard","aria-label":"Paste URL",children:a.jsx(yl,{size:20,strokeWidth:2.5})}),a.jsx("input",{type:"text",placeholder:"YouTube URL",value:M,onChange:P=>O(P.target.value),className:"chat-video-panel__input chat-video-panel__url-input"})]})})}),v==="local"&&a.jsxs("div",{className:"chat-video-panel__local-controls",children:[a.jsx("div",{className:"chat-video-panel__local-mode",children:a.jsxs("div",{className:"chat-video-panel__local-mode-tabs",children:[a.jsx("div",{className:"chat-video-panel__local-mode-slider","aria-hidden":!0,style:{transform:R==="stream"?"translateX(0)":"translateX(100%)"}}),a.jsx("button",{type:"button",className:`chat-video-panel__local-mode-tab ${R==="stream"?"chat-video-panel__local-mode-tab--active":""}`,onClick:()=>I("stream"),children:"Stream"}),a.jsx("button",{type:"button",className:`chat-video-panel__local-mode-tab ${R==="upload"?"chat-video-panel__local-mode-tab--active":""}`,onClick:()=>I("upload"),children:"Upload"})]})}),a.jsxs("label",{className:"chat-video-panel__file-row",children:[a.jsx("span",{className:"chat-video-panel__file-icon-wrap","aria-hidden":!0,children:a.jsx(Rl,{size:20,strokeWidth:2.5})}),a.jsx("span",{className:"chat-video-panel__file-btn",children:"Choose video file"}),a.jsx("input",{type:"file",accept:"video/*",onChange:_t,className:"chat-video-panel__file-input"})]}),a.jsx("p",{className:`chat-video-panel__file-name ${!z&&!Ue?"chat-video-panel__file-name--spacer":""}`,"aria-hidden":!z&&!Ue,children:z?z.name:Ue?"Video shared with you":" "})]}),a.jsxs("div",{className:`chat-video-panel__player-zone ${v==="local"?"chat-video-panel__player-zone--local":""}`,onMouseMove:S,onTouchStart:S,children:[v==="youtube"&&(q?a.jsx("div",{className:"chat-video-panel__player-wrap chat-video-panel__player-wrap--youtube",children:a.jsx("div",{ref:nt,className:"chat-video-panel__youtube-container"})}):a.jsx("div",{className:"chat-video-panel__player-placeholder"})),v==="local"&&(Ue||D?a.jsx("div",{className:"chat-video-panel__player-wrap",children:a.jsx("video",{ref:Ne,src:Ue||D,className:"chat-video-panel__video",playsInline:!0,preload:R==="stream"&&!Ue?"metadata":"auto",onLoadedMetadata:P=>{const U=P.target;ne&&typeof ne.currentTime=="number"&&ne.currentTime>0&&(U.currentTime=ne.currentTime,ne.isPaused?U.pause():U.play().catch(()=>{}))},onPlay:N,onPause:L,onTimeUpdate:H,onSeeking:Y,onSeeked:G})}):a.jsx("div",{className:"chat-video-panel__player-placeholder"}))]}),p&&He&&(()=>{const P=Math.max(1,Ae||0);return a.jsxs("div",{className:"chat-video-panel__playback-bar",children:[a.jsxs("div",{className:"chat-video-panel__seek-row",children:[a.jsxs("span",{className:"chat-video-panel__time-label","aria-hidden":!0,children:[ys(le)," / ",ys(Ae)]}),a.jsx("div",{className:"chat-video-panel__seek-track",style:{"--seek-fill":`${P>0?le/P*100:0}%`},children:a.jsx("input",{type:"range",className:"chat-video-panel__seek-input",min:0,max:P,step:.1,value:Math.min(le,P),onMouseDown:()=>{Ke.current=!0},onTouchStart:()=>{Ke.current=!0},onMouseUp:()=>{Ke.current=!1},onTouchEnd:()=>{Ke.current=!1},onChange:U=>ce(parseFloat(U.target.value,10)),"aria-label":"Seek"})})]}),a.jsxs("div",{className:"chat-video-panel__playback-buttons",children:[a.jsx("button",{type:"button",className:"chat-video-panel__playback-btn",onClick:Ze,"aria-label":"Skip back 10 seconds",children:a.jsx(Cl,{size:20,strokeWidth:2})}),a.jsx("button",{type:"button",className:"chat-video-panel__playback-btn chat-video-panel__playback-btn--primary",onClick:ye,"aria-label":Be?"Play":"Pause",children:Be?a.jsx(Sl,{size:24,strokeWidth:2}):a.jsx(wl,{size:24,strokeWidth:2})}),a.jsx("button",{type:"button",className:"chat-video-panel__playback-btn",onClick:Fe,"aria-label":"Skip forward 10 seconds",children:a.jsx(Nl,{size:20,strokeWidth:2})}),a.jsxs("button",{type:"button",className:"chat-video-panel__clear-btn",onClick:pe,"aria-label":"Clear video",children:[a.jsx(Ot,{size:16}),"Clear"]})]})]})})()]})]})},Td="/assets/bottle-BRACAQwl.png";function Rd({rotation:e,onSpin:t,isSpinning:n}){return a.jsx("div",{className:"bottle-wrapper",children:a.jsx("img",{src:Td,alt:"Bottle",className:"bottle-img",style:{transform:`
      rotate(${e}deg) scale(2)
      rotateX(${Math.sin(e*.02)*3}deg)
    `,transition:n?"none":"transform 0.45s ease-out",cursor:n?"default":"pointer"},onClick:n?void 0:t})})}const Md=["Heads","Tails"];function Pd({onGameResult:e,syncedResult:t}){const[n,r]=d.useState(null),[s,i]=d.useState(!1),o=d.useRef(null);d.useEffect(()=>{o.current=new Audio("/coinflip.mp3"),o.current.volume=.5},[]),d.useEffect(()=>{if(!t||s)return;const u=o.current;u&&(u.pause(),u.currentTime=0,u.play()),r(t),i(!0);const f=setTimeout(()=>i(!1),800);return()=>clearTimeout(f)},[t]);const l=()=>{if(s)return;const u=Md[Math.floor(Math.random()*2)];e==null||e(u);const f=o.current;f&&(f.pause(),f.currentTime=0,f.play()),r(u),i(!0),setTimeout(()=>i(!1),800)},c=s?n==="Tails"?"td-coin__flip-inner--to-tails":"td-coin__flip-inner--to-heads":n==="Tails"?"td-coin__flip-inner--show-tails":"td-coin__flip-inner--show-heads";return a.jsxs("div",{className:"td-mini-game",children:[a.jsx("div",{role:"button",tabIndex:0,className:"td-coin",onClick:l,onKeyDown:u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),l())},"aria-label":"Flip coin",style:{cursor:s?"default":"pointer"},children:a.jsxs("div",{className:`td-coin__flip-inner ${c}`,children:[a.jsx("div",{className:"td-coin__side td-coin__side--head",children:a.jsx("img",{src:"/head.png",alt:"Heads",className:"td-coin__face"})}),a.jsx("div",{className:"td-coin__side td-coin__side--tails",children:a.jsx("img",{src:"/tails.png",alt:"Tails",className:"td-coin__face"})})]})}),a.jsx("div",{className:"td-coin__result-wrap",children:n&&!s&&a.jsx("p",{className:"td-coin__result","aria-live":"polite",children:n})})]})}const Id=[1,2,3,4,5,6],Ad={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};function fn(){return Id[Math.floor(Math.random()*6)]}function Od({value:e}){if(e==null)return null;const t=Ad[e]??[];return a.jsx("div",{className:"td-dice__face","aria-hidden":!0,children:[1,2,3,4,5,6,7,8,9].map(n=>a.jsx("span",{className:`td-dice__pip ${t.includes(n)?"td-dice__pip--on":""}`},n))})}function Dd({onGameResult:e,syncedValue:t}){const[n,r]=d.useState(null),[s,i]=d.useState(!1),[o,l]=d.useState(null),c=d.useRef(null),u=d.useRef(null);d.useEffect(()=>(u.current=new Audio("/dieroll.mp3"),u.current.volume=.5,()=>{c.current&&clearInterval(c.current)}),[]),d.useEffect(()=>{if(t==null||s)return;const y=u.current;y&&(y.pause(),y.currentTime=0,y.play()),i(!0),r(null),l(t);const b=80,g=800;c.current=setInterval(()=>{l(fn())},b);const _=setTimeout(()=>{c.current&&(clearInterval(c.current),c.current=null),r(t),l(t),i(!1)},g);return()=>{clearTimeout(_),c.current&&clearInterval(c.current)}},[t]);const f=()=>{if(s)return;const y=fn();e==null||e(y);const b=u.current;b&&(b.pause(),b.currentTime=0,b.play()),i(!0),r(null),l(fn());const g=800,_=80;c.current=setInterval(()=>{l(fn())},_),setTimeout(()=>{c.current&&(clearInterval(c.current),c.current=null),r(y),l(y),i(!1)},g)},h=o??n;return a.jsx("div",{className:"td-mini-game",children:a.jsx("div",{role:"button",tabIndex:0,className:`td-dice ${s?"td-dice--rolling":""}`,onClick:f,onKeyDown:y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),f())},"aria-label":"Roll die",style:{cursor:s?"default":"pointer"},children:h!=null&&a.jsx(Od,{value:h})})})}const _s="/assets/Spin-Hwyqb5FO.mp3";function Bd(){var Ke;const e=Re(A=>A.selectedChat),t=K(A=>A.authUser),n=K(A=>A.socket),r=d.useRef(null),s=d.useRef(null),i=d.useRef(0),o=d.useRef(!1),l=A=>{o.current=!0,i.current=A.clientY},c=A=>{if(!o.current)return;o.current=!1;const le=Math.abs(A.clientY-i.current),re=Math.min(80,le);te.current=20+re,xe()};d.useEffect(()=>{s.current=new Audio(_s),s.current.loop=!0},[]),d.useEffect(()=>{r.current=new Audio(_s),r.current.loop=!0},[]);const u=((Ke=e==null?void 0:e.participants)==null?void 0:Ke.filter(Boolean).map(A=>({_id:A._id,name:A.fullName,avatar:A.profilePic})))||[],f=u.length>0?[...u.filter(A=>String(A._id)!==String(t==null?void 0:t._id)),...u.filter(A=>String(A._id)===String(t==null?void 0:t._id))]:[];if(!f.length)return a.jsx("div",{className:"td-container",children:"No participants"});const h=f.findIndex(A=>String(A._id)===String(t==null?void 0:t._id)),[y,b]=d.useState(0),[g,_]=d.useState(null),[j,k]=d.useState(null),[x,v]=d.useState(0),E=ke(A=>A.setCurrentGameName),R=ke(A=>A.openToGameIndex),I=ke(A=>A.setOpenToGameIndex),[M,O]=d.useState(null),[z,F]=d.useState(null),[D,ee]=d.useState(!1),[$,oe]=d.useState(!1),He=f.find(A=>String(A._id)!==String(t==null?void 0:t._id)),he=He!=null&&String(t==null?void 0:t._id)>String(He._id)?180:0,te=d.useRef(0),W=d.useRef(!1),ue=d.useRef(null),q=d.useRef(0),T=d.useRef(!0),J=d.useRef(null),ge=d.useRef(0),fe=d.useRef(0),X=d.useRef(0),ne=d.useRef(0),Ce=2e3,_e=A=>{const le=360/f.length;return(A*le+le/2-90+360)%360},je=A=>{const le=f.length;if(le===0)return null;const re=360/le,Oe=((A%360+360)%360+90)%360;return Math.floor(Oe/re)%le},_t=A=>1-(1-A)**3,Je=(A,le,re)=>{const Ae=q.current,Oe=(Ae%360+360)%360;let Be=(A-Oe+360)%360;Be<1&&(Be+=360);const p=Ae+360*4+Be;fe.current=performance.now(),X.current=Ae,ne.current=p;const S=()=>{if(!T.current)return;const m=performance.now()-fe.current,w=Math.min(1,m/le),N=_t(w),L=X.current+(ne.current-X.current)*N;q.current=L,b(L),s.current&&(s.current.playbackRate=.5+(1-w)*.8,s.current.volume=Math.max(.2,1-w)),w<1?ue.current=requestAnimationFrame(S):(s.current&&(s.current.pause(),s.current.currentTime=0),q.current=ne.current,b(ne.current),ue.current=null,re==null||re())};ue.current=requestAnimationFrame(S)};d.useEffect(()=>{J.current=g},[g]),d.useEffect(()=>{E(nt[x])},[x,E]),d.useEffect(()=>{R!=null&&(v(R),I(null))},[R,I]),d.useEffect(()=>{if(!n||!(e!=null&&e._id))return;const A=({gameType:le,data:re})=>{if(le==="bottle"&&re){const Ae=re.finalRotation!=null?Number(re.finalRotation):null,Oe=re.spinDuration??Ce;Ae!=null&&(oe(!0),Je(Ae,Oe,()=>{var Be;if(T.current)if(oe(!1),re.winnerUserId!=null){const ot=((Be=e==null?void 0:e.participants)==null?void 0:Be.filter(Boolean).map(m=>({_id:m._id,name:m.fullName,avatar:m.profilePic})))??[],S=(ot.length>0?[...ot.filter(m=>String(m._id)!==String(t==null?void 0:t._id)),...ot.filter(m=>String(m._id)===String(t==null?void 0:t._id))]:[]).findIndex(m=>String(m._id)===String(re.winnerUserId));_(S>=0?S:null)}else re.winnerIndex!=null&&_(re.winnerIndex)}))}le==="coin"&&(re!=null&&re.result)&&(O(re.result),setTimeout(()=>O(null),1200)),le==="dice"&&(re==null?void 0:re.value)!=null&&(F(re.value),setTimeout(()=>F(null),1200))};return n.off("game_sync"),n.on("game_sync",A),()=>n.off("game_sync")},[n,e==null?void 0:e._id,e==null?void 0:e.participants,t==null?void 0:t._id]);const Ye=["Rotate the bottle","Coin flip","Roll a die"],nt=["Spin the bottle","Flip the coin","Roll the die"];d.useEffect(()=>(T.current=!0,()=>{var A,le;T.current=!1,cancelAnimationFrame(ue.current),ue.current=null,(A=s.current)==null||A.pause(),s.current=null,(le=r.current)==null||le.pause(),r.current=null}),[]);const xe=()=>{var Ae;if($||f.length===0||Date.now()<ge.current)return;_(null),oe(!0),W.current=!0;const A=Math.floor(Math.random()*f.length),le=_e(A),re=e==null?void 0:e._id;n&&re&&n.emit("game_sync",{chatId:re,gameType:"bottle",data:{finalRotation:le,winnerIndex:A,winnerUserId:((Ae=f[A])==null?void 0:Ae._id)??null,spinDuration:Ce}}),s.current&&(s.current.currentTime=0,s.current.play()),Je(le,Ce,()=>{var Oe;T.current&&(W.current=!1,oe(!1),k(J.current),_(A),(Oe=document.querySelector(".td-stage"))==null||Oe.classList.add("shake"),setTimeout(()=>{var Be;return(Be=document.querySelector(".td-stage"))==null?void 0:Be.classList.remove("shake")},400),navigator.vibrate&&navigator.vibrate([100,50,200]),ge.current=Date.now()+1e3,ee(!0),setTimeout(()=>ee(!1),1e3))})},me=y+he,Ve=g!==null&&!$?je(me):null,Ue=Ve!==null&&Ve===h,Ne=Ve!==null&&Ve!==h&&f[Ve]!=null,Ee=()=>{x===0&&(cancelAnimationFrame(ue.current),ue.current=null,W.current=!1,oe(!1),s.current&&(s.current.pause(),s.current.currentTime=0),_(null),q.current=0,b(0))},Ie=()=>{Ee(),v(A=>(A-1+3)%3)},Xe=()=>{Ee(),v(A=>(A+1)%3)};return a.jsxs("div",{className:"td-container",children:[a.jsxs("div",{className:"td-rotate-row",children:[a.jsx("button",{type:"button",className:"td-controls__btn td-controls__btn--arrow",onClick:Ie,"aria-label":"Previous game",title:"Previous game",children:a.jsx(ul,{size:16})}),a.jsx("p",{className:"td-rotate-label",children:Ye[x]}),a.jsx("button",{type:"button",className:"td-controls__btn td-controls__btn--arrow",onClick:Xe,"aria-label":"Next game",title:"Next game",children:a.jsx(fl,{size:16})})]}),a.jsxs("div",{className:"td-game-content",children:[x===0&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"winner-area winner-area--above",children:Ne&&a.jsxs("div",{className:"winner-box",children:[f[Ve].name,"'s turn!"]})}),a.jsx("div",{className:"td-stage",children:a.jsx(Rd,{rotation:y+he,onSpin:xe,isSpinning:$||D,onMouseDown:l,onMouseUp:c})}),a.jsx("div",{className:"winner-area winner-area--below",children:Ue&&a.jsx("div",{className:"winner-box",children:"Your turn!"})})]}),x===1&&a.jsx(Pd,{onGameResult:A=>{n&&(e!=null&&e._id)&&n.emit("game_sync",{chatId:e._id,gameType:"coin",data:{result:A}})},syncedResult:M}),x===2&&a.jsx(Dd,{onGameResult:A=>{n&&(e!=null&&e._id)&&n.emit("game_sync",{chatId:e._id,gameType:"dice",data:{value:A}})},syncedValue:z})]})]})}const xs=()=>{var y;const e=ke(b=>b.isTruthDareOpen),t=ke(b=>b.setTruthDareOpen),n=ke(b=>b.currentGameName),r=Re(b=>b.selectedChat),{socket:s,authUser:i}=K(),o=(y=r==null?void 0:r.participants)==null?void 0:y.find(b=>String(b._id)!==String(i==null?void 0:i._id));K(b=>b.onlineUsers);const l=ke(b=>b.gamePlayingUserIdByChat),c=ke(b=>b.gamePlayingGameNameByChat),u=(r==null?void 0:r._id)&&l[r._id]&&String(l[r._id])===String(o==null?void 0:o._id),f=r!=null&&r._id?c[r._id]:null;d.useEffect(()=>{if(!(!e||!(r!=null&&r._id)||!o||!s))return s.emit("game_playing",{chatId:r._id,otherUserId:o._id,gameName:n??"Truth or Dare",userName:i==null?void 0:i.fullName,userAvatar:i==null?void 0:i.profilePic}),()=>{s.emit("game_left",{chatId:r._id,otherUserId:o._id})}},[e,r==null?void 0:r._id,o==null?void 0:o._id,s,i==null?void 0:i.fullName,i==null?void 0:i.profilePic,n]);const h=n&&f&&n===f;return a.jsxs("div",{className:"truth-dare-panel",children:[a.jsx("header",{className:"truth-dare-panel__header",children:a.jsx("button",{type:"button",className:"truth-dare-panel__close",onClick:()=>t(!1),"aria-label":"Close",children:a.jsx(kt,{size:20})})}),a.jsx("div",{className:"truth-dare-panel__body",children:a.jsx(Bd,{})}),o&&u&&a.jsx("footer",{className:"truth-dare-panel__footer",children:a.jsx("span",{className:"truth-dare-panel__status",children:h?a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"truth-dare-panel__dot truth-dare-panel__dot--online"}),o.fullName," is online"]}):a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"truth-dare-panel__dot truth-dare-panel__dot--playing"}),o.fullName," is playing ",f??"this game"]})})})]})};function hn({children:e,isMinimized:t,onMinimizedChange:n,onClose:r,peekLabel:s}){const i=String(s||"").toLowerCase(),o=i.includes("draw")?Cn:i.includes("note")?Xt:i.includes("watch")?sr:i.includes("truth")||i.includes("dare")?rr:Yr,[l,c]=d.useState({x:0,y:0}),u=d.useRef({active:!1,pointerId:null,startX:0,startY:0,startLeft:0,startTop:0,moved:!1});d.useEffect(()=>{const g=Math.max(12,window.innerWidth-72),_=Math.max(12,window.innerHeight-220);c({x:g,y:_})},[]);const f=d.useCallback(g=>{var k;if(g.button!==0)return;const _=g.clientY??0,j=g.clientX??0;u.current={active:!0,pointerId:g.pointerId,startX:j,startY:_,startLeft:l.x,startTop:l.y,moved:!1},(k=g.currentTarget)!=null&&k.setPointerCapture&&g.currentTarget.setPointerCapture(g.pointerId)},[l.x,l.y]);d.useEffect(()=>{const g=j=>{const k=u.current;if(!k.active)return;const x=j.clientX??0,v=j.clientY??0,E=x-k.startX,R=v-k.startY;(Math.abs(E)>3||Math.abs(R)>3)&&(u.current.moved=!0);const I=Math.max(8,Math.min(window.innerWidth-56,k.startLeft+E)),M=Math.max(8,Math.min(window.innerHeight-56,k.startTop+R));c({x:I,y:M})},_=j=>{const k=u.current;k.active&&k.pointerId!=null&&j.pointerId===k.pointerId&&(u.current.active=!1)};return window.addEventListener("pointermove",g,{passive:!0}),window.addEventListener("pointerup",_),window.addEventListener("pointercancel",_),()=>{window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",_),window.removeEventListener("pointercancel",_)}},[]);const h=d.useCallback(g=>{g.stopPropagation(),r==null||r()},[r]),y=d.useCallback(g=>{g.stopPropagation(),n(!0)},[n]),b=d.useCallback(()=>{if(u.current.moved){u.current.moved=!1;return}n(!1)},[n]);return t?a.jsx("button",{type:"button",className:"slidable-bottom-sheet__bubble",style:{left:`${l.x}px`,top:`${l.y}px`},onPointerDown:f,onClick:b,"aria-label":`Open ${s}`,title:`Open ${s}`,children:a.jsx(o,{size:20})}):a.jsxs("div",{className:"slidable-bottom-sheet slidable-bottom-sheet--expanded",style:{height:"100%",maxHeight:"92vh",transform:"translateY(0)"},children:[a.jsxs("div",{className:"slidable-bottom-sheet__handle",role:"heading","aria-level":2,children:[a.jsx("span",{className:"slidable-bottom-sheet__handle-left","aria-hidden":!0}),a.jsx("span",{className:"slidable-bottom-sheet__handle-label",children:s}),a.jsxs("div",{className:"slidable-bottom-sheet__handle-actions",children:[a.jsx("button",{type:"button",className:"slidable-bottom-sheet__minimize",onClick:y,"aria-label":`Minimize ${s}`,children:a.jsx(Yr,{size:18})}),r?a.jsx("button",{type:"button",className:"slidable-bottom-sheet__close",onClick:h,"aria-label":`Close ${s}`,children:a.jsx(kt,{size:20})}):a.jsx("span",{className:"slidable-bottom-sheet__handle-right","aria-hidden":!0})]})]}),a.jsx("div",{className:"slidable-bottom-sheet__content",children:e})]})}function Ld(){const e=K(t=>t.socket);return d.useEffect(()=>{if(!e)return;const t=({chatId:y,userId:b,gameName:g})=>{const _=y!=null?String(y):null;_&&ke.getState().setGamePlayingInChat(_,b!=null?String(b):b,g)},n=({chatId:y})=>{const b=y!=null?String(y):null;b&&ke.getState().setGamePlayingInChat(b,null)},r=({chatId:y,userId:b})=>{const g=y!=null?String(y):null;g&&Z.getState().setDrawingInChat(g,b!=null?String(b):b)},s=({chatId:y})=>{const b=y!=null?String(y):null;b&&Z.getState().setDrawingInChat(b,null)},i=({chatId:y,userId:b})=>{const g=y!=null?String(y):null;g&&Z.getState().setVideoInChat(g,b!=null?String(b):b)},o=({chatId:y})=>{const b=y!=null?String(y):null;b&&Z.getState().setVideoInChat(b,null)},l=({chatId:y,url:b})=>{const g=y!=null?String(y):null;g&&Z.getState().setWatchPartyYoutubeUrl(g,b??"")},c=({chatId:y,url:b})=>{const g=y!=null?String(y):null;g&&Z.getState().setWatchPartyLocalVideoUrl(g,b??"")},u=({chatId:y})=>{const b=y!=null?String(y):null;b&&(Z.getState().setWatchPartyYoutubeUrl(b,null),Z.getState().setWatchPartyLocalVideoUrl(b,null),Z.getState().setWatchPartyClearedByOther(b,!0))},f=({chatId:y,imageData:b})=>{const g=y!=null?String(y):null;g&&typeof b=="string"&&Z.getState().setPendingDrawingCanvas(g,b)},h=({chatId:y,fromUserId:b})=>{y==null||b==null||e.emit("drawing_request_canvas_state",{chatId:String(y),requestToUserId:String(b)})};return e.on("game_playing",t),e.on("game_left",n),e.on("drawing_playing",r),e.on("drawing_left",s),e.on("watch_party_playing",i),e.on("watch_party_left",o),e.on("watch_party_youtube_url",l),e.on("watch_party_local_video_url",c),e.on("watch_party_clear",u),e.on("drawing_canvas_state",f),e.on("drawing_undo",h),e.on("drawing_redo",h),e.on("drawing_clear",h),()=>{e.off("game_playing",t),e.off("game_left",n),e.off("drawing_playing",r),e.off("drawing_left",s),e.off("watch_party_playing",i),e.off("watch_party_left",o),e.off("watch_party_youtube_url",l),e.off("watch_party_local_video_url",c),e.off("watch_party_clear",u),e.off("drawing_canvas_state",f),e.off("drawing_undo",h),e.off("drawing_redo",h),e.off("drawing_clear",h)}},[e]),null}const Ud=({setActiveCallUserAvatar:e,setActiveCallUserId:t,setActiveCallUserName:n,setCallActive:r,setCalling:s,startCall:i,setCallType:o})=>{const{isNotesOpen:l,isDrawingOpen:c,isVideoPanelOpen:u,panelMinimized:f,setPanelMinimized:h,setIsNotesOpen:y,setIsDrawingOpen:b,setIsVideoPanelOpen:g}=Z(),_=ke(M=>M.isTruthDareOpen),j=ke(M=>M.panelMinimized),k=ke(M=>M.setPanelMinimized),x=ke(M=>M.setTruthDareOpen),{authUser:v}=K(),{selectedUser:E,selectedChat:R}=Re();dt(M=>M.theme);const I=Yt();return d.useRef(null),d.useEffect(()=>{!I&&E||R&&E||(l||c||u||_)&&(y(!1),b(!1),g(!1),h(!1),x(!1),k(!1))},[I,R,E,l,c,u,_,y,b,g,h,x,k]),a.jsxs("div",{className:"app-shell w-screen flex",children:[a.jsx(Ld,{}),a.jsxs("div",{className:"app-card flex flex-1 m-6 overflow-hidden",children:[a.jsx("div",{className:"app-card__sidebar flex-shrink-0",children:a.jsx(Lc,{})}),a.jsxs("div",{className:`app-content-wrap app-card__main flex-1 flex min-w-0${!I&&E?" app-content-wrap--chat-open":""}${I&&(l||c||u||_)?" bottom-sheet-open":""}${I&&(l||c||u||_)&&(l||c||u?f:j)?" bottom-sheet-peek-visible":""}`,children:[(!I||!E)&&a.jsx("div",{className:"chat-list-panel-wrap flex-shrink-0",children:a.jsx(Wc,{})}),(!I||E)&&a.jsx("div",{className:"chat-main-wrap flex-1 flex flex-col",children:E?a.jsx("div",{className:"chat-layout",children:a.jsx(fd,{startCall:i,setCallType:o,setCalling:s,setCallActive:r,setActiveCallUserId:t,setActiveCallUserName:n,setActiveCallUserAvatar:e})}):a.jsx(_a,{})})]}),I&&a.jsxs(a.Fragment,{children:[l&&a.jsx(hn,{isMinimized:f,onMinimizedChange:h,onClose:()=>y(!1),peekLabel:"Notes",children:a.jsx(fs,{})}),c&&a.jsx(hn,{isMinimized:f,onMinimizedChange:h,onClose:()=>b(!1),peekLabel:"Drawing",children:a.jsx(ps,{})}),u&&a.jsx(hn,{isMinimized:f,onMinimizedChange:h,onClose:()=>g(!1),peekLabel:"Watch Together",children:a.jsx(bs,{})}),_&&a.jsx(hn,{isMinimized:j,onMinimizedChange:k,onClose:()=>x(!1),peekLabel:"Truth or Dare",children:a.jsx(xs,{})})]}),!I&&l&&a.jsx("div",{className:"desktop-panel-wrap",children:a.jsx(fs,{})}),!I&&c&&a.jsx("div",{className:"desktop-panel-wrap",children:a.jsx(ps,{})}),!I&&u&&a.jsx("div",{className:"desktop-panel-wrap",children:a.jsx(bs,{})}),!I&&_&&a.jsx("div",{className:"desktop-panel-wrap",children:a.jsx(xs,{})})]})]})},ja=()=>a.jsxs("div",{className:"auth-card__left",children:[a.jsx(Qt,{to:"/",className:"auth-card__brand","aria-label":"Blah Blah"}),a.jsx("div",{className:"auth-card__illus",children:a.jsx("img",{src:"/new.png",alt:"",className:"auth-card__illus-img"})})]}),Fd=()=>{const[e,t]=d.useState(!1),[n,r]=d.useState({firstName:"",lastName:"",email:"",password:""}),{signup:s,isSigningUp:i}=K(),o=()=>n.firstName.trim()?n.email.trim()?/\S+@\S+\.\S+/.test(n.email)?n.password?n.password.length<6?se.error("Password must be at least 6 characters"):!0:se.error("Password is required"):se.error("Invalid email format"):se.error("Email is required"):se.error("First name is required"),l=c=>{if(c.preventDefault(),!o())return;const u=[n.firstName.trim(),n.lastName.trim()].filter(Boolean).join(" ").trim();if(!u)return se.error("First name is required");const f=zc();s({fullName:u,email:n.email,password:n.password,profilePic:f})};return a.jsxs("div",{className:"auth-page",children:[a.jsx(Qt,{to:"/",className:"auth-page__logo","aria-label":"Blah Blah",children:a.jsx("img",{src:"/logo.png",alt:"Blah Blah",className:"auth-page__logo-img"})}),a.jsxs("div",{className:"auth-card",children:[a.jsx(ja,{}),a.jsxs("div",{className:"auth-card__right",children:[a.jsx("h1",{className:"auth-card__title",children:"Sign Up"}),a.jsxs("form",{onSubmit:l,className:"auth-form",children:[a.jsxs("div",{className:"auth-form__row",children:[a.jsxs("div",{className:"auth-form__group",children:[a.jsx("label",{className:"auth-form__label",htmlFor:"signup-first-name",children:"First Name"}),a.jsxs("div",{className:"auth-form__input-wrap",children:[a.jsx(Nn,{className:"auth-form__icon w-[18px] h-[18px]"}),a.jsx("input",{id:"signup-first-name",type:"text",className:"auth-form__input",placeholder:"John",value:n.firstName,onChange:c=>r({...n,firstName:c.target.value}),autoComplete:"given-name"})]})]}),a.jsxs("div",{className:"auth-form__group",children:[a.jsx("label",{className:"auth-form__label",htmlFor:"signup-last-name",children:"Last Name"}),a.jsxs("div",{className:"auth-form__input-wrap",children:[a.jsx(Nn,{className:"auth-form__icon w-[18px] h-[18px]"}),a.jsx("input",{id:"signup-last-name",type:"text",className:"auth-form__input",placeholder:"Doe",value:n.lastName,onChange:c=>r({...n,lastName:c.target.value}),autoComplete:"family-name"})]})]})]}),a.jsxs("div",{className:"auth-form__group",children:[a.jsx("label",{className:"auth-form__label",htmlFor:"signup-email",children:"Email"}),a.jsxs("div",{className:"auth-form__input-wrap",children:[a.jsx(la,{className:"auth-form__icon w-[18px] h-[18px]"}),a.jsx("input",{id:"signup-email",type:"email",className:"auth-form__input",placeholder:"you@example.com",value:n.email,onChange:c=>r({...n,email:c.target.value}),autoComplete:"email"})]})]}),a.jsxs("div",{className:"auth-form__group",children:[a.jsx("label",{className:"auth-form__label",htmlFor:"signup-password",children:"Password"}),a.jsxs("div",{className:"auth-form__input-wrap",children:[e?a.jsx(jn,{className:"auth-form__icon w-[18px] h-[18px]"}):a.jsx(kn,{className:"auth-form__icon w-[18px] h-[18px]"}),a.jsx("input",{id:"signup-password",type:e?"text":"password",className:"auth-form__input auth-form__input--with-right-btn",placeholder:"••••••••",value:n.password,onChange:c=>r({...n,password:c.target.value}),autoComplete:"new-password"}),a.jsx("button",{type:"button",className:"auth-form__toggle-password",onClick:()=>t(!e),"aria-label":e?"Hide password":"Show password",children:e?a.jsx(jn,{className:"w-4 h-4"}):a.jsx(kn,{className:"w-4 h-4"})})]})]}),a.jsx("button",{type:"submit",className:"auth-form__submit",disabled:i,children:i?a.jsxs(a.Fragment,{children:[a.jsx(oa,{className:"inline w-5 h-5 animate-spin mr-2"}),"Creating account..."]}):"Create Account"}),a.jsxs("p",{className:"auth-form__footer",children:["Already have an account? ",a.jsx(Qt,{to:"/login",children:"Login here"})]})]})]})]})]})},zd=()=>{const[e,t]=d.useState(!1),[n,r]=d.useState({email:"",password:""}),{login:s,isLoggingIn:i}=K(),o=l=>{l.preventDefault(),s(n)};return a.jsxs("div",{className:"auth-page",children:[a.jsx(Qt,{to:"/",className:"auth-page__logo","aria-label":"Blah Blah",children:a.jsx("img",{src:"/logo.png",alt:"Blah Blah",className:"auth-page__logo-img"})}),a.jsxs("div",{className:"auth-card",children:[a.jsx(ja,{}),a.jsxs("div",{className:"auth-card__right",children:[a.jsx("h1",{className:"auth-card__title",children:"Login"}),a.jsxs("form",{onSubmit:o,className:"auth-form",children:[a.jsxs("div",{className:"auth-form__group",children:[a.jsx("label",{className:"auth-form__label",htmlFor:"login-email",children:"Email"}),a.jsxs("div",{className:"auth-form__input-wrap",children:[a.jsx(la,{className:"auth-form__icon w-[18px] h-[18px]"}),a.jsx("input",{id:"login-email",type:"email",className:"auth-form__input",placeholder:"you@example.com",value:n.email,onChange:l=>r({...n,email:l.target.value}),autoComplete:"email"})]})]}),a.jsxs("div",{className:"auth-form__group",children:[a.jsx("label",{className:"auth-form__label",htmlFor:"login-password",children:"Password"}),a.jsxs("div",{className:"auth-form__input-wrap",children:[e?a.jsx(jn,{className:"auth-form__icon w-[18px] h-[18px]"}):a.jsx(kn,{className:"auth-form__icon w-[18px] h-[18px]"}),a.jsx("input",{id:"login-password",type:e?"text":"password",className:"auth-form__input auth-form__input--with-right-btn",placeholder:"••••••••",value:n.password,onChange:l=>r({...n,password:l.target.value}),autoComplete:"current-password"}),a.jsx("button",{type:"button",className:"auth-form__toggle-password",onClick:()=>t(!e),"aria-label":e?"Hide password":"Show password",children:e?a.jsx(jn,{className:"w-4 h-4"}):a.jsx(kn,{className:"w-4 h-4"})})]}),a.jsx("div",{className:"auth-form__forgot",children:a.jsx("button",{type:"button",className:"auth-form__forgot-btn",onClick:()=>se("Coming soon",{icon:"🔜"}),children:"Forgot Password?"})})]}),a.jsx("button",{type:"submit",className:"auth-form__submit",disabled:i,children:i?a.jsxs(a.Fragment,{children:[a.jsx(oa,{className:"inline w-5 h-5 animate-spin mr-2"}),"Logging in..."]}):"Log In"}),a.jsxs("p",{className:"auth-form__footer",children:["Don't have an account?"," ",a.jsx(Qt,{to:"/signup",children:"Sign Up here"})]})]})]})]})]})},$d=()=>{const e=dt(t=>t.theme);return d.useEffect(()=>{if(!e)return;document.body.style.backgroundColor=e.pageBg;const t=document.documentElement,r=e.pageBg==="#ffffff"||e.pageBg==="#f4f4f5"?"#ffffff":e.appBg??"#ffffff";t.style.setProperty("--app-bg",r),t.style.setProperty("--primary",e.primary),t.style.setProperty("--accent",e.accent),t.style.setProperty("--accent-dark",e.accentDark||e.accent),t.style.setProperty("--dark-bg",e.darkBg!=null?e.darkBg:"#000000"),t.style.setProperty("--bubble-mine",e.bubbleMine),t.style.setProperty("--bubble-other",e.bubbleOther),t.style.setProperty("--text-primary",e.textPrimary),t.style.setProperty("--text-secondary",e.textSecondary),t.style.setProperty("--chat-bg",e.chatBg),(e.chatBg==="#0f0f0f"||e.chatBg==="#000000"||e.chatBg==="#0a0a0a"||e.pageBg==="#0f0f0f"||e.pageBg==="#000000"||e.pageBg==="#0a0a0a")&&t.style.setProperty("--chat-mood-bg",e.chatBg),t.style.setProperty("--panel-bg",e.panelBg??"#ffffff"),t.style.setProperty("--page-bg",e.pageBg),t.style.setProperty("--input-bg",e.inputBg??"#f8f9fb"),t.style.setProperty("--delete-btn-bg",e.deleteBtnBg??"#dc2626"),t.style.setProperty("--danger-zone-bg",e.dangerZoneBg??"#fef2f2"),t.style.setProperty("--chat-list-item-hover-bg",e.chatListItemHoverBg??"#f1f5f9"),t.style.setProperty("--chat-list-item-selected-bg",e.chatListItemSelectedBg??"#fce7f3"),t.style.setProperty("--chat-list-item-selected-border",e.chatListItemSelectedBorder??"transparent"),t.style.setProperty("--surface-border",e.surfaceBorder??"#e2e8f0");const s=e.chatBg==="#0f0f0f"||e.chatBg==="#000000"||e.chatBg==="#0a0a0a"||e.pageBg==="#0f0f0f"||e.pageBg==="#000000"||e.pageBg==="#0a0a0a";t.style.setProperty("--content-border",s?"transparent":e.contentBorder??"#000000"),t.style.setProperty("--surface-border-on-dark",e.surfaceBorderOnDark??"transparent"),t.style.setProperty("--panel-divider",e.panelDivider??"#e2e8f0"),t.style.setProperty("--note-mine-bg",e.noteMineBg??"#ec4899"),t.style.setProperty("--profile-card-border",e.profileCardBorder??"#e2e8f0"),t.style.setProperty("--profile-avatar-ring",e.profileAvatarRing??"rgba(255,255,255,0.9)"),t.style.setProperty("--profile-decorative-border",e.profileDecorativeBorder??"#ffffff"),t.style.setProperty("--auth-illus-bg",e.appBg??"#ffffff"),t.style.setProperty("--panel-strong-border",s?"#000000":"#ffffff"),t.style.setProperty("--chat-input-bg",s?"#000000":"#ffffff")},[e]),null};function Hd({caller:e,onAccept:t,onReject:n}){const r={position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999},s={background:"#0f172a",color:"#fff",width:"320px",padding:"28px 24px",borderRadius:"16px",textAlign:"center",boxShadow:"0 30px 60px rgba(0,0,0,0.4)"},i={width:"96px",height:"96px",borderRadius:"50%",objectFit:"cover",display:"block",margin:"0 auto 16px auto"},o={fontSize:"20px",fontWeight:600,margin:0},l={fontSize:"14px",opacity:.7,marginTop:"6px"},c={display:"flex",justifyContent:"space-between",marginTop:"24px",gap:"12px"},u={flex:1,background:"#ef4444",border:"none",borderRadius:"10px",padding:"12px",color:"#fff",fontWeight:600,cursor:"pointer"},f={flex:1,background:"#22c55e",border:"none",borderRadius:"10px",padding:"12px",color:"#fff",fontWeight:600,cursor:"pointer"};return a.jsx("div",{style:r,children:a.jsxs("div",{style:s,children:[a.jsx("img",{src:e.avatar,alt:e.name,style:i}),a.jsx("h2",{style:o,children:e.name}),a.jsx("p",{children:e.callType==="video"?"Incoming video call":"Incoming audio call"}),a.jsx("p",{style:l,children:"is now calling…"}),a.jsxs("div",{style:c,children:[a.jsx("button",{style:u,onClick:n,children:"❌ Reject"}),a.jsx("button",{style:f,onClick:()=>t(),children:"📞 Accept"})]})]})})}const ws="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",De=new Audio;De.src="/call.mp3";De.loop=!0;De.preload="auto";De.addEventListener("error",()=>{De.src!==ws&&(De.src=ws,De.loop=!1)});function Vd({setActiveCallUserId:e,setCallActive:t,setCallType:n,answerCall:r,setActiveCallUserName:s,setActiveCallUserAvatar:i}){const o=K(u=>u.socket),[l,c]=d.useState(null);return d.useEffect(()=>{if(!o)return;o.on("incoming-call",f=>{try{De.currentTime=0,De.volume=1,De.play().catch(()=>{})}catch{}n(f.callType),e(f.from),c(f)});const u=()=>{De.pause(),t(!1),De.currentTime=0,c(null)};return o.on("call-ended",u),()=>{o.off("incoming-call"),o.off("call-ended",u)}},[o,n,t,e]),l?a.jsx("div",{children:a.jsx(Hd,{caller:{name:l.name??l.from,avatar:l.avatar||bt,type:l.callType,callType:l.callType},onAccept:async()=>{De.pause(),De.currentTime=0,t(!0),e(l.from),s(l.name??l.from),i(l.avatar||bt),c(null),await r(l)},onReject:()=>{De.pause(),De.currentTime=0,o.emit("end-call",{to:String(l.from)}),c(null)}})}):null}function qd({active:e}){const[t,n]=d.useState(0);d.useEffect(()=>{if(!e){n(0);return}const l=setInterval(()=>{n(c=>c+1)},1e3);return()=>clearInterval(l)},[e]);const r=Math.floor(t/3600),s=Math.floor(t%3600/60),i=t%60;let o;return t<60?o=`${i}s`:t<3600?o=`${s}m ${i}s`:o=`${r}h ${s}m ${i}s`,a.jsx("span",{style:{color:"#fff",fontSize:"14px"},children:o})}let at=null,st=null,wt=null;function vs(){const e=window.AudioContext||window.webkitAudioContext;if(e&&!st&&(st=new e),st){st.resume().catch(()=>{});try{const t=st.createBuffer(1,st.sampleRate*.05,st.sampleRate),n=st.createBufferSource();n.buffer=t,n.connect(st.destination),n.start(0)}catch{}}at||(at=document.createElement("audio"),at.setAttribute("playsinline","true"),at.volume=1,at.muted=!1,at.style.cssText="position:fixed;left:0;top:0;width:1px;height:1px;opacity:0.01;pointer-events:none;",document.body.appendChild(at)),at.play().catch(()=>{})}function Ss(e){if(!e||!e.getAudioTracks||e.getAudioTracks().length===0)return;if(e.getAudioTracks().forEach(n=>{n.enabled=!0}),at&&(at.srcObject=e,at.volume=1,at.muted=!1,at.play().catch(()=>{})),(window.AudioContext||window.webkitAudioContext)&&st){if(wt){try{wt.disconnect()}catch{}wt=null}try{wt=st.createMediaStreamSource(e),wt.connect(st.destination),st.resume().catch(()=>{})}catch{}}}function ka(){if(at&&(at.srcObject=null),wt&&st){try{wt.disconnect()}catch{}wt=null}st=null}function Ca({activeCallUserId:e,name:t,avatar:n,callActive:r,isMuted:s,onToggleMute:i,onEndCall:o}){const l=K(E=>E.socket),c=Yt(),u=d.useRef(null),[f,h]=d.useState(null),y=d.useRef(!1);d.useEffect(()=>{if(f)return;const E=window.innerHeight;h(c?{top:E-96,left:16}:null)},[c,f]);const b=()=>{const E=e==null?null:typeof e=="string"?e.trim():e._id!=null?String(e._id):String(e);E&&l.emit("end-call",{to:E}),ka(),o==null||o(),window.dispatchEvent(new Event("call-ended-local"))},g=(E,R)=>{if(!y.current||!u.current)return;const M=u.current.getBoundingClientRect(),O=window.innerWidth,z=window.innerHeight;let F=R-M.height/2,D=E-M.width/2;F=Math.max(8,Math.min(z-M.height-8,F)),D=Math.max(8,Math.min(O-M.width-8,D)),h({top:F,left:D})};d.useEffect(()=>{const E=I=>{g(I.clientX,I.clientY)},R=()=>{y.current=!1};return window.addEventListener("pointermove",E),window.addEventListener("pointerup",R),window.addEventListener("pointercancel",R),()=>{window.removeEventListener("pointermove",E),window.removeEventListener("pointerup",R),window.removeEventListener("pointercancel",R)}},[]);const _=E=>{if(E.target.closest("button"))return;y.current=!0;const R=E.touches?E.touches[0].clientX:E.clientX,I=E.touches?E.touches[0].clientY:E.clientY;g(R,I)},j=E=>{if(!y.current||!E.touches||E.touches.length===0)return;const R=E.touches[0];g(R.clientX,R.clientY)},k=()=>{y.current=!1},x={...Jd,...c?{width:"calc(100vw - 32px)",justifyContent:"space-between"}:{}},v={...Gd,...c?{maxWidth:"38vw",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}:{}};return a.jsx("div",{style:f&&f.top!=null&&f.left!=null?{...js,top:f.top,left:f.left}:{...js,bottom:24,left:"50%",transform:"translateX(-50%)"},children:a.jsxs("div",{ref:u,style:x,onPointerDown:_,onTouchStart:_,onTouchMove:j,onTouchEnd:k,children:[a.jsxs("div",{style:Yd,children:[a.jsx("img",{src:n||bt,alt:t,style:Wd}),a.jsx("div",{style:v,children:t})]}),a.jsxs("div",{style:Xd,children:[a.jsx("button",{onClick:()=>i==null?void 0:i(),style:Zd,type:"button",children:s?"Unmute":"Mute"}),a.jsx("button",{onClick:b,style:Kd,type:"button",children:"End"})]}),a.jsx(qd,{active:r})]})})}const Wd={width:"42px",height:"42px",borderRadius:"50%",objectFit:"cover"},Yd={display:"flex",alignItems:"center",gap:"10px"},Gd={color:"#fff",fontSize:"14px",fontWeight:"600"},js={position:"fixed",zIndex:9999},Jd={background:"#111",padding:"12px 22px",borderRadius:"999px",boxShadow:"0 10px 30px rgba(0,0,0,0.4)",display:"flex",alignItems:"center",gap:"18px"},Xd={display:"flex",alignItems:"center",gap:"10px"},Kd={background:"#e53935",color:"#fff",border:"none",padding:"8px 18px",borderRadius:"999px",fontWeight:"600",cursor:"pointer"},Zd={background:"#ffffff",color:"#111827",border:"none",padding:"8px 14px",borderRadius:"999px",fontWeight:"500",cursor:"pointer",fontSize:"13px"};function Qd({name:e,avatar:t,onCancel:n}){return a.jsx("div",{style:eu,children:a.jsxs("div",{style:tu,children:[a.jsx("img",{src:t||bt,style:nu}),a.jsx("h2",{style:ru,children:e}),a.jsx("p",{style:su,children:"Calling…"}),a.jsx("div",{style:au,children:a.jsx("button",{style:ou,onClick:n,children:"End"})})]})})}const eu={position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999},tu={background:"#0f172a",color:"#fff",width:"320px",padding:"28px 24px",borderRadius:"16px",textAlign:"center",boxShadow:"0 30px 60px rgba(0,0,0,0.4)"},nu={width:"96px",height:"96px",borderRadius:"50%",objectFit:"cover",display:"block",margin:"0 auto 16px auto"},ru={fontSize:"20px",fontWeight:600,margin:0},su={fontSize:"14px",opacity:.7,marginTop:"6px"},au={display:"flex",justifyContent:"space-between",marginTop:"24px",gap:"12px"},ou={flex:1,background:"#ef4444",border:"none",borderRadius:"10px",padding:"12px",color:"#fff",fontWeight:600,cursor:"pointer"},iu=({activeCallUserId:e,activeCallUserName:t,activeCallUserAvatar:n,callActive:r,isMuted:s,onToggleMute:i,onEndCall:o})=>a.jsxs("div",{style:lu,children:[a.jsx("video",{id:"remote-video",autoPlay:!0,playsInline:!0,style:cu}),a.jsx("video",{id:"local-video",autoPlay:!0,muted:!0,style:du}),a.jsx("div",{style:uu,children:a.jsx(Ca,{activeCallUserId:e,name:t,avatar:n,callActive:r,isMuted:s,onToggleMute:i,onEndCall:o})})]}),lu={position:"fixed",top:0,left:0,width:"100vw",height:"100dvh",background:"#000",zIndex:9999,overflow:"hidden"},cu={position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"},du={position:"absolute",bottom:"100px",right:"16px",width:"120px",height:"160px",objectFit:"cover",borderRadius:"12px",border:"2px solid white",zIndex:20},uu={position:"absolute",bottom:0,left:0,right:0,height:"80px",background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center"};let Te=null;function ks(e){const t=()=>{const n=document.getElementById("local-video");if(!n){setTimeout(t,100);return}n.srcObject=e,n.muted=!0,n.playsInline=!0,n.autoplay=!0,n.play().catch(()=>{}),console.log("📷 local video attached")};t()}function fu(){const e=K(k=>k.socket),t=d.useRef("audio"),n=d.useRef(null),r=d.useRef(null),s=d.useRef(null),i=d.useRef([]),[o,l]=d.useState(null),[c,u]=d.useState(!1),f=d.useRef(null),h=async()=>{const k=n.current,x=i.current;if(!(!k||x.length===0))for(;x.length>0;){const v=x.shift();try{const E=v&&typeof v=="object"&&v.candidate!=null?new RTCIceCandidate(v):v;await k.addIceCandidate(E)}catch(E){console.error("addIceCandidate (drain) error:",E)}}},y=()=>{const k=new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun2.l.google.com:19302"}],iceCandidatePoolSize:10});return k.oniceconnectionstatechange=()=>{console.log("🧊 iceConnectionState:",k.iceConnectionState)},k.ontrack=x=>{if(k.signalingState!=="closed"&&(console.log("🎯 track received:",x.track.kind,"enabled:",x.track.enabled,"readyState:",x.track.readyState),Te||(Te=new MediaStream),x.streams&&x.streams[0]?x.streams[0].getTracks().forEach(v=>{Te.getTracks().some(E=>E.id===v.id)||Te.addTrack(v)}):Te.getTracks().some(v=>v.id===x.track.id)||Te.addTrack(x.track),x.track.enabled=!0,l(Te),window.dispatchEvent(new CustomEvent("remote-stream-ready",{detail:Te})),x.track.kind==="audio"&&(Ss(Te),f.current&&(f.current(),f.current=null)),t.current==="video")){const v=(E=0)=>{const R=document.getElementById("remote-video");if(!R){E<50&&setTimeout(()=>v(E+1),100);return}R.srcObject=Te,R.play().catch(()=>{}),console.log("🎥 remote video attached")};v()}},k.onconnectionstatechange=()=>{if(console.log("📡 connectionState:",k.connectionState),k.connectionState==="connected"&&Te&&(l(Te),Ss(Te),window.dispatchEvent(new CustomEvent("remote-stream-ready",{detail:Te})),t.current==="video")){const x=(v=0)=>{const E=document.getElementById("remote-video");if(!E){v<50&&setTimeout(()=>x(v+1),100);return}E.srcObject=Te,E.play().catch(()=>{}),console.log("🎥 remote video attached (on connected)")};x()}},k.onicecandidate=x=>{x.candidate&&s.current&&e.emit("ice-candidate",{to:s.current,candidate:x.candidate.toJSON?x.candidate.toJSON():x.candidate})},n.current=k,k},b=async(k,x)=>{if(n.current||r.current){se.error("Another call is already in progress. Please end it first.");return}vs();try{De.currentTime=0,De.volume=1,De.play().catch(()=>{})}catch{}const v=String(k);n.current&&(n.current.close(),n.current=null),i.current=[],t.current=x,s.current=v,Te&&(Te.getTracks().forEach(M=>M.stop()),Te=null,l(null));const E=y(),R=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},video:x==="video"}).catch(()=>navigator.mediaDevices.getUserMedia({audio:!0,video:x==="video"}));if(E.signalingState==="closed"){R.getTracks().forEach(M=>M.stop());return}x==="video"&&ks(R),r.current=R,R.getTracks().forEach(M=>{M.enabled=!0}),R.getTracks().forEach(M=>{E.addTrack(M,R)});const I=await E.createOffer();await E.setLocalDescription(I),e.emit("call-user",{to:v,offer:{type:I.type,sdp:I.sdp},callType:x})},g=async({from:k,offer:x,callType:v})=>{vs();const E=String(k);n.current&&(n.current.close(),n.current=null),f.current&&(f.current(),f.current=null),i.current=[],t.current=v,s.current=E,Te&&(Te.getTracks().forEach(z=>z.stop()),Te=null,l(null));const R=y(),I=x&&typeof x=="object"&&x.sdp?new RTCSessionDescription({type:x.type||"offer",sdp:x.sdp}):x;await R.setRemoteDescription(I);const M=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},video:v==="video"}).catch(()=>navigator.mediaDevices.getUserMedia({audio:!0,video:v==="video"}));if(R.signalingState==="closed"){M.getTracks().forEach(z=>z.stop());return}r.current=M,v==="video"&&ks(M),M.getTracks().forEach(z=>{z.enabled=!0}),M.getTracks().forEach(z=>{R.addTrack(z,M)});const O=await R.createAnswer();return await R.setLocalDescription(O),await h(),e.emit("answer-call",{to:E,answer:{type:O.type,sdp:O.sdp}}),new Promise(z=>{const F=setTimeout(()=>{f.current&&(f.current(),f.current=null)},1e4);f.current=()=>{clearTimeout(F),z()}})},_=()=>{n.current&&(n.current.close(),n.current=null),r.current&&(r.current.getTracks().forEach(x=>x.stop()),r.current=null),u(!1),De.pause(),De.currentTime=0;const k=s.current;if(k&&e)try{e.emit("end-call",{to:String(k)})}catch{}s.current=null,i.current=[],f.current&&(f.current(),f.current=null),Te&&(Te.getTracks().forEach(x=>x.stop()),Te=null),l(null),ka()},j=()=>{const k=r.current;if(!k)return;const x=!c;k.getAudioTracks().forEach(E=>{E.enabled=!x});const v=n.current;v&&v.getSenders().filter(E=>E.track&&E.track.kind==="audio").forEach(E=>{E.track&&(E.track.enabled=!x)}),u(x)};return d.useEffect(()=>{if(!e)return;e.on("call-answered",async({answer:x})=>{De.pause(),De.currentTime=0;const v=n.current;if(!(!v||v.signalingState!=="have-local-offer")){try{const E=x&&typeof x=="object"&&x.sdp?new RTCSessionDescription({type:x.type||"answer",sdp:x.sdp}):x;await v.setRemoteDescription(E),await h()}catch(E){console.error("setRemoteDescription error:",E);return}window.dispatchEvent(new CustomEvent("call-accepted",{detail:{callType:t.current}}))}}),e.on("ice-candidate",async({candidate:x})=>{if(!n.current||!x)return;const v=n.current;if(!(v.remoteDescription&&v.remoteDescription.type)){i.current.push(x);return}try{const R=x&&typeof x=="object"&&x.candidate!=null?new RTCIceCandidate(x):x;await v.addIceCandidate(R)}catch(R){console.error("addIceCandidate error:",R)}});const k=()=>_();return e.on("call-ended",k),()=>{e.off("call-answered"),e.off("ice-candidate"),e.off("call-ended",k)}},[e]),d.useEffect(()=>{const k=()=>{if(n.current||r.current||Te)try{_()}catch{}};return window.addEventListener("beforeunload",k),()=>window.removeEventListener("beforeunload",k)},[]),{startCall:b,answerCall:g,endCall:_,remoteStream:o,isMuted:c,toggleMute:j}}const hu=d.lazy(()=>Ns(()=>import("./ProfilePage-CyBU5pq6.js"),__vite__mapDeps([0,1,2,3]))),mu=d.lazy(()=>Ns(()=>import("./FriendsPage-BXgU4KNU.js"),__vite__mapDeps([4,1,2,5])));function Cs(){return a.jsx("div",{className:"flex items-center justify-center min-h-[60vh]",children:a.jsx(ia,{className:"size-10 animate-spin text-pink-500"})})}const pu=()=>{const e=Bt(),{startCall:t,answerCall:n,endCall:r,isMuted:s,toggleMute:i}=fu(),o=K(D=>D.socket),[l,c]=d.useState(null),{authUser:u,checkAuth:f,isCheckingAuth:h}=K(),y=Re(D=>D.getMyChats),[b,g]=d.useState(!1),[_,j]=d.useState(""),[k,x]=d.useState(""),[v,E]=d.useState(null),[R,I]=d.useState(!1),[M,O]=d.useState(null),z=()=>{M&&o.emit("end-call",{to:String(M)}),g(!1),I(!1),O(null),x(""),j(""),c(null)};d.useEffect(()=>{f()},[]),d.useEffect(()=>{const ee=new URLSearchParams(e.search).get("youtube");if(ee){const $=decodeURIComponent(ee),oe=Z.getState();oe.setPendingYoutubeUrl($),oe.setIsNotesOpen(!1),oe.setIsDrawingOpen(!1),oe.setIsVideoPanelOpen(!0),ke.getState().setTruthDareOpen(!1),window.history.replaceState(null,"",window.location.pathname+(window.location.hash||""))}},[e.search]),d.useEffect(()=>{u!=null&&u._id&&y()},[u==null?void 0:u._id,y]);const F=d.useRef(null);return F.current=()=>{I(!1),g(!1),O(null),x(""),j(""),c(null)},d.useEffect(()=>{if(!o)return;const D=()=>{Ta.flushSync(()=>{F.current&&F.current()})};return o.on("call-ended",D),window.addEventListener("call-ended-local",D),()=>{o.off("call-ended",D),window.removeEventListener("call-ended-local",D)}},[o]),d.useEffect(()=>{o&&(o.on("disconnect",()=>{}),o.on("connect_error",D=>{console.error("❌ SOCKET CONNECT ERROR:",D.message)}),o.on("error",D=>{console.error("❌ SOCKET ERROR:",D)}))},[]),d.useEffect(()=>{const D=ee=>{var $;g(!1),I(!0),($=ee.detail)!=null&&$.callType&&c(ee.detail.callType)};return window.addEventListener("call-accepted",D),()=>window.removeEventListener("call-accepted",D)},[]),h?a.jsx("div",{className:"flex items-center justify-center h-screen",children:a.jsx(ia,{className:"size-10 animate-spin"})}):a.jsxs("div",{className:"min-h-screen",children:[a.jsx($d,{}),a.jsx(Vd,{setActiveCallUserId:O,setActiveCallUserName:x,setActiveCallUserAvatar:j,setCallActive:I,setCallType:c,answerCall:n}),R&&!b&&l==="audio"&&a.jsx(Ca,{activeCallUserId:M,avatar:_,name:k,callActive:R,isMuted:s,onToggleMute:i,onEndCall:r}),R&&l==="video"&&a.jsx(iu,{activeCallUserId:M,activeCallUserName:k,activeCallUserAvatar:_,callActive:R,isMuted:s,onToggleMute:i,onEndCall:r}),b&&!R&&a.jsx(Qd,{name:k,avatar:_,onCancel:z}),a.jsxs(jc,{children:[a.jsx(Pt,{path:"/",element:u?a.jsx(Ud,{setCallType:c,setCallActive:I,setCalling:g,setActiveCallUserId:O,setActiveCallUserName:x,setActiveCallUserAvatar:j,startCall:t}):a.jsx(Tt,{to:"/login"})}),a.jsx(Pt,{path:"/signup",element:u?a.jsx(Tt,{to:"/"}):a.jsx(Fd,{})}),a.jsx(Pt,{path:"/login",element:u?a.jsx(Tt,{to:"/"}):a.jsx(zd,{})}),a.jsx(Pt,{path:"/settings",element:u?a.jsx(Tt,{to:"/",replace:!0}):a.jsx(Tt,{to:"/login"})}),a.jsx(Pt,{path:"/profile",element:u?a.jsx(d.Suspense,{fallback:a.jsx(Cs,{}),children:a.jsx(hu,{})}):a.jsx(Tt,{to:"/login"})}),a.jsx(Pt,{path:"/friends",element:u?a.jsx(d.Suspense,{fallback:a.jsx(Cs,{}),children:a.jsx(mu,{setCallType:c,setCalling:g,setActiveCallUserId:O,setActiveCallUserName:x,setActiveCallUserAvatar:j,startCall:t})}):a.jsx(Tt,{to:"/login"})})]}),a.jsx(ko,{})]})};Ra(document.getElementById("root")).render(a.jsx(d.StrictMode,{children:a.jsx(Mc,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:a.jsx(pu,{})})}));export{bt as D,ca as M,Cn as P,Lc as S,Pl as V,_r as a,Re as b,ae as c,ar as d,vl as e,Du as g,K as u,se as z};

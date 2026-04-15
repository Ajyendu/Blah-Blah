const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ProfilePage-C5d9CXIs.js","assets/react-vendor-EP_uIiR8.js","assets/socket-qXw27f4H.js","assets/ProfilePage-BNLT-Q0Y.css","assets/FriendsPage-DzUQQpM2.js","assets/FriendsPage-CHhpB6xp.css"])))=>i.map(i=>d[i]);
import{r as d,R as Ea,a as an,j as a,b as Ta,c as Ra}from"./react-vendor-EP_uIiR8.js";import{l as Ma}from"./socket-qXw27f4H.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const Pa="modulepreload",Ia=function(e){return"/"+e},jr={},Ns=function(t,n,r){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(n.map(c=>{if(c=Ia(c),c in jr)return;jr[c]=!0;const u=c.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${f}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Pa,u||(h.as="script"),h.crossOrigin="",h.href=c,l&&h.setAttribute("nonce",l),document.head.appendChild(h),u)return new Promise((g,x)=>{h.addEventListener("load",g),h.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Jt(){return Jt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Jt.apply(this,arguments)}var vt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(vt||(vt={}));const Cr="popstate";function Aa(e){e===void 0&&(e={});function t(r,s){let{pathname:i,search:o,hash:l}=r.location;return Jn("",{pathname:i,search:o,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function n(r,s){return typeof s=="string"?s:wn(s)}return Da(t,n,null,e)}function $e(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function dr(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Oa(){return Math.random().toString(36).substr(2,8)}function kr(e,t){return{usr:e.state,key:e.key,idx:t}}function Jn(e,t,n,r){return n===void 0&&(n=null),Jt({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Ht(t):t,{state:n,key:t&&t.key||r||Oa()})}function wn(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Ht(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Da(e,t,n,r){r===void 0&&(r={});let{window:s=document.defaultView,v5Compat:i=!1}=r,o=s.history,l=vt.Pop,c=null,u=f();u==null&&(u=0,o.replaceState(Jt({},o.state,{idx:u}),""));function f(){return(o.state||{idx:null}).idx}function h(){l=vt.Pop;let j=f(),C=j==null?null:j-u;u=j,c&&c({action:l,location:b.location,delta:C})}function g(j,C){l=vt.Push;let _=Jn(b.location,j,C);u=f()+1;let v=kr(_,u),T=b.createHref(_);try{o.pushState(v,"",T)}catch(R){if(R instanceof DOMException&&R.name==="DataCloneError")throw R;s.location.assign(T)}i&&c&&c({action:l,location:b.location,delta:1})}function x(j,C){l=vt.Replace;let _=Jn(b.location,j,C);u=f();let v=kr(_,u),T=b.createHref(_);o.replaceState(v,"",T),i&&c&&c({action:l,location:b.location,delta:0})}function y(j){let C=s.location.origin!=="null"?s.location.origin:s.location.href,_=typeof j=="string"?j:wn(j);return _=_.replace(/ $/,"%20"),$e(C,"No window.location.(origin|href) available to create URL for href: "+_),new URL(_,C)}let b={get action(){return l},get location(){return e(s,o)},listen(j){if(c)throw new Error("A history only accepts one active listener");return s.addEventListener(Cr,h),c=j,()=>{s.removeEventListener(Cr,h),c=null}},createHref(j){return t(s,j)},createURL:y,encodeLocation(j){let C=y(j);return{pathname:C.pathname,search:C.search,hash:C.hash}},push:g,replace:x,go(j){return o.go(j)}};return b}var Nr;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Nr||(Nr={}));function Ba(e,t,n){return n===void 0&&(n="/"),La(e,t,n)}function La(e,t,n,r){let s=typeof t=="string"?Ht(t):t,i=ur(s.pathname||"/",n);if(i==null)return null;let o=Es(e);Ua(o);let l=null;for(let c=0;l==null&&c<o.length;++c){let u=Ka(i);l=Ga(o[c],u)}return l}function Es(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let s=(i,o,l)=>{let c={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};c.relativePath.startsWith("/")&&($e(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let u=St([r,c.relativePath]),f=n.concat(c);i.children&&i.children.length>0&&($e(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),Es(i.children,t,f,u)),!(i.path==null&&!i.index)&&t.push({path:u,score:qa(u,i.index),routesMeta:f})};return e.forEach((i,o)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))s(i,o);else for(let c of Ts(i.path))s(i,o,c)}),t}function Ts(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,s=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return s?[i,""]:[i];let o=Ts(r.join("/")),l=[];return l.push(...o.map(c=>c===""?i:[i,c].join("/"))),s&&l.push(...o),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function Ua(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Ya(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Fa=/^:[\w-]+$/,za=3,$a=2,Ha=1,Va=10,Wa=-2,Er=e=>e==="*";function qa(e,t){let n=e.split("/"),r=n.length;return n.some(Er)&&(r+=Wa),t&&(r+=$a),n.filter(s=>!Er(s)).reduce((s,i)=>s+(Fa.test(i)?za:i===""?Ha:Va),r)}function Ya(e,t){return e.length===t.length&&e.slice(0,-1).every((r,s)=>r===t[s])?e[e.length-1]-t[t.length-1]:0}function Ga(e,t,n){let{routesMeta:r}=e,s={},i="/",o=[];for(let l=0;l<r.length;++l){let c=r[l],u=l===r.length-1,f=i==="/"?t:t.slice(i.length)||"/",h=Ja({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},f),g=c.route;if(!h)return null;Object.assign(s,h.params),o.push({params:s,pathname:St([i,h.pathname]),pathnameBase:no(St([i,h.pathnameBase])),route:g}),h.pathnameBase!=="/"&&(i=St([i,h.pathnameBase]))}return o}function Ja(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Xa(e.path,e.caseSensitive,e.end),s=t.match(n);if(!s)return null;let i=s[0],o=i.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:r.reduce((u,f,h)=>{let{paramName:g,isOptional:x}=f;if(g==="*"){let b=l[h]||"";o=i.slice(0,i.length-b.length).replace(/(.)\/+$/,"$1")}const y=l[h];return x&&!y?u[g]=void 0:u[g]=(y||"").replace(/%2F/g,"/"),u},{}),pathname:i,pathnameBase:o,pattern:e}}function Xa(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),dr(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],s="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,c)=>(r.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),s+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":e!==""&&e!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,t?void 0:"i"),r]}function Ka(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return dr(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function ur(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const Za=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Qa=e=>Za.test(e);function eo(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:s=""}=typeof e=="string"?Ht(e):e,i;if(n)if(Qa(n))i=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),dr(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?i=Tr(n.substring(1),"/"):i=Tr(n,t)}else i=t;return{pathname:i,search:ro(r),hash:so(s)}}function Tr(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function Bn(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function to(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function fr(e,t){let n=to(e);return t?n.map((r,s)=>s===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function hr(e,t,n,r){r===void 0&&(r=!1);let s;typeof e=="string"?s=Ht(e):(s=Jt({},e),$e(!s.pathname||!s.pathname.includes("?"),Bn("?","pathname","search",s)),$e(!s.pathname||!s.pathname.includes("#"),Bn("#","pathname","hash",s)),$e(!s.search||!s.search.includes("#"),Bn("#","search","hash",s)));let i=e===""||s.pathname==="",o=i?"/":s.pathname,l;if(o==null)l=n;else{let h=t.length-1;if(!r&&o.startsWith("..")){let g=o.split("/");for(;g[0]==="..";)g.shift(),h-=1;s.pathname=g.join("/")}l=h>=0?t[h]:"/"}let c=eo(s,l),u=o&&o!=="/"&&o.endsWith("/"),f=(i||o===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||f)&&(c.pathname+="/"),c}const St=e=>e.join("/").replace(/\/\/+/g,"/"),no=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),ro=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,so=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function ao(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Rs=["post","put","patch","delete"];new Set(Rs);const oo=["get",...Rs];new Set(oo);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Xt(){return Xt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Xt.apply(this,arguments)}const mr=d.createContext(null),io=d.createContext(null),kt=d.createContext(null),En=d.createContext(null),Nt=d.createContext({outlet:null,matches:[],isDataRoute:!1}),Ms=d.createContext(null);function lo(e,t){let{relative:n}=t===void 0?{}:t;Vt()||$e(!1);let{basename:r,navigator:s}=d.useContext(kt),{hash:i,pathname:o,search:l}=Is(e,{relative:n}),c=o;return r!=="/"&&(c=o==="/"?r:St([r,o])),s.createHref({pathname:c,search:l,hash:i})}function Vt(){return d.useContext(En)!=null}function Bt(){return Vt()||$e(!1),d.useContext(En).location}function Ps(e){d.useContext(kt).static||d.useLayoutEffect(e)}function pr(){let{isDataRoute:e}=d.useContext(Nt);return e?vo():co()}function co(){Vt()||$e(!1);let e=d.useContext(mr),{basename:t,future:n,navigator:r}=d.useContext(kt),{matches:s}=d.useContext(Nt),{pathname:i}=Bt(),o=JSON.stringify(fr(s,n.v7_relativeSplatPath)),l=d.useRef(!1);return Ps(()=>{l.current=!0}),d.useCallback(function(u,f){if(f===void 0&&(f={}),!l.current)return;if(typeof u=="number"){r.go(u);return}let h=hr(u,JSON.parse(o),i,f.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:St([t,h.pathname])),(f.replace?r.replace:r.push)(h,f.state,f)},[t,r,o,i,e])}function Is(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=d.useContext(kt),{matches:s}=d.useContext(Nt),{pathname:i}=Bt(),o=JSON.stringify(fr(s,r.v7_relativeSplatPath));return d.useMemo(()=>hr(e,JSON.parse(o),i,n==="path"),[e,o,i,n])}function uo(e,t){return fo(e,t)}function fo(e,t,n,r){Vt()||$e(!1);let{navigator:s}=d.useContext(kt),{matches:i}=d.useContext(Nt),o=i[i.length-1],l=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:"/";o&&o.route;let u=Bt(),f;if(t){var h;let j=typeof t=="string"?Ht(t):t;c==="/"||(h=j.pathname)!=null&&h.startsWith(c)||$e(!1),f=j}else f=u;let g=f.pathname||"/",x=g;if(c!=="/"){let j=c.replace(/^\//,"").split("/");x="/"+g.replace(/^\//,"").split("/").slice(j.length).join("/")}let y=Ba(e,{pathname:x}),b=yo(y&&y.map(j=>Object.assign({},j,{params:Object.assign({},l,j.params),pathname:St([c,s.encodeLocation?s.encodeLocation(j.pathname).pathname:j.pathname]),pathnameBase:j.pathnameBase==="/"?c:St([c,s.encodeLocation?s.encodeLocation(j.pathnameBase).pathname:j.pathnameBase])})),i,n,r);return t&&b?d.createElement(En.Provider,{value:{location:Xt({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:vt.Pop}},b):b}function ho(){let e=wo(),t=ao(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return d.createElement(d.Fragment,null,d.createElement("h2",null,"Unexpected Application Error!"),d.createElement("h3",{style:{fontStyle:"italic"}},t),n?d.createElement("pre",{style:s},n):null,null)}const mo=d.createElement(ho,null);class po extends d.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?d.createElement(Nt.Provider,{value:this.props.routeContext},d.createElement(Ms.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function go(e){let{routeContext:t,match:n,children:r}=e,s=d.useContext(mr);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),d.createElement(Nt.Provider,{value:t},r)}function yo(e,t,n,r){var s;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,l=(s=n)==null?void 0:s.errors;if(l!=null){let f=o.findIndex(h=>h.route.id&&(l==null?void 0:l[h.route.id])!==void 0);f>=0||$e(!1),o=o.slice(0,Math.min(o.length,f+1))}let c=!1,u=-1;if(n&&r&&r.v7_partialHydration)for(let f=0;f<o.length;f++){let h=o[f];if((h.route.HydrateFallback||h.route.hydrateFallbackElement)&&(u=f),h.route.id){let{loaderData:g,errors:x}=n,y=h.route.loader&&g[h.route.id]===void 0&&(!x||x[h.route.id]===void 0);if(h.route.lazy||y){c=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((f,h,g)=>{let x,y=!1,b=null,j=null;n&&(x=l&&h.route.id?l[h.route.id]:void 0,b=h.route.errorElement||mo,c&&(u<0&&g===0?(So("route-fallback"),y=!0,j=null):u===g&&(y=!0,j=h.route.hydrateFallbackElement||null)));let C=t.concat(o.slice(0,g+1)),_=()=>{let v;return x?v=b:y?v=j:h.route.Component?v=d.createElement(h.route.Component,null):h.route.element?v=h.route.element:v=f,d.createElement(go,{match:h,routeContext:{outlet:f,matches:C,isDataRoute:n!=null},children:v})};return n&&(h.route.ErrorBoundary||h.route.errorElement||g===0)?d.createElement(po,{location:n.location,revalidation:n.revalidation,component:b,error:x,children:_(),routeContext:{outlet:null,matches:C,isDataRoute:!0}}):_()},null)}var As=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(As||{}),Os=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Os||{});function bo(e){let t=d.useContext(mr);return t||$e(!1),t}function _o(e){let t=d.useContext(io);return t||$e(!1),t}function xo(e){let t=d.useContext(Nt);return t||$e(!1),t}function Ds(e){let t=xo(),n=t.matches[t.matches.length-1];return n.route.id||$e(!1),n.route.id}function wo(){var e;let t=d.useContext(Ms),n=_o(),r=Ds();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function vo(){let{router:e}=bo(As.UseNavigateStable),t=Ds(Os.UseNavigateStable),n=d.useRef(!1);return Ps(()=>{n.current=!0}),d.useCallback(function(s,i){i===void 0&&(i={}),n.current&&(typeof s=="number"?e.navigate(s):e.navigate(s,Xt({fromRouteId:t},i)))},[e,t])}const Rr={};function So(e,t,n){Rr[e]||(Rr[e]=!0)}function jo(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Tt(e){let{to:t,replace:n,state:r,relative:s}=e;Vt()||$e(!1);let{future:i,static:o}=d.useContext(kt),{matches:l}=d.useContext(Nt),{pathname:c}=Bt(),u=pr(),f=hr(t,fr(l,i.v7_relativeSplatPath),c,s==="path"),h=JSON.stringify(f);return d.useEffect(()=>u(JSON.parse(h),{replace:n,state:r,relative:s}),[u,h,s,n,r]),null}function Mt(e){$e(!1)}function Co(e){let{basename:t="/",children:n=null,location:r,navigationType:s=vt.Pop,navigator:i,static:o=!1,future:l}=e;Vt()&&$e(!1);let c=t.replace(/^\/*/,"/"),u=d.useMemo(()=>({basename:c,navigator:i,static:o,future:Xt({v7_relativeSplatPath:!1},l)}),[c,l,i,o]);typeof r=="string"&&(r=Ht(r));let{pathname:f="/",search:h="",hash:g="",state:x=null,key:y="default"}=r,b=d.useMemo(()=>{let j=ur(f,c);return j==null?null:{location:{pathname:j,search:h,hash:g,state:x,key:y},navigationType:s}},[c,f,h,g,x,y,s]);return b==null?null:d.createElement(kt.Provider,{value:u},d.createElement(En.Provider,{children:n,value:b}))}function ko(e){let{children:t,location:n}=e;return uo(Xn(t),n)}new Promise(()=>{});function Xn(e,t){t===void 0&&(t=[]);let n=[];return d.Children.forEach(e,(r,s)=>{if(!d.isValidElement(r))return;let i=[...t,s];if(r.type===d.Fragment){n.push.apply(n,Xn(r.props.children,i));return}r.type!==Mt&&$e(!1),!r.props.index||!r.props.children||$e(!1);let o={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=Xn(r.props.children,i)),n.push(o)}),n}/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Kn(){return Kn=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Kn.apply(this,arguments)}function No(e,t){if(e==null)return{};var n={},r=Object.keys(e),s,i;for(i=0;i<r.length;i++)s=r[i],!(t.indexOf(s)>=0)&&(n[s]=e[s]);return n}function Eo(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function To(e,t){return e.button===0&&(!t||t==="_self")&&!Eo(e)}const Ro=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Mo="6";try{window.__reactRouterVersion=Mo}catch{}const Po="startTransition",Mr=Ea[Po];function Io(e){let{basename:t,children:n,future:r,window:s}=e,i=d.useRef();i.current==null&&(i.current=Aa({window:s,v5Compat:!0}));let o=i.current,[l,c]=d.useState({action:o.action,location:o.location}),{v7_startTransition:u}=r||{},f=d.useCallback(h=>{u&&Mr?Mr(()=>c(h)):c(h)},[c,u]);return d.useLayoutEffect(()=>o.listen(f),[o,f]),d.useEffect(()=>jo(r),[r]),d.createElement(Co,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:o,future:r})}const Ao=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Oo=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Kt=d.forwardRef(function(t,n){let{onClick:r,relative:s,reloadDocument:i,replace:o,state:l,target:c,to:u,preventScrollReset:f,viewTransition:h}=t,g=No(t,Ro),{basename:x}=d.useContext(kt),y,b=!1;if(typeof u=="string"&&Oo.test(u)&&(y=u,Ao))try{let v=new URL(window.location.href),T=u.startsWith("//")?new URL(v.protocol+u):new URL(u),R=ur(T.pathname,x);T.origin===v.origin&&R!=null?u=R+T.search+T.hash:b=!0}catch{}let j=lo(u,{relative:s}),C=Do(u,{replace:o,state:l,target:c,preventScrollReset:f,relative:s,viewTransition:h});function _(v){r&&r(v),v.defaultPrevented||C(v)}return d.createElement("a",Kn({},g,{href:y||j,onClick:b||i?r:_,ref:n,target:c}))});var Pr;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Pr||(Pr={}));var Ir;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Ir||(Ir={}));function Do(e,t){let{target:n,replace:r,state:s,preventScrollReset:i,relative:o,viewTransition:l}=t===void 0?{}:t,c=pr(),u=Bt(),f=Is(e,{relative:o});return d.useCallback(h=>{if(To(h,n)){h.preventDefault();let g=r!==void 0?r:wn(u)===wn(f);c(e,{replace:g,state:s,preventScrollReset:i,relative:o,viewTransition:l})}},[u,c,f,r,s,n,e,i,o,l])}const Ar=e=>{let t;const n=new Set,r=(u,f)=>{const h=typeof u=="function"?u(t):u;if(!Object.is(h,t)){const g=t;t=f??(typeof h!="object"||h===null)?h:Object.assign({},t,h),n.forEach(x=>x(t,g))}},s=()=>t,l={setState:r,getState:s,getInitialState:()=>c,subscribe:u=>(n.add(u),()=>n.delete(u))},c=t=e(r,s,l);return l},Bo=e=>e?Ar(e):Ar,Lo=e=>e;function Uo(e,t=Lo){const n=an.useSyncExternalStore(e.subscribe,an.useCallback(()=>t(e.getState()),[e,t]),an.useCallback(()=>t(e.getInitialState()),[e,t]));return an.useDebugValue(n),n}const Or=e=>{const t=Bo(e),n=r=>Uo(t,r);return Object.assign(n,t),n},Qt=e=>e?Or(e):Or;function Bs(e,t){return function(){return e.apply(t,arguments)}}const{toString:Fo}=Object.prototype,{getPrototypeOf:gr}=Object,{iterator:Tn,toStringTag:Ls}=Symbol,Rn=(e=>t=>{const n=Fo.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),dt=e=>(e=e.toLowerCase(),t=>Rn(t)===e),Mn=e=>t=>typeof t===e,{isArray:Wt}=Array,$t=Mn("undefined");function en(e){return e!==null&&!$t(e)&&e.constructor!==null&&!$t(e.constructor)&&it(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Us=dt("ArrayBuffer");function zo(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Us(e.buffer),t}const $o=Mn("string"),it=Mn("function"),Fs=Mn("number"),tn=e=>e!==null&&typeof e=="object",Ho=e=>e===!0||e===!1,hn=e=>{if(Rn(e)!=="object")return!1;const t=gr(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Ls in e)&&!(Tn in e)},Vo=e=>{if(!tn(e)||en(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Wo=dt("Date"),qo=dt("File"),Yo=dt("Blob"),Go=dt("FileList"),Jo=e=>tn(e)&&it(e.pipe),Xo=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||it(e.append)&&((t=Rn(e))==="formdata"||t==="object"&&it(e.toString)&&e.toString()==="[object FormData]"))},Ko=dt("URLSearchParams"),[Zo,Qo,ei,ti]=["ReadableStream","Request","Response","Headers"].map(dt),ni=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function nn(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,s;if(typeof e!="object"&&(e=[e]),Wt(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{if(en(e))return;const i=n?Object.getOwnPropertyNames(e):Object.keys(e),o=i.length;let l;for(r=0;r<o;r++)l=i[r],t.call(null,e[l],l,e)}}function zs(e,t){if(en(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r=n.length,s;for(;r-- >0;)if(s=n[r],t===s.toLowerCase())return s;return null}const It=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,$s=e=>!$t(e)&&e!==It;function Zn(){const{caseless:e,skipUndefined:t}=$s(this)&&this||{},n={},r=(s,i)=>{const o=e&&zs(n,i)||i;hn(n[o])&&hn(s)?n[o]=Zn(n[o],s):hn(s)?n[o]=Zn({},s):Wt(s)?n[o]=s.slice():(!t||!$t(s))&&(n[o]=s)};for(let s=0,i=arguments.length;s<i;s++)arguments[s]&&nn(arguments[s],r);return n}const ri=(e,t,n,{allOwnKeys:r}={})=>(nn(t,(s,i)=>{n&&it(s)?e[i]=Bs(s,n):e[i]=s},{allOwnKeys:r}),e),si=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),ai=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},oi=(e,t,n,r)=>{let s,i,o;const l={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),i=s.length;i-- >0;)o=s[i],(!r||r(o,e,t))&&!l[o]&&(t[o]=e[o],l[o]=!0);e=n!==!1&&gr(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},ii=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},li=e=>{if(!e)return null;if(Wt(e))return e;let t=e.length;if(!Fs(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},ci=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&gr(Uint8Array)),di=(e,t)=>{const r=(e&&e[Tn]).call(e);let s;for(;(s=r.next())&&!s.done;){const i=s.value;t.call(e,i[0],i[1])}},ui=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},fi=dt("HTMLFormElement"),hi=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),Dr=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),mi=dt("RegExp"),Hs=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};nn(n,(s,i)=>{let o;(o=t(s,i,e))!==!1&&(r[i]=o||s)}),Object.defineProperties(e,r)},pi=e=>{Hs(e,(t,n)=>{if(it(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(it(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},gi=(e,t)=>{const n={},r=s=>{s.forEach(i=>{n[i]=!0})};return Wt(e)?r(e):r(String(e).split(t)),n},yi=()=>{},bi=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function _i(e){return!!(e&&it(e.append)&&e[Ls]==="FormData"&&e[Tn])}const xi=e=>{const t=new Array(10),n=(r,s)=>{if(tn(r)){if(t.indexOf(r)>=0)return;if(en(r))return r;if(!("toJSON"in r)){t[s]=r;const i=Wt(r)?[]:{};return nn(r,(o,l)=>{const c=n(o,s+1);!$t(c)&&(i[l]=c)}),t[s]=void 0,i}}return r};return n(e,0)},wi=dt("AsyncFunction"),vi=e=>e&&(tn(e)||it(e))&&it(e.then)&&it(e.catch),Vs=((e,t)=>e?setImmediate:t?((n,r)=>(It.addEventListener("message",({source:s,data:i})=>{s===It&&i===n&&r.length&&r.shift()()},!1),s=>{r.push(s),It.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",it(It.postMessage)),Si=typeof queueMicrotask<"u"?queueMicrotask.bind(It):typeof process<"u"&&process.nextTick||Vs,ji=e=>e!=null&&it(e[Tn]),k={isArray:Wt,isArrayBuffer:Us,isBuffer:en,isFormData:Xo,isArrayBufferView:zo,isString:$o,isNumber:Fs,isBoolean:Ho,isObject:tn,isPlainObject:hn,isEmptyObject:Vo,isReadableStream:Zo,isRequest:Qo,isResponse:ei,isHeaders:ti,isUndefined:$t,isDate:Wo,isFile:qo,isBlob:Yo,isRegExp:mi,isFunction:it,isStream:Jo,isURLSearchParams:Ko,isTypedArray:ci,isFileList:Go,forEach:nn,merge:Zn,extend:ri,trim:ni,stripBOM:si,inherits:ai,toFlatObject:oi,kindOf:Rn,kindOfTest:dt,endsWith:ii,toArray:li,forEachEntry:di,matchAll:ui,isHTMLForm:fi,hasOwnProperty:Dr,hasOwnProp:Dr,reduceDescriptors:Hs,freezeMethods:pi,toObjectSet:gi,toCamelCase:hi,noop:yi,toFiniteNumber:bi,findKey:zs,global:It,isContextDefined:$s,isSpecCompliantForm:_i,toJSONObject:xi,isAsyncFn:wi,isThenable:vi,setImmediate:Vs,asap:Si,isIterable:ji};function ee(e,t,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s,this.status=s.status?s.status:null)}k.inherits(ee,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:k.toJSONObject(this.config),code:this.code,status:this.status}}});const Ws=ee.prototype,qs={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{qs[e]={value:e}});Object.defineProperties(ee,qs);Object.defineProperty(Ws,"isAxiosError",{value:!0});ee.from=(e,t,n,r,s,i)=>{const o=Object.create(Ws);k.toFlatObject(e,o,function(f){return f!==Error.prototype},u=>u!=="isAxiosError");const l=e&&e.message?e.message:"Error",c=t==null&&e?e.code:t;return ee.call(o,l,c,n,r,s),e&&o.cause==null&&Object.defineProperty(o,"cause",{value:e,configurable:!0}),o.name=e&&e.name||"Error",i&&Object.assign(o,i),o};const Ci=null;function Qn(e){return k.isPlainObject(e)||k.isArray(e)}function Ys(e){return k.endsWith(e,"[]")?e.slice(0,-2):e}function Br(e,t,n){return e?e.concat(t).map(function(s,i){return s=Ys(s),!n&&i?"["+s+"]":s}).join(n?".":""):t}function ki(e){return k.isArray(e)&&!e.some(Qn)}const Ni=k.toFlatObject(k,{},null,function(t){return/^is[A-Z]/.test(t)});function Pn(e,t,n){if(!k.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=k.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(b,j){return!k.isUndefined(j[b])});const r=n.metaTokens,s=n.visitor||f,i=n.dots,o=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&k.isSpecCompliantForm(t);if(!k.isFunction(s))throw new TypeError("visitor must be a function");function u(y){if(y===null)return"";if(k.isDate(y))return y.toISOString();if(k.isBoolean(y))return y.toString();if(!c&&k.isBlob(y))throw new ee("Blob is not supported. Use a Buffer instead.");return k.isArrayBuffer(y)||k.isTypedArray(y)?c&&typeof Blob=="function"?new Blob([y]):Buffer.from(y):y}function f(y,b,j){let C=y;if(y&&!j&&typeof y=="object"){if(k.endsWith(b,"{}"))b=r?b:b.slice(0,-2),y=JSON.stringify(y);else if(k.isArray(y)&&ki(y)||(k.isFileList(y)||k.endsWith(b,"[]"))&&(C=k.toArray(y)))return b=Ys(b),C.forEach(function(v,T){!(k.isUndefined(v)||v===null)&&t.append(o===!0?Br([b],T,i):o===null?b:b+"[]",u(v))}),!1}return Qn(y)?!0:(t.append(Br(j,b,i),u(y)),!1)}const h=[],g=Object.assign(Ni,{defaultVisitor:f,convertValue:u,isVisitable:Qn});function x(y,b){if(!k.isUndefined(y)){if(h.indexOf(y)!==-1)throw Error("Circular reference detected in "+b.join("."));h.push(y),k.forEach(y,function(C,_){(!(k.isUndefined(C)||C===null)&&s.call(t,C,k.isString(_)?_.trim():_,b,g))===!0&&x(C,b?b.concat(_):[_])}),h.pop()}}if(!k.isObject(e))throw new TypeError("data must be an object");return x(e),t}function Lr(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function yr(e,t){this._pairs=[],e&&Pn(e,this,t)}const Gs=yr.prototype;Gs.append=function(t,n){this._pairs.push([t,n])};Gs.toString=function(t){const n=t?function(r){return t.call(this,r,Lr)}:Lr;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function Ei(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Js(e,t,n){if(!t)return e;const r=n&&n.encode||Ei;k.isFunction(n)&&(n={serialize:n});const s=n&&n.serialize;let i;if(s?i=s(t,n):i=k.isURLSearchParams(t)?t.toString():new yr(t,n).toString(r),i){const o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}class Ur{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){k.forEach(this.handlers,function(r){r!==null&&t(r)})}}const Xs={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Ti=typeof URLSearchParams<"u"?URLSearchParams:yr,Ri=typeof FormData<"u"?FormData:null,Mi=typeof Blob<"u"?Blob:null,Pi={isBrowser:!0,classes:{URLSearchParams:Ti,FormData:Ri,Blob:Mi},protocols:["http","https","file","blob","url","data"]},br=typeof window<"u"&&typeof document<"u",er=typeof navigator=="object"&&navigator||void 0,Ii=br&&(!er||["ReactNative","NativeScript","NS"].indexOf(er.product)<0),Ai=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Oi=br&&window.location.href||"http://localhost",Di=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:br,hasStandardBrowserEnv:Ii,hasStandardBrowserWebWorkerEnv:Ai,navigator:er,origin:Oi},Symbol.toStringTag,{value:"Module"})),tt={...Di,...Pi};function Bi(e,t){return Pn(e,new tt.classes.URLSearchParams,{visitor:function(n,r,s,i){return tt.isNode&&k.isBuffer(n)?(this.append(r,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)},...t})}function Li(e){return k.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Ui(e){const t={},n=Object.keys(e);let r;const s=n.length;let i;for(r=0;r<s;r++)i=n[r],t[i]=e[i];return t}function Ks(e){function t(n,r,s,i){let o=n[i++];if(o==="__proto__")return!0;const l=Number.isFinite(+o),c=i>=n.length;return o=!o&&k.isArray(s)?s.length:o,c?(k.hasOwnProp(s,o)?s[o]=[s[o],r]:s[o]=r,!l):((!s[o]||!k.isObject(s[o]))&&(s[o]=[]),t(n,r,s[o],i)&&k.isArray(s[o])&&(s[o]=Ui(s[o])),!l)}if(k.isFormData(e)&&k.isFunction(e.entries)){const n={};return k.forEachEntry(e,(r,s)=>{t(Li(r),s,n,0)}),n}return null}function Fi(e,t,n){if(k.isString(e))try{return(t||JSON.parse)(e),k.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const rn={transitional:Xs,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,i=k.isObject(t);if(i&&k.isHTMLForm(t)&&(t=new FormData(t)),k.isFormData(t))return s?JSON.stringify(Ks(t)):t;if(k.isArrayBuffer(t)||k.isBuffer(t)||k.isStream(t)||k.isFile(t)||k.isBlob(t)||k.isReadableStream(t))return t;if(k.isArrayBufferView(t))return t.buffer;if(k.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(i){if(r.indexOf("application/x-www-form-urlencoded")>-1)return Bi(t,this.formSerializer).toString();if((l=k.isFileList(t))||r.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return Pn(l?{"files[]":t}:t,c&&new c,this.formSerializer)}}return i||s?(n.setContentType("application/json",!1),Fi(t)):t}],transformResponse:[function(t){const n=this.transitional||rn.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(k.isResponse(t)||k.isReadableStream(t))return t;if(t&&k.isString(t)&&(r&&!this.responseType||s)){const o=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t,this.parseReviver)}catch(l){if(o)throw l.name==="SyntaxError"?ee.from(l,ee.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:tt.classes.FormData,Blob:tt.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};k.forEach(["delete","get","head","post","put","patch"],e=>{rn.headers[e]={}});const zi=k.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),$i=e=>{const t={};let n,r,s;return e&&e.split(`
`).forEach(function(o){s=o.indexOf(":"),n=o.substring(0,s).trim().toLowerCase(),r=o.substring(s+1).trim(),!(!n||t[n]&&zi[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},Fr=Symbol("internals");function Yt(e){return e&&String(e).trim().toLowerCase()}function mn(e){return e===!1||e==null?e:k.isArray(e)?e.map(mn):String(e)}function Hi(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Vi=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Ln(e,t,n,r,s){if(k.isFunction(r))return r.call(this,t,n);if(s&&(t=n),!!k.isString(t)){if(k.isString(r))return t.indexOf(r)!==-1;if(k.isRegExp(r))return r.test(t)}}function Wi(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function qi(e,t){const n=k.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(s,i,o){return this[r].call(this,t,s,i,o)},configurable:!0})})}let lt=class{constructor(t){t&&this.set(t)}set(t,n,r){const s=this;function i(l,c,u){const f=Yt(c);if(!f)throw new Error("header name must be a non-empty string");const h=k.findKey(s,f);(!h||s[h]===void 0||u===!0||u===void 0&&s[h]!==!1)&&(s[h||c]=mn(l))}const o=(l,c)=>k.forEach(l,(u,f)=>i(u,f,c));if(k.isPlainObject(t)||t instanceof this.constructor)o(t,n);else if(k.isString(t)&&(t=t.trim())&&!Vi(t))o($i(t),n);else if(k.isObject(t)&&k.isIterable(t)){let l={},c,u;for(const f of t){if(!k.isArray(f))throw TypeError("Object iterator must return a key-value pair");l[u=f[0]]=(c=l[u])?k.isArray(c)?[...c,f[1]]:[c,f[1]]:f[1]}o(l,n)}else t!=null&&i(n,t,r);return this}get(t,n){if(t=Yt(t),t){const r=k.findKey(this,t);if(r){const s=this[r];if(!n)return s;if(n===!0)return Hi(s);if(k.isFunction(n))return n.call(this,s,r);if(k.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Yt(t),t){const r=k.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||Ln(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let s=!1;function i(o){if(o=Yt(o),o){const l=k.findKey(r,o);l&&(!n||Ln(r,r[l],l,n))&&(delete r[l],s=!0)}}return k.isArray(t)?t.forEach(i):i(t),s}clear(t){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const i=n[r];(!t||Ln(this,this[i],i,t,!0))&&(delete this[i],s=!0)}return s}normalize(t){const n=this,r={};return k.forEach(this,(s,i)=>{const o=k.findKey(r,i);if(o){n[o]=mn(s),delete n[i];return}const l=t?Wi(i):String(i).trim();l!==i&&delete n[i],n[l]=mn(s),r[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return k.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=t&&k.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(s=>r.set(s)),r}static accessor(t){const r=(this[Fr]=this[Fr]={accessors:{}}).accessors,s=this.prototype;function i(o){const l=Yt(o);r[l]||(qi(s,o),r[l]=!0)}return k.isArray(t)?t.forEach(i):i(t),this}};lt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);k.reduceDescriptors(lt.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});k.freezeMethods(lt);function Un(e,t){const n=this||rn,r=t||n,s=lt.from(r.headers);let i=r.data;return k.forEach(e,function(l){i=l.call(n,i,s.normalize(),t?t.status:void 0)}),s.normalize(),i}function Zs(e){return!!(e&&e.__CANCEL__)}function qt(e,t,n){ee.call(this,e??"canceled",ee.ERR_CANCELED,t,n),this.name="CanceledError"}k.inherits(qt,ee,{__CANCEL__:!0});function Qs(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new ee("Request failed with status code "+n.status,[ee.ERR_BAD_REQUEST,ee.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Yi(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Gi(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s=0,i=0,o;return t=t!==void 0?t:1e3,function(c){const u=Date.now(),f=r[i];o||(o=u),n[s]=c,r[s]=u;let h=i,g=0;for(;h!==s;)g+=n[h++],h=h%e;if(s=(s+1)%e,s===i&&(i=(i+1)%e),u-o<t)return;const x=f&&u-f;return x?Math.round(g*1e3/x):void 0}}function Ji(e,t){let n=0,r=1e3/t,s,i;const o=(u,f=Date.now())=>{n=f,s=null,i&&(clearTimeout(i),i=null),e(...u)};return[(...u)=>{const f=Date.now(),h=f-n;h>=r?o(u,f):(s=u,i||(i=setTimeout(()=>{i=null,o(s)},r-h)))},()=>s&&o(s)]}const vn=(e,t,n=3)=>{let r=0;const s=Gi(50,250);return Ji(i=>{const o=i.loaded,l=i.lengthComputable?i.total:void 0,c=o-r,u=s(c),f=o<=l;r=o;const h={loaded:o,total:l,progress:l?o/l:void 0,bytes:c,rate:u||void 0,estimated:u&&l&&f?(l-o)/u:void 0,event:i,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(h)},n)},zr=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},$r=e=>(...t)=>k.asap(()=>e(...t)),Xi=tt.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,tt.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(tt.origin),tt.navigator&&/(msie|trident)/i.test(tt.navigator.userAgent)):()=>!0,Ki=tt.hasStandardBrowserEnv?{write(e,t,n,r,s,i,o){if(typeof document>"u")return;const l=[`${e}=${encodeURIComponent(t)}`];k.isNumber(n)&&l.push(`expires=${new Date(n).toUTCString()}`),k.isString(r)&&l.push(`path=${r}`),k.isString(s)&&l.push(`domain=${s}`),i===!0&&l.push("secure"),k.isString(o)&&l.push(`SameSite=${o}`),document.cookie=l.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Zi(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Qi(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function ea(e,t,n){let r=!Zi(t);return e&&(r||n==!1)?Qi(e,t):t}const Hr=e=>e instanceof lt?{...e}:e;function Dt(e,t){t=t||{};const n={};function r(u,f,h,g){return k.isPlainObject(u)&&k.isPlainObject(f)?k.merge.call({caseless:g},u,f):k.isPlainObject(f)?k.merge({},f):k.isArray(f)?f.slice():f}function s(u,f,h,g){if(k.isUndefined(f)){if(!k.isUndefined(u))return r(void 0,u,h,g)}else return r(u,f,h,g)}function i(u,f){if(!k.isUndefined(f))return r(void 0,f)}function o(u,f){if(k.isUndefined(f)){if(!k.isUndefined(u))return r(void 0,u)}else return r(void 0,f)}function l(u,f,h){if(h in t)return r(u,f);if(h in e)return r(void 0,u)}const c={url:i,method:i,data:i,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:l,headers:(u,f,h)=>s(Hr(u),Hr(f),h,!0)};return k.forEach(Object.keys({...e,...t}),function(f){const h=c[f]||s,g=h(e[f],t[f],f);k.isUndefined(g)&&h!==l||(n[f]=g)}),n}const ta=e=>{const t=Dt({},e);let{data:n,withXSRFToken:r,xsrfHeaderName:s,xsrfCookieName:i,headers:o,auth:l}=t;if(t.headers=o=lt.from(o),t.url=Js(ea(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),l&&o.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):""))),k.isFormData(n)){if(tt.hasStandardBrowserEnv||tt.hasStandardBrowserWebWorkerEnv)o.setContentType(void 0);else if(k.isFunction(n.getHeaders)){const c=n.getHeaders(),u=["content-type","content-length"];Object.entries(c).forEach(([f,h])=>{u.includes(f.toLowerCase())&&o.set(f,h)})}}if(tt.hasStandardBrowserEnv&&(r&&k.isFunction(r)&&(r=r(t)),r||r!==!1&&Xi(t.url))){const c=s&&i&&Ki.read(i);c&&o.set(s,c)}return t},el=typeof XMLHttpRequest<"u",tl=el&&function(e){return new Promise(function(n,r){const s=ta(e);let i=s.data;const o=lt.from(s.headers).normalize();let{responseType:l,onUploadProgress:c,onDownloadProgress:u}=s,f,h,g,x,y;function b(){x&&x(),y&&y(),s.cancelToken&&s.cancelToken.unsubscribe(f),s.signal&&s.signal.removeEventListener("abort",f)}let j=new XMLHttpRequest;j.open(s.method.toUpperCase(),s.url,!0),j.timeout=s.timeout;function C(){if(!j)return;const v=lt.from("getAllResponseHeaders"in j&&j.getAllResponseHeaders()),R={data:!l||l==="text"||l==="json"?j.responseText:j.response,status:j.status,statusText:j.statusText,headers:v,config:e,request:j};Qs(function(M){n(M),b()},function(M){r(M),b()},R),j=null}"onloadend"in j?j.onloadend=C:j.onreadystatechange=function(){!j||j.readyState!==4||j.status===0&&!(j.responseURL&&j.responseURL.indexOf("file:")===0)||setTimeout(C)},j.onabort=function(){j&&(r(new ee("Request aborted",ee.ECONNABORTED,e,j)),j=null)},j.onerror=function(T){const R=T&&T.message?T.message:"Network Error",I=new ee(R,ee.ERR_NETWORK,e,j);I.event=T||null,r(I),j=null},j.ontimeout=function(){let T=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const R=s.transitional||Xs;s.timeoutErrorMessage&&(T=s.timeoutErrorMessage),r(new ee(T,R.clarifyTimeoutError?ee.ETIMEDOUT:ee.ECONNABORTED,e,j)),j=null},i===void 0&&o.setContentType(null),"setRequestHeader"in j&&k.forEach(o.toJSON(),function(T,R){j.setRequestHeader(R,T)}),k.isUndefined(s.withCredentials)||(j.withCredentials=!!s.withCredentials),l&&l!=="json"&&(j.responseType=s.responseType),u&&([g,y]=vn(u,!0),j.addEventListener("progress",g)),c&&j.upload&&([h,x]=vn(c),j.upload.addEventListener("progress",h),j.upload.addEventListener("loadend",x)),(s.cancelToken||s.signal)&&(f=v=>{j&&(r(!v||v.type?new qt(null,e,j):v),j.abort(),j=null)},s.cancelToken&&s.cancelToken.subscribe(f),s.signal&&(s.signal.aborted?f():s.signal.addEventListener("abort",f)));const _=Yi(s.url);if(_&&tt.protocols.indexOf(_)===-1){r(new ee("Unsupported protocol "+_+":",ee.ERR_BAD_REQUEST,e));return}j.send(i||null)})},nl=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,s;const i=function(u){if(!s){s=!0,l();const f=u instanceof Error?u:this.reason;r.abort(f instanceof ee?f:new qt(f instanceof Error?f.message:f))}};let o=t&&setTimeout(()=>{o=null,i(new ee(`timeout ${t} of ms exceeded`,ee.ETIMEDOUT))},t);const l=()=>{e&&(o&&clearTimeout(o),o=null,e.forEach(u=>{u.unsubscribe?u.unsubscribe(i):u.removeEventListener("abort",i)}),e=null)};e.forEach(u=>u.addEventListener("abort",i));const{signal:c}=r;return c.unsubscribe=()=>k.asap(l),c}},rl=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,s;for(;r<n;)s=r+t,yield e.slice(r,s),r=s},sl=async function*(e,t){for await(const n of al(e))yield*rl(n,t)},al=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},Vr=(e,t,n,r)=>{const s=sl(e,t);let i=0,o,l=c=>{o||(o=!0,r&&r(c))};return new ReadableStream({async pull(c){try{const{done:u,value:f}=await s.next();if(u){l(),c.close();return}let h=f.byteLength;if(n){let g=i+=h;n(g)}c.enqueue(new Uint8Array(f))}catch(u){throw l(u),u}},cancel(c){return l(c),s.return()}},{highWaterMark:2})},Wr=64*1024,{isFunction:on}=k,ol=(({Request:e,Response:t})=>({Request:e,Response:t}))(k.global),{ReadableStream:qr,TextEncoder:Yr}=k.global,Gr=(e,...t)=>{try{return!!e(...t)}catch{return!1}},il=e=>{e=k.merge.call({skipUndefined:!0},ol,e);const{fetch:t,Request:n,Response:r}=e,s=t?on(t):typeof fetch=="function",i=on(n),o=on(r);if(!s)return!1;const l=s&&on(qr),c=s&&(typeof Yr=="function"?(y=>b=>y.encode(b))(new Yr):async y=>new Uint8Array(await new n(y).arrayBuffer())),u=i&&l&&Gr(()=>{let y=!1;const b=new n(tt.origin,{body:new qr,method:"POST",get duplex(){return y=!0,"half"}}).headers.has("Content-Type");return y&&!b}),f=o&&l&&Gr(()=>k.isReadableStream(new r("").body)),h={stream:f&&(y=>y.body)};s&&["text","arrayBuffer","blob","formData","stream"].forEach(y=>{!h[y]&&(h[y]=(b,j)=>{let C=b&&b[y];if(C)return C.call(b);throw new ee(`Response type '${y}' is not supported`,ee.ERR_NOT_SUPPORT,j)})});const g=async y=>{if(y==null)return 0;if(k.isBlob(y))return y.size;if(k.isSpecCompliantForm(y))return(await new n(tt.origin,{method:"POST",body:y}).arrayBuffer()).byteLength;if(k.isArrayBufferView(y)||k.isArrayBuffer(y))return y.byteLength;if(k.isURLSearchParams(y)&&(y=y+""),k.isString(y))return(await c(y)).byteLength},x=async(y,b)=>{const j=k.toFiniteNumber(y.getContentLength());return j??g(b)};return async y=>{let{url:b,method:j,data:C,signal:_,cancelToken:v,timeout:T,onDownloadProgress:R,onUploadProgress:I,responseType:M,headers:O,withCredentials:$="same-origin",fetchOptions:B}=ta(y),Y=t||fetch;M=M?(M+"").toLowerCase():"text";let de=nl([_,v&&v.toAbortSignal()],T),G=null;const ie=de&&de.unsubscribe&&(()=>{de.unsubscribe()});let Me;try{if(I&&u&&j!=="get"&&j!=="head"&&(Me=await x(O,C))!==0){let E=new n(b,{method:"POST",body:C,duplex:"half"}),D;if(k.isFormData(C)&&(D=E.headers.get("content-type"))&&O.setContentType(D),E.body){const[le,ae]=zr(Me,vn($r(I)));C=Vr(E.body,Wr,le,ae)}}k.isString($)||($=$?"include":"omit");const me=i&&"credentials"in n.prototype,Q={...B,signal:de,method:j.toUpperCase(),headers:O.normalize().toJSON(),body:C,duplex:"half",credentials:me?$:void 0};G=i&&new n(b,Q);let V=await(i?Y(G,B):Y(b,Q));const se=f&&(M==="stream"||M==="response");if(f&&(R||se&&ie)){const E={};["status","statusText","headers"].forEach(z=>{E[z]=V[z]});const D=k.toFiniteNumber(V.headers.get("content-length")),[le,ae]=R&&zr(D,vn($r(R),!0))||[];V=new r(Vr(V.body,Wr,le,()=>{ae&&ae(),ie&&ie()}),E)}M=M||"text";let H=await h[k.findKey(h,M)||"text"](V,y);return!se&&ie&&ie(),await new Promise((E,D)=>{Qs(E,D,{data:H,headers:lt.from(V.headers),status:V.status,statusText:V.statusText,config:y,request:G})})}catch(me){throw ie&&ie(),me&&me.name==="TypeError"&&/Load failed|fetch/i.test(me.message)?Object.assign(new ee("Network Error",ee.ERR_NETWORK,y,G),{cause:me.cause||me}):ee.from(me,me&&me.code,y,G)}}},ll=new Map,na=e=>{let t=e&&e.env||{};const{fetch:n,Request:r,Response:s}=t,i=[r,s,n];let o=i.length,l=o,c,u,f=ll;for(;l--;)c=i[l],u=f.get(c),u===void 0&&f.set(c,u=l?new Map:il(t)),f=u;return u};na();const _r={http:Ci,xhr:tl,fetch:{get:na}};k.forEach(_r,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Jr=e=>`- ${e}`,cl=e=>k.isFunction(e)||e===null||e===!1;function dl(e,t){e=k.isArray(e)?e:[e];const{length:n}=e;let r,s;const i={};for(let o=0;o<n;o++){r=e[o];let l;if(s=r,!cl(r)&&(s=_r[(l=String(r)).toLowerCase()],s===void 0))throw new ee(`Unknown adapter '${l}'`);if(s&&(k.isFunction(s)||(s=s.get(t))))break;i[l||"#"+o]=s}if(!s){const o=Object.entries(i).map(([c,u])=>`adapter ${c} `+(u===!1?"is not supported by the environment":"is not available in the build"));let l=n?o.length>1?`since :
`+o.map(Jr).join(`
`):" "+Jr(o[0]):"as no adapter specified";throw new ee("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return s}const ra={getAdapter:dl,adapters:_r};function Fn(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new qt(null,e)}function Xr(e){return Fn(e),e.headers=lt.from(e.headers),e.data=Un.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),ra.getAdapter(e.adapter||rn.adapter,e)(e).then(function(r){return Fn(e),r.data=Un.call(e,e.transformResponse,r),r.headers=lt.from(r.headers),r},function(r){return Zs(r)||(Fn(e),r&&r.response&&(r.response.data=Un.call(e,e.transformResponse,r.response),r.response.headers=lt.from(r.response.headers))),Promise.reject(r)})}const sa="1.13.2",In={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{In[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const Kr={};In.transitional=function(t,n,r){function s(i,o){return"[Axios v"+sa+"] Transitional option '"+i+"'"+o+(r?". "+r:"")}return(i,o,l)=>{if(t===!1)throw new ee(s(o," has been removed"+(n?" in "+n:"")),ee.ERR_DEPRECATED);return n&&!Kr[o]&&(Kr[o]=!0,console.warn(s(o," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(i,o,l):!0}};In.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function ul(e,t,n){if(typeof e!="object")throw new ee("options must be an object",ee.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const i=r[s],o=t[i];if(o){const l=e[i],c=l===void 0||o(l,i,e);if(c!==!0)throw new ee("option "+i+" must be "+c,ee.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new ee("Unknown option "+i,ee.ERR_BAD_OPTION)}}const pn={assertOptions:ul,validators:In},ft=pn.validators;let At=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Ur,response:new Ur}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const i=s.stack?s.stack.replace(/^.+\n/,""):"";try{r.stack?i&&!String(r.stack).endsWith(i.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+i):r.stack=i}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=Dt(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:i}=n;r!==void 0&&pn.assertOptions(r,{silentJSONParsing:ft.transitional(ft.boolean),forcedJSONParsing:ft.transitional(ft.boolean),clarifyTimeoutError:ft.transitional(ft.boolean)},!1),s!=null&&(k.isFunction(s)?n.paramsSerializer={serialize:s}:pn.assertOptions(s,{encode:ft.function,serialize:ft.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),pn.assertOptions(n,{baseUrl:ft.spelling("baseURL"),withXsrfToken:ft.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=i&&k.merge(i.common,i[n.method]);i&&k.forEach(["delete","get","head","post","put","patch","common"],y=>{delete i[y]}),n.headers=lt.concat(o,i);const l=[];let c=!0;this.interceptors.request.forEach(function(b){typeof b.runWhen=="function"&&b.runWhen(n)===!1||(c=c&&b.synchronous,l.unshift(b.fulfilled,b.rejected))});const u=[];this.interceptors.response.forEach(function(b){u.push(b.fulfilled,b.rejected)});let f,h=0,g;if(!c){const y=[Xr.bind(this),void 0];for(y.unshift(...l),y.push(...u),g=y.length,f=Promise.resolve(n);h<g;)f=f.then(y[h++],y[h++]);return f}g=l.length;let x=n;for(;h<g;){const y=l[h++],b=l[h++];try{x=y(x)}catch(j){b.call(this,j);break}}try{f=Xr.call(this,x)}catch(y){return Promise.reject(y)}for(h=0,g=u.length;h<g;)f=f.then(u[h++],u[h++]);return f}getUri(t){t=Dt(this.defaults,t);const n=ea(t.baseURL,t.url,t.allowAbsoluteUrls);return Js(n,t.params,t.paramsSerializer)}};k.forEach(["delete","get","head","options"],function(t){At.prototype[t]=function(n,r){return this.request(Dt(r||{},{method:t,url:n,data:(r||{}).data}))}});k.forEach(["post","put","patch"],function(t){function n(r){return function(i,o,l){return this.request(Dt(l||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:i,data:o}))}}At.prototype[t]=n(),At.prototype[t+"Form"]=n(!0)});let fl=class aa{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const r=this;this.promise.then(s=>{if(!r._listeners)return;let i=r._listeners.length;for(;i-- >0;)r._listeners[i](s);r._listeners=null}),this.promise.then=s=>{let i;const o=new Promise(l=>{r.subscribe(l),i=l}).then(s);return o.cancel=function(){r.unsubscribe(i)},o},t(function(i,o,l){r.reason||(r.reason=new qt(i,o,l),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new aa(function(s){t=s}),cancel:t}}};function hl(e){return function(n){return e.apply(null,n)}}function ml(e){return k.isObject(e)&&e.isAxiosError===!0}const tr={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(tr).forEach(([e,t])=>{tr[t]=e});function oa(e){const t=new At(e),n=Bs(At.prototype.request,t);return k.extend(n,At.prototype,t,{allOwnKeys:!0}),k.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return oa(Dt(e,s))},n}const He=oa(rn);He.Axios=At;He.CanceledError=qt;He.CancelToken=fl;He.isCancel=Zs;He.VERSION=sa;He.toFormData=Pn;He.AxiosError=ee;He.Cancel=He.CanceledError;He.all=function(t){return Promise.all(t)};He.spread=hl;He.isAxiosError=ml;He.mergeConfig=Dt;He.AxiosHeaders=lt;He.formToJSON=e=>Ks(k.isHTMLForm(e)?new FormData(e):e);He.getAdapter=ra.getAdapter;He.HttpStatusCode=tr;He.default=He;const{Axios:_u,AxiosError:xu,CanceledError:wu,isCancel:vu,CancelToken:Su,VERSION:ju,all:Cu,Cancel:ku,isAxiosError:Nu,spread:Eu,toFormData:Tu,AxiosHeaders:Ru,HttpStatusCode:Mu,formToJSON:Pu,getAdapter:Iu,mergeConfig:Au}=He,pl="http://localhost:5050".trim()||"http://localhost:5050",zn=pl.replace(/\/$/,""),gl=zn.endsWith("/api")?zn:`${zn}/api`,be=He.create({baseURL:gl,withCredentials:!0});let yl={data:""},bl=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||yl},_l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,xl=/\/\*[^]*?\*\/|  +/g,Zr=/\n+/g,xt=(e,t)=>{let n="",r="",s="";for(let i in e){let o=e[i];i[0]=="@"?i[1]=="i"?n=i+" "+o+";":r+=i[1]=="f"?xt(o,i):i+"{"+xt(o,i[1]=="k"?"":t)+"}":typeof o=="object"?r+=xt(o,t?t.replace(/([^,])+/g,l=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,l):l?l+" "+c:c)):i):o!=null&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=xt.p?xt.p(i,o):i+":"+o+";")}return n+(t&&s?t+"{"+s+"}":s)+r},yt={},ia=e=>{if(typeof e=="object"){let t="";for(let n in e)t+=n+ia(e[n]);return t}return e},wl=(e,t,n,r,s)=>{let i=ia(e),o=yt[i]||(yt[i]=(c=>{let u=0,f=11;for(;u<c.length;)f=101*f+c.charCodeAt(u++)>>>0;return"go"+f})(i));if(!yt[o]){let c=i!==e?e:(u=>{let f,h,g=[{}];for(;f=_l.exec(u.replace(xl,""));)f[4]?g.shift():f[3]?(h=f[3].replace(Zr," ").trim(),g.unshift(g[0][h]=g[0][h]||{})):g[0][f[1]]=f[2].replace(Zr," ").trim();return g[0]})(e);yt[o]=xt(s?{["@keyframes "+o]:c}:c,n?"":"."+o)}let l=n&&yt.g?yt.g:null;return n&&(yt.g=yt[o]),((c,u,f,h)=>{h?u.data=u.data.replace(h,c):u.data.indexOf(c)===-1&&(u.data=f?c+u.data:u.data+c)})(yt[o],t,r,l),o},vl=(e,t,n)=>e.reduce((r,s,i)=>{let o=t[i];if(o&&o.call){let l=o(n),c=l&&l.props&&l.props.className||/^go/.test(l)&&l;o=c?"."+c:l&&typeof l=="object"?l.props?"":xt(l,""):l===!1?"":l}return r+s+(o??"")},"");function An(e){let t=this||{},n=e.call?e(t.p):e;return wl(n.unshift?n.raw?vl(n,[].slice.call(arguments,1),t.p):n.reduce((r,s)=>Object.assign(r,s&&s.call?s(t.p):s),{}):n,bl(t.target),t.g,t.o,t.k)}let la,nr,rr;An.bind({g:1});let bt=An.bind({k:1});function Sl(e,t,n,r){xt.p=t,la=e,nr=n,rr=r}function Et(e,t){let n=this||{};return function(){let r=arguments;function s(i,o){let l=Object.assign({},i),c=l.className||s.className;n.p=Object.assign({theme:nr&&nr()},l),n.o=/ *go\d+/.test(c),l.className=An.apply(n,r)+(c?" "+c:"");let u=e;return e[0]&&(u=l.as||e,delete l.as),rr&&u[0]&&rr(l),la(u,l)}return s}}var jl=e=>typeof e=="function",Sn=(e,t)=>jl(e)?e(t):e,Cl=(()=>{let e=0;return()=>(++e).toString()})(),ca=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),kl=20,xr="default",da=(e,t)=>{let{toastLimit:n}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(o=>o.id===t.toast.id?{...o,...t.toast}:o)};case 2:let{toast:r}=t;return da(e,{type:e.toasts.find(o=>o.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(o=>o.id===s||s===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(o=>o.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+i}))}}},gn=[],ua={toasts:[],pausedAt:void 0,settings:{toastLimit:kl}},mt={},fa=(e,t=xr)=>{mt[t]=da(mt[t]||ua,e),gn.forEach(([n,r])=>{n===t&&r(mt[t])})},ha=e=>Object.keys(mt).forEach(t=>fa(e,t)),Nl=e=>Object.keys(mt).find(t=>mt[t].toasts.some(n=>n.id===e)),On=(e=xr)=>t=>{fa(t,e)},El={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Tl=(e={},t=xr)=>{let[n,r]=d.useState(mt[t]||ua),s=d.useRef(mt[t]);d.useEffect(()=>(s.current!==mt[t]&&r(mt[t]),gn.push([t,r]),()=>{let o=gn.findIndex(([l])=>l===t);o>-1&&gn.splice(o,1)}),[t]);let i=n.toasts.map(o=>{var l,c,u;return{...e,...e[o.type],...o,removeDelay:o.removeDelay||((l=e[o.type])==null?void 0:l.removeDelay)||(e==null?void 0:e.removeDelay),duration:o.duration||((c=e[o.type])==null?void 0:c.duration)||(e==null?void 0:e.duration)||El[o.type],style:{...e.style,...(u=e[o.type])==null?void 0:u.style,...o.style}}});return{...n,toasts:i}},Rl=(e,t="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(n==null?void 0:n.id)||Cl()}),sn=e=>(t,n)=>{let r=Rl(t,e,n);return On(r.toasterId||Nl(r.id))({type:2,toast:r}),r.id},Ge=(e,t)=>sn("blank")(e,t);Ge.error=sn("error");Ge.success=sn("success");Ge.loading=sn("loading");Ge.custom=sn("custom");Ge.dismiss=(e,t)=>{let n={type:3,toastId:e};t?On(t)(n):ha(n)};Ge.dismissAll=e=>Ge.dismiss(void 0,e);Ge.remove=(e,t)=>{let n={type:4,toastId:e};t?On(t)(n):ha(n)};Ge.removeAll=e=>Ge.remove(void 0,e);Ge.promise=(e,t,n)=>{let r=Ge.loading(t.loading,{...n,...n==null?void 0:n.loading});return typeof e=="function"&&(e=e()),e.then(s=>{let i=t.success?Sn(t.success,s):void 0;return i?Ge.success(i,{id:r,...n,...n==null?void 0:n.success}):Ge.dismiss(r),s}).catch(s=>{let i=t.error?Sn(t.error,s):void 0;i?Ge.error(i,{id:r,...n,...n==null?void 0:n.error}):Ge.dismiss(r)}),e};var Ml=1e3,Pl=(e,t="default")=>{let{toasts:n,pausedAt:r}=Tl(e,t),s=d.useRef(new Map).current,i=d.useCallback((h,g=Ml)=>{if(s.has(h))return;let x=setTimeout(()=>{s.delete(h),o({type:4,toastId:h})},g);s.set(h,x)},[]);d.useEffect(()=>{if(r)return;let h=Date.now(),g=n.map(x=>{if(x.duration===1/0)return;let y=(x.duration||0)+x.pauseDuration-(h-x.createdAt);if(y<0){x.visible&&Ge.dismiss(x.id);return}return setTimeout(()=>Ge.dismiss(x.id,t),y)});return()=>{g.forEach(x=>x&&clearTimeout(x))}},[n,r,t]);let o=d.useCallback(On(t),[t]),l=d.useCallback(()=>{o({type:5,time:Date.now()})},[o]),c=d.useCallback((h,g)=>{o({type:1,toast:{id:h,height:g}})},[o]),u=d.useCallback(()=>{r&&o({type:6,time:Date.now()})},[r,o]),f=d.useCallback((h,g)=>{let{reverseOrder:x=!1,gutter:y=8,defaultPosition:b}=g||{},j=n.filter(v=>(v.position||b)===(h.position||b)&&v.height),C=j.findIndex(v=>v.id===h.id),_=j.filter((v,T)=>T<C&&v.visible).length;return j.filter(v=>v.visible).slice(...x?[_+1]:[0,_]).reduce((v,T)=>v+(T.height||0)+y,0)},[n]);return d.useEffect(()=>{n.forEach(h=>{if(h.dismissed)i(h.id,h.removeDelay);else{let g=s.get(h.id);g&&(clearTimeout(g),s.delete(h.id))}})},[n,i]),{toasts:n,handlers:{updateHeight:c,startPause:l,endPause:u,calculateOffset:f}}},Il=bt`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Al=bt`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ol=bt`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Dl=Et("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Il} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Al} 0.15s ease-out forwards;
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
    animation: ${Ol} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Bl=bt`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Ll=Et("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Bl} 1s linear infinite;
`,Ul=bt`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Fl=bt`
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
}`,zl=Et("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ul} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Fl} 0.2s ease-out forwards;
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
`,$l=Et("div")`
  position: absolute;
`,Hl=Et("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Vl=bt`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Wl=Et("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Vl} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ql=({toast:e})=>{let{icon:t,type:n,iconTheme:r}=e;return t!==void 0?typeof t=="string"?d.createElement(Wl,null,t):t:n==="blank"?null:d.createElement(Hl,null,d.createElement(Ll,{...r}),n!=="loading"&&d.createElement($l,null,n==="error"?d.createElement(Dl,{...r}):d.createElement(zl,{...r})))},Yl=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Gl=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Jl="0%{opacity:0;} 100%{opacity:1;}",Xl="0%{opacity:1;} 100%{opacity:0;}",Kl=Et("div")`
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
`,Zl=Et("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ql=(e,t)=>{let n=e.includes("top")?1:-1,[r,s]=ca()?[Jl,Xl]:[Yl(n),Gl(n)];return{animation:t?`${bt(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${bt(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ec=d.memo(({toast:e,position:t,style:n,children:r})=>{let s=e.height?Ql(e.position||t||"top-center",e.visible):{opacity:0},i=d.createElement(ql,{toast:e}),o=d.createElement(Zl,{...e.ariaProps},Sn(e.message,e));return d.createElement(Kl,{className:e.className,style:{...s,...n,...e.style}},typeof r=="function"?r({icon:i,message:o}):d.createElement(d.Fragment,null,i,o))});Sl(d.createElement);var tc=({id:e,className:t,style:n,onHeightUpdate:r,children:s})=>{let i=d.useCallback(o=>{if(o){let l=()=>{let c=o.getBoundingClientRect().height;r(e,c)};l(),new MutationObserver(l).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return d.createElement("div",{ref:i,className:t,style:n},s)},nc=(e,t)=>{let n=e.includes("top"),r=n?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:ca()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(n?1:-1)}px)`,...r,...s}},rc=An`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ln=16,sc=({reverseOrder:e,position:t="top-center",toastOptions:n,gutter:r,children:s,toasterId:i,containerStyle:o,containerClassName:l})=>{let{toasts:c,handlers:u}=Pl(n,i);return d.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:ln,left:ln,right:ln,bottom:ln,pointerEvents:"none",...o},className:l,onMouseEnter:u.startPause,onMouseLeave:u.endPause},c.map(f=>{let h=f.position||t,g=u.calculateOffset(f,{reverseOrder:e,gutter:r,defaultPosition:t}),x=nc(h,g);return d.createElement(tc,{id:f.id,key:f.id,onHeightUpdate:u.updateHeight,className:f.visible?rc:"",style:x},f.type==="custom"?Sn(f.message,f):s?s(f):d.createElement(ec,{toast:f,position:h}))}))},re=Ge;const Z=Qt((e,t)=>({notes:[],loading:!1,isNotesOpen:!1,isDrawingOpen:!1,isVideoPanelOpen:!1,panelMinimized:!1,videoPanelWidth:280,pendingYoutubeUrl:null,drawingUserIdByChat:{},videoUserIdByChat:{},watchPartyYoutubeUrlByChat:{},watchPartyLocalVideoUrlByChat:{},watchPartyResumeByChat:{},watchPartyClearedByOtherByChat:{},pendingDrawingCanvasByChat:{},noteIds:new Set,setIsNotesOpen:n=>e({isNotesOpen:n,panelMinimized:n?!1:t().panelMinimized}),setIsDrawingOpen:n=>e({isDrawingOpen:n,panelMinimized:n?!1:t().panelMinimized}),setIsVideoPanelOpen:n=>e({isVideoPanelOpen:n,panelMinimized:n?!1:t().panelMinimized}),setPanelMinimized:n=>e({panelMinimized:!!n}),setVideoPanelWidth:n=>e({videoPanelWidth:Math.min(600,Math.max(240,n))}),setPendingYoutubeUrl:n=>e({pendingYoutubeUrl:n}),setDrawingInChat:(n,r)=>e(s=>{const i=n!=null?String(n):null;if(!i)return s;const o={...s.drawingUserIdByChat};return r==null?delete o[i]:o[i]=r!=null?String(r):r,{drawingUserIdByChat:o}}),setVideoInChat:(n,r)=>e(s=>{const i=n!=null?String(n):null;if(!i)return s;const o={...s.videoUserIdByChat};return r==null?delete o[i]:o[i]=r!=null?String(r):r,{videoUserIdByChat:o}}),setWatchPartyYoutubeUrl:(n,r)=>e(s=>{const i=n!=null?String(n):null;if(!i)return s;const o={...s.watchPartyYoutubeUrlByChat};return r==null||r===""?delete o[i]:o[i]=r,{watchPartyYoutubeUrlByChat:o}}),setWatchPartyLocalVideoUrl:(n,r)=>e(s=>{const i=n!=null?String(n):null;if(!i)return s;const o={...s.watchPartyLocalVideoUrlByChat};return r==null||r===""?delete o[i]:o[i]=r,{watchPartyLocalVideoUrlByChat:o}}),setWatchPartyResume:(n,r,s,i)=>e(o=>{const l=n!=null?String(n):null;if(!l||r!=="youtube"&&r!=="local")return o;const c={...o.watchPartyResumeByChat},u=c[l]??{};return c[l]={...u,[r]:{currentTime:typeof s=="number"&&s>=0?s:0,isPaused:!!i}},{watchPartyResumeByChat:c}}),setWatchPartyClearedByOther:(n,r)=>e(s=>{const i=n!=null?String(n):null;if(!i)return s;const o={...s.watchPartyClearedByOtherByChat};return r?o[i]=!0:delete o[i],{watchPartyClearedByOtherByChat:o}}),setPendingDrawingCanvas:(n,r)=>e(s=>{const i=n!=null?String(n):null;return i?{pendingDrawingCanvasByChat:{...s.pendingDrawingCanvasByChat,[i]:r}}:s}),clearPendingDrawingCanvas:n=>e(r=>{const s=n!=null?String(n):null;if(!s)return r;const i={...r.pendingDrawingCanvasByChat};return delete i[s],{pendingDrawingCanvasByChat:i}}),fetchNotes:async n=>{try{e({loading:!0});const r=await be.get(`/notes/${n}`),s=new Set(r.data.map(i=>i.messageId));e({notes:r.data.sort((i,o)=>new Date(i.messageCreatedAt)-new Date(o.messageCreatedAt)),noteIds:s,loading:!1})}catch(r){console.error("fetchNotes error:",r),e({loading:!1})}},toggleNote:async({chatId:n,messageId:r})=>{var s,i;try{const o=await be.post("/notes/toggle",{chatId:n,messageId:r}),l=t().notes,c=new Set(t().noteIds);o.data.saved?(c.add(r),e({notes:[...l,o.data.note],noteIds:c})):(c.delete(r),e({notes:l.filter(u=>u.messageId!==r),noteIds:c}))}catch(o){console.error("toggleNote error:",o);const l=(i=(s=o.response)==null?void 0:s.data)==null?void 0:i.message;l&&re.error(l)}},isNote:n=>t().noteIds.has(n),removeNoteByMessageId:async n=>{const r=typeof n=="object"&&(n!=null&&n.toString)?n.toString():String(n),s=t().notes.find(i=>String(i.messageId)===r);if(!s){e(i=>{const o=i.notes.filter(c=>String(c.messageId)!==r),l=new Set(i.noteIds);return l.delete(r),{notes:o,noteIds:l}});return}try{await be.delete(`/notes/${s._id}`)}catch(i){console.error("removeNoteByMessageId API error:",i)}e(i=>{const o=i.notes.filter(c=>String(c.messageId)!==r),l=new Set(i.noteIds);return l.delete(r),{notes:o,noteIds:l}})}})),Ce=Qt(e=>({isTruthDareOpen:!1,panelMinimized:!1,currentGameName:null,gamePlayingNotification:null,gamePlayingUserIdByChat:{},gamePlayingGameNameByChat:{},openToGameIndex:null,setTruthDareOpen:t=>e(n=>({isTruthDareOpen:!!t,panelMinimized:t?!1:n.panelMinimized})),setPanelMinimized:t=>e({panelMinimized:!!t}),setOpenToGameIndex:t=>e({openToGameIndex:t>=0&&t<=2?t:null}),setCurrentGameName:t=>e({currentGameName:t??null}),setGamePlayingNotification:t=>e({gamePlayingNotification:t??null}),setGamePlayingInChat:(t,n,r)=>e(s=>{const i=t!=null?String(t):null;if(!i)return s;const o={...s.gamePlayingUserIdByChat},l={...s.gamePlayingGameNameByChat};return n==null?(delete o[i],delete l[i]):(o[i]=n!=null?String(n):n,l[i]=r??"Truth or Dare"),{gamePlayingUserIdByChat:o,gamePlayingGameNameByChat:l}})})),ac=30,Re=Qt((e,t)=>({messages:[],messagesByChatId:{},users:[],selectedUser:null,isUsersLoading:!1,isMessagesLoading:!1,isMessagesLoadingMore:!1,hasMoreOlderMessages:!1,chats:[],selectedChat:null,lastSeenAtByConversation:{},rejectedChatId:null,unreadCountByChatId:{},isScreenSharing:!1,sendByCodeLoading:!1,isChatsLoading:!1,friendsChats:[],acceptChat:async n=>{await be.post("/conversations/accept",{conversationId:n});const r=await be.get("/conversations/my");e(s=>{const i=r.data,o=i.find(l=>l._id===n);return{chats:i,selectedChat:o??s.selectedChat}}),t().getMyFriends()},rejectChat:async n=>{await be.post("/conversations/reject",{conversationId:n}),e(r=>{var i;const s=((i=r.selectedChat)==null?void 0:i._id)===n;return{chats:r.chats.filter(o=>o._id!==n),selectedChat:s?null:r.selectedChat,selectedUser:s?null:r.selectedUser,messages:s?[]:r.messages}}),re.success("Chat rejected")},removeFriend:async n=>{var r,s,i,o,l;try{const c=n!=null?typeof n=="object"&&(n!=null&&n.toString)?n.toString():String(n):null;if(!c){re.error("Invalid conversation");return}await be.post("/conversations/remove",{conversationId:c});const u=await be.get("/conversations/my");e(f=>{var y,b,j;const h=u.data||[],g=((y=f.selectedChat)==null?void 0:y._id)===c||((b=f.selectedChat)==null?void 0:b._id)===n,x=h.find(C=>String(C._id)===String(c));return{chats:h,selectedChat:g&&x?x:g?null:f.selectedChat,selectedUser:g&&x?((j=x.participants)==null?void 0:j.find(C=>{var _;return C&&String(C._id??C)!==String((_=K.getState().authUser)==null?void 0:_._id)}))??null:g?null:f.selectedUser,messages:g&&!x?[]:f.messages}}),re.success("Friend removed"),t().getMyFriends()}catch(c){const u=((s=(r=c.response)==null?void 0:r.data)==null?void 0:s.message)||c.message||"Failed to remove friend";re.error(u),((i=c.response)==null?void 0:i.status)===404&&!((l=(o=c.response)==null?void 0:o.data)!=null&&l.message)&&console.warn("Remove friend 404: check VITE_BACKEND_URL points to your backend (no /api suffix)")}},getMyChats:async()=>{e({isChatsLoading:!0});try{const r=(await be.get("/conversations/my")).data||[];e(s=>{var o,l,c;const i={chats:r};if((o=s.selectedChat)!=null&&o._id){const u=r.find(f=>String(f._id)===String(s.selectedChat._id));if(u){i.selectedChat=u;const f=(l=K.getState().authUser)==null?void 0:l._id;i.selectedUser=((c=u.participants)==null?void 0:c.find(h=>h&&String(h._id??h)!==String(f)))??s.selectedUser}}return i})}catch{re.error("Failed to load chats")}finally{e({isChatsLoading:!1})}},getMyFriends:async()=>{try{const n=await be.get("/conversations/friends");e({friendsChats:n.data||[]})}catch{re.error("Failed to load friends")}},ensureChatInList:n=>{n!=null&&n._id&&e(r=>r.chats.some(i=>String(i._id)===String(n._id))?r:{chats:[n,...r.chats]})},startScreenShare:()=>{e({isScreenSharing:!0}),K.getState().socket.emit("start_screen_share")},stopScreenShare:()=>{e({isScreenSharing:!1}),K.getState().socket.emit("stop_screen_share")},setSelectedChat:n=>{const r=Z.getState(),s=Ce.getState();return r.setIsNotesOpen(!1),r.setIsDrawingOpen(!1),r.setIsVideoPanelOpen(!1),r.setPanelMinimized(!1),s.setTruthDareOpen(!1),s.setPanelMinimized(!1),e(i=>{var h,g;if(((h=i.selectedChat)==null?void 0:h._id)===(n==null?void 0:n._id))return i;const l=n.participants.find(x=>x._id!==K.getState().authUser._id),c=(n==null?void 0:n._id)!=null?String(n._id):null,u=c&&Array.isArray((g=i.messagesByChatId)==null?void 0:g[c])?i.messagesByChatId[c]:[],f={...i.unreadCountByChatId};return n!=null&&n._id&&delete f[n._id],{selectedChat:n,selectedUser:l,messages:u,unreadCountByChatId:f}})},getUsers:async()=>{e({isUsersLoading:!0});try{const n=await be.get("/messages/users");e({users:n.data})}catch(n){re.error(n.response.data.message)}finally{e({isUsersLoading:!1})}},deleteMessage:async(n,r)=>{try{const s=typeof n=="object"&&(n!=null&&n.toString)?n.toString():n;if(await be.delete(`/messages/delete/${s}?scope=${encodeURIComponent(r)}`,{data:{scope:r}}),Z.getState().removeNoteByMessageId(s),r==="me"){const i=typeof n=="object"&&(n!=null&&n.toString)?n.toString():String(n);e(o=>{var u;const l=o.messages.filter(f=>String(f._id)!==i),c=((u=o.selectedChat)==null?void 0:u._id)!=null?String(o.selectedChat._id):null;return{messages:l,messagesByChatId:c?{...o.messagesByChatId,[c]:l}:o.messagesByChatId}})}}catch(s){console.error(s),re.error("Delete failed")}},getMessagesByConversation:async n=>{var o;if(!n){e({messages:[],hasMoreOlderMessages:!1});return}const r=String(n),s=(o=t().messagesByChatId)==null?void 0:o[r],i=Array.isArray(s)&&s.length>0;e(i?{messages:s,isMessagesLoading:!1}:{isMessagesLoading:!0});try{const c=(await be.get(`/messages/conversation/${n}`,{params:{limit:ac}})).data||{},u=Array.isArray(c)?c:c.messages||[],f=c.hasMore===!0;e(g=>({messages:u,hasMoreOlderMessages:f,isMessagesLoading:!1,messagesByChatId:{...g.messagesByChatId,[r]:u}}));const h=u.length>0?u[u.length-1]:null;e(g=>({chats:g.chats.map(x=>String(x._id)===String(n)?{...x,lastMessage:h}:x)}))}catch{e({isMessagesLoading:!1})}},loadMoreOlderMessages:async n=>{const r=t(),{messages:s,hasMoreOlderMessages:i,isMessagesLoadingMore:o}=r;if(!n||!i||o||!Array.isArray(s)||s.length===0)return;const l=s[0]._id;e({isMessagesLoadingMore:!0});try{const u=(await be.get(`/messages/conversation/${n}`,{params:{limit:50,before:l}})).data||{},f=Array.isArray(u)?[]:u.messages||[],h=u.hasMore===!0;e(g=>({messages:[...f,...g.messages],hasMoreOlderMessages:h,isMessagesLoadingMore:!1,messagesByChatId:{...g.messagesByChatId,[String(n)]:[...f,...g.messages]}}))}catch{e({isMessagesLoadingMore:!1})}},sendMessageByCode:async({userCode:n,text:r})=>{e({sendByCodeLoading:!0});try{const s=await be.post("/messages/send-by-code",{userCode:n,text:r},{withCredentials:!0}),{chat:i}=s.data||{};return i&&(e(o=>({chats:o.chats.some(c=>c._id===i._id)?o.chats.map(c=>c._id===i._id?i:c):[i,...o.chats]})),t().setSelectedChat(i)),s.data}finally{e({sendByCodeLoading:!1})}},sendMessage:async n=>{var s,i;const{selectedUser:r}=t();try{await be.post(`/messages/send/${r._id}`,n,{maxContentLength:50*1024*1024,maxBodyLength:50*1024*1024,timeout:6e4});const o=K.getState().socket;o.emit("join_chat",{chatId:n.conversationId}),n.image||o.emit("send_message",{chatId:n.conversationId,message:n.text}),t().getMyChats()}catch(o){console.error("Send failed:",o),re.error(((i=(s=o.response)==null?void 0:s.data)==null?void 0:i.message)||"Failed to send message")}},markMessageRevealed:n=>e(r=>{var o;const s=r.messages.map(l=>l._id===n?{...l,revealed:!0}:l),i=((o=r.selectedChat)==null?void 0:o._id)!=null?String(r.selectedChat._id):null;return{messages:s,messagesByChatId:i?{...r.messagesByChatId,[i]:s}:r.messagesByChatId}}),subscribeToMessages:()=>{const n=K.getState().socket;n&&(n.off("messagesSeen"),n.off("messageSeen"),n.off("newMessage"),n.off("newChatMessage"),n.off("messageDeletedForEveryone"),n.off("message-revealed"),n.off("chat_seen_update"),n.on("chat_seen_update",({chatId:r,seenAt:s})=>{var o;const i=(o=K.getState().authUser)==null?void 0:o._id;e(l=>({messages:l.messages.map(c=>String(c.chatId)===String(r)&&String(c.senderId)===String(i)?{...c,seen:!0,seenAt:s}:c)}))}),n.on("messageSeen",({messageId:r,seenAt:s})=>{e(i=>({messages:i.messages.map(o=>String(o._id)===String(r)?{...o,seen:!0,seenAt:s}:o)}))}),n.on("new_message",r=>{var o;const s=r.message??r,i=(o=K.getState().authUser)==null?void 0:o._id;if(e(l=>{const c=l.selectedChat&&String(l.selectedChat._id)===String(s.chatId),u=s.senderId&&String(s.senderId)!==String(i),f=s.receiverId&&String(s.receiverId)===String(i),h={...l.unreadCountByChatId};if(f&&u&&!c&&s.chatId){const y=String(s.chatId);h[y]=(h[y]??0)+1}const g=s.chatId!=null?String(s.chatId):null;let x=l.chats;if(g){const y=l.chats.find(j=>String(j._id)===g),b=y?{...y,lastMessage:s,updatedAt:s.createdAt||y.updatedAt}:null;b&&(x=[b,...l.chats.filter(j=>String(j._id)!==g)])}return{messages:c?[...l.messages,s]:l.messages,unreadCountByChatId:h,chats:x,messagesByChatId:c&&s.chatId?{...l.messagesByChatId,[String(s.chatId)]:[...l.messages,s]}:l.messagesByChatId}}),typeof document<"u"&&document.visibilityState==="visible"&&s.chatId&&i&&String(s.receiverId)===String(i)){const l=t();l.selectedChat&&String(l.selectedChat._id)===String(s.chatId)&&n.emit("chat_opened",{chatId:s.chatId,userId:i})}}),n.on("messageDeletedForEveryone",({messageId:r,deletedBy:s})=>{Z.getState().removeNoteByMessageId(r),e(i=>({messages:i.messages.map(o=>o._id===r?{...o,deleted:!0,deletedBy:s,text:""}:o)}))}))},markChatSeen:(n,r)=>e(s=>({messages:s.messages.map(i=>String(i.chatId)===String(n)?{...i,seen:!0,seenAt:r}:i)})),subscribeToChatEvents:()=>{const n=K.getState().socket;n&&(n.off("newChatMessage"),n.on("chatRejected",({conversationId:r})=>{const{selectedChat:s}=t();if(s&&String(s._id)===String(r)){e({rejectedChatId:r}),setTimeout(()=>{e(o=>({chats:o.chats.filter(l=>String(l._id)!==String(r)),selectedChat:null,selectedUser:null,messages:[],rejectedChatId:null}))},2500);return}e(o=>({chats:o.chats.filter(l=>l._id!==r),selectedChat:o.selectedChat,messages:o.messages,selectedUser:o.selectedUser}))}),n.on("chatUnaccepted",()=>{t().getMyChats(),t().getMyFriends()}),n.on("chatAccepted",()=>{t().getMyChats(),t().getMyFriends()}),n.on("ai_private_reply",r=>{e(s=>({messages:[...s.messages,r]}))}),n.on("newChatMessage",({chat:r,message:s})=>{var o;const i=(o=K.getState().authUser)==null?void 0:o._id;e(l=>{const c=l.chats.some(g=>g._id===r._id),u=l.selectedChat&&String(l.selectedChat._id)===String(r._id),f=(s==null?void 0:s.senderId)&&String(s.senderId)!==String(i),h={...l.unreadCountByChatId};if(s&&f&&!u&&r._id){const g=String(r._id);h[g]=(h[g]??0)+1}return{chats:c?l.chats.map(g=>g._id===r._id?r:g):[r,...l.chats],unreadCountByChatId:h}})}))},setSelectedUser:n=>e({selectedUser:n}),clearSelectedChat:()=>e({selectedChat:null,selectedUser:null,messages:[]}),clearMessagesForCurrentChat:async()=>{var o;const n=t(),r=[...n.messages||[]],s=((o=n.selectedChat)==null?void 0:o._id)!=null?String(n.selectedChat._id):null;e({messages:[],chats:s?n.chats.map(l=>String(l._id)===s?{...l,lastMessage:null}:l):n.chats});let i=0;for(const l of r)try{const c=l._id!=null?String(l._id):l._id;if(!c)continue;await be.delete(`/messages/delete/${c}?scope=me`,{data:{scope:"me"}}),Z.getState().removeNoteByMessageId(c)}catch{i+=1}i===0&&(re.success("Conversation cleared for you. The other person can still see the messages."),e(l=>({chats:s?l.chats.filter(c=>String(c._id)!==s):l.chats,selectedChat:null,selectedUser:null,messages:[]})))}})),ht={pageBg:"#ffffff",appBg:"#ffffff",panelBg:"#ffffff",primary:"#2563eb",secondary:"#e5e7eb",accent:"#ec4899",accentDark:"#be185d",darkBg:"#000000",textPrimary:"#111827",textSecondary:"#6b7280",chatBg:"#f4f4f5",bubbleMine:"#2563eb",bubbleOther:"#d1d5db",inputBg:"#f8f9fb",deleteBtnBg:"#dc2626",dangerZoneBg:"#fef2f2",chatListItemHoverBg:"#f1f5f9",chatListItemSelectedBg:"#fce7f3",chatListItemSelectedBorder:"transparent",surfaceBorder:"#e2e8f0",contentBorder:"#000000",surfaceBorderOnDark:"transparent",panelDivider:"#e2e8f0",noteMineBg:"#ec4899",profileCardBorder:"#e2e8f0",profileAvatarRing:"rgba(255,255,255,0.9)",profileDecorativeBorder:"#ffffff"},oc={...ht,pageBg:"#0a0a0a",chatBg:"#0a0a0a",darkBg:"#0d0d0d",appBg:"#111111",panelBg:"#141414",inputBg:"#1a1a1a",dangerZoneBg:"#141414",chatListItemHoverBg:"#1e1e1e",chatListItemSelectedBg:"#262626",chatListItemSelectedBorder:"#404040",surfaceBorder:"#404040",contentBorder:"transparent",surfaceBorderOnDark:"#525252",panelDivider:"transparent",noteMineBg:ht.noteMineBg,profileCardBorder:"transparent",profileAvatarRing:"transparent",profileDecorativeBorder:"transparent",textPrimary:"#e5e5e5",textSecondary:"#a1a1aa",bubbleMine:"#2563eb",bubbleOther:"#404040",deleteBtnBg:"#171717"},Pt="blah-blah-theme",sr="blah-blah-theme-before-reset";let $n=null,Qr="";const es=()=>{try{const e=localStorage.getItem(Pt);if(e){const t=JSON.parse(e);return{...ht,...t}}}catch{}return ht},ts=()=>{try{const e=localStorage.getItem(sr);if(e)return JSON.parse(e)}catch{}return null},cn=e=>{if(!e)return;const t=JSON.stringify(e);t!==Qr&&($n&&clearTimeout($n),$n=setTimeout(async()=>{try{await be.put("/auth/update-profile",{theme:e}),Qr=t}catch{}},350))},pt=Qt((e,t)=>({theme:es(),draftTheme:null,initDraft:()=>{const{theme:n}=t();e({draftTheme:n?{...n}:null})},resetDraft:()=>{const{theme:n}=t();try{n&&localStorage.setItem(sr,JSON.stringify(n))}catch{}e({draftTheme:{...ht}})},setThemeValue:(n,r)=>e(s=>{const i={...s.theme,[n]:r};try{localStorage.setItem(Pt,JSON.stringify(i))}catch{}return cn(i),{theme:i}}),setDraftValue:(n,r)=>e(s=>s.draftTheme?{draftTheme:{...s.draftTheme,[n]:r}}:s),saveDraft:()=>{const{draftTheme:n}=t();if(n){try{localStorage.setItem(Pt,JSON.stringify(n))}catch{}e({theme:n}),cn(n)}},initDraftFromSaved:()=>{const n=es();e({draftTheme:n?{...n}:null})},undoReset:()=>{const n=ts();if(!n)return!1;try{localStorage.setItem(Pt,JSON.stringify(n)),localStorage.removeItem(sr)}catch{return!1}return e({theme:n,draftTheme:{...n}}),!0},hasResetBackup:()=>!!ts(),resetToDefault:()=>{try{localStorage.setItem(Pt,JSON.stringify(ht))}catch{}const n={...ht};e({theme:n}),cn(n)},applyPreset:n=>{const r=n==="dark"?{...oc}:{...ht};try{localStorage.setItem(Pt,JSON.stringify(r))}catch{}e({theme:r}),cn(r)},hydrateFromAccountTheme:n=>{const r=n?{...ht,...n}:{...ht};try{localStorage.setItem(Pt,JSON.stringify(r))}catch{}e({theme:r})}}));function Hn(){Z.getState().setIsNotesOpen(!1),Ce.getState().setTruthDareOpen(!1),Re.getState().clearSelectedChat()}function ic(){var n;if(typeof window>"u"||!((n=window.history)!=null&&n.replaceState))return;const e=new URL(window.location.href);let t=!1;for(const r of["token","access_token"])e.searchParams.has(r)&&(e.searchParams.delete(r),t=!0);if(e.hash){const r=new URLSearchParams(e.hash.replace(/^#/,""));for(const i of["token","access_token"])r.has(i)&&(r.delete(i),t=!0);const s=r.toString()?`#${r.toString()}`:"";e.hash!==s&&(e.hash=s,t=!0)}t&&window.history.replaceState(null,"",e.pathname+e.search+e.hash)}const K=Qt((e,t)=>({authUser:null,token:localStorage.getItem("token"),isSigningUp:!1,isLoggingIn:!1,isUpdatingProfile:!1,isCheckingAuth:!0,onlineUsers:[],socket:null,checkAuth:async()=>{ic();try{const n=localStorage.getItem("token");n&&(be.defaults.headers.common.Authorization=`Bearer ${n}`);const r=await be.get("/auth/check",{withCredentials:!0});e({authUser:r.data}),pt.getState().hydrateFromAccountTheme(r.data.theme),Hn(),t().connectSocket()}catch(n){console.log("Error in checkAuth:",n),e({authUser:null})}finally{e({isCheckingAuth:!1})}},signup:async n=>{var r,s;e({isSigningUp:!0});try{const i=await be.post("/auth/signup",n),{user:o,token:l}=i.data;localStorage.setItem("token",l),be.defaults.headers.common.Authorization=`Bearer ${l}`,e({authUser:o,token:l}),pt.getState().hydrateFromAccountTheme(o.theme),Hn(),re.success("Account created successfully"),t().connectSocket()}catch(i){re.error(((s=(r=i.response)==null?void 0:r.data)==null?void 0:s.message)||"Signup failed")}finally{e({isSigningUp:!1})}},login:async n=>{var r,s;e({isLoggingIn:!0});try{const i=await be.post("/auth/login",n),{user:o,token:l}=i.data;localStorage.setItem("token",l),be.defaults.headers.common.Authorization=`Bearer ${l}`,e({authUser:o,token:l}),pt.getState().hydrateFromAccountTheme(o.theme),Hn(),re.success("Logged in successfully"),t().connectSocket()}catch(i){re.error(((s=(r=i.response)==null?void 0:r.data)==null?void 0:s.message)||"Login failed")}finally{e({isLoggingIn:!1})}},logout:async()=>{var n,r;try{await be.post("/auth/logout"),localStorage.removeItem("token"),delete be.defaults.headers.common.Authorization,e({authUser:null,token:null}),re.success("Logged out successfully");const s=t().socket;s==null||s.off(),s==null||s.disconnect(),e({messages:[],chats:[],selectedChat:null,selectedUser:null}),t().disconnectSocket()}catch(s){re.error(((r=(n=s.response)==null?void 0:n.data)==null?void 0:r.message)||"Logout failed")}},deleteAccount:async()=>{var n,r;try{await be.post("/auth/delete-account",{},{withCredentials:!0}),localStorage.removeItem("token"),delete be.defaults.headers.common.Authorization,e({authUser:null,token:null});const s=t().socket;s==null||s.off(),s==null||s.disconnect(),t().disconnectSocket(),re.success("Account deleted")}catch(s){throw re.error(((r=(n=s.response)==null?void 0:n.data)==null?void 0:r.message)||"Failed to delete account"),s}},updateProfile:async n=>{var r,s;e({isUpdatingProfile:!0});try{const i=await be.put("/auth/update-profile",n);e({authUser:i.data}),re.success("Profile updated successfully")}catch(i){re.error(((s=(r=i.response)==null?void 0:r.data)==null?void 0:s.message)||"Update failed")}finally{e({isUpdatingProfile:!1})}},connectSocket:()=>{const{authUser:n,token:r}=t();if(!n||!r||!n||t().socket)return;const s="http://localhost:5050".trim()||"http://localhost:5050",i=Ma(s,{auth:{token:r}});window.socket=i,i.on("connect",()=>{Re.getState().subscribeToMessages()}),i.on("connect_error",o=>{console.error("❌ SOCKET CONNECT ERROR:",o.message)}),i.on("getOnlineUsers",o=>{const l=Array.isArray(o)?o.map(c=>String(c)):[];e({onlineUsers:l})}),e({socket:i})},disconnectSocket:()=>{var n;(n=t().socket)!=null&&n.connected&&(t().socket.disconnect(),e({socket:null}))}}));/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lc=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),ma=(...e)=>e.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var cc={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dc=d.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:s="",children:i,iconNode:o,...l},c)=>d.createElement("svg",{ref:c,...cc,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:ma("lucide",s),...l},[...o.map(([u,f])=>d.createElement(u,f)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=(e,t)=>{const n=d.forwardRef(({className:r,...s},i)=>d.createElement(dc,{ref:i,iconNode:t,className:ma(`lucide-${lc(e)}`,r),...s}));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uc=oe("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fc=oe("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hc=oe("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mc=oe("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pc=oe("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gc=oe("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=oe("EllipsisVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yc=oe("Eraser",[["path",{d:"m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21",key:"182aya"}],["path",{d:"M22 21H7",key:"t4ddhn"}],["path",{d:"m5 11 9 9",key:"1mo9qw"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jn=oe("EyeOff",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cn=oe("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ar=oe("Gamepad2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bc=oe("GripVertical",[["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}],["circle",{cx:"9",cy:"5",r:"1",key:"hp0tcf"}],["circle",{cx:"9",cy:"19",r:"1",key:"fkjjf6"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["circle",{cx:"15",cy:"19",r:"1",key:"f4zoj3"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _c=oe("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=oe("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ga=oe("Loader",[["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m16.2 7.8 2.9-2.9",key:"r700ao"}],["path",{d:"M18 12h4",key:"wj9ykh"}],["path",{d:"m16.2 16.2 2.9 2.9",key:"1bxg5t"}],["path",{d:"M12 18v4",key:"jadmvz"}],["path",{d:"m4.9 19.1 2.9-2.9",key:"bwix9q"}],["path",{d:"M2 12h4",key:"j09sii"}],["path",{d:"m4.9 4.9 2.9 2.9",key:"giyufr"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xc=oe("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ya=oe("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ba=oe("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rs=oe("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const or=oe("MonitorPlay",[["path",{d:"M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z",key:"1pctta"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["rect",{x:"2",y:"3",width:"20",height:"14",rx:"2",key:"x3v2xh"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wc=oe("Paperclip",[["path",{d:"m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",key:"1u3ebp"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vc=oe("Pause",[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kn=oe("Pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sc=oe("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jc=oe("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cc=oe("Redo2",[["path",{d:"m15 14 5-5-5-5",key:"12vg1m"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",key:"6uklza"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ir=oe("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kc=oe("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nc=oe("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ec=oe("SkipBack",[["polygon",{points:"19 20 9 12 19 4 19 20",key:"o2sva"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5",key:"1ocqjk"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tc=oe("SkipForward",[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=oe("StickyNote",[["path",{d:"M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z",key:"qazsjp"}],["path",{d:"M15 3v4a2 2 0 0 0 2 2h4",key:"40519r"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=oe("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rc=oe("Undo2",[["path",{d:"M9 14 4 9l5-5",key:"102s5s"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",key:"f3b9sd"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mc=oe("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nn=oe("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pc=oe("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ic=oe("Video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]);/**
 * @license lucide-react v0.459.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=oe("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function Ac(e){const[t,n]=d.useState(()=>typeof window>"u"?!1:window.matchMedia(e).matches);return d.useEffect(()=>{const r=window.matchMedia(e);n(r.matches);const s=i=>n(i.matches);return r.addEventListener("change",s),()=>r.removeEventListener("change",s)},[e]),t}const Oc=768;function Lt(){return Ac(`(max-width: ${Oc}px)`)}const Dc=[{id:"all",label:"All chats",Icon:ba,badge:!0},{id:"friends",label:"Friends",Icon:Pc,badge:!1},{id:"profile",label:"Profile",Icon:Nn,badge:!1},{id:"edit",label:"Edit",Icon:Nc,badge:!1}],Bc=()=>{const e=pr(),t=Bt(),n=Lt(),{unreadCountByChatId:r}=Re(),{logout:s}=K(),i=t.pathname==="/friends"?"friends":t.pathname==="/profile"?"profile":t.pathname==="/settings"?"edit":"all",o=u=>{u==="profile"&&e("/profile"),u!=="edit"&&(u==="friends"&&e("/friends"),u==="all"&&e("/"))},l=r?Object.keys(r).filter(u=>(r[u]??0)>0).length:0,c=l>0?l>99?"99+":String(l):null;return a.jsxs("aside",{className:`sidebar-ref${n?" sidebar-ref--mobile":""}`,children:[a.jsx("div",{className:"sidebar-ref__logo",children:a.jsxs("div",{className:"sidebar-ref__logo-wrap",children:[a.jsx("img",{src:"/logo.png",alt:"Blah Blah",className:"sidebar-ref__logo-img",onError:u=>{var f;u.target.style.display="none",(f=u.target.nextElementSibling)==null||f.classList.remove("sidebar-ref__logo-fallback--hide")}}),a.jsx("span",{className:"sidebar-ref__logo-fallback sidebar-ref__logo-fallback--hide","aria-hidden":!0,children:"BLAH BLAH"})]})}),a.jsx("nav",{className:"sidebar-ref__nav",children:Dc.map(({id:u,label:f,Icon:h,badge:g})=>a.jsxs("button",{onClick:()=>o(u),className:`sidebar-ref__nav-item ${i===u?"active":""}`,children:[a.jsxs("span",{className:"sidebar-ref__nav-icon-wrap",children:[a.jsx(h,{size:22}),g&&c!=null&&a.jsx("span",{className:"sidebar-ref__nav-badge",children:c})]}),a.jsx("span",{className:"sidebar-ref__nav-label",children:f})]},u))}),a.jsx("div",{className:"sidebar-ref__bottom",children:a.jsxs("button",{onClick:()=>s==null?void 0:s(),className:"sidebar-ref__bottom-item",children:[a.jsx(xc,{size:22}),a.jsx("span",{children:"Log out"})]})})]})},Lc=({isOpen:e,onClose:t})=>{const[n,r]=d.useState(""),[s,i]=d.useState(""),{sendMessageByCode:o,sendByCodeLoading:l}=Re();if(!e)return null;const c=async u=>{var f,h;if(u==null||u.preventDefault(),!n.trim()){re.error("Enter a user ID");return}try{const g=await o({userCode:n.trim(),text:s.trim()});r(""),i(""),t(),g!=null&&g.chat&&!g.chat.acceptedBy?re.success("Request sent"):g!=null&&g.chat&&re.success("Chat opened")}catch(g){re.error(((h=(f=g.response)==null?void 0:f.data)==null?void 0:h.message)||"Failed to start chat")}};return a.jsx("div",{className:"new-chat-modal__overlay",onClick:t,children:a.jsxs("div",{className:"new-chat-modal__card",onClick:u=>u.stopPropagation(),children:[a.jsxs("div",{className:"new-chat-modal__header",children:[a.jsx("h2",{className:"new-chat-modal__title",children:"New Chat"}),a.jsx("button",{type:"button",onClick:t,className:"new-chat-modal__close","aria-label":"Close",children:a.jsx(Ct,{size:20})})]}),a.jsxs("form",{onSubmit:c,className:"new-chat-modal__form",children:[a.jsxs("div",{className:"new-chat-modal__group",children:[a.jsx("label",{className:"new-chat-modal__label",htmlFor:"new-chat-user-id",children:"User ID"}),a.jsxs("div",{className:"new-chat-modal__input-wrap",children:[a.jsx(Nn,{className:"new-chat-modal__icon",size:18}),a.jsx("input",{id:"new-chat-user-id",type:"text",className:"new-chat-modal__input",placeholder:"Enter user ID",value:n,onChange:u=>r(u.target.value),autoComplete:"off"})]})]}),a.jsxs("div",{className:"new-chat-modal__group",children:[a.jsx("label",{className:"new-chat-modal__label",htmlFor:"new-chat-message",children:"Message"}),a.jsxs("div",{className:"new-chat-modal__input-wrap",children:[a.jsx(ba,{className:"new-chat-modal__icon",size:18}),a.jsx("textarea",{id:"new-chat-message",className:"new-chat-modal__input new-chat-modal__textarea",placeholder:"Your message (optional)",value:s,onChange:u=>i(u.target.value),rows:2})]})]}),a.jsx("button",{type:"submit",className:"new-chat-modal__submit",disabled:l,children:l?"Starting...":"Start Chat"})]})]})})},Uc="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239ca3af"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="9" r="3.5"/><path d="M12 14c-3 0-5 2-5 4v1h10v-1c0-2-2-4-5-4z"/></svg>'),gt=Uc,lr=["/Boy1.jpeg","/Boy2.jpeg","/Boy3.jpeg","/Boy4.jpeg"],cr=["/Girl1.jpeg","/Girl2.jpeg","/Girl3.jpeg"];function Fc(e){return e==="male"?lr[Math.floor(Math.random()*lr.length)]:e==="female"?cr[Math.floor(Math.random()*cr.length)]:gt}function Ou(e,t){const n=e==="male"?lr:e==="female"?cr:null;if(!n||n.length===0)return gt;if(!t)return n[0];const r=String(t);let s=0;for(let o=0;o<r.length;o++)s=(s<<5)-s+r.charCodeAt(o);const i=Math.abs(s)%n.length;return n[i]}function zc(e){return new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})}function $c(e){const t=new Date(e),r=new Date-t,s=Math.floor(r/6e4),i=Math.floor(r/36e5),o=Math.floor(r/864e5);return s<1?"now":s<60?`${s}m`:i<24?`${i}h`:o<7?`${o}d`:t.toLocaleDateString(void 0,{day:"numeric",month:"short"})}const Hc=200,Vc=1e4,Wc=()=>{const{chats:e,getMyChats:t,selectedChat:n,setSelectedChat:r,unreadCountByChatId:s}=Re(),i=Z(_=>_.setIsNotesOpen),o=Ce(_=>_.setTruthDareOpen),{onlineUsers:l,authUser:c}=K(),[u,f]=d.useState(!1),[h,g]=d.useState(""),[x,y]=d.useState(""),b=d.useRef(0),j=d.useCallback((_=!1)=>{if(!(c!=null&&c._id))return;const v=Date.now();!_&&v-b.current<Vc||(b.current=v,t())},[c==null?void 0:c._id,t]);d.useEffect(()=>{const _=setTimeout(()=>y(h.trim()),Hc);return()=>clearTimeout(_)},[h]),d.useEffect(()=>{j(!0)},[j]),d.useEffect(()=>{const _=()=>{j(!1)};window.addEventListener("focus",_);const v=()=>{document.visibilityState==="visible"&&j(!1)};return document.addEventListener("visibilitychange",v),()=>{window.removeEventListener("focus",_),document.removeEventListener("visibilitychange",v)}},[j]);const C=d.useMemo(()=>Array.isArray(e)?x?e.filter(_=>{var T,R;const v=(T=_.participants)==null?void 0:T.find(I=>I._id!==(c==null?void 0:c._id));return(R=v==null?void 0:v.fullName)==null?void 0:R.toLowerCase().includes(x.toLowerCase())}):e:[],[e,x,c==null?void 0:c._id]);return a.jsxs("div",{className:"chat-list-panel",children:[a.jsxs("div",{className:"chat-list-panel__search",children:[a.jsx(ir,{className:"chat-list-panel__search-icon",size:18}),a.jsx("input",{type:"text",placeholder:"Search",value:h,onChange:_=>g(_.target.value),className:"chat-list-panel__search-input"})]}),a.jsx("div",{className:"chat-list-panel__new-chat",children:a.jsx("button",{onClick:()=>f(!0),className:"chat-list-panel__new-chat-btn",children:"+ New Chat"})}),a.jsxs("div",{className:"chat-list-panel__list",children:[C.map(_=>{var Y,de,G;const v=(Y=_.participants)==null?void 0:Y.find(ie=>ie._id!==(c==null?void 0:c._id)),T=(n==null?void 0:n._id)===_._id,R=_.updatedAt||((de=_.lastMessage)==null?void 0:de.createdAt),I=s&&(s[_._id]??0)>0,M=((G=_.createdBy)==null?void 0:G._id)??_.createdBy,O=!_.acceptedBy,$=(c==null?void 0:c._id)&&String(M)===String(c._id),B=O?$?"Request sent":"Accept to chat":null;return a.jsxs("button",{onClick:()=>{i(!1),o(!1),r(_)},className:`chat-list-panel__item ${T?"selected":""} ${I?"chat-list-panel__item--unread":""}`,children:[a.jsxs("div",{className:"chat-list-panel__avatar-wrap",children:[a.jsx("img",{src:(v==null?void 0:v.profilePic)||gt,alt:v==null?void 0:v.fullName,className:"chat-list-panel__avatar"}),_.acceptedBy&&(l||[]).some(ie=>String(ie)===String(v==null?void 0:v._id))&&a.jsx("span",{className:"chat-list-panel__online"})]}),a.jsxs("div",{className:"chat-list-panel__body",children:[a.jsxs("div",{className:"chat-list-panel__row",children:[a.jsx("span",{className:"chat-list-panel__name",children:(v==null?void 0:v.fullName)||"Unknown"}),!B&&R&&a.jsx("span",{className:"chat-list-panel__time",children:$c(R)})]}),B?a.jsx("p",{className:`chat-list-panel__status ${$?"chat-list-panel__status--sent":"chat-list-panel__status--accept"}`,children:B}):_.lastMessage?a.jsx("p",{className:"chat-list-panel__preview",children:_.lastMessage.image?"Photo":_.lastMessage.fileName?_.lastMessage.fileName:_.lastMessage.text||"Message"}):null]})]},_._id)}),C.length===0&&a.jsx("div",{className:"chat-list-panel__empty",children:"No conversations"})]}),u&&a.jsx(Lc,{isOpen:u,onClose:()=>f(!1)})]})},ss=["#0a0a0a","#0f0f0f","#000000"],_a=()=>{const e=pt(n=>n.theme),t=e&&(ss.includes(e.chatBg)||ss.includes(e.pageBg));return a.jsx("div",{className:`no-chat-ref${t?" no-chat-ref--dark":""}`,style:t?{backgroundColor:e.chatBg||e.pageBg||"#0a0a0a"}:void 0,children:!t&&a.jsx("img",{src:"/wall.png",alt:"",className:"no-chat-ref__illus"})})},qc=({src:e,onClose:t})=>{if(!e)return null;const n=async()=>{try{const s=await(await fetch(e)).blob(),i=window.URL.createObjectURL(s),o=document.createElement("a");o.href=i,o.download="image.jpg",document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(i)}catch(r){alert("Download failed"),console.error(r)}};return a.jsx("div",{className:"fixed inset-0 z-50 bg-black/90 flex items-center justify-center",onClick:t,children:a.jsxs("div",{className:"relative max-w-[90%] max-h-[90%]",onClick:r=>r.stopPropagation(),children:[a.jsx("img",{src:e,alt:"Preview",className:"max-w-full max-h-[80vh] rounded-lg"}),a.jsx("button",{onClick:n,className:"absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded",children:"Download"}),a.jsx("button",{onClick:t,className:"absolute top-3 left-3 bg-black/60 text-white px-3 py-1 rounded",children:"✕"})]})})},as=({setCalling:e,setCallType:t,setCallActive:n,setActiveCallUserId:r,setActiveCallUserName:s,setActiveCallUserAvatar:i,startCall:o})=>{var ae;const{selectedUser:l,selectedChat:c,clearSelectedChat:u,clearMessagesForCurrentChat:f,rejectedChatId:h,acceptChat:g,rejectChat:x}=Re(),{authUser:y,onlineUsers:b}=K(),{isNotesOpen:j,setIsNotesOpen:C,isDrawingOpen:_,setIsDrawingOpen:v,isVideoPanelOpen:T,setIsVideoPanelOpen:R}=Z(),I=Ce(z=>z.isTruthDareOpen),M=Ce(z=>z.setTruthDareOpen),O=Lt(),[$,B]=d.useState(!1),[Y,de]=d.useState(!1);if(!l)return null;const G=(b||[]).some(z=>String(z)===String(l._id)),ie=h&&c&&String(c._id)===String(h),Me=((ae=c==null?void 0:c.createdBy)==null?void 0:ae._id)??(c==null?void 0:c.createdBy),me=c&&!c.acceptedBy&&(y==null?void 0:y._id)&&String(Me)===String(y._id),Q=c&&!c.acceptedBy,V=Q&&!me,se=ie?"Request rejected":me?"Request sent":Q?"":G?"Online":"Offline",H=ie?"chat-header-ref__subtitle chat-header-ref__subtitle--rejected":me?"chat-header-ref__subtitle chat-header-ref__subtitle--sent":Q?"chat-header-ref__subtitle chat-header-ref__subtitle--pending":"chat-header-ref__subtitle",E=Q||ie,D=()=>{typeof o=="function"&&o(l._id,"video"),t("video"),e(!0),r(l._id),s(l.fullName),i(l.profilePic)},le=()=>{typeof o=="function"&&o(l._id,"audio"),t("audio"),e(!0),r(l._id),s(l.fullName),i(l.profilePic)};return a.jsxs("header",{className:"chat-header-ref",children:[a.jsxs("div",{className:"chat-header-ref__left",children:[O&&a.jsx("button",{type:"button",className:"chat-header-ref__icon chat-header-ref__back",onClick:()=>u(),"aria-label":"Back to chats",title:"Back to chats",children:a.jsx(uc,{size:24})}),a.jsx("img",{src:l.profilePic||gt,alt:l.fullName,className:"chat-header-ref__avatar"}),a.jsxs("div",{className:"chat-header-ref__info",children:[a.jsx("h1",{className:"chat-header-ref__title",children:l.fullName}),a.jsx("p",{className:H,children:se}),O&&V&&a.jsxs("div",{className:"chat-header-ref__accept-reject",children:[a.jsx("button",{type:"button",className:"chat-header-ref__accept",onClick:()=>g(c._id),children:"Accept"}),a.jsx("button",{type:"button",className:"chat-header-ref__reject",onClick:()=>x(c._id),children:"Reject"})]})]})]}),a.jsxs("div",{className:"chat-header-ref__actions",children:[!O&&a.jsx("button",{type:"button",className:`chat-header-ref__icon ${E?"chat-header-ref__icon--disabled":""}`,"aria-label":"Search",disabled:E,title:E?"Available after chat is accepted":"Search",children:a.jsx(ir,{size:24})}),a.jsx("button",{type:"button",className:`chat-header-ref__icon ${E?"chat-header-ref__icon--disabled":""}`,onClick:E?void 0:le,"aria-label":"Voice call",disabled:E,title:E?"Available after chat is accepted":"Voice call",children:a.jsx(Sc,{size:24})}),a.jsx("button",{type:"button",className:`chat-header-ref__icon ${E?"chat-header-ref__icon--disabled":""}`,onClick:E?void 0:D,"aria-label":"Video call",disabled:E,title:E?"Available after chat is accepted":"Video call",children:a.jsx(Ic,{size:24})}),a.jsxs("div",{className:"chat-header-ref__more-wrap",children:[$&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"chat-header-ref__backdrop",onClick:()=>B(!1)}),O?a.jsxs("div",{className:"chat-header-ref__dropdown chat-header-ref__dropdown--mobile",children:[a.jsx("div",{className:"chat-header-ref__dropdown-section",children:a.jsxs("button",{type:"button",className:`chat-header-ref__dropdown-row ${E?"chat-header-ref__dropdown-btn--disabled":""}`,disabled:E,"aria-label":"Search",children:[a.jsx(ir,{size:22}),a.jsx("span",{children:"Search"})]})}),a.jsx("div",{className:"chat-header-ref__dropdown-divider"}),a.jsxs("div",{className:"chat-header-ref__dropdown-section",children:[a.jsxs("button",{type:"button",className:`chat-header-ref__dropdown-row ${_?"chat-header-ref__dropdown-btn--active":""} ${E?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(E)return;!_&&(C(!1),R(!1),M(!1)),v(!_),B(!1)},disabled:E,children:[a.jsx(kn,{size:22}),a.jsx("span",{children:"Drawing"})]}),a.jsxs("button",{type:"button",className:`chat-header-ref__dropdown-row ${T?"chat-header-ref__dropdown-btn--active":""} ${E?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(E)return;!T&&(C(!1),v(!1),M(!1)),R(!T),B(!1)},disabled:E,children:[a.jsx(or,{size:22}),a.jsx("span",{children:"Watch Together"})]}),a.jsxs("button",{type:"button",className:`chat-header-ref__dropdown-row ${j?"chat-header-ref__dropdown-btn--active":""} ${E?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(E)return;!j&&(v(!1),R(!1),M(!1)),C(!j),B(!1)},disabled:E,children:[a.jsx(Zt,{size:22}),a.jsx("span",{children:"Notes"})]}),a.jsxs("button",{type:"button",className:`chat-header-ref__dropdown-row ${I?"chat-header-ref__dropdown-btn--active":""} ${E?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(E)return;!I&&(C(!1),v(!1),R(!1)),M(!I),B(!1)},disabled:E,children:[a.jsx(ar,{size:22}),a.jsx("span",{children:"Truth or Dare"})]}),a.jsxs("button",{type:"button",className:"chat-header-ref__dropdown-row chat-header-ref__dropdown-btn--danger",onClick:()=>{B(!1),de(!0)},children:[a.jsx(Ot,{size:22,className:"chat-header-ref__dropdown-icon--danger"}),a.jsx("span",{children:"Delete conversation"})]})]})]}):a.jsxs("div",{className:"chat-header-ref__dropdown",children:[a.jsx("button",{type:"button",className:`chat-header-ref__dropdown-btn ${_?"chat-header-ref__dropdown-btn--active":""} ${E?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(E)return;!_&&(C(!1),R(!1),M(!1)),v(!_),B(!1)},disabled:E,"aria-label":_?"Close drawing":"Drawing",title:_?"Close drawing":E?"Available after chat is accepted":"Drawing",children:a.jsx(kn,{size:24})}),a.jsx("button",{type:"button",className:`chat-header-ref__dropdown-btn ${T?"chat-header-ref__dropdown-btn--active":""} ${E?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(E)return;!T&&(C(!1),v(!1),M(!1)),R(!T),B(!1)},disabled:E,"aria-label":T?"Close Watch Together":"Watch Together",title:T?"Close Watch Together":E?"Available after chat is accepted":"Watch Together",children:a.jsx(or,{size:24})}),a.jsx("button",{type:"button",className:`chat-header-ref__dropdown-btn ${j?"chat-header-ref__dropdown-btn--active":""} ${E?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(E)return;!j&&(v(!1),R(!1),M(!1)),C(!j),B(!1)},disabled:E,"aria-label":j?"Close notes":"Notes",title:j?"Close notes":E?"Available after chat is accepted":"Notes",children:a.jsx(Zt,{size:24})}),a.jsx("button",{type:"button",className:`chat-header-ref__dropdown-btn ${I?"chat-header-ref__dropdown-btn--active":""} ${E?"chat-header-ref__dropdown-btn--disabled":""}`,onClick:()=>{if(E)return;!I&&(C(!1),v(!1),R(!1)),M(!I),B(!1)},disabled:E,"aria-label":I?"Close games":"Truth or Dare",title:I?"Close games":E?"Available after chat is accepted":"Truth or Dare",children:a.jsx(ar,{size:24})}),a.jsx("button",{type:"button",className:"chat-header-ref__dropdown-btn chat-header-ref__dropdown-btn--danger",onClick:()=>{B(!1),de(!0)},"aria-label":"Delete conversation",title:"Delete conversation",children:a.jsx(Ot,{size:24,className:"chat-header-ref__dropdown-icon--danger"})}),a.jsx("button",{type:"button",className:"chat-header-ref__dropdown-btn chat-header-ref__dropdown-btn--more",onClick:()=>B(!1),"aria-label":"Close menu",title:"Close",children:a.jsx(ns,{size:24})})]})]}),!$&&a.jsx("button",{type:"button",className:"chat-header-ref__icon",onClick:()=>B(!0),"aria-label":"More",title:"More",children:a.jsx(ns,{size:24})})]})]}),Y&&a.jsx("div",{className:"chat-header-ref__confirm-overlay",onClick:()=>de(!1),children:a.jsxs("div",{className:"chat-header-ref__confirm-panel",onClick:z=>z.stopPropagation(),children:[a.jsx("p",{className:"chat-header-ref__confirm-text",children:"Permanently delete all messages in this conversation for your account only. The other person will still see them. You will not be able to see these messages again."}),a.jsxs("div",{className:"chat-header-ref__confirm-actions",children:[a.jsx("button",{type:"button",className:"chat-header-ref__confirm-btn chat-header-ref__confirm-btn--cancel",onClick:()=>de(!1),children:"Cancel"}),a.jsx("button",{type:"button",className:"chat-header-ref__confirm-btn chat-header-ref__confirm-btn--clear",onClick:()=>{f(),de(!1)},children:"Clear messages"})]})]})})]})},Yc=`
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
`,os={"Smileys & People":"smileys","Animals & Nature":"animals","Food & Drink":"food",Activity:"activity","Travel & Places":"travel",Objects:"objects",Symbols:"symbols",Flags:"flags"},Gc=["smileys","animals","food","activity","travel","objects","symbols","flags"],Jc={smileys:"Smileys",animals:"Animals",food:"Food",activity:"Activity",travel:"Travel",objects:"Objects",symbols:"Symbols",flags:"Flags"},zt={};let Rt=null;Yc.split(`
`).forEach(e=>{const t=e.trim();if(t&&t!=="Advertisement"){if(os[t]){Rt=os[t],zt[Rt]||(zt[Rt]=[]);return}/^[A-Za-z0-9& ]+$/.test(t)||Rt&&(zt[Rt]||(zt[Rt]=[]),zt[Rt].push(t))}});const yn=Gc.map(e=>({id:e,label:Jc[e],emojis:zt[e]||[]}));yn.flatMap(e=>e.emojis);const Ft=new Date().getFullYear();function bn(e,t){return new Date(e,t,0).getDate()}function ct(e,t,n,r,s,i){const o=bn(e,t),l=Math.min(n,o),c=new Date(e,t-1,l,r,s,i),u=new Date;return c.getTime()<=u.getTime()?{year:u.getFullYear(),month:u.getMonth()+1,day:u.getDate(),hours:u.getHours(),minutes:u.getMinutes(),seconds:u.getSeconds()}:{year:e,month:t,day:l,hours:r,minutes:s,seconds:i}}const Xc=e=>{let t=Math.max(0,Math.floor(e/1e3));const n=Math.floor(t/3600);t%=3600;const r=Math.floor(t/60),s=t%60,i=String(n).padStart(2,"0"),o=String(r).padStart(2,"0"),l=String(s).padStart(2,"0");return`${i}h ${o}m ${l}s`},Kc=28;function rt({value:e,max:t,label:n,onChange:r,format:s}){const i=s?O=>s(O):O=>String(O).padStart(2,"0"),o=d.useRef(0),l=d.useRef(null),c=d.useRef(e),[u,f]=d.useState(null);d.useEffect(()=>{if(u===null)return;const O=requestAnimationFrame(()=>{requestAnimationFrame(()=>f(null))});return()=>cancelAnimationFrame(O)},[u]);const h=e===0?t:e-1,g=e===t?0:e+1,x=[h,e,g],y=O=>{f(O),c.current=e},b=O=>{O.preventDefault(),O.stopPropagation();const $=40;if(o.current+=O.deltaY,o.current>=$){o.current=0;const B=e===t?0:e+1;r(B),y("up")}else if(o.current<=-$){o.current=0;const B=e===0?t:e-1;r(B),y("down")}},j=O=>{!O.touches||O.touches.length===0||(l.current=O.touches[0].clientY)},C=O=>{if(l.current==null||!O.touches||O.touches.length===0)return;const $=O.touches[0].clientY,B=$-l.current,Y=12;if(B>=Y){l.current=$;const de=e===0?t:e-1;r(de),y("down")}else if(B<=-Y){l.current=$;const de=e===t?0:e+1;r(de),y("up")}},_=()=>{l.current=null},v=()=>{const O=e===t?0:e+1;r(O),y("up")},T=()=>{const O=e===0?t:e-1;r(O),y("down")},R=O=>{O.preventDefault(),O.stopPropagation(),T()},I=O=>{O.preventDefault(),O.stopPropagation(),v()},M=["duration-wheel__strip",u==="up"&&"duration-wheel__strip--slide-from-up",u==="down"&&"duration-wheel__strip--slide-from-down"].filter(Boolean).join(" ");return a.jsxs("div",{className:"duration-wheel__col",children:[a.jsx("div",{className:"duration-wheel__label",children:n}),a.jsx("button",{type:"button",className:"duration-wheel__arrow duration-wheel__arrow--up",onClick:R,"aria-label":`Increase ${n}`,children:a.jsx(pc,{size:14})}),a.jsx("div",{className:"duration-wheel__viewport",onWheel:b,onTouchStart:j,onTouchMove:C,onTouchEnd:_,role:"region","aria-label":`Set ${n}`,children:a.jsx("div",{className:M,children:x.map((O,$)=>a.jsx("div",{className:`duration-wheel__item ${$===1?"duration-wheel__item--selected":""}`,style:{height:Kc},children:i(O)},$))})}),a.jsx("button",{type:"button",className:"duration-wheel__arrow duration-wheel__arrow--down",onClick:I,"aria-label":`Decrease ${n}`,children:a.jsx(fc,{size:14})})]})}const is=()=>{var p,S;const{authUser:e}=K(),{selectedChat:t,selectedUser:n,sendMessage:r,acceptChat:s,rejectChat:i}=Re(),o=d.useRef(null),l=d.useRef(null),[c,u]=d.useState(""),[f,h]=d.useState(null),[g,x]=d.useState(""),[y,b]=d.useState(!1),[j,C]=d.useState(!1),[_,v]=d.useState(((p=yn[0])==null?void 0:p.id)??"smileys"),[T,R]=d.useState([]),I="blah-blah-recent-emojis",[M,O]=d.useState("datetime"),[$,B]=d.useState(0),[Y,de]=d.useState(0),[G,ie]=d.useState(0),[Me,me]=d.useState(0);d.useEffect(()=>{const m=document.querySelector(".chat-input-bar-wrap");if(!m)return;const w=N=>{N.target&&N.target.closest(".emoji-picker")||N.target&&N.target.closest(".timer-picker")||N.preventDefault()};return m.addEventListener("wheel",w,{passive:!1}),m.addEventListener("touchmove",w,{passive:!1}),()=>{m.removeEventListener("wheel",w),m.removeEventListener("touchmove",w)}},[]),d.useEffect(()=>{try{const m=localStorage.getItem(I);if(m){const w=JSON.parse(m);Array.isArray(w)&&R(w)}}catch{}},[]);const Q=()=>{const m=new Date;return m.setHours(m.getHours()+1,0,0,0),{year:m.getFullYear(),month:m.getMonth()+1,day:m.getDate(),hours:m.getHours(),minutes:0,seconds:0}},[V,se]=d.useState(()=>Q().year),[H,E]=d.useState(()=>Q().month),[D,le]=d.useState(()=>Q().day),[ae,z]=d.useState(()=>Q().hours),[te,ke]=d.useState(()=>Q().minutes),[_e,je]=d.useState(()=>Q().seconds),[_t,Je]=d.useState(!0),[Ye,nt]=d.useState(null),[xe,pe]=d.useState(!1),[Ve,Fe]=d.useState(null),[Ne,Ee]=d.useState(0);d.useEffect(()=>{const m=w=>{l.current&&!l.current.contains(w.target)&&(b(!1),C(!1))};return window.addEventListener("mousedown",m),()=>window.removeEventListener("mousedown",m)},[]),d.useEffect(()=>{if(!Ye||!xe)return;const m=setInterval(()=>Ee(w=>w+1),1e3);return()=>clearInterval(m)},[Ye,xe]),d.useEffect(()=>{if(y&&M==="datetime"){const m=ct(V,H,D,ae,te,_e);(m.year!==V||m.month!==H||m.day!==D||m.hours!==ae||m.minutes!==te||m.seconds!==_e)&&(se(m.year),E(m.month),le(m.day),z(m.hours),ke(m.minutes),je(m.seconds))}},[y,M]);const Ae=((S=t==null?void 0:t.createdBy)==null?void 0:S._id)??(t==null?void 0:t.createdBy),Xe=(e==null?void 0:e._id)&&t&&String(Ae)!==String(e._id);t&&t.acceptedBy;const A=t&&!t.acceptedBy;d.useEffect(()=>{A&&b(!1)},[A]);const ue=m=>{if(A){m.target.value="";return}const w=m.target.files[0];if(!w)return;const N=new FileReader;N.onloadend=()=>{h(N.result),x(w.name)},N.readAsDataURL(w),m.target.value=""},ne=()=>{let m=null;if(M==="duration"&&(m=Y*36e5+G*6e4+Me*1e3,m<=0)){re.error("Timer must be > 0");return}if(M==="datetime"){const w=bn(V,H),N=Math.min(D,w),U=new Date(V,H-1,N,ae,te,_e).getTime();if(U<=Date.now()){re.error("Choose a future date and time");return}m=U-Date.now()}nt(m),pe(M==="datetime"),Fe(Date.now()+m),b(!1)},Oe=async m=>{if(m.preventDefault(),!c.trim()&&!f)return;if(A&&(f||Ye)){re.error("File and timer are available after chat is accepted");return}const w=A?null:Ye?Date.now()+Ye:null;await r({receiverId:n._id,conversationId:t._id,text:c.trim(),image:A?void 0:f,fileName:A?void 0:g||void 0,revealAt:w,revealed:!w}),u(""),h(null),x(""),nt(null),pe(!1),Fe(null),de(0),ie(0),me(0);const N=Q();se(N.year),E(N.month),le(N.day),z(N.hours),ke(N.minutes),je(N.seconds)},De=[{id:"recent",label:"Recent"},...yn.map(m=>({id:m.id,label:m.label}))],Le=m=>{var w;return m==="recent"?T:((w=yn.find(N=>N.id===m))==null?void 0:w.emojis)||[]},ot=m=>{u(w=>`${w}${m}`),R(w=>{const N=[m,...w.filter(U=>U!==m)].slice(0,40);try{localStorage.setItem(I,JSON.stringify(N))}catch{}return N})};return a.jsxs("div",{className:"message-input-ref relative",children:[Ye&&a.jsxs("div",{className:"message-input-ref__timer-info",children:[a.jsx("span",{className:"message-input-ref__timer-info-text",children:xe?(()=>{const m=new Date(Date.now()+Ye),w=m.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),N=m.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0});return`Reveal on ${w} at ${N}`})():(()=>{const m=xe&&Ve!=null?Math.max(0,Ve-Date.now()):Ye;return`Reveals in ${Xc(m)}`})()}),a.jsx("button",{type:"button",onClick:()=>{nt(null),pe(!1),Fe(null)},className:"message-input-ref__timer-clear","aria-label":"Remove scheduled time",children:a.jsx(Ct,{size:14})})]}),f&&a.jsxs("div",{className:"message-input-ref__preview",children:[f.startsWith("data:image/")?a.jsx("img",{src:f,alt:"Preview"}):a.jsx("span",{className:"message-input-ref__file-name",children:g||"File attached"}),a.jsx("button",{type:"button",onClick:()=>{h(null),x("")},className:"message-input-ref__preview-remove",children:a.jsx(Ct,{size:14})})]}),a.jsxs("form",{onSubmit:Oe,className:"message-input-ref__bar",children:[a.jsx("input",{type:"file",ref:o,hidden:!0,accept:"*/*",onChange:ue}),a.jsx("button",{type:"button",className:`message-input-ref__attach ${A?"message-input-ref__attach--disabled":""}`,onClick:()=>{var m;return!A&&((m=o.current)==null?void 0:m.click())},"aria-label":"Attach",disabled:A,title:A?"Available after chat is accepted":"Attach",children:a.jsx(wc,{size:20})}),a.jsx("input",{value:c,onChange:m=>u(m.target.value),className:"message-input-ref__input",placeholder:"Your message"}),a.jsxs("div",{className:"message-input-ref__extra message-input-ref__extra--has-picker",ref:l,children:[j&&a.jsxs("div",{className:"emoji-picker",children:[a.jsx("div",{className:"emoji-picker__tabs",children:De.map(m=>a.jsx("button",{type:"button",className:`emoji-picker__tab ${_===m.id?"emoji-picker__tab--active":""}`,onClick:()=>v(m.id),children:m.label},m.id))}),a.jsx("div",{className:"emoji-picker__grid",children:Le(_).map((m,w)=>a.jsx("button",{type:"button",className:"emoji-picker__item",onClick:()=>ot(m),children:m},`${m}-${w}`))})]}),a.jsx("button",{type:"button",onClick:()=>{C(m=>!m),b(!1)},className:"message-input-ref__attach","aria-label":"Emoji",title:"Emoji",children:"🙂"}),y&&a.jsxs("div",{className:`timer-picker ${Ye?"timer-picker--shift-up":""}`,children:[a.jsxs("div",{className:"timer-picker__tabs",children:[a.jsx("button",{type:"button",className:`timer-picker__tab ${M==="datetime"?"timer-picker__tab--active":""}`,onClick:()=>O("datetime"),children:"Date & Time"}),a.jsx("button",{type:"button",className:`timer-picker__tab ${M==="duration"?"timer-picker__tab--active":""}`,onClick:()=>O("duration"),children:"Duration"})]}),M==="duration"&&a.jsx("div",{className:"timer-picker__duration",children:a.jsxs("div",{className:"duration-wheel",children:[a.jsx(rt,{value:Y,max:23,label:"h",onChange:de,format:m=>String(m).padStart(2,"0")+"h"}),a.jsx(rt,{value:G,max:59,label:"m",onChange:ie,format:m=>String(m).padStart(2,"0")+"m"}),a.jsx(rt,{value:Me,max:59,label:"s",onChange:me,format:m=>String(m).padStart(2,"0")+"s"})]})}),M==="datetime"&&a.jsx("div",{className:"timer-picker__datetime",children:a.jsx("div",{className:"timer-picker__duration timer-picker__duration--datetime",children:_t?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"duration-wheel",children:[a.jsx(rt,{value:ae,max:23,label:"Hours",onChange:m=>{Je(!0);const w=ct(V,H,D,m,te,_e);se(w.year),E(w.month),le(w.day),z(w.hours),ke(w.minutes),je(w.seconds)}}),a.jsx(rt,{value:te,max:59,label:"Minutes",onChange:m=>{Je(!0);const w=ct(V,H,D,ae,m,_e);se(w.year),E(w.month),le(w.day),z(w.hours),ke(w.minutes),je(w.seconds)}}),a.jsx(rt,{value:_e,max:59,label:"Seconds",onChange:m=>{Je(!0);const w=ct(V,H,D,ae,te,m);se(w.year),E(w.month),le(w.day),z(w.hours),ke(w.minutes),je(w.seconds)}})]}),a.jsxs("div",{className:"duration-wheel duration-wheel--row",children:[a.jsx(rt,{value:V-Ft,max:20,label:"Year",onChange:m=>{const w=Ft+m,N=ct(w,H,D,ae,te,_e);se(N.year),E(N.month),le(N.day),z(N.hours),ke(N.minutes),je(N.seconds)},format:m=>String(Ft+m)}),a.jsx(rt,{value:H-1,max:11,label:"Month",onChange:m=>{const w=m+1,N=ct(V,w,D,ae,te,_e);se(N.year),E(N.month),le(N.day),z(N.hours),ke(N.minutes),je(N.seconds)},format:m=>String(m+1).padStart(2,"0")}),a.jsx(rt,{value:Math.min(D,bn(V,H))-1,max:30,label:"Date",onChange:m=>{const w=m+1,N=ct(V,H,w,ae,te,_e);se(N.year),E(N.month),le(N.day),z(N.hours),ke(N.minutes),je(N.seconds)},format:m=>String(m+1).padStart(2,"0")})]})]}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"duration-wheel duration-wheel--row",children:[a.jsx(rt,{value:V-Ft,max:20,label:"Year",onChange:m=>{const w=Ft+m,N=ct(w,H,D,ae,te,_e);se(N.year),E(N.month),le(N.day),z(N.hours),ke(N.minutes),je(N.seconds)},format:m=>String(Ft+m)}),a.jsx(rt,{value:H-1,max:11,label:"Month",onChange:m=>{const w=m+1,N=ct(V,w,D,ae,te,_e);se(N.year),E(N.month),le(N.day),z(N.hours),ke(N.minutes),je(N.seconds)},format:m=>String(m+1).padStart(2,"0")}),a.jsx(rt,{value:Math.min(D,bn(V,H))-1,max:30,label:"Date",onChange:m=>{const w=m+1,N=ct(V,H,w,ae,te,_e);se(N.year),E(N.month),le(N.day),z(N.hours),ke(N.minutes),je(N.seconds)},format:m=>String(m+1).padStart(2,"0")})]}),a.jsxs("div",{className:"duration-wheel",children:[a.jsx(rt,{value:ae,max:23,label:"Hours",onChange:m=>{Je(!0);const w=ct(V,H,D,m,te,_e);se(w.year),E(w.month),le(w.day),z(w.hours),ke(w.minutes),je(w.seconds)}}),a.jsx(rt,{value:te,max:59,label:"Minutes",onChange:m=>{Je(!0);const w=ct(V,H,D,ae,m,_e);se(w.year),E(w.month),le(w.day),z(w.hours),ke(w.minutes),je(w.seconds)}}),a.jsx(rt,{value:_e,max:59,label:"Seconds",onChange:m=>{Je(!0);const w=ct(V,H,D,ae,te,m);se(w.year),E(w.month),le(w.day),z(w.hours),ke(w.minutes),je(w.seconds)}})]})]})})}),a.jsx("button",{type:"button",onClick:ne,className:"timer-picker__submit",children:"Set Timer"})]}),a.jsx("button",{type:"button",onClick:()=>{A||(b(m=>!m),C(!1))},className:`message-input-ref__attach ${A?"message-input-ref__attach--disabled":""}`,"aria-label":"Schedule",disabled:A,title:A?"Available after chat is accepted":"Schedule",children:a.jsx(gc,{size:18})})]}),a.jsx("button",{type:"submit",className:"message-input-ref__send",disabled:!c.trim()&&!f,"aria-label":"Send",children:a.jsx(kc,{size:20})})]})]})},Zc=()=>{const e=Array(6).fill(null);return a.jsx("div",{className:"flex-1 overflow-y-auto p-4 space-y-4",children:e.map((t,n)=>a.jsxs("div",{className:`chat ${n%2===0?"chat-start":"chat-end"}`,children:[a.jsx("div",{className:"chat-image avatar",children:a.jsx("div",{className:"size-10 rounded-full",children:a.jsx("div",{className:"skeleton w-full h-full rounded-full"})})}),a.jsx("div",{className:"chat-header mb-1",children:a.jsx("div",{className:"skeleton h-4 w-16"})}),a.jsx("div",{className:"chat-bubble bg-transparent p-0",children:a.jsx("div",{className:"skeleton h-16 w-[200px]"})})]},n))})},ls={love:["love","luv","loved","loving","miss you","missing you","need you","forever","mine","my person","jaan","jaanu","baby","babe","shona","sona","cutie","meri","mera","dil","dil se","pyaar","pyar","ishq","❤️","💕","💖","💗","💞","💘","😍","🥰","😘","🤍"],happy:["happy","happiness","joy","joyful","awesome","amazing","great","nice","cool","fantastic","perfect","yay","yayy","yayyy","yess","yesss","hehe","haha","lol","lmao","rofl","mast","badiya","sahi","ekdum sahi","full on","mazza","mazaa","majaa","jhakaas","killer","😂","🤣","😄","😁","😆","😊","😎"],angry:["angry","anger","mad","furious","irritated","annoyed","annoying","hate","hated","hating","wtf","omfg","ffs","shit","bullshit","damn","bloody","gussa","bahut gussa","pagal","dimag kharab","irritate","pak gaya","bas yaar","chutiya","bakwaas","bekaar","😡","🤬","😠","💢","🔥"],sad:["sad","sadness","unhappy","cry","crying","cried","hurt","hurts","lonely","alone","broken","dukhi","udaas","mann nahi","bura lag raha","thak gaya","tired","exhausted","akela","akeli","😭","😢","😞","😔","☹️","🥺"],calm:["calm","relaxed","peace","peaceful","fine","okay","ok","alright","safe","comfortable","theek hai","thik hai","chill","koi baat nahi","sab theek","shaant","sukoon","😌","🙂","🫶"],anxious:["anxious","anxiety","stressed","stress","worried","scared","afraid","nervous","panic","overthinking","tension","dar lag raha","soch raha","overthink","ghabrahat","confused","samajh nahi aa raha","😰","😥","😨","😟","😬"]},Qc={love:[330,70,75],happy:[120,70,75],angry:[0,0,18],sad:[220,40,75],calm:[180,30,85],anxious:[40,60,80]};function ed(e){const t={};let n=0;if(Object.keys(ls).forEach(i=>t[i]=0),e.forEach(i=>{const o=i.toLowerCase();Object.entries(ls).forEach(([l,c])=>{c.forEach(u=>{o.includes(u)&&(t[l]++,n++)})})}),n===0)return null;const r={};Object.entries(t).forEach(([i,o])=>{o>0&&(r[i]=o/n)});const s=Math.min(n/6,1);return{mix:r,intensity:s}}function td(e,t,n){t/=100,n/=100;const r=o=>(o+e/30)%12,s=t*Math.min(n,1-n),i=o=>n-s*Math.max(-1,Math.min(r(o)-3,Math.min(9-r(o),1)));return[255*i(0),255*i(8),255*i(4)]}function nd(e){let t=0,n=0,r=0;const s={angry:e.angry||0,sad:e.sad||0,anxious:e.anxious||0,love:e.love||0,happy:e.happy||0,calm:e.calm||0};if(Object.entries(e).forEach(([o,l])=>{const c=Qc[o];if(!c)return;let[u,f,h]=c,[g,x,y]=td(u,f,h);if(s.angry>.3&&o!=="angry"){const b=Math.min((s.angry-.3)/.7,1);g*=1-b,x*=1-b,y*=1-b}if(s.sad>.25&&o!=="sad"){const b=(g+x+y)/3,j=Math.min(s.sad/.8,1);g=g*(1-j)+b*j,x=x*(1-j)+b*j,y=y*(1-j)+b*j}if(s.anxious>.25&&o!=="anxious"){const b=Math.min(s.anxious/.8,1);g+=20*b,x+=20*b,y-=15*b}o==="love"&&(g*=1+s.love*.4,x*=1+s.love*.15),o==="happy"&&(g*=1+s.happy*.25,x*=1+s.happy*.25,y*=1+s.happy*.15),g=Math.min(255,Math.max(0,g)),x=Math.min(255,Math.max(0,x)),y=Math.min(255,Math.max(0,y)),t+=g*l,n+=x*l,r+=y*l}),s.calm>.3){const o=Math.min(s.calm/.8,1);t=t*(1-o)+245*o,n=n*(1-o)+245*o,r=r*(1-o)+245*o}const i=Math.max(t,n,r,1);return i>255&&(t=t/i*255,n=n/i*255,r=r/i*255),{r:Math.min(255,Math.round(t)),g:Math.min(255,Math.round(n)),b:Math.min(255,Math.round(r))}}const rd={r:245,g:245,b:245},_n={};function Vn(e,t,n){return e+(t-e)*n}function sd(e,t,n,r,s){const i=n??"_global";if(_n[i]||(_n[i]={...rd}),r&&s){document.documentElement.style.setProperty("--chat-mood-bg",s);return}const o=_n[i],l=.06+t*.14;o.r=Vn(o.r,e.r,l),o.g=Vn(o.g,e.g,l),o.b=Vn(o.b,e.b,l);const c=`rgb(${Math.round(o.r)}, ${Math.round(o.g)}, ${Math.round(o.b)})`;document.documentElement.style.setProperty("--chat-mood-bg",c)}function Wn(e,t,n){const r=e??"_global";if(delete _n[r],t&&n){document.documentElement.style.setProperty("--chat-mood-bg",n);return}const s=getComputedStyle(document.documentElement).getPropertyValue("--chat-bg").trim();s?document.documentElement.style.setProperty("--chat-mood-bg",s):document.documentElement.style.setProperty("--chat-mood-bg","rgb(245, 245, 245)")}function ad(e,t){const n=[],r=[],s=t!=null?String(t):"";for(let i=e.length-1;i>=0;i--){const o=e[i];if(!(o!=null&&o.text)||typeof o.text!="string")continue;const l=o.senderId!=null?String(o.senderId):"";if(l===s&&n.length<8?n.push(o.text):l!==s&&r.length<8&&r.push(o.text),n.length>=8&&r.length>=8)break}return[...n,...r]}function od(e,t,n){const r=pt(o=>o.theme),s=(r==null?void 0:r.chatBg)==="#0f0f0f"||(r==null?void 0:r.chatBg)==="#000000"||(r==null?void 0:r.chatBg)==="#0a0a0a"||(r==null?void 0:r.pageBg)==="#0f0f0f"||(r==null?void 0:r.pageBg)==="#000000"||(r==null?void 0:r.pageBg)==="#0a0a0a",i=s?(r==null?void 0:r.chatBg)??"#0a0a0a":null;d.useEffect(()=>{if(!Array.isArray(e)||e.length===0||t==null){Wn(n,s,i);return}const o=ad(e,t);if(o.length===0){Wn(n,s,i);return}const l=ed(o);if(!l){Wn(n,s,i);return}const c=nd(l.mix);sd(c,l.intensity,n,s,i)},[e,t,n,s,i])}function xn(e){const t=new Date(e),n=new Date,r=zc(e),s=t.getDate()===n.getDate()&&t.getMonth()===n.getMonth()&&t.getFullYear()===n.getFullYear(),i=new Date(n);i.setDate(n.getDate()-1);const o=t.getDate()===i.getDate()&&t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear();if(s)return`${r} today`;if(o)return`${r} yesterday`;const l=t.toLocaleDateString(void 0,{day:"2-digit",month:"short",year:"numeric"});return`${r} on ${l}`}function id(e){return new Date(e).toLocaleString(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit"})}function ld({revealAt:e,onReveal:t}){const[n,r]=d.useState(Math.max(0,new Date(e)-Date.now()));if(d.useEffect(()=>{const f=setInterval(()=>{const h=new Date(e)-Date.now();h<=0?(clearInterval(f),t==null||t(),r(0)):r(h)},1e3);return()=>clearInterval(f)},[e,t]),n<=0)return null;const s=Math.floor(n/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),l=Math.floor(s%3600/60),c=s%60,u=f=>String(f).padStart(2,"0");return a.jsxs("div",{className:"countdown-flip",children:[a.jsx("div",{className:"countdown-flip__title",children:"SAVE THE DATE"}),a.jsxs("div",{className:"countdown-flip__row",children:[a.jsxs("div",{className:"countdown-flip__segment",children:[a.jsxs("div",{className:"countdown-flip__digits",children:[a.jsx("span",{className:"countdown-flip__digit",children:u(i)[0]}),a.jsx("span",{className:"countdown-flip__digit",children:u(i)[1]})]}),a.jsx("div",{className:"countdown-flip__label",children:"Days"})]}),a.jsx("span",{className:"countdown-flip__colon",children:":"}),a.jsxs("div",{className:"countdown-flip__segment",children:[a.jsxs("div",{className:"countdown-flip__digits",children:[a.jsx("span",{className:"countdown-flip__digit",children:u(o)[0]}),a.jsx("span",{className:"countdown-flip__digit",children:u(o)[1]})]}),a.jsx("div",{className:"countdown-flip__label",children:"Hours"})]}),a.jsx("span",{className:"countdown-flip__colon",children:":"}),a.jsxs("div",{className:"countdown-flip__segment",children:[a.jsxs("div",{className:"countdown-flip__digits",children:[a.jsx("span",{className:"countdown-flip__digit",children:u(l)[0]}),a.jsx("span",{className:"countdown-flip__digit",children:u(l)[1]})]}),a.jsx("div",{className:"countdown-flip__label",children:"Minutes"})]}),a.jsx("span",{className:"countdown-flip__colon",children:":"}),a.jsxs("div",{className:"countdown-flip__segment",children:[a.jsxs("div",{className:"countdown-flip__digits",children:[a.jsx("span",{className:"countdown-flip__digit",children:u(c)[0]}),a.jsx("span",{className:"countdown-flip__digit",children:u(c)[1]})]}),a.jsx("div",{className:"countdown-flip__label",children:"Seconds"})]})]}),a.jsx("div",{className:"countdown-flip__datetime",children:id(e)})]})}function cs({message:e,onReveal:t}){const{authUser:n}=K(),r=e.senderId===n._id,s=e.revealAt&&!e.revealed;return s&&!e.revealed?a.jsx(ld,{revealAt:e.revealAt,revealed:e.revealed,onReveal:t}):a.jsx("div",{children:s&&!r&&a.jsx("div",{className:"message-bubble",children:e.text})})}function cd({message:e,onReveal:t}){const{authUser:n}=K(),[r,s]=d.useState(!1),i=e.senderId===n._id,o=e.revealAt&&!e.revealed,c=e.senderId==="6997e34d5bfffd55ff54458d";return o&&e.revealAt&&!i?a.jsx(cs,{message:e,onReveal:t}):o&&e.revealAt&&i?a.jsxs("div",{className:"message-bubble message-bubble--timed",children:[a.jsx(cs,{message:e,onReveal:t}),e.text&&a.jsx("div",{className:"timed-message-text",children:e.text})]}):a.jsxs("div",{className:`flex flex-col ${i?"items-end":"items-start"}`,children:[a.jsxs("div",{className:`message-bubble ${c?"bot-bubble":i?"sender-bubble":"receiver-bubble"}`,children:[a.jsx("div",{children:e.text}),e.image&&(e.fileName&&!/\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?|$)/i.test(e.fileName)||e.image.includes("/raw/")?a.jsxs("a",{href:e.image,target:"_blank",rel:"noopener noreferrer",className:"msg-attachment-link msg-attachment-file",children:["📎 ",e.fileName||"Download file"]}):a.jsx("a",{href:e.image,target:"_blank",rel:"noopener noreferrer",className:"msg-attachment-link",children:a.jsx("img",{src:e.image,alt:"",className:"msg-attachment-img"})}))]}),e.revealAt&&e.revealed&&a.jsx("div",{className:`text-[10px] opacity-60 mt-1 text-gray-500 ${i?"text-right":"text-left"}`,children:`Revealed at ${xn(e.revealAt)}`})]})}const ds=d.memo(cd,(e,t)=>{const n=e.message,r=t.message;return!n||!r||n._id!==r._id?!1:n.text===r.text&&n.revealed===r.revealed&&n.image===r.image&&n.fileName===r.fileName&&n.revealAt===r.revealAt}),us=24*60*60*1e3;function dd(e){const t=new Date(e),n=new Date,r=t.getDate()===n.getDate()&&t.getMonth()===n.getMonth()&&t.getFullYear()===n.getFullYear(),s=new Date(n);s.setDate(n.getDate()-1);const i=t.getDate()===s.getDate()&&t.getMonth()===s.getMonth()&&t.getFullYear()===s.getFullYear();return r?"Today":i?"Yesterday":t.toLocaleDateString(void 0,{weekday:"long",day:"numeric",month:"short",year:"numeric"})}const ud=({setCallType:e,setCallActive:t,setActiveCallUserId:n,setActiveCallUserName:r,setActiveCallUserAvatar:s,setCalling:i,startCall:o})=>{const{isScreenSharing:l,messages:c,getMessagesByConversation:u,loadMoreOlderMessages:f,isMessagesLoading:h,isMessagesLoadingMore:g,hasMoreOlderMessages:x,selectedUser:y,selectedChat:b,markMessageRevealed:j,subscribeToMessages:C,unsubscribeFromMessages:_,deleteMessage:v,subscribeToChatEvents:T,unsubscribeFromChatEvents:R}=Re(),{authUser:I}=K();pt(p=>p.theme);const M=Z(p=>p.toggleNote);Z(p=>p.searchNote);const O=Z(p=>p.noteIds),$=Z(p=>p.isDrawingOpen),B=Z(p=>p.setIsDrawingOpen),Y=Z(p=>p.setIsNotesOpen),de=Z(p=>p.drawingUserIdByChat),G=Z(p=>p.isVideoPanelOpen),ie=Z(p=>p.setIsVideoPanelOpen),Me=Z(p=>p.videoUserIdByChat),me=Z(p=>p.isNotesOpen),Q=Z(p=>p.panelMinimized),V=Ce(p=>p.isTruthDareOpen),se=Ce(p=>p.panelMinimized),H=Ce(p=>p.setTruthDareOpen),E=Ce(p=>p.setOpenToGameIndex),D=Ce(p=>p.gamePlayingUserIdByChat),le=Ce(p=>p.gamePlayingGameNameByChat),ae=Lt(),z={"Spin the bottle":0,"Flip the coin":1,"Roll the die":2},te=(b==null?void 0:b._id)!=null?String(b._id):null,_e=te&&D[te]&&String(D[te])===String(y==null?void 0:y._id)&&!V,je=te?le[te]:null,Je=te&&de[te]&&String(de[te])===String(y==null?void 0:y._id)&&!$,nt=te&&Me[te]&&String(Me[te])===String(y==null?void 0:y._id)&&!G,xe=d.useRef(null),pe=d.useRef(null),Ve=d.useRef(null),[Fe,Ne]=d.useState(null),[Ee,Ae]=d.useState(null),Xe=()=>{const p=pe.current;if(!p||!(b!=null&&b._id)||!x||g||p.scrollTop>100)return;const S=p.scrollHeight;f(b._id).then(()=>{requestAnimationFrame(()=>{if(pe.current){const m=pe.current;m.scrollTop=m.scrollHeight-S}})})};if(!b)return a.jsx(_a,{});const Ke=Array.isArray(c)?c:[],A=Ke.length,ue=b&&!b.acceptedBy;d.useEffect(()=>{T()},[]),d.useEffect(()=>{if(!(b!=null&&b._id)||!(I!=null&&I._id))return;const p=K.getState().socket;p.emit("join_chat",{chatId:b._id}),u(b._id),p.emit("chat_opened",{chatId:b._id,userId:I._id})},[b==null?void 0:b._id]);const ne=Z(p=>p.fetchNotes);d.useEffect(()=>{b!=null&&b._id&&ne(b._id)},[b==null?void 0:b._id]);const[Oe,De]=d.useState(!1);d.useEffect(()=>{const p=K.getState().socket;if(p)return p.on("bot_typing",S=>{De(S)}),()=>p.off("bot_typing")},[]),od(Ke,I._id,b._id),d.useEffect(()=>{if(!(b!=null&&b._id)||!pe.current)return;const p=pe.current,S=()=>{p.scrollTop=p.scrollHeight},m=requestAnimationFrame(S),w=setTimeout(S,150),N=setTimeout(S,400);return()=>{cancelAnimationFrame(m),clearTimeout(w),clearTimeout(N)}},[b==null?void 0:b._id]),d.useEffect(()=>{if(h||!(b!=null&&b._id)||!pe.current)return;const p=pe.current;p.scrollTop=p.scrollHeight;const S=setTimeout(()=>{p.scrollTop=p.scrollHeight},100);return()=>clearTimeout(S)},[b==null?void 0:b._id,h]),d.useLayoutEffect(()=>{const p=pe.current;p&&(p.scrollTop=p.scrollHeight)},[A]);const Le=ae&&((me||$||G)&&Q||V&&se);if(d.useEffect(()=>{if(!Le||!pe.current)return;const p=pe.current;(()=>{p.scrollTo({top:p.scrollHeight,behavior:"smooth"})})();const m=setTimeout(()=>{p.scrollHeight-p.scrollTop-p.clientHeight>2&&p.scrollTo({top:p.scrollHeight,behavior:"smooth"})},350);return Ve.current={t:m},()=>{var w;clearTimeout((w=Ve.current)==null?void 0:w.t)}},[Le,A]),d.useEffect(()=>{const p=S=>{S.target.closest(".message-menu")||Ae(null)};return window.addEventListener("click",p),()=>window.removeEventListener("click",p)},[]),h)return a.jsxs("div",{className:"flex-1 flex flex-col overflow-auto",children:[a.jsx(as,{setCallType:e,setCalling:i,setCallActive:t,setActiveCallUserId:n,setActiveCallUserName:r,setActiveCallUserAvatar:s}),a.jsx(Zc,{}),a.jsx(is,{})]});const ot=(()=>{const p=Ke.filter(S=>String(S.senderId)===String(I._id)&&S.seenAt);return p.length===0?null:(p.sort((S,m)=>new Date(S.seenAt)-new Date(m.seenAt)),p[p.length-1]._id)})();return a.jsxs("div",{className:"flex flex-col h-full",children:[a.jsx(as,{setCallType:e,setCalling:i,setCallActive:t,setActiveCallUserId:n,setActiveCallUserName:r,setActiveCallUserAvatar:s,startCall:o}),a.jsxs("div",{className:`chat-container-wrap${_e||Je||nt?" chat-container-wrap--with-indicator":""}`,children:[_e&&a.jsxs("div",{className:"chat-playing-indicator chat-playing-indicator--overlay",children:[a.jsx("span",{className:"chat-playing-indicator__dot"}),a.jsxs("span",{className:"chat-playing-indicator__text",children:[y==null?void 0:y.fullName," is playing"," ",je??"this game"," — wanna join?"]}),a.jsx("button",{type:"button",className:"chat-playing-indicator__btn",onClick:()=>{Y(!1),B(!1),ie(!1);const p=je!=null?z[je]:0;E(typeof p=="number"?p:0),H(!0)},children:"Join"})]}),Je&&!_e&&a.jsxs("div",{className:"chat-playing-indicator chat-playing-indicator--overlay",children:[a.jsx("span",{className:"chat-playing-indicator__dot"}),a.jsxs("span",{className:"chat-playing-indicator__text",children:[y==null?void 0:y.fullName," is drawing — wanna open?"]}),a.jsx("button",{type:"button",className:"chat-playing-indicator__btn",onClick:()=>{Y(!1),H(!1),ie(!1),B(!0)},children:"Open"})]}),nt&&!_e&&!Je&&a.jsxs("div",{className:"chat-playing-indicator chat-playing-indicator--overlay",children:[a.jsx("span",{className:"chat-playing-indicator__dot"}),a.jsxs("span",{className:"chat-playing-indicator__text",children:[y==null?void 0:y.fullName," has Watch Party open — wanna join?"]}),a.jsx("button",{type:"button",className:"chat-playing-indicator__btn",onClick:()=>{Y(!1),B(!1),H(!1),ie(!0)},children:"Open"})]}),a.jsxs("div",{ref:pe,className:"chat-container chat-container-ref flex-1 overflow-y-auto",onScroll:Xe,children:[(()=>{const p=Ke.filter(S=>{var m;return!((m=S.deletedFor)!=null&&m.includes(I._id))});return p.map((S,m)=>{var Pe;const w=p[m-1],N=w?new Date(w.createdAt).getTime():0,U=new Date(S.createdAt).getTime(),W=U-N>us,J=S.senderId===I._id,X=Ee===S._id,ce=S._id===ot&&S.senderId===I._id,ye=((Pe=b==null?void 0:b.participants)==null?void 0:Pe.length)===2,fe=J?(I==null?void 0:I.profilePic)||gt:(y==null?void 0:y.profilePic)||gt,Ze=!W&&w&&w.senderId===S.senderId,ze=p[m+1],ge=ze?new Date(ze.createdAt).getTime():0,we=ze&&ze.senderId===S.senderId&&ge-U<=us;return a.jsxs(d.Fragment,{children:[W&&a.jsx("div",{className:"chat-date-divider",children:dd(S.createdAt)}),a.jsxs("div",{className:`msg-row ${J?"msg-row--mine":"msg-row--theirs"} ${ye?"msg-row--no-avatar":""} ${Ze?"msg-row--follows-same":""} ${we?"msg-row--same-sender-below":""}`,children:[!ye&&a.jsx("img",{src:fe,alt:"",className:"msg-row__avatar"}),a.jsxs("div",{className:"relative flex items-start max-w-[75%] group message-menu",children:[!J&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"msg-bubble-wrapper",children:a.jsx("div",{className:`msg-bubble-ref msg-bubble-ref--theirs ${O.has(S._id)?"msg-bubble-ref--note":""}`,id:`msg-${S._id}`,children:S.deleted?a.jsxs("p",{className:"italic text-xs opacity-70 text-inherit whitespace-nowrap",children:["Message deleted by ",y.fullName]}):a.jsx(ds,{message:S,onReveal:()=>j(S._id)})})}),!S.deleted&&!ue&&a.jsxs("div",{className:"relative flex items-center flex-shrink-0",children:[X&&a.jsxs("div",{type:"button",onClick:Ue=>Ue.stopPropagation(),className:"msg-dropdown absolute left-full ml-2 top-0 z-50 rounded-md py-0.5 animate-scale-in",children:[a.jsxs("button",{onClick:()=>{v(S._id,"me"),Ae(null)},className:"msg-dropdown__item msg-dropdown__item--danger",children:[a.jsx(Ot,{size:12,className:"msg-dropdown__icon"}),a.jsx("span",{children:"Delete for me"})]}),a.jsxs("button",{onClick:()=>{M({chatId:b._id,messageId:S._id}),Ae(null)},className:"msg-dropdown__item",children:[a.jsx(Zt,{size:12,className:"msg-dropdown__icon text-gray-600"}),a.jsx("span",{children:O.has(S._id)?"Unmark note":"Mark note"})]}),a.jsx("div",{className:"msg-dropdown__item msg-dropdown__item--muted msg-dropdown__item--muted-left",children:a.jsx("span",{children:xn(S.createdAt)})})]}),a.jsx("button",{type:"button",onClick:Ue=>{Ue.stopPropagation(),Ae(S._id)},className:`msg-three-dots-btn ${X?"opacity-100":"opacity-0 group-hover:opacity-100"}`,children:"⋮"})]})]}),J&&a.jsxs(a.Fragment,{children:[!S.deleted&&!ue&&a.jsxs("div",{className:"relative flex items-center flex-shrink-0",children:[X&&a.jsxs("div",{type:"button",onClick:Ue=>Ue.stopPropagation(),className:"msg-dropdown absolute right-full mr-2 top-0 z-50 rounded-md py-0.5 animate-scale-in",children:[a.jsxs("div",{className:"msg-dropdown__row",children:[a.jsxs("button",{onClick:()=>{v(S._id,"me"),Ae(null)},className:"msg-dropdown__item msg-dropdown__item--danger",children:[a.jsx(Ot,{size:12,className:"msg-dropdown__icon"}),a.jsx("span",{children:"Delete for me"})]}),a.jsxs("button",{onClick:()=>{v(S._id,"everyone"),Ae(null)},className:"msg-dropdown__item msg-dropdown__item--danger",children:[a.jsx(Ot,{size:12,className:"msg-dropdown__icon"}),a.jsx("span",{children:"Delete for everyone"})]}),a.jsxs("button",{onClick:()=>{M({chatId:b._id,messageId:S._id}),Ae(null)},className:"msg-dropdown__item",children:[a.jsx(Zt,{size:12,className:"msg-dropdown__icon text-gray-600"}),a.jsx("span",{children:O.has(S._id)?"Unmark note":"Mark note"})]})]}),a.jsx("div",{className:"msg-dropdown__item msg-dropdown__item--muted",children:a.jsx("span",{children:xn(S.createdAt)})})]}),a.jsx("button",{type:"button",onClick:Ue=>{Ue.stopPropagation(),Ae(S._id)},className:`msg-three-dots-btn ${X?"opacity-100":"opacity-0 group-hover:opacity-100"}`,children:"⋮"})]}),a.jsxs("div",{className:"msg-bubble-wrapper",children:[a.jsx("div",{className:`msg-bubble-ref msg-bubble-ref--mine ${O.has(S._id)?"msg-bubble-ref--note":""}`,id:`msg-${S._id}`,children:S.deleted?a.jsx("p",{className:"italic text-xs opacity-70 text-inherit whitespace-nowrap",children:"Message deleted by you"}):a.jsx(ds,{message:S,onReveal:()=>j(S._id)})}),ce&&J&&a.jsx("div",{className:"msg-seen-below msg-seen-below--mine",children:`Seen at ${xn(S.seenAt)}`})]})]})]})]})]},S._id)})})(),Oe&&a.jsxs("div",{className:"bot-typing",children:[a.jsx("span",{className:"bot-name"}),a.jsxs("div",{className:"typing-dots",children:[a.jsx("span",{}),a.jsx("span",{}),a.jsx("span",{})]})]}),a.jsx("div",{ref:xe})]})]}),a.jsx("div",{className:"chat-input-bar-wrap",children:a.jsx(is,{})}),a.jsx(qc,{src:Fe,onClose:()=>Ne(null)})]})};window.jumpToMessage=e=>{const t=document.getElementById(`msg-${e}`);if(!t)return;t.scrollIntoView({behavior:"smooth",block:"center"});const r=t.classList.contains("msg-bubble-ref--mine")?"msg-bubble-ref--jump-mine":"msg-bubble-ref--jump-theirs";t.classList.remove("msg-bubble-ref--jump-mine","msg-bubble-ref--jump-theirs"),requestAnimationFrame(()=>{t.classList.add(r),setTimeout(()=>t.classList.remove(r),400)})};const fs=()=>{const{selectedChat:e,messages:t}=Re(),{notes:n,fetchNotes:r,setIsNotesOpen:s}=Z(),i=K(h=>h.authUser),[o,l]=d.useState(""),[c,u]=d.useState("added");d.useEffect(()=>{e!=null&&e._id&&r(e._id)},[e==null?void 0:e._id,r]);const f=n.filter(h=>{var x;const g=Array.isArray(t)?t.find(y=>String(y._id)===String(h.messageId)):null;return!(!g||g.deleted||(x=g.deletedFor)!=null&&x.includes(i==null?void 0:i._id))}).filter(h=>h.previewText.toLowerCase().includes(o.toLowerCase())).sort((h,g)=>{if(c==="added"){const b=new Date(h.createdAt||0).getTime();return new Date(g.createdAt||0).getTime()-b}const x=new Date(h.messageCreatedAt||0).getTime();return new Date(g.messageCreatedAt||0).getTime()-x});return a.jsxs("div",{className:"chat-notes-block",children:[a.jsxs("header",{className:"chat-notes-block__header",children:[a.jsx("h2",{className:"chat-notes-block__title",children:"Notes"}),a.jsx("button",{type:"button",className:"chat-notes-block__close",onClick:()=>s(!1),"aria-label":"Close notes",children:a.jsx(Ct,{size:20})})]}),a.jsxs("div",{className:"chat-notes-block__body",children:[a.jsx("input",{type:"text",placeholder:"Search notes...",value:o,onChange:h=>l(h.target.value),className:"chat-notes-block__search"}),a.jsxs("div",{className:"chat-notes-block__sort",children:[a.jsx("span",{className:"chat-notes-block__sort-label",children:"Sort by"}),a.jsxs("div",{className:"chat-notes-block__sort-btns",children:[a.jsx("button",{type:"button",className:`chat-notes-block__sort-btn ${c==="added"?"chat-notes-block__sort-btn--active":""}`,onClick:()=>u("added"),children:"Date added"}),a.jsx("button",{type:"button",className:`chat-notes-block__sort-btn ${c==="message"?"chat-notes-block__sort-btn--active":""}`,onClick:()=>u("message"),children:"Message date"})]})]}),f.map(h=>{let g=h.messageSenderId;if(!g&&h.messageId&&Array.isArray(t)){const y=t.find(b=>String(b._id)===String(h.messageId));y&&(g=y.senderId)}const x=g&&String(g)===String(i==null?void 0:i._id);return a.jsxs("button",{type:"button",className:`chat-notes-block__item ${x?"chat-notes-block__item--mine":"chat-notes-block__item--theirs"}`,onClick:()=>window.jumpToMessage(h.messageId),children:[h.previewText,a.jsx("span",{className:"chat-notes-block__item-meta",children:new Date(h.messageCreatedAt).toLocaleString()})]},h._id)})]})]})},fd=600,qn=["#1e293b","#dc2626","#ea580c","#ca8a04","#16a34a","#0891b2","#7c3aed","#db2777","#ffffff"],hd=10,md=4,jt=1e3,xa=750,hs=md/400*jt,pd=600,gd=450,wa=.7;function yd(e,t,n){return!n||!n.width||!n.height?{x:e,y:t}:{x:e/n.width*jt,y:t/n.height*xa}}function va(e,t){return!t||!t.width||!t.height?{x:e.x,y:e.y,size:e.size}:{x:e.x/jt*t.width,y:e.y/xa*t.height,size:e.size!=null?e.size/jt*t.width:void 0}}function bd(e,t){return!t||!t.width?e??6:(e??6)/jt*t.width}function ms(e,t,n,r="#ffffff"){if(!e||!Array.isArray(t.points)||t.points.length<2)return;const s=t.points.map(h=>va(h,n)),i=bd(t.brushSize,n),o=s.reduce((h,g)=>h+(g.size??i??6),0)/s.length,{tool:l}=t,c=l==="eraser"?Math.max(1,o*1.5):Math.max(1,o*wa);e.beginPath(),e.moveTo(s[0].x,s[0].y);for(let h=1;h<s.length-1;h++){const g=s[h-1],x=s[h],y=(g.x+x.x)/2,b=(g.y+x.y)/2;e.quadraticCurveTo(g.x,g.y,y,b)}const u=s[s.length-1],f=s[s.length-2];e.quadraticCurveTo(f.x,f.y,u.x,u.y),e.lineWidth=c,e.lineCap="round",e.lineJoin="round",l==="eraser"?(e.globalAlpha=1,e.globalCompositeOperation="source-over",e.strokeStyle=r):(e.globalCompositeOperation="source-over",e.globalAlpha=1,e.strokeStyle=t.color??"#1e293b"),e.stroke(),e.globalAlpha=1,e.globalCompositeOperation="source-over"}const ps=()=>{var ot;const e=Z(p=>p.setIsDrawingOpen),t=Re(p=>p.selectedChat),n=Re(p=>p.selectedUser),{socket:r,authUser:s}=K(),i=((ot=t==null?void 0:t.participants)==null?void 0:ot.find(p=>String(p._id)!==String(s==null?void 0:s._id)))??n,o=(t==null?void 0:t._id)!=null?String(t._id):null,l=Z(p=>o?p.pendingDrawingCanvasByChat[o]:null),c=Z(p=>p.clearPendingDrawingCanvas),u=pt(p=>p.theme),h=(u==null?void 0:u.chatBg)==="#0a0a0a"||(u==null?void 0:u.pageBg)==="#0a0a0a"||(u==null?void 0:u.chatBg)==="#000000"?(u==null?void 0:u.chatBg)??"#0a0a0a":"#ffffff",g=d.useRef(h);g.current=h;const x=d.useRef(null),y=d.useRef(!1),b=d.useRef([]),j=d.useRef(null),C=d.useRef([]),_=d.useRef([]),v=d.useRef(null),T=d.useRef(2),[R,I]=d.useState(6),[M,O]=d.useState(6),[$,B]=d.useState(()=>[...qn]),[Y,de]=d.useState(qn[0]),[G,ie]=d.useState("pencil"),Me=d.useRef(6),me=d.useRef(6),Q=d.useRef("pencil"),V=d.useRef(qn[0]),se=d.useRef(null),H=d.useRef(null),E=d.useRef(null),D=d.useRef(null),le=d.useRef(0);d.useEffect(()=>{Me.current=R,me.current=M,Q.current=G,V.current=Y},[R,M,G,Y]);const[ae,z]=d.useState(!1),[te,ke]=d.useState(!1),[_e,je]=d.useState(null),[_t,Je]=d.useState(0),Ye=d.useRef(0),nt=d.useRef(null),xe=d.useCallback(()=>{z(C.current.length>0),ke(_.current.length>0)},[]),pe=d.useCallback(()=>{H.current&&clearTimeout(H.current),H.current=setTimeout(()=>{var m;H.current=null;const p=(m=Re.getState().selectedChat)==null?void 0:m._id,S=x.current;if(!(!p||!(S!=null&&S.width)||!(S!=null&&S.height)))try{const w=S.toDataURL("image/png");be.put(`/drawings/${p}`,{imageData:w}).catch(N=>{console.warn("Drawing save failed:",N==null?void 0:N.message)})}catch{}},fd)},[]);d.useEffect(()=>(E.current=pe,()=>{E.current=null}),[pe]);const Ve=d.useCallback(p=>{const S=x.current;if(!S)return null;const m=S.getBoundingClientRect(),w=p.touches?p.touches[0].clientX:p.clientX,N=p.touches?p.touches[0].clientY:p.clientY,U=p.pressure!=null?p.pressure:1,W=w-m.left,J=N-m.top,{x:X,y:ce}=yd(W,J,m);return{logicalX:X,logicalY:ce,displayX:W,displayY:J,pressure:Math.min(1,Math.max(0,U))}},[]),Fe=d.useCallback(p=>{C.current.push(p),C.current.length>hd&&C.current.shift(),_.current=[],z(C.current.length>0),ke(!1)},[]),Ne=d.useCallback(p=>{const S=x.current,m=S==null?void 0:S.getContext("2d",{willReadFrequently:!1});if(!S||!m){p==null||p();return}const w=S.getBoundingClientRect(),N=T.current,U=C.current,W=v.current,J=()=>{m.save(),m.setTransform(N,0,0,N,0,0);const X=g.current;for(let ce=0;ce<U.length;ce++)ms(m,U[ce],w,X);m.restore(),p==null||p()};if(m.save(),m.setTransform(1,0,0,1,0,0),m.fillStyle=g.current,m.fillRect(0,0,S.width,S.height),m.restore(),W){const X=new Image;X.onload=()=>{m.save(),m.setTransform(1,0,0,1,0,0),m.drawImage(X,0,0,S.width,S.height),m.restore(),J()},X.onerror=()=>J(),X.src=W}else J()},[]);d.useEffect(()=>{const p=x.current;!p||!p.width||!p.height||Ne()},[h,Ne]),d.useEffect(()=>(D.current=Fe,()=>{D.current=null}),[Fe]);const Ee=d.useCallback(()=>{const p=x.current;if(!(p!=null&&p.width)||!(p!=null&&p.height))return;const S=K.getState().socket;if(!(S!=null&&S.connected))return;const m=Re.getState().selectedChat;if(!(m!=null&&m._id))return;const w=String(m._id);try{const N=p.width,U=p.height,W=800,J=.92;let X;if(N<=W&&U<=W)X=p.toDataURL("image/jpeg",J);else{const ye=W/Math.max(N,U),fe=Math.max(1,Math.floor(N*ye)),Ze=Math.max(1,Math.floor(U*ye)),ze=document.createElement("canvas");ze.width=fe,ze.height=Ze;const ge=ze.getContext("2d",{willReadFrequently:!0});ge?(ge.drawImage(p,0,0,N,U,0,0,fe,Ze),X=ze.toDataURL("image/jpeg",J)):X=p.toDataURL("image/jpeg",J)}const ce={chatId:w,imageData:X};S.emit("drawing_canvas_state",ce),setTimeout(()=>S.emit("drawing_canvas_state",ce),150)}catch{}},[]),Ae=d.useCallback(()=>{var N;const p=Re.getState().selectedChat,S=Re.getState().selectedUser,m=K.getState().authUser,w=((N=p==null?void 0:p.participants)==null?void 0:N.find(U=>String(U._id)!==String(m==null?void 0:m._id)))??S;return p!=null&&p._id&&w?{chatId:String(p._id),otherUserId:String(w._id??w)}:null},[]),Xe=d.useCallback((p=!1)=>{if(C.current.length===0)return;const S=C.current.pop();_.current.push(S),xe(),Ne(()=>{if(pe(),!p){const m=K.getState().socket,w=Ae();m!=null&&m.connected&&w&&(m.emit("drawing_undo",w),Ee())}})},[Ne,xe,pe,Ae,Ee]),Ke=d.useCallback((p=!1)=>{if(_.current.length===0)return;const S=_.current.pop();C.current.push(S),xe(),Ne(()=>{if(pe(),!p){const m=K.getState().socket,w=Ae();m!=null&&m.connected&&w&&(m.emit("drawing_redo",w),Ee())}})},[Ne,xe,pe,Ae,Ee]),A=d.useCallback((p=!1)=>{const S=x.current;if(!S)return;v.current=null,C.current=[],_.current=[];const m=S.getContext("2d",{willReadFrequently:!1});if(m.save(),m.setTransform(1,0,0,1,0,0),m.fillStyle=g.current,m.fillRect(0,0,S.width,S.height),m.restore(),xe(),pe(),!p){const w=K.getState().socket,N=Ae();w!=null&&w.connected&&N&&(w.emit("drawing_clear",N),Ee())}},[xe,pe,Ae,Ee]),ue=d.useRef({w:0,h:0});d.useEffect(()=>{const p=t==null?void 0:t._id;if(!p)return;const S=String(p),m=setTimeout(()=>{const w=x.current;!(w!=null&&w.width)||!(w!=null&&w.height)||se.current===S||Z.getState().pendingDrawingCanvasByChat[S]||(se.current=S,be.get(`/drawings/${p}`).then(U=>{var ce;const W=(ce=U==null?void 0:U.data)==null?void 0:ce.imageData;if(!W||!x.current||Z.getState().pendingDrawingCanvasByChat[S]||Date.now()-le.current<3e3||!x.current.getContext("2d",{willReadFrequently:!0}))return;const X=new Image;X.onload=()=>{const ye=x.current;if(!ye||Z.getState().pendingDrawingCanvasByChat[S])return;const fe=ye.getContext("2d",{willReadFrequently:!1});fe.save(),fe.setTransform(1,0,0,1,0,0),fe.fillStyle=g.current,fe.fillRect(0,0,ye.width,ye.height),fe.drawImage(X,0,0,ye.width,ye.height),fe.restore(),v.current=W,C.current=[],_.current=[],xe()},X.src=W}).catch(()=>{}))},150);return()=>clearTimeout(m)},[t==null?void 0:t._id,xe]),d.useEffect(()=>{const p=x.current;if(!p)return;const S=p.getContext("2d",{willReadFrequently:!1});if(!S)return;const m=Math.min(window.devicePixelRatio||1,3);T.current=m;const w=()=>{const U=p.parentElement;if(!U)return;const W=Math.max(1,U.clientWidth),J=Math.max(1,U.clientHeight);if(J<220||W===ue.current.w&&J===ue.current.h)return;ue.current={w:W,h:J};const X=Math.max(pd,Math.floor(W*m)),ce=Math.max(gd,Math.floor(J*m)),fe=p.width>0&&p.height>0?p.toDataURL("image/png"):null,Ze=p.width,ze=p.height;if(p.width=X,p.height=ce,p.style.width=`${W}px`,p.style.height=`${J}px`,p.style.flexShrink="0",S.setTransform(1,0,0,1,0,0),S.imageSmoothingEnabled=!0,S.imageSmoothingQuality="high",fe&&Ze>0&&ze>0){const ge=new Image;ge.onload=()=>{const we=ge.naturalWidth,Pe=ge.naturalHeight;if(S.fillStyle=g.current,S.fillRect(0,0,X,ce),X<=we&&ce<=Pe)S.drawImage(ge,0,0,X,ce,0,0,X,ce);else{const Ue=Math.floor((X-we)/2),P=Math.floor((ce-Pe)/2);S.drawImage(ge,0,0,we,Pe,Ue,P,we,Pe)}S.scale(m,m)},ge.src=fe}else S.fillStyle=g.current,S.fillRect(0,0,X,ce),S.scale(m,m)},N=new ResizeObserver(w);return N.observe(p.parentElement),w(),()=>N.disconnect()},[]);const ne=d.useCallback(p=>{var ye;p.preventDefault();const S=x.current;S&&p.target===S&&((ye=S.setPointerCapture)==null||ye.call(S,p.pointerId));const m=Ve(p);if(!m||!S||!S.width||!S.height)return;const w=S.getBoundingClientRect();je({x:m.displayX,y:m.displayY});const N=S.getContext("2d",{willReadFrequently:!1}),U=Q.current,W=U==="eraser"?me.current:Me.current,X=(U==="eraser"?W*1.5:W)*(.5+.5*(m.pressure??1)),ce=w.width?X/w.width*jt:X;j.current=N.getImageData(0,0,S.width,S.height),b.current=[{x:m.logicalX,y:m.logicalY,size:ce}],y.current=!0},[Ve]),Oe=d.useCallback(p=>{if(p.preventDefault(),!y.current)return;const S=Ve(p);if(!S)return;const m=x.current,w=m==null?void 0:m.getContext("2d",{willReadFrequently:!0});if(!w||!j.current)return;const N=m.getBoundingClientRect();je({x:S.displayX,y:S.displayY});const U=b.current,W=Q.current,J=W==="eraser"?me.current:Me.current,ce=(W==="eraser"?J*1.5:J)*(W==="eraser"?1:.5+.5*(S.pressure??1)),ye=N.width?ce/N.width*jt:ce;if(U.push({x:S.logicalX,y:S.logicalY,size:ye}),U.length<2)return;w.putImageData(j.current,0,0);const fe=U.map(Pe=>va(Pe,N));w.beginPath(),w.moveTo(fe[0].x,fe[0].y);for(let Pe=1;Pe<fe.length-1;Pe++){const Ue=fe[Pe-1],P=fe[Pe],F=(Ue.x+P.x)/2,q=(Ue.y+P.y)/2;w.quadraticCurveTo(Ue.x,Ue.y,F,q)}const Ze=fe[fe.length-1],ze=fe[fe.length-2];w.quadraticCurveTo(ze.x,ze.y,Ze.x,Ze.y);const ge=fe.reduce((Pe,Ue)=>Pe+(Ue.size??6),0)/fe.length,we=W==="eraser"?ge:Math.max(1,ge*wa);w.lineWidth=we,w.lineCap="round",w.lineJoin="round",W==="eraser"?(w.globalAlpha=1,w.globalCompositeOperation="source-over",w.strokeStyle=g.current,w.stroke()):(w.globalCompositeOperation="source-over",w.globalAlpha=1,w.strokeStyle=V.current,w.stroke()),w.globalAlpha=1,w.globalCompositeOperation="source-over"},[Ve]),De=d.useCallback(()=>{var N;if(!y.current)return;y.current=!1;const p=b.current,S=x.current,m=S==null?void 0:S.getContext("2d",{willReadFrequently:!0}),w=j.current;if(j.current=null,p.length>0){if((p.length<2||(()=>{let ge=0;for(let we=1;we<p.length;we++)ge+=Math.hypot(p[we].x-p[we-1].x,p[we].y-p[we-1].y);return ge<hs})())&&w&&m){m.putImageData(w,0,0),b.current=[];return}const W=S.getBoundingClientRect(),J=Q.current==="eraser"?me.current:Me.current,X=W.width?J/W.width*jt:J;if(Fe({points:p.map(ge=>({x:ge.x,y:ge.y,size:ge.size})),color:V.current,tool:Q.current,brushSize:X}),Q.current!=="eraser"){const ge=V.current;B(we=>we.includes(ge)?we:[...we,ge])}const ce=K.getState().socket,ye=Re.getState().selectedChat,fe=Re.getState().selectedUser,Ze=K.getState().authUser,ze=((N=ye==null?void 0:ye.participants)==null?void 0:N.find(ge=>String(ge._id)!==String(Ze==null?void 0:Ze._id)))??fe;if(ce&&(ye!=null&&ye._id)&&ze){const ge={chatId:String(ye._id),otherUserId:String(ze._id??ze),points:p.map(we=>({x:we.x,y:we.y,size:we.size})),color:V.current,brushSize:X,tool:Q.current};ce.emit("drawing_stroke",ge)}pe()}b.current=[]},[Fe,pe]);d.useEffect(()=>{const p=x.current,S=nt.current;if(!p||!S)return;const m=N=>{const U=S.getBoundingClientRect();je({x:N.clientX-U.left,y:N.clientY-U.top})},w=()=>je(null);return p.addEventListener("pointerdown",ne),p.addEventListener("pointermove",Oe),p.addEventListener("pointerup",De),p.addEventListener("pointerleave",De),p.addEventListener("pointercancel",De),S.addEventListener("pointermove",m),S.addEventListener("pointerleave",w),()=>{p.removeEventListener("pointerdown",ne),p.removeEventListener("pointermove",Oe),p.removeEventListener("pointerup",De),p.removeEventListener("pointerleave",De),p.removeEventListener("pointercancel",De),S.removeEventListener("pointermove",m),S.removeEventListener("pointerleave",w)}},[ne,Oe,De]),d.useEffect(()=>{const p=x.current;if(p)return p.style.touchAction="none",()=>{p.style.touchAction="",H.current&&(clearTimeout(H.current),H.current=null)}},[]),d.useEffect(()=>{if(!(t!=null&&t._id)||!i||!r)return;const p=String(t._id),S=String(i._id??i);return r.emit("join_chat",{chatId:p}),r.emit("drawing_playing",{chatId:p,otherUserId:S}),()=>{r.emit("drawing_left",{chatId:p,otherUserId:S})}},[t==null?void 0:t._id,i==null?void 0:i._id,r]),d.useEffect(()=>{const p=r;if(!p)return;const S=({chatId:m,points:w,color:N,brushSize:U,tool:W})=>{var ge,we;const J=Re.getState().selectedChat,X=(J==null?void 0:J._id)!=null?String(J._id):null;if(!X||X!==m)return;const ce=x.current,ye=ce==null?void 0:ce.getContext("2d",{willReadFrequently:!0});if(!ce||!ye||!Array.isArray(w)||w.length<2)return;let fe=0;for(let Pe=1;Pe<w.length;Pe++){const Ue=w[Pe-1],P=w[Pe];fe+=Math.hypot((P.x??0)-(Ue.x??0),(P.y??0)-(Ue.y??0))}if(fe<hs)return;const Ze=ce.getBoundingClientRect();ms(ye,{points:w,color:N,tool:W,brushSize:U},Ze,g.current),(ge=D.current)==null||ge.call(D,{points:w,color:N,tool:W,brushSize:U}),(we=E.current)==null||we.call(E)};return p.on("drawing_stroke",S),()=>p.off("drawing_stroke",S)},[r]),d.useEffect(()=>{const p=r;if(!p||!o)return;const S=({chatId:m})=>{String(m)===o&&Ee()};return p.on("drawing_request_canvas_state",S),()=>p.off("drawing_request_canvas_state",S)},[r,o,Ee]),d.useEffect(()=>{const p=r;if(!p||!o)return;const S=({chatId:N})=>{String(N)===o&&re("Other user undid",{icon:"↩️",duration:2e3})},m=({chatId:N})=>{String(N)===o&&re("Other user redid",{icon:"↪️",duration:2e3})},w=({chatId:N})=>{String(N)===o&&re("Other user cleared the canvas",{icon:"🗑️",duration:2e3})};return p.on("drawing_undo",S),p.on("drawing_redo",m),p.on("drawing_clear",w),()=>{p.off("drawing_undo",S),p.off("drawing_redo",m),p.off("drawing_clear",w)}},[r,o]);const Le=d.useRef(null);return d.useEffect(()=>{Le.current=({chatId:p,imageData:S})=>{var U;const m=((U=Re.getState().selectedChat)==null?void 0:U._id)!=null?String(Re.getState().selectedChat._id):null;if(!m||String(p)!==m||!S)return;const w=x.current;if(!(w!=null&&w.width)||!(w!=null&&w.height)){Z.getState().setPendingDrawingCanvas(m,S);return}const N=new Image;N.onerror=()=>Z.getState().clearPendingDrawingCanvas(m),N.onload=()=>{var X;const W=x.current;if(!W)return;le.current=Date.now();const J=W.getContext("2d",{willReadFrequently:!1});J&&(J.save(),J.setTransform(1,0,0,1,0,0),J.fillStyle=g.current,J.fillRect(0,0,W.width,W.height),J.drawImage(N,0,0,N.naturalWidth||W.width,N.naturalHeight||W.height,0,0,W.width,W.height),J.restore(),v.current=S,C.current=[],_.current=[],xe(),(X=E.current)==null||X.call(E),Z.getState().clearPendingDrawingCanvas(m))},N.src=S}}),d.useEffect(()=>{if(!r||!o)return;const p=S=>{var m;return(m=Le.current)==null?void 0:m.call(Le,S)};return r.on("drawing_canvas_state",p),()=>r.off("drawing_canvas_state",p)},[r,o]),d.useEffect(()=>{if(!l||!o)return;const p=x.current;if(!p)return;if(!p.width||!p.height){if(Ye.current+=1,Ye.current>50){c(o),Ye.current=0;return}const w=setTimeout(()=>Je(N=>N+1),100);return()=>clearTimeout(w)}Ye.current=0;const S=l,m=new Image;m.onerror=()=>{c(o)},m.onload=()=>{var U;const w=x.current;if(!w)return;const N=w.getContext("2d",{willReadFrequently:!1});N&&(le.current=Date.now(),N.save(),N.setTransform(1,0,0,1,0,0),N.fillStyle=g.current,N.fillRect(0,0,w.width,w.height),N.drawImage(m,0,0,m.naturalWidth||w.width,m.naturalHeight||w.height,0,0,w.width,w.height),N.restore(),v.current=S,C.current=[],_.current=[],xe(),(U=E.current)==null||U.call(E),c(o))},m.src=S},[l,o,_t,xe,c]),a.jsxs("div",{className:"chat-drawing-block",children:[a.jsxs("header",{className:"chat-drawing-block__header",children:[a.jsx("h2",{className:"chat-drawing-block__title",children:"Drawing"}),a.jsx("div",{className:"chat-drawing-block__header-actions",children:a.jsx("button",{type:"button",className:"chat-drawing-block__btn",onClick:()=>e(!1),"aria-label":"Close drawing",title:"Close",children:a.jsx(Ct,{size:20})})})]}),a.jsx("div",{className:"chat-drawing-block__toolbar",children:a.jsxs("div",{className:"chat-drawing-block__toolbar-row",children:[a.jsxs("div",{className:"chat-drawing-block__tools",children:[a.jsx("button",{type:"button",className:`chat-drawing-block__tool-btn ${G==="pencil"?"chat-drawing-block__tool-btn--active":""}`,onClick:()=>ie("pencil"),title:"Pencil","aria-pressed":G==="pencil",children:a.jsx(kn,{size:16})}),a.jsx("button",{type:"button",className:`chat-drawing-block__tool-btn ${G==="eraser"?"chat-drawing-block__tool-btn--active":""}`,onClick:()=>ie("eraser"),title:"Eraser","aria-pressed":G==="eraser",children:a.jsx(yc,{size:16})})]}),a.jsx("div",{className:"chat-drawing-block__size-inline",children:a.jsx("input",{type:"range",min:1,max:24,value:G==="eraser"?M:R,onChange:p=>G==="eraser"?O(Number(p.target.value)):I(Number(p.target.value)),className:"chat-drawing-block__size-slider",title:G==="eraser"?"Eraser size":"Pencil size","aria-label":G==="eraser"?"Eraser size":"Pencil size"})}),a.jsx("div",{className:`chat-drawing-block__colors-wrap ${G!=="pencil"?"chat-drawing-block__colors-wrap--hidden":""}`,children:a.jsxs("div",{className:"chat-drawing-block__colors",children:[$.map(p=>a.jsx("button",{type:"button",className:`chat-drawing-block__color-btn ${Y===p?"chat-drawing-block__color-btn--active":""}`,style:{background:p},onClick:()=>de(p),title:p,"aria-label":`Color ${p}`,children:Y===p&&p==="#ffffff"?a.jsx("span",{className:"chat-drawing-block__color-check"}):null},p)),a.jsxs("label",{className:`chat-drawing-block__color-btn chat-drawing-block__color-btn--custom ${$.includes(Y)?"":"chat-drawing-block__color-btn--active"}`,title:"Pick any colour",children:[a.jsx("input",{type:"color",value:Y,onChange:p=>de(p.target.value),className:"chat-drawing-block__color-input","aria-label":"Pick custom colour"}),a.jsx("span",{className:"chat-drawing-block__color-custom-icon","aria-hidden":!0,children:"+"})]})]})}),a.jsxs("div",{className:"chat-drawing-block__actions",children:[a.jsx("button",{type:"button",className:"chat-drawing-block__action-btn",onClick:()=>Xe(),disabled:!ae,"aria-label":"Undo",title:"Undo",children:a.jsx(Rc,{size:16})}),a.jsx("button",{type:"button",className:"chat-drawing-block__action-btn",onClick:()=>Ke(),disabled:!te,"aria-label":"Redo",title:"Redo",children:a.jsx(Cc,{size:16})}),a.jsx("button",{type:"button",className:"chat-drawing-block__action-btn",onClick:()=>A(),"aria-label":"Clear all",title:"Clear all",children:a.jsx(Ot,{size:16})})]})]})}),a.jsx("div",{className:"chat-drawing-block__body",children:a.jsxs("div",{ref:nt,className:"chat-drawing-block__canvas-wrap",children:[a.jsx("canvas",{ref:x,className:"chat-drawing-block__canvas","aria-label":"Drawing canvas",style:{cursor:"none"}}),_e!=null&&a.jsx("div",{className:`chat-drawing-block__cursor ${G==="eraser"?"chat-drawing-block__cursor--eraser":""}`,style:{left:_e.x,top:_e.y,width:(G==="eraser"?M*1.5:R)*2,height:(G==="eraser"?M*1.5:R)*2,marginLeft:-(G==="eraser"?M*1.5:R),marginTop:-(G==="eraser"?M*1.5:R),borderColor:G==="eraser"?"#94a3b8":Y}})]})})]})};let dn=null;function _d(){var e;return typeof window>"u"?Promise.resolve(null):(e=window.YT)!=null&&e.Player?Promise.resolve(window.YT):dn||(dn=new Promise(t=>{var o,l,c;if((o=window.YT)!=null&&o.Player){t(window.YT);return}const n=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{n&&n(),t(window.YT)};const r=document.createElement("script"),s=typeof((l=window.location)==null?void 0:l.origin)=="string"?window.location.origin:"";r.src=s?`https://www.youtube.com/iframe_api?origin=${encodeURIComponent(s)}`:"https://www.youtube.com/iframe_api";const i=document.getElementsByTagName("script")[0];(c=i==null?void 0:i.parentNode)==null||c.insertBefore(r,i)}),dn)}const Gt=1,gs=2,Yn=3,Sa=100,xd=Sa*1024*1024,wd=100,vd=280,Sd=1,jd=2,Cd=600,Gn=1.2,kd=80;function ys(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"0:00";const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60),s=i=>String(i).padStart(2,"0");return t>0?`${t}:${s(n)}:${s(r)}`:`${n}:${s(r)}`}function Nd(e){if(!e||typeof e!="string")return null;const t=e.trim(),n=t.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);if(n)return n[1];const r=t.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);if(r)return r[1];const s=t.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);return s?s[1]:null}const bs=()=>{var we,Pe,Ue;const e=Lt(),{setIsVideoPanelOpen:t,pendingYoutubeUrl:n,setPendingYoutubeUrl:r,videoPanelWidth:s,setVideoPanelWidth:i,watchPartyYoutubeUrlByChat:o,setWatchPartyYoutubeUrl:l,watchPartyLocalVideoUrlByChat:c,setWatchPartyLocalVideoUrl:u,videoUserIdByChat:f,watchPartyResumeByChat:h,setWatchPartyResume:g,watchPartyClearedByOtherByChat:x,setWatchPartyClearedByOther:y}=Z(),b=Re(P=>P.selectedChat),j=K(P=>P.authUser),C=K(P=>P.socket),_=(we=b==null?void 0:b.participants)==null?void 0:we.find(P=>String(P._id)!==String(j==null?void 0:j._id)),[v,T]=d.useState("youtube"),[R,I]=d.useState("stream"),[M,O]=d.useState(""),[$,B]=d.useState(null),[Y,de]=d.useState(""),G=d.useRef(0),ie=d.useRef(0),[Me,me]=d.useState(!0),Q=d.useRef(null),V=d.useRef(0),se=d.useCallback(P=>{var Ie,he;P.preventDefault(),G.current=P.clientX??((he=(Ie=P.touches)==null?void 0:Ie[0])==null?void 0:he.clientX)??0,ie.current=s;const F=L=>{var Qe,qe;const ve=L.clientX??((qe=(Qe=L.touches)==null?void 0:Qe[0])==null?void 0:qe.clientX)??G.current,We=G.current-ve;i(ie.current+We)},q=()=>{document.removeEventListener("mousemove",F),document.removeEventListener("mouseup",q),document.removeEventListener("touchmove",F),document.removeEventListener("touchend",q)};document.addEventListener("mousemove",F),document.addEventListener("mouseup",q),document.addEventListener("touchmove",F,{passive:!0}),document.addEventListener("touchend",q)},[s,i]),H=d.useMemo(()=>Nd(M),[M]);d.useEffect(()=>{n&&(O(n),r(null))},[n,r]),d.useEffect(()=>{if(!(b!=null&&b._id)||!_||!C)return;const P=String(b._id),F=String(_._id??_);return C.emit("join_chat",{chatId:P}),C.emit("watch_party_playing",{chatId:P,otherUserId:F}),()=>{C.emit("watch_party_left",{chatId:P,otherUserId:F})}},[b==null?void 0:b._id,_==null?void 0:_._id,C]);const E=(b==null?void 0:b._id)!=null?String(b._id):null,D=E?o==null?void 0:o[E]:void 0,le=E&&_&&(f==null?void 0:f[E])&&String(f[E])===String(_._id??_),ae=d.useRef(void 0),z=E?(Pe=h==null?void 0:h[E])==null?void 0:Pe.youtube:void 0,te=E?(Ue=h==null?void 0:h[E])==null?void 0:Ue.local:void 0;d.useEffect(()=>{const P=E,F=v;return()=>{var he;if(!P)return;const q=Ne.current,Ie=xe.current;if(F==="local"&&q&&Number.isFinite(q.currentTime))g(P,"local",q.currentTime,q.paused);else if(F==="youtube"&&(Ie!=null&&Ie.getCurrentTime))try{const L=Ie.getCurrentTime(),ve=(he=Ie.getPlayerState)==null?void 0:he.call(Ie);g(P,"youtube",L,ve!==Gt&&ve!==Yn)}catch{}}},[E,v,g]);const ke=d.useRef(M);ke.current=M,d.useEffect(()=>{if(v!=="youtube"||!E||!_||!C)return;const P=(ke.current||"").trim();P&&C.emit("watch_party_youtube_url",{chatId:E,otherUserId:String(_._id??_),url:P})},[v,E,_==null?void 0:_._id,C]),d.useEffect(()=>{if(!E||v!=="youtube")return;const P=typeof D=="string"&&D.trim()!==""?D:null;P&&ae.current!==P&&(ae.current=P,O(P)),D||(ae.current=void 0)},[E,v,D]);const _e=E?x==null?void 0:x[E]:void 0;d.useEffect(()=>{if(!E||!_e)return;O("");const P=Ve.current;P&&URL.revokeObjectURL(P),B(null),de(""),y(E,null)},[E,_e,y]),d.useEffect(()=>{if(v!=="youtube"||!E||!_||!C)return;const P=setTimeout(()=>{C.emit("watch_party_youtube_url",{chatId:E,otherUserId:String(_._id??_),url:M.trim()||""})},400);return()=>clearTimeout(P)},[v,E,_,C,M]);const je=async()=>{try{const P=await navigator.clipboard.readText();P&&O(P.trim())}catch{}},_t=P=>{var q;const F=(q=P.target.files)==null?void 0:q[0];if(Y&&URL.revokeObjectURL(Y),!F){B(null),de("");return}if(R==="upload"&&F.size>xd){re.error(`In Upload mode, keep file under ${Sa} MB. Use Stream mode for larger videos.`),P.target.value="";return}B(F),de(URL.createObjectURL(F))},[Je,Ye]=d.useState(!1),nt=d.useRef(null),xe=d.useRef(null),pe=d.useRef(null),Ve=d.useRef("");Ve.current=Y;const Fe=E?c==null?void 0:c[E]:void 0;d.useEffect(()=>{_d().then(P=>{P&&Ye(!0)})},[]);const Ne=d.useRef(null),Ee=d.useRef(!1),Ae=d.useRef(null),Xe=d.useRef(!1),Ke=d.useRef(!1),A=d.useRef(0),[ue,ne]=d.useState(0),[Oe,De]=d.useState(0),[Le,ot]=d.useState(!0),p=v==="youtube"&&H||v==="local"&&(Fe||Y),S=d.useCallback(()=>{if(!p)return;const P=Date.now();e&&P-V.current<180||(V.current=P,me(F=>F||!0),e&&(Q.current&&clearTimeout(Q.current),Q.current=setTimeout(()=>{me(!1)},3e3)))},[p,e]);d.useEffect(()=>{if(!p){me(!1),Q.current&&(clearTimeout(Q.current),Q.current=null);return}return me(!0),e&&(Q.current&&clearTimeout(Q.current),Q.current=setTimeout(()=>{me(!1)},3e3)),()=>{Q.current&&(clearTimeout(Q.current),Q.current=null)}},[p,e]);const m=d.useCallback((P,F,q)=>{!E||!_||!C||C.emit("watch_party_sync",{chatId:E,otherUserId:String(_._id??_),event:P,currentTime:F,isPaused:q,ts:Date.now(),source:v})},[E,_,C,v]),w=d.useRef(m);w.current=m,d.useEffect(()=>{if(!C||!E||!_)return;const P=String(_._id??_),F=({chatId:q,userId:Ie,event:he,currentTime:L,isPaused:ve,ts:We,source:Qe})=>{var vr,Sr;if(String(q)!==E||String(Ie)!==P||Qe!==v)return;const qe=Ne.current,Se=xe.current;let et=typeof L=="number"&&!Number.isNaN(L)?L:void 0;if(et!==void 0&&typeof We=="number"&&(he==="play"||he==="timeupdate")&&!ve){const ut=(Date.now()-We)/1e3;et=Math.max(0,et+ut),ut>2&&(et=L)}const Na=he==="timeupdate",wr=v==="local"?jd:Sd;let Ut=0;if(v==="local"&&qe)Ut=qe.currentTime??0;else if(v==="youtube"&&(Se!=null&&Se.getCurrentTime))try{Ut=Se.getCurrentTime()??0}catch{}if(Na&&et!==void 0){if(v==="local"&&qe){const ut=Date.now();if(ut-A.current<Cd)return;const Dn=et-Ut;if(Math.abs(Dn)<=wr||Dn<0&&-Dn<Gn)return;A.current=ut}else if(v==="youtube"&&(Se!=null&&Se.getCurrentTime)){const ut=et-Ut;if(Math.abs(ut)<=wr||ut<0&&-ut<Gn)return}}et!==void 0&&et<Ut&&Ut-et<Gn&&(et=void 0),Ee.current=!0,v==="local"&&qe?(et!==void 0&&(qe.currentTime=et),he==="play"||he==="timeupdate"&&!ve?qe.play().catch(()=>{}):(he==="pause"||he==="timeupdate"&&ve)&&qe.pause()):v==="youtube"&&(Se!=null&&Se.seekTo)&&(et!==void 0&&Se.seekTo(et,!0),he==="play"||he==="timeupdate"&&!ve?(vr=Se.playVideo)==null||vr.call(Se):(he==="pause"||he==="timeupdate"&&ve)&&((Sr=Se.pauseVideo)==null||Sr.call(Se))),setTimeout(()=>{Ee.current=!1},kd)};return C.on("watch_party_sync",F),()=>C.off("watch_party_sync",F)},[C,E,_,v]),d.useEffect(()=>{A.current=0},[v,E]);const N=d.useCallback(()=>{var P;Ee.current||Xe.current||m("play",(P=Ne.current)==null?void 0:P.currentTime,!1)},[m]),U=d.useCallback(()=>{var F;if(Ee.current||Xe.current)return;const P=(F=Ne.current)==null?void 0:F.currentTime;m("pause",typeof P=="number"?P:void 0,!0)},[m]),W=d.useCallback(()=>{Ee.current||Xe.current||Ae.current||(Ae.current=setTimeout(()=>{Ae.current=null;const P=Ne.current;P&&m("timeupdate",P.currentTime,P.paused)},vd))},[m]),J=d.useCallback(()=>{var F,q;if(Ee.current||Xe.current)return;const P=(F=Ne.current)==null?void 0:F.currentTime;m("seek",typeof P=="number"?P:void 0,((q=Ne.current)==null?void 0:q.paused)??!0)},[m]),X=d.useCallback(()=>{var F,q;if(Ee.current||Xe.current)return;const P=(F=Ne.current)==null?void 0:F.currentTime;m("timeupdate",typeof P=="number"?P:void 0,((q=Ne.current)==null?void 0:q.paused)??!0)},[m]);d.useEffect(()=>{if(v!=="youtube"||!Je||!H||!nt.current||typeof window.YT>"u")return;const P=window.YT,F=nt.current,q=document.createElement("div");q.style.width="100%",q.style.height="100%",F.appendChild(q);const Ie=z,he=new P.Player(q,{videoId:H,width:"100%",height:"100%",playerVars:{autoplay:D&&M.trim()===(D||"").trim()?1:0},events:{onReady:ve=>{var We,Qe,qe,Se;if(Ie&&typeof Ie.currentTime=="number"&&Ie.currentTime>0)try{ve.target.seekTo(Ie.currentTime,!0),Ie.isPaused?(Qe=(We=ve.target).pauseVideo)==null||Qe.call(We):(Se=(qe=ve.target).playVideo)==null||Se.call(qe)}catch{}},onStateChange:ve=>{var qe,Se;if(Ee.current||Xe.current)return;const We=w.current;if(!We)return;const Qe=(Se=(qe=ve.target).getCurrentTime)==null?void 0:Se.call(qe);ve.data===Gt?We("play",Qe,!1):ve.data===gs?We("pause",Qe,!0):ve.data===Yn&&We("seek",Qe,!1)}}});xe.current=he;const L=setInterval(()=>{var ve,We,Qe;if(!Ee.current)try{const qe=(ve=he.getPlayerState)==null?void 0:ve.call(he);if(qe===Gt){const Se=(We=he.getCurrentTime)==null?void 0:We.call(he);typeof Se=="number"&&w.current("timeupdate",Se,!1)}else if(qe===gs){const Se=(Qe=he.getCurrentTime)==null?void 0:Qe.call(he);typeof Se=="number"&&w.current("timeupdate",Se,!0)}}catch{}},wd);return pe.current=L,()=>{pe.current&&clearInterval(pe.current),pe.current=null,xe.current=null;try{he.destroy&&he.destroy()}catch{}q.parentNode&&q.parentNode.removeChild(q)}},[v,Je,H]),d.useEffect(()=>{if(!p||Ke.current)return;const P=()=>{var q,Ie,he;if(!Ke.current){if(v==="local"){const L=Ne.current;L&&(ne(L.currentTime),ot(L.paused),Number.isFinite(L.duration)&&L.duration>0&&De(L.duration))}else if(v==="youtube"){const L=xe.current;if((L==null?void 0:L.getCurrentTime)!=null)try{const ve=(q=L.getCurrentTime)==null?void 0:q.call(L),We=(Ie=L.getDuration)==null?void 0:Ie.call(L),Qe=(he=L.getPlayerState)==null?void 0:he.call(L);typeof ve=="number"&&ne(ve),typeof We=="number"&&We>0&&De(We),ot(Qe!==Gt&&Qe!==Yn)}catch{}}}};P();const F=setInterval(P,300);return()=>clearInterval(F)},[v,p,H,Fe,Y]);const ce=10,ye=d.useCallback(()=>{var P,F,q,Ie,he;if(S(),!!p)if(Xe.current=!0,setTimeout(()=>{Xe.current=!1},150),v==="local"){const L=Ne.current;if(!L)return;L.paused?(L.play().catch(()=>{}),m("play",L.currentTime,!1)):(L.pause(),m("pause",L.currentTime,!0))}else{const L=xe.current;if(!L)return;try{((P=L.getPlayerState)==null?void 0:P.call(L))===Gt?((F=L.pauseVideo)==null||F.call(L),m("pause",(q=L.getCurrentTime)==null?void 0:q.call(L),!0)):((Ie=L.playVideo)==null||Ie.call(L),m("play",(he=L.getCurrentTime)==null?void 0:he.call(L),!1))}catch{}}},[v,p,m]),fe=d.useCallback(P=>{if(S(),!p||typeof P!="number"||Number.isNaN(P))return;const F=Math.max(0,Math.min(P,Oe||P));if(Xe.current=!0,setTimeout(()=>{Xe.current=!1},150),v==="local"){const q=Ne.current;q&&(q.currentTime=F,m("seek",F,q.paused))}else{const q=xe.current;q!=null&&q.seekTo&&(q.seekTo(F,!0),m("seek",F,!1))}ne(F)},[v,p,Oe,m]),Ze=d.useCallback(()=>{S(),fe(ue-ce)},[ue,fe]),ze=d.useCallback(()=>{S(),fe(ue+ce)},[ue,fe]),ge=d.useCallback(()=>{v==="youtube"?(O(""),E&&_&&C&&(C.emit("watch_party_clear",{chatId:E,otherUserId:String(_._id??_)}),l(E,null))):(Y&&URL.revokeObjectURL(Y),B(null),de(""),E&&(u(E,null),_&&C&&C.emit("watch_party_clear",{chatId:E,otherUserId:String(_._id??_)})))},[v,Y,E,_,C,u,l]);return a.jsxs("div",{className:`chat-video-panel ${e?"chat-video-panel--mobile":""}`,style:e?void 0:{width:s,minWidth:s},children:[a.jsx("button",{type:"button",className:"chat-video-panel__resize",onMouseDown:se,onTouchStart:se,"aria-label":"Resize panel",children:a.jsx(bc,{size:16})}),a.jsxs("header",{className:"chat-video-panel__header",children:[a.jsx("h2",{className:"chat-video-panel__title",children:"Watch Party"}),a.jsx("button",{type:"button",className:"chat-video-panel__close",onClick:()=>t(!1),"aria-label":"Close video",children:a.jsx(Ct,{size:20})})]}),_&&a.jsx("p",{className:`chat-video-panel__joined ${le?"chat-video-panel__joined--active":""}`,role:"status",children:le?`${_.fullName||"Friend"} is watching with you`:`Waiting for ${_.fullName||"friend"} to join…`}),a.jsxs("div",{className:`chat-video-panel__body ${v==="local"?"chat-video-panel__body--local":""}`,children:[a.jsxs("div",{className:"chat-video-panel__tabs",children:[a.jsx("div",{className:"chat-video-panel__tabs-slider","aria-hidden":!0,style:{transform:v==="youtube"?"translateX(0)":"translateX(100%)"}}),a.jsx("button",{type:"button",className:`chat-video-panel__tab ${v==="youtube"?"chat-video-panel__tab--active":""}`,onClick:()=>T("youtube"),children:"YouTube"}),a.jsx("button",{type:"button",className:`chat-video-panel__tab ${v==="local"?"chat-video-panel__tab--active":""}`,onClick:()=>T("local"),children:"Local"})]}),v==="youtube"&&a.jsx("div",{className:"chat-video-panel__youtube-controls",children:a.jsx("div",{className:"chat-video-panel__controls",children:a.jsxs("div",{className:"chat-video-panel__url-row",children:[a.jsx("button",{type:"button",className:"chat-video-panel__url-icon-wrap",onClick:je,title:"Paste from clipboard","aria-label":"Paste URL",children:a.jsx(_c,{size:20,strokeWidth:2.5})}),a.jsx("input",{type:"text",placeholder:"YouTube URL",value:M,onChange:P=>O(P.target.value),className:"chat-video-panel__input chat-video-panel__url-input"})]})})}),v==="local"&&a.jsxs("div",{className:"chat-video-panel__local-controls",children:[a.jsx("div",{className:"chat-video-panel__local-mode",children:a.jsxs("div",{className:"chat-video-panel__local-mode-tabs",children:[a.jsx("div",{className:"chat-video-panel__local-mode-slider","aria-hidden":!0,style:{transform:R==="stream"?"translateX(0)":"translateX(100%)"}}),a.jsx("button",{type:"button",className:`chat-video-panel__local-mode-tab ${R==="stream"?"chat-video-panel__local-mode-tab--active":""}`,onClick:()=>I("stream"),children:"Stream"}),a.jsx("button",{type:"button",className:`chat-video-panel__local-mode-tab ${R==="upload"?"chat-video-panel__local-mode-tab--active":""}`,onClick:()=>I("upload"),children:"Upload"})]})}),a.jsxs("label",{className:"chat-video-panel__file-row",children:[a.jsx("span",{className:"chat-video-panel__file-icon-wrap","aria-hidden":!0,children:a.jsx(Mc,{size:20,strokeWidth:2.5})}),a.jsx("span",{className:"chat-video-panel__file-btn",children:"Choose video file"}),a.jsx("input",{type:"file",accept:"video/*",onChange:_t,className:"chat-video-panel__file-input"})]}),a.jsx("p",{className:`chat-video-panel__file-name ${!$&&!Fe?"chat-video-panel__file-name--spacer":""}`,"aria-hidden":!$&&!Fe,children:$?$.name:Fe?"Video shared with you":" "})]}),a.jsxs("div",{className:`chat-video-panel__player-zone ${v==="local"?"chat-video-panel__player-zone--local":""}`,onMouseMove:S,onTouchStart:S,children:[v==="youtube"&&(H?a.jsx("div",{className:"chat-video-panel__player-wrap chat-video-panel__player-wrap--youtube",children:a.jsx("div",{ref:nt,className:"chat-video-panel__youtube-container"})}):a.jsx("div",{className:"chat-video-panel__player-placeholder"})),v==="local"&&(Fe||Y?a.jsx("div",{className:"chat-video-panel__player-wrap",children:a.jsx("video",{ref:Ne,src:Fe||Y,className:"chat-video-panel__video",playsInline:!0,preload:R==="stream"&&!Fe?"metadata":"auto",onLoadedMetadata:P=>{const F=P.target;te&&typeof te.currentTime=="number"&&te.currentTime>0&&(F.currentTime=te.currentTime,te.isPaused?F.pause():F.play().catch(()=>{}))},onPlay:N,onPause:U,onTimeUpdate:W,onSeeking:J,onSeeked:X})}):a.jsx("div",{className:"chat-video-panel__player-placeholder"}))]}),p&&Me&&(()=>{const P=Math.max(1,Oe||0);return a.jsxs("div",{className:"chat-video-panel__playback-bar",children:[a.jsxs("div",{className:"chat-video-panel__seek-row",children:[a.jsxs("span",{className:"chat-video-panel__time-label","aria-hidden":!0,children:[ys(ue)," / ",ys(Oe)]}),a.jsx("div",{className:"chat-video-panel__seek-track",style:{"--seek-fill":`${P>0?ue/P*100:0}%`},children:a.jsx("input",{type:"range",className:"chat-video-panel__seek-input",min:0,max:P,step:.1,value:Math.min(ue,P),onMouseDown:()=>{Ke.current=!0},onTouchStart:()=>{Ke.current=!0},onMouseUp:()=>{Ke.current=!1},onTouchEnd:()=>{Ke.current=!1},onChange:F=>fe(parseFloat(F.target.value,10)),"aria-label":"Seek"})})]}),a.jsxs("div",{className:"chat-video-panel__playback-buttons",children:[a.jsx("button",{type:"button",className:"chat-video-panel__playback-btn",onClick:Ze,"aria-label":"Skip back 10 seconds",children:a.jsx(Ec,{size:20,strokeWidth:2})}),a.jsx("button",{type:"button",className:"chat-video-panel__playback-btn chat-video-panel__playback-btn--primary",onClick:ye,"aria-label":Le?"Play":"Pause",children:Le?a.jsx(jc,{size:24,strokeWidth:2}):a.jsx(vc,{size:24,strokeWidth:2})}),a.jsx("button",{type:"button",className:"chat-video-panel__playback-btn",onClick:ze,"aria-label":"Skip forward 10 seconds",children:a.jsx(Tc,{size:20,strokeWidth:2})}),a.jsxs("button",{type:"button",className:"chat-video-panel__clear-btn",onClick:ge,"aria-label":"Clear video",children:[a.jsx(Ot,{size:16}),"Clear"]})]})]})})()]})]})},Ed="/assets/bottle-BRACAQwl.png";function Td({rotation:e,onSpin:t,isSpinning:n}){return a.jsx("div",{className:"bottle-wrapper",children:a.jsx("img",{src:Ed,alt:"Bottle",className:"bottle-img",style:{transform:`
      rotate(${e}deg) scale(2)
      rotateX(${Math.sin(e*.02)*3}deg)
    `,transition:n?"none":"transform 0.45s ease-out",cursor:n?"default":"pointer"},onClick:n?void 0:t})})}const Rd=["Heads","Tails"];function Md({onGameResult:e,syncedResult:t}){const[n,r]=d.useState(null),[s,i]=d.useState(!1),o=d.useRef(null);d.useEffect(()=>{o.current=new Audio("/coinflip.mp3"),o.current.volume=.5},[]),d.useEffect(()=>{if(!t||s)return;const u=o.current;u&&(u.pause(),u.currentTime=0,u.play()),r(t),i(!0);const f=setTimeout(()=>i(!1),800);return()=>clearTimeout(f)},[t]);const l=()=>{if(s)return;const u=Rd[Math.floor(Math.random()*2)];e==null||e(u);const f=o.current;f&&(f.pause(),f.currentTime=0,f.play()),r(u),i(!0),setTimeout(()=>i(!1),800)},c=s?n==="Tails"?"td-coin__flip-inner--to-tails":"td-coin__flip-inner--to-heads":n==="Tails"?"td-coin__flip-inner--show-tails":"td-coin__flip-inner--show-heads";return a.jsxs("div",{className:"td-mini-game",children:[a.jsx("div",{role:"button",tabIndex:0,className:"td-coin",onClick:l,onKeyDown:u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),l())},"aria-label":"Flip coin",style:{cursor:s?"default":"pointer"},children:a.jsxs("div",{className:`td-coin__flip-inner ${c}`,children:[a.jsx("div",{className:"td-coin__side td-coin__side--head",children:a.jsx("img",{src:"/head.png",alt:"Heads",className:"td-coin__face"})}),a.jsx("div",{className:"td-coin__side td-coin__side--tails",children:a.jsx("img",{src:"/tails.png",alt:"Tails",className:"td-coin__face"})})]})}),a.jsx("div",{className:"td-coin__result-wrap",children:n&&!s&&a.jsx("p",{className:"td-coin__result","aria-live":"polite",children:n})})]})}const Pd=[1,2,3,4,5,6],Id={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};function un(){return Pd[Math.floor(Math.random()*6)]}function Ad({value:e}){if(e==null)return null;const t=Id[e]??[];return a.jsx("div",{className:"td-dice__face","aria-hidden":!0,children:[1,2,3,4,5,6,7,8,9].map(n=>a.jsx("span",{className:`td-dice__pip ${t.includes(n)?"td-dice__pip--on":""}`},n))})}function Od({onGameResult:e,syncedValue:t}){const[n,r]=d.useState(null),[s,i]=d.useState(!1),[o,l]=d.useState(null),c=d.useRef(null),u=d.useRef(null);d.useEffect(()=>(u.current=new Audio("/dieroll.mp3"),u.current.volume=.5,()=>{c.current&&clearInterval(c.current)}),[]),d.useEffect(()=>{if(t==null||s)return;const g=u.current;g&&(g.pause(),g.currentTime=0,g.play()),i(!0),r(null),l(t);const x=80,y=800;c.current=setInterval(()=>{l(un())},x);const b=setTimeout(()=>{c.current&&(clearInterval(c.current),c.current=null),r(t),l(t),i(!1)},y);return()=>{clearTimeout(b),c.current&&clearInterval(c.current)}},[t]);const f=()=>{if(s)return;const g=un();e==null||e(g);const x=u.current;x&&(x.pause(),x.currentTime=0,x.play()),i(!0),r(null),l(un());const y=800,b=80;c.current=setInterval(()=>{l(un())},b),setTimeout(()=>{c.current&&(clearInterval(c.current),c.current=null),r(g),l(g),i(!1)},y)},h=o??n;return a.jsx("div",{className:"td-mini-game",children:a.jsx("div",{role:"button",tabIndex:0,className:`td-dice ${s?"td-dice--rolling":""}`,onClick:f,onKeyDown:g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),f())},"aria-label":"Roll die",style:{cursor:s?"default":"pointer"},children:h!=null&&a.jsx(Ad,{value:h})})})}const _s="/assets/Spin-Hwyqb5FO.mp3";function Dd(){var Ke;const e=Re(A=>A.selectedChat),t=K(A=>A.authUser),n=K(A=>A.socket),r=d.useRef(null),s=d.useRef(null),i=d.useRef(0),o=d.useRef(!1),l=A=>{o.current=!0,i.current=A.clientY},c=A=>{if(!o.current)return;o.current=!1;const ue=Math.abs(A.clientY-i.current),ne=Math.min(80,ue);Q.current=20+ne,xe()};d.useEffect(()=>{s.current=new Audio(_s),s.current.loop=!0},[]),d.useEffect(()=>{r.current=new Audio(_s),r.current.loop=!0},[]);const u=((Ke=e==null?void 0:e.participants)==null?void 0:Ke.filter(Boolean).map(A=>({_id:A._id,name:A.fullName,avatar:A.profilePic})))||[],f=u.length>0?[...u.filter(A=>String(A._id)!==String(t==null?void 0:t._id)),...u.filter(A=>String(A._id)===String(t==null?void 0:t._id))]:[];if(!f.length)return a.jsx("div",{className:"td-container",children:"No participants"});const h=f.findIndex(A=>String(A._id)===String(t==null?void 0:t._id)),[g,x]=d.useState(0),[y,b]=d.useState(null),[j,C]=d.useState(null),[_,v]=d.useState(0),T=Ce(A=>A.setCurrentGameName),R=Ce(A=>A.openToGameIndex),I=Ce(A=>A.setOpenToGameIndex),[M,O]=d.useState(null),[$,B]=d.useState(null),[Y,de]=d.useState(!1),[G,ie]=d.useState(!1),Me=f.find(A=>String(A._id)!==String(t==null?void 0:t._id)),me=Me!=null&&String(t==null?void 0:t._id)>String(Me._id)?180:0,Q=d.useRef(0),V=d.useRef(!1),se=d.useRef(null),H=d.useRef(0),E=d.useRef(!0),D=d.useRef(null),le=d.useRef(0),ae=d.useRef(0),z=d.useRef(0),te=d.useRef(0),ke=2e3,_e=A=>{const ue=360/f.length;return(A*ue+ue/2-90+360)%360},je=A=>{const ue=f.length;if(ue===0)return null;const ne=360/ue,De=((A%360+360)%360+90)%360;return Math.floor(De/ne)%ue},_t=A=>1-(1-A)**3,Je=(A,ue,ne)=>{const Oe=H.current,De=(Oe%360+360)%360;let Le=(A-De+360)%360;Le<1&&(Le+=360);const p=Oe+360*4+Le;ae.current=performance.now(),z.current=Oe,te.current=p;const S=()=>{if(!E.current)return;const m=performance.now()-ae.current,w=Math.min(1,m/ue),N=_t(w),U=z.current+(te.current-z.current)*N;H.current=U,x(U),s.current&&(s.current.playbackRate=.5+(1-w)*.8,s.current.volume=Math.max(.2,1-w)),w<1?se.current=requestAnimationFrame(S):(s.current&&(s.current.pause(),s.current.currentTime=0),H.current=te.current,x(te.current),se.current=null,ne==null||ne())};se.current=requestAnimationFrame(S)};d.useEffect(()=>{D.current=y},[y]),d.useEffect(()=>{T(nt[_])},[_,T]),d.useEffect(()=>{R!=null&&(v(R),I(null))},[R,I]),d.useEffect(()=>{if(!n||!(e!=null&&e._id))return;const A=({gameType:ue,data:ne})=>{if(ue==="bottle"&&ne){const Oe=ne.finalRotation!=null?Number(ne.finalRotation):null,De=ne.spinDuration??ke;Oe!=null&&(ie(!0),Je(Oe,De,()=>{var Le;if(E.current)if(ie(!1),ne.winnerUserId!=null){const ot=((Le=e==null?void 0:e.participants)==null?void 0:Le.filter(Boolean).map(m=>({_id:m._id,name:m.fullName,avatar:m.profilePic})))??[],S=(ot.length>0?[...ot.filter(m=>String(m._id)!==String(t==null?void 0:t._id)),...ot.filter(m=>String(m._id)===String(t==null?void 0:t._id))]:[]).findIndex(m=>String(m._id)===String(ne.winnerUserId));b(S>=0?S:null)}else ne.winnerIndex!=null&&b(ne.winnerIndex)}))}ue==="coin"&&(ne!=null&&ne.result)&&(O(ne.result),setTimeout(()=>O(null),1200)),ue==="dice"&&(ne==null?void 0:ne.value)!=null&&(B(ne.value),setTimeout(()=>B(null),1200))};return n.off("game_sync"),n.on("game_sync",A),()=>n.off("game_sync")},[n,e==null?void 0:e._id,e==null?void 0:e.participants,t==null?void 0:t._id]);const Ye=["Rotate the bottle","Coin flip","Roll a die"],nt=["Spin the bottle","Flip the coin","Roll the die"];d.useEffect(()=>(E.current=!0,()=>{var A,ue;E.current=!1,cancelAnimationFrame(se.current),se.current=null,(A=s.current)==null||A.pause(),s.current=null,(ue=r.current)==null||ue.pause(),r.current=null}),[]);const xe=()=>{var Oe;if(G||f.length===0||Date.now()<le.current)return;b(null),ie(!0),V.current=!0;const A=Math.floor(Math.random()*f.length),ue=_e(A),ne=e==null?void 0:e._id;n&&ne&&n.emit("game_sync",{chatId:ne,gameType:"bottle",data:{finalRotation:ue,winnerIndex:A,winnerUserId:((Oe=f[A])==null?void 0:Oe._id)??null,spinDuration:ke}}),s.current&&(s.current.currentTime=0,s.current.play()),Je(ue,ke,()=>{var De;E.current&&(V.current=!1,ie(!1),C(D.current),b(A),(De=document.querySelector(".td-stage"))==null||De.classList.add("shake"),setTimeout(()=>{var Le;return(Le=document.querySelector(".td-stage"))==null?void 0:Le.classList.remove("shake")},400),navigator.vibrate&&navigator.vibrate([100,50,200]),le.current=Date.now()+1e3,de(!0),setTimeout(()=>de(!1),1e3))})},pe=g+me,Ve=y!==null&&!G?je(pe):null,Fe=Ve!==null&&Ve===h,Ne=Ve!==null&&Ve!==h&&f[Ve]!=null,Ee=()=>{_===0&&(cancelAnimationFrame(se.current),se.current=null,V.current=!1,ie(!1),s.current&&(s.current.pause(),s.current.currentTime=0),b(null),H.current=0,x(0))},Ae=()=>{Ee(),v(A=>(A-1+3)%3)},Xe=()=>{Ee(),v(A=>(A+1)%3)};return a.jsxs("div",{className:"td-container",children:[a.jsxs("div",{className:"td-rotate-row",children:[a.jsx("button",{type:"button",className:"td-controls__btn td-controls__btn--arrow",onClick:Ae,"aria-label":"Previous game",title:"Previous game",children:a.jsx(hc,{size:16})}),a.jsx("p",{className:"td-rotate-label",children:Ye[_]}),a.jsx("button",{type:"button",className:"td-controls__btn td-controls__btn--arrow",onClick:Xe,"aria-label":"Next game",title:"Next game",children:a.jsx(mc,{size:16})})]}),a.jsxs("div",{className:"td-game-content",children:[_===0&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"winner-area winner-area--above",children:Ne&&a.jsxs("div",{className:"winner-box",children:[f[Ve].name,"'s turn!"]})}),a.jsx("div",{className:"td-stage",children:a.jsx(Td,{rotation:g+me,onSpin:xe,isSpinning:G||Y,onMouseDown:l,onMouseUp:c})}),a.jsx("div",{className:"winner-area winner-area--below",children:Fe&&a.jsx("div",{className:"winner-box",children:"Your turn!"})})]}),_===1&&a.jsx(Md,{onGameResult:A=>{n&&(e!=null&&e._id)&&n.emit("game_sync",{chatId:e._id,gameType:"coin",data:{result:A}})},syncedResult:M}),_===2&&a.jsx(Od,{onGameResult:A=>{n&&(e!=null&&e._id)&&n.emit("game_sync",{chatId:e._id,gameType:"dice",data:{value:A}})},syncedValue:$})]})]})}const xs=()=>{var g;const e=Ce(x=>x.isTruthDareOpen),t=Ce(x=>x.setTruthDareOpen),n=Ce(x=>x.currentGameName),r=Re(x=>x.selectedChat),{socket:s,authUser:i}=K(),o=(g=r==null?void 0:r.participants)==null?void 0:g.find(x=>String(x._id)!==String(i==null?void 0:i._id));K(x=>x.onlineUsers);const l=Ce(x=>x.gamePlayingUserIdByChat),c=Ce(x=>x.gamePlayingGameNameByChat),u=(r==null?void 0:r._id)&&l[r._id]&&String(l[r._id])===String(o==null?void 0:o._id),f=r!=null&&r._id?c[r._id]:null;d.useEffect(()=>{if(!(!e||!(r!=null&&r._id)||!o||!s))return s.emit("game_playing",{chatId:r._id,otherUserId:o._id,gameName:n??"Truth or Dare",userName:i==null?void 0:i.fullName,userAvatar:i==null?void 0:i.profilePic}),()=>{s.emit("game_left",{chatId:r._id,otherUserId:o._id})}},[e,r==null?void 0:r._id,o==null?void 0:o._id,s,i==null?void 0:i.fullName,i==null?void 0:i.profilePic,n]);const h=n&&f&&n===f;return a.jsxs("div",{className:"truth-dare-panel",children:[a.jsx("header",{className:"truth-dare-panel__header",children:a.jsx("button",{type:"button",className:"truth-dare-panel__close",onClick:()=>t(!1),"aria-label":"Close",children:a.jsx(Ct,{size:20})})}),a.jsx("div",{className:"truth-dare-panel__body",children:a.jsx(Dd,{})}),o&&u&&a.jsx("footer",{className:"truth-dare-panel__footer",children:a.jsx("span",{className:"truth-dare-panel__status",children:h?a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"truth-dare-panel__dot truth-dare-panel__dot--online"}),o.fullName," is online"]}):a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"truth-dare-panel__dot truth-dare-panel__dot--playing"}),o.fullName," is playing ",f??"this game"]})})})]})};function fn({children:e,isMinimized:t,onMinimizedChange:n,onClose:r,peekLabel:s}){const i=String(s||"").toLowerCase(),o=i.includes("draw")?kn:i.includes("note")?Zt:i.includes("watch")?or:i.includes("truth")||i.includes("dare")?ar:rs,[l,c]=d.useState({x:0,y:0}),u=d.useRef({active:!1,pointerId:null,startX:0,startY:0,startLeft:0,startTop:0,moved:!1});d.useEffect(()=>{const y=Math.max(12,window.innerWidth-72),b=Math.max(12,window.innerHeight-220);c({x:y,y:b})},[]);const f=d.useCallback(y=>{var C;if(y.button!==0)return;const b=y.clientY??0,j=y.clientX??0;u.current={active:!0,pointerId:y.pointerId,startX:j,startY:b,startLeft:l.x,startTop:l.y,moved:!1},(C=y.currentTarget)!=null&&C.setPointerCapture&&y.currentTarget.setPointerCapture(y.pointerId)},[l.x,l.y]);d.useEffect(()=>{const y=j=>{const C=u.current;if(!C.active)return;const _=j.clientX??0,v=j.clientY??0,T=_-C.startX,R=v-C.startY;(Math.abs(T)>3||Math.abs(R)>3)&&(u.current.moved=!0);const I=Math.max(8,Math.min(window.innerWidth-56,C.startLeft+T)),M=Math.max(8,Math.min(window.innerHeight-56,C.startTop+R));c({x:I,y:M})},b=j=>{const C=u.current;C.active&&C.pointerId!=null&&j.pointerId===C.pointerId&&(u.current.active=!1)};return window.addEventListener("pointermove",y,{passive:!0}),window.addEventListener("pointerup",b),window.addEventListener("pointercancel",b),()=>{window.removeEventListener("pointermove",y),window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",b)}},[]);const h=d.useCallback(y=>{y.stopPropagation(),r==null||r()},[r]),g=d.useCallback(y=>{y.stopPropagation(),n(!0)},[n]),x=d.useCallback(()=>{if(u.current.moved){u.current.moved=!1;return}n(!1)},[n]);return t?a.jsx("button",{type:"button",className:"slidable-bottom-sheet__bubble",style:{left:`${l.x}px`,top:`${l.y}px`},onPointerDown:f,onClick:x,"aria-label":`Open ${s}`,title:`Open ${s}`,children:a.jsx(o,{size:20})}):a.jsxs("div",{className:"slidable-bottom-sheet slidable-bottom-sheet--expanded",style:{height:"100%",maxHeight:"92vh",transform:"translateY(0)"},children:[a.jsxs("div",{className:"slidable-bottom-sheet__handle",role:"heading","aria-level":2,children:[a.jsx("span",{className:"slidable-bottom-sheet__handle-left","aria-hidden":!0}),a.jsx("span",{className:"slidable-bottom-sheet__handle-label",children:s}),a.jsxs("div",{className:"slidable-bottom-sheet__handle-actions",children:[a.jsx("button",{type:"button",className:"slidable-bottom-sheet__minimize",onClick:g,"aria-label":`Minimize ${s}`,children:a.jsx(rs,{size:18})}),r?a.jsx("button",{type:"button",className:"slidable-bottom-sheet__close",onClick:h,"aria-label":`Close ${s}`,children:a.jsx(Ct,{size:20})}):a.jsx("span",{className:"slidable-bottom-sheet__handle-right","aria-hidden":!0})]})]}),a.jsx("div",{className:"slidable-bottom-sheet__content",children:e})]})}function Bd(){const e=K(t=>t.socket);return d.useEffect(()=>{if(!e)return;const t=({chatId:g,userId:x,gameName:y})=>{const b=g!=null?String(g):null;b&&Ce.getState().setGamePlayingInChat(b,x!=null?String(x):x,y)},n=({chatId:g})=>{const x=g!=null?String(g):null;x&&Ce.getState().setGamePlayingInChat(x,null)},r=({chatId:g,userId:x})=>{const y=g!=null?String(g):null;y&&Z.getState().setDrawingInChat(y,x!=null?String(x):x)},s=({chatId:g})=>{const x=g!=null?String(g):null;x&&Z.getState().setDrawingInChat(x,null)},i=({chatId:g,userId:x})=>{const y=g!=null?String(g):null;y&&Z.getState().setVideoInChat(y,x!=null?String(x):x)},o=({chatId:g})=>{const x=g!=null?String(g):null;x&&Z.getState().setVideoInChat(x,null)},l=({chatId:g,url:x})=>{const y=g!=null?String(g):null;y&&Z.getState().setWatchPartyYoutubeUrl(y,x??"")},c=({chatId:g,url:x})=>{const y=g!=null?String(g):null;y&&Z.getState().setWatchPartyLocalVideoUrl(y,x??"")},u=({chatId:g})=>{const x=g!=null?String(g):null;x&&(Z.getState().setWatchPartyYoutubeUrl(x,null),Z.getState().setWatchPartyLocalVideoUrl(x,null),Z.getState().setWatchPartyClearedByOther(x,!0))},f=({chatId:g,imageData:x})=>{const y=g!=null?String(g):null;y&&typeof x=="string"&&Z.getState().setPendingDrawingCanvas(y,x)},h=({chatId:g,fromUserId:x})=>{g==null||x==null||e.emit("drawing_request_canvas_state",{chatId:String(g),requestToUserId:String(x)})};return e.on("game_playing",t),e.on("game_left",n),e.on("drawing_playing",r),e.on("drawing_left",s),e.on("watch_party_playing",i),e.on("watch_party_left",o),e.on("watch_party_youtube_url",l),e.on("watch_party_local_video_url",c),e.on("watch_party_clear",u),e.on("drawing_canvas_state",f),e.on("drawing_undo",h),e.on("drawing_redo",h),e.on("drawing_clear",h),()=>{e.off("game_playing",t),e.off("game_left",n),e.off("drawing_playing",r),e.off("drawing_left",s),e.off("watch_party_playing",i),e.off("watch_party_left",o),e.off("watch_party_youtube_url",l),e.off("watch_party_local_video_url",c),e.off("watch_party_clear",u),e.off("drawing_canvas_state",f),e.off("drawing_undo",h),e.off("drawing_redo",h),e.off("drawing_clear",h)}},[e]),null}const Ld=({setActiveCallUserAvatar:e,setActiveCallUserId:t,setActiveCallUserName:n,setCallActive:r,setCalling:s,startCall:i,setCallType:o})=>{const{isNotesOpen:l,isDrawingOpen:c,isVideoPanelOpen:u,panelMinimized:f,setPanelMinimized:h,setIsNotesOpen:g,setIsDrawingOpen:x,setIsVideoPanelOpen:y}=Z(),b=Ce(M=>M.isTruthDareOpen),j=Ce(M=>M.panelMinimized),C=Ce(M=>M.setPanelMinimized),_=Ce(M=>M.setTruthDareOpen),{authUser:v}=K(),{selectedUser:T,selectedChat:R}=Re();pt(M=>M.theme);const I=Lt();return d.useRef(null),d.useEffect(()=>{!I&&T||R&&T||(l||c||u||b)&&(g(!1),x(!1),y(!1),h(!1),_(!1),C(!1))},[I,R,T,l,c,u,b,g,x,y,h,_,C]),a.jsxs("div",{className:"app-shell w-screen flex",children:[a.jsx(Bd,{}),a.jsxs("div",{className:"app-card flex flex-1 m-6 overflow-hidden",children:[a.jsx("div",{className:"app-card__sidebar flex-shrink-0",children:a.jsx(Bc,{})}),a.jsxs("div",{className:`app-content-wrap app-card__main flex-1 flex min-w-0${!I&&T?" app-content-wrap--chat-open":""}${I&&(l||c||u||b)?" bottom-sheet-open":""}${I&&(l||c||u||b)&&(l||c||u?f:j)?" bottom-sheet-peek-visible":""}`,children:[(!I||!T)&&a.jsx("div",{className:"chat-list-panel-wrap flex-shrink-0",children:a.jsx(Wc,{})}),(!I||T)&&a.jsx("div",{className:"chat-main-wrap flex-1 flex flex-col",children:T?a.jsx("div",{className:"chat-layout",children:a.jsx(ud,{startCall:i,setCallType:o,setCalling:s,setCallActive:r,setActiveCallUserId:t,setActiveCallUserName:n,setActiveCallUserAvatar:e})}):a.jsx(_a,{})})]}),I&&a.jsxs(a.Fragment,{children:[l&&a.jsx(fn,{isMinimized:f,onMinimizedChange:h,onClose:()=>g(!1),peekLabel:"Notes",children:a.jsx(fs,{})}),c&&a.jsx(fn,{isMinimized:f,onMinimizedChange:h,onClose:()=>x(!1),peekLabel:"Drawing",children:a.jsx(ps,{})}),u&&a.jsx(fn,{isMinimized:f,onMinimizedChange:h,onClose:()=>y(!1),peekLabel:"Watch Together",children:a.jsx(bs,{})}),b&&a.jsx(fn,{isMinimized:j,onMinimizedChange:C,onClose:()=>_(!1),peekLabel:"Truth or Dare",children:a.jsx(xs,{})})]}),!I&&l&&a.jsx("div",{className:"desktop-panel-wrap",children:a.jsx(fs,{})}),!I&&c&&a.jsx("div",{className:"desktop-panel-wrap",children:a.jsx(ps,{})}),!I&&u&&a.jsx("div",{className:"desktop-panel-wrap",children:a.jsx(bs,{})}),!I&&b&&a.jsx("div",{className:"desktop-panel-wrap",children:a.jsx(xs,{})})]})]})},ja=()=>a.jsxs("div",{className:"auth-card__left",children:[a.jsx(Kt,{to:"/",className:"auth-card__brand","aria-label":"Blah Blah"}),a.jsx("div",{className:"auth-card__illus",children:a.jsx("img",{src:"/new.png",alt:"",className:"auth-card__illus-img"})})]}),Ud=()=>{const[e,t]=d.useState(!1),[n,r]=d.useState({firstName:"",lastName:"",email:"",password:"",gender:"male"}),{signup:s,isSigningUp:i}=K(),o=()=>n.firstName.trim()?n.email.trim()?/\S+@\S+\.\S+/.test(n.email)?n.password?n.password.length<6?re.error("Password must be at least 6 characters"):!0:re.error("Password is required"):re.error("Invalid email format"):re.error("Email is required"):re.error("First name is required"),l=c=>{if(c.preventDefault(),!o())return;const u=[n.firstName.trim(),n.lastName.trim()].filter(Boolean).join(" ").trim();if(!u)return re.error("First name is required");const f=Fc(n.gender);s({fullName:u,email:n.email,password:n.password,gender:n.gender,profilePic:f})};return a.jsxs("div",{className:"auth-page",children:[a.jsx(Kt,{to:"/",className:"auth-page__logo","aria-label":"Blah Blah",children:a.jsx("img",{src:"/logo.png",alt:"Blah Blah",className:"auth-page__logo-img"})}),a.jsxs("div",{className:"auth-card",children:[a.jsx(ja,{}),a.jsxs("div",{className:"auth-card__right",children:[a.jsx("h1",{className:"auth-card__title",children:"Sign Up"}),a.jsxs("form",{onSubmit:l,className:"auth-form",children:[a.jsxs("div",{className:"auth-form__row",children:[a.jsxs("div",{className:"auth-form__group",children:[a.jsx("label",{className:"auth-form__label",htmlFor:"signup-first-name",children:"First Name"}),a.jsxs("div",{className:"auth-form__input-wrap",children:[a.jsx(Nn,{className:"auth-form__icon w-[18px] h-[18px]"}),a.jsx("input",{id:"signup-first-name",type:"text",className:"auth-form__input",placeholder:"John",value:n.firstName,onChange:c=>r({...n,firstName:c.target.value}),autoComplete:"given-name"})]})]}),a.jsxs("div",{className:"auth-form__group",children:[a.jsx("label",{className:"auth-form__label",htmlFor:"signup-last-name",children:"Last Name"}),a.jsxs("div",{className:"auth-form__input-wrap",children:[a.jsx(Nn,{className:"auth-form__icon w-[18px] h-[18px]"}),a.jsx("input",{id:"signup-last-name",type:"text",className:"auth-form__input",placeholder:"Doe",value:n.lastName,onChange:c=>r({...n,lastName:c.target.value}),autoComplete:"family-name"})]})]})]}),a.jsxs("div",{className:"auth-form__group",children:[a.jsx("label",{className:"auth-form__label",htmlFor:"signup-email",children:"Email"}),a.jsxs("div",{className:"auth-form__input-wrap",children:[a.jsx(ya,{className:"auth-form__icon w-[18px] h-[18px]"}),a.jsx("input",{id:"signup-email",type:"email",className:"auth-form__input",placeholder:"you@example.com",value:n.email,onChange:c=>r({...n,email:c.target.value}),autoComplete:"email"})]})]}),a.jsxs("div",{className:"auth-form__group",children:[a.jsx("label",{className:"auth-form__label",htmlFor:"signup-password",children:"Password"}),a.jsxs("div",{className:"auth-form__input-wrap",children:[e?a.jsx(jn,{className:"auth-form__icon w-[18px] h-[18px]"}):a.jsx(Cn,{className:"auth-form__icon w-[18px] h-[18px]"}),a.jsx("input",{id:"signup-password",type:e?"text":"password",className:"auth-form__input auth-form__input--with-right-btn",placeholder:"••••••••",value:n.password,onChange:c=>r({...n,password:c.target.value}),autoComplete:"new-password"}),a.jsx("button",{type:"button",className:"auth-form__toggle-password",onClick:()=>t(!e),"aria-label":e?"Hide password":"Show password",children:e?a.jsx(jn,{className:"w-4 h-4"}):a.jsx(Cn,{className:"w-4 h-4"})})]})]}),a.jsxs("div",{className:"auth-form__group auth-form__group--row",children:[a.jsx("span",{className:"auth-form__label",children:"Gender"}),a.jsxs("div",{className:"auth-form__radios",children:[a.jsxs("label",{className:"auth-form__radio-label",children:[a.jsx("input",{type:"radio",name:"signup-gender",value:"male",checked:n.gender==="male",onChange:c=>r({...n,gender:c.target.value}),className:"auth-form__radio"}),a.jsx("span",{children:"Male"})]}),a.jsxs("label",{className:"auth-form__radio-label",children:[a.jsx("input",{type:"radio",name:"signup-gender",value:"female",checked:n.gender==="female",onChange:c=>r({...n,gender:c.target.value}),className:"auth-form__radio"}),a.jsx("span",{children:"Female"})]})]})]}),a.jsx("button",{type:"submit",className:"auth-form__submit",disabled:i,children:i?a.jsxs(a.Fragment,{children:[a.jsx(pa,{className:"inline w-5 h-5 animate-spin mr-2"}),"Creating account..."]}):"Create Account"}),a.jsxs("p",{className:"auth-form__footer",children:["Already have an account? ",a.jsx(Kt,{to:"/login",children:"Login here"})]})]})]})]})]})},Fd=()=>{const[e,t]=d.useState(!1),[n,r]=d.useState({email:"",password:""}),{login:s,isLoggingIn:i}=K(),o=l=>{l.preventDefault(),s(n)};return a.jsxs("div",{className:"auth-page",children:[a.jsx(Kt,{to:"/",className:"auth-page__logo","aria-label":"Blah Blah",children:a.jsx("img",{src:"/logo.png",alt:"Blah Blah",className:"auth-page__logo-img"})}),a.jsxs("div",{className:"auth-card",children:[a.jsx(ja,{}),a.jsxs("div",{className:"auth-card__right",children:[a.jsx("h1",{className:"auth-card__title",children:"Login"}),a.jsxs("form",{onSubmit:o,className:"auth-form",children:[a.jsxs("div",{className:"auth-form__group",children:[a.jsx("label",{className:"auth-form__label",htmlFor:"login-email",children:"Email"}),a.jsxs("div",{className:"auth-form__input-wrap",children:[a.jsx(ya,{className:"auth-form__icon w-[18px] h-[18px]"}),a.jsx("input",{id:"login-email",type:"email",className:"auth-form__input",placeholder:"you@example.com",value:n.email,onChange:l=>r({...n,email:l.target.value}),autoComplete:"email"})]})]}),a.jsxs("div",{className:"auth-form__group",children:[a.jsx("label",{className:"auth-form__label",htmlFor:"login-password",children:"Password"}),a.jsxs("div",{className:"auth-form__input-wrap",children:[e?a.jsx(jn,{className:"auth-form__icon w-[18px] h-[18px]"}):a.jsx(Cn,{className:"auth-form__icon w-[18px] h-[18px]"}),a.jsx("input",{id:"login-password",type:e?"text":"password",className:"auth-form__input auth-form__input--with-right-btn",placeholder:"••••••••",value:n.password,onChange:l=>r({...n,password:l.target.value}),autoComplete:"current-password"}),a.jsx("button",{type:"button",className:"auth-form__toggle-password",onClick:()=>t(!e),"aria-label":e?"Hide password":"Show password",children:e?a.jsx(jn,{className:"w-4 h-4"}):a.jsx(Cn,{className:"w-4 h-4"})})]}),a.jsx("div",{className:"auth-form__forgot",children:a.jsx("button",{type:"button",className:"auth-form__forgot-btn",onClick:()=>re("Coming soon",{icon:"🔜"}),children:"Forgot Password?"})})]}),a.jsx("button",{type:"submit",className:"auth-form__submit",disabled:i,children:i?a.jsxs(a.Fragment,{children:[a.jsx(pa,{className:"inline w-5 h-5 animate-spin mr-2"}),"Logging in..."]}):"Log In"}),a.jsxs("p",{className:"auth-form__footer",children:["Don't have an account?"," ",a.jsx(Kt,{to:"/signup",children:"Sign Up here"})]})]})]})]})]})},zd=()=>{const e=pt(t=>t.theme);return d.useEffect(()=>{if(!e)return;document.body.style.backgroundColor=e.pageBg;const t=document.documentElement,r=e.pageBg==="#ffffff"||e.pageBg==="#f4f4f5"?"#ffffff":e.appBg??"#ffffff";t.style.setProperty("--app-bg",r),t.style.setProperty("--primary",e.primary),t.style.setProperty("--accent",e.accent),t.style.setProperty("--accent-dark",e.accentDark||e.accent),t.style.setProperty("--dark-bg",e.darkBg!=null?e.darkBg:"#000000"),t.style.setProperty("--bubble-mine",e.bubbleMine),t.style.setProperty("--bubble-other",e.bubbleOther),t.style.setProperty("--text-primary",e.textPrimary),t.style.setProperty("--text-secondary",e.textSecondary),t.style.setProperty("--chat-bg",e.chatBg),(e.chatBg==="#0f0f0f"||e.chatBg==="#000000"||e.chatBg==="#0a0a0a"||e.pageBg==="#0f0f0f"||e.pageBg==="#000000"||e.pageBg==="#0a0a0a")&&t.style.setProperty("--chat-mood-bg",e.chatBg),t.style.setProperty("--panel-bg",e.panelBg??"#ffffff"),t.style.setProperty("--page-bg",e.pageBg),t.style.setProperty("--input-bg",e.inputBg??"#f8f9fb"),t.style.setProperty("--delete-btn-bg",e.deleteBtnBg??"#dc2626"),t.style.setProperty("--danger-zone-bg",e.dangerZoneBg??"#fef2f2"),t.style.setProperty("--chat-list-item-hover-bg",e.chatListItemHoverBg??"#f1f5f9"),t.style.setProperty("--chat-list-item-selected-bg",e.chatListItemSelectedBg??"#fce7f3"),t.style.setProperty("--chat-list-item-selected-border",e.chatListItemSelectedBorder??"transparent"),t.style.setProperty("--surface-border",e.surfaceBorder??"#e2e8f0");const s=e.chatBg==="#0f0f0f"||e.chatBg==="#000000"||e.chatBg==="#0a0a0a"||e.pageBg==="#0f0f0f"||e.pageBg==="#000000"||e.pageBg==="#0a0a0a";t.style.setProperty("--content-border",s?"transparent":e.contentBorder??"#000000"),t.style.setProperty("--surface-border-on-dark",e.surfaceBorderOnDark??"transparent"),t.style.setProperty("--panel-divider",e.panelDivider??"#e2e8f0"),t.style.setProperty("--note-mine-bg",e.noteMineBg??"#ec4899"),t.style.setProperty("--profile-card-border",e.profileCardBorder??"#e2e8f0"),t.style.setProperty("--profile-avatar-ring",e.profileAvatarRing??"rgba(255,255,255,0.9)"),t.style.setProperty("--profile-decorative-border",e.profileDecorativeBorder??"#ffffff"),t.style.setProperty("--auth-illus-bg",e.appBg??"#ffffff"),t.style.setProperty("--panel-strong-border",s?"#000000":"#ffffff"),t.style.setProperty("--chat-input-bg",s?"#000000":"#ffffff")},[e]),null};function $d({caller:e,onAccept:t,onReject:n}){const r={position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999},s={background:"#0f172a",color:"#fff",width:"320px",padding:"28px 24px",borderRadius:"16px",textAlign:"center",boxShadow:"0 30px 60px rgba(0,0,0,0.4)"},i={width:"96px",height:"96px",borderRadius:"50%",objectFit:"cover",display:"block",margin:"0 auto 16px auto"},o={fontSize:"20px",fontWeight:600,margin:0},l={fontSize:"14px",opacity:.7,marginTop:"6px"},c={display:"flex",justifyContent:"space-between",marginTop:"24px",gap:"12px"},u={flex:1,background:"#ef4444",border:"none",borderRadius:"10px",padding:"12px",color:"#fff",fontWeight:600,cursor:"pointer"},f={flex:1,background:"#22c55e",border:"none",borderRadius:"10px",padding:"12px",color:"#fff",fontWeight:600,cursor:"pointer"};return a.jsx("div",{style:r,children:a.jsxs("div",{style:s,children:[a.jsx("img",{src:e.avatar,alt:e.name,style:i}),a.jsx("h2",{style:o,children:e.name}),a.jsx("p",{children:e.callType==="video"?"Incoming video call":"Incoming audio call"}),a.jsx("p",{style:l,children:"is now calling…"}),a.jsxs("div",{style:c,children:[a.jsx("button",{style:u,onClick:n,children:"❌ Reject"}),a.jsx("button",{style:f,onClick:()=>t(),children:"📞 Accept"})]})]})})}const ws="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",Be=new Audio;Be.src="/call.mp3";Be.loop=!0;Be.preload="auto";Be.addEventListener("error",()=>{Be.src!==ws&&(Be.src=ws,Be.loop=!1)});function Hd({setActiveCallUserId:e,setCallActive:t,setCallType:n,answerCall:r,setActiveCallUserName:s,setActiveCallUserAvatar:i}){const o=K(u=>u.socket),[l,c]=d.useState(null);return d.useEffect(()=>{if(!o)return;o.on("incoming-call",f=>{try{Be.currentTime=0,Be.volume=1,Be.play().catch(()=>{})}catch{}n(f.callType),e(f.from),c(f)});const u=()=>{Be.pause(),t(!1),Be.currentTime=0,c(null)};return o.on("call-ended",u),()=>{o.off("incoming-call"),o.off("call-ended",u)}},[o,n,t,e]),l?a.jsx("div",{children:a.jsx($d,{caller:{name:l.name??l.from,avatar:l.avatar||gt,type:l.callType,callType:l.callType},onAccept:async()=>{Be.pause(),Be.currentTime=0,t(!0),e(l.from),s(l.name??l.from),i(l.avatar||gt),c(null),await r(l)},onReject:()=>{Be.pause(),Be.currentTime=0,o.emit("end-call",{to:String(l.from)}),c(null)}})}):null}function Vd({active:e}){const[t,n]=d.useState(0);d.useEffect(()=>{if(!e){n(0);return}const l=setInterval(()=>{n(c=>c+1)},1e3);return()=>clearInterval(l)},[e]);const r=Math.floor(t/3600),s=Math.floor(t%3600/60),i=t%60;let o;return t<60?o=`${i}s`:t<3600?o=`${s}m ${i}s`:o=`${r}h ${s}m ${i}s`,a.jsx("span",{style:{color:"#fff",fontSize:"14px"},children:o})}let at=null,st=null,wt=null;function vs(){const e=window.AudioContext||window.webkitAudioContext;if(e&&!st&&(st=new e),st){st.resume().catch(()=>{});try{const t=st.createBuffer(1,st.sampleRate*.05,st.sampleRate),n=st.createBufferSource();n.buffer=t,n.connect(st.destination),n.start(0)}catch{}}at||(at=document.createElement("audio"),at.setAttribute("playsinline","true"),at.volume=1,at.muted=!1,at.style.cssText="position:fixed;left:0;top:0;width:1px;height:1px;opacity:0.01;pointer-events:none;",document.body.appendChild(at)),at.play().catch(()=>{})}function Ss(e){if(!e||!e.getAudioTracks||e.getAudioTracks().length===0)return;if(e.getAudioTracks().forEach(n=>{n.enabled=!0}),at&&(at.srcObject=e,at.volume=1,at.muted=!1,at.play().catch(()=>{})),(window.AudioContext||window.webkitAudioContext)&&st){if(wt){try{wt.disconnect()}catch{}wt=null}try{wt=st.createMediaStreamSource(e),wt.connect(st.destination),st.resume().catch(()=>{})}catch{}}}function Ca(){if(at&&(at.srcObject=null),wt&&st){try{wt.disconnect()}catch{}wt=null}st=null}function ka({activeCallUserId:e,name:t,avatar:n,callActive:r,isMuted:s,onToggleMute:i,onEndCall:o}){const l=K(T=>T.socket),c=Lt(),u=d.useRef(null),[f,h]=d.useState(null),g=d.useRef(!1);d.useEffect(()=>{if(f)return;const T=window.innerHeight;h(c?{top:T-96,left:16}:null)},[c,f]);const x=()=>{const T=e==null?null:typeof e=="string"?e.trim():e._id!=null?String(e._id):String(e);T&&l.emit("end-call",{to:T}),Ca(),o==null||o(),window.dispatchEvent(new Event("call-ended-local"))},y=(T,R)=>{if(!g.current||!u.current)return;const M=u.current.getBoundingClientRect(),O=window.innerWidth,$=window.innerHeight;let B=R-M.height/2,Y=T-M.width/2;B=Math.max(8,Math.min($-M.height-8,B)),Y=Math.max(8,Math.min(O-M.width-8,Y)),h({top:B,left:Y})};d.useEffect(()=>{const T=I=>{y(I.clientX,I.clientY)},R=()=>{g.current=!1};return window.addEventListener("pointermove",T),window.addEventListener("pointerup",R),window.addEventListener("pointercancel",R),()=>{window.removeEventListener("pointermove",T),window.removeEventListener("pointerup",R),window.removeEventListener("pointercancel",R)}},[]);const b=T=>{if(T.target.closest("button"))return;g.current=!0;const R=T.touches?T.touches[0].clientX:T.clientX,I=T.touches?T.touches[0].clientY:T.clientY;y(R,I)},j=T=>{if(!g.current||!T.touches||T.touches.length===0)return;const R=T.touches[0];y(R.clientX,R.clientY)},C=()=>{g.current=!1},_={...Gd,...c?{width:"calc(100vw - 32px)",justifyContent:"space-between"}:{}},v={...Yd,...c?{maxWidth:"38vw",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}:{}};return a.jsx("div",{style:f&&f.top!=null&&f.left!=null?{...js,top:f.top,left:f.left}:{...js,bottom:24,left:"50%",transform:"translateX(-50%)"},children:a.jsxs("div",{ref:u,style:_,onPointerDown:b,onTouchStart:b,onTouchMove:j,onTouchEnd:C,children:[a.jsxs("div",{style:qd,children:[a.jsx("img",{src:n||gt,alt:t,style:Wd}),a.jsx("div",{style:v,children:t})]}),a.jsxs("div",{style:Jd,children:[a.jsx("button",{onClick:()=>i==null?void 0:i(),style:Kd,type:"button",children:s?"Unmute":"Mute"}),a.jsx("button",{onClick:x,style:Xd,type:"button",children:"End"})]}),a.jsx(Vd,{active:r})]})})}const Wd={width:"42px",height:"42px",borderRadius:"50%",objectFit:"cover"},qd={display:"flex",alignItems:"center",gap:"10px"},Yd={color:"#fff",fontSize:"14px",fontWeight:"600"},js={position:"fixed",zIndex:9999},Gd={background:"#111",padding:"12px 22px",borderRadius:"999px",boxShadow:"0 10px 30px rgba(0,0,0,0.4)",display:"flex",alignItems:"center",gap:"18px"},Jd={display:"flex",alignItems:"center",gap:"10px"},Xd={background:"#e53935",color:"#fff",border:"none",padding:"8px 18px",borderRadius:"999px",fontWeight:"600",cursor:"pointer"},Kd={background:"#ffffff",color:"#111827",border:"none",padding:"8px 14px",borderRadius:"999px",fontWeight:"500",cursor:"pointer",fontSize:"13px"};function Zd({name:e,avatar:t,onCancel:n}){return a.jsx("div",{style:Qd,children:a.jsxs("div",{style:eu,children:[a.jsx("img",{src:t||gt,style:tu}),a.jsx("h2",{style:nu,children:e}),a.jsx("p",{style:ru,children:"Calling…"}),a.jsx("div",{style:su,children:a.jsx("button",{style:au,onClick:n,children:"End"})})]})})}const Qd={position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999},eu={background:"#0f172a",color:"#fff",width:"320px",padding:"28px 24px",borderRadius:"16px",textAlign:"center",boxShadow:"0 30px 60px rgba(0,0,0,0.4)"},tu={width:"96px",height:"96px",borderRadius:"50%",objectFit:"cover",display:"block",margin:"0 auto 16px auto"},nu={fontSize:"20px",fontWeight:600,margin:0},ru={fontSize:"14px",opacity:.7,marginTop:"6px"},su={display:"flex",justifyContent:"space-between",marginTop:"24px",gap:"12px"},au={flex:1,background:"#ef4444",border:"none",borderRadius:"10px",padding:"12px",color:"#fff",fontWeight:600,cursor:"pointer"},ou=({activeCallUserId:e,activeCallUserName:t,activeCallUserAvatar:n,callActive:r,isMuted:s,onToggleMute:i,onEndCall:o})=>a.jsxs("div",{style:iu,children:[a.jsx("video",{id:"remote-video",autoPlay:!0,playsInline:!0,style:lu}),a.jsx("video",{id:"local-video",autoPlay:!0,muted:!0,style:cu}),a.jsx("div",{style:du,children:a.jsx(ka,{activeCallUserId:e,name:t,avatar:n,callActive:r,isMuted:s,onToggleMute:i,onEndCall:o})})]}),iu={position:"fixed",top:0,left:0,width:"100vw",height:"100dvh",background:"#000",zIndex:9999,overflow:"hidden"},lu={position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"},cu={position:"absolute",bottom:"100px",right:"16px",width:"120px",height:"160px",objectFit:"cover",borderRadius:"12px",border:"2px solid white",zIndex:20},du={position:"absolute",bottom:0,left:0,right:0,height:"80px",background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center"};let Te=null;function Cs(e){const t=()=>{const n=document.getElementById("local-video");if(!n){setTimeout(t,100);return}n.srcObject=e,n.muted=!0,n.playsInline=!0,n.autoplay=!0,n.play().catch(()=>{}),console.log("📷 local video attached")};t()}function uu(){const e=K(C=>C.socket),t=d.useRef("audio"),n=d.useRef(null),r=d.useRef(null),s=d.useRef(null),i=d.useRef([]),[o,l]=d.useState(null),[c,u]=d.useState(!1),f=d.useRef(null),h=async()=>{const C=n.current,_=i.current;if(!(!C||_.length===0))for(;_.length>0;){const v=_.shift();try{const T=v&&typeof v=="object"&&v.candidate!=null?new RTCIceCandidate(v):v;await C.addIceCandidate(T)}catch(T){console.error("addIceCandidate (drain) error:",T)}}},g=()=>{const C=new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun2.l.google.com:19302"}],iceCandidatePoolSize:10});return C.oniceconnectionstatechange=()=>{console.log("🧊 iceConnectionState:",C.iceConnectionState)},C.ontrack=_=>{if(C.signalingState!=="closed"&&(console.log("🎯 track received:",_.track.kind,"enabled:",_.track.enabled,"readyState:",_.track.readyState),Te||(Te=new MediaStream),_.streams&&_.streams[0]?_.streams[0].getTracks().forEach(v=>{Te.getTracks().some(T=>T.id===v.id)||Te.addTrack(v)}):Te.getTracks().some(v=>v.id===_.track.id)||Te.addTrack(_.track),_.track.enabled=!0,l(Te),window.dispatchEvent(new CustomEvent("remote-stream-ready",{detail:Te})),_.track.kind==="audio"&&(Ss(Te),f.current&&(f.current(),f.current=null)),t.current==="video")){const v=(T=0)=>{const R=document.getElementById("remote-video");if(!R){T<50&&setTimeout(()=>v(T+1),100);return}R.srcObject=Te,R.play().catch(()=>{}),console.log("🎥 remote video attached")};v()}},C.onconnectionstatechange=()=>{if(console.log("📡 connectionState:",C.connectionState),C.connectionState==="connected"&&Te&&(l(Te),Ss(Te),window.dispatchEvent(new CustomEvent("remote-stream-ready",{detail:Te})),t.current==="video")){const _=(v=0)=>{const T=document.getElementById("remote-video");if(!T){v<50&&setTimeout(()=>_(v+1),100);return}T.srcObject=Te,T.play().catch(()=>{}),console.log("🎥 remote video attached (on connected)")};_()}},C.onicecandidate=_=>{_.candidate&&s.current&&e.emit("ice-candidate",{to:s.current,candidate:_.candidate.toJSON?_.candidate.toJSON():_.candidate})},n.current=C,C},x=async(C,_)=>{if(n.current||r.current){re.error("Another call is already in progress. Please end it first.");return}vs();try{Be.currentTime=0,Be.volume=1,Be.play().catch(()=>{})}catch{}const v=String(C);n.current&&(n.current.close(),n.current=null),i.current=[],t.current=_,s.current=v,Te&&(Te.getTracks().forEach(M=>M.stop()),Te=null,l(null));const T=g(),R=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},video:_==="video"}).catch(()=>navigator.mediaDevices.getUserMedia({audio:!0,video:_==="video"}));if(T.signalingState==="closed"){R.getTracks().forEach(M=>M.stop());return}_==="video"&&Cs(R),r.current=R,R.getTracks().forEach(M=>{M.enabled=!0}),R.getTracks().forEach(M=>{T.addTrack(M,R)});const I=await T.createOffer();await T.setLocalDescription(I),e.emit("call-user",{to:v,offer:{type:I.type,sdp:I.sdp},callType:_})},y=async({from:C,offer:_,callType:v})=>{vs();const T=String(C);n.current&&(n.current.close(),n.current=null),f.current&&(f.current(),f.current=null),i.current=[],t.current=v,s.current=T,Te&&(Te.getTracks().forEach($=>$.stop()),Te=null,l(null));const R=g(),I=_&&typeof _=="object"&&_.sdp?new RTCSessionDescription({type:_.type||"offer",sdp:_.sdp}):_;await R.setRemoteDescription(I);const M=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},video:v==="video"}).catch(()=>navigator.mediaDevices.getUserMedia({audio:!0,video:v==="video"}));if(R.signalingState==="closed"){M.getTracks().forEach($=>$.stop());return}r.current=M,v==="video"&&Cs(M),M.getTracks().forEach($=>{$.enabled=!0}),M.getTracks().forEach($=>{R.addTrack($,M)});const O=await R.createAnswer();return await R.setLocalDescription(O),await h(),e.emit("answer-call",{to:T,answer:{type:O.type,sdp:O.sdp}}),new Promise($=>{const B=setTimeout(()=>{f.current&&(f.current(),f.current=null)},1e4);f.current=()=>{clearTimeout(B),$()}})},b=()=>{n.current&&(n.current.close(),n.current=null),r.current&&(r.current.getTracks().forEach(_=>_.stop()),r.current=null),u(!1),Be.pause(),Be.currentTime=0;const C=s.current;if(C&&e)try{e.emit("end-call",{to:String(C)})}catch{}s.current=null,i.current=[],f.current&&(f.current(),f.current=null),Te&&(Te.getTracks().forEach(_=>_.stop()),Te=null),l(null),Ca()},j=()=>{const C=r.current;if(!C)return;const _=!c;C.getAudioTracks().forEach(T=>{T.enabled=!_});const v=n.current;v&&v.getSenders().filter(T=>T.track&&T.track.kind==="audio").forEach(T=>{T.track&&(T.track.enabled=!_)}),u(_)};return d.useEffect(()=>{if(!e)return;e.on("call-answered",async({answer:_})=>{Be.pause(),Be.currentTime=0;const v=n.current;if(!(!v||v.signalingState!=="have-local-offer")){try{const T=_&&typeof _=="object"&&_.sdp?new RTCSessionDescription({type:_.type||"answer",sdp:_.sdp}):_;await v.setRemoteDescription(T),await h()}catch(T){console.error("setRemoteDescription error:",T);return}window.dispatchEvent(new CustomEvent("call-accepted",{detail:{callType:t.current}}))}}),e.on("ice-candidate",async({candidate:_})=>{if(!n.current||!_)return;const v=n.current;if(!(v.remoteDescription&&v.remoteDescription.type)){i.current.push(_);return}try{const R=_&&typeof _=="object"&&_.candidate!=null?new RTCIceCandidate(_):_;await v.addIceCandidate(R)}catch(R){console.error("addIceCandidate error:",R)}});const C=()=>b();return e.on("call-ended",C),()=>{e.off("call-answered"),e.off("ice-candidate"),e.off("call-ended",C)}},[e]),d.useEffect(()=>{const C=()=>{if(n.current||r.current||Te)try{b()}catch{}};return window.addEventListener("beforeunload",C),()=>window.removeEventListener("beforeunload",C)},[]),{startCall:x,answerCall:y,endCall:b,remoteStream:o,isMuted:c,toggleMute:j}}const fu=d.lazy(()=>Ns(()=>import("./ProfilePage-C5d9CXIs.js"),__vite__mapDeps([0,1,2,3]))),hu=d.lazy(()=>Ns(()=>import("./FriendsPage-DzUQQpM2.js"),__vite__mapDeps([4,1,2,5])));function ks(){return a.jsx("div",{className:"flex items-center justify-center min-h-[60vh]",children:a.jsx(ga,{className:"size-10 animate-spin text-pink-500"})})}const mu=()=>{const e=Bt(),{startCall:t,answerCall:n,endCall:r,isMuted:s,toggleMute:i}=uu(),o=K(D=>D.socket),[l,c]=d.useState(null),{authUser:u,checkAuth:f,isCheckingAuth:h}=K(),g=Re(D=>D.getMyChats),[x,y]=d.useState(!1),[b,j]=d.useState(""),[C,_]=d.useState(""),[v,T]=d.useState(null),[R,I]=d.useState(!1),[M,O]=d.useState(null),$=Lt(),[B,Y]=d.useState("50"),[de,G]=d.useState(30),ie=200,Me=200,me={80:.8*ie,50:.5*ie,30:.3*ie},Q={80:"125%",50:"200%",30:"333%"},V=140;d.useEffect(()=>{if(B!=="80")return;const D=setTimeout(()=>Y(String(de)),Me);return()=>clearTimeout(D)},[B,de]);const se=pt(D=>D.applyPreset);d.useEffect(()=>{B==="50"&&se("dark"),B==="30"&&se("light")},[B,se]);const H=()=>{M&&o.emit("end-call",{to:String(M)}),y(!1),I(!1),O(null),_(""),j(""),c(null)};d.useEffect(()=>{f()},[]),d.useEffect(()=>{const le=new URLSearchParams(e.search).get("youtube");if(le){const ae=decodeURIComponent(le),z=Z.getState();z.setPendingYoutubeUrl(ae),z.setIsNotesOpen(!1),z.setIsDrawingOpen(!1),z.setIsVideoPanelOpen(!0),Ce.getState().setTruthDareOpen(!1),window.history.replaceState(null,"",window.location.pathname+(window.location.hash||""))}},[e.search]),d.useEffect(()=>{u!=null&&u._id&&g()},[u==null?void 0:u._id,g]);const E=d.useRef(null);return E.current=()=>{I(!1),y(!1),O(null),_(""),j(""),c(null)},d.useEffect(()=>{if(!o)return;const D=()=>{Ta.flushSync(()=>{E.current&&E.current()})};return o.on("call-ended",D),window.addEventListener("call-ended-local",D),()=>{o.off("call-ended",D),window.removeEventListener("call-ended-local",D)}},[o]),d.useEffect(()=>{o&&(o.on("disconnect",()=>{}),o.on("connect_error",D=>{console.error("❌ SOCKET CONNECT ERROR:",D.message)}),o.on("error",D=>{console.error("❌ SOCKET ERROR:",D)}))},[]),d.useEffect(()=>{const D=le=>{var ae;y(!1),I(!0),(ae=le.detail)!=null&&ae.callType&&c(le.detail.callType)};return window.addEventListener("call-accepted",D),()=>window.removeEventListener("call-accepted",D)},[]),h?a.jsx("div",{className:"flex items-center justify-center h-screen",children:a.jsx(ga,{className:"size-10 animate-spin"})}):a.jsxs("div",{className:"min-h-screen",children:[!$&&e.pathname!=="/login"&&e.pathname!=="/signup"&&a.jsx("div",{className:"app-string-decoration",role:"button",tabIndex:0,onClick:D=>{D.preventDefault(),D.stopPropagation(),B!=="80"&&(G(B==="50"?30:50),Y("80"))},onKeyDown:D=>{D.key!=="Enter"||B==="80"||(D.preventDefault(),G(B==="50"?30:50),Y("80"))},style:{position:"fixed",top:0,left:"3px",height:`${me[B]}px`,width:`${V}px`,overflow:"hidden",zIndex:9999,cursor:"pointer",transition:`height ${Me}ms ease`},children:a.jsx("img",{src:"/string.png",alt:"",style:{position:"absolute",bottom:0,left:0,height:Q[B],width:"auto",maxWidth:"none",objectFit:"cover",objectPosition:"left bottom",transition:`height ${Me}ms ease`}})}),a.jsx(zd,{}),a.jsx(Hd,{setActiveCallUserId:O,setActiveCallUserName:_,setActiveCallUserAvatar:j,setCallActive:I,setCallType:c,answerCall:n}),R&&!x&&l==="audio"&&a.jsx(ka,{activeCallUserId:M,avatar:b,name:C,callActive:R,isMuted:s,onToggleMute:i,onEndCall:r}),R&&l==="video"&&a.jsx(ou,{activeCallUserId:M,activeCallUserName:C,activeCallUserAvatar:b,callActive:R,isMuted:s,onToggleMute:i,onEndCall:r}),x&&!R&&a.jsx(Zd,{name:C,avatar:b,onCancel:H}),a.jsxs(ko,{children:[a.jsx(Mt,{path:"/",element:u?a.jsx(Ld,{setCallType:c,setCallActive:I,setCalling:y,setActiveCallUserId:O,setActiveCallUserName:_,setActiveCallUserAvatar:j,startCall:t}):a.jsx(Tt,{to:"/login"})}),a.jsx(Mt,{path:"/signup",element:u?a.jsx(Tt,{to:"/"}):a.jsx(Ud,{})}),a.jsx(Mt,{path:"/login",element:u?a.jsx(Tt,{to:"/"}):a.jsx(Fd,{})}),a.jsx(Mt,{path:"/settings",element:u?a.jsx(Tt,{to:"/",replace:!0}):a.jsx(Tt,{to:"/login"})}),a.jsx(Mt,{path:"/profile",element:u?a.jsx(d.Suspense,{fallback:a.jsx(ks,{}),children:a.jsx(fu,{})}):a.jsx(Tt,{to:"/login"})}),a.jsx(Mt,{path:"/friends",element:u?a.jsx(d.Suspense,{fallback:a.jsx(ks,{}),children:a.jsx(hu,{setCallType:c,setCalling:y,setActiveCallUserId:O,setActiveCallUserName:_,setActiveCallUserAvatar:j,startCall:t})}):a.jsx(Tt,{to:"/login"})})]}),a.jsx(sc,{})]})};Ra(document.getElementById("root")).render(a.jsx(d.StrictMode,{children:a.jsx(Io,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:a.jsx(mu,{})})}));export{gt as D,ba as M,kn as P,Bc as S,Ic as V,pr as a,Re as b,oe as c,ir as d,Sc as e,Ou as g,K as u,re as z};

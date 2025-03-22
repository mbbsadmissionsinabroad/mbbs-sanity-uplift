(()=>{var e={};e.id=235,e.ids=[235],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},82361:e=>{"use strict";e.exports=require("events")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},41808:e=>{"use strict";e.exports=require("net")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},63477:e=>{"use strict";e.exports=require("querystring")},12781:e=>{"use strict";e.exports=require("stream")},24404:e=>{"use strict";e.exports=require("tls")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},99807:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>m,tree:()=>c});var s=r(50482),a=r(69108),i=r(62563),o=r.n(i),n=r(68300),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let c=["",{children:["auth",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,14201)),"/Users/abhinav/business/mbbs-sanity-uplift/app/auth/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,35601)),"/Users/abhinav/business/mbbs-sanity-uplift/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,1429)),"/Users/abhinav/business/mbbs-sanity-uplift/app/not-found.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/abhinav/business/mbbs-sanity-uplift/app/auth/page.tsx"],u="/auth/page",p={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/auth/page",pathname:"/auth",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},62627:(e,t,r)=>{Promise.resolve().then(r.bind(r,28599))},28599:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>ev});var s,a=r(95344),i=r(3729),o=r(22254);let n={data:""},l=e=>e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?p(o,i):i+"{"+p(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=p(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=p.p?p.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},m={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},g=(e,t,r,s,a)=>{let i=f(e),o=m[i]||(m[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!m[o]){let t=i!==e?e:(e=>{let t,r,s=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?s.shift():t[3]?(r=t[3].replace(u," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(u," ").trim();return s[0]})(e);m[o]=p(a?{["@keyframes "+o]:t}:t,r?"":"."+o)}let n=r&&m.g?m.g:null;return r&&(m.g=m[o]),((e,t,r,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(m[o],t,s,n),o},h=(e,t,r)=>e.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function x(e){let t=this||{},r=e.call?e(t.p):e;return g(r.unshift?r.raw?h(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}x.bind({g:1});let y,b,v,w=x.bind({k:1});function j(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;r.p=Object.assign({theme:b&&b()},n),r.o=/ *go\d+/.test(l),n.className=x.apply(r,s)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),y(c,n)}return t?t(a):a}}var O=e=>"function"==typeof e,P=(e,t)=>O(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),E=(()=>{let e;return()=>e})(),k=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return k(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},q=[],$={toasts:[],pausedAt:void 0},S=e=>{$=k($,e),q.forEach(e=>{e($)})},C={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e={})=>{let[t,r]=(0,i.useState)($);(0,i.useEffect)(()=>(q.push(r),()=>{let e=q.indexOf(r);e>-1&&q.splice(e,1)}),[t]);let s=t.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||C[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...t,toasts:s}},D=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||N()}),_=e=>(t,r)=>{let s=D(t,e,r);return S({type:2,toast:s}),s.id},T=(e,t)=>_("blank")(e,t);T.error=_("error"),T.success=_("success"),T.loading=_("loading"),T.custom=_("custom"),T.dismiss=e=>{S({type:3,toastId:e})},T.remove=e=>S({type:4,toastId:e}),T.promise=(e,t,r)=>{let s=T.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?P(t.success,e):void 0;return a?T.success(a,{id:s,...r,...null==r?void 0:r.success}):T.dismiss(s),e}).catch(e=>{let a=t.error?P(t.error,e):void 0;a?T.error(a,{id:s,...r,...null==r?void 0:r.error}):T.dismiss(s)}),e};var A=(e,t)=>{S({type:1,toast:{id:e,height:t}})},I=()=>{S({type:5,time:Date.now()})},M=new Map,F=1e3,U=(e,t=F)=>{if(M.has(e))return;let r=setTimeout(()=>{M.delete(e),S({type:4,toastId:e})},t);M.set(e,r)},G=e=>{let{toasts:t,pausedAt:r}=z(e);(0,i.useEffect)(()=>{if(r)return;let e=Date.now(),s=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&T.dismiss(t.id);return}return setTimeout(()=>T.dismiss(t.id),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[t,r]);let s=(0,i.useCallback)(()=>{r&&S({type:6,time:Date.now()})},[r]),a=(0,i.useCallback)((e,r)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=r||{},o=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[t]);return(0,i.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)U(e.id,e.removeDelay);else{let t=M.get(e.id);t&&(clearTimeout(t),M.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:A,startPause:I,endPause:s,calculateOffset:a}}},R=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,H=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${H} 0.15s ease-out forwards;
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
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Y=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,W=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Y} 1s linear infinite;
`,J=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,X=w`
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
}`,Z=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${J} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${X} 0.2s ease-out forwards;
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
`,K=j("div")`
  position: absolute;
`,Q=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,V=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${V} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?i.createElement(ee,null,t):t:"blank"===r?null:i.createElement(Q,null,i.createElement(W,{...s}),"loading"!==r&&i.createElement(K,null,"error"===r?i.createElement(B,{...s}):i.createElement(Z,{...s})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=j("div")`
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
`,ei=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let r=e.includes("top")?1:-1,[s,a]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),es(r)];return{animation:t?`${w(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=i.memo(({toast:e,position:t,style:r,children:s})=>{let a=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},o=i.createElement(et,{toast:e}),n=i.createElement(ei,{...e.ariaProps},P(e.message,e));return i.createElement(ea,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof s?s({icon:o,message:n}):i.createElement(i.Fragment,null,o,n))});s=i.createElement,p.p=void 0,y=s,b=void 0,v=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:s,children:a})=>{let o=i.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return i.createElement("div",{ref:o,className:t,style:r},a)},ec=(e,t)=>{let r=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...s}},ed=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:a,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:c}=G(r);return i.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let o=r.position||t,n=ec(o,c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}));return i.createElement(el,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?ed:"",style:n},"custom"===r.type?P(r.message,r):a?a(r):i.createElement(en,{toast:r,position:o}))}))},ep={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},em=i.createContext&&i.createContext(ep),ef=["attr","size","title"];function eg(){return(eg=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e}).apply(this,arguments)}function eh(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,s)}return r}function ex(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?eh(Object(r),!0).forEach(function(t){var s,a;s=t,a=r[t],(s=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var s=r.call(e,t||"default");if("object"!=typeof s)return s;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(s))in e?Object.defineProperty(e,s,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[s]=a}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):eh(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function ey(e){var t=t=>{var r,{attr:s,size:a,title:o}=e,n=function(e,t){if(null==e)return{};var r,s,a=function(e,t){if(null==e)return{};var r={};for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){if(t.indexOf(s)>=0)continue;r[s]=e[s]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(s=0;s<i.length;s++)r=i[s],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}(e,ef),l=a||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),i.createElement("svg",eg({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,s,n,{className:r,style:ex(ex({color:e.color||t.color},t.style),e.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),o&&i.createElement("title",null,o),e.children)};return void 0!==em?i.createElement(em.Consumer,null,e=>t(e)):t(ep)}function eb(e){var t;return(t={tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"},child:[]}]},e=>i.createElement(ey,eg({attr:ex({},t.attr)},e),function e(t){return t&&t.map((t,r)=>i.createElement(t.tag,ex({key:r},t.attr),e(t.child)))}(t.child)))(e)}let ev=()=>{let e=(0,o.useRouter)(),[t,r]=(0,i.useState)(""),[s,n]=(0,i.useState)(""),[l,c]=(0,i.useState)(""),[d,u]=(0,i.useState)(!1),[p,m]=(0,i.useState)({}),f=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),g=e=>/^\d{10}$/.test(e),h=async r=>{r.preventDefault(),u(!0),m({});let a={};if(t.trim()||(a.name="Name is required."),f(s)||(a.email="Please enter a valid email address."),g(l)||(a.phone="Please enter a valid 10-digit phone number."),Object.keys(a).length>0){m(a),u(!1);return}try{let r=await fetch(`https://admission-backend.vercel.app/api/user?email=${encodeURIComponent(s)}&phone=${encodeURIComponent(l)}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!r.ok)throw Error("Failed to check attempts");let a=await r.json();if(a.attempts&&a.attempts>=2){T.error("You have exceeded the maximum number of attempts."),u(!1);return}if(!(await fetch("https://admission-backend.vercel.app/api/saveUser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:s,phone:l})})).ok)throw Error("Failed to save user");void 0===a.attempts||0===a.attempts?(localStorage.setItem("examStarted","true"),e.push("/exam")):T.success("Attempt saved successfully.")}catch(e){T.error("Something went wrong. Please try again.")}finally{u(!1)}};return(0,a.jsxs)("div",{children:[a.jsx(eu,{position:"top-center"}),a.jsx("section",{className:"text-gray-600 body-font",children:(0,a.jsxs)("div",{className:"container px-5 py-24 mx-auto flex flex-wrap items-center",children:[(0,a.jsxs)("div",{className:"lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0",children:[a.jsx("h1",{className:"title-font font-bold text-3xl text-blue-900",children:"Welcome to the Scholarship Test Portal"}),(0,a.jsxs)("p",{className:"leading-relaxed mt-4 text-red-600",children:["This is your opportunity to prove yourself! Please note that you can only attempt this exam ",a.jsx("strong",{children:"two times"}),". Make every attempt count."]})]}),(0,a.jsxs)("div",{className:"lg:w-2/6 md:w-1/2 bg-red-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0",children:[a.jsx("h2",{className:"text-gray-900 text-lg font-medium title-font mb-5",children:"Login to Begin Your Test"}),(0,a.jsxs)("form",{onSubmit:h,children:[(0,a.jsxs)("div",{className:"relative mb-4",children:[a.jsx("label",{htmlFor:"name",className:"leading-7 text-sm text-gray-600",children:"Name"}),a.jsx("input",{type:"text",id:"name",name:"name",value:t,onChange:e=>r(e.target.value),className:`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out ${p.name?"border-red-500":""}`}),p.name&&a.jsx("p",{className:"text-red-500 text-sm mt-1",children:p.name})]}),(0,a.jsxs)("div",{className:"relative mb-4",children:[a.jsx("label",{htmlFor:"email",className:"leading-7 text-sm text-gray-600",children:"Email"}),a.jsx("input",{type:"email",id:"email",name:"email",value:s,onChange:e=>n(e.target.value),className:`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out ${p.email?"border-red-500":""}`}),p.email&&a.jsx("p",{className:"text-red-500 text-sm mt-1",children:p.email})]}),(0,a.jsxs)("div",{className:"relative mb-4",children:[a.jsx("label",{htmlFor:"phone",className:"leading-7 text-sm text-gray-600",children:"Phone"}),a.jsx("input",{type:"tel",id:"phone",name:"phone",value:l,onChange:e=>c(e.target.value),className:`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out ${p.phone?"border-red-500":""}`}),p.phone&&a.jsx("p",{className:"text-red-500 text-sm mt-1",children:p.phone})]}),(0,a.jsxs)("button",{type:"submit",disabled:d,className:"w-full text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg flex items-center justify-center",children:[d?a.jsx(eb,{className:"animate-spin mr-2"}):null,d?"Starting...":"Start Test"]})]}),a.jsx("p",{className:"text-xs text-gray-500 mt-3",children:"If you face any issues, please contact our support team."})]})]})})]})}},22254:(e,t,r)=>{e.exports=r(14767)},14201:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>i,__esModule:()=>a,default:()=>o});let s=(0,r(86843).createProxy)(String.raw`/Users/abhinav/business/mbbs-sanity-uplift/app/auth/page.tsx`),{__esModule:a,$$typeof:i}=s,o=s.default}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,751,423],()=>r(99807));module.exports=s})();
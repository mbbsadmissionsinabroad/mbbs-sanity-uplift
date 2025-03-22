(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[235],{68528:function(e,t,r){Promise.resolve().then(r.bind(r,41390))},41390:function(e,t,r){"use strict";let a,o;r.r(t),r.d(t,{default:function(){return ey}});var i,s=r(57437),n=r(2265),l=r(24033);let c={data:""},d=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||c,u=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,p=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,f=(e,t)=>{let r="",a="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":a+="f"==i[1]?f(s,i):i+"{"+f(s,"k"==i[1]?"":t)+"}":"object"==typeof s?a+=f(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=f.p?f.p(i,s):i+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+a},y={},g=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+g(e[r]);return t}return e},h=(e,t,r,a,o)=>{var i;let s=g(e),n=y[s]||(y[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!y[n]){let t=s!==e?e:(e=>{let t,r,a=[{}];for(;t=u.exec(e.replace(p,""));)t[4]?a.shift():t[3]?(r=t[3].replace(m," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(m," ").trim();return a[0]})(e);y[n]=f(o?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&y.g?y.g:null;return r&&(y.g=y[n]),i=y[n],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),n},b=(e,t,r)=>e.reduce((e,a,o)=>{let i=t[o];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":f(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function x(e){let t=this||{},r=e.call?e(t.p):e;return h(r.unshift?r.raw?b(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,d(t.target),t.g,t.o,t.k)}x.bind({g:1});let v,w,j,O=x.bind({k:1});function N(e,t){let r=this||{};return function(){let a=arguments;function o(i,s){let n=Object.assign({},i),l=n.className||o.className;r.p=Object.assign({theme:w&&w()},n),r.o=/ *go\d+/.test(l),n.className=x.apply(r,a)+(l?" "+l:""),t&&(n.ref=s);let c=e;return e[0]&&(c=n.as||e,delete n.as),j&&c[0]&&j(n),v(c,n)}return t?t(o):o}}var E=e=>"function"==typeof e,k=(e,t)=>E(e)?e(t):e,P=(a=0,()=>(++a).toString()),S=()=>{if(void 0===o&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");o=!e||e.matches}return o},C=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return C(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},_=[],$={toasts:[],pausedAt:void 0},D=e=>{$=C($,e),_.forEach(e=>{e($)})},T={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=(e={})=>{let[t,r]=(0,n.useState)($);(0,n.useEffect)(()=>(_.push(r),()=>{let e=_.indexOf(r);e>-1&&_.splice(e,1)}),[t]);let a=t.toasts.map(t=>{var r,a,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||T[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...t,toasts:a}},z=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||P()}),F=e=>(t,r)=>{let a=z(t,e,r);return D({type:2,toast:a}),a.id},A=(e,t)=>F("blank")(e,t);A.error=F("error"),A.success=F("success"),A.loading=F("loading"),A.custom=F("custom"),A.dismiss=e=>{D({type:3,toastId:e})},A.remove=e=>D({type:4,toastId:e}),A.promise=(e,t,r)=>{let a=A.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?k(t.success,e):void 0;return o?A.success(o,{id:a,...r,...null==r?void 0:r.success}):A.dismiss(a),e}).catch(e=>{let o=t.error?k(t.error,e):void 0;o?A.error(o,{id:a,...r,...null==r?void 0:r.error}):A.dismiss(a)}),e};var R=(e,t)=>{D({type:1,toast:{id:e,height:t}})},L=()=>{D({type:5,time:Date.now()})},M=new Map,U=1e3,H=(e,t=U)=>{if(M.has(e))return;let r=setTimeout(()=>{M.delete(e),D({type:4,toastId:e})},t);M.set(e,r)},Y=e=>{let{toasts:t,pausedAt:r}=I(e);(0,n.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&A.dismiss(t.id);return}return setTimeout(()=>A.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,n.useCallback)(()=>{r&&D({type:6,time:Date.now()})},[r]),o=(0,n.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:o=8,defaultPosition:i}=r||{},s=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[t]);return(0,n.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)H(e.id,e.removeDelay);else{let t=M.get(e.id);t&&(clearTimeout(t),M.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:R,startPause:L,endPause:a,calculateOffset:o}}},B=O`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,W=O`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=O`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,G=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${W} 0.15s ease-out forwards;
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
    animation: ${q} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,J=O`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Z=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${J} 1s linear infinite;
`,K=O`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Q=O`
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
}`,V=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Q} 0.2s ease-out forwards;
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
`,X=N("div")`
  position: absolute;
`,ee=N("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,et=O`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,er=N("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${et} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ea=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?n.createElement(er,null,t):t:"blank"===r?null:n.createElement(ee,null,n.createElement(Z,{...a}),"loading"!==r&&n.createElement(X,null,"error"===r?n.createElement(G,{...a}):n.createElement(V,{...a})))},eo=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ei=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=N("div")`
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
`,en=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,el=(e,t)=>{let r=e.includes("top")?1:-1,[a,o]=S()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[eo(r),ei(r)];return{animation:t?`${O(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${O(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ec=n.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?el(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(ea,{toast:e}),s=n.createElement(en,{...e.ariaProps},k(e.message,e));return n.createElement(es,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof a?a({icon:i,message:s}):n.createElement(n.Fragment,null,i,s))});i=n.createElement,f.p=void 0,v=i,w=void 0,j=void 0;var ed=({id:e,className:t,style:r,onHeightUpdate:a,children:o})=>{let i=n.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return n.createElement("div",{ref:i,className:t,style:r},o)},eu=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:S()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ep=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:o,containerStyle:i,containerClassName:s})=>{let{toasts:l,handlers:c}=Y(r);return n.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:s,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let i=r.position||t,s=eu(i,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return n.createElement(ed,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?ep:"",style:s},"custom"===r.type?k(r.message,r):o?o(r):n.createElement(ec,{toast:r,position:i}))}))},ef=r(29172),ey=()=>{let e=(0,l.useRouter)(),[t,r]=(0,n.useState)(""),[a,o]=(0,n.useState)(""),[i,c]=(0,n.useState)(""),[d,u]=(0,n.useState)(!1),[p,m]=(0,n.useState)({}),f=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),y=e=>/^\d{10}$/.test(e),g=async r=>{r.preventDefault(),u(!0),m({});let o={};if(t.trim()||(o.name="Name is required."),f(a)||(o.email="Please enter a valid email address."),y(i)||(o.phone="Please enter a valid 10-digit phone number."),Object.keys(o).length>0){m(o),u(!1);return}try{let r=await fetch("https://admission-backend.vercel.app/api/user?email=".concat(encodeURIComponent(a),"&phone=").concat(encodeURIComponent(i)),{method:"GET",headers:{"Content-Type":"application/json"}});if(!r.ok)throw Error("Failed to check attempts");let o=await r.json();if(o.attempts&&o.attempts>=2){A.error("You have exceeded the maximum number of attempts."),u(!1);return}if(!(await fetch("https://admission-backend.vercel.app/api/saveUser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:a,phone:i})})).ok)throw Error("Failed to save user");void 0===o.attempts||0===o.attempts?(localStorage.setItem("examStarted","true"),e.push("/exam")):A.success("Attempt saved successfully.")}catch(e){A.error("Something went wrong. Please try again.")}finally{u(!1)}};return(0,s.jsxs)("div",{children:[(0,s.jsx)(em,{position:"top-center"}),(0,s.jsx)("section",{className:"text-gray-600 body-font",children:(0,s.jsxs)("div",{className:"container px-5 py-24 mx-auto flex flex-wrap items-center",children:[(0,s.jsxs)("div",{className:"lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0",children:[(0,s.jsx)("h1",{className:"title-font font-bold text-3xl text-blue-900",children:"Welcome to the Scholarship Test Portal"}),(0,s.jsxs)("p",{className:"leading-relaxed mt-4 text-red-600",children:["This is your opportunity to prove yourself! Please note that you can only attempt this exam ",(0,s.jsx)("strong",{children:"two times"}),". Make every attempt count."]})]}),(0,s.jsxs)("div",{className:"lg:w-2/6 md:w-1/2 bg-red-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0",children:[(0,s.jsx)("h2",{className:"text-gray-900 text-lg font-medium title-font mb-5",children:"Login to Begin Your Test"}),(0,s.jsxs)("form",{onSubmit:g,children:[(0,s.jsxs)("div",{className:"relative mb-4",children:[(0,s.jsx)("label",{htmlFor:"name",className:"leading-7 text-sm text-gray-600",children:"Name"}),(0,s.jsx)("input",{type:"text",id:"name",name:"name",value:t,onChange:e=>r(e.target.value),className:"w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out ".concat(p.name?"border-red-500":"")}),p.name&&(0,s.jsx)("p",{className:"text-red-500 text-sm mt-1",children:p.name})]}),(0,s.jsxs)("div",{className:"relative mb-4",children:[(0,s.jsx)("label",{htmlFor:"email",className:"leading-7 text-sm text-gray-600",children:"Email"}),(0,s.jsx)("input",{type:"email",id:"email",name:"email",value:a,onChange:e=>o(e.target.value),className:"w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out ".concat(p.email?"border-red-500":"")}),p.email&&(0,s.jsx)("p",{className:"text-red-500 text-sm mt-1",children:p.email})]}),(0,s.jsxs)("div",{className:"relative mb-4",children:[(0,s.jsx)("label",{htmlFor:"phone",className:"leading-7 text-sm text-gray-600",children:"Phone"}),(0,s.jsx)("input",{type:"tel",id:"phone",name:"phone",value:i,onChange:e=>c(e.target.value),className:"w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out ".concat(p.phone?"border-red-500":"")}),p.phone&&(0,s.jsx)("p",{className:"text-red-500 text-sm mt-1",children:p.phone})]}),(0,s.jsxs)("button",{type:"submit",disabled:d,className:"w-full text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg flex items-center justify-center",children:[d?(0,s.jsx)(ef.fCD,{className:"animate-spin mr-2"}):null,d?"Starting...":"Start Test"]})]}),(0,s.jsx)("p",{className:"text-xs text-gray-500 mt-3",children:"If you face any issues, please contact our support team."})]})]})})]})}},30622:function(e,t,r){"use strict";var a=r(2265),o=Symbol.for("react.element"),i=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,n=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var a,i={},c=null,d=null;for(a in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)s.call(t,a)&&!l.hasOwnProperty(a)&&(i[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps)void 0===i[a]&&(i[a]=t[a]);return{$$typeof:o,type:e,key:c,ref:d,props:i,_owner:n.current}}t.Fragment=i,t.jsx=c,t.jsxs=c},57437:function(e,t,r){"use strict";e.exports=r(30622)},24033:function(e,t,r){e.exports=r(15313)},43118:function(e,t,r){"use strict";r.d(t,{w_:function(){return d}});var a=r(2265),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=a.createContext&&a.createContext(o),s=["attr","size","title"];function n(){return(n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach(function(t){var a,o;a=t,o=r[t],(a=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,t||"default");if("object"!=typeof a)return a;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(a))in e?Object.defineProperty(e,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[a]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function d(e){return t=>a.createElement(u,n({attr:c({},e.attr)},t),function e(t){return t&&t.map((t,r)=>a.createElement(t.tag,c({key:r},t.attr),e(t.child)))}(e.child))}function u(e){var t=t=>{var r,{attr:o,size:i,title:l}=e,d=function(e,t){if(null==e)return{};var r,a,o=function(e,t){if(null==e)return{};var r={};for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){if(t.indexOf(a)>=0)continue;r[a]=e[a]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}(e,s),u=i||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),a.createElement("svg",n({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,o,d,{className:r,style:c(c({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),l&&a.createElement("title",null,l),e.children)};return void 0!==i?a.createElement(i.Consumer,null,e=>t(e)):t(o)}}},function(e){e.O(0,[699,971,938,744],function(){return e(e.s=68528)}),_N_E=e.O()}]);
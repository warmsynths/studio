(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tt=globalThis,vt=tt.ShadowRoot&&(tt.ShadyCSS===void 0||tt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,yt=Symbol(),At=new WeakMap;let It=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==yt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(vt&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=At.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&At.set(e,t))}return t}toString(){return this.cssText}};const Xt=s=>new It(typeof s=="string"?s:s+"",void 0,yt),v=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((o,i,a)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[a+1],s[0]);return new It(e,s,yt)},Yt=(s,t)=>{if(vt)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const o=document.createElement("style"),i=tt.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=e.cssText,s.appendChild(o)}},_t=vt?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return Xt(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Jt,defineProperty:Qt,getOwnPropertyDescriptor:Zt,getOwnPropertyNames:te,getOwnPropertySymbols:ee,getPrototypeOf:ie}=Object,lt=globalThis,Ot=lt.trustedTypes,se=Ot?Ot.emptyScript:"",oe=lt.reactiveElementPolyfillSupport,G=(s,t)=>s,et={toAttribute(s,t){switch(t){case Boolean:s=s?se:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},mt=(s,t)=>!Jt(s,t),Pt={attribute:!0,type:String,converter:et,reflect:!1,useDefault:!1,hasChanged:mt};Symbol.metadata??=Symbol("metadata"),lt.litPropertyMetadata??=new WeakMap;let N=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Pt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);i!==void 0&&Qt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:a}=Zt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){const n=i?.call(this);a?.call(this,r),this.requestUpdate(t,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Pt}static _$Ei(){if(this.hasOwnProperty(G("elementProperties")))return;const t=ie(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(G("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(G("properties"))){const e=this.properties,o=[...te(e),...ee(e)];for(const i of o)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[o,i]of e)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[e,o]of this.elementProperties){const i=this._$Eu(e,o);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const i of o)e.unshift(_t(i))}else t!==void 0&&e.push(_t(t));return e}static _$Eu(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Yt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(i!==void 0&&o.reflect===!0){const a=(o.converter?.toAttribute!==void 0?o.converter:et).toAttribute(e,o.type);this._$Em=t,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const a=o.getPropertyOptions(i),r=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:et;this._$Em=i;const n=r.fromAttribute(e,a.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,o,i=!1,a){if(t!==void 0){const r=this.constructor;if(i===!1&&(a=this[t]),o??=r.getPropertyOptions(t),!((o.hasChanged??mt)(a,e)||o.useDefault&&o.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,o))))return;this.C(t,e,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:a},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),a!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[i,a]of o){const{wrapped:r}=a,n=this[i];r!==!0||this._$AL.has(i)||n===void 0||this.C(i,void 0,a,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[G("elementProperties")]=new Map,N[G("finalized")]=new Map,oe?.({ReactiveElement:N}),(lt.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t=globalThis,Et=s=>s,it=$t.trustedTypes,Ct=it?it.createPolicy("lit-html",{createHTML:s=>s}):void 0,jt="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Nt="?"+C,ae=`<${Nt}>`,R=document,W=()=>R.createComment(""),X=s=>s===null||typeof s!="object"&&typeof s!="function",wt=Array.isArray,re=s=>wt(s)||typeof s?.[Symbol.iterator]=="function",xt=`[ 	
\f\r]`,K=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Tt=/-->/g,Dt=/>/g,z=RegExp(`>|${xt}(?:([^\\s"'>=/]+)(${xt}*=${xt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),zt=/'/g,Mt=/"/g,Ft=/^(?:script|style|textarea|title)$/i,ne=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),c=ne(1),F=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),Rt=new WeakMap,M=R.createTreeWalker(R,129);function Lt(s,t){if(!wt(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ct!==void 0?Ct.createHTML(t):t}const pe=(s,t)=>{const e=s.length-1,o=[];let i,a=t===2?"<svg>":t===3?"<math>":"",r=K;for(let n=0;n<e;n++){const p=s[n];let h,g,d=-1,b=0;for(;b<p.length&&(r.lastIndex=b,g=r.exec(p),g!==null);)b=r.lastIndex,r===K?g[1]==="!--"?r=Tt:g[1]!==void 0?r=Dt:g[2]!==void 0?(Ft.test(g[2])&&(i=RegExp("</"+g[2],"g")),r=z):g[3]!==void 0&&(r=z):r===z?g[0]===">"?(r=i??K,d=-1):g[1]===void 0?d=-2:(d=r.lastIndex-g[2].length,h=g[1],r=g[3]===void 0?z:g[3]==='"'?Mt:zt):r===Mt||r===zt?r=z:r===Tt||r===Dt?r=K:(r=z,i=void 0);const m=r===z&&s[n+1].startsWith("/>")?" ":"";a+=r===K?p+ae:d>=0?(o.push(h),p.slice(0,d)+jt+p.slice(d)+C+m):p+C+(d===-2?n:m)}return[Lt(s,a+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]};class Y{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let a=0,r=0;const n=t.length-1,p=this.parts,[h,g]=pe(t,e);if(this.el=Y.createElement(h,o),M.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=M.nextNode())!==null&&p.length<n;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(jt)){const b=g[r++],m=i.getAttribute(d).split(C),P=/([.?@])?(.*)/.exec(b);p.push({type:1,index:a,name:P[2],strings:m,ctor:P[1]==="."?de:P[1]==="?"?ce:P[1]==="@"?he:dt}),i.removeAttribute(d)}else d.startsWith(C)&&(p.push({type:6,index:a}),i.removeAttribute(d));if(Ft.test(i.tagName)){const d=i.textContent.split(C),b=d.length-1;if(b>0){i.textContent=it?it.emptyScript:"";for(let m=0;m<b;m++)i.append(d[m],W()),M.nextNode(),p.push({type:2,index:++a});i.append(d[b],W())}}}else if(i.nodeType===8)if(i.data===Nt)p.push({type:2,index:a});else{let d=-1;for(;(d=i.data.indexOf(C,d+1))!==-1;)p.push({type:7,index:a}),d+=C.length-1}a++}}static createElement(t,e){const o=R.createElement("template");return o.innerHTML=t,o}}function L(s,t,e=s,o){if(t===F)return t;let i=o!==void 0?e._$Co?.[o]:e._$Cl;const a=X(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(s),i._$AT(s,e,o)),o!==void 0?(e._$Co??=[])[o]=i:e._$Cl=i),i!==void 0&&(t=L(s,i._$AS(s,t.values),i,o)),t}class le{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??R).importNode(e,!0);M.currentNode=i;let a=M.nextNode(),r=0,n=0,p=o[0];for(;p!==void 0;){if(r===p.index){let h;p.type===2?h=new Q(a,a.nextSibling,this,t):p.type===1?h=new p.ctor(a,p.name,p.strings,this,t):p.type===6&&(h=new ge(a,this,t)),this._$AV.push(h),p=o[++n]}r!==p?.index&&(a=M.nextNode(),r++)}return M.currentNode=R,i}p(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=L(this,t,e),X(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==F&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):re(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&X(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=Y.createElement(Lt(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const a=new le(i,this),r=a.u(this.options);a.p(e),this.T(r),this._$AH=a}}_$AC(t){let e=Rt.get(t.strings);return e===void 0&&Rt.set(t.strings,e=new Y(t)),e}k(t){wt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const a of t)i===e.length?e.push(o=new Q(this.O(W()),this.O(W()),this,this.options)):o=e[i],o._$AI(a),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const o=Et(t).nextSibling;Et(t).remove(),t=o}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class dt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,a){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=f}_$AI(t,e=this,o,i){const a=this.strings;let r=!1;if(a===void 0)t=L(this,t,e,0),r=!X(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const n=t;let p,h;for(t=a[0],p=0;p<a.length-1;p++)h=L(this,n[o+p],e,p),h===F&&(h=this._$AH[p]),r||=!X(h)||h!==this._$AH[p],h===f?t=f:t!==f&&(t+=(h??"")+a[p+1]),this._$AH[p]=h}r&&!i&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class de extends dt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}}class ce extends dt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}}class he extends dt{constructor(t,e,o,i,a){super(t,e,o,i,a),this.type=5}_$AI(t,e=this){if((t=L(this,t,e,0)??f)===F)return;const o=this._$AH,i=t===f&&o!==f||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,a=t!==f&&(o===f||i);i&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ge{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}}const ue=$t.litHtmlPolyfillSupport;ue?.(Y,Q),($t.litHtmlVersions??=[]).push("3.3.3");const xe=(s,t,e)=>{const o=e?.renderBefore??t;let i=o._$litPart$;if(i===void 0){const a=e?.renderBefore??null;o._$litPart$=i=new Q(t.insertBefore(W(),a),a,void 0,e??{})}return i._$AI(s),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kt=globalThis;class x extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=xe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}x._$litElement$=!0,x.finalized=!0,kt.litElementHydrateSupport?.({LitElement:x});const be=kt.litElementPolyfillSupport;be?.({LitElement:x});(kt.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fe={attribute:!0,type:String,converter:et,reflect:!1,hasChanged:mt},ve=(s=fe,t,e)=>{const{kind:o,metadata:i}=e;let a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),o==="setter"&&((s=Object.create(s)).wrapped=!0),a.set(e.name,s),o==="accessor"){const{name:r}=e;return{set(n){const p=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,p,s,!0,n)},init(n){return n!==void 0&&this.C(r,void 0,s,n),n}}}if(o==="setter"){const{name:r}=e;return function(n){const p=this[r];t.call(this,n),this.requestUpdate(r,p,s,!0,n)}}throw Error("Unsupported decorator location: "+o)};function l(s){return(t,e)=>typeof e=="object"?ve(s,t,e):((o,i,a)=>{const r=i.hasOwnProperty(a);return i.constructor.createProperty(a,o),r?Object.getOwnPropertyDescriptor(i,a):void 0})(s,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function H(s){return l({...s,state:!0,attribute:!1})}const u={drift:{key:"drift",rest:-.8,onEnd:!1,z:1,slug:"beat-mapper",title:"BEAT MAPPER",sub:"Started as a live pad-flasher and got rebuilt around a harder problem: classifying a performer’s own kick, snare, and hat relative to each other instead of guessing fixed frequencies that never held across voices or mics. A self-calibrating noise floor and root-cause debugging against real takes took it from spurious hits to 90% confidence — reskinned as a printed field manual, seismograph and all.",year:"2026",role:"Direction · build",stack:"Meyda · Web Audio",run:"0:04:12",kicker:"BEATBOX TO PAD",bg:"#f2f2f2",fg:"#111",strip:"#c62828",strip2:"#7f1d1d",embedTag:"beat-mapper-embed"},pixel:{key:"pixel",rest:1.2,onEnd:!1,z:1,slug:"chroma-chords",title:"CHROMA CHORDS",sub:"Began life as Chord Voyager, a maritime-themed modular studio gated behind Google sign-in. Rebuilt from the ground up into a three-tap Seed → Loop → Swap flow, then taught to read plain-language mood through Claude — constrained, validated, and hardened behind an authenticated proxy so a free-text vibe becomes a real, idiomatic progression in one request.",year:"2026",role:"Direction · build",stack:"Tone.js · Claude",run:"0:02:48",kicker:"CHORD PROGRESSIONS",bg:"#f6d000",fg:"#111",strip:"#e91e8c",strip2:"#7e57c2",embedTag:"chroma-chords-embed"},chord:{key:"chord",rest:-.5,onEnd:!1,z:1,slug:"circuit-chords",title:"CIRCUIT CHORDS",sub:"What started as a simple chord-to-pad mapper for the Novation Circuit grew into a full WebMIDI instrument: SysEx patch dumps in and out, a dual light/dark theme matching Circuit Tracks and Circuit Rhythm hardware, and a componentized architecture built to keep growing without buckling under its own state.",year:"2026",role:"Design · build",stack:"Tonal.js · WebMIDI",run:"0:03:30",kicker:"PAD GRID MAPPER",bg:"#f4efdd",fg:"#111",strip:"#d9a441",strip2:"#b8860b",embedTag:"circuit-chords-embed"},echo:{key:"echo",rest:-13,onEnd:!0,z:3,slug:"hypersyn-chord-helper",title:"HYPERSYN HELPER",sub:"A single-file hex converter, hand-modularized into typed, tested TypeScript as it grew — then reimagined entirely as a CRT boot terminal: command-line input, scanline flicker, eight switchable color themes, and voicings you cycle by tapping the badge itself, on desktop or thumb alike.",year:"2026",role:"Direction · build",stack:"Tonal.js · Web Audio",run:"0:05:06",kicker:"CHORD → HEX",bg:"#141414",fg:"#eee",strip:"#43a047",strip2:"#1b5e20",embedTag:"hypersyn-embed"},scene:{key:"scene",rest:-13,onEnd:!0,z:2,slug:"j6-companion",title:"J-6 COMPANION",sub:"Started as a two-pane preset browser for the Roland J-6, rebuilt as a skeuomorphic synth faceplate, then expanded across three linked data domains — presets, chord sets, and arpeggiator styles — backed by an RFC-driven relational dataset and shipped installable as a PWA for use at the instrument, offline.",year:"2026",role:"Direction · build",stack:"Lit · PWA",run:"0:06:20",kicker:"SYNTH COMPANION",bg:"#1a3fa0",fg:"#fff",strip:"#1e88e5",strip2:"#0d3fa0",embedTag:"j6-companion-embed"}};class ye{constructor(){this.ctx=null,this.muted=!1}initCtx(){if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t)}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}setMuted(t){this.muted=t}isMuted(){return this.muted}playClick(){if(this.muted||(this.initCtx(),!this.ctx))return;const t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(800,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(120,this.ctx.currentTime+.04),e.gain.setValueAtTime(.3,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.04),t.connect(e),e.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.04)}playSleeveSlide(){if(this.muted||(this.initCtx(),!this.ctx))return;const t=this.ctx.sampleRate*.3,e=this.ctx.createBuffer(1,t,this.ctx.sampleRate),o=e.getChannelData(0);for(let n=0;n<t;n++)o[n]=Math.random()*2-1;const i=this.ctx.createBufferSource();i.buffer=e;const a=this.ctx.createBiquadFilter();a.type="bandpass",a.frequency.setValueAtTime(400,this.ctx.currentTime),a.frequency.exponentialRampToValueAtTime(1200,this.ctx.currentTime+.25),a.Q.setValueAtTime(2,this.ctx.currentTime);const r=this.ctx.createGain();r.gain.setValueAtTime(.01,this.ctx.currentTime),r.gain.linearRampToValueAtTime(.18,this.ctx.currentTime+.12),r.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.3),i.connect(a),a.connect(r),r.connect(this.ctx.destination),i.start()}playDeckThunk(){if(this.muted||(this.initCtx(),!this.ctx))return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),o=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(160,t),e.frequency.exponentialRampToValueAtTime(35,t+.12),o.gain.setValueAtTime(.5,t),o.gain.exponentialRampToValueAtTime(.001,t+.14),e.connect(o),o.connect(this.ctx.destination),e.start(t),e.stop(t+.14);const i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type="square",i.frequency.setValueAtTime(950,t+.03),i.frequency.exponentialRampToValueAtTime(220,t+.08),a.gain.setValueAtTime(0,t),a.gain.setValueAtTime(.25,t+.03),a.gain.exponentialRampToValueAtTime(.001,t+.09),i.connect(a),a.connect(this.ctx.destination),i.start(t+.03),i.stop(t+.09)}playStaticCrackle(t=90){if(this.muted||(this.initCtx(),!this.ctx))return;const e=t/1e3,o=Math.floor(this.ctx.sampleRate*e),i=this.ctx.createBuffer(1,o,this.ctx.sampleRate),a=i.getChannelData(0);for(let p=0;p<o;p++)a[p]=(Math.random()*2-1)*(Math.random()>.4?1:.1);const r=this.ctx.createBufferSource();r.buffer=i;const n=this.ctx.createGain();n.gain.setValueAtTime(.2,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+e),r.connect(n),n.connect(this.ctx.destination),r.start()}playCrtHum(){if(this.muted||(this.initCtx(),!this.ctx))return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),o=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(12e3,t),o.gain.setValueAtTime(.04,t),o.gain.exponentialRampToValueAtTime(.005,t+.4),e.connect(o),o.connect(this.ctx.destination),e.start(t),e.stop(t+.4);const i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type="triangle",i.frequency.setValueAtTime(120,t),i.frequency.exponentialRampToValueAtTime(50,t+.2),a.gain.setValueAtTime(.3,t),a.gain.exponentialRampToValueAtTime(.001,t+.2),i.connect(a),a.connect(this.ctx.destination),i.start(t),i.stop(t+.2)}playEjectPop(){if(this.muted||(this.initCtx(),!this.ctx))return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),o=this.ctx.createGain();e.type="sawtooth",e.frequency.setValueAtTime(450,t),e.frequency.exponentialRampToValueAtTime(80,t+.08),o.gain.setValueAtTime(.35,t),o.gain.exponentialRampToValueAtTime(.001,t+.08),e.connect(o),o.connect(this.ctx.destination),e.start(t),e.stop(t+.08)}}const E=new ye,bt="cubic-bezier(.23,1,.32,1)";class me{constructor(t){this.activeKey=null,this.stageState="idle",this.flightTransform="none",this.flightDur=220,this.flightEase=bt,this.currentShot="none",this.showFlash=!1,this.camOn=!1,this.camScale=1.6,this.camDur=0,this.camOrigin="735px 307px",this.shotADur=1300,this.shotBDur=1250,this.flashDur=130,this.dollyDur=420,this.readDur=620,this.camPct=174,this.activeHold=null,this.scrubVal=0,this._t=[],(this.host=t).addController(this)}hostDisconnected(){this.clear()}clear(){this._t.forEach(t=>clearTimeout(t)),this._t=[]}at(t,e){const o=window.setTimeout(()=>{e(),this.host.requestUpdate()},t);this._t.push(o)}setStateIdle(){this.activeKey=null,this.stageState="idle",this.flightTransform="none",this.currentShot="none",this.camOn=!1,this.host.requestUpdate()}pick(t,e,o,i){if(this.currentShot!=="none"){this.skip();return}if(!["lift","fly","insert","settle","ejectCollapse","ejectCam","pop","home"].includes(this.stageState)){if(this.stageState==="read"){this.toPlay();return}if(this.clear(),E.playClick(),history.pushState({p:u[t].slug},"","#/"+u[t].slug),window.matchMedia("(prefers-reduced-motion: reduce)").matches){this.activeKey=t,this.stageState="playWipe",this.flightTransform=e,this.flightDur=0,this.camOn=!0,this.camScale=1.6,this.camDur=0,this.host.requestUpdate();return}i?this.mobileCut(t):this.cut(t,e,o),this.host.requestUpdate()}}cut(t,e,o){const{shotADur:i,shotBDur:a,flashDur:r,dollyDur:n,readDur:p,camPct:h}=this,g=i+200,d=g+a+150,b=d+r+n+p;this.activeKey=t,this.stageState="read",this.flightTransform=e,this.flightDur=0,this.flightEase=bt,this.camOrigin=o,this.currentShot="A",this.showFlash=!0,this.camOn=!0,this.camScale=h/100,this.camDur=0,this.activeHold=null,this.scrubVal=0,E.playSleeveSlide(),this.at(r,()=>{this.showFlash=!1}),this.at(g,()=>{this.currentShot="B",this.showFlash=!0,E.playDeckThunk()}),this.at(g+r,()=>{this.showFlash=!1}),this.at(d,()=>{this.currentShot="none",this.showFlash=!0,E.playCrtHum()}),this.at(d+r,()=>{this.showFlash=!1,this.camScale=1.6,this.camDur=n}),this.at(b,()=>{this.stageState="play"}),this.at(b+260,()=>{this.stageState="playWipe"})}skip(){this.clear(),E.playClick(),this.currentShot="none",this.showFlash=!0,this.camOn=!0,this.camScale=1.6,this.camDur=0,this.stageState="play",this.host.requestUpdate(),this.at(90,()=>{this.showFlash=!1}),this.at(160,()=>{this.stageState="playWipe"})}toPlay(){this.clear(),this.stageState="play",this.camOn=!0,this.camScale=1.6,this.camDur=560,this.host.requestUpdate(),this.at(560,()=>{this.stageState="playWipe"})}jump(t,e,o){this.clear(),this.activeKey=t,this.stageState="playWipe",this.flightTransform=e,this.flightDur=0,this.camOrigin=o,this.camOn=!0,this.camScale=1.6,this.host.requestUpdate()}eject(t){if(!this.activeKey)return;if(this.clear(),E.playClick(),E.playEjectPop(),location.hash&&location.hash!=="#/"&&history.pushState({},"","#/"),window.matchMedia("(prefers-reduced-motion: reduce)").matches){this.setStateIdle();return}if(t){this.mobileEject(),this.host.requestUpdate();return}const e=this.flashDur,o=Math.round(this.shotBDur*.72);this.stageState="ejectCollapse",this.activeHold=null,this.at(200,()=>{this.currentShot="Be",this.showFlash=!0}),this.at(200+e,()=>{this.showFlash=!1}),this.at(200+o+60,()=>{this.currentShot="none",this.showFlash=!0,this.camOn=!1,this.camDur=0,this.flightTransform="none"}),this.at(200+o+60+e,()=>{this.showFlash=!1,this.setStateIdle()}),this.host.requestUpdate()}mobileCut(t){const e=this.flashDur,o=this.shotBDur;this.activeKey=t,this.stageState="read",this.currentShot="B",this.showFlash=!0,this.activeHold=null,this.scrubVal=0,E.playDeckThunk(),this.at(e,()=>{this.showFlash=!1}),this.at(o+100,()=>{this.currentShot="none",this.showFlash=!0}),this.at(o+100+e,()=>{this.showFlash=!1,this.stageState="play"}),this.at(o+100+e+260,()=>{this.stageState="playWipe"})}mobileEject(){const t=this.flashDur,e=Math.round(this.shotBDur*.72);this.stageState="ejectCollapse",this.activeHold=null,this.currentShot="Be",this.showFlash=!0,this.at(t,()=>{this.showFlash=!1}),this.at(e+60,()=>{this.currentShot="none",this.showFlash=!0}),this.at(e+60+t,()=>{this.showFlash=!1,this.setStateIdle()})}cancel(){this.clear(),this.stageState="home",this.flightTransform="none",this.flightDur=220,this.flightEase=bt,this.host.requestUpdate(),this.at(220,()=>{this.setStateIdle()})}handleHold(t,e,o){this.clear();const i=this.activeKey||"echo";if(t==="idle"){this.activeHold=null,this.scrubVal=0,this.currentShot="none",this.showFlash=!1,this.activeKey=null,this.stageState="idle",this.flightTransform="none",this.camOn=!1,this.host.requestUpdate();return}if(t==="play"){this.activeHold=null,this.scrubVal=0,this.currentShot="none",this.showFlash=!1,this.activeKey=i,this.stageState="playWipe",this.flightTransform=e,this.camOrigin=o,this.camOn=!0,this.camScale=1.6,this.host.requestUpdate();return}this.activeHold=t,this.scrubVal=0,this.currentShot=t,this.showFlash=!1,this.activeKey=i,this.stageState="read",this.flightTransform=e,this.camOrigin=o,this.camOn=!0,this.camScale=this.camPct/100,this.host.requestUpdate()}handleParamChange(t,e){t==="shotADur"?this.shotADur=e:t==="shotBDur"?this.shotBDur=e:t==="flashDur"?this.flashDur=e:t==="dollyDur"?this.dollyDur=e:t==="readDur"?this.readDur=e:t==="camPct"?this.camPct=e:t==="scrub"&&(this.scrubVal=e),this.host.requestUpdate()}}var $e=Object.defineProperty,we=Object.getOwnPropertyDescriptor,D=(s,t,e,o)=>{for(var i=o>1?void 0:o?we(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&$e(t,e,i),i};let k=class extends x{constructor(){super(...arguments),this.activeKey=null,this.stage="idle",this.sceneOp=1,this.flightTransform="none",this.flightDur=0,this.flightEase="cubic-bezier(.23,1,.32,1)",this.flightFx="drop-shadow(0 2px 4px rgba(42,38,33,.12))"}pick(s){this.dispatchEvent(new CustomEvent("pick-tape",{detail:{key:s}}))}render(){const s=this.activeKey,t=this.stage,e=t!=="idle"&&t!=="home",o=t==="play"||t==="playWipe",i=o||t==="read"||t==="ejectCollapse"?"none":"auto",a=d=>{d[0].toUpperCase()+d.slice(1);const b=s===d,m=e?b?o?0:1:o?.18:.35:1,P=e&&!b?o?"blur(6px)":"blur(3px)":"blur(0px)",gt=b?this.flightTransform:"none",ut=b?40:u[d].z;return{op:m,fx:P,tf:gt,z:ut}},r=a("drift"),n=a("pixel"),p=a("chord"),h=a("echo"),g=a("scene");return c`
      <div style="position:relative; width:100%; height:100%; pointer-events:${i}">
        <!-- Shadows -->
        <div style="position:absolute; left:-4px; bottom:-4px; width:222px; height:8px; background:rgba(42,38,33,.18); filter:blur(5px); border-radius:50%; opacity:${this.sceneOp}; transition:opacity 260ms cubic-bezier(.23,1,.32,1)"></div>
        <div style="position:absolute; left:226px; bottom:-4px; width:116px; height:8px; background:rgba(42,38,33,.2); filter:blur(5px); border-radius:50%; opacity:${this.sceneOp}; transition:opacity 260ms cubic-bezier(.23,1,.32,1)"></div>

        <!-- DRIFT Tape -->
        <div data-tape="drift" style="position:absolute; left:8px; bottom:0; z-index:${r.z}; opacity:${r.op}; filter:${r.fx}; transition:opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)">
          <div data-flight style="transform:${r.tf}; filter:${this.flightFx}; transition:transform ${this.flightDur}ms ${this.flightEase}, filter 300ms cubic-bezier(.23,1,.32,1); will-change:transform">
            <div style="transform:rotate(-.8deg)">
              <div @click=${()=>this.pick("drift")} style="width:200px; height:35px; position:relative; border-radius:4px 4px 2px 2px; background:#262626; box-shadow:0 2px 7px rgba(42,38,33,.2); overflow:hidden; cursor:pointer; transition:transform 120ms cubic-bezier(.23,1,.32,1)">
                <div style="position:absolute; left:0; top:0; bottom:0; width:10px; background:${u.drift.strip}"></div>
                <div style="position:absolute; left:18px; top:6px; bottom:6px; right:34px; background:#f4f1e6; border-radius:1px; display:flex; align-items:center; gap:8px; padding:0 8px">
                  <span style="font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:9px; letter-spacing:.05em; white-space:nowrap; color:#2a2621">BEAT MAPPER</span>
                  <span style="font-family:'IBM Plex Mono',monospace; font-size:6px; color:rgba(42,38,33,.5); letter-spacing:.05em; white-space:nowrap">${u.drift.kicker}</span>
                </div>
                <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16)"></div>
                <div style="position:absolute; right:8px; top:11px; font-size:7px; font-style:italic; color:#aaa; font-family:Arial,sans-serif">VHS</div>
              </div>
            </div>
          </div>
        </div>

        <!-- PIXEL LOOM Tape -->
        <div data-tape="pixel" style="position:absolute; left:2px; bottom:33px; z-index:${n.z}; opacity:${n.op}; filter:${n.fx}; transition:opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)">
          <div data-flight style="transform:${n.tf}; filter:${this.flightFx}; transition:transform ${this.flightDur}ms ${this.flightEase}, filter 300ms cubic-bezier(.23,1,.32,1); will-change:transform">
            <div style="transform:rotate(1.2deg)">
              <div @click=${()=>this.pick("pixel")} style="width:200px; height:35px; position:relative; border-radius:4px 4px 2px 2px; background:#262626; box-shadow:0 2px 7px rgba(42,38,33,.2); overflow:hidden; cursor:pointer; transition:transform 120ms cubic-bezier(.23,1,.32,1)">
                <div style="position:absolute; left:0; top:0; bottom:0; width:10px; background:${u.pixel.strip}"></div>
                <div style="position:absolute; left:18px; top:6px; bottom:6px; right:34px; background:#f4f1e6; border-radius:1px; display:flex; align-items:center; gap:8px; padding:0 8px">
                  <span style="font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:9px; letter-spacing:.05em; white-space:nowrap; color:#2a2621">CHROMA CHORDS</span>
                  <span style="font-family:'IBM Plex Mono',monospace; font-size:6px; color:rgba(42,38,33,.5); letter-spacing:.05em; white-space:nowrap">${u.pixel.kicker}</span>
                </div>
                <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16)"></div>
                <div style="position:absolute; right:8px; top:11px; font-size:7px; font-style:italic; color:#aaa; font-family:Arial,sans-serif">VHS</div>
              </div>
            </div>
          </div>
        </div>

        <!-- CHORDCRAFT Tape -->
        <div data-tape="chord" style="position:absolute; left:11px; bottom:66px; z-index:${p.z}; opacity:${p.op}; filter:${p.fx}; transition:opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)">
          <div data-flight style="transform:${p.tf}; filter:${this.flightFx}; transition:transform ${this.flightDur}ms ${this.flightEase}, filter 300ms cubic-bezier(.23,1,.32,1); will-change:transform">
            <div style="transform:rotate(-.5deg)">
              <div @click=${()=>this.pick("chord")} style="width:200px; height:35px; position:relative; border-radius:4px 4px 2px 2px; background:#262626; box-shadow:0 2px 7px rgba(42,38,33,.2); overflow:hidden; cursor:pointer; transition:transform 120ms cubic-bezier(.23,1,.32,1)">
                <div style="position:absolute; left:0; top:0; bottom:0; width:10px; background:${u.chord.strip2}"></div>
                <div style="position:absolute; left:18px; top:6px; bottom:6px; right:34px; background:#f4f1e6; border-radius:1px; display:flex; align-items:center; gap:8px; padding:0 8px">
                  <span style="font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:9px; letter-spacing:.05em; white-space:nowrap; color:#2a2621">CIRCUIT CHORDS</span>
                  <span style="font-family:'IBM Plex Mono',monospace; font-size:6px; color:rgba(42,38,33,.5); letter-spacing:.05em; white-space:nowrap">${u.chord.kicker}</span>
                </div>
                <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16)"></div>
                <div style="position:absolute; right:8px; top:11px; font-size:7px; font-style:italic; color:#aaa; font-family:Arial,sans-serif">VHS</div>
              </div>
            </div>
          </div>
        </div>

        <!-- ECHO ROOM Tape -->
        <div data-tape="echo" style="position:absolute; left:232px; bottom:0; z-index:${h.z}; opacity:${h.op}; filter:${h.fx}; transition:opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)">
          <div data-flight style="transform:${h.tf}; filter:${this.flightFx}; transition:transform ${this.flightDur}ms ${this.flightEase}, filter 300ms cubic-bezier(.23,1,.32,1); will-change:transform">
            <div style="transform:rotate(-13deg); transform-origin:bottom left">
              <div @click=${()=>this.pick("echo")} style="width:35px; height:200px; position:relative; border-radius:2px 2px 4px 4px; background:#262626; box-shadow:0 3px 10px rgba(42,38,33,.2); overflow:hidden; cursor:pointer; transition:transform 120ms cubic-bezier(.23,1,.32,1)">
                <div style="position:absolute; left:0; right:0; bottom:0; height:10px; background:${u.echo.strip}"></div>
                <div style="position:absolute; left:6px; right:6px; top:34px; bottom:18px; background:#f4f1e6; border-radius:1px; display:flex; align-items:center; justify-content:center; overflow:hidden">
                  <span style="writing-mode:vertical-rl; font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:9px; letter-spacing:.05em; white-space:nowrap; color:#2a2621">HYPERSYN</span>
                </div>
                <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16)"></div>
                <div style="position:absolute; left:0; right:0; top:12px; text-align:center; font-size:7px; font-style:italic; color:#aaa; font-family:Arial,sans-serif">VHS</div>
              </div>
            </div>
          </div>
        </div>

        <!-- SCENE BUILDER Tape -->
        <div data-tape="scene" style="position:absolute; left:267px; bottom:0; z-index:${g.z}; opacity:${g.op}; filter:${g.fx}; transition:opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)">
          <div data-flight style="transform:${g.tf}; filter:${this.flightFx}; transition:transform ${this.flightDur}ms ${this.flightEase}, filter 300ms cubic-bezier(.23,1,.32,1); will-change:transform">
            <div style="transform:rotate(-13deg); transform-origin:bottom left">
              <div @click=${()=>this.pick("scene")} style="width:35px; height:200px; position:relative; border-radius:2px 2px 4px 4px; background:#262626; box-shadow:0 3px 10px rgba(42,38,33,.2); overflow:hidden; cursor:pointer; transition:transform 120ms cubic-bezier(.23,1,.32,1)">
                <div style="position:absolute; left:0; right:0; bottom:0; height:10px; background:${u.scene.strip2}"></div>
                <div style="position:absolute; left:6px; right:6px; top:34px; bottom:18px; background:#f4f1e6; border-radius:1px; display:flex; align-items:center; justify-content:center; overflow:hidden">
                  <span style="writing-mode:vertical-rl; font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:9px; letter-spacing:.05em; white-space:nowrap; color:#2a2621">J-6 COMPANION</span>
                </div>
                <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16)"></div>
                <div style="position:absolute; left:0; right:0; top:12px; text-align:center; font-size:7px; font-style:italic; color:#aaa; font-family:Arial,sans-serif">VHS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}};k.styles=v`
    :host {
      display: block;
      position: absolute;
      left: 88px;
      bottom: 56px;
      width: 560px;
      height: 210px;
      z-index: 5;
    }
  `;D([l({type:String})],k.prototype,"activeKey",2);D([l({type:String})],k.prototype,"stage",2);D([l({type:Number})],k.prototype,"sceneOp",2);D([l({type:String})],k.prototype,"flightTransform",2);D([l({type:Number})],k.prototype,"flightDur",2);D([l({type:String})],k.prototype,"flightEase",2);D([l({type:String})],k.prototype,"flightFx",2);k=D([y("tape-shelf")],k);var ke=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,ct=(s,t,e,o)=>{for(var i=o>1?void 0:o?Se(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&ke(t,e,i),i};let U=class extends x{constructor(){super(...arguments),this.setOp=.75,this.setFx="blur(5px)",this.isPlaying=!1}onEject(s){s.stopPropagation(),this.dispatchEvent(new CustomEvent("eject-click"))}render(){const s=this.isPlaying?"auto":"none";return c`
      <div style="position:relative; width:100%; height:100%; opacity:${this.setOp}; filter:${this.setFx}; transition:opacity 320ms cubic-bezier(.23,1,.32,1), filter 320ms cubic-bezier(.23,1,.32,1)">
        <!-- Cabinet contact shadow -->
        <div style="position:absolute; left:4px; right:4px; bottom:-3px; height:6px; background:rgba(0,0,0,.45); filter:blur(3px); border-radius:50%"></div>

        <!-- Hood -->
        <div style="position:absolute; left:11px; right:11px; top:0; height:23px; background:linear-gradient(180deg,#2b2b2d,#1b1b1c); border-radius:3px 3px 0 0; clip-path:polygon(1.4% 0,98.6% 0,100% 100%,0 100%)">
          <div style="position:absolute; left:12%; top:18%; width:48%; height:8px; background:linear-gradient(90deg,rgba(255,255,255,.10),rgba(255,255,255,0))"></div>
          <div style="position:absolute; right:9px; top:6px; width:30px; height:8px; background:repeating-linear-gradient(180deg,#242426 0 2px,#101011 2px 3px)"></div>
        </div>

        <!-- Chassis Body -->
        <div style="position:absolute; left:0; right:0; top:22px; height:44px; background:linear-gradient(180deg,#141415,#0d0d0e); border-radius:2px">
          <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.14)"></div>

          <!-- HI·TECH brand -->
          <div style="position:absolute; left:22px; top:4px; font-size:3px; font-weight:700; color:#8d8d8d; letter-spacing:.04em">HI·TECH</div>
          <div style="position:absolute; left:39px; top:1px; font-size:6.5px; font-weight:400; color:#b9b4a8; font-family:Georgia,serif">4</div>

          <!-- Power / VCR·TV toggles -->
          <div style="position:absolute; left:14px; top:14px; width:20px; height:5px; background:linear-gradient(180deg,#2e2e30,#191919); border-radius:3px"><div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16); border-radius:3px"></div></div>
          <div style="position:absolute; left:14px; top:11px; font-size:2.4px; color:#9a9a9a; letter-spacing:.06em">POWER</div>
          <div style="position:absolute; left:40px; top:14px; width:20px; height:5px; background:linear-gradient(180deg,#2e2e30,#191919); border-radius:3px"><div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16); border-radius:3px"></div></div>
          <div style="position:absolute; left:40px; top:11px; font-size:2.4px; color:#9a9a9a; letter-spacing:.06em">VCR/TV</div>

          <!-- Channel rocker -->
          <div style="position:absolute; left:14px; top:26px; width:45px; height:5px; background:linear-gradient(180deg,#2e2e30,#191919); border-radius:3px"><div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.16); border-radius:3px"></div></div>
          <div style="position:absolute; left:15px; top:23px; font-size:2.4px; color:#9a9a9a; letter-spacing:.06em">▽ CHANNEL △</div>

          <!-- Cassette Slot Door -->
          <div data-slot style="position:absolute; left:67px; top:4px; right:89px; bottom:11px; background:#08080a; border-radius:2px; box-shadow:inset 0 1px 0 rgba(255,255,255,.06)">
            <div style="position:absolute; left:8px; top:4px; bottom:8px; width:1px; background:rgba(255,255,255,.10)"></div>
            <div style="position:absolute; right:8px; top:4px; bottom:8px; width:1px; background:rgba(255,255,255,.10)"></div>
            <div style="position:absolute; left:0; right:0; top:38%; display:flex; align-items:baseline; justify-content:center; gap:2.5px">
              <div style="text-align:right; line-height:1.05">
                <div style="font-size:4.7px; font-weight:700; color:#c9a06a; letter-spacing:-.01em">Omnivision</div>
                <div style="font-size:3.6px; color:#b08d5e; letter-spacing:.02em">audiovideo</div>
              </div>
              <div style="font-size:7px; font-weight:700; color:#dfd8cc; letter-spacing:-.02em">VHS</div>
            </div>
          </div>

          <!-- Status LEDs -->
          <div style="position:absolute; right:90px; bottom:3px; width:54px; display:flex; gap:3.6px; align-items:flex-end">
            <div style="text-align:center"><div style="font-size:1.7px; color:#8a8a8a; letter-spacing:.04em; white-space:nowrap">DOLBY NR</div><div style="width:1.8px; height:1.8px; border-radius:50%; background:#3a2f22; margin:1px auto 0"></div></div>
            <div style="text-align:center"><div style="font-size:1.7px; color:#8a8a8a; letter-spacing:.04em">STEREO</div><div style="width:1.8px; height:1.8px; border-radius:50%; background:#3a2f22; margin:1px auto 0"></div></div>
            <div style="text-align:center"><div style="font-size:1.7px; color:#8a8a8a; letter-spacing:.04em; white-space:nowrap">TV STEREO</div><div style="width:1.8px; height:1.8px; border-radius:50%; background:#3a2f22; margin:1px auto 0"></div></div>
            <div style="text-align:center"><div style="font-size:1.7px; color:#8a8a8a; letter-spacing:.04em; white-space:nowrap">AUDIO Ⅱ</div><div style="width:1.8px; height:1.8px; border-radius:50%; background:#3a2f22; margin:1px auto 0"></div></div>
          </div>

          <!-- Display Window Acrylic -->
          <div style="position:absolute; right:5px; top:3px; width:78px; bottom:3px; background:linear-gradient(160deg,#1a1a1e,#0b0b0d 55%); border-radius:2px; box-shadow:inset 0 0 0 1px rgba(255,255,255,.05)">
            <div style="position:absolute; left:18%; top:22%; width:38%; height:26%; background:linear-gradient(120deg,rgba(120,150,220,.16),rgba(120,150,220,0)); border-radius:50%; filter:blur(2px)"></div>
            <div style="position:absolute; right:6px; bottom:5px; font-size:1.8px; color:#7c7c7c; border:1px solid #4a4a4a; padding:.5px 1.5px; letter-spacing:.06em">◨◧ DOLBY SYSTEM</div>
          </div>
        </div>

        <!-- Lower Controls Strip -->
        <div style="position:absolute; left:0; right:0; top:66px; height:29px; background:linear-gradient(180deg,#1a1a1c,#101011); border-radius:0 0 2px 2px">
          <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.12)"></div>

          <!-- Brand -->
          <div style="position:absolute; left:13px; top:9px; font-size:6.5px; font-weight:700; color:#efece4; letter-spacing:-.02em; font-family:Helvetica,Arial,sans-serif">Omnivision</div>
          <div style="position:absolute; left:55px; top:11px; font-size:2.4px; color:#9d9d9d; letter-spacing:.08em">DIGITAL QUARTZ TUNING HQ</div>

          <!-- OSD badge -->
          <div style="position:absolute; left:99px; top:8px; text-align:center">
            <div style="font-size:4.7px; font-weight:700; color:#c9a06a; letter-spacing:-.01em">OSD</div>
            <div style="font-size:1.5px; color:#8f7a58; letter-spacing:.06em">PROGRAMMING</div>
          </div>

          <!-- MTS badge -->
          <div style="position:absolute; right:92px; top:9px; display:flex; align-items:baseline; gap:1.5px">
            <div style="font-size:4.3px; font-weight:700; color:#e6e2d9; letter-spacing:-.01em">MTS</div>
            <div style="line-height:1.05">
              <div style="font-size:2px; font-weight:700; color:#bdbab2; letter-spacing:.04em">BROADCAST</div>
              <div style="font-size:2px; color:#9d9a92; letter-spacing:.04em">STEREO</div>
            </div>
          </div>

          <!-- Transport label plate -->
          <div style="position:absolute; left:13px; top:9px; width:52px; height:8px; background:rgba(239,236,228,.75); border-radius:1px; opacity:0"></div>

          <!-- Transport buttons -->
          <div style="position:absolute; right:5px; top:5px; bottom:5px; width:80px; display:flex; gap:3px">
            <div
              @click=${this.onEject}
              style="flex:1; background:linear-gradient(180deg,#2c2c2e,#171718); border-radius:4px; pointer-events:${s}; cursor:pointer; position:relative; transition:transform 90ms cubic-bezier(.23,1,.32,1)"
            >
              <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.14); border-radius:4px"></div>
              <div style="position:absolute; left:-8px; right:-8px; top:-14px; bottom:-14px"></div>
              <div style="position:absolute; left:0; right:0; top:4px; text-align:center; font-size:2px; color:#b6b6b6; letter-spacing:.06em; line-height:1.5">■ / ▲<br>STOP<br>EJECT</div>
            </div>
            <div style="flex:1; background:linear-gradient(180deg,#2c2c2e,#171718); border-radius:4px; position:relative">
              <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.14); border-radius:4px"></div>
              <div style="position:absolute; left:0; right:0; top:6px; text-align:center; font-size:2px; color:#b6b6b6; letter-spacing:.06em; line-height:1.6">▶<br>PLAY / ×2</div>
            </div>
            <div style="flex:1; background:linear-gradient(180deg,#2c2c2e,#171718); border-radius:4px; position:relative">
              <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.14); border-radius:4px"></div>
              <div style="position:absolute; left:0; right:0; top:6px; text-align:center; font-size:2px; color:#b6b6b6; letter-spacing:.06em; line-height:1.6">● <span style="color:#c0392b">▪</span><br>REC</div>
            </div>
          </div>
        </div>
      </div>
    `}};U.styles=v`
    :host {
      display: block;
      position: absolute;
      right: 112px;
      top: 60px;
      width: 296px;
      height: 95px;
      z-index: 3;
      font-family: Arial, Helvetica, sans-serif;
      pointer-events: none;
      transition: opacity 320ms cubic-bezier(.23,1,.32,1), filter 320ms cubic-bezier(.23,1,.32,1);
    }
  `;ct([l({type:Number})],U.prototype,"setOp",2);ct([l({type:String})],U.prototype,"setFx",2);ct([l({type:Boolean})],U.prototype,"isPlaying",2);U=ct([y("vcr-player")],U);var Ae=Object.defineProperty,_e=Object.getOwnPropertyDescriptor,I=(s,t,e,o)=>{for(var i=o>1?void 0:o?_e(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&Ae(t,e,i),i};let A=class extends x{constructor(){super(...arguments),this.activeKey=null,this.isPlaying=!1,this.isReading=!1,this.isPlayWipe=!1,this.setOp=.75,this.setFx="blur(5px)"}render(){const s=this.isPlaying||this.isReading;return c`
      <div style="position:relative; width:100%; height:100%; opacity:${this.setOp}; filter:${this.setFx}; transition:opacity 320ms cubic-bezier(.23,1,.32,1), filter 320ms cubic-bezier(.23,1,.32,1)">

        <!-- Wood cabinet -->
        <div style="position:absolute; left:10px; right:10px; top:8px; height:330px; background:#8a5a33; border-radius:6px; box-shadow:0 2px 8px rgba(42,38,33,.18)">
          <div style="position:absolute; inset:0; border-radius:6px; background:repeating-linear-gradient(90deg,transparent 0 26px,rgba(0,0,0,.06) 26px 28px)"></div>
        </div>

        <!-- Silver bezel -->
        <div style="position:absolute; left:24px; right:24px; top:20px; height:306px; background:linear-gradient(180deg,#cfcdc6,#bdbbb4); border-radius:4px">

          <!-- CRT screen assembly -->
          <div style="position:absolute; left:12px; top:12px; bottom:12px; width:344px; background:#1e1e1e; border-radius:6px">
            <div style="position:absolute; inset:14px; background:#2a2a2a; border-radius:24px"></div>

            <!-- Screen glass -->
            <div
              data-screen
              style="position:absolute; left:24px; right:24px; top:22px; bottom:22px; background:radial-gradient(ellipse at 50% 42%,#c4c0d4,#aca8c0 70%,#928ea6); border-radius:38px 38px 34px 34px; overflow:hidden; pointer-events:${s?"auto":"none"}"
            >
              <!-- Active screen layer with subtle phosphor flicker -->
              <div style="position:absolute; inset:0; background:#0a0a0c; border-radius:38px 38px 34px 34px; opacity:${s?1:0}; transition:opacity 200ms linear; animation:crtPhosphorMicroFlicker 0.12s infinite alternate">
                <!-- App rendered at 800×643 emulated, scaled to fit the ~296×238px glass area -->
                <div style="position:absolute; left:0; top:0; width:800px; height:643px; transform:scale(.37); transform-origin:top left; clip-path:${this.isPlayWipe?"inset(0 0 0 0)":"inset(0 0 100% 0)"}; transition:clip-path 420ms cubic-bezier(.23,1,.32,1)">
                  <slot></slot>
                </div>
              </div>

              <!-- Scanlines -->
              <div style="position:absolute; inset:0; background:repeating-linear-gradient(180deg,rgba(0,0,0,.08) 0 1px,transparent 1px 4px); pointer-events:none; z-index:3"></div>
              <!-- Subtle RGB aperture grid & chromatic fringe -->
              <div style="position:absolute; inset:0; background:repeating-linear-gradient(90deg, rgba(234,54,175,.012) 0 1px, rgba(117,250,105,.012) 1px 2px, transparent 2px 3px); pointer-events:none; z-index:3; animation:crtPhosphorMicroFlicker 0.15s infinite alternate"></div>
              <!-- CRT vignette -->
              <div style="position:absolute; inset:0; pointer-events:none; box-shadow:inset 0 0 20px rgba(0,0,0,.35); border-radius:38px 38px 34px 34px; z-index:3"></div>

              <!-- VHS static loading -->
              <div style="position:absolute; inset:0; display:${this.isReading?"block":"none"}; opacity:${this.isReading?1:0}; transition:opacity 160ms linear; background:#0c0c10; animation:vhsFlicker 240ms steps(3) infinite">
                <div style="position:absolute; inset:-10%; background:repeating-linear-gradient(180deg,rgba(255,255,255,.10) 0 2px,rgba(0,0,0,.42) 2px 5px); animation:vhsGrain 90ms steps(2) infinite"></div>
                <div style="position:absolute; left:0; right:0; height:26%; background:linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,.22),rgba(255,255,255,0)); animation:vhsSweep 620ms linear infinite"></div>
              </div>
            </div>
          </div>

          <!-- Right control column -->
          <div style="position:absolute; right:14px; top:10px; bottom:10px; width:104px">
            <div style="position:absolute; left:18px; top:2px; width:24px; height:24px; border-radius:50%; background:#f2f0ea">
              <div style="position:absolute; inset:3px; border-radius:50%; background:#2a2a2a"></div>
              <div style="position:absolute; inset:6px; border-radius:50%; background:repeating-linear-gradient(90deg,#f2f0ea 0 2px,#2a2a2a 2px 4px)"></div>
              <div style="position:absolute; inset:6px; border-radius:50%; box-shadow:inset 0 0 0 1px #2a2a2a"></div>
            </div>
            <div style="position:absolute; left:46px; top:2px; width:24px; height:24px; border-radius:50%; background:#f2f0ea">
              <div style="position:absolute; inset:3px; border-radius:50%; background:#3fa89a"></div>
              <div style="position:absolute; inset:6px; border-radius:50%; background:conic-gradient(#f2f0ea 0 18deg,#3fa89a 18deg 60deg,#f2f0ea 60deg 78deg,#3fa89a 78deg 120deg,#f2f0ea 120deg 138deg,#3fa89a 138deg 180deg,#f2f0ea 180deg 198deg,#3fa89a 198deg 240deg,#f2f0ea 240deg 258deg,#3fa89a 258deg 300deg,#f2f0ea 300deg 318deg,#3fa89a 318deg 360deg)"></div>
            </div>
            <div style="position:absolute; left:14px; top:28px; width:66px; font-size:4.5px; font-weight:800; letter-spacing:0; color:#f2f0ea; text-align:center; background:#2a2a2a; padding:1px 3px; box-sizing:border-box; white-space:nowrap">DEEP IMAGE COLOUR</div>
            <div style="position:absolute; left:10px; top:42px; width:14px; height:96px; background:#2c2c2c; border-radius:2px">
              <div style="position:absolute; left:4px; top:38px; width:6px; height:10px; background:#c9c7c0"></div>
            </div>
            <div style="position:absolute; left:30px; top:42px; width:34px; height:96px; display:flex; flex-direction:column; gap:4px">
              <div style="height:8px; background:#2c2c2c; border-radius:1px; position:relative"><div style="position:absolute; width:10px; height:6px; background:#c0392b; margin:1px 0 0 20px"></div></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
              <div style="height:8px; background:#2c2c2c; border-radius:1px"></div>
            </div>
            <div style="position:absolute; left:10px; top:144px; font-size:5px; color:#555">VOL &nbsp;·&nbsp; CH</div>
            <div style="position:absolute; left:10px; top:156px; display:flex; gap:5px">
              <div style="width:16px; height:10px; background:#2c2c2c; border-radius:1px"></div>
              <div style="width:16px; height:10px; background:#2c2c2c; border-radius:1px"></div>
              <div style="width:16px; height:10px; background:#2c2c2c; border-radius:1px"></div>
            </div>
            <div style="position:absolute; left:10px; right:6px; top:176px; bottom:4px; background:repeating-linear-gradient(90deg,#a9a7a0 0 3px,#8f8d86 3px 6px); border-radius:2px"></div>
          </div>
          <div style="position:absolute; left:14px; bottom:2px; font-size:6px; color:#666; letter-spacing:.06em">◉ ⌾ ▸</div>
        </div>

        <!-- Cabinet bottom lip -->
        <div style="position:absolute; left:10px; right:10px; top:338px; height:14px; background:#6e4626; border-radius:0 0 4px 4px"></div>

        <!-- Legs -->
        <div style="position:absolute; left:52px; top:352px; width:38px; height:100px">
          <div style="position:absolute; top:0; left:0; right:0; height:22px; background:#7c4e2a"></div>
          <div style="position:absolute; top:22px; left:4px; right:4px; bottom:0; background:#8a5a33; clip-path:polygon(0 0,100% 0,82% 100%,18% 100%)"></div>
        </div>
        <div style="position:absolute; left:150px; top:352px; width:30px; height:84px; opacity:.85">
          <div style="position:absolute; top:0; left:0; right:0; height:18px; background:#6e4626"></div>
          <div style="position:absolute; top:18px; left:3px; right:3px; bottom:0; background:#7c4e2a; clip-path:polygon(0 0,100% 0,82% 100%,18% 100%)"></div>
        </div>
        <div style="position:absolute; right:150px; top:352px; width:30px; height:84px; opacity:.85">
          <div style="position:absolute; top:0; left:0; right:0; height:18px; background:#6e4626"></div>
          <div style="position:absolute; top:18px; left:3px; right:3px; bottom:0; background:#7c4e2a; clip-path:polygon(0 0,100% 0,82% 100%,18% 100%)"></div>
        </div>
        <div style="position:absolute; right:52px; top:352px; width:38px; height:100px">
          <div style="position:absolute; top:0; left:0; right:0; height:22px; background:#7c4e2a"></div>
          <div style="position:absolute; top:22px; left:4px; right:4px; bottom:0; background:#8a5a33; clip-path:polygon(0 0,100% 0,82% 100%,18% 100%)"></div>
        </div>
      </div>
    `}};A.styles=v`
    :host {
      display: block;
      position: absolute;
      right: 60px;
      top: 148px;
      width: 540px;
      height: 470px;
      transform: scale(.92);
      transform-origin: top right;
      z-index: 2;
      font-family: Arial, Helvetica, sans-serif;
      pointer-events: none;
      transition: opacity 320ms cubic-bezier(.23,1,.32,1), filter 320ms cubic-bezier(.23,1,.32,1);
    }

    @keyframes vhsSweep {
      0% { transform: translateY(-120%); }
      100% { transform: translateY(120%); }
    }
    @keyframes vhsFlicker {
      0%, 100% { filter: brightness(.86); }
      40% { filter: brightness(1.08); }
      70% { filter: brightness(.96); }
    }
    @keyframes vhsGrain {
      0% { transform: translate(0, 0); }
      50% { transform: translate(-2px, 1px); }
      100% { transform: translate(1px, -1px); }
    }
    @keyframes crtPhosphorMicroFlicker {
      0% { opacity: 0.993; }
      25% { opacity: 1; }
      50% { opacity: 0.989; }
      75% { opacity: 0.997; }
      100% { opacity: 1; }
    }
  `;I([l({type:String})],A.prototype,"activeKey",2);I([l({type:Boolean})],A.prototype,"isPlaying",2);I([l({type:Boolean})],A.prototype,"isReading",2);I([l({type:Boolean})],A.prototype,"isPlayWipe",2);I([l({type:Number})],A.prototype,"setOp",2);I([l({type:String})],A.prototype,"setFx",2);A=I([y("crt-display")],A);var Oe=Object.defineProperty,Pe=Object.getOwnPropertyDescriptor,O=(s,t,e,o)=>{for(var i=o>1?void 0:o?Pe(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&Oe(t,e,i),i};let w=class extends x{constructor(){super(...arguments),this.activeKey=null,this.currentShot="none",this.showFlash=!1,this.shotADur=1300,this.shotBDur=1250,this.flashDur=130,this.isPaused=!1,this.scrubVal=0}onSkip(){this.dispatchEvent(new CustomEvent("skip-cutscene"))}render(){const s=this.activeKey?u[this.activeKey]:u.echo,t=this.isPaused?"paused":"running",e=this.currentShot==="Be"?Math.round(this.shotBDur*.72):this.shotBDur,o=this.currentShot==="A"?this.shotADur:e,i=this.isPaused?"-"+Math.round(this.scrubVal/1e3*o)+"ms":"0ms",a=this.currentShot==="A"?"shotASlide":"none",r=this.currentShot==="A"?"shotAPush":"none",n=this.currentShot==="B"?"shotBInsert":this.currentShot==="Be"?"shotBEject":"none",p=this.showFlash?"cutFlash":"none";return c`
      <!-- Flash Static Transition Layer -->
      <div 
        style="position:absolute; inset:0; z-index:95; display:${this.showFlash?"block":"none"}; pointer-events:none; background:#d8d4c8; animation-name:${p}; animation-duration:${this.flashDur}ms; animation-timing-function:linear; animation-fill-mode:both"
      >
        <div style="position:absolute; inset:0; background:repeating-linear-gradient(180deg,rgba(255,255,255,.85) 0 3px,rgba(20,20,22,.65) 3px 7px)"></div>
      </div>

      <!-- SHOT A: Macro Sleeve Slide-Out Cut -->
      <div 
        style="position:absolute; inset:0; z-index:90; display:${this.currentShot==="A"?"block":"none"}; font-family:Arial,Helvetica,sans-serif"
        @click=${this.onSkip}
      >
        <div style="position:absolute; left:-4000px; right:-4000px; top:-4000px; bottom:-4000px; background:#efeadf;">
          <div style="position:absolute; inset:0; background:radial-gradient(550px 350px at calc(4000px + 462px) calc(4000px + 308px), rgba(255,255,255,.62), rgba(42,38,33,.18))"></div>
        </div>

        <div style="position:absolute; left:150px; top:96px; width:700px; height:500px; transform-origin:26% 50%; animation-name:${r}; animation-duration:${this.shotADur}ms; animation-timing-function:cubic-bezier(.32,.72,0,1); animation-fill-mode:both; animation-delay:${i}; animation-play-state:${t}">
          <div style="position:absolute; left:20px; top:30px; width:420px; height:470px; background:rgba(42,38,33,.2); filter:blur(26px); border-radius:14px"></div>

          <!-- Sliding Tape Wrapper -->
          <div style="position:absolute; left:34px; top:8px; width:258px; height:480px; animation-name:${a}; animation-duration:${this.shotADur}ms; animation-timing-function:cubic-bezier(.32,.72,0,1); animation-fill-mode:both; animation-delay:${i}; animation-play-state:${t}">
            <div style="position:absolute; left:50%; top:50%; width:330px; height:178px; transform:translate(-50%,-50%) rotate(90deg) scale(1.45); box-shadow:0 22px 34px rgba(42,38,33,.3)">
              <div style="width:330px; height:178px; position:relative; border-radius:9px; background:#262626; box-shadow:0 2px 6px rgba(0,0,0,.15); overflow:hidden; font-family:Arial,Helvetica,sans-serif">
                <div style="position:absolute; top:0; left:0; right:0; height:24px; background:#1a1a1a; border-bottom:2px solid #333; display:flex; align-items:center; justify-content:center">
                  <span style="font-size:10px; font-weight:800; color:#e8e8e8; letter-spacing:.12em">VHS</span>
                </div>
                <div style="position:absolute; left:28px; top:48px; width:76px; height:76px; border-radius:50%; background:#d9d9d9">
                  <div style="position:absolute; inset:14px; border-radius:50%; background:#a8a8a8"></div>
                  <div style="position:absolute; inset:22px; border-radius:50%; background:conic-gradient(#8e8e8e 0 20deg,#a8a8a8 20deg 60deg,#8e8e8e 60deg 80deg,#a8a8a8 80deg 120deg,#8e8e8e 120deg 140deg,#a8a8a8 140deg 180deg,#8e8e8e 180deg 200deg,#a8a8a8 200deg 240deg,#8e8e8e 240deg 260deg,#a8a8a8 260deg 300deg,#8e8e8e 300deg 320deg,#a8a8a8 320deg 360deg)"></div>
                  <div style="position:absolute; inset:30px; border-radius:50%; background:#c4c4c4"></div>
                </div>
                <div style="position:absolute; right:28px; top:48px; width:76px; height:76px; border-radius:50%; background:#d9d9d9">
                  <div style="position:absolute; inset:14px; border-radius:50%; background:#a8a8a8"></div>
                  <div style="position:absolute; inset:22px; border-radius:50%; background:conic-gradient(#8e8e8e 0 20deg,#a8a8a8 20deg 60deg,#8e8e8e 60deg 80deg,#a8a8a8 80deg 120deg,#8e8e8e 120deg 140deg,#a8a8a8 140deg 180deg,#8e8e8e 180deg 200deg,#a8a8a8 200deg 240deg,#8e8e8e 240deg 260deg,#a8a8a8 260deg 300deg,#8e8e8e 300deg 320deg,#a8a8a8 320deg 360deg)"></div>
                  <div style="position:absolute; inset:30px; border-radius:50%; background:#c4c4c4"></div>
                </div>
                <div style="position:absolute; left:118px; top:44px; width:94px; height:84px; background:#f4f4f4; border-radius:2px">
                  <div style="position:absolute; top:0; left:0; right:0; height:20px; background:${s.strip}"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:10px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:18px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:26px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:34px; height:1px; background:#c9c9c9"></div>
                </div>
                <div style="position:absolute; inset:0; background:repeating-linear-gradient(0deg,transparent 0 3px,rgba(255,255,255,.015) 3px 4px); pointer-events:none"></div>
              </div>
            </div>
          </div>

          <!-- Outer Sleeve Box -->
          <div style="position:absolute; left:0; top:0; width:326px; height:496px">
            <div style="position:absolute; left:14px; top:14px; width:326px; height:496px; background:#8d8474; border-radius:8px 8px 0 0"></div>
            <div style="position:absolute; left:0; top:0; width:96px; height:146px; transform:scale(3.4); transform-origin:top left; box-shadow:0 20px 32px rgba(42,38,33,.26)">
              <div style="width:96px; height:146px; position:relative; border-radius:6px 6px 0 0; background:${s.bg}; box-shadow:0 2px 6px rgba(0,0,0,.15); overflow:hidden">
                <div style="position:absolute; top:0; bottom:0; right:0; width:11px; background:#181818; border-left:1px solid rgba(255,255,255,.22); z-index:6">
                  <div style="position:absolute; top:10px; bottom:10px; left:3px; width:2px; background:rgba(255,255,255,.14)"></div>
                </div>
                <div style="position:absolute; right:0; bottom:0; width:28px; height:38px; background:#181818; clip-path:polygon(100% 0,100% 100%,0 100%); z-index:6"></div>
                <div style="position:absolute; left:0; right:14px; top:38px; height:60px; background:linear-gradient(180deg,#e53935 0 16.6%,#fb8c00 16.6% 33.3%,#fdd835 33.3% 50%,#8bc34a 50% 66.6%,#43a047 66.6% 83.3%,#1e88e5 83.3% 100%)"></div>
                <div style="position:absolute; left:8px; top:10px; font-weight:800; font-size:11px; color:#fff">VIDEO<span style="color:#e53935">◄</span></div>
                <div style="position:absolute; left:8px; bottom:22px; font-size:10px; color:#fff; font-weight:700">T-120</div>
                <div style="position:absolute; left:6px; bottom:6px; font-size:6px; color:#cdd; font-style:italic">VHS</div>
              </div>
            </div>
            <div style="position:absolute; right:0; top:0; bottom:0; width:26px; background:linear-gradient(270deg,rgba(0,0,0,.5),rgba(0,0,0,0))"></div>
          </div>
        </div>

        <div style="position:absolute; right:56px; bottom:48px; width:300px; text-align:right; font-family:'IBM Plex Mono',monospace; color:#2a2621">
          <div style="font-size:11px; letter-spacing:.14em; color:rgba(42,38,33,.6)">LOADING</div>
          <div style="margin-top:10px; font-size:20px; font-weight:600; letter-spacing:.02em">${s.title}</div>
          <div style="margin-top:7px; font-size:11px; letter-spacing:.14em; color:rgba(42,38,33,.55)">${s.kicker}</div>
          <div style="margin-top:22px; font-size:12px; letter-spacing:.12em; color:rgba(42,38,33,.62)">CLICK TO SKIP</div>
        </div>
      </div>

      <!-- SHOT B: Extreme Close-Up Deck Insertion & Eject -->
      <div 
        style="position:absolute; inset:0; z-index:91; display:${this.currentShot==="B"||this.currentShot==="Be"?"block":"none"}; background:#6f5a3f; font-family:Arial,Helvetica,sans-serif"
        @click=${this.onSkip}
      >
        <!-- Background Extensions for Wide Screens -->
        <div style="position:absolute; left:-4000px; right:-4000px; top:0; height:474px; z-index:0; background:linear-gradient(180deg,#08080a,#131316)"></div>
        <div style="position:absolute; left:0; right:0; top:472px; bottom:0; z-index:1; perspective:820px; perspective-origin:50% -60%">
          <div style="position:absolute; left:-3940px; right:-3940px; top:0; height:1200px; transform:rotateX(76deg); transform-origin:top center; background:linear-gradient(180deg,#c9ab84,#8a6d46)">
            <div style="position:absolute; inset:0; background:repeating-linear-gradient(90deg,rgba(90,62,34,.1) 0 3px,transparent 3px 70px)"></div>
          </div>
        </div>
        <div style="position:absolute; left:-4000px; right:-4000px; top:206px; height:230px; z-index:0; background:linear-gradient(180deg,#141417,#0d0d0f)"></div>
        <div style="position:absolute; left:-4000px; right:-4000px; top:350px; height:86px; z-index:0; background:linear-gradient(180deg,#1c1c1f,#101012)"><div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.055)"></div></div>
        <div style="position:absolute; left:-4000px; right:-4000px; top:436px; height:30px; z-index:0; background:linear-gradient(180deg,#efe9dc 0 72%,#c7c0b0 72%); box-shadow:0 16px 26px rgba(20,14,6,.55)"></div>
        <div style="position:absolute; left:-4000px; right:-4000px; top:0; height:24px; z-index:0; background:#08080a"></div>
        <div style="position:absolute; left:-4000px; right:-4000px; top:22px; height:186px; z-index:0; background:linear-gradient(180deg,#212125 0 34%,#16161a 34%,#131316); border-bottom:2px solid #34343a; box-shadow:0 8px 18px rgba(0,0,0,.6)"><div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.09)"></div></div>

        <!-- Original centered content -->
        <div style="position:absolute; left:0; right:0; top:0; height:474px; z-index:1; background:linear-gradient(180deg,#08080a,#131316)"></div>

        <div style="position:absolute; left:-30px; right:-30px; top:206px; height:230px; z-index:2; background:linear-gradient(180deg,#141417,#0d0d0f)"></div>
        <div style="position:absolute; left:-30px; right:-30px; top:350px; height:86px; z-index:2; background:linear-gradient(180deg,#1c1c1f,#101012)">
          <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.055)"></div>
          <div style="position:absolute; left:64px; top:34px; width:196px; height:12px; background:rgba(239,236,228,.62); border-radius:2px"></div>
          <div style="position:absolute; right:56px; top:18px; width:250px; height:50px; display:flex; gap:12px">
            <div style="flex:1; background:linear-gradient(180deg,#333336,#26262a); border-radius:6px; position:relative">
              <div style="position:absolute; left:0; right:0; top:12px; text-align:center; font-size:11px; color:#b6b6b6; letter-spacing:.1em; line-height:1.5">EJECT</div>
            </div>
            <div style="flex:1; background:linear-gradient(180deg,#2f2f33,#232327); border-radius:6px"></div>
            <div style="flex:1; background:linear-gradient(180deg,#2f2f33,#232327); border-radius:6px"></div>
          </div>
        </div>
        <div style="position:absolute; left:-30px; right:-30px; top:436px; height:30px; z-index:2; background:linear-gradient(180deg,#efe9dc 0 72%,#c7c0b0 72%); box-shadow:0 16px 26px rgba(20,14,6,.55)">
          <div style="position:absolute; left:76px; top:11px; width:340px; height:4px; background:rgba(60,55,45,.3)"></div>
          <div style="position:absolute; left:76px; top:19px; width:250px; height:4px; background:rgba(60,55,45,.18)"></div>
        </div>

        <div style="position:absolute; left:182px; right:182px; top:204px; height:108px; z-index:3; background:linear-gradient(180deg,#000 0 34%,#08080c); box-shadow:inset 0 14px 22px rgba(0,0,0,.9),inset 0 -2px 0 rgba(255,255,255,.045)"></div>

        <div style="position:absolute; left:0; right:0; top:0; bottom:0; z-index:5; pointer-events:none">
          <div style="position:absolute; left:243px; top:206px; width:620px; height:343px; transform-origin:50% 0%; transform-style:preserve-3d; animation-name:${n}; animation-duration:${e}ms; animation-timing-function:linear; animation-fill-mode:both; animation-delay:${i}; animation-play-state:${t}">
            <div style="position:absolute; left:-30px; right:-30px; top:300px; height:90px; background:rgba(0,0,0,.55); filter:blur(24px); border-radius:50%"></div>
            
            <div style="position:absolute; left:0; top:0; width:330px; height:178px; transform:scale(1.879,1.927); transform-origin:top left">
              <div style="width:330px; height:178px; position:relative; border-radius:9px; background:#262626; overflow:hidden; font-family:Arial,Helvetica,sans-serif">
                <div style="position:absolute; top:0; left:0; right:0; height:24px; background:#1a1a1a; border-bottom:2px solid #333; display:flex; align-items:center; justify-content:center">
                  <span style="font-size:10px; font-weight:800; color:#e8e8e8; letter-spacing:.12em">VHS</span>
                </div>
                <div style="position:absolute; left:28px; top:48px; width:76px; height:76px; border-radius:50%; background:#d9d9d9">
                  <div style="position:absolute; inset:14px; border-radius:50%; background:#a8a8a8"></div>
                  <div style="position:absolute; inset:22px; border-radius:50%; background:conic-gradient(#8e8e8e 0 20deg,#a8a8a8 20deg 60deg,#8e8e8e 60deg 80deg,#a8a8a8 80deg 120deg,#8e8e8e 120deg 140deg,#a8a8a8 140deg 180deg,#8e8e8e 180deg 200deg,#a8a8a8 200deg 240deg,#8e8e8e 240deg 260deg,#a8a8a8 260deg 300deg,#8e8e8e 300deg 320deg,#a8a8a8 320deg 360deg)"></div>
                  <div style="position:absolute; inset:30px; border-radius:50%; background:#c4c4c4"></div>
                </div>
                <div style="position:absolute; right:28px; top:48px; width:76px; height:76px; border-radius:50%; background:#d9d9d9">
                  <div style="position:absolute; inset:14px; border-radius:50%; background:#a8a8a8"></div>
                  <div style="position:absolute; inset:22px; border-radius:50%; background:conic-gradient(#8e8e8e 0 20deg,#a8a8a8 20deg 60deg,#8e8e8e 60deg 80deg,#a8a8a8 80deg 120deg,#8e8e8e 120deg 140deg,#a8a8a8 140deg 180deg,#8e8e8e 180deg 200deg,#a8a8a8 200deg 240deg,#8e8e8e 240deg 260deg,#a8a8a8 260deg 300deg,#8e8e8e 300deg 320deg,#a8a8a8 320deg 360deg)"></div>
                  <div style="position:absolute; inset:30px; border-radius:50%; background:#c4c4c4"></div>
                </div>
                <div style="position:absolute; left:118px; top:44px; width:94px; height:84px; background:#f4f4f4; border-radius:2px">
                  <div style="position:absolute; top:0; left:0; right:0; height:20px; background:${s.strip}"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:10px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:18px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:26px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:34px; height:1px; background:#c9c9c9"></div>
                </div>
                <div style="position:absolute; inset:0; background:repeating-linear-gradient(0deg,transparent 0 3px,rgba(255,255,255,.015) 3px 4px); pointer-events:none"></div>
              </div>
            </div>

            <div style="position:absolute; left:0; top:343px; width:620px; height:82px; transform-origin:50% 0%; transform:rotateX(72deg); background:linear-gradient(180deg,#242427 0 4px,#18181b 4px 46%,#101012 46%,#0a0a0b); border-radius:0 0 7px 7px; box-shadow:0 20px 26px rgba(0,0,0,.5)">
              <div style="position:absolute; left:0; right:0; top:4px; height:1px; background:rgba(255,255,255,.08)"></div>
              <div style="position:absolute; left:96px; right:96px; top:22px; bottom:14px; background:linear-gradient(160deg,#2b2b2f,#101013 60%); border-radius:2px; box-shadow:inset 0 1px 3px rgba(0,0,0,.7)"></div>
              <div style="position:absolute; left:24px; top:26px; width:56px; height:34px; background:rgba(226,222,210,.82); border-radius:1px"></div>
              <div style="position:absolute; right:26px; top:30px; width:34px; height:26px; background:#191919; border-radius:1px"></div>
            </div>
          </div>
        </div>

        <div style="position:absolute; left:0; right:0; top:0; height:24px; z-index:7; background:#08080a"></div>
        <div style="position:absolute; left:-30px; right:-30px; top:22px; height:186px; z-index:8; background:linear-gradient(180deg,#212125 0 34%,#16161a 34%,#131316); border-bottom:2px solid #34343a; box-shadow:0 8px 18px rgba(0,0,0,.6)">
          <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.09)"></div>
          <div style="position:absolute; left:70px; top:16px; width:150px; height:26px; background:repeating-linear-gradient(180deg,#26262a 0 5px,#101012 5px 8px); border-radius:2px"></div>
          <div style="position:absolute; right:80px; top:16px; width:150px; height:26px; background:repeating-linear-gradient(180deg,#26262a 0 5px,#101012 5px 8px); border-radius:2px"></div>
          <div style="position:absolute; left:74px; top:96px; width:112px; height:14px; background:rgba(239,236,228,.7); border-radius:2px"></div>
          <div style="position:absolute; right:74px; top:82px; width:250px; height:64px; background:linear-gradient(160deg,#101014,#06060a 60%); border-radius:3px; box-shadow:inset 0 2px 6px rgba(0,0,0,.8)"></div>
        </div>

        <div style="position:absolute; right:110px; top:378px; z-index:9; display:flex; gap:30px">
          <div style="width:15px; height:15px; border-radius:50%; background:#c9a06a; animation-name:ledBlink; animation-duration:${e}ms; animation-timing-function:linear; animation-fill-mode:both; animation-play-state:${t}; animation-delay:140ms"></div>
          <div style="width:15px; height:15px; border-radius:50%; background:#7fb37a; animation-name:ledBlink; animation-duration:${e}ms; animation-timing-function:linear; animation-fill-mode:both; animation-play-state:${t}; animation-delay:${i}"></div>
        </div>
        <div style="position:absolute; left:-4000px; right:-4000px; bottom:0; height:20%; z-index:10; pointer-events:none; background:linear-gradient(180deg,rgba(30,20,10,0),rgba(30,20,10,.5))"></div>
      </div>
    `}};w.styles=v`
    :host {
      display: block;
    }

    @keyframes vhsSweep {
      0% { transform: translateY(-120%); }
      100% { transform: translateY(120%); }
    }

    @keyframes vhsFlicker {
      0%, 100% { filter: brightness(.86); }
      40% { filter: brightness(1.08); }
      70% { filter: brightness(.96); }
    }

    @keyframes vhsGrain {
      0% { transform: translate(0, 0); }
      50% { transform: translate(-2px, 1px); }
      100% { transform: translate(1px, -1px); }
    }

    @keyframes shotASlide {
      0% { transform: translateX(0); }
      12% { transform: translateX(6px); }
      46% { transform: translateX(140px); }
      88% { transform: translateX(312px); }
      100% { transform: translateX(296px); }
    }

    @keyframes shotAPush {
      0% { transform: perspective(1800px) rotate(-4deg) rotateX(6deg) scale(.97); }
      100% { transform: perspective(1800px) rotate(-4deg) rotateX(2deg) scale(1.01); }
    }

    @keyframes shotBInsert {
      0% { transform: rotateX(-72deg) translate3d(0,268px,0); }
      22% { transform: rotateX(-72deg) translate3d(0,150px,0); }
      48% { transform: rotateX(-72deg) translate3d(0,20px,0); }
      76% { transform: rotateX(-72deg) translate3d(0,-300px,0); }
      90% { transform: rotateX(-72deg) translate3d(0,-610px,0); }
      95% { transform: rotateX(-72deg) translate3d(0,-566px,0); }
      100% { transform: rotateX(-72deg) translate3d(0,-650px,0); }
    }

    @keyframes shotBEject {
      0% { transform: rotateX(-72deg) translate3d(0,-650px,0); }
      14% { transform: rotateX(-72deg) translate3d(0,-210px,0); }
      26% { transform: rotateX(-72deg) translate3d(0,-280px,0); }
      70% { transform: rotateX(-72deg) translate3d(0,160px,0); }
      100% { transform: rotateX(-72deg) translate3d(0,268px,0); }
    }

    @keyframes doorGive {
      0%, 48% { transform: scaleY(1) translateY(0); }
      68% { transform: scaleY(.5) translateY(-2px); }
      100% { transform: scaleY(.78) translateY(-1px); }
    }

    @keyframes ledBlink {
      0%, 44% { opacity: .25; }
      50% { opacity: 1; }
      64% { opacity: .35; }
      72% { opacity: 1; }
      100% { opacity: .8; }
    }

    @keyframes cutFlash {
      0% { opacity: 1; }
      70% { opacity: .55; }
      100% { opacity: 0; }
    }
  `;O([l({type:String})],w.prototype,"activeKey",2);O([l({type:String})],w.prototype,"currentShot",2);O([l({type:Boolean})],w.prototype,"showFlash",2);O([l({type:Number})],w.prototype,"shotADur",2);O([l({type:Number})],w.prototype,"shotBDur",2);O([l({type:Number})],w.prototype,"flashDur",2);O([l({type:Boolean})],w.prototype,"isPaused",2);O([l({type:Number})],w.prototype,"scrubVal",2);w=O([y("cutscene-overlay")],w);var Ee=Object.defineProperty,Ce=Object.getOwnPropertyDescriptor,Ut=(s,t,e,o)=>{for(var i=o>1?void 0:o?Ce(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&Ee(t,e,i),i};const Te="https://warmsynths.github.io/beat-mapper/app.js";let st=class extends x{constructor(){super(...arguments),this.loaded=customElements.get("app-root")!==void 0}async connectedCallback(){if(super.connectedCallback(),!this.loaded)try{await import(Te),this.loaded=!0}catch(s){console.error("Failed to load Beat Mapper component script:",s)}}render(){return this.loaded?c`<app-root style="display:block; width:100%; height:100%;"></app-root>`:c`<div style="padding:20px; color:#888; text-align:center; font-family:monospace; font-size:11px;">LOADING BEAT MAPPER...</div>`}};st.styles=v`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `;Ut([H()],st.prototype,"loaded",2);st=Ut([y("beat-mapper-embed")],st);var De=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,Vt=(s,t,e,o)=>{for(var i=o>1?void 0:o?ze(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&De(t,e,i),i};const Me="https://warmsynths.github.io/chroma-chords/app.js";let ot=class extends x{constructor(){super(...arguments),this.loaded=customElements.get("chroma-chords-app")!==void 0}async connectedCallback(){if(super.connectedCallback(),!this.loaded)try{await import(Me),this.loaded=!0}catch(s){console.error("Failed to load Chroma Chords component script:",s)}}render(){return this.loaded?c`<chroma-chords-app style="display:block; width:100%; height:100%;"></chroma-chords-app>`:c`<div style="padding:20px; color:#888; text-align:center; font-family:monospace; font-size:11px;">LOADING CHROMA CHORDS...</div>`}};ot.styles=v`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `;Vt([H()],ot.prototype,"loaded",2);ot=Vt([y("chroma-chords-embed")],ot);var Re=Object.defineProperty,Be=Object.getOwnPropertyDescriptor,qt=(s,t,e,o)=>{for(var i=o>1?void 0:o?Be(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&Re(t,e,i),i};const He="https://warmsynths.github.io/circuit-chords/app.js";let at=class extends x{constructor(){super(...arguments),this.loaded=customElements.get("circuit-chord-forge")!==void 0}async connectedCallback(){if(super.connectedCallback(),!this.loaded)try{await import(He),this.loaded=!0}catch(s){console.error("Failed to load Circuit Chords component script:",s)}}render(){return this.loaded?c`<circuit-chord-forge style="display:block; width:100%; height:100%;"></circuit-chord-forge>`:c`<div style="padding:20px; color:#888; text-align:center; font-family:monospace; font-size:11px;">LOADING CIRCUIT CHORDS...</div>`}};at.styles=v`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `;qt([H()],at.prototype,"loaded",2);at=qt([y("circuit-chords-embed")],at);var Ie=Object.getOwnPropertyDescriptor,je=(s,t,e,o)=>{for(var i=o>1?void 0:o?Ie(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=r(i)||i);return i};let ft=class extends x{render(){return c`<iframe src="/hypersyn-chord-helper/index.html"></iframe>`}};ft.styles=v`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #000;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }
  `;ft=je([y("hypersyn-embed")],ft);var Ne=Object.defineProperty,Fe=Object.getOwnPropertyDescriptor,Kt=(s,t,e,o)=>{for(var i=o>1?void 0:o?Fe(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&Ne(t,e,i),i};const Le="https://warmsynths.github.io/j6-companion/app.js";let rt=class extends x{constructor(){super(...arguments),this.loaded=customElements.get("j6-app")!==void 0}async connectedCallback(){if(super.connectedCallback(),!this.loaded)try{await import(Le),this.loaded=!0}catch(s){console.error("Failed to load J-6 Companion component script:",s)}}render(){return this.loaded?c`<j6-app style="display:block; width:100%; height:100%;"></j6-app>`:c`<div style="padding:20px; color:#888; text-align:center; font-family:monospace; font-size:11px;">LOADING J-6 COMPANION...</div>`}};rt.styles=v`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `;Kt([H()],rt.prototype,"loaded",2);rt=Kt([y("j6-companion-embed")],rt);var Ue=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,Gt=(s,t,e,o)=>{for(var i=o>1?void 0:o?Ve(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&Ue(t,e,i),i};let nt=class extends x{constructor(){super(...arguments),this.activeKey=null}render(){switch(this.activeKey){case"drift":return c`<beat-mapper-embed></beat-mapper-embed>`;case"pixel":return c`<chroma-chords-embed></chroma-chords-embed>`;case"chord":return c`<circuit-chords-embed></circuit-chords-embed>`;case"echo":return c`<hypersyn-embed></hypersyn-embed>`;case"scene":return c`<j6-companion-embed></j6-companion-embed>`;default:return c``}}};nt.styles=v`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background: #14141a;
    }
  `;Gt([l({type:String})],nt.prototype,"activeKey",2);nt=Gt([y("tape-app-slot")],nt);var qe=Object.defineProperty,Ke=Object.getOwnPropertyDescriptor,j=(s,t,e,o)=>{for(var i=o>1?void 0:o?Ke(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&qe(t,e,i),i};let _=class extends x{constructor(){super(...arguments),this.activeKey=null,this.stageState="idle",this.currentShot="none",this.flightTransform="none",this.stageScale=1,this._f=null}zoom(){const s=this.shadowRoot?.querySelector(".main-card");return(s?s.getBoundingClientRect().width/1100:1)*(this.director.camOn?this.director.camScale:1)}flip(s){const t=u[s],e=this.shadowRoot?.querySelector("tape-shelf"),o=this.shadowRoot?.querySelector("vcr-player"),i=e?.shadowRoot?.querySelector(`[data-tape="${s}"] [data-flight]`),a=o?.shadowRoot?.querySelector("[data-slot]");if(!i||!a)return this._f=null,"none";const r=this.zoom(),n=i.getBoundingClientRect(),p=a.getBoundingClientRect(),h=(p.left+p.width/2-n.left-n.width/2)/r,g=(p.top+p.height/2-n.top-n.height/2)/r,d=i.offsetWidth,b=i.offsetHeight,m=-t.rest+(t.onEnd?-90:0),P=t.onEnd?b:d,gt=t.onEnd?d:b,ut=Math.min(p.width/r/P,p.height/r/gt);return this._f={dx:h,dy:g,deg:m,s:ut},this.tf(1)}tf(s,t){const e=this._f;if(!e)return"none";const o=-14-96*Math.sin(Math.PI*s)*(s<1?1:0),i=e.dx*s,a=e.dy*s+o*(s<1?1:0),r=e.deg*(s<.6?s/.6:1)*(s===0?0:1),n=s===0?1.04:1.04+(e.s-1.04)*Math.pow(s,1.6);return`translate(${i.toFixed(1)}px,${a.toFixed(1)}px) rotate(${r.toFixed(2)}deg) scale(${n.toFixed(3)}) ${t||""}`}screenOrigin(){const s=this.shadowRoot?.querySelector(".main-card"),e=this.shadowRoot?.querySelector("crt-display")?.shadowRoot?.querySelector("[data-screen]");if(!s||!e)return"735px 307px";const o=this.zoom(),i=s.getBoundingClientRect(),a=e.getBoundingClientRect();return`${((a.left+a.width/2-i.left)/o).toFixed(0)}px ${((a.top+a.height/2-i.top)/o).toFixed(0)}px`}pick(s){this.director.pick(s,this.flip(s),this.screenOrigin(),!1)}eject(){this.director.eject(!1)}render(){const s=this.director,t=s.activeKey,e=s.stageState,o=e!=="idle"&&e!=="home",i=e==="play"||e==="playWipe",a=e==="read",r=i||a||e==="ejectCollapse",n=t?u[t]:null;return c`
      <div class="desktop-wrap">
      <div class="main-card" style="transform: translate(-50%, -50%) scale(${this.stageScale})">
        <div
          class="camera-stage"
          style="transform: ${s.camOn?`scale(${s.camScale})`:"none"}; transform-origin: ${s.camOrigin}; transition: transform ${s.camDur}ms cubic-bezier(.32,.72,0,1)"
        >
          <!-- Background Scene -->
          <div 
            class="scene-bg" 
            @click=${()=>{s.currentShot!=="none"?s.skip():i?this.eject():e!=="idle"&&s.cancel()}}
            style="position:absolute; inset:0; z-index:1; opacity: ${o?i?.18:.35:1}; filter: ${o?i?"blur(6px)":"blur(3px)":"blur(0px)"}; transition: opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)"
          >
            <div style="position:absolute; left:-4000px; right:-4000px; top:0; height:452px; background:#ece6da; filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; left:0; right:0; top:452px; bottom:0; filter:blur(6px); opacity:.72; perspective:820px; perspective-origin:50% -60%">
              <div style="position:absolute; left:-3940px; right:-3940px; top:0; height:1200px; transform:rotateX(76deg); transform-origin:top center; background:linear-gradient(180deg,#c9ab84,#8a6d46)">
                <div style="position:absolute; inset:0; background:repeating-linear-gradient(90deg,rgba(90,62,34,.1) 0 3px,transparent 3px 70px)"></div>
              </div>
            </div>
            <div style="position:absolute; left:-4000px; right:-4000px; top:450px; height:2px; background:rgba(42,38,33,.18); filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; left:56px; top:470px; width:660px; height:170px; background:#cdbfa6; border-radius:6px; transform:perspective(500px) rotateX(58deg); filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; right:34px; top:236px; width:56px; height:216px; background:#c9b79a; border-radius:4px 4px 0 0; filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; right:22px; top:196px; width:80px; height:52px; background:#e2d6c0; border-radius:6px 6px 3px 3px; filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; left:64px; top:300px; width:120px; height:152px; background:#d8ccb6; border-radius:6px 6px 0 0; filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; left:96px; top:250px; width:56px; height:56px; background:#c2ceb4; border-radius:50% 50% 40% 40%; filter:blur(6px); opacity:.72"></div>
            <div style="position:absolute; left:48px; top:40px; font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.08em; color:#2a2621">PORTFOLIO — DESIGN × CODE</div>
            <div style="position:absolute; right:48px; top:40px; font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.08em; color:rgba(42,38,33,.45)">ABOUT · CONTACT</div>
            <div style="position:absolute; left:48px; top:212px; max-width:520px">
              <div style="font:400 34px/1.25 Georgia,serif; color:#2a2621">Memories grow in the spaces between living.</div>
              <div style="margin-top:16px; font:14px/1.6 Inter,sans-serif; color:rgba(42,38,33,.55)">Apps I grew, not coded. Pick a tape to load one — eject to come back.</div>
            </div>
          </div>

          <!-- VCR Deck -->
          <vcr-player 
            .setOp=${r?1:o?.9:.75}
            .setFx=${r?"blur(0px)":o?"blur(2px)":"blur(5px)"}
            ?isPlaying=${i}
            @eject-click=${this.eject}
          ></vcr-player>

          <!-- CRT TV Display -->
          <crt-display
            .activeKey=${t}
            .setOp=${r?1:o?.9:.75}
            .setFx=${r?"blur(0px)":o?"blur(2px)":"blur(5px)"}
            ?isPlaying=${i}
            ?isReading=${a}
            ?isPlayWipe=${e==="playWipe"}
          >
            <tape-app-slot .activeKey=${t}></tape-app-slot>
          </crt-display>

          <!-- Tape Shelf Stack -->
          <tape-shelf
            .activeKey=${t}
            .stage=${e}
            .sceneOp=${o?i?.18:.35:1}
            .flightTransform=${s.flightTransform}
            .flightDur=${s.flightDur}
            .flightEase=${s.flightEase}
            .flightFx=${["lift","fly","pop","home"].includes(e)?"drop-shadow(0 22px 20px rgba(42,38,33,.26))":"drop-shadow(0 2px 4px rgba(42,38,33,.12))"}
            @pick-tape=${p=>this.pick(p.detail.key)}
          ></tape-shelf>
        </div>

        <!-- Info Case Panel -->
        <div 
          style="position:absolute; left:44px; top:146px; width:352px; z-index:6; pointer-events:${i?"auto":"none"}; opacity:${i?1:0}; transform:${i?"translateY(0)":"translateY(14px)"}; transition:opacity 380ms cubic-bezier(.23,1,.32,1), transform 380ms cubic-bezier(.23,1,.32,1)"
        >
          <div style="font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.16em; color:rgba(42,38,33,.45)">NOW PLAYING · ${n?n.year:""}</div>
          <div style="margin-top:14px; font:400 34px/1.12 Georgia,serif; color:#2a2621; text-wrap:pretty">${n?n.title:""}</div>
          <div style="margin-top:16px; font:13.5px/1.6 Inter,sans-serif; color:rgba(42,38,33,.62); max-width:330px; text-wrap:pretty">${n?n.sub:""}</div>
          <div style="margin-top:26px; display:grid; grid-template-columns:82px 1fr; gap:9px 14px; font-family:'IBM Plex Mono',monospace; font-size:10.5px; letter-spacing:.06em; color:#2a2621">
            <span style="color:rgba(42,38,33,.42)">ROLE</span><span>${n?n.role:""}</span>
            <span style="color:rgba(42,38,33,.42)">BUILT WITH</span><span>${n?n.stack:""}</span>
            <span style="color:rgba(42,38,33,.42)">CASE</span><span>/${n?n.slug:""}</span>
          </div>
          <div style="margin-top:30px; padding-top:14px; border-top:1px solid rgba(42,38,33,.16); display:flex; align-items:center; justify-content:space-between">
            <div style="font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.12em; color:rgba(42,38,33,.45)">■ ▲ EJECT TO RETURN TO THE SHELF</div>
            <a
              href="https://warmsynths.github.io/${n?n.slug:""}"
              target="_blank"
              rel="noopener"
              style="font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.1em; color:#2a2621; text-decoration:none; white-space:nowrap; opacity:.55; transition:opacity 140ms linear"
              @mouseenter=${p=>p.target.style.opacity="1"}
              @mouseleave=${p=>p.target.style.opacity=".55"}
            >↗ OPEN APP</a>
          </div>
        </div>

        <!-- 3-Shot Cutscene Overlay -->
        <cutscene-overlay
          .activeKey=${t}
          .currentShot=${s.currentShot}
          ?showFlash=${s.showFlash}
          .shotADur=${s.shotADur}
          .shotBDur=${s.shotBDur}
          .flashDur=${s.flashDur}
          ?isPaused=${s.activeHold!==null}
          .scrubVal=${s.scrubVal}
          @skip-cutscene=${()=>s.skip()}
        ></cutscene-overlay>
      </div>
      </div>
    `}};_.styles=v`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    .desktop-wrap {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #f5f2ea;
    }
    .main-card {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1100px;
      height: 700px;
      background: #f5f2ea;
      transform-origin: center center;
    }
    .camera-stage {
      position: absolute;
      inset: 0;
      will-change: transform;
      transition: transform 560ms cubic-bezier(.32,.72,0,1);
    }
  `;j([l({type:Object})],_.prototype,"director",2);j([l({type:String})],_.prototype,"activeKey",2);j([l({type:String})],_.prototype,"stageState",2);j([l({type:String})],_.prototype,"currentShot",2);j([l({type:String})],_.prototype,"flightTransform",2);j([l({type:Number})],_.prototype,"stageScale",2);_=j([y("desktop-layout")],_);var Ge=Object.defineProperty,We=Object.getOwnPropertyDescriptor,St=(s,t,e,o)=>{for(var i=o>1?void 0:o?We(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&Ge(t,e,i),i};const Bt=["chord","scene","echo","pixel","drift"];let J=class extends x{constructor(){super(...arguments),this.activeKey=null,this.phase="idle"}pick(s){this.dispatchEvent(new CustomEvent("pick-tape",{detail:{key:s}}))}render(){const s=this.phase!=="idle",t=this.activeKey,e=t?u[t]:null;return c`
      <div class="bg-floor"></div>

      <div class="header">
        <span>PORTFOLIO — DESIGN × CODE</span>
        <span class="burger"><span></span><span></span></span>
      </div>

      <div class="copy-stack">
        <div class="grid">
          <div class="copy-layer" style="opacity:${s?0:1}; pointer-events:${s?"none":"auto"}">
            <h1>Memories grow in the spaces between living.</h1>
            <p>I direct AI-assisted builds of interactive tools. Tap a tape to load one — eject to come back.</p>
          </div>
          <div class="copy-layer loading-copy" style="opacity:${s?1:0}; pointer-events:${s?"auto":"none"}">
            <div class="kicker">${this.phase==="ejecting"?"EJECTING":"LOADING"}</div>
            <div class="title">${e?e.title:""}</div>
            <div class="sub">${e?e.kicker:""}</div>
          </div>
        </div>
      </div>

      <div class="spacer">
        <div class="set" style="opacity:${s?1:.6}; filter:${s?"blur(0px)":"blur(4px)"}">
          <div class="set-inner">
            <vcr-player .setOp=${1} .setFx=${"blur(0px)"}></vcr-player>
            <crt-display .activeKey=${t} .setOp=${1} .setFx=${"blur(0px)"} ?isReading=${this.phase==="loading"}></crt-display>
          </div>
        </div>
      </div>

      <div class="shelf">
        <div class="shelf-label" style="opacity:${s?.3:1}">ON THE SHELF · 0${Bt.length}</div>
        <div class="list">
          ${Bt.map(o=>{const i=u[o],a=s&&o===t;return c`
              <div class="tape-slot ${a?"collapsed":""}">
                <button
                  class="tape"
                  data-tape=${o}
                  @click=${()=>this.pick(o)}
                  aria-label="Load ${i.title}"
                  style="filter:${s&&!a?"brightness(.55) blur(1px)":"none"}"
                >
                  <div class="strip" style="background:${i.strip2||i.strip}"></div>
                  <div class="label">
                    <span class="title">${i.title}</span>
                    <span class="kicker">${i.kicker}</span>
                  </div>
                  <div class="sheen"></div>
                  <div class="vhs">VHS</div>
                </button>
              </div>
            `})}
        </div>
      </div>
    `}};J.styles=v`
    :host {
      display: grid;
      grid-template-rows: auto auto 1fr auto;
      grid-template-columns: 1fr;
      position: relative;
      width: 100%;
      height: 100%;
      background: #ece6da;
      overflow: hidden;
    }

    .bg-floor {
      grid-area: 4 / 1;
      position: relative;
      top: 52px;
      background: #d8cdba;
      box-shadow: 0 500px 0 0 #d8cdba;
    }

    .bg-floor::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 2px;
      background: rgba(42, 38, 33, .16);
    }

    .set {
      position: absolute;
      bottom: -72px;
      left: 30vw;
      width: 560px;
      height: 570px;
      transform: scale(.55);
      transform-origin: bottom left;
      z-index: 1;
      transition: opacity 420ms cubic-bezier(.23,1,.32,1), filter 420ms cubic-bezier(.23,1,.32,1);
    }

    .set-inner {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .set-inner vcr-player {
      right: auto;
      left: 132px;
      top: 16px;
    }

    .set-inner crt-display {
      right: auto;
      left: 10px;
      top: 104px;
    }

    .header {
      grid-area: 1 / 1;
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 22px 22px 0;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      letter-spacing: .09em;
      color: #2a2621;
    }

    .burger {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 12px 4px;
    }

    .burger span {
      display: block;
      width: 18px;
      height: 1.5px;
      background: #2a2621;
    }

    .copy-stack {
      grid-area: 2 / 1;
      position: relative;
      z-index: 2;
      padding: 0 22px;
    }

    .copy-layer {
      grid-area: 1 / 1;
      transition: opacity 280ms cubic-bezier(.23,1,.32,1);
    }

    .copy-stack .grid {
      display: grid;
    }

    .copy-stack .grid > * {
      grid-area: 1 / 1;
    }

    h1 {
      margin: 26px 0 0;
      font: 400 clamp(24px, 8vw, 32px) / 1.18 Georgia, serif;
      color: #2a2621;
      max-width: 240px;
    }

    p {
      margin: 14px 0 0;
      font: 13px / 1.6 'Inter', sans-serif;
      color: rgba(42, 38, 33, .55);
      max-width: 260px;
    }

    .loading-copy {
      padding-top: 30px;
      font-family: 'IBM Plex Mono', monospace;
    }

    .loading-copy .kicker {
      font-size: 10px;
      letter-spacing: .16em;
      color: rgba(42, 38, 33, .5);
    }

    .loading-copy .title {
      margin-top: 10px;
      font: 400 26px/1.16 Georgia, serif;
      color: #2a2621;
    }

    .loading-copy .sub {
      margin-top: 6px;
      font-size: 10px;
      letter-spacing: .12em;
      color: rgba(42, 38, 33, .45);
    }

    .skip {
      margin-top: 16px;
      font-size: 10.5px;
      letter-spacing: .12em;
      color: rgba(42, 38, 33, .5);
      background: none;
      border: none;
      padding: 8px 0;
      font-family: inherit;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .spacer {
      grid-area: 3 / 1;
      min-height: 24px;
      position: relative;
    }

    .shelf {
      grid-area: 4 / 1;
      position: relative;
      z-index: 2;
      padding: 30px 20px calc(24px + env(safe-area-inset-bottom, 0px));
    }

    .shelf-label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9.5px;
      letter-spacing: .14em;
      color: rgba(42, 38, 33, .42);
      margin-bottom: 10px;
      transition: opacity 300ms cubic-bezier(.23,1,.32,1);
    }

    .list {
      display: flex;
      flex-direction: column;
      max-width: 480px;
      margin: 0 auto;
    }

    .tape-slot {
      aspect-ratio: 7.2 / 1;
      overflow: hidden;
      margin-bottom: 1.5%;
      transition: aspect-ratio 460ms cubic-bezier(.6,0,.4,1), margin-bottom 460ms cubic-bezier(.6,0,.4,1);
    }

    .tape-slot:last-child {
      margin-bottom: 0;
    }

    .tape-slot.collapsed {
      aspect-ratio: 7.2 / 0.02;
      margin-bottom: 0;
    }

    .tape {
      width: 100%;
      height: 100%;
      position: relative;
      border-radius: 4px 4px 2px 2px;
      background: #262626;
      box-shadow: 0 4px 12px rgba(42, 38, 33, .28);
      overflow: hidden;
      border: none;
      display: block;
      width: 100%;
      padding: 0;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: transform 120ms cubic-bezier(.23,1,.32,1), opacity 300ms cubic-bezier(.23,1,.32,1), filter 300ms cubic-bezier(.23,1,.32,1);
    }

    .tape:active {
      transform: scale(.98);
    }

    .strip {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 12px;
    }

    .label {
      position: absolute;
      left: 22px;
      top: 9px;
      bottom: 9px;
      right: 46px;
      background: #f4f1e6;
      border-radius: 1px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2px;
      padding: 0 11px;
    }

    .label .title {
      font-family: 'IBM Plex Mono', monospace;
      font-weight: 600;
      font-size: 11px;
      letter-spacing: .05em;
      color: #2a2621;
    }

    .label .kicker {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 7.5px;
      color: rgba(42, 38, 33, .5);
      letter-spacing: .05em;
    }

    .sheen {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 1px;
      background: rgba(255, 255, 255, .16);
    }

    .vhs {
      position: absolute;
      right: 12px;
      top: 20px;
      font-size: 9px;
      font-style: italic;
      color: #aaa;
      font-family: Arial, sans-serif;
    }


  `;St([l({type:String})],J.prototype,"activeKey",2);St([l({type:String})],J.prototype,"phase",2);J=St([y("mobile-shelf")],J);var Xe=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,Wt=(s,t,e,o)=>{for(var i=o>1?void 0:o?Ye(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&Xe(t,e,i),i};let pt=class extends x{constructor(){super(...arguments),this.activeKey=null}eject(){this.dispatchEvent(new CustomEvent("eject-tape"))}render(){const s=this.activeKey?u[this.activeKey]:null;return c`
      <div class="deck">
        <div class="tv">
          <div class="bezel">
            <div class="screen">
              <div class="screen-inner">
                <div class="osd">
                  <span>▶ PLAY <span style="opacity:.7">CH 3</span></span>
                  <span>SP · ${s?s.run:"0:00:00"}</span>
                </div>
                <slot></slot>
                <div class="scanlines"></div>
                <div class="rgb-fringe"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="transport">
          <span class="label">HI-TECH VCR</span>
          <button class="eject-btn" @click=${this.eject}>■ ▲ EJECT</button>
        </div>
      </div>

      <div class="notes">
        <div class="kicker">NOW PLAYING · ${s?s.year:""}</div>
        <div class="title">${s?s.title:""}</div>
        <div class="sub">${s?s.sub:""}</div>
        <div class="grid">
          <span>ROLE</span><span>${s?s.role:""}</span>
          <span>BUILT WITH</span><span>${s?s.stack:""}</span>
          <span>CASE</span><span>/${s?s.slug:""}</span>
        </div>
      </div>

      <div class="return">SWIPE DOWN OR HIT ■ ▲ TO RETURN TO THE SHELF</div>
    `}};pt.styles=v`
    :host {
      display: block;
      position: relative;
      width: 100%;
      min-height: 100%;
      background: #e8e2d6;
      overflow: hidden;
    }

    .deck {
      position: relative;
      background: #2a2621;
      padding: 20px 16px 14px;
    }

    .tv {
      position: relative;
      background: #8a5a33;
      border-radius: 6px;
      padding: 11px;
    }

    .bezel {
      background: linear-gradient(180deg, #cfcdc6, #bdbbb4);
      border-radius: 4px;
      padding: 9px;
    }

    .screen {
      position: relative;
      background: #1e1e1e;
      border-radius: 8px;
      padding: 12px;
    }

    .screen-inner {
      position: relative;
      aspect-ratio: 4 / 3;
      background: #0a0a0c;
      border-radius: 16px;
      overflow: hidden;
    }

    @keyframes crtTextFlicker {
      0%, 100% {
        text-shadow: 0.6px 0 0.8px rgba(234, 54, 175, 0.4), -0.6px 0 0.8px rgba(117, 250, 105, 0.4);
      }
      50% {
        text-shadow: 1px 0.3px 1px rgba(234, 54, 175, 0.5), -0.5px -0.3px 1px rgba(117, 250, 105, 0.5);
      }
    }

    @keyframes crtPhosphorMicroFlicker {
      0% { opacity: 0.993; }
      25% { opacity: 1; }
      50% { opacity: 0.989; }
      75% { opacity: 0.997; }
      100% { opacity: 1; }
    }

    .osd {
      position: absolute;
      left: 14px;
      right: 14px;
      top: 10px;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      pointer-events: none;
      font-family: 'IBM Plex Mono', monospace;
      font-weight: 600;
      font-size: 9px;
      letter-spacing: .12em;
      color: #e8f0e2;
      text-shadow: 0.6px 0 0.8px rgba(234, 54, 175, 0.4), -0.6px 0 0.8px rgba(117, 250, 105, 0.4);
      animation: crtTextFlicker 0.1s infinite alternate;
    }

    ::slotted(*) {
      width: 100%;
      height: 100%;
      animation: crtPhosphorMicroFlicker 0.12s infinite alternate;
    }

    .scanlines {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: repeating-linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0 1px, transparent 1px 4px);
    }

    .rgb-fringe {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: repeating-linear-gradient(90deg, rgba(234, 54, 175, 0.012) 0 1px, rgba(117, 250, 105, 0.012) 1px 2px, transparent 2px 3px);
      animation: crtPhosphorMicroFlicker 0.15s infinite alternate;
    }

    .transport {
      margin-top: 10px;
      height: 40px;
      background: linear-gradient(180deg, #1a1a1c, #101011);
      border-radius: 3px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      gap: 10px;
    }

    .transport .label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 8.5px;
      letter-spacing: .14em;
      color: rgba(239, 236, 228, .5);
    }

    .eject-btn {
      margin-left: auto;
      height: 30px;
      padding: 0 14px;
      background: #2c2c2e;
      border: none;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9px;
      letter-spacing: .12em;
      color: #cfcfcf;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .eject-btn:active {
      transform: translateY(1px);
    }

    .notes {
      padding: 24px 22px 14px;
    }

    .kicker {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9.5px;
      letter-spacing: .16em;
      color: rgba(42, 38, 33, .45);
    }

    .title {
      margin-top: 12px;
      font: 400 clamp(22px, 7vw, 28px) / 1.14 Georgia, serif;
      color: #2a2621;
    }

    .sub {
      margin-top: 12px;
      font: 13px / 1.6 'Inter', sans-serif;
      color: rgba(42, 38, 33, .62);
    }

    .grid {
      margin-top: 22px;
      display: grid;
      grid-template-columns: 78px 1fr;
      gap: 9px 14px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      letter-spacing: .06em;
      color: #2a2621;
    }

    .grid span:nth-child(odd) {
      color: rgba(42, 38, 33, .42);
    }

    .return {
      margin: 22px 22px 0;
      padding: 14px 0 calc(24px + env(safe-area-inset-bottom, 0px));
      border-top: 1px solid rgba(42, 38, 33, .16);
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9.5px;
      letter-spacing: .12em;
      color: rgba(42, 38, 33, .45);
    }
  `;Wt([l({type:String})],pt.prototype,"activeKey",2);pt=Wt([y("mobile-playing")],pt);var Je=Object.defineProperty,Qe=Object.getOwnPropertyDescriptor,q=(s,t,e,o)=>{for(var i=o>1?void 0:o?Qe(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&Je(t,e,i),i};let T=class extends x{constructor(){super(...arguments),this.activeKey=null,this.currentShot="none",this.showFlash=!1,this.shotBDur=1250,this.flashDur=130}onSkip(){this.dispatchEvent(new CustomEvent("skip-cutscene"))}render(){if(this.currentShot==="none"&&!this.showFlash)return c``;const s=this.activeKey?u[this.activeKey]:u.echo,t=this.currentShot==="Be"?Math.round(this.shotBDur*.72):this.shotBDur,e=this.currentShot==="B"?"shotBInsertM":this.currentShot==="Be"?"shotBEjectM":"none",o=this.showFlash?"cutFlash":"none";return c`
      <!-- Flash Static -->
      <div
        style="position:absolute; inset:0; z-index:30; display:${this.showFlash?"block":"none"}; pointer-events:none; background:#d8d4c8; animation-name:${o}; animation-duration:${this.flashDur}ms; animation-timing-function:linear; animation-fill-mode:both"
      >
        <div style="position:absolute; inset:0; background:repeating-linear-gradient(180deg,rgba(255,255,255,.85) 0 3px,rgba(20,20,22,.65) 3px 7px)"></div>
      </div>

      <!-- Shot B: Portrait VCR Deck -->
      <div
        class="scene"
        style="display:${this.currentShot!=="none"?"block":"none"}; background:#6f5a3f"
        @click=${this.onSkip}
      >
        <!-- Dark ceiling -->
        <div style="position:absolute; left:0; right:0; top:0; height:560px; background:linear-gradient(180deg,#08080a,#131316)"></div>

        <!-- Wood floor -->
        <div style="position:absolute; left:0; right:0; top:558px; bottom:0; perspective:620px; perspective-origin:50% -60%">
          <div style="position:absolute; left:-60%; right:-60%; top:0; height:900px; transform:rotateX(76deg); transform-origin:top center; background:linear-gradient(180deg,#c9ab84,#8a6d46)">
            <div style="position:absolute; inset:0; background:repeating-linear-gradient(90deg,rgba(90,62,34,.1) 0 3px,transparent 3px 60px)"></div>
          </div>
        </div>

        <!-- Deck body -->
        <div style="position:absolute; left:-40px; right:-40px; top:262px; height:250px; background:linear-gradient(180deg,#141417,#0d0d0f)"></div>

        <!-- Button panel -->
        <div style="position:absolute; left:-40px; right:-40px; top:424px; height:98px; background:linear-gradient(180deg,#1c1c1f,#101012)">
          <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.055)"></div>
          <div style="position:absolute; left:34px; top:40px; width:118px; height:11px; background:rgba(239,236,228,.62); border-radius:2px"></div>
          <div style="position:absolute; right:26px; top:24px; width:172px; height:52px; display:flex; gap:9px">
            <div style="flex:1; background:linear-gradient(180deg,#333336,#26262a); border-radius:6px; position:relative">
              <div style="position:absolute; left:0; right:0; top:14px; text-align:center; font-size:9px; color:#b6b6b6; letter-spacing:.1em">EJECT</div>
            </div>
            <div style="flex:1; background:linear-gradient(180deg,#2f2f33,#232327); border-radius:6px"></div>
            <div style="flex:1; background:linear-gradient(180deg,#2f2f33,#232327); border-radius:6px"></div>
          </div>
        </div>

        <!-- Shelf strip -->
        <div style="position:absolute; left:-40px; right:-40px; top:522px; height:32px; background:linear-gradient(180deg,#efe9dc 0 72%,#c7c0b0 72%); box-shadow:0 16px 26px rgba(20,14,6,.55)">
          <div style="position:absolute; left:40px; top:12px; width:200px; height:4px; background:rgba(60,55,45,.3)"></div>
        </div>

        <!-- Slot mouth -->
        <div style="position:absolute; left:66px; right:66px; top:260px; height:96px; background:linear-gradient(180deg,#000 0 34%,#08080c); box-shadow:inset 0 14px 22px rgba(0,0,0,.9), inset 0 -2px 0 rgba(255,255,255,.045)"></div>

        <!-- Animated tape -->
        <div style="position:absolute; left:0; right:0; top:0; bottom:0; pointer-events:none">
          <div style="position:absolute; left:50%; margin-left:-162px; top:262px; width:324px; height:180px; transform-style:preserve-3d; animation-name:${e}; animation-duration:${t}ms; animation-timing-function:linear; animation-fill-mode:both">
            <!-- Tape shadow -->
            <div style="position:absolute; left:-20px; right:-20px; top:150px; height:60px; background:rgba(0,0,0,.55); filter:blur(20px); border-radius:50%"></div>

            <!-- Tape body -->
            <div style="position:absolute; left:50%; margin-left:-165px; top:0; width:330px; height:178px; transform:scale(.982,1.011); transform-origin:center top">
              <div style="width:330px; height:178px; position:relative; border-radius:9px; background:#262626; overflow:hidden">
                <div style="position:absolute; top:0; left:0; right:0; height:24px; background:#1a1a1a; border-bottom:2px solid #333; display:flex; align-items:center; justify-content:center">
                  <span style="font-size:10px; font-weight:800; color:#e8e8e8; letter-spacing:.12em">VHS</span>
                </div>
                <!-- Left reel -->
                <div style="position:absolute; left:28px; top:48px; width:76px; height:76px; border-radius:50%; background:#d9d9d9">
                  <div style="position:absolute; inset:14px; border-radius:50%; background:#a8a8a8"></div>
                  <div style="position:absolute; inset:22px; border-radius:50%; background:conic-gradient(#8e8e8e 0 20deg,#a8a8a8 20deg 60deg,#8e8e8e 60deg 80deg,#a8a8a8 80deg 120deg,#8e8e8e 120deg 140deg,#a8a8a8 140deg 180deg,#8e8e8e 180deg 200deg,#a8a8a8 200deg 240deg,#8e8e8e 240deg 260deg,#a8a8a8 260deg 300deg,#8e8e8e 300deg 320deg,#a8a8a8 320deg 360deg)"></div>
                  <div style="position:absolute; inset:30px; border-radius:50%; background:#c4c4c4"></div>
                </div>
                <!-- Right reel -->
                <div style="position:absolute; right:28px; top:48px; width:76px; height:76px; border-radius:50%; background:#d9d9d9">
                  <div style="position:absolute; inset:14px; border-radius:50%; background:#a8a8a8"></div>
                  <div style="position:absolute; inset:22px; border-radius:50%; background:conic-gradient(#8e8e8e 0 20deg,#a8a8a8 20deg 60deg,#8e8e8e 60deg 80deg,#a8a8a8 80deg 120deg,#8e8e8e 120deg 140deg,#a8a8a8 140deg 180deg,#8e8e8e 180deg 200deg,#a8a8a8 200deg 240deg,#8e8e8e 240deg 260deg,#a8a8a8 260deg 300deg,#8e8e8e 300deg 320deg,#a8a8a8 320deg 360deg)"></div>
                  <div style="position:absolute; inset:30px; border-radius:50%; background:#c4c4c4"></div>
                </div>
                <!-- Label sticker -->
                <div style="position:absolute; left:118px; top:44px; width:94px; height:84px; background:#f4f4f4; border-radius:2px">
                  <div style="position:absolute; top:0; left:0; right:0; height:20px; background:${s.strip}"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:10px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:18px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:26px; height:1px; background:#c9c9c9"></div>
                </div>
              </div>
            </div>

            <!-- Front panel (perspective-rotated below tape) -->
            <div style="position:absolute; left:0; top:180px; width:324px; height:44px; transform-origin:50% 0%; transform:rotateX(72deg); background:linear-gradient(180deg,#242427 0 3px,#18181b 3px 46%,#101012 46%,#0a0a0b); border-radius:0 0 7px 7px; box-shadow:0 20px 26px rgba(0,0,0,.5)">
              <div style="position:absolute; left:50px; right:50px; top:12px; bottom:8px; background:linear-gradient(160deg,#2b2b2f,#101013 60%); border-radius:2px"></div>
              <div style="position:absolute; left:14px; top:14px; width:30px; height:18px; background:rgba(226,222,210,.82); border-radius:1px"></div>
            </div>
          </div>
        </div>

        <!-- Top VCR panel (covers tape entry) -->
        <div style="position:absolute; left:0; right:0; top:0; height:20px; background:#08080a"></div>
        <div style="position:absolute; left:-40px; right:-40px; top:18px; height:246px; background:linear-gradient(180deg,#212125 0 34%,#16161a 34%,#131316); border-bottom:2px solid #34343a; box-shadow:0 8px 18px rgba(0,0,0,.6)">
          <div style="position:absolute; left:0; right:0; top:0; height:1px; background:rgba(255,255,255,.09)"></div>
          <div style="position:absolute; left:44px; top:24px; width:120px; height:24px; background:repeating-linear-gradient(180deg,#26262a 0 5px,#101012 5px 8px); border-radius:2px"></div>
          <div style="position:absolute; right:44px; top:24px; width:120px; height:24px; background:repeating-linear-gradient(180deg,#26262a 0 5px,#101012 5px 8px); border-radius:2px"></div>
          <div style="position:absolute; left:44px; top:150px; width:96px; height:13px; background:rgba(239,236,228,.7); border-radius:2px"></div>
          <div style="position:absolute; right:40px; top:134px; width:170px; height:52px; background:linear-gradient(160deg,#101014,#06060a 60%); border-radius:3px; box-shadow:inset 0 2px 6px rgba(0,0,0,.8)"></div>
        </div>

        <!-- LED indicators -->
        <div style="position:absolute; right:52px; top:450px; display:flex; gap:22px">
          <div style="width:13px; height:13px; border-radius:50%; background:#c9a06a; animation-name:ledBlink; animation-duration:${t}ms; animation-timing-function:linear; animation-fill-mode:both; animation-delay:140ms"></div>
          <div style="width:13px; height:13px; border-radius:50%; background:#7fb37a; animation-name:ledBlink; animation-duration:${t}ms; animation-timing-function:linear; animation-fill-mode:both"></div>
        </div>

        <!-- Bottom gradient -->
        <div style="position:absolute; left:0; right:0; bottom:0; height:36%; pointer-events:none; background:linear-gradient(180deg,rgba(20,14,6,0),rgba(20,14,6,.5) 42%,rgba(20,14,6,.86))"></div>

        <!-- Loading info overlay -->
        <div style="position:absolute; left:22px; right:22px; bottom:36px; font-family:'IBM Plex Mono',monospace; color:#f0e9dc; text-align:center; z-index:5">
          <div style="font-size:10px; letter-spacing:.16em; color:rgba(240,233,220,.6)">${this.currentShot==="Be"?"EJECTING":"LOADING"}</div>
          <div style="margin-top:9px; font-size:19px; font-weight:600; letter-spacing:.02em">${s.title}</div>
          <div style="margin-top:6px; font-size:10px; letter-spacing:.14em; color:rgba(240,233,220,.5)">${s.kicker}</div>
          <div style="margin-top:20px; font-size:10.5px; letter-spacing:.12em; color:rgba(240,233,220,.45)">TAP TO SKIP</div>
        </div>
      </div>
    `}};T.styles=v`
    :host {
      display: block;
      position: absolute;
      inset: 0;
      z-index: 20;
      pointer-events: none;
    }

    .scene {
      position: absolute;
      inset: 0;
      pointer-events: auto;
      overflow: hidden;
      font-family: Arial, Helvetica, sans-serif;
    }

    @keyframes shotBInsertM {
      0%   { transform: rotateX(-72deg) translate3d(0, 180px, 0); }
      22%  { transform: rotateX(-72deg) translate3d(0, 100px, 0); }
      48%  { transform: rotateX(-72deg) translate3d(0, 14px, 0); }
      76%  { transform: rotateX(-72deg) translate3d(0, -200px, 0); }
      90%  { transform: rotateX(-72deg) translate3d(0, -400px, 0); }
      95%  { transform: rotateX(-72deg) translate3d(0, -370px, 0); }
      100% { transform: rotateX(-72deg) translate3d(0, -430px, 0); }
    }

    @keyframes shotBEjectM {
      0%   { transform: rotateX(-72deg) translate3d(0, -430px, 0); }
      14%  { transform: rotateX(-72deg) translate3d(0, -140px, 0); }
      26%  { transform: rotateX(-72deg) translate3d(0, -186px, 0); }
      70%  { transform: rotateX(-72deg) translate3d(0, 106px, 0); }
      100% { transform: rotateX(-72deg) translate3d(0, 180px, 0); }
    }

    @keyframes ledBlink {
      0%, 44% { opacity: .25; }
      50% { opacity: 1; }
      64% { opacity: .35; }
      72% { opacity: 1; }
      100% { opacity: .8; }
    }

    @keyframes cutFlash {
      0% { opacity: 1; }
      70% { opacity: .55; }
      100% { opacity: 0; }
    }
  `;q([l({type:String})],T.prototype,"activeKey",2);q([l({type:String})],T.prototype,"currentShot",2);q([l({type:Boolean})],T.prototype,"showFlash",2);q([l({type:Number})],T.prototype,"shotBDur",2);q([l({type:Number})],T.prototype,"flashDur",2);T=q([y("mobile-cutscene")],T);var Ze=Object.defineProperty,ti=Object.getOwnPropertyDescriptor,Z=(s,t,e,o)=>{for(var i=o>1?void 0:o?ti(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&Ze(t,e,i),i};const Ht="cubic-bezier(.23,1,.32,1)";let B=class extends x{constructor(){super(...arguments),this.activeKey=null,this.stageState="idle",this.currentShot="none"}get mobileShelfPhase(){const s=this.director.stageState;return s==="ejectCollapse"?"ejecting":s==="idle"||s==="home"?"idle":"loading"}get mobilePlayingVisible(){return this.director.stageState==="play"||this.director.stageState==="playWipe"}pick(s){this.director.pick(s,"none","none",!0)}eject(){this.director.eject(!0)}render(){const s=this.director,t=s.activeKey,e=this.mobilePlayingVisible,o=s.currentShot==="B"||s.currentShot==="Be";return c`
      <div class="mobile-wrap">
        <mobile-shelf
          class="mobile-panel"
          style="opacity:${e||o?0:1}; pointer-events:${e||o?"none":"auto"}; transition:opacity 320ms ${Ht}"
          .activeKey=${t}
          .phase=${this.mobileShelfPhase}
          @pick-tape=${i=>this.pick(i.detail.key)}
        ></mobile-shelf>

        <mobile-playing
          class="mobile-panel"
          style="opacity:${e?1:0}; pointer-events:${e?"auto":"none"}; transition:opacity 260ms ${Ht}"
          .activeKey=${t}
          @eject-tape=${()=>this.eject()}
        >
          <tape-app-slot .activeKey=${t}></tape-app-slot>
        </mobile-playing>

        <mobile-cutscene
          .activeKey=${t}
          .currentShot=${s.currentShot}
          ?showFlash=${s.showFlash}
          .shotBDur=${s.shotBDur}
          .flashDur=${s.flashDur}
          @skip-cutscene=${()=>s.skip()}
        ></mobile-cutscene>
      </div>
    `}};B.styles=v`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
    }
    .mobile-wrap {
      position: relative;
      width: 100%;
      min-height: 100vh;
      overflow: hidden;
      background: #f5f2ea;
    }
    .mobile-panel {
      position: absolute;
      inset: 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  `;Z([l({type:Object})],B.prototype,"director",2);Z([l({type:String})],B.prototype,"activeKey",2);Z([l({type:String})],B.prototype,"stageState",2);Z([l({type:String})],B.prototype,"currentShot",2);B=Z([y("mobile-layout")],B);var ei=Object.defineProperty,ii=Object.getOwnPropertyDescriptor,S=(s,t,e,o)=>{for(var i=o>1?void 0:o?ii(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&ei(t,e,i),i};let $=class extends x{constructor(){super(...arguments),this.inspectState="SHELF",this.activeHold=null,this.scrubVal=0,this.shotADur=1300,this.shotBDur=1250,this.flashDur=130,this.dollyDur=420,this.readDur=620,this.camPct=174}onHold(s){this.dispatchEvent(new CustomEvent("hold-shot",{detail:{hold:s}}))}onRunSeq(){this.dispatchEvent(new CustomEvent("run-sequence"))}onParamChange(s,t){this.dispatchEvent(new CustomEvent("param-change",{detail:{name:s,val:t}}))}render(){const s=this.shotADur+200+this.shotBDur+150+this.flashDur+this.dollyDur+this.readDur+260+"ms";return c`
      <div class="inspector-card">
        <div class="header">
          <span class="title">MOTION INSPECTOR</span>
          <span class="status">${this.inspectState}</span>
        </div>

        <div class="btn-group">
          <button class="btn ${this.activeHold==="idle"?"active":""}" @click=${()=>this.onHold("idle")}>SHELF</button>
          <button class="btn ${this.activeHold==="A"?"active":""}" @click=${()=>this.onHold("A")}>SHOT A · SLEEVE SLIDE-OUT</button>
          <button class="btn ${this.activeHold==="B"?"active":""}" @click=${()=>this.onHold("B")}>SHOT B · INSERT</button>
          <button class="btn ${this.activeHold==="Be"?"active":""}" @click=${()=>this.onHold("Be")}>SHOT B · EJECT</button>
          <button class="btn ${this.activeHold==="play"?"active":""}" @click=${()=>this.onHold("play")}>SHOT C · PLAYING</button>
          <button class="run-btn" @click=${this.onRunSeq}>▶ RUN FULL SEQUENCE</button>
        </div>

        <div class="scrub-row">
          <span style="font-size:10px; letter-spacing:.08em; width:74px; color:rgba(42,38,33,.55)">SCRUB</span>
          <input type="range" min="0" max="1000" .value=${this.scrubVal} @input=${t=>this.onParamChange("scrub",+t.target.value)} />
          <span style="font-size:10px; letter-spacing:.06em; width:104px; text-align:right; color:rgba(42,38,33,.55)">${this.activeHold?`${this.scrubVal}ms`:"hold a shot"}</span>
        </div>

        <div class="grid-sliders">
          <div class="slider-row">
            <span class="slider-label">SHOT A HOLD</span>
            <input type="range" min="500" max="2600" step="50" .value=${this.shotADur} @input=${t=>this.onParamChange("shotADur",+t.target.value)} />
            <span style="font-size:10px; width:56px; text-anchor:end; text-align:right">${this.shotADur}ms</span>
          </div>
          <div class="slider-row">
            <span class="slider-label">SHOT B HOLD</span>
            <input type="range" min="500" max="2600" step="50" .value=${this.shotBDur} @input=${t=>this.onParamChange("shotBDur",+t.target.value)} />
            <span style="font-size:10px; width:56px; text-anchor:end; text-align:right">${this.shotBDur}ms</span>
          </div>
          <div class="slider-row">
            <span class="slider-label">CUT FLASH</span>
            <input type="range" min="40" max="400" step="10" .value=${this.flashDur} @input=${t=>this.onParamChange("flashDur",+t.target.value)} />
            <span style="font-size:10px; width:56px; text-anchor:end; text-align:right">${this.flashDur}ms</span>
          </div>
          <div class="slider-row">
            <span class="slider-label">SETTLE DOLLY</span>
            <input type="range" min="120" max="1200" step="20" .value=${this.dollyDur} @input=${t=>this.onParamChange("dollyDur",+t.target.value)} />
            <span style="font-size:10px; width:56px; text-anchor:end; text-align:right">${this.dollyDur}ms</span>
          </div>
          <div class="slider-row">
            <span class="slider-label">READ BEAT</span>
            <input type="range" min="0" max="1600" step="50" .value=${this.readDur} @input=${t=>this.onParamChange("readDur",+t.target.value)} />
            <span style="font-size:10px; width:56px; text-anchor:end; text-align:right">${this.readDur}ms</span>
          </div>
          <div class="slider-row">
            <span class="slider-label">CAMERA IN</span>
            <input type="range" min="140" max="260" step="1" .value=${this.camPct} @input=${t=>this.onParamChange("camPct",+t.target.value)} />
            <span style="font-size:10px; width:56px; text-anchor:end; text-align:right">${this.camPct}%</span>
          </div>
        </div>

        <div class="foot-info">
          Total load → playing: <b style="color:#2a2621">${s}</b>. Holding a shot pauses its animation so the scrub bar seeks it; RUN plays the whole cut sequence with the values above. Esc or the deck's EJECT key returns to the shelf.
        </div>
      </div>
    `}};$.styles=v`
    :host {
      display: block;
      width: 1100px;
      margin: 14px auto 0;
    }

    .inspector-card {
      padding: 16px 20px 18px;
      box-sizing: border-box;
      background: #efece3;
      border: 1px solid rgba(42, 38, 33, 0.14);
      border-radius: 4px;
      font-family: 'IBM Plex Mono', monospace;
      color: #2a2621;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid rgba(42, 38, 33, 0.14);
      padding-bottom: 10px;
    }

    .title {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
    }

    .status {
      font-size: 10px;
      letter-spacing: 0.08em;
      color: rgba(42, 38, 33, 0.5);
    }

    .btn-group {
      display: flex;
      gap: 8px;
      margin-top: 14px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 7px 12px;
      font-size: 10px;
      letter-spacing: 0.08em;
      border: 1px solid rgba(42, 38, 33, 0.24);
      border-radius: 2px;
      cursor: pointer;
      background: transparent;
      transition: background 120ms ease;
    }

    .btn:hover {
      background: #e3dfd2;
    }

    .btn.active {
      background: #dcd7c8;
      font-weight: bold;
    }

    .run-btn {
      padding: 7px 14px;
      font-size: 10px;
      letter-spacing: 0.08em;
      border: 1px solid #2a2621;
      border-radius: 2px;
      cursor: pointer;
      background: #2a2621;
      color: #f5f2ea;
      margin-left: auto;
    }

    .scrub-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 16px;
    }

    .grid-sliders {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px 34px;
      margin-top: 16px;
    }

    .slider-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .slider-label {
      font-size: 10px;
      letter-spacing: 0.08em;
      width: 120px;
      color: rgba(42, 38, 33, 0.55);
    }

    input[type='range'] {
      flex: 1;
      accent-color: #2a2621;
    }

    .foot-info {
      margin-top: 14px;
      font-size: 10px;
      line-height: 1.7;
      color: rgba(42, 38, 33, 0.5);
    }
  `;S([l({type:String})],$.prototype,"inspectState",2);S([l({type:String})],$.prototype,"activeHold",2);S([l({type:Number})],$.prototype,"scrubVal",2);S([l({type:Number})],$.prototype,"shotADur",2);S([l({type:Number})],$.prototype,"shotBDur",2);S([l({type:Number})],$.prototype,"flashDur",2);S([l({type:Number})],$.prototype,"dollyDur",2);S([l({type:Number})],$.prototype,"readDur",2);S([l({type:Number})],$.prototype,"camPct",2);$=S([y("motion-inspector")],$);var si=Object.defineProperty,oi=Object.getOwnPropertyDescriptor,ht=(s,t,e,o)=>{for(var i=o>1?void 0:o?oi(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&si(t,e,i),i};let V=class extends x{constructor(){super(...arguments),this.stageScale=1,this.isMobile=!1,this.handleMqChange=s=>{this.isMobile=s.matches},this.director=new me(this),this.showInspector=!1,this.handleKeyDown=s=>{s.key==="Escape"&&(this.director.currentShot!=="none"?this.director.skip():this.director.stageState==="play"||this.director.stageState==="playWipe"?this.director.eject(this.isMobile):this.director.stageState!=="idle"&&this.director.cancel())},this.handlePopState=()=>this.route(!1)}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("popstate",this.handlePopState),this.mq=window.matchMedia("(max-width: 639px)"),this.isMobile=this.mq.matches,this.mq.addEventListener("change",this.handleMqChange),requestAnimationFrame(()=>this.route(!0))}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("popstate",this.handlePopState),this.mq?.removeEventListener("change",this.handleMqChange),this.resizeObserver?.disconnect()}updated(){const s=this.shadowRoot?.querySelector("desktop-layout");!s||s===this.observedStageEl||(this.resizeObserver?.disconnect(),this.observedStageEl=s,this.resizeObserver=new ResizeObserver(t=>{const e=t[0]?.contentRect;e&&(this.stageScale=Math.min(e.width/1100,e.height/700))}),this.resizeObserver.observe(s))}route(s){const t=(location.hash||"").replace(/^#\/?/,""),e=Object.keys(u).find(o=>u[o].slug===t);if(e&&this.director.activeKey!==e){const o=this.shadowRoot?.querySelector("desktop-layout"),i=o?o.flip(e):"none",a=o?o.screenOrigin():"735px 307px";this.director.jump(e,i,a);return}!e&&this.director.activeKey&&(s?this.director.setStateIdle():this.director.eject(this.isMobile))}runSequence(){const s=this.director.activeKey||"echo",t=this.shadowRoot?.querySelector("desktop-layout"),e=t?t.flip(s):"none",o=t?t.screenOrigin():"735px 307px";this.director.handleHold("idle",e,o),setTimeout(()=>this.director.pick(s,e,o,this.isMobile),60)}render(){const s=this.director,t=s.activeKey,e=s.activeHold?"HOLDING "+(s.activeHold==="A"?"SHOT A":s.activeHold==="B"?"SHOT B · INSERT":"SHOT B · EJECT")+(t?" — "+u[t].title:""):s.stageState==="idle"?"SHELF":(s.stageState==="play"||s.stageState==="playWipe"?"PLAYING":s.currentShot!=="none"?"RUNNING · "+(s.currentShot==="A"?"SHOT A":s.currentShot==="Be"?"EJECT":"SHOT B"):s.stageState==="read"?"RUNNING · SETTLE / READ":"RUNNING")+(t?" — "+u[t].title:"");return c`
      ${this.isMobile?c`<mobile-layout
            .director=${s}
            .activeKey=${s.activeKey}
            .stageState=${s.stageState}
            .currentShot=${s.currentShot}
          ></mobile-layout>`:c`<desktop-layout
            .director=${s}
            .activeKey=${s.activeKey}
            .stageState=${s.stageState}
            .currentShot=${s.currentShot}
            .flightTransform=${s.flightTransform}
            .stageScale=${this.stageScale}
          ></desktop-layout>`}

      ${this.showInspector?c`
            <motion-inspector
              .inspectState=${e}
              .activeHold=${s.activeHold}
              .scrubVal=${s.scrubVal}
              .shotADur=${s.shotADur}
              .shotBDur=${s.shotBDur}
              .flashDur=${s.flashDur}
              .dollyDur=${s.dollyDur}
              .readDur=${s.readDur}
              .camPct=${s.camPct}
              @hold-shot=${o=>{const i=this.shadowRoot?.querySelector("desktop-layout"),a=i?i.flip(t||"echo"):"none",r=i?i.screenOrigin():"735px 307px";s.handleHold(o.detail.hold,a,r)}}
              @param-change=${o=>s.handleParamChange(o.detail.name,o.detail.val)}
              @run-sequence=${this.runSequence}
            ></motion-inspector>
          `:""}
    `}};V.styles=v`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
      background: #f5f2ea;
      box-sizing: border-box;
      user-select: none;
    }
  `;ht([H()],V.prototype,"stageScale",2);ht([H()],V.prototype,"isMobile",2);ht([H()],V.prototype,"showInspector",2);V=ht([y("portfolio-app")],V);console.log("📼 Studio Portfolio — Retro Cutscene Experience initialized.");

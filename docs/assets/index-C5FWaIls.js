(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=i(o);fetch(o.href,a)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const it=globalThis,yt=it.ShadowRoot&&(it.ShadyCSS===void 0||it.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,wt=Symbol(),Pt=new WeakMap;let Ft=class{constructor(t,i,s){if(this._$cssResult$=!0,s!==wt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(yt&&t===void 0){const s=i!==void 0&&i.length===1;s&&(t=Pt.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Pt.set(i,t))}return t}toString(){return this.cssText}};const Jt=e=>new Ft(typeof e=="string"?e:e+"",void 0,wt),v=(e,...t)=>{const i=e.length===1?e[0]:t.reduce((s,o,a)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[a+1],e[0]);return new Ft(i,e,wt)},Qt=(e,t)=>{if(yt)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of t){const s=document.createElement("style"),o=it.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}},Et=yt?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return Jt(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Zt,defineProperty:te,getOwnPropertyDescriptor:ee,getOwnPropertyNames:ie,getOwnPropertySymbols:oe,getPrototypeOf:se}=Object,dt=globalThis,Ct=dt.trustedTypes,ae=Ct?Ct.emptyScript:"",re=dt.reactiveElementPolyfillSupport,W=(e,t)=>e,ot={toAttribute(e,t){switch(t){case Boolean:e=e?ae:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},$t=(e,t)=>!Zt(e,t),Tt={attribute:!0,type:String,converter:ot,reflect:!1,useDefault:!1,hasChanged:$t};Symbol.metadata??=Symbol("metadata"),dt.litPropertyMetadata??=new WeakMap;let N=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=Tt){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,i);o!==void 0&&te(this.prototype,t,o)}}static getPropertyDescriptor(t,i,s){const{get:o,set:a}=ee(this.prototype,t)??{get(){return this[i]},set(r){this[i]=r}};return{get:o,set(r){const n=o?.call(this);a?.call(this,r),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Tt}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;const t=se(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){const i=this.properties,s=[...ie(i),...oe(i)];for(const o of s)this.createProperty(o,i[o])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[s,o]of i)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[i,s]of this.elementProperties){const o=this._$Eu(i,s);o!==void 0&&this._$Eh.set(o,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const o of s)i.unshift(Et(o))}else t!==void 0&&i.push(Et(t));return i}static _$Eu(t,i){const s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const s of i.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Qt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$ET(t,i){const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){const a=(s.converter?.toAttribute!==void 0?s.converter:ot).toAttribute(i,s.type);this._$Em=t,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(t,i){const s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const a=s.getPropertyOptions(o),r=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:ot;this._$Em=o;const n=r.fromAttribute(i,a.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,i,s,o=!1,a){if(t!==void 0){const r=this.constructor;if(o===!1&&(a=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??$t)(a,i)||s.useDefault&&s.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:s,reflect:o,wrapped:a},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??i??this[t]),a!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(i=void 0),this._$AL.set(t,i)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,a]of s){const{wrapped:r}=a,n=this[o];r!==!0||this._$AL.has(o)||n===void 0||this.C(o,void 0,a,n)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(i)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(i=>this._$ET(i,this[i])),this._$EM()}updated(t){}firstUpdated(t){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[W("elementProperties")]=new Map,N[W("finalized")]=new Map,re?.({ReactiveElement:N}),(dt.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kt=globalThis,zt=e=>e,st=kt.trustedTypes,Mt=st?st.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ut="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Lt="?"+C,ne=`<${Lt}>`,B=document,X=()=>B.createComment(""),Y=e=>e===null||typeof e!="object"&&typeof e!="function",St=Array.isArray,pe=e=>St(e)||typeof e?.[Symbol.iterator]=="function",ft=`[ 	
\f\r]`,G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dt=/-->/g,It=/>/g,D=RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bt=/'/g,Rt=/"/g,Vt=/^(?:script|style|textarea|title)$/i,le=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),c=le(1),F=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),Ht=new WeakMap,I=B.createTreeWalker(B,129);function qt(e,t){if(!St(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mt!==void 0?Mt.createHTML(t):t}const de=(e,t)=>{const i=e.length-1,s=[];let o,a=t===2?"<svg>":t===3?"<math>":"",r=G;for(let n=0;n<i;n++){const p=e[n];let h,g,d=-1,b=0;for(;b<p.length&&(r.lastIndex=b,g=r.exec(p),g!==null);)b=r.lastIndex,r===G?g[1]==="!--"?r=Dt:g[1]!==void 0?r=It:g[2]!==void 0?(Vt.test(g[2])&&(o=RegExp("</"+g[2],"g")),r=D):g[3]!==void 0&&(r=D):r===D?g[0]===">"?(r=o??G,d=-1):g[1]===void 0?d=-2:(d=r.lastIndex-g[2].length,h=g[1],r=g[3]===void 0?D:g[3]==='"'?Rt:Bt):r===Rt||r===Bt?r=D:r===Dt||r===It?r=G:(r=D,o=void 0);const y=r===D&&e[n+1].startsWith("/>")?" ":"";a+=r===G?p+ne:d>=0?(s.push(h),p.slice(0,d)+Ut+p.slice(d)+C+y):p+C+(d===-2?n:y)}return[qt(e,a+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:i},s){let o;this.parts=[];let a=0,r=0;const n=t.length-1,p=this.parts,[h,g]=de(t,i);if(this.el=J.createElement(h,s),I.currentNode=this.el.content,i===2||i===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(o=I.nextNode())!==null&&p.length<n;){if(o.nodeType===1){if(o.hasAttributes())for(const d of o.getAttributeNames())if(d.endsWith(Ut)){const b=g[r++],y=o.getAttribute(d).split(C),E=/([.?@])?(.*)/.exec(b);p.push({type:1,index:a,name:E[2],strings:y,ctor:E[1]==="."?he:E[1]==="?"?ge:E[1]==="@"?ue:ct}),o.removeAttribute(d)}else d.startsWith(C)&&(p.push({type:6,index:a}),o.removeAttribute(d));if(Vt.test(o.tagName)){const d=o.textContent.split(C),b=d.length-1;if(b>0){o.textContent=st?st.emptyScript:"";for(let y=0;y<b;y++)o.append(d[y],X()),I.nextNode(),p.push({type:2,index:++a});o.append(d[b],X())}}}else if(o.nodeType===8)if(o.data===Lt)p.push({type:2,index:a});else{let d=-1;for(;(d=o.data.indexOf(C,d+1))!==-1;)p.push({type:7,index:a}),d+=C.length-1}a++}}static createElement(t,i){const s=B.createElement("template");return s.innerHTML=t,s}}function U(e,t,i=e,s){if(t===F)return t;let o=s!==void 0?i._$Co?.[s]:i._$Cl;const a=Y(t)?void 0:t._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),a===void 0?o=void 0:(o=new a(e),o._$AT(e,i,s)),s!==void 0?(i._$Co??=[])[s]=o:i._$Cl=o),o!==void 0&&(t=U(e,o._$AS(e,t.values),o,s)),t}class ce{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,o=(t?.creationScope??B).importNode(i,!0);I.currentNode=o;let a=I.nextNode(),r=0,n=0,p=s[0];for(;p!==void 0;){if(r===p.index){let h;p.type===2?h=new tt(a,a.nextSibling,this,t):p.type===1?h=new p.ctor(a,p.name,p.strings,this,t):p.type===6&&(h=new xe(a,this,t)),this._$AV.push(h),p=s[++n]}r!==p?.index&&(a=I.nextNode(),r++)}return I.currentNode=B,o}p(t){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,o){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=U(this,t,i),Y(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==F&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):pe(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&Y(this._$AH)?this._$AA.nextSibling.data=t:this.T(B.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=J.createElement(qt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(i);else{const a=new ce(o,this),r=a.u(this.options);a.p(i),this.T(r),this._$AH=a}}_$AC(t){let i=Ht.get(t.strings);return i===void 0&&Ht.set(t.strings,i=new J(t)),i}k(t){St(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,o=0;for(const a of t)o===i.length?i.push(s=new tt(this.O(X()),this.O(X()),this,this.options)):s=i[o],s._$AI(a),o++;o<i.length&&(this._$AR(s&&s._$AB.nextSibling,o),i.length=o)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const s=zt(t).nextSibling;zt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class ct{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,o,a){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=i,this._$AM=o,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=f}_$AI(t,i=this,s,o){const a=this.strings;let r=!1;if(a===void 0)t=U(this,t,i,0),r=!Y(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const n=t;let p,h;for(t=a[0],p=0;p<a.length-1;p++)h=U(this,n[s+p],i,p),h===F&&(h=this._$AH[p]),r||=!Y(h)||h!==this._$AH[p],h===f?t=f:t!==f&&(t+=(h??"")+a[p+1]),this._$AH[p]=h}r&&!o&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class he extends ct{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}}class ge extends ct{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}}class ue extends ct{constructor(t,i,s,o,a){super(t,i,s,o,a),this.type=5}_$AI(t,i=this){if((t=U(this,t,i,0)??f)===F)return;const s=this._$AH,o=t===f&&s!==f||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==f&&(s===f||o);o&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class xe{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){U(this,t)}}const be=kt.litHtmlPolyfillSupport;be?.(J,tt),(kt.litHtmlVersions??=[]).push("3.3.3");const fe=(e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(o===void 0){const a=i?.renderBefore??null;s._$litPart$=o=new tt(t.insertBefore(X(),a),a,void 0,i??{})}return o._$AI(e),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const At=globalThis;class x extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=fe(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}x._$litElement$=!0,x.finalized=!0,At.litElementHydrateSupport?.({LitElement:x});const ve=At.litElementPolyfillSupport;ve?.({LitElement:x});(At.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m=e=>(t,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const me={attribute:!0,type:String,converter:ot,reflect:!1,hasChanged:$t},ye=(e=me,t,i)=>{const{kind:s,metadata:o}=i;let a=globalThis.litPropertyMetadata.get(o);if(a===void 0&&globalThis.litPropertyMetadata.set(o,a=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),a.set(i.name,e),s==="accessor"){const{name:r}=i;return{set(n){const p=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,p,e,!0,n)},init(n){return n!==void 0&&this.C(r,void 0,e,n),n}}}if(s==="setter"){const{name:r}=i;return function(n){const p=this[r];t.call(this,n),this.requestUpdate(r,p,e,!0,n)}}throw Error("Unsupported decorator location: "+s)};function l(e){return(t,i)=>typeof i=="object"?ye(e,t,i):((s,o,a)=>{const r=o.hasOwnProperty(a);return o.constructor.createProperty(a,s),r?Object.getOwnPropertyDescriptor(o,a):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function H(e){return l({...e,state:!0,attribute:!1})}const u={drift:{key:"drift",rest:-.8,onEnd:!1,z:1,slug:"beat-mapper",title:"BEAT MAPPER",sub:"Started as a live pad-flasher and got rebuilt around a harder problem: classifying a performer’s own kick, snare, and hat relative to each other instead of guessing fixed frequencies that never held across voices or mics. A self-calibrating noise floor and root-cause debugging against real takes took it from spurious hits to 90% confidence — reskinned as a printed field manual, seismograph and all.",year:"2026",role:"Direction · build",stack:"Meyda · Web Audio",run:"0:04:12",kicker:"BEATBOX TO PAD",bg:"#f2f2f2",fg:"#111",strip:"#c62828",strip2:"#7f1d1d",embedTag:"beat-mapper-embed"},pixel:{key:"pixel",rest:1.2,onEnd:!1,z:1,slug:"chroma-chords",title:"CHROMA CHORDS",sub:"Began life as Chord Voyager, a maritime-themed modular studio gated behind Google sign-in. Rebuilt from the ground up into a three-tap Seed → Loop → Swap flow, then taught to read plain-language mood through Claude — constrained, validated, and hardened behind an authenticated proxy so a free-text vibe becomes a real, idiomatic progression in one request.",year:"2026",role:"Direction · build",stack:"Tone.js · Claude",run:"0:02:48",kicker:"CHORD PROGRESSIONS",bg:"#f6d000",fg:"#111",strip:"#e91e8c",strip2:"#7e57c2",embedTag:"chroma-chords-embed"},chord:{key:"chord",rest:-.5,onEnd:!1,z:1,slug:"circuit-chords",title:"CIRCUIT CHORDS",sub:"What started as a simple chord-to-pad mapper for the Novation Circuit grew into a full WebMIDI instrument: SysEx patch dumps in and out, a dual light/dark theme matching Circuit Tracks and Circuit Rhythm hardware, and a componentized architecture built to keep growing without buckling under its own state.",year:"2026",role:"Design · build",stack:"Tonal.js · WebMIDI",run:"0:03:30",kicker:"PAD GRID MAPPER",bg:"#f4efdd",fg:"#111",strip:"#d9a441",strip2:"#b8860b",embedTag:"circuit-chords-embed"},echo:{key:"echo",rest:-13,onEnd:!0,z:3,slug:"hypersyn-chord-helper",title:"HYPERSYN HELPER",sub:"A single-file hex converter, hand-modularized into typed, tested TypeScript as it grew — then reimagined entirely as a CRT boot terminal: command-line input, scanline flicker, eight switchable color themes, and voicings you cycle by tapping the badge itself, on desktop or thumb alike.",year:"2026",role:"Direction · build",stack:"Tonal.js · Web Audio",run:"0:05:06",kicker:"CHORD → HEX",bg:"#141414",fg:"#eee",strip:"#43a047",strip2:"#1b5e20",embedTag:"hypersyn-embed"},scene:{key:"scene",rest:-13,onEnd:!0,z:2,slug:"j6-companion",title:"J-6 COMPANION",sub:"Started as a two-pane preset browser for the Roland J-6, rebuilt as a skeuomorphic synth faceplate, then expanded across three linked data domains — presets, chord sets, and arpeggiator styles — backed by an RFC-driven relational dataset and shipped installable as a PWA for use at the instrument, offline.",year:"2026",role:"Direction · build",stack:"Lit · PWA",run:"0:06:20",kicker:"SYNTH COMPANION",bg:"#1a3fa0",fg:"#fff",strip:"#1e88e5",strip2:"#0d3fa0",embedTag:"j6-companion-embed"}};class we{constructor(){this.ctx=null,this.muted=!1}initCtx(){if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t)}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}setMuted(t){this.muted=t}isMuted(){return this.muted}playClick(){if(this.muted||(this.initCtx(),!this.ctx))return;const t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(800,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(120,this.ctx.currentTime+.04),i.gain.setValueAtTime(.3,this.ctx.currentTime),i.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.04),t.connect(i),i.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.04)}playSleeveSlide(){if(this.muted||(this.initCtx(),!this.ctx))return;const t=this.ctx.sampleRate*.3,i=this.ctx.createBuffer(1,t,this.ctx.sampleRate),s=i.getChannelData(0);for(let n=0;n<t;n++)s[n]=Math.random()*2-1;const o=this.ctx.createBufferSource();o.buffer=i;const a=this.ctx.createBiquadFilter();a.type="bandpass",a.frequency.setValueAtTime(400,this.ctx.currentTime),a.frequency.exponentialRampToValueAtTime(1200,this.ctx.currentTime+.25),a.Q.setValueAtTime(2,this.ctx.currentTime);const r=this.ctx.createGain();r.gain.setValueAtTime(.01,this.ctx.currentTime),r.gain.linearRampToValueAtTime(.18,this.ctx.currentTime+.12),r.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.3),o.connect(a),a.connect(r),r.connect(this.ctx.destination),o.start()}playDeckThunk(){if(this.muted||(this.initCtx(),!this.ctx))return;const t=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sine",i.frequency.setValueAtTime(160,t),i.frequency.exponentialRampToValueAtTime(35,t+.12),s.gain.setValueAtTime(.5,t),s.gain.exponentialRampToValueAtTime(.001,t+.14),i.connect(s),s.connect(this.ctx.destination),i.start(t),i.stop(t+.14);const o=this.ctx.createOscillator(),a=this.ctx.createGain();o.type="square",o.frequency.setValueAtTime(950,t+.03),o.frequency.exponentialRampToValueAtTime(220,t+.08),a.gain.setValueAtTime(0,t),a.gain.setValueAtTime(.25,t+.03),a.gain.exponentialRampToValueAtTime(.001,t+.09),o.connect(a),a.connect(this.ctx.destination),o.start(t+.03),o.stop(t+.09)}playStaticCrackle(t=90){if(this.muted||(this.initCtx(),!this.ctx))return;const i=t/1e3,s=Math.floor(this.ctx.sampleRate*i),o=this.ctx.createBuffer(1,s,this.ctx.sampleRate),a=o.getChannelData(0);for(let p=0;p<s;p++)a[p]=(Math.random()*2-1)*(Math.random()>.4?1:.1);const r=this.ctx.createBufferSource();r.buffer=o;const n=this.ctx.createGain();n.gain.setValueAtTime(.2,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+i),r.connect(n),n.connect(this.ctx.destination),r.start()}playCrtHum(){if(this.muted||(this.initCtx(),!this.ctx))return;const t=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sine",i.frequency.setValueAtTime(12e3,t),s.gain.setValueAtTime(.04,t),s.gain.exponentialRampToValueAtTime(.005,t+.4),i.connect(s),s.connect(this.ctx.destination),i.start(t),i.stop(t+.4);const o=this.ctx.createOscillator(),a=this.ctx.createGain();o.type="triangle",o.frequency.setValueAtTime(120,t),o.frequency.exponentialRampToValueAtTime(50,t+.2),a.gain.setValueAtTime(.3,t),a.gain.exponentialRampToValueAtTime(.001,t+.2),o.connect(a),a.connect(this.ctx.destination),o.start(t),o.stop(t+.2)}playEjectPop(){if(this.muted||(this.initCtx(),!this.ctx))return;const t=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sawtooth",i.frequency.setValueAtTime(450,t),i.frequency.exponentialRampToValueAtTime(80,t+.08),s.gain.setValueAtTime(.35,t),s.gain.exponentialRampToValueAtTime(.001,t+.08),i.connect(s),s.connect(this.ctx.destination),i.start(t),i.stop(t+.08)}}const $=new we,vt="cubic-bezier(.23,1,.32,1)";class $e{constructor(t){this.activeKey=null,this.infoMode=null,this.stageState="idle",this.flightTransform="none",this.flightDur=220,this.flightEase=vt,this.currentShot="none",this.showFlash=!1,this.camOn=!1,this.camScale=1.6,this.camDur=0,this.camOrigin="735px 307px",this.shotADur=1300,this.shotBDur=1250,this.flashDur=130,this.dollyDur=420,this.readDur=620,this.camPct=174,this.activeHold=null,this.scrubVal=0,this._t=[],(this.host=t).addController(this)}hostDisconnected(){this.clear()}clear(){this._t.forEach(t=>clearTimeout(t)),this._t=[]}at(t,i){const s=window.setTimeout(()=>{i(),this.host.requestUpdate()},t);this._t.push(s)}setStateIdle(){this.activeKey=null,this.infoMode=null,this.stageState="idle",this.flightTransform="none",this.currentShot="none",this.camOn=!1,this.host.requestUpdate()}openInfo(t,i){this.clear(),$.playClick(),this.infoMode=t,i&&(this.camOrigin=i),this.camOn=!0,this.camScale=1.6,this.camDur=400,this.stageState="play",history.pushState({p:t},"","#/"+t),this.host.requestUpdate()}switchInfoTab(t){this.infoMode!==t&&($.playClick(),this.infoMode=t,history.pushState({p:t},"","#/"+t),this.host.requestUpdate())}closeInfo(){this.infoMode&&(this.clear(),$.playClick(),this.infoMode=null,location.hash&&location.hash!=="#/"&&history.pushState({},"","#/"),this.activeKey?this.stageState="playWipe":(this.camOn=!1,this.camDur=380,this.stageState="idle"),this.host.requestUpdate())}pick(t,i,s,o){if(this.currentShot!=="none"){this.skip();return}if(!["lift","fly","insert","settle","ejectCollapse","ejectCam","pop","home"].includes(this.stageState)){if(this.stageState==="read"){this.toPlay();return}if(this.clear(),$.playClick(),history.pushState({p:u[t].slug},"","#/"+u[t].slug),window.matchMedia("(prefers-reduced-motion: reduce)").matches){this.activeKey=t,this.stageState="playWipe",this.flightTransform=i,this.flightDur=0,this.camOn=!0,this.camScale=1.6,this.camDur=0,this.host.requestUpdate();return}o?this.mobileCut(t):this.cut(t,i,s),this.host.requestUpdate()}}cut(t,i,s){const{shotADur:o,shotBDur:a,flashDur:r,dollyDur:n,readDur:p,camPct:h}=this,g=o+200,d=g+a+150,b=d+r+n+p;this.activeKey=t,this.stageState="read",this.flightTransform=i,this.flightDur=0,this.flightEase=vt,this.camOrigin=s,this.currentShot="A",this.showFlash=!0,this.camOn=!0,this.camScale=h/100,this.camDur=0,this.activeHold=null,this.scrubVal=0,$.playSleeveSlide(),this.at(r,()=>{this.showFlash=!1}),this.at(g,()=>{this.currentShot="B",this.showFlash=!0,$.playDeckThunk()}),this.at(g+r,()=>{this.showFlash=!1}),this.at(d,()=>{this.currentShot="none",this.showFlash=!0,$.playCrtHum()}),this.at(d+r,()=>{this.showFlash=!1,this.camScale=1.6,this.camDur=n}),this.at(b,()=>{this.stageState="play"}),this.at(b+260,()=>{this.stageState="playWipe"})}skip(){this.clear(),$.playClick(),this.currentShot="none",this.showFlash=!0,this.camOn=!0,this.camScale=1.6,this.camDur=0,this.stageState="play",this.host.requestUpdate(),this.at(90,()=>{this.showFlash=!1}),this.at(160,()=>{this.stageState="playWipe"})}toPlay(){this.clear(),this.stageState="play",this.camOn=!0,this.camScale=1.6,this.camDur=560,this.host.requestUpdate(),this.at(560,()=>{this.stageState="playWipe"})}jump(t,i,s){this.clear(),this.activeKey=t,this.stageState="playWipe",this.flightTransform=i,this.flightDur=0,this.camOrigin=s,this.camOn=!0,this.camScale=1.6,this.host.requestUpdate()}eject(t){if(this.infoMode){this.closeInfo();return}if(!this.activeKey)return;if(this.clear(),$.playClick(),$.playEjectPop(),location.hash&&location.hash!=="#/"&&history.pushState({},"","#/"),window.matchMedia("(prefers-reduced-motion: reduce)").matches){this.setStateIdle();return}if(t){this.mobileEject(),this.host.requestUpdate();return}const i=this.flashDur,s=Math.round(this.shotBDur*.72);this.stageState="ejectCollapse",this.activeHold=null,this.at(200,()=>{this.currentShot="Be",this.showFlash=!0}),this.at(200+i,()=>{this.showFlash=!1}),this.at(200+s+60,()=>{this.currentShot="none",this.showFlash=!0,this.camOn=!1,this.camDur=0,this.flightTransform="none"}),this.at(200+s+60+i,()=>{this.showFlash=!1,this.setStateIdle()}),this.host.requestUpdate()}mobileCut(t){const i=this.flashDur,s=this.shotBDur;this.activeKey=t,this.stageState="read",this.currentShot="B",this.showFlash=!0,this.activeHold=null,this.scrubVal=0,$.playDeckThunk(),this.at(i,()=>{this.showFlash=!1}),this.at(s+100,()=>{this.currentShot="none",this.showFlash=!0}),this.at(s+100+i,()=>{this.showFlash=!1,this.stageState="play"}),this.at(s+100+i+260,()=>{this.stageState="playWipe"})}mobileEject(){const t=this.flashDur,i=Math.round(this.shotBDur*.72);this.stageState="ejectCollapse",this.activeHold=null,this.currentShot="Be",this.showFlash=!0,this.at(t,()=>{this.showFlash=!1}),this.at(i+60,()=>{this.currentShot="none",this.showFlash=!0}),this.at(i+60+t,()=>{this.showFlash=!1,this.setStateIdle()})}cancel(){this.clear(),this.stageState="home",this.flightTransform="none",this.flightDur=220,this.flightEase=vt,this.host.requestUpdate(),this.at(220,()=>{this.setStateIdle()})}handleHold(t,i,s){this.clear();const o=this.activeKey||"echo";if(t==="idle"){this.activeHold=null,this.scrubVal=0,this.currentShot="none",this.showFlash=!1,this.activeKey=null,this.stageState="idle",this.flightTransform="none",this.camOn=!1,this.host.requestUpdate();return}if(t==="play"){this.activeHold=null,this.scrubVal=0,this.currentShot="none",this.showFlash=!1,this.activeKey=o,this.stageState="playWipe",this.flightTransform=i,this.camOrigin=s,this.camOn=!0,this.camScale=1.6,this.host.requestUpdate();return}this.activeHold=t,this.scrubVal=0,this.currentShot=t,this.showFlash=!1,this.activeKey=o,this.stageState="read",this.flightTransform=i,this.camOrigin=s,this.camOn=!0,this.camScale=this.camPct/100,this.host.requestUpdate()}handleParamChange(t,i){t==="shotADur"?this.shotADur=i:t==="shotBDur"?this.shotBDur=i:t==="flashDur"?this.flashDur=i:t==="dollyDur"?this.dollyDur=i:t==="readDur"?this.readDur=i:t==="camPct"?this.camPct=i:t==="scrub"&&(this.scrubVal=i),this.host.requestUpdate()}}var ke=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,z=(e,t,i,s)=>{for(var o=s>1?void 0:s?Se(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&ke(t,i,o),o};let S=class extends x{constructor(){super(...arguments),this.activeKey=null,this.stage="idle",this.sceneOp=1,this.flightTransform="none",this.flightDur=0,this.flightEase="cubic-bezier(.23,1,.32,1)",this.flightFx="drop-shadow(0 2px 4px rgba(42,38,33,.12))"}pick(e){this.dispatchEvent(new CustomEvent("pick-tape",{detail:{key:e}}))}render(){const e=this.activeKey,t=this.stage,i=t!=="idle"&&t!=="home",s=t==="play"||t==="playWipe",o=s||t==="read"||t==="ejectCollapse"?"none":"auto",a=d=>{d[0].toUpperCase()+d.slice(1);const b=e===d,y=i?b?s?0:1:s?.18:.35:1,E=i&&!b?s?"blur(6px)":"blur(3px)":"blur(0px)",xt=b?this.flightTransform:"none",bt=b?40:u[d].z;return{op:y,fx:E,tf:xt,z:bt}},r=a("drift"),n=a("pixel"),p=a("chord"),h=a("echo"),g=a("scene");return c`
      <div style="position:relative; width:100%; height:100%; pointer-events:${o}">
        <!-- Shadows -->
        <div style="position:absolute; left:-4px; bottom:-4px; width:222px; height:8px; background:rgba(42,38,33,.18); filter:blur(5px); border-radius:50%; opacity:${this.sceneOp}; transition:opacity 260ms cubic-bezier(.23,1,.32,1)"></div>
        <div style="position:absolute; left:226px; bottom:-4px; width:116px; height:8px; background:rgba(42,38,33,.2); filter:blur(5px); border-radius:50%; opacity:${this.sceneOp}; transition:opacity 260ms cubic-bezier(.23,1,.32,1)"></div>

        <!-- DRIFT Tape -->
        <div data-tape="drift" style="position:absolute; left:8px; bottom:0; z-index:${r.z}; opacity:${r.op}; filter:${r.fx}; transition:opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)">
          <div data-flight style="transform:${r.tf}; filter:${this.flightFx}; transition:transform ${this.flightDur}ms ${this.flightEase}, filter 300ms cubic-bezier(.23,1,.32,1); will-change:transform">
            <div style="transform:rotate(-.8deg)">
              <div @click=${()=>this.pick("drift")} class="tape-item" style="width:200px; height:35px; position:relative; border-radius:4px 4px 2px 2px; background:#262626; box-shadow:0 2px 7px rgba(42,38,33,.2); overflow:hidden">
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
              <div @click=${()=>this.pick("pixel")} class="tape-item" style="width:200px; height:35px; position:relative; border-radius:4px 4px 2px 2px; background:#262626; box-shadow:0 2px 7px rgba(42,38,33,.2); overflow:hidden">
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
              <div @click=${()=>this.pick("chord")} class="tape-item" style="width:200px; height:35px; position:relative; border-radius:4px 4px 2px 2px; background:#262626; box-shadow:0 2px 7px rgba(42,38,33,.2); overflow:hidden">
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
              <div @click=${()=>this.pick("echo")} class="tape-item" style="width:35px; height:200px; position:relative; border-radius:2px 2px 4px 4px; background:#262626; box-shadow:0 3px 10px rgba(42,38,33,.2); overflow:hidden">
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
              <div @click=${()=>this.pick("scene")} class="tape-item" style="width:35px; height:200px; position:relative; border-radius:2px 2px 4px 4px; background:#262626; box-shadow:0 3px 10px rgba(42,38,33,.2); overflow:hidden">
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
    `}};S.styles=v`
    :host {
      display: block;
      position: absolute;
      left: 88px;
      bottom: 56px;
      width: 560px;
      height: 210px;
      z-index: 5;
    }

    .tape-item {
      cursor: pointer;
      transition: transform 160ms cubic-bezier(.23,1,.32,1);
    }

    .tape-item:active {
      transform: scale(0.97);
    }
  `;z([l({type:String})],S.prototype,"activeKey",2);z([l({type:String})],S.prototype,"stage",2);z([l({type:Number})],S.prototype,"sceneOp",2);z([l({type:String})],S.prototype,"flightTransform",2);z([l({type:Number})],S.prototype,"flightDur",2);z([l({type:String})],S.prototype,"flightEase",2);z([l({type:String})],S.prototype,"flightFx",2);S=z([m("tape-shelf")],S);var Ae=Object.defineProperty,_e=Object.getOwnPropertyDescriptor,ht=(e,t,i,s)=>{for(var o=s>1?void 0:s?_e(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&Ae(t,i,o),o};let L=class extends x{constructor(){super(...arguments),this.setOp=.75,this.setFx="blur(5px)",this.isPlaying=!1}onEject(e){e.stopPropagation(),this.dispatchEvent(new CustomEvent("eject-click"))}render(){const e=this.isPlaying?"auto":"none";return c`
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
              style="flex:1; background:linear-gradient(180deg,#2c2c2e,#171718); border-radius:4px; pointer-events:${e}; cursor:pointer; position:relative; transition:transform 90ms cubic-bezier(.23,1,.32,1)"
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
    `}};L.styles=v`
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
  `;ht([l({type:Number})],L.prototype,"setOp",2);ht([l({type:String})],L.prototype,"setFx",2);ht([l({type:Boolean})],L.prototype,"isPlaying",2);L=ht([m("vcr-player")],L);var Oe=Object.defineProperty,Pe=Object.getOwnPropertyDescriptor,M=(e,t,i,s)=>{for(var o=s>1?void 0:s?Pe(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&Oe(t,i,o),o};let A=class extends x{constructor(){super(...arguments),this.activeKey=null,this.infoMode=null,this.isPlaying=!1,this.isReading=!1,this.isPlayWipe=!1,this.setOp=.75,this.setFx="blur(5px)"}render(){const e=this.isPlaying||this.isReading||!!this.infoMode;return c`
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
              @click=${t=>t.stopPropagation()}
              style="position:absolute; left:24px; right:24px; top:22px; bottom:22px; background:radial-gradient(ellipse at 50% 42%,#c4c0d4,#aca8c0 70%,#928ea6); border-radius:38px 38px 34px 34px; overflow:hidden; pointer-events:${e?"auto":"none"}"
            >
              <!-- Active screen layer with subtle phosphor flicker -->
              <div style="position:absolute; inset:0; background:#0a0a0c; border-radius:38px 38px 34px 34px; opacity:${e?1:0}; transition:opacity 200ms linear; animation:crtPhosphorMicroFlicker 0.12s infinite alternate">
                <!-- App rendered at 800×643 emulated, scaled to fit the ~296×238px glass area -->
                <div style="position:absolute; left:0; top:0; width:800px; height:643px; transform:scale(.37); transform-origin:top left; clip-path:${this.isPlayWipe||this.infoMode?"inset(0 0 0 0)":"inset(0 0 100% 0)"}; transition:clip-path 420ms cubic-bezier(.23,1,.32,1)">
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
  `;M([l({type:String})],A.prototype,"activeKey",2);M([l({type:String})],A.prototype,"infoMode",2);M([l({type:Boolean})],A.prototype,"isPlaying",2);M([l({type:Boolean})],A.prototype,"isReading",2);M([l({type:Boolean})],A.prototype,"isPlayWipe",2);M([l({type:Number})],A.prototype,"setOp",2);M([l({type:String})],A.prototype,"setFx",2);A=M([m("crt-display")],A);var Ee=Object.defineProperty,Ce=Object.getOwnPropertyDescriptor,P=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ce(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&Ee(t,i,o),o};let k=class extends x{constructor(){super(...arguments),this.activeKey=null,this.currentShot="none",this.showFlash=!1,this.shotADur=1300,this.shotBDur=1250,this.flashDur=130,this.isPaused=!1,this.scrubVal=0}onSkip(){this.dispatchEvent(new CustomEvent("skip-cutscene"))}render(){const e=this.activeKey?u[this.activeKey]:u.echo,t=this.isPaused?"paused":"running",i=this.currentShot==="Be"?Math.round(this.shotBDur*.72):this.shotBDur,s=this.currentShot==="A"?this.shotADur:i,o=this.isPaused?"-"+Math.round(this.scrubVal/1e3*s)+"ms":"0ms",a=this.currentShot==="A"?"shotASlide":"none",r=this.currentShot==="A"?"shotAPush":"none",n=this.currentShot==="B"?"shotBInsert":this.currentShot==="Be"?"shotBEject":"none",p=this.showFlash?"cutFlash":"none";return c`
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

        <div style="position:absolute; left:150px; top:96px; width:700px; height:500px; transform-origin:26% 50%; animation-name:${r}; animation-duration:${this.shotADur}ms; animation-timing-function:cubic-bezier(.32,.72,0,1); animation-fill-mode:both; animation-delay:${o}; animation-play-state:${t}">
          <div style="position:absolute; left:20px; top:30px; width:420px; height:470px; background:rgba(42,38,33,.2); filter:blur(26px); border-radius:14px"></div>

          <!-- Sliding Tape Wrapper -->
          <div style="position:absolute; left:34px; top:8px; width:258px; height:480px; animation-name:${a}; animation-duration:${this.shotADur}ms; animation-timing-function:cubic-bezier(.32,.72,0,1); animation-fill-mode:both; animation-delay:${o}; animation-play-state:${t}">
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
                  <div style="position:absolute; top:0; left:0; right:0; height:20px; background:${e.strip}"></div>
                  <div style="position:absolute; left:6px; right:6px; top:28px; text-align:center; font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:10px; line-height:1.1; color:#2a2621; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden">${e.title}</div>
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
              <div style="width:96px; height:146px; position:relative; border-radius:6px 6px 0 0; background:${e.bg}; box-shadow:0 2px 6px rgba(0,0,0,.15); overflow:hidden">
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
          <div style="margin-top:10px; font-size:20px; font-weight:600; letter-spacing:.02em">${e.title}</div>
          <div style="margin-top:7px; font-size:11px; letter-spacing:.14em; color:rgba(42,38,33,.55)">${e.kicker}</div>
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
          <div style="position:absolute; left:243px; top:206px; width:620px; height:343px; transform-origin:50% 0%; transform-style:preserve-3d; animation-name:${n}; animation-duration:${i}ms; animation-timing-function:linear; animation-fill-mode:both; animation-delay:${o}; animation-play-state:${t}">
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
                  <div style="position:absolute; top:0; left:0; right:0; height:20px; background:${e.strip}"></div>
                  <div style="position:absolute; left:6px; right:6px; top:28px; text-align:center; font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:10px; line-height:1.1; color:#2a2621; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden">${e.title}</div>
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
              <div style="position:absolute; left:0; top:0; bottom:0; width:26px; background:${e.strip}; border-radius:0 0 0 7px"></div>
              <div style="position:absolute; left:84px; right:84px; top:18px; bottom:14px; background:#f4f1e6; border-radius:2px; display:flex; align-items:center; gap:16px; padding:0 20px; box-shadow:inset 0 2px 5px rgba(0,0,0,.15)">
                <span style="font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:22px; letter-spacing:.05em; white-space:nowrap; color:#2a2621">${e.title}</span>
                <span style="font-family:'IBM Plex Mono',monospace; font-size:14px; color:rgba(42,38,33,.5); letter-spacing:.05em; white-space:nowrap">${e.kicker}</span>
              </div>
              <div style="position:absolute; right:28px; top:30px; font-size:16px; font-style:italic; color:#777; font-family:Arial,sans-serif; font-weight:bold">VHS</div>
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
          <div style="width:15px; height:15px; border-radius:50%; background:#c9a06a; animation-name:ledBlink; animation-duration:${i}ms; animation-timing-function:linear; animation-fill-mode:both; animation-play-state:${t}; animation-delay:140ms"></div>
          <div style="width:15px; height:15px; border-radius:50%; background:#7fb37a; animation-name:ledBlink; animation-duration:${i}ms; animation-timing-function:linear; animation-fill-mode:both; animation-play-state:${t}; animation-delay:${o}"></div>
        </div>
        <div style="position:absolute; left:-4000px; right:-4000px; bottom:0; height:20%; z-index:10; pointer-events:none; background:linear-gradient(180deg,rgba(30,20,10,0),rgba(30,20,10,.5))"></div>
      </div>
    `}};k.styles=v`
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
  `;P([l({type:String})],k.prototype,"activeKey",2);P([l({type:String})],k.prototype,"currentShot",2);P([l({type:Boolean})],k.prototype,"showFlash",2);P([l({type:Number})],k.prototype,"shotADur",2);P([l({type:Number})],k.prototype,"shotBDur",2);P([l({type:Number})],k.prototype,"flashDur",2);P([l({type:Boolean})],k.prototype,"isPaused",2);P([l({type:Number})],k.prototype,"scrubVal",2);k=P([m("cutscene-overlay")],k);var Te=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,Kt=(e,t,i,s)=>{for(var o=s>1?void 0:s?ze(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&Te(t,i,o),o};const Me="https://warmsynths.github.io/beat-mapper/app.js";let at=class extends x{constructor(){super(...arguments),this.loaded=customElements.get("app-root")!==void 0}async connectedCallback(){if(super.connectedCallback(),!this.loaded)try{await import(Me),this.loaded=!0}catch(e){console.error("Failed to load Beat Mapper component script:",e)}}render(){return this.loaded?c`<app-root style="display:block; width:100%; height:100%;"></app-root>`:c`<div style="padding:20px; color:#888; text-align:center; font-family:monospace; font-size:11px;">LOADING BEAT MAPPER...</div>`}};at.styles=v`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `;Kt([H()],at.prototype,"loaded",2);at=Kt([m("beat-mapper-embed")],at);var De=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,Gt=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ie(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&De(t,i,o),o};const Be="https://warmsynths.github.io/chroma-chords/app.js";let rt=class extends x{constructor(){super(...arguments),this.loaded=customElements.get("chroma-chords-app")!==void 0}async connectedCallback(){if(super.connectedCallback(),!this.loaded)try{await import(Be),this.loaded=!0}catch(e){console.error("Failed to load Chroma Chords component script:",e)}}render(){return this.loaded?c`<chroma-chords-app style="display:block; width:100%; height:100%;"></chroma-chords-app>`:c`<div style="padding:20px; color:#888; text-align:center; font-family:monospace; font-size:11px;">LOADING CHROMA CHORDS...</div>`}};rt.styles=v`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `;Gt([H()],rt.prototype,"loaded",2);rt=Gt([m("chroma-chords-embed")],rt);var Re=Object.defineProperty,He=Object.getOwnPropertyDescriptor,Wt=(e,t,i,s)=>{for(var o=s>1?void 0:s?He(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&Re(t,i,o),o};const je="https://warmsynths.github.io/circuit-chords/app.js";let nt=class extends x{constructor(){super(...arguments),this.loaded=customElements.get("circuit-chord-forge")!==void 0}async connectedCallback(){if(super.connectedCallback(),!this.loaded)try{await import(je),this.loaded=!0}catch(e){console.error("Failed to load Circuit Chords component script:",e)}}render(){return this.loaded?c`<circuit-chord-forge style="display:block; width:100%; height:100%;"></circuit-chord-forge>`:c`<div style="padding:20px; color:#888; text-align:center; font-family:monospace; font-size:11px;">LOADING CIRCUIT CHORDS...</div>`}};nt.styles=v`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `;Wt([H()],nt.prototype,"loaded",2);nt=Wt([m("circuit-chords-embed")],nt);var Ne=Object.getOwnPropertyDescriptor,Fe=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ne(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=r(o)||o);return o};let mt=class extends x{render(){return c`<iframe src="/hypersyn-chord-helper/index.html"></iframe>`}};mt.styles=v`
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
  `;mt=Fe([m("hypersyn-embed")],mt);var Ue=Object.defineProperty,Le=Object.getOwnPropertyDescriptor,Xt=(e,t,i,s)=>{for(var o=s>1?void 0:s?Le(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&Ue(t,i,o),o};const Ve="https://warmsynths.github.io/j6-companion/app.js";let pt=class extends x{constructor(){super(...arguments),this.loaded=customElements.get("j6-app")!==void 0}async connectedCallback(){if(super.connectedCallback(),!this.loaded)try{await import(Ve),this.loaded=!0}catch(e){console.error("Failed to load J-6 Companion component script:",e)}}render(){return this.loaded?c`<j6-app style="display:block; width:100%; height:100%;"></j6-app>`:c`<div style="padding:20px; color:#888; text-align:center; font-family:monospace; font-size:11px;">LOADING J-6 COMPANION...</div>`}};pt.styles=v`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  `;Xt([H()],pt.prototype,"loaded",2);pt=Xt([m("j6-companion-embed")],pt);var qe=Object.defineProperty,Ke=Object.getOwnPropertyDescriptor,_t=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ke(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&qe(t,i,o),o};let Q=class extends x{constructor(){super(...arguments),this.mode="about",this.isMobile=!1}selectTab(e){this.mode=e,this.dispatchEvent(new CustomEvent("switch-tab",{detail:{mode:e},bubbles:!0,composed:!0}))}render(){return c`
      <div class="nav-tabs">
        <span class="tab ${this.mode==="about"?"active":""}" @click=${()=>this.selectTab("about")}>ABOUT</span>
        <span class="tab ${this.mode==="contact"?"active":""}" @click=${()=>this.selectTab("contact")}>CONTACT</span>
      </div>

      <div class="divider"></div>

      <div class="content-area">
        ${this.mode==="about"?c`
              <div class="paragraph">
                I'm a developer using AI to build faster than I ever could alone — closing the gap between an idea and a working thing, built between everything else life asks for.
              </div>
              <div class="paragraph">
                Most of what's here started as something only I needed: a way to write chords without knowing theory, a companion for a synth that didn't have one, a tool to save me from doing something tedious by hand. I didn't set out to launch products. I set out to solve a problem I had, quickly, and see what happened.
              </div>
              <div class="paragraph">
                I sit at the intersection of design and development — technical enough to know what a good app needs under the hood, and increasingly serious about how it should look and feel. AI does the typing. I do the directing: the decisions about what to build, what to cut, and what actually makes something worth using.
              </div>
              <div class="paragraph">
                Everything you see here works. Try it.
              </div>
            `:c`
              <div class="contact-grid">
                <span class="contact-label">EMAIL</span>
                <span class="contact-value">
                  <a href="mailto:warmsynthsiloveyou@gmail.com">warmsynthsiloveyou@gmail.com</a>
                </span>

                <span class="contact-label">GITHUB</span>
                <span class="contact-value">
                  <a href="https://github.com/warmsynths/" target="_blank" rel="noopener">github.com/warmsynths/</a>
                </span>
              </div>
            `}
      </div>

      <div class="footer">
        ESC OR CLICK OUTSIDE THE SET TO CLOSE
      </div>
    `}};Q.styles=v`
    :host {
      display: block;
      width: 800px;
      height: 643px;
      background: #0a0a0c;
      color: #e8f0e2;
      font-family: 'IBM Plex Mono', monospace;
      box-sizing: border-box;
      padding: 38px 52px 28px;
      position: relative;
      user-select: text;
    }

    /* Mobile mode override */
    :host([isMobile]) {
      width: 100%;
      height: 100%;
      padding: 14px 16px 10px;
    }

    /* Desktop typography (for 800x643 canvas scaled down by 0.37) */
    .nav-tabs {
      display: flex;
      gap: 40px;
      font-size: 44px;
      font-weight: 600;
      letter-spacing: 0.16em;
      margin-bottom: 20px;
    }
    :host([isMobile]) .nav-tabs {
      gap: 20px;
      font-size: 15px;
      margin-bottom: 10px;
    }

    .tab {
      cursor: pointer;
      color: rgba(232, 240, 226, 0.35);
      transition: color 180ms ease, text-shadow 180ms ease, transform 160ms ease-out;
    }

    .tab:hover {
      color: rgba(232, 240, 226, 0.75);
    }

    .tab:active {
      transform: scale(0.97);
    }

    .tab.active {
      color: #e8f0e2;
      text-shadow: 0 0 10px rgba(180, 255, 190, 0.7), 0 0 20px rgba(180, 255, 190, 0.3);
    }

    .divider {
      width: 100%;
      height: 1px;
      background: rgba(232, 240, 226, 0.18);
      margin-bottom: 28px;
      box-shadow: 0 0 6px rgba(180, 255, 190, 0.2);
    }
    :host([isMobile]) .divider {
      margin-bottom: 12px;
    }

    .content-area {
      height: 420px;
      overflow-y: auto;
      padding-right: 16px;
      font-size: 30px;
      line-height: 1.55;
      letter-spacing: 0.03em;
      color: #e8f0e2;
      text-shadow: 0 0 5px rgba(180, 255, 190, 0.35);
    }
    :host([isMobile]) .content-area {
      height: calc(100% - 66px);
      padding-right: 8px;
      font-size: 11.5px;
      line-height: 1.5;
    }

    /* Custom retro scrollbar */
    .content-area::-webkit-scrollbar {
      width: 8px;
    }
    :host([isMobile]) .content-area::-webkit-scrollbar {
      width: 4px;
    }
    .content-area::-webkit-scrollbar-track {
      background: rgba(232, 240, 226, 0.06);
      border-radius: 4px;
    }
    .content-area::-webkit-scrollbar-thumb {
      background: rgba(180, 255, 190, 0.4);
      border-radius: 4px;
    }
    .content-area::-webkit-scrollbar-thumb:hover {
      background: rgba(180, 255, 190, 0.7);
    }

    .paragraph {
      margin-bottom: 26px;
    }
    :host([isMobile]) .paragraph {
      margin-bottom: 12px;
    }
    .paragraph:last-child {
      margin-bottom: 0;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 28px 36px;
      font-size: 30px;
      letter-spacing: 0.05em;
      margin-top: 10px;
    }
    :host([isMobile]) .contact-grid {
      grid-template-columns: 70px 1fr;
      gap: 12px 16px;
      font-size: 11.5px;
      margin-top: 4px;
    }

    .contact-label {
      color: rgba(232, 240, 226, 0.42);
      font-weight: 500;
    }

    .contact-value a {
      color: #e8f0e2;
      text-decoration: underline;
      text-decoration-color: rgba(180, 255, 190, 0.4);
      text-underline-offset: 6px;
      transition: text-shadow 150ms ease, color 150ms ease;
      word-break: break-all;
    }
    :host([isMobile]) .contact-value a {
      text-underline-offset: 3px;
    }

    .contact-value a:hover {
      color: #ffffff;
      text-shadow: 0 0 12px rgba(180, 255, 190, 0.8);
    }

    .footer {
      position: absolute;
      bottom: 22px;
      left: 52px;
      right: 52px;
      text-align: center;
      font-size: 22px;
      letter-spacing: 0.16em;
      color: rgba(232, 240, 226, 0.4);
      text-shadow: 0 0 4px rgba(180, 255, 190, 0.2);
    }
    :host([isMobile]) .footer {
      display: none;
    }
  `;_t([l({type:String})],Q.prototype,"mode",2);_t([l({type:Boolean,reflect:!0})],Q.prototype,"isMobile",2);Q=_t([m("crt-info-view")],Q);var Ge=Object.defineProperty,We=Object.getOwnPropertyDescriptor,gt=(e,t,i,s)=>{for(var o=s>1?void 0:s?We(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&Ge(t,i,o),o};let V=class extends x{constructor(){super(...arguments),this.activeKey=null,this.infoMode=null,this.isMobile=!1}render(){if(this.infoMode)return c`<crt-info-view .mode=${this.infoMode} ?isMobile=${this.isMobile}></crt-info-view>`;switch(this.activeKey){case"drift":return c`<beat-mapper-embed></beat-mapper-embed>`;case"pixel":return c`<chroma-chords-embed></chroma-chords-embed>`;case"chord":return c`<circuit-chords-embed></circuit-chords-embed>`;case"echo":return c`<hypersyn-embed></hypersyn-embed>`;case"scene":return c`<j6-companion-embed></j6-companion-embed>`;default:return c``}}};V.styles=v`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background: #14141a;
    }

    crt-info-view, beat-mapper-embed, chroma-chords-embed, circuit-chords-embed, hypersyn-embed, j6-companion-embed {
      display: block;
      width: 100%;
      height: 100%;
      transition: opacity 260ms ease-out;
    }

    @starting-style {
      crt-info-view, beat-mapper-embed, chroma-chords-embed, circuit-chords-embed, hypersyn-embed, j6-companion-embed {
        opacity: 0;
      }
    }
  `;gt([l({type:String})],V.prototype,"activeKey",2);gt([l({type:String})],V.prototype,"infoMode",2);gt([l({type:Boolean})],V.prototype,"isMobile",2);V=gt([m("tape-app-slot")],V);var Xe=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,j=(e,t,i,s)=>{for(var o=s>1?void 0:s?Ye(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&Xe(t,i,o),o};let O=class extends x{constructor(){super(...arguments),this.activeKey=null,this.stageState="idle",this.currentShot="none",this.flightTransform="none",this.stageScale=1,this._f=null}zoom(){const e=this.shadowRoot?.querySelector(".main-card");return(e?e.getBoundingClientRect().width/1100:1)*(this.director.camOn?this.director.camScale:1)}flip(e){const t=u[e],i=this.shadowRoot?.querySelector("tape-shelf"),s=this.shadowRoot?.querySelector("vcr-player"),o=i?.shadowRoot?.querySelector(`[data-tape="${e}"] [data-flight]`),a=s?.shadowRoot?.querySelector("[data-slot]");if(!o||!a)return this._f=null,"none";const r=this.zoom(),n=o.getBoundingClientRect(),p=a.getBoundingClientRect(),h=(p.left+p.width/2-n.left-n.width/2)/r,g=(p.top+p.height/2-n.top-n.height/2)/r,d=o.offsetWidth,b=o.offsetHeight,y=-t.rest+(t.onEnd?-90:0),E=t.onEnd?b:d,xt=t.onEnd?d:b,bt=Math.min(p.width/r/E,p.height/r/xt);return this._f={dx:h,dy:g,deg:y,s:bt},this.tf(1)}tf(e,t){const i=this._f;if(!i)return"none";const s=-14-96*Math.sin(Math.PI*e)*(e<1?1:0),o=i.dx*e,a=i.dy*e+s*(e<1?1:0),r=i.deg*(e<.6?e/.6:1)*(e===0?0:1),n=e===0?1.04:1.04+(i.s-1.04)*Math.pow(e,1.6);return`translate(${o.toFixed(1)}px,${a.toFixed(1)}px) rotate(${r.toFixed(2)}deg) scale(${n.toFixed(3)}) ${t||""}`}screenOrigin(){const e=this.shadowRoot?.querySelector(".main-card"),i=this.shadowRoot?.querySelector("crt-display")?.shadowRoot?.querySelector("[data-screen]");if(!e||!i)return"735px 307px";const s=this.zoom(),o=e.getBoundingClientRect(),a=i.getBoundingClientRect();return`${((a.left+a.width/2-o.left)/s).toFixed(0)}px ${((a.top+a.height/2-o.top)/s).toFixed(0)}px`}pick(e){this.director.pick(e,this.flip(e),this.screenOrigin(),!1)}eject(){this.director.infoMode?this.director.closeInfo():this.director.eject(!1)}openInfo(e){this.director.openInfo(e,this.screenOrigin())}render(){const e=this.director,t=e.activeKey,i=e.stageState,s=i!=="idle"&&i!=="home",o=i==="play"||i==="playWipe",a=i==="read",r=o||a||i==="ejectCollapse",n=t?u[t]:null;return c`
      <div class="desktop-wrap">
      <div class="main-card" style="transform: translate(-50%, -50%) scale(${this.stageScale})">
        <div
          class="camera-stage"
          style="transform: ${e.camOn?`scale(${e.camScale})`:"none"}; transform-origin: ${e.camOrigin}; transition: transform ${e.camDur}ms cubic-bezier(.32,.72,0,1)"
        >
          <!-- Background Scene -->
          <div 
            class="scene-bg" 
            @click=${()=>{e.infoMode?e.closeInfo():e.currentShot!=="none"?e.skip():o?this.eject():i!=="idle"&&e.cancel()}}
            style="position:absolute; inset:0; z-index:1; opacity: ${s||e.infoMode?o||e.infoMode?.18:.35:1}; filter: ${s||e.infoMode?o||e.infoMode?"blur(6px)":"blur(3px)":"blur(0px)"}; transition: opacity 260ms cubic-bezier(.23,1,.32,1), filter 260ms cubic-bezier(.23,1,.32,1)"
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
            <div style="position:absolute; right:48px; top:40px; font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.08em; color:rgba(42,38,33,.65); pointer-events:auto; z-index:10">
              <span 
                style="cursor:pointer; text-decoration:${e.infoMode==="about"?"underline":"none"}; opacity:${e.infoMode==="about"?1:.7}; transition:opacity 140ms" 
                @click=${p=>{p.stopPropagation(),this.openInfo("about")}}
              >ABOUT</span>
              &nbsp;·&nbsp;
              <span 
                style="cursor:pointer; text-decoration:${e.infoMode==="contact"?"underline":"none"}; opacity:${e.infoMode==="contact"?1:.7}; transition:opacity 140ms" 
                @click=${p=>{p.stopPropagation(),this.openInfo("contact")}}
              >CONTACT</span>
            </div>
            <div style="position:absolute; left:48px; top:184px; max-width:580px">
              <div style="font-family:Georgia,serif; font-size:66px; font-weight:400; line-height:70px; letter-spacing:-0.01em; color:#2a2621">Memories grow in the spaces between living.</div>
              <div style="margin-top:16px; font:14px/1.6 Inter,sans-serif; color:rgba(42,38,33,.55)">A web developer, using AI to catch up to my own imagination. Pick a tape to load one — eject to come back.</div>
            </div>
          </div>

          <!-- VCR Deck -->
          <vcr-player 
            .setOp=${r?1:s||e.infoMode?.9:.75}
            .setFx=${r?"blur(0px)":s||e.infoMode?"blur(2px)":"blur(5px)"}
            ?isPlaying=${o}
            @eject-click=${this.eject}
          ></vcr-player>

          <!-- CRT TV Display -->
          <crt-display
            .activeKey=${t}
            .infoMode=${e.infoMode}
            .setOp=${r||e.infoMode?1:s?.9:.75}
            .setFx=${r||e.infoMode?"blur(0px)":s?"blur(2px)":"blur(5px)"}
            ?isPlaying=${o||!!e.infoMode}
            ?isReading=${a}
            ?isPlayWipe=${i==="playWipe"||!!e.infoMode}
          >
            <tape-app-slot
              .activeKey=${t}
              .infoMode=${e.infoMode}
              @switch-tab=${p=>e.switchInfoTab(p.detail.mode)}
            ></tape-app-slot>
          </crt-display>

          <!-- Tape Shelf Stack -->
          <tape-shelf
            .activeKey=${t}
            .stage=${i}
            .sceneOp=${s?o?.18:.35:1}
            .flightTransform=${e.flightTransform}
            .flightDur=${e.flightDur}
            .flightEase=${e.flightEase}
            .flightFx=${["lift","fly","pop","home"].includes(i)?"drop-shadow(0 22px 20px rgba(42,38,33,.26))":"drop-shadow(0 2px 4px rgba(42,38,33,.12))"}
            @pick-tape=${p=>this.pick(p.detail.key)}
          ></tape-shelf>
        </div>

        <!-- Info Case Panel -->
        <div 
          style="position:absolute; left:44px; top:146px; width:352px; z-index:6; pointer-events:${o&&!e.infoMode?"auto":"none"}; opacity:${o&&!e.infoMode?1:0}; transform:${o&&!e.infoMode?"translateY(0)":"translateY(14px)"}; transition:opacity 380ms cubic-bezier(.23,1,.32,1), transform 380ms cubic-bezier(.23,1,.32,1)"
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
          .currentShot=${e.currentShot}
          ?showFlash=${e.showFlash}
          .shotADur=${e.shotADur}
          .shotBDur=${e.shotBDur}
          .flashDur=${e.flashDur}
          ?isPaused=${e.activeHold!==null}
          .scrubVal=${e.scrubVal}
          @skip-cutscene=${()=>e.skip()}
        ></cutscene-overlay>
      </div>
      </div>
    `}};O.styles=v`
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
  `;j([l({type:Object})],O.prototype,"director",2);j([l({type:String})],O.prototype,"activeKey",2);j([l({type:String})],O.prototype,"stageState",2);j([l({type:String})],O.prototype,"currentShot",2);j([l({type:String})],O.prototype,"flightTransform",2);j([l({type:Number})],O.prototype,"stageScale",2);O=j([m("desktop-layout")],O);var Je=Object.defineProperty,Qe=Object.getOwnPropertyDescriptor,Ot=(e,t,i,s)=>{for(var o=s>1?void 0:s?Qe(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&Je(t,i,o),o};const jt=["chord","scene","echo","pixel","drift"];let Z=class extends x{constructor(){super(...arguments),this.activeKey=null,this.phase="idle"}pick(e){this.dispatchEvent(new CustomEvent("pick-tape",{detail:{key:e}}))}render(){const e=this.phase!=="idle",t=this.activeKey,i=t?u[t]:null;return c`
      <div class="bg-floor"></div>

      <div class="header">
        <span>PORTFOLIO — DESIGN × CODE</span>
        <div style="font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.08em; color:rgba(42,38,33,.6); display:flex; gap:8px">
          <span class="nav-link" @click=${()=>this.dispatchEvent(new CustomEvent("open-info",{detail:{mode:"about"},bubbles:!0,composed:!0}))}>ABOUT</span>
          <span>·</span>
          <span class="nav-link" @click=${()=>this.dispatchEvent(new CustomEvent("open-info",{detail:{mode:"contact"},bubbles:!0,composed:!0}))}>CONTACT</span>
        </div>
      </div>

      <div class="copy-stack">
        <div class="grid">
          <div class="copy-layer" style="opacity:${e?0:1}; pointer-events:${e?"none":"auto"}">
            <h1>Memories grow in the spaces between living.</h1>
            <p>A web developer, using AI to catch up to my own imagination. Tap a tape to load one — eject to come back.</p>
          </div>
          <div class="copy-layer loading-copy" style="opacity:${e?1:0}; pointer-events:${e?"auto":"none"}">
            <div class="kicker">${this.phase==="ejecting"?"EJECTING":"LOADING"}</div>
            <div class="title">${i?i.title:""}</div>
            <div class="sub">${i?i.kicker:""}</div>
          </div>
        </div>
      </div>

      <div class="spacer">
        <div class="set" style="opacity:${e?1:.6}; filter:${e?"blur(0px)":"blur(4px)"}">
          <div class="set-inner">
            <vcr-player .setOp=${1} .setFx=${"blur(0px)"}></vcr-player>
            <crt-display .activeKey=${t} .setOp=${1} .setFx=${"blur(0px)"} ?isReading=${this.phase==="loading"}></crt-display>
          </div>
        </div>
      </div>

      <div class="shelf">
        <div class="shelf-label" style="opacity:${e?.3:1}">ON THE SHELF · 0${jt.length}</div>
        <div class="list">
          ${jt.map((s,o)=>{const a=u[s],r=e&&s===t;return c`
              <div class="tape-slot ${r?"collapsed":""}" style="animation-delay: ${o*60}ms">
                <button
                  class="tape"
                  data-tape=${s}
                  @click=${()=>this.pick(s)}
                  aria-label="Load ${a.title}"
                  style="filter:${e&&!r?"brightness(.55) blur(1px)":"none"}"
                >
                  <div class="strip" style="background:${a.strip2||a.strip}"></div>
                  <div class="label">
                    <span class="title">${a.title}</span>
                    <span class="kicker">${a.kicker}</span>
                  </div>
                  <div class="sheen"></div>
                  <div class="vhs">VHS</div>
                </button>
              </div>
            `})}
        </div>
      </div>
    `}};Z.styles=v`
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

    .nav-link {
      cursor: pointer;
      transition: opacity 160ms, transform 160ms ease-out;
      display: inline-block;
    }

    .nav-link:active {
      opacity: 0.6;
      transform: scale(0.97);
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
      font: 400 clamp(32px, 8vw, 56px) / 1.08 Georgia, serif;
      letter-spacing: -0.01em;
      color: #2a2621;
      max-width: 320px;
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
      animation: popIn 400ms cubic-bezier(.23,1,.32,1) both;
    }

    @keyframes popIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
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


  `;Ot([l({type:String})],Z.prototype,"activeKey",2);Ot([l({type:String})],Z.prototype,"phase",2);Z=Ot([m("mobile-shelf")],Z);var Ze=Object.defineProperty,ti=Object.getOwnPropertyDescriptor,Yt=(e,t,i,s)=>{for(var o=s>1?void 0:s?ti(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&Ze(t,i,o),o};let lt=class extends x{constructor(){super(...arguments),this.activeKey=null}eject(){this.dispatchEvent(new CustomEvent("eject-tape"))}render(){const e=this.activeKey?u[this.activeKey]:null;return c`
      <div class="deck">
        <div class="tv">
          <div class="bezel">
            <div class="screen">
              <div class="screen-inner">
                <div class="osd">
                  <span>▶ PLAY <span style="opacity:.7">CH 3</span></span>
                  <span>SP · ${e?e.run:"0:00:00"}</span>
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

      ${e?c`
        <div class="notes">
          <div class="kicker">NOW PLAYING · ${e.year}</div>
          <div class="title">${e.title}</div>
          <div class="sub">${e.sub}</div>
          <div class="grid">
            <span>ROLE</span><span>${e.role}</span>
            <span>BUILT WITH</span><span>${e.stack}</span>
            <span>CASE</span><span>/${e.slug}</span>
          </div>
        </div>
      `:""}

      <div class="return">SWIPE DOWN OR HIT ■ ▲ TO RETURN TO THE SHELF</div>
    `}};lt.styles=v`
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
  `;Yt([l({type:String})],lt.prototype,"activeKey",2);lt=Yt([m("mobile-playing")],lt);var ei=Object.defineProperty,ii=Object.getOwnPropertyDescriptor,K=(e,t,i,s)=>{for(var o=s>1?void 0:s?ii(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&ei(t,i,o),o};let T=class extends x{constructor(){super(...arguments),this.activeKey=null,this.currentShot="none",this.showFlash=!1,this.shotBDur=1250,this.flashDur=130}onSkip(){this.dispatchEvent(new CustomEvent("skip-cutscene"))}render(){if(this.currentShot==="none"&&!this.showFlash)return c``;const e=this.activeKey?u[this.activeKey]:u.echo,t=this.currentShot==="Be"?Math.round(this.shotBDur*.72):this.shotBDur,i=this.currentShot==="B"?"shotBInsertM":this.currentShot==="Be"?"shotBEjectM":"none",s=this.showFlash?"cutFlash":"none";return c`
      <!-- Flash Static -->
      <div
        style="position:absolute; inset:0; z-index:30; display:${this.showFlash?"block":"none"}; pointer-events:none; background:#d8d4c8; animation-name:${s}; animation-duration:${this.flashDur}ms; animation-timing-function:linear; animation-fill-mode:both"
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
          <div style="position:absolute; left:50%; margin-left:-162px; top:262px; width:324px; height:180px; transform-style:preserve-3d; animation-name:${i}; animation-duration:${t}ms; animation-timing-function:linear; animation-fill-mode:both">
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
                  <div style="position:absolute; top:0; left:0; right:0; height:20px; background:${e.strip}"></div>
                  <div style="position:absolute; left:6px; right:6px; top:28px; text-align:center; font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:10px; line-height:1.1; color:#2a2621; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden">${e.title}</div>
                  <div style="position:absolute; left:6px; right:6px; bottom:10px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:18px; height:1px; background:#c9c9c9"></div>
                  <div style="position:absolute; left:6px; right:6px; bottom:26px; height:1px; background:#c9c9c9"></div>
                </div>
              </div>
            </div>

            <!-- Front panel (perspective-rotated below tape) -->
            <div style="position:absolute; left:0; top:180px; width:324px; height:44px; transform-origin:50% 0%; transform:rotateX(72deg); background:linear-gradient(180deg,#242427 0 3px,#18181b 3px 46%,#101012 46%,#0a0a0b); border-radius:0 0 7px 7px; box-shadow:0 20px 26px rgba(0,0,0,.5)">
              <div style="position:absolute; left:0; top:0; bottom:0; width:14px; background:${e.strip}; border-radius:0 0 0 7px"></div>
              <div style="position:absolute; left:44px; right:44px; top:10px; bottom:8px; background:#f4f1e6; border-radius:2px; display:flex; align-items:center; gap:8px; padding:0 10px; box-shadow:inset 0 1px 3px rgba(0,0,0,.15)">
                <span style="font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:12px; letter-spacing:.05em; white-space:nowrap; color:#2a2621">${e.title}</span>
                <span style="font-family:'IBM Plex Mono',monospace; font-size:8px; color:rgba(42,38,33,.5); letter-spacing:.05em; white-space:nowrap">${e.kicker}</span>
              </div>
              <div style="position:absolute; right:14px; top:16px; font-size:9px; font-style:italic; color:#777; font-family:Arial,sans-serif; font-weight:bold">VHS</div>
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
          <div style="margin-top:9px; font-size:19px; font-weight:600; letter-spacing:.02em">${e.title}</div>
          <div style="margin-top:6px; font-size:10px; letter-spacing:.14em; color:rgba(240,233,220,.5)">${e.kicker}</div>
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
  `;K([l({type:String})],T.prototype,"activeKey",2);K([l({type:String})],T.prototype,"currentShot",2);K([l({type:Boolean})],T.prototype,"showFlash",2);K([l({type:Number})],T.prototype,"shotBDur",2);K([l({type:Number})],T.prototype,"flashDur",2);T=K([m("mobile-cutscene")],T);var oi=Object.defineProperty,si=Object.getOwnPropertyDescriptor,et=(e,t,i,s)=>{for(var o=s>1?void 0:s?si(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&oi(t,i,o),o};const Nt="cubic-bezier(.23,1,.32,1)";let R=class extends x{constructor(){super(...arguments),this.activeKey=null,this.stageState="idle",this.currentShot="none"}get mobileShelfPhase(){const e=this.director.stageState;return e==="ejectCollapse"?"ejecting":e==="idle"||e==="home"?"idle":"loading"}get mobilePlayingVisible(){return this.director.stageState==="play"||this.director.stageState==="playWipe"}pick(e){this.director.pick(e,"none","none",!0)}eject(){this.director.eject(!0)}render(){const e=this.director,t=e.activeKey,i=this.mobilePlayingVisible,s=e.currentShot==="B"||e.currentShot==="Be";return c`
      <div class="mobile-wrap">
        <mobile-shelf
          class="mobile-panel"
          style="opacity:${i||s||e.infoMode?0:1}; pointer-events:${i||s||e.infoMode?"none":"auto"}; transition:opacity 320ms ${Nt}"
          .activeKey=${t}
          .phase=${this.mobileShelfPhase}
          @pick-tape=${o=>this.pick(o.detail.key)}
          @open-info=${o=>e.openInfo(o.detail.mode)}
        ></mobile-shelf>

        <mobile-playing
          class="mobile-panel"
          style="opacity:${i||e.infoMode?1:0}; pointer-events:${i||e.infoMode?"auto":"none"}; transition:opacity 260ms ${Nt}"
          .activeKey=${t}
          @eject-tape=${()=>e.infoMode?e.closeInfo():this.eject()}
        >
          <tape-app-slot
            .activeKey=${t}
            .infoMode=${e.infoMode}
            .isMobile=${!0}
            @switch-tab=${o=>e.switchInfoTab(o.detail.mode)}
          ></tape-app-slot>
        </mobile-playing>

        <mobile-cutscene
          .activeKey=${t}
          .currentShot=${e.currentShot}
          ?showFlash=${e.showFlash}
          .shotBDur=${e.shotBDur}
          .flashDur=${e.flashDur}
          @skip-cutscene=${()=>e.skip()}
        ></mobile-cutscene>
      </div>
    `}};R.styles=v`
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
  `;et([l({type:Object})],R.prototype,"director",2);et([l({type:String})],R.prototype,"activeKey",2);et([l({type:String})],R.prototype,"stageState",2);et([l({type:String})],R.prototype,"currentShot",2);R=et([m("mobile-layout")],R);var ai=Object.defineProperty,ri=Object.getOwnPropertyDescriptor,_=(e,t,i,s)=>{for(var o=s>1?void 0:s?ri(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&ai(t,i,o),o};let w=class extends x{constructor(){super(...arguments),this.inspectState="SHELF",this.activeHold=null,this.scrubVal=0,this.shotADur=1300,this.shotBDur=1250,this.flashDur=130,this.dollyDur=420,this.readDur=620,this.camPct=174}onHold(e){this.dispatchEvent(new CustomEvent("hold-shot",{detail:{hold:e}}))}onRunSeq(){this.dispatchEvent(new CustomEvent("run-sequence"))}onParamChange(e,t){this.dispatchEvent(new CustomEvent("param-change",{detail:{name:e,val:t}}))}render(){const e=this.shotADur+200+this.shotBDur+150+this.flashDur+this.dollyDur+this.readDur+260+"ms";return c`
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
          Total load → playing: <b style="color:#2a2621">${e}</b>. Holding a shot pauses its animation so the scrub bar seeks it; RUN plays the whole cut sequence with the values above. Esc or the deck's EJECT key returns to the shelf.
        </div>
      </div>
    `}};w.styles=v`
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
  `;_([l({type:String})],w.prototype,"inspectState",2);_([l({type:String})],w.prototype,"activeHold",2);_([l({type:Number})],w.prototype,"scrubVal",2);_([l({type:Number})],w.prototype,"shotADur",2);_([l({type:Number})],w.prototype,"shotBDur",2);_([l({type:Number})],w.prototype,"flashDur",2);_([l({type:Number})],w.prototype,"dollyDur",2);_([l({type:Number})],w.prototype,"readDur",2);_([l({type:Number})],w.prototype,"camPct",2);w=_([m("motion-inspector")],w);var ni=Object.defineProperty,pi=Object.getOwnPropertyDescriptor,ut=(e,t,i,s)=>{for(var o=s>1?void 0:s?pi(t,i):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(o=(s?r(t,i,o):r(o))||o);return s&&o&&ni(t,i,o),o};let q=class extends x{constructor(){super(...arguments),this.stageScale=1,this.isMobile=!1,this.handleMqChange=e=>{this.isMobile=e.matches},this.director=new $e(this),this.showInspector=!1,this.handleKeyDown=e=>{e.key==="Escape"&&(this.director.infoMode?this.director.closeInfo():this.director.currentShot!=="none"?this.director.skip():this.director.stageState==="play"||this.director.stageState==="playWipe"?this.director.eject(this.isMobile):this.director.stageState!=="idle"&&this.director.cancel())},this.handlePopState=()=>this.route(!1)}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("popstate",this.handlePopState),this.mq=window.matchMedia("(max-width: 639px)"),this.isMobile=this.mq.matches,this.mq.addEventListener("change",this.handleMqChange),requestAnimationFrame(()=>this.route(!0))}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("popstate",this.handlePopState),this.mq?.removeEventListener("change",this.handleMqChange),this.resizeObserver?.disconnect()}updated(){const e=this.shadowRoot?.querySelector("desktop-layout");!e||e===this.observedStageEl||(this.resizeObserver?.disconnect(),this.observedStageEl=e,this.resizeObserver=new ResizeObserver(t=>{const i=t[0]?.contentRect;i&&(this.stageScale=Math.min(i.width/1100,i.height/700))}),this.resizeObserver.observe(e))}route(e){const t=(location.hash||"").replace(/^#\/?/,"");if(t==="about"||t==="contact"){const s=this.shadowRoot?.querySelector("desktop-layout"),o=s?s.screenOrigin():"735px 307px";this.director.openInfo(t,o);return}this.director.infoMode&&this.director.closeInfo();const i=Object.keys(u).find(s=>u[s].slug===t);if(i&&this.director.activeKey!==i){const s=this.shadowRoot?.querySelector("desktop-layout"),o=s?s.flip(i):"none",a=s?s.screenOrigin():"735px 307px";this.director.jump(i,o,a);return}!i&&this.director.activeKey&&(e?this.director.setStateIdle():this.director.eject(this.isMobile))}runSequence(){const e=this.director.activeKey||"echo",t=this.shadowRoot?.querySelector("desktop-layout"),i=t?t.flip(e):"none",s=t?t.screenOrigin():"735px 307px";this.director.handleHold("idle",i,s),setTimeout(()=>this.director.pick(e,i,s,this.isMobile),60)}render(){const e=this.director,t=e.activeKey,i=e.activeHold?"HOLDING "+(e.activeHold==="A"?"SHOT A":e.activeHold==="B"?"SHOT B · INSERT":"SHOT B · EJECT")+(t?" — "+u[t].title:""):e.stageState==="idle"?"SHELF":(e.stageState==="play"||e.stageState==="playWipe"?"PLAYING":e.currentShot!=="none"?"RUNNING · "+(e.currentShot==="A"?"SHOT A":e.currentShot==="Be"?"EJECT":"SHOT B"):e.stageState==="read"?"RUNNING · SETTLE / READ":"RUNNING")+(t?" — "+u[t].title:"");return c`
      ${this.isMobile?c`<mobile-layout
            .director=${e}
            .activeKey=${e.activeKey}
            .stageState=${e.stageState}
            .currentShot=${e.currentShot}
          ></mobile-layout>`:c`<desktop-layout
            .director=${e}
            .activeKey=${e.activeKey}
            .stageState=${e.stageState}
            .currentShot=${e.currentShot}
            .flightTransform=${e.flightTransform}
            .stageScale=${this.stageScale}
          ></desktop-layout>`}

      ${this.showInspector?c`
            <motion-inspector
              .inspectState=${i}
              .activeHold=${e.activeHold}
              .scrubVal=${e.scrubVal}
              .shotADur=${e.shotADur}
              .shotBDur=${e.shotBDur}
              .flashDur=${e.flashDur}
              .dollyDur=${e.dollyDur}
              .readDur=${e.readDur}
              .camPct=${e.camPct}
              @hold-shot=${s=>{const o=this.shadowRoot?.querySelector("desktop-layout"),a=o?o.flip(t||"echo"):"none",r=o?o.screenOrigin():"735px 307px";e.handleHold(s.detail.hold,a,r)}}
              @param-change=${s=>e.handleParamChange(s.detail.name,s.detail.val)}
              @run-sequence=${this.runSequence}
            ></motion-inspector>
          `:""}
    `}};q.styles=v`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
      background: #f5f2ea;
      box-sizing: border-box;
      user-select: none;
    }
  `;ut([H()],q.prototype,"stageScale",2);ut([H()],q.prototype,"isMobile",2);ut([H()],q.prototype,"showInspector",2);q=ut([m("portfolio-app")],q);console.log("📼 Studio Portfolio — Retro Cutscene Experience initialized.");

(()=>{"use strict";function e(e){let t=e,n="",a="",r="",i="",o=[];return{getTitle:function(){return t},setTitle:function(e){t=e},setDescription:function(e){n=e},getDescription:function(){return n},setDueDate:function(e){a=e},getDueDate:function(){return a},setPriority:function(e){r=e},getPriority:function(){return r},setNotes:function(e){i=e},getNotes:function(){return i},addToChecklist:function(e){o.push(e)},removeFromChecklist:function(e){o.splice(e,1)},getChecklist:function(){return o}}}function t(e){let t=e,n="",a=[],r=0;return{setId:function(e){r=e},getId:function(){return r},setTitle:function(e){t=e},getTitle:function(){return t},setDescription:function(e){n=e},getDescription:function(){return n},addTodoItem:function(e){a.push(e)},removeTodoItem:function(e){a.splice(e,1)},getTodoItems:function(){return a}}}function n(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function a(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}var r=36e5,i={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},o=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,l=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,d=/^([+-])(\d{2})(?::?(\d{2}))?$/;function s(e){var t,n={},a=e.split(i.dateTimeDelimiter);if(a.length>2)return n;if(/:/.test(a[0])?(n.date=null,t=a[0]):(n.date=a[0],t=a[1],i.timeZoneDelimiter.test(n.date)&&(n.date=e.split(i.timeZoneDelimiter)[0],t=e.substr(n.date.length,e.length))),t){var r=i.timezone.exec(t);r?(n.time=t.replace(r[1],""),n.timezone=r[1]):n.time=t}return n}function c(e,t){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),a=e.match(n);if(!a)return{year:null};var r=a[1]&&parseInt(a[1]),i=a[2]&&parseInt(a[2]);return{year:null==i?r:100*i,restDateString:e.slice((a[1]||a[2]).length)}}function u(e,t){if(null===t)return null;var n=e.match(o);if(!n)return null;var a=!!n[4],r=m(n[1]),i=m(n[2])-1,l=m(n[3]),d=m(n[4]),s=m(n[5])-1;if(a)return function(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}(0,d,s)?function(e,t,n){var a=new Date(0);a.setUTCFullYear(e,0,4);var r=7*(t-1)+n+1-(a.getUTCDay()||7);return a.setUTCDate(a.getUTCDate()+r),a}(t,d,s):new Date(NaN);var c=new Date(0);return function(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(g[t]||(v(e)?29:28))}(t,i,l)&&function(e,t){return t>=1&&t<=(v(e)?366:365)}(t,r)?(c.setUTCFullYear(t,i,Math.max(r,l)),c):new Date(NaN)}function m(e){return e?parseInt(e):1}function h(e){var t=e.match(l);if(!t)return null;var n=p(t[1]),a=p(t[2]),i=p(t[3]);return function(e,t,n){return 24===e?0===t&&0===n:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}(n,a,i)?n*r+6e4*a+1e3*i:NaN}function p(e){return e&&parseFloat(e.replace(",","."))||0}function f(e){if("Z"===e)return 0;var t=e.match(d);if(!t)return 0;var n="+"===t[1]?-1:1,a=parseInt(t[2]),i=t[3]&&parseInt(t[3])||0;return function(e,t){return t>=0&&t<=59}(0,i)?n*(a*r+6e4*i):NaN}var g=[31,null,31,30,31,30,31,31,30,31,30,31];function v(e){return e%400==0||e%4==0&&e%100}function y(e){a(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function b(e,t){a(2,arguments);var n=y(e),r=y(t),i=n.getTime()-r.getTime();return i<0?-1:i>0?1:i}function w(e,t){a(2,arguments);var n=y(e),r=y(t),i=n.getFullYear()-r.getFullYear(),o=n.getMonth()-r.getMonth();return 12*i+o}function T(e,t){a(2,arguments);var n=y(e),r=y(t),i=b(n,r),o=Math.abs(w(n,r));n.setMonth(n.getMonth()-i*o);var l=b(n,r)===-i,d=i*(o-l);return 0===d?0:d}function D(e,t){a(2,arguments);var n=y(e),r=y(t);return n.getTime()-r.getTime()}function C(e,t){a(2,arguments);var n=D(e,t)/1e3;return n>0?Math.floor(n):Math.ceil(n)}var M={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function E(e){return function(t){var n=t||{},a=n.width?String(n.width):e.defaultWidth;return e.formats[a]||e.formats[e.defaultWidth]}}var N,k={date:E({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:E({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:E({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},L={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function x(e){return function(t,n){var a,r=n||{};if("formatting"===(r.context?String(r.context):"standalone")&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,o=r.width?String(r.width):i;a=e.formattingValues[o]||e.formattingValues[i]}else{var l=e.defaultWidth,d=r.width?String(r.width):e.defaultWidth;a=e.values[d]||e.values[l]}return a[e.argumentCallback?e.argumentCallback(t):t]}}function P(e){return function(t,n){var a=String(t),r=n||{},i=r.width,o=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth],l=a.match(o);if(!l)return null;var d,s=l[0],c=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];return d="[object Array]"===Object.prototype.toString.call(c)?function(e,t){for(var n=0;n<e.length;n++)if(e[n].test(s))return n}(c):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n].test(s))return n}(c),d=e.valueCallback?e.valueCallback(d):d,{value:d=r.valueCallback?r.valueCallback(d):d,rest:a.slice(s.length)}}}const S={code:"en-US",formatDistance:function(e,t,n){var a;return n=n||{},a="string"==typeof M[e]?M[e]:1===t?M[e].one:M[e].other.replace("{{count}}",t),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:k,formatRelative:function(e,t,n,a){return L[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:x({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:x({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:x({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:x({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:x({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(N={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var n=String(e),a=t||{},r=n.match(N.matchPattern);if(!r)return null;var i=r[0],o=n.match(N.parsePattern);if(!o)return null;var l=N.valueCallback?N.valueCallback(o[0]):o[0];return{value:l=a.valueCallback?a.valueCallback(l):l,rest:n.slice(i.length)}}),era:P({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:P({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:P({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:P({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:P({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function j(e){return function(e,t){if(null==e)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in t=t||{})t.hasOwnProperty(n)&&(e[n]=t[n]);return e}({},e)}var W=6e4;function I(e){return e.getTime()%W}function H(e){var t=new Date(e.getTime()),n=Math.ceil(t.getTimezoneOffset());t.setSeconds(0,0);var a=n>0?(W+I(t))%W:I(t);return n*W+a}var F=1440,A=43200;function X(e,t,n){a(2,arguments);var r=n||{},i=r.locale||S;if(!i.formatDistance)throw new RangeError("locale must contain formatDistance property");var o=b(e,t);if(isNaN(o))throw new RangeError("Invalid time value");var l,d,s=j(r);s.addSuffix=Boolean(r.addSuffix),s.comparison=o,o>0?(l=y(t),d=y(e)):(l=y(e),d=y(t));var c,u=C(d,l),m=(H(d)-H(l))/1e3,h=Math.round((u-m)/60);if(h<2)return r.includeSeconds?u<5?i.formatDistance("lessThanXSeconds",5,s):u<10?i.formatDistance("lessThanXSeconds",10,s):u<20?i.formatDistance("lessThanXSeconds",20,s):u<40?i.formatDistance("halfAMinute",null,s):u<60?i.formatDistance("lessThanXMinutes",1,s):i.formatDistance("xMinutes",1,s):0===h?i.formatDistance("lessThanXMinutes",1,s):i.formatDistance("xMinutes",h,s);if(h<45)return i.formatDistance("xMinutes",h,s);if(h<90)return i.formatDistance("aboutXHours",1,s);if(h<F){var p=Math.round(h/60);return i.formatDistance("aboutXHours",p,s)}if(h<2520)return i.formatDistance("xDays",1,s);if(h<A){var f=Math.round(h/F);return i.formatDistance("xDays",f,s)}if(h<86400)return c=Math.round(h/A),i.formatDistance("aboutXMonths",c,s);if((c=T(d,l))<12){var g=Math.round(h/A);return i.formatDistance("xMonths",g,s)}var v=c%12,w=Math.floor(c/12);return v<3?i.formatDistance("aboutXYears",w,s):v<9?i.formatDistance("overXYears",w,s):i.formatDistance("almostXYears",w+1,s)}const z=(()=>{let e=document.createElement("div"),t=document.createElement("div"),r=document.createElement("div"),i=()=>{},o=()=>{},l=()=>{},d=()=>{},m=()=>{},p=()=>{},g=()=>{};function v(e,t,n,a){let r=document.createElement("img");r.src="../src/Img/Edit_icon.png",e.appendChild(r),r.style.cssText="width: 20px;\n                                        position: absolute;\n                                        top: 5px;\n                                        right:8px;\n                                        display: none;";let i=document.createElement("img");i.src="../src/Img/Delete_icon.png",e.appendChild(i),i.style.cssText="width: 20px;\n                                        position: absolute;\n                                        top: 5px;\n                                        right:33px;\n                                        display: none;",e.addEventListener("mouseover",(()=>{r.style.display="block",i.style.display="block"})),e.addEventListener("mouseout",(()=>{r.style.display="none",i.style.display="none"})),r.addEventListener("click",(()=>{window.event.stopPropagation(),t(a)})),i.addEventListener("click",(()=>{window.event.stopPropagation(),n(a)}))}function y(e,t,r){let i=document.createElement("div");switch(t.appendChild(i),i.classList.add("todo-class"),e.getPriority()){case 1:i.classList.add("low-todo-class");break;case 2:i.classList.add("med-todo-class");break;case 3:i.classList.add("high-todo-class")}let o=document.createElement("h4");i.appendChild(o),o.classList="todo-title",o.innerHTML=e.getTitle();let l=document.createElement("p");i.appendChild(l),l.classList="todo-text",l.innerHTML=e.getDescription();let d=document.createElement("p");if(i.appendChild(d),d.classList="todo-text",e.getDueDate()){let t=function(e,t){a(1,arguments);var r=t||{},i=null==r.additionalDigits?2:n(r.additionalDigits);if(2!==i&&1!==i&&0!==i)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof e&&"[object String]"!==Object.prototype.toString.call(e))return new Date(NaN);var o,l=s(e);if(l.date){var d=c(l.date,i);o=u(d.restDateString,d.year)}if(isNaN(o)||!o)return new Date(NaN);var m,p=o.getTime(),g=0;if(l.time&&(g=h(l.time),isNaN(g)||null===g))return new Date(NaN);if(!l.timezone){var v=new Date(p+g),y=new Date(v.getUTCFullYear(),v.getUTCMonth(),v.getUTCDate(),v.getUTCHours(),v.getUTCMinutes(),v.getUTCSeconds(),v.getUTCMilliseconds());return y.setFullYear(v.getUTCFullYear()),y}return m=f(l.timezone),isNaN(m)?new Date(NaN):new Date(p+g+m)}(e.getDueDate());d.innerHTML="Due "+function(e,t){return a(1,arguments),X(e,Date.now(),t)}(t,{addSuffix:!0})}let m=e.getChecklist();for(let e=0;e<m.length;e++){let t=document.createElement("div");t.classList="todo-check",i.appendChild(t);let n=document.createElement("input");n.type="checkbox",t.appendChild(n),n.id=m[e];let a=document.createElement("label");t.appendChild(a),a.innerHTML=m[e],a.htmlFor=m[e]}v(i,T,p,e);let g=document.createElement("div");i.appendChild(g),g.classList.add("add-check-div"),g.addEventListener("click",(()=>T(null)));let y=document.createElement("img");y.src="../src/Img/Add-icon.png",y.className="add-check-image",g.appendChild(y)}function b(t){let n=document.createElement("div");e.appendChild(n),n.className="create-element-form";let a=document.createElement("span");a.innerHTML="x",a.classList.add("closebtn"),a.title="Close",n.appendChild(a),a.addEventListener("click",w(n)),a.className="close-button";let r=document.createElement("div");n.appendChild(r),r.className="create-project-overlay";let o=document.createElement("h1");r.appendChild(o),o.innerHTML="Create new project",o.classList.add("text-form");let l=document.createElement("label");r.appendChild(l);let d=document.createElement("p");l.appendChild(d),d.innerHTML="Title",d.classList="text-form";let s=document.createElement("input");l.appendChild(s),s.type="text",s.name="projectTitle",s.placeholder="Title",s.classList="input-form",s.maxLength="37";let c=document.createElement("label");r.appendChild(c),c.style.display="block";let u=document.createElement("p");c.appendChild(u),u.innerHTML="Description",u.classList="text-form";let h=document.createElement("textarea");c.appendChild(h),h.rows="3",h.cols="40",h.maxLength="100",h.style.resize="none",h.style.lineHeight="3em",h.classList="input-form",h.placeholder="Notes...\nMore notes...";let p=document.createElement("button");r.appendChild(p),p.className="button-form",p.innerHTML="Create",p.addEventListener("click",(()=>{if(t){if(t){if(!m(t,s.value,h.value))return;w(n)()}}else{if(!i(s.value,h.value))return;w(n)()}})),t&&(s.value=t.getTitle(),h.value=t.getDescription(),o.innerHTML=s.value,p.innerHTML="Modify")}function w(e){return()=>e.remove()}function T(t){let n=document.createElement("div");e.appendChild(n),n.className="create-element-form";let a=document.createElement("span");a.innerHTML="x",a.classList.add("closebtn"),a.title="Close",n.appendChild(a),a.addEventListener("click",D(n)),a.className="close-button";let r=document.createElement("div");n.appendChild(r),r.id="create-todo-overlay";let i=document.createElement("h1");r.appendChild(i),i.innerHTML="Add a new todo item",i.classList.add("text-form");let o=document.createElement("label");r.appendChild(o);let l=document.createElement("p");o.appendChild(l),l.innerHTML="Title",l.classList="text-form";let s=document.createElement("input");o.appendChild(s),s.type="text",s.name="projectTitle",s.placeholder="Title",s.classList="input-form";let c=document.createElement("label");r.appendChild(c),c.style.display="block";let u=document.createElement("p");c.appendChild(u),u.innerHTML="Description",u.classList="text-form";let m=document.createElement("textarea");c.appendChild(m),m.rows="2",m.cols="40",m.style.resize="none",m.style.lineHeight="3em",m.classList="input-form",m.placeholder="Notes...\nMore notes...";let h=document.createElement("label");r.appendChild(h),h.style.display="block";let p=document.createElement("p");h.appendChild(p),p.innerHTML="Due Date",p.classList="text-form";let f=document.createElement("input");h.appendChild(f),f.type="date",f.classList="input-form";let v=document.createElement("label");r.appendChild(v),h.style.display="block";let y=document.createElement("p");v.appendChild(y),y.innerHTML="Priority",y.classList="text-form";let b=document.createElement("div");v.appendChild(b),b.classList="proirity-select",b.id="low-pty",b.priorityNum=1,b.style.backgroundColor="#b16562",b.addEventListener("click",(()=>{M(b)}));let w=document.createElement("div");v.appendChild(w),w.classList="proirity-select",w.id="med-pty",w.priorityNum=2,w.style.backgroundColor="#a75553",w.style.border="3px solid #679b9d",w.addEventListener("click",(()=>{M(w)}));let T=document.createElement("div");v.appendChild(T),T.classList="proirity-select",T.id="high-pty",T.priorityNum=3,T.style.backgroundColor="#854442",T.addEventListener("click",(()=>{M(T)}));let C=2;function M(e){let t=document.getElementsByClassName("proirity-select");for(let e=0;e<t.length;e++)t[e].style.cssText+="\n                                                border: none;\n                                                ";e.style.border="3px solid #679b9d",C=e.priorityNum}let E=document.createElement("button");if(r.appendChild(E),E.classList="button-form",E.innerHTML="Create",E.addEventListener("click",(()=>{if(t)t&&g(s.value,m.value,f.value,C,t)&&D(n)();else{if(!d(s.value,m.value,f.value,C))return;D(n)()}})),t)switch(E.innerHTML="Modify",i.innerHTML=t.getTitle(),s.value=t.getTitle(),m.value=t.getDescription(),f.value=t.getDueDate(),t.getPriority()){case 1:M(b);break;case 2:M(w);break;case 3:M(T)}}function D(e){return()=>e.remove()}return{init:function(n,a,s,c,u,h,f){i=n,o=a,l=s,d=c,m=u,p=h,g=f,document.getElementById("content").appendChild(e),document.body.style.background="#111",e.appendChild(t),e.appendChild(r),t.id="projects-div",r.className="todos-div"},renderProjectsFromList:function(e){if(document.querySelectorAll(".project-class").forEach((e=>e.remove())),!document.getElementById("add-project-button-id")){let e=document.createElement("div");t.appendChild(e),e.classList.add("add-button-proj"),e.classList.add("add-button-img"),e.id="add-project-button-id",e.addEventListener("click",(()=>b(null)));let n=document.createElement("img");n.src="../src/Img/Add-icon.png",n.className="add-image",e.appendChild(n)}for(let n=0;n<e.length;n++){let a=e[n];const r=document.createElement("div");t.appendChild(r),r.classList="project-class",r.addEventListener("click",(()=>{o(a)}));let i=document.createElement("h2");r.appendChild(i),i.innerHTML=a.getTitle(),i.className="text-page";let d=document.createElement("p");r.appendChild(d),d.innerHTML=a.getDescription(),d.className="text-page",v(r,b,l,a)}},displaySelectedProject:function(e){document.querySelectorAll("#temp-todo").forEach((e=>e.remove()));let t=document.createElement("div");t.id="temp-todo",r.appendChild(t),t.style.cssText=r.style.cssText;let n=document.createElement("div");t.appendChild(n),n.className="todo-column",n.id="hover-column";let a=document.createElement("div");t.appendChild(a),a.className="todo-column";let i=document.createElement("div");t.appendChild(i),i.className="todo-column";let o=document.createElement("div");t.appendChild(o),o.className="todo-column";let l=document.createElement("div");n.appendChild(l),l.classList.add("todo-class"),l.classList.add("add-button-img"),l.id="add-todo-div",l.addEventListener("click",(()=>T(null)));let d=document.createElement("img");if(d.src="../src/Img/Add-icon.png",d.className="add-image",l.appendChild(d),e){const t=e.getTodoItems();for(let e=1;e<=t.length;e++){const r=t[e-1];switch(e%4){case 1:y(r,n);break;case 2:y(r,a);break;case 3:y(r,i);break;case 0:y(r,o)}}}}}})();let U=[];const Y=function(n){const a=n;let r="",i=0;function o(){z.renderProjectsFromList(a),z.displaySelectedProject(r)}function l(e){r=e,o()}function d(e,n){if(i++,e){let r=t(e);return r.setDescription(n),r.setId(i),a.push(r),o(),!0}return!1}function s(e){for(let t=0;t<a.length;t++)if(e===a[t])return r===e&&p(a[t-1]),a.splice(t,1),void o()}function c(e,t,n){return!!t&&(e.setTitle(t),e.setDescription(n),o(),!0)}function u(t,n,a,i){if(t){let l=e(t);return l.setDescription(n),l.setPriority(i),l.setDueDate(a),r.addTodoItem(l),o(),!0}return!1}function m(e){let t=r.getTodoItems();for(let n=0;n<t.length;n++)if(e===t[n])return r.removeTodoItem(n),void o()}function h(e,t,n,a,r){return r.setTitle(e),r.setDescription(t),r.setPriority(a),r.setDueDate(n),o(),!0}function p(e){r=e}return{start:function(){z.init(d,l,s,u,c,m,h),r=a[0],o()},addProject:d,removeProject:s,addTodo:u,removeTodo:m,modifyTodo:h,setSelectedProject:p,getSelectedProject:function(){return r}}}(U),q=e("Default to do item N1");q.setPriority(1),q.setDueDate("2021-09-15");const O=e("Default to do item N2");O.setPriority(2),O.setDueDate("2021-09-15"),O.addToChecklist("New check"),O.addToChecklist("New check2"),O.addToChecklist("New check3"),O.addToChecklist("New check3New check3New check3New check3New check3New check3New check3New check3"),O.addToChecklist("New check3"),O.addToChecklist("New check3");const J=e("Default to do item N3");J.setPriority(3),J.setDescription("asdasd"),J.setDueDate("2021-01-25");const B=e("Default to do item N4");B.setPriority(3),B.setDescription("asdasd");const Z=t("Default project ");Z.setDescription("This is a default project that should be removed. \n Feel free to create a new one."),t("New default project 2"),Z.addTodoItem(q),Z.addTodoItem(O),Z.addTodoItem(J),Z.addTodoItem(B),U.push(Z),document.getElementById("content"),Y.start(Y)})();
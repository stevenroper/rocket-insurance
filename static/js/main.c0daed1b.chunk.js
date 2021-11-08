(this["webpackJsonpsure-rocket-insurance"]=this["webpackJsonpsure-rocket-insurance"]||[]).push([[0],{297:function(e,t,a){},298:function(e,t,a){"use strict";a.r(t);var n,i=a(0),r=a.n(i),o=a(43),l=a.n(o),c=a(71),d=a(54),s=a(160),u=a(23),m=a(347),j=a(338),b=a(348),f="/rating-information",h="/quote-overview",O=a(3),v=a(22),x=a(25),g=(a(94),a(161)),p=a(339),N=a(342),y=a(343),A=a(344),q=a(349),C=a(352),S=a(353),w=a(2),M=function(e){var t=e.message;return Object(w.jsxs)(m.a,{position:"absolute",height:"100%",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:"100",sx:{backdropFilter:"blur(5px)"},children:[Object(w.jsx)(m.a,{height:"100%",width:"100%",sx:{backgroundColor:"white",opacity:.75,position:"absolute"}}),t&&Object(w.jsx)(b.a,{variant:"h5",textAlign:"center",zIndex:"200",marginBottom:"1rem",children:t}),Object(w.jsx)(S.a,{})]})},I=a(341),T=function(){return Object(w.jsx)(I.a,{severity:"error",children:"Oops, something went wrong. Please try again later!"})},k=function(e){var t=e.children,a=e.isLoading,n=void 0!==a&&a,i=e.loadingMessage,r=void 0===i?"":i,o=e.maxWidth,l=e.showErrorMessage,c=void 0!==l&&l;return Object(w.jsxs)(C.a,{elevation:1,sx:{width:"100%",maxWidth:o,position:"relative"},children:[c&&Object(w.jsx)(T,{}),n&&Object(w.jsx)(M,{message:r}),t]})},_=a(18),D=a.n(_),W=a(32),P="https://fed-challenge-api.sure.now.sh/api/v1/quotes",B={headers:{Accept:"application/json"}},L=function(e){if(!e.ok)throw new Error("Network error: ".concat(e.status));return e.json()},E=function(){var e=Object(W.a)(D.a.mark((function e(t){var a;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(P,Object(v.a)(Object(v.a)({},B),{},{method:"POST",body:JSON.stringify(t)}));case 2:return a=e.sent,e.abrupt("return",L(a));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),V=function(){var e=Object(W.a)(D.a.mark((function e(t,a){var n;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(P,"/").concat(t),Object(v.a)(Object(v.a)({},B),{},{method:"PUT",body:JSON.stringify(a)}));case 2:return n=e.sent,e.abrupt("return",L(n));case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),z=function(){var e=Object(d.useQueryClient)();return{clearState:function(){return e.removeQueries("quote")},state:Object(d.useQuery)("quote",(function(){return e.getQueryData("quote")}),{staleTime:1/0,cacheTime:1/0}).data,updateState:function(t){return e.setQueryData("quote",t)}}},Q=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return isNaN(e)?e:e.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:t})},F=function(e){var t,a,n,i=e.disabled,r=void 0!==i&&i,o=e.name,l=e.onChange,c=Object(x.g)().control,d=z().state;return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(x.a,{name:o,control:c,render:function(e){var t,a,n,i,c,s,u,m,j,b,f=e.field;return Object(w.jsxs)(y.a,{fullWidth:!0,sx:{marginBottom:"0.5rem"},children:[Object(w.jsx)(A.a,{id:"".concat(o,"-select"),children:null===d||void 0===d||null===(t=d.quote)||void 0===t||null===(a=t.variable_options)||void 0===a||null===(n=a[o])||void 0===n?void 0:n.title}),Object(w.jsx)(p.a,Object(v.a)(Object(v.a)({labelId:"".concat(o,"-select"),label:null===d||void 0===d||null===(i=d.quote)||void 0===i||null===(c=i.variable_options)||void 0===c||null===(s=c[o])||void 0===s?void 0:s.title,disabled:r},f),{},{onChange:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){f.onChange(e),l(Object(O.a)({},o,e.target.value))})),children:(null!==(u=null===d||void 0===d||null===(m=d.quote)||void 0===m||null===(j=m.variable_options)||void 0===j||null===(b=j[o])||void 0===b?void 0:b.values)&&void 0!==u?u:[]).map((function(e){return Object(w.jsx)(N.a,{value:e,children:Q(e)},e)}))}))]})}}),Object(w.jsx)(b.a,{variant:"caption",component:"p",marginBottom:"2rem",children:null===d||void 0===d||null===(t=d.quote)||void 0===t||null===(a=t.variable_options)||void 0===a||null===(n=a[o])||void 0===n?void 0:n.description})]})},R=function(){var e,t,a,n,i,r=z(),o=r.clearState,l=r.state,c=function(){var e=z(),t=e.state,a=e.updateState;return Object(d.useMutation)((function(e){var a,n,i,r,o;return V(null===t||void 0===t||null===(a=t.quote)||void 0===a?void 0:a.quoteId,{quote:{quoteId:null===t||void 0===t||null===(n=t.quote)||void 0===n?void 0:n.quoteId,rating_address:null===t||void 0===t||null===(i=t.quote)||void 0===i?void 0:i.rating_address,policy_holder:null===t||void 0===t||null===(r=t.quote)||void 0===r?void 0:r.policy_holder,variable_selections:Object(v.a)(Object(v.a)({},null===t||void 0===t||null===(o=t.quote)||void 0===o?void 0:o.variable_selections),e)}})}),{onSuccess:function(e){return a(e)}})}(),s=c.isError,j=c.isLoading,h=c.mutate,O=Object(u.g)().push,p=Object(x.f)({defaultValues:{deductible:null===l||void 0===l||null===(e=l.quote)||void 0===e||null===(t=e.variable_selections)||void 0===t?void 0:t.deductible,asteroid_collision:null===l||void 0===l||null===(a=l.quote)||void 0===a||null===(n=a.variable_selections)||void 0===n?void 0:n.asteroid_collision}});return(null===l||void 0===l?void 0:l.quote)?Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(k,{isLoading:j,loadingMessage:"Updating quote",maxWidth:"30rem",showErrorMessage:s,children:Object(w.jsxs)(m.a,{padding:"2rem 1.5rem",children:[Object(w.jsx)(b.a,{variant:"h4",component:"h2",textAlign:"center",children:"Your Quote"}),Object(w.jsxs)(m.a,{display:"flex",flexDirection:"column",alignItems:"center",padding:"1rem",border:"1px solid ".concat(g.a[300]),marginY:"1rem",children:[Object(w.jsx)(b.a,{variant:"h5",component:"h3",marginBottom:"0.5rem",children:"Yearly Premium"}),Object(w.jsx)(b.a,{variant:"h3",component:"p",fontWeight:"500",color:"#214e34",children:Q(null===l||void 0===l||null===(i=l.quote)||void 0===i?void 0:i.premium)})]}),Object(w.jsx)(b.a,{variant:"h6",component:"h3",margin:"2rem 0 1rem 0",textAlign:"center",children:"Adjust policy coverage variables"}),Object(w.jsxs)(x.b,Object(v.a)(Object(v.a)({},p),{},{children:[Object(w.jsx)(F,{name:"deductible",onChange:h,disabled:j}),Object(w.jsx)(F,{name:"asteroid_collision",onChange:h,disabled:j})]})),Object(w.jsx)(m.a,{display:"flex",justifyContent:"center",children:Object(w.jsx)(q.a,{onClick:function(){O(f),o()},children:"Restart quote"})})]})}),false]}):Object(w.jsx)(u.a,{to:f})},Y=a(79),H=a(168),J=a(49),K=a(351),U=a(350),G=[{fullName:"Alabama",code:"AL"},{fullName:"Alaska",code:"AK"},{fullName:"Arizona",code:"AZ"},{fullName:"Arkansas",code:"AR"},{fullName:"California",code:"CA"},{fullName:"Colorado",code:"CO"},{fullName:"Connecticut",code:"CT"},{fullName:"Delaware",code:"DE"},{fullName:"District of Columbia",code:"DC"},{fullName:"Florida",code:"FL"},{fullName:"Georgia",code:"GA"},{fullName:"Hawaii",code:"HI"},{fullName:"Idaho",code:"ID"},{fullName:"Illinois",code:"IL"},{fullName:"Indiana",code:"IN"},{fullName:"Iowa",code:"IA"},{fullName:"Kansas",code:"KS"},{fullName:"Kentucky",code:"KY"},{fullName:"Louisiana",code:"LA"},{fullName:"Maine",code:"ME"},{fullName:"Maryland",code:"MD"},{fullName:"Massachusetts",code:"MA"},{fullName:"Michigan",code:"MI"},{fullName:"Minnesota",code:"MN"},{fullName:"Mississippi",code:"MS"},{fullName:"Missouri",code:"MO"},{fullName:"Montana",code:"MT"},{fullName:"Nebraska",code:"NE"},{fullName:"Nevada",code:"NV"},{fullName:"New Hampshire",code:"NH"},{fullName:"New Jersey",code:"NJ"},{fullName:"New Mexico",code:"NM"},{fullName:"New York",code:"NY"},{fullName:"North Carolina",code:"NC"},{fullName:"North Dakota",code:"ND"},{fullName:"Ohio",code:"OH"},{fullName:"Oklahoma",code:"OK"},{fullName:"Oregon",code:"OR"},{fullName:"Pennsylvania",code:"PA"},{fullName:"Rhode Island",code:"RI"},{fullName:"South Carolina",code:"SC"},{fullName:"South Dakota",code:"SD"},{fullName:"Tennessee",code:"TN"},{fullName:"Texas",code:"TX"},{fullName:"Utah",code:"UT"},{fullName:"Vermont",code:"VT"},{fullName:"Virginia",code:"VA"},{fullName:"Washington",code:"WA"},{fullName:"West Virginia",code:"WV"},{fullName:"Wisconsin",code:"WI"},{fullName:"Wyoming",code:"WY"}],Z=function(e){var t=e.children,a=Object(Y.a)(e,["children"]);return Object(w.jsx)(m.a,Object(v.a)(Object(v.a)({display:"grid",gap:"1rem"},a),{},{children:t}))},X="firstName",$="lastName",ee="line1",te="line2",ae="city",ne="state",ie="zipCode",re=function(e){var t,a=e.gridArea,n=e.name,i=Object(Y.a)(e,["gridArea","name"]),r=Object(x.g)(),o=r.control,l=r.formState.errors,c=null===l||void 0===l||null===(t=l[n])||void 0===t?void 0:t.message;return Object(w.jsx)(x.a,{name:n,control:o,render:function(e){var t=e.field;return Object(w.jsx)(K.a,Object(v.a)(Object(v.a)({variant:"outlined",error:Boolean(c),helperText:c,sx:{gridArea:a}},t),i))}})},oe=function(e){var t=e.children,a=e.gridArea;Object(Y.a)(e,["children","gridArea"]);return Object(w.jsx)(b.a,{variant:"h6",component:"h2",sx:{gridArea:a},children:t})},le=J.a((n={},Object(O.a)(n,X,J.b().required("Please enter a first name to continue.")),Object(O.a)(n,$,J.b().required("Please enter a last name to continue.")),Object(O.a)(n,ee,J.b().required("Please enter a street address to continue.")),Object(O.a)(n,te,J.b()),Object(O.a)(n,ae,J.b().required("Please enter a city to continue.")),Object(O.a)(n,ne,J.b().required("Please select a state to continue.")),Object(O.a)(n,ie,J.b().matches(/^\d{5}$/,"Please enter a valid, 5-digit zip code to continue.").required("Please enter a zip code to continue.")),n)),ce=function(){var e,t,a,n,i=function(){var e=Object(u.g)().push,t=z().updateState;return Object(d.useMutation)(E,{onSuccess:function(a){t(a),e(h)}})}(),r=i.mutate,o=i.isLoading,l=i.isError,c=Object(x.f)({defaultValues:(e={},Object(O.a)(e,X,""),Object(O.a)(e,$,""),Object(O.a)(e,ee,""),Object(O.a)(e,te,""),Object(O.a)(e,ae,""),Object(O.a)(e,ne,""),Object(O.a)(e,ie,""),e),resolver:Object(H.a)(le)}),s=null===c||void 0===c||null===(t=c.formState)||void 0===t||null===(a=t.errors)||void 0===a||null===(n=a[ne])||void 0===n?void 0:n.message;return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(k,{isLoading:o,loadingMessage:"Generating quote",maxWidth:"40rem",showErrorMessage:l,children:Object(w.jsx)(x.b,Object(v.a)(Object(v.a)({},c),{},{children:Object(w.jsx)("form",{onSubmit:c.handleSubmit((function(e){return r({first_name:e[X],last_name:e[$],address:{line_1:e[ee],line_2:e[te],city:e[ae],region:e[ne],postal:e[ie]}})})),children:Object(w.jsxs)(Z,{padding:"2rem 1.5rem",gridTemplateColumns:{xs:"1fr",md:"1fr 1fr"},gridTemplateAreas:{xs:'\n                "nameTitle"\n                "firstName"\n                "lastName"\n                "addressTitle"\n                "line1"\n                "line2"\n                "city"\n                "state"\n                "zipCode"\n                "submitButton"\n              ',md:'\n                "nameTitle nameTitle"\n                "firstName lastName"\n                "addressTitle addressTitle"\n                "line1 line1"\n                "line2 city"\n                "state zipCode"\n                "submitButton submitButton"\n              '},children:[Object(w.jsx)(oe,{gridArea:"nameTitle",children:"Name"}),Object(w.jsx)(re,{label:"First name",gridArea:"firstName",name:X,disabled:o}),Object(w.jsx)(re,{label:"Last name",gridArea:"lastName",name:$,disabled:o}),Object(w.jsx)(oe,{gridArea:"addressTitle",children:"Address"}),Object(w.jsx)(re,{label:"Street address",gridArea:"line1",name:ee,disabled:o}),Object(w.jsx)(re,{label:"Apartment, unit, suite",gridArea:"line2",name:te,disabled:o}),Object(w.jsx)(re,{label:"City",gridArea:"city",name:ae,disabled:o}),Object(w.jsx)(x.a,{name:ne,control:c.control,render:function(e){var t=e.field;return Object(w.jsxs)(y.a,{children:[Object(w.jsx)(A.a,{id:"state-dropdown",children:"State"}),Object(w.jsx)(p.a,Object(v.a)(Object(v.a)({labelId:"state-dropdown",label:"State",error:Boolean(s)},t),{},{children:G.map((function(e){return Object(w.jsx)(N.a,{value:e.code,children:e.fullName},e.code)}))})),Boolean(s)&&Object(w.jsx)(U.a,{error:!0,children:s})]})}}),Object(w.jsx)(re,{label:"Zip code",gridArea:"zipCode",name:ie,disabled:o}),Object(w.jsx)(m.a,{display:"flex",justifyContent:"center",marginTop:"1rem",sx:{gridArea:"submitButton"},children:Object(w.jsx)(q.a,{variant:"contained",type:"submit",sx:{width:{xs:"100%",md:"fit-content"}},disabled:o||c.formState.isSubmitted&&!c.formState.isValid,children:"Get quote"})})]})})}))}),false]})};var de=function(){return Object(w.jsxs)(m.a,{minHeight:"calc(100vh - 2rem)",display:"flex",flexDirection:"column",alignItems:"center",padding:"1rem",sx:{backgroundColor:j.a[600]},children:[Object(w.jsx)(b.a,{component:"h1",variant:"h2",fontWeight:"700",marginBottom:"2rem",color:"#214e34",textAlign:"center",children:"Rocket Insurance"}),Object(w.jsxs)(u.d,{children:[Object(w.jsx)(u.b,{path:f,component:ce}),Object(w.jsx)(u.b,{path:h,component:R}),Object(w.jsx)(u.b,{path:"*",children:Object(w.jsx)(u.a,{to:"/rating-information"})})]})]})},se=(a(297),new d.QueryClient);l.a.render(Object(w.jsx)(r.a.StrictMode,{children:Object(w.jsx)(c.a,{children:Object(w.jsxs)(d.QueryClientProvider,{client:se,children:[Object(w.jsx)(de,{}),Object(w.jsx)(s.ReactQueryDevtools,{})]})})}),document.getElementById("root"))}},[[298,1,2]]]);
//# sourceMappingURL=main.c0daed1b.chunk.js.map
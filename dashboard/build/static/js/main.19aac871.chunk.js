(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,a){e.exports=a.p+"static/media/logo.dac70980.png"},23:function(e,t,a){e.exports=a(38)},28:function(e,t,a){},29:function(e,t,a){},38:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(19),c=a.n(r),s=(a(28),a(6)),i=a(5),o=a(8),m=a(9),d=a(11),u=a(10),E=a(12),h=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e)))._getStatusText=function(e){return 0===e?"Pending payment":1===e?"Paid":void 0},a.state={orders:[]},fetch("/api/orders").then(function(e){return e.json()}).then(function(e){console.log(e),a.setState({orders:e})}),a}return Object(E.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-header"},l.a.createElement("h4",{className:"card-title"},"Orders List")),l.a.createElement("div",{className:"card-body"},l.a.createElement("table",{className:"table"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Order ID"),l.a.createElement("th",null,"Status"),l.a.createElement("th",null,"Material"),l.a.createElement("th",null,"Size"),l.a.createElement("th",null,"Contact"),l.a.createElement("th",null,"Actions"))),l.a.createElement("tbody",null,0===this.state.orders.length?l.a.createElement("tr",null,l.a.createElement("td",null,"No orders available")):this.state.orders.map(function(t){return l.a.createElement("tr",null,l.a.createElement("td",null,t._id),l.a.createElement("td",null,e._getStatusText(t.status)),l.a.createElement("td",null,t.material),l.a.createElement("td",null,"".concat(t.size.height,"x").concat(t.size.width)),l.a.createElement("td",null,"[Work in progress]"),l.a.createElement("td",null,l.a.createElement("a",{href:"/api/orders/".concat(t._id,"/download")},"Download")))})))))}}]),t}(n.Component),p=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).state={orders:[]},a}return Object(E.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-header"},l.a.createElement("h4",{className:"card-title"},"Settings")),l.a.createElement("div",{className:"card-body"},"[Work in progress]"))}}]),t}(n.Component),b=a(20),g=a.n(b),v=(a(29),function(e){return l.a.createElement("div",{className:"wrapper"},l.a.createElement("div",{className:"sidebar"},l.a.createElement("div",{className:"logo"},l.a.createElement(s.b,{to:"/dashboard",className:"simple-text logo-normal"},l.a.createElement("img",{alt:"Petree's Prints",height:"35",width:"35",src:g.a}),"Petree's Prints")),l.a.createElement("div",{className:"sidebar-wrapper"},l.a.createElement("ul",{className:"nav"},l.a.createElement("li",null,l.a.createElement(s.b,{to:"/dashboard"},l.a.createElement("i",{className:"now-ui-icons design_bullet-list-67"}),"Orders")),l.a.createElement("li",null,l.a.createElement(s.b,{to:"/dashboard/settings"},l.a.createElement("i",{className:"now-ui-icons loader_gear"}),"Settings"))))),l.a.createElement("div",{className:"main-panel"},l.a.createElement("div",{className:"content"},l.a.createElement(i.a,{exact:!0,path:e.match.path,component:h}),l.a.createElement(i.a,{exact:!0,path:"".concat(e.match.path,"settings"),component:p}))))}),N=function(){return l.a.createElement(s.a,null,l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/dashboard/",component:v})))};c.a.render(l.a.createElement(N,null),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.19aac871.chunk.js.map
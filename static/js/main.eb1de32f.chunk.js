(this["webpackJsonpshapkarin.me"]=this["webpackJsonpshapkarin.me"]||[]).push([[0],{157:function(e,t,s){},158:function(e,t,s){},159:function(e,t,s){},164:function(e,t){},487:function(e,t,s){},488:function(e,t,s){},489:function(e,t,s){},490:function(e,t,s){},491:function(e,t,s){},492:function(e,t,s){},493:function(e,t,s){"use strict";s.r(t);var a=s(2),r=s.n(a),c=s(48),i=s.n(c),n=s(20),o=s(13),l=s(10),h=s.n(l);class j{constructor(e){let{x:t,y:s,row:a,col:r,ctx:c}=e;this.getRandomShape=()=>this.drawMethods[h()(this.drawMethods.length-1)],this.getRandomOpacity=()=>Math.random()<.8?h()(.04,.1):h()(.2,.4),this.getColor=()=>"rgba(255, 255, 255, ".concat(this.opacity,")"),this.draw=()=>{this[this.type]()},this.drawCircle=()=>{this.ctx.beginPath(),this.ctx.strokeStyle=this.getColor(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI),this.ctx.stroke(),this.ctx.closePath()},this.drawRect=()=>{this.ctx.beginPath(),this.ctx.strokeStyle=this.getColor(),this.ctx.rect(this.x-this.size/2,this.y-this.size/2,this.size,this.size),this.ctx.stroke(),this.ctx.closePath()},this.animate=()=>{"drawCircle"===this.type?(this.radius+=.05*this.dir,this.radius>=9&&(this.dir=-1,this.type="drawRect"),this.radius<=4&&(this.dir=1)):(this.size+=.05*this.dir,this.size>=16&&(this.dir=-1,this.type="drawCircle"),this.size<=6&&(this.dir=1))},this.randomize=()=>{this.radius=h()(4,9),this.size=h()(6,16),this.type=this.getRandomShape(),this.opacity=this.getRandomOpacity()},this.drawMethods=["drawCircle","drawRect","drawNothing"],this.type=this.getRandomShape(),this.x=t,this.y=s,this.row=a,this.col=r,this.ctx=c,this.radius=h()(4,9),this.size=h()(6,16),this.opacity=this.getRandomOpacity()}drawNothing(){return"heh"}}var d=new class{constructor(){this.createArray=()=>{this.countX=50;const e=[];let t=0,s=0;for(let a=10;a<this.width-10;a+=20){s=0,e.push([]);for(let r=10;r<this.height-10;r+=20)e[t].push(new j({x:a,y:r,ctx:this.ctx,row:t,col:s})),s++;t++}return this.countX=s,e},this.draw=()=>{this.ctx.beginPath(),this.ctx.fillStyle="#17293a",this.ctx.fillRect(0,0,this.width,this.height);for(let t=0;t<this.array2D.length;t++)for(let e=0;e<this.array2D[t].length;e++){this.array2D[t][e].draw()}const e=h()(20,28);for(let t=0;t<e;t++)this.drawCross();this.ctx.closePath()},this.getRandomItem=()=>this.array2D[h()(1,this.array2D.length-1)][h()(1,this.countX-1)],this.drawCross=()=>{const e=this.getRandomItem();this.ctx.strokeStyle="rgba(255, 255, 255, ".concat(h()(.07,.2),")"),this.ctx.beginPath(),this.ctx.moveTo(e.x,e.y);const t=e.col+h()(this.countX-e.col-1),s=this.array2D[e.row][t];this.ctx.lineTo(s.x,s.y);const a=h()(e.col,t),r=this.array2D[h()(0,e.row-1)][a];this.ctx.moveTo(r.x,r.y);const c=this.array2D[h()(0,this.array2D.length-1)][a];this.ctx.lineTo(c.x,c.y),this.ctx.stroke(),this.ctx.closePath()},this.randomizeAll=()=>{for(let e=0;e<this.array2D.length;e++)for(let t=0;t<this.array2D[e].length;t++){this.array2D[e][t].randomize()}},this.randomizeSome=()=>{this.getRandomItem().randomize()},this.animation=()=>{const e=h()(1e3,3e3);setTimeout((()=>{for(let e=0;e<h.a.apply(this,[1,10]);e++)this.randomizeSome();this.draw(),this.animation()}),e)},this.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,this.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,this.canvas=document.createElement("canvas"),this.canvas.id="background",this.canvas.width=this.width,this.canvas.height=this.height,document.body.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.ctx.lineWidth=1,this.array2D=this.createArray(),this.draw()}},b=s(18),u=s(27),p=s.n(u),x=s(6);const m={user:()=>"".concat("https://api.github.com","/users/shapkarin"),activity(){return"".concat(this.user(),"/events/public?per_page=100")},repositories(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return"".concat(this.user(),"/repos?sort=updated&per_page=").concat(64,"&page=").concat(e)},likes(){return"".concat(this.user(),"/starred")}};var g=Object(x.a)(Object(x.a)({},{about:"/api/about.json",packages:{_root:"/api/packages/packages.json",info:e=>"/api/packages/".concat(e,".json")},sketches:{intro:"/api/sketches/intro.json",collection:"/api/sketches/collection.json"}}),m);const O=p.a.create({headers:{Accept:"application/vnd.github.v3+json"}}),f=()=>p.a.get(g.sketches.intro),k=()=>p.a.get(g.sketches.collection),v=()=>p.a.get(g.packages._root),y=()=>O.get(g.likes());var _=s(1);class w extends a.Component{constructor(){super(...arguments),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}render(){return this.state.hasError?Object(_.jsxs)("div",{style:{color:"red",fontSize:18,padding:10,width:742},children:["Could not fetch :-(",Object(_.jsx)("br",{})]}):this.props.children}}var N=w;var P=function(e){let{children:t}=e;return Object(_.jsx)(N,{children:Object(_.jsx)(a.Suspense,{className:"Suspense",fallback:Object(_.jsx)("div",{style:{fontSize:17},children:"Loading...."}),children:t})})};s(157);function S(){const{data:{data:e}}=Object(o.useQuery)("About",(()=>p.a.get(g.about)));return Object(_.jsx)(_.Fragment,{children:Object(_.jsxs)("div",{className:"About About_dark",children:[Object(_.jsx)("h1",{children:e.title}),e.intro,Object(_.jsx)("br",{}),Object(_.jsx)("br",{}),Object(_.jsxs)("a",{href:"https://github.com/shapkarin",target:"_blank",rel:"noreferrer",children:["My Github ",Object(_.jsx)(b.a,{})]}),Object(_.jsx)("br",{}),Object(_.jsxs)("a",{href:"https://github.com/shapkarin/shapkarin.me",target:"_blank",rel:"noreferrer",children:["Website source code",Object(_.jsx)(b.a,{})]}),Object(_.jsx)("br",{}),Object(_.jsx)("br",{}),"The API for this site is generated ",Object(_.jsx)("a",{href:"https://github.com/shapkarin/shapkarin.me/tree/master/src/Generate-Backend",target:"_blank",rel:"noreferrer",children:"by this code"}),Object(_.jsx)(b.a,{})," and stored as ",Object(_.jsx)("a",{href:"https://github.com/shapkarin/shapkarin.me/tree/gh-pages/api",target:"_blank",rel:"noreferrer",children:"JSON files"}),Object(_.jsx)(b.a,{})," on ",Object(_.jsx)("a",{href:"https://github.com/shapkarin/shapkarin.me/tree/main/.github/workflows/deploy.yml",children:"GitHub Pages"}),Object(_.jsx)("br",{}),"semver: ",Object(_.jsx)("a",{href:"https://github.com/shapkarin/shapkarin.me/tree/main/.env#L1",children:"6.1.0"})]})})}function I(){return Object(_.jsx)(P,{children:Object(_.jsx)(S,{})})}var C=s(50),R=s(49);s(158);const G=["children"];var z=e=>{let{children:t}=e,s=Object(R.a)(e,G);return Object(_.jsx)("div",Object(x.a)(Object(x.a)({onClick:function(){d.randomizeAll(),d.draw()}},s),{},{children:t}))},D=s(9);s(159);var E=()=>Object(_.jsx)(n.b,{to:"/",className:"CloseButton",children:Object(_.jsx)(C.b,{})}),F=s(112),L=s.n(F),A=s(516),M=s(517),T=s(515),H=s(113);var Y=e=>{let{title:t,description:s,name:a="Yury Shapkarin",type:r="website"}=e;return Object(_.jsxs)(H.a,{children:[Object(_.jsx)("title",{children:t}),Object(_.jsx)("meta",{name:"description",content:s}),Object(_.jsx)("meta",{property:"og:type",content:r}),Object(_.jsx)("meta",{property:"og:title",content:t}),Object(_.jsx)("meta",{property:"og:description",content:s}),Object(_.jsx)("meta",{name:"twitter:creator",content:a}),Object(_.jsx)("meta",{name:"twitter:card",content:r}),Object(_.jsx)("meta",{name:"twitter:title",content:t}),Object(_.jsx)("meta",{name:"twitter:description",content:s})]})};const B=["children","className","node"];var Q=function(){const{slug:e}=Object(D.g)(),[t,s]=Object(a.useState)(null),[r,c]=Object(a.useState)(null);if(Object(a.useEffect)((()=>{(async()=>{console.log("Loading article:",e);const t=await(async e=>{try{console.log("Fetching article:",e);const t=await fetch("/articles/".concat(e,".md"));if(console.log("Response status:",t.status),!t.ok)throw new Error("HTTP error! status: ".concat(t.status));const s=await t.text();return console.log("Fetched content:",s.substring(0,100)),s}catch(r){return console.error("Error loading article:",r),null}})(e);t?(console.log("Setting content..."),s(t)):c("Failed to load article")})()}),[e]),console.log("Current state:",{error:r,content:t,articleName:e}),r)return Object(_.jsxs)("div",{children:["Error: ",r]});if(!t)return Object(_.jsx)("div",{children:"Loading..."});const{data:i,content:n}=L()(t);return Object(_.jsxs)("div",{className:"Article",children:[Object(_.jsx)(Y,{title:"".concat(i.title||e," | Yury Shapkarin"),description:i.description||"Article about ".concat(e),type:"article",name:"Yury Shapkarin"}),Object(_.jsx)(A.a,{components:{code(e){const{children:t,className:s,node:a}=e,r=Object(R.a)(e,B),c=/language-(js|javascript|jsx|ts|typescript|bash|sh)/.exec(s||"");return c?Object(_.jsx)(M.a,Object(x.a)(Object(x.a)({},r),{},{PreTag:"div",language:"js"===c[1]?"javascript":c[1],style:T.a,children:String(t).replace(/\n$/,"")})):Object(_.jsx)("code",Object(x.a)(Object(x.a)({},r),{},{className:s,children:t}))}},children:n})]})};var W=()=>Object(_.jsx)("div",{className:"Page",children:Object(_.jsxs)(D.d,{children:[le.reduce(((e,t)=>{let{name:s,path:r,Page:c,redirect:i,redirects:n}=t;return[...e,Object(_.jsx)(D.b,{exact:!0,path:r,children:Object(_.jsxs)(P,{children:[Object(_.jsx)(E,{}),Object(_.jsx)(c,{})]})},"Route_".concat(s)),i&&Object(a.createElement)(D.a,Object(x.a)(Object(x.a)({},i),{},{key:"Redirect_".concat(s)})),n&&n.map(((e,t)=>Object(a.createElement)(D.a,Object(x.a)(Object(x.a)({},e),{},{key:"Redirect_".concat(s,"_").concat(t)}))))]}),[]),Object(_.jsx)(D.b,{exact:!0,path:"/github",render:()=>(window.location="https://github.com/shapkarin","Congrats! Redirecting to my GitHub profile...")}),Object(_.jsx)(D.b,{exact:!0,path:"/articles/:slug",component:Q})]})}),J=s(15);class X extends a.PureComponent{render(){const{open:e,children:t}=this.props;return e?Object(_.jsx)("div",{children:t}):null}}var U=function(e){let{children:t}=e;return(null===t||void 0===t?void 0:t.split("\n").map(((e,t)=>Object(_.jsxs)(a.Fragment,{children:[e,Object(_.jsx)("br",{})]},t))))||null};function q(e){let{id:t}=e;const{data:{data:{description:s,badges:a}={}}={}}=Object(o.useQuery)(["PackageIntro",t],(()=>(e=>p.a.get(g.packages.info(e)))(t)));return Object(_.jsxs)("div",{className:"Package__Info",children:[Object(_.jsx)(U,{children:s}),Object(_.jsx)("div",{className:"Package__Badges",children:a.map((e=>{let{title:s,link:a}=e;return Object(_.jsx)("img",{alt:s,src:a,className:"Package__Badges__Item"},"".concat(t,"_").concat(s))}))})]})}function $(e){let{id:t}=e;const[s,r]=Object(a.useState)(!1),c=Object(a.useMemo)((()=>s),[s]);return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsxs)("div",{className:"toggle_info",onClick:()=>r(!s),children:["package info ",s?Object(_.jsx)(J.a,{}):Object(_.jsx)(J.b,{})]}),Object(_.jsx)(P,{children:Object(_.jsx)(X,{open:c,children:Object(_.jsx)(q,{id:t})})})]})}function K(){return Object(_.jsx)("div",{children:Object(_.jsxs)("a",{className:"PagePackages__Item_more",style:{width:"185px"},href:"https://www.npmjs.com/~shapkarin",target:"_blank",rel:"noreferrer",children:["Npm packages"," ",Object(_.jsx)(b.a,{})]})})}s(487);function V(){const{data:{data:{packages:e}}}=Object(o.useQuery)("Packages",v);return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(Y,{title:"JavaScript & TypeScript NPM Packages | Yury Shapkarin",description:"Explore a collection of JavaScript, TypeScript, and Node.js NPM packages for modern web development. Open-source modules for Redux, React, and more.",type:"website",name:"Yury Shapkarin"}),Object(_.jsxs)("div",{className:"PagePackages Page__Inner",children:[Object(_.jsx)("div",{children:e.map((e=>{let{title:t,url:s,id:a}=e;return Object(_.jsxs)("div",{className:"PagePackages__Item",children:[Object(_.jsxs)("a",{target:"_blank",rel:"noreferrer",href:s,children:[t," ",Object(_.jsx)(b.a,{})]}),Object(_.jsx)($,{id:a})]},a)}))}),Object(_.jsx)(K,{})]})]})}var Z=s(52),ee=s(53);s(488);function te(){const{data:{data:e}}=Object(o.useQuery)(["Repositories",1],(()=>function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return O.get(g.repositories(e))}(1)));return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(Y,{title:"GitHub Repositories | Yury Shapkarin",description:"Browse my open-source projects and contributions on GitHub. Collection of web development repositories focusing on JavaScript, React, Redux, and modern web technologies.",type:"website",name:"Yury Shapkarin"}),Object(_.jsx)(Z.a,{place:"left"}),Object(_.jsxs)("div",{className:"Page__Github Page__Inner",children:[e.map((e=>{let{id:t,name:s,html_url:a,description:r,open_issues_count:c,homepage:i,fork:n,updated_at:o,language:l,languages_url:h}=e;return Object(_.jsx)("div",{className:"Page__GithubItem",children:Object(_.jsxs)("div",{className:"Page__GithubItemInner",children:[Object(_.jsxs)("a",{className:"GithubItem__Link centered-label",href:a,target:"_blank",rel:"noreferrer",children:[s,n&&Object(_.jsx)(J.f,{"data-tip":"fork"})]}),Object(_.jsx)("div",{className:"centered-label",style:{lineHeight:"20px"},children:r}),Object(_.jsxs)("div",{className:"centered-label",children:[Object(_.jsx)(J.d,{"data-tip":"Last update"})," ",new Date(o).toLocaleDateString("ru-RU")]}),c>0&&Object(_.jsxs)("div",{className:"centered-label",children:[Object(_.jsx)(J.c,{})," ","Open issues:"," ",Object(_.jsx)("a",{className:"IssuesCount",href:"".concat(a,"/issues"),target:"_blank",rel:"noreferrer",children:c})]}),i&&Object(_.jsxs)("div",{className:"centered-label",children:[Object(_.jsx)(ee.a,{})," ",Object(_.jsx)("a",{href:i,target:"_blank",rel:"noreferrer",children:"Website"})]}),l&&Object(_.jsxs)(_.Fragment,{children:["Language:"," ",Object(_.jsx)("a",{href:h,children:l})]})]})},t)})),Object(_.jsx)("div",{className:"Page__GithubItem",style:{flexBasis:"100%"},children:Object(_.jsx)("div",{className:"Page__GithubItemInner",children:Object(_.jsxs)("a",{href:"https://github.com/shapkarin?tab=repositories",target:"_blank",rel:"noreferrer",className:"GithubItem__Link",children:["More ",Object(_.jsx)(b.a,{})]})})})]})]})}var se=s(121);function ae(){const{data:{data:e}}=Object(o.useQuery)("Liked",y);return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(Y,{title:"Starred GitHub Projects | Yury Shapkarin",description:"Discover my curated collection of starred GitHub repositories. A handpicked selection of innovative open-source projects, development tools, and libraries that I find valuable.",type:"website",name:"Yury Shapkarin"}),Object(_.jsx)(Z.a,{place:"left"}),Object(_.jsxs)("div",{className:"Page__Github Page__Inner",children:[e.map((e=>{let{id:t,full_name:s,html_url:a,description:r,open_issues_count:c,stargazers_count:i,homepage:n,fork:o,updated_at:l,language:h,languages_url:j}=e;return Object(_.jsx)("div",{className:"Page__GithubItem",children:Object(_.jsxs)("div",{className:"Page__GithubItemInner",children:[Object(_.jsxs)("a",{className:"GithubItem__Link centered-label",href:a,target:"_blank",rel:"noreferrer",children:[s,o&&Object(_.jsx)(J.f,{"data-tip":"fork"})]}),Object(_.jsx)("div",{className:"centered-label",style:{lineHeight:"20px",marginBottom:"6px"},children:r}),Object(_.jsxs)("div",{className:"centered-label",children:[Object(_.jsx)(J.d,{"data-tip":"Last update"})," ",new Date(l).toLocaleDateString("ru-RU")]}),!!n&&Object(_.jsxs)("div",{className:"centered-label",children:[Object(_.jsx)(ee.a,{})," ",Object(_.jsx)("a",{href:n,target:"_blank",rel:"noreferrer",children:"Website"})]}),i>0&&Object(_.jsxs)("div",{className:"centered-label",children:[Object(_.jsx)(se.a,{size:"18px"})," ","Stars:"," ",i]}),c>0&&Object(_.jsxs)("div",{className:"centered-label",children:[Object(_.jsx)(J.c,{})," ","Open issues:"," ",Object(_.jsx)("a",{className:"IssuesCount",href:"".concat(a,"/issues"),target:"_blank",rel:"noreferrer",children:c})]}),h&&Object(_.jsxs)(_.Fragment,{children:["Language:"," ",Object(_.jsx)("a",{href:j,target:"_blank",rel:"noreferrer",children:h})]})]})},t)})),Object(_.jsx)("div",{className:"Page__GithubItem",style:{flexBasis:"100%"},children:Object(_.jsx)("div",{className:"Page__GithubItemInner",children:Object(_.jsxs)("a",{href:"https://github.com/shapkarin?tab=stars",target:"_blank",rel:"noreferrer",className:"GithubItem__Link",children:["More ",Object(_.jsx)(b.a,{})]})})})]})]})}s(489);function re(){return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(Y,{title:"Creative Coding & Generative Art | Yury Shapkarin",description:"Explore my collection of creative coding experiments, generative art, and interactive animations. Algorithmic drawings and visual experiments created with JavaScript and creative coding libraries.",type:"website",name:"Yury Shapkarin"}),Object(_.jsxs)("div",{className:"Page__Sketches Page__Inner Page__Inner_dark",children:[Object(_.jsx)(P,{children:Object(_.jsx)(ce,{})}),Object(_.jsx)(P,{children:Object(_.jsx)(ie,{})})]})]})}function ce(){const{data:{data:{title:e,description:t}}}=Object(o.useQuery)("SketchesIntro",f);return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)("h1",{children:e}),Object(_.jsx)("p",{style:{lineHeight:"24px"},children:Object(_.jsx)(U,{children:t})})]})}function ie(){const{data:{data:e}}=Object(o.useQuery)("Sketches",k);return Object(_.jsx)("div",{className:"Gal__Wrapper",children:Object.keys(e).map((t=>Object(_.jsxs)("div",{className:"Gal__Column",children:[Object(_.jsx)("h3",{children:"".concat(t,":")}),e[t].map(((e,s)=>Object(a.createElement)("a",Object(x.a)(Object(x.a)({},e),{},{key:"".concat(t,"-").concat(s),className:"Gal--Item",target:"_blank"}),e.title)))]},t)))})}s(490);var ne=function(){const[e,t]=Object(a.useState)([]),[s,r]=Object(a.useState)(null);return Object(a.useEffect)((()=>{(async()=>{try{const e=await fetch("/articles/list.json");if(!e.ok)throw new Error("HTTP error! status: ".concat(e.status));const s=await e.json();t(s)}catch(s){console.error("Error loading articles:",s),r("Failed to load articles")}})()}),[]),s?Object(_.jsxs)("div",{children:["Error: ",s]}):e.length?Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(Y,{title:"Software Development Articles & Tutorials | Yury Shapkarin",description:"Read technical articles about JavaScript development, React ecosystem, Redux patterns, and software engineering. In-depth tutorials and guides about my open-source packages.",type:"blog",name:"Yury Shapkarin"}),Object(_.jsx)("h1",{children:"Articles"}),Object(_.jsx)("ul",{children:e.map((e=>Object(_.jsx)("li",{children:Object(_.jsx)(n.b,{to:"/articles/".concat(e.slug),children:e.title})},e.slug)))})]}):Object(_.jsx)("div",{children:"Loading articles..."})},oe=s(55);var le=[{name:"Repositories",path:"/github/repositories",redirect:{from:"/repositories",to:"/github/repositories"},icon:()=>Object(_.jsx)(J.e,{}),Page:()=>Object(_.jsx)(te,{})},{name:"Likes",path:"/github/likes",redirects:[{from:"/likes",to:"/github/stars"},{from:"/liked",to:"/github/stars"},{from:"/stars",to:"/github/stars"}],icon:()=>Object(_.jsx)(J.g,{size:"1.2em"}),Page:()=>Object(_.jsx)(ae,{})},{name:"Packages",path:"/packages",redirect:{from:"/projects",to:"/packages"},icon:()=>Object(_.jsx)(oe.b,{size:"1.24em"}),Page:e=>Object(_.jsx)(V,Object(x.a)({},e))},{name:"Creative",path:"/sketches",redirect:{from:"/generative",to:"/sketches"},icon:()=>Object(_.jsx)(oe.c,{}),Page:()=>Object(_.jsx)(re,{})},{name:"Articles",path:"/articles",icon:()=>Object(_.jsx)(oe.a,{}),Page:()=>Object(_.jsx)(ne,{})}];s(491);var he=()=>Object(_.jsxs)("nav",{className:"Menu",children:[le.map((e=>{let{name:t,path:s,icon:a}=e;return Object(_.jsxs)(n.c,{to:s,className:"Menu__Item",activeClassName:"Menu__Item--active",children:[a()," ",t]},"Menu_".concat(t))})),Object(_.jsxs)(z,{className:"Menu__Item--bckg",children:[Object(_.jsx)(C.a,{})," Background"]})]});s(492);const je=new o.QueryClient({defaultOptions:{queries:{suspense:!0,staleTime:102e4}}});function de(){return Object(_.jsxs)(o.QueryClientProvider,{client:je,children:[Object(_.jsx)(I,{}),Object(_.jsx)("div",{className:"Wrap",children:Object(_.jsxs)(n.a,{children:[Object(_.jsx)(he,{}),Object(_.jsx)(W,{})]})})]})}var be=e=>{e&&e instanceof Function&&s.e(3).then(s.bind(null,518)).then((t=>{let{getCLS:s,getFID:a,getFCP:r,getLCP:c,getTTFB:i}=t;s(e),a(e),r(e),c(e),i(e)}))};i.a.render(Object(_.jsx)(r.a.StrictMode,{children:Object(_.jsx)(de,{})}),document.getElementById("root")),be()}},[[493,1,2]]]);
//# sourceMappingURL=main.eb1de32f.chunk.js.map
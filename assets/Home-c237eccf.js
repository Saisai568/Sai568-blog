import{_ as u,u as p}from"./blog-70dd732e.js";import{s as m,o as f,r as g,a as o,c as t,b as s,u as n,t as a,F as v,d as h,e as k,w as y,f as x}from"./index-b7706d49.js";const b={class:"home"},B={class:"featured-posts"},H={key:0,class:"loading"},N={key:1,class:"error"},S={key:2,class:"posts-grid"},V={__name:"Home",setup(w){const l=p(),{posts:_,loading:c,error:d}=m(l);return f(()=>{l.fetchPosts()}),(C,e)=>{const i=g("router-link");return o(),t("div",b,[e[2]||(e[2]=s("header",{class:"hero"},[s("h1",null,"歡迎來到我的技術部落格"),s("p",null,"分享技術、學習和開發經驗")],-1)),s("section",B,[e[1]||(e[1]=s("h2",null,"最新文章",-1)),n(c)?(o(),t("div",H,"載入中...")):n(d)?(o(),t("div",N,a(n(d)),1)):(o(),t("div",S,[(o(!0),t(v,null,h(n(_),r=>(o(),t("div",{key:r.id,class:"post-card"},[s("h3",null,a(r.title),1),s("p",null,a(r.content.substring(0,150))+"...",1),k(i,{to:`/blog/${r.id}`,class:"read-more"},{default:y(()=>e[0]||(e[0]=[x(" 閱讀更多 ")])),_:2},1032,["to"])]))),128))]))])])}}},D=u(V,[["__scopeId","data-v-d304cf63"]]);export{D as default};

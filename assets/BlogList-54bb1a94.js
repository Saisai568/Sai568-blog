import{_ as u,u as p}from"./blog-70dd732e.js";import{s as g,o as m,r as f,a as e,c as t,b as a,u as r,t as n,F as k,d as v,e as b,w as h,f as x}from"./index-b7706d49.js";const y={class:"blog-list"},B={key:0,class:"loading"},L={key:1,class:"error"},S={key:2,class:"posts"},w={class:"date"},D={class:"excerpt"},N={__name:"BlogList",setup(V){const l=p(),{posts:c,loading:d,error:_}=g(l);return m(()=>{l.fetchPosts()}),(C,o)=>{const i=f("router-link");return e(),t("div",y,[o[1]||(o[1]=a("h1",null,"所有文章",-1)),r(d)?(e(),t("div",B," 載入中... ")):r(_)?(e(),t("div",L,n(r(_)),1)):(e(),t("div",S,[(e(!0),t(k,null,v(r(c),s=>(e(),t("article",{key:s.id,class:"post"},[a("h2",null,n(s.title),1),a("p",w,n(new Date(s.created_at).toLocaleDateString()),1),a("p",D,n(s.content.substring(0,200))+"...",1),b(i,{to:`/blog/${s.id}`,class:"read-more"},{default:h(()=>o[0]||(o[0]=[x(" 閱讀更多 ")])),_:2},1032,["to"])]))),128))]))])}}},E=u(N,[["__scopeId","data-v-d15deeb3"]]);export{E as default};

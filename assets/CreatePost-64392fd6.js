import{j as x,k as a,r as y,a as i,c as d,b as t,l as c,v as p,t as v,e as g,w as k,i as w,m as C,f as V}from"./index-b7706d49.js";import{_ as S,u as h}from"./blog-70dd732e.js";const B={class:"create-post"},N={class:"form-group"},P={class:"form-group"},M={class:"form-actions"},q=["disabled"],D={key:0,class:"error"},T={__name:"CreatePost",setup(U){const _=x(),m=h(),l=a(""),r=a(""),o=a(!1),s=a(null),f=async()=>{o.value=!0,s.value=null;try{await m.createPost({title:l.value,content:r.value}),_.push("/")}catch(u){s.value=u.message}finally{o.value=!1}};return(u,e)=>{const b=y("router-link");return i(),d("div",B,[e[5]||(e[5]=t("h1",null,"撰寫新文章",-1)),t("form",{onSubmit:C(f,["prevent"]),class:"post-form"},[t("div",N,[e[2]||(e[2]=t("label",{for:"title"},"標題",-1)),c(t("input",{type:"text",id:"title","onUpdate:modelValue":e[0]||(e[0]=n=>l.value=n),required:"",placeholder:"請輸入文章標題"},null,512),[[p,l.value]])]),t("div",P,[e[3]||(e[3]=t("label",{for:"content"},"內容",-1)),c(t("textarea",{id:"content","onUpdate:modelValue":e[1]||(e[1]=n=>r.value=n),required:"",rows:"15",placeholder:"請輸入文章內容（支援 Markdown 格式）"},null,512),[[p,r.value]])]),t("div",M,[t("button",{type:"submit",disabled:o.value},v(o.value?"發布中...":"發布文章"),9,q),g(b,{to:"/",class:"cancel-btn"},{default:k(()=>e[4]||(e[4]=[V("取消")])),_:1})]),s.value?(i(),d("div",D,v(s.value),1)):w("",!0)],32)])}}},I=S(T,[["__scopeId","data-v-e6e8bdde"]]);export{I as default};

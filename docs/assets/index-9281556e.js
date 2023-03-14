(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const p of d.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function l(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(o){if(o.ep)return;o.ep=!0;const d=l(o);fetch(o.href,d)}})();const v=`<section class="todoapp">
    <header class="header">
        <h1>Tareas</h1>
        <input id="new-todo-input" class="new-todo" placeholder="Guarda una tarea" autofocus>
    </header>
    
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Marca al completar</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
            <!-- <li class="completed" data-id="abc">
                <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>Probar JavaScript</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li> -->
            <!-- <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>Comprar un unicornio</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
            </li> -->
        </ul>
    </section>

    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
        <!-- This should be "0 items left" by default -->
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <a class="filtro" class="selected" href="#/">Todos</a>
            </li>
            <li>
                <a class="filtro" href="#/active">Pendientes</a>
            </li>
            <li>
                <a class="filtro" href="#/completed">Completados</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Borrar completados</button>
    </footer>
</section>


<footer class="info">
    <p>Template creado por <a href="#">Danbs08</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Creado por <a href="#">ti</a></p>
    <p>Parte de <a href="#">Danbs08</a></p>
</footer>`;let y;const C=new Uint8Array(16);function L(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(C)}const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));function S(e,t=0){return(n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]).toLowerCase()}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:E};function P(e,t,l){if(w.randomUUID&&!t&&!e)return w.randomUUID();e=e||{};const i=e.random||(e.rng||L)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){l=l||0;for(let o=0;o<16;++o)t[l+o]=i[o];return t}return S(i)}class A{constructor(t){this.id=P(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"Completed",Pending:"Pending"},r={todos:[],filter:c.All},I=()=>{T(),console.log("InitStore")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));r.todos=e,r.filter=t},h=()=>{localStorage.setItem("state",JSON.stringify(r))},U=(e=c.All)=>{switch(e){case c.All:return[...r.todos];case c.Completed:return r.todos.filter(t=>t.done);case c.Pending:return r.todos.filter(t=>!t.done);default:throw new Error(`El ${e} no es valido`)}},k=e=>{if(!e)throw new Error("Se requiere una descripcion");r.todos.push(new A(e)),h()},x=e=>{r.todos=r.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),h()},q=e=>{r.todos=r.todos.filter(t=>t.id!==e),h()},F=()=>{r.todos=r.todos.filter(e=>!e.done),h()},D=(e=c.All)=>{r.filter=e,h()},M=()=>r.filter,a={initStore:I,loadStore:T,getTodos:U,addTodo:k,toggleTodo:x,deleteTodo:q,deleteCompleted:F,setFilter:D,getCurrentFilter:M};let b;const N=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error(`El elemento ${e} no funciona`);b.innerHTML=a.getTodos(c.Pending).length},O=e=>{if(!e)throw new Error("El todo es requerido");const t=`
        <div class="view">
            <input class="toggle" type="checkbox" ${e.done?"checked":""}>
            <label>${e.description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `,l=document.createElement("li");return l.innerHTML=t,l.setAttribute("data-id",e.id),e.done&&l.classList.add("completed"),l};let g;const H=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`El elemeto ${e} no funciona `);g.innerHTML="",t.forEach(l=>{g.append(O(l))})},m={TodoList:".todo-list",NewTodoInput:"#new-todo-input",ClearCompletedButton:".clear-completed",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},R=e=>{const t=()=>{const s=a.getTodos(a.getCurrentFilter());H(m.TodoList,s),l()},l=()=>{N(m.PendingCountLabel)};(()=>{const s=document.createElement("div");s.innerHTML=v,document.querySelector(e).append(s),t()})();const i=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),d=document.querySelector(m.ClearCompletedButton),p=document.querySelectorAll(m.TodoFilters);i.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value.trim().length!==0&&(a.addTodo(s.target.value),t(),s.target.value="")}),o.addEventListener("click",s=>{const u=s.target.closest("[ data-id ]");a.toggleTodo(u.getAttribute("data-id")),t(),console.log(u)}),o.addEventListener("click",s=>{const u=s.target.className==="destroy",f=s.target.closest("[ data-id ]");!u||!f||(a.deleteTodo(f.getAttribute("data-id")),t())}),d.addEventListener("click",()=>{a.deleteCompleted(),t()}),p.forEach(s=>{s.addEventListener("click",u=>{switch(p.forEach(f=>f.classList.remove("selected")),u.target.classList.add("selected"),u.target.text){case"Todos":a.setFilter(c.All);break;case"Pendientes":a.setFilter(c.Pending);break;case"Completados":a.setFilter(c.Completed);break}t()})})};a.initStore();R("#app");

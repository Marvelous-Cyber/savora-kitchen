(function(){
  var WA="2348012345678"; // replace with your real WhatsApp number (country code, no +)
  var MENU=[
    {n:"Party Jollof Rice",c:"Mains",p:4500,d:"Smoky tomato-pepper rice with fried plantain and a side of coleslaw."},
    {n:"Pounded Yam & Egusi",c:"Mains",p:5500,d:"Smooth pounded yam with melon-seed soup, assorted meat and stockfish."},
    {n:"Ofada Rice & Ayamase",c:"Mains",p:5000,d:"Local ofada rice with green pepper stew, served with boiled egg."},
    {n:"Efo Riro & Amala",c:"Mains",p:4800,d:"Spinach stew with locust beans and goat meat, served with soft amala."},
    {n:"Chicken Suya",c:"Grill",p:3800,d:"Charcoal-grilled chicken rubbed in yaji spice, with onions and tomato."},
    {n:"Beef Suya",c:"Grill",p:3500,d:"Thin-sliced beef skewers with groundnut spice and fresh cabbage."},
    {n:"Grilled Croaker Fish",c:"Grill",p:6500,d:"Whole fish marinated in peppers and herbs, grilled over open coals."},
    {n:"Puff Puff",c:"Small chops",p:1500,d:"Soft fried dough balls, lightly sweet and dusted with sugar."},
    {n:"Peppered Gizzard",c:"Small chops",p:2500,d:"Tender gizzard tossed in scotch bonnet sauce with peppers and onions."},
    {n:"Moi Moi",c:"Small chops",p:1800,d:"Steamed bean pudding with peppers, egg and fish."},
    {n:"Chapman",c:"Drinks",p:2000,d:"Fruity Nigerian cocktail-style drink with citrus, grenadine and bitters. Alcohol-free."},
    {n:"Zobo",c:"Drinks",p:1200,d:"Chilled hibiscus drink with ginger, pineapple and cloves."},
    {n:"Chilled Kunu",c:"Drinks",p:1000,d:"Creamy millet and ginger drink, lightly sweetened."}
  ];
  var cats=["All"].concat(MENU.map(function(m){return m.c}).filter(function(c,i,a){return a.indexOf(c)===i}));
  var fmt=function(n){return "₦"+n.toLocaleString("en-NG")};
  var tabs=document.getElementById("tabs"), items=document.getElementById("items");

  items.innerHTML=MENU.map(function(m,i){
    var msg=encodeURIComponent("Hello Savora Kitchen, I would like to order: "+m.n);
    return '<article class="item" data-c="'+m.c+'"><div class="top"><h3>'+m.n+'</h3><span class="price">'+fmt(m.p)+'</span></div><p>'+m.d+'</p><a class="order" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+msg+'">Order on WhatsApp</a></article>';
  }).join("");
  cats.forEach(function(c){
    var b=document.createElement("button");
    b.className="tab";b.textContent=c;b.setAttribute("aria-pressed",c==="All");
    b.onclick=function(){
      [].forEach.call(tabs.children,function(t){t.setAttribute("aria-pressed",t===b)});
      [].forEach.call(items.children,function(it){it.classList.toggle("hidden",c!=="All"&&it.dataset.c!==c)});
    };
    tabs.appendChild(b);
  });

  // nav
  var burger=document.getElementById("burger"), links=document.getElementById("links");
  burger.onclick=function(){var o=links.classList.toggle("open");burger.setAttribute("aria-expanded",o);burger.textContent=o?"✕":"☰"};
  links.addEventListener("click",function(e){if(e.target.tagName==="A"){links.classList.remove("open");burger.setAttribute("aria-expanded","false");burger.textContent="☰"}});
  var secs=["home","about","menu","gallery","contact"].map(function(id){return document.getElementById(id)});
  var topBtn=document.getElementById("topBtn");
  addEventListener("scroll",function(){
    var y=scrollY+120,cur="home";
    secs.forEach(function(s){if(s.offsetTop<=y)cur=s.id});
    [].forEach.call(links.querySelectorAll("a"),function(a){a.classList.toggle("active",a.getAttribute("href")==="#"+cur)});
    topBtn.style.display=scrollY>600?"block":"none";
  },{passive:true});
  topBtn.onclick=function(){scrollTo({top:0})};

  // gallery
  // Each entry: [emoji fallback, caption, colour class, photo file in /images]
  var G=[["🍛","Smoky rice with grilled chicken","t1","images/gallery-1.jpg"],["🌿","Fresh peppers from our garden","t2","images/gallery-2.jpg"],["🍢","Suya on the charcoal grill","t3","images/gallery-3.jpg"],["🌶️","Scotch bonnets for our stews","t4","images/gallery-4.jpg"],["🪑","Open-air dining by the water","t5","images/gallery-5.jpg"],["🍹","Chilled zobo with lime","t6","images/gallery-6.jpg"]];
  var grid=document.getElementById("grid"), dlg=document.getElementById("dlg");
  grid.innerHTML=G.map(function(g,i){return '<button class="tile '+g[2]+'" data-i="'+i+'" aria-label="'+g[1]+'">'+g[0]+'<img src="'+g[3]+'" alt="'+g[1]+'" loading="lazy"><span class="cap">'+g[1]+'</span></button>'}).join("");
  // if a photo is missing, remove it so the emoji tile shows instead
  [].forEach.call(grid.querySelectorAll("img"),function(img){img.addEventListener("error",function(){img.remove()})});
  grid.onclick=function(e){
    var t=e.target.closest(".tile"); if(!t)return;
    var g=G[t.dataset.i];
    var big=document.getElementById("dBig"), photo=t.querySelector("img");
    big.textContent="";
    big.className="big "+g[2];
    if(photo){var p=document.createElement("img");p.src=photo.src;p.alt=g[1];big.appendChild(p)}else{big.textContent=g[0]}
    document.getElementById("dCap").textContent=g[1];
    dlg.showModal();
  };
  document.getElementById("dClose").onclick=function(){dlg.close()};
  dlg.addEventListener("click",function(e){if(e.target===dlg)dlg.close()});

  // hero: use images/hero.jpg if it exists, otherwise keep the SVG plate
  var plate=document.querySelector(".plate"), hp=new Image();
  hp.onload=function(){hp.className="plate hero-photo";hp.alt="Jollof rice with grilled chicken and fried plantain";plate.replaceWith(hp)};
  hp.src="images/hero.jpg";

  // WhatsApp + footer year
  document.getElementById("waLink").href="https://wa.me/"+WA+"?text="+encodeURIComponent("Hello Savora Kitchen, I would like to make an enquiry.");
  document.getElementById("yr").textContent=new Date().getFullYear();

  // form validation
  var f=document.getElementById("form"), ok=document.getElementById("ok");
  var rules={
    name:function(v){return v.trim().length<2?"Enter your full name.":""},
    email:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())?"":"Enter a valid email, like name@example.com."},
    phone:function(v){return /^(\+?234|0)[789][01]\d{8}$/.test(v.replace(/[\s-]/g,""))?"":"Enter a Nigerian number, like 08012345678."},
    msg:function(v){return v.trim().length<10?"Write at least 10 characters.":""}
  };
  function check(k){
    var el=f.elements[k],m=rules[k](el.value);
    document.getElementById("e-"+k).textContent=m;
    el.classList.toggle("bad",!!m);
    el.setAttribute("aria-invalid",!!m);
    return !m;
  }
  Object.keys(rules).forEach(function(k){f.elements[k].addEventListener("blur",function(){check(k)});f.elements[k].addEventListener("input",function(){if(f.elements[k].classList.contains("bad"))check(k)})});
  f.addEventListener("submit",function(e){
    e.preventDefault();
    var valid=Object.keys(rules).map(check).every(Boolean);
    if(!valid){ok.classList.add("hidden");var b=f.querySelector(".bad");if(b)b.focus();return}
    var text="Hello Savora Kitchen,\n\nName: "+f.elements.name.value.trim()+"\nEmail: "+f.elements.email.value.trim()+"\nPhone: "+f.elements.phone.value.trim()+"\n\n"+f.elements.msg.value.trim();
    window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(text),"_blank","noopener");
    ok.textContent="Thank you, "+f.elements.name.value.trim().split(" ")[0]+". WhatsApp should now be open with your message ready to send.";
    ok.classList.remove("hidden");f.reset();
  });
})();

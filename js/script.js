const btn = document.getElementById("menu-btn");
const overlay = document.getElementById("overlay");
const menu = document.getElementById("mobile-menu");
const counters = document.querySelectorAll(".counter");
let scrollStarted = false;
window.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;
  console.log(scroll);
});
const faders = document.querySelectorAll(".fade-in");
const appearOptions = {
  threshold: 1,
  rootMargin: "0px 0px -50px 0px",
};
const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);
faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});
btn.addEventListener("click", navToggle);
document.addEventListener("scroll", scrollPage);
function navToggle() {
  btn.classList.toggle("open");
  overlay.classList.toggle("overlay-show");
  document.body.classList.toggle("stop-scrolling");
  menu.classList.toggle("show-menu");
}
function scrollPage() {
  const scrollPos = window.scrollY;
  if (scrollPos > 100 && !scrollStarted) {
    countUp();
    scrollStarted = true;
  } else if (scrollPos < 100 && scrollStarted) {
    reset();
    scrollStarted = false;
  }
}

function countUp() {
  counters.forEach((counter) => {
    counter.innerText = "0";
    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const c = +counter.innerText;
      const increment = target / 10;
      if (c < target) {
        counter.innerText = `${Math.ceil(c + increment)}`;
        setTimeout(updateCounter, 100);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
}
function reset() {
  counters.forEach((counter) => (counter.innerHTML = "0"));
}

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".dropdown-menu");
  const options = dropdown.querySelectorAll(".dropdown-menu li");
  const selected = dropdown.querySelector(".selected");
  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("dropdown-menu-open");
  });
  options.forEach(option => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("dropdown-menu-open");
      options.forEach(option => {
        option.classList.remove("active");
      });
      option.classList.add("active");
    });
  });
});
const header2=document.querySelector(".main-header2");
window.addEventListener("scroll",function(){
  header2.classList.toggle("sticky",this.window.scrollY>0);
});


let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 9000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 9000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};

function searchBlog(){
  let filter=document.getElementById('filter').value.toUpperCase(); 
  let tableRecord=document.getElementById("tjob")

  let tr=tableRecord.getElementsByTagName("tr");
  for (var i=0; i<tr.length;i++){
    let td=tr[i].getElementsByTagName('td')[0];
    if(td){
      let textvalue=td.textContent||td.innerHTML;
      if(textvalue.toUpperCase().indexOf(filter)>-1){
        tr[i].style.display="";
      }else{
        tr[i].style.display="none";
      }
    }
  }
}
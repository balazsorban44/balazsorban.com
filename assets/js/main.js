"use strict";window.addEventListener("load",function e(){window.removeEventListener("load",e,!1),init()},!1);var init=function(){function e(e){var t=e.clientX,n=e.clientY;i.style.margin=a/20+n/20+"px 0",c.style.minWidth=70+t/100+"vw"}document.querySelector("#age").innerText=function(e){var t=new Date,n=new Date(e),o=t.getFullYear()-n.getFullYear(),r=t.getMonth()-n.getMonth();return(r<0||0===r&&t.getDate()<n.getDate())&&o--,o}("1994.12.17");var t=document.querySelector("#intro"),n=document.querySelector("#me-text"),o=document.querySelector(".open"),r=document.querySelector(".close"),i=document.querySelector("#card"),c=document.querySelector("#landing"),a=window.innerHeight;o.addEventListener("click",function(){n.classList.remove("rotated-left"),t.classList.add("rotated-right")}),r.addEventListener("click",function(){t.classList.remove("rotated-right"),n.classList.add("rotated-left")}),window.matchMedia("(hover:hover)").matches&&(document.onmousemove=e)};
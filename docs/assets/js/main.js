"use strict";function getAge(e){var t=new Date,n=new Date(e),o=t.getFullYear()-n.getFullYear(),a=t.getMonth()-n.getMonth();return(a<0||0===a&&t.getDate()<n.getDate())&&o--,o}function handleMouseMove(e){var t=e.clientX,n=e.clientY;card.style.margin=iH/20+n/20+"px 0",landing.style.minWidth=70+t/100+"vw"}!function(e,t,n,o,a,c,r){e.GoogleAnalyticsObject=a,e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e[a].l=1*new Date,c=t.createElement(n),r=t.getElementsByTagName(n)[0],c.async=1,c.src=o,r.parentNode.insertBefore(c,r)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga"),ga("create","UA-77916573-1","auto"),ga("send","pageview"),document.querySelector("#age").innerText=getAge("1994.12.17");var intro=document.querySelector("#intro"),meText=document.querySelector("#me-text"),open=document.querySelector(".open"),close=document.querySelector(".close"),card=document.querySelector("#card"),landing=document.querySelector("#landing"),iH=window.innerHeight;open.addEventListener("click",function(){meText.classList.remove("rotated-left"),intro.classList.add("rotated-right")}),close.addEventListener("click",function(){intro.classList.remove("rotated-right"),meText.classList.add("rotated-left")}),window.matchMedia("(hover:hover)").matches&&(document.onmousemove=handleMouseMove);
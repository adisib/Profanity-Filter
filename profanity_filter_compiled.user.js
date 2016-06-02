// ==UserScript==
// @name          Profanity Filter
// @author        adisib
// @namespace     namespace_adisib
// @description	  Basic filtering for profanity from website text. Designed to have minimal performance impact.
// @version       2016.06.02
// @include       http://*
// @include       https://*
// @noframes
// @grant         none
// ==/UserScript==

// -- NOTICE --
//
// This is the "compiled" version
// As such is is OBFUSCATED and is recommended that you never install an obfuscated greasemonkey script
// It is recommended that you use the non-obfuscated version of this script instead
//
// -----

(function(){
"use strict";
//let st = performance.now();
let a=new RegExp("\\b(?:(?:f(?:a(?:g(?:g(?:[eio]t)?|ot)?|tass)|u(?:ck(?:me)?|k?k)|cuk|eg)|b(?:u(?:llshit|ttfuck)|[!i]tch|astard)|ass(?:(?:hol|wip)e|clown|fuck|kiss)?|p(?:hu(?:(?:k?|c)k|q)|iss(?:off)?)|d(?:ipshit|umbass|ouche|amn)|sh(?:i(?:t(?:full|t)?|z)|!t)|moth(?:afucka?|erfuck)|c(?:rap|unt)|goddamn|jackass|nigga?))(?:in(?:g)?|ed|er)??(?:(?:[yz]|e?s))??\\b","gi"),b=document.evaluate("./*[not(self::script or self::noscript or self::code or self::textarea)]//text()[string-length(normalize-space()) > 2]",
document.body,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);if(a.test(document.title)){document.title=document.title.replace(a,"*bleep*");a.lastIndex=0;}for(let c=0,d=b.snapshotItem(0);null!==d;){if(a.test(d.data)){d.data=d.data.replace(a,"*bleep*");a.lastIndex=0;}d=b.snapshotItem(++c)}
//let et = performance.now();
//console.log("PF | Run-Time (ms): " + (et - st).toString());
})();

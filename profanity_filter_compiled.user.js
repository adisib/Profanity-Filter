// ==UserScript==
// @name          Profanity Filter
// @author        adisib
// @namespace     namespace_adisib
// @description	  Basic filtering for words (profanity by default) from website text. Designed to have minimal performance impact.
// @include       http://*
// @include       https://*
// @noframes
// ==/UserScript==

// -- NOTICE --
//
// This is the "compiled" version.
// As such is is OBFUSCATED and is recommended that you never install an obfuscated greasemonkey script
// So use at your own risk (though the small script size makes it still pretty easy to read).
//
// -----

(function(){
//let st = performance.now();
let a=new RegExp("\\b(fuck|shit|ass|damn|asshole|bullshit|shitty|bitch|piss|sh!t|jackass|goddamn|crap|bastard|assholes|cunt|dumbass|fag|douche|shittings|shitters|shitter|shitted|shitfull|shiz|pissoff|pissin|nigger|nigga|motherfuckin|motherfuck|mothafuckin|mothafuckaz|mothafucka|mothafuck|fuk|fuckme|fuckin|fcuk|phuq|phukking|phuk|phuck|feg|fatass|fags|faggot|fagot|faggit|fagging|fagget|dipshit|buttfuck|bitchin|asswipe|asskisser)(ing|ed|er)?(es|s)?\\b", "gi"),b=document.evaluate(".//*[not(self::script or self::noscript or self::textarea)]/text()[string-length(normalize-space(.)) > 2]",
document.body,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);-1!==document.title.search(a)&&(document.title=document.title.replace(a,"*bleep*"));for(let c=0,d;d=b.snapshotItem(c++);)-1!==d.data.search(a)&&(d.data=d.data.replace(a,"*bleep*"));
//let et = performance.now();
//console.log("Milliseconds to complete: " + (et - st).toString());
})();

// ==UserScript==
// @name          Profanity Filter (Static)
// @author        adisib
// @namespace     namespace_adisib
// @description   Basic filtering for profanity from website text. Designed to have minimal performance impact.
// @version       2017.09.19
// @include       http://*
// @include       https://*
// @noframes
// @grant         none
// ==/UserScript==

// -- NOTICE --
//
// This version is for static filtering only for maximum performance.
// In general, you should use the main version for more comprehensive but still efficient filtering.
// https://github.com/adisib/Profanity-Filter
//
// -----

(function() {

    "use strict";


    // --- SETTINGS --------


    // The string that replaces offending words.
    const replaceString = "*bleep*";

    // List of words that should be filtered which completely replaces the default list. You don't have to include endings like plurals or "ing", as they will always be handled.
    // If null, then uses a precompiled version of default list for extra performance. If you set a word list, you may lose performance from it not being precompiled.
    // The default list is: ['fuck','shit','ass','damn','asshole','bullshit','bitch','piss','goddamn','crap','sh!t','bastard','dumbass','fag','motherfuck','nigger','cunt','douche','douchebag','jackass','mothafuck','pissoff','shitfull','fuk','fuckme','fvck','fcuk','b!tch','phuq','phuk','phuck','fatass','faggot','dipshit','fagot','faggit','fagget','assfuck','buttfuck','asswipe','asskiss','assclown']
    // This should be ordered by most common first for performance, and must only contain alpha-numeric (unless you sanitize for regex)
    const words = null;

    // Display performance and debugging information to the console.
    const DEBUG = false;


    // --------------------


    let startTime, endTime;
    if (DEBUG)
    {
        startTime = performance.now();
    }

    let wordString = words ? "\\b(?:" + words.join("|") + ")[tgkp]??(?=(?:ing?(?:ess)??|ed|i??er|a)??(?:e??[syz])??\\b)" : "\\b(?:(?:f(?:u(?:ck(?:me)??|k)|a(?:g(?:(?:g[eio]|o)t)??|tass)|(?:cu|vc)k)|b(?:u(?:llshit|ttfuck)|[!i]tch|astard)|ass(?:(?:hol|wip)e|clown|fuck|kiss)??|d(?:amn|umbass|ouche(?:bag)??|ipshit)|p(?:hu(?:c?k|q)|iss(?:off)??)|sh(?:it(?:full)??|!t)|moth(?:er|a)fuck|c(?:rap|unt)|goddamn|jackass|nig))[tgkp]??(?=(?:ing?(?:ess)??|ed|i??er|a)??(?:e??[syz])??\\b)";
    const wordsFilter = new RegExp(wordString, "gi");
    const findText = document.createExpression(".//text()[string-length() > 2 and not(parent::script or parent::code)]", null);

    let textNodes = document.evaluate(".//text()[string-length() > 2 and not(parent::script or parent::code)]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (DEBUG)
    {
        console.log("PF | Snapshots: " + textNodes.snapshotLength.toString());
    }



    // Xpath will not grab the title so replace that too
    // Do it first because it is always visible
    if (wordsFilter.test(document.title))
    {
        document.title = document.title.replace(wordsFilter, replaceString);
    }


    const l = textNodes.snapshotLength;
    for (let i = 0; i < l; ++i)
    {
        let textNode = textNodes.snapshotItem(i);

        if (wordsFilter.test(textNode.data))
        {
            textNode.data = textNode.data.replace(wordsFilter, replaceString);
        }
    }



    if (DEBUG)
    {
        endTime = performance.now();
        console.log("PF | Run-Time (ms): " + (endTime - startTime).toString());
    }

})();
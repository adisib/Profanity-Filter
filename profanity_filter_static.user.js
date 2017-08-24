// ==UserScript==
// @name          Profanity Filter (Static)
// @author        adisib
// @namespace     namespace_adisib
// @description   Basic filtering for profanity from website text. Designed to have minimal performance impact.
// @version       2017.06.11
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

    // Display performance and debugging information to the console.
    const DEBUG = false;

    let startTime, endTime;
    if (DEBUG)
    {
        startTime = performance.now();
    }



    // set replacement string
    const replaceString = "*bleep*";

    // words to be filtered list
    // This should be ordered by most common first for performance (still TODO, but not important)
    // (also should probably be sanitized before dropping into regex)
    const words = ['fuck','shit','ass','damn','asshole','bullshit','bitch','piss','goddamn','crap','sh!t','bastard','dumbass','fag','motherfuck','nig','cunt','douche','douchebag','jackass','mothafuck','pissoff','shitfull','fuk','fuckme','fvck','fcuk','b!tch','phuq','phuk','phuck','fatass','faggot','dipshit','fagot','faggit','fagget','assfuck','buttfuck','asswipe','asskiss','assclown'];

    // filters the words and any versions with optional endings
    // shouldn't run into issues with optional endings; a whitelist would be trivial to implement should it be required
    const wordsFilter = new RegExp("\\b(?:" + words.join("|") + ")[tgkp]??(?=(?:ing?(?:ess)??|ed|i??er|a)??(?:e??[syz])??\\b)", "gi");



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
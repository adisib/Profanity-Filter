// ==UserScript==
// @name          Profanity Filter
// @author        adisib
// @namespace     namespace_adisib
// @description   Basic filtering for profanity from website text. Designed to have minimal performance impact.
// @version       2016.07.01
// @include       http://*
// @include       https://*
// @noframes
// @grant         none
// ==/UserScript==



(function() {

    "use strict";


    // Display performance and debugging information to the console.
    const DEBUG = false;

    if (DEBUG)
    {
      var startTime = performance.now();
    }



    // set replacement string
    const replaceString = "*bleep*";

    // words to be filtered list
    // This should be ordered by most common first for performance (still TODO, but not important)
    const words = ['fuck','shit','ass','damn','asshole','bullshit','bitch','piss','sh!t','jackass','goddamn','crap','bastard','cunt','dumbass','fag','douche','shitfull','shiz','pissoff','nig','nigga','motherfuck','mothafucka','mothafuck','fuk','fuckme','fcuk','b!tch','phuq','phuk','phuck','feg','fatass','faggot','fagot','faggit','fagget','dipshit','assfuck','buttfuck','asswipe','asskiss','assclown'];

    // filters the words and any versions with optional endings
    // shouldn't run into issues with optional endings; a whitelist would be trivial to implement should it be required
    const wordsFilter = new RegExp("\\b(?:" + words.join("|") + ")[tgk]??(?:ing?|ed|i??er)??(?:s|es|y|z|ess)??\\b", "gi");



    let textNodes = document.evaluate("./*[not(self::script or self::noscript or self::code or self::textarea)]//text()[string-length(normalize-space()) > 2]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

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
    for (let i=0; i < l; ++i)
    {
        let textNode = textNodes.snapshotItem(i);
        
        //if (DEBUG)
        //{
        //  console.log("PF | " + textNode.parentNode.tagName + " , '" + textNode.data + "'");
        //}

        // This optimizes for the case of few words being on the page
        if (wordsFilter.test(textNode.data))
        {
            textNode.data = textNode.data.replace(wordsFilter, replaceString);
        }
    }



    if (DEBUG)
    {
        var endTime = performance.now();
        console.log("PF | Run-Time (ms): " + (endTime - startTime).toString());
    }

})();

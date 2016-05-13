// ==UserScript==
// @name          Profanity Filter
// @author        adisib
// @namespace     namespace_adisib
// @description   Basic filtering for words (profanity by default) from website text. Designed to have minimal performance impact.
// @version       2016.05.13
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
    const words = ['fuck','shit','ass','damn','asshole','bullshit','shitty','bitch','piss','sh!t','jackass','goddamn','crap','bastard','assholes','cunt','dumbass','fag','douche','shitt','shitfull','shiz','pissoff','nigger','nigga','motherfuck','mothafuckaz','mothafucka','mothafuck','fuk','fuckme','fcuk','phuq','phukk','phuk','phuck','feg','fatass','faggot','fagot','faggit','fagg','fagget','dipshit','buttfuck','asswipe','asskisser'];

    // filters the words and any versions with optional endings
    // shouldn't run into issues with optional endings; a whitelist would be trivial to implement should it be required
    const wordsFilter = new RegExp("\\b(?:" + words.join("|") + ")(?:in(?:g)?|ed|er)??(?:es|s)??\\b", "gi");




    let textNodes = document.evaluate("./*[not(self::script or self::noscript or self::code or self::textarea)]//text()[string-length(normalize-space(.)) > 2]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


    if (DEBUG)
    {
        console.log("PF | Snapshots: " + textNodes.snapshotLength.toString());
    }


    // Xpath will not grab the title so replace that too
    // Do it first because it is always visible
    if (document.title.search(wordsFilter) !== -1)
    {
      document.title = document.title.replace(wordsFilter, replaceString);
    }


    let i = 0;
    let textNode;
    while (textNode=textNodes.snapshotItem(i++) !== null)
    {
        //if (DEBUG)
        //{
        //  console.log("PF | " + textNode.parentNode.tagName + " , '" + textNode.data + "'");
        //}

        // This optimizes for the case of the words NOT being on the page (which is most likely).
        if (wordsFilter.test(textNode.data))
        {
            textNode.data = textNode.data.replace(wordsFilter, replaceString);

            // replace is supposed to set lastIndex to 0, but some browsers might not do this
            // This will remain as long as all supported browsers have not agreed on what to do here
            wordsFilter.lastIndex = 0;
        }
    }



    if (DEBUG)
    {
        var endTime = performance.now();
        console.log("PF | Run-Time (ms): " + (endTime - startTime).toString());
    }

})();

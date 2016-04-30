// ==UserScript==
// @name          Profanity Filter
// @author        adisib
// @namespace     namespace_adisib
// @description   Basic filtering for words (profanity by default) from website text. Designed to have minimal performance impact.
// @include       http://*
// @include       https://*
// @noframes
// ==/UserScript==


(function() {

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
    const words = ['fuck','shit','ass','damn','asshole','bullshit','shitty','bitch','piss','sh!t','jackass','goddamn','crap','bastard','assholes','cunt','dumbass','fag','douche','shittings','shitters','shitter','shitted','shitfull','shiz','pissoff','pissin','nigger','nigga','motherfuckin','motherfuck','mothafuckin','mothafuckaz','mothafucka','mothafuck','fuk','fuckme','fuckin','fcuk','phuq','phukking','phuk','phuck','feg','fatass','fags','faggot','fagot','faggit','fagging','fagget','dipshit','buttfuck','bitchin','asswipe','asskisser'];

    // filters the words and any versions with optional endings
    // shouldn't run into issues with optional endings; a whitelist would be trivial to implement should it be required
    const wordsFilter = new RegExp("\\b(" + words.join("|") + ")(ing|ed|er)?(es|s)?\\b", "gi");



    // -- Begin filtering --



    // Grab nodes with Xpath (it should perform better because implemented natively)
    // Grabs text not in script tags that isn't just whitespace (which happens pretty often)
    let textNodes = document.evaluate(".//*[not(self::script or self::noscript or self::code or self::textarea)]/text()[string-length(normalize-space(.)) > 2]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


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


    // Now replace those text nodes with the replacement string


    let i = 0;
    let textNode;
    while (textNode=textNodes.snapshotItem(i++))
    {
        //if (DEBUG)
        //{
        //  console.log("PF | " + textNode.parentNode.tagName + " , '" + textNode.data + "'");
        //}

        // Only do a more expensive replace if a match is found
        // This optimizes for the case of the words NOT being on the page (which is most likely).
        if (textNode.data.search(wordsFilter) !== -1)
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


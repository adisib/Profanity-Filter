// ==UserScript==
// @name          Profanity Filter Ajax
// @author        adisib
// @namespace     namespace_adisib
// @description   Simple filtering for profanity from website text. Not limited to static text, while avoiding performance impact.
// @version       2016.09.20
// @include       http://*
// @include       https://*
// @noframes
// @grant         none
// ==/UserScript==


(function() {

    "use strict";


    // --- GLOBALS --------


    // Display performance and debugging information to the console.
    const DEBUG = false;


    // set replacement string
    const replaceString = "*bleep*";

    // words to be filtered list
    // This should be ordered by most common first for performance (still TODO, but not important)
    // (also should probably be sanitized before dropping into regex)
    const words = ['fuck','shit','ass','damn','asshole','bullshit','bitch','piss','goddamn','crap','sh!t','bastard','dumbass','fag','motherfuck','nig','cunt','douche','douchebag','jackass','mothafuck','pissoff','shitfull','fuk','fuckme','fvck','fcuk','b!tch','phuq','phuk','phuck','fatass','faggot','dipshit','fagot','faggit','fagget','assfuck','buttfuck','asswipe','asskiss','assclown'];

    // filters the words and any versions with optional endings
    // shouldn't run into issues with optional endings; a whitelist would be trivial to implement should it be required
    const wordsFilter = new RegExp("\\b(?:" + words.join("|") + ")[tgkp]??(?=(?:ing?(:?ess)??|ed|i??er|a)??(?:e??[syz])??\\b)", "gi");


    // --------------------


    // Initial slow filter pass that handles static text
    function FilterStaticText()
    {
        let startTime, endTime;
        if (DEBUG)
        {
            startTime = performance.now();
        }

        // Do title first because it is always visible
        if (wordsFilter.test(document.title))
        {
            document.title = document.title.replace(wordsFilter, replaceString);
        }

        filterNodeTree(document.body);

        if (DEBUG)
        {
            endTime = performance.now();
            console.log("PF | Static Text Run-Time (ms): " + (endTime - startTime).toString());
        }
    }


    // --------------------


    // filters dynamic text, and handles things like AJAX Youtube comments
    function filterDynamicText()
    {
        let textMutationObserver = new MutationObserver( function(mutations) { filterMutations(mutations); } );
        let TMOInitOps = { characterData: true, childList: true, subtree: true };

        textMutationObserver.observe(document.body, TMOInitOps);
    }


    // --------------------


    // Handler for mutation observer from filterDynamicText()
    function filterMutations(mutations)
    {
        for (let i=0; i < mutations.length; ++i)
        {
            let startTime, endTime;
            if (DEBUG)
            {
                startTime = performance.now();
            }
            
            let mutation = mutations[i];

            if (mutation.type === "childList")
            {
                let nodes = mutation.addedNodes;
                for (let i=0; i < nodes.length; ++i)
                {
                    filterNodeTree(nodes[i]);
                }
            }
            else if (mutation.type === "characterData")
            {
                filterNodeTree(mutation.target);
            }

            if (DEBUG)
            {
                endTime = performance.now();
                console.log("PF | Dynamic Text Run-Time (ms): " + (endTime - startTime).toString());
            }
        }
    }


    // --------------------


    // Filters all of the text from a node and its decendants
    function filterNodeTree(node)
    {
        let textNodes = document.evaluate("./*[not(self::script or self::noscript or self::code)]//text()[string-length() > 2]", node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        const l = textNodes.snapshotLength;
        for (let i=0; i < l; ++i)
        {
            let textNode = textNodes.snapshotItem(i);

            if (wordsFilter.test(textNode.data))
            {
                textNode.data = textNode.data.replace(wordsFilter, replaceString);
            }
        }
    }


    // --------------------


    // Runs the different filter types
    function filterPage()
    {
        filterDynamicText();
        FilterStaticText();
    }


    // --- MAIN -----------

    filterPage();

})();

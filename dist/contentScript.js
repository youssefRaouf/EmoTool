
console.log("In  contentScript")
window.addEventListener('load', function () {
    console.log("Loaded ")
    var body = document.body;    
    
    
    let elements = document.getElementsByTagName('article')

    for (var el of elements)
    {
        var spans = el.getElementsByTagName('span');
        for (var text of spans)
        {
            console.log(text.innerText)
        }
    }

    /* MutationObserver callback to add spans when the body changes */
    var callback = function( mutationsList, observer ){
       
        for( var mutation of mutationsList ) {
           
            if(mutation.target.tagName==='ARTICLE')
            {
        
                var spans = mutation.target.getElementsByTagName('span');
                for (var text of spans)
                {
                    console.log(text.innerText)
                }

                
            }
            
           
        }
    }
    var observer = new MutationObserver( callback );
    var config = { characterData: true,
                attributes: true,
                childList: true,
                subtree: true };

    observer.observe( body, config );
});
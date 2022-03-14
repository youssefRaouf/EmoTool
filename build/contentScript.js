var spans = []

console.log("In AA contentScript")
window.addEventListener('load', function () {
    console.log("Loaded ")
    var body = document.body;
    let elements = document.getElementsByTagName('article')

    console.log(elements.length)
    Array.from(elements).forEach(function (element) {
        console.log(element)
      });
    
    

    /* MutationObserver callback to add spans when the body changes */
    var callback = function( mutationsList, observer ){
        for( var mutation of mutationsList ) {
            if ( mutation.type === 'childList' ) {
               
                Array.prototype.forEach.call( mutation.target.children, function ( child ) {
                   
                    if(child.tagName ==='ARTICLE')  {
                       
                        spans.push(child);
                        console.log(child);
                        console.log("Action happened",spans.length);
                    } 
                } );
            }
        }
    }
    var observer = new MutationObserver( callback );
    var config = { characterData: true,
                attributes: false,
                childList: true,
                subtree: true };

    observer.observe( body, config );
});

console.log("In  contentScript")
window.addEventListener('load', function () {
    console.log("Loaded ")
    var body = document.body;    
    
    
    let elements = document.getElementsByTagName('article')

    for (var el of elements)
    {
        var spans = el.getElementsByTagName('span');

        let  total_text="";
                
       // To avoid taking user name from spans
       let userInfo=0;
       for (var text of spans)
       {
           if(userInfo<=3)
           {
               userInfo++;
               continue;
           }
           
          
           total_text = total_text.concat(text.innerText);
       }
       console.log("Tweet: ",total_text)
      

    }

    /* MutationObserver callback to add spans when the body changes */
    var callback = function( mutationsList, observer ){
       
        for( var mutation of mutationsList ) {
           
            if(mutation.target.tagName==='ARTICLE'&&mutation.attributeName==='role')
            {
                
                var spans = mutation.target.getElementsByTagName('span');
                let  total_text="";
                
                // To avoid taking user name from spans
                let userInfo=0;
                for (var text of spans)
                {
                    if(userInfo<=3)
                    {
                        userInfo++;
                        continue;
                    }
                    
                   
                    total_text = total_text.concat(text.innerText);
                }
                console.log("Tweet: ",total_text)
                console.log("Type :",mutation)

                
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
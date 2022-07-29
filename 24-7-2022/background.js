chrome.tabs.onUpdated.addListener(
    function(tabId, info,tab){
        if (info.url){
           
            chrome.tabs.sendMessage(
                tabId,
                {


                    message: "volume",
                }
            );


        }
        else{
           
            chrome.tabs.sendMessage(
                tabId,
                {


                    message: "storemyvalvolume",


                    
                }
            );
        }
    }
);
console.log("this is console");

valuepresentage()


document.getElementById("range").addEventListener("input", function () {
    document.getElementById("demo").innerHTML = `Volume ${document.getElementById("range").value} %`
    // console.log("this range value " + range.value)
})

document.getElementById("btn").addEventListener("click", function () {
    document.getElementById("demo2").innerText = " volume Aplied"
    sval()
    nval()
    
});

sval = () => {


    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                message: "saveVolume",
                value: document.getElementById("range").value
            });
    });
    console.log("this is console for sval");

}


nval = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            
            {
                message: "adjustVolume",
            });
    });
    console.log("this is console for nval");
}



function valuepresentage() {
    chrome.tabs.query({ active: true, currentWindow: true },
        function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    message: "getVolume",
                },
                function (response) {
                    document.getElementById("range").value = response;
                    document.getElementById("demo").textContent = response + "%";
                }
            );
        },
    );
}


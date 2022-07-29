const valkey = "valkey";
const SETPERSENTAGE = 100;
let persentage;


let gainNode;





console.log("Now volume: " + persentage);

Startlistner();
StartingPersentage();



function StartingPersentage() {
    persentage =localStorage.getItem(valkey);

    console.log("Saved volume: " + persentage);


    if (persentage == null) {
        persentage = SETPERSENTAGE;
        localStorage.setItem(valkey,  String(persentage) );
    }

    persentage = Number(persentage);

    console.log("Updated volume: " + persentage);
}



function Startlistner() {
    chrome.runtime.onMessage.addListener(function (request, sender, Catchresponse) {
        console.log(request.message);
        if (request.message === "adjustVolume") {
            SetVolume();
        }
        if (request.message === "saveVolume") {
            persentage = Number(request.value);
            localStorage.setItem( valkey, persentage );
        }
        if (request.message === "getVolume") {
            Catchresponse(persentage);
        }
        if (request.message === "volume") {
            resetVolume();
            SetVolume();
        }
        if (request.message === "storemyvalvolume") {
            setTimeout(function () {
                gainNode = gainNode || SETUP();

                if (gainNode) {
                    let multi = Number(localStorage.getItem(valkey)) / 100;
                    if (0 <= multi && multi <= 5) {
                        gainNode.gain.value = multi;
                    }
                }
            }, 150)

        }
        if (request.message === "debug") {
            console.log(request.value);
        }

       
    }
    );
}



function SetVolume() {
    gainNode = gainNode || SETUP();

    if (gainNode) {
        console.log("Volume changed: " + persentage);
        let multi = persentage / 100;
        if (0 <= multi && multi <= 5) {
            gainNode.gain.value = multi;
        }
    }
}


function SETUP() {
    const viedoq = document.querySelector("video");

    if (!viedoq) {
        return null;
    }

    const gainNode = Audiofunc(viedoq);

    return gainNode;
}







function Audiofunc(viedoq) {
    const audioContext = new AudioContext();
    const Audionode = audioContext.Elementsource(viedoq);
    const gainNode = audioContext.createGain();

    gainNode.gain.value = 1;


    Audionode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    return gainNode;
}









// Example gscript template
// Title: Multi Platform Requests Example
// Author: ahhh
// Purpose: Testing requests on different platforms
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150

function Deploy() {

    var headers = {"User-Agent" : "spaceman"};

    console.log("Starting GetURLAsString");
    out1 = G.requests.GetURLAsString("http://127.0.0.1:8000", headers, true);
    console.log("out: "+out1);

    console.log("Starting GetURLAsBytes");
    var out2 = G.requests.GetURLAsBytes("http://127.0.0.1:8000", headers, true);
    console.log("out: " +out2);
    
    //console.log("Starting PostJSON");
    //var out3 = G.requests.PostJSON();
    //console.log("out: "+ out3);

    //console.log("Starting PostURL");
    //var out4 = G.requests.PostURL();
    //console.log("out: "+ out4);

    //console.log("Starting PostBinary");
    //var out5 = G.requests.PostBinary();
    //console.log("out: "+ out5);

    return true;
}

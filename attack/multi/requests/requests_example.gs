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
    out1 = G.requests.GetURLAsString("http://icanhazip.com", headers, true);
    if (out1[2] == null){
        console.log("response string: "+out1[1]);
    } else {
        console.log("errors: "+out1[2].Errors());
    }
    
    console.log("Starting GetURLAsBytes");
    var out2 = G.requests.GetURLAsBytes("http://icanhazip.com", headers, true);
    if (out2[2] == null){
        console.log("response bytes: "+out2[1]);
    } else {
        console.log("errors: "+out2[2].Errors());
    }

    console.log("Starting PostJSON");
    var jsons = { "menu" : "item"}
    var out3 = G.requests.PostJSON("http://postb.in/jEDtEEvI", jsons, headers, false)
    if (out3[2] == null){
        console.log("response string: "+out3[1]);
    } else {
        console.log("errors: "+out3[2].Errors());
    }

    console.log("Starting PostURL");
    var out4 = G.requests.PostURL("http://postb.in/jEDtEEvI", "test=data", headers, false)
    if (out4[2] == null){
        console.log("response string: "+out4[1]);
    } else {
        console.log("errors: "+out4[2].Errors());
    }

    //console.log("Starting PostBinary");
    //var out5 = G.requests.PostBinary();
    //console.log("out: "+ out5);

    return true;
}

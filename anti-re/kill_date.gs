// Example gscript template
// Title: Kill Date
// Author: ahhh
// Purpose: Kill the binary if it's being run after a certain date
// Tactic: Use this to give your payloads an expiration date, such that they can't be repurposed after your operation
// Gscript version: 1.0.0

//go_import:runtime as funtime

//priority:50
//timeout:75

function Deploy() {  
    console.log("Testing Kill Date!");
    var kdate = "1545696000" // Christmas 2018
    var currentDate = G.time.GetUnix()
    if (currentDate >= kdate) {
        console.log("Detected a time after the kill date!");
        G.os.TerminateSelf();
        return false;
    }
    console.log("Done Testing Kill Date!");
    return true;
}
  

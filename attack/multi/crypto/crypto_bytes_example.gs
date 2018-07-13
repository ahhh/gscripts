// Example gscript template
// Title: Multi Platform Crypto Examples
// Author: ahhh
// Purpose: Testing a bunch of data encyption on different platforms
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150

function Deploy() {

    console.log("Starting EncodeStringAsBytes");
    var bytes = G.encoding.EncodeStringAsBytes("test");
    console.log("bytes: "+ bytes);

    console.log("Starting GetMD5FromBytes Command");
    var md5b = G.crypto.GetMD5FromBytes(bytes);
    console.log("MD5FromBytes: "+md5b);

    console.log("Starting GetSHA1FromBytes");
    var sha1b = G.crypto.GetSHA1FromBytes(bytes);
    console.log("SHA1FromBytes: "+ sha1b);

    return true;
}
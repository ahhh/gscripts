// Example gscript template
// Title: Virtual Machine Registry Keys
// Author: ahhh
// Purpose: Looks to see if registry keys exist that indicate the current host is a virtual machine
// Gscript version: 0.1.2
// 

//priority:10
//timeout:100

function BeforeDeploy() {
  LogInfo("Testing for virtual machine regkeys!");
  var VMWare_val = QueryRegKey("LOCAL_MACHINE", "Software\\Microsoft\\Windows\\CurrentVersion\\Run", "VMWare User Process");
  if (VMWare_val.keyValue == "\"C:\\Program Files\\VMware\\VMware Tools\\vmtoolsd.exe\" -n vmusr" ){
    LogInfo("VMware Tools detected, exiting");
    KillSelf();
    return false;
  }
  var VMWare_val2 = QueryRegKey("CURRENT_USER", "Software\\VMware, Inc.\\VMware Tools\\RegistryBackup\\DisplayScaling_DPI", "backupType");
  if (VMWare_val2.keyValue == "created" ){
    LogInfo("VMware Tools detected, exiting");
    KillSelf();
    return false;
  }
  var system_manu_val = QueryRegKey("LOCAL_MACHINE", "Hardware\\Description\\System\\BIOS", "SystemManufacturer");
  if (system_manu_val.keyValue == "VMware, Inc." ){
    LogInfo("VMware detected, exiting");
    KillSelf();
    return false;
  }
  var system_product_val = QueryRegKey("LOCAL_MACHINE", "Hardware\\Description\\System\\BIOS", "SystemProductName");
  if (system_product_val.keyObj.StringVal == "VMware Virtual Platform" ){
    LogInfo("VMware detected, exiting");
    KillSelf();
    return false;
  }
  var vbox_val = QueryRegKey("LOCAL_MACHINE", "Hardware\\Description\\System", "VideoBiosVersion");
  if (vbox_val.keyObj.StringVal == "VIRTUALBOX" ){
    LogInfo("VirtualBox detected, exiting");
    KillSelf();
    return false;
  }
  var key_val = QueryRegKey("LOCAL_MACHINE", "Hardware\\Description\\System", "SystemBiosVersion");
  if (key_val.keyObj.StringVal == "VBOX" || key_val == "QEMU" || key_val == "BOCHS" ){
    LogInfo("VirtualBox detected, exiting");
    KillSelf();
    return false;
  }
  return true; 
}

function Deploy() {  
  return true;
}

function AfterDeploy() {
  LogInfo("Done Testing vm regkeys!");
  return true;
}
// Example gscript template
// Title: Cross Platform NetCat TCP Example
// Author: ahhh
// Purpose: 
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150

//go_import:github.com/dddpaul/gonc/tcp as nc

function Deploy() {  
    console.log("Starting NetCat TCP Example");
    
    nc.StartClient("tcp", "127.0.0.1:", "8080");

    console.log("Done NetCat TCP Example");
    return true;
  }
  
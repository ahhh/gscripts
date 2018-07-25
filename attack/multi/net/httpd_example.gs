// Example gscript template
// Title: Cross Platform HTTPD Example
// Author: ahhh
// Purpose: 
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150

//go_import:net/http as http

function Deploy() {  
    console.log("Starting HTTPD");

    http.ListenAndServe(":8080", null);

    console.log("Done HTTPD");
    return true;
  }
  
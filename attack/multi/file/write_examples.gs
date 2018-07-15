// Example gscript template
// Title: Multi Platform Write File Example
// Author: ahhh
// Purpose: Testing an asset and write file on different platforms
// Gscript version: 1.0.0
// ATT&CK: 

//import:/private/tmp/example.bin

//priority:150
//timeout:150

function Deploy() {

    console.log("Starting Write File form Bytes");
    var myBin = GetAssetAsBytes("example.bin");
    errors = G.file.WriteFileFromBytes("example_test", myBin[0]);
    console.log("errors: "+errors);

    console.log("Starting Copy File");
    var copyErrors = G.file.CopyFile("example_test", "example_test2");
    console.log("errors: " +copyErrors);
    
    console.log("Starting Write file from String");
    var writeStringErrors = G.file.WriteFileFromString("example_test3", "Example test\n");
    console.log("errors: "+ writeStringErrors);

    console.log("Starting Read file as bytes");
    var fileBytes = G.file.ReadFileAsBytes("example_test3");
    console.log("errors: "+ fileBytes[1]);

    console.log("Starting Append file bytes");
    var appendedFileError1 = G.file.AppendFileBytes("example_test3", fileBytes[0]);
    console.log("errors: "+ appendedFileError1);

    console.log("Starting AppendFileString");
    var appendedFileError2 = G.file.AppendFileString("example_test3", "Yet Another String\n");
    console.log("errors: "+ appendedFileError2);
    
    console.log("ReplaceInFileWithString");
    var replaceError = G.file.ReplaceInFileWithString("example_test3", "test", "science");
    console.log("errors: "+ replaceError);

    console.log("ReplaceInFileWithRegex");
    var replaceError2 = G.file.ReplaceInFileWithRegex("example_test3", "(Yet)", "Bet");
    console.log("errors: "+ replaceError2);

    console.log("SetPerms example");
    var permErrors = G.file.SetPerms("example_test3", 0777);
    console.log("errors: "+permErrors);

    console.log("Seting ReadFileAsString");
    var readFile = G.file.ReadFileAsString("example_test3");
    console.log("errors: "+ readFile[1]);
    console.log("example_test3 contains:\n"+readFile[0]);

    console.log("Testing CheckExists");
    var exists = G.file.CheckExists("example_test");
    console.log("Does it: "+exists);

    return true;
}

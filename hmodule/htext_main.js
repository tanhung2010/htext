let vscode = require('vscode');
var p_util = require('./htext_util.js');
var p_text = require('./htext_text.js');
var p_number = require('./htext_number.js');
var p_lines = require('./htext_line.js');
var Window = vscode.window;

var statusbaritem = vscode.StatusBarItem;

    




function htext_mainmenu() {
    var items = [];
    items.push({ label: "text", description: "Utilities for text" ,funcb:p_text.htextfunction_text});
    items.push({ label: "number", description: "utilities for number" ,funcb:p_number.htextfunction_number});
    items.push({ label: "line", description: "utilities for line",funcb:p_lines.htextfunction_lines });

    p_util.htext_handlemenu(items);
}

module.exports.htext_mainmenu = htext_mainmenu;
module.exports.htext_ontextchange = htext_ontextchange;


function htext_ontextchange()
{
    //         if (doc.languageId === "markdown") {
//             let wordCount = this._getWordCount(doc);

//             // Update the status bar
//             this._statusBarItem.text = wordCount !== 1 ? `$(pencil) ${wordCount} Words` : '$(pencil) 1 Word';
//             this._statusBarItem.show();
//         } else {
//             this._statusBarItem.hide();
//         }

    Window.onDidChangeTextEditorSelection((listener)=>
    {
let e = vscode.window.activeTextEditor;
let d = e.document;
let sel = e.selections;
        //      //let _statusBarItem=StatusBarItem;

//      updateWordCount() {

//         // Create as needed
          if (!statusbaritem) {
              
            statusbaritem = Window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        }

        //   if (d.languageId === "markdown")
        // {
            p_number.OnTextChange_Hex()
            .then(function (val)
            {
                statusbaritem.text = "Len:"+val;
                statusbaritem.show();
            })
            .catch(function(reason)
            {              
                console.log(reason);
            });

        //}
        // else
        // {
        //         statusbaritem.hide();
        // }
        console.log("On Event onDidChangeTextEditorSelection "+d.languageId);
    });

}
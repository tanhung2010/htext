let vscode = require('vscode');
var Range = vscode.Range;


var us = require('underscore.string');
var htext_util = require('./htext_util.js');

function hex_clean(e, d, sel) {
    e.edit((edit) => {
        console.log(sel);
        sel.forEach(function (value, index) {
            let seltext = d.getText(new Range(value.start, value.end));
            seltext = us.clean(seltext);
            edit.replace(value, seltext);

        }, this);
    });
}

function htextfunction_number() {
    var items = [];
    items.push({ label: "hex clean", description: "clean hex with 1 space seperate",funcb:hex_clean});

    htext_util.htext_handlemenu(items);
};

module.exports.htextfunction_number =htextfunction_number;

module.exports.OnTextChange_Hex =OnTextChange_Hex;
function OnTextChange_Hex()
{

    
    return new Promise(
        function(resolve,reject){
        let e = vscode.window.activeTextEditor;
        let d = e.document;
        let sel = e.selections;
        var txt = d.getText();
        var arrdata = txt.split(' ');
    
            resolve(arrdata.length);
        }
    );
}


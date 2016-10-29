let vscode = require('vscode');
var p_util = require('./htext_util.js');
var Range = vscode.Range;



var us = require('underscore.string');



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

function hex_toacii(e, d, sel)
{
    e.edit((edit) => {
        console.log(sel);
        sel.forEach(function (value, index) {
            let seltext = d.getText(new Range(value.start, value.end));
            var datas = p_util.stringtohexarray(seltext);
            var retascii="";
            for (var index = 0; index < datas.length; index++) {
                var element = datas[index];
                retascii+=String.fromCharCode(element);
            }
            edit.replace(value, seltext+" >>"+retascii);
        }, this);
    });
}

function htextfunction_number(e, d, sel) {
    var items = [];
    items.push({ label: "hex clean", description: "clean hex with 1 space seperate",funcb:hex_clean});
    items.push({ label: "hex ascii", description: "parse to ascii value",funcb:hex_toacii});


    p_util.htext_handlemenu(items);
};

module.exports.htextfunction_number =htextfunction_number;

module.exports.OnTextChange_Hex =OnTextChange_Hex;

function OnTextChange_Hex()
{
    return new Promise(
        function(resolve,reject){
        // let e = vscode.window.activeTextEditor;
        // let d = e.document;
        // let sel = e.selections;
        var txt = p_util.gettext_selection();
        var arrdata = p_util.stringtohexarray(txt);
        if(arrdata) 
        {
            resolve(
                {"len":arrdata.length
            });
        }
        }
    );
}


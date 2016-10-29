let vscode = require('vscode');
var Window = vscode.window;
var Range = vscode.Range;
var p_util = require('./htext_util.js');

function htext_handlemenu(items) {
    Window.showQuickPick(items).then((selection) => {
        if (!selection)
            return;
        let e = Window.activeTextEditor;
        let d = e.document;
        let sel = e.selections;
        items.forEach(function (itemx, index) {
            if (itemx.label == selection.label) {
                if(!selection.funcb) return;

                selection.funcb(e, d, sel);
            }
        });
    });
};

module.exports.htext_handlemenu =htext_handlemenu;

function stringtohexarray(strinput)
{
    if(!strinput) return null;
    var rg =RegExp("[^0-9a-fA-F]","g");
    strinput  = strinput.replace(rg,"");


   
    var arrayhex=[];
    for (var index = 0; index < strinput.length; index+=2) {
         if(index+2>strinput.length){
            p_util.log_line("Length of data must multiple by 2");break;}
         var i = Number.parseInt(strinput.substr(index,2),16);
                arrayhex.push(i);
    }
    return arrayhex;
}

module.exports.stringtohexarray=stringtohexarray;

function gettext_selection()
{
       let e = vscode.window.activeTextEditor;
        let d = e.document;
        let sel = e.selections;
        var txt ="";
        for (var x = 0; x < sel.length; x++) {
            txt += d.getText(new Range(sel[x].start, sel[x].end));
        }
        return txt;
}

module.exports.gettext_selection=gettext_selection;

var outputtask;

function log_line(data)
{
     if(!outputtask)
        {
            outputtask = Window.createOutputChannel("htext Info");
        }
        outputtask.appendLine(data);
        outputtask.show();
}

module.exports.log_line=log_line;
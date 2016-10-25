// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');
var Position = vscode.Position;
var Range = vscode.Range;
var Selection = vscode.Selection;


var us = require('underscore.string');
var htext_util = require('./htext_util.js');

module.exports.htextfunction_text =  function() {
    //var opts = { matchOnDescription: true, placeHolder: "Select your text function" };
    var items = [];
    items.push({ label: "UPPER CASE", description: "Convert upPer case to UPPER CASE" ,funcb:text_toUpper});
    items.push({ label: "lower case", description: "Convert LOWER Case to lower case" ,funcb:text_toLower});
    items.push({ label: "iVERT cASE", description: "Convert Invert Case to iVERT cASE" ,funcb:text_invertcase});
    items.push({ label: "Proper Case", description: "Convert proPer case to Proper Case",funcb:text_propercase });
    htext_util.htext_handlemenu(items);
};
/*
convert selected text to upper case
*/

function text_invertcase(e,d,sel)
{
     processSelection(e, d, sel, us.swapCase, []);
}
function text_propercase(e, d, sel)
{
     processSelection(e, d, sel, us.titleize, []);
}

function text_toUpper(e, d, sel) {
    e.edit(function (edit) {
        for (var x = 0; x < sel.length; x++) {
            let txt = d.getText(new Range(sel[x].start, sel[x].end));
            edit.replace(sel[x], txt.toUpperCase());
        }
    });
}

function text_toLower(e, d, sel) {
    e.edit(function (edit) {
        // itterate through the selections and convert all text to Lower
        for (var x = 0; x < sel.length; x++) {
            let txt = d.getText(new Range(sel[x].start, sel[x].end));
            edit.replace(sel[x], txt.toLowerCase());
        }
    });
}

//This function is reference from MD Tools
// This function takes a callback function for the text formatting 'formatCB', 
// if there are any args pass an array as 'argsCB'
function processSelection(e, d, sel, formatCB, argsCB) {
    var replaceRanges = [];
    e.edit(function (edit) {
        // itterate through the selections
        for (var x = 0; x < sel.length; x++) {
            let txt = d.getText(new Range(sel[x].start, sel[x].end));
            if (argsCB.length > 0) {
                // in the case of figlet the params are test to change and font so this is hard coded
                // the idea of the array of parameters is to allow for a more general approach in the future
                txt = formatCB.apply(this, [txt, argsCB[0]]);
            }
            else {
                txt = formatCB(txt);
            }
            //replace the txt in the current select and work out any range adjustments
            edit.replace(sel[x], txt);
            let startPos = new Position(sel[x].start.line, sel[x].start.character);
            let endPos = new Position(sel[x].start.line + txt.split(/\r\n|\r|\n/).length - 1, sel[x].start.character + txt.length);
            replaceRanges.push(new Selection(startPos, endPos));
        }
    });
    e.selections = replaceRanges;
}
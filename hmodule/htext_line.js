let vscode = require('vscode');
var Range = vscode.Range;
var htext_util = require('./htext_util.js');


function lines_sort_az(e, d, sel) {
    lines_sort(e, d, sel, false)
}

function lines_sort_za(e, d, sel) {
    lines_sort(e, d, sel, true)
}

function lines_sort(e, d, sel, order) {
    e.edit(function (edit) {

        for (var i = 0; i < sel.length; i++) {

            let txt = d.getText(new Range(sel[i].start, sel[i].end));
            var lines = txt.split("\r\n").sort(function (a, b) {
                if (order == true)
                    return b.localeCompare(a);
                else
                    return a.localeCompare(b);
            });

            let text = "";
            for (var j = 0; j < lines.length; j++) {
                text = text + lines[j] + "\r\n";
            }
            txt = txt.trim("\r\n");
            edit.replace(sel[i], text);
        }
    });
}

function lines_removeblank(e, d, sel) {
    e.edit(function (edit) {
        for (var i = 0; i < sel.length; i++) {
            let lines = d.getText(new Range(sel[i].start, sel[i].end)).split("\r\n");
            let txt = "";
            for (var j = 0; j < lines.length; j++) {
                if (lines[j].trim().length == 0)
                    continue;
                txt += lines[j] + "\r\n";
            }
            txt = txt.trim("\r\n");

            edit.replace(sel[i], txt);
        }
    });
}

function lines_unique(e, d, sel) {
    e.edit(function (edit) {
        for (var i = 0; i < sel.length; i++) {
            let lines = d.getText(new Range(sel[i].start, sel[i].end)).split("\r\n");

            let unique_sel = [];
            let txt = "";
            for (var j = 0; j < lines.length; j++) {
                if (unique_sel.indexOf(lines[j]) === -1 || unique_sel[j] == '') {
                    unique_sel.push(lines[j]);
                    txt = txt + lines[j] + "\r\n";
                }
            }
            txt = txt.trim("\r\n");
            edit.replace(sel[i], txt);
        }
    });
}



function htextfunction_lines() {
    var items = [];
    items.push({ label: "sort A-Z", description: "sort line with order a-z", funcb: lines_sort_az });
    items.push({ label: "sort Z-A", description: "sort line with order z-a", funcb: lines_sort_za });
    items.push({ label: "Remove Duplicate", description: "remove duplicate lines", funcb: lines_unique });
    items.push({ label: "Remove Blank Line", description: "remove Blank lines", funcb: lines_removeblank });
    htext_util.htext_handlemenu(items);
}

module.exports.htextfunction_lines = htextfunction_lines;
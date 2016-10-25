let vscode = require('vscode');
var p_util = require('./htext_util.js');
var p_text = require('./htext_text.js');
var p_number = require('./htext_number.js');
var p_lines = require('./htext_line.js');


function htext_mainmenu() {
    var items = [];
    items.push({ label: "text", description: "Utilities for text" ,funcb:p_text.htextfunction_text});
    items.push({ label: "number", description: "utilities for number" ,funcb:p_number.htextfunction_number});
    items.push({ label: "line", description: "utilities for line",funcb:p_lines.htextfunction_lines });

    p_util.htext_handlemenu(items);
}

module.exports.htext_mainmenu = htext_mainmenu;
let vscode = require('vscode');
var Window = vscode.window;
//###
module.exports.htext_handlemenu = function(items) {
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

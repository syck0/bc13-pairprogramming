function init(){
    var editor =
        CodeMirror(
            document.getElementById("code"),
            {
                lineNumbers: true,
                extraKeys: {"Ctrl-Space": "autocomplete"},
                mode: {name: "python"}
            });


        editor.on(
            "change", function(cm, change)
                {
                doc=cm.getDoc();
                console.log("something changed! (" + change.removed +")");
                line_number=doc.getCursor().line ;
                text_line = doc.getLine(line_number);
                data =
                {
                    "line":line_number,
                    "text":text_line
                }
                if (change.removed =='' ){
                    $.post("/code/update",data);
                }
                else{
                    $.post("/code/delete",data);
                }


        }
    );
}

window.onload= function(){
    init()
};




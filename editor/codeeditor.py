from flask_codemirror.fields import CodeMirrorField, TextAreaField
from flask_wtf import Form, FlaskForm

class codeEditor(FlaskForm):
    source_code = CodeMirrorField(language='python',
                                           config={'lineNumbers': 'true',
                                                   'mode':'python',
                                                   'readOnly': False
                                                   })


class codeViewer(Form):
    source_code = CodeMirrorField(language='python',
                                               config={'lineNumbers': 'true',
                                                       'mode': 'python',
                                                       'readOnly': True})
    source_code.id='codeTXT'


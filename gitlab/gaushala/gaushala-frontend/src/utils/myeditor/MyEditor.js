import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function MyEditor({ editorContent, onChange }) {
  return (
    <div className="editor_wrapper">
      <CKEditor
        editor={ClassicEditor}
        data={editorContent}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        // onChange={(event, editor) => {
        //   const data = editor.getData();
        //   setEditorContent(data);
        //   console.log({ event, editor, data });
        // }}
        onChange={onChange}
      />
    </div>
  );
}

export default MyEditor;

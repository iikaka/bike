import React, { useState } from "react";
import { Card, Button, Modal } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";

// import { convertToRaw, ContentState, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function RichPage(){
  const [editorState, setEditorState] = useState("");

  const handleHTMLClick = () => {
    if (
      editorState === "" ||
      draftToHtml(convertToRaw(editorState.getCurrentContent())).trim() ===
        "<p></p>"
    ) {
      Modal.info({
        title: "请输入内容"
      });
      return;
    }
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    Modal.info({
      title: "输入的信息为:",
      content: `${html}`
    });
  };

  const handleClearText = () => {
    setEditorState("");
  };

  return (
    <div>
      <Card style={{ width: "100%" }}>
        <Button type="primary" onClick={handleClearText}>
          清除内容
        </Button>
        <Button type="primary" onClick={handleHTMLClick}>
          获取HTML标签
        </Button>
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Editor
          // 这两个要配合使用，这个是初始状态
          editorState={editorState}
          toolbarClassName="aaaaa"
          wrapperClassName="bbbbb"
          editorClassName="ccccc"
          // 让Editor组件成为受控组件
          onEditorStateChange={(editorState) => {
            setEditorState(editorState);
          }}
          // onBlur={() => {
          //   draftToHtml(convertToRaw(editorState.getCurrentContent()));
          // }}
        />
      </Card>
    </div>
  );
}

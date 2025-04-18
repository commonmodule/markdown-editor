import { BodyNode, el, View } from "@commonmodule/app";
import { Button } from "@commonmodule/app-components";
import RichTextEditor from "../src/rich-text-editor/RichTextEditor.js";

export default class RichTextEditorTest extends View {
  private richTextEditor: RichTextEditor;

  constructor() {
    super();
    this.container = el(
      ".rich-text-editor-test",
      this.richTextEditor = new RichTextEditor(),
      new Button({
        title: "Get Content",
        onClick: () => {
          console.log(this.richTextEditor.getContent());
        },
      }),
    ).appendTo(BodyNode);
  }
}

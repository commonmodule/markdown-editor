import { BodyNode, el, View } from "@common-module/app";
import { Button } from "@common-module/app-components";
import RichTextEditor from "../src/RichTextEditor.js";

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

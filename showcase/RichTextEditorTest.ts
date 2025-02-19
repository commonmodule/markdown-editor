import { BodyNode, el, View } from "@common-module/app";
import RichTextEditor from "../src/RichTextEditor.js";

export default class RichTextEditorTest extends View {
  constructor() {
    super();
    this.container = el(".rich-text-editor-test", new RichTextEditor())
      .appendTo(BodyNode);
  }
}

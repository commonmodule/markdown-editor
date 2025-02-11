import { DomNode, el } from "@common-module/app";

export default class MarkdownWysiwygEditor extends DomNode {
  private editorArea: DomNode;

  constructor() {
    super(".markdown-wysiwyg-editor");

    this.editorArea = el(".editor-area");

    this.append(el(".toolbar"), this.editorArea);
  }
}

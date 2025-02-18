import { DomNode, el } from "@common-module/app";
import { Debouncer } from "@common-module/ts";
import DOMPurify from "dompurify";
import { marked } from "marked";

export default class MarkdownWysiwygEditor extends DomNode {
  private editorArea: DomNode;
  private debouncer: Debouncer;

  constructor() {
    super(".markdown-wysiwyg-editor");

    this.editorArea = el(".editor-area");
    this.editorArea.htmlElement.contentEditable = "true";

    this.debouncer = new Debouncer(500, () => this.onInput());
    this.editorArea.onDom("input", () => this.debouncer.execute());

    this.append(el(".toolbar"), this.editorArea);
  }

  private async onInput() {
    const markdownText = this.editorArea.htmlElement.innerText;
    const html = DOMPurify.sanitize(await marked(markdownText));
    console.log(html);
  }
}

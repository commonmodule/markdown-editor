import { DomNode, el } from "@common-module/app";
import { MarkdownHtmlConverter } from "@common-module/markdown";
import { Debouncer } from "@common-module/ts";

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

  private onInput(): void {
    const rawText = this.editorArea.htmlElement.innerText;
    const html = MarkdownHtmlConverter.convertMarkdownToHtml(rawText);
    console.log(html);
  }
}

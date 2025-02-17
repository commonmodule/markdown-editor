import { DomNode, el } from "@common-module/app";
export default class MarkdownWysiwygEditor extends DomNode {
    editorArea;
    constructor() {
        super(".markdown-wysiwyg-editor");
        this.editorArea = el(".editor-area");
        this.editorArea.htmlElement.contentEditable = "true";
        this.append(el(".toolbar"), this.editorArea);
    }
}
//# sourceMappingURL=MarkdownWysiwygEditor.js.map
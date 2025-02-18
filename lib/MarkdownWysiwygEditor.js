import { DomNode, el } from "@common-module/app";
import { MarkdownHTMLCompiler, MarkdownLexer, MarkdownParser, } from "@common-module/markdown";
import { Debouncer } from "@common-module/ts";
export default class MarkdownWysiwygEditor extends DomNode {
    editorArea;
    debouncer;
    constructor() {
        super(".markdown-wysiwyg-editor");
        this.editorArea = el(".editor-area");
        this.editorArea.htmlElement.contentEditable = "true";
        this.debouncer = new Debouncer(500, () => this.onInput());
        this.editorArea.onDom("input", () => this.debouncer.execute());
        this.append(el(".toolbar"), this.editorArea);
    }
    onInput() {
        const markdownText = this.editorArea.htmlElement.innerText;
        const tokens = MarkdownLexer.tokenize(markdownText);
        console.log(tokens);
        const ast = new MarkdownParser(tokens).parse();
        console.log(ast);
        const html = MarkdownHTMLCompiler.compile(ast);
        console.log(html);
    }
}
//# sourceMappingURL=MarkdownWysiwygEditor.js.map
import { DomNode } from "@common-module/app";
declare class MarkdownConverter {
    convertMarkdownToDomNodes(markdown: string): DomNode<HTMLElement, {}>[];
    private convertList;
    private convertNode;
    private convertElement;
    convertHtmlToMarkdown(html: string): string;
}
declare const _default: MarkdownConverter;
export default _default;
//# sourceMappingURL=MarkdownConverter.d.ts.map
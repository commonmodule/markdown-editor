import { DomNode } from "@common-module/app";
declare class MarkdownConverter {
    convertMarkdownToDomNodes(markdown: string): DomNode[];
    private convertBlockNode;
    private convertListItem;
    private convertTable;
    private convertInlineNodes;
    private convertInlineNode;
    private convertList;
    private convertNode;
    private convertElement;
    private convertTableToMarkdown;
    convertHtmlToMarkdown(html: string): string;
}
declare const _default: MarkdownConverter;
export default _default;
//# sourceMappingURL=MarkdownConverter.d.ts.map
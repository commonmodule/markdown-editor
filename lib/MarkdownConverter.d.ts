import { DomNode } from "@common-module/app";
import { MarkdownSyntax } from "@common-module/markdown";
declare class MarkdownConverter {
    constructor();
    private isSupported;
    private isBlockSyntaxSupported;
    private isInlineSyntaxSupported;
    convertMarkdownToDomNodes(markdown: string, supportedSyntax?: MarkdownSyntax[]): DomNode[];
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
export default MarkdownConverter;
//# sourceMappingURL=MarkdownConverter.d.ts.map
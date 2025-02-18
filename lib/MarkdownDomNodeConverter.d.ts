import { DomNode } from "@common-module/app";
import { MarkdownSyntax } from "@common-module/markdown";
export declare class MarkdownDomNodeConverter {
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
}
declare const _default: MarkdownDomNodeConverter;
export default _default;
//# sourceMappingURL=MarkdownDomNodeConverter.d.ts.map
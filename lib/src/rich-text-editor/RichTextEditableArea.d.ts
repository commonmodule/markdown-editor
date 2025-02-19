import { DomNode } from "@common-module/app";
interface TextStyle {
    isBold: boolean;
    isItalic: boolean;
    isStrikethrough: boolean;
    isHeading: boolean;
    isLink: boolean;
    href?: string;
    isInBulletList: boolean;
    isInNumberList: boolean;
    isInQuoteBlock: boolean;
    isInCode: boolean;
    isInCodeBlock: boolean;
}
export default class RichTextEditableArea extends DomNode<HTMLDivElement, {
    selectionChanged: (textStyle: TextStyle) => void;
}> {
    constructor();
    private getCurrentRange;
    private handleSelectionChange;
    private getCurrentTextStyle;
    private toggleBlock;
    toggleBold(): void;
    toggleItalic(): void;
    toggleStrikethrough(): void;
    toggleHeading(): void;
    setLink(href: string): void;
    toggleBulletList(): void;
    toggleNumberList(): void;
    toggleQuoteBlock(): void;
    toggleCode(): void;
    toggleCodeBlock(): void;
    addTable(): void;
    addImage(url: string): void;
    addYouTubeVideo(url: string): void;
    remove(): void;
}
export {};
//# sourceMappingURL=RichTextEditableArea.d.ts.map
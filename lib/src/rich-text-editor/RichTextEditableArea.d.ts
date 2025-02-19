import { DomNode } from "@common-module/app";
interface TextStyle {
    isBold: boolean;
    isItalic: boolean;
    isStrikethrough: boolean;
    isHeading: boolean;
    isLink: boolean;
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
    toggleBold(): void;
    toggleItalic(): void;
    toggleStrikethrough(): void;
    toggleHeading(): void;
    editLink(): void;
    toggleBulletList(): void;
    toggleNumberList(): void;
    toggleQuoteBlock(): void;
    toggleCode(): void;
    toggleCodeBlock(): void;
    addTable(): void;
    addImage(): void;
    addYouTubeVideo(): void;
}
export {};
//# sourceMappingURL=RichTextEditableArea.d.ts.map
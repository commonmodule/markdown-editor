import { Dom } from "@commonmodule/app";
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
export default class RichTextEditableArea extends Dom<HTMLDivElement, {
    selectionChanged: (textStyle: TextStyle) => void;
}> {
    constructor();
    private getCurrentRange;
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
}
export {};
//# sourceMappingURL=RichTextEditableArea.d.ts.map
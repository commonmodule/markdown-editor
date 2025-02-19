import { DomNode } from "@common-module/app";
export default class RichTextEditableArea extends DomNode {
    constructor() {
        super(".rich-text-editable-area.markdown-document");
        this.htmlElement.contentEditable = "true";
        document.addEventListener("selectionchange", this.handleSelectionChange);
    }
    getCurrentRange() {
        const selection = window.getSelection();
        return selection && selection.rangeCount > 0
            ? selection.getRangeAt(0)
            : undefined;
    }
    handleSelectionChange = () => {
        const range = this.getCurrentRange();
        if (range && this.htmlElement.contains(range.commonAncestorContainer)) {
            this.emit("selectionChanged", this.getCurrentTextStyle());
        }
    };
    getCurrentTextStyle() {
        const style = {
            isBold: false,
            isItalic: false,
            isStrikethrough: false,
            isHeading: false,
            isLink: false,
            isInBulletList: false,
            isInNumberList: false,
            isInQuoteBlock: false,
            isInCode: false,
            isInCodeBlock: false,
        };
        const range = this.getCurrentRange();
        if (!range)
            return style;
        let currentNode = range.commonAncestorContainer;
        while (currentNode && currentNode !== this.htmlElement) {
            const nodeName = currentNode.nodeName.toLowerCase();
            if (nodeName === "b") {
                style.isBold = true;
            }
            else if (nodeName === "i") {
                style.isItalic = true;
            }
            else if (nodeName === "s") {
                style.isStrikethrough = true;
            }
            else if (nodeName === "h3") {
                style.isHeading = true;
            }
            else if (nodeName === "a") {
                style.isLink = true;
            }
            else if (nodeName === "ul") {
                style.isInBulletList = true;
            }
            else if (nodeName === "ol") {
                style.isInNumberList = true;
            }
            else if (nodeName === "blockquote") {
                style.isInQuoteBlock = true;
            }
            else if (nodeName === "code") {
                if (currentNode.parentElement?.nodeName.toLowerCase() === "pre") {
                    style.isInCodeBlock = true;
                }
                else {
                    style.isInCode = true;
                }
            }
            currentNode = currentNode.parentNode;
        }
        return style;
    }
    toggleBlock(tag) {
    }
    toggleBold() {
        this.toggleBlock("b");
    }
    toggleItalic() {
        this.toggleBlock("i");
    }
    toggleStrikethrough() {
        this.toggleBlock("s");
    }
    toggleHeading() {
        this.toggleBlock("h3");
    }
    editLink() {
    }
    toggleBulletList() {
    }
    toggleNumberList() {
    }
    toggleQuoteBlock() {
        this.toggleBlock("blockquote");
    }
    toggleCode() {
        this.toggleBlock("code");
    }
    toggleCodeBlock() {
    }
    addTable() {
    }
    addImage() {
    }
    addYouTubeVideo() {
    }
    remove() {
        document.removeEventListener("selectionchange", this.handleSelectionChange);
        super.remove();
    }
}
//# sourceMappingURL=RichTextEditableArea.js.map
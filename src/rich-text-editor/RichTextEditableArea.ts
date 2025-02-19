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
  constructor() {
    super(".rich-text-editable-area.markdown-document");
    this.htmlElement.contentEditable = "true";
    document.addEventListener("selectionchange", this.handleSelectionChange);
  }

  private getCurrentRange(): Range | undefined {
    const selection = window.getSelection();
    return selection && selection.rangeCount > 0
      ? selection.getRangeAt(0)
      : undefined;
  }

  private handleSelectionChange = () => {
    const range = this.getCurrentRange();
    if (range && this.htmlElement.contains(range.commonAncestorContainer)) {
      this.emit("selectionChanged", this.getCurrentTextStyle());
    }
  };

  private getCurrentTextStyle(): TextStyle {
    const style: TextStyle = {
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
    if (!range) return style;

    let currentNode: Node | null = range.commonAncestorContainer;
    while (currentNode && currentNode !== this.htmlElement) {
      const nodeName = currentNode.nodeName.toLowerCase();
      if (nodeName === "b") {
        style.isBold = true;
      } else if (nodeName === "i") {
        style.isItalic = true;
      } else if (nodeName === "s") {
        style.isStrikethrough = true;
      } else if (nodeName === "h3") {
        style.isHeading = true;
      } else if (nodeName === "a") {
        style.isLink = true;
      } else if (nodeName === "ul") {
        style.isInBulletList = true;
      } else if (nodeName === "ol") {
        style.isInNumberList = true;
      } else if (nodeName === "blockquote") {
        style.isInQuoteBlock = true;
      } else if (nodeName === "code") {
        if (currentNode.parentElement?.nodeName.toLowerCase() === "pre") {
          style.isInCodeBlock = true;
        } else {
          style.isInCode = true;
        }
      }
      currentNode = currentNode.parentNode;
    }

    return style;
  }

  private toggleBlock(tag: string) {
    const selection = window.getSelection();
    if (!selection) return;

    const range = this.getCurrentRange();
    if (range && this.htmlElement.contains(range.commonAncestorContainer)) {
      let existingElement: HTMLElement | undefined;

      let currentNode: Node | null = range.commonAncestorContainer;
      while (currentNode && currentNode !== this.htmlElement) {
        if (currentNode.nodeName.toLowerCase() === tag) {
          existingElement = currentNode as HTMLElement;
          break;
        }
        currentNode = currentNode.parentNode;
      }

      if (existingElement) {
        const parent = existingElement.parentElement;
        if (!parent) return;

        let firstNewElement: HTMLElement | undefined;
        let lastNewElement: HTMLElement | undefined;
        while (existingElement.firstChild) {
          const newElement = parent.insertBefore(
            existingElement.firstChild,
            existingElement,
          );
          if (!firstNewElement) firstNewElement = newElement as HTMLElement;
          lastNewElement = newElement as HTMLElement;
        }
        parent.removeChild(existingElement);

        if (firstNewElement && lastNewElement) {
          selection.removeAllRanges();
          const newRange = document.createRange();
          newRange.setStartBefore(firstNewElement);
          newRange.setEndAfter(lastNewElement);
          selection.addRange(newRange);
        }
      } else {
        const newElement = document.createElement(tag);
        range.surroundContents(newElement);

        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.selectNodeContents(newElement);
        selection.addRange(newRange);
      }
    }
  }

  public toggleBold() {
    this.toggleBlock("b");
  }

  public toggleItalic() {
    this.toggleBlock("i");
  }

  public toggleStrikethrough() {
    this.toggleBlock("s");
  }

  public toggleHeading() {
    this.toggleBlock("h3");
  }

  public editLink() {
    //TODO:
  }

  public toggleBulletList() {
    //TODO:
  }

  public toggleNumberList() {
    //TODO:
  }

  public toggleQuoteBlock() {
    this.toggleBlock("blockquote");
  }

  public toggleCode() {
    this.toggleBlock("code");
  }

  public toggleCodeBlock() {
    //TODO:
  }

  public addTable() {
    //TODO:
  }

  public addImage() {
    //TODO:
  }

  public addYouTubeVideo() {
    //TODO:
  }

  public remove(): void {
    document.removeEventListener("selectionchange", this.handleSelectionChange);
    super.remove();
  }
}

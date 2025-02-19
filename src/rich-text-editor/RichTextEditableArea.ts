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
  }

  public toggleBold() {
  }

  public toggleItalic() {
  }

  public toggleStrikethrough() {
  }

  public toggleHeading() {
  }

  public editLink() {
  }

  public toggleBulletList() {
  }

  public toggleNumberList() {
  }

  public toggleQuoteBlock() {
  }

  public toggleCode() {
  }

  public toggleCodeBlock() {
  }

  public addTable() {
  }

  public addImage() {
  }

  public addYouTubeVideo() {
  }
}

import { DomNode, el } from "@common-module/app";
import {
  Button,
  ButtonType,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@common-module/app-components";
import { MarkdownConverter } from "@common-module/markdown";
import MarkdownEditorConfig from "../MarkdownEditorConfig.js";
import RichTextEditableArea from "./RichTextEditableArea.js";

type ToolbarButtonClass = new (
  options: { type: ButtonType; icon: DomNode; onClick: () => void },
) => DomNode;

export default class RichTextEditor extends DomNode {
  private gap?: number;
  private buttonWidth?: number;
  private maxVisibleButtons?: number;

  private toolbarButtons: Record<string, DomNode> = {};
  private buttonContainer: DomNode;
  private moreButton: DomNode;
  private editableArea: RichTextEditableArea;

  constructor() {
    super(".rich-text-editor");

    this.append(
      el(
        ".toolbar",
        this.buttonContainer = el(".button-container"),
        this.moreButton = new Button(".more-button", {
          type: ButtonType.Icon,
          icon: new MarkdownEditorConfig.MoreIcon(),
          onClick: (_, event) => {
            event.preventDefault();
            event.stopPropagation();
            this.openMoreMenu(event.clientX, event.clientY);
          },
        }),
      ),
      this.editableArea = new RichTextEditableArea(),
    );

    this.on("visible", () => this.updateToolbar());
    this.onWindow("resize", () => this.updateToolbar());

    this.editableArea.on("selectionChanged", (textStyle) => {
      console.log(textStyle);
      const tbs = this.toolbarButtons;
      if (textStyle.isBold) tbs.bold.addClass("active");
      else tbs.bold.removeClass("active");
      if (textStyle.isItalic) tbs.italic.addClass("active");
      else tbs.italic.removeClass("active");
      if (textStyle.isStrikethrough) tbs.strikethrough.addClass("active");
      else tbs.strikethrough.removeClass("active");
      if (textStyle.isHeading) tbs.heading.addClass("active");
      else tbs.heading.removeClass("active");
      if (textStyle.isLink) tbs.link.addClass("active");
      else tbs.link.removeClass("active");
      if (textStyle.isInBulletList) tbs["bullet-list"].addClass("active");
      else tbs["bullet-list"].removeClass("active");
      if (textStyle.isInNumberList) tbs["number-list"].addClass("active");
      else tbs["number-list"].removeClass("active");
      if (textStyle.isInQuoteBlock) tbs["quote-block"].addClass("active");
      else tbs["quote-block"].removeClass("active");
      if (textStyle.isInCode) tbs.code.addClass("active");
      else tbs.code.removeClass("active");
      if (textStyle.isInCodeBlock) tbs["code-block"].addClass("active");
      else tbs["code-block"].removeClass("active");
    });
  }

  private createToolbarButton(
    ToolbarButton: ToolbarButtonClass,
    type: string,
    icon: DomNode,
    onClick: () => void,
  ) {
    const button = new ToolbarButton({ type: ButtonType.Icon, icon, onClick });
    this.toolbarButtons[type] = button;
    button.on("remove", () => delete this.toolbarButtons[type]);
    return button;
  }

  private createToolbarButtonByIndex(
    ToolbarButton: ToolbarButtonClass,
    buttonIndex: number,
  ) {
    if (buttonIndex === 0) {
      return this.createToolbarButton(
        ToolbarButton,
        "bold",
        new MarkdownEditorConfig.BoldIcon(),
        () => this.editableArea.toggleBold(),
      );
    } else if (buttonIndex === 1) {
      return this.createToolbarButton(
        ToolbarButton,
        "italic",
        new MarkdownEditorConfig.ItalicIcon(),
        () => this.editableArea.toggleItalic(),
      );
    } else if (buttonIndex === 2) {
      return this.createToolbarButton(
        ToolbarButton,
        "strikethrough",
        new MarkdownEditorConfig.StrikethroughIcon(),
        () => this.editableArea.toggleStrikethrough(),
      );
    } else if (buttonIndex === 3) {
      return this.createToolbarButton(
        ToolbarButton,
        "heading",
        new MarkdownEditorConfig.HeadingIcon(),
        () => this.editableArea.toggleHeading(),
      );
    } else if (buttonIndex === 4) {
      return this.createToolbarButton(
        ToolbarButton,
        "link",
        new MarkdownEditorConfig.LinkIcon(),
        () => this.editableArea.editLink(),
      );
    } else if (buttonIndex === 5) {
      return this.createToolbarButton(
        ToolbarButton,
        "bullet-list",
        new MarkdownEditorConfig.BulletListIcon(),
        () => this.editableArea.toggleBulletList(),
      );
    } else if (buttonIndex === 6) {
      return this.createToolbarButton(
        ToolbarButton,
        "number-list",
        new MarkdownEditorConfig.NumberListIcon(),
        () => this.editableArea.toggleNumberList(),
      );
    } else if (buttonIndex === 7) {
      return this.createToolbarButton(
        ToolbarButton,
        "quote-block",
        new MarkdownEditorConfig.QuoteBlockIcon(),
        () => this.editableArea.toggleQuoteBlock(),
      );
    } else if (buttonIndex === 8) {
      return this.createToolbarButton(
        ToolbarButton,
        "code",
        new MarkdownEditorConfig.CodeIcon(),
        () => this.editableArea.toggleCode(),
      );
    } else if (buttonIndex === 9) {
      return this.createToolbarButton(
        ToolbarButton,
        "code-block",
        new MarkdownEditorConfig.CodeBlockIcon(),
        () => this.editableArea.toggleCodeBlock(),
      );
    } else if (buttonIndex === 10) {
      return this.createToolbarButton(
        ToolbarButton,
        "table",
        new MarkdownEditorConfig.TableIcon(),
        () => this.editableArea.addTable(),
      );
    } else if (buttonIndex === 11) {
      return this.createToolbarButton(
        ToolbarButton,
        "image",
        new MarkdownEditorConfig.ImageIcon(),
        () => this.editableArea.addImage(),
      );
    } else if (buttonIndex === 12) {
      return this.createToolbarButton(
        ToolbarButton,
        "youtube",
        new MarkdownEditorConfig.YouTubeIcon(),
        () => this.editableArea.addYouTubeVideo(),
      );
    }
  }

  private updateToolbar() {
    if (this.gap === undefined) {
      this.gap = parseInt(
        window.getComputedStyle(this.buttonContainer.htmlElement).columnGap,
      );
    }

    if (this.buttonWidth === undefined) {
      this.buttonWidth = this.moreButton.calculateRect().width;
    }

    this.moreButton.addClass("hidden");

    const buttonContainerWidth = this.buttonContainer.calculateRect().width;
    this.maxVisibleButtons = Math.floor(
      buttonContainerWidth / (this.buttonWidth + this.gap),
    );

    if (this.maxVisibleButtons < 13) {
      this.maxVisibleButtons = Math.floor(
        (buttonContainerWidth - this.buttonWidth) /
          (this.buttonWidth + this.gap),
      );
    }

    this.buttonContainer.clear();
    for (let i = 0; i < this.maxVisibleButtons; i += 1) {
      this.buttonContainer.append(this.createToolbarButtonByIndex(Button, i));
    }

    if (this.maxVisibleButtons < 13) {
      this.moreButton.removeClass("hidden");
    } else {
      this.moreButton.addClass("hidden");
    }
  }

  private openMoreMenu(left: number, top: number) {
    const menu = new DropdownMenu(".rich-text-editor-more-menu", { left, top });
    const group = new DropdownMenuGroup();
    for (let i = this.maxVisibleButtons!; i < 13; i += 1) {
      const button = this.createToolbarButtonByIndex(DropdownMenuItem, i);
      button?.onDom("click", () => menu.remove());
      group.append(button);
    }
    menu.appendToMain(group);
  }

  public getContent(): string {
    return MarkdownConverter.convertHtmlToMarkdown(
      this.editableArea.htmlElement.innerHTML,
    );
  }
}

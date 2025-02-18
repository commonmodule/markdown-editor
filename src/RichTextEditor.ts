import { DomNode, el } from "@common-module/app";
import {
  Button,
  ButtonType,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@common-module/app-components";
import MarkdownEditorConfig from "./MarkdownEditorConfig.js";

export default class RichTextEditor extends DomNode {
  private gap?: number;
  private buttonWidth?: number;
  private maxVisibleButtons?: number;

  private buttonContainer: DomNode;
  private moreButton: DomNode;

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
      el(".editor-area", { contentEditable: "true" }),
    );

    this.on("visible", () => this.updateToolbar());
    this.onWindow("resize", () => this.updateToolbar());
  }

  private createToolbarButton(
    Button: new (
      options: { type: ButtonType; icon: DomNode; onClick: () => void },
    ) => Button,
    buttonIndex: number,
  ) {
    if (buttonIndex === 0) {
      return new Button({
        type: ButtonType.Icon,
        icon: new MarkdownEditorConfig.BoldIcon(),
        onClick: () => {},
      });
    } else if (buttonIndex === 1) {
      return new Button({
        type: ButtonType.Icon,
        icon: new MarkdownEditorConfig.ItalicIcon(),
        onClick: () => {},
      });
    } else if (buttonIndex === 2) {
      return new Button({
        type: ButtonType.Icon,
        icon: new MarkdownEditorConfig.StrikethroughIcon(),
        onClick: () => {},
      });
    } else if (buttonIndex === 3) {
      return new Button({
        type: ButtonType.Icon,
        icon: new MarkdownEditorConfig.HeadingIcon(),
        onClick: () => {},
      });
    } else if (buttonIndex === 4) {
      return new Button({
        type: ButtonType.Icon,
        icon: new MarkdownEditorConfig.LinkIcon(),
        onClick: () => {},
      });
    } else if (buttonIndex === 5) {
      return new Button({
        type: ButtonType.Icon,
        icon: new MarkdownEditorConfig.BulletListIcon(),
        onClick: () => {},
      });
    } else if (buttonIndex === 6) {
      return new Button({
        type: ButtonType.Icon,
        icon: new MarkdownEditorConfig.NumberListIcon(),
        onClick: () => {},
      });
    } else if (buttonIndex === 7) {
      return new Button({
        type: ButtonType.Icon,
        icon: new MarkdownEditorConfig.QuoteBlockIcon(),
        onClick: () => {},
      });
    } else if (buttonIndex === 8) {
      return new Button({
        type: ButtonType.Icon,
        icon: new MarkdownEditorConfig.CodeIcon(),
        onClick: () => {},
      });
    } else if (buttonIndex === 9) {
      return new Button({
        type: ButtonType.Icon,
        icon: new MarkdownEditorConfig.CodeBlockIcon(),
        onClick: () => {},
      });
    } else if (buttonIndex === 10) {
      return new Button({
        type: ButtonType.Icon,
        icon: new MarkdownEditorConfig.TableIcon(),
        onClick: () => {},
      });
    } else if (buttonIndex === 11) {
      return new Button({
        type: ButtonType.Icon,
        icon: new MarkdownEditorConfig.ImageIcon(),
        onClick: () => {},
      });
    } else if (buttonIndex === 12) {
      return new Button({
        type: ButtonType.Icon,
        icon: new MarkdownEditorConfig.YouTubeIcon(),
        onClick: () => {},
      });
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
      this.buttonContainer.append(this.createToolbarButton(Button, i));
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
      const button = this.createToolbarButton(DropdownMenuItem as any, i);
      button?.onDom("click", () => menu.remove());
      group.append(button);
    }
    menu.appendToMain(group);
  }
}

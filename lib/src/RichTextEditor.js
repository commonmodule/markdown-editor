import { DomNode, el } from "@common-module/app";
import { Button, ButtonType, DropdownMenu, DropdownMenuGroup, DropdownMenuItem, } from "@common-module/app-components";
import { MarkdownConverter } from "@common-module/markdown";
import MarkdownEditorConfig from "./MarkdownEditorConfig.js";
export default class RichTextEditor extends DomNode {
    gap;
    buttonWidth;
    maxVisibleButtons;
    buttonContainer;
    moreButton;
    editorArea;
    constructor() {
        super(".rich-text-editor");
        this.append(el(".toolbar", this.buttonContainer = el(".button-container"), this.moreButton = new Button(".more-button", {
            type: ButtonType.Icon,
            icon: new MarkdownEditorConfig.MoreIcon(),
            onClick: (_, event) => {
                event.preventDefault();
                event.stopPropagation();
                this.openMoreMenu(event.clientX, event.clientY);
            },
        })), this.editorArea = el(".editor-area.markdown-document", {
            contentEditable: "true",
        }));
        this.on("visible", () => this.updateToolbar());
        this.onWindow("resize", () => this.updateToolbar());
    }
    createToolbarButton(Button, buttonIndex) {
        if (buttonIndex === 0) {
            return new Button({
                type: ButtonType.Icon,
                icon: new MarkdownEditorConfig.BoldIcon(),
                onClick: () => document.execCommand("bold"),
            });
        }
        else if (buttonIndex === 1) {
            return new Button({
                type: ButtonType.Icon,
                icon: new MarkdownEditorConfig.ItalicIcon(),
                onClick: () => document.execCommand("italic"),
            });
        }
        else if (buttonIndex === 2) {
            return new Button({
                type: ButtonType.Icon,
                icon: new MarkdownEditorConfig.StrikethroughIcon(),
                onClick: () => {
                    const selection = window.getSelection();
                    const selectedText = selection && selection.toString()
                        ? selection.toString()
                        : "";
                    const html = `<s>${selectedText}</s>`;
                    document.execCommand("insertHTML", false, html);
                },
            });
        }
        else if (buttonIndex === 3) {
            return new Button({
                type: ButtonType.Icon,
                icon: new MarkdownEditorConfig.HeadingIcon(),
                onClick: () => document.execCommand("formatBlock", false, "h1"),
            });
        }
        else if (buttonIndex === 4) {
            return new Button({
                type: ButtonType.Icon,
                icon: new MarkdownEditorConfig.LinkIcon(),
                onClick: () => {
                },
            });
        }
        else if (buttonIndex === 5) {
            return new Button({
                type: ButtonType.Icon,
                icon: new MarkdownEditorConfig.BulletListIcon(),
                onClick: () => document.execCommand("insertUnorderedList"),
            });
        }
        else if (buttonIndex === 6) {
            return new Button({
                type: ButtonType.Icon,
                icon: new MarkdownEditorConfig.NumberListIcon(),
                onClick: () => document.execCommand("insertOrderedList"),
            });
        }
        else if (buttonIndex === 7) {
            return new Button({
                type: ButtonType.Icon,
                icon: new MarkdownEditorConfig.QuoteBlockIcon(),
                onClick: () => document.execCommand("formatBlock", false, "blockquote"),
            });
        }
        else if (buttonIndex === 8) {
            return new Button({
                type: ButtonType.Icon,
                icon: new MarkdownEditorConfig.CodeIcon(),
                onClick: () => {
                    const selection = window.getSelection();
                    const selectedText = selection && selection.toString()
                        ? selection.toString()
                        : "";
                    const html = `<code>${selectedText}</code>`;
                    document.execCommand("insertHTML", false, html);
                },
            });
        }
        else if (buttonIndex === 9) {
            return new Button({
                type: ButtonType.Icon,
                icon: new MarkdownEditorConfig.CodeBlockIcon(),
                onClick: () => {
                    const selection = window.getSelection();
                    const selectedText = selection && selection.toString()
                        ? selection.toString()
                        : "";
                    const html = `<pre><code>${selectedText}</code></pre>`;
                    document.execCommand("insertHTML", false, html);
                },
            });
        }
        else if (buttonIndex === 10) {
            return new Button({
                type: ButtonType.Icon,
                icon: new MarkdownEditorConfig.TableIcon(),
                onClick: () => {
                    const tableHTML = `<table border="1" style="border-collapse: collapse;">
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Data 1</td>
    <td>Data 2</td>
  </tr>
</table>`;
                    document.execCommand("insertHTML", false, tableHTML);
                },
            });
        }
        else if (buttonIndex === 11) {
            return new Button({
                type: ButtonType.Icon,
                icon: new MarkdownEditorConfig.ImageIcon(),
                onClick: () => {
                },
            });
        }
        else if (buttonIndex === 12) {
            return new Button({
                type: ButtonType.Icon,
                icon: new MarkdownEditorConfig.YouTubeIcon(),
                onClick: () => {
                },
            });
        }
    }
    updateToolbar() {
        if (this.gap === undefined) {
            this.gap = parseInt(window.getComputedStyle(this.buttonContainer.htmlElement).columnGap);
        }
        if (this.buttonWidth === undefined) {
            this.buttonWidth = this.moreButton.calculateRect().width;
        }
        this.moreButton.addClass("hidden");
        const buttonContainerWidth = this.buttonContainer.calculateRect().width;
        this.maxVisibleButtons = Math.floor(buttonContainerWidth / (this.buttonWidth + this.gap));
        if (this.maxVisibleButtons < 13) {
            this.maxVisibleButtons = Math.floor((buttonContainerWidth - this.buttonWidth) /
                (this.buttonWidth + this.gap));
        }
        this.buttonContainer.clear();
        for (let i = 0; i < this.maxVisibleButtons; i += 1) {
            this.buttonContainer.append(this.createToolbarButton(Button, i));
        }
        if (this.maxVisibleButtons < 13) {
            this.moreButton.removeClass("hidden");
        }
        else {
            this.moreButton.addClass("hidden");
        }
    }
    openMoreMenu(left, top) {
        const menu = new DropdownMenu(".rich-text-editor-more-menu", { left, top });
        const group = new DropdownMenuGroup();
        for (let i = this.maxVisibleButtons; i < 13; i += 1) {
            const button = this.createToolbarButton(DropdownMenuItem, i);
            button?.onDom("click", () => menu.remove());
            group.append(button);
        }
        menu.appendToMain(group);
    }
    getContent() {
        return MarkdownConverter.convertHtmlToMarkdown(this.editorArea.htmlElement.innerHTML);
    }
}
//# sourceMappingURL=RichTextEditor.js.map
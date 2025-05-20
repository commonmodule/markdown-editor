import StyledMarkdownArea from "./StyledMarkdownArea.js";

export default class MarkdownEditor extends StyledMarkdownArea<{
  contentChanged: (newContent: string) => void;
}> {
  constructor() {
    super(".markdown-editor");
    this.htmlElement.contentEditable = "true";
    this.on(
      "input",
      () => this.emit("contentChanged", this.htmlElement.innerText),
    );
    this.on("keydown", (event) => this.onKeyDown(event));
    this.on("paste", () => setTimeout(() => this.updateStyles(), 0));
  }

  private onKeyDown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === "b") {
      event.preventDefault();
      this.toggleMarkdownStyle("**");
    } else if ((event.metaKey || event.ctrlKey) && event.key === "i") {
      event.preventDefault();
      this.toggleMarkdownStyle("*");
    } else if (
      (event.shiftKey && event.key === "*") ||
      (event.key === "Backspace") ||
      (event.key === "Delete")
    ) {
      setTimeout(() => this.updateStyles(), 0);
    }
  }

  private toggleMarkdownStyle(marker: string) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;

    let newText: string;
    if (selectedText.startsWith(marker) && selectedText.endsWith(marker)) {
      newText = selectedText.slice(marker.length, -marker.length);
    } else {
      newText = `${marker}${selectedText}${marker}`;
    }

    range.deleteContents();
    const textNode = document.createTextNode(newText);
    range.insertNode(textNode);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(textNode);
    selection.addRange(newRange);

    this.updateStyles();

    this.emit("contentChanged", this.htmlElement.innerText);
  }
}

import { DomNode } from "@commonmodule/app";
export default class StyledMarkdownArea extends DomNode {
    constructor(tag) {
        super(`${tag}.styled-markdown-area`);
    }
    getCaretOffset(element) {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return -1;
        }
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        return preCaretRange.toString().length;
    }
    setCaretOffset(element, offset) {
        if (offset < 0)
            return;
        const selection = window.getSelection();
        if (!selection)
            return;
        const range = document.createRange();
        range.selectNodeContents(element);
        range.collapse(true);
        let currentOffset = 0;
        const nodeStack = [];
        for (let i = element.childNodes.length - 1; i >= 0; i--) {
            nodeStack.push(element.childNodes[i]);
        }
        while (nodeStack.length > 0) {
            const node = nodeStack.pop();
            if (node.nodeType === Node.TEXT_NODE) {
                const textLength = node.textContent?.length ?? 0;
                if (currentOffset + textLength >= offset) {
                    range.setStart(node, offset - currentOffset);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    return;
                }
                currentOffset += textLength;
            }
            else {
                for (let i = node.childNodes.length - 1; i >= 0; i--) {
                    nodeStack.push(node.childNodes[i]);
                }
            }
        }
    }
    parseMarkdownWithSpans(text) {
        let i = 0;
        let result = "";
        const stack = [];
        while (i < text.length) {
            if (text[i] === "*") {
                let j = i;
                while (j < text.length && text[j] === "*") {
                    j++;
                }
                let starCount = j - i;
                let consumed = 0;
                while (starCount >= 3) {
                    const top = stack[stack.length - 1];
                    if (top === "strongem") {
                        stack.pop();
                        result += `***</span>`;
                    }
                    else {
                        stack.push("strongem");
                        result += `<span style="font-weight:bold; font-style:italic;">***`;
                    }
                    starCount -= 3;
                    consumed += 3;
                }
                while (starCount >= 2) {
                    const top = stack[stack.length - 1];
                    if (top === "strong") {
                        stack.pop();
                        result += `**</span>`;
                    }
                    else {
                        stack.push("strong");
                        result += `<span style="font-weight:bold;">**`;
                    }
                    starCount -= 2;
                    consumed += 2;
                }
                while (starCount >= 1) {
                    const top = stack[stack.length - 1];
                    if (top === "em") {
                        stack.pop();
                        result += `*</span>`;
                    }
                    else {
                        stack.push("em");
                        result += `<span style="font-style:italic;">*`;
                    }
                    starCount -= 1;
                    consumed += 1;
                }
                i += consumed;
            }
            else {
                result += text[i];
                i++;
            }
        }
        while (stack.length > 0) {
            const top = stack.pop();
            if (top === "strongem") {
                result += "</span>";
            }
            else if (top === "strong") {
                result += "</span>";
            }
            else if (top === "em") {
                result += "</span>";
            }
        }
        return result;
    }
    updateStyles() {
        const caretOffset = this.getCaretOffset(this.htmlElement);
        const text = this.htmlElement.textContent ?? "";
        const newHTML = this.parseMarkdownWithSpans(text);
        this.htmlElement.innerHTML = newHTML;
        this.setCaretOffset(this.htmlElement, caretOffset);
    }
}
//# sourceMappingURL=StyledMarkdownArea.js.map
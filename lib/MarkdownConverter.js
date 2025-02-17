import { el } from "@common-module/app";
import { MarkdownParser } from "@common-module/markdown";
class MarkdownConverter {
    convertMarkdownToDomNodes(markdown) {
        const ast = MarkdownParser.parse(markdown);
        const nodes = [];
        for (const node of ast) {
            nodes.push(this.convertBlockNode(node));
        }
        return nodes;
    }
    convertBlockNode(node) {
        switch (node.type) {
            case "heading":
                return el(`h${node.level}`, {}, ...this.convertInlineNodes(node.children));
            case "paragraph":
                return el("p", {}, ...this.convertInlineNodes(node.children));
            case "list": {
                const listItems = node.items.map((item) => this.convertListItem(item));
                return el(node.ordered ? "ol" : "ul", {}, ...listItems);
            }
            case "codeBlock": {
                const codeElem = node.language
                    ? el(`code.language-${node.language}`, node.content)
                    : el("code", {}, node.content);
                return el("pre", {}, codeElem);
            }
            case "blockquote":
                return el("blockquote", {}, ...node.children.map((child) => this.convertBlockNode(child)));
            case "horizontalRule":
                return el("hr", {});
            case "table":
                return this.convertTable(node);
            case "footnoteDefinition":
                return el("div.footnote-definition", { "dataset": { id: node.identifier } }, ...this.convertInlineNodes(node.children));
            default:
                return el("p", {}, "Unsupported node");
        }
    }
    convertListItem(item) {
        const childrenNodes = this.convertInlineNodes(item.children);
        if (item.nested) {
            childrenNodes.push(this.convertBlockNode(item.nested));
        }
        return el("li", {}, ...childrenNodes);
    }
    convertTable(table) {
        const theadCells = table.header.map((cell) => el("th", {}, cell));
        const theadRow = el("tr", {}, ...theadCells);
        const thead = el("thead", {}, theadRow);
        const tbodyRows = table.rows.map((row) => {
            const cells = row.map((cell) => el("td", {}, cell));
            return el("tr", {}, ...cells);
        });
        const tbody = el("tbody", {}, ...tbodyRows);
        return el("table", {}, thead, tbody);
    }
    convertInlineNodes(inlines) {
        const nodes = [];
        for (const inline of inlines) {
            nodes.push(this.convertInlineNode(inline));
        }
        return nodes;
    }
    convertInlineNode(inline) {
        switch (inline.type) {
            case "text":
                return inline.content;
            case "escape":
                return inline.character;
            case "bold":
                return el("strong", {}, ...this.convertInlineNodes(inline.children));
            case "italic":
                return el("em", {}, ...this.convertInlineNodes(inline.children));
            case "boldItalic":
                return el("strong", {}, el("em", {}, ...this.convertInlineNodes(inline.children)));
            case "strikethrough":
                return el("del", {}, ...this.convertInlineNodes(inline.children));
            case "inlineCode":
                return el("code", {}, inline.content);
            case "link":
                return el("a", { href: inline.url, title: inline.title || "" }, ...this.convertInlineNodes(inline.children));
            case "autoLink":
                return el("a", { href: inline.url }, inline.url);
            case "emailLink":
                return el("a", { href: `mailto:${inline.email}` }, inline.email);
            case "image":
                return el("img", {
                    src: inline.url,
                    alt: inline.alt,
                    title: inline.title || "",
                });
            case "emoji":
                return `:${inline.name}:`;
            case "mention":
                return el("a.mention", { href: `/user/${inline.username}` }, "@" + inline.username);
            case "issueReference":
                return el("a.issue-reference", { href: `/issues/${inline.issue}` }, "#" + inline.issue);
            case "commitReference":
                return el("a.commit-reference", { href: `/commit/${inline.commit}` }, inline.commit);
            case "pullRequestReference":
                return el("a.pr-reference", { href: `/pull/${inline.pr}` }, "#" + inline.pr);
            case "teamMention":
                return el("a.team-mention", { href: `/team/${inline.team}` }, "@" + inline.team);
            case "htmlInline":
                return el("span", { innerHTML: inline.content });
            case "mathInline":
                return el("span.math-inline", `$${inline.content}$`);
            case "lineBreak":
                return el("br", {});
            case "softLineBreak":
                return "\n";
            default:
                return "";
        }
    }
    convertList(el, bullet) {
        let markdown = "";
        const items = Array.from(el.children).filter((child) => child.tagName.toLowerCase() === "li");
        items.forEach((item, index) => {
            const bulletText = typeof bullet === "string"
                ? bullet
                : bullet(index + 1);
            const content = this.convertElement(item)
                .trim()
                .replace(/\n/g, "\n    ");
            markdown += bulletText + content + "\n";
        });
        return markdown + "\n";
    }
    convertNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent || "";
        }
        else if (node.nodeType === Node.ELEMENT_NODE) {
            const elNode = node;
            const tag = elNode.tagName.toLowerCase();
            if (/^h[1-6]$/.test(tag)) {
                const level = parseInt(tag[1]);
                return `${"#".repeat(level)} ${this.convertElement(elNode).trim()}\n\n`;
            }
            else if (tag === "p") {
                return this.convertElement(elNode).trim() + "\n\n";
            }
            else if (tag === "br") {
                return "  \n";
            }
            else if (tag === "strong" || tag === "b") {
                return `**${this.convertElement(elNode).trim()}**`;
            }
            else if (tag === "em" || tag === "i") {
                return `*${this.convertElement(elNode).trim()}*`;
            }
            else if (tag === "del") {
                return `~~${this.convertElement(elNode).trim()}~~`;
            }
            else if (tag === "a") {
                const href = elNode.getAttribute("href") || "";
                const text = this.convertElement(elNode).trim();
                return `[${text}](${href})`;
            }
            else if (tag === "img") {
                const alt = elNode.getAttribute("alt") || "";
                const src = elNode.getAttribute("src") || "";
                const title = elNode.getAttribute("title") || "";
                return `![${alt}](${src}${title ? ` "${title}"` : ""})`;
            }
            else if (tag === "ul") {
                return this.convertList(elNode, "- ");
            }
            else if (tag === "ol") {
                return this.convertList(elNode, (index) => `${index}. `);
            }
            else if (tag === "li") {
                return this.convertElement(elNode).trim() + "\n";
            }
            else if (tag === "code") {
                if (elNode.parentElement &&
                    elNode.parentElement.tagName.toLowerCase() === "pre") {
                    return this.convertElement(elNode);
                }
                return "`" + this.convertElement(elNode).trim() + "`";
            }
            else if (tag === "pre") {
                const codeElem = elNode.querySelector("code");
                if (codeElem) {
                    const classAttr = codeElem.getAttribute("class") || "";
                    const langMatch = classAttr.match(/language-(\w+)/);
                    const language = langMatch ? langMatch[1] : "";
                    return "```" + (language ? language : "") + "\n" +
                        this.convertElement(codeElem).trim() + "\n```\n\n";
                }
                return "```\n" + this.convertElement(elNode).trim() + "\n```\n\n";
            }
            else if (tag === "blockquote") {
                return this.convertElement(elNode)
                    .split("\n")
                    .map((line) => "> " + line)
                    .join("\n") + "\n\n";
            }
            else if (tag === "hr") {
                return "\n---\n\n";
            }
            else if (tag === "table") {
                return this.convertTableToMarkdown(elNode);
            }
            else if (tag === "span") {
                if (elNode.classList.contains("math-inline")) {
                    return `$${this.convertElement(elNode).trim()}$`;
                }
                else if (elNode.classList.contains("emoji")) {
                    return `:${this.convertElement(elNode).trim()}:`;
                }
                else if (elNode.classList.contains("mention")) {
                    return `@${this.convertElement(elNode).trim()}`;
                }
                return this.convertElement(elNode);
            }
            else if (tag === "div" && elNode.classList.contains("footnote-definition")) {
                const id = elNode.getAttribute("data-id") || "";
                return `[^${id}]: ${this.convertElement(elNode).trim()}\n\n`;
            }
            else {
                return this.convertElement(elNode);
            }
        }
        return "";
    }
    convertElement(element) {
        let markdown = "";
        element.childNodes.forEach((child) => {
            markdown += this.convertNode(child);
        });
        return markdown;
    }
    convertTableToMarkdown(tableEl) {
        let markdown = "";
        const thead = tableEl.querySelector("thead");
        const tbody = tableEl.querySelector("tbody");
        if (!thead || !tbody)
            return "";
        const headerCells = Array.from(thead.querySelectorAll("th")).map((th) => this.convertElement(th).trim());
        const headerLine = "| " + headerCells.join(" | ") + " |";
        const alignmentLine = "| " + headerCells.map(() => "---").join(" | ") +
            " |";
        const rows = Array.from(tbody.querySelectorAll("tr")).map((tr) => {
            const cells = Array.from(tr.querySelectorAll("td")).map((td) => this.convertElement(td).trim());
            return "| " + cells.join(" | ") + " |";
        });
        markdown += headerLine + "\n" + alignmentLine + "\n" + rows.join("\n") +
            "\n\n";
        return markdown;
    }
    convertHtmlToMarkdown(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return this.convertElement(doc.body).trim();
    }
}
export default new MarkdownConverter();
//# sourceMappingURL=MarkdownConverter.js.map
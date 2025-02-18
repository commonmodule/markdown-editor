import { DomNode, el } from "@common-module/app";
import { MarkdownParser, MarkdownSyntax } from "@common-module/markdown";
import { DomSelector } from "@common-module/universal-page";

class MarkdownConverter {
  // Constructor no longer accepts a syntax list
  constructor() {}

  // Helper method: Check if a syntax (or any in an array) is supported
  private isSupported(
    syntax: string | string[],
    syntaxSet: Set<string>,
  ): boolean {
    if (Array.isArray(syntax)) {
      return syntax.some((s) => syntaxSet.has(s));
    }
    return syntaxSet.has(syntax);
  }

  private isBlockSyntaxSupported(
    syntax: string | string[],
    syntaxSet: Set<string>,
  ): boolean {
    return this.isSupported(syntax, syntaxSet);
  }

  private isInlineSyntaxSupported(
    syntax: string | string[],
    syntaxSet: Set<string>,
  ): boolean {
    return this.isSupported(syntax, syntaxSet);
  }

  // -----------------------------------------------------
  // Markdown to DOM conversion
  // -----------------------------------------------------

  public convertMarkdownToDomNodes(
    markdown: string,
    supportedSyntax?: MarkdownSyntax[],
  ): DomNode[] {
    const syntaxSet = new Set<MarkdownSyntax>(
      supportedSyntax && Array.isArray(supportedSyntax)
        ? supportedSyntax
        : Object.values(MarkdownSyntax),
    );
    const ast = MarkdownParser.parse(markdown, Array.from(syntaxSet));
    const nodes: DomNode[] = [];
    for (const node of ast) {
      nodes.push(this.convertBlockNode(node, syntaxSet));
    }
    return nodes;
  }

  private convertBlockNode(node: any, syntaxSet: Set<string>): DomNode {
    switch (node.type) {
      case "heading":
        if (this.isBlockSyntaxSupported(`heading${node.level}`, syntaxSet)) {
          return el(
            `h${node.level}` as DomSelector,
            ...this.convertInlineNodes(node.children, syntaxSet),
          );
        }
        return el("p", ...this.convertInlineNodes(node.children, syntaxSet));
      case "paragraph":
        if (this.isBlockSyntaxSupported(MarkdownSyntax.Paragraph, syntaxSet)) {
          return el("p", ...this.convertInlineNodes(node.children, syntaxSet));
        }
        return el("div", ...this.convertInlineNodes(node.children, syntaxSet));
      case "list": {
        if (
          this.isBlockSyntaxSupported(
            [MarkdownSyntax.UnorderedList, MarkdownSyntax.OrderedList],
            syntaxSet,
          )
        ) {
          const listItems = node.items.map((item: any) =>
            this.convertListItem(item, syntaxSet)
          );
          return el(node.ordered ? "ol" : "ul", ...listItems);
        }
        return el(
          "div",
          ...node.items.map((item: any) =>
            el("p", ...this.convertInlineNodes(item.children, syntaxSet))
          ),
        );
      }
      case "codeBlock": {
        if (
          (node.language &&
            this.isBlockSyntaxSupported(
              MarkdownSyntax.FencedCodeBlockWithLanguage,
              syntaxSet,
            )) ||
          this.isBlockSyntaxSupported(
            MarkdownSyntax.FencedCodeBlock,
            syntaxSet,
          ) ||
          this.isBlockSyntaxSupported(
            MarkdownSyntax.IndentedCodeBlock,
            syntaxSet,
          )
        ) {
          const codeElem = node.language
            ? el(`code.language-${node.language}`, node.content)
            : el("code", node.content);
          return el("pre", codeElem);
        }
        return el("pre", node.content);
      }
      case "blockquote":
        if (this.isBlockSyntaxSupported(MarkdownSyntax.Blockquote, syntaxSet)) {
          return el(
            "blockquote",
            ...node.children.map((child: any) =>
              this.convertBlockNode(child, syntaxSet)
            ),
          );
        }
        return el(
          "div",
          ...node.children.map((child: any) =>
            this.convertBlockNode(child, syntaxSet)
          ),
        );
      case "horizontalRule":
        if (
          this.isBlockSyntaxSupported(
            [MarkdownSyntax.HorizontalRule, MarkdownSyntax.ThematicBreak],
            syntaxSet,
          )
        ) {
          return el("hr");
        }
        return el("div", "-----");
      case "table":
        if (this.isBlockSyntaxSupported(MarkdownSyntax.Table, syntaxSet)) {
          return this.convertTable(node);
        }
        return el("div", ...this.convertTable(node).children);
      case "footnoteDefinition":
        if (
          this.isBlockSyntaxSupported(
            MarkdownSyntax.FootnoteDefinition,
            syntaxSet,
          )
        ) {
          return el("div.footnote-definition", {
            dataset: { id: node.identifier },
          }, ...this.convertInlineNodes(node.children, syntaxSet));
        }
        return el("div", ...this.convertInlineNodes(node.children, syntaxSet));
      default:
        return el("p", "Unsupported node");
    }
  }

  private convertListItem(item: any, syntaxSet: Set<string>): DomNode {
    const childrenNodes = this.convertInlineNodes(item.children, syntaxSet);
    if (item.nested) {
      childrenNodes.push(this.convertBlockNode(item.nested, syntaxSet));
    }
    return el("li", ...childrenNodes);
  }

  private convertTable(table: any): DomNode {
    const theadCells = table.header.map((cell: string) => el("th", cell));
    const theadRow = el("tr", ...theadCells);
    const thead = el("thead", theadRow);

    const tbodyRows = table.rows.map((row: string[]) => {
      const cells = row.map((cell: string) => el("td", cell));
      return el("tr", ...cells);
    });
    const tbody = el("tbody", ...tbodyRows);

    return el("table", thead, tbody);
  }

  private convertInlineNodes(
    inlines: any[],
    syntaxSet: Set<string>,
  ): (DomNode | string)[] {
    return inlines.map((inline) => this.convertInlineNode(inline, syntaxSet));
  }

  private convertInlineNode(
    inline: any,
    syntaxSet: Set<string>,
  ): DomNode | string {
    switch (inline.type) {
      case "text":
        return inline.content;
      case "escape":
        if (this.isInlineSyntaxSupported(MarkdownSyntax.Escape, syntaxSet)) {
          return inline.character;
        }
        return inline.character;
      case "bold":
        if (this.isInlineSyntaxSupported(MarkdownSyntax.Bold, syntaxSet)) {
          return el(
            "strong",
            {},
            ...this.convertInlineNodes(inline.children, syntaxSet),
          );
        }
        return this.convertInlineNodes(inline.children, syntaxSet).join("");
      case "italic":
        if (this.isInlineSyntaxSupported(MarkdownSyntax.Italic, syntaxSet)) {
          return el(
            "em",
            {},
            ...this.convertInlineNodes(inline.children, syntaxSet),
          );
        }
        return this.convertInlineNodes(inline.children, syntaxSet).join("");
      case "boldItalic":
        if (
          this.isInlineSyntaxSupported(MarkdownSyntax.BoldItalic, syntaxSet)
        ) {
          return el(
            "strong",
            {},
            el(
              "em",
              {},
              ...this.convertInlineNodes(inline.children, syntaxSet),
            ),
          );
        }
        return this.convertInlineNodes(inline.children, syntaxSet).join("");
      case "strikethrough":
        if (
          this.isInlineSyntaxSupported(MarkdownSyntax.Strikethrough, syntaxSet)
        ) {
          return el(
            "del",
            {},
            ...this.convertInlineNodes(inline.children, syntaxSet),
          );
        }
        return this.convertInlineNodes(inline.children, syntaxSet).join("");
      case "inlineCode":
        if (
          this.isInlineSyntaxSupported(MarkdownSyntax.InlineCode, syntaxSet)
        ) {
          return el("code", inline.content);
        }
        return inline.content;
      case "link":
        if (this.isInlineSyntaxSupported(MarkdownSyntax.Link, syntaxSet)) {
          return el(
            "a",
            { href: inline.url, title: inline.title || "" },
            ...this.convertInlineNodes(inline.children, syntaxSet),
          );
        }
        return inline.children
          .map((child: any) => this.convertInlineNode(child, syntaxSet))
          .join("");
      case "autoLink":
        if (this.isInlineSyntaxSupported(MarkdownSyntax.AutoLink, syntaxSet)) {
          return el("a", { href: inline.url }, inline.url);
        }
        return inline.url;
      case "emailLink":
        if (this.isInlineSyntaxSupported(MarkdownSyntax.EmailLink, syntaxSet)) {
          return el("a", { href: `mailto:${inline.email}` }, inline.email);
        }
        return inline.email;
      case "image":
        if (this.isInlineSyntaxSupported(MarkdownSyntax.Image, syntaxSet)) {
          return el("img", {
            src: inline.url,
            alt: inline.alt,
            title: inline.title || "",
          });
        }
        return inline.alt;
      case "emoji":
        if (this.isInlineSyntaxSupported(MarkdownSyntax.Emoji, syntaxSet)) {
          return `:${inline.name}:`;
        }
        return inline.name;
      case "mention":
        if (this.isInlineSyntaxSupported(MarkdownSyntax.Mention, syntaxSet)) {
          return el(
            "a.mention",
            { href: `/user/${inline.username}` },
            "@" + inline.username,
          );
        }
        return "@" + inline.username;
      case "issueReference":
        if (
          this.isInlineSyntaxSupported(MarkdownSyntax.IssueReference, syntaxSet)
        ) {
          return el(
            "a.issue-reference",
            { href: `/issues/${inline.issue}` },
            "#" + inline.issue,
          );
        }
        return "#" + inline.issue;
      case "commitReference":
        if (
          this.isInlineSyntaxSupported(
            MarkdownSyntax.CommitReference,
            syntaxSet,
          )
        ) {
          return el(
            "a.commit-reference",
            { href: `/commit/${inline.commit}` },
            inline.commit,
          );
        }
        return inline.commit;
      case "pullRequestReference":
        if (
          this.isInlineSyntaxSupported(
            MarkdownSyntax.PullRequestReference,
            syntaxSet,
          )
        ) {
          return el(
            "a.pr-reference",
            { href: `/pull/${inline.pr}` },
            "#" + inline.pr,
          );
        }
        return "#" + inline.pr;
      case "teamMention":
        if (
          this.isInlineSyntaxSupported(MarkdownSyntax.TeamMention, syntaxSet)
        ) {
          return el(
            "a.team-mention",
            { href: `/team/${inline.team}` },
            "@" + inline.team,
          );
        }
        return "@" + inline.team;
      case "htmlInline":
        if (
          this.isInlineSyntaxSupported(MarkdownSyntax.HTMLInline, syntaxSet)
        ) {
          return el("span", { innerHTML: inline.content });
        }
        return inline.content;
      case "mathInline":
        if (
          this.isInlineSyntaxSupported(MarkdownSyntax.MathInline, syntaxSet)
        ) {
          return el("span.math-inline", `$${inline.content}$`);
        }
        return `$${inline.content}$`;
      case "lineBreak":
        if (this.isInlineSyntaxSupported(MarkdownSyntax.LineBreak, syntaxSet)) {
          return el("br");
        }
        return "";
      case "softLineBreak":
        if (
          this.isInlineSyntaxSupported(MarkdownSyntax.SoftLineBreak, syntaxSet)
        ) {
          return "\n";
        }
        return "\n";
      default:
        return "";
    }
  }

  // -----------------------------------------------------
  // HTML to Markdown conversion
  // -----------------------------------------------------

  private convertList(
    el: Element,
    bullet: string | ((index: number) => string),
  ): string {
    let markdown = "";
    const items = Array.from(el.children).filter(
      (child) => child.tagName.toLowerCase() === "li",
    );
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

  private convertNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const elNode = node as Element;
      const tag = elNode.tagName.toLowerCase();
      if (/^h[1-6]$/.test(tag)) {
        const level = parseInt(tag[1]);
        return `${"#".repeat(level)} ${this.convertElement(elNode).trim()}\n\n`;
      } else if (tag === "p") {
        return this.convertElement(elNode).trim() + "\n\n";
      } else if (tag === "br") {
        return "  \n";
      } else if (tag === "strong" || tag === "b") {
        return `**${this.convertElement(elNode).trim()}**`;
      } else if (tag === "em" || tag === "i") {
        return `*${this.convertElement(elNode).trim()}*`;
      } else if (tag === "del") {
        return `~~${this.convertElement(elNode).trim()}~~`;
      } else if (tag === "a") {
        const href = elNode.getAttribute("href") || "";
        const text = this.convertElement(elNode).trim();
        return `[${text}](${href})`;
      } else if (tag === "img") {
        const alt = elNode.getAttribute("alt") || "";
        const src = elNode.getAttribute("src") || "";
        const title = elNode.getAttribute("title") || "";
        return `![${alt}](${src}${title ? ` "${title}"` : ""})`;
      } else if (tag === "ul") {
        return this.convertList(elNode, "- ");
      } else if (tag === "ol") {
        return this.convertList(elNode, (index: number) => `${index}. `);
      } else if (tag === "li") {
        return this.convertElement(elNode).trim() + "\n";
      } else if (tag === "code") {
        if (
          elNode.parentElement &&
          elNode.parentElement.tagName.toLowerCase() === "pre"
        ) {
          return this.convertElement(elNode);
        }
        return "`" + this.convertElement(elNode).trim() + "`";
      } else if (tag === "pre") {
        const codeElem = elNode.querySelector("code");
        if (codeElem) {
          const classAttr = codeElem.getAttribute("class") || "";
          const langMatch = classAttr.match(/language-(\w+)/);
          const language = langMatch ? langMatch[1] : "";
          return (
            "```" +
            (language ? language : "") +
            "\n" +
            this.convertElement(codeElem).trim() +
            "\n```\n\n"
          );
        }
        return "```\n" + this.convertElement(elNode).trim() + "\n```\n\n";
      } else if (tag === "blockquote") {
        return this.convertElement(elNode)
          .split("\n")
          .map((line) => "> " + line)
          .join("\n") + "\n\n";
      } else if (tag === "hr") {
        return "\n---\n\n";
      } else if (tag === "table") {
        return this.convertTableToMarkdown(elNode);
      } else if (tag === "span") {
        if (elNode.classList.contains("math-inline")) {
          return `$${this.convertElement(elNode).trim()}$`;
        } else if (elNode.classList.contains("emoji")) {
          return `:${this.convertElement(elNode).trim()}:`;
        } else if (elNode.classList.contains("mention")) {
          return `@${this.convertElement(elNode).trim()}`;
        }
        return this.convertElement(elNode);
      } else if (
        tag === "div" &&
        elNode.classList.contains("footnote-definition")
      ) {
        const id = elNode.getAttribute("data-id") || "";
        return `[^${id}]: ${this.convertElement(elNode).trim()}\n\n`;
      } else {
        return this.convertElement(elNode);
      }
    }
    return "";
  }

  private convertElement(element: Element): string {
    let markdown = "";
    element.childNodes.forEach((child) => {
      markdown += this.convertNode(child);
    });
    return markdown;
  }

  private convertTableToMarkdown(tableEl: Element): string {
    let markdown = "";
    const thead = tableEl.querySelector("thead");
    const tbody = tableEl.querySelector("tbody");
    if (!thead || !tbody) return "";
    const headerCells = Array.from(thead.querySelectorAll("th")).map((th) =>
      this.convertElement(th).trim()
    );
    const headerLine = "| " + headerCells.join(" | ") + " |";
    const alignmentLine = "| " +
      headerCells.map(() => "---").join(" | ") +
      " |";
    const rows = Array.from(tbody.querySelectorAll("tr")).map((tr) => {
      const cells = Array.from(tr.querySelectorAll("td")).map((td) =>
        this.convertElement(td).trim()
      );
      return "| " + cells.join(" | ") + " |";
    });
    markdown += headerLine + "\n" + alignmentLine + "\n" + rows.join("\n") +
      "\n\n";
    return markdown;
  }

  public convertHtmlToMarkdown(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return this.convertElement(doc.body).trim();
  }
}

export default MarkdownConverter;

import { DomNode, el } from "@common-module/app";
import { MarkdownParser } from "@common-module/markdown";
import { DomSelector } from "@common-module/universal-page";

class MarkdownConverter {
  public convertMarkdownToDomNodes(markdown: string) {
    const ast = MarkdownParser.parse(markdown);
    const nodes: DomNode[] = [];
    for (const node of ast) {
      if (node.type === "heading") {
        nodes.push(el(`h${node.level}` as DomSelector, node.content));
      } else if (node.type === "paragraph") {
        nodes.push(el("p", node.content));
      } else if (node.type === "list") {
        const items = node.items.map((item) => el("li", item.content));
        nodes.push(el("ul", ...items));
      } else if (node.type === "codeBlock") {
        const code = node.language
          ? el("code", node.content).addClass(`language-${node.language}`)
          : el("code", node.content);
        nodes.push(el("pre", code));
      }
    }
    return nodes;
  }

  private convertList(
    el: Element,
    bullet: string | ((index: number) => string),
  ): string {
    let markdown = "";
    const items = Array.from(el.children).filter((child) =>
      child.tagName.toLowerCase() === "li"
    );
    items.forEach((item, index) => {
      let bulletText = "";
      if (typeof bullet === "string") {
        bulletText = bullet;
      } else {
        bulletText = bullet(index + 1);
      }
      const content = this.convertElement(item).trim().replace(/\n/g, "\n    ");
      markdown += bulletText + content + "\n";
    });
    return markdown + "\n";
  }

  private convertNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const tag = el.tagName.toLowerCase();
      if (tag === "h1") {
        return "# " + this.convertElement(el).trim() + "\n\n";
      } else if (tag === "h2") {
        return "## " + this.convertElement(el).trim() + "\n\n";
      } else if (tag === "h3") {
        return "### " + this.convertElement(el).trim() + "\n\n";
      } else if (tag === "h4") {
        return "#### " + this.convertElement(el).trim() + "\n\n";
      } else if (tag === "h5") {
        return "##### " + this.convertElement(el).trim() + "\n\n";
      } else if (tag === "h6") {
        return "###### " + this.convertElement(el).trim() + "\n\n";
      } else if (tag === "p") {
        return this.convertElement(el).trim() + "\n\n";
      } else if (tag === "br") {
        return "  \n";
      } else if (tag === "strong" || tag === "b") {
        return `**${this.convertElement(el).trim()}**`;
      } else if (tag === "em" || tag === "i") {
        return `*${this.convertElement(el).trim()}*`;
      } else if (tag === "a") {
        const href = el.getAttribute("href") || "";
        const text = this.convertElement(el).trim();
        return `[${text}](${href})`;
      } else if (tag === "ul") {
        return this.convertList(el, "- ");
      } else if (tag === "ol") {
        return this.convertList(el, (index: number) => `${index}. `);
      } else if (tag === "li") {
        return this.convertElement(el).trim() + "\n";
      } else if (tag === "code") {
        if (
          el.parentElement && el.parentElement.tagName.toLowerCase() === "pre"
        ) {
          return this.convertElement(el);
        }
        return "`" + this.convertElement(el).trim() + "`";
      } else if (tag === "pre") {
        return "```\n" + this.convertElement(el).trim() + "\n```\n\n";
      } else if (tag === "blockquote") {
        return this.convertElement(el)
          .split("\n")
          .map((line) => "> " + line)
          .join("\n") + "\n\n";
      } else if (tag === "hr") {
        return "\n---\n\n";
      } else {
        return this.convertElement(el);
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

  public convertHtmlToMarkdown(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return this.convertElement(doc.body).trim();
  }
}

export default new MarkdownConverter();

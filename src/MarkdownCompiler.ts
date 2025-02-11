import { DomNode, el } from "@common-module/app";
import { MarkdownNode } from "@common-module/markdown";
import { DomSelector } from "@common-module/universal-page";

class MarkdownCompiler {
  public compile(ast: MarkdownNode[]) {
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
}

export default new MarkdownCompiler();

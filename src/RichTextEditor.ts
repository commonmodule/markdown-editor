import { DomNode } from "@common-module/app";
import MarkdownEditorConfig from "./MarkdownEditorConfig.js";

export default class RichTextEditor extends DomNode {
  constructor() {
    super(".rich-text-editor");
    this.append(
      new MarkdownEditorConfig.BoldIcon(),
      new MarkdownEditorConfig.ItalicIcon(),
      new MarkdownEditorConfig.StrikethroughIcon(),
      new MarkdownEditorConfig.HeadingIcon(),
      new MarkdownEditorConfig.LinkIcon(),
      new MarkdownEditorConfig.BulletListIcon(),
      new MarkdownEditorConfig.NumberListIcon(),
      new MarkdownEditorConfig.QuoteBlockIcon(),
      new MarkdownEditorConfig.CodeIcon(),
      new MarkdownEditorConfig.CodeBlockIcon(),
      new MarkdownEditorConfig.TableIcon(),
      new MarkdownEditorConfig.ImageIcon(),
      new MarkdownEditorConfig.YouTubeIcon(),
    );
  }
}

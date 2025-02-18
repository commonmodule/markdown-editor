import { DomNode } from "@common-module/app";

type DomNodeConstructor = new () => DomNode;

class DefaultBoldIcon extends DomNode {
  constructor() {
    super("span.icon.bold", "B");
  }
}

class DefaultItalicIcon extends DomNode {
  constructor() {
    super("span.icon.italic", "I");
  }
}

class DefaultStrikethroughIcon extends DomNode {
  constructor() {
    super("span.icon.strikethrough", "S");
  }
}

class DefaultHeadingIcon extends DomNode {
  constructor() {
    super("span.icon.heading", "H");
  }
}

class DefaultLinkIcon extends DomNode {
  constructor() {
    super("span.icon.link", "🔗");
  }
}

class DefaultBulletListIcon extends DomNode {
  constructor() {
    super("span.icon.bullet-list", "•");
  }
}

class DefaultNumberListIcon extends DomNode {
  constructor() {
    super("span.icon.number-list", "1.");
  }
}

class DefaultQuoteBlockIcon extends DomNode {
  constructor() {
    super("span.icon.quote-block", "❝");
  }
}

class DefaultCodeIcon extends DomNode {
  constructor() {
    super("span.icon.code", "</>");
  }
}

class DefaultCodeBlockIcon extends DomNode {
  constructor() {
    super("span.icon.code-block", "```");
  }
}

class DefaultTableIcon extends DomNode {
  constructor() {
    super("span.icon.table", "📊");
  }
}

class DefaultImageIcon extends DomNode {
  constructor() {
    super("span.icon.image", "🖼️");
  }
}

class DefaultYouTubeIcon extends DomNode {
  constructor() {
    super("span.icon.youtube", "🎥");
  }
}

class DefaultMoreIcon extends DomNode {
  constructor() {
    super("span.icon.more", "⋮");
  }
}

class MarkdownEditorConfig {
  public BoldIcon: DomNodeConstructor = DefaultBoldIcon;
  public ItalicIcon: DomNodeConstructor = DefaultItalicIcon;
  public StrikethroughIcon: DomNodeConstructor = DefaultStrikethroughIcon;
  public HeadingIcon: DomNodeConstructor = DefaultHeadingIcon;
  public LinkIcon: DomNodeConstructor = DefaultLinkIcon;
  public BulletListIcon: DomNodeConstructor = DefaultBulletListIcon;
  public NumberListIcon: DomNodeConstructor = DefaultNumberListIcon;
  public QuoteBlockIcon: DomNodeConstructor = DefaultQuoteBlockIcon;
  public CodeIcon: DomNodeConstructor = DefaultCodeIcon;
  public CodeBlockIcon: DomNodeConstructor = DefaultCodeBlockIcon;
  public TableIcon: DomNodeConstructor = DefaultTableIcon;
  public ImageIcon: DomNodeConstructor = DefaultImageIcon;
  public YouTubeIcon: DomNodeConstructor = DefaultYouTubeIcon;
  public MoreIcon: DomNodeConstructor = DefaultMoreIcon;
}

export default new MarkdownEditorConfig();

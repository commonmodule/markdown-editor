import { Dom } from "@commonmodule/app";

type DomConstructor = new () => Dom;

class DefaultBoldIcon extends Dom {
  constructor() {
    super("span.icon.bold", "B");
  }
}

class DefaultItalicIcon extends Dom {
  constructor() {
    super("span.icon.italic", "I");
  }
}

class DefaultStrikethroughIcon extends Dom {
  constructor() {
    super("span.icon.strikethrough", "S");
  }
}

class DefaultHeadingIcon extends Dom {
  constructor() {
    super("span.icon.heading", "H");
  }
}

class DefaultLinkIcon extends Dom {
  constructor() {
    super("span.icon.link", "🔗");
  }
}

class DefaultBulletListIcon extends Dom {
  constructor() {
    super("span.icon.bullet-list", "•");
  }
}

class DefaultNumberListIcon extends Dom {
  constructor() {
    super("span.icon.number-list", "1.");
  }
}

class DefaultQuoteBlockIcon extends Dom {
  constructor() {
    super("span.icon.quote-block", "❝");
  }
}

class DefaultCodeIcon extends Dom {
  constructor() {
    super("span.icon.code", "</>");
  }
}

class DefaultCodeBlockIcon extends Dom {
  constructor() {
    super("span.icon.code-block", "```");
  }
}

class DefaultTableIcon extends Dom {
  constructor() {
    super("span.icon.table", "📊");
  }
}

class DefaultImageIcon extends Dom {
  constructor() {
    super("span.icon.image", "🖼️");
  }
}

class DefaultYouTubeIcon extends Dom {
  constructor() {
    super("span.icon.youtube", "🎥");
  }
}

class DefaultMoreIcon extends Dom {
  constructor() {
    super("span.icon.more", "⋮");
  }
}

class MarkdownEditorConfig {
  public BoldIcon: DomConstructor = DefaultBoldIcon;
  public ItalicIcon: DomConstructor = DefaultItalicIcon;
  public StrikethroughIcon: DomConstructor = DefaultStrikethroughIcon;
  public HeadingIcon: DomConstructor = DefaultHeadingIcon;
  public LinkIcon: DomConstructor = DefaultLinkIcon;
  public BulletListIcon: DomConstructor = DefaultBulletListIcon;
  public NumberListIcon: DomConstructor = DefaultNumberListIcon;
  public QuoteBlockIcon: DomConstructor = DefaultQuoteBlockIcon;
  public CodeIcon: DomConstructor = DefaultCodeIcon;
  public CodeBlockIcon: DomConstructor = DefaultCodeBlockIcon;
  public TableIcon: DomConstructor = DefaultTableIcon;
  public ImageIcon: DomConstructor = DefaultImageIcon;
  public YouTubeIcon: DomConstructor = DefaultYouTubeIcon;
  public MoreIcon: DomConstructor = DefaultMoreIcon;
}

export default new MarkdownEditorConfig();

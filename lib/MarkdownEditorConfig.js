import { DomNode } from "@common-module/app";
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
class MarkdownEditorConfig {
    BoldIcon = DefaultBoldIcon;
    ItalicIcon = DefaultItalicIcon;
    StrikethroughIcon = DefaultStrikethroughIcon;
    HeadingIcon = DefaultHeadingIcon;
    LinkIcon = DefaultLinkIcon;
    BulletListIcon = DefaultBulletListIcon;
    NumberListIcon = DefaultNumberListIcon;
    QuoteBlockIcon = DefaultQuoteBlockIcon;
    CodeIcon = DefaultCodeIcon;
    CodeBlockIcon = DefaultCodeBlockIcon;
    TableIcon = DefaultTableIcon;
    ImageIcon = DefaultImageIcon;
    YouTubeIcon = DefaultYouTubeIcon;
}
export default new MarkdownEditorConfig();
//# sourceMappingURL=MarkdownEditorConfig.js.map
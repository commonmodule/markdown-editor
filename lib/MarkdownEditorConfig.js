import { Dom } from "@commonmodule/app";
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
    MoreIcon = DefaultMoreIcon;
}
export default new MarkdownEditorConfig();
//# sourceMappingURL=MarkdownEditorConfig.js.map
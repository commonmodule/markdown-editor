import DOMPurify from "dompurify";
import { marked } from "marked";
import TurndownService from "turndown";
const turndownService = new TurndownService();
class MarkdownConverter {
    async convertMarkdownToHtml(markdown) {
        return DOMPurify.sanitize(await marked(markdown));
    }
    convertHtmlToMarkdown(html) {
        return turndownService.turndown(html);
    }
}
export default new MarkdownConverter();
//# sourceMappingURL=MarkdownConverter.js.map
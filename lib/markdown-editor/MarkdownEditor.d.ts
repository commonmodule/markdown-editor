import StyledMarkdownArea from "./StyledMarkdownArea.js";
export default class MarkdownEditor extends StyledMarkdownArea<{
    contentChanged: (newContent: string) => void;
}> {
    constructor();
    private onKeyDown;
    private toggleMarkdownStyle;
}
//# sourceMappingURL=MarkdownEditor.d.ts.map
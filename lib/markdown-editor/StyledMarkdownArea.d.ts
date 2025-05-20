import { Dom } from "@commonmodule/app";
import { EventHandlers } from "@commonmodule/ts";
export default abstract class StyledMarkdownArea<E extends EventHandlers = {}> extends Dom<HTMLDivElement, E> {
    constructor(tag: `.${string}`);
    private getCaretOffset;
    private setCaretOffset;
    private parseMarkdownWithSpans;
    protected updateStyles(): void;
}
//# sourceMappingURL=StyledMarkdownArea.d.ts.map
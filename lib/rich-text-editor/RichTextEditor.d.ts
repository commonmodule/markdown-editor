import { Dom } from "@commonmodule/app";
export default class RichTextEditor extends Dom<HTMLDivElement, {
    contentChanged: (newContent: string) => void;
}> {
    private gap?;
    private buttonWidth?;
    private maxVisibleButtons?;
    private currentLinkHref?;
    private toolbarButtons;
    private buttonContainer;
    private moreButton;
    private editableArea;
    constructor();
    private createToolbarButton;
    private createToolbarButtonByIndex;
    private updateToolbar;
    private openMoreMenu;
    getContent(): string;
}
//# sourceMappingURL=RichTextEditor.d.ts.map
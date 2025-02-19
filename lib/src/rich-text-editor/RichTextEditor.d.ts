import { DomNode } from "@common-module/app";
export default class RichTextEditor extends DomNode {
    private gap?;
    private buttonWidth?;
    private maxVisibleButtons?;
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
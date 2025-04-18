import { Router } from "@commonmodule/app";
import MarkdownEditorTest from "./MarkdownEditorTest.js";
import RichTextEditorTest from "./RichTextEditorTest.js";

Router
  .add("/markdown-editor", MarkdownEditorTest)
  .add("/rich-text-editor", RichTextEditorTest);

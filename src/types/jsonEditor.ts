import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
export interface IEditorFile {
  name: string;
  schema: object;
  defaultValue: string;
  onChange?: (
    val: string,
    e: Monaco.editor.IModelContentChangedEvent
  ) => void | Promise<void>;
  onSave?: (val: string) => void | Promise<void>;
}

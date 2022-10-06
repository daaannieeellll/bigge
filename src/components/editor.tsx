import ErrorMessageBar from "./errorMessageBar";
import Editor, {
  BeforeMount,
  OnChange,
  OnMount,
  OnValidate,
  useMonaco,
} from "@monaco-editor/react";
import { useState, useRef, useCallback, useEffect } from "react";
import { updateStateArray } from "@/utils/state";
import type { IEditorFile } from "@/types/jsonEditor";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

interface RefObject extends Monaco.editor.ICodeEditor {
  _domElement?: HTMLElement;
}

interface IJSONEditorProps {
  files: IEditorFile[];
  className?: string;
}

const JSONEditor = ({ files, className }: IJSONEditorProps) => {
  const monaco = useMonaco();
  const editorRef = useRef<RefObject | null>(null);
  const [theme, setTheme] = useState<"light" | "vs-dark">("vs-dark");

  const [currentFile, setCurrentFile] = useState(0);
  // Editor file info
  const [errors, setErrors] = useState<string[][]>([
    ...Array(files.length).fill([]),
  ]);
  const [isValidJson, setIsValidJson] = useState<boolean[]>([
    ...Array(files.length).fill(true),
  ]);
  const [isEdited, setIsEdited] = useState<boolean[]>([
    ...Array(files.length).fill(false),
  ]);

  const updateEditorLayout = useCallback(() => {
    const editor: any = editorRef.current;
    if (!editor) return;
    editor.layout({ width: "auto", height: "auto" });
    const editorEl = editor._domElement;

    if (!editorEl) return;
    const { width, height } = editorEl.getBoundingClientRect();
    editor.layout({ width, height });
  }, []);
  const handleJsonSchemasUpdate = useCallback(() => {
    monaco?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemaValidation: "error",
      schemas: files.map(({ name, schema }) => ({
        uri: name,
        fileMatch: [name],
        schema,
      })),
    });
  }, [files, monaco]);
  const handleEditorPrettify = useCallback(() => {
    editorRef.current?.getAction("editor.action.formatDocument").run();
  }, []);
  const handleEditorUpdateValue = useCallback((value?: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.setValue(value || "");
    value && editor.getAction("editor.action.formatDocument").run();
  }, []);
  const handleEditorWillMount: BeforeMount = () => handleJsonSchemasUpdate();
  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.getModel()?.updateOptions({ tabSize: 2, insertSpaces: false });
  };

  useEffect(() => {
    handleEditorUpdateValue(files[currentFile].defaultValue);
  }, [files, handleEditorUpdateValue]);
  useEffect(() => {
    handleJsonSchemasUpdate();
  }, [files, handleJsonSchemasUpdate]);
  useEffect(() => {
    handleEditorPrettify();
  }, [handleEditorPrettify]);
  useEffect(() => {
    updateEditorLayout();
    const resizeObserver = new ResizeObserver(updateEditorLayout);
    resizeObserver.observe(document.body);
    return () => resizeObserver.unobserve(document.body);
  }, [updateEditorLayout]);

  const handleEditorValidation: OnValidate = useCallback(
    (markers) => {
      const errorMessage = markers.map(
        ({ startLineNumber, message, severity }) =>
          `${
            severity === 8 ? "Error" : "Warning"
          }: line ${startLineNumber}: ${message}`
      );
      const hasContent = editorRef.current?.getValue();
      const hasError = errorMessage.length > 0;
      setIsValidJson(
        updateStateArray(isValidJson, currentFile, !!hasContent && !hasError)
      );
      setErrors(updateStateArray(errors, currentFile, errorMessage));
    },
    [currentFile]
  );
  const handleEditorChange: OnChange = useCallback(
    (value: string | undefined, e: Monaco.editor.IModelContentChangedEvent) => {
      setIsEdited((prev) => updateStateArray(prev, currentFile, true));
      files[currentFile].onChange?.(value || "", e);
    },
    [files, currentFile]
  );

  const handleEditorSave = useCallback(() => {
    const value = editorRef.current?.getValue();
    files[currentFile].onSave?.(value || "");
  }, [files, currentFile]);

  // Set the theme of the editor to light or dark
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event: MediaQueryListEvent) =>
      setTheme(event.matches ? "vs-dark" : "light");

    setTheme(mediaQuery.matches ? "vs-dark" : "light");
    mediaQuery.onchange = handler;
    return () => {
      mediaQuery.onchange = null;
    };
  }, []);

  return (
    <>
      <div
        className={`w-full h-full flex flex-col ${className || ""}`}
        onKeyDownCapture={(e) => {
          if (e.ctrlKey && e.key === "s") {
            e.preventDefault();
            handleEditorPrettify();
          }
        }}
      >
        <div className='flex flex-row justify-between dark:text-white'>
          <div className='flex flex-row flex-grow bg-neutral-100 dark:bg-neutral-800'>
            {files.map(({ name }, i) => (
              <button
                key={name}
                className={`
                  min-w-[70px] mr-[1px] p-0 pl-3 pr-5
                  text-left
                   ${
                     i === currentFile
                       ? "bg-white       dark:bg-neutral-850"
                       : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                   }
                `}
                onClick={() => setCurrentFile(i)}
                disabled={i === currentFile}
              >
                {name}
              </button>
            ))}
          </div>
          <div className='flex flex-row'>
            <button
              className='
                min-w-[70px] mr-[1px] p-1
              bg-neutral-200               text-neutral-600
              disabled:bg-neutral-100      disabled:text-neutral-400
              dark:bg-neutral-700          dark:text-neutral-300
              disabled:dark:bg-neutral-900 disabled:dark:text-neutral-500
              '
              disabled={!isEdited[currentFile] || !isValidJson[currentFile]}
              onClick={handleEditorSave}
            >
              Save
            </button>
          </div>
        </div>
        <Editor
          saveViewState={true}
          defaultLanguage='json'
          defaultValue={files[currentFile].defaultValue}
          path={files[currentFile].name}
          theme={theme}
          options={{
            wordWrap: "on",
            automaticLayout: true,
            autoClosingBrackets: "always",
            autoClosingQuotes: "always",
            formatOnPaste: true,
            formatOnType: true,
            scrollBeyondLastLine: false,
            colorDecorators: true,
            showFoldingControls: "always",
            wordBasedSuggestions: false,
          }}
          onMount={handleEditorDidMount}
          beforeMount={handleEditorWillMount}
          onValidate={handleEditorValidation}
          onChange={handleEditorChange}
        />
        <ErrorMessageBar errors={errors[currentFile]} />
      </div>
    </>
  );
};
export default JSONEditor;

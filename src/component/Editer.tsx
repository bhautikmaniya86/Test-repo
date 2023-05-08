const Editor = (props: any) => {
  if (typeof window !== "undefined") {
    const Ace = require("react-ace").default;
    require("brace/mode/javascript");
    require("brace/theme/github");

    return (
      <Ace
        {...props}
        style={{ width: "100%" }}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          useWorker: false, // <<----- USE THIS OPTION TO DISABLE THE SYNTAX CHECKER
        }}
      />
    );
  }

  return null;
};
export default Editor;

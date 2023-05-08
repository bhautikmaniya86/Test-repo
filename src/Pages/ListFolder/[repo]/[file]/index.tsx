// "use client"; // this is a client component
// import React, { useEffect, useState } from "react";
// import { Octokit } from "@octokit/rest";
// import { useRouter } from "next/router";
// import constants from "../../../../../constants";
// import Editer from "../../../../component/Editer";
// import { Button } from "@mui/material";
// const octokit = new Octokit({
//   auth: "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",
// });
// import CodeEditor from "@uiw/react-textarea-code-editor";

// const ListFolder = () => {
//   const router = useRouter();
//   const { repo, file } = router.query;
//   const { username } = constants;
//   const [fileValue, setFileValue] = useState("");
//   const getTime = () => {
//     octokit.repos
//       .getContent({
//         owner: username,
//         repo: repo,
//         path: file, // or a folder path
//       } as any)
//       .then((response: any) => {
//         const content = Buffer.from(response.data.content, "base64").toString();
//         setFileValue(content);
//         console.log(response.data, "file data");
//       })
//       .catch((error: any) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     if (username && repo && file) {
//       getTime();
//     }
//   }, [username, repo, file]);

//   return (
//     <div>
//       <div style={{ padding: "10px", backgroundColor: "lightgray" }}>
//         <Button variant="outlined" size="small">
//           Edit
//         </Button>
//       </div>
//       {/* <Editer
//         mode="javascript"
//         theme="github"
//         value={fileValue}
//         onChange={(e: any) => {
//           console.log(e, "call onchange value");
//         }}
//       /> */}
//       {fileValue && (
//         <CodeEditor
//           value={fileValue}
//           language="js"
//           placeholder="Please enter JS code."
//           onChange={(evn) => setFileValue(evn.target.value)}
//           padding={15}
//           style={{
//             fontSize: 12,
//             backgroundColor: "#f5f5f5",
//             fontFamily:
//               "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ListFolder;

"use client"; // this is a client component
import "@uiw/react-textarea-code-editor/dist.css";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import { useRouter } from "next/router";
import constants from "../../../../../constants";
import { Button, TextField } from "@mui/material";
const octokit = new Octokit({
  auth: "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",
});
const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

function ListFolder() {
  const [isEditable, setEditable] = React.useState(false);
  const [sha, setSha] = React.useState("");
  const [commitMessage, setCommitMessage] = React.useState("");
  const [fileValue, setFileValue] = useState("");
  const [oldFileValue, setOldFileValue] = useState("");

  const router = useRouter();
  const { repo, file } = router.query;
  const { username } = constants;
  const getTime = () => {
    octokit.repos
      .getContent({
        owner: username,
        repo: repo,
        path: file, // or a folder path
      } as any)
      .then((response: any) => {
        const content = Buffer.from(response.data.content, "base64").toString();
        setFileValue(content);
        setOldFileValue(content);
        console.log(response.data, "file data");
        setSha(response.data.sha);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (username && repo && file) {
      getTime();
    }
  }, [username, repo, file]);

  const onCommit = () => {
    // Modify the file content as needed
    const modifiedContent = fileValue;

    // Update the file with the modified content
    return octokit.rest.repos.createOrUpdateFileContents({
      owner: username,
      repo: repo,
      path: file,
      message: commitMessage,
      content: Buffer.from(modifiedContent).toString("base64"),
      sha: sha,
      branch: "main",
    } as any);
  };

  return (
    <div>
      <div style={{ padding: "10px", backgroundColor: "lightgray" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Commit message"
            variant="outlined"
            value={commitMessage}
            size="small"
            disabled={oldFileValue == fileValue}
            onChange={(e) => {
              setCommitMessage(e.target.value);
            }}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              onCommit();
              setEditable(false);
            }}
            disabled={oldFileValue == fileValue}
          >
            Commit changes
          </Button>
        </div>
        {/* {isEditable ? (
          <div
            style={{
              display: "flex",
     ̰          justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Commit message"
              variant="outlined"
              value={commitMessage}
              size="small"
              disabled={oldFileValue == fileValue}
              onChange={(e) => {
                setCommitMessage(e.target.value);
              }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                onCommit();
                setEditable(false);
              }}
              disabled={oldFileValue == fileValue}
            >
              Commit changes
            </Button>
          </div>
        ) : (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setEditable(true);
            }}
          >
            Edit
          </Button>
        )} */}
      </div>
      <CodeEditor
        value={fileValue}
        language="js"
        placeholder="Please enter JS code."
        onChange={(evn) => setFileValue(evn.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) =>
          console.log()
        }
      />
    </div>
  );
}

export default ListFolder;

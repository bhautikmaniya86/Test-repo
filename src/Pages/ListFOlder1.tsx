import React, { useState, useEffect } from "react";

function ListFOlder({ username, repo, octokit }: any) {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    octokit.repos
      .getContent({
        owner: "bhautikmaniya86",
        repo: "bhautikmaniya86",
        path: "",
      })
      .then(({ data }: any) => {
        setContents(data);
        console.log(data, "data--");
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [username, repo]);

  return (
    <div>
      <h1>
        List of Files and Folders for {username}/{repo}
      </h1>
      <ul>
        {contents.map((content: any) => (
          <li key={content.name}>{content.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListFOlder;

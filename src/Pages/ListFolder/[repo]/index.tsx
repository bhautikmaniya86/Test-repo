"use client"; // this is a client component
import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import { useRouter } from "next/router";
import constants from "../../../../constants";
import FileItem from "@/component/FileItem";

const octokit = new Octokit({
  auth: "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",
});

const ListFolder = () => {
  const router = useRouter();
  const { repo } = router.query;

  const { username } = constants;
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

  return contents.map((objFileItem: any) => (
    <FileItem objFileItem={objFileItem} octokit={octokit} repo={repo} />
  ));
};

export default ListFolder;

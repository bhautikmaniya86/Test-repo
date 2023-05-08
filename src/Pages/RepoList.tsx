import React, { useEffect, useState } from "react";
import RepoItem from "./RepoItem";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: "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",
});

function RepoList() {
  const [lstRepo, setLstRepo] = useState([]);
  const [user] = useState("bhautikmaniya86");

  useEffect(() => {
    octokit.repos
      .listForUser({
        username: user,
      })
      .then(({ data }: any) => {
        console.log(data, "all repo");
        setLstRepo(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      {lstRepo.map((objRepo: any) => (
        <RepoItem objRepo={objRepo} />
      ))}
    </div>
  );
}

export default RepoList;

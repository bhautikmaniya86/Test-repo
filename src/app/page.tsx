"use client"; // this is a client component
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import RepoList from "@/Pages/RepoList";

const octokit = new Octokit({
  auth: "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",
});

export default function Home() {
  function handleDelete(file: any) {
    // implement delete logic here
  }

  function handleEdit(file: any) {
    // implement edit logic here
  }

  return <RepoList />;
}

"use client"; // this is a client component
import React from "react";
import Link from "next/link";

const RepoItem = (props: any) => {
  const { objRepo } = props;

  return (
    <div
      style={{
        backgroundColor: "lightgray",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "5px",
      }}
    >
      <Link href={`/ListFolder/${objRepo.name}`}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{objRepo.name}</div>
          <div>{objRepo.visibility}</div>
        </div>
        <div>{objRepo.updated_at}</div>
      </Link>
    </div>
  );
};

export default RepoItem;

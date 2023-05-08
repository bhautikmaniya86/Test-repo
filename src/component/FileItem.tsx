import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import constants from "../../constants";
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderBottom: "1px solid #8080802e",
  borderRadius: "0px",
}));

const FileItem = (props: any) => {
  const { repo, octokit, objFileItem } = props;
  const { username } = constants;
  console.log(objFileItem, "objFileItem");

  const getTime = () => {
    octokit.repos
      .getContent({
        owner: username,
        repo: repo,
        path: objFileItem.name, // or a folder path
      })
      .then((response: any) => {
        const lastUpdatedTime = response.data;
        const content = Buffer.from(response.data.content, "base64").toString();
        console.log(content);

        console.log(content, "lastUpdatedTime");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (objFileItem) {
      getTime();
    }
  }, []);
  return (
    <>
      <Link href={`/ListFolder/${repo}/${objFileItem.name}`}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={4}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div>
                    {objFileItem.type == "file" ? (
                      <InsertDriveFileOutlinedIcon />
                    ) : (
                      <FolderIcon color="primary" />
                    )}
                  </div>
                  <div>{objFileItem.name}</div>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  hoc example
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  3 years ago
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Link>
    </>
  );
};

export default FileItem;

import React from "react";
import { Text } from "@welcome-ui/text";
import env from "react-dotenv";

export const Header: React.FC = (): JSX.Element => {
  return (
    <>
      <Text variant="h1">
        <span style={{ textTransform: "capitalize" }}>
          {env.GITHUB_ORGANIZATION}
        </span>{" "}
        External Pull Request
      </Text>
      <Text variant="h4">
        Filter{" "}
        <span style={{ textTransform: "capitalize" }}>{env.GITHUB_REPO}</span>{" "}
        Repository Pull requests
      </Text>
    </>
  );
};

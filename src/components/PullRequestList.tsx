import React, { useEffect, useState } from "react";
import { Table } from "@welcome-ui/table";
import { Link } from "@welcome-ui/link";
import { Loader } from "@welcome-ui/loader";
import env from "react-dotenv";

interface IPullRequest {
  url: string;
  author: string;
  title: string;
}

export const PullRequestList: React.FC = (): JSX.Element => {
  const githubOrganization = env.GITHUB_ORGANIZATION;
  const githubRepo = env.GITHUB_REPO;
  const githubToken = env.GITHUB_TOKEN;
  console.log(githubOrganization, githubRepo, githubToken);
  const [data, setData] = useState<Array<IPullRequest>>([]);
  const myHeaders: RequestInit = {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: "token " + githubToken,
    },
  };
  useEffect(() => {
    fetch(
      "https://api.github.com/orgs/" +
        githubOrganization +
        "/members?per_page=100",
      myHeaders
    )
      .then((res) => res.json())
      .then((data) => {
        const members: Array<string> = [];
        data.map((line: any) => {
          return members.push(line.login);
        });

        fetch(
          "https://api.github.com/repos/" +
            githubOrganization +
            "/" +
            githubRepo +
            "/pulls?per_page=100",
          myHeaders
        )
          .then((res) => res.json())
          .then((data) => {
            const pullRequests: Array<IPullRequest> = [];
            data.map((line: any) => {
              if (!members.includes(line.user.login)) {
                return pullRequests.push({
                  url: line.html_url,
                  author: line.user.login,
                  title: line.title,
                });
              }
            });
            setData(pullRequests);
          });
      });
  }, []);

  return data.length === 0 ? (
    <Loader color="primary.500" size="40px" />
  ) : (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Link</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((pr) => {
          return (
            <Table.Tr>
              <Table.Td>{pr.author}</Table.Td>
              <Table.Td>{pr.title}</Table.Td>
              <Table.Td>
                <Link href={pr.url}>Go to PR</Link>
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
};

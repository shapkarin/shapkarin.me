import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useQuery } from "react-query";

import { PAGES } from "Components/Structure";
import {
  fetchPackages,
  fetchPackageInfo,
  fetchRepositories,
  fetchContributions,
  fetchLikes,
  fetchSketches
} from "Common/API";

const Routing = () => {
  const props = {
     // Packages: {
    //   list: useQuery("packages-list", () => fetchPackages()),
    //   getInfo: useQuery("packages-getInfo", () => fetchPackageInfo()),
    // }

    Repositories: useQuery("Repositories", () => fetchRepositories()),
    Contributions: useQuery("Contributions", () => fetchContributions()),
    Starred: useQuery("Starred", () => fetchLikes()),
  };

  return (
    <div className="Page">
      <Switch>
        {/* Avoid nesting problem with .reduce instead of .map */}
        {PAGES.reduce(
          (acc, { name, path, Page, redirect }) => [
            ...acc,
            <Route path={path} exact>
              <Page {...(props[name] || {})} />
            </Route>,
            redirect
            && <Redirect {...redirect} />,
          ],
          []
        )}
        {/* Send to my GitHub profile :-)  */}
        <Route exact path="/github" render={() => {
          window.location = "https://github.com/shapkarin"
          return 'Congrats! Redirecting to my GitHub profile...'
        }}/>
      </Switch>
    </div>
  );
};

export default Routing;

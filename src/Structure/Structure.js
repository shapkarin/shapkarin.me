import { Switch, Route, Redirect } from "react-router-dom";
import PageLayout from "@/Layouts/Page";

import { PAGES } from ".";

const Structure = () => (
  <div className="Page">
    <Switch>
      {PAGES.reduce(
        (acc, { name, path, Page, redirect, redirects }) => [
          ...acc,
          <Route exact path={path} key={`Route_${name}`}>
            <PageLayout>
              <Page />
            </PageLayout>
          </Route>,
          redirect && <Redirect exact {...redirect} key={`Redirect_${name}`} />,
          redirects && redirects.map((fromTo, i) => <Redirect exact {...fromTo} key={`Redirect_${name}_${i}`} />)
        ],
        []
      )}
      {/* Redirect to my GitHub profile :-)  */}
      <Route
        exact
        path="/github"
        render={() => {
          window.location = "https://github.com/shapkarin";
          return "Congrats! Redirecting to my GitHub profile...";
        }}
        key="Route_GitHub"
      />
      
    </Switch>
  </div>
);

export default Structure;

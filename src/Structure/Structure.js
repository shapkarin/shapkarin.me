import { Routes, Route, Navigate as Redirect } from "react-router-dom";
import PageLayout from "@/Layouts/Page";

import { PAGES } from ".";

const Structure = () => (
  <div className="Page">
    <Routes>
      {PAGES.reduce(
        (acc, { name, path, Page, redirect, redirects }) => [
          ...acc,
          <Route exact path={path} key={`Route_${name}`} element={
<PageLayout>
              <Page />
            </PageLayout>
          } />,
          redirect && <Redirect {...redirect} key={`Redirect_${name}`} />,
          redirects && redirects.map((fromTo, i) => <Redirect {...fromTo} key={`Redirect_${name}_${i}`} />)
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
      
    </Routes>
  </div>
);

export default Structure;

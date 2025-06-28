import { Switch, Route, Redirect } from "react-router-dom";

import Close from "@/Components/Close";
import { PAGES } from ".";
import Preloader from "@/Components/Preloader";

// TODO: refact
const PageInnerLayout = ({ children }) => (
  <Preloader>
    <Close />
    {children}
  </Preloader>
)

const Structure = () => (
  <div className="Page">
    <Switch>
      {PAGES.reduce(
        (acc, { name, path, Page, redirect, redirects }) => [
          ...acc,
          <Route exact path={path} key={`Route_${name}`}>
            <PageInnerLayout>
              <Page />
            </PageInnerLayout>
          </Route>,
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
      
    </Switch>
  </div>
);

export default Structure;

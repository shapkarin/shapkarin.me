import { Switch, Route, Redirect } from "react-router-dom";
import PageLayout from "@/Layouts/Page";
import { useLocation } from 'react-router-dom';

import { PAGES } from ".";

import { useMemo } from 'react';
import Preloader from "@/Components/Preloader";

const commonPreloaderProps = { lines: 100, height: 842 };

const preloaderConfig = {
  '/': { lines: 8, height: 204 },
  '/articles/': { ...commonPreloaderProps },
  '/github/repositories/': { ...commonPreloaderProps },
  '/github/likes/': { ...commonPreloaderProps },
  '/packages/': { lines: 20, height: 503 },
  '/creative/': { lines: 15, height: 450 }
};

const Structure = () => {
  const { pathname } = useLocation();

  const preloaderProps = useMemo(() => {
    return preloaderConfig[pathname] || 
          (pathname.startsWith('/articles/') ? preloaderConfig['/articles/'] : {});
  }, [pathname]);
    
  return (
    <div className="Page">
      <Preloader {...preloaderProps}> 
        <Switch>
          {PAGES.reduce(
            (acc, { name, path, Page, redirect, redirects }) => [
              ...acc,
              redirect && <Redirect exact {...redirect} key={`Redirect_${name}`} />,
              redirects && redirects.map((fromTo, i) => <Redirect exact {...fromTo} key={`Redirect_${name}_${i}`} />),
              <Route exact path={path} key={`Route_${name}`}>
                <PageLayout>
                  <Page />
                </PageLayout>
              </Route>,
            ],
            []
          )}
          {/* I use 404.html for same */}
          {/* Redirect to my GitHub profile :-)  */}
          {/* <Route
            exact
            path="/github"
            render={() => {
              window.location = "https://github.com/shapkarin";
              return "Congrats! Redirecting to my GitHub profile...";
            }}
            key="Route_GitHub"
          /> */}
          
        </Switch>
        </Preloader>
    </div>
  )
};

export default Structure;

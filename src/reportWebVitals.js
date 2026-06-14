/*
  I DON'T use any analytics on my homepage, and I DON'T track your data.
  I do use ONLY Google Search Console. It's basically Google Webmaster Tools,
  not webpage analytics that send your data somewhere else.
  
  Search Console has its own Core Web Vitals report for indexed pages. 
  
  => The code below is local only! <=

  Note: it can take a bit of time to generate the local report, and ofc the `Preserve log` option is useful.
*/
export const reportWebVitals = onPerfEntry => {
  if (typeof onPerfEntry !== 'function') {
    return;
  }

  import('web-vitals')
    .then(({ onCLS, onINP, onLCP }) => {
      onCLS(onPerfEntry);
      onINP(onPerfEntry);
      onLCP(onPerfEntry);
    })
    .catch(() => {});
};

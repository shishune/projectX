/*
When the website's location name changes, it will trigger the effect of scrolling to the
top of the web page.
CITATION: https://v5.reactrouter.com/web/guides/scroll-restoration 
*/

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
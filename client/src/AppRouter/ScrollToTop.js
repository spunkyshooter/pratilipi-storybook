import { useEffect } from "react";
import { useLocation } from "react-router-dom";

 function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0);
    // setTimeout(() => {
    //   document.documentElement.style.scrollBehavior = 'smooth'
    // },2000)

  }, [pathname]);

  return null;
}
export default ScrollToTop;
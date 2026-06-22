import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CmsModalProvider } from "@/components/cms/CmsModalContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LogoSlider from "@/components/LogoSlider";
import ScrollToTop from "@/components/ScrollToTop";
import SiteScripts from "@/components/SiteScripts";
import { WhatsAppChatButton } from "@/components/WhatsAppChatButton";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Downloads from "@/pages/Downloads";
import Contact from "@/pages/Contact";
import BuyNow from "@/pages/BuyNow";
import NotFound from "@/pages/not-found";
import DynamicPage from "@/pages/DynamicPage";
import BlogList from "@/pages/BlogList";
import BlogPostPage from "@/pages/BlogPost";

function PublicRouter() {
  return (
    <Switch>
      <Route path="/admin">
        <Redirect to="/" />
      </Route>
      <Route path="/admin/:rest*">
        <Redirect to="/" />
      </Route>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/buy-now" component={BuyNow} />
      <Route path="/downloads" component={Downloads} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/p/:slug" component={DynamicPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function PublicApp() {
  return (
    <div className="site-page bg-shiv-cream-warm">
      <SiteScripts />
      <Navigation />
      <main className="site-main">
        <PublicRouter />
      </main>
      <LogoSlider />
      <Footer />
      <WhatsAppChatButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CmsModalProvider>
          <ScrollToTop />
          <PublicApp />
          <Toaster />
        </CmsModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

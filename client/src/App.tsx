import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import Contato from "./pages/Contato";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/quem-somos"} component={QuemSomos} />
      <Route path={"/contato"} component={Contato} />
      <Route path={"/noticias"} component={News} />
      <Route path={"/noticias/:slug"} component={NewsDetail} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Header />
          <Router />
          <Footer />
          <WhatsAppFloat />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Strona nie znaleziona</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Przepraszamy, nie możemy znaleźć strony której szukasz.
          </p>
        </div>
        <Button variant="lzs" asChild>
          <a href="/">Wróć do strony głównej</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

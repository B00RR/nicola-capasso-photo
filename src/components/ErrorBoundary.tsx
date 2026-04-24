import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught:", error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      const lang = typeof localStorage !== "undefined" ? localStorage.getItem("nicola-lang") : null;
      const en = lang === "en";
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <h1 className="font-display text-5xl md:text-7xl mb-4">Oops.</h1>
            <p className="text-muted-foreground max-w-md mb-8">
              {en ? "Something went wrong. Try reloading the page." : "Qualcosa è andato storto. Prova a ricaricare la pagina."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="font-sans-tight text-[11px] uppercase border-b border-foreground pb-2 hover:opacity-70 transition-opacity"
            >
              {en ? "Reload" : "Ricarica"}
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export interface RouteConfig {
    name: string;
    path: string;
    layout?: "default" | null;
    component: React.ReactNode;
  }
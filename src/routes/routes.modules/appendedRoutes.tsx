import AfterSalesService from "../../pages/Appended/AfterSalesService";
import LegalNotices from "../../pages/Appended/LegalNotices";
import AboutNegosud from "../../pages/Appended/AboutNegosud";
import GeneralTerms from "../../pages/Appended/GeneralTerms";
import { RouteConfig } from "../../models/routingModel";


export const appendedRoutes: RouteConfig[] = [
    {
      name: "afterSalesService",
      path: "/after-sales-service",
      layout: "default",
      component: <AfterSalesService />,
    },
    {
      name: "legalNotices",
      path: "/legal-notices",
      layout: "default",
      component: <LegalNotices />,
    },
    {
      name: "about",
      path: "/about",
      layout: "default",
      component: <AboutNegosud />,
    },
    {
      name: "generalTerms",
      path: "/general-terms",
      layout: "default",
      component: <GeneralTerms />,
    },
  ];
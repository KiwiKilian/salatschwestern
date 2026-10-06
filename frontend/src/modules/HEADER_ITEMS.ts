import { ToSubOptions } from "@tanstack/react-router";

export const HEADER_ITEMS: ({ label: string } & ToSubOptions)[] = [
  {
    label: "🥗 Salate",
    to: "/",
  },
  {
    label: "🤑 Abrechnungsperiode",
    to: "/abrechnungsperiode",
  },
  {
    label: "👤 Schwestern",
    to: "/schwestern",
  },
  {
    label: "💰 Kassenstand",
    to: "/kassenstand",
  },
];

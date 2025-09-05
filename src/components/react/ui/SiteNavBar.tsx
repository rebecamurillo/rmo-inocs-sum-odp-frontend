import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Navbar,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  Link,
} from "../../react-catalyst-ui-kit";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

type MenuItem = { href: string; label: string };
const BASE_URL = import.meta.env.BASE_URL;
interface Props {
  livingLabs: MenuItem[];
}
export function SiteNavBar({ livingLabs }: Props) {
  const dataItems: MenuItem[] = [
    { href: "#", label: "KPIs" },
    { href: "#", label: "Measures" },
    { href: "#", label: "Modal split" },
  ];

  const analysisTools: MenuItem[] = [
    { href: "/tools/measures-impact", label: "Measures impact" },
    { href: "/tools/multicriteria", label: "Multi‑criteria decision tool" },
  ];

  // state to track which submenu is open
  const [openMenu, setOpenMenu] = useState<
    null | "living" | "data" | "analysis"
  >(null);

  // refs for outside click detection
  const livingRef = useRef<HTMLDivElement | null>(null);
  const dataRef = useRef<HTMLDivElement | null>(null);
  const analysisRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        (livingRef.current && livingRef.current.contains(target)) ||
        (dataRef.current && dataRef.current.contains(target)) ||
        (analysisRef.current && analysisRef.current.contains(target))
      ) {
        // click inside one of the menus -> do nothing
        return;
      }
      // click outside -> close all
      setOpenMenu(null);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <Navbar>
      {/* left: brand / account */}
      {/* <Dropdown>
        <DropdownButton as={NavbarItem} aria-label="Account">
          <Avatar src="/tailwind-logo.svg" />
          <NavbarLabel>SUM Project</NavbarLabel>
          <ChevronDownIcon />
        </DropdownButton>
        <DropdownMenu anchor="bottom start" className="min-w-48">

        </DropdownMenu>
      </Dropdown> 
      */}
      <Link href="/" aria-label="Home">
        <img
          src={BASE_URL + "/sum_logo.jpg"}
          alt="SUM Logo"
          className="w-40 mx-4"
        />
      </Link>

      <NavbarSpacer />

      <NavbarSection className="px-10">
        {/* Home (no submenu) */}
        <NavbarItem href="/" className="px-4 text-primary">
          Home
        </NavbarItem>

        {/* Living Labs */}
        <div className="relative" ref={livingRef}>
          <button
            onClick={() =>
              setOpenMenu((s) => (s === "living" ? null : "living"))
            }
            aria-expanded={openMenu === "living"}
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded"
          >
            <span className="mr-2 text-primary">Living labs</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          {openMenu === "living" && (
            <div className="absolute left-0 mt-2 w-56 bg-white border rounded shadow-md z-50">
              <ul className="py-1 flex flex-col">
                {livingLabs.map((it) => (
                  <li key={it.href}>
                    <a href={it.href} className="p-2 text-sm hover:bg-gray-100">
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Data */}
        <div className="relative" ref={dataRef}>
          <button
            onClick={() => setOpenMenu((s) => (s === "data" ? null : "data"))}
            aria-expanded={openMenu === "data"}
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded"
          >
            <span className="mr-2 text-primary">Data</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          {openMenu === "data" && (
            <div className="absolute left-0 mt-2 bg-white border rounded shadow-md z-50">
              <ul className="py-1 flex flex-col">
                {dataItems.map((it) => (
                  <li key={it.href}>
                    <a href={it.href} className="p-2 text-sm hover:bg-gray-100">
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Analysis tools */}
        <div className="relative" ref={analysisRef}>
          <button
            onClick={() =>
              setOpenMenu((s) => (s === "analysis" ? null : "analysis"))
            }
            aria-expanded={openMenu === "analysis"}
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded"
          >
            <span className="mr-2 text-primary">Analysis tools</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          {openMenu === "analysis" && (
            <div className="absolute left-0 mt-2 w-64 bg-white border rounded shadow-md z-50">
              <ul className="py-1 flex flex-col">
                {analysisTools.map((it) => (
                  <li key={it.href}>
                    <a href={it.href} className="p-2 text-sm hover:bg-gray-100">
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </NavbarSection>
    </Navbar>
  );
}

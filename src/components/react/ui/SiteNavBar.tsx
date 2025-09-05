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
  DropdownItem,
  DropdownLabel,
} from "../../react-catalyst-ui-kit";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

type MenuItem = { href?: string; label: string; subItems?: MenuItem[] };
const BASE_URL = import.meta.env.BASE_URL;
const HOME_URL = BASE_URL + "/";
interface Props {
  livingLabs: MenuItem[];
}
export function SiteNavBar({ livingLabs }: Props) {
  const items = [
    {
      label: "Home",
      href: HOME_URL,
    },
    {
      label: "Living Labs",
      subItems: livingLabs,
    },
    {
      label: "Data",
      subItems: [
        { href: "#", label: "KPIs" },
        { href: "#", label: "Measures" },
        { href: "#", label: "Modal split" },
      ],
    },
    {
      label: "Analysis Tools",
      subItems: [
        { href: "#", label: "Measures impact" },
        { href: "#", label: "Multi‑criteria decision tool" },
      ],
    },
  ];

  const analysisTools: MenuItem[] = [
    { href: "#", label: "Measures impact" },
    { href: "#", label: "Multi‑criteria decision tool" },
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
      <Link href={HOME_URL} aria-label="Home">
        <img
          src={BASE_URL + "/sum_logo.jpg"}
          alt="SUM Logo"
          className="w-40 mx-4"
        />
      </Link>

      <NavbarSpacer />
      <NavbarSection className="px-10">
        {items.map((item) => (
          <>
            {item.subItems?.length !== undefined && (
              <Dropdown key={item.label}>
                <DropdownButton as={NavbarItem} aria-label="Account menu">
                  <NavbarLabel className="text-primary">
                    {item.label}
                  </NavbarLabel>
                  <ChevronDownIcon />
                </DropdownButton>
                <DropdownMenu
                  className="min-w-64 bg-white"
                  anchor="bottom start"
                >
                  {item?.subItems?.length > 0 &&
                    item.subItems?.map((sub) => (
                      <DropdownItem key={sub.label} href={sub.href}>
                        <DropdownLabel>{sub.label}</DropdownLabel>
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            )}
            {item.href && (
              <NavbarItem href={item.href}>
                <NavbarLabel className="text-primary">{item.label}</NavbarLabel>
              </NavbarItem>
            )}
          </>
        ))}
      </NavbarSection>
    </Navbar>
  );
}

import {
  Link,
  Navbar,
  NavbarItem,
  NavbarSection,
} from "../../react-catalyst-ui-kit";
const BASE_URL = import.meta.env.BASE_URL;
const DEFAULT_MENU_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Data",
    href: "#",
  },
  {
    label: "Impact analysis tools",
    href: "#",
  },
];
export function MainNavbar() {
  return (
    <Navbar>
      <Link href="/" aria-label="Home">
        <img
          src={BASE_URL + "/sum_logo.jpg"}
          alt="SUM Logo"
          className="w-40 my-4"
        />
      </Link>
      <NavbarSection>
        <NavbarItem href="/" current>
          Home
        </NavbarItem>
        <NavbarItem href="/events">Events</NavbarItem>
        <NavbarItem href="/orders">Orders</NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}

import {
  Avatar,
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "../../react-catalyst-ui-kit";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import {
  Cog6ToothIcon,
  HomeIcon,
  MegaphoneIcon,
  Square2StackIcon,
  TicketIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/24/solid";

const BASE_URL = import.meta.env.BASE_URL;
interface Props {
  menuItems?: Array<{
    label: string;
    icon: React.ReactNode;
    href: string;
  }>;
  dropdownHeader?: {
    label: string;
    icon: React.ReactNode;
  };
  dropdownHeaderItems?: Array<{
    label: string;
    icon: React.ReactNode;
    href: string;
  }>;
  userMenuItems?: Array<{
    label: string;
    icon: React.ReactNode;
    href: string;
  }>;
  userInfo?: {
    name: string;
    email: string;
    avatar: string;
  };
}

const DEFAULT_MENU_ITEMS = [
  {
    label: "Dashboard",
    icon: <HomeIcon />,
    href: BASE_URL + "/lab",
  },
  {
    label: "Modal Split",
    icon: <QuestionMarkCircleIcon />,
    href: BASE_URL + "/lab/modal-split",
  },
  {
    label: "KPIs",
    icon: <QuestionMarkCircleIcon />,
    href: BASE_URL + "/lab/kpis",
  },
  {
    label: "Measures",
    icon: <QuestionMarkCircleIcon />,
    href: BASE_URL + "/lab/measures",
  },
];

const DEFAULT_DROPDOWN_HEADER = {
  label: "My Living Lab",
  icon: <Cog6ToothIcon />,
};
const DEFAULT_DROPDOWN_HEADER_ITEMS = [
  {
    label: "Edit",
    icon: <Cog8ToothIcon />,
    href: BASE_URL + "/lab/edit",
  },
];

export function SidebarMenu({
  menuItems = DEFAULT_MENU_ITEMS,
  dropdownHeader = DEFAULT_DROPDOWN_HEADER,
  dropdownHeaderItems = DEFAULT_DROPDOWN_HEADER_ITEMS,
  userMenuItems,
  userInfo,
}: Props) {
  return (
    <Sidebar>
      <SidebarHeader>
        <img src={BASE_URL + "/sum_logo.jpg"} alt="SUM Logo"
        className="w-40 my-4"
        />

        {dropdownHeader && (
          <Dropdown>
            <DropdownButton as={SidebarItem} className="mb-2.5">
              {dropdownHeader.icon ? (
                dropdownHeader.icon
              ) : (
                <Avatar src="/sum_logo.svg" />
              )}
              <SidebarLabel>{dropdownHeader.label}</SidebarLabel>
              <ChevronDownIcon />
            </DropdownButton>
            {dropdownHeaderItems?.length && dropdownHeaderItems?.length > 0 && (
              <DropdownMenu className="min-w-64" anchor="bottom start">
                {dropdownHeaderItems.map((item) => (
                  <DropdownItem key={item.label} href={item.href}>
                    {item.icon}
                    <DropdownLabel>{item.label}</DropdownLabel>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </Dropdown>
        )}
      </SidebarHeader>
      <SidebarBody>
        {menuItems?.length && menuItems?.length > 0 && (
          <SidebarSection>
            {menuItems.map((item) => (
              <SidebarItem key={item.label} href={item.href}>
                {item.icon}
                <SidebarLabel>{item.label}</SidebarLabel>
              </SidebarItem>
            ))}
          </SidebarSection>
        )}
        <SidebarSpacer />
      </SidebarBody>
      {userInfo && (
        <SidebarFooter>
          <Dropdown>
            <DropdownButton as={SidebarItem}>
              <span className="flex min-w-0 items-center gap-3">
                {userInfo.avatar ? (
                  <Avatar
                    src={userInfo.avatar}
                    className="size-10"
                    square
                    alt=""
                  />
                ) : (
                  <UserIcon className="size-10" />
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                    {userInfo.name}
                  </span>
                  <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                    {userInfo.email}
                  </span>
                </span>
              </span>
              <ChevronUpIcon />
            </DropdownButton>
            {userMenuItems?.length && userMenuItems?.length > 0 && (
              <DropdownMenu className="min-w-64" anchor="top start">
                {userMenuItems.map((item) => (
                  <DropdownItem key={item.label} href={item.href}>
                    {item.icon}
                    <DropdownLabel>{item.label}</DropdownLabel>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </Dropdown>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

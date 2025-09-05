import {
  Avatar,
  Dropdown,
  DropdownButton,
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
} from "@heroicons/react/16/solid";
import {
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  EnvelopeIcon,
  BookOpenIcon,
  ChartPieIcon,
  ChartBarSquareIcon,
  QueueListIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { getUrl } from "../../../lib/helpers";

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

const HOME_ITEM = {
  label: "Go to ODP website",
  icon: <HomeIcon />,
  href: getUrl("/"),
};

const DEFAULT_MENU_ITEMS = [
  {
    label: "Data Overview",
    icon: <PresentationChartLineIcon />,
    href: getUrl("/lab"),
  },
  {
    label: "Modal Split",
    icon: <ChartPieIcon />,
    href: getUrl("/lab/modal-split"),
  },
  {
    label: "KPIs",
    icon: <ChartBarSquareIcon />,
    href: getUrl("/lab/kpis"),
  },
  {
    label: "Measures",
    icon: <QueueListIcon />,
    href: getUrl("/lab/measures"),
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
    href: getUrl("/lab/edit"),
  },
];

const HELP_MENU_ITEMS = [
  {
    label: "Useful Resources",
    icon: <BookOpenIcon />,
    href: getUrl("#"),
  },
  {
    label: "FAQ",
    icon: <QuestionMarkCircleIcon />,
    href: getUrl("#"),
  },
  {
    label: "Contact SUM team",
    icon: <EnvelopeIcon />,
    href: getUrl("#"),
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
        <img
          src={getUrl("/sum_logo.jpg")}
          alt="SUM Logo"
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
        <SidebarItem key={HOME_ITEM.label} href={HOME_ITEM.href}>
          {HOME_ITEM.icon}
          <SidebarLabel>{HOME_ITEM.label}</SidebarLabel>
        </SidebarItem>
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

      <SidebarFooter>
        {HELP_MENU_ITEMS?.length && HELP_MENU_ITEMS?.length > 0 && (
          <SidebarSection>
            {HELP_MENU_ITEMS.map((item) => (
              <SidebarItem key={item.label} href={item.href}>
                {item.icon}
                <SidebarLabel>{item.label}</SidebarLabel>
              </SidebarItem>
            ))}
          </SidebarSection>
        )}
        <SidebarSpacer />

        {userInfo && (
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
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

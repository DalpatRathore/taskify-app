"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import NavItem, { Organization } from "./NavItem";

interface SidebarProps {
  storageKey?: string;
}

const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: { infinite: true },
  });

  const defaultAccordionVal: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded(curr => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]"></Skeleton>
          <Skeleton className="h-10 w-10"></Skeleton>
        </div>
        <div className="space-y-2">
          <NavItem.Skeletion></NavItem.Skeletion>
          <NavItem.Skeletion></NavItem.Skeletion>
          <NavItem.Skeletion></NavItem.Skeletion>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="font-medium tex-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="ml-auto"
          asChild
        >
          <Link href={"/select-org"}>
            <Plus className="w-4 h-4"></Plus>
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionVal}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          ></NavItem>
        ))}
      </Accordion>
    </>
  );
};
export default Sidebar;

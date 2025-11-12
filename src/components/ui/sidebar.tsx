
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { X, Menu } from "lucide-react";
import Link from "next/link";

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(
  undefined
);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

const sidebarVariants = cva(
  "fixed left-0 top-0 z-50 flex h-full flex-col bg-card transition-all duration-300 ease-in-out",
  {
    variants: {
      isOpen: {
        true: "w-64 border-r",
        false: "w-16 border-r",
      },
    },
    defaultVariants: {
      isOpen: true,
    },
  }
);

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen, isMobile } = useSidebar();
  if (isMobile) return null;

  return (
    <div
      ref={ref}
      className={cn(sidebarVariants({ isOpen: isOpen && !isMobile }), className)}
      {...props}
    />
  );
});
Sidebar.displayName = "Sidebar";

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-16 shrink-0 items-center border-b",
        isOpen ? "gap-2 px-4" : "justify-center",
        className
      )}
      {...props}
    >
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement(child)) {
          if (child.type === "a" || child.type === Link) {
            const childProps = child.props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
            return React.cloneElement(child, {
              ...childProps,
              className: cn(
                "flex items-center gap-2 font-bold text-lg",
                childProps.className
              ),
              children: React.Children.map(
                child.props.children,
                (grandchild, grandIndex) => {
                  if (React.isValidElement(grandchild) && grandchild.type === "span" && !isOpen) {
                    return null;
                  }
                  return grandchild;
                }
              ),
            });
          }
        }
        return child;
      })}
    </div>
  );
});
SidebarHeader.displayName = "SidebarHeader";

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, ...props }, ref) => {
  const { isOpen, setIsOpen, isMobile } = useSidebar();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className={cn(isMobile && "hidden", className)}
      {...props}
    >
      {isOpen ? <X /> : <Menu />}
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1 overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        "flex shrink-0 h-auto flex-col items-stretch gap-2 border-t p-2",
        className
      )}
      {...props}
    >
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          // Check for the user info div
          if (child.props.className?.includes("items-center")) {
            return React.cloneElement(child, {
              ...child.props,
              className: cn("transition-all", isOpen ? "flex" : "hidden", child.props.className),
            });
          }
        }
        return child;
      })}
    </div>
  );
});
SidebarFooter.displayName = "SidebarFooter";

export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen, isMobile } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-300 ease-in-out",
        !isMobile && (isOpen ? "ml-64" : "ml-16"),
        className
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("space-y-1 p-2", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

export const SidebarMenuButton = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps & { asChild?: boolean; tooltip?: React.ReactNode }
>(({ asChild, tooltip, className, ...props }, ref) => {
  const { isOpen } = useSidebar();

  const button = (
    <Button
      ref={ref as any}
      variant="ghost"
      className={cn(
        "h-10 w-full justify-start",
        !isOpen && "justify-center",
        className
      )}
      {...props}
    >
      {props.children &&
        React.Children.map(props.children, (child, index) => {
          if (React.isValidElement(child) && index === 1 && !isOpen) {
            return null; // Don't render the text when sidebar is closed
          }
          return child;
        })}
    </Button>
  );

  if (!isOpen && tooltip) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            {asChild ? React.cloneElement(button, { asChild }) : button}
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
});
SidebarMenuButton.displayName = "SidebarMenuButton";

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }
>(({ className, ...props }, ref) => {
  const { isOpen } = useSidebar();

  if (!isOpen) {
    return <div className="p-2" ref={ref} {...props} />;
  }

  return (
    <Collapsible className={cn("p-2", className)} defaultOpen>
      <CollapsibleTrigger asChild>
        <div className="flex w-full items-center">
          {props.children &&
            React.Children.map(props.children, (child) => {
              if (
                React.isValidElement(child) &&
                child.type === SidebarGroupLabel
              ) {
                return child;
              }
              return null;
            })}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {props.children &&
          React.Children.map(props.children, (child) => {
            if (
              React.isValidElement(child) &&
              child.type !== SidebarGroupLabel
            ) {
              return child;
            }
            return null;
          })}
      </CollapsibleContent>
    </Collapsible>
  );
});
SidebarGroup.displayName = "SidebarGroup";

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = useSidebar();
  if (!isOpen) return null;
  return (
    <div
      ref={ref}
      className={cn(
        "text-xs font-semibold text-muted-foreground uppercase px-4 py-2",
        className
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

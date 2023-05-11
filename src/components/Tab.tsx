import clsx from "clsx";
import { ReactNode } from "react";
import { MdClose } from "react-icons/md";

export type TabProps = {
  value: string;
  label?: string;
  onClick?: (value: string) => void;
  icon: ReactNode;
  onClose?: (value: string) => void;
  selectedTab?: string;
};

const Tab = ({
  value,
  selectedTab,
  label,
  onClick,
  onClose,
  icon,
}: TabProps) => {
  return (
    <div className="relative h-full">
      <button
        onClick={() => onClick && onClick(value)}
        className={clsx(
          "flex h-full items-center px-4 transition-colors",
          selectedTab === value
            ? "text-primary"
            : "text-muted-foreground hover:text-accent-foreground",
          {
            "pr-12": !!onClose,
          }
        )}
      >
        {icon}
        <span className="max-w-[140px] truncate whitespace-nowrap text-sm">
          {label}
        </span>
      </button>
      {onClose && (
        <button
          onClick={() => onClose(value)}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-xl text-foreground/60 transition-colors hover:bg-muted hover:text-foreground/90"
        >
          <MdClose />
        </button>
      )}

      <div
        className={clsx(
          "absolute bottom-0 left-0 right-0 h-0.5 bg-primary",
          selectedTab === value ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

export default Tab;

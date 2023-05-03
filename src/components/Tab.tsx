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
          "flex h-full items-center px-4",
          selectedTab === value
            ? "text-primary-500"
            : "hover:bg-slate-100 hover:text-slate-900",
          {
            "pr-12": !!onClose,
          }
        )}
      >
        {!!icon && <span className="mr-2 text-2xl">{icon}</span>}
        <span className="max-w-[140px] truncate whitespace-nowrap">
          {label}
        </span>
      </button>
      {onClose && (
        <button
          onClick={() => onClose(value)}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-xl hover:bg-slate-100 hover:text-slate-900"
        >
          <MdClose />
        </button>
      )}
      {selectedTab === value && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
      )}
    </div>
  );
};

export default Tab;

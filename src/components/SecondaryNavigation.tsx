import { Link } from "@tanstack/react-router";

type SecondaryNavigationProps = {
  onTabChange: (arg0: string) => unknown;
  parentRoute: string;
  activeTab?: string;
};
export default function SecondaryNavigation({
  onTabChange,
  parentRoute,
  activeTab,
}: SecondaryNavigationProps) {
  const activeLinkClassName = "underline text-font font-normal text-bold";

  return (
    <div className="flex gap-4 px-4 text-lg font-light">
      <button
        className={activeTab === "information" ? activeLinkClassName : ""}
        onClick={() => onTabChange("information")}
      >
        Info
      </button>
      <Link
        to={"/logs" + parentRoute}
        activeProps={{ className: activeLinkClassName }}
      >
        Logs
      </Link>
      {/* <button
        className={activeTab === 'logs' ? activeLinkClassName : ''}
        onClick={() => onTabChange('logs')}
      >
        Log
      </button> */}
    </div>
  );
}

import { Link } from "@tanstack/react-router";

export default function SecondaryNavigation({ onTabChange, activeTab }) {
  const activeLinkClassName = "underline text-font font-normal";

  return (
    <div className="flex gap-4 p-4 text-lg">
      <button
        className={activeTab === 'information' ? activeLinkClassName : ''}
        onClick={() => onTabChange('information')}
      >
        Info
      </button>
      <Link to="/logs" activeProps={{ className: activeLinkClassName }}>
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
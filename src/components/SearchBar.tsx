import { Icon } from "@iconify/react/dist/iconify.js";

type SearchBarProps = {
  callback: (arg0: string) => unknown;
  value?: string;
};
export default function SearchBar({ callback, value }: SearchBarProps) {
  return (
    <div className="pb-3 flex justify-end">
      <div className="bg-button rounded-full py-1 px-3 flex">
        <span className="pr-2">
          <Icon icon="material-symbols-light:search" className="h-full"></Icon>
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => callback(e.target.value)}
          placeholder="Search"
          className="bg-transparent"
        />
      </div>
    </div>
  );
}

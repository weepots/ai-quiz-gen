import React from "react";

interface props {
  parentProp: any;
  valid: boolean;
  placeholder: string;
}

const SearchInput: React.FC<props> = ({ parentProp, valid, placeholder }) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    parentProp(event.target.value);
  };

  return (
    <div className="pl-5">
      <form className="max-w-md mx-auto">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder}
            required={true}
            onChange={onChangeHandler}
          />
        </div>
      </form>
    </div>
  );
};
export default SearchInput;

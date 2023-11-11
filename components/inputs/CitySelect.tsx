"use client";

import useIndianCities from "@/hook/useCities";
import Select from "react-select";
import Flag from "react-world-flags";

export type CitySelectValue = {
  value: string;
  label: string;
  state: string;
  latlng: number[];

};

type Props = {
  value?: CitySelectValue;
  onChange: (value: CitySelectValue) => void;
};

function CitySelect({ value, onChange }: Props) {
  const { getAll } = useIndianCities();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CitySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <Flag code={option.value} className="w-5" />
            <div>
              {option.label}
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
}

export default CitySelect;

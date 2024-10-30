import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import classNames from "classnames";

type CountrySelectorProps = {
  onCountryChange: (country: string) => void;
};

const CountrySelector = ({ onCountryChange }: CountrySelectorProps) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [isSelectorOpened, setIsSelectorOpened] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data: Array<{ name: string }>) => {
        const countries = data.map((country) => country.name);
        setCountries(countries);
      });
  }, []);

  return (
    <div className="w-72 font-medium h-80">
      <div
        onClick={() => setIsSelectorOpened(!isSelectorOpened)}
        className={classNames({
          "bg-white w-full p-2 flex items-center justify-between border rounded":
            true,
          "text-gray-700": !selectedCountry,
        })}
      >
        <span className="text-ellipsis overflow-hidden whitespace-nowrap ">
          {selectedCountry ?? "Select Country"}
        </span>
        <BiChevronDown
          size={20}
          className={classNames({ "rotate-180": isSelectorOpened })}
        />
      </div>
      <ul
        className={classNames({
          "bg-white mt-2 overflow-y-auto max-h-0": true,
          "max-h-60": isSelectorOpened,
        })}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter country name"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {countries.map((country) => (
          <li
            key={country}
            className={classNames({
              "p-2 text-sm hover:bg-sky-600 hover:text-white": true,
              "bg-sky-600 text-white": country === selectedCountry,
              hidden: !country.toLowerCase().startsWith(inputValue),
            })}
            onClick={() => {
              setSelectedCountry(country);
              onCountryChange(country);
              setIsSelectorOpened(false);
              setInputValue("");
            }}
          >
            {country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountrySelector;

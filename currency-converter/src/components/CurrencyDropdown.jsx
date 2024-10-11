import { HiOutlineStar, HiStar } from "react-icons/hi2";

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
}) => {
  const isFavorite = (curr) => favorites.includes(curr);

  return (
    <div className="w-full">
      <label
        htmlFor={title}
        className="block text-lg font-semibold text-gray-800 mb-2" // Better spacing for label
      >
        {title}
      </label>

      <div className="relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full px-4 py-3 border border-gray-400 rounded-md text-base shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-600 transition duration-200"
        >
          {/* Favorite currencies */}
          {favorites.map((currency) => (
            <option className="bg-gray-300" value={currency} key={currency}>
              {currency}
            </option>
          ))}
          <hr />
          {/* Other currencies */}
          {currencies
            .filter((c) => !favorites.includes(c))
            .map((currency) => (
              <option value={currency} key={currency}>
                {currency}
              </option>
            ))}
        </select>

        <button
          onClick={() => handleFavorite(currency)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-lg" // Better icon alignment
        >
          {isFavorite(currency) ? (
            <HiStar className="text-yellow-500 w-5 h-5" /> // Proportional star icon
          ) : (
            <HiOutlineStar className="text-gray-500 w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;


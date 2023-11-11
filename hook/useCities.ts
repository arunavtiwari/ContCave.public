// Sample data of Indian cities (You may replace this with an actual dataset of Indian cities)
const indianCities = [
  { name: "Mumbai", state: "Maharashtra", latlng: [18.9750, 72.8258] },
  { name: "Delhi", state: "Delhi", latlng: [28.6139, 77.2090] },
  // Add more cities here...
];

const formattedIndianCities = indianCities.map((city, index) => ({
  value: `city${index}`,
  label: city.name,
  state: city.state,
  latlng: city.latlng,

}));

const useIndianCities = () => {
  const getAll = () => formattedIndianCities;

  const getByValue = (value: string) => {
    return formattedIndianCities.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useIndianCities;
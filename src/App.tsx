import CountrySelector from "./CountrySelector";

const App = () => {
  return (
    <div className="d-flex flex items-center justify-center p-6 h-screen bg-cyan-950">
      <CountrySelector
        onCountryChange={(country) => console.log("selected country", country)}
      />
    </div>
  );
};

export default App;

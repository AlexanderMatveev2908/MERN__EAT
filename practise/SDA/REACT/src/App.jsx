import ButtonBasic from "./components/buttons/ButtonBasic";

const App = () => {
  return (
    <div className="">
      <ButtonBasic {...{ styleProp: 1 }} />
      <ButtonBasic {...{ styleProp: 2 }} />
      <ButtonBasic {...{ styleProp: 3 }} />
    </div>
  );
};
export default App;

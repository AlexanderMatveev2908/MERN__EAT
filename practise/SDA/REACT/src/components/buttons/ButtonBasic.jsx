const ButtonBasic = ({ styleProp }) => {
  const handleStyle = () =>
    styleProp === 1
      ? "btn__1"
      : styleProp === 2
      ? "btn__2"
      : styleProp === 3
      ? "btn__3"
      : "";

  return <button className={`btn__base ${handleStyle()}`}>X</button>;
};
export default ButtonBasic;

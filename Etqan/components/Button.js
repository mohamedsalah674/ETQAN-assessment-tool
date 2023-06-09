function Button(props) {
  return (
    <>
      <button
        type={props.type}
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        {props.text}
      </button>
    </>
  );
}

export default Button;

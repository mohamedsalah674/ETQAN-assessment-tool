function SectionHeading(props) {
  return (
    <>
      <div className="text-center">
        <h2 className="pt-3 text-center font-bold text-4xl  italic text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-400 pb-8">
          {props.text}
        </h2>
      </div>
    </>
  );
}

export default SectionHeading;


const styles: React.CSSProperties = {
  textAlign: 'center',
  marginTop: 180,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 300,
  height: 300,
  margin: 'auto',
  padding: 15
};
const Loader = () => (
  <div style={styles}>
    <div
      className=" h-8 w-8 inline-block text-blue-400  animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-primary"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span>
    </div>
  </div>
);

export default Loader;

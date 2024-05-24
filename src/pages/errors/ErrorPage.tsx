import Lottie from 'lottie-react';
import errorOccurred from '../../assets/lottie/error-occurred.json';

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

const ErrorPage: React.FC = () => {
  function restart() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
    window.location.replace('/');
  }

  return (
    <div style={styles}>
      <div style={{ textAlign: 'center', gridColumn: '1/-1', marginTop: 20 }}>
        <Lottie animationData={errorOccurred} loop style={{ width: '200px' }} />
        <h4>Oups sorry ! something ⛄ </h4>
        <button
          type="button"
          className="rounded-md text-md font-medium text-white bg-[#ee4141] shadow-4xl focus:ring focus:ring-rose-400 hover:bg-rose-700 transition  ease-in-out duration-200 px-6 py-2 w-[100%] flex gap-2 justify-center items-center"
          style={{ marginTop: 40 }}
          onClick={() => restart()}>
           Restart
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

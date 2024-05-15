/**
 * @File Show the message if crash app , possibility the refresh the app
 * @author Ebed meleck
 */

import { Component, ErrorInfo } from 'react';
import errorOccurred from '../../assets/lottie/error-occurred.json';
import Lottie from 'lottie-react';
import notification from '../../services/notification.service';
import settingService from '../../services/setting.service';
/**
 * @category Screen crash app
 */

const styles: React.CSSProperties = {
  textAlign: 'center',
  marginTop: 150,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 300,
  height: 300,
  margin: 'auto',
  padding: 15
};

interface Props {
  children: JSX.Element;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /** We have the possibility to record its errors and then correct it and display a rescue interface
   * componentDidCatch(error, info) {
   *  send error to server
   * }
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const user_uuid = sessionStorage.getItem('user_uuid')!;
    const data = {
      error: JSON.stringify(errorInfo),
      user_uuid
    };
    settingService.sendBug(data).then(notification.handleSuccess).catch(notification.handleError);
    console.error('Uncaught error  sorry');
    console.warn(error.message);
  }

  restart() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
    window.location.replace('/');
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={styles}>
          <div style={{ textAlign: 'center', gridColumn: '1/-1', marginTop: 20 }}>
            <Lottie animationData={errorOccurred} loop style={{ width: '200px' }} />
            <h4>Oups sorry ! something ⛄ </h4>
            <button type="button" className="btn btn-danger mt-5 w-75" style={{ marginTop: 40 }} onClick={() => this.restart()}>
              Restart
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

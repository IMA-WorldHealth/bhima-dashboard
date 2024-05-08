/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import errorCode from '../lib/errorCode';

const mapStatus: any = {
  400: 'Mauvaise requette',
  401: "Echec d'authentification, les identifiant sont incorrectes",
  403: "Vous n'avez pas d'autorisation",
  404: 'Ressources non trouvées',
};

function parseMessage(error: any) {
  if (!error || (error && !error.response)) {
    if (error?.code) {
      const msgCode = errorCode[error.code];
      return msgCode;
    }
    return error;
  }
  const msgCode = errorCode[error.response.data?.code];
  if (msgCode) {
    return msgCode;
  }
  const msg = mapStatus[error.response.status];
  if (!msgCode && msg) {
    return msg;
  }
  return error.message;
}

const notification = {
  handleSuccess: (msg: AxiosResponse) => {
    if (msg.status === 204) {
      toast.dismiss();
      return toast.success('Information supprimer avec success');
    }
    toast.dismiss();
    return toast.success(msg.data?.message || 'Success');
  },
  handleError: (error: AxiosError) => {
    toast.dismiss();
    return toast.error(parseMessage(error));
  },
};

export default notification;

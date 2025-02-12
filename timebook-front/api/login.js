import { decode } from 'jsonwebtoken';
import { axios, toaster } from '../lib';
import { redirectHome, store } from '../auth';

const login = async (ref, data) => {
  try {
    // execute google recaptcha
    data['g-recaptcha-response'] = await ref.current.executeAsync();

    const { token } = await axios.post('login', data);
    if (!decode(token)) {
      throw new Error('Error! We cannot log you in at the moment');
    }
    store.dispatch({ type: 'SET', jwt: token });
    // notify user and other actions
    toaster.success('Login successful');
    redirectHome(token);
  } catch (err) {
    toaster.error(err.message);

    // reset google recaptcha on invalid login
    ref.current.reset();
  }
};

export default login;

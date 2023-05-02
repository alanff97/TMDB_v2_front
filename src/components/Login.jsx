import { useNavigate } from 'react-router';
import axios from 'axios';
import { setUser } from '../state/user';
import { useInput } from '../hooks/useInput';
import { log, success, error } from '../utils/logs';
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useInput('email');
  const password = useInput('password');

  const handleSubmit = async (e) => {
    e.preventDefault();
    log('login attempt...');
    try {
      const { data } = await axios.post('/api/user/login', {
        email: email.value,
        password: password.value,
      });

      const action = setUser(data);
      dispatch(action);
      success(`logged user ${data.email}`);
      navigate('/collection/discover');
    } catch ({ response }) {
      error(response.status, response.statusText);
    }
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit} className="box">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="Email"
              {...email}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="********"
              {...password}
            />
          </div>
        </div>
        <button className="button is-primary">Sign in</button>
      </form>
    </div>
  );
};

export default Login;

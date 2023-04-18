import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from 'src/pages/auth/Login';
import Regist from 'src/pages/auth/Regist';
import Todo from 'src/pages/todo/Todo';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='signup' Component={Regist} />
        <Route path='signin' Component={Login} />
        <Route path='todo' Component={Todo} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
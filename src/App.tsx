import {Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Lotes from './pages/Lotes';
import Usuarios from './pages/Usuarios';
import Conta from './pages/Conta';
import NotFound from './pages/NotFound';
import RequireAuth from './components/general/RequireAuth';
import LoteDetalhe from './pages/LoteDetalhe';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <>
            <Routes>
                <Route path="login" element={<Login />} />

                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="lotes" element={<Lotes />} />
                        <Route path="lote/:loteId" element={<LoteDetalhe />} />
                        <Route path="usuarios" element={<Usuarios />} />
                        <Route path="conta" element={<Conta />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;

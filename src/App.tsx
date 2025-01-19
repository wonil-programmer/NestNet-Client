import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Modal from 'react-modal';
import Root from './Root.tsx';
import axios from 'axios';
import './index.css';
import setupMock from '../mock/index';

Modal.setAppElement('#root');

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export default function App() {
    axios.defaults.withCredentials = true;
    setupMock(axios);
    return (
        <QueryClientProvider client={queryClient}>
            <Root />
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

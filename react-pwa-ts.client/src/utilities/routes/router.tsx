import App from '../../components/App'
import ErrorPage from '../../components/ErrorPage'
import {
    createBrowserRouter
} from "react-router-dom";

const lazyWrap = (factory: () => Promise<any>) => {
    return async () => {
        const page = await factory();
        return {
            Component: page.default || page.Component,
            ErrorBoundary: page.ErrorBoundary,
            loader: page.loader,
        }
    }
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "integration",
                lazy: lazyWrap(() => import('../../components/ApiIntegration'))
            },
            {
                path: "content",
                lazy: lazyWrap(() => import('../../components/UploadContent'))
            },
            {
                path: "mobile",
                lazy: lazyWrap(() => import('../../components/Mobile'))
            }
        ]
    }
]);

export default router;
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router'
import { Layout } from './Layout'
import { NotFound } from './NotFound'
import { TrackingPage } from '../features/tracking/TrackingPage'


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Layout />} errorElement={<NotFound />}>
                <Route index element={<TrackingPage />} />
            </Route>
        </>
    )

)
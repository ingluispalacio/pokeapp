import {
  createBrowserRouter,
} from 'react-router-dom'

import { MainLayout } from '@/layouts/main-layout'

import { HomePage } from '@/pages/home-page'
import { PokemonDetailsPage } from '@/pages/pokemon-details-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },

  {
    path: '/pokemon/:name',
    element: (
      <MainLayout>
        <PokemonDetailsPage />
      </MainLayout>
    ),
  },
])
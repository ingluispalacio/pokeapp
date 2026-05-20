import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-background px-4 py-12 text-center">
      <div className="mx-auto max-w-md">
       

        {/* CONTENEDOR DE LA IMAGEN CENTRAL */}
        <div className="my-8 flex justify-center">
          <img
            src="/assets/pokemon-404.png" 
            alt="Pokémon no encontrado"
            className="h-78 w-78 object-contain"
          />
        </div>
        
        <p className="mt-4 text-muted-foreground ">
          The Pokémon or page you're looking for seems to have fled. Return to a safe place before a wild enemy appears!
        </p>

        {/* Botón de retorno */}
        <div className="mt-6">
          <Link
            to="/"
            className="bg-(--color-primary) text-white lg:bg-transparent lg:text-gray-800 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors lg:hover:bg-(--color-primary) lg:hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
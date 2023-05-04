import { useState, useEffect } from 'react'

const useScreenWidthLessThanX = (sizeX: number) => {
  const [isScreenWidthLessThanX, setIsScreenWidthLessThanX] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsScreenWidthLessThanX(window.innerWidth < sizeX)
    }

    // Verificar o tamanho da tela no momento em que o componente é montado
    handleResize()

    // Adicionar um listener de redimensionamento para atualizar o estado quando a tela for redimensionada
    window.addEventListener('resize', handleResize)

    // Remover o listener de redimensionamento quando o componente for desmontado
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [sizeX])

  return isScreenWidthLessThanX
}

export default useScreenWidthLessThanX

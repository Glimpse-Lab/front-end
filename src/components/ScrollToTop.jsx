import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Função para fazer scroll
    const scroll = () => {
      // Scroll da janela
      window.scrollTo(0, 0);
      
      // Scroll do html
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Scroll de elementos com overflow
      const scrollableElements = document.querySelectorAll('main, [class*="overflow-y"]');
      scrollableElements.forEach(el => {
        el.scrollTop = 0;
      });
    };

    // Executa imediatamente
    scroll();
    
    // Executa novamente após um pequeno delay para garantir
    setTimeout(scroll, 0);
    setTimeout(scroll, 100);
  }, [pathname]);

  return null;
}



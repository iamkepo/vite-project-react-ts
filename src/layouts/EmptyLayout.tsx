import React, { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from "react-router-dom";

import ModalComponent from '../components/ModalComponent';
import ToastComponent from '../components/ToastComponent';
import { toggleTheme, useThemeStore } from '../stores/themeStore';
import { changeLang, translateElements, useLangStore } from '../stores/langStore';


const EmptyLayout: React.FC = () => {
  const { lang } = useLangStore();
  const { theme } = useThemeStore();
  
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {  

    if (window.location.href == window.location.origin+"/") {
      navigate("/"+lang)
    }

    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.classList = theme + '-theme';
    }
    
    translateElements()
  }, [theme, navigate, lang]);

  const handleChangeLang = (value: string) => {
    changeLang(value);
    window.location.replace(window.location.href.replace(`${params?.lang}`, value))
  };
  
  return (
    <section className={`container-full vh-100`}>
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
        <button
          type="button"
          className={`btn btn-${theme}`}
          onClick={toggleTheme}
        >
          <i className={`bi bi-${theme === "dark" ? "sun" : "moon"}`}></i>
        </button>

        <button
          type="button"
          className={`btn btn-${theme}`}
          onClick={()=> handleChangeLang(lang == 'fr' ? 'en' : 'fr')}
        >
          {params?.lang}
        </button>
      </div>
      
      <Outlet /> 

      <ModalComponent />
      <ToastComponent />
    </section>
  );
};

export default EmptyLayout;
import { useState, useEffect } from "react";
import { SearchHeader } from "./components/SearchHeader";
import { SubmitAction } from "../../components/SubmitAction";
import styles from "./SearchImage.module.css";
import { useNavigate } from "react-router-dom";
import { env, validateEnv } from "../../config/env";
import { ImageCard } from "./components/ImageCard";

interface IImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  alt_description: string;
  description: string;
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  likes: number;
  downloads?: number;
  created_at: string;
  width: number;
  height: number;
  color: string;
  tags?: Array<{
    title: string;
  }>;
}

const STORAGE_KEY = "search-image-history";

export function SearchImage() {
  const [images, setImages] = useState<IImage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Validar configuração da API ao inicializar
  useEffect(() => {
    const isApiConfigured = validateEnv();
    if (!isApiConfigured) {
      setApiError("API não configurada. Verifique o console para instruções.");
    }
  }, []);

  // Carregar histórico de busca do localStorage
  useEffect(() => {
    const savedSearch = localStorage.getItem(STORAGE_KEY);
    if (savedSearch) {
      try {
        const parsedSearch = JSON.parse(savedSearch);
        setSearchTerm(parsedSearch);
      } catch (error) {
        console.error("Erro ao carregar histórico de busca:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Salvar termo de busca no localStorage
  useEffect(() => {
    if (isInitialized && searchTerm) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searchTerm));
    }
  }, [searchTerm, isInitialized]);

  // Buscar imagens da API Unsplash
  const searchImages = async (query: string) => {
    if (!query.trim()) return;
    
    if (!env.UNSPLASH_API_KEY || env.UNSPLASH_API_KEY === "YOUR_UNSPLASH_API_KEY") {
      setApiError("API não configurada. Configure VITE_UNSPLASH_API_KEY no arquivo .env");
      return;
    }
    
    setIsLoading(true);
    setApiError(null);
    
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20`,
        {
          headers: {
            Authorization: `Client-ID ${env.UNSPLASH_API_KEY}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setImages(data.results || []);
      } else if (response.status === 401) {
        setApiError("Chave da API inválida. Verifique sua configuração.");
        setImages([]);
      } else if (response.status === 403) {
        setApiError("Limite de requisições excedido. Tente novamente mais tarde.");
        setImages([]);
      } else {
        setApiError(`Erro na API: ${response.status}`);
        setImages([]);
      }
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
      setApiError("Erro de conexão. Verifique sua internet.");
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    searchImages(query);
  };

  const handleImageClick = (image: IImage) => {
    navigate(`/image/${image.id}`, { state: { image } });
  };

  return (
    <>
      <SubmitAction 
        add={handleSearch}
        placeholder="Buscar imagens..."
        buttonText="Buscar"
      />
      <SearchHeader 
        totalImages={images.length} 
        searchTerm={searchTerm}
        isLoading={isLoading}
      />
      <div className={styles.wrapper}>
        {apiError && (
          <div className={styles.error}>
            <h5>Erro de Configuração</h5>
            <label>{apiError}</label>
            <p>Para configurar a API:</p>
            <ol>
              <li>Crie um arquivo <code>.env</code> na raiz do projeto</li>
              <li>Adicione: <code>VITE_UNSPLASH_API_KEY=sua_chave_aqui</code></li>
              <li>Reinicie o servidor de desenvolvimento</li>
            </ol>
          </div>
        )}
        {!apiError && isLoading && (
          <div className={styles.loading}>
            <h5>Buscando imagens...</h5>
          </div>
        )}
        {!apiError && !isLoading && images.length === 0 && searchTerm && (
          <div className={styles.empty}>
            <h5>Nenhuma imagem encontrada para "{searchTerm}"</h5>
            <label>Tente buscar por outro termo</label>
          </div>
        )}
        {!apiError && !isLoading && !searchTerm && (
          <div className={styles.initial}>
            <h5>Digite um termo para buscar imagens</h5>
            <label>Use a barra de busca acima para encontrar imagens incríveis</label>
          </div>
        )}
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </>
  );
}

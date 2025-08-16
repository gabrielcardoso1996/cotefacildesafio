import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Heart, Download, Link } from "@phosphor-icons/react";
import styles from "./ImageDetail.module.css";

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
  downloads: number;
  created_at: string;
  width: number;
  height: number;
  color: string;
  tags: Array<{
    title: string;
  }>;
}

export function ImageDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state?.image as IImage;
  const [isLoading, setIsLoading] = useState(false);

  if (!image) {
    return (
      <div className={styles.error}>
        <h2>Imagem não encontrada</h2>
        <p>Volte para a galeria e selecione uma imagem.</p>
        <button 
          onClick={() => navigate("/gallery")}
          className={styles.backButton}
        >
          <ArrowLeft size={20} />
          Voltar para Galeria
        </button>
      </div>
    );
  }

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(image.urls.full);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `image-${image.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Erro ao baixar imagem:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          onClick={() => navigate("/gallery")}
          className={styles.backButton}
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <h1>Detalhes da Imagem</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img 
            src={image.urls.regular} 
            alt={image.alt_description || image.description || "Imagem"} 
            className={styles.mainImage}
          />
          <div className={styles.imageActions}>
            <button 
              onClick={handleDownload}
              disabled={isLoading}
              className={styles.downloadButton}
            >
              <Download size={20} />
              {isLoading ? "Baixando..." : "Baixar"}
            </button>
            <a 
              href={image.urls.full} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.externalButton}
            >
              <Link size={20} />
              Ver Original
            </a>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.basicInfo}>
            <h2>{image.alt_description || "Sem título"}</h2>
            {image.description && (
              <p className={styles.description}>{image.description}</p>
            )}
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <Heart size={20} weight="fill" />
              <span>{image.likes.toLocaleString()} curtidas</span>
            </div>
            <div className={styles.stat}>
              <Download size={20} />
              <span>{image.downloads?.toLocaleString() || 0} downloads</span>
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.detail}>
              <strong>Autor:</strong>
              <a 
                href={image.user.links.html} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.authorLink}
              >
                {image.user.name}
              </a>
            </div>
            
            <div className={styles.detail}>
              <strong>Data:</strong>
              <span>{formatDate(image.created_at)}</span>
            </div>

            <div className={styles.detail}>
              <strong>Dimensões:</strong>
              <span>{image.width} × {image.height}px</span>
            </div>

            {image.color && (
              <div className={styles.detail}>
                <strong>Cor predominante:</strong>
                <div className={styles.colorSwatch}>
                  <span 
                    className={styles.colorBox} 
                    style={{ backgroundColor: image.color }}
                  />
                  <span>{image.color}</span>
                </div>
              </div>
            )}
          </div>

          {image.tags && image.tags.length > 0 && (
            <div className={styles.tags}>
              <strong>Tags:</strong>
              <div className={styles.tagList}>
                {image.tags.slice(0, 10).map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

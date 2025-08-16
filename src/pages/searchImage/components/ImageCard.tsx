import styles from "./ImageCard.module.css";
import { Heart, Calendar, User } from "@phosphor-icons/react";

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

interface IImageCardProps {
  image: IImage;
  onClick: () => void;
}

export function ImageCard({ image, onClick }: IImageCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.imageCardContainer} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img 
          src={image.urls.small} 
          alt={image.alt_description || image.description || "Imagem"} 
          className={styles.imageCardImage}
        />
        <div className={styles.imageOverlay}>
          <div className={styles.overlayStats}>
            <div className={styles.stat}>
              <Heart size={16} weight="fill" />
              <span>{image.likes.toLocaleString()}</span>
            </div>
            {image.downloads && (
              <div className={styles.stat}>
                <span>⬇️ {image.downloads.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.imageCardInfo}>
        <div className={styles.imageCardHeader}>
          <div className={styles.imageCardAuthor}>
            <User size={16} />
            <span>{image.user.name}</span>
          </div>
          <div className={styles.imageCardDate}>
            <Calendar size={16} />
            <span>{formatDate(image.created_at)}</span>
          </div>
        </div>
        
        <div className={styles.imageCardDetails}>
          <div className={styles.imageDimensions}>
            <span>{image.width} × {image.height}px</span>
          </div>
          {image.color && (
            <div className={styles.colorIndicator}>
              <span 
                className={styles.colorDot} 
                style={{ backgroundColor: image.color }}
                title={`Cor predominante: ${image.color}`}
              />
            </div>
          )}
        </div>
        
        {image.tags && image.tags.length > 0 && (
          <div className={styles.imageCardTags}>
            {image.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag.title}
              </span>
            ))}
            {image.tags.length > 3 && (
              <span className={styles.moreTags}>+{image.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

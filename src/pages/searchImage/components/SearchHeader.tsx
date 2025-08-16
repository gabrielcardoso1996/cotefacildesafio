import styles from "./SearchHeader.module.css";

interface ISearchHeaderProps {
  totalImages: number;
  searchTerm: string;
  isLoading: boolean;
}

export function SearchHeader({ totalImages, searchTerm, isLoading }: ISearchHeaderProps) {
  return (
    <div className={styles.searchHeaderContainer}>
      <div className={styles.searchHeaderTitle}>
        <h2>Galeria de Imagens</h2>
        {searchTerm && (
          <span>Resultados para: "{searchTerm}"</span>
        )}
      </div>
      <div className={styles.searchHeaderCount}>
        {!isLoading && (
          <span>{totalImages} imagem{totalImages !== 1 ? 'ns' : ''} encontrada{totalImages !== 1 ? 's' : ''}</span>
        )}
        {isLoading && (
          <span>Buscando...</span>
        )}
      </div>
    </div>
  );
}

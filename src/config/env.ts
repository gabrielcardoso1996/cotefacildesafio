// Configuração das variáveis de ambiente
export const env = {
  UNSPLASH_API_KEY: import.meta.env.VITE_UNSPLASH_API_KEY || "YOUR_UNSPLASH_API_KEY",
};

// Validação das variáveis obrigatórias
export const validateEnv = () => {
  if (!env.UNSPLASH_API_KEY || env.UNSPLASH_API_KEY === "YOUR_UNSPLASH_API_KEY") {
    console.warn(
      "⚠️  UNSPLASH_API_KEY não configurada! Crie um arquivo .env na raiz do projeto com: VITE_UNSPLASH_API_KEY=sua_chave_aqui"
    );
    return false;
  }
  return true;
};

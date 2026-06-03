// Tipos compartilhados entre server e client.
// Os dados reais são gerados em lib/vasos.ts lendo a pasta public/Assets/Vasos/.

export type Category = {
  id: string;
  label: string;
  icon: string;
  description: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  acabamentoId: string;
  acabamentoLabel: string;
  image: string;
  specs: {
    tamanhos: string[];
    origem: string;
    material: string;
    uso: string;
  };
  tag?: string;
  filters: string[];
};

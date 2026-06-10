// Especificações de tamanho de cada produto.
// Chave = nome exato do produto (ou da subpasta no caso da Linha Home).
// Para adicionar um novo produto basta incluir uma entrada aqui.

export const SPECS: Record<string, { tamanhos: string[] }> = {
  // ── Nacionais ────────────────────────────────────────────────────────────
  Marau:      { tamanhos: ["69x49", "50x47"] },
  Atalaia:    { tamanhos: ["100x60", "80x50"] },
  Trancoso:   { tamanhos: ["73x60", "54x54"] },
  Norinha:    { tamanhos: ["89x60"] },
  Maragogi:   { tamanhos: ["74x60"] },
  Ipojuca:    { tamanhos: ["100x58"] },

  // ── Cimentício ───────────────────────────────────────────────────────────
  Bojo:       { tamanhos: ["62x35"] },
  Ravena:     { tamanhos: ["G 87x37", "P 66x33"] },
  Millenium:  { tamanhos: ["G 90x40x40", "M 70x38x38", "P 50x34x34"] },
  Vertical:   { tamanhos: ["G 103x34x34", "M 79x34x34", "P 50x34x34", "PP 25x34x34"] },
  Veneza:     { tamanhos: ["G 100x50", "M 80x50", "P 60x50"] },
  Esfera:     { tamanhos: ["G 63x57", "M 53x53", "P 40x30"] },
  Marroquino: { tamanhos: ["G 85x32", "M 65x32", "P 50x32"] },
  Evora:      { tamanhos: ["G 80x70", "P 50x70"] },

  // ── Linha Home ───────────────────────────────────────────────────────────
  Paris:      { tamanhos: ["P 25x18", "M 36x20", "G 47x25"] },
  Roma:       { tamanhos: ["P 23x20", "G 33x25"] },
  Italia:     { tamanhos: ["P 13x30", "M 17x38", "G 21x48"] },

  // ── Fontes ───────────────────────────────────────────────────────────────
  "Fonte Atlantic":       { tamanhos: ["90x86"] },
  "Fonte de Mesa Marrom": { tamanhos: ["28,5x25"] },
  "Fonte Transbordo Preta": { tamanhos: ["100x53"] },
  "Fonte Transbordo Branca": { tamanhos: ["100x53"] },
  "Jardineira Fonte com LED": { tamanhos: ["100x30x30"] },
  "Fonte sem Transbordo Branca": { tamanhos: ["85x53"] },
};

export interface OrdemServico {
  id: string; 
  cliente: string;
  modeloAparelho: string;
  defeito: string;
  status: 'Aberto' | 'Finalizado'; 
}
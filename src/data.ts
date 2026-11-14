import type { IconName } from './theme';

/* ATENÇÃO: todo o conteúdo abaixo é FICTÍCIO (modo demonstração). */

export type Kind = 'Estandes' | 'Palcos' | 'Serviços';

export interface Offer {
  title: string;
  text: string;
  until: string;
  remaining: number;
  prefix: string;
}

export interface Stand {
  id: string;
  name: string;
  category: string;
  icon: IconName;
  description: string;
  hours: string;
  corridor: string;
  distance: string;
  color: string;
  offer?: Offer;
}

export interface MapPoint {
  id: string;
  label: string;
  name: string;
  detail: string;
  kind: Kind;
  /** posição e tamanho em % da planta */
  x: number;
  y: number;
  w: number;
  h: number;
  standId?: string;
}

export interface Activity {
  id: string;
  day: 20 | 21 | 22;
  start: string;
  end: string;
  stage: 'Principal' | 'Sala 2';
  pointId: string;
  title: string;
  speaker: string;
  extra?: string;
  live?: boolean;
}

export const EVENT_NAME = 'Expo Inova CG';
export const INTERESTS = ['Tecnologia', 'Alimentos e bebidas', 'Educação', 'Moda', 'Saúde'];
export const DAYS: { day: 20 | 21 | 22; label: string }[] = [
  { day: 20, label: 'SEX' },
  { day: 21, label: 'SÁB' },
  { day: 22, label: 'DOM' },
];
export const STAGES = ['Todos', 'Principal', 'Sala 2'] as const;
export const MUTE_OPTIONS = ['Desativado', '1 hora', '2 horas', 'Resto do dia'];

export const stands: Stand[] = [
  {
    id: '12', name: 'Café da Serra', category: 'Alimentos e bebidas', icon: 'cafe',
    description: 'Cafés especiais de pequenos produtores do Cariri paraibano. Degustação de três lotes durante toda a feira.',
    hours: '9h às 18h', corridor: 'Corredor A', distance: 'a cerca de 2 m', color: '#87502D',
    offer: {
      title: 'Café coado grátis na compra de qualquer pacote',
      text: 'Prove o lote especial e leve um café coado grátis na compra de qualquer pacote.',
      until: '16h', remaining: 18, prefix: 'CAFE',
    },
  },
  {
    id: '14', name: 'TechNordeste', category: 'Tecnologia', icon: 'hardware-chip',
    description: 'Sensores e automação para a indústria nordestina. Demonstração de sensores às 15h.',
    hours: '9h às 18h', corridor: 'Corredor A', distance: 'a cerca de 8 m', color: '#2B4C7E',
    offer: {
      title: 'Kit de sensores com 15% off',
      text: 'Leve o kit de sensores com 15% de desconto durante a feira.',
      until: 'domingo', remaining: 40, prefix: 'TECH',
    },
  },
  {
    id: '9', name: 'Doces do Agreste', category: 'Alimentos e bebidas', icon: 'ice-cream',
    description: 'Doces regionais artesanais, feitos com frutas da estação.',
    hours: '9h às 18h', corridor: 'Corredor B', distance: 'a cerca de 6 m', color: '#B5483A',
  },
  {
    id: '10', name: 'Edu Maker', category: 'Educação', icon: 'school',
    description: 'Kits de robótica e oficinas de programação para escolas.',
    hours: '9h às 18h', corridor: 'Corredor A', distance: 'a cerca de 9 m', color: '#3F6B4F',
  },
  {
    id: '11', name: 'Moda Cariri', category: 'Moda', icon: 'shirt',
    description: 'Moda autoral com rendas e algodão colorido da região.',
    hours: '9h às 18h', corridor: 'Corredor A', distance: 'a cerca de 7 m', color: '#7A4A8C',
  },
  {
    id: '13', name: 'Clínica Vida+', category: 'Saúde', icon: 'medkit',
    description: 'Avaliações rápidas de saúde e orientações de prevenção.',
    hours: '9h às 18h', corridor: 'Corredor A', distance: 'a cerca de 10 m', color: '#2D7F86',
  },
];

export const points: MapPoint[] = [
  { id: '10', label: '10', name: 'Edu Maker', detail: 'Corredor A', kind: 'Estandes', x: 5, y: 12, w: 28, h: 20, standId: '10' },
  { id: '11', label: '11', name: 'Moda Cariri', detail: 'Corredor A', kind: 'Estandes', x: 36, y: 12, w: 28, h: 20, standId: '11' },
  { id: '13', label: '13', name: 'Clínica Vida+', detail: 'Corredor A', kind: 'Estandes', x: 67, y: 12, w: 28, h: 20, standId: '13' },
  { id: '9', label: '9', name: 'Doces do Agreste', detail: 'Corredor B', kind: 'Estandes', x: 5, y: 36, w: 28, h: 20, standId: '9' },
  { id: '12', label: '12', name: 'Café da Serra', detail: 'Corredor A', kind: 'Estandes', x: 36, y: 36, w: 28, h: 20, standId: '12' },
  { id: '14', label: '14', name: 'TechNordeste', detail: 'Corredor A', kind: 'Estandes', x: 67, y: 36, w: 28, h: 20, standId: '14' },
  { id: 'food', label: 'Praça', name: 'Praça de alimentação', detail: 'Corredor B, ao fundo', kind: 'Serviços', x: 5, y: 65, w: 28, h: 20 },
  { id: 'palco', label: 'Palco', name: 'Palco Principal', detail: 'Centro do pavilhão', kind: 'Palcos', x: 36, y: 65, w: 28, h: 20 },
  { id: 'sala2', label: 'Sala 2', name: 'Sala 2', detail: 'Lateral direita', kind: 'Palcos', x: 67, y: 65, w: 28, h: 20 },
];

export const activities: Activity[] = [
  { id: 'a1', day: 20, start: '14h', end: '15h30', stage: 'Principal', pointId: 'palco', title: 'IoT na indústria local', speaker: 'Dra. Helena Cruz · Tecnologia', live: true },
  { id: 'a2', day: 20, start: '16h', end: '17h', stage: 'Sala 2', pointId: 'sala2', title: 'Prototipando com sensores BLE', speaker: 'Eng. Paulo Ramos', extra: '30 vagas' },
  { id: 'a3', day: 20, start: '17h30', end: '18h', stage: 'Principal', pointId: 'palco', title: 'Encerramento do primeiro dia', speaker: 'Organização Expo Inova CG' },
  { id: 'a4', day: 21, start: '10h', end: '11h', stage: 'Principal', pointId: 'palco', title: 'Cafés especiais e o mercado nordestino', speaker: 'Prof. Marcos Lima' },
  { id: 'a5', day: 21, start: '14h', end: '15h30', stage: 'Sala 2', pointId: 'sala2', title: 'Oficina: do protótipo ao produto', speaker: 'Ana Beatriz Souza', extra: '25 vagas' },
  { id: 'a6', day: 22, start: '10h', end: '11h30', stage: 'Principal', pointId: 'palco', title: 'Painel: inovação em Campina Grande', speaker: 'Convidados da organização' },
  { id: 'a7', day: 22, start: '15h', end: '16h', stage: 'Sala 2', pointId: 'sala2', title: 'Pitch de startups locais', speaker: 'Comissão Expo Inova CG' },
];

export const getStand = (id: string) => stands.find((s) => s.id === id);
export const getActivity = (id: string) => activities.find((a) => a.id === id);

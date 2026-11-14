import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';
import type { ViewStyle } from 'react-native';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export const C = {
  blue: '#2554D9',
  blueDark: '#1B3FAE',
  blueSoft: '#E7EDFF',
  cream: '#F8F7F2',
  creamDark: '#EDE9DE',
  card: '#FFFFFF',
  text: '#1B1C22',
  muted: '#5A6173',
  line: '#E4E0D5',
  green: '#13845D',
  greenSoft: '#DDF4E9',
  yellow: '#FFE9A7',
  yellowText: '#7B6300',
  orange: '#B65A07',
  orangeSoft: '#FFEDDF',
  red: '#C43C32',
  redSoft: '#FCE8E6',
} as const;

/** Largura máxima do "celular" quando o app roda em tela larga (computador). */
export const MAX_WIDTH = 480;

export const shadow: ViewStyle = { boxShadow: '0 4px 14px rgba(27, 28, 34, 0.08)' };

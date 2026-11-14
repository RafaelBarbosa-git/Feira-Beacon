import React from 'react';
import { Modal, Pressable, StyleProp, StyleSheet, Switch, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, IconName, MAX_WIDTH, shadow } from './theme';
import type { Tab } from './store';

export function Icon({ name, size = 22, color = C.text }: { name: IconName; size?: number; color?: string }) {
  return <Ionicons name={name} size={size} color={color} />;
}

type BtnKind = 'primary' | 'light' | 'ghost' | 'green' | 'white' | 'danger';

export function Button({ label, onPress, kind = 'primary', icon, disabled }: {
  label: string; onPress?: () => void; kind?: BtnKind; icon?: IconName; disabled?: boolean;
}) {
  const dark = kind === 'primary' || kind === 'green';
  const color = dark ? '#fff' : kind === 'danger' ? C.red : C.blue;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        u.button,
        kind === 'light' && { backgroundColor: C.blueSoft },
        kind === 'ghost' && { backgroundColor: 'transparent', marginTop: 4 },
        kind === 'green' && { backgroundColor: C.green },
        kind === 'white' && { backgroundColor: '#fff' },
        kind === 'danger' && { backgroundColor: C.redSoft },
        disabled && { opacity: 0.45 },
        pressed && { opacity: 0.8, transform: [{ scale: 0.99 }] },
      ]}
    >
      {icon ? <Icon name={icon} size={20} color={color} /> : null}
      <Text style={[u.buttonLabel, { color }]}>{label}</Text>
    </Pressable>
  );
}

export function Pill({ label, tone = 'blue', icon }: { label: string; tone?: 'blue' | 'green' | 'cream' | 'dark' | 'orange'; icon?: IconName }) {
  const map = {
    blue: { bg: C.blueSoft, fg: C.blue, bd: 'transparent' },
    green: { bg: C.greenSoft, fg: C.green, bd: 'transparent' },
    cream: { bg: '#F0EEE6', fg: C.muted, bd: '#DDD8CC' },
    dark: { bg: C.blue, fg: '#fff', bd: 'transparent' },
    orange: { bg: C.orangeSoft, fg: C.orange, bd: 'transparent' },
  }[tone];
  return (
    <View style={[u.pill, { backgroundColor: map.bg, borderColor: map.bd }]}>
      {icon ? <Icon name={icon} size={14} color={map.fg} /> : null}
      <Text style={[u.pillText, { color: map.fg }]}>{label}</Text>
    </View>
  );
}

export function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [u.chip, selected && u.chipOn, pressed && { opacity: 0.8 }]}
    >
      <Text style={[u.chipText, selected && { color: '#fff' }]}>{label}</Text>
    </Pressable>
  );
}

export function Card({ children, style, onPress, label }: {
  children: React.ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void; label?: string;
}) {
  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress}
        style={({ pressed }) => [u.card, style, pressed && { opacity: 0.85 }]}>
        {children}
      </Pressable>
    );
  }
  return <View style={[u.card, style]}>{children}</View>;
}

export function ScreenTitle({ children }: { children: string }) {
  return <Text accessibilityRole="header" style={u.screenTitle}>{children}</Text>;
}

export function DemoBanner({ text }: { text: string }) {
  return (
    <View style={u.demo} accessibilityRole="alert">
      <Icon name="flask-outline" size={18} color={C.orange} />
      <Text style={u.demoText}>{text}</Text>
    </View>
  );
}

export function ToggleRow({ title, detail, value, onChange, icon }: {
  title: string; detail?: string; value: boolean; onChange: (v: boolean) => void; icon?: IconName;
}) {
  return (
    <View style={u.toggleRow}>
      {icon ? <View style={u.toggleIcon}><Icon name={icon} size={26} color={C.blue} /></View> : null}
      <View style={{ flex: 1 }}>
        <Text style={u.toggleTitle}>{title}</Text>
        {detail ? <Text style={u.toggleDetail}>{detail}</Text> : null}
      </View>
      <Switch
        accessibilityLabel={title}
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#CFCBC0', true: C.blue }}
        thumbColor="#fff"
      />
    </View>
  );
}

export function Field({ label, error, ...props }: TextInputProps & { label: string; error?: string }) {
  return (
    <View>
      <Text style={u.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor="#8A8F9C"
        {...props}
        style={[u.input, !!error && { borderColor: C.red }]}
      />
      {error ? <Text style={u.error}>{error}</Text> : null}
    </View>
  );
}

export function Sheet({ visible, onClose, title, children }: {
  visible: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={u.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Fechar" />
        <View style={u.sheet}>
          <View style={u.grabber} />
          <Text accessibilityRole="header" style={u.sheetTitle}>{title}</Text>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const TABS: [Tab, IconName, IconName][] = [
  ['Perto', 'radio', 'radio-outline'],
  ['Mapa', 'map', 'map-outline'],
  ['Programação', 'calendar', 'calendar-outline'],
  ['Cupons', 'ticket', 'ticket-outline'],
  ['Perfil', 'person', 'person-outline'],
];

export function TabBar({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[u.tabBar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {TABS.map(([name, on, off]) => {
        const active = tab === name;
        return (
          <Pressable key={name} accessibilityRole="tab" accessibilityLabel={name} accessibilityState={{ selected: active }}
            style={u.tabItem} onPress={() => setTab(name)}>
            <Icon name={active ? on : off} size={25} color={active ? C.blue : C.muted} />
            <Text style={[u.tabLabel, active && { color: C.blue }]}>{name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** QR ILUSTRATIVO: padrão derivado do código, não é um QR legível. */
export function PseudoQr({ code, faded }: { code: string; faded?: boolean }) {
  const N = 11;
  let h = 2166136261;
  for (let i = 0; i < code.length; i++) h = Math.imul(h ^ code.charCodeAt(i), 16777619) >>> 0;
  const bit = (i: number) => { h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0; return ((h >>> 16) + i) % 2 === 0; };
  const origins: [number, number][] = [[0, 0], [0, N - 3], [N - 3, 0]];
  const finder = (r: number, c: number): boolean | null => {
    for (const [or, oc] of origins) {
      if (r >= or && r < or + 3 && c >= oc && c < oc + 3) return !(r - or === 1 && c - oc === 1);
    }
    return null;
  };
  const cells: boolean[] = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) cells.push(finder(r, c) ?? bit(r * N + c));
  return (
    <View accessibilityLabel="QR ilustrativo" style={[u.qr, faded && { opacity: 0.35 }]}>
      {cells.map((on, i) => <View key={i} style={{ width: `${100 / N}%`, height: `${100 / N}%`, backgroundColor: on ? C.text : '#fff' }} />)}
    </View>
  );
}

export const u = StyleSheet.create({
  button: { backgroundColor: C.blue, minHeight: 56, alignItems: 'center', justifyContent: 'center', borderRadius: 30, marginTop: 16, paddingHorizontal: 18, flexDirection: 'row', gap: 8 },
  buttonLabel: { fontSize: 17, fontWeight: '800' },
  pill: { borderRadius: 22, paddingHorizontal: 12, paddingVertical: 7, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1 },
  pillText: { fontSize: 13, fontWeight: '800' },
  chip: { backgroundColor: '#F0EEE6', borderWidth: 1, borderColor: '#DDD8CC', borderRadius: 22, paddingHorizontal: 14, paddingVertical: 9 },
  chipOn: { backgroundColor: C.blue, borderColor: C.blue },
  chipText: { color: C.muted, fontSize: 14, fontWeight: '800' },
  card: { borderColor: C.line, borderWidth: 1, backgroundColor: C.card, borderRadius: 24, padding: 18, marginTop: 14 },
  screenTitle: { color: C.text, fontWeight: '800', fontSize: 34, letterSpacing: -1, marginTop: 8, marginBottom: 16 },
  demo: { flexDirection: 'row', gap: 8, alignItems: 'flex-start', backgroundColor: C.orangeSoft, borderRadius: 16, padding: 12, marginBottom: 6 },
  demoText: { flex: 1, color: C.orange, fontSize: 13.5, lineHeight: 19, fontWeight: '600' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, paddingHorizontal: 16 },
  toggleIcon: { width: 56, height: 56, backgroundColor: C.blueSoft, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  toggleTitle: { color: C.text, fontWeight: '800', fontSize: 18 },
  toggleDetail: { color: C.muted, fontSize: 14, lineHeight: 20, marginTop: 3 },
  fieldLabel: { color: C.text, fontWeight: '800', marginTop: 18, fontSize: 16 },
  input: { borderWidth: 1.5, borderColor: C.line, backgroundColor: '#fff', borderRadius: 18, minHeight: 58, paddingHorizontal: 18, marginTop: 8, color: C.text, fontSize: 17 },
  error: { color: C.red, fontSize: 13.5, marginTop: 6, fontWeight: '600' },
  backdrop: { flex: 1, backgroundColor: 'rgba(20,22,30,0.5)', justifyContent: 'flex-end', alignItems: 'center' },
  sheet: { width: '100%', maxWidth: MAX_WIDTH, backgroundColor: C.cream, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 22, paddingBottom: 32, maxHeight: '88%' },
  grabber: { width: 44, height: 5, borderRadius: 3, backgroundColor: '#D3D0C7', alignSelf: 'center', marginBottom: 14 },
  sheetTitle: { color: C.text, fontSize: 24, fontWeight: '800', marginBottom: 6 },
  tabBar: { backgroundColor: '#fff', borderTopWidth: 1, borderColor: C.line, flexDirection: 'row', paddingTop: 8 },
  tabItem: { flex: 1, alignItems: 'center', gap: 2, paddingVertical: 2 },
  tabLabel: { color: C.muted, fontSize: 11, fontWeight: '700' },
  qr: { width: 124, height: 124, padding: 8, flexDirection: 'row', flexWrap: 'wrap', borderColor: C.line, borderWidth: 1, borderRadius: 12, backgroundColor: '#fff' },
});
export { shadow };

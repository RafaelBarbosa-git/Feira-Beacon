import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, PermissionsAndroid, Platform } from 'react-native';
import type { Permission } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Tab = 'Perto' | 'Mapa' | 'Programação' | 'Cupons' | 'Perfil';
export type Entry = 'intro' | 'permissions' | 'account' | 'main' | 'stand';
export type PermKind = 'bluetooth' | 'location' | 'notifications';
export type PermStatus = 'unset' | 'granted' | 'denied' | 'demo';

export interface Coupon {
  code: string;
  redeemedAt: number;
  used: boolean;
  usedAt?: number;
}

export interface Persisted {
  user: { name: string; email: string } | null;
  favStands: string[];
  favActs: string[];
  reminders: string[];
  coupons: Record<string, Coupon>;
  checkins: Record<string, number>;
  prefs: { offers: boolean; schedule: boolean; background: boolean };
  interests: string[];
  mute: number;
  perms: Record<PermKind, PermStatus>;
}

const initial: Persisted = {
  user: null,
  favStands: [],
  favActs: [],
  reminders: [],
  coupons: {},
  checkins: {},
  prefs: { offers: true, schedule: true, background: false },
  interests: ['Tecnologia', 'Alimentos e bebidas'],
  mute: 0,
  perms: { bluetooth: 'unset', location: 'unset', notifications: 'unset' },
};

const KEY = 'feirabeacon:v1';

const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

/** Código ILUSTRATIVO gerado no aparelho. Em produção, o servidor gera e valida o cupom. */
const makeCode = (prefix: string) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 4; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${out}`;
};

async function askAndroid(kind: PermKind): Promise<PermStatus> {
  const P = PermissionsAndroid.PERMISSIONS;
  const v = Number(Platform.Version);
  let list: Permission[];
  if (kind === 'bluetooth') {
    if (v < 31) return 'granted';
    list = [P.BLUETOOTH_SCAN, P.BLUETOOTH_CONNECT];
  } else if (kind === 'location') {
    list = [P.ACCESS_FINE_LOCATION];
  } else {
    if (v < 33) return 'granted';
    list = [P.POST_NOTIFICATIONS];
  }
  try {
    const r = await PermissionsAndroid.requestMultiple(list);
    return list.every((p) => r[p] === PermissionsAndroid.RESULTS.GRANTED) ? 'granted' : 'denied';
  } catch {
    return 'denied';
  }
}

interface NavState {
  entry: Entry;
  tab: Tab;
  standId: string;
  mapSel: string;
  accountBack: Entry;
}

interface Store {
  loaded: boolean;
  s: Persisted;
  nav: NavState;
  go: (entry: Entry) => void;
  openAccount: (from: Entry) => void;
  setTab: (tab: Tab) => void;
  openStand: (id: string) => void;
  openMap: (pointId: string) => void;
  selectMap: (pointId: string) => void;
  toggleFavStand: (id: string) => void;
  toggleFavAct: (id: string) => void;
  toggleReminder: (id: string) => void;
  setPref: (k: keyof Persisted['prefs'], v: boolean) => void;
  toggleInterest: (name: string) => void;
  cycleMute: () => void;
  saveUser: (name: string, email: string) => void;
  continueAsGuest: () => void;
  redeem: (standId: string, prefix: string) => 'ok' | 'exists' | 'needs-account';
  markUsed: (standId: string) => void;
  checkin: (standId: string) => void;
  requestPermissions: (kinds: PermKind[]) => Promise<void>;
  resetAll: () => void;
}

const Ctx = createContext<Store | null>(null);

export const useStore = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useStore fora do StoreProvider');
  return v;
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [s, setS] = useState<Persisted>(initial);
  const [loaded, setLoaded] = useState(false);
  const [nav, setNav] = useState<NavState>({ entry: 'intro', tab: 'Perto', standId: '12', mapSel: '12', accountBack: 'permissions' });
  const navRef = useRef(nav);
  navRef.current = nav;

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setS({ ...initial, ...JSON.parse(raw) });
      } catch {
        /* sem armazenamento: segue com o estado inicial */
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(KEY, JSON.stringify(s)).catch(() => {});
  }, [s, loaded]);

  // Botão "voltar" do Android
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      const n = navRef.current;
      if (n.entry === 'stand') { setNav({ ...n, entry: 'main' }); return true; }
      if (n.entry === 'account') { setNav({ ...n, entry: n.accountBack }); return true; }
      if (n.entry === 'permissions') { setNav({ ...n, entry: 'intro' }); return true; }
      if (n.entry === 'main' && n.tab !== 'Perto') { setNav({ ...n, tab: 'Perto' }); return true; }
      return false;
    });
    return () => sub.remove();
  }, []);

  const upd = useCallback((fn: (p: Persisted) => Persisted) => setS(fn), []);

  const store = useMemo<Store>(() => ({
    loaded, s, nav,
    go: (entry) => setNav((n) => ({ ...n, entry })),
    openAccount: (from) => setNav((n) => ({ ...n, entry: 'account', accountBack: from })),
    setTab: (tab) => setNav((n) => ({ ...n, tab, entry: 'main' })),
    openStand: (id) => setNav((n) => ({ ...n, standId: id, entry: 'stand' })),
    openMap: (pointId) => setNav((n) => ({ ...n, mapSel: pointId, tab: 'Mapa', entry: 'main' })),
    selectMap: (pointId) => setNav((n) => ({ ...n, mapSel: pointId })),
    toggleFavStand: (id) => upd((p) => ({ ...p, favStands: toggle(p.favStands, id) })),
    toggleFavAct: (id) => upd((p) => ({ ...p, favActs: toggle(p.favActs, id) })),
    toggleReminder: (id) => upd((p) => ({ ...p, reminders: toggle(p.reminders, id) })),
    setPref: (k, v) => upd((p) => ({ ...p, prefs: { ...p.prefs, [k]: v } })),
    toggleInterest: (name) => upd((p) => ({ ...p, interests: toggle(p.interests, name) })),
    cycleMute: () => upd((p) => ({ ...p, mute: (p.mute + 1) % 4 })),
    saveUser: (name, email) => { upd((p) => ({ ...p, user: { name, email } })); setNav((n) => ({ ...n, entry: 'main', tab: 'Perto' })); },
    continueAsGuest: () => { upd((p) => ({ ...p, user: null })); setNav((n) => ({ ...n, entry: 'main', tab: 'Perto' })); },
    redeem: (standId, prefix) => {
      if (!s.user) return 'needs-account';
      if (s.coupons[standId]) return 'exists';
      upd((p) => ({ ...p, coupons: { ...p.coupons, [standId]: { code: makeCode(prefix), redeemedAt: Date.now(), used: false } } }));
      return 'ok';
    },
    markUsed: (standId) => upd((p) => {
      const c = p.coupons[standId];
      return c ? { ...p, coupons: { ...p.coupons, [standId]: { ...c, used: true, usedAt: Date.now() } } } : p;
    }),
    checkin: (standId) => upd((p) => ({ ...p, checkins: { ...p.checkins, [standId]: Date.now() } })),
    requestPermissions: async (kinds) => {
      const result: Partial<Record<PermKind, PermStatus>> = {};
      for (const k of kinds) result[k] = Platform.OS === 'android' ? await askAndroid(k) : 'demo';
      upd((p) => ({ ...p, perms: { ...p.perms, ...result } }));
    },
    resetAll: () => {
      setS(initial);
      setNav({ entry: 'intro', tab: 'Perto', standId: '12', mapSel: '12', accountBack: 'permissions' });
    },
  }), [loaded, s, nav, upd]);

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export const fmtTime = (ts: number) => new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

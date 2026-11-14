import React, { useState } from 'react';
import { Linking, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C } from '../theme';
import { fmtTime, useStore } from '../store';
import {
  activities, DAYS, EVENT_NAME, getActivity, getStand, INTERESTS, Kind, MapPoint, MUTE_OPTIONS, points, STAGES, stands,
} from '../data';
import { Button, Card, Chip, DemoBanner, Field, Icon, PseudoQr, ScreenTitle, Sheet, TabBar, ToggleRow, Pill } from '../ui';
import { PrivacyText } from './shared';

const pct = (n: number) => `${n}%` as `${number}%`;
const norm = (t: string) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/* ───────── Perto ───────── */
function Nearby() {
  const { openStand, openMap, setTab } = useStore();
  const s12 = stands[0];
  const s14 = stands[1];
  return (
    <>
      <Text style={m.event}>{EVENT_NAME} · Pavilhão A</Text>
      <View style={m.titleLine}>
        <ScreenTitle>Perto de você</ScreenTitle>
        <Pill label="Simulado" tone="orange" icon="flask-outline" />
      </View>
      <DemoBanner text="Modo demonstração: os pontos abaixo são fictícios. A leitura real de beacons exige development build Android." />
      <Pressable accessibilityRole="button" accessibilityLabel="Ver estande e cupom do Café da Serra" onPress={() => openStand('12')}
        style={({ pressed }) => [m.offer, pressed && { opacity: 0.92 }]}>
        <View style={m.rowBetween}>
          <Pill label="Estande 12 · a menos de 1 m" tone="dark" />
          <Text style={m.offerState}>Oferta ativa</Text>
        </View>
        <Text style={m.offerTitle}>{s12.name}</Text>
        <Text style={m.offerText}>{s12.offer?.text}</Text>
        <View style={m.offerButton}><Text style={m.offerButtonText}>Ver estande e cupom</Text></View>
      </Pressable>
      <View style={[m.rowBetween, { marginTop: 30 }]}>
        <Text style={m.sectionTitle}>Também por perto</Text>
        <Text style={m.sectionCount}>3 pontos</Text>
      </View>
      <NearRow icon="mic" name="Palco Principal" detail="Agora: IoT na indústria local · até 15h30" zone="Near" onPress={() => setTab('Programação')} />
      <NearRow icon="hardware-chip" name={`Estande 14 · ${s14.name}`} detail="Demonstração de sensores às 15h" zone="Near" orange onPress={() => openStand('14')} />
      <NearRow icon="restaurant" name="Praça de alimentação" detail="Corredor B, ao fundo" zone="Far" onPress={() => openMap('food')} />
      <Text style={m.footnote}>Zonas: Immediate (ação atual), Near (ação próxima) e Far (contexto). A proximidade é uma estimativa por RSSI, não uma posição exata.</Text>
    </>
  );
}

function NearRow({ icon, name, detail, zone, orange, onPress }: {
  icon: React.ComponentProps<typeof Icon>['name']; name: string; detail: string; zone: string; orange?: boolean; onPress: () => void;
}) {
  return (
    <Card onPress={onPress} label={name} style={m.nearRow}>
      <View style={[m.nearIcon, orange && { backgroundColor: C.orangeSoft }]}>
        <Icon name={icon} size={26} color={orange ? C.orange : C.blue} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={m.placeName}>{name}</Text>
        <Text style={m.placeDetail}>{detail}</Text>
      </View>
      <Text style={m.nearZone}>{zone}</Text>
    </Card>
  );
}

/* ───────── Mapa ───────── */
function MapScreen() {
  const { nav, selectMap, openStand, setTab } = useStore();
  const [q, setQ] = useState('');
  const [kind, setKind] = useState<'Tudo' | Kind>('Tudo');
  const matches = (p: MapPoint) =>
    (kind === 'Tudo' || p.kind === kind) && (!q.trim() || norm(`${p.name} ${p.label} ${p.detail}`).includes(norm(q)));
  const sel = points.find((p) => p.id === nav.mapSel) ?? points[4];
  const found = points.filter(matches).length;
  const tone = (p: MapPoint) => p.kind === 'Palcos'
    ? { bg: C.greenSoft, bd: '#A6E1C9', fg: C.green }
    : p.kind === 'Serviços' ? { bg: '#EEEDE4', bd: '#D9D6C8', fg: C.muted } : { bg: C.blueSoft, bd: '#BBD0FF', fg: C.blue };

  return (
    <>
      <ScreenTitle>Mapa</ScreenTitle>
      <View style={m.search}>
        <Icon name="search" size={22} color={C.muted} />
        <TextInput value={q} onChangeText={setQ} placeholder="Buscar estande ou atividade" placeholderTextColor="#8A8F9C"
          accessibilityLabel="Buscar estande ou atividade" style={m.searchInput} returnKeyType="search" />
      </View>
      <View style={m.chips}>
        {(['Tudo', 'Estandes', 'Palcos', 'Serviços'] as const).map((k) => <Chip key={k} label={k} selected={kind === k} onPress={() => setKind(k)} />)}
      </View>
      <Card style={m.floor}>
        {points.map((p) => {
          const t = tone(p);
          const chosen = p.id === sel.id;
          return (
            <Pressable key={p.id} accessibilityRole="button" accessibilityLabel={`${p.name}, ${p.detail}`}
              onPress={() => selectMap(p.id)}
              style={[m.point, { left: pct(p.x), top: pct(p.y), width: pct(p.w), height: pct(p.h), backgroundColor: t.bg, borderColor: t.bd },
                chosen && m.pointChosen, !matches(p) && { opacity: 0.22 }]}>
              <Text style={[m.pointLabel, { color: chosen ? C.yellowText : t.fg }]} numberOfLines={1}>{p.label}</Text>
              {chosen && p.kind === 'Estandes' ? <Text style={[m.pointName, { color: C.yellowText }]} numberOfLines={2}>{p.name}</Text> : null}
            </Pressable>
          );
        })}
        <View style={m.here}><Text style={m.hereText}>● Você está aqui (aprox.)</Text></View>
        <View style={m.you} pointerEvents="none"><View style={m.youDot} /></View>
        <Text style={m.entrance}>Entrada</Text>
      </Card>
      {found === 0 ? <Text style={m.footnote}>Nada encontrado para essa busca.</Text> : null}
      <Card style={m.rowCard}>
        <View style={m.badge}><Text style={m.badgeText} numberOfLines={1} adjustsFontSizeToFit>{sel.label}</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={m.placeName}>{sel.name}</Text>
          <Text style={m.placeDetail}>{sel.detail}{sel.standId ? ` · ${getStand(sel.standId)?.distance} de você (estimado)` : ''}</Text>
        </View>
        {sel.standId ? (
          <Pressable accessibilityRole="button" onPress={() => openStand(sel.standId!)} hitSlop={8}><Text style={m.link}>Abrir</Text></Pressable>
        ) : sel.kind === 'Palcos' ? (
          <Pressable accessibilityRole="button" onPress={() => setTab('Programação')} hitSlop={8}><Text style={m.link}>Programação</Text></Pressable>
        ) : null}
      </Card>
      <Text style={m.footnote}>Planta esquemática de demonstração. A posição “aprox.” é ilustrativa; a real depende de beacons configurados.</Text>
    </>
  );
}

/* ───────── Programação ───────── */
function Schedule() {
  const { s, openMap, toggleReminder, toggleFavAct } = useStore();
  const [day, setDay] = useState<20 | 21 | 22>(20);
  const [stage, setStage] = useState<(typeof STAGES)[number]>('Todos');
  const list = activities.filter((a) => a.day === day && (stage === 'Todos' || a.stage === stage));
  return (
    <>
      <ScreenTitle>Programação</ScreenTitle>
      <View style={m.days}>
        {DAYS.map((d) => (
          <Pressable key={d.day} accessibilityRole="tab" accessibilityState={{ selected: day === d.day }}
            onPress={() => setDay(d.day)} style={[m.day, day === d.day && m.dayOn]}>
            <Text style={[m.dayText, day === d.day && { color: '#fff' }]}>{d.label}</Text>
            <Text style={[m.dayNum, day === d.day && { color: '#fff' }]}>{d.day}</Text>
          </Pressable>
        ))}
      </View>
      <View style={m.chips}>
        {STAGES.map((st) => <Chip key={st} label={st === 'Todos' ? 'Todos os palcos' : st} selected={stage === st} onPress={() => setStage(st)} />)}
      </View>
      {list.length === 0 ? <Card><Text style={m.placeDetail}>Nenhuma atividade neste filtro.</Text></Card> : null}
      {list.map((a) => {
        const rem = s.reminders.includes(a.id);
        const fav = s.favActs.includes(a.id);
        return (
          <Card key={a.id} style={a.live ? { borderColor: C.green, borderWidth: 2 } : undefined}>
            {a.live
              ? <Text style={m.live}>● EM ANDAMENTO (exemplo) · {a.start} às {a.end}</Text>
              : <Text style={m.talkTime}>{a.start} às {a.end} · {a.stage === 'Principal' ? 'Palco Principal' : 'Sala 2'}</Text>}
            <Text style={m.talkTitle}>{a.title}</Text>
            <Text style={m.talkDetail}>{a.speaker}{a.extra ? ` · ${a.extra}` : ''}</Text>
            {a.live ? <Button kind="green" icon="navigate" label="Como chegar" onPress={() => openMap(a.pointId)} /> : null}
            <View style={m.actRow}>
              <Pressable accessibilityRole="switch" accessibilityState={{ checked: rem }} onPress={() => toggleReminder(a.id)}
                style={[m.reminder, rem && { backgroundColor: C.green }]}>
                <Icon name={rem ? 'notifications' : 'notifications-outline'} size={18} color={rem ? '#fff' : C.blue} />
                <Text style={[m.reminderText, rem && { color: '#fff' }]}>{rem ? 'Lembrete ativado' : 'Lembrete em 10 min'}</Text>
              </Pressable>
              <Pressable accessibilityRole="button" accessibilityLabel={fav ? 'Remover dos favoritos' : 'Favoritar'} onPress={() => toggleFavAct(a.id)} hitSlop={8}>
                <Icon name={fav ? 'heart' : 'heart-outline'} size={30} color={fav ? '#EE4D58' : C.text} />
              </Pressable>
            </View>
          </Card>
        );
      })}
      <Text style={m.footnote}>Lembretes e favoritos ficam salvos neste aparelho. O disparo real do lembrete (notificação agendada) ainda não foi implementado.</Text>
    </>
  );
}

/* ───────── Cupons ───────── */
function Coupons() {
  const { s, openStand, markUsed, setTab } = useStore();
  const [tab, setCouponTab] = useState<'disp' | 'used'>('disp');
  const all = Object.entries(s.coupons);
  const avail = all.filter(([, c]) => !c.used);
  const used = all.filter(([, c]) => c.used);
  const list = tab === 'disp' ? avail : used;
  return (
    <>
      <ScreenTitle>Cupons</ScreenTitle>
      <View style={m.segment}>
        {([['disp', `Disponíveis (${avail.length})`], ['used', `Usados (${used.length})`]] as const).map(([k, label]) => (
          <Pressable key={k} accessibilityRole="tab" accessibilityState={{ selected: tab === k }}
            style={[m.segItem, tab === k && m.segOn]} onPress={() => setCouponTab(k)}>
            <Text style={m.segText}>{label}</Text>
          </Pressable>
        ))}
      </View>
      <DemoBanner text="Cupons de demonstração: códigos e QR são ilustrativos. Em produção, o servidor gera e valida cada cupom (uso único)." />
      {list.length === 0 ? (
        <Card style={{ alignItems: 'center', paddingVertical: 28 }}>
          <Icon name="ticket-outline" size={40} color={C.muted} />
          <Text style={[m.placeName, { marginTop: 10, textAlign: 'center' }]}>
            {tab === 'disp' ? 'Nenhum cupom disponível' : 'Nenhum cupom usado ainda'}
          </Text>
          <Text style={[m.placeDetail, { textAlign: 'center' }]}>
            {tab === 'disp' ? 'Abra um estande com oferta ativa e resgate o seu.' : 'Os cupons validados no estande aparecem aqui.'}
          </Text>
          {tab === 'disp' ? <Button kind="light" label="Ver ofertas perto de mim" onPress={() => setTab('Perto')} /> : null}
        </Card>
      ) : null}
      {list.map(([standId, c]) => {
        const st = getStand(standId);
        if (!st?.offer) return null;
        return (
          <View key={standId} style={[m.coupon, c.used && { opacity: 0.85 }]}>
            <View style={[m.couponHead, c.used && { backgroundColor: C.muted }]}>
              <Text style={m.couponLocation}>Estande {st.id} · {st.name}</Text>
              <Pill label={c.used ? 'Usado' : `Válido até ${st.offer.until}`} tone="dark" />
            </View>
            <Text style={[m.couponTitle, c.used && { backgroundColor: C.muted }]}>{st.offer.title}</Text>
            <View style={m.couponBody}>
              <PseudoQr code={c.code} faded={c.used} />
              <View style={{ flex: 1 }}>
                <Text style={m.couponCodeLabel}>Código</Text>
                <Text style={m.couponCode}>{c.code}</Text>
                <Text style={m.placeDetail}>{c.used ? `Usado às ${fmtTime(c.usedAt ?? c.redeemedAt)}.` : 'Mostre ao expositor. Uso único.'}</Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 18, paddingBottom: 18 }}>
              {c.used ? null : <Button kind="light" label="Simular validação no estande" onPress={() => markUsed(standId)} />}
              <Button kind="ghost" label="Ver estande" onPress={() => openStand(standId)} />
            </View>
          </View>
        );
      })}
    </>
  );
}

/* ───────── Perfil ───────── */
function Profile() {
  const { s, go, openAccount, openStand, setPref, toggleInterest, cycleMute, saveUser, resetAll, toggleFavAct } = useStore();
  const [edit, setEdit] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [del, setDel] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const initials = s.user ? s.user.name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('') : '?';
  const favCount = s.favStands.length + s.favActs.length;
  const permLabel = { unset: 'Não solicitada', granted: 'Concedida', denied: 'Negada', demo: 'Simulada' } as const;
  const permRows = [
    ['bluetooth', 'Bluetooth', 'bluetooth'], ['location', 'Localização', 'location'], ['notifications', 'Notificações', 'notifications'],
  ] as const;

  return (
    <>
      <ScreenTitle>Perfil</ScreenTitle>
      <Card style={[m.rowCard, { marginTop: 0 }]}>
        <View style={m.avatar}>{s.user ? <Text style={m.avatarText}>{initials}</Text> : <Icon name="person" size={32} color="#fff" />}</View>
        <View style={{ flex: 1 }}>
          <Text style={m.placeName}>{s.user ? s.user.name : 'Convidado'}</Text>
          <Text style={m.placeDetail}>{s.user ? s.user.email : 'Crie uma conta para guardar cupons'}</Text>
        </View>
        {s.user
          ? <Pressable accessibilityRole="button" hitSlop={8} onPress={() => { setName(s.user!.name); setEmail(s.user!.email); setEdit(true); }}><Text style={m.link}>Editar</Text></Pressable>
          : <Pressable accessibilityRole="button" hitSlop={8} onPress={() => openAccount('main')}><Text style={m.link}>Criar conta</Text></Pressable>}
      </Card>

      <Text style={m.group}>PERMISSÕES</Text>
      <Card style={{ paddingVertical: 4 }}>
        {permRows.map(([k, label, icon], i) => (
          <View key={k} style={[m.setting, i < 2 && m.settingLine]}>
            <Icon name={icon} size={22} color={C.blue} />
            <Text style={[m.settingTitle, { flex: 1 }]}>{label}</Text>
            <Pill label={permLabel[s.perms[k]]} tone={s.perms[k] === 'granted' ? 'green' : s.perms[k] === 'denied' ? 'orange' : 'cream'} />
          </View>
        ))}
        {Platform.OS !== 'web' ? <Button kind="light" label="Abrir configurações do sistema" onPress={() => Linking.openSettings()} /> : null}
        <View style={{ height: 12 }} />
      </Card>

      <Text style={m.group}>NOTIFICAÇÕES</Text>
      <Card style={{ padding: 0 }}>
        <ToggleRow title="Ofertas e cupons" detail="Quando você passa perto de um estande" value={s.prefs.offers} onChange={(v) => setPref('offers', v)} />
        <View style={m.hr} />
        <ToggleRow title="Programação" detail="Lembretes de palestras e oficinas" value={s.prefs.schedule} onChange={(v) => setPref('schedule', v)} />
        <View style={m.hr} />
        <ToggleRow title="Buscar em segundo plano" detail="Com o app fechado. Gasta mais bateria." value={s.prefs.background} onChange={(v) => setPref('background', v)} />
        <View style={m.hr} />
        <Pressable accessibilityRole="button" onPress={cycleMute} style={[m.setting, { padding: 16 }]}>
          <Text style={[m.settingTitle, { flex: 1 }]}>Silenciar por um período</Text>
          <Text style={m.link}>{MUTE_OPTIONS[s.mute]}</Text>
        </Pressable>
      </Card>
      <Text style={m.footnote}>Preferências salvas neste aparelho. Ainda não controlam notificações reais.</Text>

      <Text style={m.group}>MEUS INTERESSES</Text>
      <View style={m.chips}>
        {INTERESTS.map((i) => <Chip key={i} label={i} selected={s.interests.includes(i)} onPress={() => toggleInterest(i)} />)}
      </View>

      <Text style={m.group}>FAVORITOS ({favCount})</Text>
      {favCount === 0 ? <Text style={m.placeDetail}>Toque no coração em um estande ou atividade para salvar aqui.</Text> : null}
      <View style={{ gap: 10, marginTop: 10 }}>
        {s.favStands.map((id) => {
          const st = getStand(id);
          return st ? (
            <Card key={id} onPress={() => openStand(id)} label={st.name} style={[m.rowCard, { marginTop: 0 }]}>
              <View style={[m.badge, { backgroundColor: C.orangeSoft }]}><Text style={[m.badgeText, { color: C.orange }]}>{st.id}</Text></View>
              <View style={{ flex: 1 }}><Text style={m.placeName}>{st.name}</Text><Text style={m.placeDetail}>Estande {st.id} · {st.category}</Text></View>
              <Icon name="chevron-forward" size={22} color={C.muted} />
            </Card>
          ) : null;
        })}
        {s.favActs.map((id) => {
          const a = getActivity(id);
          return a ? (
            <Card key={id} style={[m.rowCard, { marginTop: 0 }]}>
              <View style={[m.badge, { backgroundColor: C.greenSoft }]}><Icon name="calendar" size={22} color={C.green} /></View>
              <View style={{ flex: 1 }}><Text style={m.placeName}>{a.title}</Text><Text style={m.placeDetail}>Dia {a.day} · {a.start} às {a.end}</Text></View>
              <Pressable accessibilityRole="button" accessibilityLabel="Remover dos favoritos" onPress={() => toggleFavAct(id)} hitSlop={8}>
                <Icon name="heart" size={24} color="#EE4D58" />
              </Pressable>
            </Card>
          ) : null;
        })}
      </View>

      <View style={m.footer}>
        <Pressable accessibilityRole="link" onPress={() => setPrivacy(true)}><Text style={m.muted}>Política de privacidade</Text></Pressable>
        <Pressable accessibilityRole="button" onPress={() => setDel(true)}><Text style={m.danger}>Excluir minha conta</Text></Pressable>
      </View>
      <Pressable accessibilityRole="button" onPress={() => go('intro')} style={{ marginTop: 18 }}><Text style={m.muted}>Rever a introdução</Text></Pressable>

      <Sheet visible={edit} onClose={() => setEdit(false)} title="Editar perfil">
        <Field label="Nome" value={name} onChangeText={setName} />
        <Field label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Button label="Salvar" disabled={name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())}
          onPress={() => { saveUser(name.trim(), email.trim().toLowerCase()); setEdit(false); }} />
      </Sheet>
      <Sheet visible={privacy} onClose={() => setPrivacy(false)} title="Política de privacidade">
        <PrivacyText />
        <Button label="Entendi" onPress={() => setPrivacy(false)} />
      </Sheet>
      <Sheet visible={del} onClose={() => setDel(false)} title="Excluir minha conta?">
        <Text style={{ color: C.muted, fontSize: 16, lineHeight: 23, marginTop: 6 }}>
          Isso apaga neste aparelho seus dados, favoritos, cupons e preferências, e volta para a tela inicial.
        </Text>
        <Button kind="danger" label="Sim, excluir tudo" onPress={() => { setDel(false); resetAll(); }} />
        <Button kind="ghost" label="Cancelar" onPress={() => setDel(false)} />
      </Sheet>
    </>
  );
}

/* ───────── Estrutura com abas ───────── */
export function MainShell() {
  const { nav, setTab } = useStore();
  const content = nav.tab === 'Perto' ? <Nearby /> : nav.tab === 'Mapa' ? <MapScreen /> : nav.tab === 'Programação' ? <Schedule />
    : nav.tab === 'Cupons' ? <Coupons /> : <Profile />;
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView key={nav.tab} contentContainerStyle={m.main} keyboardShouldPersistTaps="handled">{content}</ScrollView>
      </SafeAreaView>
      <TabBar tab={nav.tab} setTab={setTab} />
    </View>
  );
}

const m = StyleSheet.create({
  main: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 28 },
  event: { color: C.muted, fontSize: 15, fontWeight: '600' },
  titleLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  offer: { backgroundColor: C.blue, borderRadius: 30, padding: 22, marginTop: 14 },
  offerState: { color: C.yellow, fontSize: 15, fontWeight: '800' },
  offerTitle: { color: '#fff', fontWeight: '800', fontSize: 31, marginTop: 18 },
  offerText: { color: '#fff', fontSize: 17, lineHeight: 25, marginTop: 8 },
  offerButton: { backgroundColor: '#fff', minHeight: 56, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginTop: 22 },
  offerButtonText: { color: C.blue, fontSize: 17, fontWeight: '800' },
  sectionTitle: { color: C.text, fontSize: 24, fontWeight: '800' },
  sectionCount: { color: C.muted, fontSize: 16, fontWeight: '700' },
  nearRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14 },
  nearIcon: { width: 56, height: 56, borderRadius: 18, backgroundColor: C.blueSoft, alignItems: 'center', justifyContent: 'center' },
  nearZone: { color: C.blue, fontWeight: '800', fontSize: 15 },
  placeName: { color: C.text, fontSize: 17.5, fontWeight: '800' },
  placeDetail: { color: C.muted, fontSize: 14.5, lineHeight: 20, marginTop: 3 },
  footnote: { color: C.muted, fontSize: 12.5, lineHeight: 18, marginTop: 16, fontStyle: 'italic' },
  link: { color: C.blue, fontSize: 16, fontWeight: '800' },
  muted: { color: C.muted, fontSize: 14.5, fontWeight: '600' },
  search: { borderWidth: 1, borderColor: C.line, backgroundColor: '#fff', borderRadius: 30, flexDirection: 'row', gap: 10, alignItems: 'center', paddingLeft: 18, minHeight: 56, marginBottom: 14, overflow: 'hidden' },
  searchInput: { flex: 1, minHeight: 54, color: C.text, fontSize: 17, paddingRight: 16 },
  chips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 2 },
  floor: { aspectRatio: 0.95, padding: 0, marginTop: 14, overflow: 'hidden', backgroundColor: '#FBFAF6' },
  point: { position: 'absolute', borderWidth: 1, borderRadius: 14, alignItems: 'center', justifyContent: 'center', padding: 3 },
  pointChosen: { backgroundColor: C.yellow, borderColor: '#E1B62F', borderWidth: 3 },
  pointLabel: { fontSize: 16, fontWeight: '800', textAlign: 'center' },
  pointName: { fontSize: 10.5, fontWeight: '700', textAlign: 'center', marginTop: 1 },
  here: { position: 'absolute', top: 10, left: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: C.line, borderRadius: 20, paddingHorizontal: 11, paddingVertical: 6 },
  hereText: { color: C.text, fontSize: 12.5, fontWeight: '800' },
  you: { position: 'absolute', left: '50%', top: '59%', width: 44, height: 44, marginLeft: -22, marginTop: -22, borderRadius: 22, backgroundColor: 'rgba(37,84,217,0.22)', alignItems: 'center', justifyContent: 'center' },
  youDot: { width: 22, height: 22, borderRadius: 11, backgroundColor: C.blue, borderWidth: 3, borderColor: '#fff' },
  entrance: { position: 'absolute', bottom: 8, alignSelf: 'center', color: '#fff', backgroundColor: C.text, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 14, fontWeight: '800', fontSize: 12, overflow: 'hidden' },
  rowCard: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  badge: { width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: C.yellow, paddingHorizontal: 4 },
  badgeText: { color: C.yellowText, fontSize: 18, fontWeight: '800' },
  days: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  day: { flex: 1, borderColor: C.line, borderWidth: 1, borderRadius: 22, minHeight: 88, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  dayOn: { backgroundColor: C.blue, borderColor: C.blue },
  dayText: { color: C.muted, fontSize: 14, fontWeight: '800' },
  dayNum: { color: C.text, fontSize: 26, fontWeight: '800' },
  live: { color: C.green, fontWeight: '800', fontSize: 13.5 },
  talkTime: { color: C.blue, fontSize: 14.5, fontWeight: '800' },
  talkTitle: { color: C.text, fontSize: 22, fontWeight: '800', marginTop: 8 },
  talkDetail: { color: C.muted, fontSize: 15.5, lineHeight: 22, marginTop: 4 },
  actRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, gap: 10 },
  reminder: { backgroundColor: C.blueSoft, borderRadius: 22, paddingVertical: 11, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  reminderText: { color: C.blue, fontSize: 15, fontWeight: '800' },
  segment: { flexDirection: 'row', backgroundColor: C.creamDark, borderRadius: 20, padding: 6, marginBottom: 12 },
  segItem: { flex: 1, alignItems: 'center', padding: 13, borderRadius: 15 },
  segOn: { backgroundColor: '#fff', boxShadow: '0 2px 6px rgba(81,79,73,0.12)' },
  segText: { color: C.text, fontSize: 15, fontWeight: '800' },
  coupon: { overflow: 'hidden', backgroundColor: '#fff', borderRadius: 28, marginTop: 14, borderWidth: 1, borderColor: C.line },
  couponHead: { backgroundColor: C.blue, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  couponLocation: { color: '#fff', fontWeight: '800', fontSize: 14, flex: 1 },
  couponTitle: { backgroundColor: C.blue, color: '#fff', fontSize: 23, lineHeight: 29, fontWeight: '800', paddingHorizontal: 18, paddingBottom: 22 },
  couponBody: { flexDirection: 'row', gap: 18, padding: 18, alignItems: 'center' },
  couponCodeLabel: { color: C.muted, fontSize: 15 },
  couponCode: { color: C.text, fontWeight: '900', fontSize: 26, letterSpacing: 1, marginVertical: 4 },
  avatar: { height: 68, width: 68, borderRadius: 34, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 25, fontWeight: '800' },
  group: { color: C.muted, fontWeight: '800', fontSize: 14, letterSpacing: 0.6, marginTop: 26 },
  setting: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, paddingHorizontal: 4 },
  settingLine: { borderBottomWidth: 1, borderBottomColor: C.line },
  settingTitle: { color: C.text, fontSize: 17, fontWeight: '800' },
  hr: { height: 1, backgroundColor: C.line },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 28, alignItems: 'center' },
  danger: { color: C.red, fontWeight: '800', fontSize: 15 },
});

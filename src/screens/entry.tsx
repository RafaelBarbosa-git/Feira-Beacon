import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C } from '../theme';
import { useStore, PermKind } from '../store';
import { Button, Card, Field, Icon, Pill, ToggleRow, Sheet } from '../ui';
import { PrivacyText } from './shared';

function Progress({ step }: { step: 0 | 1 | 2 }) {
  return (
    <View style={e.progress} accessibilityLabel={`Passo ${step + 1} de 3`}>
      {[0, 1, 2].map((i) => <View key={i} style={i === step ? e.progressActive : e.progressDot} />)}
    </View>
  );
}

function Back({ onPress }: { onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onPress} style={e.back} hitSlop={10}>
      <Icon name="chevron-back" size={32} />
    </Pressable>
  );
}

export function Intro() {
  const { go, openAccount } = useStore();
  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: C.blue }}>
      <View style={e.introTop}>
        <Pill label="Expo Inova CG 2026 · 20 a 22 nov" tone="dark" />
        <View style={e.rings} pointerEvents="none">
          <View style={[e.ring, { width: 470, height: 470, borderRadius: 235 }]}>
            <View style={[e.ring, { width: 330, height: 330, borderRadius: 165 }]}>
              <View style={[e.ring, { width: 180, height: 180, borderRadius: 90 }]}>
                <View style={e.dot} />
              </View>
            </View>
          </View>
        </View>
        <View style={[e.beacon, { top: '40%', right: 20 }]}><Text style={e.beaconText}>● Estande 12 · Immediate</Text></View>
        <View style={[e.beacon, { top: '66%', left: 20 }]}><Text style={e.beaconText}>● Palco Principal · Near</Text></View>
      </View>
      <View style={e.introSheet}>
        <Progress step={0} />
        <Text accessibilityRole="header" style={e.hero}>{'Cada estande, no\nmomento certo.'}</Text>
        <Text style={e.lead}>O FeiraBeacon mostra ofertas, palestras e o caminho até elas conforme você caminha pela feira.</Text>
        <Button label="Começar" onPress={() => go('permissions')} />
        <Button label="Já tenho conta" kind="ghost" onPress={() => openAccount('intro')} />
      </View>
    </SafeAreaView>
  );
}

export function Permissions() {
  const { go, openAccount, requestPermissions } = useStore();
  const [on, setOn] = useState<Record<PermKind, boolean>>({ bluetooth: true, location: true, notifications: true });
  const [busy, setBusy] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const allow = async () => {
    setBusy(true);
    const kinds = (Object.keys(on) as PermKind[]).filter((k) => on[k]);
    await requestPermissions(kinds);
    setBusy(false);
    openAccount('permissions');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={e.safe}>
      <ScrollView contentContainerStyle={e.content}>
        <Back onPress={() => go('intro')} />
        <Progress step={1} />
        <Text accessibilityRole="header" style={e.title}>Para encontrar o que está perto de você</Text>
        <Text style={e.lead}>Precisamos de três permissões. Você pode mudar qualquer uma depois, em Perfil.</Text>
        <Card style={{ padding: 0 }}>
          <ToggleRow icon="bluetooth" title="Bluetooth" detail="Para detectar os beacons dos estandes e palcos ao seu redor." value={on.bluetooth} onChange={(v) => setOn({ ...on, bluetooth: v })} />
        </Card>
        <Card style={{ padding: 0 }}>
          <ToggleRow icon="location" title="Localização" detail="O Android exige para buscar beacons. Não guardamos o seu trajeto." value={on.location} onChange={(v) => setOn({ ...on, location: v })} />
        </Card>
        <Card style={{ padding: 0 }}>
          <ToggleRow icon="notifications" title="Notificações" detail="Avisos de ofertas e palestras perto de você. No máximo 4 por hora." value={on.notifications} onChange={(v) => setOn({ ...on, notifications: v })} />
        </Card>
        {Platform.OS !== 'android' && (
          <Text style={e.note}>Neste navegador/aparelho a solicitação é simulada. No Android, o sistema mostra o pedido real de permissão.</Text>
        )}
        <Text style={e.privacy}>
          Os expositores veem apenas números agregados, nunca quem é você.{' '}
          <Text style={e.link} onPress={() => setPrivacy(true)} accessibilityRole="link">Política de privacidade</Text>
        </Text>
        <Button label={busy ? 'Solicitando…' : 'Permitir e continuar'} onPress={allow} disabled={busy} />
        <Button label="Agora não" kind="ghost" onPress={() => openAccount('permissions')} />
      </ScrollView>
      <Sheet visible={privacy} onClose={() => setPrivacy(false)} title="Política de privacidade">
        <PrivacyText />
        <Button label="Entendi" onPress={() => setPrivacy(false)} />
      </Sheet>
    </SafeAreaView>
  );
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function Account() {
  const { s, nav, go, saveUser, continueAsGuest } = useStore();
  const [mode, setMode] = useState<'create' | 'login'>('create');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accept, setAccept] = useState(false);
  const [tried, setTried] = useState(false);
  const create = mode === 'create';

  const errors = {
    name: create && name.trim().length < 2 ? 'Informe seu nome.' : '',
    email: emailOk(email) ? '' : 'Informe um e-mail válido.',
    password: password.length >= 8 ? '' : 'A senha precisa de pelo menos 8 caracteres.',
    accept: create && !accept ? 'É preciso aceitar a política de privacidade.' : '',
  };
  const valid = !errors.name && !errors.email && !errors.password && !errors.accept;

  const submit = () => {
    setTried(true);
    if (!valid) return;
    const clean = email.trim().toLowerCase();
    const fallback = s.user && s.user.email === clean ? s.user.name : clean.split('@')[0];
    saveUser(create ? name.trim() : fallback, clean);
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={e.safe}>
      <ScrollView contentContainerStyle={e.content} keyboardShouldPersistTaps="handled">
        <Back onPress={() => go(nav.accountBack)} />
        <Progress step={2} />
        <Text accessibilityRole="header" style={e.title}>{create ? 'Crie sua conta' : 'Entre na sua conta'}</Text>
        <Text style={e.lead}>Com conta você guarda favoritos e resgata cupons. Sem conta, só recebe o conteúdo por proximidade.</Text>
        <View style={e.segment}>
          {(['create', 'login'] as const).map((m) => (
            <Pressable key={m} accessibilityRole="tab" accessibilityState={{ selected: mode === m }}
              style={[e.segmentItem, mode === m && e.segmentOn]} onPress={() => { setMode(m); setTried(false); }}>
              <Text style={e.segmentText}>{m === 'create' ? 'Criar conta' : 'Entrar'}</Text>
            </Pressable>
          ))}
        </View>
        {create && <Field label="Nome" value={name} onChangeText={setName} autoComplete="name" placeholder="Seu nome" error={tried ? errors.name : ''} />}
        <Field label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" placeholder="voce@email.com" error={tried ? errors.email : ''} />
        <Field label="Senha" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" placeholder="Mínimo de 8 caracteres" error={tried ? errors.password : ''} />
        {create && (
          <>
            <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: accept }} onPress={() => setAccept(!accept)} style={e.accept}>
              <View style={[e.check, accept && { backgroundColor: C.blue, borderColor: C.blue }]}>
                {accept ? <Icon name="checkmark" size={18} color="#fff" /> : null}
              </View>
              <Text style={e.acceptText}>Li e aceito a política de privacidade e o uso do Bluetooth e da localização apenas durante o evento.</Text>
            </Pressable>
            {tried && errors.accept ? <Text style={e.err}>{errors.accept}</Text> : null}
          </>
        )}
        <Text style={e.note}>Demonstração: não há servidor. Seu nome e e-mail ficam só neste aparelho; a senha não é armazenada nem verificada.</Text>
        <Button label={create ? 'Criar conta' : 'Entrar'} onPress={submit} />
        <Button label="Continuar como convidado" kind="ghost" onPress={continueAsGuest} />
      </ScrollView>
    </SafeAreaView>
  );
}

const e = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.cream },
  content: { padding: 24, paddingTop: 12, paddingBottom: 40 },
  introTop: { flex: 1.1, backgroundColor: C.blue, padding: 24, overflow: 'hidden' },
  rings: { position: 'absolute', top: 70, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  ring: { borderWidth: 2, borderColor: '#6E8AEB', alignItems: 'center', justifyContent: 'center' },
  dot: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#fff' },
  beacon: { position: 'absolute', backgroundColor: '#fff', borderRadius: 99, paddingHorizontal: 16, paddingVertical: 11 },
  beaconText: { color: C.text, fontWeight: '700', fontSize: 14 },
  introSheet: { backgroundColor: C.cream, marginTop: -36, borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 24, paddingBottom: 28 },
  progress: { flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  progressActive: { width: 50, height: 8, backgroundColor: C.blue, borderRadius: 8 },
  progressDot: { width: 10, height: 10, backgroundColor: '#D3D0C7', borderRadius: 5 },
  hero: { color: C.text, fontSize: 36, lineHeight: 42, fontWeight: '800', letterSpacing: -1 },
  lead: { color: C.muted, fontSize: 17, lineHeight: 25, marginTop: 14 },
  title: { color: C.text, fontWeight: '800', fontSize: 33, lineHeight: 39, letterSpacing: -1 },
  back: { width: 44, height: 44, justifyContent: 'center', marginBottom: 6 },
  note: { color: C.muted, fontSize: 13.5, lineHeight: 19, marginTop: 16, fontStyle: 'italic' },
  privacy: { color: C.muted, fontSize: 14, lineHeight: 21, marginTop: 18 },
  link: { color: C.blue, fontWeight: '800' },
  segment: { flexDirection: 'row', backgroundColor: C.creamDark, borderRadius: 20, padding: 6, marginTop: 22 },
  segmentItem: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 15 },
  segmentOn: { backgroundColor: '#fff', boxShadow: '0 2px 6px rgba(81,79,73,0.12)' },
  segmentText: { color: C.text, fontSize: 16, fontWeight: '800' },
  accept: { flexDirection: 'row', gap: 12, marginTop: 20, alignItems: 'flex-start' },
  check: { width: 28, height: 28, borderRadius: 8, borderWidth: 2, borderColor: '#B9B5A8', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  acceptText: { flex: 1, color: C.muted, fontSize: 15, lineHeight: 22 },
  err: { color: C.red, fontSize: 13.5, marginTop: 6, fontWeight: '600' },
});

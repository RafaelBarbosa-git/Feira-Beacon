import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C } from '../theme';
import { fmtTime, useStore } from '../store';
import { getStand } from '../data';
import { Button, Card, Icon, Pill } from '../ui';

export function StandScreen() {
  const { s, nav, go, setTab, openAccount, toggleFavStand, redeem, checkin } = useStore();
  const [msg, setMsg] = useState('');
  const st = getStand(nav.standId);
  if (!st) return null;
  const fav = s.favStands.includes(st.id);
  const coupon = s.coupons[st.id];
  const when = s.checkins[st.id];
  const offer = st.offer;

  const doRedeem = () => {
    if (!offer) return;
    const r = redeem(st.id, offer.prefix);
    setMsg(r === 'needs-account' ? 'Para resgatar cupons é preciso ter uma conta. Você está como convidado.' : '');
  };

  return (
    <View style={{ flex: 1, backgroundColor: st.color }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }} style={{ backgroundColor: C.cream }}>
          <View style={[x.hero, { backgroundColor: st.color }]}>
            <View style={x.heroBar}>
              <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={() => go('main')} style={x.round}>
                <Icon name="chevron-back" size={28} />
              </Pressable>
              <Pressable accessibilityRole="button" accessibilityLabel={fav ? 'Remover dos favoritos' : 'Favoritar estande'} onPress={() => toggleFavStand(st.id)} style={x.round}>
                <Icon name={fav ? 'heart' : 'heart-outline'} size={26} color="#EE4D58" />
              </Pressable>
            </View>
            <View style={x.heroIcon}><Icon name={st.icon} size={72} color="rgba(255,255,255,0.9)" /></View>
          </View>
          <View style={x.sheet}>
            <View style={x.pills}>
              <Pill label={`Estande ${st.id}`} />
              <Pill label={st.category} tone="cream" />
              <Pill label="Aqui perto" tone="green" />
            </View>
            <Text accessibilityRole="header" style={x.title}>{st.name}</Text>
            <Text style={x.lead}>{st.description}</Text>

            {offer ? (
              <Card style={{ padding: 20 }}>
                <View style={x.between}>
                  <Text style={x.activeOffer}>OFERTA ATIVA</Text>
                  <Text style={x.until}>até {offer.until} · restam {offer.remaining - (coupon ? 1 : 0)}</Text>
                </View>
                <Text style={x.offerTitle}>{offer.title}</Text>
                <Text style={x.detail}>{coupon ? 'Cupom salvo na sua carteira. Mostre o código no balcão.' : 'Resgate agora e mostre o código no balcão.'}</Text>
                {coupon ? (
                  <>
                    <View style={x.code}><Text style={x.codeText}>{coupon.code}</Text></View>
                    <Button label="Ver na carteira de cupons" kind="light" onPress={() => setTab('Cupons')} />
                  </>
                ) : (
                  <Button label="Resgatar cupom" onPress={doRedeem} />
                )}
                {msg ? (
                  <View style={{ marginTop: 6 }}>
                    <Text style={x.warn}>{msg}</Text>
                    <Button kind="light" label="Criar conta" onPress={() => openAccount('main')} />
                  </View>
                ) : null}
              </Card>
            ) : (
              <Card><Text style={x.detail}>Este estande não tem oferta ativa no momento.</Text></Card>
            )}

            <View style={x.infoRow}>
              <Card style={{ flex: 1 }}><Text style={x.infoLabel}>Horário</Text><Text style={x.infoValue}>{st.hours}</Text></Card>
              <Card style={{ flex: 1 }}><Text style={x.infoLabel}>Localização</Text><Text style={x.infoValue}>{st.corridor}</Text></Card>
            </View>

            {when ? (
              <View style={x.checkin}>
                <Text style={x.checkinTitle}>✓  Check-in simulado às {fmtTime(when)}</Text>
                <Text style={x.checkinDetail}>Demonstração: na versão real, o check-in só é registrado após permanência perto do beacon.</Text>
              </View>
            ) : (
              <>
                <Button kind="light" icon="checkmark-circle-outline" label="Simular check-in" onPress={() => checkin(st.id)} />
                <Text style={x.hint}>Na versão real, o check-in é registrado automaticamente após alguns segundos perto do estande.</Text>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const x = StyleSheet.create({
  hero: { height: 240, padding: 20 },
  heroBar: { flexDirection: 'row', justifyContent: 'space-between' },
  heroIcon: { position: 'absolute', bottom: 64, alignSelf: 'center' },
  round: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  sheet: { backgroundColor: C.cream, marginTop: -34, borderTopLeftRadius: 36, borderTopRightRadius: 36, padding: 20, minHeight: 560 },
  pills: { flexDirection: 'row', gap: 7, flexWrap: 'wrap' },
  title: { color: C.text, fontWeight: '800', fontSize: 34, letterSpacing: -1, marginTop: 14 },
  lead: { color: C.muted, fontSize: 17, lineHeight: 25, marginTop: 8 },
  between: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  activeOffer: { color: C.orange, fontSize: 14, fontWeight: '900' },
  until: { color: C.muted, fontWeight: '700', fontSize: 13.5 },
  offerTitle: { color: C.text, fontSize: 24, lineHeight: 30, fontWeight: '800', marginTop: 12 },
  detail: { color: C.muted, fontSize: 15.5, lineHeight: 22, marginTop: 6 },
  code: { backgroundColor: C.blueSoft, borderRadius: 18, paddingVertical: 14, alignItems: 'center', marginTop: 14 },
  codeText: { color: C.blue, fontSize: 28, fontWeight: '900', letterSpacing: 2 },
  warn: { color: C.orange, fontSize: 14.5, lineHeight: 20, fontWeight: '700', marginTop: 10 },
  infoRow: { flexDirection: 'row', gap: 12 },
  infoLabel: { color: C.muted, fontSize: 14, fontWeight: '700' },
  infoValue: { color: C.text, fontSize: 21, fontWeight: '800', marginTop: 6 },
  checkin: { backgroundColor: C.blueSoft, borderRadius: 22, padding: 18, marginTop: 16 },
  checkinTitle: { color: C.blue, fontSize: 17, fontWeight: '800' },
  checkinDetail: { color: '#506086', fontSize: 14.5, lineHeight: 20, marginTop: 4 },
  hint: { color: C.muted, fontSize: 12.5, lineHeight: 18, marginTop: 8, fontStyle: 'italic', textAlign: 'center' },
});

import React from 'react';
import { Text, View } from 'react-native';
import { C } from '../theme';
import { Icon } from '../ui';

const items = [
  'Bluetooth e localização são usados apenas durante o evento, para estimar sua proximidade dos estandes.',
  'O seu trajeto detalhado não é guardado.',
  'Expositores veem apenas números agregados e anônimos, nunca quem você é.',
  'Você pode revogar permissões em Perfil e excluir sua conta e seus dados a qualquer momento.',
];

export function PrivacyText() {
  return (
    <View style={{ marginTop: 8 }}>
      {items.map((t) => (
        <View key={t} style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
          <Icon name="shield-checkmark-outline" size={20} color={C.green} />
          <Text style={{ flex: 1, color: C.text, fontSize: 15.5, lineHeight: 22 }}>{t}</Text>
        </View>
      ))}
      <Text style={{ color: C.muted, fontSize: 13, lineHeight: 19, marginTop: 16, fontStyle: 'italic' }}>
        Resumo de demonstração. O texto jurídico final da política (LGPD) ainda precisa ser validado pela organização.
      </Text>
    </View>
  );
}

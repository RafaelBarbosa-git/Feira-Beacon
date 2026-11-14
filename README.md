# FeiraBeacon

Aplicativo móvel React Native com Expo para visitantes da Expo Inova CG. Escopo inicial implementa navegação e telas do visitante conforme documentos de requisitos e protótipo.

## Rodar

```bash
npm install
npx expo start
```

Use Expo Go para abrir o app. A integração real com iBeacon requer módulo nativo BLE e execução em development build Android; Expo Go não realiza varredura iBeacon.

## Escopo confirmado nos protótipos

As páginas 1–10 do protótipo são do aplicativo móvel do visitante. As páginas 11–15 representam o painel web do expositor e as páginas 16–20, o painel web da organização. A análise visual completa está em [`docs/ANALISE_VISUAL.md`](docs/ANALISE_VISUAL.md).

## Estado e retomada

- `App.tsx`: protótipo navegável local, conteúdo de demonstração.
- Onboarding, proximidade, mapa esquemático, programação, cupons e perfil estão cobertos visualmente.
- Não há backend, autenticação, persistência, notificação real, mapa georreferenciado ou BLE real ainda.
- Próximos passos: conferir todas as RF/RNF contra os PDFs, implementar BLE Android em development build, persistência/backend, tratamento de permissões e testes em aparelho.
- Painéis do expositor e organizador aparecem nos documentos, mas são web e não estão incluídos neste app móvel.

## Decisões

App em português, modo convidado por padrão, interface demonstrativa com dados fictícios. Não afirmar rastreamento preciso: iBeacon estima proximidade por RSSI. Notificações respeitam limite especificado de quatro por hora e intervalo de 30 minutos por beacon (ainda não implementado).

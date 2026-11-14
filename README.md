# FeiraBeacon

Aplicativo móvel em **React Native com Expo** para visitantes da **Expo Inova CG**. Ele mostra ofertas, palestras e o caminho até elas conforme a pessoa caminha pela feira.

Este repositório contém o **aplicativo do visitante**, em versão de **protótipo funcional com dados de demonstração** (fictícios).

## Como rodar

Requisitos: Node.js LTS (20 ou 22) e o app **Expo Go** no celular (atualizado, compatível com Expo SDK 54).

```bash
npm install
npx expo start -c
```

Depois:

- **Celular (Android):** escaneie o QR code com o Expo Go. Celular e computador devem estar na mesma rede Wi-Fi. Se não conectar, use `npx expo start --tunnel -c`.
- **Computador:** aperte `w` no terminal para abrir no navegador. O app aparece como uma coluna central do tamanho de um celular.
- **Verificar tipos:** `npm run typecheck`.

> A leitura real de iBeacon exige módulo nativo BLE e *development build* Android. O Expo Go não faz varredura iBeacon.

## O que o app faz

| Área | O que funciona hoje |
| --- | --- |
| Introdução | Apresentação em 3 passos. |
| Permissões | Bluetooth, localização e notificações. No Android, o sistema mostra o pedido real; na web e no iOS é simulado. |
| Conta ou convidado | Formulário com validação (nome, e-mail, senha de 8+ caracteres e aceite da política). Sem servidor: a senha não é armazenada nem verificada. |
| Perto de você | Oferta em destaque e pontos próximos (simulados), com acesso ao estande, à programação e ao mapa. |
| Mapa | Planta esquemática com busca, filtros (Estandes, Palcos, Serviços), ponto selecionado e posição ilustrativa. |
| Programação | Seleção de dia e de palco, lembretes, favoritos e "Como chegar" (abre o mapa). |
| Estande | Detalhes, favorito, resgate de cupom (exige conta) e check-in simulado. |
| Cupons | Carteira com abas Disponíveis e Usados, código e QR ilustrativos e simulação de validação no estande. |
| Perfil | Edição de dados, status das permissões, preferências de notificação, interesses, favoritos, política de privacidade e exclusão de conta. |

Favoritos, cupons, lembretes, preferências, interesses e dados da conta ficam **salvos no aparelho** (AsyncStorage).

## Limites (o que ainda é demonstração)

Para não confundir demonstração com funcionalidade real, o app mostra avisos de "modo demonstração" e este projeto **não afirma** o seguinte:

- **Sem backend e sem autenticação real.** Os dados existem só no aparelho.
- **Sem BLE real.** Os pontos "perto de você" são fixos. Proximidade iBeacon é uma **estimativa por RSSI**, não uma posição exata.
- **Sem notificações reais.** Lembretes e preferências são salvos, mas não disparam avisos. O limite de 4 por hora e o intervalo de 30 minutos por beacon ainda não estão implementados.
- **Cupons ilustrativos.** Código e QR são gerados no aparelho e não são válidos. Em produção, o servidor deve gerar e validar cada cupom (uso único).
- **Check-in simulado**, por botão. Na versão real, depende de permanência perto do beacon.
- **Mapa esquemático**, sem coordenadas configuradas pela organização.
- Os **painéis web do expositor e do organizador** aparecem nos documentos e protótipos, mas **não fazem parte** deste aplicativo móvel.

## Estrutura do código

```text
App.tsx                  # entrada: provedores e roteamento entre telas
src/
  theme.ts               # cores e constantes visuais
  data.ts                # dados fictícios (estandes, mapa, programação)
  store.tsx              # estado global, persistência, permissões e navegação
  ui.tsx                 # componentes visuais compartilhados
  screens/
    entry.tsx            # introdução, permissões e conta
    main.tsx             # abas: Perto, Mapa, Programação, Cupons e Perfil
    stand.tsx            # detalhe do estande
    shared.tsx           # texto da política de privacidade
docs/                    # documentação de estado, requisitos e decisões
```

## Decisões

- Aplicativo em português do Brasil.
- Modo convidado permite receber conteúdo por proximidade; favoritos e resgate de cupons exigem conta.
- Dados mostrados a expositores devem ser agregados e anônimos (requisito ainda sem implementação, pois não há painel nem servidor).
- Não afirmar rastreamento preciso.

Mais detalhes em [`docs/DECISIONS.md`](docs/DECISIONS.md).

## Verificações realizadas

- `tsc --noEmit`: sem erros.
- Exportação do bundle web e do bundle Android com Expo: concluída com sucesso.
- **Ainda não registrado:** teste completo em aparelho Android físico com permissões reais.

## Próximos passos

1. Testar em aparelho Android e ajustar o que aparecer.
2. Escolher biblioteca e hardware BLE e validar a leitura de iBeacon em *development build*.
3. Definir backend, autenticação, banco de dados, segurança e LGPD.
4. Implementar notificações reais e geração e validação de cupons no servidor.
5. Desenvolver os painéis web do expositor e do organizador.

## Documentação

Documentos de apoio na pasta `docs/`:

- [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md): estado conhecido do projeto.
- [`docs/REQUIREMENTS_TRACEABILITY.md`](docs/REQUIREMENTS_TRACEABILITY.md): rastreabilidade dos requisitos RF e RNF.
- [`docs/DECISIONS.md`](docs/DECISIONS.md): decisões e questões em aberto.
- [`docs/EXECUTION_LOG.md`](docs/EXECUTION_LOG.md): histórico das etapas e verificações.
- [`docs/ANALISE_VISUAL.md`](docs/ANALISE_VISUAL.md): análise visual dos protótipos.

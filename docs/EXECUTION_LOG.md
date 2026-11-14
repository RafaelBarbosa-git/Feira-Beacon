# Diário de execução

Este arquivo deve ser atualizado em ordem cronológica ao final de cada etapa. Não apague entradas anteriores; corrija-as apenas se houver erro factual, deixando claro que foram corrigidas.

## 14/11/2026 — Auditoria inicial

- Objetivo: comparar o estado público do repositório com o documento de requisitos e preparar a continuidade entre IAs.
- Fontes inspecionadas: `README.md`, `App.tsx`, `docs/ANALISE_VISUAL.md` e Documento de Requisitos de Software (PDF de 14 páginas).
- Resultado: estado atual classificado como protótipo móvel com dados e comportamentos demonstrativos; matriz RF001–RF028 e RNF001–RNF009 criada no kit de continuidade.
- Arquivos do app alterados: nenhum.
- Testes/build: não executados.
- Commit/PR: não criado nesta auditoria.
- Limitação: ambiente da auditoria não disponibilizou ações de escrita no GitHub e não continha uma cópia local do projeto para executar comandos.

## 14/11/2026 — Etapa 2: reescrita do app do visitante (revisão por IA)

- Objetivo: corrigir bugs encontrados na revisão do `App.tsx` e deixar o app consistente em celular (Expo Go) e computador (web).
- Arquivos: `App.tsx` (agora só roteia), `src/theme.ts`, `src/data.ts`, `src/store.tsx`, `src/ui.tsx`, `src/screens/{entry,main,stand,shared}.tsx`, `package.json`, `tsconfig.json`.
- Corrigido: área segura no Android (react-native-safe-area-context); estado global persistente (AsyncStorage) para favoritos, cupons, lembretes, preferências e interesses; switches que resetavam ao trocar de aba; contador de favoritos inconsistente; cupom resgatado agora vai para a carteira; dias, filtros, busca do mapa, abas de cupons e botões do perfil agora funcionam; formulário de conta com validação e sem credenciais pré-preenchidas; checkbox de aceite funcional; ícones vetoriais no lugar de caracteres unicode; botão voltar do Android; layout centralizado (480 px) no computador.
- Honestidade/escopo: faixas "modo demonstração" na interface; check-in e validação de cupom são simulados e rotulados; QR e códigos são ilustrativos; permissões reais só no Android (PermissionsAndroid), simuladas na web/iOS; sem backend, sem BLE, sem notificações reais.
- Comandos executados: `npx tsc --noEmit` (sem erros); `npx expo export --platform web` e `--platform android` (bundles gerados com sucesso); `npx expo install --fix`.
- NÃO executado: teste em aparelho físico, captura de tela/teste visual no navegador, `npm run lint` (não há script).
- Próximo passo: abrir no Expo Go (Android), conferir visualmente cada tela e as permissões reais; depois decidir BLE (development build).

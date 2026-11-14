# AI_HANDOFF — Ponto de retomada do FeiraBeacon

**Última revisão:** 14/11/2026  
**Estado:** auditoria inicial do repositório e dos requisitos concluída; nenhuma alteração de código foi feita nesta auditoria.

## Instrução de retomada

Leia `AGENTS.md`, `README.md`, este arquivo, `PROJECT_STATUS.md`, `REQUIREMENTS_TRACEABILITY.md` e `DECISIONS.md` antes de agir. Use o histórico Git para confirmar se houve commits posteriores a este registro. Se o estado atual divergir destes documentos, confie no código/histórico mais recente, investigue a diferença e atualize a documentação antes de codificar.

## Contexto confirmado

- O repositório é um aplicativo móvel Expo/React Native para o visitante.
- `App.tsx` reúne telas, navegação, componentes e estilos.
- A interface cobre visualmente onboarding, permissões, conta/convidado, proximidade, mapa, programação, cupons, perfil e detalhe de estande.
- Conteúdo é majoritariamente fixo e demonstrativo.
- O README registra ausência de backend, autenticação, persistência, notificações reais, mapa georreferenciado e BLE real.
- Painéis web de expositor/organizador estão fora deste repositório no momento.
- Requisitos funcionais e não funcionais estão detalhados em `REQUIREMENTS_TRACEABILITY.md`.

## Limitações desta auditoria

Não foi executado `npm install`/`npm ci`, typecheck, build, lint ou teste em dispositivo. As versões em `package.json` e a configuração em `app.json` ainda precisam ser lidas diretamente. Não declarar que o projeto compila até executar as verificações.

## Próxima tarefa recomendada — Etapa 1: baseline técnico sem mudar comportamento

1. Obter uma cópia atualizada do repositório `main`.
2. Ler integralmente `package.json`, `app.json`, `.gitignore`, `App.tsx` e `package-lock.json` (não publicar o lock inteiro na conversa).
3. Registrar as versões de Expo/React Native/React/TypeScript e os scripts disponíveis.
4. Executar `npm ci` e os comandos de verificação existentes. Se não houver typecheck/lint/test, apenas registrar; não inventar scripts sem avaliar as versões.
5. Executar `npx expo start` e confirmar se o app abre em Expo Go para a parte visual.
6. Fazer uma lista curta de erros/reproduções, sem refatoração nesta etapa.
7. Atualizar este arquivo e `PROJECT_STATUS.md` com comandos e resultados exatos.

**Não instalar ainda a biblioteca BLE.** Primeiro confirmar dependências/SDK, escolher o beacon físico e verificar compatibilidade Android. Expo Go não basta para a leitura iBeacon nativa declarada no README.

## Etapas posteriores (uma por tarefa)

- Etapa 2: corrigir problemas de inicialização e erros reproduzíveis, com diff mínimo.
- Etapa 3: organizar dados fictícios em fixtures e indicar claramente o modo demonstração.
- Etapa 4: tornar os fluxos locais de visitante coerentes (formulários, convidado, favoritos, preferências e programação), sem alegar backend.
- Etapa 5: decidir e implementar BLE Android, após validação da biblioteca e hardware.
- Etapa 6: definir API/backend e modelo de dados, incluindo segurança e LGPD.
- Etapa 7: desenvolver painéis web do expositor e organizador no repositório/projeto decidido pela equipe.
- Etapa 8: testes de aceitação por RF/RNF e documentação final.

## Registro de trabalho interrompido

- **Etapa:** auditoria inicial.
- **Concluído:** leitura do README, `App.tsx` e `docs/ANALISE_VISUAL.md`; leitura do documento de requisitos enviado; classificação inicial dos RF/RNF.
- **Alterações no código do app:** nenhuma.
- **Testes:** nenhum executado nesta auditoria.
- **Pendente imediato:** baseline técnico local (Etapa 1) e confirmação do escopo acadêmico a entregar.
- **Não repetir:** não refazer a matriz RF/RNF sem conferir este arquivo; atualizar apenas os status e evidências novas.

## Modelo de atualização após cada etapa

```text
### [data] Etapa N — título
- Objetivo:
- Arquivos alterados:
- Decisões:
- Implementado:
- Comandos executados:
- Resultados reais:
- Limitações/problemas restantes:
- Próximo passo único:
- Commit/PR (hash ou link; escrever “não criado” quando aplicável):
```

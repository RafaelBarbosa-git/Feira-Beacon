# Instruções para agentes de IA — FeiraBeacon

Este arquivo é a primeira leitura obrigatória para qualquer IA que trabalhe neste repositório.

## 1. Regra principal

Trabalhe em etapas pequenas, verificáveis e reversíveis. Não tente implementar o sistema inteiro em um único prompt ou alteração. Antes de editar código, leia nesta ordem:

1. `README.md`
2. `AGENTS.md`
3. `docs/AI_HANDOFF.md`
4. `docs/PROJECT_STATUS.md`
5. `docs/REQUIREMENTS_TRACEABILITY.md`
6. `docs/DECISIONS.md`
7. `package.json`, `app.json` e os arquivos diretamente envolvidos na tarefa.

Se algum arquivo citado não existir, registre isso no diagnóstico; não invente seu conteúdo.

## 2. Protocolo obrigatório por tarefa

1. Declare em poucas linhas o objetivo exato da etapa e os arquivos que provavelmente serão alterados.
2. Inspecione o código existente e as versões reais das dependências antes de escolher bibliotecas ou APIs.
3. Procure impactos em requisitos, navegação, estado, permissões e compatibilidade Expo/Android.
4. Faça somente a menor alteração que conclua a etapa. Não aproveite para refatorar partes não relacionadas.
5. Execute as verificações disponíveis (por exemplo, typecheck, lint, testes e/ou inicialização Expo). Não diga que um teste passou sem tê-lo executado.
6. Revise o diff à procura de regressões, credenciais, dados pessoais fictícios apresentados como reais e funcionalidades que apenas parecem funcionar.
7. Atualize `docs/PROJECT_STATUS.md`, `docs/AI_HANDOFF.md`, `docs/REQUIREMENTS_TRACEABILITY.md` e `docs/EXECUTION_LOG.md` quando a etapa alterar o estado, a cobertura ou o próximo passo.
8. Termine com: arquivos alterados; o que mudou; comandos executados e resultados; limitações; próximo passo único e objetivo.

## 3. Regras de segurança e qualidade

- Nunca sobrescreva trabalho existente sem primeiro entender o motivo e revisar o diff.
- Nunca faça alterações em massa ou gere arquivos inteiros de novo quando uma mudança localizada for suficiente.
- Nunca invente resultados de build, testes, execução em aparelho, leitura BLE, notificações ou chamadas de API.
- Identifique dados de demonstração como dados fictícios. Não apresente uma interação visual como funcionalidade integrada.
- Não coloque senhas, tokens, chaves, dados pessoais reais ou arquivos `.env` no Git.
- Não introduza bibliotecas sem conferir compatibilidade com as versões instaladas de Expo, React Native e React.
- Não implemente leitura iBeacon supondo que Expo Go ofereça suporte BLE nativo. O README já registra que a leitura real exige módulo nativo e development build Android.
- Proximidade iBeacon é uma estimativa baseada em RSSI; não prometa distância ou posição exata.
- Consentimento, permissões Android e LGPD não podem ser simulados por simples `Switch` local.
- Dados de visitantes mostrados a expositores devem permanecer agregados e anônimos, conforme os requisitos.
- Cupons devem ser únicos, imprevisíveis, vinculados e validados no servidor quando houver backend; não confiar em validação exclusivamente local.

## 4. Limites de escopo do repositório

O escopo atualmente documentado deste repositório é o aplicativo móvel do visitante em React Native/Expo. Os painéis do expositor e do organizador são interfaces web distintas, descritas nos requisitos e protótipos, mas não estão implementadas neste repositório. Não tente enfiar esses painéis dentro do aplicativo móvel sem uma decisão explícita da equipe.

## 5. Continuidade após interrupção

Antes de encerrar uma etapa — especialmente se houver risco de limite de créditos, contexto ou tempo — atualize primeiro `docs/AI_HANDOFF.md` com:

- etapa concluída e etapa em andamento;
- arquivos alterados;
- decisões tomadas e justificativa;
- comandos executados e resultado real;
- problemas conhecidos;
- próximo passo exato;
- instrução para a próxima IA não repetir trabalho concluído.

Uma IA nova deve conseguir retomar lendo os arquivos acima e o histórico Git, sem depender da conversa anterior. Nunca deixe uma tarefa parcialmente aplicada sem registrar o estado.

## 6. Commits

Faça commits pequenos e com mensagens claras, quando a ferramenta/usuário tiver autorizado a escrita no Git. Não reescreva histórico compartilhado. Se não houver acesso de escrita, gere um patch ou liste os arquivos para aplicação manual e diga claramente que não houve commit.

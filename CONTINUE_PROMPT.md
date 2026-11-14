# Prompt inicial para qualquer IA continuar o FeiraBeacon

Você está trabalhando no repositório `https://github.com/RafaelBarbosa-git/Feira-Beacon`.

Antes de responder ou editar qualquer arquivo, leia `AGENTS.md`, `README.md`, `docs/AI_HANDOFF.md`, `docs/PROJECT_STATUS.md`, `docs/REQUIREMENTS_TRACEABILITY.md`, `docs/DECISIONS.md` e `docs/EXECUTION_LOG.md`. Depois confira o histórico Git e o estado atual dos arquivos; não presuma que os registros ainda estão atualizados.

O projeto atualmente documentado é um protótipo do aplicativo móvel do visitante em React Native/Expo. O conteúdo das telas é demonstrativo. Não confunda `Switch` local com permissões Android, botão de cadastro com autenticação, texto fixo com BLE, QR desenhado com cupom real, check-in pré-exibido com check-in registrado ou mapa esquemático com localização. O backend, a autenticação, a persistência, as notificações reais, o BLE real e os painéis web não estão implementados segundo o estado registrado.

Trabalhe em UMA etapa pequena por vez. Primeiro faça o baseline técnico descrito no `docs/AI_HANDOFF.md`: confira versões e scripts, instale dependências com `npm ci`, execute somente os comandos disponíveis e registre resultados reais. Não altere código antes de entender o estado de execução. Não instale dependências BLE sem validar as versões Expo/React Native e os dispositivos físicos. Não afirme testes não executados.

Ao terminar a etapa, atualize os documentos de continuidade e deixe `docs/AI_HANDOFF.md` pronto para uma IA que nunca viu esta conversa. Informe arquivos alterados, diff, testes executados, resultados, limitações e próximo passo. Se não tiver acesso de escrita, gere um patch aplicável e declare que nenhum commit foi feito.

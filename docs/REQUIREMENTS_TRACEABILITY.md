# Matriz de rastreabilidade dos requisitos — FeiraBeacon

**Fonte:** Documento de Requisitos de Software FeiraBeacon, versão enviada pela equipe, 14 páginas.  
**Critério de status:** “Visual/demo” significa que há representação de tela ou interação local, mas o requisito funcional ainda não está implementado de ponta a ponta. “Não implementado” significa que não foi identificado código correspondente no repositório móvel observado. “Não verificado” significa que depende de inspeção local, teste, dispositivo ou ambiente externo.

## 1. Requisitos funcionais

| Requisito | Prioridade | Responsável principal | Evidência/escopo observado | Status honesto |
|---|---|---|---|---|
| RF001 Cadastrar evento e áreas | Essencial | Painel organizador + API | Formulário previsto nos requisitos; não há painel organizador neste repositório. | Não implementado |
| RF002 Cadastrar beacons | Essencial | Painel organizador + API | Tela O02 existe no protótipo visual, mas não no app móvel observado. | Não implementado |
| RF003 Cadastrar estandes e expositores | Essencial | Painel organizador + API | Formulário previsto, não prototipado no documento visual e ausente do app móvel. | Não implementado |
| RF004 Cadastrar programação | Importante | Painel organizador + API | Aba Programação no app contém atividades fixas de demonstração; não há cadastro/integração. | Visual/demo |
| RF005 Mapear beacons e estandes na planta | Importante | Painel organizador + app + API | Aba Mapa é um esquema fixo; não há upload/planta editável nem coordenadas persistidas. | Visual/demo |
| RF006 Cadastrar/autenticar visitante e convidado | Essencial | App + API | Telas de conta e convidado existem; botão apenas navega e campos têm valores de demonstração. | Visual/demo |
| RF007 Solicitar permissões | Essencial | App Android | Tela explicativa existe; controles são estados locais, sem prompt/permissão real observada. | Visual/demo |
| RF008 Detectar beacons próximos | Essencial | App Android BLE + API | Tela “Perto de você” exibe pontos fixos; nenhum scanner iBeacon observado. | Não implementado |
| RF009 Exibir conteúdo contextual | Essencial | App + API | Oferta e pontos próximos são fixos; não dependem de beacon/zona real. | Visual/demo |
| RF010 Notificar por proximidade | Essencial | App Android + serviço | Não foi observada emissão real de notificação, intervalo de silêncio ou limite horário implementado. | Não implementado |
| RF011 Registrar check-in | Importante | App + API | Detalhe do estande já mostra um check-in com horário/duração fixos; não há gatilho nem registro observado. | Visual/demo |
| RF012 Programação e lembretes | Importante | App + API | Lista estática e botão que alterna estado local; sem persistência/agendamento real observado. | Visual/demo |
| RF013 Mapa e posição aproximada | Importante | App + organizador + API | Mapa esquemático e posição ilustrativa; sem coordenadas configuradas ou beacon real. | Visual/demo |
| RF014 Favoritar estandes/atividades | Importante | App + API/local storage | Botão de favorito altera estado local; não há persistência ou lista derivada observada. | Parcial/demo |
| RF015 Resgatar cupons/brindes | Importante | App + expositor + API | Código e QR estáticos; botão altera estado local; sem token único/validação/uso único real. | Visual/demo |
| RF016 Preferências de notificação | Importante | App + API/local storage | Há controles visuais; não se observou persistência nem integração com notificações/permissões reais. | Visual/demo |
| RF017 Login de expositor e perfil do estande | Essencial | Painel expositor + API | Painel web não está neste repositório móvel. | Não implementado |
| RF018 Criar/gerenciar campanhas | Essencial | Painel expositor + API | Painel web não está neste repositório móvel. | Não implementado |
| RF019 Moderar campanhas | Importante | Painel organizador + API | Painel web não está neste repositório móvel. | Não implementado |
| RF020 Validar cupom no estande | Importante | Painel expositor + API | Leitor/validador não está neste repositório móvel. | Não implementado |
| RF021 Métricas do estande | Importante | Painel expositor + API | Não há painel nem coleta/consulta de métricas observada. | Não implementado |
| RF022 Fluxo de visitantes em tempo real | Importante | Painel organizador + API | Não há painel nem pipeline de eventos observado. | Não implementado |
| RF023 Monitorar situação dos beacons | Importante | Painel organizador + API + beacon | Não há monitoramento nem telemetria de bateria/sinal observada. | Não implementado |
| RF024 Enviar avisos gerais | Importante | Painel organizador + serviço push + app | Não há painel nem envio push observado. | Não implementado |
| RF025 Relatórios do evento | Importante | Painel organizador + API | Não há geração de CSV/PDF observada. | Não implementado |
| RF026 Gerenciar usuários/perfis | Importante | Painel organizador + API | Não há gestão de usuários/roles observada. | Não implementado |
| RF027 Passaporte de estandes | Desejável | App + API | Não foi identificada funcionalidade de passaporte; requisito desejável e fora do protótipo. | Não implementado |
| RF028 Avaliar estandes/atividades | Desejável | App + API + painéis | Requisito fora do protótipo e sem fluxo observado. | Não implementado |

## 2. Requisitos não funcionais

| Requisito | Exigência principal | Status da evidência atual |
|---|---|---|
| RNF001 Segurança | Autenticação, senha armazenada com hash seguro, bloqueio após 5 falhas, HTTPS, autorização por perfil e cupons imprevisíveis. | Não implementado/não verificado; não há backend/autenticação declarados. |
| RNF002 Privacidade e LGPD | Consentimento explícito/revogável, identificador anônimo, métricas agregadas, minimização, exclusão de conta/dados e política acessível. | Parcialmente representado em textos de interface; controles/consentimento e processamento reais não verificados. |
| RNF003 Desempenho | Conteúdo até 3 s, notificações até 5 s, painéis até 10 s, 95% das APIs até 2 s. | Não medido; sem serviços reais para teste. |
| RNF004 Precisão da proximidade | Suavização RSSI, tolerância à oscilação, calibração, 90% de acerto sob condições especificadas e limites configuráveis. | Não implementado; requer BLE e testes físicos. |
| RNF005 Disponibilidade/tolerância a falhas | 99% durante evento, cache offline e fila/sincronização de eventos. | Não implementado/não medido. |
| RNF006 Compatibilidade | Android 8/API 26+, BLE 4.0+, permissões por versão, iBeacon, navegadores e leitura QR nos painéis. | Não verificado; conferir `app.json`, dependências, SDK e aparelhos antes de declarar compatibilidade. |
| RNF007 Usabilidade/acessibilidade | PT-BR, onboarding até 3 telas, acesso em até 2 toques, WCAG AA, campanha em menos de 3 min e notificações curtas. | Idioma e parte do fluxo visual estão representados; contraste, acessibilidade e tempos não foram medidos. |
| RNF008 Consumo de energia | Busca balanceada, até 5%/h em teste, background autorizado/indicado e autonomia de beacon. | Não implementado/não medido; depende de BLE, aparelho e hardware. |
| RNF009 Escalabilidade/configurabilidade | 30 estandes/beacons, 500 visitantes, 30 expositores simultâneos e regras ajustáveis sem alterar código. | Não implementado/não testado; exige backend/infraestrutura e painel de configuração. |

## 3. Telas prototipadas no documento visual

| ID | Tela | Requisitos relacionados |
|---|---|---|
| A01 | Boas-vindas | RF006 |
| A02 | Permissões | RF007 |
| A03 | Entrar ou criar conta | RF006 |
| A04 | Perto de você | RF008, RF009, RF014 |
| A05 | Notificação de proximidade | RF010 |
| A06 | Detalhe do estande | RF009, RF011, RF014, RF015 |
| A07 | Mapa do evento | RF013 |
| A08 | Programação | RF012 |
| A09 | Carteira de cupons | RF015 |
| A10 | Perfil, favoritos e preferências | RF014, RF016, RF027 |
| E01–E05 | Painel do expositor | RF017, RF018, RF020, RF021 |
| O01–O05 | Painel do organizador | RF002, RF005, RF019, RF022, RF023, RF024, RF025 |

O documento de requisitos informa que RF001, RF003, RF004 e RF026 correspondem a formulários simples do painel organizador que não foram prototipados; RF028 também ficou fora do protótipo.

## 4. Priorização recomendada para uma entrega acadêmica demonstrável

1. **Estabilizar o app visitante:** instalar, executar, corrigir erros reais e testar todos os fluxos visuais em aparelho/emulador.
2. **Separar claramente demo de funcionalidade real:** fixtures nomeadas, estado “modo demonstração”, remover credenciais fictícias pré-preenchidas e não mostrar check-in/QR como se fossem transações reais.
3. **Implementar fluxos locais coerentes:** validação de formulários, comportamento de convidado, favoritos e preferências persistidas localmente, programação filtrável, cupons marcados como simulados.
4. **BLE Android real:** somente após escolher e validar biblioteca/dispositivo, em development build e aparelho real.
5. **Backend e segurança:** autenticação, dados do evento, campanhas, check-ins, cupons e regras de acesso.
6. **Painéis web:** expositor e organizador, com APIs e autorização.
7. **RNFs de produção:** desempenho, carga, segurança, LGPD, disponibilidade, precisão e bateria testados com evidência.

Esta ordem é uma sugestão técnica, não uma alteração dos requisitos. A equipe/professor deve confirmar o que é obrigatório para a entrega da disciplina.

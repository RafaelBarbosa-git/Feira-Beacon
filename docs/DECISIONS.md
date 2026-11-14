# Decisões e premissas do FeiraBeacon

Este registro evita que uma IA futura altere a arquitetura ou o escopo sem perceber decisões anteriores.

| ID | Decisão/premissa | Estado | Observação |
|---|---|---|---|
| DEC-001 | O app deste repositório é o aplicativo móvel do visitante. | Confirmada no README e em `ANALISE_VISUAL.md` | Painéis web do expositor e organizador são sistemas separados ou futuro monorepo, mediante decisão da equipe. |
| DEC-002 | Aplicativo em português do Brasil. | Confirmada | Também exigida por RNF007. |
| DEC-003 | Modo convidado deve permitir conteúdo por proximidade; recursos de conta, como favoritos entre aparelhos e resgate de cupons, exigem conta. | Definida nos requisitos | O comportamento real ainda não está implementado. |
| DEC-004 | Não afirmar rastreamento preciso; iBeacon estima proximidade pelo RSSI. | Confirmada no README | Requer filtragem, estabilização e calibração por beacon. |
| DEC-005 | Expo Go serve para demonstrar telas, mas não para a varredura iBeacon nativa descrita no README. | Confirmada no README | BLE real deve ser validado em development build Android com módulo compatível. |
| DEC-006 | Dados exibidos a expositores devem ser agregados e anônimos. | Exigência do requisito | Evitar persistência de trajetória detalhada. |
| DEC-007 | Dados de demonstração não podem ser confundidos com dados reais do evento. | Regra de qualidade desta retomada | Identificar fixtures/mock mode na interface e documentação. |

## Decisões em aberto (não presumir)

- Backend e banco de dados escolhidos.
- Provedor/fluxo de autenticação e recuperação de conta.
- Biblioteca BLE/iBeacon e dispositivos beacons usados nos testes.
- Como serão hospedados e organizados os dois painéis web.
- Se a equipe adotará monorepo ou repositórios separados para app, API e painéis.
- Fonte oficial da planta do evento e formato/escala das coordenadas.
- Política de retenção e exclusão de dados, com validação jurídica/organizacional da LGPD.
- Ambiente de produção, domínio, observabilidade e estratégia de backup.

Qualquer decisão nova deve ser registrada aqui com ID seguinte, motivação, alternativas consideradas e impacto.

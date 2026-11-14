# Revisão visual dos protótipos

Revisão realizada em 14/11/2026 a partir das 20 páginas renderizadas do arquivo `FeiraBeacon – Telas (1).pdf`.

## Escopo de cada conjunto

| Páginas | Interface | Telas e comportamento observado |
| --- | --- | --- |
| 1–10 | App móvel do visitante | Abertura, permissões, criação/entrada de conta, proximidade, notificação, estande, mapa, programação, cupons e perfil. |
| 11–15 | Painel web do expositor | Criar campanha, validar cupom, entrar, visão geral e listar campanhas. |
| 16–20 | Painel web do organizador | Moderar campanhas, relatórios, fluxo ao vivo, beacons e planta do evento. |

## Especificação visual do aplicativo móvel

- Base clara em tom creme, texto quase preto e azul principal `#2554D9`.
- Títulos grandes, negrito e alinhados à esquerda; cartões brancos com cantos arredondados e bordas discretas.
- A barra inferior fixa tem cinco abas: Perto, Mapa, Programação, Cupons e Perfil.
- As zonas usam linguagem e cor consistentes: Immediate/ação atual, Near/ação próxima e Far/informação de contexto.
- A tela de proximidade mostra uma oferta destacada azul seguida de três pontos próximos.
- O mapa é uma planta esquemática, com filtro por categoria, posição aproximada do visitante e cartão do ponto selecionado.
- A programação tem seletor de dia, filtros de palco e cartões de atividades; o item em andamento recebe destaque verde.
- Cupons mostram status, validade, código e QR; a identidade não é exposta a expositores.
- Perfil reúne permissões, silenciamento, interesses, favoritos e acesso à política de privacidade/exclusão de conta.

## Decisão de implementação

Este repositório implementa o aplicativo móvel do visitante em React Native, que é a interface explicitamente solicitada. Os dois painéis são aplicações web independentes e devem ser implementados em projetos web ou em um monorepo numa etapa posterior; não serão simulados como telas móveis.

## Lacunas para produção

- Serviço de autenticação, dados do evento, favoritos e cupons.
- Scanner iBeacon/BLE nativo Android em development build.
- Push notifications, limites de disparo e execução em segundo plano.
- Mapa alimentado pelas posições configuradas pela organização.
- Teste em aparelho Android com permissões reais.

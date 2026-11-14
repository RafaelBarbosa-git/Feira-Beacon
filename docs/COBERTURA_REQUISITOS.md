# Cobertura de requisitos

Esta matriz separa o que está representado no aplicativo React Native do visitante e o que depende de implementação nativa, servidor ou dos painéis web.

| Requisito | Situação atual |
| --- | --- |
| RF006 Cadastro, entrada e convidado | Fluxo visual implementado; sem autenticação ou persistência. |
| RF007 Permissões | Tela explicativa e controles implementados; as permissões Android reais ainda precisam ser solicitadas pelo módulo nativo. |
| RF008 Detecção iBeacon | Simulada com dados de demonstração; exige scanner BLE/iBeacon Android. |
| RF009 Conteúdo por proximidade | Telas de estande, palco e serviço representadas; atualização ainda simulada. |
| RF010 Notificações por proximidade | Referência visual revisada; push, intervalo de silêncio e limite não implementados. |
| RF011 Check-in | Estado visual implementado; regra de permanência e envio ao servidor pendentes. |
| RF012 Programação e lembrete | Lista, dias e lembrete interativo local; filtros e notificação real pendentes. |
| RF013 Mapa | Planta esquemática, filtros e ponto selecionado implementados; busca e posição real pendentes. |
| RF014 Favoritos | Ação de favoritar no estande e exemplos no perfil; persistência pendente. |
| RF015 Cupons | Carteira e QR visual implementados; geração, validação e expiração pendentes. |
| RF016 Preferências | Controles visuais implementados; armazenamento e aplicação aos envios pendentes. |
| RF001–RF005, RF017–RF026 | Pertencem aos painéis web do organizador/expositor ou ao backend; os protótipos foram revisados, mas não fazem parte do aplicativo móvel React Native. |
| RF027–RF028 | Desejáveis; não foram prototipados nos documentos nem implementados. |

## Ordem recomendada para finalizar uma versão demonstrável

1. Concluir a instalação do Expo e abrir o app em Android.
2. Ligar dados locais persistentes para conta, favoritos, cupons e preferências.
3. Configurar development build Android e o módulo BLE/iBeacon.
4. Criar API e banco para evento, estandes, campanhas, programação e cupons.
5. Implementar os painéis web separados para expositor e organização.

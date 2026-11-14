# Estado do projeto FeiraBeacon

**Atualizado em:** 14/11/2026  
**Branch observada:** `main`  
**Repositório:** https://github.com/RafaelBarbosa-git/Feira-Beacon

## 1. Resumo executivo

O repositório contém um protótipo navegável do aplicativo móvel do visitante, desenvolvido em React Native com Expo. A implementação publicada em `App.tsx` concentra navegação, componentes e estilos em um único arquivo e utiliza dados estáticos/de demonstração.

**Não considerar o sistema pronto para produção.** O README declara que ainda não há backend, autenticação real, persistência, notificações reais, mapa georreferenciado ou integração BLE real. Os painéis web do expositor e do organizador também não fazem parte deste aplicativo móvel.

## 2. Estado observado no GitHub

- Repositório público: `RafaelBarbosa-git/Feira-Beacon`.
- A página do repositório mostrava 2 commits na branch `main` na data desta auditoria.
- Arquivos visíveis na raiz: `docs/`, `.gitignore`, `App.tsx`, `README.md`, `app.json`, `package-lock.json` e `package.json`.
- Documento visual existente: `docs/ANALISE_VISUAL.md`.
- O documento visual informa que o protótipo de alta fidelidade possui 20 páginas: 1–10 aplicativo do visitante; 11–15 painel do expositor; 16–20 painel da organização.
- Esta auditoria foi feita pela leitura do conteúdo público disponível no GitHub. O ambiente desta execução não disponibilizou ações de escrita no GitHub e não executou o projeto localmente. Portanto, nenhum commit, build ou teste é declarado como realizado.

## 3. O que está visualmente representado em `App.tsx`

- Onboarding/boas-vindas.
- Tela explicativa de permissões.
- Tela de criar conta/entrar e opção de convidado.
- Abas Perto, Mapa, Programação, Cupons e Perfil.
- Detalhe do estande, favorito e botão de resgate de cupom.
- Mapa esquemático e programação com conteúdo de exemplo.

## 4. Comportamentos que ainda são demonstração

A leitura do código publicado identificou exemplos concretos:

- Criar conta/entrar apenas chama a navegação para a tela principal; não há autenticação visível nesse fluxo.
- Campos de cadastro possuem valores fictícios pré-preenchidos.
- Os controles de Bluetooth/localização/notificações são `Switch` de estado local; não demonstram solicitação real de permissões Android.
- A tela “Perto de você” exibe estandes, zonas e oferta fixos; não há scanner BLE no código observado.
- O mapa é um desenho esquemático com posição estática, não uma planta carregada do organizador nem posicionamento calculado.
- A programação e os lembretes usam conteúdo fixo e estado local.
- A tela de cupons mostra código fixo e um QR desenhado por matriz estática; não foi observada geração/validação de token real.
- A tela do estande já exibe um check-in concluído e duração fixa; não foi observado cálculo de permanência nem envio de registro.
- Preferências e favoritos não demonstram persistência entre sessões/aparelhos.

Esses itens não são necessariamente defeitos em um protótipo visual; são limites que precisam ficar explícitos na apresentação e na matriz de requisitos.

## 5. Informações técnicas ainda não verificadas

O conteúdo de `package.json`, `package-lock.json` e `app.json` não foi inspecionado em detalhe nesta auditoria. Antes de instalar bibliotecas ou alterar configuração, a próxima sessão deve ler esses arquivos diretamente no repositório ou em uma cópia local e registrar:

- versões de Expo, React Native, React e TypeScript;
- scripts disponíveis (start, typecheck, lint, test, Android);
- `minSdkVersion`/target Android e plugins configurados;
- versão de Node recomendada, se houver;
- dependências nativas já instaladas.

Também falta executar `npm ci`, typecheck/build e teste em aparelho Android. O estado desses testes é **não verificado**, não “aprovado”.

## 6. Critério para declarar algo concluído

Um requisito só pode ser marcado como implementado quando houver código funcional, teste correspondente e evidência do fluxo real. Uma tela estática ou um botão que altera apenas estado local deve ser classificado como “visual/demo” ou “parcial”, nunca como implementação completa.

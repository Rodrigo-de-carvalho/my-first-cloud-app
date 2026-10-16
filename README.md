# Workshop: minha primeira API na nuvem

Projeto independente de Cloudflare Workers, pronto para ser forkado e publicado. A API tem `/health`, `/hello?name=Maria`, `/error` (resposta 503 intencional) e resposta 404 para caminhos desconhecidos. Não exige banco, Docker, segredo nem infraestrutura adicional.

## Publicar usando o fork

1. Faça **Fork** deste repositório para sua conta GitHub.
2. No Cloudflare Dashboard, abra **Workers & Pages → Create application** e escolha conectar/importar um repositório Git.
3. Autorize o aplicativo Cloudflare a acessar o repositório forkado e selecione-o.
4. Confirme que o diretório raiz do projeto contém `wrangler.jsonc` e `worker.js`. O Wrangler identifica o entry point por `main: "worker.js"`. Se o formulário solicitar comando, use `pnpm deploy` (ou `npm run deploy`); não é necessário definir um diretório de saída de assets.
5. Selecione **Deploy**. Após o primeiro deploy, o dashboard mostra o endereço público `https://<nome-do-worker>.<subdomínio-da-conta>.workers.dev`.
6. Copie o endereço e teste as rotas abaixo. Commits seguintes na branch conectada podem disparar novos deploys automaticamente; confira a configuração de Builds do Worker.

A primeira conexão pode solicitar autorização do GitHub e uma conta Cloudflare ativa. Verificação de conta, permissões da organização e disponibilidade do plano variam; não é garantido que todo estudante consiga criar conta sem etapas adicionais. Não compartilhe credenciais. O endpoint `workers.dev` é público.

Docs oficiais: [deploy pelo dashboard](https://developers.cloudflare.com/workers/get-started/dashboard/), [integração Git](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/) e [Workers Builds para GitHub](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/).

## Testar o deploy

Substitua `SEU-WORKER` pelo hostname real. `curl -i` exibe o status HTTP e os headers junto ao corpo.

```bash
curl -i https://SEU-WORKER.workers.dev/health
curl -i 'https://SEU-WORKER.workers.dev/hello?name=Maria'
curl -i https://SEU-WORKER.workers.dev/hello
curl -i https://SEU-WORKER.workers.dev/nao-existe
curl -i https://SEU-WORKER.workers.dev/error
```

Esperado:

- `/health`: `200` e JSON com `status: "ok"` e timestamp.
- `/hello?name=Maria`: `200` e `{"message":"Hello, Maria!"}`.
- `/hello`: `200` e saudação para `World`.
- caminho desconhecido: `404` e `{"error":"Not found"}`.
- `/error`: `503` e `{"error":"Service unavailable"}`. O código retornou esse status de propósito; isso não significa que o runtime ou a infraestrutura falhou.

## Desenvolvimento local e CLI

Requer Node.js e pnpm. Na raiz do clone:

```bash
pnpm install
pnpm dev
```

Wrangler abre um ambiente local; siga o endereço que ele imprimir. Para publicar pela CLI em vez do dashboard, autentique-se e faça deploy:

```bash
pnpm exec wrangler login
pnpm deploy
```

Não crie nem versione API tokens para esta atividade. A CLI é opcional para quem usar o fluxo de importação pelo dashboard.

### Fallback sem conta ou sem internet

Para testar a mesma lógica localmente sem Wrangler:

```bash
node local-server.mjs
curl -i http://localhost:8787/health
curl -i 'http://localhost:8787/hello?name=Maria'
```

Esse servidor de fallback confirma que as rotas respondem localmente, mas **não** é um deploy: não gera uma URL pública nem demonstra acesso pela internet. Se não puder criar conta, acompanhe o deploy do docente, use o fallback e faça os exercícios em `exercises.md`.

## Logs e exercícios

No dashboard, abra **Workers & Pages**, selecione o Worker e procure **Observability** para logs e **Metrics/Overview** para métricas. Os menus podem mudar, e logs/métricas podem demorar a aparecer. O projeto ativa a configuração de observabilidade via `wrangler.jsonc`; disponibilidade e retenção dependem das configurações e do plano vigentes.

Os exercícios com soluções estão em [`exercises.md`](./exercises.md). Saídas demonstrativas para atividades offline estão em [`sample-output.md`](./sample-output.md).

## Limites e custos

O projeto em si não promete gratuidade nem um preço fixo. Consulte a página de [preços e limites atuais](https://developers.cloudflare.com/workers/platform/pricing/) antes de executar em produção. Use apenas uma conta autorizada e remova recursos quando não forem mais necessários.

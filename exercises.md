# Exercícios

Faça uma alteração por vez. Depois de editar, publique a nova versão e teste com `curl -i`. O domínio abaixo é um placeholder.

## Iniciante — `GET /info`

Implemente uma rota que retorne status 200 e:

```json
{
  "application": "my-first-cloud-app",
  "version": "1.0.0",
  "status": "running"
}
```

Teste: `curl -i https://YOUR_WORKER.workers.dev/info`.

## Intermediário — validar `name`

Altere `/hello` para exigir o parâmetro `name`. Se estiver ausente ou vazio, responda status 400 com JSON como `{"error":"Parâmetro name é obrigatório"}`. Se estiver presente, responda a saudação normal. Considere o que acontece com `?name=%20` (espaços).

Teste as variantes: sem parâmetro, vazio e `?name=Maria`.

## Avançado — método HTTP permitido

Aceite apenas `GET` para as rotas da API. Para um método diferente, retorne status 405 e header `Allow: GET`. Teste, por exemplo, `curl -i -X POST https://YOUR_WORKER.workers.dev/health` e confirme status, header e corpo.

---

# Soluções de referência

As soluções são exemplos pequenos para comparar depois da tentativa. Em um sistema real, também pensaríamos em encoding, validação, contratos e consistência entre rotas.

## Iniciante: rota `/info`

Coloque antes do fallback 404:

```js
if (url.pathname === "/info") {
  return Response.json({
    application: "my-first-cloud-app",
    version: "1.0.0",
    status: "running",
  });
}
```

## Intermediário: validar `name`

Substitua o handler de `/hello` por:

```js
if (url.pathname === "/hello") {
  const name = url.searchParams.get("name")?.trim();
  if (!name) {
    return Response.json(
      { error: "Parâmetro name é obrigatório" },
      { status: 400 },
    );
  }
  return Response.json({ message: `Hello, ${name}!` });
}
```

## Avançado: restringir métodos

No início de `fetch`, antes das rotas, restrinja o método:

```js
if (request.method !== "GET") {
  return Response.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "GET" } },
  );
}
```

Uma alternativa em APIs com métodos distintos é permitir uma lista por rota e construir o valor do header `Allow` correspondente. O status 405 comunica que o método não é permitido para o recurso; não significa que a URL inexiste.

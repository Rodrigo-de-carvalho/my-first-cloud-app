# Saídas de referência para demonstrações offline

Os valores abaixo são ilustrativos: DNS, cabeçalhos, endereços, datas e conteúdo de servidores variam. Não compare a saída caractere por caractere.

## DNS (`dig example.com`)

Trecho típico; o resolvedor e os registros retornados podem variar:

```text
;; ANSWER SECTION:
example.com.    86400    IN    A    93.184.216.34
```

`ANSWER SECTION` contém a resposta vista pelo resolvedor consultado. `example.com` e o endereço são exemplos de documentação; a resolução é cacheável e a consulta real pode trazer outros registros/endpoints.

## Headers (`curl -I https://example.com`)

```text
HTTP/2 200
content-type: text/html
cache-control: max-age=...
```

Procure o status (`200`) e os headers. Servidores reais variam cabeçalhos, protocolo e status.

## Detalhes (`curl -v https://example.com`)

A saída mostra etapas como resolução, conexão, negociação TLS e headers HTTP. Mensagens de diagnóstico normalmente vão para stderr. Certificados e versões negociadas dependem da rede/servidor; não há uma transcrição única a memorizar.

## API de exemplo (valores representativos)

```text
$ curl -i https://demo.workers.dev/health
HTTP/2 200
content-type: application/json

{"status":"ok","timestamp":"2025-01-01T12:00:00.000Z"}
```

```text
$ curl -i 'https://demo.workers.dev/hello?name=Maria'
HTTP/2 200
content-type: application/json

{"message":"Hello, Maria!"}
```

```text
$ curl -i https://demo.workers.dev/invalid
HTTP/2 404
content-type: application/json

{"error":"Not found"}
```

```text
$ curl -i https://demo.workers.dev/error
HTTP/2 503
content-type: application/json

{"error":"Service unavailable"}
```

JSON e ordem de propriedades podem variar. O ponto é verificar status, tipo de conteúdo e semântica da resposta. Um 503 que o próprio handler retorna não prova falha do runtime.

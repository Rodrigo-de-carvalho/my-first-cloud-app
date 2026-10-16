export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      console.log({ route: "/health", method: request.method });
      return Response.json({
        status: "ok",
        timestamp: new Date().toISOString(),
      });
    }

    if (url.pathname === "/hello") {
      const name = url.searchParams.get("name") || "World";
      console.log({ route: "/hello", method: request.method });
      return Response.json({
        message: `Hello, ${name}!`,
      });
    }

    // Rota didática para investigar um status HTTP 5xx.
    // A invocação do Worker pode ser bem-sucedida: o handler retorna 503 de propósito.
    if (url.pathname === "/error") {
      console.log({ route: "/error", method: request.method, status: 503 });
      return Response.json(
        { error: "Service unavailable" },
        { status: 503 },
      );
    }

    return Response.json(
      { error: "Not found" },
      { status: 404 },
    );
  },
};

import index from "./index.html";

function validateNumberParam(param: string): Boolean {
  const number = Number(param);
  if (!Number.isInteger(number)) {
    return false;
  }
  return true;
}

const rnd = (max: number) => Math.floor(Math.random() * max);

const server = Bun.serve({
  // `routes` requires Bun v1.2.3+
  routes: {
    "/": index,

    // API
    "/:id/math": req => {
      if (validateNumberParam(req.params.id)) {
        return new Response(`${req.params.id} is the math number`);
      } else {
        return new Response("Not Found", { status: 404 });
      }
    },

    "/:id": req => {
      if (validateNumberParam(req.params.id)) {
        return new Response(`${req.params.id} is the number (trivia desc)`);
      } else {
        return new Response("Not Found", { status: 404 });
      }
    },
    "/:id/trivia": req => {
      if (validateNumberParam(req.params.id)) {
        return new Response(`${req.params.id} is the number (trivia desc)`);
      } else {
        return new Response("Not Found", { status: 404 });
      }
    },

    "/:d/:m/date": req => {
      if (validateNumberParam(req.params.d) && validateNumberParam(req.params.m)) {
        return new Response(`Day: ${req.params.d}. Month: ${req.params.m}. This is cool date!`);
      } else {
        return new Response("Not Found", { status: 404 });
      }
    },

    //random API / стрелочка функция для срабатывания рандома при каждой генерации
    "/random/trivia": () => new Response(`${rnd(10000)} is trivia number`),
    "/random/year": () => new Response(`${rnd(2025)} is the cool year!`),
    "/random/date": () => new Response(`Date: ${rnd(31) + 1}. Month: ${rnd(12) + 1}. This is cool date!`),
    "/random/math": () => new Response(`${rnd(10000)} is math number`),

  },

  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🚀 Server running at ${server.url}`);

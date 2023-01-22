# moleculer-stream-actions
This is a POC that involves the use of streams to exchange files between microservices through the use of the moleculerjs framework

---

## Project setup

Run 

```
npm install
```

for install all dependencies.

---

## Run with skaffold

Ensure to have:
1.  Installed [Skaffold] cli
2.  Build all packages with the following command:
```
npm run build
```

Then, run the following command:
```
skaffold dev
```

---

## Run locally

Run the following command:
```
npm run dev
```

## References

*   [Moleculer Actions Streaming]
*   [Skaffold]

[Moleculer Actions Streaming]: https://moleculer.services/docs/0.14/actions.html#Streaming

[Skaffold]: skaffold.dev
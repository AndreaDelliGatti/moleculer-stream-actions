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

---

## Commit(s) specification

Every commit MUST follow the [Conventional Commits] specification

The suggested tool helps to commit in the right way is [commitizen] (`python`) but there are many alternatives.

---

## Changelog generation

Following [Conventional Commits] specification, we can **auto generate the project's changelog**.
The choosen tool is [Git-Changelog-command-line] (`node+java`) whose output format is specified in the file `changelog.mustache` that uses the [Mustache] Grammar.

Generate changelog
```
npm run changelog
```
The file `CHANGELOG.md` is generated (or overwritten) in the root project folder

---

## References

*   [Moleculer Actions Streaming]
*   [Skaffold]

[Moleculer Actions Streaming]: https://moleculer.services/docs/0.14/actions.html#Streaming
[Skaffold]: https://www.skaffold.dev
[Conventional Commits]: https://www.conventionalcommits.org/en/v1.0.0/
[commitizen]: https://commitizen-tools.github.io/commitizen/
[Git-Changelog-command-line]: https://www.npmjs.com/package/g-Changelog-command-line
[Mustache]: https://mustache.github.io
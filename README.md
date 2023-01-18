# Desafio Técnico - Backend

## Rodando o Backend

Para rodá-lo, faça:

```console
> cd BACK
> mv .env.sample .env
> yarn
> yarn start:dev
```

## Testando o Backend

Para rodá-lo, faça:

```console
> yarn test:cov
```

Você também pode utilizar a collection do postman, path:

```console
> BACK/postman
```

## Resultado do sonar

Apontamento "Security Hotspots" por conta da configuração LocalStrategy (https://github.com/esdrastavares/ada-js/blob/main/BACK/src/config/security/index.ts#L32)

![Sonar](https://github.com/esdrastavares/ada-js/blob/ca046a76aa75cf83c0b5e1e46802ec1bfab8e3cb/assets/sonar.png)
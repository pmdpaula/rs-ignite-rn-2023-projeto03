# Rocketseat Ignite - ReactNative 2023 - Projeto 03

App ***Ignite Gym***

## Inicialização

`npx expo init ignitegym --yarn`
ou
`npx create-expo-app ignitegym --template`

## Instalações extras

### Lint e organização do código (dependências de desenvolvimento)
[eslint](https://eslint.org/docs/latest/use/getting-started)
[prettier](https://prettier.io/docs/en/install.html)
[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
```
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-react @typescript-eslint/eslint-plugin
```

[Ciar alias para os imports, evitando passar caminhos complexos - babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver)
```
yarn add -D babel-plugin-module-resolver
```


[Ordenar as importações - eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/)
```
yarn add -D eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript eslint-import-resolver-babel-module eslint-plugin-module-resolver
```
ver configurações necessárias do `eslint-import-resolver-typescript` para funcionar correto com o path mapping


~~[Ordenar as importações - eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)~~
```
#yarn add -D eslint-plugin-simple-import-sort~~
```

[Ordenar as importações - @trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports#readme)
```bash
yarn add -D @trivago/prettier-plugin-sort-imports
```
Este plugin pede para que coloque a ordenação que queremos no arquivo `.prettierrc.json` e ficaram esttas opções.

```json
  "importOrder": [
    "^react$",
    "^react-native$",
    "^@react-navigation$",
    "^@storage/(.*)$",
    "^@screens/(.*)$",
    "^@components/(.*)$",
    "^@assets/(.*)$",
    "^[./]"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
```


**Resumo**
```bash
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-react @typescript-eslint/eslint-plugin

yarn add -D eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript eslint-import-resolver-babel-module

yarn add -D babel-plugin-module-resolver

yarn add -D @trivago/prettier-plugin-sort-imports
```

ou
```bash
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-react @typescript-eslint/eslint-plugin eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript eslint-import-resolver-babel-module babel-plugin-module-resolver @trivago/prettier-plugin-sort-imports
```


### Adição de recursos na aplicação

- [Adição de fontes Google](https://docs.expo.dev/guides/using-custom-fonts/#using-a-google-font)
```bash
npx expo install expo-font @expo-google-fonts/roboto
```


- [Pacote de componentes - NativeBase](https://docs.nativebase.io/getting-started)
```bash
yarn add native-base
expo install react-native-svg@12.1.1
expo install react-native-safe-area-context@3.3.2
```

- [Navegação nas páginas - React Navigation](https://reactnavigation.org/docs/getting-started/)
```bash
yarn add @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context

yarn add @react-navigation/native-stack
yarn add @react-navigation/bottom-tabs
```
Acima instalamos duas formas de navegação: stack e bottom-tabs


[Permitir importação de SVGs como se fossem imagens - react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer)
```bash
yarn add -D react-native-svg-transformer
```

Para Expo precisamos fazer as configurações como no link
https://github.com/kristerkari/react-native-svg-transformer#for-expo-sdk-v4100-or-newer

Arquivo: `metro.config.js`

```javascript
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
```

[Importação de imagem - expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
```bash
npx expo install expo-image-picker
```

[Manipulação de arquivos no dispositivo - Expo FileSystem](https://docs.expo.dev/versions/latest/sdk/filesystem/)
```bash
npx expo install expo-file-system
```

[Controle e validação de formulários - React Hook Form](https://react-hook-form.com/get-started/)
```bash
yarn add react-hook-form
```

[Requisições com o backend - Axios](https://axios-http.com/ptbr/docs/intro)
```bash
yarn add axios
```

[Armazenamento de dados no dispositivo - AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
```bash
npx expo install @react-native-async-storage/async-storage
```

Usaremos o AsyncStorage para persistir dados do usuário retornados do backend.



## Configurações do projeto

### Path mapping

Mapeamento dos diretórios usando o babel-plugin-module-resolver.
Exemplo do que foi feito.

No arquivo `babel.config.js` foi adicionado as seguintes linhas:
```javascript
...
plugins: [
      ['module-resolver', {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@storage': './src/storage',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@types': './src/@types',
          '@navigation': './src/navigation',
          '@context': './src/context',
          '@services': './src/services',
          '@config': './src/config',
          '@constants': './src/constants',
          '@store': './src/store',
          '@styles': './src/styles',
          '@i18n': './src/i18n',
          '@locales': './src/locales',

        }
      }]
    ]

```

No arquivo `tsconfig.json` foi adicionado as seguintes linhas:
```javascript
...
"baseUrl": "./",
    "paths": {
      "@components/*": ["./src/components/*"],
      "@screens/*": ["./src/screens/*"],
      "@utils/*": ["./src/utils/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@assets/*": ["./src/assets/*"],
      "@types/*": ["./src/@types/*"],
      "@navigation/*": ["./src/navigation/*"],
      "@context/*": ["./src/context/*"],
      "@services/*": ["./src/services/*"],
      "@config/*": ["./src/config/*"],
      "@constants/*": ["./src/constants/*"],
      "@store/*": ["./src/store/*"],
      "@styles/*": ["./src/styles/*"],
      "@i18n/*": ["./src/i18n/*"],
      "@locales/*": ["./src/locales/*"],
    }
```



## Variáveis de ambiente

Estenderei esta como parte do desafio 04, onde será implantado as notificações e deep linking.

Colocarei variáveis de ambiente para que possamos usar a chave do OneSignal secretamente.

**[Uso de variáveis de Ambiente - react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv)**
```bash
yarn add -D react-native-dotenv
```

Aqui ainda foi adicionado o seguinte plugins (com as configurações) no arquivo `babel.config.js`
```javascript
plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ],
```

***Para typescript***
Crie um diretório `./src/@types` e um arquivo `env.d.tsx` e adicione as seguintes linhas:

```javasctipt
declare module '@env' {
  export const API_BASE: string;
}
```

E em `tsconfig.json`
```javascript
"typeRoots": ["./src/@types"]
```



## Notificações

**[Controle dos Push Notifications - OneSignal](https://documentation.onesignal.com/docs/react-native-expo-sdk-setup)**
```bash
npx expo install onesignal-expo-plugin
yarn add react-native-onesignal@4.5.1
```
Foi usada a versão 4.5.1 expecificamente para não pegar uma versão beta mais nova.
Ainda é preciso adicionar a seguinte configuração no arquivo `app.json`. Atentar aos colchetes, pois a instalação acima já inclui a linha `"onesignal-expo-plugin"`. O que devemos fazer é incluir exatamente como segue:

```json
{
  "plugins": [
    [
      "onesignal-expo-plugin",
      {
        "mode": "development",
      }
    ]
  ]
}
```
Quando não fiz como está acima, recebi o seguinte erro.
<pre style="color: red; font-weight: 600">CommandError: Cannot read properties of undefined (reading 'smallIcons')</pre>


E a ativação do OneSignal do projeto. Arquivo `App.tsx`
```javascript
import OneSignal from 'react-native-onesignal';
import Constants from "expo-constants";
...
OneSignal.setAppId("YOUR-ONESIGNAL-APP-ID");
```

## Mudando de Managed Workflow para Development Build
As compilações de desenvolvimento podem ser criadas com o EAS Build ou localmente em seu computador. Você precisará do Xcode (iOS) ou do Android Studio (Android) para instalar o seu App diretamente no emulador ou dispositivo físico para continuar seu aplicativo.
1. Para iniciar uma compilação de desenvolvimento, você precisará instalar o `expo-dev-client`
```bash
npx expo install expo-dev-client
```

Quando você precisar personalizar seu projeto além das APIS padrão fornecidas no Expo Go, poderá criar um cliente de desenvolvimento personalizado para seu aplicativo, instalá-lo no dispositivo e continuar desenvolvendo.

Corrigir o seguinte erro:
<pre style="color: red; font-weight: 600">`AssertionError [ERR_ASSERTION]: Missing 'ios.bundleIdentifier' in app config.`</pre>
No arquivo `app.json` adicionar a linha com a seta.

```json
"ios": {
      "supportsTablet": true,
▶️      "bundleIdentifier": "com.axesoft.igniteshoesapp"
    },
```

2. Voltando aos passos do OneSignal (https://documentation.onesignal.com/docs/react-native-expo-sdk-setup).
```bash
npx expo prebuild
```

Reforçar a importância de termos nosso ambiente nativo configurado na máquina para evitar que nossa aplicação tenha problemas no momento do build.

Link da documentação: https://react-native.rocketseat.dev/

3. Agora para executar pelo expo, precisamos compilar antes e instalar no dispositivo.
```bash
npx expo run:android
```

4. Alterar no `package.json` o script `dev` para: `"start": "expo start --dev-client",`


## Acrecentando o Deep Linking

[Configurações para o Deep Linking - React Navigation](https://reactnavigation.org/docs/deep-linking/)

Adicionar a seguinte linha no arquivo `app.json`
```
"scheme": "ignitegymapp",
```

Confirmado a configuração
```bash
npx expo prebuild

npx uri-scheme list
```
Saída:
```bash
 › Android: Schemes for config: ./android\app\src\main\AndroidManifest.xml
 › com.axesoft.ignitegymapp://
 › exp+ignitegym://
 › ignitegymapp://
```

Recria a aplicação no emulador
```bash
npx expo run:android
```

Em abiente de desenvolvimento enviamos o deep link com o IP do servidor onde está rodando o emulador. O comando abaixo é para testar o deep linking
```
npx uri-scheme open ignitegymapp://192.168.68.101:8081 --android
```
Usamos um dos schemas listados no comando `npx uri-scheme list`.

Instalação do expo-linking
```bash
npx expo install expo-linking
```

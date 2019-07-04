# vue-i18n-file

This library is a command line interface that allows you to manage i18n translations contained in vuejs components seen in a single file json or yaml.

You can generate , merge or replace translation and see differences in translation keys into vue components.

## Installation

``` bash
npm install vue-i18n-file
```

## File format 
```json
{
  "src/components/Hello.vue": {
    "en": {
      "hello": "Hello"
    },
    "fr": {
      "hello": "Bonjour"
    }
  }
}
}
```
## Usage

####Generate


The generated file contains all translations in vue components found in the selected directories
``` bash
vue-i18n-file generate
```

####merge

If you need to merge existing translations with vue-i18n-file generated file you can use this option
``` bash
vue-i18n-file merge
```


####replace

This option allows you to replace translations in vue components with those in the file
``` bash
vue-i18n-file replace
```


####diff

allows you to see the difference between the translations in vue components and the file
``` bash
vue-i18n-file diff
```

## License

MIT.


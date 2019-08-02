import fs from 'fs';
import webpackConfig from './webpack.config';

function updateVSCodeConfig() {
  const { resolve: { alias: aliases } } = webpackConfig;
  const vsCodeConfig = {
    compilerOptions: {
      module: 'es6',
      baseUrl: './'
    }
  };
  const paths = Object.keys(aliases).reduce((parsedPaths, alias) => ({
    ...parsedPaths,
    [`${alias}/*`]: [`${aliases[alias]}/*`]
  }), {});

  vsCodeConfig.compilerOptions.paths = paths;

  fs.writeFile('jsconfig.json', JSON.stringify(vsCodeConfig), 'utf8', () => null);
}

updateVSCodeConfig();

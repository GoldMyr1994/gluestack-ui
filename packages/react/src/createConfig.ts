import type { GlueStackConfig } from './types';
import { convertStyledToStyledVerbosed } from './convertSxToSxVerbosed';
import { resolveStringToken } from './utils';

import { stableHash } from './stableHash';
import { propertyTokenMap } from './propertyTokenMap';
import { updateOrderUnResolvedMap } from './updateOrderUnResolvedMap';
import { GluestackStyleSheet } from './style-sheet';

var globalPluginStore: any = [];

function setGlobalPluginStore(plugins: Array<any>) {
  globalPluginStore.push(...plugins);
}

function getGlobalPluginStore() {
  return globalPluginStore;
}

export function getInstalledPlugins() {
  return getGlobalPluginStore();
}

export const createConfig = <
  T extends GlueStackConfig<
    //@ts-ignore
    T['tokens'],
    T['aliases'],
    T['globalStyle']
  >
>(
  config:
    | T
    | GlueStackConfig<
        //@ts-ignore
        T['tokens'],
        T['aliases'],
        T['globalStyle']
      >
): T => {
  if (config.plugins) {
    setGlobalPluginStore(config.plugins);
  }
  delete config.plugins;

  if (!config.themes) {
    return config as any;
  }
  // if (config.components) {
  //   newConfig = resolveComponentThemes(config);
  // }

  if (config.themes) {
    const newConfigWithThemesResolved = resolveThemes(config);
    return newConfigWithThemesResolved as any;
  }
  return config as any;
};

const resolveThemes = (config: any) => {
  const newConfig = { ...config };
  Object.keys(newConfig?.themes ?? {}).forEach((themeName: any) => {
    let theme = newConfig.themes[themeName];
    Object.keys(theme).forEach((tokenScale: any) => {
      const tokenScaleValue = theme[tokenScale];
      Object.keys(tokenScaleValue).forEach((token: any) => {
        const tokenValue = resolveStringToken(
          tokenScaleValue[token],
          newConfig,
          tokenScale,
          ''
        );
        tokenScaleValue[token] = tokenValue;
      });
    });
    // const tempCONFIG = JSON.parse(JSON.stringify(newConfig));
    // delete tempCONFIG.themes;
    // deepMerge(tempCONFIG, { tokens: { ...theme } });
    // newConfig.themes[themeName] = tempCONFIG;
  });
  return newConfig;
};

export const resolveComponentThemes = (config: any, components: any) => {
  let newComponents: any = {};
  const configWithPropertyTokenMap = {
    ...config,
    propertyTokenMap,
  };

  Object.keys(components ?? {}).forEach((componentName: any) => {
    const component = components[componentName];

    if (
      Object.keys(component?.BUILD_TIME_PARAMS ?? {}).length === 0 &&
      component.theme
    ) {
      newComponents[componentName] = resolveTheme(
        component.theme,
        configWithPropertyTokenMap,
        component?.componentConfig
      );
    } else {
      GluestackStyleSheet.update(component.BUILD_TIME_PARAMS?.orderedResolved);
      GluestackStyleSheet.inject(component.BUILD_TIME_PARAMS?.toBeInjected);
      newComponents[componentName] = component;
    }
  });

  return newComponents;
};

const resolveTheme = (
  componentTheme: {},
  _config: any,
  extendedConfig?: any
) => {
  const versboseComponentTheme = convertStyledToStyledVerbosed(componentTheme);
  const componentHash = stableHash({
    ...componentTheme,
  });

  const { styledIds, verbosedStyleIds } = updateOrderUnResolvedMap(
    versboseComponentTheme,
    componentHash,
    'extended',
    extendedConfig
  );

  return {
    BUILD_TIME_PARAMS: {
      styledIds,
      verbosedStyleIds,
    },
    theme: versboseComponentTheme,
  };
};

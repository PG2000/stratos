/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Creates a new generic Stratos Theme project in the current workspace.
 */
export interface ThemeOptionsSchema {
  /**
   * The name of the theme.
   */
  name?: string;
  /**
   * When true, a default set of assets will be included in the theme.
   */
  includeAssets?: boolean;
  /**
   * When true, a default loading indicator will be included in the theme.
   */
  includeLoader?: boolean;
  [k: string]: unknown;
}

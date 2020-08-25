/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-ncc
 */

export interface IPluginConfig {
    // provide a custom cache path or disable caching
    cache?: string | false;
    // externals to leave as requires of the build
    externals?: string[];
    // directory outside of which never to emit assets
    /**
     * default process.cwd()
     */
    filterAssetBase?: string;
    /**
     * default false
     */
    minify?: boolean; // default
    /**
     * default false
     */
    sourceMap?: boolean; // default
    /**
     * default treats sources as output-relative
     * when outputting a sourcemap, automatically include
     * source-map-support in the output file (increases output by 32kB).
     * default '../'
     */
    sourceMapBasePrefix?: string;
    /**
     * default true
     */
    sourceMapRegister?: boolean; // default
    /**
     * default false
     */
    watch?: boolean;
    license?: string; // default does not generate a license file
    /**
     * default false
     */
    v8cache?: boolean;
    /**
     * default false
     */
    quiet?: boolean;
    /**
     * default false
     */
    debugLog?: boolean;
}

const path = require('path');
const pkg = require("./package.json");
const { JX3BOX, SEO } = require("@jx3box/jx3box-common");
const Setting = require("./setting.json");


module.exports = {

    //❤️ define path for static files ~
    publicPath:
        //🌈 use oss path
        (process.env.STATIC_MODE === "oss" && `${JX3BOX.__static}${pkg.name}/`) || 
        //🌸 use github domain with sub repo path
        (process.env.STATIC_MODE === "repo" && `/${pkg.name}/`) || 
        //🌷 use github custom repo domain
        '/' ,


    chainWebpack: config => {

        //💘 html-webpack-plugin ~
        config.plugin("html").tap(args => {
            args[0].meta = {                            //------设置SEO信息
                Keywords: Setting.keys,
                Description: Setting.desc
            };
            args[0].title = Setting.title + SEO.title,  //------自动添加标题后缀
            args[0].minify = false;                     //------不压缩
            return args;
        });


        //💝 in-line small imgs ~
        config.module
            .rule("images")
            .use("url-loader")
            .loader("url-loader")
            .tap(options => Object.assign(options, { limit: 10240 }));


        //💝 in-line svg imgs ~
        config.module
			.rule("vue")
			.use("vue-svg-inline-loader")
            .loader("vue-svg-inline-loader")


        //💖 import common less var * mixin ~
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
        function addStyleResource (rule) {
            rule.use('style-resource')
              .loader('style-resources-loader')
              .options({
                patterns: [
                    path.resolve(__dirname, './src/assets/css/var.less'),
                ],
            })
        }



    }
};

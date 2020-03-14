const pkg = require("./package.json");
const { JX3BOX,SEO } = require("@jx3box/jx3box-common");
const Setting = require('./settings');

module.exports = {

    //国内使用oss cdn分发域，国外使用本地文件
    publicPath:
        process.env.NODE_ENV === "production"
            ? `${JX3BOX.__static}${pkg.name}/`
            // : `/${pkg.name}/`,  //部署在sub path时
            : `/`,  //部署在根path时

    chainWebpack: config => {
    //html-webpack-plugin插件相关的配置
        config.plugin("html").tap(args => {

            console.log(args)

            //自动添加标题后缀
            args[0].title = Setting.title + SEO.title

            //设置SEO信息
            args[0].meta = {
                'Keywords' : Setting.keys,
                'Description' : Setting.desc
            }

            // html模板中不需要经过render部分的站内链接
            args[0].base = JX3BOX.__Root

            // 国内环境不压缩，方便即时部署自动解决冲突；
            // 国外环境因为使用github pages但使用的是development方案，所以要压缩
            args[0].minify = process.env.NODE_ENV === "production" ? false : true

            return args
        });
    }
};

//used by jest
//encounters errors without esmodules:true https://github.com/babel/babel/issues/9849#issuecomment-596415994
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    esmodules: true,
                },
            },
        ],
    ],
}
//export default  {presets: ['@babel/preset-env']}
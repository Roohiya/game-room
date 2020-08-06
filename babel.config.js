module.exports = function (api) {
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: true
        },
        modules: 'commonjs',
        shippedProposals: true
      }
    ]
  ]
  const plugins = ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-arrow-functions', '@babel/plugin-transform-spread']

  const ignore = []

  if (api.env().toLowerCase() === 'build') {
    ignore.push('**/__tests__')
  }

  return {
    presets,
    plugins,
    ignore
  }
}

const fs = require('fs')
const path = require('path')
const klaw = require('klaw')
const matter = require('gray-matter')
import React from 'react'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

function parseFile(file) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8')
    const data = matter(content)
    return {
      ...data.data,
      body: data.content
    }
  } else {
    throw new Error(`Can't find file ${file}`)
  }
}

export default {
  // siteRoot: 'https://www.example.com',
  // stagingSiteRoot: 'http://localhost:3000',
  prefetchRate: 6,
  Document: ({ Html, Head, Body, children, siteData, renderMeta }) => (
    <Html lang="fr">
      <Head>
        <meta charSet="utf-8" />
        <title>{siteData.title}</title>
        <meta name="description" content={siteData.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
      </Head>
      <Body>
        {children}
      </Body>
    </Html>
  ),
  getSiteData: () => ({
    title: 'This is the default title',
    description: 'Default description'
  }),
  getRoutes: () => {
    return [
      {
        path: '/',
        component: 'src/pages/Home',
        getData: () => parseFile('content/Home.md')
      },
      {
        path: '/about',
        component: 'src/pages/About',
        getData: () => parseFile('content/About.md')
      },
      {
        is404: true,
        component: 'src/pages/404',
      },
    ]
  },
  webpack: (config, { defaultLoaders, stage }) => {
    let sassLoaders = []

    if (stage === 'dev') {
      sassLoaders = [
        'style-loader',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ]
    } else if (stage === 'node') {
      sassLoaders = [
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    } else {
      sassLoaders = ExtractTextPlugin.extract({
        fallback: {
          loader: 'style-loader',
          options: {
            sourceMap: false,
            hmr: false,
          },
        },
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      })
    }

    const sassLoader = {
      test: /\.s(a|c)ss$/,
      use: sassLoaders,
    }

    const fontsLoader = {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }]
    }

    if (stage !== 'dev') {
      delete config.devtool
    } else {
      config.devtool = 'source-map'
    }

    config.module.rules = [
      {
        oneOf: [
          fontsLoader,
          sassLoader,
          defaultLoaders.cssLoader,
          defaultLoaders.jsLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ]
    return config
  },
}

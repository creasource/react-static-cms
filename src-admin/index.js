import netlifyIdentity from 'netlify-identity-widget'
window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();
netlifyIdentity.on("login", user => location.reload());

import CMS from 'netlify-cms'

import React from 'react'
import { Home } from '../src/pages/Home'
import { About } from '../src/pages/About'

import styles from '!css-loader!sass-loader!../src/app.sass'
const CMSStyles = styles.toString()

const withCMSData = (Comp, additionalProps = {}) => {
  return (props) => {
    return <Comp {...props.entry.getIn(['data']).toJS()} {...additionalProps} />
  }
}

const components = [
  {name: 'home', component: Home},
  {name: 'about', component: About},
]

CMS.registerPreviewStyle(CMSStyles, { raw: true });

components.forEach(component => {
  CMS.registerPreviewTemplate(component.name, withCMSData(component.component, component.additionalProps || {}))
})

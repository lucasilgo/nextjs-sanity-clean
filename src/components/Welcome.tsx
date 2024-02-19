import Image from 'next/image'
import Link from 'next/link'

import NextLogo from './nextjs.svg'
import SanityLogo from './sanity.svg'

export default function Welcome() {
  return (
    <div className="container theme-showcase" role="main" data-portal-region="main">
      <div data-portal-component-type="layout" className="row">
        <div className="col-md-12" data-portal-region="main">
          <div data-portal-component-type="part" className="p-5 mb-4 rounded-3 bg-light">
            <div className="container-fluid py-5 text-dark">
              <h1 className="display-5 fw-bold">Seeds Demo</h1>
              <p className="col-md-8 fs-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum pulvinar elit, at malesuada lacus condimentum at. Nulla et fermentum turpis, auctor sagittis augue. Cras id sapien lobortis, bibendum tellus et, congue sapien. Aliquam ex leo, accumsan eu lectus eu, ultricies elementum magna. Vivamus ut hendrerit dui. Nam viverra non leo ut vehicula. Nam ante neque, molestie ut vestibulum nec, posuere ut orci.</p>
              <a href="/list" target="_self" className="btn btn-lg btn-outline-dark">Go to the list</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

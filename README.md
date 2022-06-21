# Frontend Mentor - IP address tracker solution, using NextJS

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

NB: My solution is limited to IP v4 searches.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [https://github.com/nadlgit/fmchallenge-ip-address-tracker](https://github.com/nadlgit/fmchallenge-ip-address-tracker)
- Live Site URL: [https://nadl-fmchallenge-ip-address-tracker.netlify.app](https://nadl-fmchallenge-ip-address-tracker.netlify.app)

## My process

### Built with

- [React](https://reactjs.org/) and [Next.js](https://nextjs.org/), bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
- [Leaflet](https://leafletjs.com/) through [React Leaflet](https://react-leaflet.js.org/)
- [ipify IP Geolocation API](https://geo.ipify.org/)
- Responsive, mobile-first workflow
- Semantic HTML5 markup
- [CSS modules](https://github.com/css-modules/css-modules)
- CSS grid and flexbox
- CSS custom properties
- Tested with [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/)

### What I learned

### Useful resources

- [Integrating Next.js with Leaflet.js + Mapbox](https://dev.to/tsaxena4k/integrating-next-js-with-leaflet-js-mapbox-1351) - This article gave me the steps to use React Leaflet in a NextJS application, such as dynamic import or the workaround to display Leaflet default icons.

- [Map <Marker> image does not appear on Next.js](https://github.com/PaulLeCam/react-leaflet/issues/808#issuecomment-977109769) - This comment on React Leaflet issue showed me that, for custom icon in NextJS, src attribute is needed.

- [React leaflet center attribute does not change when the center state changes](https://stackoverflow.com/questions/64665827/react-leaflet-center-attribute-does-not-change-when-the-center-state-changes/64667351#64667351) - This comment explains that React Leaflet MapContainer props are immutable, so you need to access the unederlying map object and use its methods, such as setView() or flyTo().

## Author

- Frontend Mentor - [@nadlgit](https://www.frontendmentor.io/profile/nadlgit)

// const axe = require('../../../../lib/axe-helper')

// const { render, getExamples } = require('../../../../lib/jest-helpers.js')

// const examples = getExamples('header')

// describe('header', () => {
//   describe('when a user is not logged in', () => {
//     beforeAll(() => {
//       mockedMethods = {
//         url_for: urlForMock
//       }
//     })

//     it('default example passes accessibility tests', async () => {
//       const $ = render('header', examples.default, mockedMethods)

//       const results = await axe($.html())
//       expect(results).toHaveNoViolations()
//     })
//     it('renders a header component with all our standard links', () => {
//       const $ = render('header', examples.default, mockedMethods)
//       expect($.html()).toMatchSnapshot()
//     })
//   })

//   describe('buyer signed in', () => {
//     beforeAll(() => {
//       mockedMethods = {
//         url_for: urlForMock
//       }
//     })

//     it('default example passes accessibility tests', async () => {
//       const $ = render('header', examples['for Buyer'], mockedMethods)

//       const results = await axe($.html())
//       expect(results).toHaveNoViolations()
//     })
//     it('renders a header component with all our standard links', () => {
//       const $ = render('header', examples['for Buyer'], mockedMethods)
//       expect($.html()).toMatchSnapshot()
//     })
//   })

//   describe('supplier signed in', () => {
//     beforeAll(() => {
//       mockedMethods = {
//         url_for: urlForMock
//       }
//     })

//     it('default example passes accessibility tests', async () => {
//       const $ = render('header', examples['for Supplier'], mockedMethods)

//       const results = await axe($.html())
//       expect(results).toHaveNoViolations()
//     })
//     it('renders a header component with all our standard links', () => {
//       const $ = render('header', examples['for Supplier'], mockedMethods)
//       expect($.html()).toMatchSnapshot()
//     })
//   })

//   describe('admin or any other type of use is signed in', () => {
//     beforeAll(() => {
//       mockedMethods = {
//         url_for: urlForMock
//       }
//     })

//     it('default example passes accessibility tests', async () => {
//       const $ = render('header', examples['for users in other roles'], mockedMethods)

//       const results = await axe($.html())
//       expect(results).toHaveNoViolations()
//     })
//     it('renders a header component with all our standard links', () => {
//       const $ = render('header', examples['for users in other roles'], mockedMethods)
//       expect($.html()).toMatchSnapshot()
//     })
//   })

//   describe('component being used in admin frontend', () => {
//     beforeAll(() => {
//       mockedMethods = {
//         url_for: urlForMock
//       }
//     })

//     it('default example passes accessibility tests', async () => {
//       const $ = render('header', examples['for Admin Frontend'], mockedMethods)

//       const results = await axe($.html())
//       expect(results).toHaveNoViolations()
//     })

//     it('renders a header component with all our standard links', () => {
//       const $ = render('header', examples['for Admin Frontend'], mockedMethods)
//       expect($.html()).toMatchSnapshot()
//     })

//     it('renders a header component with a custom class to style the bottom border', () => {
//       const $ = render('header', examples['for Admin Frontend'], mockedMethods)
//       expect($('header.govuk-header.dm-admin-header').length).toBe(1)
//     })
//   })

//   describe('when a user is signed out or not signed in specifically', () => {
//     beforeAll(() => {
//       mockedMethods = {
//         url_for: urlForMock
//       }
//     })

//     it('default example passes accessibility tests', async () => {
//       const $ = render('header', examples['for user who is not signed in'], mockedMethods)

//       const results = await axe($.html())
//       expect(results).toHaveNoViolations()
//     })

//     it('renders a header component with all our standard links', () => {
//       const $ = render('header', examples['for user who is not signed in'], mockedMethods)
//       expect($.html()).toMatchSnapshot()
//     })
//   })
// })

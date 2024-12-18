export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error) {
    return {}
  }

  const token = useCookie('token');
 // console.log('token' + token)

  const loggedIn = token.value != null
  //console.log('login' + loggedIn)

  const currentRoute = useRoute()

  // Create a ref to know where to redirect the user when logged in
  const redirectTo = useState('authRedirect')

  addRouteMiddleware(
    'auth',
    (to) => {
      if (to.meta.auth && !loggedIn) {
        redirectTo.value = to.path
        return '/auth/login'
      }
    },
    { global: true },
  )

  if (import.meta.client) {
    watch(token, async (token) => {
      if (!token && currentRoute.meta.auth) {
        redirectTo.value = currentRoute.path
        await navigateTo('/auth/login')
      }
    })
  }

  if (loggedIn && currentRoute.path === '/auth/login') {
    await navigateTo(redirectTo.value || '/profile')
  }

  return {
    provide: {
      auth: {
        loggedIn,
        redirectTo,
      },
    },
  }
})
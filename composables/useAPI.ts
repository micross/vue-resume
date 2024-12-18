import type { FetchError, FetchResponse, SearchParameters } from 'ofetch'
import { hash } from 'ohash'
import type { AsyncData, UseFetchOptions } from '#app'
import type { KeysOf, PickFrom } from '#app/composables/asyncData'

type UrlType = string | Request | Ref<string | Request> | (() => string | Request)

type HttpOption<T> = UseFetchOptions<ResOptions<T>, T, KeysOf<T>>
interface ResOptions<T> {
  data: T
  code: number
  success: boolean
  detail?: string
}

function handleError<T>(
  _method: string | undefined,
  _response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>,
) {
  // Handle the error
}

function checkRef(obj: Record<string, any>) {
  return Object.keys(obj).some(key => isRef(obj[key]))
}

function fetch<T>(url: UrlType, opts: HttpOption<T>) {
  // Check the `key` option
  const { key, params, watch } = opts
  if (!key && ((params && checkRef(params)) || (watch && checkRef(watch))))
    console.error('\x1B[31m%s\x1B[0m %s', '[useHttp] [error]', 'The `key` option is required when `params` or `watch` has ref properties, please set a unique key for the current request.')

  const options = opts as UseFetchOptions<ResOptions<T>>
  options.lazy = options.lazy ?? true

  return useFetch<ResOptions<T>>(url, {
    // Error interception
    onResponseError({ response, options: { method } }) {
      handleError<T>(method, response)
    },
    // Set the cache key
    key: key ?? hash(['api-fetch', url, JSON.stringify(options)]),
    // Merge the options
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch
  }) as AsyncData<PickFrom<T, KeysOf<T>>, FetchError<ResOptions<T>> | null>
}

export const useAPI = {
  get: <T>(url: UrlType, params?: SearchParameters, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'get', params, ...option })
  },

  post: <T>(url: UrlType, body?: RequestInit['body'] | Record<string, any>, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'post', body, ...option })
  },

  patch: <T>(url: UrlType, body?: RequestInit['body'] | Record<string, any>, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'patch', body, ...option })
  },

  put: <T>(url: UrlType, body?: RequestInit['body'] | Record<string, any>, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'put', body, ...option })
  },

  delete: <T>(url: UrlType, body?: RequestInit['body'] | Record<string, any>, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: 'delete', body, ...option })
  },
}
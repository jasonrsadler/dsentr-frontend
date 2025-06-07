// src/tests/lib/authApi.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as authApi from '@/lib/authApi'
import * as csrfCache from '@/lib/csrfCache'
import { useAuth } from '@/stores/auth'
import { API_BASE_URL } from '@/lib/config'

describe('authApi', () => {
  // Mock fetch globally for all tests
  const globalFetch = global.fetch

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    global.fetch = globalFetch
  })

  describe('signupUser', () => {
    it('should send signup request and return success on 200', async () => {
      const fakeCsrfToken = 'fake-csrf-token'
      vi.spyOn(csrfCache, 'getCsrfToken').mockResolvedValue(fakeCsrfToken)

      const mockResponse = {
        message: 'User created'
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      } as Response)

      const formData = {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'Jane.Doe@Example.com',
        password: 'password123'
      }

      const result = await authApi.signupUser(formData)
      expect(result).toEqual({
        success: true,
        message: 'User created'
      })

      // Email should be lowercase in the request body
      const fetchCall = (global.fetch as any).mock.calls[0]
      expect(fetchCall[0]).toBe(`${API_BASE_URL}/api/auth/signup`)
      expect(fetchCall[1].body).toContain('"email":"jane.doe@example.com"')
      expect(fetchCall[1].headers['x-csrf-token']).toBe(fakeCsrfToken)
    })

    it('should throw error on non-ok response', async () => {
      vi.spyOn(csrfCache, 'getCsrfToken').mockResolvedValue('csrf')

      const errorMsg = 'Signup failed due to server error'
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: errorMsg })
      } as Response)

      const formData = {
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        password: 'pass'
      }

      await expect(authApi.signupUser(formData)).rejects.toThrow(errorMsg)
    })

    it('should throw error if fetch fails', async () => {
      vi.spyOn(csrfCache, 'getCsrfToken').mockResolvedValue('csrf')
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      await expect(
        authApi.signupUser({
          first_name: 'A',
          last_name: 'B',
          email: 'a@b.com',
          password: '1234'
        })
      ).rejects.toThrow(/Network error/)
    })
  })

  describe('loginWithEmail', () => {
    it('should login successfully and call login on Zustand', async () => {
      const fakeCsrfToken = 'csrf-token'
      vi.spyOn(csrfCache, 'getCsrfToken').mockResolvedValue(fakeCsrfToken)

      const user = { id: 'user123', email: 'user@example.com' }
      const loginSpy = vi.fn()
      // Mock Zustand useAuth.getState()
      vi.spyOn(useAuth, 'getState').mockReturnValue({
        user: null,
        isLoading: false,
        login: loginSpy,
        logout: vi.fn(),
        checkAuth: vi.fn().mockResolvedValue(undefined)
      })

      const responseData = {
        success: true,
        user,
        message: 'Logged in'
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => responseData
      } as Response)

      const result = await authApi.loginWithEmail({
        email: 'USER@EXAMPLE.COM',
        password: 'pass123',
        remember: true
      })

      expect(result.success).toBe(true)
      expect(result.data).toEqual(responseData)

      // login() should be called with user from response
      expect(loginSpy).toHaveBeenCalledWith(user)

      // fetch called with correct params
      const fetchCall = (global.fetch as any).mock.calls[0]
      expect(fetchCall[0]).toBe(`${API_BASE_URL}/api/auth/login`)
      expect(fetchCall[1].headers['x-csrf-token']).toBe(fakeCsrfToken)
      expect(fetchCall[1].body).toContain('"email":"user@example.com"') // lowercase
    })

    it('should return failure if response.ok is false or data.success false', async () => {
      vi.spyOn(csrfCache, 'getCsrfToken').mockResolvedValue('csrf')
      vi.spyOn(useAuth, 'getState').mockReturnValue({
        user: null,
        isLoading: false,
        login: vi.fn(),
        logout: vi.fn(),
        checkAuth: vi.fn().mockResolvedValue(undefined)
      })

      // Case 1: res.ok = false
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Invalid credentials' })
      } as Response)

      let result = await authApi.loginWithEmail({
        email: 'a@b.com',
        password: 'wrong'
      })

      expect(result.success).toBe(false)
      expect(result.message).toBe('Invalid credentials')

      // Case 2: res.ok = true but data.success = false
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: false, message: 'Wrong password' })
      } as Response)

      result = await authApi.loginWithEmail({
        email: 'a@b.com',
        password: 'wrong'
      })

      expect(result.success).toBe(false)
      expect(result.message).toBe('Wrong password')
    })

    it('should return failure on fetch error', async () => {
      vi.spyOn(csrfCache, 'getCsrfToken').mockResolvedValue('csrf')
      vi.spyOn(useAuth, 'getState').mockReturnValue({
        user: null,
        isLoading: false,
        login: vi.fn(),
        logout: vi.fn(),
        checkAuth: vi.fn().mockResolvedValue(undefined)
      })

      global.fetch = vi.fn().mockRejectedValue(new Error('Network fail'))

      const result = await authApi.loginWithEmail({
        email: 'a@b.com',
        password: '1234'
      })

      expect(result.success).toBe(false)
      expect(result.message).toMatch(/Network fail/)
    })
  })

  describe('loginWithOAuth', () => {
    let originalLocation: Location

    beforeEach(() => {
      // Save original location
      originalLocation = window.location

      // @ts-expect-error override readonly
      delete window.location

      // Replace with mock object
      // @ts-expect-error
      window.location = {
        ...originalLocation,
        href: ''
      } as unknown as Location
    })

    afterEach(() => {
      // Restore original location
      // @ts-expect-error
      window.location = originalLocation
    })

    it.each(['google', 'github', 'apple'] as const)(
      'should redirect to the correct OAuth URL for %s',
      (provider) => {
        authApi.loginWithOAuth(provider)

        const expectedReturnTo = encodeURIComponent(
          `${originalLocation.origin}/dashboard`
        )
        const expectedUrl = `${API_BASE_URL}/api/auth/oauth/${provider}?redirect_uri=${expectedReturnTo}`

        expect(window.location.href).toBe(expectedUrl)
      }
    )
  })
})
